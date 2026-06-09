import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { PolicyImpact, businessSegments } from '@/data/businessImpactData';

interface PolicyBusinessMatrixProps {
  impacts: PolicyImpact[];
  segments: { id: string; name: string }[];
}

export default function PolicyBusinessMatrix({ impacts, segments }: PolicyBusinessMatrixProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const policies = impacts.map(i => i.policyTitle.length > 15 ? i.policyTitle.substring(0, 15) + '...' : i.policyTitle);
    const segmentNames = segments.map(s => s.name);

    const heatmapData: number[][] = [];
    impacts.forEach((impact, policyIndex) => {
      segments.forEach((segment, segmentIndex) => {
        const segmentImpact = impact.segments.find(s => s.segmentId === segment.id);
        if (segmentImpact) {
          heatmapData.push([segmentIndex, policyIndex, segmentImpact.impactScore]);
        }
      });
    });

    const option: echarts.EChartsOption = {
      title: {
        text: '政策业务影响矩阵',
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
          const impact = impacts[yIndex].segments.find(
            s => s.segmentId === segments[xIndex].id
          );
          return `
            <div style="font-weight: bold; margin-bottom: 4px;">${impacts[yIndex].policyTitle}</div>
            <div style="margin-bottom: 4px;">${segments[xIndex].name}</div>
            <div style="color: ${value > 0 ? '#22c55e' : value < 0 ? '#ef4444' : '#6b7280'}">
              影响得分: ${value}
            </div>
            ${impact ? `<div style="margin-top: 4px; font-size: 12px;">${impact.analysis}</div>` : ''}
          `;
        }
      },
      grid: {
        left: '15%',
        right: '12%',
        bottom: '15%',
        top: '15%'
      },
      xAxis: {
        type: 'category',
        data: segmentNames,
        splitArea: {
          show: true
        },
        axisLabel: {
          color: '#64748b',
          rotate: 30,
          interval: 0
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
        min: -100,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        textStyle: {
          color: '#64748b'
        },
        inRange: {
          color: ['#ef4444', '#fca5a5', '#f1f5f9', '#86efac', '#22c55e']
        }
      },
      series: [
        {
          name: '政策影响',
          type: 'heatmap',
          data: heatmapData,
          label: {
            show: true,
            formatter: (params: any) => params.data[2].toString(),
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
  }, [impacts, segments]);

  return <div ref={chartRef} className="w-full h-96" />;
}