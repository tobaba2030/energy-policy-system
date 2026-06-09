import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, Target, ArrowRight } from 'lucide-react';
import { BusinessSegment } from '@/data/businessImpactData';

interface BusinessImpactAnalysisProps {
  segments: BusinessSegment[];
  onSelectSegment?: (segment: BusinessSegment) => void;
}

export default function BusinessImpactAnalysis({ segments, onSelectSegment }: BusinessImpactAnalysisProps) {
  const [selectedSegment, setSelectedSegment] = useState<BusinessSegment | null>(null);

  const handleSegmentClick = (segment: BusinessSegment) => {
    setSelectedSegment(segment);
    onSelectSegment?.(segment);
  };

  const getImpactIcon = (type: 'opportunity' | 'challenge' | 'neutral') => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'challenge':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactBg = (type: 'opportunity' | 'challenge' | 'neutral') => {
    switch (type) {
      case 'opportunity':
        return 'bg-green-50 border-green-200';
      case 'challenge':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: 'high' | 'medium' | 'low') => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">业务板块影响分析</h2>
          <p className="text-sm text-gray-500">最新政策对各业务板块的具体影响评估</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {segments.map(segment => (
          <div
            key={segment.id}
            onClick={() => handleSegmentClick(segment)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedSegment?.id === segment.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="text-3xl mb-2">{segment.icon}</div>
            <div className="font-medium text-gray-800 text-sm mb-1">{segment.name}</div>
            <div className={`text-lg font-bold ${getGrowthColor(segment.keyMetrics.growth)}`}>
              {segment.keyMetrics.growth > 0 ? '+' : ''}{segment.keyMetrics.growth}%
            </div>
            <div className="text-xs text-gray-500">
              {segment.keyMetrics.capacity.toLocaleString()} {segment.keyMetrics.unit}
            </div>
          </div>
        ))}
      </div>

      {selectedSegment && (
        <div className="border-t pt-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">{selectedSegment.icon}</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedSegment.name}</h3>
              <p className="text-gray-600 text-sm">{selectedSegment.description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">装机容量</div>
              <div className="text-2xl font-bold text-gray-800">
                {selectedSegment.keyMetrics.capacity.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">{selectedSegment.keyMetrics.unit}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className="font-medium text-gray-800">政策影响评估</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedSegment.impacts.map((impact, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getImpactBg(impact.type)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getImpactIcon(impact.type)}
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getUrgencyColor(impact.urgency)}`}>
                        {impact.urgency === 'high' ? '高' : impact.urgency === 'medium' ? '中' : '低'}优先级
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      impact.type === 'opportunity' ? 'bg-green-100 text-green-800' :
                      impact.type === 'challenge' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {impact.type === 'opportunity' ? '机遇' : impact.type === 'challenge' ? '挑战' : '中性'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{impact.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-800">应对建议</span>
            </div>
            <div className="space-y-2">
              {selectedSegment.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}