const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'China Southern Power Grid';
pptx.company = 'China Southern Power Grid';
pptx.subject = 'Research Background and Methodology';
pptx.title = 'Research on Smart Grid Measurement System';

const slide = pptx.addSlide();

// 学术科技风格配色方案
const COLORS = {
  primary: '#0A1628',        // 深海蓝
  secondary: '#1E3A5F',      // 科技蓝
  accent: '#00D4FF',         // 电光蓝
  highlight: '#FF6B35',      // 活力橙
  light: '#F0F7FF',          // 浅蓝背景
  white: '#FFFFFF',
  gray: '#6B7280',
  lightGray: '#E5E7EB',
  cardBg: '#1A2A42',
  cardBorder: '#2A4A6E'
};

// 顶部装饰线条
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 1.2, w: 10, h: 0.02,
  fill: { color: COLORS.accent }
});

// 主标题区域
slide.addText('Research Background & Methodology', {
  x: 0.5, y: 0.25, w: 7, h: 0.4,
  fontSize: 20,
  bold: true,
  color: COLORS.accent,
  fontFace: 'Arial'
});

slide.addText('（一）研究背景及思路', {
  x: 0.5, y: 0.6, w: 7, h: 0.5,
  fontSize: 28,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// Logo区域 - 现代化设计
slide.addShape(pptx.ShapeType.rect, {
  x: 8.2, y: 0.2, w: 1.5, h: 0.7,
  fill: { color: COLORS.accent }
});

slide.addText('CSG', {
  x: 8.35, y: 0.35, w: 1.2, h: 0.25,
  fontSize: 20,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Arial',
  align: 'center'
});

slide.addText('中国南方电网', {
  x: 8.3, y: 0.6, w: 1.3, h: 0.2,
  fontSize: 8,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei',
  align: 'center'
});

// 形势环境标题
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 1.4, w: 0.12, h: 0.3,
  fill: { color: COLORS.accent }
});

slide.addText('Industry Policy Drivers', {
  x: 0.75, y: 1.4, w: 3, h: 0.35,
  fontSize: 14,
  bold: true,
  color: COLORS.accent,
  fontFace: 'Arial'
});

slide.addText('■ 面临的形势环境——内部产业政策驱动', {
  x: 0.75, y: 1.72, w: 8, h: 0.35,
  fontSize: 18,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// 政策描述卡片
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 2.15, w: 9, h: 0.95,
  fill: { color: COLORS.light },
  line: { color: COLORS.accent, width: 1 }
});

const policyText = '国家及行业陆续出台多项政策，推动新型电力系统及全国统一电力市场建设，驱动电力量测系统朝"高频采集、超大存储、超强处理"技术方向发展，实现质变跃升。';
slide.addText(policyText, {
  x: 0.7, y: 2.25, w: 8.6, h: 0.75,
  fontSize: 14,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// 系统升级区域标题
slide.addText('System Evolution', {
  x: 0.5, y: 3.3, w: 2, h: 0.3,
  fontSize: 14,
  bold: true,
  color: COLORS.accent,
  fontFace: 'Arial'
});

slide.addText('系统全面升级', {
  x: 0.5, y: 3.6, w: 2, h: 0.3,
  fontSize: 16,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// 左侧：传统系统 - 科技感卡片
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 4.1, w: 2.8, h: 2.2,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.cardBorder, width: 1 }
});

slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 4.1, w: 0.08, h: 2.2,
  fill: { color: COLORS.gray }
});

slide.addText('Traditional System', {
  x: 0.7, y: 4.25, w: 2.4, h: 0.25,
  fontSize: 12,
  bold: true,
  color: COLORS.gray,
  fontFace: 'Arial'
});

slide.addText('传统系统', {
  x: 0.7, y: 4.5, w: 2.4, h: 0.3,
  fontSize: 16,
  bold: true,
  color: COLORS.white,
  fontFace: 'Microsoft YaHei'
});

// 传统系统表格
const traditionalTable = [
  [
    { text: '数据采集频率', options: { bold: true, color: COLORS.white, fontSize: 12 } },
    { text: '日频次', options: { bold: true, color: COLORS.lightGray, fontSize: 12 } }
  ],
  [
    { text: '数据存储容量', options: { bold: true, color: COLORS.white, fontSize: 12 } },
    { text: 'TB级', options: { bold: true, color: COLORS.lightGray, fontSize: 12 } }
  ],
  [
    { text: '数据处理能力', options: { bold: true, color: COLORS.white, fontSize: 12 } },
    { text: '小时级', options: { bold: true, color: COLORS.lightGray, fontSize: 12 } }
  ]
];

slide.addTable(traditionalTable, {
  x: 0.7, y: 4.9, w: 2.4, h: 1.1,
  colW: [1.2, 1.2],
  rowH: [0.37, 0.37, 0.37],
  fontFace: 'Microsoft YaHei',
  fontSize: 12,
  fill: { color: COLORS.primary },
  fill1: { color: COLORS.cardBg },
  color: COLORS.white,
  border: { color: COLORS.cardBorder, type: 'solid', pt: 0.5 }
});

// 中间过渡箭头 - 科技感
slide.addShape(pptx.ShapeType.rightArrow, {
  x: 3.45, y: 4.8, w: 0.6, h: 0.8,
  fill: { color: COLORS.accent }
});

slide.addShape(pptx.ShapeType.rect, {
  x: 3.45, y: 5.1, w: 0.6, h: 0.15,
  fill: { color: COLORS.accent }
});

