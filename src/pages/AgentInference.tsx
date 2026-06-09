import { useState } from 'react';
import { Bot, MessageSquare, Send, Lightbulb, Clock, FileText, CheckCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'analysis' | 'recommendation' | 'warning' | 'info';
}

const mockResponses: Record<string, { content: string; type: string }> = {
  '碳达峰政策影响': {
    content: '根据《2030年前碳达峰行动方案》分析，贵公司面临以下关键影响：\n\n1. **能源结构调整压力**：到2030年非化石能源消费占比需达到25%，意味着需要大幅增加新能源装机容量。\n\n2. **碳排放约束强化**：单位GDP碳排放需下降18%，传统煤电业务面临转型压力。\n\n3. **市场机遇**：新能源发展规划带来光伏、风电项目投资机会，储能技术需求增长。\n\n4. **区域差异**：西北区域可再生能源潜力大，建议加大布局；华东区域碳排放强度较低，可作为碳中和先行示范区。',
    type: 'analysis'
  },
  '新能源发展趋势': {
    content: '基于能源知识图谱分析，新能源发展呈现以下趋势：\n\n1. **光伏技术**：成本持续下降，转换效率提升，预计2030年成为主力能源之一。\n\n2. **风电技术**：海上风电快速发展，深远海风电技术取得突破。\n\n3. **储能技术**：锂电池成本下降，新型储能技术如氢能、液流电池加速发展。\n\n4. **智能电网**：数字化转型加速，需求响应和虚拟电厂技术日益成熟。\n\n**建议**：加大储能技术研发投入，布局智能电网相关业务。',
    type: 'analysis'
  },
  '双碳目标路径': {
    content: '实现双碳目标的关键路径分析：\n\n**碳达峰阶段（2025-2030）**：\n- 加速煤电替代，提高新能源比例\n- 推进工业节能改造\n- 完善碳市场机制\n\n**碳中和阶段（2030-2060）**：\n- 深度脱碳，发展负排放技术\n- 构建新型电力系统\n- 推动氢能规模化应用\n\n**关键指标**：\n- 2030年可再生能源占比25%\n- 2050年可再生能源占比70%\n- 2060年实现碳中和',
    type: 'recommendation'
  },
  '政策风险预警': {
    content: '当前政策环境下需关注的风险点：\n\n⚠️ **高风险**：\n- 碳配额收紧可能增加成本\n- 煤电机组退役压力增大\n- 新能源消纳问题突出\n\n⚠️ **中风险**：\n- 电价市场化改革影响收益\n- 环保标准趋严\n- 技术路线不确定性\n\n**应对建议**：\n1. 建立碳排放监测体系\n2. 优化资产结构，降低煤电占比\n3. 加强跨区域合作，促进新能源消纳\n4. 提前布局储能和氢能技术',
    type: 'warning'
  },
  '区域发展建议': {
    content: '基于区域特征分析的发展建议：\n\n**华北区域**：\n- 碳排放强度较高（2.8吨CO₂/万元）\n- 可再生潜力中等（65%）\n- 建议：加快煤电转型，发展光伏+储能\n\n**西北区域**：\n- 可再生潜力最大（92%）\n- 政策影响最高（2.5）\n- 建议：大规模布局风光基地\n\n**华东区域**：\n- 碳排放强度较低（2.1吨CO₂/万元）\n- 建议：打造碳中和示范区，发展分布式能源\n\n**西南区域**：\n- 水力资源丰富\n- 建议：发展抽水蓄能，构建新型电力系统',
    type: 'recommendation'
  }
};

const quickQuestions = [
  '碳达峰政策影响',
  '新能源发展趋势',
  '双碳目标路径',
  '政策风险预警',
  '区域发展建议'
];

export default function AgentInference() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '您好！我是能源政策智能分析助手，基于AI大模型为您提供政策情报分析、影响评估和决策建议。请问您想了解什么？',
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const responseKey = quickQuestions.find(q => inputMessage.includes(q)) || '碳达峰政策影响';
    const response = mockResponses[responseKey] || mockResponses['碳达峰政策影响'];

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      type: response.type as any
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'analysis':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'recommendation':
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'warning':
        return <Sparkles className="w-4 h-4 text-orange-500" />;
      default:
        return <Bot className="w-4 h-4 text-green-500" />;
    }
  };

  const getTypeBg = (type?: string) => {
    switch (type) {
      case 'analysis':
        return 'bg-blue-50 border-blue-200';
      case 'recommendation':
        return 'bg-yellow-50 border-yellow-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-6 px-8">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">智能体推理献策</h1>
            <p className="text-green-100 mt-1">基于AI大模型的能源政策推理智能体</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-4">快速提问</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mt-4">
              <h3 className="font-semibold text-gray-800 mb-4">推理能力</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>政策文本关键词提取</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>知识图谱语义推理</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>场景化知识推理链</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>跨领域关联分析</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>结论评估与优化</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
                      message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {message.role === 'user' ? (
                        <MessageSquare className="w-5 h-5" />
                      ) : (
                        getTypeIcon(message.type)
                      )}
                    </div>
                    <div className={`max-w-[70%] ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-4 rounded-xl border ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white rounded-tr-sm'
                          : `${getTypeBg(message.type)} text-gray-800 rounded-tl-sm`
                      }`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                      <div className={`text-xs text-gray-400 mt-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入您的问题，例如：碳达峰政策影响..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>发送</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
                <div className="text-sm opacity-80">政策解读报告</div>
                <div className="text-2xl font-bold mt-1">24份</div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                <div className="text-sm opacity-80">推理结论生成</div>
                <div className="text-2xl font-bold mt-1">156条</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white">
                <div className="text-sm opacity-80">知识图谱节点</div>
                <div className="text-2xl font-bold mt-1">14个</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}