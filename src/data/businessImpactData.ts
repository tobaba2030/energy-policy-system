/**
 * 湖北能源集团政策情报对业务影响研究与推演系统
 * 核心数据模型 V2.0
 * 重点：政策对业务板块的即时、中期影响研究与量化推演
 */

// ==================== 业务板块定义 ====================
export type BusinessUnit = 'hydro' | 'thermal' | 'renewable' | 'gas' | 'comprehensive' | 'carbon';

export const BusinessUnitLabels: Record<BusinessUnit, string> = {
  hydro: '水电板块',
  thermal: '火电板块',
  renewable: '新能源板块',
  gas: '天然气板块',
  comprehensive: '综合能源',
  carbon: '碳资产'
};

// ==================== 影响类型定义 ====================
export type ImpactType = 'price_volume' | 'cost' | 'investment' | 'subsidy';

export const ImpactTypeLabels: Record<ImpactType, string> = {
  price_volume: '量价影响',
  cost: '成本影响',
  investment: '准入与投资',
  subsidy: '补贴与收益'
};

// ==================== 影响时效定义 ====================
export type ImpactTiming = 'immediate' | 'short_term' | 'medium_term' | 'long_term';

export const ImpactTimingLabels: Record<ImpactTiming, string> = {
  immediate: '立即生效（1个月内）',
  short_term: '短期生效（1年）',
  medium_term: '中期生效（1-3年）',
  long_term: '长期（3年以上）'
};

// ==================== 政策业务影响结构 ====================
export interface QuantitativeEffect {
  parameter: string;           // 受影响参数名
  changeDirection: 'increase' | 'decrease' | 'neutral';  // 变化方向
  estimatedMagnitude: string;  // 估算幅度（如 "+30～50元/千瓦·年"）
  effectiveYear: string;       // 生效年份
  unit?: string;               // 单位
}

export interface BusinessImpact {
  businessUnit: BusinessUnit;          // 业务板块
  impactPath: string;                  // 影响路径描述
  quantitativeEffect: QuantitativeEffect;  // 量化影响
  affectedMetrics: string[];           // 受影响指标列表
  confidence: number;                  // 置信度 0-1
  impactScore: number;                 // 影响强度评分 1-10
}

export interface PolicyWithBusinessImpact {
  id: string;
  title: string;
  releaseDate: string;
  authority: string;
  category: string;
  summary: string;
  businessImpacts: BusinessImpact[];   // 业务影响清单
  impactTiming: ImpactTiming;
  keywords: string[];
  status: 'pending' | 'analyzing' | 'completed' | 'archived';
}

// ==================== 业务推演模型 ====================
export interface BusinessModelParams {
  // 水电参数
  hydro?: {
    baseElectricPrice: number;      // 基准电价 元/MWh
    waterScenario: 'abundant' | 'normal' | 'dry';  // 来水场景
    ecologicalFlow: number;         // 生态流量约束
    pumpStorageRevenue: number;     // 抽蓄调用收益 万元
  };
  // 火电参数
  thermal?: {
    coalPrice: number;              // 煤价 元/吨
    baseElectricPrice: number;      // 基准电价
    capacityCompensation: number;   // 容量补偿 元/kW·年
    carbonQuota: number;            // 碳排放配额
    carbonPrice: number;            // 碳价 元/吨
    flexibilityRetrofit: number;    // 灵活性改造进度 0-1
    frequencyRegulationRevenue: number;  // 调频收益 万元
  };
  // 新能源参数
  renewable?: {
    guaranteedHours: number;        // 保障收购小时
    marketDiscountRate: number;     // 市场化交易折价率
    greenCertPrice: number;         // 绿证价格 元/张
    greenCertSalesRate: number;     // 绿证销售率 0-1
    storageCost: number;            // 储能配置成本 万元
    curtailmentRate: number;        // 弃风弃光率
  };
  // 天然气参数
  gas?: {
    longTermGasPrice: number;       // 长协气价
    spotGasPrice: number;           // 现货气价
    transmissionFee: number;        // 管输费
    terminalPrice: number;          // 终端售价
    salesVolume: number;            // 销气量 万方
  };
}

