import { useState } from 'react';
import { FolderOpen, Upload, Globe, Building, Sparkles, BarChart3, FileText, ArrowRight } from 'lucide-react';
import PolicyCollector from '@/components/PolicyCollector';
import InternalFileUploader from '@/components/InternalFileUploader';
import FileParser from '@/components/FileParser';

export default function FileManagement() {
  const [activeTab, setActiveTab] = useState<'collect' | 'internal' | 'parse'>('collect');

  const tabs = [
    { 
      id: 'collect', 
      label: '公开渠道采集', 
      icon: Globe,
      description: '自动采集国家部委、行业协会政策文件',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'internal', 
      label: '内部文件上传', 
      icon: Building,
      description: '上传和管理集团内部政策研究文件',
      color: 'from-blue-500 to-indigo-600'
    },
    { 
      id: 'parse', 
      label: '智能解析', 
      icon: Sparkles,
      description: 'AI智能解析政策文件内容',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const stats = [
    { label: '采集文件', value: '156', icon: Globe, color: 'bg-green-500' },
    { label: '内部文件', value: '42', icon: Building, color: 'bg-blue-500' },
    { label: '已解析', value: '89', icon: Sparkles, color: 'bg-purple-500' },
    { label: '本周新增', value: '23', icon: BarChart3, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white py-6 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">文件管理中心</h1>
              <p className="text-emerald-100 mt-1">公开采集 · 内部上传 · 智能解析</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'collect' | 'internal' | 'parse')}
                className={`p-6 text-center transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-br ${tab.color} text-white`
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}>
                  <tab.icon className={`w-7 h-7 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <div className={`font-semibold text-lg mb-1 ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-800'
                }`}>
                  {tab.label}
                </div>
                <div className={`text-sm ${
                  activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {tab.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'collect' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-5 h-5 text-green-500" />
                <h2 className="font-semibold text-gray-800 text-lg">公开渠道政策文件采集</h2>
              </div>
              <PolicyCollector />
            </div>
          )}

          {activeTab === 'internal' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building className="w-5 h-5 text-blue-500" />
                <h2 className="font-semibold text-gray-800 text-lg">内部文件上传管理</h2>
              </div>
              <InternalFileUploader />
            </div>
          )}

          {activeTab === 'parse' && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h2 className="font-semibold text-gray-800 text-lg">文件智能解析</h2>
              </div>
              <FileParser />
            </div>
          )}
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="font-semibold text-lg mb-4">情报信息传递链条</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">公开渠道采集</div>
                <div className="text-sm text-white/70">国家部委政策文件</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white/50" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">智能解析</div>
                <div className="text-sm text-white/70">提取关键信息</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-white/50" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium">知识入库</div>
                <div className="text-sm text-white/70">更新知识图谱</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}