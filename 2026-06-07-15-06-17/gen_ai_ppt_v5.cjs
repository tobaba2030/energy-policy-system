const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches
pptx.author = '科创业务中心';
pptx.title = '科技项目全流程AI应用实践与心得';

// ============================================================
// 风格定义 - 深蓝科技风 (宽屏版)
// ============================================================
const T = {
  bg: '0B1120', bgCard: '0F1B2E', bgCard2: '162447',
  gold: 'D4A843', goldL: 'E8C96E',
  blue: '3B82F6', blueL: '60A5FA', blueD: '1E3A5F',
  teal: '2DD4BF', tealD: '0D9488',
  txt: 'F8FAFC', txt2: '94A3B8', txt3: '64748B',
  green: '22C55E', red: 'EF4444', orange: 'F97316',
  purple: 'A78BFA', pink: 'F472B6',
};

// 页面尺寸
const W = 13.33, H = 7.5;

function bg(slide) { slide.background = { color: T.bg }; }

function rect(slide, x, y, w, h, opts = {}) {
  const { fill = T.bgCard, line = null, lineW = 1, radius = 0.08, lineDash } = opts;
  const shapeOpts = { x, y, w, h, fill: { color: fill }, rectRadius: radius };
  if (line) { shapeOpts.line = { color: line, width: lineW, dashType: lineDash || 'solid' }; }
  slide.addShape(pptx.ShapeType.rect, shapeOpts);
}

function line(slide, x, y, w, opts = {}) {
  const { color = T.gold, width = 2, dash } = opts;
  slide.addShape(pptx.ShapeType.line, { x, y, w, h: 0, line: { color, width, dashType: dash || 'solid' } });
}

function txt(slide, x, y, w, h, text, opts = {}) {
  const { size = 12, bold = false, color = T.txt, align = 'left', font = 'Microsoft YaHei', valign = 'top' } = opts;
  slide.addText(text, { x, y, w, h, fontSize: size, fontFace: font, bold, color, align, valign });
}

function arrow(slide, x, y, len = 0.4, color = T.gold) {
  slide.addShape(pptx.ShapeType.line, { x, y, w: len, h: 0, line: { color, width: 2.5 } });
  // 箭头头部用矩形替代（PptxGenJS没有三角形）
  slide.addShape(pptx.ShapeType.rect, { x: x + len - 0.06, y: y - 0.06, w: 0.12, h: 0.12, fill: { color }, line: { color, width: 0.5 } });
}

function oval(slide, x, y, w, h, fill, lineC = null) {
  slide.addShape(pptx.ShapeType.ellipse, { x, y, w, h, fill: { color: fill }, line: { color: lineC || fill, width: 1.5 } });
}

function corners(slide) {
  [[0.15, 0.15], [W - 0.3, 0.15], [0.15, H - 0.3], [W - 0.3, H - 0.3]].forEach(([x, y]) => {
    rect(slide, x, y, 0.15, 0.15, { fill: T.gold, line: T.gold, radius: 0.02 });
  });
}

// 流程节点卡片（用于逻辑图）
function flowNode(slide, x, y, w, h, title, fill = T.bgCard2, lineC = T.blue, titleColor = T.txt) {
  rect(slide, x, y, w, h, { fill, line: lineC, lineW: 1.5, radius: 0.06 });
  txt(slide, x + 0.08, y + 0.05, w - 0.16, h - 0.1, title, { size: 9, bold: true, color: titleColor, align: 'center', valign: 'middle' });
}

// 流程箭头
function flowArrow(slide, x1, y1, x2, y2, color = T.gold) {
  if (Math.abs(y2 - y1) < 0.1) {
    // 水平箭头
    const len = x2 - x1;
    arrow(slide, x1, y1, len > 0.01 ? len : 0.1, color);
  } else {
    // 垂直箭头
    slide.addShape(pptx.ShapeType.line, { x: x1, y: y1, w: 0, h: y2 - y1, line: { color, width: 2 } });
    slide.addShape(pptx.ShapeType.rect, { x: x1 - 0.06, y: y2 - 0.12, w: 0.12, h: 0.12, fill: { color }, line: { color, width: 0.5 } });
  }
}

// 标题条
function header(slide, title, subtitle) {
  line(slide, 0.5, 0.5, W - 1, { color: T.gold, width: 2 });
  txt(slide, 0.5, 0.15, W - 1, 0.4, title, { size: 26, bold: true, color: T.txt, align: 'center' });
  if (subtitle) {
    txt(slide, 0.5, 0.55, W - 1, 0.25, subtitle, { size: 13, color: T.txt2, align: 'center' });
  }
}

// ============================================================
// 1. 封面
// ============================================================
const s1 = pptx.addSlide(); bg(s1);
line(s1, 0.5, 1.2, W - 1, { color: T.gold, width: 3 });
txt(s1, 0.5, 2.4, W - 1, 0.9, '科技项目全流程', { size: 52, bold: true, color: T.txt, align: 'center' });
txt(s1, 0.5, 3.3, W - 1, 0.7, 'AI应用实践与心得', { size: 44, bold: true, color: T.gold, align: 'center' });
txt(s1, 0.5, 4.3, W - 1, 0.4, '电网科创业务中心 · 从申报到交付的智能化升级', { size: 18, color: T.txt2, align: 'center' });
line(s1, 0.5, 5.0, W - 1, { color: T.gold, width: 3 });
txt(s1, 0.5, 5.5, W - 1, 0.3, 'AI知识生产基础库 → WorkBuddy × IMA 联动方案', { size: 14, color: T.txt3, align: 'center' });
corners(s1);

// ============================================================
// 2. 目录
// ============================================================
const s2 = pptx.addSlide(); bg(s2);
header(s2, '汇报目录', 'CONTENTS');

const toc = [
  { n: '01', t: 'AI知识生产基础库', d: '双路径学术知识采集架构', c: T.gold },
  { n: '02', t: '学术文献智能流转', d: '从人工到智能的全流程闭环', c: T.blue },
  { n: '03', t: '全流程概览', d: '5大环节AI应用全景', c: T.teal },
  { n: '04', t: '申报简表', d: 'AI辅助框架与会议流程', c: T.blue },
  { n: '05', t: '指南编写', d: '政策对齐与智能生成', c: T.teal },
  { n: '06', t: '可研报告', d: '全量自动化生成', c: T.gold },
  { n: '07', t: '技术研究报告', d: '深度生成与知识沉淀', c: T.blue },
  { n: '08', t: 'Demo原型设计', d: '代码生成与可视化', c: T.teal },
  { n: '09', t: '成果·心得·展望', d: '量化数据与实践总结', c: T.gold },
];

toc.forEach((item, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.6 + col * 4.1;
  const y = 1.1 + row * 2.0;
  rect(s2, x, y, 3.8, 1.7, { fill: T.bgCard, line: item.c, lineW: 1.5 });
  txt(s2, x + 0.15, y + 0.12, 0.6, 0.4, item.n, { size: 22, bold: true, color: item.c });
  txt(s2, x + 0.8, y + 0.15, 2.8, 0.35, item.t, { size: 16, bold: true, color: T.txt });
  txt(s2, x + 0.15, y + 0.7, 3.5, 0.8, item.d, { size: 12, color: T.txt2 });
});
corners(s2);

// ============================================================
// 3. AI知识生产基础库 + 双路径架构逻辑图
// ============================================================
const s3 = pptx.addSlide(); bg(s3);
header(s3, '01 AI知识生产基础库', '所有工作的核心基础 · 双路径学术知识采集');

