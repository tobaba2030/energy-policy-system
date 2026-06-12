import { useState, useEffect, useRef } from 'react';
import {
  FileText, AlertTriangle, TrendingUp, Calendar, Building, Tag,
  Search, Filter, Bell, Clock, ChevronRight, BarChart3,
  Network, Zap, Target, BookOpen, RefreshCw, Download
} from 'lucide-react';
import * as echarts from 'echarts';
import {
  policyBusinessImpacts,
  BusinessUnitLabels,
  ImpactTypeLabels,
  ImpactTimingLabels,
  BusinessUnit,
  PolicyWithBusinessImpact
} from '@/data/businessImpactData';

// 政策状态颜色映射
const statusColors: Record<string, string> = {
  pending: 'bg-gray-100 text-gray-700 border-gray-200',
  analyzing: 'bg-blue-100 text-blue-700 border-blue-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  archived: 'bg-purple-100 text-purple-700 border-purple-200'
};

const statusLabels: Record<string, string> = {
  pending: '待分析',
  analyzing: '分析中',
  completed: '已完成',
  archived: '已归档'
};

// 影响等级颜色
const impactLevelColors: Record<number, string> = {
  9: 'bg-red-500',
  8: 'bg-red-400',
  7: 'bg-orange-400',
  6: 'bg-orange-300',
  5: 'bg-yellow-400',
  4: 'bg-yellow-300',
  3: 'bg-green-300',
  2: 'bg-green-200',
  1: 'bg-green-100'
};

