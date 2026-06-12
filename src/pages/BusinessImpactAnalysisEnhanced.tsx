/**
 * 业务影响分析增强版
 * 政策对业务板块的影响矩阵、影响详情、影响日历、多维度可视化分析
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, TrendingUp, TrendingDown, AlertTriangle,
  Flame, Wind, Droplets, Zap, Building2, Activity,
  ChevronRight, Calendar, Filter, Search, RefreshCw,
  Download, Target, Clock, Layers, PieChart, LineChart,
  ScatterChart, Network, Sparkles, Info, Lightbulb
} from 'lucide-react';
import * as echarts from 'echarts';
import {
  policyBusinessImpacts, BusinessUnitLabels, BusinessUnit,
  businessAssets, ImpactTimingLabels, ImpactTiming,
  businessSegments, businessMetricHistory
} from '@/data/businessImpactData';

// 业务板块图标
const BusinessIcons: Record<BusinessUnit, React.ReactNode> = {
  hydro: <Droplets className="w-4 h-4" />,
  thermal: <Flame className="w-4 h-4" />,
  renewable: <Wind className="w-4 h-4" />,
  gas: <Zap className="w-4 h-4" />,
  comprehensive: <Building2 className="w-4 h-4" />,
  carbon: <Activity className="w-4 h-4" />
};

// 影响强度颜色
const getImpactColor = (score: number) => {
  if (score >= 8) return 'bg-red-500 text-white';
  if (score >= 6) return 'bg-orange-400 text-white';
  if (score >= 4) return 'bg-yellow-300 text-gray-800';
  if (score >= 2) return 'bg-blue-200 text-gray-800';
  return 'bg-gray-100 text-gray-600';
};

// 影响等级颜色映射
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

export default function BusinessImpactAnalysisEnhanced() {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<BusinessUnit | 'all'>('all');
  const [selectedTiming, setSelectedTiming] = useState<ImpactTiming | 'all'>('all');
  const [selectedSegment, setSelectedSegment] = useState<BusinessUnit>('thermal');

  // ECharts refs
  const heatmapRef = useRef<HTMLDivElement>(null);
  const sankeyRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);

  // 过滤政策
  const filteredPolicies = policyBusinessImpacts.filter(policy => {
    if (selectedUnit !== 'all' && !policy.businessImpacts.some(i => i.businessUnit === selectedUnit)) return false;
    if (selectedTiming !== 'all' && policy.impactTiming !== selectedTiming) return false;
    return true;
  });

  // 统计数据
  const stats = {
    totalPolicies: policyBusinessImpacts.length,
    highImpact: policyBusinessImpacts.flatMap(p => p.businessImpacts).filter(i => i.impactScore >= 8).length,
    mediumImpact: policyBusinessImpacts.flatMap(p => p.businessImpacts).filter(i => i.impactScore >= 5 && i.impactScore < 8).length,
    lowImpact: policyBusinessImpacts.flatMap(p => p.businessImpacts).filter(i => i.impactScore < 5).length,
    affectedUnits: new Set(policyBusinessImpacts.flatMap(p => p.businessImpacts.map(i => i.businessUnit))).size,
    avgConfidence: (policyBusinessImpacts.flatMap(p => p.businessImpacts).reduce((sum, i) => sum + i.confidence, 0) /
      policyBusinessImpacts.flatMap(p => p.businessImpacts).length * 100).toFixed(0),
    immediateCount: policyBusinessImpacts.filter(p => p.impactTiming === 'immediate').length,
    shortTermCount: policyBusinessImpacts.filter(p => p.impactTiming === 'short_term').length,
    mediumTermCount: policyBusinessImpacts.filter(p => p.impactTiming === 'medium_term').length,
    longTermCount: policyBusinessImpacts.filter(p => p.impactTiming === 'long_term').length
  };

  // 按生效时间排序的影响事件
  const allImpacts = policyBusinessImpacts.flatMap(policy =>
    policy.businessImpacts.map(impact => ({ policy, impact }))
  ).sort((a, b) =>
    parseInt(a.impact.quantitativeEffect.effectiveYear) - parseInt(b.impact.quantitativeEffect.effectiveYear)
  );

  // 初始化热力图
  useEffect(() => {
    if (!heatmapRef.current) return;
    const chart = echarts.init(heatmapRef.current);

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
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 初始化桑基图（政策→业务板块→影响类型流向）
  useEffect(() => {
    if (!sankeyRef.current) return;
    const chart = echarts.init(sankeyRef.current);

    // 构建桑基图数据
    const policyNodes = policyBusinessImpacts.slice(0, 5).map(p => ({ name: p.title.slice(0, 10) + '...', depth: 0 }));
    const businessNodes = Object.entries(BusinessUnitLabels).map(([key, label]) => ({ name: label, depth: 1 }));
    const impactTypeNodes = ['量价影响', '成本影响', '投资影响', '补贴收益'].map(name => ({ name, depth: 2 }));

    const nodes = [...policyNodes, ...businessNodes, ...impactTypeNodes];

    const links: { source: string; target: string; value: number }[] = [];
    policyBusinessImpacts.slice(0, 5).forEach(policy => {
      policy.businessImpacts.forEach(impact => {
        links.push({
          source: policy.title.slice(0, 10) + '...',
          target: BusinessUnitLabels[impact.businessUnit],
          value: impact.impactScore
        });
        links.push({
          source: BusinessUnitLabels[impact.businessUnit],
          target: impact.quantitativeEffect.changeDirection === 'increase' ? '量价影响' : '成本影响',
          value: impact.impactScore * 0.5
        });
      });
    });

    const option = {
      title: { text: '政策→业务→影响类型 流向图', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'item', formatter: (params: any) => `${params.data.source} → ${params.data.target}<br/>强度: ${params.data.value}` },
      series: [{
        type: 'sankey',
        layoutIterations: 32,
        emphasis: { focus: 'adjacency' },
        nodeAlign: 'left',
        lineStyle: { color: 'gradient', curveness: 0.5 },
        data: nodes,
        links: links,
        label: { position: 'right', fontSize: 11 },
        itemStyle: { borderWidth: 1, borderColor: '#aaa' }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 初始化雷达图（各业务板块影响维度）
  useEffect(() => {
    if (!radarRef.current) return;
    const chart = echarts.init(radarRef.current);

    const indicators = [
      { name: '政策敏感度', max: 10 },
      { name: '收益影响', max: 10 },
      { name: '成本压力', max: 10 },
      { name: '投资需求', max: 10 },
      { name: '风险等级', max: 10 }
    ];

    const segmentData = businessSegments.map(segment => {
      const impacts = policyBusinessImpacts.flatMap(p => p.businessImpacts).filter(i => i.businessUnit === segment.id);
      const avgScore = impacts.length > 0 ? impacts.reduce((sum, i) => sum + i.impactScore, 0) / impacts.length : 0;
      return {
        name: segment.name,
        value: [
          avgScore * 0.8,
          avgScore * 0.9,
          avgScore * 0.6,
          avgScore * 0.5,
          avgScore * 0.7
        ]
      };
    });

    const option = {
      title: { text: '业务板块影响维度雷达图', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'item' },
      legend: { bottom: 10, orient: 'horizontal', data: segmentData.map(d => d.name) },
      radar: {
        indicator: indicators,
        radius: '60%',
        center: ['50%', '50%'],
        axisName: { color: '#333', fontSize: 11 },
        splitArea: { areaStyle: { color: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc'] } }
      },
      series: [{
        type: 'radar',
        data: segmentData.map((d, i) => ({
          ...d,
          itemStyle: { color: ['#3b82f6', '#ef4444', '#22c55e', '#f97316', '#8b5cf6', '#06b6d4'][i] },
          areaStyle: { opacity: 0.3 }
        }))
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 初始化散点图（影响强度 vs 置信度）
  useEffect(() => {
    if (!scatterRef.current) return;
    const chart = echarts.init(scatterRef.current);

    const scatterData = policyBusinessImpacts.flatMap(policy =>
      policy.businessImpacts.map(impact => ({
        name: `${policy.title.slice(0, 8)}...-${BusinessUnitLabels[impact.businessUnit]}`,
        value: [impact.confidence * 100, impact.impactScore],
        itemStyle: {
          color: impact.impactScore >= 8 ? '#ef4444' :
                 impact.impactScore >= 5 ? '#f97316' : '#22c55e'
        }
      }))
    );

    const option = {
      title: { text: '影响强度 vs 置信度分布', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: {
        formatter: (params: any) => `${params.data.name}<br/>置信度: ${params.data.value[0]}%<br/>影响强度: ${params.data.value[1]}`
      },
      grid: { left: 60, right: 40, top: 40, bottom: 40 },
      xAxis: {
        type: 'value',
        name: '置信度 (%)',
        nameLocation: 'middle',
        nameGap: 30,
        min: 50,
        max: 100
      },
      yAxis: {
        type: 'value',
        name: '影响强度',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 10
      },
      series: [{
        type: 'scatter',
        data: scatterData,
        symbolSize: 12,
        emphasis: {
          focus: 'self',
          itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' }
        }
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  // 初始化时间轴图表
  useEffect(() => {
    if (!timelineRef.current) return;
    const chart = echarts.init(timelineRef.current);

    const timelineData = policyBusinessImpacts.map(p => ({
      name: p.title.slice(0, 15) + '...',
      value: [p.releaseDate, Math.max(...p.businessImpacts.map(i => i.impactScore))],
      itemStyle: {
        color: p.businessImpacts.some(i => i.impactScore >= 7) ? '#ef4444' :
               p.businessImpacts.some(i => i.impactScore >= 5) ? '#f97316' : '#22c55e'
      }
    }));

    const option = {
      title: { text: '政策影响强度时间轴', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => `${params.data.name}<br/>发布日期: ${params.data.value[0]}<br/>最大影响: ${params.data.value[1]}`
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

  // 初始化影响等级分布饼图
  useEffect(() => {
    if (!pieRef.current) return;
    const chart = echarts.init(pieRef.current);

    const option = {
      title: { text: '影响等级分布', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { bottom: 10, orient: 'horizontal' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}: {c}' },
        data: [
          { value: stats.highImpact, name: '高影响(≥8)', itemStyle: { color: '#ef4444' } },
          { value: stats.mediumImpact, name: '中影响(5-7)', itemStyle: { color: '#f97316' } },
          { value: stats.lowImpact, name: '低影响(<5)', itemStyle: { color: '#22c55e' } }
        ]
      }]
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, [stats]);

  // 初始化业务板块趋势图
  useEffect(() => {
    if (!trendRef.current) return;
    const chart = echarts.init(trendRef.current);

    const years = [2022, 2023, 2024, 2025];
    const segments = ['thermal', 'hydro', 'renewable'] as BusinessUnit[];

    const seriesData = segments.map(segment => {
      const data = businessMetricHistory
        .filter(d => d.segmentId === segment)
        .map(d => d.profit);
      return {
        name: BusinessUnitLabels[segment],
        type: 'line',
        data: data,
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { width: 2 }
      };
    });

    const option = {
      title: { text: '主要板块利润趋势', left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
      legend: { bottom: 10, orient: 'horizontal', data: segments.map(s => BusinessUnitLabels[s]) },
      grid: { left: 60, right: 40, top: 40, bottom: 40 },
      xAxis: { type: 'category', data: years },
      yAxis: { type: 'value', name: '利润(万元)' },
      series: seriesData.map((s, i) => ({
        ...s,
        itemStyle: { color: ['#ef4444', '#3b82f6', '#22c55e'][i] },
        areaStyle: { opacity: 0.1 }
      }))
    };

    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
    return () => window.removeEventListener('resize', () => chart.resize());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 顶部标题栏 */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-6 px-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">政策业务影响分析增强版</h1>
              <p className="text-purple-100 mt-1">政策条款的业务影响拆解与多维度可视化分析</p>
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
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.totalPolicies}</div>
                <div className="text-sm text-gray-500">已分析政策</div>
              </div>
              <BarChart3 className="w-8 h-8 text-indigo-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">{stats.highImpact}</div>
                <div className="text-sm text-gray-500">高影响预警</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500 opacity-50 animate-pulse" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.mediumImpact}</div>
                <div className="text-sm text-gray-500">中影响</div>
              </div>
              <Target className="w-8 h-8 text-orange-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.affectedUnits}</div>
                <div className="text-sm text-gray-500">受影响板块</div>
              </div>
              <Layers className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800">{stats.avgConfidence}%</div>
                <div className="text-sm text-gray-500">平均置信度</div>
              </div>
              <Info className="w-8 h-8 text-blue-500 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：图表区域 */}
          <div className="lg:col-span-2 space-y-4">
            {/* 热力矩阵 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={heatmapRef} className="w-full h-64" />
              <p className="text-xs text-gray-400 mt-2">颜色深浅表示影响强度，数字为影响评分（1-10）</p>
            </div>

            {/* 桑基流向图 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={sankeyRef} className="w-full h-48" />
            </div>

            {/* 时间轴 + 散点图 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div ref={timelineRef} className="w-full h-48" />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div ref={scatterRef} className="w-full h-48" />
              </div>
            </div>

            {/* 政策影响列表 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  政策影响详情
                </h2>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedUnit}
                    onChange={e => setSelectedUnit(e.target.value as BusinessUnit | 'all')}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">全部业务板块</option>
                    {Object.entries(BusinessUnitLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                  <select
                    value={selectedTiming}
                    onChange={e => setSelectedTiming(e.target.value as ImpactTiming | 'all')}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">全部时效</option>
                    {Object.entries(ImpactTimingLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredPolicies.map(policy => (
                  <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div
                      onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              policy.status === 'completed' ? 'bg-green-100 text-green-700' :
                              policy.status === 'analyzing' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {policy.status === 'completed' ? '已分析' : policy.status === 'analyzing' ? '分析中' : '待处理'}
                            </span>
                            <span className="text-xs text-gray-400">{policy.category}</span>
                          </div>
                          <h3 className="font-semibold text-gray-900">{policy.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{policy.summary}</p>
                        </div>
                        <div className="text-right ml-4">
                          <p className="text-xs text-gray-400">{policy.releaseDate}</p>
                          <p className="text-xs text-gray-400">{policy.authority}</p>
                        </div>
                      </div>

                      {/* 影响标签 */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {policy.businessImpacts.map((impact, i) => (
                          <span
                            key={i}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${getImpactColor(impact.impactScore)}`}
                          >
                            {BusinessIcons[impact.businessUnit]}
                            {BusinessUnitLabels[impact.businessUnit]}
                            <span className="font-bold">{impact.impactScore}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 展开详情 */}
                    {expandedPolicy === policy.id && (
                      <div className="border-t border-gray-100 p-4 bg-gray-50">
                        <h4 className="font-medium text-gray-900 mb-3">业务影响清单</h4>
                        <div className="space-y-3">
                          {policy.businessImpacts.map((impact, i) => (
                            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 bg-blue-50 rounded text-blue-600">
                                    {BusinessIcons[impact.businessUnit]}
                                  </div>
                                  <span className="font-medium text-gray-900">{BusinessUnitLabels[impact.businessUnit]}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">置信度: {(impact.confidence * 100).toFixed(0)}%</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${getImpactColor(impact.impactScore)}`}>
                                    影响: {impact.impactScore}/10
                                  </span>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{impact.impactPath}</p>
                              <div className="grid grid-cols-3 gap-2 text-sm">
                                <div className="bg-gray-50 rounded p-2">
                                  <p className="text-gray-500 text-xs">变化方向</p>
                                  <p className={`font-medium ${impact.quantitativeEffect.changeDirection === 'increase' ? 'text-green-600' : impact.quantitativeEffect.changeDirection === 'decrease' ? 'text-red-600' : 'text-gray-600'}`}>
                                    {impact.quantitativeEffect.changeDirection === 'increase' ? '↑ 增加' : impact.quantitativeEffect.changeDirection === 'decrease' ? '↓ 减少' : '— 不变'}
                                  </p>
                                </div>
                                <div className="bg-gray-50 rounded p-2">
                                  <p className="text-gray-500 text-xs">估算幅度</p>
                                  <p className="font-medium text-gray-900">{impact.quantitativeEffect.estimatedMagnitude}</p>
                                </div>
                                <div className="bg-gray-50 rounded p-2">
                                  <p className="text-gray-500 text-xs">生效年份</p>
                                  <p className="font-medium text-gray-900">{impact.quantitativeEffect.effectiveYear}年</p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-gray-500">受影响指标:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {impact.affectedMetrics.map((metric, j) => (
                                    <span key={j} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                                      {metric}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            影响时效: {ImpactTimingLabels[policy.impactTiming]}
                          </span>
                          <Link
                            to="/simulation"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                          >
                            前往推演工作台
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：辅助图表和统计 */}
          <div className="space-y-4">
            {/* 雷达图 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={radarRef} className="w-full h-56" />
            </div>

            {/* 影响等级分布 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={pieRef} className="w-full h-48" />
            </div>

            {/* 利润趋势 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div ref={trendRef} className="w-full h-48" />
            </div>

            {/* 影响日历 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                业务影响日历
              </h2>
              <p className="text-sm text-gray-500 mb-3">按生效时间排列的政策影响事件</p>

              <div className="space-y-4">
                {['2026', '2027', '2028'].map(year => {
                  const yearImpacts = allImpacts.filter(item =>
                    item.impact.quantitativeEffect.effectiveYear === year
                  );
                  if (yearImpacts.length === 0) return null;
                  return (
                    <div key={year}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {year}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{year}年生效</span>
                      </div>
                      <div className="ml-4 space-y-2 border-l-2 border-indigo-200 pl-4">
                        {yearImpacts.slice(0, 5).map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100">
                            <div className={`w-3 h-3 rounded-full ${
                              item.impact.impactScore >= 8 ? 'bg-red-500' :
                              item.impact.impactScore >= 6 ? 'bg-orange-400' :
                              'bg-blue-400'
                            }`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.policy.title.replace(/《/g, '').replace(/》/g, '').slice(0, 20)}...
                              </p>
                              <p className="text-xs text-gray-500">
                                {BusinessUnitLabels[item.impact.businessUnit]}
                              </p>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs ${getImpactColor(item.impact.impactScore)}`}>
                              {item.impact.impactScore}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 各业务板块影响汇总 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-indigo-600" />
                各板块影响汇总
              </h3>
              <div className="space-y-2">
                {(['thermal', 'hydro', 'renewable', 'carbon'] as BusinessUnit[]).map(unit => {
                  const impacts = policyBusinessImpacts.flatMap(p => p.businessImpacts).filter(i => i.businessUnit === unit);
                  const avgScore = impacts.length > 0
                    ? impacts.reduce((sum, i) => sum + i.impactScore, 0) / impacts.length
                    : 0;
                  return (
                    <div key={unit} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-white rounded text-gray-600">
                          {BusinessIcons[unit]}
                        </div>
                        <span className="text-sm text-gray-700">{BusinessUnitLabels[unit]}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${avgScore >= 7 ? 'bg-red-500' : avgScore >= 5 ? 'bg-orange-400' : 'bg-blue-400'}`}
                            style={{ width: `${avgScore * 10}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600">{avgScore.toFixed(1)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 影响时效分布 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-500" />
                <h3 className="font-semibold text-gray-800">影响时效分布</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(ImpactTimingLabels).map(([key, label]) => {
                  const count = policyBusinessImpacts.filter(p => p.impactTiming === key).length;
                  const percent = (count / policyBusinessImpacts.length * 100).toFixed(0);
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{label.split('(')[0]}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
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

            {/* 快速跳转 */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">快速跳转</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/simulation"
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
                >
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  推演工作台
                </Link>
                <Link
                  to="/knowledge-enhanced"
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
                >
                  <Network className="w-4 h-4 text-purple-600" />
                  知识图谱
                </Link>
                <Link
                  to="/policy-enhanced"
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
                >
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                  政策情报
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
                >
                  <Sparkles className="w-4 h-4 text-green-600" />
                  首页驾驶舱
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}