// --- 上半部分：逻辑图 ---
// 顶部说明条
rect(s3, 0.5, 0.95, W - 1, 0.45, { fill: T.bgCard2, line: T.gold, lineW: 1 });
txt(s3, 0.7, 1.0, W - 1.4, 0.35, '中国科技云学术智能体平台爬取方案验证通过，可稳定获取论文摘要、关键词、URL等结构化元数据；同步完成Bing学术爬取可行性确认，构建多源学术知识采集双路径。', { size: 11, color: T.gold, align: 'center' });

// 路径一：中国科技云
rect(s3, 0.5, 1.6, 5.8, 2.2, { fill: T.bgCard, line: T.gold, lineW: 2 });
rect(s3, 0.5, 1.6, 5.8, 0.45, { fill: T.gold, line: T.gold, radius: 0 });
txt(s3, 0.5, 1.65, 5.8, 0.35, '路径一：中国科技云学术智能体平台', { size: 14, bold: true, color: T.bg, align: 'center' });

// 流程节点：爬取方案→元数据提取→结构化存储→知识库注入
const p1Nodes = ['学术智能体\n爬取入口', '论文摘要\n关键词提取', 'URL/DOI\n结构化处理', '元数据\n清洗归一', 'IMA知识库\n自动注入'];
const p1Colors = [T.blueD, T.blue, T.blue, T.tealD, T.green];
p1Nodes.forEach((n, i) => {
  const x = 0.8 + i * 1.12;
  flowNode(s3, x, 2.25, 1.0, 0.7, n, p1Colors[i], T.gold, T.txt);
  if (i < p1Nodes.length - 1) flowArrow(s3, x + 1.0, 2.6, x + 1.12, 2.6, T.gold);
});

txt(s3, 0.7, 3.1, 5.4, 0.5, '核心能力：论文摘要提取 | 关键词识别 | DOI关联 | 元数据结构化 | 自动入库', { size: 10, color: T.txt2, align: 'center' });
rect(s3, 0.7, 3.45, 5.4, 0.28, { fill: T.green, line: T.green, radius: 0.04 });
txt(s3, 0.7, 3.47, 5.4, 0.23, '状态：已验证通过，稳定运行中', { size: 10, bold: true, color: T.bg, align: 'center' });

// 路径二：Bing学术
rect(s3, 6.7, 1.6, 5.8, 2.2, { fill: T.bgCard, line: T.blue, lineW: 2 });
rect(s3, 6.7, 1.6, 5.8, 0.45, { fill: T.blue, line: T.blue, radius: 0 });
txt(s3, 6.7, 1.65, 5.8, 0.35, '路径二：Bing学术搜索', { size: 14, bold: true, color: T.txt, align: 'center' });

const p2Nodes = ['Bing学术\n检索入口', '英文文献\n摘要抓取', '跨语言\n翻译融合', '元数据\n结构对齐', 'IMA知识库\n补充注入'];
const p2Colors = [T.blueD, T.blue, T.purple, T.tealD, T.green];
p2Nodes.forEach((n, i) => {
  const x = 7.0 + i * 1.12;
  flowNode(s3, x, 2.25, 1.0, 0.7, n, p2Colors[i], T.blue, T.txt);
  if (i < p2Nodes.length - 1) flowArrow(s3, x + 1.0, 2.6, x + 1.12, 2.6, T.blue);
});

txt(s3, 6.9, 3.1, 5.4, 0.5, '核心能力：国际文献检索 | 英文元数据 | 跨语言融合 | 互补知识覆盖', { size: 10, color: T.txt2, align: 'center' });
rect(s3, 6.9, 3.45, 5.4, 0.28, { fill: T.blue, line: T.blue, radius: 0.04 });
txt(s3, 6.9, 3.47, 5.4, 0.23, '状态：可行性确认，待接入WorkBuddy', { size: 10, bold: true, color: T.txt, align: 'center' });

// 底部汇聚条
rect(s3, 0.5, 4.0, W - 1, 0.5, { fill: T.bgCard2, line: T.gold, lineW: 1.5 });
flowArrow(s3, 3.4, 3.75, 3.4, 4.0, T.gold);
flowArrow(s3, 9.6, 3.75, 9.6, 4.0, T.blue);
txt(s3, 0.7, 4.08, W - 1.4, 0.35, '双路径汇聚 → 统一清洗 → 结构化存储 → IMA知识库 → 服务全流程AI应用', { size: 14, bold: true, color: T.gold, align: 'center' });

// --- 下半部分：文字描述 ---
rect(s3, 0.5, 4.75, 6.0, 2.3, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s3, 0.7, 4.85, 5.6, 0.3, '知识生产基础库的价值', { size: 14, bold: true, color: T.gold });
const kbValues = [
  '▸ 为申报简表提供同类项目参考文献与技术对标',
  '▸ 为指南编写提供最新政策解读与技术趋势分析',
  '▸ 为可研报告提供文献综述自动引用与数据支撑',
  '▸ 为技术研究报告提供模型推导的理论依据',
  '▸ 为Demo原型提供行业最佳实践与设计规范'
];
kbValues.forEach((v, i) => {
  txt(s3, 0.7, 5.25 + i * 0.32, 5.6, 0.28, v, { size: 11, color: T.txt2 });
});

rect(s3, 6.9, 4.75, 5.6, 2.3, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s3, 7.1, 4.85, 5.2, 0.3, '扩展AI应用场景', { size: 14, bold: true, color: T.blueL });
const kbExt = [
  '▸ AI自动追踪领域热点，推送最新研究成果',
  '▸ 跨项目知识复用：相似项目经验自动匹配',
  '▸ 智能文献综述：输入主题→AI生成综述初稿',
  '▸ 技术路线对比：多方案自动优劣势分析',
  '▸ 知识图谱构建：实体关系可视化展示'
];
kbExt.forEach((v, i) => {
  txt(s3, 7.1, 5.25 + i * 0.32, 5.2, 0.28, v, { size: 11, color: T.txt2 });
});
corners(s3);

// ============================================================
// 4. 学术文献智能流转闭环（配逻辑图）
// ============================================================
const s4 = pptx.addSlide(); bg(s4);
header(s4, '02 学术文献智能流转闭环', '从人工爬取到智能报告，全流程自动化升级');

// --- 上半部分：三列对比逻辑图 ---
const colData = [
  { t: '传统手工模式', c: T.red, items: ['人工检索下载', '手动整理分类', '逐篇阅读提炼', '人工编写报告'], time: '4-8小时/10篇' },
  { t: 'WorkBuddy 自动化', c: T.gold, items: ['粘贴/上传文献', 'AI自动清洗提取', '智能分类标签', '自动传入IMA'], time: '5分钟/10篇' },
  { t: 'IMA 知识库', c: T.blue, items: ['文件上传通道', 'URL导入通道', '笔记创建通道', '结构化文献库'], time: '全自动入库' },
];

