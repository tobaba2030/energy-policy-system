export interface BusinessSegment {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  keyMetrics: {
    capacity: number;
    unit: string;
    growth: number;
  };
  policies: string[];
  impacts: {
    type: 'opportunity' | 'challenge' | 'neutral';
    description: string;
    urgency: 'high' | 'medium' | 'low';
  }[];
  recommendations: string[];
}

export interface ReportLevel {
  id: string;
  name: string;
  description: string;
  audience: string;
  frequency: string;
  color: string;
  reports: Report[];
}

export interface Report {
  id: string;
  title: string;
  level: string;
  category: string;
  lastUpdated: string;
  status: 'published' | 'draft' | 'updating';
  summary: string;
  keyFindings: string[];
  relatedPolicies: string[];
  affectedSegments: string[];
}

export interface PolicyImpact {
  policyId: string;
  policyTitle: string;
  releaseDate: string;
  authority: string;
  segments: {
    segmentId: string;
    impactScore: number;
    impactType: 'positive' | 'negative' | 'neutral';
    analysis: string;
    adaptation: string;
  }[];
}

export interface BusinessMetrics {
  segmentId: string;
  year: number;
  capacity: number;
  generation: number;
  utilization: number;
  cost: number;
  revenue: number;
  carbon: number;
}

// 业务板块数据
export const businessSegments: BusinessSegment[] = [
  {
    id: 'thermal',
    name: '火电业务',
    icon: '🔥',
    color: '#ef4444',
    description: '燃煤发电是集团传统主业，装机容量占比较高，面临碳排放约束和清洁替代压力',
    keyMetrics: {
      capacity: 45000,
      unit: 'MW',
      growth: -2.5
    },
    policies: ['碳达峰行动方案', '煤电淘汰计划', '碳市场扩容'],
    impacts: [
      { type: 'challenge', description: '碳配额收紧导致运营成本上升', urgency: 'high' },
      { type: 'challenge', description: '煤电机组淘汰时间表提前', urgency: 'high' },
      { type: 'opportunity', description: '灵活性改造可获取辅助服务收益', urgency: 'medium' },
      { type: 'neutral', description: '大容量高参数机组仍有生存空间', urgency: 'low' }
    ],
    recommendations: [
      '加快煤电机组灵活性改造',
      '优化资产组合，择机退出老小机组',
      '布局碳资产管理能力',
      '探索CCUS技术应用'
    ]
  },
  {
    id: 'hydro',
    name: '水电业务',
    icon: '💧',
    color: '#3b82f6',
    description: '水电是清洁能源的重要组成部分，具有调峰调频优势，但开发空间受限',
    keyMetrics: {
      capacity: 28000,
      unit: 'MW',
      growth: 1.2
    },
    policies: ['可再生能源法', '水电开发规划', '电价机制改革'],
    impacts: [
      { type: 'opportunity', description: '新型电力系统需要灵活调节电源', urgency: 'high' },
      { type: 'opportunity', description: '抽水蓄能发展政策支持加强', urgency: 'high' },
      { type: 'neutral', description: '生态流量要求提高', urgency: 'medium' },
      { type: 'opportunity', description: '绿电交易溢价收益', urgency: 'medium' }
    ],
    recommendations: [
      '加快抽水蓄能项目布局',
      '推进梯级水电站联合调度',
      '拓展水风光一体化基地',
      '完善生态流量监测体系'
    ]
  },
  {
    id: 'nuclear',
    name: '核电业务',
    icon: '⚛️',
    color: '#8b5cf6',
    description: '核电是基荷电源的重要组成部分，具有清洁高效特点，但审批周期长、安全要求高',
    keyMetrics: {
      capacity: 12000,
      unit: 'MW',
      growth: 5.8
    },
    policies: ['核电发展规划', '核安全法规', '核电电价政策'],
    impacts: [
      { type: 'opportunity', description: '核电核准提速，迎来新一轮发展', urgency: 'high' },
      { type: 'opportunity', description: '核电参与电力市场空间扩大', urgency: 'medium' },
      { type: 'neutral', description: '安全监管要求持续提升', urgency: 'medium' },
      { type: 'opportunity', description: '小型堆技术示范项目推进', urgency: 'low' }
    ],
    recommendations: [
      '积极参与新核电项目竞标',
      '提升核电运维服务能力',
      '关注小型模块化反应堆机遇',
      '加强核安全文化建设'
    ]
  },
  {
    id: 'wind',
    name: '风电业务',
    icon: '🌪️',
    color: '#06b6d4',
    description: '风电是新能源发展的主力军，陆上风电成本优势明显，海上风电前景广阔',
    keyMetrics: {
      capacity: 35000,
      unit: 'MW',
      growth: 15.2
    },
    policies: ['新能源发展规划', '风电上网电价政策', '海上风电发展规划'],
    impacts: [
      { type: 'opportunity', description: '大基地项目提供规模发展机遇', urgency: 'high' },
      { type: 'opportunity', description: '海上风电进入平价时代', urgency: 'high' },
      { type: 'challenge', description: '用地用海约束趋严', urgency: 'medium' },
      { type: 'challenge', description: '电力市场交易价格波动', urgency: 'medium' }
    ],
    recommendations: [
      '加快风光大基地项目获取',
      '深耕海上风电资源',
      '提升智能运维能力',
      '探索分散式风电开发'
    ]
  },
  {
    id: 'solar',
    name: '光伏业务',
    icon: '☀️',
    color: '#fbbf24',
    description: '光伏发电成本持续下降，应用场景日益丰富，是新能源增长最快的板块',
    keyMetrics: {
      capacity: 42000,
      unit: 'MW',
      growth: 28.5
    },
    policies: ['新能源发展规划', '光伏用地政策', '整县屋顶分布式光伏'],
    impacts: [
      { type: 'opportunity', description: '组件成本下降提升项目收益率', urgency: 'high' },
      { type: 'opportunity', description: '分布式光伏整县推进机遇', urgency: 'high' },
      { type: 'challenge', description: '用地政策趋紧影响大型项目开发', urgency: 'medium' },
      { type: 'neutral', description: '市场化交易比例提升', urgency: 'medium' }
    ],
    recommendations: [
      '加大分布式光伏开发力度',
      '推进农光互补、渔光互补模式',
      '布局光伏+储能综合项目',
      '拓展 BIPV 等新应用场景'
    ]
  },
  {
    id: 'storage',
    name: '储能业务',
    icon: '🔋',
    color: '#22c55e',
    description: '储能是构建新型电力系统的关键技术，锂电池储能快速发展，液流电池、压缩空气储能等长时储能前景广阔',
    keyMetrics: {
      capacity: 5000,
      unit: 'MWh',
      growth: 85.3
    },
    policies: ['新型储能发展指导意见', '储能电价机制', '强制配储政策'],
    impacts: [
      { type: 'opportunity', description: '强制配储政策带来市场需求', urgency: 'high' },
      { type: 'opportunity', description: '共享储能商业模式成熟', urgency: 'high' },
      { type: 'challenge', description: '盈利模式依赖政策补贴', urgency: 'medium' },
      { type: 'opportunity', description: '长时储能技术示范应用', urgency: 'low' }
    ],
    recommendations: [
      '加快电网侧共享储能布局',
      '构建储能系统集成能力',
      '探索储能资产证券化',
      '布局液流电池等新技术'
    ]
  }
];

