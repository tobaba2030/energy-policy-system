export interface Policy {
  id: string;
  title: string;
  category: string;
  releaseDate: string;
  authority: string;
  impactLevel: 'high' | 'medium' | 'low';
  summary: string;
  keywords: string[];
  targets: {
    year: number;
    metric: string;
    value: number;
  }[];
}

export interface EnergyData {
  year: number;
  coal: number;
  oil: number;
  naturalGas: number;
  nuclear: number;
  hydro: number;
  wind: number;
  solar: number;
  total: number;
}

export interface CarbonEmission {
  year: number;
  total: number;
  energy: number;
  industry: number;
  transportation: number;
  buildings: number;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  assumptions: string[];
  color: string;
}

export interface ImpactResult {
  year: number;
  scenarioId: string;
  carbonPeakYear: number;
  peakEmission: number;
  carbonNeutralYear: number;
  renewableShare: number;
  energyIntensity: number;
  economicImpact: number;
}

export const policies: Policy[] = [
  {
    id: 'p001',
    title: '《2030年前碳达峰行动方案》',
    category: '双碳政策',
    releaseDate: '2021-10-24',
    authority: '国务院',
    impactLevel: 'high',
    summary: '明确了碳达峰的总体要求和主要目标，提出了能源、工业、交通、建筑等重点领域的任务举措',
    keywords: ['碳达峰', '能源转型', '碳中和'],
    targets: [
      { year: 2025, metric: '单位GDP能耗下降', value: 13.5 },
      { year: 2030, metric: '单位GDP碳排放下降', value: 18 },
      { year: 2030, metric: '非化石能源消费占比', value: 25 }
    ]
  },
  {
    id: 'p002',
    title: '《关于完整准确全面贯彻新发展理念做好碳达峰碳中和工作的意见》',
    category: '双碳政策',
    releaseDate: '2021-09-22',
    authority: '中共中央 国务院',
    impactLevel: 'high',
    summary: '确立了碳达峰碳中和工作的指导思想、基本原则和主要目标',
    keywords: ['双碳', '新发展理念', '能源革命'],
    targets: [
      { year: 2030, metric: '碳达峰', value: 0 },
      { year: 2060, metric: '碳中和', value: 0 }
    ]
  },
  {
    id: 'p003',
    title: '《能源生产和消费革命战略（2016-2030）》',
    category: '能源政策',
    releaseDate: '2016-06-03',
    authority: '国家发展改革委 国家能源局',
    impactLevel: 'high',
    summary: '明确了我国能源发展的战略方向，推动能源生产和消费革命',
    keywords: ['能源革命', '清洁能源', '节能减排'],
    targets: [
      { year: 2020, metric: '非化石能源消费占比', value: 15 },
      { year: 2030, metric: '非化石能源消费占比', value: 20 }
    ]
  },
  {
    id: 'p004',
    title: '《关于促进新时代新能源高质量发展的实施方案》',
    category: '新能源政策',
    releaseDate: '2022-06-01',
    authority: '国家发展改革委 国家能源局',
    impactLevel: 'medium',
    summary: '提出了新能源高质量发展的总体要求和具体措施',
    keywords: ['新能源', '光伏', '风电'],
    targets: [
      { year: 2030, metric: '风电太阳能发电总装机', value: 1200 }
    ]
  },
  {
    id: 'p005',
    title: '《关于深化燃煤发电上网电价市场化改革的通知》',
    category: '电力政策',
    releaseDate: '2021-10-12',
    authority: '国家发展改革委',
    impactLevel: 'medium',
    summary: '推进电价市场化改革，完善电价形成机制',
    keywords: ['电价改革', '市场化', '电力市场'],
    targets: []
  },
  {
    id: 'p006',
    title: '《"十四五"现代能源体系规划》',
    category: '能源规划',
    releaseDate: '2022-03-22',
    authority: '国家发展改革委 国家能源局',
    impactLevel: 'high',
    summary: '明确了"十四五"时期现代能源体系建设的目标和任务',
    keywords: ['十四五', '能源规划', '现代能源体系'],
    targets: [
      { year: 2025, metric: '非化石能源消费占比', value: 20 },
      { year: 2025, metric: '单位GDP能耗下降', value: 13.5 }
    ]
  },
  {
    id: 'p007',
    title: '《关于进一步深化电力体制改革的若干意见》',
    category: '电力政策',
    releaseDate: '2015-03-15',
    authority: '中共中央 国务院',
    impactLevel: 'high',
    summary: '开启了新一轮电力体制改革，构建有效竞争的电力市场结构',
    keywords: ['电改', '电力市场', '市场化'],
    targets: []
  },
  {
    id: 'p008',
    title: '《碳排放权交易管理办法（试行）》',
    category: '碳市场政策',
    releaseDate: '2020-12-31',
    authority: '生态环境部',
    impactLevel: 'medium',
    summary: '建立全国统一的碳排放权交易市场，完善碳排放权交易制度',
    keywords: ['碳市场', '碳排放权', '碳交易'],
    targets: []
  }
];

