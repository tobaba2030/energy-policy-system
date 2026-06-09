import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface PolicyImpactMatrixProps {
  data: {
    policy: string;
    impact: string;
    score: number;
  }[];
}

export default function PolicyImpactMatrix({ data }: PolicyImpactMatrixProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const policies = [...new Set(data.map(d => d.policy))];
    const impacts = [...new Set(data.map(d => d.impact))];

    const heatmapData = data.map(item => [
      impacts.indexOf(item.impact),
      policies.indexOf(item.policy),
      item.score
    ]);

    const option: echarts.EChartsOption = {
      title: {
        text: '政策影响评估矩阵',
        left: 'center',
        textStyle: {
          color: '#1e293b',
          fontSize: 16,
          fontWeight: 600
        }
      },
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          const [xIndex, yIndex, value] = params.data;
          return `${policies[yIndex]}<br/>${impacts[xIndex]}: ${value}分`;
        }
      },
      grid: {
        left: '15%',
        right: '10%',
        bottom: '15%',
        top: '15%'
      },
      xAxis: {
        type: 'category',
        data: impacts,
        splitArea: {
          show: true
        },
        axisLabel: {
          color: '#64748b',
          rotate: 30
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: policies,
        splitArea: {
          show: true
        },
        axisLabel: {
          color: '#64748b'
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        }
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        textStyle: {
          color: '#64748b'
        },
        inRange: {
          color: ['#dbeafe', '#93c5fd', '#3b82f6', '#1d4ed8', '#6366f1']
        }
      },
      series: [
        {
          name: '政策影响',
          type: 'heatmap',
          data: heatmapData,
          label: {
            show: true,
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ],
      animationDuration: 1000,
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