export interface BusinessSimulationResult {
  businessUnit: BusinessUnit;
  year: number;
  // 通用指标
  revenue: number;           // 收入 万元
  cost: number;              // 成本 万元
  profit: number;            // 利润 万元
  // 板块特有指标
  metrics: Record<string, number>;
}

// ==================== 推演场景 ====================
export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  type: 'baseline' | 'policy' | 'custom';
  params: BusinessModelParams;
  policyImpacts: string[];   // 关联的政策影响ID
  createdAt: string;
}

// ==================== 推演结果 ====================
export interface SimulationResult {
  scenarioId: string;
  businessUnit: BusinessUnit;
  results: BusinessSimulationResult[];
  comparison?: {
    baselineId: string;
    profitChange: number;      // 利润变动 万元
    profitChangePercent: number; // 利润变动百分比
    mainFactors: {
      factor: string;
      impact: number;
    }[];
  };
}

// ==================== 业务资产 ====================
export interface BusinessAsset {
  id: string;
  name: string;
  businessUnit: BusinessUnit;
  location: string;           // 地理位置
  capacity: number;           // 装机容量 MW
  annualGeneration: number;   // 年发电量 GWh
  status: 'operating' | 'construction' | 'planning';
  impactAlert?: 'high' | 'medium' | 'low' | 'none';  // 政策影响预警
}

// ==================== 示例数据 ====================

// 湖北能源集团主要发电资产
export const businessAssets: BusinessAsset[] = [
  // 水电资产
  { id: 'hydro-001', name: '清江隔河岩水电站', businessUnit: 'hydro', location: '宜昌市长阳县', capacity: 1200, annualGeneration: 3200, status: 'operating', impactAlert: 'medium' },
  { id: 'hydro-002', name: '清江高坝洲水电站', businessUnit: 'hydro', location: '宜昌市宜都市', capacity: 540, annualGeneration: 1800, status: 'operating', impactAlert: 'none' },
  { id: 'hydro-003', name: '清江水布垭水电站', businessUnit: 'hydro', location: '恩施州巴东县', capacity: 1840, annualGeneration: 4200, status: 'operating', impactAlert: 'low' },
  // 火电资产
  { id: 'thermal-001', name: '鄂州电厂', businessUnit: 'thermal', location: '鄂州市', capacity: 2400, annualGeneration: 12000, status: 'operating', impactAlert: 'high' },
  { id: 'thermal-002', name: '襄阳电厂', businessUnit: 'thermal', location: '襄阳市', capacity: 1200, annualGeneration: 6000, status: 'operating', impactAlert: 'high' },
  { id: 'thermal-003', name: '荆州电厂', businessUnit: 'thermal', location: '荆州市', capacity: 660, annualGeneration: 3300, status: 'operating', impactAlert: 'medium' },
  // 新能源资产
  { id: 'renewable-001', name: '随州光伏电站群', businessUnit: 'renewable', location: '随州市', capacity: 500, annualGeneration: 600, status: 'operating', impactAlert: 'medium' },
  { id: 'renewable-002', name: '恩施风电场群', businessUnit: 'renewable', location: '恩施州', capacity: 300, annualGeneration: 500, status: 'operating', impactAlert: 'low' },
  { id: 'renewable-003', name: '黄冈光伏电站', businessUnit: 'renewable', location: '黄冈市', capacity: 200, annualGeneration: 240, status: 'construction', impactAlert: 'none' },
];

