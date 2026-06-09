/**
 * 生成电网科技项目技术成果报告评审Word文档 v2.0
 * 基于六维度评审和五元价值评价生成评审意见书
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, PageBreak, BorderStyle, WidthType, 
  ShadingType, PageNumber, Footer
} = require("docx");

// 中英混排字体常量
const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

// 表格边框样式
const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
};

// ============ 辅助函数 ============

/** 正文段落 */
function bodyParagraph(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

/** 加粗前缀正文 */
function bodyParagraphWithBoldPrefix(boldText, normalText) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: boldText, font: FONT, size: 24, bold: true }),
      new TextRun({ text: normalText, font: FONT, size: 24 }),
    ],
  });
}

/** 文档标题 */
function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: FONT, bold: true, size: 36 })],
  });
}

/** 标题段落 */
function heading(level, text) {
  const config = {
    1: { heading: HeadingLevel.HEADING_1, size: 30, before: 120, after: 60 },
    2: { heading: HeadingLevel.HEADING_2, size: 28, before: 60, after: 60 },
    3: { heading: HeadingLevel.HEADING_3, size: 24, before: 60, after: 60 },
  };
  const c = config[level];
  return new Paragraph({
    heading: c.heading,
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", before: c.before, after: c.after },
    pageBreakBefore: level === 1,
    children: [new TextRun({ text, font: FONT, bold: true, size: c.size })],
  });
}

/** 表头单元格 */
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
function bodyCell(text, width, align = AlignmentType.CENTER) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, font: FONT, size: 21 })],
    })],
  });
}

/** 表注 */
function tableCaption(tableNumber, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `表${tableNumber} ${caption}`, font: FONT, size: 21, bold: true })],
  });
}

/** 获取等级标签 */
function getGradeLabel(score) {
  if (score >= 90) return "优秀";
  if (score >= 80) return "良好";
  if (score >= 70) return "合格";
  if (score >= 60) return "基本合格";
  return "不合格";
}

/** 数字转中文 */
function numberToChinese(num) {
  const chinese = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  if (num <= 10) return chinese[num];
  return num.toString();
}

// ============ 报告生成函数 ============

/**
 * 生成封面页
 */
function generateCoverPage(reviewData) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 2400, after: 480 },
      children: [new TextRun({ text: "电网科技项目技术成果报告", font: FONT, bold: true, size: 52 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [new TextRun({ text: "评  审  意  见  书", font: FONT, bold: true, size: 52 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1200, after: 1200 },
      children: [new TextRun({ text: reviewData.projectName, font: FONT, bold: true, size: 36 })],
    }),
    new Table({
      width: { size: 6000, type: WidthType.DXA },
      alignment: AlignmentType.CENTER,
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 2000, type: WidthType.DXA },
              children: [new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: "项目类型：", font: FONT, size: 24 })],
              })],
            }),
            new TableCell({
              width: { size: 4000, type: WidthType.DXA },
              children: [new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: reviewData.projectType, font: FONT, size: 24 })],
              })],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: { size: 2000, type: WidthType.DXA },
              children: [new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: "评审类型：", font: FONT, size: 24 })],
              })],
            }),
            new TableCell({
              width: { size: 4000, type: WidthType.DXA },
              children: [new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: reviewData.reviewType, font: FONT, size: 24 })],
              })],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              width: { size: 2000, type: WidthType.DXA },
              children: [new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [new TextRun({ text: "评审日期：", font: FONT, size: 24 })],
              })],
            }),
            new TableCell({
              width: { size: 4000, type: WidthType.DXA },
              children: [new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [new TextRun({ text: reviewData.reviewDate, font: FONT, size: 24 })],
              })],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

/**
 * 生成评审概述章节
 */
function generateOverviewSection(reviewData) {
  const elements = [
    heading(1, "一、评审概述"),
    heading(2, "1.1 项目基本信息"),
    bodyParagraphWithBoldPrefix("项目名称：", reviewData.projectName),
    bodyParagraphWithBoldPrefix("项目类型：", reviewData.projectType),
    bodyParagraphWithBoldPrefix("评审类型：", reviewData.reviewType),
    bodyParagraphWithBoldPrefix("评审日期：", reviewData.reviewDate),
    
    heading(2, "1.2 评审依据"),
    bodyParagraph("本次评审依据《电力科技成果评价规范》及相关技术标准，从成果界定与真实性、技术创新与先进性、技术就绪度与成熟度、工程应用价值与电网适配性、经济与社会效益、推广应用与可持续性六个维度进行综合评价。"),
    
    heading(2, "1.3 评审方法"),
    bodyParagraph("采用定量评分与定性分析相结合的评审方法。各评审维度按百分制评分，根据权重计算加权总分。同时进行五元价值评价（科学价值、技术价值、经济价值、社会价值、成果完整性），结合证据溯源、穿透式审查和针对性质询形成综合评价意见。"),
    
    heading(2, "1.4 核心问题"),
    bodyParagraph("技术成果报告评审核心回答三个问题：成果是什么？水平有多高？能否真正用起来？"),
  ];
  return elements;
}

