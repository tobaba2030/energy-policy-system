import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EnergyStructureChartProps {
  year: number;
  data: {
    year: number;
    coal: number;
    oil: number;
    naturalGas: number;
    nuclear: number;
    hydro: number;
    wind: number;
    solar: number;
    total: number;
  }[];
}

export default function EnergyStructureChart({ year, data }: EnergyStructureChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const currentData = data.find(d => d.year === year);
    if (!currentData) return;

    const option: echarts.EChartsOption = {
      title: {
        text: `${year}年能源结构`,
        left: 'center',
        textStyle: {
          color: '#1e293b',
          fontSize: 16,
          fontWeight: 600
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}亿吨标准煤 ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#64748b'
        }
      },
      series: [
        {
          name: '能源结构',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            formatter: '{b}: {d}%'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [
            { value: currentData.coal, name: '煤炭', itemStyle: { color: '#64748b' } },
            { value: currentData.oil, name: '石油', itemStyle: { color: '#94a3b8' } },
            { value: currentData.naturalGas, name: '天然气', itemStyle: { color: '#cbd5e1' } },
            { value: currentData.nuclear, name: '核电', itemStyle: { color: '#22c55e' } },
            { value: currentData.hydro, name: '水电', itemStyle: { color: '#3b82f6' } },
            { value: currentData.wind, name: '风电', itemStyle: { color: '#06b6d4' } },
            { value: currentData.solar, name: '太阳能', itemStyle: { color: '#fbbf24' } }
          ]
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
  }, [year, data]);

  return <div ref={chartRef} className="w-full h-80" />;
}