const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = '科创业务中心';
pptx.title = '科技项目全流程AI应用实践与心得';

// ============================================================
// 风格定义 - 学术汇报风格（白底+深蓝标题栏）
// ============================================================
const T = {
  // 主色
  navy: '1A365D',      // 深蓝标题栏
  navyL: '2C5282',     // 浅蓝
  blue: '3182CE',      // 蓝色高亮
  blueL: '63B3ED',     // 浅蓝
  teal: '319795',      // 青色
  gold: 'D69E2E',      // 金色
  red: 'C53030',       // 红色强调
  green: '38A169',     // 绿色
  purple: '805AD5',    // 紫色
  orange: 'DD6B20',    // 橙色
  // 文字
  txtDark: '1A202C',   // 深色文字
  txtMid: '4A5568',    // 中灰文字
  txtLight: '718096',  // 浅灰文字
  txtWhite: 'FFFFFF',  // 白色文字
  // 背景
  bgWhite: 'FFFFFF',
  bgGray: 'F7FAFC',    // 浅灰背景
  bgCard: 'EDF2F7',    // 卡片背景
  bgTab: 'E2E8F0',     // Tab背景
  // 边框
  border: 'CBD5E0',
  borderDark: 'A0AEC0',
};

const W = 13.33, H = 7.5;

function bgWhite(slide) { slide.background = { color: T.bgWhite }; }

function rect(slide, x, y, w, h, opts = {}) {
  const { fill = T.bgWhite, line = null, lineW = 1, radius = 0 } = opts;
  const shapeOpts = { x, y, w, h, fill: { color: fill }, rectRadius: radius };
  if (line) { shapeOpts.line = { color: line, width: lineW }; }
  slide.addShape(pptx.ShapeType.rect, shapeOpts);
}

function line(slide, x, y, w, opts = {}) {
  const { color = T.navy, width = 2 } = opts;
  slide.addShape(pptx.ShapeType.line, { x, y, w, h: 0, line: { color, width } });
}

function txt(slide, x, y, w, h, text, opts = {}) {
  const { size = 12, bold = false, color = T.txtDark, align = 'left', font = 'Microsoft YaHei', valign = 'top' } = opts;
  slide.addText(text, { x, y, w, h, fontSize: size, fontFace: font, bold, color, align, valign });
}

// 深蓝标题栏
function titleBar(slide, mainTitle, subTitle) {
  rect(slide, 0, 0, W, 0.9, { fill: T.navy });
  txt(slide, 0.3, 0.18, W - 0.6, 0.35, mainTitle, { size: 20, bold: true, color: T.txtWhite });
  if (subTitle) {
    txt(slide, 0.3, 0.52, W - 0.6, 0.3, subTitle, { size: 11, color: T.blueL });
  }
}

// Tab导航栏
function tabBar(slide, tabs, activeIdx) {
  const tabW = W / tabs.length;
  tabs.forEach((tab, i) => {
    const isActive = i === activeIdx;
    const bg = isActive ? T.blue : T.bgTab;
    const tc = isActive ? T.txtWhite : T.txtMid;
    rect(slide, i * tabW, 0.9, tabW, 0.45, { fill: bg });
    txt(slide, i * tabW, 0.95, tabW, 0.35, tab, { size: 11, bold: isActive, color: tc, align: 'center' });
  });
  line(slide, 0, 1.35, W, { color: T.blue, width: 2 });
}

// 子标题块
function subTitle(slide, x, y, w, text, color = T.navy) {
  rect(slide, x, y, w, 0.4, { fill: color });
  txt(slide, x + 0.1, y + 0.05, w - 0.2, 0.3, text, { size: 12, bold: true, color: T.txtWhite });
}

// 流程节点
function flowNode(slide, x, y, w, h, text, fill = T.bgCard, lineC = T.blue) {
  rect(slide, x, y, w, h, { fill, line: lineC, lineW: 1, radius: 0.04 });
  txt(slide, x + 0.05, y + 0.03, w - 0.1, h - 0.06, text, { size: 9, color: T.txtDark, align: 'center', valign: 'middle' });
}

// 箭头
function arrow(slide, x, y, len, color = T.blue) {
  slide.addShape(pptx.ShapeType.line, { x, y, w: len, h: 0, line: { color, width: 2 } });
  slide.addShape(pptx.ShapeType.rect, { x: x + len - 0.05, y: y - 0.04, w: 0.1, h: 0.08, fill: { color }, line: { color, width: 0.5 } });
}

// 底部红色说明条
function bottomNote(slide, text) {
  rect(slide, 0.3, H - 0.55, W - 0.6, 0.4, { fill: 'FED7D7', line: T.red, lineW: 1 });
  txt(slide, 0.5, H - 0.48, W - 1, 0.25, text, { size: 10, color: T.red, align: 'center' });
}

// 三列卡片布局
function threeColumn(slide, y, h, leftContent, midContent, rightContent, titles) {
  const colW = (W - 0.8) / 3;
  // 左列
  rect(slide, 0.3, y, colW, h, { fill: T.bgGray, line: T.border, lineW: 1 });
  if (titles[0]) subTitle(slide, 0.3, y, colW, titles[0], T.navy);
  // 中列
  rect(slide, 0.3 + colW + 0.1, y, colW, h, { fill: T.bgGray, line: T.border, lineW: 1 });
  if (titles[1]) subTitle(slide, 0.3 + colW + 0.1, y, colW, titles[1], T.blue);
  // 右列
  rect(slide, 0.3 + colW * 2 + 0.2, y, colW, h, { fill: T.bgGray, line: T.border, lineW: 1 });
  if (titles[2]) subTitle(slide, 0.3 + colW * 2 + 0.2, y, colW, titles[2], T.teal);
}

// ============================================================
// 1. 封面
// ============================================================
const s1 = pptx.addSlide(); bgWhite(s1);
rect(s1, 0, 0, W, 1.2, { fill: T.navy });
txt(s1, 0.5, 0.3, W - 1, 0.5, '科技项目全流程AI应用实践与心得', { size: 36, bold: true, color: T.txtWhite, align: 'center' });
txt(s1, 0.5, 0.85, W - 1, 0.3, '电网科创业务中心 · 从申报到交付的智能化升级', { size: 14, color: T.blueL, align: 'center' });

rect(s1, 2, 2.2, W - 4, 3.5, { fill: T.bgGray, line: T.border, lineW: 1 });
txt(s1, 2.5, 2.5, W - 5, 0.4, '汇报框架', { size: 18, bold: true, color: T.navy });
const framework = [
  '01  AI知识生产基础库 — 双路径学术知识采集架构',
  '02  学术文献智能流转闭环 — 从人工到智能的全流程升级',
  '03  科技项目全流程AI应用概览 — 5大环节智能化路径',
  '04  申报简表 — AI辅助框架搭建与会议流程',
  '05  指南编写 — 政策对齐与内容智能生成',
  '06  可研报告 — 全量自动化生成',
  '07  技术研究报告 — 深度生成与知识库沉淀',
  '08  Demo原型设计 — 代码生成与可视化',
  '09  成果 · 心得 · 展望',
];
framework.forEach((f, i) => {
  txt(s1, 2.8, 3.1 + i * 0.38, W - 5.6, 0.3, f, { size: 12, color: T.txtMid });
});