// 政策业务影响示例数据
export const policyBusinessImpacts: PolicyWithBusinessImpact[] = [
  {
    id: 'P20260610_NDRC_001',
    title: '《关于进一步完善电力现货市场交易机制的通知》',
    releaseDate: '2026-06-10',
    authority: '国家发展改革委 国家能源局',
    category: '电力市场政策',
    summary: '深化电力现货市场改革，扩大现货交易范围，完善中长期合同与现货交易衔接机制',
    businessImpacts: [
      {
        businessUnit: 'thermal',
        impactPath: '现货交易比例扩大',
        quantitativeEffect: {
          parameter: 'spotTradingRatio',
          changeDirection: 'increase',
          estimatedMagnitude: '+15%',
          effectiveYear: '2026',
          unit: '%'
        },
        affectedMetrics: ['电价波动率', '经营风险', '收益稳定性'],
        confidence: 0.88,
        impactScore: 8
      },
      {
        businessUnit: 'hydro',
        impactPath: '水电参与现货交易',
        quantitativeEffect: {
          parameter: 'hydroSpotRevenue',
          changeDirection: 'increase',
          estimatedMagnitude: '+5%～10%',
          effectiveYear: '2026',
          unit: '%'
        },
        affectedMetrics: ['水电利润', '市场化收益'],
        confidence: 0.75,
        impactScore: 6
      }
    ],
    impactTiming: 'immediate',
    keywords: ['电力现货', '市场化', '交易机制'],
    status: 'analyzing'
  },
  {
    id: 'P20260608_NDRC_002',
    title: '《关于完善煤电容量电价机制的通知》',
    releaseDate: '2026-06-08',
    authority: '国家发展改革委',
    category: '电价政策',
    summary: '完善煤电容量电价机制，容量补偿标准从100元/千瓦·年提升至130元/千瓦·年，2027年起执行',
    businessImpacts: [
      {
        businessUnit: 'thermal',
        impactPath: '容量电价机制调整',
        quantitativeEffect: {
          parameter: 'capacityCompensation',
          changeDirection: 'increase',
          estimatedMagnitude: '+30元/千瓦·年',
          effectiveYear: '2027',
          unit: '元/kW·年'
        },
        affectedMetrics: ['火电利润', '固定成本回收率', '利用小时敏感度'],
        confidence: 0.85,
        impactScore: 9
      }
    ],
    impactTiming: 'medium_term',
    keywords: ['容量电价', '煤电', '补偿机制'],
    status: 'completed'
  },
  {
    id: 'P20260605_NEA_001',
    title: '《关于促进新型储能发展的指导意见》',
    releaseDate: '2026-06-05',
    authority: '国家能源局',
    category: '新能源政策',
    summary: '加快新型储能规模化发展，完善储能价格形成机制，推动储能参与电力市场',
    businessImpacts: [
      {
        businessUnit: 'renewable',
        impactPath: '储能配套成本下降',
        quantitativeEffect: {
          parameter: 'storageCost',
          changeDirection: 'decrease',
          estimatedMagnitude: '-15%～20%',
          effectiveYear: '2026',
          unit: '%'
        },
        affectedMetrics: ['新能源消纳', '弃风弃光率', '项目经济性'],
        confidence: 0.82,
        impactScore: 7
      },
      {
        businessUnit: 'comprehensive',
        impactPath: '储能商业模式创新',
        quantitativeEffect: {
          parameter: 'storageRevenue',
          changeDirection: 'increase',
          estimatedMagnitude: '+20%～30%',
          effectiveYear: '2027',
          unit: '%'
        },
        affectedMetrics: ['综合能源收益', '虚拟电厂价值'],
        confidence: 0.70,
        impactScore: 6
      }
    ],
    impactTiming: 'short_term',
    keywords: ['储能', '新型储能', '电力市场'],
    status: 'completed'
  },
  {
    id: 'P20260601_MEE_001',
    title: '《湖北省碳排放权交易管理办法（修订）》',
    releaseDate: '2026-06-01',
    authority: '湖北省生态环境厅',
    category: '碳市场政策',
    summary: '调整碳配额分配方法，火电行业免费配额比例下降5%，碳价预期上涨',
    businessImpacts: [
      {
        businessUnit: 'thermal',
        impactPath: '碳配额分配收紧',
        quantitativeEffect: {
          parameter: 'carbonQuota',
          changeDirection: 'decrease',
          estimatedMagnitude: '-5%免费配额比例',
          effectiveYear: '2027',
          unit: '%'
        },
        affectedMetrics: ['碳成本', '度电成本', '利润'],
        confidence: 0.72,
        impactScore: 8
      },
      {
        businessUnit: 'carbon',
        impactPath: '碳价上涨预期',
        quantitativeEffect: {
          parameter: 'carbonPrice',
          changeDirection: 'increase',
          estimatedMagnitude: '+20～30元/吨',
          effectiveYear: '2027',
          unit: '元/吨'
        },
        affectedMetrics: ['碳资产价值', 'CCER收益'],
        confidence: 0.68,
        impactScore: 6
      }
    ],
    impactTiming: 'medium_term',
    keywords: ['碳配额', '碳交易', '火电'],
    status: 'analyzing'
  },
  {
    id: 'P20260528_NDRC_003',
    title: '《关于提高可再生能源绿证交易活跃度的通知》',
    releaseDate: '2026-05-28',
    authority: '国家发展改革委 国家能源局',
    category: '新能源政策',
    summary: '完善绿证交易制度，扩大绿证强制消纳范围，提高绿证价格发现效率',
    businessImpacts: [
      {
        businessUnit: 'renewable',
        impactPath: '绿证强制消费比例提高',
        quantitativeEffect: {
          parameter: 'greenCertPrice',
          changeDirection: 'increase',
          estimatedMagnitude: '+0.02～0.05元/千瓦时',
          effectiveYear: '2026',
          unit: '元/kWh'
        },
        affectedMetrics: ['风电/光伏等效上网电价', '项目IRR'],
        confidence: 0.78,
        impactScore: 7
      }
    ],
    impactTiming: 'short_term',
    keywords: ['绿证', '可再生能源', '消纳'],
    status: 'completed'
  },
  {
    id: 'P20260520_NEA_002',
    title: '《关于加强电力需求侧管理的指导意见》',
    releaseDate: '2026-05-20',
    authority: '国家能源局',
    category: '电力政策',
    summary: '强化需求侧响应能力，完善需求响应补偿机制，推动虚拟电厂建设',
    businessImpacts: [
      {
        businessUnit: 'comprehensive',
        impactPath: '需求响应收益增加',
        quantitativeEffect: {
          parameter: 'demandResponseRevenue',
          changeDirection: 'increase',
          estimatedMagnitude: '+50%',
          effectiveYear: '2026',
          unit: '%'
        },
        affectedMetrics: ['综合能源服务收益', '负荷调节能力'],
        confidence: 0.75,
        impactScore: 6
      },
      {
        businessUnit: 'thermal',
        impactPath: '调峰压力缓解',
        quantitativeEffect: {
          parameter: 'peakShavingCost',
          changeDirection: 'decrease',
          estimatedMagnitude: '-10%～15%',
          effectiveYear: '2027',
          unit: '%'
        },
        affectedMetrics: ['调频成本', '灵活性需求'],
        confidence: 0.65,
        impactScore: 5
      }
    ],
    impactTiming: 'short_term',
    keywords: ['需求侧', '虚拟电厂', '需求响应'],
    status: 'completed'
  },
  {
    id: 'P20260515_MNR_001',
    title: '《关于进一步规范煤层气开发利用的通知》',
    releaseDate: '2026-05-15',
    authority: '国家能源局 自然资源部',
    category: '天然气政策',
    summary: '鼓励煤层气勘探开发，完善煤层气定价机制，提高煤层气利用效率',
    businessImpacts: [
      {
        businessUnit: 'gas',
        impactPath: '气源多元化',
        quantitativeEffect: {
          parameter: 'gasSupplyDiversity',
          changeDirection: 'increase',
          estimatedMagnitude: '+8%',
          effectiveYear: '2027',
          unit: '%'
        },
        affectedMetrics: ['气源保障', '采购成本'],
        confidence: 0.70,
        impactScore: 5
      }
    ],
    impactTiming: 'medium_term',
    keywords: ['煤层气', '天然气', '气源'],
    status: 'pending'
  },
  {
    id: 'P20260510_NDRC_004',
    title: '《关于深化上网电价市场化改革的通知》',
    releaseDate: '2026-05-10',
    authority: '国家发展改革委',
    category: '电价政策',
    summary: '扩大电价浮动范围，完善电价形成机制，推进工商业用户直接参与电力交易',
    businessImpacts: [
      {
        businessUnit: 'thermal',
        impactPath: '电价浮动区间扩大',
        quantitativeEffect: {
          parameter: 'priceFloatingRange',
          changeDirection: 'increase',
          estimatedMagnitude: '+/-20%',
          effectiveYear: '2026',
          unit: '%'
        },
        affectedMetrics: ['电价风险', '收益波动', '市场竞争力'],
        confidence: 0.80,
        impactScore: 7
      },
      {
        businessUnit: 'hydro',
        impactPath: '水电电价市场化',
        quantitativeEffect: {
          parameter: 'hydroMarketPrice',
          changeDirection: 'increase',
          estimatedMagnitude: '+3%～5%',
          effectiveYear: '2026',
          unit: '%'
        },
        affectedMetrics: ['水电收入', '市场化程度'],
        confidence: 0.72,
        impactScore: 5
      }
    ],
    impactTiming: 'immediate',
    keywords: ['电价改革', '市场化', '浮动电价'],
    status: 'completed'
  }
];