export const energyData: EnergyData[] = [
  { year: 2015, coal: 23.6, oil: 6.8, naturalGas: 2.8, nuclear: 1.1, hydro: 1.2, wind: 0.9, solar: 0.1, total: 36.5 },
  { year: 2016, coal: 24.1, oil: 7.0, naturalGas: 3.1, nuclear: 1.2, hydro: 1.3, wind: 1.2, solar: 0.2, total: 38.1 },
  { year: 2017, coal: 24.9, oil: 7.3, naturalGas: 3.5, nuclear: 1.3, hydro: 1.4, wind: 1.5, solar: 0.4, total: 40.3 },
  { year: 2018, coal: 25.2, oil: 7.6, naturalGas: 3.9, nuclear: 1.4, hydro: 1.5, wind: 1.8, solar: 0.6, total: 42.0 },
  { year: 2019, coal: 25.3, oil: 7.8, naturalGas: 4.2, nuclear: 1.5, hydro: 1.6, wind: 2.2, solar: 0.9, total: 43.5 },
  { year: 2020, coal: 25.8, oil: 7.6, naturalGas: 4.4, nuclear: 1.7, hydro: 1.7, wind: 2.8, solar: 1.5, total: 45.5 },
  { year: 2021, coal: 27.2, oil: 8.0, naturalGas: 4.7, nuclear: 1.8, hydro: 1.8, wind: 3.3, solar: 2.3, total: 49.1 },
  { year: 2022, coal: 27.5, oil: 8.2, naturalGas: 5.0, nuclear: 2.0, hydro: 1.9, wind: 3.8, solar: 3.3, total: 51.7 },
  { year: 2023, coal: 27.8, oil: 8.3, naturalGas: 5.3, nuclear: 2.2, hydro: 2.0, wind: 4.4, solar: 4.5, total: 54.5 },
  { year: 2024, coal: 27.5, oil: 8.4, naturalGas: 5.6, nuclear: 2.4, hydro: 2.1, wind: 5.1, solar: 5.8, total: 56.9 },
  { year: 2025, coal: 27.0, oil: 8.5, naturalGas: 5.9, nuclear: 2.6, hydro: 2.2, wind: 5.9, solar: 7.2, total: 59.3 },
  { year: 2026, coal: 26.5, oil: 8.6, naturalGas: 6.2, nuclear: 2.8, hydro: 2.3, wind: 6.8, solar: 8.8, total: 62.0 },
  { year: 2027, coal: 25.8, oil: 8.7, naturalGas: 6.5, nuclear: 3.0, hydro: 2.4, wind: 7.8, solar: 10.5, total: 64.7 },
  { year: 2028, coal: 25.0, oil: 8.8, naturalGas: 6.8, nuclear: 3.2, hydro: 2.5, wind: 8.9, solar: 12.4, total: 67.6 },
  { year: 2029, coal: 24.0, oil: 8.9, naturalGas: 7.1, nuclear: 3.4, hydro: 2.6, wind: 10.1, solar: 14.5, total: 70.6 },
  { year: 2030, coal: 22.8, oil: 9.0, naturalGas: 7.4, nuclear: 3.6, hydro: 2.7, wind: 11.4, solar: 16.8, total: 73.7 }
];