line(s1, 0.5, 6.2, W - 1, { color: T.blue, width: 2 });
txt(s1, 0.5, 6.4, W - 1, 0.3, 'AI知识生产基础库（中国科技云 + Bing学术）→ IMA知识库 → 全流程知识注入与复用', { size: 12, color: T.blue, align: 'center' });

// ============================================================
// 2. AI知识生产基础库
// ============================================================
const s2 = pptx.addSlide(); bgWhite(s2);
titleBar(s2, '1.1 AI知识生产基础库', '所有工作的核心基础 · 双路径学术知识采集');
tabBar(s2, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 0);

// 子标题
subTitle(s2, 0.3, 1.5, W - 0.6, '1.1.1 双路径学术知识采集架构', T.navy);

// 三列布局
const colW = (W - 0.8) / 3;
// 左列：中国科技云路径
rect(s2, 0.3, 2.0, colW, 3.8, { fill: T.bgGray, line: T.navy, lineW: 2 });
subTitle(s2, 0.3, 2.0, colW, '路径一：中国科技云学术智能体', T.navy);
const p1Nodes = [
  { t: '学术智能体\n爬取入口', c: T.navy },
  { t: '论文摘要\n关键词提取', c: T.blue },
  { t: 'URL/DOI\n结构化处理', c: T.blue },
  { t: '元数据\n清洗归一', c: T.teal },
  { t: 'IMA知识库\n自动注入', c: T.green },
];
p1Nodes.forEach((n, i) => {
  const ny = 2.5 + i * 0.65;
  flowNode(s2, 0.5, ny, colW - 0.4, 0.5, n.t, T.bgWhite, n.c);
  if (i < 4) arrow(s2, 0.5 + (colW - 0.4) / 2, ny + 0.5, 0.15, n.c);
});
txt(s2, 0.3, 5.9, colW, 0.3, '核心能力：论文摘要 | 关键词 | DOI | 元数据结构化', { size: 9, color: T.txtMid, align: 'center' });
rect(s2, 0.5, 6.2, colW - 0.4, 0.3, { fill: T.green, line: T.green });
txt(s2, 0.5, 6.23, colW - 0.4, 0.25, '状态：已验证通过，稳定运行', { size: 9, bold: true, color: T.txtWhite, align: 'center' });

// 中列：Bing学术路径
rect(s2, 0.3 + colW + 0.1, 2.0, colW, 3.8, { fill: T.bgGray, line: T.blue, lineW: 2 });
subTitle(s2, 0.3 + colW + 0.1, 2.0, colW, '路径二：Bing学术搜索', T.blue);
const p2Nodes = [
  { t: 'Bing学术\n检索入口', c: T.blue },
  { t: '英文文献\n摘要抓取', c: T.blue },
  { t: '跨语言\n翻译融合', c: T.purple },
  { t: '元数据\n结构对齐', c: T.teal },
  { t: 'IMA知识库\n补充注入', c: T.green },
];
p2Nodes.forEach((n, i) => {
  const ny = 2.5 + i * 0.65;
  flowNode(s2, 0.5 + colW + 0.1, ny, colW - 0.4, 0.5, n.t, T.bgWhite, n.c);
  if (i < 4) arrow(s2, 0.5 + colW + 0.1 + (colW - 0.4) / 2, ny + 0.5, 0.15, n.c);
});
txt(s2, 0.3 + colW + 0.1, 5.9, colW, 0.3, '核心能力：国际文献 | 英文元数据 | 跨语言融合', { size: 9, color: T.txtMid, align: 'center' });
rect(s2, 0.5 + colW + 0.1, 6.2, colW - 0.4, 0.3, { fill: T.blue, line: T.blue });
txt(s2, 0.5 + colW + 0.1, 6.23, colW - 0.4, 0.25, '状态：可行性确认，待接入', { size: 9, bold: true, color: T.txtWhite, align: 'center' });

// 右列：数据对比
rect(s2, 0.3 + colW * 2 + 0.2, 2.0, colW, 3.8, { fill: T.bgGray, line: T.teal, lineW: 2 });
subTitle(s2, 0.3 + colW * 2 + 0.2, 2.0, colW, '双路径对比数据', T.teal);

// 数据对比表格
const compareData = [
  ['指标', '中国科技云', 'Bing学术'],
  ['覆盖范围', '中文文献为主', '英文文献为主'],
  ['数据类型', '摘要/关键词/URL', '摘要/引用/作者'],
  ['更新频率', '实时爬取', '定期同步'],
  ['准确率', '>95%', '>90%'],
  ['接入状态', '已运行', '待接入'],
];
const tbl2 = compareData.map((row, ri) => row.map((cell, ci) => ({
  text: cell,
  options: {
    bold: ri === 0,
    color: ri === 0 ? T.txtWhite : T.txtDark,
    fill: { color: ri === 0 ? T.teal : T.bgWhite },
    fontSize: 9,
  }
})));
s2.addTable(tbl2, {
  x: 0.5 + colW * 2 + 0.2, y: 2.5, w: colW - 0.4,
  fontSize: 9, fontFace: 'Microsoft YaHei',
  border: { type: 'solid', pt: 0.5, color: T.border },
  colW: [1.8, 1.8, 1.8],
  rowH: [0.35, 0.35, 0.35, 0.35, 0.35, 0.35]
});

// 底部汇聚说明
rect(s2, 0.3, 6.0, W - 0.6, 0.5, { fill: 'EBF8FF', line: T.blue, lineW: 1 });
txt(s2, 0.5, 6.08, W - 1, 0.35, '双路径汇聚 → 统一清洗 → 结构化存储 → IMA知识库 → 服务全流程AI应用', { size: 12, bold: true, color: T.blue, align: 'center' });

bottomNote(s2, '中国科技云学术智能体平台爬取方案验证通过，可稳定获取论文摘要、关键词、URL等结构化元数据；同步完成Bing学术爬取可行性确认，构建多源学术知识采集双路径。');

// ============================================================
// 3. 学术文献智能流转闭环
// ============================================================
const s3 = pptx.addSlide(); bgWhite(s3);
titleBar(s3, '1.2 学术文献智能流转闭环', '从人工爬取到智能报告，全流程自动化升级');
tabBar(s3, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 1);

subTitle(s3, 0.3, 1.5, W - 0.6, '1.2.1 三模式对比与闭环流程', T.navy);

