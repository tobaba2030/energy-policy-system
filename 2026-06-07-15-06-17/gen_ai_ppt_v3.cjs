const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

// ============================================================
// 风格定义 - 深蓝科技风
// ============================================================
const THEME = {
  bgDark: '0B1120',
  bgCard: '0F1B2E',
  bgCardLight: '162447',
  gold: 'D4A843',
  goldLight: 'E8C96E',
  blue: '3B82F6',
  blueLight: '60A5FA',
  teal: '2DD4BF',
  textPrimary: 'F8FAFC',
  textSecondary: '94A3B8',
  textGold: 'D4A843',
  borderGold: 'D4A843',
  borderBlue: '3B82F6',
  green: '22C55E',
  red: 'EF4444',
  orange: 'F97316',
};

function addDarkBg(slide) {
  slide.background = { color: THEME.bgDark };
}

function addGoldBorder(slide, x, y, w, h, lineW = 1.5) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: THEME.bgCard },
    line: { color: THEME.gold, width: lineW },
    rectRadius: 0.08
  });
}

function addBlueBorder(slide, x, y, w, h, lineW = 1) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w, h,
    fill: { color: THEME.bgCard },
    line: { color: THEME.blue, width: lineW },
    rectRadius: 0.06
  });
}

function addSectionHeader(slide, title, subtitle, y = 0.3) {
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: y - 0.05, w: 9, h: 0,
    line: { color: THEME.gold, width: 2, dashType: 'solid' }
  });
  slide.addText(title, {
    x: 0.5, y, w: 9, h: 0.5,
    fontSize: 28, fontFace: 'Microsoft YaHei', bold: true,
    color: THEME.textPrimary, align: 'center'
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: y + 0.45, w: 9, h: 0.3,
      fontSize: 14, fontFace: 'Microsoft YaHei',
      color: THEME.textSecondary, align: 'center'
    });
  }
}

function addCornerDecorations(slide) {
  const corners = [[0.2, 0.2], [9.65, 0.2], [0.2, 5.15], [9.65, 5.15]];
  corners.forEach(([x, y]) => {
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.15, h: 0.15,
      fill: { color: THEME.gold }, line: { color: THEME.gold, width: 1 }
    });
  });
}

