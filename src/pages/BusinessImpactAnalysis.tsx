/**
 * 业务影响分析页面
 * 展示政策对业务板块的影响矩阵、影响详情、影响日历
 */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3, TrendingUp, TrendingDown, AlertTriangle,
  Flame, Wind, Droplets, Zap, Building2, Activity,
  ChevronRight, Calendar, Filter, Search
} from 'lucide-react';
import * as echarts from 'echarts';
import {
  policyBusinessImpacts, BusinessUnitLabels, BusinessUnit,
  businessAssets, ImpactTimingLabels, ImpactTiming
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

// 政策影响详情卡片
function PolicyImpactCard({ policy, expanded, onToggle }: {
  policy: typeof policyBusinessImpacts[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div
        onClick={onToggle}
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
      {expanded && (
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              前往推演工作台
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// 影响日历事件
function ImpactCalendarEvent({ policy, impact }: {
  policy: typeof policyBusinessImpacts[0];
  impact: typeof policyBusinessImpacts[0]['businessImpacts'][0];
}) {
  return (
    <div className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-100">
      <div className={`w-3 h-3 rounded-full ${
        impact.impactScore >= 8 ? 'bg-red-500' :
        impact.impactScore >= 6 ? 'bg-orange-400' :
        'bg-blue-400'
      }`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {policy.title.replace(/《/g, '').replace(/》/g, '')}
        </p>
        <p className="text-xs text-gray-500">
          {BusinessUnitLabels[impact.businessUnit]} · {impact.quantitativeEffect.effectiveYear}年生效
        </p>
      </div>
      <span className={`px-2 py-0.5 rounded text-xs ${getImpactColor(impact.impactScore)}`}>
        {impact.impactScore}
      </span>
    </div>
  );
}

export default function BusinessImpactAnalysis() {
  const [expandedPolicy, setExpandedPolicy] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<BusinessUnit | 'all'>('all');
  const [selectedTiming, setSelectedTiming] = useState<ImpactTiming | 'all'>('all');

  const heatmapRef = useRef<HTMLDivElement>(null);

  // 过滤政策
  const filteredPolicies = policyBusinessImpacts.filter(policy => {
    if (selectedUnit !== 'all' && !policy.businessImpacts.some(i => i.businessUnit === selectedUnit)) return false;
    if (selectedTiming !== 'all' && policy.impactTiming !== selectedTiming) return false;
    return true;
  });

  // 初始化热力图
  useEffect(() => {
    if (!heatmapRef.current) return;

    const chart = echarts.init(heatmapRef.current);

    // 构建热力图数据
    const policies = ['容量电价', '绿证政策', '碳配额'];
    const units = ['水电', '火电', '新能源', '天然气', '碳资产'];
    const data: [number, number, number][] = [];

    // 模拟影响强度数据
    const impactData = [
      [0, 0, 0], [1, 0, 0], [2, 0, 9], [3, 0, 0], [4, 0, 3],
      [0, 1, 0], [1, 1, 0], [2, 1, 7], [3, 1, 0], [4, 1, 6],
      [0, 2, 2], [1, 2, 8], [2, 2, 0], [3, 2, 0], [4, 2, 5],
    ];

    const option = {
      tooltip: {
        position: 'top',
        formatter: (params: { data: [number, number, number] }) => {
          const [policyIdx, unitIdx, value] = params.data;
          return `${policies[policyIdx]} → ${units[unitIdx]}<br/>影响强度: ${value}`;
        }
      },
      grid: {
        top: 10,
        left: 80,
        right: 10,
        bottom: 40
      },
      xAxis: {
        type: 'category',
        data: units,
        splitArea: { show: true }
      },
      yAxis: {
        type: 'category',
        data: policies,
        splitArea: { show: true }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        inRange: {
          color: ['#f0f0f0', '#bae7ff', '#69c0ff', '#1890ff', '#0050b3']
        }
      },
      series: [{
        type: 'heatmap',
        data: impactData,
        label: {
          show: true,
          formatter: (params: { data: [number, number, number] }) => params.data[2] || ''
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  // 按生效时间排序的影响事件
  const allImpacts = policyBusinessImpacts.flatMap(policy =>
    policy.businessImpacts.map(impact => ({ policy, impact }))
  ).sort((a, b) =>
    parseInt(a.impact.quantitativeEffect.effectiveYear) - parseInt(b.impact.quantitativeEffect.effectiveYear)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-gray-900">政策业务影响分析</h1>
          <p className="text-sm text-gray-500">政策条款的业务影响拆解与可视化</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* 统计概览 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-500">已分析政策</p>
            <p className="text-2xl font-bold text-gray-900">{policyBusinessImpacts.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-500">高影响预警</p>
            <p className="text-2xl font-bold text-red-600">
              {policyBusinessImpacts.flatMap(p => p.businessImpacts).filter(i => i.impactScore >= 8).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-500">受影响业务板块</p>
            <p className="text-2xl font-bold text-gray-900">
              {new Set(policyBusinessImpacts.flatMap(p => p.businessImpacts.map(i => i.businessUnit))).size}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <p className="text-sm text-gray-500">平均置信度</p>
            <p className="text-2xl font-bold text-gray-900">
              {(policyBusinessImpacts.flatMap(p => p.businessImpacts).reduce((sum, i) => sum + i.confidence, 0) /
                policyBusinessImpacts.flatMap(p => p.businessImpacts).length * 100).toFixed(0)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* 左侧：政策影响热力矩阵 */}
          <div className="col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                政策-业务影响热力矩阵
              </h2>
              <div ref={heatmapRef} className="h-64" />
              <p className="text-xs text-gray-400 mt-2">颜色深浅表示影响强度，数字为影响评分（1-10）</p>
            </div>

            {/* 政策影响列表 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  政策影响详情
                </h2>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedUnit}
                    onChange={e => setSelectedUnit(e.target.value as BusinessUnit | 'all')}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1"
                  >
                    <option value="all">全部业务板块</option>
                    <option value="thermal">火电板块</option>
                    <option value="hydro">水电板块</option>
                    <option value="renewable">新能源板块</option>
                    <option value="gas">天然气板块</option>
                    <option value="carbon">碳资产</option>
                  </select>
                  <select
                    value={selectedTiming}
                    onChange={e => setSelectedTiming(e.target.value as ImpactTiming | 'all')}
                    className="text-sm border border-gray-200 rounded-lg px-2 py-1"
                  >
                    <option value="all">全部时效</option>
                    <option value="immediate">立即生效</option>
                    <option value="short_term">短期生效</option>
                    <option value="medium_term">中期生效</option>
                    <option value="long_term">长期</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                {filteredPolicies.map(policy => (
                  <PolicyImpactCard
                    key={policy.id}
                    policy={policy}
                    expanded={expandedPolicy === policy.id}
                    onToggle={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 右侧：影响日历 */}
          <div className="space-y-4">
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
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {year}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{year}年生效</span>
                      </div>
                      <div className="ml-4 space-y-2 border-l-2 border-blue-200 pl-4">
                        {yearImpacts.map((item, i) => (
                          <ImpactCalendarEvent key={i} policy={item.policy} impact={item.impact} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 各业务板块影响汇总 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3">各板块影响汇总</h3>
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

            {/* 快速跳转 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">快速跳转</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/simulation"
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
                >
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  推演工作台
                </Link>
                <Link
                  to="/research"
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm"
                >
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  政研报告
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
