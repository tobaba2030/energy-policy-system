const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');
const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches
pptx.author = '科创业务中心';
pptx.title = '科技项目全流程AI应用实践与心得';

// 用path.join构建路径确保跨平台兼容性
function blobPath(subpath) {
  const parts = subpath.split('/');
  return path.join('C:', 'Users', 'jianlinw', '.workbuddy', 'blobs', ...parts);
}

// 安全读取图片并转为base64 data URI
function readImgAsDataUri(subpath) {
  const fp = blobPath(subpath);
  if (!fs.existsSync(fp)) {
    console.warn('Image not found, skipping: ' + fp);
    return null;
  }
  const buf = fs.readFileSync(fp);
  return 'data:image/png;base64,' + buf.toString('base64');
}

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

// 页面尺寸（宽屏 13.33 x 7.5）
const PW = 13.33;
const PH = 7.5;
// 图片区域：左侧 1/4
const IMG_W = PW * 0.25; // ~3.33
const TXT_X = IMG_W + 0.2; // 文字区起始 x
const TXT_W = PW - IMG_W - 0.5; // 文字区宽度

// 截图路径 - 预读取为base64 data URI
console.log('Loading screenshot images...');
const IMG = {
  knowledge1: readImgAsDataUri('b3/b3321969b60a950f988b2d2c7cd3a38b8a3c9279fe139a06b101c3b02f278ed6.png'),
  knowledge2: readImgAsDataUri('c0/c04d08c8c6d537bd3856112aced55b49b7bb936a595b0cd216e5910dc2cecb80.png'),
  literature1: readImgAsDataUri('1b/1bba7560b813311c427b41b978e0238fca46fb51cb543d78afb3e60501d460a4.png'),
  literature2: readImgAsDataUri('fc/fcad019c7924bcc8fa562852668499eefb9bef815f63d061d8db6655138688e8.png'),
  declare1: readImgAsDataUri('0b/0b5bc32a7442f11ec27c115428285fefbe7d2534a037731a28fe9d257d3f3d3b.png'),
  declare2: readImgAsDataUri('a5/a55f250592285d37b2c523b119925f17596162fb5938ed0df292b96e52b87369.png'),
  guide1: readImgAsDataUri('fc/fc9ac9074fcb6ad78cffe56046835c46c74ca7fcc8be37cb18ba87a37d028a0a.png'),
  guide2: readImgAsDataUri('47/4793408c2244b84a00ee891730d457466f34efc686d8ee50e937e61e17516b25.png'),
  report1: readImgAsDataUri('f3/f306d9625deae3afd10a33ea9fb0c400222da3a62390429a6d3cfc29545a90ac.png'),
  report2: readImgAsDataUri('b5/b5e2ed59b86bca8b1e88297caa0a19ab104d0a74f55169494b3efb5aa15582fb.png'),
  techreport1: readImgAsDataUri('fa/fa3034e93219087718964ec0de5df9f3533395b47697448d1f8c3dd65c1af943.png'),
  techreport2: readImgAsDataUri('4d/4d1789d25dd2570b427382b7c0ce99464a1636e580ea630473cb81242d31642a.png'),
  demo1: readImgAsDataUri('7e/7e99954f1c150028aeb267c354b4446457dcb8ca195efb208e5464dc614137df.png'),
  demo2: readImgAsDataUri('55/55219b815d578c89a44e0ed2668beb0b56345b798b26affeb6b9d35762ebdbd4.png'),
  toolchain1: readImgAsDataUri('d6/d62633f820056a1d7e941006a401ef4eaacd4fd47b2376b0e33c49b1a79287df.png'),
  toolchain2: readImgAsDataUri('db/db965b6048b4932b816af9e41ba8f7596debac55b4231fdd965383acb16bd7a8.png'),
  achievement1: readImgAsDataUri('6d/6d9749ea48ae809350347e4363d7e0d41fc0e4da1e1cb47fa6f4ed90df228096.png'),
  achievement2: readImgAsDataUri('6d/6df37ff56508a78421f1e8613b7fa6304777d8d1f0e4abb82773122e80a38b4b.png'),
  insight1: readImgAsDataUri('76/76945c6c4511e6406e9981dbaf6a1b2be837d7dbbac4d2e31083dac60335fe27.png'),
  insight2: readImgAsDataUri('52/52face717dfe9bc0d26e78259f9ae4fb241b93e84e9257c413f20bbe20824469.png'),
  extra1: readImgAsDataUri('c2/c20739b9e6908622d369600d70066540e822bc79ac0f825112916db01f33adc2.png'),
  extra2: readImgAsDataUri('e7/e740a450a16bf338822b662e62ae1c704ca502a9cc0b64edbdca10ed90a973bc.png'),
  extra3: readImgAsDataUri('f4/f459bf7fff8c7c14e93702d86ffdabcd2feaa2ab8a978008aec41801b6b21aef.png'),
  extra4: readImgAsDataUri('ef/ef9ee886a031be27885d82ada8d50eb6babd5308bca42479ced03cc98bb9eb39.png'),
};
console.log('Images loaded: ' + Object.values(IMG).filter(v => v !== null).length + '/' + Object.keys(IMG).length);

function addDarkBg(slide) {
  slide.background = { color: THEME.bgDark };
}

