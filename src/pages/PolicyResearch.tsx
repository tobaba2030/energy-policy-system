import { useState } from 'react';
import { FileText, Clock, CheckCircle, RefreshCw, Download, Bell, Filter, BookOpen, Layers, Target } from 'lucide-react';
import { reportLevels, businessSegments, policyImpacts, businessMetricHistory } from '@/data/businessImpactData';
import BusinessImpactAnalysis from '@/components/BusinessImpactAnalysis';
import PolicyBusinessMatrix from '@/components/PolicyBusinessMatrix';
import BusinessMetricsChart from '@/components/BusinessMetricsChart';

export default function PolicyResearch() {
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedSegment, setSelectedSegment] = useState<string>('thermal');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const allReports = reportLevels.flatMap(level => level.reports);
  const filteredReports = selectedLevel === 'all'
    ? allReports
    : allReports.filter(r => r.level === selectedLevel);

  const segment = businessSegments.find(s => s.id === selectedSegment);

  const getStatusIcon = (status: 'published' | 'draft' | 'updating') => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'updating':
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusText = (status: 'published' | 'draft' | 'updating') => {
    switch (status) {
      case 'published':
        return '已发布';
      case 'draft':
        return '草稿';
      case 'updating':
        return '更新中';
    }
  };

  const getStatusBg = (status: 'published' | 'draft' | 'updating') => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'updating':
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-6 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">政研报告专题</h1>
              <p className="text-indigo-100 mt-1">分层分级管理 · 业务版本影响分析 · 最新政策解读</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span>报告订阅</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
              <Download className="w-5 h-5" />
              <span>导出报告</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-semibold text-gray-800">分层分级报告体系</h2>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">全部报告</option>
                    {reportLevels.map(level => (
                      <option key={level.id} value={level.id}>{level.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredReports.map(report => (
                  <div key={report.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div
                      onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBg(report.status)}`}>
                              {getStatusIcon(report.status)}
                              <span className="ml-1">{getStatusText(report.status)}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">
                              {report.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-1">{report.title}</h3>
                          <p className="text-sm text-gray-500">更新时间: {report.lastUpdated}</p>
                        </div>
                        <div className="text-gray-400">
                          {expandedReport === report.id ? '▲' : '▼'}
                        </div>
                      </div>
                    </div>

                    {expandedReport === report.id && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">报告摘要</h4>
                          <p className="text-sm text-gray-600">{report.summary}</p>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">核心发现</h4>
                          <ul className="space-y-2">
                            {report.keyFindings.map((finding, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{finding}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">涉及政策</h4>
                          <div className="flex flex-wrap gap-2">
                            {report.relatedPolicies.map((policy, index) => (
                              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                                {policy}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">影响业务板块</h4>
                          <div className="flex flex-wrap gap-2">
                            {report.affectedSegments.map((segId, index) => {
                              const seg = businessSegments.find(s => s.id === segId);
                              return seg ? (
                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs flex items-center gap-1">
                                  <span>{seg.icon}</span>
                                  {seg.name}
                                </span>
                              ) : null;
                            })}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
                            <FileText className="w-4 h-4" />
                            查看全文
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                            <Download className="w-4 h-4" />
                            下载
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <PolicyBusinessMatrix
                impacts={policyImpacts}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-800">报告层级说明</h2>
              </div>
              <div className="space-y-4">
                {reportLevels.map(level => (
                  <div key={level.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: level.color }}
                      />
                      <span className="font-medium text-gray-800">{level.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{level.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>受众: {level.audience}</span>
                      <span>频次: {level.frequency}</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 text-sm text-gray-600">
                      报告数量: {level.reports.length}份
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-semibold text-gray-800">业务板块选择</h2>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {businessSegments.map(seg => (
                  <button
                    key={seg.id}
                    onClick={() => setSelectedSegment(seg.id)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      selectedSegment === seg.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-1">{seg.icon}</div>
                    <div className="text-xs text-gray-600">{seg.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {segment && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">{segment.name}指标趋势</h3>
                <BusinessMetricsChart
                  data={businessMetricHistory}
                  segmentId={selectedSegment}
                />
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">报告订阅服务</h3>
              <p className="text-sm text-indigo-100 mb-4">
                订阅感兴趣的报告类别，实时接收最新政策解读和业务影响分析
              </p>
              <button className="w-full px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                立即订阅
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}