// 三列对比
const cW = (W - 0.8) / 3;
// 传统手工
rect(s3, 0.3, 2.0, cW, 2.8, { fill: T.bgGray, line: T.red, lineW: 2 });
subTitle(s3, 0.3, 2.0, cW, '传统手工模式', T.red);
const tradItems = ['人工检索下载', '手动整理分类', '逐篇阅读提炼', '人工编写报告'];
tradItems.forEach((item, i) => {
  flowNode(s3, 0.5, 2.5 + i * 0.55, cW - 0.4, 0.45, item, T.bgWhite, T.red);
  if (i < 3) arrow(s3, 0.5 + (cW - 0.4) / 2, 2.95 + i * 0.55, 0.1, T.red);
});
rect(s3, 0.5, 4.9, cW - 0.4, 0.3, { fill: T.red, line: T.red });
txt(s3, 0.5, 4.93, cW - 0.4, 0.25, '耗时：4-8小时/10篇', { size: 9, bold: true, color: T.txtWhite, align: 'center' });

// WorkBuddy自动化
rect(s3, 0.3 + cW + 0.1, 2.0, cW, 2.8, { fill: T.bgGray, line: T.gold, lineW: 2 });
subTitle(s3, 0.3 + cW + 0.1, 2.0, cW, 'WorkBuddy 自动化', T.gold);
const wbItems = ['粘贴/上传文献', 'AI自动清洗提取', '智能分类标签', '自动传入IMA'];
wbItems.forEach((item, i) => {
  flowNode(s3, 0.5 + cW + 0.1, 2.5 + i * 0.55, cW - 0.4, 0.45, item, T.bgWhite, T.gold);
  if (i < 3) arrow(s3, 0.5 + cW + 0.1 + (cW - 0.4) / 2, 2.95 + i * 0.55, 0.1, T.gold);
});
rect(s3, 0.5 + cW + 0.1, 4.9, cW - 0.4, 0.3, { fill: T.gold, line: T.gold });
txt(s3, 0.5 + cW + 0.1, 4.93, cW - 0.4, 0.25, '耗时：5分钟/10篇', { size: 9, bold: true, color: T.txtWhite, align: 'center' });

// IMA知识库
rect(s3, 0.3 + cW * 2 + 0.2, 2.0, cW, 2.8, { fill: T.bgGray, line: T.blue, lineW: 2 });
subTitle(s3, 0.3 + cW * 2 + 0.2, 2.0, cW, 'IMA 知识库', T.blue);
const imaItems = ['文件上传通道', 'URL导入通道', '笔记创建通道', '结构化文献库'];
imaItems.forEach((item, i) => {
  flowNode(s3, 0.5 + cW * 2 + 0.2, 2.5 + i * 0.55, cW - 0.4, 0.45, item, T.bgWhite, T.blue);
  if (i < 3) arrow(s3, 0.5 + cW * 2 + 0.2 + (cW - 0.4) / 2, 2.95 + i * 0.55, 0.1, T.blue);
});
rect(s3, 0.5 + cW * 2 + 0.2, 4.9, cW - 0.4, 0.3, { fill: T.blue, line: T.blue });
txt(s3, 0.5 + cW * 2 + 0.2, 4.93, cW - 0.4, 0.25, '状态：全自动入库', { size: 9, bold: true, color: T.txtWhite, align: 'center' });

// 流转箭头
arrow(s3, 0.3 + cW, 3.4, 0.08, T.gold);
arrow(s3, 0.3 + cW * 2 + 0.1, 3.4, 0.08, T.gold);

// 闭环回流
rect(s3, 0.3, 5.0, W - 0.6, 1.2, { fill: 'EBF8FF', line: T.blue, lineW: 1 });
txt(s3, 0.5, 5.05, W - 1, 0.3, '闭环回流：WorkBuddy ↔ IMA 知识库双向联动', { size: 13, bold: true, color: T.blue });

const loopSteps = [
  { t: '1 发起分析', c: T.blue },
  { t: '2 检索IMA', c: T.teal },
  { t: '3 AI分析整合', c: T.gold },
  { t: '4 输出报告', c: T.green },
];
loopSteps.forEach((s, i) => {
  const x = 1.0 + i * 3.0;
  rect(s3, x, 5.45, 2.0, 0.5, { fill: s.c, line: s.c });
  txt(s3, x, 5.5, 2.0, 0.4, s.t, { size: 11, bold: true, color: T.txtWhite, align: 'center', valign: 'middle' });
  if (i < 3) arrow(s3, x + 2.0, 5.7, 0.95, T.blue);
});
txt(s3, 8.5, 6.05, 4.2, 0.25, '→ 成果归档IMA → 下次复用', { size: 10, bold: true, color: T.teal, align: 'right' });

bottomNote(s3, '文献处理效率提升10倍（4-8小时→5分钟），知识零遗漏100%自动入库，闭环回流形成知识资产持续沉淀。');

// ============================================================
// 4. 全流程概览
// ============================================================
const s4 = pptx.addSlide(); bgWhite(s4);
titleBar(s4, '2. 科技项目全流程 AI应用概览', '5大环节 × 智能化升级路径');
tabBar(s4, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 2);

subTitle(s4, 0.3, 1.5, W - 0.6, '2.1 五大环节AI应用全景', T.navy);

// 5环节流程图
const steps = [
  { n: '申报简表', c: T.blue, ai: 'AI框架搭建\n会议流程优化', time: '2-3天→0.5天', eff: '↓83%' },
  { n: '指南编写', c: T.teal, ai: '政策智能对齐\n内容自动生成', time: '1周→1-2天', eff: '↑5x' },
  { n: '可研报告', c: T.gold, ai: '全量自动生成\n图表嵌入', time: '2周→2天', eff: '↑7x' },
  { n: '技术报告', c: T.blue, ai: '深度知识生成\n规则库设计', time: '2周→1-2天', eff: '↑10x' },
  { n: 'Demo原型', c: T.teal, ai: '代码自动生成\n可视化组件', time: '2周→3天', eff: '↓85%' },
];

line(s4, 1.0, 2.8, W - 2, { color: T.blue, width: 2 });
steps.forEach((step, i) => {
  const x = 0.5 + i * 2.5;
  // 圆形节点
  rect(s4, x + 0.55, 1.8, 1.4, 1.4, { fill: step.c, line: step.c, radius: 0.7 });
  txt(s4, x + 0.55, 2.0, 1.4, 1.0, step.n, { size: 12, bold: true, color: T.txtWhite, align: 'center', valign: 'middle' });
  // AI应用
  rect(s4, x + 0.2, 3.35, 2.1, 0.7, { fill: T.bgGray, line: step.c, lineW: 1 });
  txt(s4, x + 0.2, 3.4, 2.1, 0.6, step.ai, { size: 9, color: T.txtMid, align: 'center' });
  // 效率
  rect(s4, x + 0.2, 4.15, 2.1, 0.35, { fill: step.c, line: step.c });
  txt(s4, x + 0.2, 4.18, 2.1, 0.3, step.eff, { size: 11, bold: true, color: T.txtWhite, align: 'center' });
  // 时间
  txt(s4, x + 0.2, 4.55, 2.1, 0.25, step.time, { size: 9, color: T.txtMid, align: 'center' });
  if (i < 4) arrow(s4, x + 1.95, 2.5, 0.5, T.blue);
});

