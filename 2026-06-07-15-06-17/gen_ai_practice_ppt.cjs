const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "电网科创业务中心";
pres.title = "科技项目全流程AI应用实践与心得";

// Color palette - Midnight Executive style
const C = {
  navy: "1E2761",
  iceBlue: "CADCFC",
  white: "FFFFFF",
  offWhite: "F5F5F5",
  darkText: "1E2761",
  bodyText: "3A3A5C",
  mutedText: "6B7280",
  accent: "4F7DF7",
  teal: "0D9488",
  coral: "E05A3A",
  amber: "D97706",
  green: "16A34A",
  purple: "7C3AED",
  lightBlue: "EBF2FF",
  lightTeal: "E6F7F5",
  lightCoral: "FEF0ED",
  lightAmber: "FEF7E6",
  lightGreen: "EDFAF1",
  lightPurple: "F3EEFF",
  cardBg: "FFFFFF",
  borderLight: "E5E7EB",
};

const makeShadow = () => ({
  type: "outer", blur: 4, offset: 2, angle: 135, color: "000000", opacity: 0.08,
});

// ========== SLIDE 1: COVER ==========
let slide1 = pres.addSlide();
slide1.background = { color: C.navy };

slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 0, w: 10, h: 5.625,
  fill: { color: C.navy },
});

slide1.addShape(pres.shapes.RECTANGLE, {
  x: 0, y: 4.4, w: 10, h: 1.225,
  fill: { color: C.accent, transparency: 30 },
});

slide1.addText("科技项目全流程", {
  x: 0.8, y: 1.2, w: 8.4, h: 1.0,
  fontSize: 42, fontFace: "Arial Black", color: C.white, bold: true,
});

slide1.addText("AI应用实践与心得", {
  x: 0.8, y: 2.2, w: 8.4, h: 0.8,
  fontSize: 36, fontFace: "Arial Black", color: C.iceBlue, bold: true,
});

slide1.addShape(pres.shapes.LINE, {
  x: 0.8, y: 3.2, w: 2.5, h: 0,
  line: { color: C.accent, width: 3 },
});

slide1.addText("电网科创业务中心", {
  x: 0.8, y: 3.5, w: 4, h: 0.4,
  fontSize: 18, fontFace: "Arial", color: C.iceBlue,
});

slide1.addText("覆盖7大环节 · AI全流程赋能 · 实战经验沉淀", {
  x: 0.8, y: 4.55, w: 8, h: 0.4,
  fontSize: 14, fontFace: "Arial", color: C.white, transparency: 20,
});

slide1.addText("2026年6月", {
  x: 8.2, y: 4.55, w: 1.5, h: 0.4,
  fontSize: 13, fontFace: "Arial", color: C.iceBlue, align: "right",
});

// ========== SLIDE 2: TOC ==========
let slide2 = pres.addSlide();
slide2.background = { color: C.offWhite };

slide2.addText("目录", {
  x: 0.6, y: 0.4, w: 3, h: 0.5,
  fontSize: 28, fontFace: "Arial Black", color: C.navy, bold: true,
});

slide2.addShape(pres.shapes.LINE, {
  x: 0.6, y: 0.95, w: 1.2, h: 0,
  line: { color: C.accent, width: 3 },
});

const tocItems = [
  { num: "01", title: "科技项目全流程概览", sub: "7大环节全景图" },
  { num: "02", title: "各环节AI应用详解", sub: "申报简表→指南→可研→答辩→标书→研究→原型" },
  { num: "03", title: "AI工具链与应用架构", sub: "WorkBuddy · ima · imag2-ppt 三位一体" },
  { num: "04", title: "核心成果与数据", sub: "140规则 · 9专利 · 5省覆盖" },
  { num: "05", title: "实践心得与经验", sub: "避坑指南 · 效率提升 · 质量把控" },
  { num: "06", title: "下一步规划与展望", sub: "深化·拓展·固化" },
];

