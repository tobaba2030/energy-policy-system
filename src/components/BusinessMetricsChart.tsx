import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { BusinessMetrics } from '@/data/businessImpactData';

interface BusinessMetricsChartProps {
  data: BusinessMetrics[];
  segmentId: string;
  yearRange?: { min: number; max: number };
}

export default function BusinessMetricsChart({ data, segmentId, yearRange }: BusinessMetricsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const filteredData = data.filter(d => d.segmentId === segmentId);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const years = [...new Set(filteredData.map(d => d.year))].sort();

    const option: echarts.EChartsOption = {
      title: {
        text: '业务指标趋势',
        left: 'center',
        textStyle: {
          color: '#1e293b',
          fontSize: 14,
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
        data: ['装机容量(MW)', '发电量(亿kWh)', '利用小时'],
        bottom: 0,
        textStyle: {
          color: '#64748b'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '18%',
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: years.map(y => y.toString()),
        axisLabel: {
          color: '#64748b'
        },
        axisLine: {
          lineStyle: {
            color: '#e2e8f0'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '容量/发电量',
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
        {
          type: 'value',
          name: '利用小时',
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
            show: false
          }
        }
      ],
      series: [
        {
          name: '装机容量(MW)',
          type: 'bar',
          data: filteredData.map(d => d.capacity),
          itemStyle: {
            color: '#3b82f6'
          }
        },
        {
          name: '发电量(亿kWh)',
          type: 'bar',
          data: filteredData.map(d => d.generation),
          itemStyle: {
            color: '#22c55e'
          }
        },
        {
          name: '利用小时',
          type: 'line',
          yAxisIndex: 1,
          data: filteredData.map(d => d.utilization),
          smooth: true,
          lineStyle: {
            width: 3,
            color: '#f59e0b'
          },
          itemStyle: {
            color: '#f59e0b'
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
  }, [filteredData]);

  return <div ref={chartRef} className="w-full h-72" />;
}