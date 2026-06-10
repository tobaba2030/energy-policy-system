/**
 * 业务影响驾驶舱 - 首页
 * 重点展示政策对业务板块的影响预警和核心指标
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, AlertTriangle, Bell, Building2,
  Zap, Wind, Droplets, Flame, Activity, ArrowRight,
  CheckCircle2, Clock, FileText, BarChart3
} from 'lucide-react';
import * as echarts from 'echarts';
import {
  businessAssets, policyBusinessImpacts, BusinessUnitLabels,
  BusinessUnit, BusinessAsset, PolicyWithBusinessImpact
} from '@/data/businessImpactData';

// 业务板块图标映射
const BusinessIcons: Record<BusinessUnit, React.ReactNode> = {
  hydro: <Droplets className="w-5 h-5" />,
  thermal: <Flame className="w-5 h-5" />,
  renewable: <Wind className="w-5 h-5" />,
  gas: <Zap className="w-5 h-5" />,
  comprehensive: <Building2 className="w-5 h-5" />,
  carbon: <Activity className="w-5 h-5" />
};

// 预警颜色映射
const alertColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-blue-500',
  none: 'bg-gray-300'
};

// 核心KPI卡片
function KPICard({ title, value, change, trend, icon, detail }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  detail: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
      <div className="flex items-start justify-between">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
          {change}
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className="text-xs text-gray-400 mt-1">{detail}</p>
      </div>
    </div>
  );
}

// 政策影响预警条目
function PolicyAlertItem({ policy }: { policy: PolicyWithBusinessImpact }) {
  const maxImpact = policy.businessImpacts.reduce((max, impact) =>
    impact.impactScore > max.impactScore ? impact : max, policy.businessImpacts[0]);

  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`w-2 h-2 rounded-full mt-2 ${maxImpact.impactScore >= 8 ? 'bg-red-500' : maxImpact.impactScore >= 6 ? 'bg-yellow-500' : 'bg-blue-500'}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{policy.title.replace(/《/g, '').replace(/》/g, '')}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          影响: {maxImpact && BusinessUnitLabels[maxImpact.businessUnit]} · 强度: {maxImpact?.impactScore || 0}/10
        </p>
      </div>
      <span className="text-xs text-gray-400">{policy.releaseDate}</span>
    </div>
  );
}

// 业务板块概览卡片
function BusinessUnitCard({ unit, assets, alertCount }: {
  unit: BusinessUnit;
  assets: BusinessAsset[];
  alertCount: { high: number; medium: number; low: number };
}) {
  const totalCapacity = assets.reduce((sum, a) => sum + a.capacity, 0);
  const totalGeneration = assets.reduce((sum, a) => sum + a.annualGeneration, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          {BusinessIcons[unit]}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{BusinessUnitLabels[unit]}</h3>
          <p className="text-xs text-gray-500">{assets.length} 个资产</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="bg-gray-50 rounded p-2">
          <p className="text-gray-500 text-xs">装机容量</p>
          <p className="font-semibold text-gray-900">{totalCapacity.toLocaleString()} MW</p>
        </div>
        <div className="bg-gray-50 rounded p-2">
          <p className="text-gray-500 text-xs">年发电量</p>
          <p className="font-semibold text-gray-900">{totalGeneration.toLocaleString()} GWh</p>
        </div>
      </div>

      {/* 政策影响预警 */}
      <div className="flex items-center gap-2">
        {alertCount.high > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
            <AlertTriangle className="w-3 h-3" /> {alertCount.high} 高影响
          </span>
        )}
        {alertCount.medium > 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs">
            {alertCount.medium} 中影响
          </span>
        )}
        {alertCount.high === 0 && alertCount.medium === 0 && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
            <CheckCircle2 className="w-3 h-3" /> 正常
          </span>
        )}
      </div>
    </div>
  );
}

