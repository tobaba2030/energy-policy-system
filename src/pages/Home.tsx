import { FileText, Globe, TrendingUp, AlertTriangle, BarChart3, Zap, Network, Bot } from 'lucide-react';
import { policies, scenarios } from '@/data/policyData';
import InformationCycle from '@/components/InformationCycle';

export default function HomePage() {
  const stats = [
    { icon: FileText, label: '政策文件', value: policies.length, color: 'bg-blue-100 text-blue-600', bgColor: 'bg-blue-500' },
    { icon: TrendingUp, label: '高影响政策', value: policies.filter(p => p.impactLevel === 'high').length, color: 'bg-red-100 text-red-600', bgColor: 'bg-red-500' },
    { icon: Globe, label: '推演情景', value: scenarios.length, color: 'bg-green-100 text-green-600', bgColor: 'bg-green-500' },
    { icon: AlertTriangle, label: '风险预警', value: '3', color: 'bg-yellow-100 text-yellow-600', bgColor: 'bg-yellow-500' },
    { icon: Network, label: '知识图谱节点', value: '14', color: 'bg-purple-100 text-purple-600', bgColor: 'bg-purple-500' },
    { icon: Bot, label: '智能推理结论', value: '156', color: 'bg-cyan-100 text-cyan-600', bgColor: 'bg-cyan-500' }
  ];

  const features = [
    {
      icon: FileText,
      title: '政策情报分析',
      description: '实时监测国家及地方能源政策动态，深度分析政策影响，智能识别政策风险',
      link: '/policy',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Globe,
      title: '3060沙盘推演',
      description: '模拟碳达峰碳中和路径，多情景对比分析，长期政策影响预测',
      link: '/sandbox',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Network,
      title: '能源知识图谱',
      description: '构建分级分类能源知识图谱，支持结构化查询与语义推理能力',
      link: '/knowledge',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Bot,
      title: '智能体推理献策',
      description: '基于大模型的能源政策推理智能体，生成分析结论与决策建议',
      link: '/agent',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const recentPolicies = policies.slice(0, 4);

  const impactLevelColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const impactLevelLabels = {
    high: '高',
    medium: '中',
    low: '低'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6">
              <Globe className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-4">能源政策情报影响研究与仿真推演系统</h1>
            <p className="text-xl text-blue-100 mb-8">基于AI大模型技术，为能源集团提供政策情报分析与3060双碳政策沙盘推演能力</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/policy"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                <FileText className="w-5 h-5" />
                政策情报分析
              </a>
              <a
                href="/sandbox"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                <Globe className="w-5 h-5" />
                沙盘推演
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">情报信息传递链条循环</h2>
            <p className="text-gray-600">数据整合 → 知识库构建 → 智能体推理 → 平台应用 → 成果评估</p>
          </div>
          <InformationCycle />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">核心功能模块</h2>
            <p className="text-gray-600">为能源集团提供全方位的政策分析与仿真推演能力</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-shadow">
                <div className={`h-40 bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                  <feature.icon className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                  <a
                    href={feature.link}
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 text-sm"
                  >
                    了解更多
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">最新政策动态</h2>
              <p className="text-gray-600">实时追踪国家及地方能源政策发布</p>
            </div>
            <a href="/policy" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
              查看全部
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPolicies.map(policy => (
              <div key={policy.id} className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">{policy.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactLevelColors[policy.impactLevel]}`}>
                    {impactLevelLabels[policy.impactLevel]}影响
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{policy.authority}</span>
                  <span>{policy.releaseDate}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{policy.summary}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {policy.keywords.slice(0, 3).map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">系统概述</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                本系统基于AI大模型技术，为能源集团提供政策情报分析、影响评估、风险预警和双碳政策沙盘推演能力，助力企业科学决策。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">核心能力</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  政策影响评估矩阵
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  实时碳排放监测
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  多情景沙盘推演
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  智能风险预警
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">双碳目标</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>碳达峰</span>
                    <span className="font-medium">2030年前</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>碳中和</span>
                    <span className="font-medium">2060年前</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '15%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>能源政策情报影响研究与仿真推演系统 © 2024</p>
        </div>
      </footer>
    </div>
  );
}