tocItems.forEach((item, i) => {
  const yBase = 1.3 + i * 0.7;

  slide2.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: yBase, w: 0.6, h: 0.5,
    fill: { color: C.accent },
  });
  slide2.addText(item.num, {
    x: 0.6, y: yBase, w: 0.6, h: 0.5,
    fontSize: 16, fontFace: "Arial Black", color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  slide2.addText(item.title, {
    x: 1.4, y: yBase, w: 5, h: 0.3,
    fontSize: 16, fontFace: "Arial", color: C.navy, bold: true, margin: 0,
  });
  slide2.addText(item.sub, {
    x: 1.4, y: yBase + 0.28, w: 5, h: 0.22,
    fontSize: 11, fontFace: "Arial", color: C.mutedText, margin: 0,
  });

  if (i < tocItems.length - 1) {
    slide2.addShape(pres.shapes.LINE, {
      x: 1.4, y: yBase + 0.58, w: 7.5, h: 0,
      line: { color: C.borderLight, width: 0.5 },
    });
  }
});

// ========== SLIDE 3: 全流程概览 ==========
let slide3 = pres.addSlide();
slide3.background = { color: C.white };

slide3.addText("科技项目全流程概览", {
  x: 0.6, y: 0.3, w: 8, h: 0.5,
  fontSize: 24, fontFace: "Arial Black", color: C.navy, bold: true,
});
slide3.addShape(pres.shapes.LINE, {
  x: 0.6, y: 0.85, w: 1.2, h: 0,
  line: { color: C.accent, width: 3 },
});

const stages = [
  { name: "申报简表", ai: "AI辅助框架", color: C.accent, bg: C.lightBlue },
  { name: "指南编写", ai: "AI内容生成", color: C.teal, bg: C.lightTeal },
  { name: "可研报告", ai: "AI全量生成", color: C.purple, bg: C.lightPurple },
  { name: "答辩PPT", ai: "AI排版优化", color: C.coral, bg: C.lightCoral },
  { name: "标书", ai: "AI模板填充", color: C.amber, bg: C.lightAmber },
  { name: "技术研究报告", ai: "AI深度生成", color: C.teal, bg: C.lightTeal },
  { name: "Demo原型", ai: "AI代码/可视化", color: C.green, bg: C.lightGreen },
];

stages.forEach((s, i) => {
  const xBase = 0.4 + i * 1.33;

  // Card
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.2, w: 1.2, h: 2.8,
    fill: { color: s.bg }, line: { color: s.color, width: 0.75 },
  });

  // Top accent bar
  slide3.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.2, w: 1.2, h: 0.06,
    fill: { color: s.color },
  });

  // Number
  slide3.addText(String(i + 1), {
    x: xBase, y: 1.4, w: 1.2, h: 0.4,
    fontSize: 22, fontFace: "Arial Black", color: s.color, bold: true, align: "center", margin: 0,
  });

  // Stage name
  slide3.addText(s.name, {
    x: xBase, y: 1.9, w: 1.2, h: 0.5,
    fontSize: 12, fontFace: "Arial", color: C.navy, bold: true, align: "center", margin: 0,
  });

  // AI role
  slide3.addText(s.ai, {
    x: xBase + 0.05, y: 2.5, w: 1.1, h: 0.4,
    fontSize: 9, fontFace: "Arial", color: s.color, align: "center", margin: 0,
  });

  // Arrow between cards
  if (i < stages.length - 1) {
    slide3.addShape(pres.shapes.LINE, {
      x: xBase + 1.22, y: 2.2, w: 0.1, h: 0,
      line: { color: C.mutedText, width: 1.5 },
    });
  }
});

// Bottom summary
slide3.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 4.3, w: 9.2, h: 1.0,
  fill: { color: C.lightBlue },
});
slide3.addText("核心洞察：AI已覆盖科技项目7大核心环节，从「辅助框架」到「全量生成」，效率提升3-10倍", {
  x: 0.6, y: 4.35, w: 8.8, h: 0.5,
  fontSize: 14, fontFace: "Arial", color: C.navy, bold: true, margin: 0,
});
slide3.addText("关键路径：申报简表 → 指南编写 → 可研报告 → 答辩PPT → 标书 → 技术研究报告 → Demo原型设计", {
  x: 0.6, y: 4.8, w: 8.8, h: 0.4,
  fontSize: 11, fontFace: "Arial", color: C.bodyText, margin: 0,
});

