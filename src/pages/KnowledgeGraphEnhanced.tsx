import { useState, useEffect, useRef } from 'react';
import {
  Network, Search, Filter, ZoomIn, ZoomOut, Maximize2, Database,
  BookOpen, Link2, Tag, GitBranch, Layers, Share2, RefreshCw,
  ChevronRight, Info, Lightbulb, Target, Activity, Download, AlertTriangle
} from 'lucide-react';
import * as echarts from 'echarts';
import {
  policyBusinessImpacts,
  businessSegments,
  BusinessUnitLabels,
  BusinessUnit
} from '@/data/businessImpactData';

// 知识节点类型定义
interface KnowledgeNode {
  id: string;
  name: string;
  type: 'policy' | 'business' | 'metric' | 'concept' | 'region';
  category: string;
  description?: string;
  x?: number;
  y?: number;
  value?: number;
}

interface KnowledgeLink {
  source: string;
  target: string;
  relation: string;
  weight?: number;
}

// 构建知识图谱数据
const buildKnowledgeGraph = () => {
  const nodes: KnowledgeNode[] = [];
  const links: KnowledgeLink[] = [];

  // 政策节点
  policyBusinessImpacts.forEach(policy => {
    nodes.push({
      id: policy.id,
      name: policy.title.slice(0, 20) + '...',
      type: 'policy',
      category: policy.category,
      description: policy.summary,
      value: Math.max(...policy.businessImpacts.map(i => i.impactScore))
    });

    // 业务板块节点
    policy.businessImpacts.forEach(impact => {
      const businessNodeId = `business-${impact.businessUnit}`;
      if (!nodes.find(n => n.id === businessNodeId)) {
        const segment = businessSegments.find(s => s.id === impact.businessUnit);
        nodes.push({
          id: businessNodeId,
          name: BusinessUnitLabels[impact.businessUnit],
          type: 'business',
          category: impact.businessUnit,
          description: segment?.description,
          value: segment?.keyMetrics.capacity || 0
        });
      }

      // 政策→业务关系
      links.push({
        source: policy.id,
        target: businessNodeId,
        relation: impact.impactPath,
        weight: impact.impactScore
      });

      // 指标节点
      impact.affectedMetrics.forEach(metric => {
        const metricNodeId = `metric-${metric}`;
        if (!nodes.find(n => n.id === metricNodeId)) {
          nodes.push({
            id: metricNodeId,
            name: metric,
            type: 'metric',
            category: '指标'
          });
        }

        // 业务→指标关系
        links.push({
          source: businessNodeId,
          target: metricNodeId,
          relation: '影响',
          weight: 1
        });
      });
    });

    // 关键词节点
    policy.keywords.forEach(keyword => {
      const keywordNodeId = `keyword-${keyword}`;
      if (!nodes.find(n => n.id === keywordNodeId)) {
        nodes.push({
          id: keywordNodeId,
          name: keyword,
          type: 'concept',
          category: '关键词'
        });
      }

      // 政策→关键词关系
      links.push({
        source: policy.id,
        target: keywordNodeId,
        relation: '包含',
        weight: 1
      });
    });
  });

  return { nodes, links };
};

const typeColors: Record<string, string> = {
  policy: '#3b82f6',
  business: '#22c55e',
  metric: '#f97316',
  concept: '#8b5cf6',
  region: '#ec4899'
};

const typeLabels: Record<string, string> = {
  policy: '政策',
  business: '业务板块',
  metric: '指标',
  concept: '概念/关键词',
  region: '区域'
};

