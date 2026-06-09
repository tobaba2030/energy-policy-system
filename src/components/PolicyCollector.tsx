import { useState } from 'react';
import { Globe, RefreshCw, Clock, CheckCircle, AlertCircle, ExternalLink, Calendar, FolderOpen, Play, Pause, Settings, Link2 } from 'lucide-react';

interface PolicySource {
  id: string;
  name: string;
  url: string;
  category: string;
  type: string;
  lastCrawl: string;
  status: 'active' | 'inactive' | 'error';
  frequency: string;
  description: string;
  documentCount: number;
}

interface PolicyDocument {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  publishDate: string;
  category: string;
  format: string;
  size: string;
  status: 'pending' | 'downloading' | 'parsing' | 'completed' | 'failed';
  priority: 'high' | 'medium' | 'low';
  keywords: string[];
}

const policySources: PolicySource[] = [
  {
    id: 'nea',
    name: '国家能源局',
    url: 'https://www.nea.gov.cn',
    category: '国家部委',
    type: '官方文件',
    lastCrawl: '2024-03-26 08:30',
    status: 'active',
    frequency: '每小时',
    description: '国家能源局官网政策文件、通知公告、能源规划',
    documentCount: 156
  },
  {
    id: 'ndrc',
    name: '国家发展改革委',
    url: 'https://www.ndrc.gov.cn',
    category: '国家部委',
    type: '政策文件',
    lastCrawl: '2024-03-26 07:45',
    status: 'active',
    frequency: '每小时',
    description: '宏观经济政策、能源价格改革、项目审批',
    documentCount: 234
  },
  {
    id: 'mee',
    name: '生态环境部',
    url: 'https://www.mee.gov.cn',
    category: '国家部委',
    type: '环保政策',
    lastCrawl: '2024-03-26 09:00',
    status: 'active',
    frequency: '每2小时',
    description: '碳排放权交易、环保法规、污染防治',
    documentCount: 89
  },
  {
    id: 'gov',
    name: '国务院',
    url: 'https://www.gov.cn',
    category: '国务院',
    type: '重大政策',
    lastCrawl: '2024-03-26 06:00',
    status: 'active',
    frequency: '每日',
    description: '国务院重大政策文件、规划纲要',
    documentCount: 45
  },
  {
    id: 'cec',
    name: '中国电力企业联合会',
    url: 'https://www.cec.org.cn',
    category: '行业协会',
    type: '行业报告',
    lastCrawl: '2024-03-25 18:00',
    status: 'active',
    frequency: '每日',
    description: '电力行业数据统计、行业发展报告',
    documentCount: 112
  },
  {
    id: 'cnea',
    name: '中国能源研究会',
    url: 'https://www.chinaenergy.org.cn',
    category: '行业协会',
    type: '研究报告',
    lastCrawl: '2024-03-25 12:00',
    status: 'active',
    frequency: '每日',
    description: '能源政策研究、学术论文、行业标准',
    documentCount: 67
  }
];

const mockPolicyDocuments: PolicyDocument[] = [
  {
    id: 'pol-001',
    title: '关于进一步完善分时电价机制的通知',
    source: '国家发展改革委',
    sourceUrl: 'https://www.ndrc.gov.cn/...',
    publishDate: '2024-03-25',
    category: '电力改革',
    format: 'PDF',
    size: '256 KB',
    status: 'completed',
    priority: 'high',
    keywords: ['分时电价', '峰谷电价', '电力市场']
  },
  {
    id: 'pol-002',
    title: '2024年能源工作指导意见',
    source: '国家能源局',
    sourceUrl: 'https://www.nea.gov.cn/...',
    publishDate: '2024-03-24',
    category: '能源规划',
    format: 'PDF',
    size: '1.2 MB',
    status: 'completed',
    priority: 'high',
    keywords: ['能源工作', '发展规划', '双碳目标']
  },
  {
    id: 'pol-003',
    title: '碳排放权交易管理暂行条例',
    source: '生态环境部',
    sourceUrl: 'https://www.mee.gov.cn/...',
    publishDate: '2024-03-23',
    category: '碳市场',
    format: 'PDF',
    size: '512 KB',
    status: 'parsing',
    priority: 'high',
    keywords: ['碳排放权', '碳交易', '碳市场']
  },
  {
    id: 'pol-004',
    title: '新型储能发展行动计划',
    source: '国家能源局',
    sourceUrl: 'https://www.nea.gov.cn/...',
    publishDate: '2024-03-22',
    category: '储能政策',
    format: 'PDF',
    size: '890 KB',
    status: 'completed',
    priority: 'medium',
    keywords: ['储能', '新能源', '电网']
  },
  {
    id: 'pol-005',
    title: '关于促进氢能产业发展的指导意见',
    source: '国家发展改革委',
    sourceUrl: 'https://www.ndrc.gov.cn/...',
    publishDate: '2024-03-21',
    category: '氢能政策',
    format: 'PDF',
    size: '756 KB',
    status: 'downloading',
    priority: 'medium',
    keywords: ['氢能', '新能源', '产业政策']
  },
  {
    id: 'pol-006',
    title: '电力现货市场基本规则',
    source: '国家能源局',
    sourceUrl: 'https://www.nea.gov.cn/...',
    publishDate: '2024-03-20',
    category: '电力市场',
    format: 'PDF',
    size: '1.1 MB',
    status: 'completed',
    priority: 'high',
    keywords: ['电力现货', '市场规则', '电改']
  }
];