export const carbonEmissions: CarbonEmission[] = [
  { year: 2015, total: 92.4, energy: 42.1, industry: 30.2, transportation: 11.5, buildings: 8.6 },
  { year: 2016, total: 94.2, energy: 43.0, industry: 30.8, transportation: 11.8, buildings: 8.6 },
  { year: 2017, total: 97.5, energy: 44.8, industry: 32.0, transportation: 12.2, buildings: 8.5 },
  { year: 2018, total: 99.8, energy: 45.9, industry: 32.6, transportation: 12.7, buildings: 8.6 },
  { year: 2019, total: 101.5, energy: 46.7, industry: 33.0, transportation: 13.1, buildings: 8.7 },
  { year: 2020, total: 99.4, energy: 45.8, industry: 31.9, transportation: 12.8, buildings: 8.9 },
  { year: 2021, total: 105.2, energy: 48.9, industry: 34.1, transportation: 13.4, buildings: 8.8 },
  { year: 2022, total: 106.8, energy: 49.6, industry: 34.5, transportation: 13.8, buildings: 8.9 },
  { year: 2023, total: 108.5, energy: 50.2, industry: 35.0, transportation: 14.2, buildings: 9.1 },
  { year: 2024, total: 109.2, energy: 50.5, industry: 34.8, transportation: 14.6, buildings: 9.3 },
  { year: 2025, total: 109.5, energy: 50.6, industry: 34.5, transportation: 15.0, buildings: 9.4 },
  { year: 2026, total: 109.3, energy: 50.3, industry: 34.0, transportation: 15.4, buildings: 9.6 },
  { year: 2027, total: 108.5, energy: 49.7, industry: 33.4, transportation: 15.8, buildings: 9.6 },
  { year: 2028, total: 107.2, energy: 48.8, industry: 32.6, transportation: 16.2, buildings: 9.6 },
  { year: 2029, total: 105.5, energy: 47.6, industry: 31.7, transportation: 16.6, buildings: 9.6 },
  { year: 2030, total: 103.5, energy: 46.2, industry: 30.7, transportation: 17.0, buildings: 9.6 }
];

export const scenarios: Scenario[] = [
  {
    id: 's001',
    name: '基准情景',
    description: '按照当前政策力度和发展趋势，不新增额外政策措施',
    assumptions: ['现有政策持续执行', '技术进步按预期发展', '经济增长保持中高速'],
    color: '#6366f1'
  },
  {
    id: 's002',
    name: '强化情景',
    description: '在现有政策基础上，加大清洁能源发展和节能减排力度',
    assumptions: ['加速新能源装机', '强化能效标准', '碳市场机制完善'],
    color: '#22c55e'
  },
  {
    id: 's003',
    name: '激进情景',
    description: '采取最严格的减排措施，实现深度脱碳',
    assumptions: ['大规模储能部署', '氢能广泛应用', '碳捕获技术突破'],
    color: '#ef4444'
  },
  {
    id: 's004',
    name: '延迟情景',
    description: '政策执行力度不足，减排行动延迟',
    assumptions: ['政策执行滞后', '技术进步缓慢', '能源转型受阻'],
    color: '#f59e0b'
  }
];