colData.forEach((col, i) => {
  const x = 0.5 + i * 4.2;
  const y = 1.0;
  const bdr = i === 1 ? T.gold : T.blue;
  const bw = i === 1 ? 2 : 1;
  rect(s4, x, y, 3.9, 2.3, { fill: T.bgCard, line: bdr, lineW: bw });
  rect(s4, x, y, 3.9, 0.4, { fill: col.c, line: col.c, radius: 0 });
  txt(s4, x, y + 0.05, 3.9, 0.3, col.t, { size: 13, bold: true, color: i === 1 ? T.bg : T.txt, align: 'center' });
  col.items.forEach((item, j) => {
    const ny = y + 0.55 + j * 0.35;
    flowNode(s4, x + 0.3, ny, 3.3, 0.3, item, T.bgCard2, col.c, T.txt2);
    if (j < col.items.length - 1) flowArrow(s4, x + 1.95, ny + 0.3, x + 1.95, ny + 0.35, col.c);
  });
  // 时间标注
  rect(s4, x + 0.5, y + 2.0, 2.9, 0.25, { fill: col.c, line: col.c, radius: 0.04 });
  txt(s4, x + 0.5, y + 2.02, 2.9, 0.2, col.time, { size: 10, bold: true, color: i === 0 ? T.txt : T.bg, align: 'center' });
});

// 流转箭头：传统→WorkBuddy→IMA
arrow(s4, 4.4, 2.15, 0.3, T.gold);
arrow(s4, 8.6, 2.15, 0.3, T.gold);

// --- 中部：4步闭环逻辑图 ---
rect(s4, 0.5, 3.55, W - 1, 1.7, { fill: T.bgCard, line: T.gold, lineW: 1.5 });
txt(s4, 0.7, 3.65, 6, 0.3, '闭环回流：WorkBuddy ↔ IMA 知识库双向联动', { size: 13, bold: true, color: T.gold });

const loopNodes = [
  { t: '1 发起分析请求', sub: '用户输入项目需求\n与技术方向', c: T.blue },
  { t: '2 检索IMA知识库', sub: '匹配已入库文献\n与历史项目', c: T.teal },
  { t: '3 AI分析整合', sub: '多源信息融合\n智能推理分析', c: T.gold },
  { t: '4 输出报告', sub: '生成结构化\n技术文档', c: T.green },
];

loopNodes.forEach((n, i) => {
  const x = 1.0 + i * 3.0;
  // 圆形节点
  oval(s4, x + 0.4, 4.1, 0.55, 0.55, n.c);
  txt(s4, x + 0.4, 4.15, 0.55, 0.45, (i + 1).toString(), { size: 16, bold: true, color: T.bg, align: 'center', valign: 'middle' });
  txt(s4, x + 1.05, 4.05, 1.8, 0.3, n.t, { size: 11, bold: true, color: n.c });
  txt(s4, x + 1.05, 4.35, 1.8, 0.4, n.sub, { size: 9, color: T.txt2 });
  if (i < 3) arrow(s4, x + 2.6, 4.35, 0.35, T.gold);
});
// 回流箭头（简化用文字）
txt(s4, 8.5, 4.8, 4.2, 0.3, '→ 成果归档IMA → 下次复用', { size: 10, bold: true, color: T.teal, align: 'right' });

// --- 下半部分：文字描述 ---
rect(s4, 0.5, 5.5, 6.0, 1.5, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s4, 0.7, 5.6, 5.6, 0.3, '核心突破', { size: 14, bold: true, color: T.gold });
const litBreak = [
  '▸ 文献处理效率提升10倍（4-8小时→5分钟）',
  '▸ 知识零遗漏：100%自动入库，零人工遗漏',
  '▸ 闭环回流：研究成果反向归档，形成知识资产',
];
litBreak.forEach((v, i) => txt(s4, 0.7, 6.0 + i * 0.3, 5.6, 0.25, v, { size: 11, color: T.txt2 }));

rect(s4, 6.9, 5.5, 5.6, 1.5, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s4, 7.1, 5.6, 5.2, 0.3, '扩展AI应用', { size: 14, bold: true, color: T.blueL });
const litExt = [
  '▸ 文献相似度计算：自动发现关联研究',
  '▸ 引用网络分析：追踪研究脉络与演化',
  '▸ 趋势预测：基于发表趋势预判技术热点',
];
litExt.forEach((v, i) => txt(s4, 7.1, 6.0 + i * 0.3, 5.2, 0.25, v, { size: 11, color: T.txt2 }));
corners(s4);

// ============================================================
// 5. 全流程概览（5环节流程图）
// ============================================================
const s5 = pptx.addSlide(); bg(s5);
header(s5, '03 科技项目全流程 AI应用概览', '5大环节 × 智能化升级路径');

// --- 上半部分：5环节流程图 ---
const steps = [
  { n: '申报简表', c: T.blue, ai: 'AI框架搭建\n会议流程优化' },
  { n: '指南编写', c: T.teal, ai: '政策智能对齐\n内容自动生成' },
  { n: '可研报告', c: T.gold, ai: '全量自动生成\n图表嵌入' },
  { n: '技术报告', c: T.blue, ai: '深度知识生成\n规则库设计' },
  { n: 'Demo原型', c: T.teal, ai: '代码自动生成\n可视化组件' },
];

// 流程线
line(s5, 1.2, 2.3, W - 1.5, { color: T.gold, width: 2, dash: 'dash' });

steps.forEach((step, i) => {
  const x = 0.8 + i * 2.5;
  // 圆形节点
  oval(s5, x + 0.55, 1.3, 1.2, 1.2, step.c, T.gold);
  txt(s5, x + 0.55, 1.45, 1.2, 0.9, step.n, { size: 13, bold: true, color: T.bg, align: 'center', valign: 'middle' });
  // AI应用标注
  rect(s5, x + 0.2, 2.7, 1.9, 0.8, { fill: T.bgCard2, line: step.c, lineW: 1, radius: 0.06 });
  txt(s5, x + 0.3, 2.8, 1.7, 0.6, step.ai, { size: 9, color: T.txt2, align: 'center' });
  // 箭头
  if (i < 4) arrow(s5, x + 1.85, 1.9, 0.55, T.gold);
});

// 知识库支撑横条
rect(s5, 0.5, 3.75, W - 1, 0.5, { fill: T.bgCard2, line: T.gold, lineW: 1.5 });
txt(s5, 0.7, 3.82, W - 1.4, 0.35, 'AI知识生产基础库（中国科技云 + Bing学术） → IMA知识库 → 全流程知识注入与复用', { size: 13, bold: true, color: T.gold, align: 'center' });

// --- 下半部分：详细文字 ---
const flowDetails = [
  { t: '申报简表', items: ['起草时间：2-3天→0.5天（↓83%）', '一次通过率：80%（历史均值50%）', 'AI辅助：框架生成+指标匹配+会议流程', '扩展：智能查重+相似项目推荐'], c: T.blue },
  { t: '指南编写', items: ['编写效率：提升5倍', '政策对齐度：60%→95%', 'AI辅助：政策解析+框架草案+审校对齐', '扩展：多版本A/B测试+自动评审'], c: T.teal },
  { t: '可研报告', items: ['生成时间：2周→2天（↑7x）', '22张图表自动嵌入', 'AI辅助：脚本化全量生成+数据分析', '扩展：多项目模板复用+自动校审'], c: T.gold },
  { t: '技术报告', items: ['效率提升10倍，140规则库', 'CHI/Arrhenius模型推导', 'AI辅助：深度生成+知识库沉淀', '扩展：跨项目知识复用+自动评审'], c: T.blue },
  { t: 'Demo原型', items: ['原型周期：2周→3天（↓85%）', '周报100%自动化', 'AI辅助：代码生成+可视化组件', '扩展：交互式Demo+在线评审'], c: T.teal },
];