// 知识库支撑条
rect(s4, 0.3, 5.0, W - 0.6, 0.5, { fill: 'EBF8FF', line: T.blue, lineW: 1 });
txt(s4, 0.5, 5.08, W - 1, 0.35, 'AI知识生产基础库（中国科技云 + Bing学术） → IMA知识库 → 全流程知识注入与复用', { size: 12, bold: true, color: T.blue, align: 'center' });

// 底部效率对比表
rect(s4, 0.3, 5.7, W - 0.6, 1.4, { fill: T.bgGray, line: T.border, lineW: 1 });
txt(s4, 0.5, 5.75, 4, 0.3, '各环节效率对比', { size: 13, bold: true, color: T.navy });
const tbl4 = [
  [{ text: '环节', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '传统模式', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: 'AI模式', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '效率提升', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '质量改善', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '扩展潜力', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } }],
  ['申报简表', '2-3天', '0.5天', '↓83%', '通过率80%', '智能查重'],
  ['指南编写', '1周', '1-2天', '↑5x', '对齐度95%', 'A/B测试'],
  ['可研报告', '2周', '2天', '↑7x', '图表22张', '模板复用'],
  ['技术报告', '2周', '1-2天', '↑10x', '140规则', '知识复用'],
  ['Demo原型', '2周', '3天', '↑85%', '交互可视化', '组件市场'],
];
s4.addTable(tbl4, {
  x: 0.5, y: 6.1, w: W - 1,
  fontSize: 9, fontFace: 'Microsoft YaHei',
  color: T.txtDark,
  border: { type: 'solid', pt: 0.5, color: T.border },
  colW: [1.5, 1.5, 1.5, 1.2, 1.5, 2.0],
  fill: { color: T.bgWhite },
  rowH: [0.32, 0.32, 0.32, 0.32, 0.32, 0.32]
});

// ============================================================
// 5. 申报简表
// ============================================================
const s5 = pptx.addSlide(); bgWhite(s5);
titleBar(s5, '3.1 申报简表 — AI辅助框架搭建', '从2-3天缩短至0.5天，一次通过率80%');
tabBar(s5, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 3);

subTitle(s5, 0.3, 1.5, W - 0.6, '3.1.1 AI辅助会议三阶段流程', T.navy);

// 三列：Phase1/2/3
const pW = (W - 0.8) / 3;
const phases5 = [
  { t: 'Phase 1 需求调研', sub: '技术方向确认\n目标与资源梳理', tools: 'WorkBuddy+IMA', c: T.blue },
  { t: 'Phase 2 AI智能生成', sub: '需求→简表框架\n多版本迭代', tools: 'WorkBuddy+WebSearch', c: T.gold },
  { t: 'Phase 3 专家评审', sub: '可行性/创新性评估\nAI辅助修改→终稿', tools: 'WorkBuddy+IMA', c: T.green },
];
phases5.forEach((p, i) => {
  const x = 0.3 + i * (pW + 0.1);
  rect(s5, x, 2.0, pW, 2.5, { fill: T.bgGray, line: p.c, lineW: 2 });
  rect(s5, x, 2.0, pW, 0.4, { fill: p.c, line: p.c });
  txt(s5, x, 2.05, pW, 0.3, p.t, { size: 12, bold: true, color: T.txtWhite, align: 'center' });
  txt(s5, x + 0.1, 2.55, pW - 0.2, 0.6, p.sub, { size: 10, color: T.txtMid, align: 'center' });
  rect(s5, x + 0.2, 3.3, pW - 0.4, 0.3, { fill: p.c, line: p.c });
  txt(s5, x + 0.2, 3.33, pW - 0.4, 0.25, p.tools, { size: 9, bold: true, color: T.txtWhite, align: 'center' });
  if (i < 2) arrow(s5, x + pW, 3.25, 0.08, T.gold);
});

// 下半部分三列详情
rect(s5, 0.3, 4.7, pW, 2.2, { fill: T.bgWhite, line: T.blue, lineW: 1 });
txt(s5, 0.4, 4.8, pW - 0.2, 0.3, 'AI应用场景', { size: 12, bold: true, color: T.blue });
const app5 = [
  '▸ 输入核心要点→AI自动生成简表框架',
  '▸ 多版本快速迭代：10分钟×3版',
  '▸ 关键词与指标智能匹配',
  '▸ 历史简表模板库复用率70%+',
  '▸ AI解析评分标准与申报要求',
];
app5.forEach((v, i) => txt(s5, 0.4, 5.15 + i * 0.32, pW - 0.2, 0.28, v, { size: 9, color: T.txtMid }));

rect(s5, 0.3 + pW + 0.1, 4.7, pW, 2.2, { fill: T.bgWhite, line: T.gold, lineW: 1 });
txt(s5, 0.4 + pW + 0.1, 4.8, pW - 0.2, 0.3, '核心成果', { size: 12, bold: true, color: T.gold });
const res5 = [
  '▸ 起草时间：2-3天 → 0.5天（↓83%）',
  '▸ 一次通过率：80%（历史均值50%）',
  '▸ AI工具：WorkBuddy + IMA + WebSearch',
  '▸ 智能查重：自动比对已申报项目',
  '▸ 相似项目推荐：基于知识库匹配',
];
res5.forEach((v, i) => txt(s5, 0.4 + pW + 0.1, 5.15 + i * 0.32, pW - 0.2, 0.28, v, { size: 9, color: T.txtMid }));

rect(s5, 0.3 + pW * 2 + 0.2, 4.7, pW, 2.2, { fill: T.bgWhite, line: T.teal, lineW: 1 });
txt(s5, 0.4 + pW * 2 + 0.2, 4.8, pW - 0.2, 0.3, '扩展AI应用', { size: 12, bold: true, color: T.teal });
const ext5 = [
  '▸ 评审模拟：AI预评审+评分预测',
  '▸ 竞争分析：同批次优劣势对比',
  '▸ 申报策略优化：历史数据推荐',
  '▸ 自动合规检查：格式/指标校验',
  '▸ 多语言申报：中英双语自动生成',
];
ext5.forEach((v, i) => txt(s5, 0.4 + pW * 2 + 0.2, 5.15 + i * 0.32, pW - 0.2, 0.28, v, { size: 9, color: T.teal }));

bottomNote(s5, 'AI擅长快速提炼和结构化，核心创新点需人工把关；模板库越完善AI效果越好，当前模板复用率已达70%以上。');

// ============================================================
// 6. 指南编写
// ============================================================
const s6 = pptx.addSlide(); bgWhite(s6);
titleBar(s6, '3.2 指南编写 — 政策对齐与内容智能生成', '编写效率提升5倍，政策对齐度显著提高');
tabBar(s6, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 4);

subTitle(s6, 0.3, 1.5, W - 0.6, '3.2.1 政策对齐六步流程', T.navy);

