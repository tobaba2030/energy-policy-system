import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface RegionalImpactChartProps {
  data: {
    region: string;
    carbonIntensity: number;
    renewablePotential: number;
    policyImpact: number;
  }[];
}

export default function RegionalImpactChart({ data }: RegionalImpactChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const indicator = [
      { name: '碳排放强度', max: 3 },
      { name: '可再生潜力', max: 100 },
      { name: '政策影响', max: 3 }
    ];

    const seriesData = data.map(item => ({
      name: item.region,
      value: [item.carbonIntensity, item.renewablePotential, item.policyImpact]
    }));

    const option: echarts.EChartsOption = {
      title: {
        text: '区域政策影响雷达图',
        left: 'center',
        textStyle: {
          color: '#1e293b',
          fontSize: 16,
          fontWeight: 600
        }
      },
      tooltip: {},
      legend: {
        data: data.map(d => d.region),
        bottom: 10,
        textStyle: {
          color: '#64748b'
        }
      },
      radar: {
        indicator,
        center: ['50%', '50%'],
        radius: '65%',
        splitNumber: 4,
        shape: 'polygon',
        axisName: {
          color: '#64748b',
          fontSize: 12
        },
        splitLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(99, 102, 241, 0.05)', 'rgba(99, 102, 241, 0.1)', 'rgba(99, 102, 241, 0.15)', 'rgba(99, 102, 241, 0.2)']
          }
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        }
      },
      series: [{
        type: 'radar',
        emphasis: {
          lineStyle: {
            width: 4
          }
        },
        data: seriesData.map((item, index) => ({
          ...item,
          lineStyle: {
            width: 2,
            color: ['#6366f1', '#22c55e', '#ef4444', '#f59e0b', '#3b82f6', '#ec4899', '#06b6d4', '#8b5cf6'][index]
          },
          areaStyle: {
            color: ['rgba(99, 102, 241, 0.2)', 'rgba(34, 197, 94, 0.2)', 'rgba(239, 68, 68, 0.2)', 'rgba(245, 158, 11, 0.2)', 'rgba(59, 130, 246, 0.2)', 'rgba(236, 72, 153, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgba(139, 92, 246, 0.2)'][index]
          },
          symbol: 'circle',
          symbolSize: 6
        }))
      }],
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    };

    chartInstance.current.setOption(option, true);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [data]);

  return <div ref={chartRef} className="w-full h-80" />;
}