// 报告层级数据
export const reportLevels: ReportLevel[] = [
  {
    id: 'strategic',
    name: '战略层报告',
    description: '面向集团董事会、高管层，提供中长期战略决策支持',
    audience: '董事会、高管层',
    frequency: '季度/年度',
    color: '#8b5cf6',
    reports: [
      {
        id: 'str-001',
        title: '能源政策环境全景分析报告',
        level: 'strategic',
        category: '政策环境',
        lastUpdated: '2024-01-15',
        status: 'published',
        summary: '系统分析国内外能源政策走向，评估对集团战略的影响',
        keyFindings: [
          '双碳目标加速推进，清洁能源发展迎来黄金期',
          '电力市场化改革深入，市场机制逐步完善',
          '能源安全重要性提升，兜底保障能力建设加强'
        ],
        relatedPolicies: ['碳达峰行动方案', '能源发展规划'],
        affectedSegments: ['thermal', 'hydro', 'nuclear', 'wind', 'solar', 'storage']
      },
      {
        id: 'str-002',
        title: '电源结构优化战略研究报告',
        level: 'strategic',
        category: '战略规划',
        lastUpdated: '2024-02-20',
        status: 'published',
        summary: '研究电源结构优化方向，提出低碳转型路径建议',
        keyFindings: [
          '新能源装机占比目标：2030年达到50%',
          '煤电定位转变：从基荷电源向调节电源转型',
          '储能成为新型电力系统刚需'
        ],
        relatedPolicies: ['新能源发展规划', '煤电转型升级'],
        affectedSegments: ['thermal', 'wind', 'solar', 'storage']
      }
    ]
  },
  {
    id: 'tactical',
    name: '战术层报告',
    description: '面向职能部门、业务板块负责人，提供业务决策支持',
    audience: '职能部门、业务板块',
    frequency: '月度/季度',
    color: '#3b82f6',
    reports: [
      {
        id: 'tac-001',
        title: '新能源政策解读与业务影响分析',
        level: 'tactical',
        category: '政策解读',
        lastUpdated: '2024-03-10',
        status: 'published',
        summary: '深入解读新能源相关政策，评估对风光业务的直接影响',
        keyFindings: [
          '大基地项目成为新能源发展主战场',
          '海上风电进入平价发展期',
          '分布式光伏整县推进模式创新'
        ],
        relatedPolicies: ['新能源发展规划', '风电光伏开发建设方案'],
        affectedSegments: ['wind', 'solar']
      },
      {
        id: 'tac-002',
        title: '碳市场政策影响及应对策略',
        level: 'tactical',
        category: '政策解读',
        lastUpdated: '2024-03-15',
        status: 'published',
        summary: '分析碳市场扩容对火电业务的影响，制定碳资产管理办法',
        keyFindings: [
          '碳配额逐步收紧，成本压力增加',
          'CCER重启带来减排收益新渠道',
          '绿色电力证书交易机制完善'
        ],
        relatedPolicies: ['碳排放权交易管理办法', 'CCER管理办法'],
        affectedSegments: ['thermal', 'hydro', 'nuclear', 'wind', 'solar']
      },
      {
        id: 'tac-003',
        title: '电力市场改革影响分析报告',
        level: 'tactical',
        category: '市场分析',
        lastUpdated: '2024-02-28',
        status: 'published',
        summary: '评估电力市场改革对各业务板块的影响，提出交易策略建议',
        keyFindings: [
          '中长期市场与现货市场衔接',
          '辅助服务市场品种增加、收益提升',
          '容量成本回收机制呼之欲出'
        ],
        relatedPolicies: ['电力市场建设方案', '深化燃煤发电上网电价改革'],
        affectedSegments: ['thermal', 'hydro', 'nuclear', 'wind', 'solar', 'storage']
      }
    ]
  },
  {
    id: 'operational',
    name: '执行层报告',
    description: '面向基层单位、项目团队，提供具体工作指导',
    audience: '基层单位、项目团队',
    frequency: '周度/月度',
    color: '#22c55e',
    reports: [
      {
        id: 'ope-001',
        title: '项目开发政策合规性指引',
        level: 'operational',
        category: '操作指引',
        lastUpdated: '2024-03-20',
        status: 'published',
        summary: '明确各类项目开发需要关注的政策要点和合规要求',
        keyFindings: [
          '项目选址需符合国土空间规划',
          '环境影响评价要求日趋严格',
          '用地用海审批流程优化'
        ],
        relatedPolicies: ['建设项目环境影响评价', '用地政策'],
        affectedSegments: ['wind', 'solar', 'storage']
      },
      {
        id: 'ope-002',
        title: '补贴项目申报实务手册',
        level: 'operational',
        category: '操作指引',
        lastUpdated: '2024-03-18',
        status: 'published',
        summary: '详细说明各类补贴项目的申报流程和注意事项',
        keyFindings: [
          '可再生能源补贴审核趋严',
          '存量项目补贴确权加速',
          '新增项目需通过竞争方式获取'
        ],
        relatedPolicies: ['可再生能源发展基金', '补贴项目管理'],
        affectedSegments: ['wind', 'solar', 'hydro']
      },
      {
        id: 'ope-003',
        title: '电力交易实操指南',
        level: 'operational',
        category: '操作指引',
        lastUpdated: '2024-03-25',
        status: 'updating',
        summary: '指导基层单位开展电力市场化交易工作',
        keyFindings: [
          '月度交易、现货交易操作要点',
          '价格风险防控措施',
          '交易策略制定方法'
        ],
        relatedPolicies: ['电力中长期交易规则', '现货市场规则'],
        affectedSegments: ['thermal', 'hydro', 'nuclear', 'wind', 'solar']
      }
    ]
  }
];

