const PptxGenJS = require('pptxgenjs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'China Southern Power Grid';
pptx.company = 'China Southern Power Grid';
pptx.subject = 'Research Background and Methodology';
pptx.title = 'Evolution of Power Measurement Systems';

const slide = pptx.addSlide();

// 配色方案 - 学术风格
const COLORS = {
  primary: '#003366',
  secondary: '#0066CC',
  accent: '#CC0000',
  light: '#E6F2FF',
  white: '#FFFFFF',
  gray: '#666666'
};

// 顶部标题
slide.addText('（一）研究背景及思路', {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 28,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// Logo区域
slide.addShape(pptx.ShapeType.rect, {
  x: 8, y: 0.2, w: 2, h: 0.8,
  fill: { color: COLORS.primary }
});

slide.addText('中国南方电网', {
  x: 8.1, y: 0.25, w: 1.8, h: 0.35,
  fontSize: 16,
  bold: true,
  color: COLORS.white,
  fontFace: 'Microsoft YaHei',
  align: 'center'
});

slide.addText('CHINA SOUTHERN POWER GRID', {
  x: 8.1, y: 0.55, w: 1.8, h: 0.25,
  fontSize: 9,
  color: COLORS.white,
  fontFace: 'Arial',
  align: 'center'
});

// 形势环境标题
slide.addText('■ 面临的形势环境——内部产业政策驱动', {
  x: 0.5, y: 1.2, w: 9, h: 0.4,
  fontSize: 20,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// 政策描述
const policyText = '国家及行业陆续出台多项政策，推动新型电力系统及全国统一电力市场建设，驱动电力量测系统朝"高频采集、超大存储、超强处理"技术方向发展，实现质变跃升。';
slide.addText(policyText, {
  x: 0.5, y: 1.7, w: 9, h: 0.8,
  fontSize: 16,
  color: COLORS.gray,
  fontFace: 'Microsoft YaHei'
});

// 左侧：传统系统
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 2.6, w: 4.2, h: 2.2,
  fill: { color: COLORS.light },
  line: { color: COLORS.primary, width: 1 }
});

slide.addText('传统系统', {
  x: 0.7, y: 2.7, w: 3.8, h: 0.35,
  fontSize: 18,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei'
});

// 传统系统表格
const traditionalTable = [
  [
    { text: '数据采集频率', options: { bold: true, color: COLORS.white } },
    { text: '日频次', options: { bold: true } }
  ],
  [
    { text: '数据存储容量', options: { bold: true, color: COLORS.white } },
    { text: 'TB级', options: { bold: true } }
  ],
  [
    { text: '数据处理能力', options: { bold: true, color: COLORS.white } },
    { text: '非实时：小时级/千万', options: { bold: true } }
  ]
];

slide.addTable(traditionalTable, {
  x: 0.7, y: 3.1, w: 3.8, h: 1.5,
  colW: [1.8, 2.0],
  rowH: [0.5, 0.5, 0.5],
  fontFace: 'Microsoft YaHei',
  fontSize: 14,
  fill: { color: COLORS.primary },
  fill1: { color: COLORS.white },
  color: COLORS.primary,
  border: { color: COLORS.primary, type: 'solid', pt: 1 }
});

// 右侧：新型系统
slide.addShape(pptx.ShapeType.rect, {
  x: 5.3, y: 2.6, w: 4.2, h: 2.2,
  fill: { color: COLORS.light },
  line: { color: COLORS.accent, width: 1 }
});

slide.addText('新型系统', {
  x: 5.5, y: 2.7, w: 3.8, h: 0.35,
  fontSize: 18,
  bold: true,
  color: COLORS.accent,
  fontFace: 'Microsoft YaHei'
});

// 新型系统表格
const newSystemTable = [
  [
    { text: '数据采集频率', options: { bold: true, color: COLORS.white } },
    { text: '分钟级', options: { bold: true, color: COLORS.accent } }
  ],
  [
    { text: '数据存储容量', options: { bold: true, color: COLORS.white } },
    { text: 'PB级', options: { bold: true, color: COLORS.accent } }
  ],
  [
    { text: '数据处理能力', options: { bold: true, color: COLORS.white } },
    { text: '非实时：分钟级/千万\n实时：秒级', options: { bold: true, color: COLORS.accent } }
  ]
];

slide.addTable(newSystemTable, {
  x: 5.5, y: 3.1, w: 3.8, h: 1.5,
  colW: [1.8, 2.0],
  rowH: [0.5, 0.5, 0.5],
  fontFace: 'Microsoft YaHei',
  fontSize: 14,
  fill: { color: COLORS.accent },
  fill1: { color: COLORS.white },
  color: COLORS.accent,
  border: { color: COLORS.accent, type: 'solid', pt: 1 }
});

// 中间箭头
slide.addShape(pptx.ShapeType.rightArrow, {
  x: 4.8, y: 3.3, w: 0.4, h: 0.8,
  fill: { color: COLORS.secondary }
});

// 左侧装饰
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 5.0, w: 1.5, h: 1.5,
  fill: { color: COLORS.light },
  line: { color: COLORS.primary }
});

slide.addText('系统全面升级', {
  x: 0.55, y: 6.2, w: 1.4, h: 0.3,
  fontSize: 12,
  bold: true,
  color: COLORS.primary,
  fontFace: 'Microsoft YaHei',
  align: 'center'
});

// 政策文件展示
const policyAreas = [
  { x: 2.2, text: '大规模新能源接入\n用户侧实时互动' },
  { x: 3.9, text: '分布式光伏\n四可' },
  { x: 5.6, text: '用户电能质量分\n钟级监测' },
  { x: 7.3, text: '停电实时感知' },
  { x: 9.0, text: '全量参与用户现\n货' }
];

policyAreas.forEach((area) => {
  slide.addShape(pptx.ShapeType.rect, {
    x: area.x, y: 5.0, w: 1.6, h: 1.5,
    fill: { color: COLORS.white },
    line: { color: COLORS.gray, width: 0.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: area.x, y: 5.0, w: 1.6, h: 0.25,
    fill: { color: COLORS.primary }
  });
  
  slide.addText(area.text, {
    x: area.x + 0.05, y: 5.35, w: 1.5, h: 1.0,
    fontSize: 11,
    color: COLORS.gray,
    fontFace: 'Microsoft YaHei',
    align: 'center'
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: area.x + 1.2, y: 5.0, w: 0.35, h: 0.35,
    fill: { color: COLORS.accent }
  });
});

// 政策驱动标签
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 6.6, w: 1.5, h: 0.5,
  fill: { color: COLORS.primary }
});

slide.addText('多维政策驱动', {
  x: 0.55, y: 6.65, w: 1.4, h: 0.4,
  fontSize: 14,
  bold: true,
  color: COLORS.white,
  fontFace: 'Microsoft YaHei',
  align: 'center'
});

// 版权信息
slide.addText('© CSG. All Rights Reserved', {
  x: 0.5, y: 7.2, w: 9, h: 0.25,
  fontSize: 9,
  color: COLORS.gray,
  fontFace: 'Arial'
});

// 保存文件
pptx.writeFile({ fileName: 'research_slide.pptx' })
  .then(() => {
    console.log('PPT generated successfully!');
  })
  .catch(err => {
    console.error('Error generating PPT:', err);
  });
