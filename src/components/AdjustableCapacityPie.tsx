import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { PieChart, TrendingUp, TrendingDown, Info } from 'lucide-react';

const categories = ['大工业用电', '工商业及其他用电', '普通工业', '非工业', '商业'];

const maxUpData = [
  { value: 2800, name: '大工业用电' },
  { value: 1500, name: '工商业及其他用电' },
  { value: 850, name: '普通工业' },
  { value: 500, name: '非工业' },
  { value: 350, name: '商业' },
];

const maxDownData = [
  { value: 2600, name: '大工业用电' },
  { value: 1300, name: '工商业及其他用电' },
  { value: 750, name: '普通工业' },
  { value: 450, name: '非工业' },
  { value: 300, name: '商业' },
];

const colorPalette = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];

const AdjustableCapacityPie: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'up' | 'down'>('up');

  const chartOption = useMemo(() => {
    const data = activeTab === 'up' ? maxUpData : maxDownData;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: '#475569',
        borderWidth: 1,
        textStyle: {
          color: '#e2e8f0',
        },
        formatter: (params: any) => {
          const percent = ((params.value / total) * 100).toFixed(1);
          return `
            <div style="padding: 8px;">
              <div style="font-weight: 600; margin-bottom: 4px;">${params.name}</div>
              <div style="display: flex; justify-content: space-between; gap: 16px;">
                <span style="color: #94a3b8;">可调能力:</span>
                <span style="font-weight: 600; color: ${params.color};">${params.value} MW</span>
              </div>
              <div style="display: flex; justify-content: space-between; gap: 16px;">
                <span style="color: #94a3b8;">占比:</span>
                <span style="font-weight: 600; color: #e2e8f0;">${percent}%</span>
              </div>
            </div>
          `;
        },
      },
      legend: {
        orient: 'vertical',
        right: '3%',
        top: 'center',
        itemWidth: 14,
        itemHeight: 14,
        itemGap: 12,
        textStyle: {
          fontSize: 12,
          color: '#94a3b8',
          fontWeight: 500,
        },
        formatter: (name: string) => {
          const item = data.find(d => d.name === name);
          if (item) {
            const percent = ((item.value / total) * 100).toFixed(1);
            return `${name}  ${percent}%`;
          }
          return name;
        },
      },
      series: [
        {
          name: activeTab === 'up' ? '最大上调能力' : '最大下调能力',
          type: 'pie',
          radius: ['50%', '80%'],
          center: ['35%', '50%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 6,
            borderColor: '#1e293b',
            borderWidth: 3,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)',
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            scale: true,
            scaleSize: 10,
            itemStyle: {
              shadowBlur: 20,
              shadowColor: 'rgba(0, 0, 0, 0.4)',
            },
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              formatter: () => {
                return `{name|${activeTab === 'up' ? '最大上调' : '最大下调'}}\n{value|${total} MW}\n{percent|可调能力}`;
              },
              rich: {
                name: {
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#e2e8f0',
                  lineHeight: 22,
                },
                value: {
                  fontSize: 20,
                  fontWeight: 700,
                  color: activeTab === 'up' ? '#22c55e' : '#f97316',
                },
                percent: {
                  fontSize: 12,
                  color: '#94a3b8',
                },
              },
            },
          },
          labelLine: {
            show: false,
          },
          data: data.map((item, index) => ({
            ...item,
            itemStyle: { color: colorPalette[index] },
          })),
        },
      ],
    };
  }, [activeTab]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <PieChart className="w-4 h-4 text-white" />
          </div>
          用电类别可调能力构成
        </h3>
        <div className="group relative">
          <Info className="w-4 h-4 text-slate-400 cursor-help" />
          <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-slate-900 text-slate-300 text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-slate-700">
            <p className="font-semibold mb-1 text-white">用电类别说明:</p>
            <ul className="space-y-1">
              <li>• 大工业用电: 高耗能工业企业</li>
              <li>• 工商业及其他: 商业综合体、写字楼</li>
              <li>• 普通工业: 中小型制造企业</li>
              <li>• 非工业: 公共服务、事业单位</li>
              <li>• 商业: 零售、餐饮、酒店等</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2 mb-3">
        <button
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'up'
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
          }`}
          onClick={() => setActiveTab('up')}
        >
          <TrendingUp className="w-4 h-4" />
          上调能力
        </button>
        <button
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            activeTab === 'down'
              ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
              : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
          }`}
          onClick={() => setActiveTab('down')}
        >
          <TrendingDown className="w-4 h-4" />
          下调能力
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default AdjustableCapacityPie;