// ============================================================
// 幻灯片 1: 封面
// ============================================================
const slide1 = pptx.addSlide();
addDarkBg(slide1);
slide1.addShape(pptx.ShapeType.line, { x: 0.5, y: 0.8, w: 9, h: 0, line: { color: THEME.gold, width: 3 } });
slide1.addText('科技项目全流程', { x: 0.5, y: 1.8, w: 9, h: 0.8, fontSize: 48, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary, align: 'center' });
slide1.addText('AI应用实践与心得', { x: 0.5, y: 2.6, w: 9, h: 0.7, fontSize: 40, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold, align: 'center' });
slide1.addText('电网科创业务中心 · 从申报到交付的智能化升级', { x: 0.5, y: 3.5, w: 9, h: 0.4, fontSize: 16, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
slide1.addShape(pptx.ShapeType.line, { x: 0.5, y: 4.2, w: 9, h: 0, line: { color: THEME.gold, width: 3 } });
slide1.addText('WorkBuddy × IMA 知识库 联动方案', { x: 0.5, y: 4.8, w: 9, h: 0.3, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
addCornerDecorations(slide1);

// ============================================================
// 幻灯片 2: 目录
// ============================================================
const slide2 = pptx.addSlide();
addDarkBg(slide2);
addSectionHeader(slide2, '汇报目录', 'CONTENTS', 0.3);

const contents = [
  { num: '01', title: 'AI知识生产基础库', desc: '双路径学术知识采集架构' },
  { num: '02', title: '全流程概览', desc: '5大环节AI应用全景图' },
  { num: '03', title: '申报简表', desc: 'AI辅助框架搭建与会议流程' },
  { num: '04', title: '指南编写', desc: '政策对齐与内容智能生成' },
  { num: '05', title: '可研报告', desc: '全量自动化生成与图表嵌入' },
  { num: '06', title: '技术研究报告', desc: '深度生成与知识库沉淀' },
  { num: '07', title: 'Demo原型设计', desc: '代码生成与可视化组件' },
  { num: '08', title: '核心成果与心得', desc: '效率提升数据与实践总结' },
];

contents.forEach((item, i) => {
  const row = Math.floor(i / 4);
  const col = i % 4;
  const x = 0.4 + col * 2.4;
  const y = 1.0 + row * 2.0;
  addBlueBorder(slide2, x, y, 2.2, 1.7);
  slide2.addText(item.num, { x: x + 0.1, y: y + 0.1, w: 0.5, h: 0.35, fontSize: 18, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold });
  slide2.addText(item.title, { x: x + 0.1, y: y + 0.45, w: 2.0, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary });
  slide2.addText(item.desc, { x: x + 0.1, y: y + 0.85, w: 2.0, h: 0.3, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

// ============================================================
// 幻灯片 3: AI知识生产基础库（核心基础）
// ============================================================
const slide3 = pptx.addSlide();
addDarkBg(slide3);
addSectionHeader(slide3, '01 AI知识生产基础库', '所有工作的核心基础 · 双路径学术知识采集', 0.25);

// 顶部说明
slide3.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.9, w: 9, h: 0.4,
  fill: { color: THEME.bgCardLight },
  line: { color: THEME.gold, width: 1 }
});
slide3.addText('中国科技云学术智能体平台爬取方案验证通过，可稳定获取论文摘要、关键词、URL等结构化元数据；同步完成Bing学术爬取可行性确认，构建多源学术知识采集双路径。', {
  x: 0.7, y: 0.95, w: 8.6, h: 0.3,
  fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.gold, align: 'center'
});

// 左侧：中国科技云
addGoldBorder(slide3, 0.5, 1.45, 4.3, 2.8);
slide3.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 1.45, w: 4.3, h: 0.4,
  fill: { color: THEME.gold },
  line: { color: THEME.gold, width: 1 }
});
slide3.addText('路径一：中国科技云学术智能体平台', {
  x: 0.5, y: 1.5, w: 4.3, h: 0.3,
  fontSize: 13, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.bgDark, align: 'center'
});

const path1Items = [
  '爬取方案验证通过',
  '稳定获取论文摘要、关键词、URL',
  '结构化元数据自动提取',
  '高质量科研知识注入新通道',
  '核心能力：论文摘要提取 | 关键词识别 | 元数据结构化'
];
path1Items.forEach((item, i) => {
  slide3.addText('□ ' + item, {
    x: 0.7, y: 1.95 + i * 0.38, w: 3.9, h: 0.3,
    fontSize: 11, fontFace: 'Microsoft YaHei',
    color: THEME.textSecondary
  });
});

slide3.addShape(pptx.ShapeType.rect, {
  x: 0.7, y: 3.85, w: 3.9, h: 0.28,
  fill: { color: '22C55E' },
  line: { color: '22C55E', width: 0.5 }, rectRadius: 0.04
});
slide3.addText('状态：已验证通过，稳定运行中', {
  x: 0.7, y: 3.88, w: 3.9, h: 0.22,
  fontSize: 10, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.bgDark, align: 'center'
});

// 右侧：Bing学术
addBlueBorder(slide3, 5.2, 1.45, 4.3, 2.8);
slide3.addShape(pptx.ShapeType.rect, {
  x: 5.2, y: 1.45, w: 4.3, h: 0.4,
  fill: { color: THEME.blue },
  line: { color: THEME.blue, width: 1 }
});
slide3.addText('路径二：Bing学术搜索', {
  x: 5.2, y: 1.5, w: 4.3, h: 0.3,
  fontSize: 13, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.textPrimary, align: 'center'
});

const path2Items = [
  '爬取可行性已确认',
  '构建多源学术知识采集补充路径',
  '互补性知识覆盖（英文/国际文献）',
  '跨语言知识融合能力',
  '核心能力：国际文献检索 | 英文元数据 | 跨语言融合'
];
path2Items.forEach((item, i) => {
  slide3.addText('□ ' + item, {
    x: 5.4, y: 1.95 + i * 0.38, w: 3.9, h: 0.3,
    fontSize: 11, fontFace: 'Microsoft YaHei',
    color: THEME.textSecondary
  });
});

slide3.addShape(pptx.ShapeType.rect, {
  x: 5.4, y: 3.85, w: 3.9, h: 0.28,
  fill: { color: THEME.blue },
  line: { color: THEME.blue, width: 0.5 }, rectRadius: 0.04
});
slide3.addText('状态：可行性确认，待接入WorkBuddy', {
  x: 5.4, y: 3.88, w: 3.9, h: 0.22,
  fontSize: 10, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.textPrimary, align: 'center'
});

// 底部汇聚
slide3.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 4.45, w: 9, h: 0.5,
  fill: { color: THEME.bgCardLight },
  line: { color: THEME.gold, width: 1.5 }
});
slide3.addText('双路径汇聚 → 统一清洗 → 结构化存储 → IMA知识库', {
  x: 0.7, y: 4.52, w: 8.6, h: 0.35,
  fontSize: 13, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.gold, align: 'center'
});

// ============================================================
// 幻灯片 4: 学术文献智能流转闭环（配图页）
// ============================================================
const slide4 = pptx.addSlide();
addDarkBg(slide4);
addSectionHeader(slide4, '学术文献智能流转闭环', '从人工爬取到智能报告，全流程自动化升级', 0.25);

// 三列对比
const cols = [
  { title: '传统手工模式', color: THEME.blue, items: ['人工检索下载', '手动整理分类', '人工阅读提炼', '手动编写报告'], time: '耗时 4-8 小时/10篇', timeColor: THEME.red },
  { title: 'WorkBuddy 自动化', color: THEME.gold, items: ['粘贴/上传文献', 'AI自动清洗提取', '智能分类标签', '自动传入IMA'], time: '仅需 5 分钟/10篇', timeColor: THEME.green },
  { title: 'IMA 知识库', color: THEME.blue, items: ['文件上传通道', 'URL导入通道', '笔记创建通道', '结构化文献库'], time: '全自动入库，零人工', timeColor: THEME.blue },
];

cols.forEach((col, i) => {
  const x = 0.5 + i * 3.2;
  const y = 1.0;
  const borderColor = i === 1 ? THEME.gold : THEME.blue;
  const borderW = i === 1 ? 2 : 1;
  
  addGoldBorder(slide3, x, y, 2.9, 2.6, borderW);
  
  slide4.addText(col.title, {
    x: x, y: y + 0.1, w: 2.9, h: 0.3,
    fontSize: 12, fontFace: 'Microsoft YaHei', bold: true,
    color: col.color, align: 'center'
  });
  
  col.items.forEach((item, j) => {
    slide4.addText('□ ' + item, {
      x: x + 0.15, y: y + 0.5 + j * 0.4, w: 2.6, h: 0.3,
      fontSize: 10, fontFace: 'Microsoft YaHei',
      color: THEME.textSecondary
    });
  });
  
  slide4.addText(col.time, {
    x: x + 0.15, y: y + 2.15, w: 2.6, h: 0.25,
    fontSize: 9, fontFace: 'Microsoft YaHei', bold: true,
    color: col.timeColor, align: 'center'
  });
});

// 闭环回流
slide4.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 3.8, w: 9, h: 0.35,
  fill: { color: THEME.bgCardLight },
  line: { color: THEME.gold, width: 1 }
});
slide4.addText('闭环回流：WorkBuddy 反向调用 IMA 知识库', {
  x: 0.7, y: 3.85, w: 8.6, h: 0.25,
  fontSize: 12, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.gold, align: 'center'
});