flowDetails.forEach((fd, i) => {
  const x = 0.5 + i * 2.52;
  rect(s5, x, 4.5, 2.35, 2.6, { fill: T.bgCard, line: fd.c, lineW: 1 });
  txt(s5, x + 0.1, 4.6, 2.15, 0.3, fd.t, { size: 13, bold: true, color: fd.c });
  fd.items.forEach((item, j) => {
    txt(s5, x + 0.1, 4.95 + j * 0.48, 2.15, 0.45, item, { size: 9, color: j < 3 ? T.txt2 : T.teal });
  });
});
corners(s5);

// ============================================================
// 6. 申报简表（会议流程逻辑图）
// ============================================================
const s6 = pptx.addSlide(); bg(s6);
header(s6, '04 申报简表 — AI辅助框架搭建', '从2-3天缩短至0.5天，一次通过率80%');

// --- 上半部分：AI辅助会议3阶段流程图 ---
const phases6 = [
  { t: 'Phase 1\n需求调研', sub: '技术方向确认\n目标与资源梳理', tools: 'WorkBuddy+IMA', c: T.blue },
  { t: 'Phase 2\nAI智能生成', sub: '需求→简表框架\n多版本迭代(10min×3)', tools: 'WorkBuddy+WebSearch', c: T.gold },
  { t: 'Phase 3\n专家评审', sub: '可行性/创新性评估\nAI辅助修改→终稿', tools: 'WorkBuddy+IMA', c: T.green },
];

phases6.forEach((p, i) => {
  const x = 0.8 + i * 4.2;
  rect(s6, x, 1.0, 3.8, 2.4, { fill: T.bgCard, line: p.c, lineW: 2 });
  // 阶段标题
  oval(s6, x + 1.3, 1.15, 1.2, 1.2, p.c);
  txt(s6, x + 1.3, 1.2, 1.2, 1.1, p.t, { size: 11, bold: true, color: T.bg, align: 'center', valign: 'middle' });
  // 子项
  txt(s6, x + 0.15, 2.5, 3.5, 0.5, p.sub, { size: 10, color: T.txt2, align: 'center' });
  // 工具标注
  rect(s6, x + 0.6, 3.0, 2.6, 0.3, { fill: p.c, line: p.c, radius: 0.04 });
  txt(s6, x + 0.6, 3.02, 2.6, 0.25, p.tools, { size: 10, bold: true, color: T.bg, align: 'center' });
  // 箭头
  if (i < 2) arrow(s6, x + 3.8, 2.2, 0.35, T.gold);
});

// --- 下半部分：文字描述 ---
rect(s6, 0.5, 3.65, 4.0, 3.3, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s6, 0.7, 3.75, 3.6, 0.3, 'AI应用场景', { size: 14, bold: true, color: T.gold });
const app6 = [
  '▸ 输入核心要点→AI自动生成简表框架',
  '▸ 多版本快速迭代：调整参数→即时新版本',
  '▸ 关键词与指标智能匹配，提升评审通过率',
  '▸ 历史简表模板库复用，减少重复劳动',
  '▸ AI解析评分标准与申报要求',
  '▸ IMA知识库检索相似案例',
  '▸ 智能查重：自动比对已申报项目',
];
app6.forEach((v, i) => txt(s6, 0.7, 4.15 + i * 0.35, 3.6, 0.3, v, { size: 10, color: T.txt2 }));

rect(s6, 4.8, 3.65, 4.0, 3.3, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s6, 5.0, 3.75, 3.6, 0.3, '核心成果', { size: 14, bold: true, color: T.green });
const res6 = [
  '▸ 起草时间：2-3天 → 0.5天（↓83%）',
  '▸ 一次通过率：80%（历史均值50%）',
  '▸ 多版本迭代：10分钟内完成3版',
  '▸ AI工具：WorkBuddy + IMA + WebSearch',
  '▸ 模板复用率：70%以上',
];
res6.forEach((v, i) => txt(s6, 5.0, 4.15 + i * 0.35, 3.6, 0.3, v, { size: 10, color: i < 3 ? T.txt : T.txt2 }));

rect(s6, 9.1, 3.65, 3.7, 3.3, { fill: T.bgCard, line: T.teal, lineW: 1 });
txt(s6, 9.3, 3.75, 3.3, 0.3, '扩展AI应用', { size: 14, bold: true, color: T.teal });
const ext6 = [
  '▸ 智能查重：自动比对已申报项目，避免重复',
  '▸ 相似项目推荐：基于知识库匹配成功案例',
  '▸ 评审模拟：AI预评审+评分预测',
  '▸ 竞争分析：同批次申报项目优劣势对比',
  '▸ 申报策略优化：基于历史数据推荐最佳方向',
];
ext6.forEach((v, i) => txt(s6, 9.3, 4.15 + i * 0.35, 3.3, 0.3, v, { size: 10, color: T.teal }));

// 心得
rect(s6, 0.5, 6.85, W - 1, 0.4, { fill: T.bgCard2, line: T.gold, lineW: 1 });
txt(s6, 0.7, 6.9, W - 1.4, 0.3, '💡 心得：AI擅长快速提炼和结构化，核心创新点需人工把关；模板库越完善AI效果越好', { size: 11, color: T.gold, align: 'center' });
corners(s6);

// ============================================================
// 7. 指南编写（政策对齐逻辑图）
// ============================================================
const s7 = pptx.addSlide(); bg(s7);
header(s7, '05 指南编写 — 政策对齐与内容智能生成', '编写效率提升5倍，政策对齐度显著提高');

// --- 上半部分：政策对齐逻辑图 ---
const guideFlow = [
  { t: '政策文档\n输入', c: T.blue },
  { t: 'AI解析\n评分标准', c: T.gold },
  { t: '技术方向\n智能梳理', c: T.teal },
  { t: '框架草案\n自动生成', c: T.blue },
  { t: '多轮审校\n政策对齐', c: T.gold },
  { t: '终稿\n输出', c: T.green },
];

guideFlow.forEach((n, i) => {
  const x = 0.5 + i * 2.1;
  rect(s7, x, 1.1, 1.85, 1.0, { fill: T.bgCard, line: n.c, lineW: 1.5 });
  txt(s7, x + 0.05, 1.15, 1.75, 0.9, n.t, { size: 11, bold: true, color: n.c, align: 'center', valign: 'middle' });
  if (i < 5) arrow(s7, x + 1.85, 1.6, 0.22, n.c);
});

// IMA知识库支撑条
rect(s7, 0.5, 2.35, W - 1, 0.5, { fill: T.bgCard2, line: T.blue, lineW: 1 });
txt(s7, 0.7, 2.42, W - 1.4, 0.35, 'IMA知识库支撑：历史指南比对 | 最新政策检索 | 行业标准对齐 | 技术趋势分析', { size: 12, bold: true, color: T.blueL, align: 'center' });

// --- 下半部分：文字 ---
rect(s7, 0.5, 3.1, 4.0, 2.6, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s7, 0.7, 3.2, 3.6, 0.3, 'AI应用场景', { size: 14, bold: true, color: T.gold });
const app7 = [
  '▸ 政策文档解析→自动提取评分标准',
  '▸ 技术方向梳理→AI生成指南框架草案',
  '▸ 多轮审校对齐→确保政策一致性',
  '▸ 历史指南库比对→避免重复冲突',
  '▸ AI知识库：实时检索最新政策动态',
  '▸ 自动生成章节结构与内容模板',
];
app7.forEach((v, i) => txt(s7, 0.7, 3.6 + i * 0.33, 3.6, 0.28, v, { size: 10, color: T.txt2 }));

