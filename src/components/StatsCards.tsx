import React from 'react';
import { Users, TrendingUp, TrendingDown, Zap, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const statsData = [
  {
    icon: Users,
    title: '总用户数',
    value: '79',
    unit: '户',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-500/20 to-indigo-600/20',
    trend: '+5',
    trendType: 'up',
  },
  {
    icon: TrendingUp,
    title: '总最大上调能力',
    value: '6,250',
    unit: 'MW',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-500/20 to-emerald-600/20',
    trend: '+320',
    trendType: 'up',
  },
  {
    icon: TrendingDown,
    title: '总最大下调能力',
    value: '6,000',
    unit: 'MW',
    gradient: 'from-orange-500 to-amber-600',
    bgGradient: 'from-orange-500/20 to-amber-600/20',
    trend: '+180',
    trendType: 'up',
  },
  {
    icon: Zap,
    title: '总实时负荷',
    value: '12,850',
    unit: 'MW',
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-500/20 to-pink-600/20',
    trend: '-120',
    trendType: 'down',
  },
];

const StatsCards: React.FC = () => {
  return (
    <div>
      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
        <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        统计指标
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 cursor-pointer transition-all duration-200 group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-slate-400 mb-2 font-medium">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">{stat.value}</span>
                    <span className="text-xs text-slate-400 font-medium">{stat.unit}</span>
                  </div>
                  <div className={`text-xs font-semibold flex items-center gap-1 ${stat.trendType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.trendType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                    <span className="text-slate-500 font-normal">较昨日</span>
                  </div>
                </div>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsCards;
