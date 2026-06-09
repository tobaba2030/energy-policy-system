
import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  TableOfContents,
  Footer,
  Header,
  Math as DocxMath,
  MathRun,
  AlignmentType,
  HeadingLevel,
  PageBreak,
  BorderStyle,
  WidthType,
  ShadingType,
  PageNumber,
  InternalHyperlink,
  ExternalHyperlink,
  ImageRun,
} from "docx";

// 中英混排字体：中文宋体，英文/数字 Times New Roman
const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306; // A4 减去左右各 1.25 寸边距

// ————— 辅助函数 —————

/** 正文段落 */
function bodyParagraph(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

/** 文档标题（居中、小二、加粗） */
function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({ text, font: FONT, bold: true, size: 36 }),
    ],
  });
}

/** 标题段落（level: 1/2/3/4） — H1 自动分页 */
function heading(level, text) {
  const config = {
    1: { heading: HeadingLevel.HEADING_1, size: 30, before: 120, after: 60 },
    2: { heading: HeadingLevel.HEADING_2, size: 28, before: 60, after: 60 },
    3: { heading: HeadingLevel.HEADING_3, size: 24, before: 60, after: 60 },
    4: { heading: HeadingLevel.HEADING_4, size: 24, before: 60, after: 60 },
  };
  const c = config[level];
  return new Paragraph({
    heading: c.heading,
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", before: c.before, after: c.after },
    pageBreakBefore: level === 1, // H1 前强制分页
    children: [
      new TextRun({ text, font: FONT, bold: true, size: c.size }),
    ],
  });
}

/** 小标题（无分页，用于技能文档） */
function subHeading(level, text) {
  const config = {
    1: { size: 30, before: 120, after: 60 },
    2: { size: 28, before: 60, after: 60 },
    3: { size: 24, before: 60, after: 60 },
  };
  const c = config[level] || config[3];
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", before: c.before, after: c.after },
    children: [
      new TextRun({ text, font: FONT, bold: true, size: c.size }),
    ],
  });
}

/**
 * 目录页（返回数组，展开到 children）
 * 打开 Word 后按 Ctrl+A → F9 刷新目录
 */
function tocPage(title = "目  录") {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 240 },
      children: [
        new TextRun({ text: title, font: FONT, bold: true, size: 36 }),
      ],
    }),
    new TableOfContents("TOC", {
      hyperlink: true,
      headingStyleRange: "1-3",
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

// 表格边框统一在 Table 级别定义
const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
};

/** 表头单元格（加粗、浅蓝底、居中） */
function headerCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "D9E2F3", type: ShadingType.CLEAR },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: FONT, size: 21, bold: true })],
    })],
  });
}

/** 表格内容单元格 */
function bodyCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: FONT, size: 21 })],
    })],
  });
}

/** 带序号的列表项 */
function listItem(text, level = 1) {
  const indentLeft = level * 480;
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    indent: { left: indentLeft, firstLineChars: 200 },
    alignment: AlignmentType.LEFT,
    children: [
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

/** 代码块（用于技能文档） */
function codeBlock(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
    border: {
      left: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
    },
    indent: { left: 480 },
    children: [
      new TextRun({ text, font: { name: "Courier New", eastAsia: "宋体" }, size: 20 }),
    ],
  });
}

// ————— 文档内容 —————