function addCornerDecorations(slide) {
  const corners = [[0.2, 0.2], [PW - 0.35, 0.2], [0.2, PH - 0.35], [PW - 0.35, PH - 0.35]];
  corners.forEach(([x, y]) => {
    slide.addShape(pptx.ShapeType.rect, {
      x, y, w: 0.15, h: 0.15,
      fill: { color: THEME.gold }, line: { color: THEME.gold, width: 1 }
    });
  });
}

function addSectionHeader(slide, title, subtitle, y = 0.3) {
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: y - 0.05, w: PW - 1, h: 0,
    line: { color: THEME.gold, width: 2, dashType: 'solid' }
  });
  slide.addText(title, {
    x: 0.5, y, w: PW - 1, h: 0.55,
    fontSize: 30, fontFace: 'Microsoft YaHei', bold: true,
    color: THEME.textPrimary, align: 'center'
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: y + 0.5, w: PW - 1, h: 0.3,
      fontSize: 14, fontFace: 'Microsoft YaHei',
      color: THEME.textSecondary, align: 'center'
    });
  }
}

// 左图右文布局：在页面左侧1/4放图片，右侧3/4放文字描述
function addImageTextLayout(slide, imgPath, textConfig, imgY = 1.1) {
  // 左侧图片区域 - 带边框卡片
  const imgCardH = PH - imgY - 0.4;
  const imgPad = 0.15;

  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: imgY, w: IMG_W - 0.1, h: imgCardH,
    fill: { color: THEME.bgCard },
    line: { color: THEME.gold, width: 1.5 },
    rectRadius: 0.1
  });

  // 嵌入图片（使用data URI）
  if (imgPath) {
    slide.addImage({
      data: imgPath,
      x: 0.3 + imgPad,
      y: imgY + imgPad + 0.3,
      w: IMG_W - 0.1 - imgPad * 2,
      h: imgCardH - imgPad * 2 - 0.6,
      rounding: true
    });
  }

  // 图片标签
  if (textConfig.imgLabel) {
    slide.addText(textConfig.imgLabel, {
      x: 0.3 + imgPad, y: imgY + imgPad,
      w: IMG_W - 0.1 - imgPad * 2, h: 0.25,
      fontSize: 9, fontFace: 'Microsoft YaHei',
      color: THEME.textSecondary, align: 'center',
      italic: true
    });
  }

  // 右侧文字区域
  const rightX = TXT_X;
  const rightW = TXT_W;
  let currentY = imgY;

  // 遍历文字配置
  if (textConfig.sections) {
    textConfig.sections.forEach(section => {
      if (section.type === 'card') {
        const cardH = section.height || 2.0;
        slide.addShape(pptx.ShapeType.rect, {
          x: rightX, y: currentY, w: rightW, h: cardH,
          fill: { color: THEME.bgCard },
          line: { color: section.borderColor || THEME.gold, width: section.borderWidth || 1.5 },
          rectRadius: 0.08
        });

        // 卡片标题栏
        if (section.title) {
          slide.addShape(pptx.ShapeType.rect, {
            x: rightX, y: currentY, w: rightW, h: 0.4,
            fill: { color: section.titleBg || THEME.gold },
            line: { color: section.titleBg || THEME.gold, width: 1 }
          });
          slide.addText(section.title, {
            x: rightX + 0.15, y: currentY + 0.05, w: rightW - 0.3, h: 0.3,
            fontSize: 14, fontFace: 'Microsoft YaHei', bold: true,
            color: section.titleColor || THEME.bgDark, align: 'left'
          });
        }

        // 卡片内容
        if (section.items) {
          const itemStartY = currentY + (section.title ? 0.5 : 0.15);
          section.items.forEach((item, i) => {
            slide.addText(item, {
              x: rightX + 0.2, y: itemStartY + i * (section.itemHeight || 0.32),
              w: rightW - 0.4, h: section.itemHeight || 0.28,
              fontSize: section.fontSize || 12, fontFace: 'Microsoft YaHei',
              color: section.itemColor || THEME.textSecondary
            });
          });
        }
        currentY += cardH + 0.12;
      } else if (section.type === 'insight') {
        slide.addShape(pptx.ShapeType.rect, {
          x: rightX, y: currentY, w: rightW, h: 0.4,
          fill: { color: THEME.bgCardLight },
          line: { color: THEME.gold, width: 1 }
        });
        slide.addText(section.text, {
          x: rightX + 0.15, y: currentY + 0.06, w: rightW - 0.3, h: 0.28,
          fontSize: 11, fontFace: 'Microsoft YaHei',
          color: THEME.gold, align: 'center'
        });
        currentY += 0.5;
      }
    });
  }
}