// 业务板块基准参数
export const baselineParams: BusinessModelParams = {
  hydro: {
    baseElectricPrice: 280,  // 元/MWh
    waterScenario: 'normal',
    ecologicalFlow: 0.15,
    pumpStorageRevenue: 5000
  },
  thermal: {
    coalPrice: 750,  // 元/吨
    baseElectricPrice: 380,
    capacityCompensation: 100,  // 元/kW·年
    carbonQuota: 0.85,
    carbonPrice: 80,
    flexibilityRetrofit: 0.6,
    frequencyRegulationRevenue: 8000
  },
  renewable: {
    guaranteedHours: 1800,
    marketDiscountRate: 0.85,
    greenCertPrice: 30,
    greenCertSalesRate: 0.7,
    storageCost: 2000,
    curtailmentRate: 0.05
  },
  gas: {
    longTermGasPrice: 2.5,
    spotGasPrice: 3.2,
    transmissionFee: 0.3,
    terminalPrice: 3.8,
    salesVolume: 50000
  }
};

// 业务板块关键指标定义
export const businessMetrics: Record<BusinessUnit, { key: string; label: string; unit: string }[]> = {
  hydro: [
    { key: 'generation', label: '发电量', unit: 'GWh' },
    { key: 'avgPrice', label: '平均上网电价', unit: '元/MWh' },
    { key: 'revenue', label: '电力收入', unit: '万元' },
    { key: 'cost', label: '营业成本', unit: '万元' },
    { key: 'profit', label: '利润总额', unit: '万元' }
  ],
  thermal: [
    { key: 'utilizationHours', label: '利用小时数', unit: '小时' },
    { key: 'unitCost', label: '度电成本', unit: '元/MWh' },
    { key: 'carbonCost', label: '碳成本', unit: '万元' },
    { key: 'capacityRevenue', label: '容量补偿收入', unit: '万元' },
    { key: 'profit', label: '利润总额', unit: '万元' }
  ],
  renewable: [
    { key: 'equivalentPrice', label: '等效上网电价', unit: '元/MWh' },
    { key: 'generationRevenue', label: '发电收入', unit: '万元' },
    { key: 'subsidyRevenue', label: '补贴收入', unit: '万元' },
    { key: 'greenCertRevenue', label: '绿证收入', unit: '万元' },
    { key: 'profit', label: '利润总额', unit: '万元' }
  ],
  gas: [
    { key: 'salesVolume', label: '销气量', unit: '万方' },
    { key: 'grossMargin', label: '毛差', unit: '元/方' },
    { key: 'totalGrossProfit', label: '总毛利', unit: '万元' },
    { key: 'profit', label: '利润总额', unit: '万元' }
  ],
  comprehensive: [
    { key: 'revenue', label: '综合收入', unit: '万元' },
    { key: 'profit', label: '利润总额', unit: '万元' }
  ],
  carbon: [
    { key: 'allowance', label: '配额盈亏', unit: '万吨' },
    { key: 'ccerRevenue', label: 'CCER收益', unit: '万元' },
    { key: 'netPosition', label: '净头寸', unit: '万元' }
  ]
};