// 六步流程横向
const gW = (W - 0.8) / 6;
const guideFlow = [
  { t: '政策文档\n输入', c: T.blue },
  { t: 'AI解析\n评分标准', c: T.gold },
  { t: '技术方向\n智能梳理', c: T.teal },
  { t: '框架草案\n自动生成', c: T.blue },
  { t: '多轮审校\n政策对齐', c: T.gold },
  { t: '终稿\n输出', c: T.green },
];
guideFlow.forEach((n, i) => {
  const x = 0.3 + i * gW;
  rect(s6, x, 2.0, gW - 0.05, 1.2, { fill: T.bgGray, line: n.c, lineW: 2 });
  txt(s6, x, 2.1, gW - 0.05, 0.9, n.t, { size: 10, bold: true, color: n.c, align: 'center', valign: 'middle' });
  if (i < 5) arrow(s6, x + gW - 0.05, 2.6, 0.08, n.c);
});

// IMA支撑条
rect(s6, 0.3, 3.4, W - 0.6, 0.4, { fill: 'EBF8FF', line: T.blue, lineW: 1 });
txt(s6, 0.5, 3.45, W - 1, 0.3, 'IMA知识库支撑：历史指南比对 | 最新政策检索 | 行业标准对齐 | 技术趋势分析', { size: 11, bold: true, color: T.blue, align: 'center' });

// 三列详情
const gColW = (W - 0.8) / 3;
rect(s6, 0.3, 4.0, gColW, 2.6, { fill: T.bgWhite, line: T.blue, lineW: 1 });
txt(s6, 0.4, 4.1, gColW - 0.2, 0.3, 'AI应用场景', { size: 12, bold: true, color: T.blue });
const app6 = [
  '▸ 政策文档解析→自动提取评分标准',
  '▸ 技术方向梳理→AI生成指南框架',
  '▸ 多轮审校对齐→确保政策一致性',
  '▸ 历史指南库比对→避免重复冲突',
  '▸ AI知识库实时检索最新政策动态',
  '▸ 自动生成章节结构与内容模板',
];
app6.forEach((v, i) => txt(s6, 0.4, 4.45 + i * 0.32, gColW - 0.2, 0.28, v, { size: 9, color: T.txtMid }));

rect(s6, 0.3 + gColW + 0.1, 4.0, gColW, 2.6, { fill: T.bgWhite, line: T.gold, lineW: 1 });
txt(s6, 0.4 + gColW + 0.1, 4.1, gColW - 0.2, 0.3, '核心成果', { size: 12, bold: true, color: T.gold });
const res6 = [
  '▸ 编写效率：提升5倍',
  '▸ 政策对齐度：60%→95%',
  '▸ 多版本对比：3版/小时',
  '▸ AI工具：WorkBuddy+IMA+WebSearch',
  '▸ 案例：智能电网/计量/新型电力系统',
];
res6.forEach((v, i) => txt(s6, 0.4 + gColW + 0.1, 4.45 + i * 0.32, gColW - 0.2, 0.28, v, { size: 9, color: T.txtMid }));

rect(s6, 0.3 + gColW * 2 + 0.2, 4.0, gColW, 2.6, { fill: T.bgWhite, line: T.teal, lineW: 1 });
txt(s6, 0.4 + gColW * 2 + 0.2, 4.1, gColW - 0.2, 0.3, '扩展AI应用', { size: 12, bold: true, color: T.teal });
const ext6 = [
  '▸ 多版本A/B测试：自动对比最优方案',
  '▸ 合规性自动评审：逐项检查匹配度',
  '▸ 专家知识注入：行业经验数字化',
  '▸ 跨区域政策差异：南网vs国网对比',
  '▸ 智能推荐：基于项目特征推荐模板',
];
ext6.forEach((v, i) => txt(s6, 0.4 + gColW * 2 + 0.2, 4.45 + i * 0.32, gColW - 0.2, 0.28, v, { size: 9, color: T.teal }));

bottomNote(s6, '政策合规性必须人工审核，涉密条款尤甚；AI生成的框架需经专家确认后才可定稿。');

// ============================================================
// 7. 可研报告
// ============================================================
const s7 = pptx.addSlide(); bgWhite(s7);
titleBar(s7, '3.3 可研报告 — 全量自动化生成', '脚本化 > 对话式，一次编写多次复用');
tabBar(s7, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 5);

subTitle(s7, 0.3, 1.5, W - 0.6, '3.3.1 数据→图表→报告全链路自动化', T.navy);

// 五步全链路
const rW = (W - 0.8) / 5;
const reportFlow = [
  { t: '原始数据\n输入', sub: '实验数据/调研\n文献/规则库', c: T.blue },
  { t: '数据分析\nmatplotlib', sub: '68维特征\nPCA/t-SNE', c: T.gold },
  { t: '图表自动\n生成22张', sub: '分布/热力\n相关性/趋势', c: T.teal },
  { t: 'docx-js\n脚本生成', sub: '6章结构\n文献+附录', c: T.blue },
  { t: '报告\n输出', sub: '1.35MB\n100+页', c: T.green },
];
reportFlow.forEach((n, i) => {
  const x = 0.3 + i * rW;
  rect(s7, x, 2.0, rW - 0.05, 1.8, { fill: T.bgGray, line: n.c, lineW: 2 });
  txt(s7, x, 2.1, rW - 0.05, 0.6, n.t, { size: 11, bold: true, color: n.c, align: 'center', valign: 'middle' });
  txt(s7, x + 0.05, 2.8, rW - 0.15, 0.7, n.sub, { size: 9, color: T.txtMid, align: 'center' });
  if (i < 4) arrow(s7, x + rW - 0.05, 2.9, 0.08, n.c);
});

// IMA支撑
rect(s7, 0.3, 4.0, W - 0.6, 0.4, { fill: 'EBF8FF', line: T.gold, lineW: 1 });
txt(s7, 0.5, 4.05, W - 1, 0.3, 'IMA知识库支撑：文献综述自动引用 | 规则库数据注入 | 历史报告模板复用 | 技术标准关联', { size: 11, bold: true, color: T.gold, align: 'center' });

// 三列
const rColW = (W - 0.8) / 3;
rect(s7, 0.3, 4.6, rColW, 2.2, { fill: T.bgWhite, line: T.blue, lineW: 1 });
txt(s7, 0.4, 4.7, rColW - 0.2, 0.3, 'AI应用场景', { size: 12, bold: true, color: T.blue });
const app7 = [
  '▸ docx-js脚本自动生成完整报告',
  '▸ 22张matplotlib图表自动嵌入',
  '▸ 6章+20文献+3附录深度编排',
  '▸ 数据→分析→图表→文字全链路',
  '▸ 可研预算自动估算与校验',
];
app7.forEach((v, i) => txt(s7, 0.4, 5.05 + i * 0.32, rColW - 0.2, 0.28, v, { size: 9, color: T.txtMid }));

rect(s7, 0.3 + rColW + 0.1, 4.6, rColW, 2.2, { fill: T.bgWhite, line: T.gold, lineW: 1 });
txt(s7, 0.4 + rColW + 0.1, 4.7, rColW - 0.2, 0.3, '核心成果', { size: 12, bold: true, color: T.gold });
const res7 = [
  '▸ 报告规模：1.35MB（6章+20文献+3附录）',
  '▸ 图表数量：22张自动嵌入',
  '▸ 生成时间：2周→2天（↑7x）',
  '▸ AI工具：docx-js+matplotlib+WorkBuddy',
  '▸ 脚本复用：一次编写多项目适配',
];
res7.forEach((v, i) => txt(s7, 0.4 + rColW + 0.1, 5.05 + i * 0.32, rColW - 0.2, 0.28, v, { size: 9, color: T.txtMid }));

