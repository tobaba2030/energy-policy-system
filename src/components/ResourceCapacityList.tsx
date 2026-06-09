import React from 'react';
import { Factory, Car, Building, Zap } from 'lucide-react';

const resourceData = [
  {
    type: '电解铝',
    icon: Factory,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    currentLoad: 4500,
    maxCapacity: 6000,
    maxUp: 1500,
    maxUpPercent: 25,
    maxDown: 1800,
    maxDownPercent: 30,
  },
  {
    type: '充电站',
    icon: Car,
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    currentLoad: 1200,
    maxCapacity: 2500,
    maxUp: 800,
    maxUpPercent: 32,
    maxDown: 650,
    maxDownPercent: 26,
  },
  {
    type: '工商业用户',
    icon: Building,
    color: 'orange',
    gradient: 'from-orange-500 to-amber-600',
    currentLoad: 2800,
    maxCapacity: 3800,
    maxUp: 1000,
    maxUpPercent: 26,
    maxDown: 1200,
    maxDownPercent: 32,
  },
];

const ResourceCapacityList: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-base font-bold text-white flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-white" />
        </div>
        资源可调能力构成
      </h3>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {resourceData.map((item) => {
          const Icon = item.icon;
          const loadPercent = Math.round((item.currentLoad / item.maxCapacity) * 100);
          return (
            <div
              key={item.type}
              className={`bg-gradient-to-r ${item.gradient} rounded-xl p-3 shadow-lg`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{item.type}</h4>
                    <div className="text-xs text-white/70">
                      当前负荷: {item.currentLoad} MW
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/70">最大容量</div>
                  <div className="font-bold text-white text-sm">{item.maxCapacity} MW</div>
                </div>
              </div>

              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/80">负荷率</span>
                  <span className="text-white font-semibold">{loadPercent}%</span>
                </div>
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${loadPercent}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/15 rounded-lg p-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                    <span className="text-xs text-white/80">上调能力</span>
                  </div>
                  <div className="font-bold text-white text-sm">{item.maxUp} MW</div>
                  <div className="text-xs text-white/60">({item.maxUpPercent}%)</div>
                </div>
                <div className="bg-white/15 rounded-lg p-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-300" />
                    <span className="text-xs text-white/80">下调能力</span>
                  </div>
                  <div className="font-bold text-white text-sm">{item.maxDown} MW</div>
                  <div className="text-xs text-white/60">({item.maxDownPercent}%)</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceCapacityList;