export default function KnowledgeGraphEnhanced() {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [layoutType, setLayoutType] = useState<'force' | 'circular'>('force');

  const mainChartRef = useRef<HTMLDivElement>(null);
  const relationChartRef = useRef<HTMLDivElement>(null);
  const typeChartRef = useRef<HTMLDivElement>(null);
  const depthChartRef = useRef<HTMLDivElement>(null);

  const graphData = buildKnowledgeGraph();

  // 筛选节点
  const filteredNodes = graphData.nodes.filter(node => {
    const matchesSearch = searchTerm === '' || node.name.includes(searchTerm);
    const matchesFilter = filterType === 'all' || node.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
  const filteredLinks = graphData.links.filter(
    link => filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target)
  );

  // 统计数据
  const stats = {
    totalNodes: graphData.nodes.length,
    totalLinks: graphData.links.length,
    policyCount: graphData.nodes.filter(n => n.type === 'policy').length,
    businessCount: graphData.nodes.filter(n => n.type === 'business').length,
    metricCount: graphData.nodes.filter(n => n.type === 'metric').length,
    conceptCount: graphData.nodes.filter(n => n.type === 'concept').length
  };

  // 主图谱初始化
  useEffect(() => {
    if (!mainChartRef.current) return;
    const chart = echarts.init(mainChartRef.current);

    const option: echarts.EChartsOption = {
      title: {
        text: '政策→业务→指标 知识图谱',
        left: 'center',
        textStyle: { fontSize: 16, fontWeight: 600, color: '#1e293b' }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            const node = graphData.nodes.find(n => n.id === params.data.id);
            return `<div style="padding: 8px;">
              <strong style="font-size: 14px;">${node?.name}</strong><br/>
              <span style="color: #64748b;">类型: ${typeLabels[node?.type || '']}</span><br/>
              ${node?.description ? `<span style="color: #94a3b8; font-size: 12px;">${node.description.slice(0, 50)}...</span>` : ''}
            </div>`;
          } else if (params.dataType === 'edge') {
            return `<div style="padding: 8px;">
              <span style="color: #3b82f6;">${params.data.sourceName}</span>
              <span style="color: #94a3b8;"> → </span>
              <span style="color: #22c55e;">${params.data.targetName}</span><br/>
              <span style="color: #f97316;">关系: ${params.data.relation}</span>
            </div>`;
          }
          return '';
        }
      },
      legend: {
        data: Object.entries(typeLabels).map(([key, label]) => ({
          name: label,
          itemStyle: { color: typeColors[key] }
        })),
        bottom: 10,
        orient: 'horizontal',
        textStyle: { color: '#64748b' }
      },
      series: [{
        type: 'graph',
        layout: layoutType,
        data: filteredNodes.map(node => ({
          id: node.id,
          name: node.name,
          symbolSize: node.type === 'policy' ? 45 : node.type === 'business' ? 40 : 30,
          category: typeLabels[node.type],
          itemStyle: {
            color: typeColors[node.type],
            borderColor: '#fff',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          },
          label: {
            show: true,
            fontSize: node.type === 'policy' ? 12 : 10,
            color: '#374151',
            fontWeight: node.type === 'policy' ? 'bold' : 'normal'
          },
          type: node.type,
          description: node.description
        })),
        links: filteredLinks.map(link => ({
          source: link.source,
          target: link.target,
          sourceName: graphData.nodes.find(n => n.id === link.source)?.name || link.source,
          targetName: graphData.nodes.find(n => n.id === link.target)?.name || link.target,
          relation: link.relation,
          label: {
            show: link.weight && link.weight >= 5,
            formatter: link.relation,
            fontSize: 9,
            color: '#64748b'
          },
          lineStyle: {
            color: link.weight && link.weight >= 7 ? '#ef4444' :
                   link.weight && link.weight >= 5 ? '#f97316' : '#cbd5e1',
            width: link.weight ? Math.max(1, link.weight / 2) : 2,
            curveness: 0.2
          }
        })),
        categories: Object.entries(typeLabels).map(([key, label]) => ({
          name: label,
          itemStyle: { color: typeColors[key] }
        })),
        roam: true,
        draggable: true,
        focusNodeAdjacency: true,
        force: layoutType === 'force' ? {
          repulsion: 500,
          gravity: 0.1,
          edgeLength: [100, 250],
          layoutAnimation: true
        } : undefined,
        circular: layoutType === 'circular' ? {
          rotateLabel: true
        } : undefined,
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 6 },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(59, 130, 246, 0.5)'
          }
        }
      }]
    };

    chart.setOption(option, true);

    // 点击事件
    chart.on('click', (params: any) => {
      if (params.dataType === 'node') {
        const node = graphData.nodes.find(n => n.id === params.data.id);
        setSelectedNode(node || null);
      }
    });

    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, [searchTerm, filterType, layoutType, filteredNodes, filteredLinks]);

  // 关系分布图
  useEffect(() => {
    if (!relationChartRef.current) return;
    const chart = echarts.init(relationChartRef.current);

    const relationCounts = new Map<string, number>();
    graphData.links.forEach(link => {
      relationCounts.set(link.relation, (relationCounts.get(link.relation) || 0) + 1);
    });

    const relationData = Array.from(relationCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const option = {
      title: { text: '关系类型分布', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '50%'],
        data: relationData.map(([name, value], index) => ({
          name,
          value,
          itemStyle: {
            color: ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f43f5e', '#a855f7', '#14b8a6'][index]
          }
        })),
        label: { show: true, formatter: '{b}: {c}', fontSize: 10 },
        itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 类型分布图
  useEffect(() => {
    if (!typeChartRef.current) return;
    const chart = echarts.init(typeChartRef.current);

    const option = {
      title: { text: '节点类型统计', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: Object.values(typeLabels),
        axisLabel: { fontSize: 10 }
      },
      yAxis: { type: 'value' },
      series: [{
        type: 'bar',
        data: [
          stats.policyCount,
          stats.businessCount,
          stats.metricCount,
          stats.conceptCount,
          0
        ],
        itemStyle: {
          color: (params: any) => Object.values(typeColors)[params.dataIndex]
        },
        barWidth: 30,
        label: { show: true, position: 'top', fontSize: 12 }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, [stats]);

  // 深度分布图
  useEffect(() => {
    if (!depthChartRef.current) return;
    const chart = echarts.init(depthChartRef.current);

    // 计算节点深度
    const depthCounts = { 1: stats.policyCount, 2: stats.businessCount, 3: stats.metricCount + stats.conceptCount };

    const option = {
      title: { text: '知识层级深度', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['政策层', '业务层', '指标层'],
        axisLabel: { fontSize: 11 }
      },
      yAxis: { type: 'value', name: '节点数' },
      series: [{
        type: 'line',
        data: [depthCounts[1], depthCounts[2], depthCounts[3]],
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: { width: 3, color: '#3b82f6' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.4)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
          ])
        },
        itemStyle: { color: '#3b82f6' }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, [stats]);

  // 获取选中节点的关联节点
  const getRelatedNodes = () => {
    if (!selectedNode) return [];
    return graphData.links
      .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
      .map(link => {
        const relatedId = link.source === selectedNode.id ? link.target : link.source;
        const relatedNode = graphData.nodes.find(n => n.id === relatedId);
        return {
          node: relatedNode,
          relation: link.relation,
          direction: link.source === selectedNode.id ? 'out' : 'in',
          weight: link.weight
        };
      })
      .filter(item => item.node)
      .sort((a, b) => (b.weight || 0) - (a.weight || 0));
  };

  const relatedNodes = getRelatedNodes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* 顶部标题栏 */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-6 px-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Network className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">政策业务知识图谱</h1>
              <p className="text-purple-100 mt-1">政策→业务→指标 多层级语义关联网络</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLayoutType('force')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                layoutType === 'force' ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>力导向布局</span>
            </button>
            <button
              onClick={() => setLayoutType('circular')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                layoutType === 'circular' ? 'bg-white/30' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>环形布局</span>
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
              <RefreshCw className="w-4 h-4" />
              <span>刷新图谱</span>
            </button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalNodes}</div>
                <div className="text-sm text-gray-500">节点总数</div>
              </div>
              <Database className="w-8 h-8 text-purple-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalLinks}</div>
                <div className="text-sm text-gray-500">关系总数</div>
              </div>
              <Link2 className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.policyCount}</div>
                <div className="text-sm text-gray-500">政策节点</div>
              </div>
              <BookOpen className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.businessCount}</div>
                <div className="text-sm text-gray-500">业务节点</div>
              </div>
              <Target className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.metricCount}</div>
                <div className="text-sm text-gray-500">指标节点</div>
              </div>
              <Activity className="w-8 h-8 text-pink-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.conceptCount}</div>
                <div className="text-sm text-gray-500">概念节点</div>
              </div>
              <Lightbulb className="w-8 h-8 text-indigo-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧：搜索和筛选 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 搜索 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-800">搜索节点</span>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="输入节点名称..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* 类型筛选 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="font-medium text-gray-800">类型筛选</span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="filter"
                    checked={filterType === 'all'}
                    onChange={() => setFilterType('all')}
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-sm text-gray-700">全部类型</span>
                </label>
                {Object.entries(typeLabels).map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="filter"
                      checked={filterType === key}
                      onChange={() => setFilterType(key)}
                      className="w-4 h-4 text-purple-600"
                    />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: typeColors[key] }} />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 选中节点详情 */}
            {selectedNode && (
              <div className="bg-white rounded-xl shadow-sm p-4 border-2 border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-gray-800">节点详情</span>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: typeColors[selectedNode.type] }}
                    >
                      <Tag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{selectedNode.name}</div>
                      <div className="text-sm text-gray-500">{typeLabels[selectedNode.type]}</div>
                    </div>
                  </div>
                  {selectedNode.description && (
                    <div className="text-sm text-gray-600 mb-3">
                      {selectedNode.description}
                    </div>
                  )}
                  {relatedNodes.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">关联节点 ({relatedNodes.length})</div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {relatedNodes.slice(0, 10).map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm bg-white p-2 rounded">
                            <ChevronRight className={`w-4 h-4 ${item.direction === 'out' ? 'text-blue-400' : 'text-green-400'}`} />
                            <span className="text-gray-600">{item.node?.name}</span>
                            <span className="text-gray-400">-</span>
                            <span className="text-purple-600">{item.relation}</span>
                            {item.weight && (
                              <span className={`ml-auto px-1.5 py-0.5 rounded text-xs ${
                                item.weight >= 7 ? 'bg-red-100 text-red-700' :
                                item.weight >= 5 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                强度{item.weight}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 辅助图表 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={relationChartRef} className="w-full h-32" />
            </div>
          </div>

          {/* 中间：主图谱 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* 控制按钮 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      if (mainChartRef.current) {
                        const chart = echarts.getInstanceByDom(mainChartRef.current);
                        chart?.dispatchAction({ type: 'dataZoom', start: 0, end: 80 });
                      }
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="缩小"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (mainChartRef.current) {
                        const chart = echarts.getInstanceByDom(mainChartRef.current);
                        chart?.dispatchAction({ type: 'dataZoom', start: 20, end: 100 });
                      }
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="放大"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      if (mainChartRef.current) {
                        const chart = echarts.getInstanceByDom(mainChartRef.current);
                        chart?.dispatchAction({ type: 'restore' });
                      }
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="重置"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <GitBranch className="w-4 h-4" />
                  <span>当前显示: {filteredNodes.length}节点 | {filteredLinks.length}关系</span>
                </div>
              </div>

              {/* 图谱区域 */}
              <div ref={mainChartRef} className="w-full h-[500px]" />
            </div>

            {/* 类型统计图 */}
            <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
              <div ref={typeChartRef} className="w-full h-32" />
            </div>
          </div>

          {/* 右侧：深度分析 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 深度分布 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={depthChartRef} className="w-full h-32" />
            </div>

            {/* 高影响关系 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-gray-800">高影响关系</h3>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {graphData.links
                  .filter(link => link.weight && link.weight >= 7)
                  .sort((a, b) => (b.weight || 0) - (a.weight || 0))
                  .slice(0, 10)
                  .map((link, index) => {
                    const sourceNode = graphData.nodes.find(n => n.id === link.source);
                    const targetNode = graphData.nodes.find(n => n.id === link.target);
                    return (
                      <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded-lg">
                        <span className="text-sm text-gray-700 truncate">{sourceNode?.name}</span>
                        <ChevronRight className="w-3 h-3 text-red-400" />
                        <span className="text-sm text-gray-700 truncate">{targetNode?.name}</span>
                        <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                          {link.weight}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* 知识层级说明 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-gray-800">知识层级结构</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">政策层</div>
                    <div className="text-sm text-gray-500">政策文件、法规条文</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">业务层</div>
                    <div className="text-sm text-gray-500">水电、火电、新能源等板块</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">指标层</div>
                    <div className="text-sm text-gray-500">利润、成本、电价等指标</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 快速操作 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-800">图谱操作</h3>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 transition">
                  <GitBranch className="w-4 h-4" />
                  <span className="text-sm">展开全部节点</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">查看路径分析</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 transition">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">导出图谱数据</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}