
const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Power Grid Training';
pptx.company = 'Power Grid Company';
pptx.subject = 'New Power System Training';
pptx.title = 'New Power System Construction and Measurement Technology Development';

// 设置幻灯片大小
pptx.setSlideSize(13.333, 7.5, 'in');

// 配色方案
const COLORS = {
  primary: '#003366',
  secondary: '#0066CC',
  accent: '#006600',
  light: '#E6F2FF',
  white: '#FFFFFF',
  gray: '#666666',
  warm: '#CC6600',
  red: '#CC0000',
  green: '#009933'
};

// 辅助函数：添加安全检查（简化版）
function addSafetyChecks(slide) {
  // 简化版，暂时不做复杂检查
}

// ========== 第1页：封面 ==========
const slide1 = pptx.addSlide();
slide1.background = { color: '003366' };
slide1.addText('新型电力系统建设与计量技术发展', {
  x: 0.5, y: 2, w: 12.333, h: 1.5,
  fontSize: 44,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide1.addText('源网荷储协同 · 智能柔性计量 · 助力双碳目标', {
  x: 0.5, y: 3.8, w: 12.333, h: 0.8,
  fontSize: 24,
  color: 'CCCCCC',
  align: 'center'
});
slide1.addText('电网领域培训材料\n2025年', {
  x: 0.5, y: 5.5, w: 12.333, h: 1,
  fontSize: 18,
  color: 'FFFFFF',
  align: 'center'
});
addSafetyChecks(slide1);

// ========== 第2页：目录 ==========
const slide2 = pptx.addSlide();
slide2.addText('目录', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide2.addText([
  { text: '第一部分：新型电力系统的概念', options: { bullet: { indent: 0 } } },
  { text: '第二部分：新型电力系统的特征与表现形式', options: { bullet: { indent: 0 } } },
  { text: '第三部分：源网荷储各环节的变革', options: { bullet: { indent: 0 } } },
  { text: '第四部分：计量领域的创新与应用', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 24,
  lineSpacing: 36
});
addSafetyChecks(slide2);

// ========== 第3页：新型电力系统的定义 ==========
const slide3 = pptx.addSlide();
slide3.addText('新型电力系统的定义', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.5, w: 12.333, h: 1.2,
  fill: { color: 'E6F2FF' }
});
slide3.addText('官方定义', {
  x: 0.6, y: 1.6, w: 2, h: 0.4,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide3.addText('以高比例新能源供给消纳为主线任务', {
  x: 0.6, y: 2, w: 12, h: 0.6,
  fontSize: 18
});
slide3.addText('核心要素', {
  x: 0.6, y: 2.9, w: 2, h: 0.4,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide3.addText([
  { text: '源网荷储多向协同、灵活互动', options: { bullet: { indent: 0 } } },
  { text: '以坚强、智能、柔性电网为枢纽平台', options: { bullet: { indent: 0 } } },
  { text: '技术创新和体制机制创新为基础保障', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 3.3, w: 11, h: 2,
  fontSize: 18,
  lineSpacing: 30
});
slide3.addText('目标定位', {
  x: 0.6, y: 5.4, w: 2, h: 0.4,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide3.addText('新型能源体系的核心组成与碳中和关键支撑', {
  x: 0.6, y: 5.8, w: 12, h: 0.6,
  fontSize: 18
});
addSafetyChecks(slide3);

// ========== 第4页：政策背景与发展历程 ==========
const slide4 = pptx.addSlide();
slide4.addText('政策背景与发展历程', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 1.5, w: 5.9, h: 2.5,
  fill: { color: 'F0F8FF' }
});
slide4.addText('国家战略', {
  x: 0.7, y: 1.6, w: 5.5, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide4.addText([
  { text: '双碳目标：2030碳达峰、2060碳中和', options: { bullet: { indent: 0 } } },
  { text: '能源安全新战略', options: { bullet: { indent: 0 } } },
  { text: '构建新型能源体系', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 2.1, w: 5.3, h: 1.8,
  fontSize: 16,
  lineSpacing: 26
});
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 6.9, y: 1.5, w: 5.9, h: 2.5,
  fill: { color: 'F0FFF0' }
});
slide4.addText('最新政策（2025年）', {
  x: 7.1, y: 1.6, w: 5.5, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '006600'
});
slide4.addText([
  { text: '《电力系统调节能力优化专项行动实施方案(2025—2027年)》', options: { bullet: { indent: 0 } } },
  { text: '《政府工作报告》：着力构建新型电力系统', options: { bullet: { indent: 0 } } },
  { text: '西宁市源网荷储一体化示范城市立法', options: { bullet: { indent: 0 } } }
], {
  x: 7.2, y: 2.1, w: 5.3, h: 1.8,
  fontSize: 16,
  lineSpacing: 26
});
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 4.2, w: 12.333, h: 2.5,
  fill: { color: 'FFFFF0' }
});
slide4.addText('投资规模', {
  x: 0.7, y: 4.3, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '996600'
});
slide4.addText('国家电网"十五五"时期固定资产投资总额将达4万亿元，较"十四五"时期增长40%', {
  x: 0.8, y: 4.9, w: 12, h: 1.5,
  fontSize: 20,
  align: 'center',
  bold: true
});
addSafetyChecks(slide4);

// ========== 第5页：建设新型电力系统的必要性 ==========
const slide5 = pptx.addSlide();
slide5.addText('建设新型电力系统的必要性', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.5, w: 5.9, h: 1.3,
  fill: { color: 'E6F2FF' }
});
slide5.addText('能源安全保障', {
  x: 0.7, y: 1.7, w: 5.5, h: 0.4,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide5.addText('降低对化石能源的依赖，保障能源供应安全', {
  x: 0.7, y: 2.2, w: 5.5, h: 0.5,
  fontSize: 16
});
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.9, y: 1.5, w: 5.9, h: 1.3,
  fill: { color: 'E6FFE6' }
});
slide5.addText('清洁低碳转型', {
  x: 7.1, y: 1.7, w: 5.5, h: 0.4,
  fontSize: 20,
  bold: true,
  color: '006600'
});
slide5.addText('推动能源绿色低碳发展，实现双碳目标', {
  x: 7.1, y: 2.2, w: 5.5, h: 0.5,
  fontSize: 16
});
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 3, w: 5.9, h: 1.3,
  fill: { color: 'FFF0E6' }
});
slide5.addText('经济高质量发展', {
  x: 0.7, y: 3.2, w: 5.5, h: 0.4,
  fontSize: 20,
  bold: true,
  color: 'CC6600'
});
slide5.addText('培育新能源、储能、智能电网等新产业', {
  x: 0.7, y: 3.7, w: 5.5, h: 0.5,
  fontSize: 16
});
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.9, y: 3, w: 5.9, h: 1.3,
  fill: { color: 'FFF0F5' }
});
slide5.addText('国际竞争需要', {
  x: 7.1, y: 3.2, w: 5.5, h: 0.4,
  fontSize: 20,
  bold: true,
  color: '993366'
});
slide5.addText('抢占能源技术制高点，提升国际竞争力', {
  x: 7.1, y: 3.7, w: 5.5, h: 0.5,
  fontSize: 16
});
addSafetyChecks(slide5);

// ========== 第6页：新型电力系统的核心特征 ==========
const slide6 = pptx.addSlide();
slide6.addText('新型电力系统的核心特征', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide6.addShape(pptx.ShapeType.ellipse, {
  x: 1.5, y: 1.6, w: 2.5, h: 2.5,
  fill: { color: COLORS.primary }
});
slide6.addText('高比例\n新能源', {
  x: 1.5, y: 2.3, w: 2.5, h: 1,
  fontSize: 20,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide6.addShape(pptx.shapes.ELLIPSE, {
  x: 5.4, y: 1.6, w: 2.5, h: 2.5,
  fill: { color: '006600' }
});
slide6.addText('源网荷储\n一体化', {
  x: 5.4, y: 2.3, w: 2.5, h: 1,
  fontSize: 20,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide6.addShape(pptx.shapes.ELLIPSE, {
  x: 9.3, y: 1.6, w: 2.5, h: 2.5,
  fill: { color: 'CC6600' }
});
slide6.addText('坚强智能\n柔性电网', {
  x: 9.3, y: 2.3, w: 2.5, h: 1,
  fontSize: 20,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide6.addShape(pptx.shapes.RECTANGLE, {
  x: 4, y: 4.4, w: 5.333, h: 1,
  fill: { color: '993366' }
});
slide6.addText('技术与机制创新双轮驱动', {
  x: 4, y: 4.6, w: 5.333, h: 0.6,
  fontSize: 22,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
addSafetyChecks(slide6);

// ========== 第7页：特征一：高比例新能源 ==========
const slide7 = pptx.addSlide();
slide7.addText('特征一：高比例新能源（表现形式）', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide7.addText([
  { text: '新能源装机占比超50%，成为电力装机主体', options: { bullet: { indent: 0 } } },
  { text: '风电、光伏成为主力电源', options: { bullet: { indent: 0 } } },
  { text: '随机性、波动性、间歇性挑战', options: { bullet: { indent: 0 } } },
  { text: '案例：西北新能源基地建设', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide7);

// ========== 第8页：特征二：源网荷储一体化 ==========
const slide8 = pptx.addSlide();
slide8.addText('特征二：源网荷储一体化（表现形式）', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide8.addText([
  { text: '打破传统电力管理的条块分割', options: { bullet: { indent: 0 } } },
  { text: '多能互补、灵活互动的能源生态体系', options: { bullet: { indent: 0 } } },
  { text: '建立更加开放、灵活、高效的市场运行机制', options: { bullet: { indent: 0 } } },
  { text: '以改革释放制度红利', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide8);

// ========== 第9页：特征三：坚强智能柔性电网 ==========
const slide9 = pptx.addSlide();
slide9.addText('特征三：坚强智能柔性电网（表现形式）', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide9.addText([
  { text: '电网智能化与柔性化改造', options: { bullet: { indent: 0 } } },
  { text: '支撑高比例新能源就地消纳', options: { bullet: { indent: 0 } } },
  { text: '多元负荷灵活互动', options: { bullet: { indent: 0 } } },
  { text: '成为新型电力系统的核心枢纽平台', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide9);

// ========== 第10页：特征四：数字与AI赋能 ==========
const slide10 = pptx.addSlide();
slide10.addText('特征四：数字与AI赋能（表现形式）', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide10.addText([
  { text: 'AI技术深度融合', options: { bullet: { indent: 0 } } },
  { text: '相关数据显示，到2025年，我国人工智能核心产业规模将超过1.2万亿元', options: { bullet: { indent: 18 } } },
  { text: '算力与电力柔性共生', options: { bullet: { indent: 0 } } },
  { text: '大数据分析与智能决策', options: { bullet: { indent: 0 } } },
  { text: '物联网技术广泛应用', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4.5,
  fontSize: 20,
  lineSpacing: 36
});
addSafetyChecks(slide10);

// ========== 第11页：传统电力系统与新型电力系统对比 ==========
const slide11 = pptx.addSlide();
slide11.addText('传统电力系统与新型电力系统对比', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide11.addTable([
  [
    { text: '对比维度', options: { bold: true, fill: { color: '003366' }, color: 'FFFFFF' } },
    { text: '传统电力系统', options: { bold: true, fill: { color: 'E6F2FF' } } },
    { text: '新型电力系统', options: { bold: true, fill: { color: 'E6FFE6' } } }
  ],
  [
    { text: '电源结构', options: { fill: { color: 'F5F5F5' } } },
    '化石能源为主',
    '新能源为主（占比超50%）'
  ],
  [
    { text: '电网形态', options: { fill: { color: 'F5F5F5' } } },
    '单向输送、刚性',
    '智能柔性、双向互动'
  ],
  [
    { text: '运行模式', options: { fill: { color: 'F5F5F5' } } },
    '源随荷动',
    '源网荷储协同'
  ],
  [
    { text: '用户角色', options: { fill: { color: 'F5F5F5' } } },
    '被动消费者',
    '产销者、主动参与者'
  ]
], {
  x: 0.5, y: 1.5, w: 12.333, h: 5,
  fontSize: 18,
  align: 'center',
  valign: 'mid'
});
addSafetyChecks(slide11);

// ========== 第12页：源网荷储整体变革框架 ==========
const slide12 = pptx.addSlide();
slide12.addText('源网荷储整体变革框架', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide12.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 1.5, w: 5.9, h: 1.3,
  fill: { color: '0066CC' }
});
slide12.addText('源侧：清洁化、分散化', {
  x: 0.6, y: 1.8, w: 5.7, h: 0.7,
  fontSize: 22,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide12.addShape(pptx.shapes.RECTANGLE, {
  x: 6.9, y: 1.5, w: 5.9, h: 1.3,
  fill: { color: '009933' }
});
slide12.addText('网侧：智能化、柔性化', {
  x: 7, y: 1.8, w: 5.7, h: 0.7,
  fontSize: 22,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide12.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 3, w: 5.9, h: 1.3,
  fill: { color: 'CC6600' }
});
slide12.addText('荷侧：主动化、互动化', {
  x: 0.6, y: 3.3, w: 5.7, h: 0.7,
  fontSize: 22,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide12.addShape(pptx.shapes.RECTANGLE, {
  x: 6.9, y: 3, w: 5.9, h: 1.3,
  fill: { color: '993366' }
});
slide12.addText('储侧：规模化、多元化', {
  x: 7, y: 3.3, w: 5.7, h: 0.7,
  fontSize: 22,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide12.addShape(pptx.shapes.RECTANGLE, {
  x: 2, y: 4.7, w: 9.333, h: 1.8,
  fill: { color: '333333' }
});
slide12.addText('源网荷储协同运行平台', {
  x: 2, y: 5.2, w: 9.333, h: 0.8,
  fontSize: 26,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
addSafetyChecks(slide12);

// ========== 第13页：源侧变革 ==========
const slide13 = pptx.addSlide();
slide13.addText('源侧变革：从化石能源为主到新能源为主', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide13.addText([
  { text: '新能源装机快速增长', options: { bullet: { indent: 0 } } },
  { text: '分布式电源大规模接入', options: { bullet: { indent: 0 } } },
  { text: '传统电源转型（灵活性改造）', options: { bullet: { indent: 0 } } },
  { text: '多能互补系统建设', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide13);

// ========== 第14页：网侧变革 ==========
const slide14 = pptx.addSlide();
slide14.addText('网侧变革：从单向输送到智能柔性枢纽', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide14.addText([
  { text: '输配电网智能化升级', options: { bullet: { indent: 0 } } },
  { text: '微电网与主动配电网', options: { bullet: { indent: 0 } } },
  { text: '电力电子设备广泛应用', options: { bullet: { indent: 0 } } },
  { text: '电网调控模式创新', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide14);

// ========== 第15页：荷侧变革 ==========
const slide15 = pptx.addSlide();
slide15.addText('荷侧变革：从被动消费到主动参与', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide15.addText([
  { text: '需求响应常态化', options: { bullet: { indent: 0 } } },
  { text: '柔性负荷比例提升', options: { bullet: { indent: 0 } } },
  { text: '用户从消费者变为产销者（Prosumer）', options: { bullet: { indent: 0 } } },
  { text: '多元负荷聚合管理', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide15);

// ========== 第16页：储侧变革 ==========
const slide16 = pptx.addSlide();
slide16.addText('储侧变革：从辅助角色到核心调节资源', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide16.addText([
  { text: '储能规模化发展', options: { bullet: { indent: 0 } } },
  { text: '电化学储能成本持续下降', options: { bullet: { indent: 0 } } },
  { text: '多种储能技术路线并行（电化学、抽水蓄能、压缩空气等）', options: { bullet: { indent: 0 } } },
  { text: '储充一体化应用', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide16);

// ========== 第17页：源网荷储协同机制创新 ==========
const slide17 = pptx.addSlide();
slide17.addText('源网荷储协同机制创新', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide17.addText([
  { text: '协同运行平台建设', options: { bullet: { indent: 0 } } },
  { text: '市场交易机制完善', options: { bullet: { indent: 0 } } },
  { text: '价格信号引导', options: { bullet: { indent: 0 } } },
  { text: '责任主体多元化', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide17);

// ========== 第18页：典型实践案例 ==========
const slide18 = pptx.addSlide();
slide18.addText('典型实践案例', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide18.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.5, w: 12.333, h: 1.6,
  fill: { color: 'E6F2FF' }
});
slide18.addText('源网荷储一体化示范项目', {
  x: 0.7, y: 1.7, w: 12, h: 0.5,
  fontSize: 22,
  bold: true,
  color: '003366'
});
slide18.addText('多个国家级源网荷储一体化示范项目落地，推动多能互补与协同运行', {
  x: 0.8, y: 2.3, w: 12, h: 0.6,
  fontSize: 18
});
slide18.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 3.3, w: 12.333, h: 1.6,
  fill: { color: 'E6FFE6' }
});
slide18.addText('微电网应用场景', {
  x: 0.7, y: 3.5, w: 12, h: 0.5,
  fontSize: 22,
  bold: true,
  color: '006600'
});
slide18.addText('工业园区、商业区、社区等多种微电网场景，提升供电可靠性与新能源消纳', {
  x: 0.8, y: 4.1, w: 12, h: 0.6,
  fontSize: 18
});
slide18.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 5.1, w: 12.333, h: 1.6,
  fill: { color: 'FFF0E6' }
});
slide18.addText('多能互补系统', {
  x: 0.7, y: 5.3, w: 12, h: 0.5,
  fontSize: 22,
  bold: true,
  color: 'CC6600'
});
slide18.addText('风光水火储多能互补，提高能源综合利用效率', {
  x: 0.8, y: 5.9, w: 12, h: 0.6,
  fontSize: 18
});
addSafetyChecks(slide18);

// ========== 第19页：计量在新型电力系统中的新定位 ==========
const slide19 = pptx.addSlide();
slide19.addText('计量在新型电力系统中的新定位', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide19.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.5, w: 12.333, h: 1.2,
  fill: { color: '003366' }
});
slide19.addText('从单一计量向多元服务转型', {
  x: 0.6, y: 1.8, w: 12, h: 0.6,
  fontSize: 24,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide19.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 2.9, w: 5.9, h: 1.8,
  fill: { color: 'E6F2FF' }
});
slide19.addText('支撑电力系统\n安全稳定运行', {
  x: 0.7, y: 3.4, w: 5.5, h: 0.8,
  fontSize: 20,
  bold: true,
  color: '003366',
  align: 'center'
});
slide19.addShape(pptx.shapes.RECTANGLE, {
  x: 6.9, y: 2.9, w: 5.9, h: 1.8,
  fill: { color: 'E6FFE6' }
});
slide19.addText('促进新能源\n消纳', {
  x: 7.1, y: 3.4, w: 5.5, h: 0.8,
  fontSize: 20,
  bold: true,
  color: '006600',
  align: 'center'
});
slide19.addShape(pptx.shapes.RECTANGLE, {
  x: 3.7, y: 4.9, w: 5.9, h: 1.8,
  fill: { color: 'FFF0E6' }
});
slide19.addText('赋能电力市场\n建设', {
  x: 3.9, y: 5.4, w: 5.5, h: 0.8,
  fontSize: 20,
  bold: true,
  color: 'CC6600',
  align: 'center'
});
addSafetyChecks(slide19);

// ========== 第20页：负荷管理 ==========
const slide20 = pptx.addSlide();
slide20.addText('负荷管理：从被动响应到主动管理', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide20.addText('负荷管理新目标', {
  x: 0.6, y: 1.5, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide20.addText([
  { text: '保供', options: { bullet: { indent: 0 } } },
  { text: '消纳', options: { bullet: { indent: 0 } } },
  { text: '降本', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 2, w: 11, h: 1,
  fontSize: 18
});
slide20.addText('技术支撑', {
  x: 0.6, y: 3.1, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide20.addText([
  { text: '智能电表', options: { bullet: { indent: 0 } } },
  { text: '新一代用电信息采集系统', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 3.6, w: 11, h: 0.8,
  fontSize: 18
});
slide20.addText('响应模式与实践', {
  x: 0.6, y: 4.5, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide20.addText([
  { text: '分时电价、需求响应', options: { bullet: { indent: 0 } } },
  { text: '华北、西北等区域和广东、浙江、江苏、上海等省市已开展用户侧响应', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 5, w: 11, h: 1.5,
  fontSize: 18
});
addSafetyChecks(slide20);

// ========== 第21页：虚拟电厂 ==========
const slide21 = pptx.addSlide();
slide21.addText('虚拟电厂：计量为核心的聚合平台', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide21.addText('虚拟电厂概念与价值', {
  x: 0.6, y: 1.5, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide21.addText('借助信息化通信技术和软件系统实现分布式发电、可控负荷和储能系统等能源资源的有效聚合', {
  x: 0.7, y: 2, w: 12, h: 0.6,
  fontSize: 16
});
slide21.addText('计量技术支撑', {
  x: 0.6, y: 2.7, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide21.addText('海量数据采集与聚合', {
  x: 0.7, y: 3.2, w: 12, h: 0.5,
  fontSize: 16
});
slide21.addText('关键技术', {
  x: 0.6, y: 3.8, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide21.addText([
  { text: '协调控制技术', options: { bullet: { indent: 0 } } },
  { text: '信息通信技术', options: { bullet: { indent: 0 } } },
  { text: '智能算法', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 4.3, w: 11, h: 1,
  fontSize: 16
});
slide21.addText('应用场景', {
  x: 0.6, y: 5.4, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide21.addText([
  { text: '电力保供', options: { bullet: { indent: 0 } } },
  { text: '新能源消纳', options: { bullet: { indent: 0 } } },
  { text: '市场交易', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 5.9, w: 11, h: 1,
  fontSize: 16
});
addSafetyChecks(slide21);

// ========== 第22页：采集时效提升 ==========
const slide22 = pptx.addSlide();
slide22.addText('采集时效提升：从日级到实时级', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide22.addTable([
  [
    { text: '发展阶段', options: { bold: true, fill: { color: '003366' }, color: 'FFFFFF' } },
    { text: '采集时效', options: { bold: true, fill: { color: 'E6F2FF' } } }
  ],
  [
    { text: '传统采集', options: { fill: { color: 'F5F5F5' } } },
    '日冻结、小时级'
  ],
  [
    { text: '新型要求', options: { fill: { color: 'F5F5F5' } } },
    '分钟级、秒级采集'
  ]
], {
  x: 0.5, y: 1.5, w: 12.333, h: 2,
  fontSize: 20,
  align: 'center',
  valign: 'mid'
});
slide22.addText('技术实现', {
  x: 0.6, y: 3.6, w: 12, h: 0.5,
  fontSize: 20,
  bold: true,
  color: '003366'
});
slide22.addText([
  { text: '新一代载波技术：支持500块电表数据1分钟内完成抄读', options: { bullet: { indent: 0 } } },
  { text: '新一代用电信息采集系统（采集2.0）', options: { bullet: { indent: 0 } } },
  { text: '案例：国网昌吉供电公司实现采集2.0全量档案数据接入和全量量测数据采集，完成51.23万只采集终端、1212.19万只电能表接入', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 4.1, w: 11, h: 2.5,
  fontSize: 16
});
addSafetyChecks(slide22);

// ========== 第23页：采集精度适应 ==========
const slide23 = pptx.addSlide();
slide23.addText('采集精度适应：从通用到场景化', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide23.addText([
  { text: '不同场景的精度需求', options: { bullet: { indent: 0 } } },
  { text: '新能源发电计量精度提升', options: { bullet: { indent: 0 } } },
  { text: '充电桩计量精度要求', options: { bullet: { indent: 0 } } },
  { text: '谐波、不平衡等复杂工况下的计量', options: { bullet: { indent: 0 } } },
  { text: '最新进展：市场监管总局推动攻克新型电力系统精准计量关键技术', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4.5,
  fontSize: 20,
  lineSpacing: 36
});
addSafetyChecks(slide23);

// ========== 第24页：柔性采集 ==========
const slide24 = pptx.addSlide();
slide24.addText('柔性采集：从固定周期到动态调整', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide24.addText([
  { text: '柔性采集概念', options: { bullet: { indent: 0 } } },
  { text: '按需采集策略', options: { bullet: { indent: 0 } } },
  { text: '从单一计量采集向多业务全场景覆盖转型', options: { bullet: { indent: 0 } } },
  { text: '同步处理窃电检测、能耗分析等附加功能', options: { bullet: { indent: 0 } } },
  { text: '技术支撑：智能电表、边缘计算', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4.5,
  fontSize: 20,
  lineSpacing: 36
});
addSafetyChecks(slide24);

// ========== 第25页：计量溯源体系创新 ==========
const slide25 = pptx.addSlide();
slide25.addText('计量溯源体系创新', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide25.addText([
  { text: '适应新型电力系统的计量溯源体系', options: { bullet: { indent: 0 } } },
  { text: '融合数据采集技术、物联网技术、人工智能技术的计量设备状态在线监测', options: { bullet: { indent: 0 } } },
  { text: '智慧监管模式', options: { bullet: { indent: 0 } } },
  { text: '案例：全兼容柔性检定流水线投运，推动计量检定技术发展与应用', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4.5,
  fontSize: 20,
  lineSpacing: 36
});
addSafetyChecks(slide25);

// ========== 第26页：计量数字化转型 ==========
const slide26 = pptx.addSlide();
slide26.addText('计量数字化转型', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide26.addText([
  { text: '采集系统升级（采集2.0）', options: { bullet: { indent: 0 } } },
  { text: '大数据分析应用', options: { bullet: { indent: 0 } } },
  { text: 'AI赋能计量运维', options: { bullet: { indent: 0 } } },
  { text: '计量数据价值挖掘', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide26);

// ========== 第27页：关键技术支撑 ==========
const slide27 = pptx.addSlide();
slide27.addText('关键技术支撑', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide27.addText([
  { text: '新一代通信技术（宽带载波、5G）', options: { bullet: { indent: 0 } } },
  { text: '物联网技术', options: { bullet: { indent: 0 } } },
  { text: '边缘计算与云计算', options: { bullet: { indent: 0 } } },
  { text: '人工智能技术', options: { bullet: { indent: 0 } } },
  { text: '区块链技术（交易溯源）', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4.5,
  fontSize: 22,
  lineSpacing: 36
});
addSafetyChecks(slide27);

// ========== 第28页：政策与标准 ==========
const slide28 = pptx.addSlide();
slide28.addText('政策与标准', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide28.addText([
  { text: '计量相关政策', options: { bullet: { indent: 0 } } },
  { text: '技术标准体系建设', options: { bullet: { indent: 0 } } },
  { text: '检测认证体系', options: { bullet: { indent: 0 } } },
  { text: '市场监管创新', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide28);

// ========== 第29页：挑战与展望 ==========
const slide29 = pptx.addSlide();
slide29.addText('挑战与展望', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: '003366'
});
slide29.addShape(pptx.shapes.RECTANGLE, {
  x: 0.5, y: 1.5, w: 5.9, h: 4.8,
  fill: { color: 'FFF0F0' }
});
slide29.addText('面临挑战', {
  x: 0.7, y: 1.6, w: 5.5, h: 0.5,
  fontSize: 22,
  bold: true,
  color: 'CC0000'
});
slide29.addText([
  { text: '技术挑战：高比例新能源接入下的计量', options: { bullet: { indent: 0 } } },
  { text: '管理挑战：海量设备运维', options: { bullet: { indent: 0 } } },
  { text: '市场挑战：电力市场下的计量服务', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 2.2, w: 5.3, h: 3.8,
  fontSize: 18,
  lineSpacing: 32
});
slide29.addShape(pptx.shapes.RECTANGLE, {
  x: 6.9, y: 1.5, w: 5.9, h: 4.8,
  fill: { color: 'F0FFF0' }
});
slide29.addText('未来展望', {
  x: 7.1, y: 1.6, w: 5.5, h: 0.5,
  fontSize: 22,
  bold: true,
  color: '006600'
});
slide29.addText([
  { text: '泛在感知', options: { bullet: { indent: 0 } } },
  { text: '智能互联', options: { bullet: { indent: 0 } } },
  { text: '价值创造', options: { bullet: { indent: 0 } } }
], {
  x: 7.2, y: 2.2, w: 5.3, h: 3.8,
  fontSize: 22,
  lineSpacing: 40
});
addSafetyChecks(slide29);

// ========== 第30页：总结与致谢 ==========
const slide30 = pptx.addSlide();
slide30.background = { color: '003366' };
slide30.addText('总结与致谢', {
  x: 0.5, y: 1, w: 12.333, h: 1,
  fontSize: 40,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
slide30.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1, y: 2.3, w: 11.333, h: 3,
  fill: { color: 'FFFFFF' }
});
slide30.addText([
  { text: '新型电力系统前景广阔', options: { bullet: { indent: 0 } } },
  { text: '计量技术创新是关键支撑', options: { bullet: { indent: 0 } } },
  { text: '携手共进，助力双碳目标！', options: { bullet: { indent: 0 } } }
], {
  x: 1.5, y: 2.8, w: 10.333, h: 2,
  fontSize: 24,
  color: '003366',
  lineSpacing: 40
});
slide30.addText('谢谢！', {
  x: 0.5, y: 5.6, w: 12.333, h: 0.8,
  fontSize: 36,
  color: 'FFFFFF',
  bold: true,
  align: 'center'
});
addSafetyChecks(slide30);

// 保存PPT
pptx.writeFile({ fileName: 'c:\\AI学习资料\\mesheer\\new_power_system_slide\\new_power_system.pptx' })
  .then(() => {
    console.log('PPT生成成功！');
  })
  .catch((error) => {
    console.error('PPT生成失败：', error);
  });