// ========== SLIDE 4-10: 7 stages detail ==========
const stageDetails = [
  {
    num: "01", name: "申报简表", subtitle: "AI辅助框架搭建与信息提炼",
    color: C.accent, bg: C.lightBlue,
    appDesc: "申报简表是项目立项的第一步，需要高度凝练项目核心信息。AI在此环节主要发挥信息提炼和结构化框架搭建作用。",
    practices: [
      { title: "项目信息提炼", desc: "输入项目技术方案要点，AI自动生成精简的申报简表内容框架" },
      { title: "多版本快速迭代", desc: "根据评审反馈快速调整简表内容，支持从长文本到短摘要的自动精炼" },
      { title: "关键词与指标匹配", desc: "AI辅助匹配指南要求的关键技术指标与创新点，确保简表覆盖评审要点" },
    ],
    tools: "WorkBuddy对话生成 + ima知识库参考",
    result: "简表起草时间从2-3天缩短至0.5天，框架一次通过率提升至80%",
    insight: "AI擅长快速提炼和结构化，但项目核心创新点需人工把关，AI辅助而非替代",
  },
  {
    num: "02", name: "指南编写", subtitle: "AI内容生成与规范对齐",
    color: C.teal, bg: C.lightTeal,
    appDesc: "指南编写需兼顾政策合规性与技术前瞻性，AI在内容生成和规范对齐方面发挥关键作用。",
    practices: [
      { title: "政策文档解析", desc: "AI解读上级政策文件，自动提取关键条款与要求，生成指南框架草案" },
      { title: "技术方向梳理", desc: "基于历史项目库和行业趋势，AI辅助确定技术方向与重点支持领域" },
      { title: "多轮审校对齐", desc: "AI逐条检查指南内容与政策要求的对齐度，减少遗漏和偏差" },
    ],
    tools: "WorkBuddy + ima政策知识库 + WebSearch政策检索",
    result: "指南初稿编写效率提升5倍，政策对齐度显著提高",
    insight: "AI生成内容需严格人工审核政策合规性，特别是涉密条款和审批流程部分",
  },
  {
    num: "03", name: "可研报告", subtitle: "AI全量生成与深度编排",
    color: C.purple, bg: C.lightPurple,
    appDesc: "可研报告是项目最核心的文档，动辄数万字。AI在此环节实现从框架到正文的深度生成，是最具突破性的应用场景。",
    practices: [
      { title: "docx-js自动生成脚本", desc: "开发Node.js脚本（gen_full_report.js），自动生成含封面、摘要、6章正文、参考文献、附录的完整报告" },
      { title: "技术图表自动嵌入", desc: "matplotlib生成22张技术图表（CHI模型、特征分布、关联规则等），自动嵌入Word文档" },
      { title: "多层级内容编排", desc: "68维特征矩阵/PCA-tSNE降维/Apriori关联挖掘/140条规则库等内容深度编排" },
    ],
    tools: "docx-js + matplotlib + WorkBuddy脚本编排",
    result: "技术报告自动生成1.35MB docx，6章+20参考文献+3附录，目标100+页/5万字",
    insight: "脚本化生成是可研报告的最优路径：一次编写脚本，多次复用迭代；图表自动嵌入避免手动排版",
  },
  {
    num: "04", name: "答辩PPT", subtitle: "AI排版优化与视觉增强",
    color: C.coral, bg: C.lightCoral,
    appDesc: "答辩PPT需要高度视觉化呈现项目亮点，AI在内容结构化、排版优化和视觉增强方面发挥作用。",
    practices: [
      { title: "内容结构化拆解", desc: "将可研报告核心内容拆解为PPT大纲，自动生成每页标题和要点" },
      { title: "imag2-ppt图像增强", desc: "使用imag2-ppt工具增强技术图表的视觉效果，提升专业度" },
      { title: "虚拟电厂PPT转换", desc: "将截图格式PPT转换为可编辑版本，保留原技术框架和图片风格（进行中）" },
    ],
    tools: "WorkBuddy + imag2-ppt + PptxGenJS脚本",
    result: "PPT制作效率提升3倍，但截图→可编辑转换仍存在技术挑战",
    insight: "AI对PPT排版优化效果显著，但截图格式转换需精确匹配原风格，建议优先使用AI原生生成",
  },
  {
    num: "05", name: "标书", subtitle: "AI模板填充与合规校验",
    color: C.amber, bg: C.lightAmber,
    appDesc: "标书编写格式要求严格、内容量大，AI在模板化填充和合规性校验方面具有天然优势。",
    practices: [
      { title: "模板化自动填充", desc: "基于历史标书模板，AI自动填充项目基本信息、技术方案、人员配置等章节" },
      { title: "合规性逐项校验", desc: "AI对照招标文件要求，逐项检查标书内容的完整性和合规性" },
      { title: "多标段内容复用", desc: "相同技术方案在不同标段间智能复用和适配，避免重复编写" },
    ],
    tools: "WorkBuddy + docx模板 + ima历史标书库",
    result: "标书编写时间缩短40%，合规性遗漏减少60%",
    insight: "标书AI化的关键在于建立高质量模板库和历史标书知识库，模板越完善AI效果越好",
  },
  {
    num: "06", name: "技术研究报告", subtitle: "AI深度生成与知识沉淀",
    color: C.teal, bg: C.lightTeal,
    appDesc: "技术研究报告是项目交付的核心成果，涉及深度技术分析和大量图表。此环节是AI应用最深、效果最显著的场景。",
    practices: [
      { title: "终端/表计故障规则库", desc: "87+34+19=140条规则三层级设计，AI辅助规则提取、分类和文档化" },
      { title: "CHI健康指数模型", desc: "AI辅助Arrhenius退化模型推导、68维特征矩阵设计和PCA-tSNE降维分析" },
      { title: "9份专利AI辅助撰写", desc: "南网AI虚拟电厂项目，AI辅助专利框架搭建和技术方案描述" },
    ],
    tools: "WorkBuddy深度生成 + docx-js脚本 + matplotlib图表 + ima知识库",
    result: "报告生成效率提升10倍，9份专利已提交，140条规则库设计完成",
    insight: "技术研究报告是AI价值的最高体现场景：脚本化生成+图表自动嵌入+知识库沉淀形成闭环",
  },
  {
    num: "07", name: "Demo原型设计", subtitle: "AI代码生成与可视化实现",
    color: C.green, bg: C.lightGreen,
    appDesc: "Demo原型是项目成果的直观展示，AI在代码生成、可视化和交互设计方面大幅降低开发门槛。",
    practices: [
      { title: "IDP可视化系统", desc: "idp_v3.html开发中，AI辅助HTML/CSS/JS代码生成，实现个人发展计划可视化" },
      { title: "周报HTML自动分发", desc: "AI生成邮件兼容HTML格式周报，内联样式+表格布局，追加式内容管理" },
      { title: "交互式数据可视化", desc: "AI辅助Chart.js/D3.js等可视化组件开发，快速实现技术指标交互展示" },
    ],
    tools: "WorkBuddy代码生成 + HTML/CSS/JS + Chart.js",
    result: "原型开发周期从2周缩短至3天，周报分发已全自动化",
    insight: "AI代码生成对前端原型效果最好，但复杂业务逻辑仍需人工调试；建议先出原型再迭代优化",
  },
];