rect(s7, 0.3 + rColW * 2 + 0.2, 4.6, rColW, 2.2, { fill: T.bgWhite, line: T.teal, lineW: 1 });
txt(s7, 0.4 + rColW * 2 + 0.2, 4.7, rColW - 0.2, 0.3, '扩展AI应用', { size: 12, bold: true, color: T.teal });
const ext7 = [
  '▸ 多项目模板复用：不同项目自动适配',
  '▸ 自动校审：格式/编号/引用一致性',
  '▸ 可研指标自动计算：ROI/回收期',
  '▸ 风险评估矩阵：技术/市场风险',
  '▸ 同行评审模拟：AI预判关注点',
];
ext7.forEach((v, i) => txt(s7, 0.4 + rColW * 2 + 0.2, 5.05 + i * 0.32, rColW - 0.2, 0.28, v, { size: 9, color: T.teal }));

bottomNote(s7, '脚本化>对话式，一次编写脚本可多次复用迭代；数据→图表→文字全链路自动化是最大突破。');

// ============================================================
// 8. 技术研究报告
// ============================================================
const s8 = pptx.addSlide(); bgWhite(s8);
titleBar(s8, '3.4 技术研究报告 — 深度生成与知识库沉淀', '效率提升10倍，脚本化+图表+知识库形成闭环');
tabBar(s8, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 6);

subTitle(s8, 0.3, 1.5, W - 0.6, '3.4.1 三层级规则库与模型推导', T.navy);

// 三层级规则库
const tW = (W - 0.8) / 3;
const ruleLevels = [
  { t: '单元级规则 87条', sub: '终端/表计\n单设备故障诊断', c: T.blue },
  { t: '设备级规则 34条', sub: '多参数关联\n健康状态评估', c: T.gold },
  { t: '台区级规则 19条', sub: '区域级故障\n定位与预警', c: T.teal },
];
ruleLevels.forEach((r, i) => {
  const x = 0.3 + i * (tW + 0.1);
  rect(s8, x, 2.0, tW, 1.5, { fill: T.bgGray, line: r.c, lineW: 2 });
  rect(s8, x, 2.0, tW, 0.4, { fill: r.c, line: r.c });
  txt(s8, x, 2.05, tW, 0.3, r.t, { size: 12, bold: true, color: T.txtWhite, align: 'center' });
  txt(s8, x + 0.1, 2.55, tW - 0.2, 0.7, r.sub, { size: 10, color: T.txtMid, align: 'center' });
  if (i < 2) arrow(s8, x + tW, 2.75, 0.08, T.gold);
});

// 模型推导+知识沉淀
rect(s8, 0.3, 3.7, 6.0, 1.0, { fill: T.bgWhite, line: T.blue, lineW: 1 });
txt(s8, 0.4, 3.75, 5.6, 0.25, '模型推导流程', { size: 11, bold: true, color: T.blue });
const modelFlow = ['数据收集', '特征工程', 'CHI/Arrhenius\n模型推导', '规则提取', '报告生成'];
modelFlow.forEach((m, i) => {
  const x = 0.5 + i * 1.1;
  flowNode(s8, x, 4.1, 1.0, 0.45, m, T.bgGray, T.blue);
  if (i < 4) arrow(s8, x + 1.0, 4.32, 0.08, T.blue);
});

rect(s8, 6.9, 3.7, 5.6, 1.0, { fill: T.bgWhite, line: T.teal, lineW: 1 });
txt(s8, 7.0, 3.75, 5.2, 0.25, '知识沉淀闭环', { size: 11, bold: true, color: T.teal });
const kFlow = ['技术报告', 'IMA归档', '知识复用', '新项目注入', '持续迭代'];
kFlow.forEach((m, i) => {
  const x = 7.1 + i * 1.05;
  flowNode(s8, x, 4.1, 0.9, 0.45, m, T.bgGray, T.teal);
  if (i < 4) arrow(s8, x + 0.9, 4.32, 0.12, T.teal);
});

// 三列详情
rect(s8, 0.3, 4.9, tW, 2.0, { fill: T.bgWhite, line: T.blue, lineW: 1 });
txt(s8, 0.4, 5.0, tW - 0.2, 0.25, 'AI应用场景', { size: 12, bold: true, color: T.blue });
const app8 = [
  '▸ 140条规则库三层级设计',
  '▸ CHI/Arrhenius模型推导',
  '▸ 技术报告深度生成6章',
  '▸ 知识库沉淀自动归档IMA',
  '▸ 规则冲突检测与校验',
];
app8.forEach((v, i) => txt(s8, 0.4, 5.3 + i * 0.3, tW - 0.2, 0.25, v, { size: 9, color: T.txtMid }));

rect(s8, 0.3 + tW + 0.1, 4.9, tW, 2.0, { fill: T.bgWhite, line: T.gold, lineW: 1 });
txt(s8, 0.4 + tW + 0.1, 5.0, tW - 0.2, 0.25, '核心成果', { size: 12, bold: true, color: T.gold });
const res8 = [
  '▸ 规则库：140条（三层级完整）',
  '▸ 报告效率：提升10倍',
  '▸ 知识沉淀：IMA自动归档',
  '▸ 案例：终端/表计/台区诊断',
];
res8.forEach((v, i) => txt(s8, 0.4 + tW + 0.1, 5.3 + i * 0.3, tW - 0.2, 0.25, v, { size: 9, color: T.txtMid }));

rect(s8, 0.3 + tW * 2 + 0.2, 4.9, tW, 2.0, { fill: T.bgWhite, line: T.teal, lineW: 1 });
txt(s8, 0.4 + tW * 2 + 0.2, 5.0, tW - 0.2, 0.25, '扩展AI应用', { size: 12, bold: true, color: T.teal });
const ext8 = [
  '▸ 规则自动发现：数据挖掘新规则',
  '▸ 跨项目知识复用：技术自动迁移',
  '▸ 技术评审自动化：AI预审',
  '▸ 模型迭代优化：新数据→更新',
];
ext8.forEach((v, i) => txt(s8, 0.4 + tW * 2 + 0.2, 5.3 + i * 0.3, tW - 0.2, 0.25, v, { size: 9, color: T.teal }));

bottomNote(s8, '脚本化+图表+知识库形成完整闭环；技术深度内容AI辅助但核心推导需专家把关。');

// ============================================================
// 9. Demo原型设计
// ============================================================
const s9 = pptx.addSlide(); bgWhite(s9);
titleBar(s9, '3.5 Demo原型设计 — 代码生成与可视化组件', '原型周期2周→3天，周报已全自动化');
tabBar(s9, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 7);