rect(s7, 4.8, 3.1, 4.0, 2.6, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s7, 5.0, 3.2, 3.6, 0.3, '核心成果', { size: 14, bold: true, color: T.green });
const res7 = [
  '▸ 编写效率：提升5倍',
  '▸ 政策对齐度：60%→95%',
  '▸ 多版本对比：3版/小时',
  '▸ AI工具：WorkBuddy + IMA + WebSearch',
  '▸ 案例覆盖：智能电网/计量/新型电力系统',
];
res7.forEach((v, i) => txt(s7, 5.0, 3.6 + i * 0.33, 3.6, 0.28, v, { size: 10, color: i < 3 ? T.txt : T.txt2 }));

rect(s7, 9.1, 3.1, 3.7, 2.6, { fill: T.bgCard, line: T.teal, lineW: 1 });
txt(s7, 9.3, 3.2, 3.3, 0.3, '扩展AI应用', { size: 14, bold: true, color: T.teal });
const ext7 = [
  '▸ 多版本A/B测试：自动对比最优方案',
  '▸ 合规性自动评审：逐项检查政策匹配度',
  '▸ 专家知识注入：行业专家经验数字化',
  '▸ 智能推荐：基于项目特征推荐指南模板',
  '▸ 跨区域政策差异分析：南网vs国网对比',
];
ext7.forEach((v, i) => txt(s7, 9.3, 3.6 + i * 0.33, 3.3, 0.28, v, { size: 10, color: T.teal }));

rect(s7, 0.5, 5.9, W - 1, 0.4, { fill: T.bgCard2, line: T.gold, lineW: 1 });
txt(s7, 0.7, 5.95, W - 1.4, 0.3, '💡 心得：政策合规性必须人工审核，涉密条款尤甚；AI生成的框架需经专家确认后才可定稿', { size: 11, color: T.gold, align: 'center' });

// 实践案例
rect(s7, 0.5, 6.5, W - 1, 0.7, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s7, 0.7, 6.55, 1.5, 0.3, '实践案例', { size: 12, bold: true, color: T.blueL });
txt(s7, 0.7, 6.85, W - 1.4, 0.3, '① 智能电网技术指南：解析南网/国网最新政策→生成技术方向    ② 计量设备AI应用指南：梳理故障诊断技术路线→对齐行业标准    ③ 新型电力系统指南：多源政策交叉分析→提炼核心考核指标', { size: 10, color: T.txt2 });
corners(s7);

// ============================================================
// 8. 可研报告（脚本化生成逻辑图）
// ============================================================
const s8 = pptx.addSlide(); bg(s8);
header(s8, '06 可研报告 — 全量自动化生成', '脚本化 > 对话式，一次编写多次复用');

// --- 上半部分：数据→图表→报告全链路逻辑图 ---
const reportFlow = [
  { t: '原始数据\n输入', sub: '实验数据/调研\n文献/规则库', c: T.blue },
  { t: '数据分析\nmatplotlib', sub: '68维特征分析\nPCA/t-SNE降维', c: T.gold },
  { t: '图表自动\n生成(22张)', sub: '分布图/热力图\n相关性/趋势图', c: T.teal },
  { t: 'docx-js\n脚本生成', sub: '6章结构编排\n文献+附录', c: T.blue },
  { t: '报告\n输出', sub: '1.35MB docx\n100+页/5万字', c: T.green },
];

reportFlow.forEach((n, i) => {
  const x = 0.5 + i * 2.55;
  rect(s8, x, 1.0, 2.25, 1.8, { fill: T.bgCard, line: n.c, lineW: 1.5 });
  txt(s8, x + 0.05, 1.05, 2.15, 0.6, n.t, { size: 13, bold: true, color: n.c, align: 'center', valign: 'middle' });
  txt(s8, x + 0.1, 1.7, 2.05, 0.8, n.sub, { size: 10, color: T.txt2, align: 'center' });
  if (i < 4) arrow(s8, x + 2.25, 1.9, 0.28, n.c);
});

// IMA知识库支撑
rect(s8, 0.5, 3.05, W - 1, 0.4, { fill: T.bgCard2, line: T.gold, lineW: 1 });
txt(s8, 0.7, 3.1, W - 1.4, 0.3, 'IMA知识库支撑：文献综述自动引用 | 规则库数据注入 | 历史报告模板复用 | 技术标准关联', { size: 12, bold: true, color: T.gold, align: 'center' });

// --- 下半部分 ---
rect(s8, 0.5, 3.7, 4.0, 2.6, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s8, 0.7, 3.8, 3.6, 0.3, 'AI应用场景', { size: 14, bold: true, color: T.gold });
const app8 = [
  '▸ docx-js脚本自动生成完整可研报告',
  '▸ 22张matplotlib图表自动嵌入',
  '▸ 6章结构+20篇文献+3个附录深度编排',
  '▸ 数据→分析→图表→文字全链路自动化',
  '▸ AI知识库：文献综述自动引用',
  '▸ 可研预算自动估算与合理性校验',
];
app8.forEach((v, i) => txt(s8, 0.7, 4.2 + i * 0.33, 3.6, 0.28, v, { size: 10, color: T.txt2 }));

rect(s8, 4.8, 3.7, 4.0, 2.6, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s8, 5.0, 3.8, 3.6, 0.3, '核心成果', { size: 14, bold: true, color: T.green });
const res8 = [
  '▸ 报告规模：1.35MB（6章+20文献+3附录）',
  '▸ 图表数量：22张自动嵌入',
  '▸ 生成时间：2周→2天（↑7x）',
  '▸ AI工具：docx-js + matplotlib + WorkBuddy',
  '▸ 脚本复用：一次编写，多项目适配',
];
res8.forEach((v, i) => txt(s8, 5.0, 4.2 + i * 0.33, 3.6, 0.28, v, { size: 10, color: i < 3 ? T.txt : T.txt2 }));

rect(s8, 9.1, 3.7, 3.7, 2.6, { fill: T.bgCard, line: T.teal, lineW: 1 });
txt(s8, 9.3, 3.8, 3.3, 0.3, '扩展AI应用', { size: 14, bold: true, color: T.teal });
const ext8 = [
  '▸ 多项目模板复用：不同项目类型自动适配',
  '▸ 自动校审：格式/编号/引用一致性检查',
  '▸ 可研指标自动计算：ROI/回收期/净现值',
  '▸ 风险评估矩阵：自动识别技术/市场风险',
  '▸ 同行评审模拟：AI预判评审关注点',
];
ext8.forEach((v, i) => txt(s8, 9.3, 4.2 + i * 0.33, 3.3, 0.28, v, { size: 10, color: T.teal }));

rect(s8, 0.5, 6.5, W - 1, 0.4, { fill: T.bgCard2, line: T.gold, lineW: 1 });
txt(s8, 0.7, 6.55, W - 1.4, 0.3, '💡 心得：脚本化>对话式，一次编写脚本可多次复用迭代；数据→图表→文字全链路自动化是最大突破', { size: 11, color: T.gold, align: 'center' });
corners(s8);

// ============================================================
// 9. 技术研究报告（深度生成逻辑图）
// ============================================================
const s9 = pptx.addSlide(); bg(s9);
header(s9, '07 技术研究报告 — 深度生成与知识库沉淀', '效率提升10倍，脚本化+图表+知识库形成闭环');