stageDetails.forEach((stage) => {
  let slide = pres.addSlide();
  slide.background = { color: C.white };

  // Header
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.9,
    fill: { color: stage.color },
  });
  slide.addText(`${stage.num}  ${stage.name}`, {
    x: 0.6, y: 0.1, w: 5, h: 0.45,
    fontSize: 22, fontFace: "Arial Black", color: C.white, bold: true, margin: 0,
  });
  slide.addText(stage.subtitle, {
    x: 0.6, y: 0.52, w: 5, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: C.white, transparency: 20, margin: 0,
  });

  // Left: description + practices
  slide.addText(stage.appDesc, {
    x: 0.5, y: 1.1, w: 5.2, h: 0.6,
    fontSize: 11, fontFace: "Arial", color: C.bodyText, lineSpacingMultiple: 1.3,
  });

  stage.practices.forEach((p, pi) => {
    const yBase = 1.85 + pi * 1.0;

    // Practice card
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: yBase, w: 5.2, h: 0.85,
      fill: { color: C.offWhite },
      shadow: makeShadow(),
    });

    // Accent bar
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: yBase, w: 0.06, h: 0.85,
      fill: { color: stage.color },
    });

    slide.addText(p.title, {
      x: 0.7, y: yBase + 0.05, w: 4.9, h: 0.3,
      fontSize: 12, fontFace: "Arial", color: C.navy, bold: true, margin: 0,
    });
    slide.addText(p.desc, {
      x: 0.7, y: yBase + 0.38, w: 4.9, h: 0.42,
      fontSize: 10, fontFace: "Arial", color: C.bodyText, margin: 0, lineSpacingMultiple: 1.2,
    });
  });

  // Right: result + tools + insight
  const rx = 6.0;

  // Result card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: 1.1, w: 3.6, h: 1.4,
    fill: { color: stage.bg },
  });
  slide.addText("核心成果", {
    x: rx + 0.15, y: 1.15, w: 3.3, h: 0.3,
    fontSize: 13, fontFace: "Arial", color: stage.color, bold: true, margin: 0,
  });
  slide.addText(stage.result, {
    x: rx + 0.15, y: 1.5, w: 3.3, h: 0.9,
    fontSize: 10, fontFace: "Arial", color: C.bodyText, margin: 0, lineSpacingMultiple: 1.3,
  });

  // Tools card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: 2.7, w: 3.6, h: 0.9,
    fill: { color: C.offWhite },
  });
  slide.addText("AI工具组合", {
    x: rx + 0.15, y: 2.75, w: 3.3, h: 0.25,
    fontSize: 12, fontFace: "Arial", color: C.navy, bold: true, margin: 0,
  });
  slide.addText(stage.tools, {
    x: rx + 0.15, y: 3.05, w: 3.3, h: 0.45,
    fontSize: 10, fontFace: "Arial", color: C.accent, margin: 0,
  });

  // Insight card
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: 3.8, w: 3.6, h: 1.5,
    fill: { color: C.white },
    line: { color: stage.color, width: 1 },
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: 3.8, w: 3.6, h: 0.35,
    fill: { color: stage.color },
  });
  slide.addText("实践心得", {
    x: rx + 0.15, y: 3.83, w: 3.3, h: 0.3,
    fontSize: 12, fontFace: "Arial", color: C.white, bold: true, margin: 0,
  });
  slide.addText(stage.insight, {
    x: rx + 0.15, y: 4.25, w: 3.3, h: 0.95,
    fontSize: 10, fontFace: "Arial", color: C.bodyText, margin: 0, lineSpacingMultiple: 1.3,
  });
});