// 政策业务影响矩阵
export const policyBusinessImpacts: PolicyImpact[] = [
  {
    policyId: 'p001',
    policyTitle: '《2030年前碳达峰行动方案》',
    releaseDate: '2021-10-24',
    authority: '国务院',
    segments: [
      { segmentId: 'thermal', impactScore: -85, impactType: 'negative', analysis: '碳排放约束强化，煤电减排压力巨大', adaptation: '加快灵活性改造，降低碳排放强度' },
      { segmentId: 'wind', impactScore: 75, impactType: 'positive', analysis: '明确可再生能源发展目标，风电迎来机遇', adaptation: '加大风电项目开发力度' },
      { segmentId: 'solar', impactScore: 80, impactType: 'positive', analysis: '光伏装机目标提升，市场空间广阔', adaptation: '加快分布式和集中式项目布局' },
      { segmentId: 'storage', impactScore: 70, impactType: 'positive', analysis: '新型储能成为刚需，政策支持明确', adaptation: '加快储能项目布局' }
    ]
  },
  {
    policyId: 'p002',
    policyTitle: '《关于促进新时代新能源高质量发展的实施方案》',
    releaseDate: '2022-06-01',
    authority: '国家发改委',
    segments: [
      { segmentId: 'wind', impactScore: 90, impactType: 'positive', analysis: '风电项目用地用海政策优化，开发成本降低', adaptation: '加快风光大基地项目申报' },
      { segmentId: 'solar', impactScore: 85, impactType: 'positive', analysis: '光伏用地政策明确，消纳保障机制完善', adaptation: '推进整县分布式光伏' },
      { segmentId: 'thermal', impactScore: -40, impactType: 'negative', analysis: '新能源消纳责任权重约束传统电源空间', adaptation: '提升灵活调节能力' }
    ]
  },
  {
    policyId: 'p003',
    policyTitle: '《关于进一步深化电力体制改革的若干意见》',
    releaseDate: '2015-03-15',
    authority: '中共中央',
    segments: [
      { segmentId: 'thermal', impactScore: 30, impactType: 'positive', analysis: '辅助服务市场收益增加，机组灵活性价值体现', adaptation: '深挖辅助服务市场机会' },
      { segmentId: 'hydro', impactScore: 50, impactType: 'positive', analysis: '抽水蓄能两部制电价落地，盈利模式明确', adaptation: '加快抽蓄项目投资决策' },
      { segmentId: 'nuclear', impactScore: 40, impactType: 'positive', analysis: '核电参与市场化交易空间扩大', adaptation: '优化核电营销策略' },
      { segmentId: 'storage', impactScore: 60, impactType: 'positive', analysis: '储能参与电力市场规则明确', adaptation: '探索储能多元化盈利模式' }
    ]
  },
  {
    policyId: 'p004',
    policyTitle: '《新型储能发展指导意见》',
    releaseDate: '2022-03-21',
    authority: '国家发改委',
    segments: [
      { segmentId: 'storage', impactScore: 95, impactType: 'positive', analysis: '明确储能发展目标，政策支持力度大', adaptation: '加速储能产业布局' },
      { segmentId: 'wind', impactScore: 50, impactType: 'positive', analysis: '强制配储要求带动风电+储能模式', adaptation: '探索风光储一体化项目' },
      { segmentId: 'solar', impactScore: 55, impactType: 'positive', analysis: '光伏配储成为标配，提升项目竞争力', adaptation: '打造光储综合解决方案' }
    ]
  },
  {
    policyId: 'p005',
    policyTitle: '《碳排放权交易管理办法（试行）》',
    releaseDate: '2020-12-31',
    authority: '生态环境部',
    segments: [
      { segmentId: 'thermal', impactScore: -75, impactType: 'negative', analysis: '碳成本成为煤电重要支出项', adaptation: '加强碳资产管理，降低履约成本' },
      { segmentId: 'hydro', impactScore: 20, impactType: 'positive', analysis: '清洁能源核证减排量（CCER）可交易', adaptation: '开发水电类CCER项目' },
      { segmentId: 'wind', impactScore: 25, impactType: 'positive', analysis: '新能源CCER收益增厚项目回报', adaptation: '积极申报CCER项目' },
      { segmentId: 'solar', impactScore: 25, impactType: 'positive', analysis: '光伏CCER贡献绿色电力价值', adaptation: '推进光伏CCER开发' }
    ]
  },
  {
    policyId: 'p006',
    policyTitle: '《"十四五"现代能源体系规划》',
    releaseDate: '2022-03-22',
    authority: '国家发改委',
    segments: [
      { segmentId: 'nuclear', impactScore: 80, impactType: 'positive', analysis: '明确核电发展目标，核准提速', adaptation: '积极参与核电项目竞标' },
      { segmentId: 'hydro', impactScore: 70, impactType: 'positive', analysis: '抽水蓄能发展目标明确', adaptation: '加快抽蓄项目核准' },
      { segmentId: 'thermal', impactScore: -60, impactType: 'negative', analysis: '煤电定位转变，发展空间受限', adaptation: '推进煤电清洁高效转型' },
      { segmentId: 'wind', impactScore: 85, impactType: 'positive', analysis: '风电发展目标明确，海陆并举', adaptation: '深耕海上风电，拓展陆上大基地' }
    ]
  }
];