const loopSteps = ['1 发起分析请求', '2 检索IMA知识库', '3 AI分析整合', '4 输出报告'];
loopSteps.forEach((step, i) => {
  const x = 0.8 + i * 2.3;
  slide4.addShape(pptx.ShapeType.ellipse, {
    x: x, y: 4.25, w: 0.3, h: 0.3,
    fill: { color: THEME.gold },
    line: { color: THEME.gold, width: 1 }
  });
  slide4.addText(step, {
    x: x + 0.35, y: 4.28, w: 1.8, h: 0.25,
    fontSize: 10, fontFace: 'Microsoft YaHei',
    color: THEME.textSecondary
  });
  if (i < 3) {
    slide4.addText('→', {
      x: x + 2.0, y: 4.28, w: 0.3, h: 0.25,
      fontSize: 12, color: THEME.gold, align: 'center'
    });
  }
});

// ============================================================
// 幻灯片 5: 全流程概览（5环节）
// ============================================================
const slide5 = pptx.addSlide();
addDarkBg(slide5);
addSectionHeader(slide5, '科技项目全流程 AI应用概览', '5大环节 × 智能化升级路径', 0.25);

const flowSteps = [
  { name: '申报简表', icon: '📋', color: THEME.blue },
  { name: '指南编写', icon: '📖', color: THEME.teal },
  { name: '可研报告', icon: '📊', color: THEME.gold },
  { name: '技术报告', icon: '🔬', color: THEME.blue },
  { name: 'Demo原型', icon: '💻', color: THEME.teal },
];

slide5.addShape(pptx.ShapeType.line, {
  x: 1.0, y: 2.0, w: 8, h: 0,
  line: { color: THEME.gold, width: 2, dashType: 'dash' }
});

flowSteps.forEach((step, i) => {
  const x = 0.8 + i * 1.8;
  const y = 1.5;
  slide5.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.4, y: y + 0.35, w: 0.7, h: 0.7,
    fill: { color: step.color },
    line: { color: THEME.gold, width: 2 }
  });
  slide5.addText(step.name, {
    x: x, y: y + 1.15, w: 1.5, h: 0.3,
    fontSize: 11, fontFace: 'Microsoft YaHei', bold: true,
    color: THEME.textPrimary, align: 'center'
  });
  if (i < flowSteps.length - 1) {
    slide5.addText('→', {
      x: x + 1.25, y: y + 0.5, w: 0.3, h: 0.3,
      fontSize: 14, color: THEME.gold, align: 'center'
    });
  }
});

// 底部三列说明
const descCards = [
  { title: '传统模式', items: ['人工检索下载', '手动整理分类', '人工阅读提炼', '手动编写报告'], color: THEME.red },
  { title: 'WorkBuddy 自动化', items: ['AI自动清洗提取', '智能分类标签', '多文档交叉分析', '自动格式化输出'], color: THEME.green },
  { title: 'IMA 知识库', items: ['文件上传通道', 'URL导入通道', '笔记创建通道', '结构化文献库'], color: THEME.blue },
];

descCards.forEach((card, i) => {
  const x = 0.5 + i * 3.2;
  const y = 3.2;
  addGoldBorder(slide5, x, y, 2.9, 2.0, 1);
  slide5.addShape(pptx.ShapeType.rect, {
    x: x, y, w: 2.9, h: 0.4,
    fill: { color: card.color },
    line: { color: card.color, width: 1 }
  });
  slide5.addText(card.title, {
    x: x, y: y + 0.08, w: 2.9, h: 0.25,
    fontSize: 12, fontFace: 'Microsoft YaHei', bold: true,
    color: THEME.textPrimary, align: 'center'
  });
  card.items.forEach((item, j) => {
    slide5.addText('□ ' + item, {
      x: x + 0.15, y: y + 0.5 + j * 0.35, w: 2.6, h: 0.3,
      fontSize: 10, fontFace: 'Microsoft YaHei',
      color: THEME.textSecondary
    });
  });
});

// ============================================================
// 幻灯片 6: 申报简表（深度补充+会议流程图）
// ============================================================
const slide6 = pptx.addSlide();
addDarkBg(slide6);
addSectionHeader(slide6, '02 申报简表 — AI辅助框架搭建', '从2-3天缩短至0.5天，一次通过率80%', 0.25);

// 左侧：AI应用描述
addGoldBorder(slide6, 0.5, 1.0, 4.5, 2.2);
slide6.addText('AI应用描述', {
  x: 0.7, y: 1.1, w: 4.1, h: 0.35,
  fontSize: 14, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.gold
});