// ========== SLIDE 11: AI工具链架构 ==========
let slide11 = pres.addSlide();
slide11.background = { color: C.offWhite };

slide11.addText("AI工具链与应用架构", {
  x: 0.6, y: 0.3, w: 8, h: 0.5,
  fontSize: 24, fontFace: "Arial Black", color: C.navy, bold: true,
});
slide11.addShape(pres.shapes.LINE, {
  x: 0.6, y: 0.85, w: 1.2, h: 0,
  line: { color: C.accent, width: 3 },
});

// Three tool columns
const toolCards = [
  {
    name: "WorkBuddy", role: "AI核心引擎",
    features: ["对话式文档生成", "代码编写与脚本", "多模态内容创作", "自动化任务调度"],
    color: C.accent, bg: C.lightBlue,
  },
  {
    name: "腾讯ima", role: "知识库中枢",
    features: ["政策文档归档", "历史项目沉淀", "团队知识共享", "跨项目经验复用"],
    color: C.teal, bg: C.lightTeal,
  },
  {
    name: "imag2-ppt", role: "视觉增强器",
    features: ["PPT图像增强", "技术图表美化", "可视化呈现优化", "专业度提升"],
    color: C.coral, bg: C.lightCoral,
  },
];

toolCards.forEach((tool, i) => {
  const xBase = 0.5 + i * 3.15;

  slide11.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.2, w: 2.9, h: 3.0,
    fill: { color: C.white },
    shadow: makeShadow(),
  });

  slide11.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.2, w: 2.9, h: 0.5,
    fill: { color: tool.color },
  });

  slide11.addText(tool.name, {
    x: xBase, y: 1.22, w: 2.9, h: 0.3,
    fontSize: 16, fontFace: "Arial Black", color: C.white, bold: true, align: "center", margin: 0,
  });
  slide11.addText(tool.role, {
    x: xBase, y: 1.5, w: 2.9, h: 0.22,
    fontSize: 10, fontFace: "Arial", color: C.white, transparency: 20, align: "center", margin: 0,
  });

  tool.features.forEach((feat, fi) => {
    const fy = 1.85 + fi * 0.55;
    slide11.addShape(pres.shapes.OVAL, {
      x: xBase + 0.2, y: fy + 0.08, w: 0.15, h: 0.15,
      fill: { color: tool.color },
    });
    slide11.addText(feat, {
      x: xBase + 0.5, y: fy, w: 2.2, h: 0.3,
      fontSize: 11, fontFace: "Arial", color: C.bodyText, margin: 0,
    });
  });
});