// ==================== 业务板块扩展数据（用于组件展示）====================
export interface BusinessSegment {
  id: BusinessUnit;
  name: string;
  icon: string;
  description: string;
  keyMetrics: {
    capacity: number;
    growth: number;
    unit: string;
  };
  impacts: {
    type: 'opportunity' | 'challenge' | 'neutral';
    description: string;
    urgency: 'high' | 'medium' | 'low';
  }[];
  recommendations: string[];
}

export const businessSegments: BusinessSegment[] = [
  {
    id: 'hydro',
    name: '水电板块',
    icon: '💧',
    description: '清江流域梯级水电站，包括隔河岩、高坝洲、水布垭等',
    keyMetrics: { capacity: 3580, growth: 2.5, unit: 'MW' },
    impacts: [
      { type: 'neutral', description: '电力市场化改革推进，水电参与现货交易比例提升', urgency: 'medium' },
      { type: 'challenge', description: '生态流量约束加强，枯水期发电受限', urgency: 'high' }
    ],
    recommendations: ['优化水库调度策略', '加强枯水期预测能力', '探索抽蓄联合运行模式']
  },
  {
    id: 'thermal',
    name: '火电板块',
    icon: '🔥',
    description: '鄂州、襄阳、荆州等燃煤电厂，承担基荷和调峰任务',
    keyMetrics: { capacity: 4260, growth: -3.2, unit: 'MW' },
    impacts: [
      { type: 'opportunity', description: '容量电价机制完善，固定成本回收率提升', urgency: 'high' },
      { type: 'challenge', description: '碳配额收紧，碳成本上升压力', urgency: 'high' },
      { type: 'challenge', description: '新能源挤占发电空间，利用小时下降', urgency: 'medium' }
    ],
    recommendations: ['加快灵活性改造', '优化燃料采购策略', '加强碳资产管理']
  },
  {
    id: 'renewable',
    name: '新能源板块',
    icon: '☀️',
    description: '随州光伏、恩施风电等新能源项目群',
    keyMetrics: { capacity: 1000, growth: 15.8, unit: 'MW' },
    impacts: [
      { type: 'opportunity', description: '绿证强制消费比例提高，绿证收益增加', urgency: 'high' },
      { type: 'opportunity', description: '可再生能源消纳权重提升', urgency: 'medium' },
      { type: 'challenge', description: '市场化交易折价压力', urgency: 'medium' }
    ],
    recommendations: ['提升绿证销售率', '优化市场化交易策略', '加快储能配套建设']
  },
  {
    id: 'gas',
    name: '天然气板块',
    icon: '🏭',
    description: '湖北省天然气管道网络及终端销售',
    keyMetrics: { capacity: 50000, growth: 5.2, unit: '万方/日' },
    impacts: [
      { type: 'neutral', description: '天然气价格市场化改革推进', urgency: 'medium' },
      { type: 'opportunity', description: '冬季保供需求增长', urgency: 'high' }
    ],
    recommendations: ['优化气源采购结构', '加强储气调峰能力', '拓展终端市场']
  },
  {
    id: 'comprehensive',
    name: '综合能源',
    icon: '⚡',
    description: '综合能源服务、分布式能源、储能等新业务',
    keyMetrics: { capacity: 500, growth: 20.5, unit: 'MW' },
    impacts: [
      { type: 'opportunity', description: '综合能源服务政策支持力度加大', urgency: 'medium' },
      { type: 'opportunity', description: '储能商业模式逐步成熟', urgency: 'low' }
    ],
    recommendations: ['拓展园区综合能源项目', '探索储能商业模式', '发展虚拟电厂业务']
  },
  {
    id: 'carbon',
    name: '碳资产',
    icon: '🌱',
    description: '碳排放权交易、CCER开发、碳资产管理',
    keyMetrics: { capacity: 200, growth: 8.3, unit: '万吨' },
    impacts: [
      { type: 'challenge', description: '碳配额分配收紧，免费比例下降', urgency: 'high' },
      { type: 'opportunity', description: '碳价上涨预期，碳资产价值提升', urgency: 'medium' }
    ],
    recommendations: ['加强碳配额管理', '开发CCER项目', '优化碳交易策略']
  }
];