const desc6 = [
  '• 输入技术方案核心要点，AI自动生成简表框架',
  '• 多版本快速迭代：调整参数→即时生成新版本',
  '• 关键词与指标智能匹配，提升评审通过率',
  '• 历史简表模板库复用，减少重复劳动',
  '• AI辅助会议：需求收集→政策研读→对标分析'
];
desc6.forEach((line, i) => {
  slide6.addText(line, {
    x: 0.7, y: 1.5 + i * 0.32, w: 4.1, h: 0.28,
    fontSize: 11, fontFace: 'Microsoft YaHei',
    color: THEME.textSecondary
  });
});

// 右侧：会议流程
addBlueBorder(slide6, 5.2, 1.0, 4.3, 2.2);
slide6.addText('AI辅助会议流程', {
  x: 5.4, y: 1.1, w: 3.9, h: 0.35,
  fontSize: 14, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.blueLight
});

const meetingFlow = [
  'Phase 1: 需求调研会议',
  '  → 技术方向/目标/资源确认',
  '  → AI解析评分标准与申报要求',
  '  → IMA知识库检索相似案例',
  'Phase 2: AI智能生成',
  '  → 输入需求→AI生成简表框架',
  '  → 多版本快速迭代（10分钟3版）',
  'Phase 3: 专家评审',
  '  → 技术可行性/创新性评估',
  '  → AI辅助修改→终稿确认提交'
];
meetingFlow.forEach((line, i) => {
  slide6.addText(line, {
    x: 5.4, y: 1.5 + i * 0.25, w: 3.9, h: 0.22,
    fontSize: 9, fontFace: 'Microsoft YaHei',
    color: line.startsWith('Phase') ? THEME.gold : THEME.textSecondary
  });
});

