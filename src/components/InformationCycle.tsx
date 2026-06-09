import { useState, useEffect } from 'react';
import { Database, Network, Bot, Monitor, RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';

interface CycleStep {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Database;
  color: string;
  bgColor: string;
  description: string;
  keywords: string[];
}

const cycleSteps: CycleStep[] = [
  {
    id: 'data',
    title: '多元异构数据',
    subtitle: '任务1',
    icon: Database,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
    description: '跨层级异步采集技术，实现外部数据与内部数据的实时汇聚与可靠解析，动态提取政策核心观点',
    keywords: ['跨层级采集', '外部数据', '内部数据', '数据溯源']
  },
  {
    id: 'knowledge',
    title: '知识图谱构建',
    subtitle: '任务2',
    icon: Network,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500',
    description: '构建多层级关系的分级分类能源知识图谱，形成兼具结构化查询与语义推理能力的混合型知识库',
    keywords: ['知识图谱', '语义推理', '结构化查询', 'GraphRAG']
  },
  {
    id: 'agent',
    title: '智能体推理',
    subtitle: '任务3',
    icon: Bot,
    color: 'text-green-600',
    bgColor: 'bg-green-500',
    description: '建立基于大模型的能源政策推理智能体，通过融合区域特征分析的场景化知识推理链，生成分析结论',
    keywords: ['大模型', 'LangChain', '场景推理', '决策支持']
  },
  {
    id: 'platform',
    title: '平台应用',
    subtitle: '任务4',
    icon: Monitor,
    color: 'text-orange-600',
    bgColor: 'bg-orange-500',
    description: '研制情报信息智能分析平台，实现政策资讯推送与趋势分析，提升政策研究与战略支撑的时效性与智能化水平',
    keywords: ['情报分析', '可视化报告', '信息推送', '专题研究']
  }
];

export default function InformationCycle() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep(prev => (prev + 1) % cycleSteps.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveStep(index);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">情报信息传递链条循环</h2>
          <p className="text-sm text-gray-500">数据整合 → 知识库 → 智能体 → 平台应用 → 成果评估</p>
        </div>
        <button
          onClick={() => {
            setIsAnimating(true);
            setTimeout(() => {
              setActiveStep(0);
              setIsAnimating(false);
            }, 300);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm">重置</span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 opacity-50" />
          <div className="absolute w-40 h-40 rounded-full bg-white shadow-inner flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className={`w-12 h-12 text-blue-500 mx-auto mb-2 ${isAnimating ? 'animate-spin' : ''}`} />
              <span className="text-sm font-medium text-gray-700">闭环流程</span>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4">
          {cycleSteps.map((step, index) => (
            <div
              key={step.id}
              onClick={() => handleStepClick(index)}
              className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                activeStep === index
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <step.icon className={`w-5 h-5 ${activeStep === index ? 'text-white' : step.color}`} />
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  activeStep === index ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {step.subtitle}
                </span>
              </div>
              <h3 className={`font-semibold mb-2 ${activeStep === index ? 'text-white' : 'text-gray-800'}`}>
                {step.title}
              </h3>
              <p className={`text-sm line-clamp-2 ${activeStep === index ? 'text-blue-100' : 'text-gray-500'}`}>
                {step.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {step.keywords.slice(0, 3).map((keyword, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 rounded ${
                      activeStep === index
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <div className={`absolute top-1/2 -right-3 transform -translate-y-1/2 ${
                index < cycleSteps.length - 1 ? '' : 'hidden'
              }`}>
                <ArrowRight className={`w-6 h-6 ${activeStep === index ? 'text-white/60' : 'text-gray-300'}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 800 300">
            <defs>
              <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="25%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="75%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              d="M 100 200 Q 200 50 400 50 Q 600 50 700 200 Q 600 350 400 350 Q 200 350 100 200"
              fill="none"
              stroke="url(#cycleGradient)"
              strokeWidth="3"
              strokeDasharray="10 5"
              opacity="0.3"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="font-medium text-gray-800">四项任务逻辑关系</span>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <span><strong>任务1</strong>是数据基础，为后续任务提供数据采集技术支撑</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
            <span><strong>任务2</strong>是知识库构建技术基础，为任务3提供可先验的知识规则链条</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
            <span><strong>任务3</strong>是知识推理技术基础，为核心功能，构建完整的知识推理生成能力</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
            <span><strong>任务4</strong>集成前述研究成果，开发平台实现技术成果试制与示范应用</span>
          </li>
        </ul>
      </div>
    </div>
  );
}