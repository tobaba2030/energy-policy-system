import React, { useState } from 'react';
import { MapPin, Zap, ChevronLeft, RefreshCw, Info, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

type VoltageType = '220kV' | '110kV' | '35kV';

interface SubstationNode {
  id: string;
  name: string;
  voltage: VoltageType;
  x: number;
  y: number;
  parentId?: string;
  children?: string[];
  load: number;
  maxLoad: number;
  status: 'normal' | 'warning' | 'alert';
  powerFlow?: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  capacity: number;
  currentFlow: number;
  status: 'normal' | 'warning' | 'overload';
}

const topologyData: { nodes: SubstationNode[]; connections: Connection[] } = {
  nodes: [
    { id: 'n1', name: '城东220kV变', voltage: '220kV', x: 50, y: 12, load: 1850, maxLoad: 2500, status: 'normal', children: ['n5', 'n6'] },
    { id: 'n2', name: '城西220kV变', voltage: '220kV', x: 20, y: 12, load: 2100, maxLoad: 2800, status: 'normal', children: ['n7'] },
    { id: 'n3', name: '城南220kV变', voltage: '220kV', x: 80, y: 12, load: 1650, maxLoad: 2200, status: 'warning', children: ['n8'] },
    { id: 'n4', name: '城北220kV变', voltage: '220kV', x: 50, y: 88, load: 2300, maxLoad: 3000, status: 'normal', children: ['n9'] },
    
    { id: 'n5', name: '工业园110kV变', voltage: '110kV', x: 35, y: 38, load: 920, maxLoad: 1200, status: 'normal', parentId: 'n1', children: ['n10', 'n11'] },
    { id: 'n6', name: '商业中心110kV变', voltage: '110kV', x: 65, y: 38, load: 880, maxLoad: 1100, status: 'normal', parentId: 'n1', children: ['n12'] },
    { id: 'n7', name: '居民区110kV变', voltage: '110kV', x: 20, y: 38, load: 1050, maxLoad: 1300, status: 'warning', parentId: 'n2', children: ['n13'] },
    { id: 'n8', name: '开发区110kV变', voltage: '110kV', x: 80, y: 38, load: 780, maxLoad: 1000, status: 'normal', parentId: 'n3', children: ['n14'] },
    { id: 'n9', name: '科技园110kV变', voltage: '110kV', x: 50, y: 62, load: 1100, maxLoad: 1400, status: 'normal', parentId: 'n4', children: ['n15', 'n16'] },
    
    { id: 'n10', name: 'A区35kV变', voltage: '35kV', x: 25, y: 62, load: 420, maxLoad: 550, status: 'normal', parentId: 'n5' },
    { id: 'n11', name: 'B区35kV变', voltage: '35kV', x: 45, y: 62, load: 380, maxLoad: 500, status: 'normal', parentId: 'n5' },
    { id: 'n12', name: 'C区35kV变', voltage: '35kV', x: 65, y: 62, load: 450, maxLoad: 580, status: 'normal', parentId: 'n6' },
    { id: 'n13', name: 'D区35kV变', voltage: '35kV', x: 20, y: 62, load: 520, maxLoad: 650, status: 'warning', parentId: 'n7' },
    { id: 'n14', name: 'E区35kV变', voltage: '35kV', x: 80, y: 62, load: 360, maxLoad: 480, status: 'normal', parentId: 'n8' },
    { id: 'n15', name: 'F区35kV变', voltage: '35kV', x: 40, y: 88, load: 480, maxLoad: 600, status: 'normal', parentId: 'n9' },
    { id: 'n16', name: 'G区35kV变', voltage: '35kV', x: 60, y: 88, load: 450, maxLoad: 580, status: 'normal', parentId: 'n9' },
  ],
  connections: [
    { id: 'c1', from: 'n1', to: 'n2', capacity: 800, currentFlow: 520, status: 'normal' },
    { id: 'c2', from: 'n1', to: 'n3', capacity: 900, currentFlow: 650, status: 'normal' },
    { id: 'c3', from: 'n2', to: 'n4', capacity: 750, currentFlow: 480, status: 'normal' },
    { id: 'c4', from: 'n3', to: 'n4', capacity: 850, currentFlow: 720, status: 'warning' },
    
    { id: 'c5', from: 'n1', to: 'n5', capacity: 500, currentFlow: 380, status: 'normal' },
    { id: 'c6', from: 'n1', to: 'n6', capacity: 450, currentFlow: 320, status: 'normal' },
    { id: 'c7', from: 'n2', to: 'n7', capacity: 550, currentFlow: 420, status: 'normal' },
    { id: 'c8', from: 'n3', to: 'n8', capacity: 400, currentFlow: 280, status: 'normal' },
    { id: 'c9', from: 'n4', to: 'n9', capacity: 600, currentFlow: 480, status: 'normal' },
    
    { id: 'c10', from: 'n5', to: 'n10', capacity: 250, currentFlow: 180, status: 'normal' },
    { id: 'c11', from: 'n5', to: 'n11', capacity: 230, currentFlow: 160, status: 'normal' },
    { id: 'c12', from: 'n6', to: 'n12', capacity: 260, currentFlow: 190, status: 'normal' },
    { id: 'c13', from: 'n7', to: 'n13', capacity: 280, currentFlow: 220, status: 'warning' },
    { id: 'c14', from: 'n8', to: 'n14', capacity: 200, currentFlow: 140, status: 'normal' },
    { id: 'c15', from: 'n9', to: 'n15', capacity: 240, currentFlow: 180, status: 'normal' },
    { id: 'c16', from: 'n9', to: 'n16', capacity: 230, currentFlow: 170, status: 'normal' },
  ],
};

const getVoltageColor = (voltage: VoltageType, status: 'normal' | 'warning' | 'alert') => {
  if (status === 'alert') return '#dc2626';
  if (status === 'warning') return '#f59e0b';
  switch (voltage) {
    case '220kV': return '#dc2626';
    case '110kV': return '#f97316';
    case '35kV': return '#eab308';
    default: return '#6b7280';
  }
};

const getNodeSize = (voltage: string) => {
  switch (voltage) {
    case '220kV': return 7;
    case '110kV': return 5.5;
    case '35kV': return 4.5;
    default: return 5;
  }
};

const TopologyDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SubstationNode | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  const handleNodeClick = (node: SubstationNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const selectedNodeData = selectedNode ? topologyData.nodes.find(n => n.id === selectedNode.id) : null;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between px-5 py-4 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            电网拓扑结构图
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-slate-400">实时</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">更新于 {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
            title="显示/隐藏图例"
          >
            <Info className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="放大">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="缩小">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="全屏">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl">
            <RefreshCw className="w-4 h-4" />
            刷新数据
          </button>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 relative overflow-hidden">
        {/* 背景网格 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* 电压层级分隔线 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="0" y1="25" x2="100%" y2="25" stroke="#475569" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3" />
          <line x1="0" y1="50" x2="100%" y2="50" stroke="#475569" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3" />
          <line x1="0" y1="75" x2="100%" y2="75" stroke="#475569" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.3" />
        </svg>

        {/* 层级标签 */}
        <div className="absolute top-4 left-4 flex flex-col gap-28">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-xs font-semibold text-slate-400">220kV</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-xs font-semibold text-slate-400">110kV</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-xs font-semibold text-slate-400">35kV</span>
          </div>
        </div>

        {/* 拓扑图SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* 连接线 */}
          {topologyData.connections.map(conn => {
            const fromNode = topologyData.nodes.find(n => n.id === conn.from);
            const toNode = topologyData.nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            const ratio = conn.currentFlow / conn.capacity;
            const lineColor = conn.status === 'warning' ? '#f59e0b' : conn.status === 'overload' ? '#dc2626' : (ratio > 0.8 ? '#f97316' : '#3b82f6');
            const isHovered = hoveredConnection === conn.id;

            return (
              <g key={conn.id}>
                {/* 线路光晕 */}
                <line
                  x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
                  stroke={lineColor}
                  strokeWidth={isHovered ? '4' : '2'}
                  strokeOpacity={isHovered ? 0.4 : 0.2}
                />
                {/* 主线 */}
                <line
                  x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y}
                  stroke={lineColor}
                  strokeWidth={isHovered ? '2' : '1'}
                  strokeOpacity={isHovered ? 1 : 0.7}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredConnection(conn.id)}
                  onMouseLeave={() => setHoveredConnection(null)}
                />
                {/* 流动动画 */}
                {isHovered && (
                  <circle cx={(fromNode.x + toNode.x) / 2} cy={(fromNode.y + toNode.y) / 2} r="1" fill={lineColor}>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* 节点 */}
          {topologyData.nodes.map(node => {
            const color = getVoltageColor(node.voltage, node.status);
            const size = getNodeSize(node.voltage);
            const isSelected = selectedNode?.id === node.id;
            const loadPercent = Math.round((node.load / node.maxLoad) * 100);

            return (
              <g
                key={node.id}
                className="cursor-pointer transition-transform"
                onClick={() => handleNodeClick(node)}
              >
                {/* 选中高亮环 */}
                {isSelected && (
                  <circle cx={node.x} cy={node.y} r={size + 4} fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.8">
                    <animate attributeName="r" values={`${size + 3};${size + 6};${size + 3}`} dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* 告警脉冲 */}
                {node.status !== 'normal' && (
                  <circle cx={node.x} cy={node.y} r={size + 2} fill="none" stroke={color} strokeWidth="0.3" opacity="0.5">
                    <animate attributeName="r" values={`${size + 1};${size + 5};${size + 1}`} dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* 节点阴影 */}
                <circle cx={node.x + 0.5} cy={node.y + 0.5} r={size} fill="#000" opacity="0.3" />
                
                {/* 节点本体 */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? size + 1 : size}
                  fill={color}
                  stroke="white"
                  strokeWidth={isSelected ? '1' : '0.5'}
                  filter={node.status !== 'normal' ? 'url(#glow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* 负荷率圆环 */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={size + 2}
                  fill="none"
                  stroke={loadPercent > 80 ? '#dc2626' : loadPercent > 60 ? '#f59e0b' : '#22c55e'}
                  strokeWidth="0.5"
                  strokeDasharray={`${loadPercent * 0.4} 40`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${node.x} ${node.y})`}
                  opacity="0.6"
                />

                {/* 节点标签 */}
                <text
                  x={node.x}
                  y={node.y - size - 3}
                  textAnchor="middle"
                  fontSize="2.8"
                  fill="#e2e8f0"
                  fontWeight="600"
                >
                  {node.name.replace(/\d+kV变/, '')}
                </text>
                <text
                  x={node.x}
                  y={node.y + size + 6}
                  textAnchor="middle"
                  fontSize="2.2"
                  fill="#94a3b8"
                >
                  {node.voltage}
                </text>
                <text
                  x={node.x}
                  y={node.y + size + 10}
                  textAnchor="middle"
                  fontSize="2"
                  fill={loadPercent > 80 ? '#ef4444' : '#22c55e'}
                  fontWeight="500"
                >
                  {node.load} MW
                </text>
              </g>
            );
          })}
        </svg>

        {/* 图例 */}
        {showLegend && (
          <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700 shadow-xl">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">电压等级</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-slate-300">220kV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="text-xs text-slate-300">110kV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-xs text-slate-300">35kV</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">运行状态</p>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-slate-300">正常</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-xs text-slate-300">预警</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-slate-300">告警</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">统计信息</p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">变电站</span>
                    <span className="text-xs text-white font-semibold">{topologyData.nodes.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">线路</span>
                    <span className="text-xs text-white font-semibold">{topologyData.connections.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">总负荷</span>
                    <span className="text-xs text-white font-semibold">{topologyData.nodes.reduce((sum, n) => sum + n.load, 0).toLocaleString()} MW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 选中节点详情面板 */}
        {selectedNodeData && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/95 backdrop-blur-md rounded-xl p-4 border border-slate-700 shadow-2xl min-w-[320px] z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: getVoltageColor(selectedNodeData.voltage, selectedNodeData.status) }}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{selectedNodeData.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedNodeData.status === 'normal' ? 'bg-green-500/20 text-green-400' :
                    selectedNodeData.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {selectedNodeData.status === 'normal' ? '正常运行' : selectedNodeData.status === 'warning' ? '负载预警' : '过载告警'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">当前负荷</p>
                <p className="text-xl font-bold text-white">{selectedNodeData.load} <span className="text-xs font-normal text-slate-400">MW</span></p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">最大容量</p>
                <p className="text-xl font-bold text-white">{selectedNodeData.maxLoad} <span className="text-xs font-normal text-slate-400">MW</span></p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400 mb-1">负载率</p>
                <p className={`text-xl font-bold ${
                  (selectedNodeData.load / selectedNodeData.maxLoad) > 0.8 ? 'text-red-400' :
                  (selectedNodeData.load / selectedNodeData.maxLoad) > 0.6 ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {Math.round((selectedNodeData.load / selectedNodeData.maxLoad) * 100)}%
                </p>
              </div>
            </div>

            {/* 负荷进度条 */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>负荷曲线</span>
                <span>{selectedNodeData.load} / {selectedNodeData.maxLoad} MW</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    (selectedNodeData.load / selectedNodeData.maxLoad) > 0.8 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                    (selectedNodeData.load / selectedNodeData.maxLoad) > 0.6 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
                  style={{ width: `${(selectedNodeData.load / selectedNodeData.maxLoad) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 提示信息 */}
        {!selectedNode && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4" />
            点击节点查看详细信息
          </div>
        )}
      </div>
    </div>
  );
};

export default TopologyDiagram;
