import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { GitBranch } from 'lucide-react';

const LoadFlowSankey: React.FC = () => {
  const chartOption = useMemo(() => {
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: '#475569',
        borderWidth: 1,
        textStyle: {
          color: '#e2e8f0',
        },
        formatter: (params: any) => {
          if (params.dataType === 'node') {
            return `
              <div style="padding: 8px;">
                <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px;">${params.name}</div>
                <div style="display: flex; justify-content: space-between; gap: 16px;">
                  <span style="color: #94a3b8;">负荷总量:</span>
                  <span style="font-weight: 600; color: #e2e8f0;">${params.value} MW</span>
                </div>
              </div>
            `;
          } else if (params.dataType === 'edge') {
            return `
              <div style="padding: 8px;">
                <div style="font-weight: 600; margin-bottom: 4px; font-size: 14px;">${params.data.source} → ${params.data.target}</div>
                <div style="display: flex; justify-content: space-between; gap: 16px;">
                  <span style="color: #94a3b8;">负荷流量:</span>
                  <span style="font-weight: 600; color: ${params.data.lineStyle.color};">${params.data.value} MW</span>
                </div>
              </div>
            `;
          }
          return '';
        },
      },
      series: [
        {
          type: 'sankey',
          layout: 'none',
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              opacity: 0.8,
              width: 3,
            },
          },
          nodeAlign: 'justify',
          nodeGap: 12,
          nodeWidth: 25,
          layoutIterations: 32,
          data: [
            { 
              name: '总负荷', 
              value: 12850, 
              itemStyle: { 
                color: '#8b5cf6',
                borderColor: '#7c3aed',
                borderWidth: 2,
              } 
            },
            { 
              name: '大工业用电', 
              value: 5200, 
              itemStyle: { 
                color: '#5470c6',
                borderColor: '#3b4f80',
                borderWidth: 2,
              } 
            },
            { 
              name: '工商业及其他', 
              value: 3100, 
              itemStyle: { 
                color: '#91cc75',
                borderColor: '#65a350',
                borderWidth: 2,
              } 
            },
            { 
              name: '普通工业', 
              value: 1800, 
              itemStyle: { 
                color: '#fac858',
                borderColor: '#ca8a04',
                borderWidth: 2,
              } 
            },
            { 
              name: '非工业', 
              value: 1500, 
              itemStyle: { 
                color: '#73c0de',
                borderColor: '#0891b2',
                borderWidth: 2,
              } 
            },
            { 
              name: '商业', 
              value: 1250, 
              itemStyle: { 
                color: '#3ba272',
                borderColor: '#15803d',
                borderWidth: 2,
              } 
            },
          ],
          links: [
            { source: '总负荷', target: '大工业用电', value: 5200, lineStyle: { color: '#5470c6', opacity: 0.5 } },
            { source: '总负荷', target: '工商业及其他', value: 3100, lineStyle: { color: '#91cc75', opacity: 0.5 } },
            { source: '总负荷', target: '普通工业', value: 1800, lineStyle: { color: '#fac858', opacity: 0.5 } },
            { source: '总负荷', target: '非工业', value: 1500, lineStyle: { color: '#73c0de', opacity: 0.5 } },
            { source: '总负荷', target: '商业', value: 1250, lineStyle: { color: '#3ba272', opacity: 0.5 } },
          ],
          lineStyle: {
            curveness: 0.5,
            opacity: 0.5,
          },
          itemStyle: {
            borderWidth: 2,
            borderRadius: 4,
          },
          label: {
            fontSize: 12,
            fontWeight: 600,
            color: '#e2e8f0',
          },
        },
      ],
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-white" />
        </div>
        负荷流向分析
      </h3>
      <div className="flex-1 min-h-0">
        <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default LoadFlowSankey;
