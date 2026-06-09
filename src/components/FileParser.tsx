import { useState } from 'react';
import { FileText, Search, Tag, Target, Quote, Sparkles, CheckCircle, Loader2 } from 'lucide-react';

interface ParsedResult {
  status: 'pending' | 'parsing' | 'completed' | 'error';
  title?: string;
  summary?: string;
  keywords?: string[];
  targets?: { year: number; metric: string; value: string }[];
  entities?: { type: string; value: string }[];
  impactLevel?: 'high' | 'medium' | 'low';
  relatedPolicies?: string[];
}

const mockParsedResult: ParsedResult = {
  status: 'completed',
  title: '关于进一步完善分时电价机制的通知',
  summary: '为进一步完善分时电价机制，引导电力用户削峰填谷，促进新能源消纳，国家发展改革委发布通知，明确了分时电价机制的基本原则、实施范围和具体要求。通知要求各地结合实际情况，合理划分峰谷时段，建立动态调整机制，完善尖峰电价机制，加强与电力市场的衔接。',
  keywords: ['分时电价', '峰谷电价', '电力市场', '新能源消纳', '需求响应'],
  targets: [
    { year: 2025, metric: '峰谷电价价差', value: '不低于4:1' },
    { year: 2025, metric: '尖峰电价', value: '高峰电价的1.5-2倍' },
    { year: 2023, metric: '工商业用户全覆盖', value: '100%' }
  ],
  entities: [
    { type: '发布机构', value: '国家发展和改革委员会' },
    { type: '发布日期', value: '2024年3月25日' },
    { type: '适用范围', value: '全国工商业用户' },
    { type: '执行时间', value: '2024年6月1日' }
  ],
  impactLevel: 'high',
  relatedPolicies: ['电力体制改革方案', '可再生能源消纳保障机制', '需求侧响应实施细则']
};

export default function FileParser() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [parsedResult, setParsedResult] = useState<ParsedResult | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  const sampleFiles = [
    { id: 'file1', name: '关于进一步完善分时电价机制的通知.pdf', type: '政策文件', size: '256 KB' },
    { id: 'file2', name: '2024年能源工作指导意见.docx', type: '规划文件', size: '1.2 MB' },
    { id: 'file3', name: '碳排放权交易市场建设方案.pdf', type: '政策文件', size: '512 KB' }
  ];

  const handleParse = () => {
    if (!selectedFile) return;

    setIsParsing(true);
    setParsedResult({ status: 'parsing' });

    setTimeout(() => {
      setIsParsing(false);
      setParsedResult(mockParsedResult);
    }, 2000);
  };

  const getImpactColor = (level?: string) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getImpactLabel = (level?: string) => {
    switch (level) {
      case 'high':
        return '高影响';
      case 'medium':
        return '中影响';
      case 'low':
        return '低影响';
      default:
        return '未知';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h3 className="font-semibold text-gray-800">文件智能解析</h3>
        </div>
        <button
          onClick={handleParse}
          disabled={!selectedFile || isParsing}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            !selectedFile || isParsing
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          {isParsing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>解析中...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>开始解析</span>
            </>
          )}
        </button>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">选择待解析文件</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {sampleFiles.map(file => (
            <div
              key={file.id}
              onClick={() => setSelectedFile(file.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedFile === file.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  file.type === '政策文件' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate">{file.name}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 rounded">{file.type}</span>
                    <span>{file.size}</span>
                  </div>
                </div>
                {selectedFile === file.id && (
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {parsedResult && (
        <div className="space-y-6">
          {parsedResult.status === 'parsing' ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
              <p className="text-gray-500">正在解析文件内容...</p>
            </div>
          ) : parsedResult.status === 'completed' ? (
            <>
              <div className="flex items-start justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div>
                  <h4 className="font-bold text-gray-800 text-lg mb-2">{parsedResult.title}</h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${getImpactColor(parsedResult.impactLevel)}`}>
                      {getImpactLabel(parsedResult.impactLevel)}
                    </span>
                    <span className="text-sm text-gray-500">AI智能解析</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium text-gray-800">文件摘要</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {parsedResult.summary}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-green-500" />
                    <h4 className="font-medium text-gray-800">关键词提取</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {parsedResult.keywords?.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-orange-500" />
                    <h4 className="font-medium text-gray-800">核心指标</h4>
                  </div>
                  <div className="space-y-2">
                    {parsedResult.targets?.map((target, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-800">{target.metric}</div>
                          <div className="text-xs text-gray-500">{target.year}年目标</div>
                        </div>
                        <div className="text-xl font-bold text-orange-600">{target.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <h4 className="font-medium text-gray-800">文件元信息</h4>
                  </div>
                  <div className="space-y-2">
                    {parsedResult.entities?.map((entity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">{entity.type}</span>
                        <span className="font-medium text-gray-800">{entity.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h4 className="font-medium text-gray-800">关联政策</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {parsedResult.relatedPolicies?.map((policy, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm"
                    >
                      {policy}
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-red-500">解析失败，请重试</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}