// --- 上半部分：三层级规则库逻辑图 ---
const ruleLevels = [
  { t: '单元级规则\n87条', sub: '终端/表计\n单设备故障诊断', c: T.blue },
  { t: '设备级规则\n34条', sub: '多参数关联\n健康状态评估', c: T.gold },
  { t: '台区级规则\n19条', sub: '区域级故障\n定位与预警', c: T.teal },
];

// 规则库三层级
ruleLevels.forEach((r, i) => {
  const x = 0.8 + i * 4.2;
  rect(s9, x, 1.0, 3.8, 1.3, { fill: T.bgCard, line: r.c, lineW: 2 });
  oval(s9, x + 0.15, 1.15, 0.6, 0.6, r.c);
  txt(s9, x + 0.15, 1.2, 0.6, 0.5, (i + 1).toString(), { size: 18, bold: true, color: T.bg, align: 'center', valign: 'middle' });
  txt(s9, x + 0.9, 1.1, 2.7, 0.5, r.t, { size: 13, bold: true, color: r.c });
  txt(s9, x + 0.9, 1.65, 2.7, 0.5, r.sub, { size: 10, color: T.txt2 });
  if (i < 2) arrow(s9, x + 3.8, 1.65, 0.35, T.gold);
});

// 模型推导+知识沉淀流
rect(s9, 0.5, 2.55, 6.0, 1.0, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s9, 0.7, 2.6, 5.6, 0.3, '模型推导流程', { size: 12, bold: true, color: T.blueL });
const modelFlow = ['数据收集', '特征工程', 'CHI/Arrhenius\n模型推导', '规则提取\n与验证', '报告生成'];
modelFlow.forEach((m, i) => {
  const x = 0.8 + i * 1.15;
  flowNode(s9, x, 3.0, 1.0, 0.45, m, T.bgCard2, T.blue, T.txt2);
  if (i < 4) arrow(s9, x + 1.0, 3.22, 0.13, T.blue);
});

rect(s9, 6.9, 2.55, 5.6, 1.0, { fill: T.bgCard, line: T.teal, lineW: 1 });
txt(s9, 7.1, 2.6, 5.2, 0.3, '知识沉淀闭环', { size: 12, bold: true, color: T.teal });
const kFlow = ['技术报告', 'IMA归档', '知识复用', '新项目注入', '持续迭代'];
kFlow.forEach((m, i) => {
  const x = 7.2 + i * 1.05;
  flowNode(s9, x, 3.0, 0.9, 0.45, m, T.bgCard2, T.teal, T.txt2);
  if (i < 4) arrow(s9, x + 0.9, 3.22, 0.13, T.teal);
});

// --- 下半部分 ---
rect(s9, 0.5, 3.8, 4.0, 2.5, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s9, 0.7, 3.9, 3.6, 0.3, 'AI应用场景', { size: 14, bold: true, color: T.gold });
const app9 = [
  '▸ 140条规则库三层级设计（87+34+19）',
  '▸ CHI/Arrhenius模型推导与公式编排',
  '▸ 技术报告深度生成：6章+数据分析',
  '▸ 知识库沉淀：成果自动归档IMA',
  '▸ 文献引用自动关联已入库研究成果',
  '▸ 规则冲突检测与一致性校验',
];
app9.forEach((v, i) => txt(s9, 0.7, 4.3 + i * 0.3, 3.6, 0.25, v, { size: 10, color: T.txt2 }));

rect(s9, 4.8, 3.8, 4.0, 2.5, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s9, 5.0, 3.9, 3.6, 0.3, '核心成果', { size: 14, bold: true, color: T.green });
const res9 = [
  '▸ 规则库：140条（三层级完整设计）',
  '▸ 报告效率：提升10倍',
  '▸ 知识沉淀：IMA知识库自动归档',
  '▸ AI工具：WorkBuddy + docx-js + IMA',
  '▸ 案例覆盖：终端故障/表计健康/台区诊断',
];
res9.forEach((v, i) => txt(s9, 5.0, 4.3 + i * 0.3, 3.6, 0.25, v, { size: 10, color: i < 3 ? T.txt : T.txt2 }));

rect(s9, 9.1, 3.8, 3.7, 2.5, { fill: T.bgCard, line: T.teal, lineW: 1 });
txt(s9, 9.3, 3.9, 3.3, 0.3, '扩展AI应用', { size: 14, bold: true, color: T.teal });
const ext9 = [
  '▸ 规则自动发现：基于数据挖掘新规则',
  '▸ 跨项目知识复用：相似技术自动迁移',
  '▸ 技术评审自动化：AI预审+人工确认',
  '▸ 模型迭代优化：新数据→模型更新',
  '▸ 技术路线对比：多方案优劣自动分析',
];
ext9.forEach((v, i) => txt(s9, 9.3, 4.3 + i * 0.3, 3.3, 0.25, v, { size: 10, color: T.teal }));

rect(s9, 0.5, 6.5, W - 1, 0.4, { fill: T.bgCard2, line: T.gold, lineW: 1 });
txt(s9, 0.7, 6.55, W - 1.4, 0.3, '💡 心得：脚本化+图表+知识库形成完整闭环；技术深度内容AI辅助但核心推导需专家把关', { size: 11, color: T.gold, align: 'center' });
corners(s9);

// ============================================================
// 10. Demo原型设计（代码生成逻辑图）
// ============================================================
const s10 = pptx.addSlide(); bg(s10);
header(s10, '08 Demo原型设计 — 代码生成与可视化组件', '原型周期2周→3天，周报已全自动化');

// --- 上半部分：AI代码生成流程逻辑图 ---
const demoFlow = [
  { t: '需求描述\n输入', sub: '功能/交互/数据\n可视化要求', c: T.blue },
  { t: 'AI代码\n生成', sub: 'HTML/CSS/JS\nChart.js组件', c: T.gold },
  { t: '原型\n验证', sub: '浏览器预览\n交互测试', c: T.teal },
  { t: '迭代\n优化', sub: '调试/美化\n功能完善', c: T.blue },
  { t: '交付\n部署', sub: '在线演示\n文件分发', c: T.green },
];

demoFlow.forEach((n, i) => {
  const x = 0.5 + i * 2.55;
  rect(s10, x, 1.0, 2.25, 1.7, { fill: T.bgCard, line: n.c, lineW: 1.5 });
  txt(s10, x + 0.05, 1.05, 2.15, 0.6, n.t, { size: 13, bold: true, color: n.c, align: 'center', valign: 'middle' });
  txt(s10, x + 0.1, 1.7, 2.05, 0.8, n.sub, { size: 10, color: T.txt2, align: 'center' });
  if (i < 4) arrow(s10, x + 2.25, 1.85, 0.28, n.c);
});

// 案例：IDP系统 + 周报自动化
rect(s10, 0.5, 2.95, 6.0, 0.9, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s10, 0.7, 3.0, 5.6, 0.3, 'IDP可视化系统（idp_v3.html）', { size: 12, bold: true, color: T.blueL });
const idpFlow = ['12人数据', '技能雷达图', '发展路径', '目标追踪', 'HTML周报'];
idpFlow.forEach((m, i) => {
  const x = 0.8 + i * 1.12;
  flowNode(s10, x, 3.4, 1.0, 0.35, m, T.bgCard2, T.blue, T.txt2);
  if (i < 4) arrow(s10, x + 1.0, 3.57, 0.1, T.blue);
});

