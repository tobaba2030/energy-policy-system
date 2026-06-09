import { useState } from 'react';
import { FileText, AlertTriangle, TrendingUp, Calendar, Building, Tag } from 'lucide-react';
import { policies, policyImpactMatrix, regionalImpact, carbonEmissions } from '@/data/policyData';
import PolicyImpactMatrix from '@/components/PolicyImpactMatrix';
import RegionalImpactChart from '@/components/RegionalImpactChart';
import CarbonEmissionChart from '@/components/CarbonEmissionChart';

export default function PolicyIntelligence() {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedPolicy, setSelectedPolicy] = useState(policies[0]);

  const categories = ['全部', ...new Set(policies.map(p => p.category))];

  const filteredPolicies = selectedCategory === '全部' 
    ? policies 
    : policies.filter(p => p.category === selectedCategory);

  const impactLevelColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const impactLevelLabels = {
    high: '高影响',
    medium: '中影响',
    low: '低影响'
  };

  const recentEmissions = carbonEmissions.slice(-5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-8">
        <h1 className="text-2xl font-bold">政策情报影响研究系统</h1>
        <p className="text-blue-100 mt-1">实时监测政策动态，深度分析影响评估，智能预警风险趋势</p>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">政策数据库</h2>
              </div>

              <div className="mb-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredPolicies.map(policy => (
                  <div
                    key={policy.id}
                    onClick={() => setSelectedPolicy(policy)}
                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedPolicy.id === policy.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800 line-clamp-2">{policy.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${impactLevelColors[policy.impactLevel]}`}>
                        {impactLevelLabels[policy.impactLevel]}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {policy.releaseDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {policy.authority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-800">政策详情</h2>
              </div>

              <div className="border-b border-gray-100 pb-4 mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedPolicy.title}</h3>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className={`px-3 py-1 rounded-full ${impactLevelColors[selectedPolicy.impactLevel]}`}>
                    {impactLevelLabels[selectedPolicy.impactLevel]}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {selectedPolicy.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {selectedPolicy.authority}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    {selectedPolicy.releaseDate}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 leading-relaxed">{selectedPolicy.summary}</p>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">关键词</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPolicy.keywords.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {selectedPolicy.targets.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">目标指标</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedPolicy.targets.map((target, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium text-gray-800">{target.year}年</div>
                        <div className="text-xs text-gray-500">{target.metric}</div>
                        <div className="text-lg font-bold text-blue-600">{target.value}{target.metric.includes('占比') ? '%' : target.metric.includes('下降') ? '%' : ''}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <PolicyImpactMatrix data={policyImpactMatrix} />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <RegionalImpactChart data={regionalImpact} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-gray-800">碳排放趋势预警</h2>
              </div>
              <CarbonEmissionChart data={recentEmissions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}