// ==================== 政策影响矩阵数据 ====================
export interface PolicyImpact {
  policyId: string;
  policyTitle: string;
  segments: {
    segmentId: string;
    impactScore: number;
    analysis: string;
  }[];
}

export const policyImpacts: PolicyImpact[] = [
  {
    policyId: 'P20260701_NDRC_001',
    policyTitle: '容量电价机制完善',
    segments: [
      { segmentId: 'thermal', impactScore: 85, analysis: '容量补偿提升30元/kW·年，利润显著改善' },
      { segmentId: 'hydro', impactScore: 10, analysis: '影响较小' },
      { segmentId: 'renewable', impactScore: -5, analysis: '间接影响，竞争压力增加' },
      { segmentId: 'gas', impactScore: 0, analysis: '无直接影响' },
      { segmentId: 'comprehensive', impactScore: 5, analysis: '储能容量价值提升' },
      { segmentId: 'carbon', impactScore: 0, analysis: '无直接影响' }
    ]
  },
  {
    policyId: 'P20260702_NDRC_002',
    policyTitle: '可再生能源消纳权重提升',
    segments: [
      { segmentId: 'thermal', impactScore: -25, analysis: '发电空间被挤占' },
      { segmentId: 'hydro', impactScore: -15, analysis: '调峰压力增加' },
      { segmentId: 'renewable', impactScore: 70, analysis: '消纳保障增强，收益提升' },
      { segmentId: 'gas', impactScore: 10, analysis: '燃气调峰需求增加' },
      { segmentId: 'comprehensive', impactScore: 30, analysis: '综合能源消纳优势' },
      { segmentId: 'carbon', impactScore: 15, analysis: '减排价值提升' }
    ]
  },
  {
    policyId: 'P20260703_ECO_001',
    policyTitle: '碳配额分配调整',
    segments: [
      { segmentId: 'thermal', impactScore: -60, analysis: '免费配额下降，碳成本上升' },
      { segmentId: 'hydro', impactScore: 0, analysis: '无直接影响' },
      { segmentId: 'renewable', impactScore: 20, analysis: '绿电价值提升' },
      { segmentId: 'gas', impactScore: -10, analysis: '燃气机组碳成本小幅上升' },
      { segmentId: 'comprehensive', impactScore: 10, analysis: '低碳服务价值提升' },
      { segmentId: 'carbon', impactScore: 45, analysis: '碳资产价值提升' }
    ]
  }
];

