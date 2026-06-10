/**
 * 业务推演工作台
 * 核心交互界面：政策影响加载器 + 参数调节 + 结果图表
 */
import { useState, useEffect, useRef } from 'react';
import {
  Play, RotateCcw, Download, Settings, ChevronDown,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  Flame, Wind, Droplets, Zap, Building2, Activity,
  Plus, Minus, Copy, FileText
} from 'lucide-react';
import * as echarts from 'echarts';
import {
  BusinessUnitLabels, BusinessUnit, baselineParams,
  policyBusinessImpacts, businessAssets, businessMetrics,
  BusinessModelParams, SimulationScenario
} from '@/data/businessImpactData';

// 业务板块图标
const BusinessIcons: Record<BusinessUnit, React.ReactNode> = {
  hydro: <Droplets className="w-4 h-4" />,
  thermal: <Flame className="w-4 h-4" />,
  renewable: <Wind className="w-4 h-4" />,
  gas: <Zap className="w-4 h-4" />,
  comprehensive: <Building2 className="w-4 h-4" />,
  carbon: <Activity className="w-4 h-4" />
};

// 模拟推演计算函数
function simulateBusiness(
  unit: BusinessUnit,
  params: BusinessModelParams,
  years: number = 5
): { year: number; profit: number; revenue: number; cost: number; metrics: Record<string, number> }[] {
  const results = [];
  const baseYear = 2026;

  for (let i = 0; i < years; i++) {
    const year = baseYear + i;
    let profit = 0;
    let revenue = 0;
    let cost = 0;
    const metrics: Record<string, number> = {};

    if (unit === 'thermal' && params.thermal) {
      // 火电模型
      const capacity = 4260; // MW
      const utilizationHours = 4200 - i * 50; // 利用小时逐年下降
      const generation = capacity * utilizationHours / 1000; // GWh
      const avgPrice = params.thermal.baseElectricPrice;
      revenue = generation * avgPrice / 10; // 万元
      const fuelCost = generation * params.thermal.coalPrice * 0.00035;
      const carbonCost = generation * 0.8 * (1 - params.thermal.carbonQuota) * params.thermal.carbonPrice / 10;
      const capacityRevenue = capacity * params.thermal.capacityCompensation;
      cost = fuelCost + carbonCost + 50000;
      profit = revenue - cost + capacityRevenue;
      metrics.utilizationHours = utilizationHours;
      metrics.unitCost = cost / generation * 10;
      metrics.carbonCost = carbonCost;
      metrics.capacityRevenue = capacityRevenue;
    } else if (unit === 'hydro' && params.hydro) {
      // 水电模型
      const capacity = 3580;
      const utilizationHours = params.hydro.waterScenario === 'abundant' ? 3500 : params.hydro.waterScenario === 'dry' ? 2800 : 3200;
      const generation = capacity * utilizationHours / 1000;
      revenue = generation * params.hydro.baseElectricPrice / 10 + params.hydro.pumpStorageRevenue;
      cost = 15000 + generation * 20;
      profit = revenue - cost;
      metrics.generation = generation;
      metrics.avgPrice = params.hydro.baseElectricPrice;
    } else if (unit === 'renewable' && params.renewable) {
      // 新能源模型
      const capacity = 1000;
      const guaranteedGen = capacity * params.renewable.guaranteedHours / 1000;
      const marketGen = capacity * 500 / 1000;
      const guaranteedRevenue = guaranteedGen * 350 / 10;
      const marketRevenue = marketGen * 350 * params.renewable.marketDiscountRate / 10;
      const greenCertRevenue = capacity * 1000 * params.renewable.greenCertPrice * params.renewable.greenCertSalesRate / 10000;
      revenue = guaranteedRevenue + marketRevenue + greenCertRevenue;
      cost = 8000 + params.renewable.storageCost;
      profit = revenue - cost;
      metrics.equivalentPrice = revenue * 10 / (guaranteedGen + marketGen);
      metrics.generationRevenue = guaranteedRevenue + marketRevenue;
      metrics.greenCertRevenue = greenCertRevenue;
    }

    results.push({ year, profit: Math.round(profit), revenue: Math.round(revenue), cost: Math.round(cost), metrics });
  }

  return results;
}