// Connection arrows between tools
slide11.addText("WorkBuddy ↔ ima ↔ imag2-ppt  三位一体协作", {
  x: 0.5, y: 4.5, w: 9, h: 0.35,
  fontSize: 13, fontFace: "Arial", color: C.navy, bold: true, align: "center",
});

slide11.addText("钉钉集成（已连接）· 马丁策略自动化（每周日）· 周报HTML分发（已上线）", {
  x: 0.5, y: 4.85, w: 9, h: 0.3,
  fontSize: 10, fontFace: "Arial", color: C.mutedText, align: "center",
});

// ========== SLIDE 12: 核心成果数据 ==========
let slide12 = pres.addSlide();
slide12.background = { color: C.white };

slide12.addText("核心成果与关键数据", {
  x: 0.6, y: 0.3, w: 8, h: 0.5,
  fontSize: 24, fontFace: "Arial Black", color: C.navy, bold: true,
});
slide12.addShape(pres.shapes.LINE, {
  x: 0.6, y: 0.85, w: 1.2, h: 0,
  line: { color: C.accent, width: 3 },
});

// KPI row
const kpis = [
  { num: "140", label: "规则库规则数", sub: "单元87+设备34+台区19", color: C.accent },
  { num: "9", label: "已提交专利", sub: "南网AI虚拟电厂", color: C.teal },
  { num: "5", label: "覆盖省份", sub: "黔/滇/新/鲁/粤", color: C.purple },
  { num: "22", label: "技术图表", sub: "matplotlib自动生成", color: C.coral },
  { num: "10x", label: "效率提升", sub: "技术研究报告", color: C.green },
];

kpis.forEach((kpi, i) => {
  const xBase = 0.4 + i * 1.88;
  slide12.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.15, w: 1.7, h: 1.4,
    fill: { color: C.offWhite },
  });
  slide12.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.15, w: 1.7, h: 0.05,
    fill: { color: kpi.color },
  });
  slide12.addText(kpi.num, {
    x: xBase, y: 1.3, w: 1.7, h: 0.55,
    fontSize: 30, fontFace: "Arial Black", color: kpi.color, bold: true, align: "center", margin: 0,
  });
  slide12.addText(kpi.label, {
    x: xBase, y: 1.9, w: 1.7, h: 0.25,
    fontSize: 11, fontFace: "Arial", color: C.navy, bold: true, align: "center", margin: 0,
  });
  slide12.addText(kpi.sub, {
    x: xBase, y: 2.2, w: 1.7, h: 0.2,
    fontSize: 9, fontFace: "Arial", color: C.mutedText, align: "center", margin: 0,
  });
});

// Efficiency comparison table
slide12.addText("各环节AI应用效率提升对比", {
  x: 0.5, y: 2.8, w: 9, h: 0.35,
  fontSize: 14, fontFace: "Arial", color: C.navy, bold: true,
});

const tableData = [
  [
    { text: "环节", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, align: "center" } },
    { text: "传统耗时", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, align: "center" } },
    { text: "AI辅助耗时", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, align: "center" } },
    { text: "效率提升", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, align: "center" } },
    { text: "AI成熟度", options: { fill: { color: C.navy }, color: C.white, bold: true, fontSize: 11, align: "center" } },
  ],
  ["申报简表", "2-3天", "0.5天", "4-6倍", { text: "成熟", options: { color: C.green, bold: true } }],
  ["指南编写", "5-7天", "1-2天", "3-5倍", { text: "成熟", options: { color: C.green, bold: true } }],
  ["可研报告", "10-15天", "1-3天", "5-10倍", { text: "深度应用", options: { color: C.accent, bold: true } }],
  ["答辩PPT", "3-5天", "1天", "3-5倍", { text: "进行中", options: { color: C.amber, bold: true } }],
  ["标书", "7-10天", "3-5天", "2-3倍", { text: "探索中", options: { color: C.coral, bold: true } }],
  ["技术研究报告", "15-20天", "2-3天", "7-10倍", { text: "深度应用", options: { color: C.accent, bold: true } }],
  ["Demo原型", "10-14天", "2-3天", "5-7倍", { text: "成熟", options: { color: C.green, bold: true } }],
];