subTitle(s9, 0.3, 1.5, W - 0.6, '3.5.1 AI代码生成五步法', T.navy);

// 五步流程
const dW = (W - 0.8) / 5;
const demoFlow = [
  { t: '需求描述\n输入', sub: '功能/交互\n可视化要求', c: T.blue },
  { t: 'AI代码\n生成', sub: 'HTML/CSS/JS\nChart.js', c: T.gold },
  { t: '原型\n验证', sub: '浏览器预览\n交互测试', c: T.teal },
  { t: '迭代\n优化', sub: '调试/美化\n功能完善', c: T.blue },
  { t: '交付\n部署', sub: '在线演示\n文件分发', c: T.green },
];
demoFlow.forEach((n, i) => {
  const x = 0.3 + i * dW;
  rect(s9, x, 2.0, dW - 0.05, 1.5, { fill: T.bgGray, line: n.c, lineW: 2 });
  txt(s9, x, 2.1, dW - 0.05, 0.6, n.t, { size: 11, bold: true, color: n.c, align: 'center', valign: 'middle' });
  txt(s9, x + 0.05, 2.8, dW - 0.15, 0.5, n.sub, { size: 9, color: T.txtMid, align: 'center' });
  if (i < 4) arrow(s9, x + dW - 0.05, 2.75, 0.08, n.c);
});

// IDP + 周报
rect(s9, 0.3, 3.7, 6.0, 0.9, { fill: T.bgWhite, line: T.blue, lineW: 1 });
txt(s9, 0.4, 3.75, 5.6, 0.25, 'IDP可视化系统（idp_v3.html）', { size: 11, bold: true, color: T.blue });
const idpFlow = ['12人数据', '技能雷达图', '发展路径', '目标追踪', 'HTML周报'];
idpFlow.forEach((m, i) => {
  const x = 0.5 + i * 1.1;
  flowNode(s9, x, 4.1, 1.0, 0.35, m, T.bgGray, T.blue);
  if (i < 4) arrow(s9, x + 1.0, 4.27, 0.08, T.blue);
});

rect(s9, 6.9, 3.7, 5.6, 0.9, { fill: T.bgWhite, line: T.teal, lineW: 1 });
txt(s9, 7.0, 3.75, 5.2, 0.25, '周报自动化系统', { size: 11, bold: true, color: T.teal });
const weekFlow = ['数据汇总', 'AI生成', 'HTML格式', '邮件分发', '自动归档'];
weekFlow.forEach((m, i) => {
  const x = 7.1 + i * 1.05;
  flowNode(s9, x, 4.1, 0.9, 0.35, m, T.bgGray, T.teal);
  if (i < 4) arrow(s9, x + 0.9, 4.27, 0.12, T.teal);
});

// 三列
const dColW = (W - 0.8) / 3;
rect(s9, 0.3, 4.8, dColW, 2.0, { fill: T.bgWhite, line: T.blue, lineW: 1 });
txt(s9, 0.4, 4.9, dColW - 0.2, 0.25, 'AI应用场景', { size: 12, bold: true, color: T.blue });
const app9 = [
  '▸ IDP可视化：个人发展路径',
  '▸ 周报HTML自动分发',
  '▸ Chart.js动态图表',
  '▸ 原型快速迭代',
  '▸ 设计规范统一沉淀',
];
app9.forEach((v, i) => txt(s9, 0.4, 5.2 + i * 0.3, dColW - 0.2, 0.25, v, { size: 9, color: T.txtMid }));

rect(s9, 0.3 + dColW + 0.1, 4.8, dColW, 2.0, { fill: T.bgWhite, line: T.gold, lineW: 1 });
txt(s9, 0.4 + dColW + 0.1, 4.9, dColW - 0.2, 0.25, '核心成果', { size: 12, bold: true, color: T.gold });
const res9 = [
  '▸ 原型周期：2周→3天（↓85%）',
  '▸ 周报自动化：100%无人干预',
  '▸ IDP系统：12人团队全覆盖',
  '▸ AI工具：WorkBuddy+HTML/JS',
];
res9.forEach((v, i) => txt(s9, 0.4 + dColW + 0.1, 5.2 + i * 0.3, dColW - 0.2, 0.25, v, { size: 9, color: T.txtMid }));

rect(s9, 0.3 + dColW * 2 + 0.2, 4.8, dColW, 2.0, { fill: T.bgWhite, line: T.teal, lineW: 1 });
txt(s9, 0.4 + dColW * 2 + 0.2, 4.9, dColW - 0.2, 0.25, '扩展AI应用', { size: 12, bold: true, color: T.teal });
const ext9 = [
  '▸ 交互式Demo：用户测试',
  '▸ 在线评审：远程协作',
  '▸ 多端适配：PC/移动端',
  '▸ 组件市场：通用库复用',
];
ext9.forEach((v, i) => txt(s9, 0.4 + dColW * 2 + 0.2, 5.2 + i * 0.3, dColW - 0.2, 0.25, v, { size: 9, color: T.teal }));

bottomNote(s9, 'AI前端原型效果最好，复杂业务逻辑仍需调试；HTML周报格式是邮件分发的最佳实践。');

// ============================================================
// 10. 核心成果数据
// ============================================================
const s10 = pptx.addSlide(); bgWhite(s10);
titleBar(s10, '4. 核心成果数据', '效率提升与质量改善量化指标');
tabBar(s10, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 8);

subTitle(s10, 0.3, 1.5, W - 0.6, '4.1 五大核心KPI', T.navy);

// 5大KPI卡片
const kpis = [
  { n: '10x', l: '技术报告', d: '生成效率提升', c: T.gold },
  { n: '83%', l: '申报简表', d: '起草时间缩短', c: T.blue },
  { n: '5x', l: '指南编写', d: '编写效率提升', c: T.teal },
  { n: '7x', l: '可研报告', d: '生成效率提升', c: T.gold },
  { n: '85%', l: 'Demo原型', d: '开发周期缩短', c: T.blue },
];
kpis.forEach((kpi, i) => {
  const x = 0.3 + i * 2.52;
  rect(s10, x, 2.0, 2.25, 1.5, { fill: T.bgGray, line: kpi.c, lineW: 2 });
  txt(s10, x, 2.15, 2.25, 0.5, kpi.n, { size: 28, bold: true, color: kpi.c, align: 'center' });
  txt(s10, x, 2.7, 2.25, 0.3, kpi.l, { size: 12, bold: true, color: T.txtDark, align: 'center' });
  txt(s10, x, 3.0, 2.25, 0.25, kpi.d, { size: 9, color: T.txtMid, align: 'center' });
});

// 效率对比表
rect(s10, 0.3, 3.8, W - 0.6, 3.0, { fill: T.bgWhite, line: T.border, lineW: 1 });
txt(s10, 0.5, 3.9, 8, 0.3, '各环节效率对比详表', { size: 14, bold: true, color: T.navy });

