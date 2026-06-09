import { useState } from 'react';
import { Globe, RefreshCw, Clock, CheckCircle, AlertCircle, ExternalLink, Calendar, FolderOpen } from 'lucide-react';

interface Source {
  id: string;
  name: string;
  url: string;
  category: string;
  lastCrawl: string;
  status: 'active' | 'inactive' | 'error';
  frequency: string;
  description: string;
  documentCount: number;
}

interface CrawledDocument {
  id: string;
  title: string;
  source: string;
  url: string;
  publishDate: string;
  type: string;
  size: string;
  status: 'pending' | 'downloading' | 'parsed' | 'completed';
}

const sources: Source[] = [
  {
    id: 'se',
    name: '国家能源局',
    url: 'www.nea.gov.cn',
    category: '政府部门',
    lastCrawl: '2024-03-25 10:30',
    status: 'active',
    frequency: '每小时',
    description: '国家能源局官方网站，发布能源政策法规、规划文件',
    documentCount: 156
  },
  {
    id: 'ndrc',
    name: '国家发展改革委',
    url: 'www.ndrc.gov.cn',
    category: '政府部门',
    lastCrawl: '2024-03-25 09:45',
    status: 'active',
    frequency: '每小时',
    description: '国家发展和改革委员会，发布宏观经济政策和能源规划',
    documentCount: 234
  },
  {
    id: 'mee',
    name: '生态环境部',
    url: 'www.mee.gov.cn',
    category: '政府部门',
    lastCrawl: '2024-03-25 11:00',
    status: 'active',
    frequency: '每2小时',
    description: '生态环境部，发布环保政策和碳排放相关文件',
    documentCount: 89
  },
  {
    id: 'moee',
    name: '工业和信息化部',
    url: 'www.miit.gov.cn',
    category: '政府部门',
    lastCrawl: '2024-03-24 16:20',
    status: 'inactive',
    frequency: '每日',
    description: '工业和信息化部，发布工业和信息化相关政策',
    documentCount: 67
  },
  {
    id: 'cnea',
    name: '中国能源研究会',
    url: 'www.chinaenergy.org.cn',
    category: '行业协会',
    lastCrawl: '2024-03-25 08:00',
    status: 'active',
    frequency: '每日',
    description: '中国能源研究会，发布行业研究报告和学术论文',
    documentCount: 45
  },
  {
    id: 'cec',
    name: '中国电力企业联合会',
    url: 'www.cec.org.cn',
    category: '行业协会',
    lastCrawl: '2024-03-25 07:30',
    status: 'active',
    frequency: '每6小时',
    description: '中国电力企业联合会，发布电力行业相关政策和数据',
    documentCount: 112
  }
];

const mockDocuments: CrawledDocument[] = [
  {
    id: 'doc-001',
    title: '关于进一步完善分时电价机制的通知',
    source: '国家发展改革委',
    url: 'http://www.ndrc.gov.cn/...',
    publishDate: '2024-03-25',
    type: '政策文件',
    size: '256 KB',
    status: 'completed'
  },
  {
    id: 'doc-002',
    title: '2024年能源工作指导意见',
    source: '国家能源局',
    url: 'http://www.nea.gov.cn/...',
    publishDate: '2024-03-24',
    type: '规划文件',
    size: '1.2 MB',
    status: 'completed'
  },
  {
    id: 'doc-003',
    title: '碳排放权交易市场建设方案',
    source: '生态环境部',
    url: 'http://www.mee.gov.cn/...',
    publishDate: '2024-03-23',
    type: '政策文件',
    size: '512 KB',
    status: 'parsed'
  },
  {
    id: 'doc-004',
    title: '新型储能发展行动计划',
    source: '国家能源局',
    url: 'http://www.nea.gov.cn/...',
    publishDate: '2024-03-22',
    type: '规划文件',
    size: '890 KB',
    status: 'completed'
  },
  {
    id: 'doc-005',
    title: '电力体制改革深化方案',
    source: '国家发展改革委',
    url: 'http://www.ndrc.gov.cn/...',
    publishDate: '2024-03-21',
    type: '政策文件',
    size: '1.5 MB',
    status: 'downloading'
  }
];

export default function FileCollector() {
  const [isCollecting, setIsCollecting] = useState(false);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [documents, setDocuments] = useState(mockDocuments);
  const [collectProgress, setCollectProgress] = useState(0);

  const handleCollect = () => {
    setIsCollecting(true);
    setCollectProgress(0);

    const interval = setInterval(() => {
      setCollectProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsCollecting(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />;
      case 'inactive':
        return <span className="w-2 h-2 bg-gray-400 rounded-full" />;
      case 'error':
        return <span className="w-2 h-2 bg-red-500 rounded-full" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'downloading':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'parsed':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return '运行中';
      case 'inactive':
        return '已暂停';
      case 'error':
        return '异常';
      case 'completed':
        return '已完成';
      case 'downloading':
        return '下载中';
      case 'parsed':
        return '解析中';
      case 'pending':
        return '待处理';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold text-gray-800">公开渠道文件采集</h3>
        </div>
        <button
          onClick={handleCollect}
          disabled={isCollecting}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isCollecting
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isCollecting ? 'animate-spin' : ''}`} />
          <span>{isCollecting ? '采集中...' : '开始采集'}</span>
        </button>
      </div>

      {isCollecting && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600">正在采集公开渠道文件...</span>
            <span className="text-sm text-blue-600">{collectProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all"
              style={{ width: `${collectProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {sources.map(source => (
          <div
            key={source.id}
            onClick={() => setSelectedSource(selectedSource?.id === source.id ? null : source)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedSource?.id === source.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-800">{source.name}</span>
                  {getStatusIcon(source.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {source.url}
                  </span>
                  <span className="flex items-center gap-1">
                    <FolderOpen className="w-3 h-3" />
                    {source.documentCount}份文件
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">采集频率</div>
                <div className="text-sm font-medium text-gray-700">{source.frequency}</div>
              </div>
            </div>
            {selectedSource?.id === source.id && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  上次采集: {source.lastCrawl}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        <h4 className="font-medium text-gray-800 mb-3">最近采集文件</h4>
        <div className="space-y-2">
          {documents.map(doc => (
            <div key={doc.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                {getStatusIcon(doc.status)}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  doc.status === 'completed' ? 'bg-green-100 text-green-800' :
                  doc.status === 'downloading' ? 'bg-blue-100 text-blue-800' :
                  doc.status === 'parsed' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {getStatusText(doc.status)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-800 truncate">{doc.title}</div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{doc.source}</span>
                  <span>{doc.publishDate}</span>
                  <span>{doc.type}</span>
                  <span>{doc.size}</span>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}