// 参数滑块组件
function ParamSlider({ label, value, onChange, min, max, step = 1, unit }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit: string;
}) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
      />
    </div>
  );
}

// 场景卡片
function ScenarioCard({ scenario, isActive, onSelect, onDelete }: {
  scenario: SimulationScenario;
  isActive: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`p-3 rounded-lg cursor-pointer transition-all ${
        isActive
          ? 'bg-blue-50 border-2 border-blue-500'
          : 'bg-white border border-gray-200 hover:border-blue-300'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            scenario.type === 'baseline' ? 'bg-gray-400' :
            scenario.type === 'policy' ? 'bg-orange-500' : 'bg-purple-500'
          }`} />
          <span className="font-medium text-sm text-gray-900">{scenario.name}</span>
        </div>
        {onDelete && (
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-gray-400 hover:text-red-500">
            <Minus className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1 truncate">{scenario.description}</p>
    </div>
  );
}

export default function BusinessSimulation() {
  // 当前选中的业务板块
  const [selectedUnit, setSelectedUnit] = useState<BusinessUnit>('thermal');
  // 当前场景
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([
    {
      id: 'baseline',
      name: '基准场景',
      description: '当前政策延续，市场中性预测',
      type: 'baseline',
      params: baselineParams,
      policyImpacts: [],
      createdAt: new Date().toISOString()
    }
  ]);
  const [activeScenarioId, setActiveScenarioId] = useState('baseline');
  // 推演结果
  const [results, setResults] = useState<ReturnType<typeof simulateBusiness>>([]);
  const [isRunning, setIsRunning] = useState(false);
  // 选中的政策影响
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const activeScenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  // 运行推演
  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      const newResults = simulateBusiness(selectedUnit, activeScenario.params, 5);
      setResults(newResults);
      setIsRunning(false);
    }, 500);
  };

  // 初始化/更新图表
  useEffect(() => {
    if (!chartRef.current || results.length === 0) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const years = results.map(r => r.year);
    const profits = results.map(r => r.profit);
    const revenues = results.map(r => r.revenue);
    const costs = results.map(r => r.cost);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['利润', '收入', '成本'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: years
      },
      yAxis: {
        type: 'value',
        name: '万元',
        axisLabel: {
          formatter: (v: number) => (v / 10000).toFixed(0) + '万'
        }
      },
      series: [
        {
          name: '利润',
          type: 'line',
          data: profits,
          smooth: true,
          lineStyle: { width: 3 },
          itemStyle: { color: '#3b82f6' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.05)' }
            ])
          }
        },
        {
          name: '收入',
          type: 'line',
          data: revenues,
          smooth: true,
          itemStyle: { color: '#22c55e' }
        },
        {
          name: '成本',
          type: 'line',
          data: costs,
          smooth: true,
          itemStyle: { color: '#ef4444' }
        }
      ]
    };

    chartInstance.current.setOption(option);
  }, [results]);

  // 初始运行
  useEffect(() => {
    runSimulation();
  }, [selectedUnit, activeScenarioId]);

  // 创建新场景
  const createNewScenario = () => {
    const newScenario: SimulationScenario = {
      id: `scenario-${Date.now()}`,
      name: `情景${scenarios.length}`,
      description: '自定义参数场景',
      type: 'custom',
      params: JSON.parse(JSON.stringify(activeScenario.params)),
      policyImpacts: [...selectedPolicies],
      createdAt: new Date().toISOString()
    };
    setScenarios([...scenarios, newScenario]);
    setActiveScenarioId(newScenario.id);
  };

  // 更新参数
  const updateParam = (path: string, value: number) => {
    setScenarios(scenarios.map(s => {
      if (s.id !== activeScenarioId) return s;
      const newParams = JSON.parse(JSON.stringify(s.params));
      const keys = path.split('.');
      let obj: Record<string, unknown> = newParams;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]] as Record<string, unknown>;
      }
      obj[keys[keys.length - 1]] = value;
      return { ...s, params: newParams };
    }));
  };

  // 切换政策影响
  const togglePolicy = (policyId: string) => {
    if (selectedPolicies.includes(policyId)) {
      setSelectedPolicies(selectedPolicies.filter(id => id !== policyId));
    } else {
      setSelectedPolicies([...selectedPolicies, policyId]);
      // 应用政策影响到参数
      const policy = policyBusinessImpacts.find(p => p.id === policyId);
      if (policy) {
        policy.businessImpacts.forEach(impact => {
          if (impact.businessUnit === selectedUnit) {
            // 简化处理：根据影响方向调整参数
            if (impact.quantitativeEffect.parameter === 'capacityCompensation') {
              updateParam('thermal.capacityCompensation', 130);
            } else if (impact.quantitativeEffect.parameter === 'greenCertPrice') {
              updateParam('renewable.greenCertPrice', 35);
            }
          }
        });
      }
    }
  };

  const currentParams = activeScenario.params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">业务影响推演工作台</h1>
            <p className="text-sm text-gray-500">政策冲击注入 → 业务模型推演 → 结果对比分析</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isRunning ? '计算中...' : '运行推演'}
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              导出报告
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-12 gap-4">
          {/* 左侧：政策影响加载器 */}
          <div className="col-span-3 space-y-4">
            {/* 业务板块选择 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">选择业务板块</h3>
              <div className="space-y-2">
                {(['thermal', 'hydro', 'renewable'] as BusinessUnit[]).map(unit => (
                  <button
                    key={unit}
                    onClick={() => setSelectedUnit(unit)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedUnit === unit
                        ? 'bg-blue-50 border-2 border-blue-500'
                        : 'bg-gray-50 border border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${selectedUnit === unit ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                      {BusinessIcons[unit]}
                    </div>
                    <span className="font-medium text-sm">{BusinessUnitLabels[unit]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 政策影响选择 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">加载政策影响</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {policyBusinessImpacts.map(policy => {
                  const relevantImpact = policy.businessImpacts.find(i => i.businessUnit === selectedUnit);
                  if (!relevantImpact) return null;
                  return (
                    <label
                      key={policy.id}
                      className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedPolicies.includes(policy.id) ? 'bg-orange-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedPolicies.includes(policy.id)}
                        onChange={() => togglePolicy(policy.id)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {policy.title.replace(/《/g, '').replace(/》/g, '')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {relevantImpact.quantitativeEffect.estimatedMagnitude}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 场景管理 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">推演场景</h3>
                <button
                  onClick={createNewScenario}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {scenarios.map(scenario => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    isActive={scenario.id === activeScenarioId}
                    onSelect={() => setActiveScenarioId(scenario.id)}
                    onDelete={scenario.type !== 'baseline' ? () => {
                      setScenarios(scenarios.filter(s => s.id !== scenario.id));
                      if (activeScenarioId === scenario.id) {
                        setActiveScenarioId('baseline');
                      }
                    } : undefined}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 中部：参数调节与结果 */}
          <div className="col-span-6 space-y-4">
            {/* 参数调节卡片 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-500" />
                参数调节 · {BusinessUnitLabels[selectedUnit]}
              </h3>

              {selectedUnit === 'thermal' && currentParams.thermal && (
                <div className="grid grid-cols-2 gap-x-6">
                  <ParamSlider
                    label="煤价"
                    value={currentParams.thermal.coalPrice}
                    onChange={v => updateParam('thermal.coalPrice', v)}
                    min={500} max={1000} step={10}
                    unit="元/吨"
                  />
                  <ParamSlider
                    label="基准电价"
                    value={currentParams.thermal.baseElectricPrice}
                    onChange={v => updateParam('thermal.baseElectricPrice', v)}
                    min={300} max={500} step={10}
                    unit="元/MWh"
                  />
                  <ParamSlider
                    label="容量补偿"
                    value={currentParams.thermal.capacityCompensation}
                    onChange={v => updateParam('thermal.capacityCompensation', v)}
                    min={50} max={200} step={5}
                    unit="元/kW·年"
                  />
                  <ParamSlider
                    label="碳价"
                    value={currentParams.thermal.carbonPrice}
                    onChange={v => updateParam('thermal.carbonPrice', v)}
                    min={50} max={200} step={5}
                    unit="元/吨"
                  />
                </div>
              )}

              {selectedUnit === 'hydro' && currentParams.hydro && (
                <div className="grid grid-cols-2 gap-x-6">
                  <ParamSlider
                    label="基准电价"
                    value={currentParams.hydro.baseElectricPrice}
                    onChange={v => updateParam('hydro.baseElectricPrice', v)}
                    min={200} max={400} step={10}
                    unit="元/MWh"
                  />
                  <ParamSlider
                    label="抽蓄收益"
                    value={currentParams.hydro.pumpStorageRevenue}
                    onChange={v => updateParam('hydro.pumpStorageRevenue', v)}
                    min={0} max={10000} step={500}
                    unit="万元"
                  />
                </div>
              )}

              {selectedUnit === 'renewable' && currentParams.renewable && (
                <div className="grid grid-cols-2 gap-x-6">
                  <ParamSlider
                    label="保障收购小时"
                    value={currentParams.renewable.guaranteedHours}
                    onChange={v => updateParam('renewable.guaranteedHours', v)}
                    min={1000} max={2500} step={100}
                    unit="小时"
                  />
                  <ParamSlider
                    label="绿证价格"
                    value={currentParams.renewable.greenCertPrice}
                    onChange={v => updateParam('renewable.greenCertPrice', v)}
                    min={10} max={80} step={5}
                    unit="元/张"
                  />
                  <ParamSlider
                    label="市场化折价率"
                    value={Math.round(currentParams.renewable.marketDiscountRate * 100)}
                    onChange={v => updateParam('renewable.marketDiscountRate', v / 100)}
                    min={70} max={100} step={1}
                    unit="%"
                  />
                </div>
              )}
            </div>

            {/* 推演结果图表 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">推演结果 · {BusinessUnitLabels[selectedUnit]}利润预测</h3>
              <div ref={chartRef} className="h-72" />
            </div>

            {/* 关键指标卡片 */}
            {results.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <p className="text-xs text-gray-500">2026年利润</p>
                  <p className="text-lg font-bold text-gray-900">{results[0]?.profit.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">万元</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <p className="text-xs text-gray-500">2030年利润</p>
                  <p className="text-lg font-bold text-gray-900">{results[4]?.profit.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">万元</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <p className="text-xs text-gray-500">利润变动</p>
                  <p className={`text-lg font-bold ${results[4]?.profit > results[0]?.profit ? 'text-green-600' : 'text-red-600'}`}>
                    {results[4]?.profit > results[0]?.profit ? '+' : ''}
                    {Math.round((results[4]?.profit - results[0]?.profit) / results[0]?.profit * 100)}%
                  </p>
                  <p className="text-xs text-gray-400">5年累计</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <p className="text-xs text-gray-500">累计利润</p>
                  <p className="text-lg font-bold text-blue-600">
                    {results.reduce((sum, r) => sum + r.profit, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">万元</p>
                </div>
              </div>
            )}
          </div>

          {/* 右侧：明细数据 */}
          <div className="col-span-3 space-y-4">
            {/* 受影响资产 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">受影响资产</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {businessAssets
                  .filter(a => a.businessUnit === selectedUnit)
                  .map(asset => (
                    <div key={asset.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                        <p className="text-xs text-gray-500">{asset.capacity} MW</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        asset.impactAlert === 'high' ? 'bg-red-100 text-red-700' :
                        asset.impactAlert === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {asset.impactAlert === 'high' ? '高影响' : asset.impactAlert === 'medium' ? '中影响' : '正常'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* 年度明细表 */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">年度明细</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left text-gray-500">年份</th>
                      <th className="py-2 text-right text-gray-500">利润</th>
                      <th className="py-2 text-right text-gray-500">变动</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.year} className="border-b">
                        <td className="py-2 text-gray-900">{r.year}</td>
                        <td className="py-2 text-right font-medium">{r.profit.toLocaleString()}</td>
                        <td className={`py-2 text-right ${i > 0 && r.profit > results[i-1].profit ? 'text-green-600' : i > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                          {i === 0 ? '-' : `${r.profit > results[i-1].profit ? '+' : ''}${(r.profit - results[i-1].profit).toLocaleString()}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 敏感性分析 */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                敏感性分析
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">煤价±10%</span>
                  <span className="font-medium text-red-600">利润 ∓8.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">电价±10%</span>
                  <span className="font-medium text-green-600">利润 ±12.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">碳价±10%</span>
                  <span className="font-medium text-red-600">利润 ∓3.2%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
