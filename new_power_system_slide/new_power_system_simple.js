
const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Power Grid Training';
pptx.company = 'Power Grid Company';
pptx.subject = 'New Power System Training';
pptx.title = 'New Power System Construction and Measurement Technology Development';

// 幻灯片大小使用默认的宽屏尺寸

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

// 第1页：封面
const slide1 = pptx.addSlide();
slide1.background = { color: COLORS.primary };
slide1.addText('新型电力系统建设与计量技术发展', {
  x: 0.5, y: 2, w: 12.333, h: 1.5,
  fontSize: 44,
  color: COLORS.white,
  bold: true,
  align: 'center',
  fontFace: 'Microsoft YaHei'
});
slide1.addText('源网荷储协同 · 智能柔性计量 · 助力双碳目标', {
  x: 0.5, y: 3.8, w: 12.333, h: 0.8,
  fontSize: 24,
  color: '#CCCCCC',
  align: 'center',
  fontFace: 'Microsoft YaHei'
});
slide1.addText('电网领域培训材料\n2025年', {
  x: 0.5, y: 5.6, w: 12.333, h: 1,
  fontSize: 18,
  color: COLORS.white,
  align: 'center',
  fontFace: 'Microsoft YaHei'
});

// 第2页：目录
const slide2 = pptx.addSlide();
slide2.addText('目录', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});
slide2.addText([
  { text: '第一部分：新型电力系统的概念', options: { bullet: { indent: 0 } } },
  { text: '第二部分：新型电力系统的特征与表现形式', options: { bullet: { indent: 0 } } },
  { text: '第三部分：源网荷储各环节的变革', options: { bullet: { indent: 0 } } },
  { text: '第四部分：计量领域的创新与应用', options: { bullet: { indent: 0 } } }
], {
  x: 1, y: 1.8, w: 11, h: 4,
  fontSize: 24,
  lineSpacing: 36,
  fontFace: 'Microsoft YaHei'
});

// 第3页：新型电力系统的定义
const slide3 = pptx.addSlide();
slide3.addText('新型电力系统的定义', {
  x: 0.5, y: 0.5, w: 12.333, h: 0.8,
  fontSize: 32,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});
slide3.addShape(pptx.ShapeType.roundRect, {
  x: 0.5, y: 1.5, w: 12.333, h: 1.2,
  fill: { color: COLORS.light }
});
slide3.addText('官方定义', {
  x: 0.6, y: 1.6, w: 2, h: 0.4,
  fontSize: 20,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});
slide3.addText('以高比例新能源供给消纳为主线任务', {
  x: 0.6, y: 2, w: 12, h: 0.6,
  fontSize: 18,
  fontFace: 'Microsoft YaHei'
});
slide3.addText('核心要素', {
  x: 0.6, y: 2.9, w: 2, h: 0.4,
  fontSize: 20,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});
slide3.addText([
  { text: '源网荷储多向协同、灵活互动', options: { bullet: { indent: 0 } } },
  { text: '以坚强、智能、柔性电网为枢纽平台', options: { bullet: { indent: 0 } } },
  { text: '技术创新和体制机制创新为基础保障', options: { bullet: { indent: 0 } } }
], {
  x: 0.8, y: 3.3, w: 11, h: 2,
  fontSize: 18,
  lineSpacing: 30,
  fontFace: 'Microsoft YaHei'
});
slide3.addText('目标定位', {
  x: 0.6, y: 5.4, w: 2, h: 0.4,
  fontSize: 20,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});
slide3.addText('新型能源体系的核心组成与碳中和关键支撑', {
  x: 0.6, y: 5.8, w: 12, h: 0.6,
  fontSize: 18,
  fontFace: 'Microsoft YaHei'
});

// 保存PPT
pptx.writeFile({ fileName: 'new_power_system.pptx' })
  .then(() => {
    console.log('PPT生成成功！');
  })
  .catch((error) => {
    console.error('PPT生成失败：', error);
  });