// ==================== 报告层级定义 ====================
export interface ReportLevel {
  id: string;
  name: string;
  description: string;
  color: string;
  audience: string;
  frequency: string;
  reports: {
    id: string;
    level: string;
    title: string;
    category: string;
    status: 'published' | 'draft' | 'updating';
    lastUpdated: string;
    summary: string;
    keyFindings: string[];
    relatedPolicies: string[];
    affectedSegments: BusinessUnit[];
  }[];
}

export const reportLevels: ReportLevel[] = [
  {
    id: 'L1',
    name: '决策速览',
    description: '一页纸摘要，重大政策预警与行动建议',
    color: '#ef4444',
    audience: '集团决策层',
    frequency: '实时',
    reports: [
      {
        id: 'R-L1-001',
        level: 'L1',
        title: '容量电价政策影响速览',
        category: '电价政策',
        status: 'published',
        lastUpdated: '2026-06-20',
        summary: '新容量电价机制预计提升火电板块利润8%-12%，建议重点关注鄂州电厂灵活性改造进度',
        keyFindings: ['火电板块利润提升显著', '鄂州电厂受益最大', '需关注煤价波动风险'],
        relatedPolicies: ['容量电价机制完善'],
        affectedSegments: ['thermal']
      }
    ]
  },
  {
    id: 'L2',
    name: '业务影响专题',
    description: '详细分析某政策对某板块的推演结果',
    color: '#3b82f6',
    audience: '业务部门负责人',
    frequency: '周报',
    reports: [
      {
        id: 'R-L2-001',
        level: 'L2',
        title: '火电板块政策影响专题报告',
        category: '火电业务',
        status: 'published',
        lastUpdated: '2026-06-18',
        summary: '综合分析容量电价、碳配额、电力市场化等政策对火电板块的影响',
        keyFindings: ['容量电价提升带来正向收益', '碳成本压力持续增加', '利用小时呈下降趋势'],
        relatedPolicies: ['容量电价机制', '碳配额分配', '电力市场化改革'],
        affectedSegments: ['thermal', 'carbon']
      },
      {
        id: 'R-L2-002',
        level: 'L2',
        title: '新能源板块政策影响专题报告',
        category: '新能源业务',
        status: 'updating',
        lastUpdated: '2026-06-19',
        summary: '分析绿证、消纳权重、市场化交易等政策对新能源板块的影响',
        keyFindings: ['绿证收益显著提升', '消纳保障增强', '市场化折价压力需关注'],
        relatedPolicies: ['绿证强制消费', '可再生能源消纳', '电力市场化'],
        affectedSegments: ['renewable']
      }
    ]
  },
  {
    id: 'L3',
    name: '研究分析报告',
    description: '包含模型参数、敏感性分析、方法论说明',
    color: '#8b5cf6',
    audience: '政策研究室',
    frequency: '月报',
    reports: [
      {
        id: 'R-L3-001',
        level: 'L3',
        title: '政策影响推演方法论研究报告',
        category: '方法论',
        status: 'draft',
        lastUpdated: '2026-06-15',
        summary: '详细说明业务影响推演模型的构建方法、参数校准、敏感性分析方法',
        keyFindings: ['模型参数已校准至2020-2025实际数据', '敏感性分析覆盖主要政策参数', '置信区间评估方法已建立'],
        relatedPolicies: ['方法论研究'],
        affectedSegments: ['hydro', 'thermal', 'renewable', 'gas', 'carbon']
      }
    ]
  }
];