/**
 * 生成六维度评分汇总表
 */
function generateScoreSummary(reviewData) {
  const colWidths = [2800, 1200, 1200, 1500, 1606];
  const dimensions = reviewData.dimensions;
  
  const rows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("评审维度", colWidths[0]),
        headerCell("权重", colWidths[1]),
        headerCell("得分", colWidths[2]),
        headerCell("等级", colWidths[3]),
        headerCell("核心问题", colWidths[4]),
      ],
    }),
  ];

  for (const [key, dim] of Object.entries(dimensions)) {
    const score = reviewData.dimensionScores[key];
    const grade = getGradeLabel(score);
    rows.push(new TableRow({
      children: [
        bodyCell(dim.name, colWidths[0], AlignmentType.LEFT),
        bodyCell(`${(dim.weight * 100).toFixed(0)}%`, colWidths[1]),
        bodyCell(score.toString(), colWidths[2]),
        bodyCell(grade, colWidths[3]),
        bodyCell(dim.coreQuestion.substring(0, 10) + "...", colWidths[4], AlignmentType.LEFT),
      ],
    }));
  }

  rows.push(new TableRow({
    children: [
      new TableCell({
        width: { size: colWidths[0] + colWidths[1], type: WidthType.DXA },
        columnSpan: 2,
        shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "加权总分", font: FONT, size: 21, bold: true })],
        })],
      }),
      new TableCell({
        width: { size: colWidths[2], type: WidthType.DXA },
        shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: reviewData.totalScore.toString(), font: FONT, size: 21, bold: true })],
        })],
      }),
      new TableCell({
        width: { size: colWidths[3] + colWidths[4], type: WidthType.DXA },
        columnSpan: 2,
        shading: { fill: "F2F2F2", type: ShadingType.CLEAR },
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: reviewData.overallGrade.label, font: FONT, size: 21, bold: true })],
        })],
      }),
    ],
  }));

  return [
    heading(1, "二、评审得分汇总"),
    tableCaption(1, "六维度评审得分汇总表"),
    new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: colWidths,
      borders: TABLE_BORDERS,
      rows,
    }),
    bodyParagraph(`经评审，本项目加权总分为${reviewData.totalScore}分，综合评价等级为"${reviewData.overallGrade.label}"，${reviewData.overallGrade.suggestion}。`),
  ];
}

/**
 * 生成五元价值评价表
 */
function generateFiveValuesTable(reviewData) {
  const colWidths = [2000, 4000, 1200, 1106];
  const fiveValues = reviewData.fiveValues;
  
  const rows = [
    new TableRow({
      tableHeader: true,
      children: [
        headerCell("价值维度", colWidths[0]),
        headerCell("评价要点", colWidths[1]),
        headerCell("得分", colWidths[2]),
        headerCell("等级", colWidths[3]),
      ],
    }),
  ];

  const valueNames = {
    scientificValue: { name: "科学价值", aspects: "理论认知创新、新原理新方法、学科影响力" },
    technicalValue: { name: "技术价值", aspects: "技术创新度、技术成熟度、技术先进度、技术贡献度" },
    economicValue: { name: "经济价值", aspects: "转化收益、推广前景、投入产出比" },
    socialValue: { name: "社会价值", aspects: "行业推动作用、安全效益、示范效应" },
    completenessValue: { name: "成果完整性", aspects: "知识产权、查新报告、检测报告、应用证明、效益证明" },
  };

  for (const [key, score] of Object.entries(fiveValues)) {
    const info = valueNames[key];
    rows.push(new TableRow({
      children: [
        bodyCell(info.name, colWidths[0], AlignmentType.LEFT),
        bodyCell(info.aspects, colWidths[1], AlignmentType.LEFT),
        bodyCell(score.toString(), colWidths[2]),
        bodyCell(getGradeLabel(score), colWidths[3]),
      ],
    }));
  }

  return [
    heading(1, "三、五元价值评价"),
    tableCaption(2, "五元价值评价表"),
    new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: colWidths,
      borders: TABLE_BORDERS,
      rows,
    }),
  ];
}

/**
 * 生成各维度详细评价
 */
