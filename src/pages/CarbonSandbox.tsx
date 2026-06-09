import { useState } from 'react';
import { Globe, TrendingDown, Zap, Factory, Car, Home, Play, Pause, RotateCcw } from 'lucide-react';
import { scenarios, impactResults, energyData, carbonEmissions } from '@/data/policyData';
import ScenarioComparisonChart from '@/components/ScenarioComparisonChart';
import EnergyStructureChart from '@/components/EnergyStructureChart';

export default function CarbonSandbox() {
  const [selectedScenario, setSelectedScenario] = useState('s001');
  const [currentYear, setCurrentYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'carbonPeakYear' | 'carbonNeutralYear' | 'renewableShare' | 'economicImpact'>('carbonNeutralYear');

  const metrics = [
    { value: 'carbonPeakYear', label: '碳达峰年份' },
    { value: 'carbonNeutralYear', label: '碳中和年份' },
    { value: 'renewableShare', label: '可再生能源占比' },
    { value: 'economicImpact', label: '经济影响' }
  ];

  const currentScenario = scenarios.find(s => s.id === selectedScenario);
  const scenarioResults = impactResults.filter(r => r.scenarioId === selectedScenario);
  const latestResult = scenarioResults.find(r => r.year === currentYear) || scenarioResults[0];

  const yearRange = { min: 2020, max: 2060 };

  const handlePlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentYear(prev => {
        if (prev >= yearRange.max) {
          setIsPlaying(false);
          clearInterval(interval);
          return yearRange.max;
        }
        return prev + 1;
      });
    }, 800);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentYear(2024);
  };

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-6 px-8">
        <div className="flex items-center gap-3">
          <Globe className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">3060双碳政策沙盘推演</h1>
            <p className="text-green-100 mt-1">碳达峰碳中和路径模拟与长期政策影响推演</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">情景选择</h2>
              <div className="space-y-3">
                {scenarios.map(scenario => (
                  <div
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario.id);
                      setIsPlaying(false);
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      selectedScenario === scenario.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: scenario.color }}
                      />
                      <span className="font-medium text-gray-800">{scenario.name}</span>
                    </div>
                    <p className="text-sm text-gray-500">{scenario.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">情景假设</h2>
              {currentScenario && (
                <ul className="space-y-2">
                  {currentScenario.assumptions.map((assumption, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{assumption}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">时间轴控制</h2>
                  <p className="text-sm text-gray-500">当前模拟年份: <span className="font-bold text-green-600">{currentYear}年</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="重置"
                  >
                    <RotateCcw className="w-5 h-5 text-gray-600" />
                  </button>
                  {isPlaying ? (
                    <button
                      onClick={handlePause}
                      className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                    >
                      <Pause className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={handlePlay}
                      className="p-3 rounded-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <input
                  type="range"
                  min={yearRange.min}
                  max={yearRange.max}
                  value={currentYear}
                  onChange={(e) => handleYearChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{yearRange.min}</span>
                  <span className="text-green-600 font-medium">碳达峰目标: 2030</span>
                  <span className="text-green-600 font-medium">碳中和目标: 2060</span>
                  <span>{yearRange.max}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-500">碳达峰年份</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{latestResult?.carbonPeakYear}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-500">碳中和年份</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{latestResult?.carbonNeutralYear}</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Factory className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-500">可再生能源占比</span>
                </div>
                <div className="text-2xl font-bold text-gray-800">{latestResult?.renewableShare}%</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-gray-500">经济影响</span>
                </div>
                <div className={`text-2xl font-bold ${latestResult?.economicImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {latestResult?.economicImpact >= 0 ? '+' : ''}{latestResult?.economicImpact}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-4">
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value as any)}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {metrics.map(metric => (
                      <option key={metric.value} value={metric.value}>{metric.label}</option>
                    ))}
                  </select>
                </div>
                <ScenarioComparisonChart
                  results={impactResults}
                  scenarios={scenarios}
                  metric={selectedMetric}
                />
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <EnergyStructureChart year={currentYear} data={energyData} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">碳排放结构分析</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {(() => {
                  const emissionData = carbonEmissions.find(d => d.year === currentYear) || carbonEmissions[carbonEmissions.length - 1];
                  return [
                    { label: '碳排放总量', value: emissionData.total, icon: Globe, color: 'bg-red-100 text-red-800' },
                    { label: '能源部门', value: emissionData.energy, icon: Factory, color: 'bg-orange-100 text-orange-800' },
                    { label: '工业部门', value: emissionData.industry, icon: Factory, color: 'bg-yellow-100 text-yellow-800' },
                    { label: '交通部门', value: emissionData.transportation, icon: Car, color: 'bg-blue-100 text-blue-800' },
                    { label: '建筑部门', value: emissionData.buildings, icon: Home, color: 'bg-green-100 text-green-800' }
                  ];
                })().map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon className={`w-4 h-4 ${item.color.split(' ')[1]}`} />
                      <span className="text-sm text-gray-500">{item.label}</span>
                    </div>
                    <div className="text-xl font-bold text-gray-800">{item.value}亿吨CO₂</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">双碳目标进度评估</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>碳达峰进度</span>
                    <span>{Math.min(((currentYear - 2020) / 10) * 100, 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(((currentYear - 2020) / 10) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-green-100 mt-2">目标: 2030年前实现碳达峰</p>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>碳中和进度</span>
                    <span>{Math.min(((currentYear - 2020) / 40) * 100, 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(((currentYear - 2020) / 40) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-green-100 mt-2">目标: 2060年前实现碳中和</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}