const children = [
  // 标题页
  docTitle("能源电网领域科技项目报告自动化生成技能"),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({ text: "sci-tech-report-generation", font: FONT, bold: true, size: 28 }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 60 },
    children: [
      new TextRun({ text: "版本: v1.0", font: FONT, size: 24 }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [
      new TextRun({ text: "编制日期: 2026年6月", font: FONT, size: 24 }),
    ],
  }),
  new Paragraph({
    children: [new PageBreak()],
  }),

  // 目录
  ...tocPage(),

  // 第一部分：技能概述
  subHeading(1, "一、技能概述"),
  bodyParagraph("本技能（sci-tech-report-generation）专门用于能源电网领域科技项目报告的自动化生成。基于系统化的撰写流程，从项目策划阶段到完整研究报告的全流程AI辅助生成，包含项目背景与战略对齐、技术方向与领域聚焦、研究内容与任务分解、成果输出与转化预期等完整结构。"),

  subHeading(2, "1.1 核心功能"),
  listItem("1. 项目背景与战略对齐分析：自动识别国家战略与政策要求", 1),
  listItem("2. 技术方向与领域聚焦：聚焦能源电网6大重点方向", 1),
  listItem("3. 三类项目模板：集中攻关类、示范试验类、应用推广类", 1),
  listItem("4. 四维技术路径设计：数据采集层、模型构建层、系统集成层、应用验证层", 1),
  listItem("5. 完整报告结构：8个章节，支持完整的科技项目报告撰写", 1),

  subHeading(2, "1.2 适用场景"),
  listItem("能源电网领域科技项目申报书撰写", 1),
  listItem("科研项目可行性研究报告编写", 1),
  listItem("新型电力系统相关技术研究报告", 1),
  listItem("新能源并网、消纳等专题研究", 1),
  listItem("电力系统智能化、数字化项目规划", 1),

  new Paragraph({
    children: [new PageBreak()],
  }),

  // 第二部分：报告结构
  subHeading(1, "二、报告完整结构"),
  subHeading(2, "2.1 标准报告大纲"),

  // 报告结构表格
  new Paragraph({
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: "表1 科技项目报告标准结构", font: FONT, size: 21, bold: true }),
    ],
  }),
  new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [2000, 6306],
    borders: TABLE_BORDERS,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          headerCell("章节", 2000),
          headerCell("内容概述", 6306),
        ],
      }),
      new TableRow({
        children: [
          bodyCell("第1章 项目概述", 2000),
          new TableCell({
            width: { size: 6306, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 360, lineRule: "auto" },
                children: [new TextRun({ text: "1.1 项目背景；1.2 研究意义；1.3 研究目标", font: FONT, size: 21 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          bodyCell("第2章 研究现状", 2000),
          new TableCell({
            width: { size: 6306, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 360, lineRule: "auto" },
                children: [new TextRun({ text: "2.1 国内外研究现状；2.2 发展趋势分析；2.3 存在问题", font: FONT, size: 21 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          bodyCell("第3章 研究内容", 2000),
          new TableCell({
            width: { size: 6306, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 360, lineRule: "auto" },
                children: [new TextRun({ text: "3.1 总体技术路线；3.2 关键研究内容；3.3 技术难点与创新点", font: FONT, size: 21 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          bodyCell("第4章 研究计划", 2000),
          new TableCell({
            width: { size: 6306, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 360, lineRule: "auto" },
                children: [new TextRun({ text: "4.1 阶段划分；4.2 里程碑节点；4.3 任务分解", font: FONT, size: 21 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          bodyCell("第5章 成果与指标", 2000),
          new TableCell({
            width: { size: 6306, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 360, lineRule: "auto" },
                children: [new TextRun({ text: "5.1 预期成果；5.2 考核指标", font: FONT, size: 21 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          bodyCell("第6章 团队与保障", 2000),
          new TableCell({
            width: { size: 6306, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 360, lineRule: "auto" },
                children: [new TextRun({ text: "6.1 团队组成；6.2 已有基础；6.3 保障条件", font: FONT, size: 21 })],
              }),
            ],
          }),
        ],
      }),
      new TableRow({
        children: [
          bodyCell("第7章 风险分析", 2000),
          new TableCell({
            width: { size: 6306, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                spacing: { line: 360, lineRule: "auto" },
                children: [new TextRun({ text: "7.1-7.4 各类风险及应对措施", font: FONT, size: 21 })],
              }),
            ],
          }),
        ],
      }),
    ],
  }),

  new Paragraph({
    children: [new PageBreak()],
  }),

  // 第三部分：使用指南
  subHeading(1, "三、使用指南"),
  subHeading(2, "3.1 准备工作"),
  bodyParagraph("在使用本技能前，请准备以下基本信息："),
  listItem("1. 项目主题或核心业务需求", 1),
  listItem("2. 项目类型（集中攻关类/示范试验类/应用推广类）", 1),
  listItem("3. 技术领域（新型电力系统/新能源并网/人工智能应用等）", 1),
  listItem("4. 可选补充信息（参考资料、数据来源、特殊要求等）", 1),

  subHeading(2, "3.2 生成流程"),
  listItem("步骤1：输入项目基本信息，使用完整报告生成提示词模板", 1),
  listItem("步骤2：AI自动生成完整的8章报告结构", 1),
  listItem("步骤3：根据需要对重点章节进行单独优化", 1),
  listItem("步骤4：使用质量检查清单进行审核", 1),
  listItem("步骤5：人工润色，调整格式和细节", 1),

  subHeading(2, "3.3 提示词示例"),
  new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [
      new TextRun({ text: "【项目主题】", font: FONT, bold: true, size: 24 }),
      new TextRun({ text: "基于多源数据融合的区域电网新能源消纳能力提升关键技术研究", font: FONT, size: 24 }),
    ],
  }),
  new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: "【项目类型】", font: FONT, bold: true, size: 24 }),
      new TextRun({ text: "集中攻关类", font: FONT, size: 24 }),
    ],
  }),
  new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: "【技术领域】", font: FONT, bold: true, size: 24 }),
      new TextRun({ text: "新型电力系统、新能源并网、人工智能应用", font: FONT, size: 24 }),
    ],
  }),
  bodyParagraph("详细的提示词模板请参考技能主文档（SKILL.md）。"),

  new Paragraph({
    children: [new PageBreak()],
  }),

  // 第四部分：质量检查清单
  subHeading(1, "四、质量检查清单"),
  subHeading(2, "4.1 结构完整性"),
  listItem("报告包含所有必要章节（概述、现状、内容、计划、成果、团队、风险）", 1),
  listItem("章节编号规范，层级清晰", 1),
  listItem("各章节篇幅合理，重点突出", 1),
  listItem("章节之间逻辑连贯，过渡自然", 1),

  subHeading(2, "4.2 内容质量"),
  listItem("项目背景结合国家战略与行业需求", 1),
  listItem("研究意义从理论价值和应用价值两方面阐述", 1),
  listItem("目标明确、具体、可量化", 1),
  listItem("关键数据标注明确来源", 1),

  subHeading(2, "4.3 技术创新性"),
  listItem("技术创新点明确，与现有研究有对比", 1),
  listItem("技术难点分析到位，有对应的解决方案", 1),
  listItem("研究内容具体、详实，涵盖核心技术环节", 1),

  new Paragraph({
    children: [new PageBreak()],
  }),

  // 第五部分：附件 - 完整示例报告
  subHeading(1, "五、附件：完整示例报告"),
  docTitle("基于多源数据融合的区域电网新能源消纳能力提升关键技术研究"),
  new Paragraph({
    children: [new PageBreak()],
  }),

  // 示例报告 - 第1章
  subHeading(1, "1. 项目概述"),
  subHeading(2, "1.1 项目背景"),
  bodyParagraph("在\u201c双碳\u201d战略目标引领下，我国新能源发展步入快车道。截至2025年底，区域电网新能源装机容量已超过30GW，占总装机容量比例达到35%，预计到2030年新能源装机占比将超过50%（数据来源：区域电网2025年运行年报）。然而，随着新能源大规模并网，新能源消纳问题日益突出，年均弃电率约为8%，在新能源大发高峰期甚至超过15%，给电网安全稳定运行和新能源高效利用带来巨大挑战。"),
  bodyParagraph("当前，制约新能源消纳能力提升的主要问题包括：一是新能源发电预测精度不足，传统单一数据源预测方法难以应对复杂气象条件下的出力波动；二是多源数据协同利用程度不高，气象、发电、负荷、电网运行等数据分散在不同系统，缺乏有效融合；三是源网荷储协同优化能力不足，难以充分挖掘各类调节资源的潜力；四是调峰辅助服务市场机制有待完善，市场主体参与调峰的积极性尚未充分调动。"),
  bodyParagraph("在此背景下，开展基于多源数据融合的区域电网新能源消纳能力提升关键技术研究，对推动区域能源清洁低碳转型、保障电力系统安全稳定运行、促进新能源高质量发展具有重要意义。"),

  subHeading(2, "1.2 研究意义"),
  new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: "理论意义：", font: FONT, size: 24, bold: true }),
      new TextRun({ text: "本研究将多源数据融合、人工智能预测、优化调度等理论方法应用于新能源消纳领域，拓展了新型电力系统优化运行理论的应用边界，丰富了复杂电力系统不确定性决策的方法论体系，对相关学科的发展具有积极推动作用。", font: FONT, size: 24 }),
    ],
  }),
  new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: "应用价值：", font: FONT, size: 24, bold: true }),
      new TextRun({ text: "本项目研究成果可直接应用于区域电网调度运行，通过提升新能源预测精度、优化源网荷储协同运行，预计可将区域新能源消纳率提升5-8个百分点，显著减少新能源弃电量，带来显著的经济效益和环境效益。同时，研究成果可在其他省区电网推广应用，具有广阔的应用前景。", font: FONT, size: 24 }),
    ],
  }),

  subHeading(2, "1.3 研究目标"),
  new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: "总体目标：", font: FONT, size: 24, bold: true }),
      new TextRun({ text: "突破多源数据融合、高精度预测、协同优化等关键技术，显著提升区域电网新能源消纳能力，支撑新型电力系统建设。", font: FONT, size: 24 }),
    ],
  }),
  new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: "具体目标：", font: FONT, size: 24, bold: true }),
    ],
  }),
  listItem("1. 构建多源异构数据融合平台，实现气象、发电、负荷、电网运行等数据的高效集成与共享", 2),
  listItem("2. 研发新能源发电高精度预测技术，短期预测精度达到90%以上，超短期预测精度达到95%以上", 2),
  listItem("3. 建立源网荷储协同优化调度模型，实现区域调峰资源的高效利用", 2),
  listItem("4. 开发新能源消纳能力评估与提升决策支持系统，并在实际电网开展示范应用", 2),

  new Paragraph({
    children: [new PageBreak()],
  }),

  // 第2-7章（简化版，保持文档完整）
  subHeading(1, "2. 国内外研究现状与发展趋势"),
  subHeading(2, "2.1 国内外研究现状"),
  bodyParagraph("国内外在新能源预测、多源数据融合、源网荷储协同优化等方面已开展大量研究，取得了一系列成果。但在多源数据深度融合、复杂场景预测精度、工程化实用性等方面仍有提升空间。"),

  subHeading(1, "3. 研究内容与技术方案"),
  bodyParagraph("本项目采用\u201c数据融合-智能预测-协同优化-系统集成-示范应用\u201d的总体技术路线，包含4项关键研究内容：多源异构数据融合技术、新能源高精度预测技术、源网荷储协同优化调度技术、新能源消纳能力评估与提升系统开发。"),

  subHeading(1, "4. 研究计划与进度安排"),
  bodyParagraph("本项目计划分3个阶段实施，总周期为3年。第一阶段完成关键技术研究与原型开发，第二阶段完成核心技术突破与系统集成，第三阶段完成示范应用与成果总结。"),

  subHeading(1, "5. 预期成果与考核指标"),
  bodyParagraph("预期成果包括4项技术成果、4-6项发明专利、6-9篇学术论文、2-3项软件著作权。考核指标涵盖技术指标、应用指标和知识产权指标三个维度。"),

  subHeading(1, "6. 研究团队与保障条件"),
  bodyParagraph("本项目由多学科交叉团队组成，研究团队共15人，其中高级职称6人。拥有完善的实验条件、数据资源和合作保障。"),

  subHeading(1, "7. 风险分析与应对措施"),
  bodyParagraph("从技术风险、管理风险、数据风险、应用风险四个方面进行分析，并制定了相应的应对措施。"),

  new Paragraph({
    children: [new PageBreak()],
  }),

  // 结语
  subHeading(1, "结语"),
  bodyParagraph("本技能为能源电网领域科技项目报告撰写提供了完整的解决方案。通过标准化的报告结构、系统化的撰写流程、丰富的提示词模板，可显著提升科技项目报告的撰写效率和质量。建议在使用过程中，结合具体项目特点进行灵活调整和优化，确保报告内容贴合实际需求。"),
  new Paragraph({
    spacing: { before: 240, after: 240 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: "（全文完）", font: FONT, size: 24 }),
    ],
  }),
];

// ————— 文档定义 —————

const doc = new Document({
  features: { updateFields: true }, // 支持目录刷新
  styles: {
    default: {
      document: {
        run: { font: "Times New Roman", size: 24 },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 120, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 2 },
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1800, bottom: 1440, left: 1800, footer: 992 },
      },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            children: [PageNumber.CURRENT],
            font: { name: "Times New Roman" },
            size: 18,
          })],
        })],
      }),
    },
    children: children,
  }],
});

console.log("正在生成 Word 文档...");

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = "sci-tech-report-generation技能材料.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log("✅ 文档生成成功：", outputPath);
  console.log("📝 提示：打开 Word 后请按 Ctrl+A → F9 刷新目录");
}).catch((err) => {
  console.error("❌ 文档生成失败：", err);
});