function generateDimensionDetails(reviewData) {
  const elements = [];
  const dimensionNames = {
    resultDefinition: "成果界定与真实性",
    innovationAdvancement: "技术创新与先进性",
    technicalReadiness: "技术就绪度与成熟度",
    engineeringValue: "工程应用价值与电网适配性",
    economicSocialBenefit: "经济与社会效益",
    promotionSustainability: "推广应用与可持续性",
  };

  let sectionNum = 4;
  for (const [key, name] of Object.entries(dimensionNames)) {
    const score = reviewData.dimensionScores[key];
    const comments = reviewData.dimensionComments[key];
    const grade = getGradeLabel(score);
    const dim = reviewData.dimensions[key];

    elements.push(heading(1, `${numberToChinese(sectionNum)}、${name}评价`));
    elements.push(bodyParagraphWithBoldPrefix("核心问题：", dim.coreQuestion));
    elements.push(heading(2, `${sectionNum}.1 评分结果`));
    elements.push(bodyParagraphWithBoldPrefix("评审得分：", `${score}分（${grade}）`));
    
    elements.push(heading(2, `${sectionNum}.2 主要优点`));
    if (comments.strengths.length > 0) {
      comments.strengths.forEach((strength, idx) => {
        elements.push(bodyParagraph(`（${idx + 1}）${strength}`));
      });
    } else {
      elements.push(bodyParagraph("该维度暂无明显突出优点。"));
    }

    elements.push(heading(2, `${sectionNum}.3 存在问题`));
    if (comments.weaknesses.length > 0) {
      comments.weaknesses.forEach((weakness, idx) => {
        elements.push(bodyParagraph(`（${idx + 1}）${weakness}`));
      });
    } else {
      elements.push(bodyParagraph("该维度暂无明显问题。"));
    }

    elements.push(heading(2, `${sectionNum}.4 改进建议`));
    if (comments.suggestions.length > 0) {
      comments.suggestions.forEach((suggestion, idx) => {
        elements.push(bodyParagraph(`（${idx + 1}）${suggestion}`));
      });
    } else {
      elements.push(bodyParagraph("该维度暂无需特别改进。"));
    }

    sectionNum++;
  }

  return elements;
}

/**
 * 生成质询问题章节
 */
function generateChallengeQuestionsSection(reviewData) {
  const elements = [
    heading(1, "十、针对性质询问题"),
    bodyParagraph("基于评审分析，提出以下需要进一步核实或补充的问题："),
  ];

  if (reviewData.challengeQuestions.length > 0) {
    reviewData.challengeQuestions.forEach((q, idx) => {
      elements.push(bodyParagraphWithBoldPrefix(`【${q.category}】`, q.question));
    });
  } else {
    elements.push(bodyParagraph("暂无特别需要质询的问题。"));
  }

  return elements;
}

/**
 * 生成文本美容识别章节
 */
function generateTextBeautificationSection(reviewData) {
  const elements = [
    heading(1, "十一、文本美容识别"),
    bodyParagraph("评审过程中识别到以下可能存在\u201c文本美容\u201d的情况，需重点核实："),
  ];

  if (reviewData.textBeautification.length > 0) {
    reviewData.textBeautification.forEach((item, idx) => {
      elements.push(bodyParagraphWithBoldPrefix(`【${item.type}】`, item.content));
    });
  } else {
    elements.push(bodyParagraph("未发现明显的文本美容迹象。"));
  }

  // 安全风险提示
  if (reviewData.safetyRisks.length > 0) {
    elements.push(heading(2, "11.1 安全风险提示"));
    reviewData.safetyRisks.forEach(risk => {
      elements.push(bodyParagraphWithBoldPrefix("【风险】", risk));
    });
  }

  return elements;
}

/**
 * 生成综合评价与建议
 */
function generateConclusion(reviewData) {
  const elements = [
    heading(1, "十二、综合评价与建议"),
    heading(2, "12.1 总体评价"),
    bodyParagraph(`经综合评审，本项目技术成果报告整体质量${reviewData.overallGrade.label}。成果在成果界定、技术创新、技术成熟度、工程应用、经济社会效益和推广应用等方面的综合表现符合${reviewData.overallGrade.label}标准。`),
    
    heading(2, "12.2 主要结论"),
  ];

  reviewData.overallSuggestions.forEach((suggestion, index) => {
    elements.push(bodyParagraph(`（${index + 1}）${suggestion}`));
  });

  elements.push(heading(2, "12.3 评审结论"));
  elements.push(bodyParagraph(`综上所述，评审组认为本项目技术成果${reviewData.overallGrade.suggestion}。`));

  // 添加评审意见
  elements.push(heading(2, "12.4 评审意见"));
  if (reviewData.totalScore >= 80) {
    elements.push(bodyParagraph("同意通过评审。"));
  } else if (reviewData.totalScore >= 70) {
    elements.push(bodyParagraph("建议修改完善后通过评审。"));
  } else if (reviewData.totalScore >= 60) {
    elements.push(bodyParagraph("建议补充材料后重新评审。"));
  } else {
    elements.push(bodyParagraph("不予通过，建议重大修改后重新申报。"));
  }

  return elements;
}