export default function PolicyCollector() {
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectProgress, setCollectProgress] = useState(0);
  const [selectedSources, setSelectedSources] = useState<string[]>(policySources.map(s => s.id));
  const [documents, setDocuments] = useState<PolicyDocument[]>(mockPolicyDocuments);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [autoCollect, setAutoCollect] = useState(true);

  const handleCollect = () => {
    if (selectedSources.length === 0) return;
    
    setIsCollecting(true);
    setCollectProgress(0);

    const interval = setInterval(() => {
      setCollectProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCollecting(false);
          
          setDocuments(prevDocs => {
            const newDoc: PolicyDocument = {
              id: `pol-${Date.now()}`,
              title: '关于印发2024年电力市场化改革工作方案的通知',
              source: '国家发展改革委',
              sourceUrl: 'https://www.ndrc.gov.cn/...',
              publishDate: new Date().toISOString().split('T')[0],
              category: '电力改革',
              format: 'PDF',
              size: '328 KB',
              status: 'completed',
              priority: 'high',
              keywords: ['电力市场化', '改革', '交易规则']
            };
            return [newDoc, ...prevDocs];
          });
          
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const toggleSource = (id: string) => {
    setSelectedSources(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span>;
      case 'inactive':
        return <span className="w-3 h-3 bg-gray-400 rounded-full"></span>;
      case 'error':
        return <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'downloading':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'parsing':
        return <Settings className="w-4 h-4 text-purple-500 animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const filteredDocuments = filterStatus === 'all' 
    ? documents 
    : documents.filter(d => d.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-lg">公开渠道政策文件采集</h3>
              <p className="text-sm text-gray-500">自动采集国家部委、行业协会官网政策文件</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoCollect}
                onChange={(e) => setAutoCollect(e.target.checked)}
                className="w-4 h-4 text-green-600 rounded"
              />
              自动采集
            </label>
            <button
              onClick={handleCollect}
              disabled={isCollecting || selectedSources.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isCollecting || selectedSources.length === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isCollecting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isCollecting ? `采集中 ${collectProgress}%` : '开始采集'}</span>
            </button>
          </div>
        </div>

        {isCollecting && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-600">正在从 {selectedSources.length} 个来源采集政策文件...</span>
              <span className="text-sm font-medium text-blue-600">{collectProgress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-200"
                style={{ width: `${collectProgress}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {policySources.map(source => (
            <div
              key={source.id}
              onClick={() => toggleSource(source.id)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                selectedSources.includes(source.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  source.category === '国家部委' ? 'bg-blue-100 text-blue-600' :
                  source.category === '国务院' ? 'bg-red-100 text-red-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  <Link2 className="w-4 h-4" />
                </div>
                {getStatusIcon(source.status)}
              </div>
              <div className="font-medium text-gray-800 text-sm truncate">{source.name}</div>
              <div className="text-xs text-gray-500">{source.documentCount}份文件</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">采集的政策文件</h3>
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">全部状态</option>
              <option value="completed">已完成</option>
              <option value="parsing">解析中</option>
              <option value="downloading">下载中</option>
              <option value="pending">待处理</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredDocuments.map(doc => (
            <div key={doc.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{getStatusIcon(doc.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs border ${getPriorityColor(doc.priority)}`}>
                          {doc.priority === 'high' ? '高优先' : doc.priority === 'medium' ? '中优先' : '低优先'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs bg-gray-200 text-gray-600">{doc.category}</span>
                      </div>
                      <h4 className="font-medium text-gray-800">{doc.title}</h4>
                    </div>
                    <a
                      href={doc.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FolderOpen className="w-3 h-3" />
                      {doc.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {doc.publishDate}
                    </span>
                    <span>{doc.format}</span>
                    <span>{doc.size}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {doc.keywords.map((kw, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无符合条件的政策文件</p>
          </div>
        )}
      </div>
    </div>
  );
}