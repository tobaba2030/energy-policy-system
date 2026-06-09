/**
 * 4份电网科技项目研究报告详细对比分析 - 基于最新Skill v3.0标准
 */
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel, PageBreak, BorderStyle, WidthType, ShadingType } = require("docx");
const fs = require("fs");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };

// 报告数据
const reports = [
  {
    name: "任务1报告1：适合公司发展的典型省份市场化交易路径设计",
    shortName: "报告1",
    rank: 4,
    size: "660 KB",
    scores: {
      theoreticalInnovation: 70,
      technicalForwardLooking: 65,
      logicalStructure: 75,
      presentationQuality: 70,
      researchValue: 68,
      total: 70
    },
    grade: "合格",
    strengths: ["逻辑结构良好，章节层次清晰", "提出了NLP+BERT融合的电力市场规则提取方法", "表述专业，使用了电网领域专业术语"],
    weaknesses: [
      { category: "理论创新性", items: ["NLP/BERT方法仅描述了做法，未说明理论基础", "未明确提出本报告的3-5个核心创新点", "缺乏数学模型推导和公式说明"] },
      { category: "研究深度", items: ["仅重点分析广东省，其他三省分析深度不足", "关键结论缺乏具体数据支撑", "敏感性分析和鲁棒性验证缺失"] },
      { category: "表述规范性", items: ["图表数量较少，专业图表不足", "参考文献标注不规范"] }
    ],
    suggestions: [
      "增加理论创新章节，明确3-5个创新点，补充数学模型推导",
      "深化云南省、贵州省、广西壮族自治区的案例分析，增加数据支撑",
      "增加敏感性分析和多场景验证",
      "补充专业图表（如技术路线图、流程图、对比分析图）"
    ]
  },
  {
    name: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究",
    shortName: "报告2",
    rank: 3,
    size: "1.33 MB",
    scores: {
      theoreticalInnovation: 72,
      technicalForwardLooking: 70,
      logicalStructure: 68,
      presentationQuality: 65,
      researchValue: 88,
      total: 69
    },
    grade: "基本合格",
    strengths: ["研究价值最高（88分），商业模式设计具有较高应用价值", "技术前瞻性良好，准确把握市场需求方向", "理论创新性较好，定性分析较为完整"],
    weaknesses: [
      { category: "理论创新性", items: ["缺乏电力交易商业模式的理论框架构建", "未构建数学模型支撑商业模式设计"] },
      { category: "逻辑结构", items: ["章节之间逻辑衔接不够紧密", "技术路线图不清晰"] },
      { category: "表述规范性", items: ["专业图表数量不足，可视化效果有待提升"] },
      { category: "风险分析", items: ["风险识别不够全面，应对措施不够具体"] }
    ],
    suggestions: [
      "构建电力交易商业模式理论框架，补充数学模型",
      "完善风险分析章节，增加具体风险应对措施",
      "增加专业图表（商业模式架构图、流程图、对比分析图）",
      "优化章节逻辑，绘制清晰的技术路线图"
    ],
    note: "注：效益预测缺乏定量支撑，因缺乏数据，本项不做修改要求"
  },
  {
    name: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告",
    shortName: "报告3",
    rank: 2,
    size: "4.41 MB",
    scores: {
      theoreticalInnovation: 78,
      technicalForwardLooking: 72,
      logicalStructure: 82,
      presentationQuality: 75,
      researchValue: 76,
      total: 77
    },
    grade: "良好",
    strengths: ["理论创新性较强，负荷特性分析方法有新意", "逻辑结构优秀，技术路线清晰", "文件大小适中，内容充实"],
    weaknesses: [
      { category: "理论创新性", items: ["4A评估模型的理论基础说明不够深入", "K-Means聚类方法的详细过程说明不足"] },
      { category: "研究深度", items: ["多场景验证不足", "敏感性分析缺失"] }
    ],
    suggestions: [
      "深化4A评估模型的理论基础说明",
      "补充K-Means聚类详细过程和参数说明",
      "增加多场景验证和敏感性分析"
    ]
  },
  {
    name: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0",
    shortName: "报告4",
    rank: 1,
    size: "14.26 MB",
    scores: {
      theoreticalInnovation: 92,
      technicalForwardLooking: 88,
      logicalStructure: 95,
      presentationQuality: 90,
      researchValue: 78,
      total: 83
    },
    grade: "优秀",
    strengths: ["版本迭代完善（V2.0），内容最完整", "理论创新性强，逻辑结构优秀（95分）", "表述规范性优秀（90分），图表丰富"],
    weaknesses: [
      { category: "理论说明", items: ["TFN-AHP方法的理论说明可进一步深化"] },
      { category: "研究深度", items: ["敏感性分析可更全面", "多省份案例验证不足"] }
    ],
    suggestions: [
      "深化TFN-AHP方法的理论说明",
      "增加敏感性分析",
      "增加多省份案例验证"
    ]
  }
];