/**
 * 主生成函数
 */
async function generateReport(reviewData, outputPath) {
  // 确保 docx 模块可用
  let docxModule;
  try {
    docxModule = require("docx");
  } catch (e) {
    throw new Error("docx 模块未安装，请先运行: npm install docx");
  }

  const { Document, Packer, Footer, PageNumber } = docxModule;

  // 组装文档内容
  const children = [
    ...generateCoverPage(reviewData),
    ...generateOverviewSection(reviewData),
    ...generateScoreSummary(reviewData),
    ...generateFiveValuesTable(reviewData),
    ...generateDimensionDetails(reviewData),
    ...generateChallengeQuestionsSection(reviewData),
    ...generateTextBeautificationSection(reviewData),
    ...generateConclusion(reviewData),
  ];

  // 创建文档
  const doc = new Document({
    features: { updateFields: true },
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
      children,
    }],
  });

  // 生成文件
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`评审意见书已生成: ${outputPath}`);
  return outputPath;
}

module.exports = { generateReport };

// 如果直接运行此脚本
if (require.main === module) {
  const exampleData = {
    projectName: "基于人工智能的配电网故障诊断系统技术成果",
    projectType: "研发类",
    reviewType: "结题验收",
    reviewDate: "2026-05-13",
    dimensionScores: {
      resultDefinition: 75,
      innovationAdvancement: 82,
      technicalReadiness: 70,
      engineeringValue: 78,
      economicSocialBenefit: 72,
      promotionSustainability: 68,
    },
    totalScore: 75,
    overallGrade: { label: "合格", suggestion: "建议通过，需完善改进" },
    dimensionComments: {
      resultDefinition: {
        strengths: ["成果形态明确，为软件平台"],
        weaknesses: ["缺乏第三方检测报告"],
        suggestions: ["建议补充入网检测证明"],
        checkPoints: {}
      },
      innovationAdvancement: {
        strengths: ["创新类型明确，属于方法改进"],
        weaknesses: ["缺乏与行业标杆的指标级对比"],
        suggestions: ["建议补充量化对比数据"],
        checkPoints: {}
      },
      technicalReadiness: {
        strengths: ["TRL等级达到7级"],
        weaknesses: ["缺乏长时间运行数据"],
        suggestions: ["建议补充连续运行记录"],
        checkPoints: {}
      },
      engineeringValue: {
        strengths: ["能够接入现有EMS系统"],
        weaknesses: ["标准符合性说明不足"],
        suggestions: ["建议补充IEC 61850符合性说明"],
        checkPoints: {}
      },
      economicSocialBenefit: {
        strengths: ["经济效益测算依据充分"],
        weaknesses: ["社会效益量化不足"],
        suggestions: ["建议补充碳减排量测算"],
        checkPoints: {}
      },
      promotionSustainability: {
        strengths: ["有示范应用"],
        weaknesses: ["缺乏标准化规划"],
        suggestions: ["建议推动形成企业标准"],
        checkPoints: {}
      },
    },
    fiveValues: {
      scientificValue: 60,
      technicalValue: 76,
      economicValue: 72,
      socialValue: 70,
      completenessValue: 65,
    },
    challengeQuestions: [
      { category: "技术成熟度", question: "在极端工况下（如通信丢包30%）性能如何？" },
      { category: "证据链", question: "能否提供第三方检测报告编号及检测内容对照表？" },
    ],
    textBeautification: [
      { type: "空泛表述", content: "声称'国内领先'但缺乏具体指标支撑" },
    ],
    safetyRisks: [],
    overallSuggestions: [
      "成果整体质量合格，建议通过验收",
      "建议补充完善相关内容后再正式结题",
      "【成果界定】建议补充第三方检测报告",
      "【推广应用】建议推动形成企业标准",
    ],
    dimensions: {
      resultDefinition: { name: "成果界定与真实性", weight: 0.20, coreQuestion: "成果是什么？归属边界清晰吗？" },
      innovationAdvancement: { name: "技术创新与先进性", weight: 0.25, coreQuestion: "创新程度如何？" },
      technicalReadiness: { name: "技术就绪度与成熟度", weight: 0.20, coreQuestion: "TRL等级多高？" },
      engineeringValue: { name: "工程应用价值", weight: 0.15, coreQuestion: "能嵌入现有系统吗？" },
      economicSocialBenefit: { name: "经济与社会效益", weight: 0.10, coreQuestion: "效益测算充分吗？" },
      promotionSustainability: { name: "推广应用", weight: 0.10, coreQuestion: "可复制吗？" },
    },
  };

  generateReport(exampleData, "评审意见书_示例.docx").catch(console.error);
}
