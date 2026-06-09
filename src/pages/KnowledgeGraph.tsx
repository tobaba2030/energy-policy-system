import { useState, useEffect, useRef } from 'react';
import { Network, Search, Filter, ZoomIn, ZoomOut, Maximize2, Database, BookOpen, Link2, Tag } from 'lucide-react';
import * as echarts from 'echarts';

interface KnowledgeNode {
  id: string;
  name: string;
  type: 'policy' | 'technology' | 'concept' | 'region' | 'target';
  x?: number;
  y?: number;
}

interface KnowledgeLink {
  source: string;
  target: string;
  relation: string;
}

const knowledgeNodes: KnowledgeNode[] = [
  { id: 'p1', name: '碳达峰行动方案', type: 'policy' },
  { id: 'p2', name: '碳中和政策', type: 'policy' },
  { id: 'p3', name: '新能源发展规划', type: 'policy' },
  { id: 't1', name: '光伏技术', type: 'technology' },
  { id: 't2', name: '风电技术', type: 'technology' },
  { id: 't3', name: '储能技术', type: 'technology' },
  { id: 'c1', name: '能源转型', type: 'concept' },
  { id: 'c2', name: '低碳发展', type: 'concept' },
  { id: 'c3', name: '绿色能源', type: 'concept' },
  { id: 'r1', name: '华北区域', type: 'region' },
  { id: 'r2', name: '西北区域', type: 'region' },
  { id: 'r3', name: '华东区域', type: 'region' },
  { id: 'g1', name: '碳达峰目标', type: 'target' },
  { id: 'g2', name: '碳中和目标', type: 'target' },
  { id: 'g3', name: '可再生能源占比', type: 'target' }
];

const knowledgeLinks: KnowledgeLink[] = [
  { source: 'p1', target: 'c1', relation: '推动' },
  { source: 'p1', target: 'g1', relation: '包含' },
  { source: 'p2', target: 'c2', relation: '引领' },
  { source: 'p2', target: 'g2', relation: '包含' },
  { source: 'p3', target: 'c3', relation: '促进' },
  { source: 't1', target: 'c3', relation: '属于' },
  { source: 't2', target: 'c3', relation: '属于' },
  { source: 't3', target: 'c1', relation: '支撑' },
  { source: 'c1', target: 'c2', relation: '关联' },
  { source: 'r1', target: 'p1', relation: '适用' },
  { source: 'r2', target: 'p3', relation: '重点' },
  { source: 'r3', target: 'p2', relation: '先行' },
  { source: 'g1', target: 'g2', relation: '衔接' },
  { source: 'g3', target: 'c1', relation: '衡量' },
  { source: 'p3', target: 't1', relation: '支持' },
  { source: 'p3', target: 't2', relation: '支持' }
];

const typeColors: Record<string, string> = {
  policy: '#3b82f6',
  technology: '#22c55e',
  concept: '#8b5cf6',
  region: '#f97316',
  target: '#ef4444'
};

const typeLabels: Record<string, string> = {
  policy: '政策',
  technology: '技术',
  concept: '概念',
  region: '区域',
  target: '目标'
};

export default function KnowledgeGraph() {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const filteredNodes = knowledgeNodes.filter(node => {
      const matchesSearch = searchTerm === '' || node.name.includes(searchTerm);
      const matchesFilter = filterType === 'all' || node.type === filterType;
      return matchesSearch && matchesFilter;
    });

    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = knowledgeLinks.filter(
      link => filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target)
    );

    const option: echarts.EChartsOption = {
      title: {
        text: '能源知识图谱',
        left: 'center',
        textStyle: {
          color: '#1e293b',
          fontSize: 16,
          fontWeight: 600
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            return `<div><strong>${params.name}</strong><br/>类型: ${typeLabels[params.data.type]}</div>`;
          } else if (params.dataType === 'edge') {
            return `<div>关系: ${params.data.relation}</div>`;
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
        textStyle: { color: '#64748b' }
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: filteredNodes.map(node => ({
            id: node.id,
            name: node.name,
            symbolSize: 40,
            category: typeLabels[node.type],
            itemStyle: {
              color: typeColors[node.type],
              borderColor: '#fff',
              borderWidth: 3
            },
            label: {
              show: true,
              fontSize: 12,
              color: '#374151'
            },
            type: node.type
          })),
          links: filteredLinks.map(link => ({
            source: link.source,
            target: link.target,
            label: {
              show: true,
              formatter: link.relation,
              fontSize: 10,
              color: '#64748b'
            },
            lineStyle: {
              color: '#cbd5e1',
              width: 2,
              curveness: 0.2
            },
            relation: link.relation
          })),
          categories: Object.entries(typeLabels).map(([key, label]) => ({
            name: label,
            itemStyle: { color: typeColors[key] }
          })),
          roam: true,
          draggable: true,
          force: {
            repulsion: 400,
            gravity: 0.1,
            edgeLength: [80, 200]
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 4
            },
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    chartInstance.current.setOption(option, true);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [searchTerm, filterType]);

  const handleNodeClick = (node: KnowledgeNode) => {
    setSelectedNode(node);
  };

  const relatedNodes = selectedNode
    ? knowledgeLinks
        .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
        .map(link => {
          const relatedId = link.source === selectedNode.id ? link.target : link.source;
          return {
            node: knowledgeNodes.find(n => n.id === relatedId),
            relation: link.relation,
            direction: link.source === selectedNode.id ? 'target' : 'source'
          };
        })
        .filter(item => item.node)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-6 px-8">
        <div className="flex items-center gap-3">
          <Network className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">能源知识图谱</h1>
            <p className="text-purple-100 mt-1">分级分类知识库与语义推理能力展示</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
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

            {selectedNode && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-800">节点详情</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
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
                  {relatedNodes.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">关联关系</div>
                      <div className="space-y-2">
                        {relatedNodes.map((item, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Link2 className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{item.node?.name}</span>
                            <span className="text-gray-400">-</span>
                            <span className="text-purple-600">{item.relation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => chartInstance.current?.dispatchAction({ type: 'dataZoom', start: 0, end: 80 })}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="缩小"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => chartInstance.current?.dispatchAction({ type: 'dataZoom', start: 20, end: 100 })}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="放大"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => chartInstance.current?.dispatchAction({ type: 'restore' })}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                    title="重置"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Database className="w-4 h-4" />
                  <span>节点: {knowledgeNodes.length} | 关系: {knowledgeLinks.length}</span>
                </div>
              </div>
              <div ref={chartRef} className="w-full h-96" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              {Object.entries(typeLabels).map(([key, label]) => {
                const count = knowledgeNodes.filter(n => n.type === key).length;
                return (
                  <div
                    key={key}
                    className="bg-white rounded-xl shadow-sm p-4 text-center"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2"
                      style={{ backgroundColor: typeColors[key] }}
                    >
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{count}</div>
                    <div className="text-sm text-gray-500">{label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}