// 双图+右文布局（左侧上下两张图）
function addDualImageTextLayout(slide, imgPath1, imgPath2, textConfig, imgY = 1.1) {
  const imgCardW = IMG_W - 0.1;
  const halfH = (PH - imgY - 0.55) / 2 - 0.08;
  const imgPad = 0.12;

  // 上方图片卡片
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: imgY, w: imgCardW, h: halfH,
    fill: { color: THEME.bgCard },
    line: { color: THEME.gold, width: 1.5 },
    rectRadius: 0.1
  });
  if (imgPath1) {
    slide.addImage({
      data: imgPath1,
      x: 0.3 + imgPad, y: imgY + imgPad + 0.22,
      w: imgCardW - imgPad * 2, h: halfH - imgPad * 2 - 0.35,
      rounding: true
    });
  }
  if (textConfig.imgLabel1) {
    slide.addText(textConfig.imgLabel1, {
      x: 0.3 + imgPad, y: imgY + imgPad,
      w: imgCardW - imgPad * 2, h: 0.2,
      fontSize: 9, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center', italic: true
    });
  }

  // 下方图片卡片
  const img2Y = imgY + halfH + 0.15;
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.3, y: img2Y, w: imgCardW, h: halfH,
    fill: { color: THEME.bgCard },
    line: { color: THEME.blue, width: 1.5 },
    rectRadius: 0.1
  });
  if (imgPath2) {
    slide.addImage({
      data: imgPath2,
      x: 0.3 + imgPad, y: img2Y + imgPad + 0.22,
      w: imgCardW - imgPad * 2, h: halfH - imgPad * 2 - 0.35,
      rounding: true
    });
  }
  if (textConfig.imgLabel2) {
    slide.addText(textConfig.imgLabel2, {
      x: 0.3 + imgPad, y: img2Y + imgPad,
      w: imgCardW - imgPad * 2, h: 0.2,
      fontSize: 9, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center', italic: true
    });
  }

  // 右侧文字区域 - 复用同一逻辑
  const rightX = TXT_X;
  const rightW = TXT_W;
  let currentY = imgY;

  if (textConfig.sections) {
    textConfig.sections.forEach(section => {
      if (section.type === 'card') {
        const cardH = section.height || 2.0;
        slide.addShape(pptx.ShapeType.rect, {
          x: rightX, y: currentY, w: rightW, h: cardH,
          fill: { color: THEME.bgCard },
          line: { color: section.borderColor || THEME.gold, width: section.borderWidth || 1.5 },
          rectRadius: 0.08
        });
        if (section.title) {
          slide.addShape(pptx.ShapeType.rect, {
            x: rightX, y: currentY, w: rightW, h: 0.4,
            fill: { color: section.titleBg || THEME.gold },
            line: { color: section.titleBg || THEME.gold, width: 1 }
          });
          slide.addText(section.title, {
            x: rightX + 0.15, y: currentY + 0.05, w: rightW - 0.3, h: 0.3,
            fontSize: 14, fontFace: 'Microsoft YaHei', bold: true,
            color: section.titleColor || THEME.bgDark, align: 'left'
          });
        }
        if (section.items) {
          const itemStartY = currentY + (section.title ? 0.5 : 0.15);
          section.items.forEach((item, i) => {
            slide.addText(item, {
              x: rightX + 0.2, y: itemStartY + i * (section.itemHeight || 0.32),
              w: rightW - 0.4, h: section.itemHeight || 0.28,
              fontSize: section.fontSize || 12, fontFace: 'Microsoft YaHei',
              color: section.itemColor || THEME.textSecondary
            });
          });
        }
        currentY += cardH + 0.12;
      } else if (section.type === 'insight') {
        slide.addShape(pptx.ShapeType.rect, {
          x: rightX, y: currentY, w: rightW, h: 0.4,
          fill: { color: THEME.bgCardLight },
          line: { color: THEME.gold, width: 1 }
        });
        slide.addText(section.text, {
          x: rightX + 0.15, y: currentY + 0.06, w: rightW - 0.3, h: 0.28,
          fontSize: 11, fontFace: 'Microsoft YaHei',
          color: THEME.gold, align: 'center'
        });
        currentY += 0.5;
      }
    });
  }
}