// 情报闭环状态
function IntelligenceCycleStatus() {
  const stages = [
    { name: '采集', count: 3, color: 'bg-blue-500' },
    { name: '解析', count: 2, color: 'bg-purple-500' },
    { name: '推演', count: 1, color: 'bg-orange-500' },
    { name: '决策', count: 1, color: 'bg-green-500' },
    { name: '执行', count: 0, color: 'bg-gray-400' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4 text-blue-600" />
        情报闭环流转状态
      </h3>
      <div className="flex items-center justify-between">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center">
            <div className="text-center">
              <div className={`w-10 h-10 rounded-full ${stage.color} flex items-center justify-center text-white font-bold text-sm`}>
                {stage.count}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stage.name}</p>
            </div>
            {i < stages.length - 1 && (
              <div className="w-8 h-0.5 bg-gray-200 mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [chartRef, setChartRef] = useState<HTMLDivElement | null>(null);

  // 按业务板块分组资产
  const assetsByUnit = businessAssets.reduce((acc, asset) => {
    if (!acc[asset.businessUnit]) acc[asset.businessUnit] = [];
    acc[asset.businessUnit].push(asset);
    return acc;
  }, {} as Record<BusinessUnit, BusinessAsset[]>);

  // 计算各板块预警数量
  const getAlertCount = (assets: BusinessAsset[]) => ({
    high: assets.filter(a => a.impactAlert === 'high').length,
    medium: assets.filter(a => a.impactAlert === 'medium').length,
    low: assets.filter(a => a.impactAlert === 'low').length
  });

  // 初始化图表
  useEffect(() => {
    if (!chartRef) return;

    const chart = echarts.init(chartRef);
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} MW ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        textStyle: { fontSize: 12 }
      },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold' }
        },
        data: [
          { value: 3580, name: '水电', itemStyle: { color: '#3b82f6' } },
          { value: 4260, name: '火电', itemStyle: { color: '#ef4444' } },
          { value: 1000, name: '新能源', itemStyle: { color: '#22c55e' } }
        ]
      }]
    };

    chart.setOption(option);
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [chartRef]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部欢迎区域 */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">湖北能源集团 · 政策业务影响驾驶舱</h1>
              <p className="text-blue-100 mt-2">
                政策情报对业务板块影响研究与量化推演系统 V2.0
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/impact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                业务影响分析
              </Link>
              <Link
                to="/simulation"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
              >
                <Activity className="w-4 h-4" />
                推演工作台
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* 核心KPI行 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <KPICard
            title="火电政策影响利润变动"
            value="+8.2%"
            change="↑ 较上月"
            trend="up"
            icon={<Flame className="w-5 h-5" />}
            detail="容量电价上调影响"
          />
          <KPICard
            title="新能源等效电价变动"
            value="+0.03元/kWh"
            change="↑ 绿证收益"
            trend="up"
            icon={<Wind className="w-5 h-5" />}
            detail="绿证强制消费比例提高"
          />
          <KPICard
            title="集团利润敏感度指数"
            value="0.72"
            change="中等敏感"
            trend="neutral"
            icon={<TrendingUp className="w-5 h-5" />}
            detail="政策变动1%影响利润0.72%"
          />
          <KPICard
            title="待处理政策预警"
            value="3"
            change="需关注"
            trend="down"
            icon={<Bell className="w-5 h-5" />}
            detail="2条高影响、1条中影响"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧：业务板块概览 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                集团业务版图概览
              </h2>

              {/* 装机结构图 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div ref={setChartRef} className="h-48" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">总装机容量</span>
                    <span className="font-semibold text-gray-900">8,840 MW</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">年发电量</span>
                    <span className="font-semibold text-gray-900">31,840 GWh</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-600">资产总数</span>
                    <span className="font-semibold text-gray-900">{businessAssets.length} 个</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                    <span className="text-sm text-red-600">高影响预警</span>
                    <span className="font-semibold text-red-700">{businessAssets.filter(a => a.impactAlert === 'high').length} 个资产</span>
                  </div>
                </div>
              </div>

              {/* 各业务板块卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(['hydro', 'thermal', 'renewable'] as BusinessUnit[]).map(unit => (
                  <BusinessUnitCard
                    key={unit}
                    unit={unit}
                    assets={assetsByUnit[unit] || []}
                    alertCount={getAlertCount(assetsByUnit[unit] || [])}
                  />
                ))}
              </div>
            </div>

            {/* 情报闭环状态 */}
            <IntelligenceCycleStatus />
          </div>

          {/* 右侧：政策影响动态 */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-500" />
                政策影响动态
              </h2>
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {policyBusinessImpacts.map(policy => (
                  <PolicyAlertItem key={policy.id} policy={policy} />
                ))}
              </div>
              <Link
                to="/policy"
                className="mt-3 flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                查看全部政策 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 政策-业务影响热力矩阵预览 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-500" />
                政策-业务影响矩阵
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-500">政策/业务</th>
                      <th className="py-2 text-center text-gray-500">水电</th>
                      <th className="py-2 text-center text-gray-500">火电</th>
                      <th className="py-2 text-center text-gray-500">新能源</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 text-gray-700 truncate max-w-24">容量电价</td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-gray-100 rounded inline-block" /></td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-red-500 rounded inline-block" /></td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-gray-100 rounded inline-block" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 text-gray-700 truncate max-w-24">绿证政策</td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-gray-100 rounded inline-block" /></td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-gray-100 rounded inline-block" /></td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-green-500 rounded inline-block" /></td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-700 truncate max-w-24">碳配额</td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-blue-200 rounded inline-block" /></td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-orange-500 rounded inline-block" /></td>
                      <td className="py-2 text-center"><span className="w-4 h-4 bg-gray-100 rounded inline-block" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link
                to="/impact"
                className="mt-3 flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700"
              >
                详细分析 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 快速入口 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3">快速入口</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/policy" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:shadow-sm transition-shadow text-sm">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>政策库</span>
                </Link>
                <Link to="/simulation" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:shadow-sm transition-shadow text-sm">
                  <Activity className="w-4 h-4 text-purple-600" />
                  <span>推演</span>
                </Link>
                <Link to="/research" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:shadow-sm transition-shadow text-sm">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  <span>报告</span>
                </Link>
                <Link to="/knowledge" className="flex items-center gap-2 p-2 bg-white rounded-lg hover:shadow-sm transition-shadow text-sm">
                  <Building2 className="w-4 h-4 text-orange-600" />
                  <span>知识图谱</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