rect(s10, 6.9, 2.95, 5.6, 0.9, { fill: T.bgCard, line: T.teal, lineW: 1 });
txt(s10, 7.1, 3.0, 5.2, 0.3, '周报自动化系统', { size: 12, bold: true, color: T.teal });
const weekFlow = ['数据汇总', 'AI生成', 'HTML格式', '邮件分发', '自动归档'];
weekFlow.forEach((m, i) => {
  const x = 7.2 + i * 1.05;
  flowNode(s10, x, 3.4, 0.9, 0.35, m, T.bgCard2, T.teal, T.txt2);
  if (i < 4) arrow(s10, x + 0.9, 3.57, 0.13, T.teal);
});

// --- 下半部分 ---
rect(s10, 0.5, 4.1, 4.0, 2.2, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s10, 0.7, 4.2, 3.6, 0.3, 'AI应用场景', { size: 14, bold: true, color: T.gold });
const app10 = [
  '▸ IDP可视化：个人发展路径可视化',
  '▸ 周报HTML自动分发：邮件兼容格式',
  '▸ 交互式可视化组件：Chart.js动态图表',
  '▸ 原型快速迭代：AI生成→人工调试→验证',
  '▸ 设计规范与组件库统一沉淀',
];
app10.forEach((v, i) => txt(s10, 0.7, 4.6 + i * 0.32, 3.6, 0.28, v, { size: 10, color: T.txt2 }));

rect(s10, 4.8, 4.1, 4.0, 2.2, { fill: T.bgCard, line: T.blue, lineW: 1 });
txt(s10, 5.0, 4.2, 3.6, 0.3, '核心成果', { size: 14, bold: true, color: T.green });
const res10 = [
  '▸ 原型周期：2周→3天（↓85%）',
  '▸ 周报自动化：100%无人干预',
  '▸ IDP系统：12人团队全覆盖',
  '▸ AI工具：WorkBuddy + HTML/JS + Chart.js',
];
res10.forEach((v, i) => txt(s10, 5.0, 4.6 + i * 0.32, 3.6, 0.28, v, { size: 10, color: i < 3 ? T.txt : T.txt2 }));

rect(s10, 9.1, 4.1, 3.7, 2.2, { fill: T.bgCard, line: T.teal, lineW: 1 });
txt(s10, 9.3, 4.2, 3.3, 0.3, '扩展AI应用', { size: 14, bold: true, color: T.teal });
const ext10 = [
  '▸ 交互式Demo：可操作原型+用户测试',
  '▸ 在线评审：远程实时协作评审',
  '▸ 多端适配：PC/移动端自适应原型',
  '▸ 组件市场：通用组件库沉淀复用',
];
ext10.forEach((v, i) => txt(s10, 9.3, 4.6 + i * 0.32, 3.3, 0.28, v, { size: 10, color: T.teal }));

rect(s10, 0.5, 6.5, W - 1, 0.4, { fill: T.bgCard2, line: T.gold, lineW: 1 });
txt(s10, 0.7, 6.55, W - 1.4, 0.3, '💡 心得：AI前端原型效果最好，复杂业务逻辑仍需调试；HTML周报格式是邮件分发的最佳实践', { size: 11, color: T.gold, align: 'center' });
corners(s10);

// ============================================================
// 11. AI工具链架构（三层逻辑图）
// ============================================================
const s11 = pptx.addSlide(); bg(s11);
header(s11, 'AI工具链架构', 'WorkBuddy × IMA 知识库 联动方案');

// --- 上半部分：三层架构逻辑图 ---
const layers = [
  { t: '应用层', items: ['申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型'], c: T.gold },
  { t: '工具层', items: ['WorkBuddy', 'IMA知识库', 'docx-js', 'PptxGenJS', 'Chart.js'], c: T.blue },
  { t: '数据层', items: ['中国科技云', 'Bing学术', '政策文档', '项目数据', '团队知识'], c: T.teal },
];

layers.forEach((layer, li) => {
  const y = 1.0 + li * 1.5;
  rect(s11, 0.5, y, W - 1, 1.3, { fill: T.bgCard, line: layer.c, lineW: 2 });
  // 层标签
  rect(s11, 0.5, y, 1.8, 1.3, { fill: layer.c, line: layer.c, radius: 0 });
  txt(s11, 0.5, y + 0.35, 1.8, 0.6, layer.t, { size: 16, bold: true, color: T.bg, align: 'center', valign: 'middle' });
  // 节点
  layer.items.forEach((item, i) => {
    const x = 2.6 + i * 2.1;
    flowNode(s11, x, y + 0.35, 1.9, 0.6, item, T.bgCard2, layer.c, T.txt);
  });
  // 层间箭头
  if (li < 2) {
    for (let i = 0; i < 3; i++) {
      const x = 4.0 + i * 3.0;
      arrow(s11, x, y + 1.3, 0.01, layer.c); // 标记位置
    }
  }
});

// 闭环回流
rect(s11, 0.5, 5.6, W - 1, 0.6, { fill: T.bgCard2, line: T.gold, lineW: 1.5 });
txt(s11, 0.7, 5.65, W - 1.4, 0.25, '闭环回流：WorkBuddy ↔ IMA 知识库', { size: 14, bold: true, color: T.gold, align: 'center' });
txt(s11, 0.7, 5.92, W - 1.4, 0.2, '正向：WorkBuddy → IMA（文献清洗→分类标签→自动导入知识库）    反向：IMA → WorkBuddy（检索知识库→AI分析整合→生成报告）', { size: 11, color: T.txt2, align: 'center' });
corners(s11);

// ============================================================
// 12. 核心成果数据（效率对比图+KPI）
// ============================================================
const s12 = pptx.addSlide(); bg(s12);
header(s12, '09 核心成果数据', '效率提升与质量改善量化指标');

// 5大KPI
const kpis = [
  { n: '10x', l: '技术报告', d: '生成效率提升', c: T.gold },
  { n: '83%', l: '申报简表', d: '起草时间缩短', c: T.blue },
  { n: '5x', l: '指南编写', d: '编写效率提升', c: T.teal },
  { n: '7x', l: '可研报告', d: '生成效率提升', c: T.gold },
  { n: '85%', l: 'Demo原型', d: '开发周期缩短', c: T.blue },
];

kpis.forEach((kpi, i) => {
  const x = 0.5 + i * 2.52;
  rect(s12, x, 1.0, 2.25, 1.6, { fill: T.bgCard, line: kpi.c, lineW: 2 });
  txt(s12, x, 1.15, 2.25, 0.6, kpi.n, { size: 30, bold: true, color: kpi.c, align: 'center' });
  txt(s12, x, 1.75, 2.25, 0.3, kpi.l, { size: 13, bold: true, color: T.txt, align: 'center' });
  txt(s12, x, 2.05, 2.25, 0.25, kpi.d, { size: 10, color: T.txt2, align: 'center' });
});

// 效率对比表
rect(s12, 0.5, 2.9, W - 1, 3.3, { fill: T.bgCard, line: T.gold, lineW: 1 });
txt(s12, 0.7, 3.0, 8, 0.3, '各环节效率对比', { size: 15, bold: true, color: T.gold });