slide.addText('EVOLVE', {
  x: 3.52, y: 4.85, w: 0.45, h: 0.25,
  fontSize: 9,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Arial',
  align: 'center'
});

// 右侧：新型系统 - 科技感卡片
slide.addShape(pptx.ShapeType.rect, {
  x: 4.2, y: 4.1, w: 2.8, h: 2.2,
  fill: { color: COLORS.light },
  line: { color: COLORS.accent, width: 2 }
});

slide.addShape(pptx.ShapeType.rect, {
  x: 4.2, y: 4.1, w: 0.08, h: 2.2,
  fill: { color: COLORS.accent }
});

slide.addText('Smart System', {
  x: 4.4, y: 4.25, w: 2.4, h: 0.25,
  fontSize: 12,
  bold: true,
  color: COLORS.accent,
  fontFace: 'Arial'
});

slide.addText('新型系统', {
  x: 4.4, y: 4.5, w: 2.4, h: 0.3,
  fontSize: 16,
  bold: true,
  color: COLORS.accent,
  fontFace: 'Microsoft YaHei'
});

// 新型系统表格
const newSystemTable = [
  [
    { text: '数据采集频率', options: { bold: true, color: COLORS.primary, fontSize: 12 } },
    { text: '分钟级', options: { bold: true, color: COLORS.accent, fontSize: 12 } }
  ],
  [
    { text: '数据存储容量', options: { bold: true, color: COLORS.primary, fontSize: 12 } },
    { text: 'PB级', options: { bold: true, color: COLORS.accent, fontSize: 12 } }
  ],
  [
    { text: '数据处理能力', options: { bold: true, color: COLORS.primary, fontSize: 12 } },
    { text: '秒级实时', options: { bold: true, color: COLORS.accent, fontSize: 12 } }
  ]
];

slide.addTable(newSystemTable, {
  x: 4.4, y: 4.9, w: 2.4, h: 1.1,
  colW: [1.2, 1.2],
  rowH: [0.37, 0.37, 0.37],
  fontFace: 'Microsoft YaHei',
  fontSize: 12,
  fill: { color: COLORS.accent },
  fill1: { color: COLORS.white },
  color: COLORS.primary,
  border: { color: COLORS.accent, type: 'solid', pt: 0.5 }
});

// 政策驱动区域
slide.addText('Policy Drivers', {
  x: 7.2, y: 3.3, w: 2, h: 0.3,
  fontSize: 14,
  bold: true,
  color: COLORS.accent,
  fontFace: 'Arial'
});

slide.addText('多维政策驱动', {
  x: 7.2, y: 3.6, w: 2, h: 0.3,
  fontSize: 16,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// 政策卡片区域
const policyCards = [
  { x: 7.2, title: '新能源接入', desc: '大规模新能源接入\n用户侧实时互动' },
  { x: 8.35, title: '分布式光伏', desc: '分布式光伏四可' },
  { x: 9.5, title: '电能质量', desc: '用户电能质量\n分钟级监测' }
];

policyCards.forEach((card) => {
  slide.addShape(pptx.ShapeType.rect, {
    x: card.x, y: 4.1, w: 1.1, h: 1.8,
    fill: { color: COLORS.white },
    line: { color: COLORS.accent, width: 1 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: card.x, y: 4.1, w: 1.1, h: 0.35,
    fill: { color: COLORS.accent }
  });
  
  slide.addText(card.title, {
    x: card.x + 0.05, y: 4.2, w: 1.0, h: 0.25,
    fontSize: 10,
    bold: true,
    color: COLORS.white,
    fontFace: 'Microsoft YaHei',
    align: 'center'
  });
  
  slide.addText(card.desc, {
    x: card.x + 0.05, y: 4.55, w: 1.0, h: 1.1,
    fontSize: 9,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei',
    align: 'center'
  });
});

// 底部指标展示
const metrics = [
  { label: '采集频率提升', value: '1440x' },
  { label: '存储容量扩展', value: '1000x' },
  { label: '处理速度提升', value: '3600x' }
];

metrics.forEach((metric, idx) => {
  const xPos = 0.5 + idx * 3;
  slide.addShape(pptx.ShapeType.rect, {
    x: xPos, y: 6.5, w: 2.8, h: 0.7,
    fill: { color: COLORS.light },
    line: { color: COLORS.accent, width: 1 }
  });
  
  slide.addText(metric.label, {
    x: xPos + 0.2, y: 6.6, w: 1.5, h: 0.25,
    fontSize: 12,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
  });
  
  slide.addText(metric.value, {
    x: xPos + 2.0, y: 6.6, w: 0.6, h: 0.25,
    fontSize: 14,
    bold: true,
    color: COLORS.accent,
    fontFace: 'Arial',
    align: 'right'
  });
});

// 底部版权信息
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 7.25, w: 10, h: 0.25,
  fill: { color: COLORS.primary }
});

slide.addText('China Southern Power Grid | © 2024 All Rights Reserved', {
  x: 0.5, y: 7.32, w: 6, h: 0.18,
  fontSize: 9,
  color: COLORS.gray,
  fontFace: 'Arial'
});

// 技术标签
slide.addText('Smart Grid | Big Data | AI', {
  x: 7.5, y: 7.32, w: 2, h: 0.18,
  fontSize: 9,
  color: COLORS.accent,
  fontFace: 'Arial',
  align: 'right'
});

// 保存文件
pptx.writeFile({ fileName: 'research_slide_optimized.pptx' })
  .then(() => {
    console.log('PPT generated successfully!');
  })
  .catch(err => {
    console.error('Error generating PPT:', err);
  });