// 底部：成果与工具
addGoldBorder(slide6, 0.5, 3.4, 4.5, 1.7);
slide6.addText('核心成果', {
  x: 0.7, y: 3.5, w: 4.1, h: 0.3,
  fontSize: 14, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.green
});
slide6.addText('起草时间：2-3天 → 0.5天（↓83%）', { x: 0.7, y: 3.9, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide6.addText('一次通过率：80%（历史均值50%）', { x: 0.7, y: 4.2, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide6.addText('多版本迭代：10分钟内完成3版', { x: 0.7, y: 4.5, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

addBlueBorder(slide6, 5.2, 3.4, 4.3, 1.7);
slide6.addText('AI工具组合', {
  x: 5.4, y: 3.5, w: 3.9, h: 0.3,
  fontSize: 14, fontFace: 'Microsoft YaHei', bold: true,
  color: THEME.blueLight
});
slide6.addText('WorkBuddy（对话生成框架）', { x: 5.4, y: 3.9, w: 3.9, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide6.addText('IMA知识库（历史模板复用）', { x: 5.4, y: 4.2, w: 3.9, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide6.addText('WebSearch（政策实时对齐）', { x: 5.4, y: 4.5, w: 3.9, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

// 底部心得
slide6.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 5.25, w: 9, h: 0.35,
  fill: { color: THEME.bgCardLight },
  line: { color: THEME.gold, width: 1 }
});
slide6.addText('💡 心得：AI擅长快速提炼和结构化，核心创新点需人工把关；模板库越完善AI效果越好', {
  x: 0.7, y: 5.3, w: 8.6, h: 0.25,
  fontSize: 10, fontFace: 'Microsoft YaHei',
  color: THEME.gold, align: 'center'
});

// ============================================================
// 幻灯片 7: 指南编写
// ============================================================
const slide7 = pptx.addSlide();
addDarkBg(slide7);
addSectionHeader(slide7, '03 指南编写 — 政策对齐与内容智能生成', '编写效率提升5倍，政策对齐度显著提高', 0.25);

addGoldBorder(slide7, 0.5, 1.0, 4.5, 2.2);
slide7.addText('AI应用描述', { x: 0.7, y: 1.1, w: 4.1, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold });

const desc7 = [
  '• 政策文档解析→自动提取关键要求与评分标准',
  '• 技术方向梳理→AI生成指南框架草案',
  '• 多轮审校对齐→确保与最新政策文件一致',
  '• 历史指南库比对→避免重复或冲突内容',
  '• AI知识库支撑：实时检索最新政策动态'
];
desc7.forEach((line, i) => {
  slide7.addText(line, { x: 0.7, y: 1.5 + i * 0.32, w: 4.1, h: 0.28, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addBlueBorder(slide7, 5.2, 1.0, 4.3, 2.2);
slide7.addText('实践案例', { x: 5.4, y: 1.1, w: 3.9, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });

const cases7 = [
  '1. 智能电网技术指南：',
  '   解析南网/国网最新政策→生成技术方向',
  '2. 计量设备AI应用指南：',
  '   梳理故障诊断技术路线→对齐行业标准',
  '3. 新型电力系统指南：',
  '   多源政策交叉分析→提炼核心考核指标'
];
cases7.forEach((line, i) => {
  slide7.addText(line, { x: 5.4, y: 1.5 + i * 0.32, w: 3.9, h: 0.28, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addGoldBorder(slide7, 0.5, 3.4, 4.5, 1.7);
slide7.addText('核心成果', { x: 0.7, y: 3.5, w: 4.1, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.green });
slide7.addText('编写效率：提升5倍', { x: 0.7, y: 3.9, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide7.addText('政策对齐度：从60%→95%', { x: 0.7, y: 4.2, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide7.addText('多版本对比：3版/小时', { x: 0.7, y: 4.5, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

addBlueBorder(slide7, 5.2, 3.4, 4.3, 1.7);
slide7.addText('AI工具组合', { x: 5.4, y: 3.5, w: 3.9, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });
slide7.addText('WorkBuddy（政策解析+框架生成）', { x: 5.4, y: 3.9, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide7.addText('IMA知识库（历史指南沉淀）', { x: 5.4, y: 4.2, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide7.addText('WebSearch（实时政策检索）', { x: 5.4, y: 4.5, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

slide7.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.25, w: 9, h: 0.35, fill: { color: THEME.bgCardLight }, line: { color: THEME.gold, width: 1 } });
slide7.addText('💡 心得：政策合规性必须人工审核，涉密条款尤甚；AI生成的框架需经专家确认', { x: 0.7, y: 5.3, w: 8.6, h: 0.25, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.gold, align: 'center' });

// ============================================================
// 幻灯片 8: 可研报告
// ============================================================
const slide8 = pptx.addSlide();
addDarkBg(slide8);
addSectionHeader(slide8, '04 可研报告 — 全量自动化生成', '脚本化 > 对话式，一次编写多次复用', 0.25);

addGoldBorder(slide8, 0.5, 1.0, 4.5, 2.2);
slide8.addText('AI应用描述', { x: 0.7, y: 1.1, w: 4.1, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold });

const desc8 = [
  '• docx-js脚本自动生成完整可研报告',
  '• 22张matplotlib图表自动嵌入（68维特征/PCA/规则库）',
  '• 6章结构+20篇文献+3个附录深度编排',
  '• 数据驱动：从原始数据→分析图表→报告文字全链路',
  '• AI知识库支撑：文献综述自动引用已入库资料'
];
desc8.forEach((line, i) => {
  slide8.addText(line, { x: 0.7, y: 1.5 + i * 0.32, w: 4.1, h: 0.28, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addBlueBorder(slide8, 5.2, 1.0, 4.3, 2.2);
slide8.addText('实践案例', { x: 5.4, y: 1.1, w: 3.9, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });

const cases8 = [
  '1. 终端/表计故障规则库可研：',
  '   140条规则+CHI模型→完整技术论证',
  '2. 智能电网AI应用可研：',
  '   多维度数据分析→技术路线论证',
  '3. 团队IDP赋能可研：',
  '   12人团队数据→资源配置方案'
];
cases8.forEach((line, i) => {
  slide8.addText(line, { x: 5.4, y: 1.5 + i * 0.32, w: 3.9, h: 0.28, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addGoldBorder(slide8, 0.5, 3.4, 4.5, 1.7);
slide8.addText('核心成果', { x: 0.7, y: 3.5, w: 4.1, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.green });
slide8.addText('报告规模：1.35MB docx（6章+20文献+3附录）', { x: 0.7, y: 3.9, w: 4.1, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide8.addText('图表数量：22张自动嵌入', { x: 0.7, y: 4.2, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide8.addText('生成时间：从2周→2天', { x: 0.7, y: 4.5, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

addBlueBorder(slide8, 5.2, 3.4, 4.3, 1.7);
slide8.addText('AI工具组合', { x: 5.4, y: 3.5, w: 3.9, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });
slide8.addText('docx-js（报告自动生成脚本）', { x: 5.4, y: 3.9, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide8.addText('matplotlib（数据分析图表）', { x: 5.4, y: 4.2, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide8.addText('WorkBuddy（内容审核与优化）', { x: 5.4, y: 4.5, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

slide8.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.25, w: 9, h: 0.35, fill: { color: THEME.bgCardLight }, line: { color: THEME.gold, width: 1 } });
slide8.addText('💡 心得：脚本化 > 对话式，一次编写脚本可多次复用迭代；数据→图表→文字全链路自动化是最大突破', { x: 0.7, y: 5.3, w: 8.6, h: 0.25, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.gold, align: 'center' });

// ============================================================
// 幻灯片 9: 技术研究报告
// ============================================================
const slide9 = pptx.addSlide();
addDarkBg(slide9);
addSectionHeader(slide9, '05 技术研究报告 — 深度生成与知识库沉淀', '效率提升10倍，脚本化+图表+知识库形成闭环', 0.25);

addGoldBorder(slide9, 0.5, 1.0, 4.5, 2.2);
slide9.addText('AI应用描述', { x: 0.7, y: 1.1, w: 4.1, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold });

const desc9 = [
  '• 140条规则库三层级设计（单元87+设备34+台区19）',
  '• CHI/Arrhenius模型推导与公式编排',
  '• 技术报告深度生成：6章结构+数据分析+文献综述',
  '• 知识库沉淀：研究成果自动归档IMA，形成可复用资产',
  '• AI知识库支撑：文献引用自动关联已入库研究成果'
];
desc9.forEach((line, i) => {
  slide9.addText(line, { x: 0.7, y: 1.5 + i * 0.32, w: 4.1, h: 0.28, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addBlueBorder(slide9, 5.2, 1.0, 4.3, 2.2);
slide9.addText('实践案例', { x: 5.4, y: 1.1, w: 3.9, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });

const cases9 = [
  '1. 终端故障规则库技术报告：',
  '   87条单元级规则+CHI模型→完整技术论证',
  '2. 表计健康评估报告：',
  '   34条设备级规则+Arrhenius模型→状态评估',
  '3. 台区故障诊断报告：',
  '   19条台区级规则→区域级故障定位'
];
cases9.forEach((line, i) => {
  slide9.addText(line, { x: 5.4, y: 1.5 + i * 0.32, w: 3.9, h: 0.28, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addGoldBorder(slide9, 0.5, 3.4, 4.5, 1.7);
slide9.addText('核心成果', { x: 0.7, y: 3.5, w: 4.1, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.green });
slide9.addText('规则库设计：140条（三层级）', { x: 0.7, y: 3.9, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide9.addText('报告效率：提升10倍', { x: 0.7, y: 4.2, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide9.addText('知识沉淀：IMA知识库自动归档', { x: 0.7, y: 4.5, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

addBlueBorder(slide9, 5.2, 3.4, 4.3, 1.7);
slide9.addText('AI工具组合', { x: 5.4, y: 3.5, w: 3.9, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });
slide9.addText('WorkBuddy（模型推导+报告生成）', { x: 5.4, y: 3.9, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide9.addText('docx-js（报告脚本化生成）', { x: 5.4, y: 4.2, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide9.addText('IMA知识库（成果沉淀与复用）', { x: 5.4, y: 4.5, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

slide9.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.25, w: 9, h: 0.35, fill: { color: THEME.bgCardLight }, line: { color: THEME.gold, width: 1 } });
slide9.addText('💡 心得：脚本化生成+图表嵌入+知识库沉淀形成完整闭环；技术深度内容AI辅助但核心推导需专家把关', { x: 0.7, y: 5.3, w: 8.6, h: 0.25, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.gold, align: 'center' });

// ============================================================
// 幻灯片 10: Demo原型设计
// ============================================================
const slide10 = pptx.addSlide();
addDarkBg(slide10);
addSectionHeader(slide10, '06 Demo原型设计 — 代码生成与可视化组件', '原型周期2周→3天，周报已全自动化', 0.25);

addGoldBorder(slide10, 0.5, 1.0, 4.5, 2.2);
slide10.addText('AI应用描述', { x: 0.7, y: 1.1, w: 4.1, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold });

const desc10 = [
  '• IDP可视化系统(idp_v3.html)开发：个人发展计划可视化',
  '• 周报HTML自动分发：邮件兼容格式+内联样式',
  '• 交互式可视化组件：Chart.js数据图表+动态交互',
  '• 原型快速迭代：AI生成代码→人工调试→快速验证',
  '• AI知识库支撑：设计规范与组件库统一沉淀'
];
desc10.forEach((line, i) => {
  slide10.addText(line, { x: 0.7, y: 1.5 + i * 0.32, w: 4.1, h: 0.28, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addBlueBorder(slide10, 5.2, 1.0, 4.3, 2.2);
slide10.addText('实践案例', { x: 5.4, y: 1.1, w: 3.9, h: 0.35, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });

const cases10 = [
  '1. IDP可视化系统：',
  '   12人团队架构→个人发展路径可视化',
  '2. 周报自动化系统：',
  '   数据汇总→HTML周报→邮件自动分发',
  '3. 数据看板原型：',
  '   项目进度/资源分配→交互式图表'
];
cases10.forEach((line, i) => {
  slide10.addText(line, { x: 5.4, y: 1.5 + i * 0.32, w: 3.9, h: 0.28, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

addGoldBorder(slide10, 0.5, 3.4, 4.5, 1.7);
slide10.addText('核心成果', { x: 0.7, y: 3.5, w: 4.1, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.green });
slide10.addText('原型周期：2周 → 3天（↓85%）', { x: 0.7, y: 3.9, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide10.addText('周报自动化：100%无人干预', { x: 0.7, y: 4.2, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide10.addText('IDP系统：12人团队全覆盖', { x: 0.7, y: 4.5, w: 4.1, h: 0.25, fontSize: 12, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

addBlueBorder(slide10, 5.2, 3.4, 4.3, 1.7);
slide10.addText('AI工具组合', { x: 5.4, y: 3.5, w: 3.9, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', bold: true, color: THEME.blueLight });
slide10.addText('WorkBuddy（代码生成+调试）', { x: 5.4, y: 3.9, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide10.addText('HTML/CSS/JS（前端原型）', { x: 5.4, y: 4.2, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });
slide10.addText('Chart.js（数据可视化）', { x: 5.4, y: 4.5, w: 3.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textPrimary });

slide10.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.25, w: 9, h: 0.35, fill: { color: THEME.bgCardLight }, line: { color: THEME.gold, width: 1 } });
slide10.addText('💡 心得：AI前端原型效果最好，复杂业务逻辑仍需调试；HTML周报格式是邮件分发的最佳实践', { x: 0.7, y: 5.3, w: 8.6, h: 0.25, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.gold, align: 'center' });

// ============================================================
// 幻灯片 11: AI工具链架构
// ============================================================
const slide11 = pptx.addSlide();
addDarkBg(slide11);
addSectionHeader(slide11, 'AI工具链架构', 'WorkBuddy × IMA 知识库 联动方案', 0.25);

const tools = [
  { title: 'WorkBuddy', subtitle: '核心AI助手', color: THEME.gold, items: ['对话式内容生成', '代码/脚本编写', '数据分析与图表', 'PPT/Word自动生成', '多文档交叉分析'] },
  { title: 'IMA 知识库', subtitle: '知识沉淀中心', color: THEME.blue, items: ['文件上传通道', 'URL导入通道', '笔记创建通道', '结构化文献库', '历史模板复用'] },
  { title: '辅助工具链', subtitle: '专业化增强', color: THEME.teal, items: ['docx-js（Word生成）', 'PptxGenJS（PPT生成）', 'matplotlib（图表）', 'Chart.js（可视化）', 'WebSearch（检索）'] },
];

tools.forEach((tool, i) => {
  const x = 0.5 + i * 3.2;
  const y = 1.2;
  addGoldBorder(slide11, x, y, 2.9, 3.2);
  slide11.addShape(pptx.ShapeType.rect, { x, y, w: 2.9, h: 0.5, fill: { color: tool.color }, line: { color: tool.color, width: 1 } });
  slide11.addText(tool.title, { x, y: y + 0.08, w: 2.9, h: 0.3, fontSize: 16, fontFace: 'Microsoft YaHei', bold: true, color: THEME.bgDark, align: 'center' });
  slide11.addText(tool.subtitle, { x, y: y + 0.55, w: 2.9, h: 0.25, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
  tool.items.forEach((item, j) => {
    slide11.addText('□ ' + item, { x: x + 0.2, y: y + 0.9 + j * 0.42, w: 2.5, h: 0.35, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
  });
});

slide11.addShape(pptx.ShapeType.rect, { x: 0.5, y: 4.7, w: 9, h: 0.7, fill: { color: THEME.bgCardLight }, line: { color: THEME.gold, width: 1 } });
slide11.addText('闭环回流：WorkBuddy 反向调用 IMA 知识库', { x: 0.7, y: 4.75, w: 8.6, h: 0.25, fontSize: 13, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold, align: 'center' });
slide11.addText('正向：WorkBuddy → IMA（文献清洗→分类标签→自动导入知识库）    反向：IMA → WorkBuddy（检索知识库→AI分析整合→生成报告）', { x: 0.7, y: 5.05, w: 8.6, h: 0.25, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });

// ============================================================
// 幻灯片 12: 核心成果数据（效率对比图）
// ============================================================
const slide12 = pptx.addSlide();
addDarkBg(slide12);
addSectionHeader(slide12, '核心成果数据', '效率提升与质量改善量化指标', 0.25);

// 5大KPI卡片
const kpis = [
  { num: '10x', label: '技术报告', desc: '生成效率提升', color: THEME.gold },
  { num: '83%', label: '申报简表', desc: '起草时间缩短', color: THEME.blue },
  { num: '5x', label: '指南编写', desc: '编写效率提升', color: THEME.teal },
  { num: '7x', label: '可研报告', desc: '生成效率提升', color: THEME.gold },
  { num: '85%', label: 'Demo原型', desc: '开发周期缩短', color: THEME.blue },
];

kpis.forEach((kpi, i) => {
  const x = 0.5 + i * 1.85;
  const y = 1.1;
  addGoldBorder(slide12, x, y, 1.7, 1.5);
  slide12.addText(kpi.num, { x, y: y + 0.15, w: 1.7, h: 0.45, fontSize: 26, fontFace: 'Microsoft YaHei', bold: true, color: kpi.color, align: 'center' });
  slide12.addText(kpi.label, { x, y: y + 0.65, w: 1.7, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary, align: 'center' });
  slide12.addText(kpi.desc, { x, y: y + 0.95, w: 1.7, h: 0.25, fontSize: 9, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
});

// 效率对比表
addGoldBorder(slide12, 0.5, 2.9, 9, 2.6);
slide12.addText('各环节效率对比', { x: 0.7, y: 3.0, w: 8.6, h: 0.3, fontSize: 15, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold });

const tableData = [
  ['环节', '传统模式', 'AI辅助模式', '效率提升', '质量改善'],
  ['申报简表', '2-3天', '0.5天', '↓83%', '通过率80%'],
  ['指南编写', '1周', '1-2天', '↑5x', '对齐度95%'],
  ['可研报告', '2周', '2天', '↑7x', '图表22张'],
  ['技术报告', '2周', '1-2天', '↑10x', '140规则'],
  ['Demo原型', '2周', '3天', '↑85%', '交互可视化'],
];

slide12.addTable(tableData, {
  x: 0.7, y: 3.4, w: 8.6, h: 2.0,
  fontSize: 10, fontFace: 'Microsoft YaHei',
  color: THEME.textSecondary,
  border: { type: 'solid', pt: 0.5, color: THEME.gold },
  colW: [1.5, 1.8, 1.8, 1.5, 1.8],
  fill: { color: THEME.bgCard }
});

// ============================================================
// 幻灯片 13: 实践心得
// ============================================================
const slide13 = pptx.addSlide();
addDarkBg(slide13);
addSectionHeader(slide13, '实践心得', '6条核心经验总结', 0.25);

const insights = [
  { num: '01', title: '脚本化 > 对话式', desc: '一次编写脚本可多次复用迭代，效率远超逐轮对话', color: THEME.gold },
  { num: '02', title: '知识库是核心基础', desc: 'AI知识生产基础库构建是所有工作的前提，双路径采集确保知识质量', color: THEME.blue },
  { num: '03', title: '模板库是关键前提', desc: '历史材料沉淀越丰富，AI生成效果越好，质量越稳定', color: THEME.teal },
  { num: '04', title: '数据→图表→文字全链路', desc: '从原始数据到分析报告的全自动化是最大突破点', color: THEME.gold },
  { num: '05', title: '人工审核不可少', desc: '政策合规、技术深度、核心创新点必须专家把关', color: THEME.blue },
  { num: '06', title: '前端原型效果最好', desc: 'HTML/CSS/JS可视化组件，AI生成代码质量最高', color: THEME.teal },
];

insights.forEach((insight, i) => {
  const row = Math.floor(i / 3);
  const col = i % 3;
  const x = 0.5 + col * 3.2;
  const y = 1.0 + row * 2.2;
  addGoldBorder(slide13, x, y, 2.9, 1.9);
  slide13.addShape(pptx.ShapeType.ellipse, { x: x + 0.15, y: y + 0.15, w: 0.35, h: 0.35, fill: { color: insight.color }, line: { color: insight.color, width: 1 } });
  slide13.addText(insight.num, { x: x + 0.15, y: y + 0.18, w: 0.35, h: 0.28, fontSize: 11, fontFace: 'Microsoft YaHei', bold: true, color: THEME.bgDark, align: 'center' });
  slide13.addText(insight.title, { x: x + 0.6, y: y + 0.15, w: 2.0, h: 0.35, fontSize: 13, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary });
  slide13.addText(insight.desc, { x: x + 0.15, y: y + 0.6, w: 2.6, h: 1.0, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

slide13.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.1, w: 9, h: 0.45, fill: { color: THEME.bgCardLight }, line: { color: THEME.gold, width: 2 } });
slide13.addText('"真正的变化不是工具，而是工作流的重新定义"', { x: 0.7, y: 5.2, w: 8.6, h: 0.3, fontSize: 13, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold, align: 'center' });

// ============================================================
// 幻灯片 14: 规划展望
// ============================================================
const slide14 = pptx.addSlide();
addDarkBg(slide14);
addSectionHeader(slide14, '规划展望', '三阶段深化路径', 0.25);

const phases = [
  { phase: '深化阶段', time: '2026 Q3', items: ['可研报告脚本全面标准化', 'PPT生成脚本模板库建设', '技术报告自动生成优化', '知识库双路径全面接入'], color: THEME.blue },
  { phase: '拓展阶段', time: '2026 Q4', items: ['跨项目知识库互联互通', '团队AI能力培训体系', '多区域项目协同模板', '智能评审辅助工具'], color: THEME.teal },
  { phase: '固化阶段', time: '2027', items: ['全流程自动化流水线', 'AI辅助决策支持系统', '知识资产持续沉淀', '团队AI成熟度评估'], color: THEME.gold },
];

phases.forEach((phase, i) => {
  const x = 0.5 + i * 3.2;
  const y = 1.2;
  addGoldBorder(slide14, x, y, 2.9, 3.2);
  slide14.addShape(pptx.ShapeType.rect, { x, y, w: 2.9, h: 0.5, fill: { color: phase.color }, line: { color: phase.color, width: 1 } });
  slide14.addText(phase.phase, { x, y: y + 0.08, w: 2.9, h: 0.3, fontSize: 15, fontFace: 'Microsoft YaHei', bold: true, color: THEME.bgDark, align: 'center' });
  slide14.addText(phase.time, { x, y: y + 0.55, w: 2.9, h: 0.25, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
  phase.items.forEach((item, j) => {
    slide14.addText((j + 1) + '. ' + item, { x: x + 0.2, y: y + 0.95 + j * 0.48, w: 2.5, h: 0.4, fontSize: 10, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
  });
});

slide14.addShape(pptx.ShapeType.line, { x: 1.0, y: 4.8, w: 8, h: 0, line: { color: THEME.gold, width: 2 } });
['2026 Q3', '2026 Q4', '2027'].forEach((time, i) => {
  const x = 1.5 + i * 3.0;
  slide14.addShape(pptx.ShapeType.ellipse, { x: x, y: 4.65, w: 0.3, h: 0.3, fill: { color: THEME.gold }, line: { color: THEME.gold, width: 1 } });
  slide14.addText(time, { x: x - 0.2, y: 5.0, w: 0.7, h: 0.25, fontSize: 9, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
});

// ============================================================
// 幻灯片 15: 结尾
// ============================================================
const slide15 = pptx.addSlide();
addDarkBg(slide15);
slide15.addShape(pptx.ShapeType.line, { x: 0.5, y: 0.8, w: 9, h: 0, line: { color: THEME.gold, width: 3 } });
slide15.addText('感谢聆听', { x: 0.5, y: 2.0, w: 9, h: 0.8, fontSize: 48, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary, align: 'center' });
slide15.addText('电网科创业务中心 · AI实践持续推进中', { x: 0.5, y: 3.0, w: 9, h: 0.4, fontSize: 16, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
slide15.addText('WorkBuddy × IMA 知识库 联动方案', { x: 0.5, y: 3.6, w: 9, h: 0.3, fontSize: 14, fontFace: 'Microsoft YaHei', color: THEME.gold, align: 'center' });
slide15.addShape(pptx.ShapeType.line, { x: 0.5, y: 4.2, w: 9, h: 0, line: { color: THEME.gold, width: 3 } });
addCornerDecorations(slide15);

// ============================================================
// 保存文件
// ============================================================
const outputPath = 'C:\\AI学习资料\\mesheer\\2026-06-07-15-06-17\\科技项目全流程AI应用实践与心得_v3.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => console.log('PPT generated successfully: ' + outputPath))
  .catch(err => console.error('Error:', err));