export const impactResults: ImpactResult[] = [
  { year: 2025, scenarioId: 's001', carbonPeakYear: 2029, peakEmission: 110, carbonNeutralYear: 2062, renewableShare: 22, energyIntensity: 0.52, economicImpact: 0.8 },
  { year: 2025, scenarioId: 's002', carbonPeakYear: 2027, peakEmission: 108, carbonNeutralYear: 2058, renewableShare: 25, energyIntensity: 0.48, economicImpact: 1.2 },
  { year: 2025, scenarioId: 's003', carbonPeakYear: 2025, peakEmission: 105, carbonNeutralYear: 2050, renewableShare: 30, energyIntensity: 0.42, economicImpact: 1.5 },
  { year: 2025, scenarioId: 's004', carbonPeakYear: 2033, peakEmission: 115, carbonNeutralYear: 2068, renewableShare: 18, energyIntensity: 0.58, economicImpact: -0.5 },
  { year: 2030, scenarioId: 's001', carbonPeakYear: 2029, peakEmission: 110, carbonNeutralYear: 2062, renewableShare: 28, energyIntensity: 0.45, economicImpact: 1.0 },
  { year: 2030, scenarioId: 's002', carbonPeakYear: 2027, peakEmission: 108, carbonNeutralYear: 2058, renewableShare: 35, energyIntensity: 0.38, economicImpact: 1.8 },
  { year: 2030, scenarioId: 's003', carbonPeakYear: 2025, peakEmission: 105, carbonNeutralYear: 2050, renewableShare: 45, energyIntensity: 0.30, economicImpact: 2.5 },
  { year: 2030, scenarioId: 's004', carbonPeakYear: 2033, peakEmission: 115, carbonNeutralYear: 2068, renewableShare: 22, energyIntensity: 0.52, economicImpact: -0.3 },
  { year: 2040, scenarioId: 's001', carbonPeakYear: 2029, peakEmission: 110, carbonNeutralYear: 2062, renewableShare: 42, energyIntensity: 0.32, economicImpact: 1.5 },
  { year: 2040, scenarioId: 's002', carbonPeakYear: 2027, peakEmission: 108, carbonNeutralYear: 2058, renewableShare: 55, energyIntensity: 0.25, economicImpact: 2.8 },
  { year: 2040, scenarioId: 's003', carbonPeakYear: 2025, peakEmission: 105, carbonNeutralYear: 2050, renewableShare: 70, energyIntensity: 0.18, economicImpact: 4.2 },
  { year: 2040, scenarioId: 's004', carbonPeakYear: 2033, peakEmission: 115, carbonNeutralYear: 2068, renewableShare: 30, energyIntensity: 0.42, economicImpact: 0.5 },
  { year: 2050, scenarioId: 's001', carbonPeakYear: 2029, peakEmission: 110, carbonNeutralYear: 2062, renewableShare: 58, energyIntensity: 0.22, economicImpact: 2.0 },
  { year: 2050, scenarioId: 's002', carbonPeakYear: 2027, peakEmission: 108, carbonNeutralYear: 2058, renewableShare: 72, energyIntensity: 0.15, economicImpact: 3.5 },
  { year: 2050, scenarioId: 's003', carbonPeakYear: 2025, peakEmission: 105, carbonNeutralYear: 2050, renewableShare: 90, energyIntensity: 0.08, economicImpact: 5.0 },
  { year: 2050, scenarioId: 's004', carbonPeakYear: 2033, peakEmission: 115, carbonNeutralYear: 2068, renewableShare: 40, energyIntensity: 0.32, economicImpact: 1.0 },
  { year: 2060, scenarioId: 's001', carbonPeakYear: 2029, peakEmission: 110, carbonNeutralYear: 2062, renewableShare: 72, energyIntensity: 0.15, economicImpact: 2.5 },
  { year: 2060, scenarioId: 's002', carbonPeakYear: 2027, peakEmission: 108, carbonNeutralYear: 2058, renewableShare: 85, energyIntensity: 0.09, economicImpact: 4.0 },
  { year: 2060, scenarioId: 's003', carbonPeakYear: 2025, peakEmission: 105, carbonNeutralYear: 2050, renewableShare: 95, energyIntensity: 0.04, economicImpact: 5.5 },
  { year: 2060, scenarioId: 's004', carbonPeakYear: 2033, peakEmission: 115, carbonNeutralYear: 2068, renewableShare: 52, energyIntensity: 0.24, economicImpact: 1.5 }
];

export const regionalImpact = [
  { region: '华北', carbonIntensity: 2.8, renewablePotential: 65, policyImpact: 1.2 },
  { region: '东北', carbonIntensity: 2.5, renewablePotential: 72, policyImpact: 1.5 },
  { region: '华东', carbonIntensity: 2.1, renewablePotential: 45, policyImpact: 0.9 },
  { region: '华中', carbonIntensity: 2.3, renewablePotential: 55, policyImpact: 1.1 },
  { region: '华南', carbonIntensity: 1.8, renewablePotential: 50, policyImpact: 0.8 },
  { region: '西南', carbonIntensity: 1.6, renewablePotential: 85, policyImpact: 2.0 },
  { region: '西北', carbonIntensity: 2.9, renewablePotential: 92, policyImpact: 2.5 },
  { region: '东南', carbonIntensity: 1.9, renewablePotential: 48, policyImpact: 0.7 }
];

export const policyImpactMatrix = [
  { policy: '碳达峰行动方案', impact: '能源结构优化', score: 85 },
  { policy: '新能源发展方案', impact: '可再生能源增长', score: 92 },
  { policy: '电力体制改革', impact: '市场化程度提升', score: 78 },
  { policy: '碳市场建设', impact: '碳排放约束强化', score: 88 },
  { policy: '能源规划', impact: '长期发展指引', score: 80 }
];