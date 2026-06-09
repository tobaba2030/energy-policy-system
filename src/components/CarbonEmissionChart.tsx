import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface CarbonEmissionChartProps {
  data: {
    year: number;
    total: number;
    energy: number;
    industry: number;
    transportation: number;
    buildings: number;
  }[];
}

export default function CarbonEmissionChart({ data }: CarbonEmissionChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option: echarts.EChartsOption = {
      title: {
        text: '碳排放趋势（按部门）',
        left: 'center',
        textStyle: {
          color: '#1e293b',
          fontSize: 16,
          fontWeight: 600
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['总量', '能源', '工业', '交通', '建筑'],
        bottom: 10,
        textStyle: {
          color: '#64748b'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(d => d.year.toString()),
        axisLabel: {
          color: '#64748b'
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '碳排放（亿吨CO₂）',
        nameTextStyle: {
          color: '#64748b'
        },
        axisLabel: {
          color: '#64748b'
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#f1f5f9'
          }
        }
      },
      series: [
        {
          name: '总量',
          type: 'line',
          data: data.map(d => d.total),
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#ef4444'
          },
          itemStyle: {
            color: '#ef4444'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0.05)' }
            ])
          }
        },
        {
          name: '能源',
          type: 'line',
          data: data.map(d => d.energy),
          smooth: true,
          lineStyle: {
            width: 2,
            color: '#f97316'
          },
          itemStyle: {
            color: '#f97316'
          }
        },
        {
          name: '工业',
          type: 'line',
          data: data.map(d => d.industry),
          smooth: true,
          lineStyle: {
            width: 2,
            color: '#eab308'
          },
          itemStyle: {
            color: '#eab308'
          }
        },
        {
          name: '交通',
          type: 'line',
          data: data.map(d => d.transportation),
          smooth: true,
          lineStyle: {
            width: 2,
            color: '#3b82f6'
          },
          itemStyle: {
            color: '#3b82f6'
          }
        },
        {
          name: '建筑',
          type: 'line',
          data: data.map(d => d.buildings),
          smooth: true,
          lineStyle: {
            width: 2,
            color: '#22c55e'
          },
          itemStyle: {
            color: '#22c55e'
          }
        }
      ],
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