// 业务指标数据
export const businessMetrics: BusinessMetrics[] = [
  { segmentId: 'thermal', year: 2020, capacity: 48000, generation: 220, utilization: 5200, cost: 0.38, revenue: 88, carbon: 180 },
  { segmentId: 'thermal', year: 2021, capacity: 47000, generation: 215, utilization: 5180, cost: 0.40, revenue: 92, carbon: 175 },
  { segmentId: 'thermal', year: 2022, capacity: 46000, generation: 200, utilization: 4900, cost: 0.42, revenue: 95, carbon: 165 },
  { segmentId: 'thermal', year: 2023, capacity: 45000, generation: 195, utilization: 4800, cost: 0.45, revenue: 98, carbon: 155 },
  { segmentId: 'hydro', year: 2020, capacity: 26000, generation: 100, utilization: 4200, cost: 0.15, revenue: 45, carbon: 0 },
  { segmentId: 'hydro', year: 2021, capacity: 26500, generation: 105, utilization: 4300, cost: 0.15, revenue: 48, carbon: 0 },
  { segmentId: 'hydro', year: 2022, capacity: 27200, generation: 108, utilization: 4400, cost: 0.16, revenue: 52, carbon: 0 },
  { segmentId: 'hydro', year: 2023, capacity: 28000, generation: 115, utilization: 4500, cost: 0.16, revenue: 55, carbon: 0 },
  { segmentId: 'wind', year: 2020, capacity: 22000, generation: 45, utilization: 2300, cost: 0.20, revenue: 25, carbon: 0 },
  { segmentId: 'wind', year: 2021, capacity: 26000, generation: 55, utilization: 2400, cost: 0.19, revenue: 32, carbon: 0 },
  { segmentId: 'wind', year: 2022, capacity: 30000, generation: 68, utilization: 2500, cost: 0.18, revenue: 40, carbon: 0 },
  { segmentId: 'wind', year: 2023, capacity: 35000, generation: 85, utilization: 2700, cost: 0.17, revenue: 52, carbon: 0 },
  { segmentId: 'solar', year: 2020, capacity: 18000, generation: 25, utilization: 1500, cost: 0.22, revenue: 15, carbon: 0 },
  { segmentId: 'solar', year: 2021, capacity: 24000, generation: 38, utilization: 1700, cost: 0.20, revenue: 22, carbon: 0 },
  { segmentId: 'solar', year: 2022, capacity: 32000, generation: 52, utilization: 1800, cost: 0.18, revenue: 32, carbon: 0 },
  { segmentId: 'solar', year: 2023, capacity: 42000, generation: 75, utilization: 1900, cost: 0.16, revenue: 48, carbon: 0 },
  { segmentId: 'nuclear', year: 2020, capacity: 10000, generation: 80, utilization: 7500, cost: 0.18, revenue: 55, carbon: 0 },
  { segmentId: 'nuclear', year: 2021, capacity: 10800, generation: 85, utilization: 7600, cost: 0.18, revenue: 60, carbon: 0 },
  { segmentId: 'nuclear', year: 2022, capacity: 11400, generation: 90, utilization: 7700, cost: 0.19, revenue: 65, carbon: 0 },
  { segmentId: 'nuclear', year: 2023, capacity: 12000, generation: 95, utilization: 7800, cost: 0.19, revenue: 70, carbon: 0 },
  { segmentId: 'storage', year: 2020, capacity: 500, generation: 0.1, utilization: 200, cost: 0.35, revenue: 0.5, carbon: 0 },
  { segmentId: 'storage', year: 2021, capacity: 1200, generation: 0.3, utilization: 250, cost: 0.32, revenue: 1.2, carbon: 0 },
  { segmentId: 'storage', year: 2022, capacity: 2800, generation: 0.8, utilization: 300, cost: 0.28, revenue: 3.5, carbon: 0 },
  { segmentId: 'storage', year: 2023, capacity: 5000, generation: 1.5, utilization: 350, cost: 0.25, revenue: 8, carbon: 0 }
];