// ==================== 业务指标历史数据（用于图表）====================
export interface BusinessMetricData {
  segmentId: BusinessUnit;
  year: number;
  capacity: number;
  generation: number;
  utilization: number;
  revenue: number;
  cost: number;
  profit: number;
}

export const businessMetricHistory: BusinessMetricData[] = [
  // 水电历史数据
  { segmentId: 'hydro', year: 2022, capacity: 3400, generation: 8500, utilization: 2500, revenue: 238000, cost: 85000, profit: 153000 },
  { segmentId: 'hydro', year: 2023, capacity: 3500, generation: 8800, utilization: 2514, revenue: 246400, cost: 88000, profit: 158400 },
  { segmentId: 'hydro', year: 2024, capacity: 3550, generation: 8600, utilization: 2423, revenue: 240800, cost: 86000, profit: 154800 },
  { segmentId: 'hydro', year: 2025, capacity: 3580, generation: 9000, utilization: 2514, revenue: 252000, cost: 90000, profit: 162000 },
  // 火电历史数据
  { segmentId: 'thermal', year: 2022, capacity: 4200, generation: 21000, utilization: 5000, revenue: 798000, cost: 680000, profit: 118000 },
  { segmentId: 'thermal', year: 2023, capacity: 4250, generation: 19500, utilization: 4588, revenue: 741000, cost: 640000, profit: 101000 },
  { segmentId: 'thermal', year: 2024, capacity: 4260, generation: 18000, utilization: 4225, revenue: 684000, cost: 600000, profit: 84000 },
  { segmentId: 'thermal', year: 2025, capacity: 4260, generation: 17000, utilization: 3991, revenue: 646000, cost: 570000, profit: 76000 },
  // 新能源历史数据
  { segmentId: 'renewable', year: 2022, capacity: 600, generation: 800, utilization: 1333, revenue: 28000, cost: 12000, profit: 16000 },
  { segmentId: 'renewable', year: 2023, capacity: 750, generation: 1000, utilization: 1333, revenue: 35000, cost: 15000, profit: 20000 },
  { segmentId: 'renewable', year: 2024, capacity: 900, generation: 1200, utilization: 1333, revenue: 42000, cost: 18000, profit: 24000 },
  { segmentId: 'renewable', year: 2025, capacity: 1000, generation: 1400, utilization: 1400, revenue: 49000, cost: 21000, profit: 28000 }
];