slide12.addTable(tableData, {
  x: 0.5, y: 3.2, w: 9, h: 2.1,
  colW: [1.5, 1.5, 1.5, 1.5, 1.5],
  border: { pt: 0.5, color: C.borderLight },
  rowH: [0.3, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27],
  fontSize: 10,
  fontFace: "Arial",
  color: C.bodyText,
  align: "center",
  valign: "middle",
});

// ========== SLIDE 13: 实践心得 ==========
let slide13 = pres.addSlide();
slide13.background = { color: C.offWhite };

slide13.addText("实践心得与经验总结", {
  x: 0.6, y: 0.3, w: 8, h: 0.5,
  fontSize: 24, fontFace: "Arial Black", color: C.navy, bold: true,
});
slide13.addShape(pres.shapes.LINE, {
  x: 0.6, y: 0.85, w: 1.2, h: 0,
  line: { color: C.accent, width: 3 },
});

const insights = [
  {
    title: "脚本化 > 对话式",
    desc: "可研报告等大文档，脚本化生成（docx-js）远优于逐轮对话。一次编写脚本，多次复用迭代，效率最高。",
    icon: "01", color: C.accent,
  },
  {
    title: "知识库是AI的弹药",
    desc: "ima知识库中的政策文档、历史项目、行业资料是AI生成高质量内容的前提。知识库越完善，AI输出越精准。",
    icon: "02", color: C.teal,
  },
  {
    title: "人工把关核心创新",
    desc: "AI擅长结构化和填充，但项目核心创新点、关键论证逻辑必须人工把关。AI辅助而非替代是正确姿势。",
    icon: "03", color: C.coral,
  },
  {
    title: "迭代优于一次成型",
    desc: "AI生成初版后快速迭代，比追求一次到位更高效。先出框架再填充细节，先出原型再打磨优化。",
    icon: "04", color: C.purple,
  },
  {
    title: "截图转换是当前短板",
    desc: "截图格式PPT→可编辑版本的AI转换仍有偏差，建议优先使用AI原生生成而非格式转换。",
    icon: "05", color: C.amber,
  },
  {
    title: "自动化任务解放人力",
    desc: "马丁策略周报、周报HTML分发等自动化任务，实现'设定后遗忘'，释放团队精力聚焦核心业务。",
    icon: "06", color: C.green,
  },
];

insights.forEach((ins, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const xBase = 0.4 + col * 3.15;
  const yBase = 1.15 + row * 2.15;

  slide13.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: yBase, w: 2.95, h: 1.95,
    fill: { color: C.white },
    shadow: makeShadow(),
  });

  slide13.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: yBase, w: 0.5, h: 0.5,
    fill: { color: ins.color },
  });
  slide13.addText(ins.icon, {
    x: xBase, y: yBase, w: 0.5, h: 0.5,
    fontSize: 16, fontFace: "Arial Black", color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
  });

  slide13.addText(ins.title, {
    x: xBase + 0.6, y: yBase + 0.05, w: 2.2, h: 0.4,
    fontSize: 13, fontFace: "Arial", color: C.navy, bold: true, valign: "middle", margin: 0,
  });

  slide13.addText(ins.desc, {
    x: xBase + 0.15, y: yBase + 0.6, w: 2.65, h: 1.2,
    fontSize: 10, fontFace: "Arial", color: C.bodyText, lineSpacingMultiple: 1.3,
  });
});

// ========== SLIDE 14: 下一步规划 ==========
let slide14 = pres.addSlide();
slide14.background = { color: C.white };