const tbl = [
  [{ text: '环节', options: { bold: true, color: T.gold, fill: { color: T.bgCard2 } } },
   { text: '传统模式', options: { bold: true, color: T.gold, fill: { color: T.bgCard2 } } },
   { text: 'AI辅助模式', options: { bold: true, color: T.gold, fill: { color: T.bgCard2 } } },
   { text: '效率提升', options: { bold: true, color: T.gold, fill: { color: T.bgCard2 } } },
   { text: '质量改善', options: { bold: true, color: T.gold, fill: { color: T.bgCard2 } } },
   { text: '扩展潜力', options: { bold: true, color: T.gold, fill: { color: T.bgCard2 } } }],
  ['申报简表', '2-3天', '0.5天', '↓83%', '通过率80%', '智能查重+评审模拟'],
  ['指南编写', '1周', '1-2天', '↑5x', '对齐度95%', 'A/B测试+自动评审'],
  ['可研报告', '2周', '2天', '↑7x', '图表22张', '模板复用+自动校审'],
  ['技术报告', '2周', '1-2天', '↑10x', '140规则', '知识复用+规则发现'],
  ['Demo原型', '2周', '3天', '↑85%', '交互可视化', '组件市场+在线评审'],
];

s12.addTable(tbl, {
  x: 0.7, y: 3.4, w: W - 1.4,
  fontSize: 11, fontFace: 'Microsoft YaHei',
  color: T.txt2,
  border: { type: 'solid', pt: 0.5, color: '2D3748' },
  colW: [1.6, 1.6, 1.6, 1.3, 1.6, 2.5],
  fill: { color: T.bgCard },
  rowH: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4]
});
corners(s12);

// ============================================================
// 13. 实践心得
// ============================================================
const s13 = pptx.addSlide(); bg(s13);
header(s13, '09 实践心得', '6条核心经验总结');

const insights = [
  { n: '01', t: '脚本化 > 对话式', d: '一次编写脚本可多次复用迭代，效率远超逐轮对话。docx-js/PptxGenJS脚本化生成是效率倍增的关键。', c: T.gold },
  { n: '02', t: '知识库是核心基础', d: 'AI知识生产基础库（中国科技云+Bing学术）是所有工作的前提，双路径采集确保知识质量与覆盖面。', c: T.blue },
  { n: '03', t: '模板库是关键前提', d: '历史材料沉淀越丰富，AI生成效果越好，质量越稳定。IMA知识库的模板复用率已达70%以上。', c: T.teal },
  { n: '04', t: '数据→图表→文字全链路', d: '从原始数据到分析报告的全自动化是最大突破点。matplotlib图表嵌入+docx-js文字编排形成完整闭环。', c: T.gold },
  { n: '05', t: '人工审核不可少', d: '政策合规、技术深度、核心创新点必须专家把关。AI辅助可覆盖80%基础内容，20%核心需人工。', c: T.blue },
  { n: '06', t: '前端原型效果最好', d: 'HTML/CSS/JS可视化组件是AI代码生成质量最高的领域。IDP系统和周报自动化是典型成功案例。', c: T.teal },
];

insights.forEach((ins, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.5 + col * 4.2;
  const y = 1.0 + row * 2.5;
  rect(s13, x, y, 3.9, 2.2, { fill: T.bgCard, line: ins.c, lineW: 1.5 });
  oval(s13, x + 0.15, y + 0.15, 0.45, 0.45, ins.c);
  txt(s13, x + 0.15, y + 0.2, 0.45, 0.35, ins.n, { size: 13, bold: true, color: T.bg, align: 'center', valign: 'middle' });
  txt(s13, x + 0.7, y + 0.15, 3.0, 0.4, ins.t, { size: 14, bold: true, color: T.txt });
  txt(s13, x + 0.15, y + 0.7, 3.6, 1.3, ins.d, { size: 10, color: T.txt2 });
});

rect(s13, 0.5, 6.2, W - 1, 0.5, { fill: T.bgCard2, line: T.gold, lineW: 2 });
txt(s13, 0.7, 6.3, W - 1.4, 0.3, '"真正的变化不是工具，而是工作流的重新定义"', { size: 15, bold: true, color: T.gold, align: 'center' });
corners(s13);

// ============================================================
// 14. 规划展望（三阶段时间线）
// ============================================================
const s14 = pptx.addSlide(); bg(s14);
header(s14, '09 规划展望', '三阶段深化路径');

const phases = [
  { t: '深化阶段', time: '2026 Q3', items: ['可研报告脚本全面标准化', 'PPT生成脚本模板库建设', '技术报告自动生成优化', '知识库双路径全面接入', '申报简表智能查重上线'], c: T.blue },
  { t: '拓展阶段', time: '2026 Q4', items: ['跨项目知识库互联互通', '团队AI能力培训体系', '多区域项目协同模板', '智能评审辅助工具', '指南编写自动评审系统'], c: T.teal },
  { t: '固化阶段', time: '2027', items: ['全流程自动化流水线', 'AI辅助决策支持系统', '知识资产持续沉淀', '团队AI成熟度评估', '行业最佳实践输出'], c: T.gold },
];

phases.forEach((phase, i) => {
  const x = 0.5 + i * 4.2;
  rect(s14, x, 1.0, 3.9, 3.8, { fill: T.bgCard, line: phase.c, lineW: 2 });
  rect(s14, x, 1.0, 3.9, 0.55, { fill: phase.c, line: phase.c, radius: 0 });
  txt(s14, x, 1.08, 3.9, 0.4, phase.t, { size: 16, bold: true, color: T.bg, align: 'center' });
  txt(s14, x, 1.6, 3.9, 0.25, phase.time, { size: 12, color: phase.c, align: 'center' });
  phase.items.forEach((item, j) => {
    txt(s14, x + 0.2, 2.0 + j * 0.5, 3.5, 0.45, (j + 1) + '. ' + item, { size: 11, color: T.txt2 });
  });
});

// 时间线
line(s14, 1.5, 5.2, W - 2, { color: T.gold, width: 2 });
['2026 Q3', '2026 Q4', '2027'].forEach((t, i) => {
  const x = 2.5 + i * 3.5;
  oval(s14, x, 5.05, 0.3, 0.3, T.gold);
  txt(s14, x - 0.3, 5.4, 0.9, 0.25, t, { size: 10, color: T.txt2, align: 'center' });
});
corners(s14);

// ============================================================
// 15. 结尾
// ============================================================
const s15 = pptx.addSlide(); bg(s15);
line(s15, 0.5, 1.5, W - 1, { color: T.gold, width: 3 });
txt(s15, 0.5, 2.8, W - 1, 0.9, '感谢聆听', { size: 52, bold: true, color: T.txt, align: 'center' });
txt(s15, 0.5, 3.9, W - 1, 0.5, '电网科创业务中心 · AI实践持续推进中', { size: 20, color: T.txt2, align: 'center' });
txt(s15, 0.5, 4.6, W - 1, 0.4, 'AI知识生产基础库 → WorkBuddy × IMA 联动方案', { size: 16, color: T.gold, align: 'center' });
line(s15, 0.5, 5.3, W - 1, { color: T.gold, width: 3 });
corners(s15);

// ============================================================
// 保存
// ============================================================
const outPath = 'C:\\AI学习资料\\mesheer\\2026-06-07-15-06-17\\科技项目全流程AI应用实践与心得_v5.pptx';
pptx.writeFile({ fileName: outPath })
  .then(() => console.log('PPT v5 generated: ' + outPath))
  .catch(err => console.error('Error:', err));