// ============================================================
// 幻灯片 1: 封面
// ============================================================
const slide1 = pptx.addSlide();
addDarkBg(slide1);
slide1.addShape(pptx.ShapeType.line, { x: 1.0, y: 1.0, w: PW - 2, h: 0, line: { color: THEME.gold, width: 3 } });
slide1.addText('科技项目全流程', { x: 1.0, y: 2.0, w: PW - 2, h: 1.0, fontSize: 52, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary, align: 'center' });
slide1.addText('AI应用实践与心得', { x: 1.0, y: 3.0, w: PW - 2, h: 0.8, fontSize: 44, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold, align: 'center' });
slide1.addText('电网科创业务中心 · 从申报到交付的智能化升级', { x: 1.0, y: 4.2, w: PW - 2, h: 0.5, fontSize: 18, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
slide1.addShape(pptx.ShapeType.line, { x: 1.0, y: 5.0, w: PW - 2, h: 0, line: { color: THEME.gold, width: 3 } });
slide1.addText('WorkBuddy × IMA 知识库 联动方案', { x: 1.0, y: 5.5, w: PW - 2, h: 0.4, fontSize: 14, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
addCornerDecorations(slide1);

// ============================================================
// 幻灯片 2: 目录
// ============================================================
const slide2 = pptx.addSlide();
addDarkBg(slide2);
addSectionHeader(slide2, '汇报目录', 'CONTENTS', 0.3);

const contents = [
  { num: '01', title: 'AI知识生产基础库', desc: '双路径学术知识采集架构' },
  { num: '02', title: '学术文献流转闭环', desc: '从人工到智能全流程升级' },
  { num: '03', title: '全流程概览', desc: '5大环节AI应用全景图' },
  { num: '04', title: '申报简表', desc: 'AI辅助框架搭建与会议流程' },
  { num: '05', title: '指南编写', desc: '政策对齐与内容智能生成' },
  { num: '06', title: '可研报告', desc: '全量自动化生成与图表嵌入' },
  { num: '07', title: '技术研究报告', desc: '深度生成与知识库沉淀' },
  { num: '08', title: 'Demo原型设计', desc: '代码生成与可视化组件' },
  { num: '09', title: 'AI工具链架构', desc: 'WorkBuddy×IMA联动方案' },
  { num: '10', title: '核心成果与心得', desc: '效率提升数据与实践总结' },
  { num: '11', title: '规划展望', desc: '三阶段深化路径' },
];

contents.forEach((item, i) => {
  const row = Math.floor(i / 4);
  const col = i % 4;
  const x = 0.6 + col * 3.15;
  const y = 1.2 + row * 1.9;
  slide2.addShape(pptx.ShapeType.rect, {
    x, y, w: 2.95, h: 1.6,
    fill: { color: THEME.bgCard },
    line: { color: THEME.blue, width: 1 },
    rectRadius: 0.06
  });
  slide2.addText(item.num, { x: x + 0.15, y: y + 0.1, w: 0.6, h: 0.4, fontSize: 20, fontFace: 'Microsoft YaHei', bold: true, color: THEME.gold });
  slide2.addText(item.title, { x: x + 0.15, y: y + 0.5, w: 2.6, h: 0.35, fontSize: 15, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary });
  slide2.addText(item.desc, { x: x + 0.15, y: y + 0.9, w: 2.6, h: 0.3, fontSize: 11, fontFace: 'Microsoft YaHei', color: THEME.textSecondary });
});

// ============================================================
// 幻灯片 3: AI知识生产基础库（核心基础）
// ============================================================
const slide3 = pptx.addSlide();
addDarkBg(slide3);
addSectionHeader(slide3, '01 AI知识生产基础库', '所有工作的核心基础 · 双路径学术知识采集', 0.2);

addDualImageTextLayout(slide3, IMG.knowledge1, IMG.knowledge2, {
  imgLabel1: '中国科技云学术智能体平台',
  imgLabel2: 'Bing学术搜索路径',
  sections: [
    {
      type: 'card', title: '核心概述', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.6,
      items: [
        '中国科技云学术智能体平台爬取方案验证通过',
        '可稳定获取论文摘要、关键词、URL等结构化元数据',
        'Bing学术爬取可行性确认，构建多源学术知识采集双路径',
        '成为高质量科研知识注入新通道'
      ], fontSize: 12, itemHeight: 0.35
    },
    {
      type: 'card', title: '路径一：中国科技云', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 1.4,
      items: [
        '爬取方案验证通过 → 稳定获取论文摘要/关键词/URL',
        '结构化元数据自动提取 → 高质量科研知识注入',
        '状态：已验证通过，稳定运行中'
      ], fontSize: 12, itemHeight: 0.38
    },
    {
      type: 'card', title: '路径二：Bing学术搜索', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.4,
      items: [
        '爬取可行性已确认 → 多源学术知识采集补充',
        '跨语言知识融合（英文/国际文献互补覆盖）',
        '状态：可行性确认，待接入WorkBuddy'
      ], fontSize: 12, itemHeight: 0.38
    },
    {
      type: 'insight',
      text: '💡 双路径汇聚 → 统一清洗 → 结构化存储 → IMA知识库'
    }
  ]
});

// ============================================================
// 幻灯片 4: 学术文献智能流转闭环
// ============================================================
const slide4 = pptx.addSlide();
addDarkBg(slide4);
addSectionHeader(slide4, '02 学术文献智能流转闭环', '从人工爬取到智能报告，全流程自动化升级', 0.2);

addDualImageTextLayout(slide4, IMG.literature1, IMG.literature2, {
  imgLabel1: '文献流转闭环示意图',
  imgLabel2: '知识库入库流程',
  sections: [
    {
      type: 'card', title: '传统手工模式 vs WorkBuddy自动化', titleBg: THEME.red, titleColor: THEME.textPrimary,
      borderColor: THEME.gold, borderWidth: 2, height: 1.6,
      items: [
        '传统：人工检索→手动整理→人工阅读→手动编写（4-8小时/10篇）',
        'WorkBuddy：粘贴/上传→AI自动清洗→智能分类→自动入IMA（5分钟/10篇）',
        '效率提升：96%，几乎零人工干预',
        '核心突破：AI自动清洗提取 + 智能分类标签'
      ], fontSize: 12, itemHeight: 0.35
    },
    {
      type: 'card', title: 'IMA知识库双通道', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.6,
      items: [
        '通道1：文件上传 → 文献PDF/Word直接入库',
        '通道2：URL导入 → 学术链接一键收藏',
        '通道3：笔记创建 → 关键观点即时记录',
        '通道4：WorkBuddy自动推送 → 清洗后结构化数据'
      ], fontSize: 12, itemHeight: 0.35
    },
    {
      type: 'card', title: '闭环回流机制', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 1.5, height: 1.2,
      items: [
        '正向：WorkBuddy → IMA（文献清洗→分类标签→自动导入知识库）',
        '反向：IMA → WorkBuddy（检索知识库→AI分析整合→生成报告）'
      ], fontSize: 12, itemHeight: 0.5
    },
    {
      type: 'insight',
      text: '💡 闭环核心：正向自动沉淀，反向智能检索，形成知识自增长飞轮'
    }
  ]
});

// ============================================================
// 幻灯片 5: 全流程概览（5环节）
// ============================================================
const slide5 = pptx.addSlide();
addDarkBg(slide5);
addSectionHeader(slide5, '科技项目全流程 AI应用概览', '5大环节 × 智能化升级路径', 0.2);

addImageTextLayout(slide5, IMG.extra1, {
  imgLabel: 'AI实践全流程概览',
  sections: [
    {
      type: 'card', title: '5大环节智能化升级', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 2.5,
      items: [
        '📋 申报简表：AI辅助框架搭建 → 从2-3天缩短至0.5天',
        '📖 指南编写：政策对齐与内容智能生成 → 效率提升5倍',
        '📊 可研报告：docx-js全量自动化生成 → 22张图表自动嵌入',
        '🔬 技术研究报告：深度生成+知识库沉淀 → 效率提升10倍',
        '💻 Demo原型设计：代码生成+可视化组件 → 周期缩短85%',
        '🔑 核心引擎：AI知识生产基础库 → 双路径学术知识采集'
      ], fontSize: 12, itemHeight: 0.37
    },
    {
      type: 'card', title: '效率对比', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 1.2,
      items: [
        '传统模式：人工检索→手动整理→人工阅读→手动编写',
        'AI辅助模式：AI自动清洗→智能分类→多文档交叉分析→自动格式化输出'
      ], fontSize: 12, itemHeight: 0.5
    },
    {
      type: 'card', title: 'IMA知识库支撑', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.0,
      items: [
        '文件上传通道 | URL导入通道 | 笔记创建通道 | 结构化文献库'
      ], fontSize: 12, itemHeight: 0.7
    },
    {
      type: 'insight',
      text: '💡 全流程核心：数据→图表→文字全链路自动化，从申报到交付的智能化升级'
    }
  ]
});

// ============================================================
// 幻灯片 6: 申报简表（深度补充+会议流程图）
// ============================================================
const slide6 = pptx.addSlide();
addDarkBg(slide6);
addSectionHeader(slide6, '04 申报简表 — AI辅助框架搭建', '从2-3天缩短至0.5天，一次通过率80%', 0.2);

addDualImageTextLayout(slide6, IMG.declare1, IMG.declare2, {
  imgLabel1: '申报简表AI生成示例',
  imgLabel2: '会议流程与需求调研',
  sections: [
    {
      type: 'card', title: 'AI应用描述', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.8,
      items: [
        '输入技术方案核心要点，AI自动生成简表框架',
        '多版本快速迭代：调整参数→即时生成新版本',
        '关键词与指标智能匹配，提升评审通过率',
        '历史简表模板库复用，减少重复劳动',
        'AI辅助会议：需求收集→政策研读→对标分析'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: 'AI辅助会议流程', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.8,
      items: [
        'Phase 1 需求调研会议 → 技术方向/目标/资源确认 → AI解析评分标准 → IMA检索相似案例',
        'Phase 2 AI智能生成 → 输入需求→AI生成简表框架 → 多版本快速迭代（10分钟3版）',
        'Phase 3 专家评审 → 技术可行性/创新性评估 → AI辅助修改→终稿确认提交'
      ], fontSize: 11, itemHeight: 0.52
    },
    {
      type: 'card', title: '核心成果', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 1.0,
      items: [
        '起草时间：2-3天 → 0.5天（↓83%）| 一次通过率：80% | 多版本迭代：10分钟3版'
      ], fontSize: 12, itemHeight: 0.7
    },
    {
      type: 'insight',
      text: '💡 心得：AI擅长快速提炼和结构化，核心创新点需人工把关；模板库越完善AI效果越好'
    }
  ]
});

// ============================================================
// 幻灯片 7: 指南编写
// ============================================================
const slide7 = pptx.addSlide();
addDarkBg(slide7);
addSectionHeader(slide7, '05 指南编写 — 政策对齐与内容智能生成', '编写效率提升5倍，政策对齐度显著提高', 0.2);

addDualImageTextLayout(slide7, IMG.guide1, IMG.guide2, {
  imgLabel1: '指南编写AI辅助流程',
  imgLabel2: '政策对齐与内容生成',
  sections: [
    {
      type: 'card', title: 'AI应用描述', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.8,
      items: [
        '政策文档解析→自动提取关键要求与评分标准',
        '技术方向梳理→AI生成指南框架草案',
        '多轮审校对齐→确保与最新政策文件一致',
        '历史指南库比对→避免重复或冲突内容',
        'AI知识库支撑：实时检索最新政策动态'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '实践案例', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.8,
      items: [
        '1. 智能电网技术指南：解析南网/国网最新政策→生成技术方向',
        '2. 计量设备AI应用指南：梳理故障诊断技术路线→对齐行业标准',
        '3. 新型电力系统指南：多源政策交叉分析→提炼核心考核指标'
      ], fontSize: 11, itemHeight: 0.52
    },
    {
      type: 'card', title: '核心成果', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 1.0,
      items: [
        '编写效率：提升5倍 | 政策对齐度：60%→95% | 多版本对比：3版/小时'
      ], fontSize: 12, itemHeight: 0.7
    },
    {
      type: 'insight',
      text: '💡 心得：政策合规性必须人工审核，涉密条款尤甚；AI生成的框架需经专家确认'
    }
  ]
});

// ============================================================
// 幻灯片 8: 可研报告
// ============================================================
const slide8 = pptx.addSlide();
addDarkBg(slide8);
addSectionHeader(slide8, '06 可研报告 — 全量自动化生成', '脚本化 > 对话式，一次编写多次复用', 0.2);

addDualImageTextLayout(slide8, IMG.report1, IMG.report2, {
  imgLabel1: 'docx-js脚本生成报告示例',
  imgLabel2: 'matplotlib图表自动嵌入',
  sections: [
    {
      type: 'card', title: 'AI应用描述', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.8,
      items: [
        'docx-js脚本自动生成完整可研报告',
        '22张matplotlib图表自动嵌入（68维特征/PCA/规则库）',
        '6章结构+20篇文献+3个附录深度编排',
        '数据驱动：从原始数据→分析图表→报告文字全链路',
        'AI知识库支撑：文献综述自动引用已入库资料'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '实践案例', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.8,
      items: [
        '1. 终端/表计故障规则库可研：140条规则+CHI模型→完整技术论证',
        '2. 智能电网AI应用可研：多维度数据分析→技术路线论证',
        '3. 团队IDP赋能可研：12人团队数据→资源配置方案'
      ], fontSize: 11, itemHeight: 0.52
    },
    {
      type: 'card', title: '核心成果', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 1.0,
      items: [
        '报告规模：1.35MB docx（6章+20文献+3附录）| 图表：22张自动嵌入 | 生成时间：2周→2天'
      ], fontSize: 12, itemHeight: 0.7
    },
    {
      type: 'insight',
      text: '💡 心得：脚本化>对话式，一次编写脚本可多次复用迭代；数据→图表→文字全链路自动化是最大突破'
    }
  ]
});

// ============================================================
// 幻灯片 9: 技术研究报告
// ============================================================
const slide9 = pptx.addSlide();
addDarkBg(slide9);
addSectionHeader(slide9, '07 技术研究报告 — 深度生成与知识库沉淀', '效率提升10倍，脚本化+图表+知识库形成闭环', 0.2);

addDualImageTextLayout(slide9, IMG.techreport1, IMG.techreport2, {
  imgLabel1: '140条规则库三层级设计',
  imgLabel2: 'CHI/Arrhenius模型推导',
  sections: [
    {
      type: 'card', title: 'AI应用描述', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.8,
      items: [
        '140条规则库三层级设计（单元87+设备34+台区19）',
        'CHI/Arrhenius模型推导与公式编排',
        '技术报告深度生成：6章结构+数据分析+文献综述',
        '知识库沉淀：研究成果自动归档IMA，形成可复用资产',
        'AI知识库支撑：文献引用自动关联已入库研究成果'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '实践案例', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.8,
      items: [
        '1. 终端故障规则库技术报告：87条单元级规则+CHI模型→完整技术论证',
        '2. 表计健康评估报告：34条设备级规则+Arrhenius模型→状态评估',
        '3. 台区故障诊断报告：19条台区级规则→区域级故障定位'
      ], fontSize: 11, itemHeight: 0.52
    },
    {
      type: 'card', title: '核心成果', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 1.0,
      items: [
        '规则库设计：140条（三层级）| 报告效率：提升10倍 | 知识沉淀：IMA知识库自动归档'
      ], fontSize: 12, itemHeight: 0.7
    },
    {
      type: 'insight',
      text: '💡 心得：脚本化生成+图表嵌入+知识库沉淀形成完整闭环；技术深度内容AI辅助但核心推导需专家把关'
    }
  ]
});

// ============================================================
// 幻灯片 10: Demo原型设计
// ============================================================
const slide10 = pptx.addSlide();
addDarkBg(slide10);
addSectionHeader(slide10, '08 Demo原型设计 — 代码生成与可视化组件', '原型周期2周→3天，周报已全自动化', 0.2);

addDualImageTextLayout(slide10, IMG.demo1, IMG.demo2, {
  imgLabel1: 'IDP可视化系统(idp_v3.html)',
  imgLabel2: '周报HTML自动分发系统',
  sections: [
    {
      type: 'card', title: 'AI应用描述', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.8,
      items: [
        'IDP可视化系统(idp_v3.html)开发：个人发展计划可视化',
        '周报HTML自动分发：邮件兼容格式+内联样式',
        '交互式可视化组件：Chart.js数据图表+动态交互',
        '原型快速迭代：AI生成代码→人工调试→快速验证',
        'AI知识库支撑：设计规范与组件库统一沉淀'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '实践案例', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.8,
      items: [
        '1. IDP可视化系统：12人团队架构→个人发展路径可视化',
        '2. 周报自动化系统：数据汇总→HTML周报→邮件自动分发',
        '3. 数据看板原型：项目进度/资源分配→交互式图表'
      ], fontSize: 11, itemHeight: 0.52
    },
    {
      type: 'card', title: '核心成果', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 1.0,
      items: [
        '原型周期：2周→3天（↓85%）| 周报自动化：100%无人干预 | IDP系统：12人团队全覆盖'
      ], fontSize: 12, itemHeight: 0.7
    },
    {
      type: 'insight',
      text: '💡 心得：AI前端原型效果最好，复杂业务逻辑仍需调试；HTML周报格式是邮件分发的最佳实践'
    }
  ]
});

// ============================================================
// 幻灯片 11: AI工具链架构
// ============================================================
const slide11 = pptx.addSlide();
addDarkBg(slide11);
addSectionHeader(slide11, '09 AI工具链架构', 'WorkBuddy × IMA 知识库 联动方案', 0.2);

addDualImageTextLayout(slide11, IMG.toolchain1, IMG.toolchain2, {
  imgLabel1: 'WorkBuddy核心能力',
  imgLabel2: 'IMA知识库架构',
  sections: [
    {
      type: 'card', title: 'WorkBuddy — 核心AI助手', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.8,
      items: [
        '对话式内容生成（申报简表/指南/报告/PPT）',
        '代码/脚本编写（docx-js/PptxGenJS/HTML）',
        '数据分析与图表（matplotlib/Chart.js）',
        'PPT/Word自动生成（模板化脚本）',
        '多文档交叉分析（跨项目知识复用）'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: 'IMA知识库 — 知识沉淀中心', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.8,
      items: [
        '文件上传通道（PDF/Word/PPT直接入库）',
        'URL导入通道（学术链接一键收藏）',
        '笔记创建通道（关键观点即时记录）',
        '结构化文献库（分类标签+检索）',
        '历史模板复用（简表/指南/报告模板）'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '辅助工具链', titleBg: THEME.teal, titleColor: THEME.bgDark,
      borderColor: THEME.teal, borderWidth: 1.5, height: 1.0,
      items: [
        'docx-js（Word生成）| PptxGenJS（PPT生成）| matplotlib（图表）| Chart.js（可视化）| WebSearch（检索）'
      ], fontSize: 12, itemHeight: 0.7
    },
    {
      type: 'insight',
      text: '💡 闭环回流：正向WorkBuddy→IMA（文献清洗→分类标签→自动导入），反向IMA→WorkBuddy（检索→分析→生成报告）'
    }
  ]
});

// ============================================================
// 幻灯片 12: 核心成果数据
// ============================================================
const slide12 = pptx.addSlide();
addDarkBg(slide12);
addSectionHeader(slide12, '10 核心成果数据', '效率提升与质量改善量化指标', 0.2);

addDualImageTextLayout(slide12, IMG.achievement1, IMG.achievement2, {
  imgLabel1: '效率提升对比数据',
  imgLabel2: '质量改善量化指标',
  sections: [
    {
      type: 'card', title: '5大KPI指标', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.6,
      items: [
        '10x 技术报告生成效率提升 | 83% 申报简表起草时间缩短',
        '5x 指南编写效率提升 | 7x 可研报告生成效率提升',
        '85% Demo原型开发周期缩短'
      ], fontSize: 12, itemHeight: 0.48
    },
    {
      type: 'card', title: '各环节效率对比表', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 2.0,
      items: [
        '申报简表：2-3天→0.5天（↓83%）| 通过率80%',
        '指南编写：1周→1-2天（↑5x）| 对齐度95%',
        '可研报告：2周→2天（↑7x）| 图表22张',
        '技术报告：2周→1-2天（↑10x）| 140规则',
        'Demo原型：2周→3天（↓85%）| 交互可视化'
      ], fontSize: 12, itemHeight: 0.35
    },
    {
      type: 'insight',
      text: '💡 核心发现：脚本化生成>对话式生成，数据→图表→文字全链路自动化是最大效率突破点'
    }
  ]
});

// ============================================================
// 幻灯片 13: 实践心得
// ============================================================
const slide13 = pptx.addSlide();
addDarkBg(slide13);
addSectionHeader(slide13, '实践心得', '6条核心经验总结', 0.2);

addDualImageTextLayout(slide13, IMG.insight1, IMG.insight2, {
  imgLabel1: '实践心得总结(上)',
  imgLabel2: '实践心得总结(下)',
  sections: [
    {
      type: 'card', title: '6条核心经验', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 2.5,
      items: [
        '01 脚本化 > 对话式：一次编写脚本可多次复用迭代，效率远超逐轮对话',
        '02 知识库是核心基础：AI知识生产基础库构建是所有工作的前提，双路径采集确保知识质量',
        '03 模板库是关键前提：历史材料沉淀越丰富，AI生成效果越好，质量越稳定',
        '04 数据→图表→文字全链路：从原始数据到分析报告的全自动化是最大突破点',
        '05 人工审核不可少：政策合规、技术深度、核心创新点必须专家把关',
        '06 前端原型效果最好：HTML/CSS/JS可视化组件，AI生成代码质量最高'
      ], fontSize: 12, itemHeight: 0.37
    },
    {
      type: 'card', title: '关键认知', titleBg: THEME.teal, titleColor: THEME.bgDark,
      borderColor: THEME.teal, borderWidth: 1.5, height: 1.5,
      items: [
        'AI不是替代人，而是重新定义工作流——把重复劳动交给机器，把创造性思考留给人类',
        '真正的变化不是工具，而是工作流的重新定义',
        '知识沉淀越厚，AI杠杆越大——知识库是AI效率的乘数因子'
      ], fontSize: 12, itemHeight: 0.45
    },
    {
      type: 'insight',
      text: '"真正的变化不是工具，而是工作流的重新定义"'
    }
  ]
});

// ============================================================
// 幻灯片 14: 规划展望
// ============================================================
const slide14 = pptx.addSlide();
addDarkBg(slide14);
addSectionHeader(slide14, '11 规划展望', '三阶段深化路径', 0.2);

addImageTextLayout(slide14, IMG.extra3, {
  imgLabel: '未来规划路线图',
  sections: [
    {
      type: 'card', title: '深化阶段 (2026 Q3)', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 2, height: 1.5,
      items: [
        '1. 可研报告脚本全面标准化',
        '2. PPT生成脚本模板库建设',
        '3. 技术报告自动生成优化',
        '4. 知识库双路径全面接入'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '拓展阶段 (2026 Q4)', titleBg: THEME.teal, titleColor: THEME.bgDark,
      borderColor: THEME.teal, borderWidth: 1.5, height: 1.5,
      items: [
        '1. 跨项目知识库互联互通',
        '2. 团队AI能力培训体系',
        '3. 多区域项目协同模板',
        '4. 智能评审辅助工具'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '固化阶段 (2027)', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 1.5, height: 1.5,
      items: [
        '1. 全流程自动化流水线',
        '2. AI辅助决策支持系统',
        '3. 知识资产持续沉淀',
        '4. 团队AI成熟度评估'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'insight',
      text: '💡 愿景：从AI辅助到AI驱动，从单点工具到全流程自动化流水线'
    }
  ]
});

// ============================================================
// 幻灯片 15: 结尾
// ============================================================
const slide15 = pptx.addSlide();
addDarkBg(slide15);
slide15.addShape(pptx.ShapeType.line, { x: 1.0, y: 1.0, w: PW - 2, h: 0, line: { color: THEME.gold, width: 3 } });
slide15.addText('感谢聆听', { x: 1.0, y: 2.2, w: PW - 2, h: 1.0, fontSize: 52, fontFace: 'Microsoft YaHei', bold: true, color: THEME.textPrimary, align: 'center' });
slide15.addText('电网科创业务中心 · AI实践持续推进中', { x: 1.0, y: 3.5, w: PW - 2, h: 0.5, fontSize: 18, fontFace: 'Microsoft YaHei', color: THEME.textSecondary, align: 'center' });
slide15.addText('WorkBuddy × IMA 知识库 联动方案', { x: 1.0, y: 4.2, w: PW - 2, h: 0.4, fontSize: 16, fontFace: 'Microsoft YaHei', color: THEME.gold, align: 'center' });
slide15.addShape(pptx.ShapeType.line, { x: 1.0, y: 5.0, w: PW - 2, h: 0, line: { color: THEME.gold, width: 3 } });

// 补充截图页面 - IDP与周报案例
const slideExtra = pptx.addSlide();
addDarkBg(slideExtra);
addSectionHeader(slideExtra, '补充案例 — IDP赋能与周报自动化', '团队个人发展可视化 + 邮件兼容HTML周报', 0.2);

addDualImageTextLayout(slideExtra, IMG.extra2, IMG.extra4, {
  imgLabel1: 'IDP个人发展计划可视化',
  imgLabel2: '周报HTML自动分发示例',
  sections: [
    {
      type: 'card', title: 'IDP可视化系统', titleBg: THEME.gold, titleColor: THEME.bgDark,
      borderColor: THEME.gold, borderWidth: 2, height: 1.8,
      items: [
        '12人团队架构可视化：1统筹+2A+3B+6C层级展示',
        '个人发展路径：技能雷达图+成长轨迹+目标追踪',
        '区域覆盖：贵州/云南/新疆/山东/广东业务布局',
        'idp_v3.html开发中：交互式组件+动态数据更新',
        'AI辅助：WorkBuddy生成前端代码→人工调试→快速验证'
      ], fontSize: 12, itemHeight: 0.32
    },
    {
      type: 'card', title: '周报自动化系统', titleBg: THEME.blue, titleColor: THEME.textPrimary,
      borderColor: THEME.blue, borderWidth: 1.5, height: 1.4,
      items: [
        '邮件兼容HTML格式：内联样式+表格布局，确保多端显示一致',
        '内容追加原则：新数据追加而非覆盖，历史可追溯',
        '自动化流水线：数据汇总→HTML周报生成→邮件分发'
      ], fontSize: 12, itemHeight: 0.38
    },
    {
      type: 'card', title: '核心成果', titleBg: THEME.green, titleColor: THEME.bgDark,
      borderColor: THEME.green, borderWidth: 1.5, height: 0.8,
      items: [
        'IDP覆盖12人团队 | 周报100%自动化 | HTML邮件兼容多端'
      ], fontSize: 12, itemHeight: 0.55
    },
    {
      type: 'insight',
      text: '💡 心得：可视化是团队管理的关键工具，HTML周报格式是邮件分发的最佳实践'
    }
  ]
});

// ============================================================
// 保存文件
// ============================================================
const outputPath = 'C:\\AI学习资料\\mesheer\\2026-06-07-15-06-17\\科技项目全流程AI应用实践与心得_v4.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => console.log('PPT v4 generated successfully: ' + outputPath))
  .catch(err => console.error('Error:', err));