slide14.addText("下一步规划与展望", {
  x: 0.6, y: 0.3, w: 8, h: 0.5,
  fontSize: 24, fontFace: "Arial Black", color: C.navy, bold: true,
});
slide14.addShape(pres.shapes.LINE, {
  x: 0.6, y: 0.85, w: 1.2, h: 0,
  line: { color: C.accent, width: 3 },
});

const plans = [
  {
    phase: "深化", subtitle: "Q3 2026",
    items: ["技术报告达标验证（100+页/5万字）", "虚拟电厂PPT可编辑版重做", "IDP可视化系统正式上线", "WorkBuddy+钉钉深度集成"],
    color: C.accent, bg: C.lightBlue,
  },
  {
    phase: "拓展", subtitle: "Q4 2026",
    items: ["标书AI全流程试点", "马丁策略回测验证与调优", "多项目并行AI生成能力", "团队AI工具培训推广"],
    color: C.teal, bg: C.lightTeal,
  },
  {
    phase: "固化", subtitle: "2027",
    items: ["科技项目AI标准化流程", "知识库持续运营机制", "AI质量评估体系建立", "跨区域AI最佳实践推广"],
    color: C.purple, bg: C.lightPurple,
  },
];

plans.forEach((plan, i) => {
  const xBase = 0.4 + i * 3.15;

  slide14.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.2, w: 2.95, h: 3.6,
    fill: { color: plan.bg },
  });

  slide14.addShape(pres.shapes.RECTANGLE, {
    x: xBase, y: 1.2, w: 2.95, h: 0.6,
    fill: { color: plan.color },
  });

  slide14.addText(plan.phase, {
    x: xBase, y: 1.2, w: 2.95, h: 0.4,
    fontSize: 20, fontFace: "Arial Black", color: C.white, bold: true, align: "center", margin: 0,
  });
  slide14.addText(plan.subtitle, {
    x: xBase, y: 1.58, w: 2.95, h: 0.22,
    fontSize: 11, fontFace: "Arial", color: C.white, transparency: 20, align: "center", margin: 0,
  });

  plan.items.forEach((item, ii) => {
    const iy = 2.0 + ii * 0.65;
    slide14.addShape(pres.shapes.OVAL, {
      x: xBase + 0.2, y: iy + 0.08, w: 0.13, h: 0.13,
      fill: { color: plan.color },
    });
    slide14.addText(item, {
      x: xBase + 0.45, y: iy, w: 2.3, h: 0.5,
      fontSize: 10, fontFace: "Arial", color: C.bodyText, margin: 0, lineSpacingMultiple: 1.2,
    });
  });
});

// Bottom vision
slide14.addShape(pres.shapes.RECTANGLE, {
  x: 0.4, y: 5.0, w: 9.2, h: 0.45,
  fill: { color: C.navy },
});
slide14.addText("愿景：打造科技项目AI全流程赋能标杆，实现从「AI辅助」到「AI原生」的范式跃迁", {
  x: 0.6, y: 5.0, w: 8.8, h: 0.45,
  fontSize: 12, fontFace: "Arial", color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
});

// ========== SLIDE 15: THANK YOU ==========
let slide15 = pres.addSlide();
slide15.background = { color: C.navy };

slide15.addText("THANKS", {
  x: 1, y: 1.5, w: 8, h: 1.2,
  fontSize: 52, fontFace: "Arial Black", color: C.white, bold: true, align: "center",
});

slide15.addShape(pres.shapes.LINE, {
  x: 3.5, y: 2.8, w: 3, h: 0,
  line: { color: C.accent, width: 3 },
});

slide15.addText("科技项目全流程AI应用实践与心得", {
  x: 1, y: 3.0, w: 8, h: 0.5,
  fontSize: 18, fontFace: "Arial", color: C.iceBlue, align: "center",
});

slide15.addText("电网科创业务中心 | 2026年6月", {
  x: 1, y: 3.5, w: 8, h: 0.4,
  fontSize: 13, fontFace: "Arial", color: C.iceBlue, transparency: 30, align: "center",
});

// Write file
const outPath = path.join("C:\\AI学习资料\\mesheer\\2026-06-07-15-06-17", "科技项目全流程AI应用实践与心得.pptx");
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("PPT generated successfully:", outPath);
}).catch(err => {
  console.error("Error generating PPT:", err);
});
