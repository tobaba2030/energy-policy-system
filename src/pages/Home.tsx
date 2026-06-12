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
    <div className="relative bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full">
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-medium ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
            {change}
          </div>
        </div>
        <div className="mt-auto">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-4xl font-bold text-gray-900 mt-3">{value}</p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {detail}
          </p>
        </div>
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
    <div className="relative bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group h-full">
      {/* 顶部装饰线条 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
      
      <div className="flex items-center gap-4 mb-5">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
          {BusinessIcons[unit]}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{BusinessUnitLabels[unit]}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{assets.length} 个资产</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 font-medium">装机容量</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalCapacity.toLocaleString()} MW</p>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 font-medium">年发电量</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalGeneration.toLocaleString()} GWh</p>
        </div>
      </div>

      {/* 政策影响预警 */}
      <div className="flex items-center gap-2 flex-wrap">
        {alertCount.high > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-xs font-medium">
            <AlertTriangle className="w-3 h-3" /> {alertCount.high} 高影响
          </span>
        )}
        {alertCount.medium > 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium">
            {alertCount.medium} 中影响
          </span>
        )}
        {alertCount.high === 0 && alertCount.medium === 0 && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle2 className="w-3 h-3" /> 运行正常
          </span>
        )}
      </div>
    </div>
  );
}

// 情报闭环状态
function IntelligenceCycleStatus() {
  const stages = [
    { name: '采集', count: 3, color: 'from-blue-500 to-blue-600', glow: 'shadow-blue-500/30' },
    { name: '解析', count: 2, color: 'from-purple-500 to-purple-600', glow: 'shadow-purple-500/30' },
    { name: '推演', count: 1, color: 'from-orange-500 to-orange-600', glow: 'shadow-orange-500/30' },
    { name: '决策', count: 1, color: 'from-green-500 to-green-600', glow: 'shadow-green-500/30' },
    { name: '执行', count: 0, color: 'from-gray-400 to-gray-500', glow: 'shadow-gray-500/30' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-indigo-600" />
        <span className="text-lg">情报闭环流转状态</span>
      </h3>
      <div className="flex items-center justify-between relative">
        {/* 连接线背景 */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-gray-200 -translate-y-1/2 rounded-full"></div>
        
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex items-center relative z-10">
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stage.color} flex items-center justify-center text-white font-bold text-base shadow-lg ${stage.glow} transition-transform hover:scale-110`}>
                {stage.count}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">{stage.name}</p>
            </div>
            {i < stages.length - 1 && (
              <div className="w-6 h-0.5 mx-1 bg-transparent">
                <ArrowRight className="w-4 h-4 text-gray-400 mx-auto" />
              </div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* 顶部欢迎区域 - 科技感渐变 */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950"></div>
        {/* 动态网格背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        {/* 光效装饰 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative container mx-auto px-4 py-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-blue-300 text-sm font-medium tracking-wide uppercase">政策智能分析平台</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                政策业务影响驾驶舱
              </h1>
              <p className="text-blue-100 mt-3 text-lg">
                政策情报对业务板块影响研究与量化推演系统
              </p>
              <p className="text-blue-200/70 mt-1 text-sm">
                版本 V2.0 | 实时监测 · 智能分析 · 前瞻决策
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/impact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl hover:bg-blue-50 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <BarChart3 className="w-4 h-4" />
                业务影响分析
              </Link>
              <Link
                to="/simulation"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-sm font-semibold"
              >
                <Activity className="w-4 h-4" />
                推演工作台
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* 核心KPI行 - 改为2x2布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：业务板块概览 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg">业务版图概览</span>
                </h2>
                <span className="text-xs px-3 py-1 bg-green-50 text-green-600 rounded-full font-medium">数据已更新</span>
              </div>

              {/* 装机结构图 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div ref={setChartRef} className="h-52 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-medium">总装机容量</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">8,840 MW</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-medium">年发电量</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">31,840 GWh</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-medium">资产总数</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">{businessAssets.length} 个</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-600 font-medium">高影响预警</span>
                    </div>
                    <span className="text-xl font-bold text-red-700">{businessAssets.filter(a => a.impactAlert === 'high').length} 个资产</span>
                  </div>
                </div>
              </div>

              {/* 各业务板块卡片 - 改为横向排列 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <div className="p-2.5 bg-orange-50 rounded-xl">
                    <Bell className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-lg">政策影响动态</span>
                </h2>
                <span className="text-xs text-gray-400 px-3 py-1 bg-gray-100 rounded-full">实时更新</span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {policyBusinessImpacts.map(policy => (
                  <PolicyAlertItem key={policy.id} policy={policy} />
                ))}
              </div>
              <Link
                to="/policy"
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                查看全部政策 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 政策-业务影响热力矩阵预览 */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <div className="p-2.5 bg-purple-50 rounded-xl">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-lg">政策-业务影响矩阵</span>
              </h2>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="py-2 text-left text-gray-500 font-medium">政策/业务</th>
                      <th className="py-2 text-center text-gray-500 font-medium">水电</th>
                      <th className="py-2 text-center text-gray-500 font-medium">火电</th>
                      <th className="py-2 text-center text-gray-500 font-medium">新能源</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-2.5 text-gray-700 font-medium">容量电价</td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gray-200 rounded-lg inline-block" /></td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gradient-to-br from-red-400 to-red-600 rounded-lg inline-block shadow-md shadow-red-500/30" /></td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gray-200 rounded-lg inline-block" /></td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-2.5 text-gray-700 font-medium">绿证政策</td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gray-200 rounded-lg inline-block" /></td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gray-200 rounded-lg inline-block" /></td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-lg inline-block shadow-md shadow-green-500/30" /></td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="py-2.5 text-gray-700 font-medium">碳配额</td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gradient-to-br from-blue-200 to-blue-400 rounded-lg inline-block" /></td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg inline-block shadow-md shadow-orange-500/30" /></td>
                      <td className="py-2.5 text-center"><span className="w-5 h-5 bg-gray-200 rounded-lg inline-block" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link
                to="/impact"
                className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                详细分析 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 快速入口 */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 rounded-2xl p-6 border border-blue-800/50">
              <h3 className="font-semibold text-white mb-5 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                快速入口
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/policy" className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-sm text-white">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>政策库</span>
                </Link>
                <Link to="/simulation" className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-sm text-white">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span>推演</span>
                </Link>
                <Link to="/research" className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-sm text-white">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  <span>报告</span>
                </Link>
                <Link to="/knowledge" className="flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all text-sm text-white">
                  <Building2 className="w-5 h-5 text-orange-400" />
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