export default function PolicyIntelligenceEnhanced() {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyWithBusinessImpact | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterBusiness, setFilterBusiness] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'impact'>('date');

  // ECharts refs
  const timelineChartRef = useRef<HTMLDivElement>(null);
  const matrixChartRef = useRef<HTMLDivElement>(null);
  const keywordChartRef = useRef<HTMLDivElement>(null);
  const statusChartRef = useRef<HTMLDivElement>(null);

  // 筛选后的政策列表
  const filteredPolicies = policyBusinessImpacts.filter(policy => {
    const matchesSearch = searchTerm === '' ||
      policy.title.includes(searchTerm) ||
      policy.keywords.some(k => k.includes(searchTerm));
    const matchesStatus = filterStatus === 'all' || policy.status === filterStatus;
    const matchesBusiness = filterBusiness === 'all' ||
      policy.businessImpacts.some(impact => impact.businessUnit === filterBusiness);
    return matchesSearch && matchesStatus && matchesBusiness;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    } else {
      const maxImpactA = Math.max(...a.businessImpacts.map(i => i.impactScore));
      const maxImpactB = Math.max(...b.businessImpacts.map(i => i.impactScore));
      return maxImpactB - maxImpactA;
    }
  });

  // 统计数据
  const stats = {
    total: policyBusinessImpacts.length,
    pending: policyBusinessImpacts.filter(p => p.status === 'pending').length,
    analyzing: policyBusinessImpacts.filter(p => p.status === 'analyzing').length,
    completed: policyBusinessImpacts.filter(p => p.status === 'completed').length,
    archived: policyBusinessImpacts.filter(p => p.status === 'archived').length,
    highImpact: policyBusinessImpacts.filter(p =>
      p.businessImpacts.some(i => i.impactScore >= 7)
    ).length
  };

  // 初始化时间轴图表
  useEffect(() => {
    if (!timelineChartRef.current) return;
    const chart = echarts.init(timelineChartRef.current);

    const timelineData = policyBusinessImpacts.map(p => ({
      name: p.title.slice(0, 20) + '...',
      value: [p.releaseDate, Math.max(...p.businessImpacts.map(i => i.impactScore))],
      itemStyle: {
        color: p.businessImpacts.some(i => i.impactScore >= 7) ? '#ef4444' :
               p.businessImpacts.some(i => i.impactScore >= 5) ? '#f97316' : '#22c55e'
      }
    }));

    const option = {
      title: { text: '政策影响时间轴', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => `${params.data.name}<br/>影响强度: ${params.data.value[1]}`
      },
      grid: { left: 60, right: 40, top: 40, bottom: 30 },
      xAxis: {
        type: 'category',
        data: policyBusinessImpacts.map(p => p.releaseDate.slice(5)),
        axisLabel: { fontSize: 10, rotate: 45 }
      },
      yAxis: { type: 'value', name: '影响强度', min: 0, max: 10 },
      series: [{
        type: 'line',
        data: timelineData.map(d => d.value[1]),
        smooth: true,
        symbol: 'circle',
        symbolSize: 12,
        lineStyle: { width: 3, color: '#3b82f6' },
        itemStyle: {
          color: (params: any) => {
            const score = params.value;
            return score >= 7 ? '#ef4444' : score >= 5 ? '#f97316' : '#22c55e';
          }
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
          ])
        }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 初始化政策-业务影响矩阵
  useEffect(() => {
    if (!matrixChartRef.current) return;
    const chart = echarts.init(matrixChartRef.current);

    const businessUnits: BusinessUnit[] = ['hydro', 'thermal', 'renewable', 'gas', 'comprehensive', 'carbon'];
    const policies = policyBusinessImpacts.slice(0, 8);

    const matrixData: [number, number, number][] = [];
    policies.forEach((policy, pIdx) => {
      businessUnits.forEach((unit, uIdx) => {
        const impact = policy.businessImpacts.find(i => i.businessUnit === unit);
        matrixData.push([uIdx, pIdx, impact ? impact.impactScore : 0]);
      });
    });

    const option = {
      title: { text: '政策-业务影响热力矩阵', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          const policy = policies[params.data[1]];
          const unit = businessUnits[params.data[0]];
          const impact = policy.businessImpacts.find(i => i.businessUnit === unit);
          return impact
            ? `${policy.title.slice(0, 15)}...<br/>${BusinessUnitLabels[unit]}<br/>影响强度: ${impact.impactScore}`
            : `${policy.title.slice(0, 15)}...<br/>${BusinessUnitLabels[unit]}<br/>无直接影响`;
        }
      },
      grid: { left: 100, right: 40, top: 40, bottom: 80 },
      xAxis: {
        type: 'category',
        data: policies.map(p => p.releaseDate.slice(5)),
        axisLabel: { fontSize: 10, rotate: 45 },
        splitArea: { show: true }
      },
      yAxis: {
        type: 'category',
        data: businessUnits.map(u => BusinessUnitLabels[u]),
        axisLabel: { fontSize: 11 },
        splitArea: { show: true }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 10,
        inRange: {
          color: ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0284c7', '#075985', '#0c4a6e']
        }
      },
      series: [{
        type: 'heatmap',
        data: matrixData,
        label: { show: true, fontSize: 10, formatter: (params: any) => params.data[2] || '-' },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
        }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 初始化关键词网络图
  useEffect(() => {
    if (!keywordChartRef.current) return;
    const chart = echarts.init(keywordChartRef.current);

    // 提取关键词
    const keywordMap = new Map<string, number>();
    policyBusinessImpacts.forEach(p => {
      p.keywords.forEach(k => {
        keywordMap.set(k, (keywordMap.get(k) || 0) + 1);
      });
    });

    const keywords = Array.from(keywordMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15);

    const wordCloudData = keywords.map(([word, count]) => ({
      name: word,
      value: count,
      textStyle: {
        color: count >= 3 ? '#ef4444' : count >= 2 ? '#f97316' : '#3b82f6'
      }
    }));

    const option = {
      title: { text: '政策关键词热度', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { formatter: (params: any) => `${params.name}: ${params.value}次` },
      series: [{
        type: 'treemap',
        data: wordCloudData.map(d => ({
          name: d.name,
          value: d.value * 10,
          itemStyle: { color: d.textStyle.color }
        })),
        roam: false,
        nodeClick: false,
        breadcrumb: { show: false },
        label: { show: true, fontSize: 12, fontWeight: 'bold' },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2,
          gapWidth: 2
        }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 初始化状态流转图
  useEffect(() => {
    if (!statusChartRef.current) return;
    const chart = echarts.init(statusChartRef.current);

    const option = {
      title: { text: '政策分析状态分布', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, orient: 'horizontal' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}: {c}' },
        data: [
          { value: stats.pending, name: '待分析', itemStyle: { color: '#94a3b8' } },
          { value: stats.analyzing, name: '分析中', itemStyle: { color: '#3b82f6' } },
          { value: stats.completed, name: '已完成', itemStyle: { color: '#22c55e' } },
          { value: stats.archived, name: '已归档', itemStyle: { color: '#8b5cf6' } }
        ]
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, [stats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* 顶部标题栏 */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-6 px-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">政策情报智能解析中心</h1>
              <p className="text-blue-100 mt-1">政策→业务影响→量化推演 全链条分析</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
              <RefreshCw className="w-4 h-4" />
              <span>刷新数据</span>
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition">
              <Download className="w-4 h-4" />
              <span>导出报告</span>
            </button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-500">政策总数</div>
              </div>
              <FileText className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-gray-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.pending}</div>
                <div className="text-sm text-gray-500">待分析</div>
              </div>
              <Clock className="w-8 h-8 text-gray-400 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-400">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.analyzing}</div>
                <div className="text-sm text-gray-500">分析中</div>
              </div>
              <Zap className="w-8 h-8 text-blue-400 opacity-50 animate-pulse" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
                <div className="text-sm text-gray-500">已完成</div>
              </div>
              <Target className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.highImpact}</div>
                <div className="text-sm text-gray-500">高影响政策</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧：政策列表 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* 搜索和筛选 */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="搜索政策标题或关键词..."
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部状态</option>
                    <option value="pending">待分析</option>
                    <option value="analyzing">分析中</option>
                    <option value="completed">已完成</option>
                  </select>
                  <select
                    value={filterBusiness}
                    onChange={(e) => setFilterBusiness(e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">全部板块</option>
                    {Object.entries(BusinessUnitLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm text-gray-500">排序:</span>
                  <button
                    onClick={() => setSortBy('date')}
                    className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'date' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                  >
                    按日期
                  </button>
                  <button
                    onClick={() => setSortBy('impact')}
                    className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'impact' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
                  >
                    按影响
                  </button>
                </div>
              </div>

              {/* 政策列表 */}
              <div className="max-h-[600px] overflow-y-auto">
                {filteredPolicies.map(policy => {
                  const maxImpact = Math.max(...policy.businessImpacts.map(i => i.impactScore));
                  return (
                    <div
                      key={policy.id}
                      onClick={() => setSelectedPolicy(policy)}
                      className={`p-4 border-b border-gray-50 cursor-pointer transition-all hover:bg-blue-50 ${
                        selectedPolicy?.id === policy.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-800 text-sm line-clamp-2">{policy.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[policy.status]}`}>
                          {statusLabels[policy.status]}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Calendar className="w-3 h-3" />
                        <span>{policy.releaseDate}</span>
                        <Building className="w-3 h-3 ml-2" />
                        <span className="truncate">{policy.authority}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${impactLevelColors[maxImpact]}`} />
                        <span className="text-xs text-gray-600">影响强度: {maxImpact}</span>
                        <span className="text-xs text-gray-400 ml-auto">
                          {policy.businessImpacts.length}个板块
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 中间：政策详情和图表 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 政策详情卡片 */}
            {selectedPolicy ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h2 className="text-lg font-semibold text-gray-800">政策智能解析</h2>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm border ${statusColors[selectedPolicy.status]}`}>
                    {statusLabels[selectedPolicy.status]}
                  </span>
                </div>

                <div className="border-b border-gray-100 pb-4 mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{selectedPolicy.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      {selectedPolicy.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {selectedPolicy.authority}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                      {selectedPolicy.releaseDate}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
                      {ImpactTimingLabels[selectedPolicy.impactTiming]}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 leading-relaxed">{selectedPolicy.summary}</p>
                </div>

                {/* 关键词 */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">关键词</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedPolicy.keywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 业务影响清单 */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-gray-800">业务影响清单</h4>
                  </div>
                  <div className="space-y-3">
                    {selectedPolicy.businessImpacts.map((impact, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-medium">
                              {BusinessUnitLabels[impact.businessUnit]}
                            </span>
                            <span className="text-sm font-medium text-gray-700">{impact.impactPath}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${impactLevelColors[impact.impactScore]}`} />
                            <span className="text-sm text-gray-600">强度: {impact.impactScore}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-500">
                            参数: <span className="text-gray-700 font-medium">{impact.quantitativeEffect.parameter}</span>
                          </span>
                          <span className={`font-semibold ${
                            impact.quantitativeEffect.changeDirection === 'increase' ? 'text-green-600' :
                            impact.quantitativeEffect.changeDirection === 'decrease' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {impact.quantitativeEffect.estimatedMagnitude}
                          </span>
                          <span className="text-gray-400">生效: {impact.quantitativeEffect.effectiveYear}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">受影响指标:</span>
                          {impact.affectedMetrics.map((metric, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                              {metric}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-gray-400">置信度: {(impact.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-center h-64">
                <div className="text-center text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>请从左侧列表选择一条政策查看详情</p>
                </div>
              </div>
            )}

            {/* 时间轴图表 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={timelineChartRef} className="w-full h-48" />
            </div>

            {/* 政策-业务影响矩阵 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={matrixChartRef} className="w-full h-64" />
            </div>
          </div>

          {/* 右侧：辅助图表 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 关键词热度 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={keywordChartRef} className="w-full h-48" />
            </div>

            {/* 状态分布 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={statusChartRef} className="w-full h-48" />
            </div>

            {/* 快速操作 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-gray-800">快速操作</h3>
              </div>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition">
                  <Bell className="w-4 h-4" />
                  <span className="text-sm">设置政策预警</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 transition">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">启动业务推演</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 transition">
                  <Network className="w-4 h-4" />
                  <span className="text-sm">查看知识图谱</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 transition">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">生成影响报告</span>
                </button>
              </div>
            </div>

            {/* 影响时效分布 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-800">影响时效分布</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(ImpactTimingLabels).map(([key, label]) => {
                  const count = policyBusinessImpacts.filter(p => p.impactTiming === key).length;
                  const percent = (count / policyBusinessImpacts.length * 100).toFixed(0);
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}