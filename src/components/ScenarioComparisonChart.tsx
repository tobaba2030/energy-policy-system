import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ImpactResult, Scenario } from '@/data/policyData';

interface ScenarioComparisonChartProps {
  results: ImpactResult[];
  scenarios: Scenario[];
  metric: 'carbonPeakYear' | 'carbonNeutralYear' | 'renewableShare' | 'economicImpact';
}

export default function ScenarioComparisonChart({ results, scenarios, metric }: ScenarioComparisonChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const years = [...new Set(results.map(r => r.year))].sort((a, b) => a - b);
    const metricLabels: Record<string, string> = {
      carbonPeakYear: '碳达峰年份',
      carbonNeutralYear: '碳中和年份',
      renewableShare: '可再生能源占比(%)',
      economicImpact: '经济影响(%)'
    };

    const series = scenarios.map(scenario => {
      const scenarioResults = results
        .filter(r => r.scenarioId === scenario.id)
        .sort((a, b) => a.year - b.year);

      return {
        name: scenario.name,
        type: 'line' as const,
        data: scenarioResults.map(r => r[metric]),
        smooth: true,
        lineStyle: {
          width: 3,
          color: scenario.color
        },
        itemStyle: {
          color: scenario.color
        },
        symbol: 'circle',
        symbolSize: 8
      };
    });

    const option: echarts.EChartsOption = {
      title: {
        text: `${metricLabels[metric]}情景对比`,
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
        data: scenarios.map(s => s.name),
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
      yAxis: {
        type: 'value',
        name: metricLabels[metric],
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
      series,
      animationDuration: 1500,
      animationEasing: 'cubicOut'
    };

    chartInstance.current.setOption(option, true);

    const handleResize = () => {
      chartInstance.current?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [results, scenarios, metric]);

  return <div ref={chartRef} className="w-full h-80" />;
}