// 获取等级
function getGrade(score) {
  if (score >= 90) return { grade: "优秀", color: "2E7D32" };
  if (score >= 80) return { grade: "良好", color: "1565C0" };
  if (score >= 70) return { grade: "合格", color: "F57C00" };
  if (score >= 60) return { grade: "基本合格", color: "EF6C00" };
  return { grade: "不合格", color: "C62828" };
}

// 创建段落
function bodyParagraph(text, indent = true) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: indent ? { firstLine: 480 } : undefined,
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24 })]
  });
}

function heading(level, text) {
  const sizes = { 1: 30, 2: 28, 3: 24 };
  return new Paragraph({
    heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", before: level === 1 ? 120 : 60, after: level === 1 ? 60 : 30 },
    pageBreakBefore: level === 1,
    children: [new TextRun({ text, font: FONT, bold: true, size: sizes[level] })]
  });
}

function tableCaption(num, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `表${num} ${caption}`, font: FONT, size: 21, bold: true })]
  });
}

function coloredText(text, color, bold = false) {
  return new TextRun({ text, font: FONT, size: 24, color, bold });
}

async function main() {
  const children = [];

  // 封面
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 3600, after: 480 },
    children: [new TextRun({ text: "电网科技项目研究报告", font: FONT, bold: true, size: 44 })]
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: "对比分析报告", font: FONT, bold: true, size: 44 })]
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 2400, after: 1200 },
    children: [new TextRun({ text: "考虑多元市场化及资源禀赋特征的电力交易关键技术研究与应用", font: FONT, bold: true, size: 32 })]
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "评审日期：2026年5月14日", font: FONT, size: 24 })]
  }));
  children.push(new Paragraph({ children: [new PageBreak()] }));

  // 一、概述
  children.push(heading(1, "一、概述"));
  children.push(bodyParagraph("本报告对研究报告文件夹中的4份报告进行了综合评审和对比分析，从理论创新性（25%）、技术前瞻性（20%）、逻辑结构（20%）、表述规范性（15%）、研究价值（20%）五个维度进行评价。本次评审严格按照科技项目研究报告评审要求，详细指出每份报告存在的具体问题，并提供针对性的改进建议。"));

  // 1.1 报告清单
  children.push(heading(2, "1.1 报告清单"));
  children.push(tableCaption(1, "报告基本信息"));
  const infoRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ width: { size: 800, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "序号", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "文件大小", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    ...reports.map((r, i) => new TableRow({
      children: [
        new TableCell({ width: { size: 800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${i + 1}`, font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: r.name, font: FONT, size: 19 })] })] }),
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: r.size, font: FONT, size: 21 })] })] }),
        new TableCell({
          width: { size: 1306, type: WidthType.DXA },
          shading: r.rank === 1 ? { fill: "FFF2CC", type: ShadingType.CLEAR } : undefined,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: r.grade, font: FONT, size: 21, bold: r.rank === 1 })] })]
        })
      ]
    }))
  ];
  children.push(new Table({
    width: { size: 8306, type: WidthType.DXA },
    columnWidths: [800, 4000, 1200, 1306],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4 },
      bottom: { style: BorderStyle.SINGLE, size: 4 },
      left: { style: BorderStyle.SINGLE, size: 4 },
      right: { style: BorderStyle.SINGLE, size: 4 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4 },
      insideVertical: { style: BorderStyle.SINGLE, size: 4 }
    },
    rows: infoRows
  }));

  // 二、五维评分对比
  children.push(heading(1, "二、五维评分对比"));
  children.push(tableCaption(2, "五维度评分对比表"));
  const scoreRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ width: { size: 2300, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审维度", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告1", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告2", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告3", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告4", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "理论创新性（25%）", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "72分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "92分", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "技术前瞻性（20%）", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "65分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "72分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88分", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "逻辑结构（20%）", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "68分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "82分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "95分", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "表述规范性（15%）", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "65分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90分", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "研究价值（20%）", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "68分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88分", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "76分", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1506, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 2300, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "加权总分", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "69分", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "77分", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21, bold: true })] })] })
      ]
    })
  ];
  children.push(new Table({
    width: { size: 8306, type: WidthType.DXA },
    columnWidths: [2300, 1500, 1500, 1500, 1506],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4 },
      bottom: { style: BorderStyle.SINGLE, size: 4 },
      left: { style: BorderStyle.SINGLE, size: 4 },
      right: { style: BorderStyle.SINGLE, size: 4 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4 },
      insideVertical: { style: BorderStyle.SINGLE, size: 4 }
    },
    rows: scoreRows
  }));

  // 三、排名分析
  children.push(heading(1, "三、排名分析"));
  children.push(tableCaption(3, "综合排名表"));
  const rankRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "排名", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 4306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "总分", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    ...reports.sort((a, b) => a.rank - b.rank).map((r, i) => {
      const rankColors = ["FFD700", "C0C0C0", "CD7F32", "F5F5F5"];
      return new TableRow({
        children: [
          new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: rankColors[i], type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${i + 1}`, font: FONT, size: 21, bold: i < 3 })] })] }),
          new TableCell({ width: { size: 4306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: r.name, font: FONT, size: 19 })] })] }),
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${r.scores.total}分`, font: FONT, size: 21 })] })] }),
          new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: r.rank === 1 ? { fill: "C6E0B4", type: ShadingType.CLEAR } : undefined, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: r.grade, font: FONT, size: 21, bold: r.rank === 1 })] })] })
        ]
      });
    })
  ];
  children.push(new Table({
    width: { size: 8306, type: WidthType.DXA },
    columnWidths: [1000, 4306, 1500, 1500],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4 },
      bottom: { style: BorderStyle.SINGLE, size: 4 },
      left: { style: BorderStyle.SINGLE, size: 4 },
      right: { style: BorderStyle.SINGLE, size: 4 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4 },
      insideVertical: { style: BorderStyle.SINGLE, size: 4 }
    },
    rows: rankRows
  }));

  // 四、各报告详细分析
  children.push(heading(1, "四、各报告详细分析"));

  reports.forEach((report, reportIndex) => {
    const sectionNum = reportIndex + 4;
    children.push(heading(2, `${sectionNum}.${reportIndex + 1} ${report.shortName}（第${report.rank}名，${report.scores.total}分，${report.grade}）`));

    // 主要优点
    children.push(new Paragraph({
      spacing: { before: 60, after: 30 },
      indent: { firstLine: 480 },
      children: [coloredText("【主要优点】", "008000", true)]
    }));
    report.strengths.forEach(s => {
      children.push(new Paragraph({
        indent: { firstLine: 720 },
        spacing: { line: 360, lineRule: "auto" },
        children: [new TextRun({ text: "• " + s, font: FONT, size: 22 })]
      }));
    });

    // 主要问题（红色）
    children.push(new Paragraph({
      spacing: { before: 30, after: 30 },
      indent: { firstLine: 480 },
      children: [coloredText("【主要问题】", "C62828", true)]
    }));
    report.weaknesses.forEach(w => {
      children.push(new Paragraph({
        indent: { firstLine: 720 },
        spacing: { line: 360, lineRule: "auto" },
        children: [coloredText(`${w.category}：`, "C62828", true)]
      }));
      w.items.forEach(item => {
        children.push(new Paragraph({
          indent: { firstLine: 960 },
          spacing: { line: 360, lineRule: "auto" },
          children: [coloredText("• " + item, "C62828", false)]
        }));
      });
    });

    // 报告2特殊说明
    if (report.note) {
      children.push(new Paragraph({
        indent: { firstLine: 720 },
        spacing: { line: 360, lineRule: "auto" },
        children: [coloredText(report.note, "EF6C00", true)]
      }));
    }

    // 改进建议（绿色）
    children.push(new Paragraph({
      spacing: { before: 30, after: 30 },
      indent: { firstLine: 480 },
      children: [coloredText("【改进建议】", "2E7D32", true)]
    }));
    report.suggestions.forEach((s, i) => {
      children.push(new Paragraph({
        indent: { firstLine: 720 },
        spacing: { line: 360, lineRule: "auto" },
        children: [new TextRun({ text: `${i + 1}. `, font: FONT, size: 22, bold: true }), new TextRun({ text: s, font: FONT, size: 22 })]
      }));
    });
  });

  // 五、综合结论
  children.push(heading(1, "五、综合结论"));
  children.push(heading(2, "5.1 总体评价"));
  children.push(bodyParagraph("4份报告整体质量处于合格至良好水平，1份达到优秀标准。报告4表现最为突出，综合评分达到83分（优秀），建议优先推进。报告3和报告2达到良好水平，报告1达到合格水平。各报告均有改进空间，建议按照上述针对性意见进行修改完善。"));

  children.push(heading(2, "5.2 推荐优先级"));
  children.push(tableCaption(4, "推荐优先级表"));
  const priorityRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优先级", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 3606, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "理由", font: FONT, size: 21, bold: true })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "高", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "综合评分最高，内容最完整，理论创新性强", font: FONT, size: 19 })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFE699", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "中高", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "理论创新性强，逻辑结构优秀", font: FONT, size: 19 })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFE699", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "中", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "研究价值高，商业模式设计出色", font: FONT, size: 19 })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "F4B084", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "低", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "需增加理论创新和案例分析", font: FONT, size: 19 })] })] })
      ]
    })
  ];
  children.push(new Table({
    width: { size: 8306, type: WidthType.DXA },
    columnWidths: [1200, 3500, 3606],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4 },
      bottom: { style: BorderStyle.SINGLE, size: 4 },
      left: { style: BorderStyle.SINGLE, size: 4 },
      right: { style: BorderStyle.SINGLE, size: 4 },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4 },
      insideVertical: { style: BorderStyle.SINGLE, size: 4 }
    },
    rows: priorityRows
  }));

  // 六、评审意见汇总
  children.push(heading(1, "六、评审意见汇总"));
  children.push(heading(2, "6.1 高优先级改进项（必须修改）"));
  const highPriorityItems = [
    "报告1：增加理论创新章节，明确3-5个创新点，补充数学模型推导",
    "报告1：深化云南省、贵州省、广西壮族自治区的案例分析，增加数据支撑",
    "报告2：构建电力交易商业模式理论框架，补充数学模型",
    "报告2：完善风险分析章节，增加具体风险应对措施",
    "报告3：深化4A评估模型的理论基础说明",
    "报告3：补充K-Means聚类详细过程和参数说明",
    "报告4：深化TFN-AHP方法的理论说明",
    "报告4：增加敏感性分析"
  ];
  highPriorityItems.forEach(item => {
    children.push(new Paragraph({
      indent: { firstLine: 720 },
      spacing: { line: 360, lineRule: "auto" },
      children: [coloredText("🔴 " + item, "C62828", false)]
    }));
  });

  children.push(heading(2, "6.2 中优先级改进项（建议修改）"));
  const midPriorityItems = [
    "报告1：增加敏感性分析和多场景验证",
    "报告1：补充专业图表（如技术路线图、流程图、对比分析图）",
    "报告2：增加专业图表（商业模式架构图、流程图、对比分析图）",
    "报告2：优化章节逻辑，绘制清晰的技术路线图",
    "报告3：增加多场景验证和敏感性分析",
    "报告4：增加多省份案例验证"
  ];
  midPriorityItems.forEach(item => {
    children.push(new Paragraph({
      indent: { firstLine: 720 },
      spacing: { line: 360, lineRule: "auto" },
      children: [coloredText("🟡 " + item, "EF6C00", false)]
    }));
  });

  // 创建文档
  const doc = new Document({
    features: { updateFields: true },
    sections: [{
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 }
        }
      },
      children
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = "c:\\AI学习资料\\mesheer\\4份报告对比分析报告_优化版_v3.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log("✅ Word文档已成功生成：" + outputPath);
  console.log("\n📋 报告内容包括：");
  console.log("   • 封面页");
  console.log("   • 概述与报告清单");
  console.log("   • 五维评分对比表");
  console.log("   • 综合排名表");
  console.log("   • 各报告详细分析（含具体问题和改进建议）");
  console.log("   • 综合结论与推荐优先级");
  console.log("   • 高/中优先级改进项汇总");
}

main().catch(err => {
  console.error("❌ 生成失败：", err);
  process.exit(1);
});
