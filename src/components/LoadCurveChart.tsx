import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { Factory, Car, Building, TrendingUp } from 'lucide-react';

const resourceTypes = [
  { id: 'all', name: '全部资源', icon: TrendingUp, color: '#8b5cf6' },
  { id: 'electrolyticAluminum', name: '电解铝', icon: Factory, color: '#5470c6' },
  { id: 'chargingStation', name: '充电站', icon: Car, color: '#91cc75' },
  { id: 'otherIndustrial', name: '工商业用户', icon: Building, color: '#fac858' },
];

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const generateData = () => {
  const baseData: Record<string, { realtime: number[]; baseline: number[] }> = {
    electrolyticAluminum: {
      realtime: [1200, 1150, 1100, 1050, 1020, 1050, 1200, 1450, 1600, 1650, 1680, 1700, 1690, 1680, 1650, 1600, 1550, 1500, 1450, 1400, 1350, 1300, 1250, 1220],
      baseline: [1100, 1050, 1000, 950, 920, 950, 1100, 1350, 1500, 1550, 1580, 1600, 1590, 1580, 1550, 1500, 1450, 1400, 1350, 1300, 1250, 1200, 1150, 1120],
    },
    chargingStation: {
      realtime: [150, 120, 90, 60, 45, 50, 80, 200, 350, 420, 450, 480, 460, 440, 420, 400, 380, 350, 300, 250, 200, 180, 160, 140],
      baseline: [140, 110, 80, 50, 35, 40, 70, 180, 320, 390, 420, 450, 430, 410, 390, 370, 350, 320, 270, 220, 180, 160, 140, 120],
    },
    otherIndustrial: {
      realtime: [800, 750, 700, 650, 620, 680, 850, 1000, 1100, 1150, 1180, 1200, 1190, 1170, 1140, 1100, 1050, 1000, 950, 900, 850, 820, 780, 760],
      baseline: [750, 700, 650, 600, 570, 630, 800, 950, 1050, 1100, 1130, 1150, 1140, 1120, 1090, 1050, 1000, 950, 900, 850, 800, 770, 730, 710],
    },
  };
  return baseData;
};

const LoadCurveChart: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState('all');
  const data = generateData();

  const chartOption = useMemo(() => {
    const series: any[] = [];
    const legendData: string[] = [];

    const resourcesToShow = selectedResource === 'all' 
      ? Object.keys(data) 
      : [selectedResource];

    const colorMap: Record<string, string> = {
      electrolyticAluminum: '#5470c6',
      chargingStation: '#91cc75',
      otherIndustrial: '#fac858',
    };

    const nameMap: Record<string, string> = {
      electrolyticAluminum: '电解铝',
      chargingStation: '充电站',
      otherIndustrial: '工商业用户',
    };

    resourcesToShow.forEach((key) => {
      legendData.push(`${nameMap[key]} - 实时负荷`);
      legendData.push(`${nameMap[key]} - 基线负荷`);
      
      series.push({
        name: `${nameMap[key]} - 实时负荷`,
        type: 'line',
        data: data[key].realtime,
        smooth: true,
        lineStyle: {
          width: 3,
          color: colorMap[key],
          shadowBlur: 10,
          shadowColor: `${colorMap[key]}40`,
        },
        itemStyle: {
          color: colorMap[key],
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${colorMap[key]}40` },
              { offset: 1, color: `${colorMap[key]}10` },
            ],
          },
        },
        emphasis: {
          lineStyle: {
            width: 4,
          },
        },
      });

      series.push({
        name: `${nameMap[key]} - 基线负荷`,
        type: 'line',
        data: data[key].baseline,
        smooth: true,
        lineStyle: {
          width: 2,
          color: colorMap[key],
          type: 'dashed',
          shadowBlur: 5,
          shadowColor: `${colorMap[key]}30`,
        },
        itemStyle: {
          color: colorMap[key],
        },
        emphasis: {
          lineStyle: {
            width: 3,
          },
        },
      });
    });

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        borderColor: '#475569',
        borderWidth: 1,
        textStyle: {
          color: '#e2e8f0',
        },
        formatter: (params: any) => {
          let result = `<div style="padding: 8px; min-width: 180px;">
            <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">${params[0].axisValue}</div>`;
          params.forEach((param: any) => {
            const color = param.color;
            result += `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="display: inline-block; width: 10px; height: 10px; border-radius: 2px; background: ${color}"></span>
                  <span style="color: #94a3b8; font-size: 12px;">${param.seriesName}</span>
                </div>
                <span style="font-weight: 600; color: #e2e8f0; margin-left: 16px;">${param.value} MW</span>
              </div>
            `;
          });
          result += '</div>';
          return result;
        },
      },
      legend: {
        data: legendData,
        bottom: '0%',
        itemWidth: 16,
        itemHeight: 10,
        itemGap: 12,
        textStyle: {
          fontSize: 11,
          color: '#94a3b8',
          fontWeight: 500,
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '18%',
        top: '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: hours,
        axisLine: {
          lineStyle: {
            color: '#475569',
          },
        },
        axisLabel: {
          fontSize: 10,
          color: '#94a3b8',
          interval: 2,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        name: '负荷 (MW)',
        nameTextStyle: {
          fontSize: 11,
          color: '#94a3b8',
          padding: [0, 0, 0, 35],
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          fontSize: 10,
          color: '#94a3b8',
        },
        splitLine: {
          lineStyle: {
            color: '#334155',
            type: 'dashed',
          },
        },
      },
      series,
    };
  }, [selectedResource, data]);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        资源负荷曲线
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {resourceTypes.map((resource) => {
          const Icon = resource.icon;
          return (
            <button
              key={resource.id}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedResource === resource.id
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
            }`}
              onClick={() => setSelectedResource(resource.id)}
            >
              <Icon className="w-3.5 h-3.5" />
              {resource.name}
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0">
        <ReactECharts option={chartOption} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default LoadCurveChart;