const tbl10 = [
  [{ text: '环节', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '传统模式', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: 'AI辅助模式', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '效率提升', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '质量改善', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } },
   { text: '扩展潜力', options: { bold: true, color: T.txtWhite, fill: { color: T.navy } } }],
  ['申报简表', '2-3天', '0.5天', '↓83%', '通过率80%', '智能查重+评审模拟'],
  ['指南编写', '1周', '1-2天', '↑5x', '对齐度95%', 'A/B测试+自动评审'],
  ['可研报告', '2周', '2天', '↑7x', '图表22张', '模板复用+自动校审'],
  ['技术报告', '2周', '1-2天', '↑10x', '140规则', '知识复用+规则发现'],
  ['Demo原型', '2周', '3天', '↑85%', '交互可视化', '组件市场+在线评审'],
];
s10.addTable(tbl10, {
  x: 0.5, y: 4.3, w: W - 1,
  fontSize: 10, fontFace: 'Microsoft YaHei',
  color: T.txtDark,
  border: { type: 'solid', pt: 0.5, color: T.border },
  colW: [1.6, 1.6, 1.6, 1.3, 1.6, 2.5],
  fill: { color: T.bgWhite },
  rowH: [0.38, 0.38, 0.38, 0.38, 0.38, 0.38]
});

// ============================================================
// 11. 实践心得
// ============================================================
const s11 = pptx.addSlide(); bgWhite(s11);
titleBar(s11, '4.2 实践心得', '6条核心经验总结');
tabBar(s11, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 8);

subTitle(s11, 0.3, 1.5, W - 0.6, '4.2.1 六条核心经验', T.navy);

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
  const x = 0.3 + col * 4.2;
  const y = 2.0 + row * 2.4;
  rect(s11, x, y, 3.9, 2.1, { fill: T.bgGray, line: ins.c, lineW: 2 });
  rect(s11, x, y, 0.6, 0.5, { fill: ins.c, line: ins.c });
  txt(s11, x, y + 0.05, 0.6, 0.4, ins.n, { size: 14, bold: true, color: T.txtWhite, align: 'center', valign: 'middle' });
  txt(s11, x + 0.7, y + 0.1, 3.0, 0.35, ins.t, { size: 13, bold: true, color: T.txtDark });
  txt(s11, x + 0.1, y + 0.6, 3.7, 1.3, ins.d, { size: 9, color: T.txtMid });
});

rect(s11, 0.3, 6.8, W - 0.6, 0.5, { fill: T.navy, line: T.navy });
txt(s11, 0.5, 6.88, W - 1, 0.35, '"真正的变化不是工具，而是工作流的重新定义"', { size: 14, bold: true, color: T.gold, align: 'center' });

// ============================================================
// 12. 规划展望
// ============================================================
const s12 = pptx.addSlide(); bgWhite(s12);
titleBar(s12, '4.3 规划展望', '三阶段深化路径');
tabBar(s12, ['知识库构建', '学术文献流转', '全流程概览', '申报简表', '指南编写', '可研报告', '技术报告', 'Demo原型', '成果展望'], 8);

subTitle(s12, 0.3, 1.5, W - 0.6, '4.3.1 三阶段深化路径', T.navy);

const phases = [
  { t: '深化阶段', time: '2026 Q3', items: ['可研报告脚本全面标准化', 'PPT生成脚本模板库建设', '技术报告自动生成优化', '知识库双路径全面接入', '申报简表智能查重上线'], c: T.blue },
  { t: '拓展阶段', time: '2026 Q4', items: ['跨项目知识库互联互通', '团队AI能力培训体系', '多区域项目协同模板', '智能评审辅助工具', '指南编写自动评审系统'], c: T.teal },
  { t: '固化阶段', time: '2027', items: ['全流程自动化流水线', 'AI辅助决策支持系统', '知识资产持续沉淀', '团队AI成熟度评估', '行业最佳实践输出'], c: T.gold },
];

phases.forEach((phase, i) => {
  const x = 0.3 + i * 4.2;
  rect(s12, x, 2.0, 3.9, 3.5, { fill: T.bgGray, line: phase.c, lineW: 2 });
  rect(s12, x, 2.0, 3.9, 0.5, { fill: phase.c, line: phase.c });
  txt(s12, x, 2.08, 3.9, 0.35, phase.t, { size: 16, bold: true, color: T.txtWhite, align: 'center' });
  txt(s12, x, 2.55, 3.9, 0.25, phase.time, { size: 11, color: phase.c, align: 'center' });
  phase.items.forEach((item, j) => {
    txt(s12, x + 0.2, 3.0 + j * 0.5, 3.5, 0.45, (j + 1) + '. ' + item, { size: 10, color: T.txtMid });
  });
});

// 时间线
line(s12, 1.5, 5.8, W - 2, { color: T.blue, width: 2 });
['2026 Q3', '2026 Q4', '2027'].forEach((t, i) => {
  const x = 2.5 + i * 3.5;
  rect(s12, x, 5.65, 0.3, 0.3, { fill: T.blue, line: T.blue });
  txt(s12, x - 0.3, 6.0, 0.9, 0.25, t, { size: 10, color: T.txtMid, align: 'center' });
});

// ============================================================
// 13. 结尾
// ============================================================
const s13 = pptx.addSlide(); bgWhite(s13);
rect(s13, 0, 0, W, 1.2, { fill: T.navy });
txt(s13, 0.5, 0.3, W - 1, 0.5, '感谢聆听', { size: 44, bold: true, color: T.txtWhite, align: 'center' });
txt(s13, 0.5, 0.85, W - 1, 0.3, '电网科创业务中心 · AI实践持续推进中', { size: 14, color: T.blueL, align: 'center' });

rect(s13, 2, 2.0, W - 4, 3.5, { fill: T.bgGray, line: T.border, lineW: 1 });
txt(s13, 2.5, 2.3, W - 5, 0.4, '核心总结', { size: 18, bold: true, color: T.navy });
const summary = [
  '✓ AI知识生产基础库：中国科技云+Bing学术双路径',
  '✓ 学术文献智能流转：效率提升10倍，100%自动入库',
  '✓ 5大环节AI应用：申报→指南→可研→技术→Demo',
  '✓ 效率提升：最高10倍，平均5-7倍',
  '✓ 核心心得：脚本化>对话式，知识库是核心基础',
  '✓ 未来规划：深化→拓展→固化三阶段',
];
summary.forEach((s, i) => {
  txt(s13, 2.8, 2.9 + i * 0.45, W - 5.6, 0.35, s, { size: 12, color: T.txtMid });
});

line(s13, 0.5, 6.0, W - 1, { color: T.blue, width: 2 });
txt(s13, 0.5, 6.2, W - 1, 0.3, 'AI知识生产基础库 → WorkBuddy × IMA 联动方案', { size: 14, color: T.blue, align: 'center' });

// ============================================================
// 保存
// ============================================================
const outPath = 'C:\\AI学习资料\\mesheer\\2026-06-07-15-06-17\\科技项目全流程AI应用实践与心得_v6.pptx';
pptx.writeFile({ fileName: outPath })
  .then(() => console.log('PPT v6 generated: ' + outPath))
  .catch(err => console.error('Error:', err));
