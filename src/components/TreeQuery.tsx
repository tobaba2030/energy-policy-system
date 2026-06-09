import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Search, Zap, Filter, Building } from 'lucide-react';

const substations = {
  '220kV变电站': [
    { name: '城东220kV变', id: 'CDE220', status: 'online' },
    { name: '城西220kV变', id: 'CXE220', status: 'online' },
    { name: '城南220kV变', id: 'CNE220', status: 'online' },
    { name: '城北220kV变', id: 'CBE220', status: 'maintenance' },
  ],
  '110kV变电站': [
    { name: '工业园110kV变', id: 'GYE110', status: 'online' },
    { name: '商业中心110kV变', id: 'SYE110', status: 'online' },
    { name: '居民区110kV变', id: 'JQE110', status: 'online' },
    { name: '开发区110kV变', id: 'KFE110', status: 'offline' },
  ],
  '35kV变电站': [
    { name: '科技园35kV变', id: 'KYE35', status: 'online' },
    { name: '物流园35kV变', id: 'WLY35', status: 'online' },
    { name: '大学城35kV变', id: 'DCY35', status: 'online' },
    { name: '新区35kV变', id: 'XQY35', status: 'online' },
  ],
};

interface TreeQueryProps {
  onSelect: (data: { powerUnit: string; nodeName: string; substation220: string; substation110: string; substation35: string }) => void;
}

const TreeQuery: React.FC<TreeQueryProps> = ({ onSelect }) => {
  const [powerUnit, setPowerUnit] = useState('');
  const [nodeName, setNodeName] = useState('');
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    '220kV变电站': true,
    '110kV变电站': true,
    '35kV变电站': true,
  });
  const [selectedSubstations, setSelectedSubstations] = useState({
    '220kV变电站': '',
    '110kV变电站': '',
    '35kV变电站': '',
  });

  const toggleExpand = (level: string) => {
    setExpandedLevels(prev => ({ ...prev, [level]: !prev[level] }));
  };

  const handleSubstationSelect = (level: string, name: string) => {
    setSelectedSubstations(prev => ({ ...prev, [level]: name }));
    onSelect({
      powerUnit,
      nodeName,
      substation220: selectedSubstations['220kV变电站'],
      substation110: selectedSubstations['110kV变电站'],
      substation35: selectedSubstations['35kV变电站'],
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'maintenance':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          查询条件
        </h3>
      </div>

      <div className="space-y-4">
        <div className="group">
          <label className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            供电单位
          </label>
          <input
            type="text"
            value={powerUnit}
            onChange={(e) => setPowerUnit(e.target.value)}
            placeholder="请输入供电单位"
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white placeholder-slate-500"
          />
        </div>

        <div className="group">
          <label className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            节点名称（编号）
          </label>
          <input
            type="text"
            value={nodeName}
            onChange={(e) => setNodeName(e.target.value)}
            placeholder="请输入节点名称或编号"
            className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-white placeholder-slate-500"
          />
        </div>

        <div className="border-t border-slate-700 pt-4">
          <h4 className="text-xs font-bold text-white flex items-center gap-2 mb-3">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            变电站树形结构
          </h4>

          <div className="space-y-3">
            {Object.entries(substations).map(([level, items], index) => (
              <div key={level} className="relative">
                <div
                  className="flex items-center justify-between p-2.5 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-all duration-200 border border-slate-600/50"
                  onClick={() => toggleExpand(level)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      level.includes('220') ? 'bg-red-500' : 
                      level.includes('110') ? 'bg-orange-500' : 'bg-yellow-500'
                    }`} />
                    <span className="text-sm font-semibold text-white">{level}</span>
                    <span className="text-xs text-slate-400">({items.length})</span>
                  </div>
                  {expandedLevels[level] ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                {expandedLevels[level] && (
                  <div className="ml-3 mt-2 space-y-1.5">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedSubstations[level] === item.name
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
                            : 'bg-slate-700/30 hover:bg-slate-700/50'
                        }`}
                        onClick={() => handleSubstationSelect(level, item.name)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                          <span className={`text-sm ${selectedSubstations[level] === item.name ? 'text-white' : 'text-slate-300'}`}>{item.name}</span>
                        </div>
                        <span className={`text-xs font-mono ${selectedSubstations[level] === item.name ? 'text-blue-100' : 'text-slate-500'}`}>{item.id}</span>
                      </div>
                    ))}
                  </div>
                )}

                {index < Object.keys(substations).length - 1 && (
                  <div className="flex items-center justify-center py-1.5">
                    <div className="flex items-center gap-1">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                      <div className="w-4 h-4 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Zap className="w-2.5 h-2.5 text-white" />
                      </div>
                      <div className="w-6 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeQuery;
