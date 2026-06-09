/**
 * 为5份报告各自生成独立的详细评审意见Word文档
 * 每份文档不少于6页，包含针对性修改意见
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, PageBreak, BorderStyle, WidthType,
  ShadingType, PageNumber, Footer
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;
const OUTPUT_DIR = "C:\\Users\\jianlinw\\Desktop\\考虑多元市场化及资源禀赋特征的电力交易关键技术研究与应用科技项目";

const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
};

function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 1800, after: 480 },
    children: [new TextRun({ text, font: FONT, bold: true, size: 44 })],
  });
}

function heading(level, text) {
  const config = {
    1: { heading: HeadingLevel.HEADING_1, size: 30, before: 120, after: 60 },
    2: { heading: HeadingLevel.HEADING_2, size: 28, before: 60, after: 60 },
    3: { heading: HeadingLevel.HEADING_3, size: 24, before: 60, after: 30 },
    4: { heading: HeadingLevel.HEADING_4, size: 24, before: 30, after: 30 },
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

function bodyParagraph(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

function bulletParagraph(text, indentLevel = 1) {
  const indentSize = indentLevel * 240;
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480 + indentSize, firstLineChars: 200 },
    children: [new TextRun({ text: "• " + text, font: FONT, size: 24 })],
  });
}

function numberedParagraph(text, number) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    children: [
      new TextRun({ text: `${number}. `, font: FONT, size: 24, bold: true }),
      new TextRun({ text: text, font: FONT, size: 24 })
    ],
  });
}

function tableCaption(num, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `表${num} ${caption}`, font: FONT, size: 21, bold: true })],
  });
}

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

function bodyCell(text, width, align = AlignmentType.CENTER) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, font: FONT, size: 21 })],
    })],
  });
}

function highlightText(text, color, bold = false) {
  return new TextRun({ text, font: FONT, size: 24, color, bold });
}

const reportDetails = [
  {
    name: "任务1报告1：适合公司发展的典型省份市场化交易路径设计",
    shortName: "报告1",
    filename: "任务1报告1_评审意见.docx",
    scores: { theoretical: 70, technical: 65, logical: 75, normative: 70, value: 68, total: 70 },
    grade: "合格",
    overview: "本报告主要针对公司发展的典型省份市场化交易路径进行设计研究，提出了NLP+BERT融合的电力市场规则提取方法，逻辑结构较为清晰，但在理论创新和研究深度方面存在明显不足。",
    strengths: [
      "逻辑结构良好，章节层次清晰，符合科技报告规范格式",
      "提出了NLP+BERT融合的电力市场规则提取方法，具有一定创新性",
      "表述专业，使用了电网领域专业术语，符合行业规范",
      "案例选取具有代表性，广东省作为典型案例分析较为深入",
      "技术路线图设计较为合理，步骤清晰"
    ],
    detailedIssues: [
      {
        section: "第1章 引言",
        issues: [
          "研究背景描述较为泛泛，未明确指出本研究要解决的具体问题",
          "国内外研究现状综述不够全面，缺乏对最新研究成果的引用",
          "研究目标不够明确，未量化预期成果",
          "未说明本研究的理论意义和实际应用价值"
        ],
        suggestions: [
          "明确提出本研究要解决的3-5个具体技术问题",
          "补充近3年相关领域的核心参考文献",
          "量化研究目标，如'建立XX模型，准确率达到XX%'",
          "增加研究意义章节，阐述理论价值和应用价值"
        ]
      },
      {
        section: "第2章 理论基础与方法",
        issues: [
          "NLP+BERT方法仅描述了做法，未说明理论基础",
          "缺乏数学模型推导和公式说明",
          "未明确提出本报告的核心创新点",
          "算法参数设置缺乏依据，未说明参数选择理由"
        ],
        suggestions: [
          "增加BERT模型的理论基础说明，包括Transformer架构原理",
          "补充数学模型推导过程，建立完整的理论框架",
          "明确提出3-5个核心创新点，并进行详细阐述",
          "说明算法参数选择的理论依据和实验验证结果"
        ]
      },
      {
        section: "第3章 实证分析",
        issues: [
          "仅重点分析广东省，其他三省（云南、贵州、广西）分析深度不足",
          "关键结论缺乏具体数据支撑",
          "敏感性分析和鲁棒性验证缺失",
          "对比分析不够深入，未与现有方法进行量化比较"
        ],
        suggestions: [
          "增加云南省、贵州省、广西壮族自治区的案例分析，补充详细数据",
          "为关键结论提供具体数据支撑，增加图表说明",
          "增加敏感性分析章节，验证模型稳定性",
          "增加与现有方法的对比分析，量化改进效果"
        ]
      },
      {
        section: "第4章 结果与讨论",
        issues: [
          "结果分析不够深入，未充分挖掘数据背后的规律",
          "讨论部分缺乏对研究局限性的分析",
          "未提出未来研究方向",
          "结论部分过于简略，未总结主要贡献"
        ],
        suggestions: [
          "深入分析数据结果，提炼规律性结论",
          "增加研究局限性分析，客观评价研究成果",
          "提出具体的未来研究方向和建议",
          "详细总结本研究的主要贡献和创新点"
        ]
      },
      {
        section: "第5章 结论与展望",
        issues: [
          "结论部分未呼应研究目标",
          "展望部分过于笼统，缺乏具体规划",
          "未提及研究成果的推广应用前景"
        ],
        suggestions: [
          "结论应明确回答研究目标是否达成",
          "制定具体的未来工作计划和时间表",
          "分析研究成果的推广应用前景和预期效益"
        ]
      },
      {
        section: "图表与参考文献",
        issues: [
          "图表数量较少，专业图表不足",
          "部分图表缺乏图注或图注不规范",
          "参考文献标注不规范",
          "参考文献数量不足，引用不够全面"
        ],
        suggestions: [
          "增加专业图表，如技术路线图、流程图、对比分析图",
          "规范图表标注，按照学术规范添加图注",
          "统一参考文献格式，建议采用GB/T 7714格式",
          "补充相关领域核心参考文献，数量不少于20篇"
        ]
      }
    ],
    summary: "总体而言，报告1具有一定的研究基础和应用价值，但在理论深度、研究完整性和规范性方面存在明显不足。建议重点加强理论创新章节，补充数学模型推导，深化多省份案例分析，并提高文档规范性。预计修改后可达到良好水平。"
  },
  {
    name: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究",
    shortName: "报告2",
    filename: "任务1报告2_评审意见.docx",
    scores: { theoretical: 72, technical: 70, logical: 68, normative: 65, value: 88, total: 69 },
    grade: "基本合格",
    overview: "本报告主要研究面向多元市场需求的电力交易业务商业模式，研究价值较高（88分），商业模式设计具有较高应用价值，但在理论框架构建和逻辑结构方面存在明显不足。",
    strengths: [
      "研究价值最高（88分），商业模式设计具有较高应用价值",
      "技术前瞻性良好，准确把握市场需求方向",
      "理论创新性较好，定性分析较为完整",
      "商业模式设计思路清晰，具有实际应用潜力",
      "市场需求分析较为全面，覆盖多元市场主体"
    ],
    detailedIssues: [
      {
        section: "第1章 绪论",
        issues: [
          "研究背景与意义阐述不够深入",
          "国内外商业模式研究现状综述不够系统",
          "研究内容与目标不够明确",
          "未说明研究的创新点和特色"
        ],
        suggestions: [
          "深入分析电力交易市场的发展趋势和存在问题",
          "系统梳理国内外电力交易商业模式研究现状",
          "明确研究内容和量化目标",
          "阐述本研究的创新点和特色"
        ]
      },
      {
        section: "第2章 电力交易商业模式理论框架",
        issues: [
          "缺乏电力交易商业模式的理论框架构建",
          "未构建数学模型支撑商业模式设计",
          "理论基础阐述不够深入",
          "未建立完整的商业模式评价体系"
        ],
        suggestions: [
          "构建完整的电力交易商业模式理论框架",
          "建立数学模型支撑商业模式设计和评估",
          "深入阐述理论基础，引用相关理论依据",
          "建立商业模式评价指标体系"
        ]
      },
      {
        section: "第3章 多元市场需求分析",
        issues: [
          "需求分析缺乏定量数据支撑",
          "未对市场需求进行分类和优先级排序",
          "用户画像描述不够清晰",
          "需求验证方法不够科学"
        ],
        suggestions: [
          "补充定量数据支撑需求分析",
          "对市场需求进行分类并建立优先级排序模型",
          "建立详细的用户画像",
          "采用科学的需求验证方法，如问卷调查、专家访谈等"
        ]
      },
      {
        section: "第4章 商业模式设计",
        issues: [
          "商业模式构成要素分析不够全面",
          "盈利模式设计不够清晰",
          "价值主张阐述不够明确",
          "客户细分和渠道策略有待完善"
        ],
        suggestions: [
          "全面分析商业模式的九大构成要素",
          "详细设计盈利模式，包括收入来源和成本结构",
          "明确价值主张，阐述为客户创造的价值",
          "完善客户细分和渠道策略设计"
        ]
      },
      {
        section: "第5章 风险分析与应对",
        issues: [
          "风险识别不够全面",
          "风险评估方法不够科学",
          "应对措施不够具体",
          "未建立风险监控机制"
        ],
        suggestions: [
          "全面识别政策、市场、技术、运营等各类风险",
          "采用科学的风险评估方法，如风险矩阵法",
          "制定具体的风险应对措施和预案",
          "建立风险监控机制和预警系统"
        ]
      },
      {
        section: "第6章 实施路径与保障措施",
        issues: [
          "实施路径设计不够详细",
          "保障措施不够具体",
          "缺乏实施时间表",
          "未制定绩效考核指标"
        ],
        suggestions: [
          "设计详细的实施路径和步骤",
          "制定具体的保障措施",
          "制定实施时间表和里程碑",
          "建立绩效考核指标体系"
        ]
      },
      {
        section: "图表与规范性",
        issues: [
          "专业图表数量不足，可视化效果有待提升",
          "章节之间逻辑衔接不够紧密",
          "技术路线图不清晰",
          "语言表达有待规范"
        ],
        suggestions: [
          "增加专业图表，如图表架构图、流程图等",
          "优化章节逻辑，加强内容衔接",
          "绘制清晰的技术路线图",
          "规范语言表达，统一术语"
        ]
      }
    ],
    note: "注：效益预测缺乏定量支撑，因缺乏数据，本项不做修改要求",
    summary: "报告2在研究价值方面表现突出，商业模式设计具有较高应用价值。但在理论框架构建、逻辑结构和规范性方面存在明显不足。建议重点构建理论框架，完善风险分析，增加专业图表，优化章节逻辑。预计修改后可达到良好水平。"
  },
  {
    name: "任务1报告3：适合公司发展的典型省份市场化交易路径设计0515",
    shortName: "报告3",
    filename: "任务1报告3_评审意见.docx",
    scores: { theoretical: 75, technical: 72, logical: 78, normative: 72, value: 75, total: 75 },
    grade: "良好",
    overview: "本报告是报告1的更新版本（0515版本），相比报告1有明显改进，内容更加完善，逻辑结构良好，但在理论创新和研究深度方面仍有提升空间。",
    strengths: [
      "相比报告1有明显改进，内容更加完善",
      "逻辑结构良好，技术路线清晰",
      "案例分析更加全面，数据支撑有所增强",
      "章节安排合理，符合科技报告规范",
      "研究方法较为科学，分析较为深入"
    ],
    detailedIssues: [
      {
        section: "第1章 引言",
        issues: [
          "研究背景阐述不够深入，缺乏问题导向",
          "研究目标表述不够明确，未量化",
          "国内外研究现状综述不够系统",
          "未明确研究的创新点"
        ],
        suggestions: [
          "深入分析研究背景，明确问题导向",
          "量化研究目标，明确预期成果",
          "系统梳理国内外研究现状，引用最新文献",
          "明确提出研究创新点"
        ]
      },
      {
        section: "第2章 理论基础与方法",
        issues: [
          "核心创新点提炼不够突出",
          "数学模型部分仍需加强",
          "方法描述不够详细",
          "未说明方法的优势和适用性"
        ],
        suggestions: [
          "提炼并突出3-5个核心创新点",
          "补充数学模型推导和公式",
          "详细描述研究方法和步骤",
          "分析方法的优势和适用性"
        ]
      },
      {
        section: "第3章 典型省份分析",
        issues: [
          "多省份对比分析可进一步深化",
          "定量分析不够充分",
          "敏感性分析可更加系统",
          "未进行横向对比分析"
        ],
        suggestions: [
          "深化多省份对比分析，挖掘差异和共性",
          "增加定量分析，提供数据支撑",
          "增加敏感性分析章节",
          "进行横向对比，分析不同省份的特点"
        ]
      },
      {
        section: "第4章 市场化交易路径设计",
        issues: [
          "路径设计方案不够具体",
          "方案可行性分析不够深入",
          "未进行方案对比和择优",
          "缺乏实施建议"
        ],
        suggestions: [
          "设计具体的交易路径方案",
          "深入分析方案的可行性",
          "进行多方案对比，选择最优方案",
          "提供具体的实施建议"
        ]
      },
      {
        section: "第5章 结果与讨论",
        issues: [
          "结果分析不够深入",
          "讨论部分缺乏对研究局限性的分析",
          "未提出具体的改进方向",
          "结论不够明确"
        ],
        suggestions: [
          "深入分析研究结果，提炼规律性结论",
          "分析研究局限性，客观评价成果",
          "提出具体的改进方向和建议",
          "明确总结研究结论"
        ]
      },
      {
        section: "图表与规范性",
        issues: [
          "图表专业性可进一步提升",
          "图表标注不够规范",
          "参考文献格式不够统一",
          "语言表达可进一步规范"
        ],
        suggestions: [
          "提升图表专业性和可视化效果",
          "规范图表标注，添加必要的图注和表注",
          "统一参考文献格式",
          "规范语言表达，统一术语"
        ]
      }
    ],
    summary: "报告3是一份质量较好的研究报告，相比报告1有明显改进。建议重点加强理论创新，提炼核心创新点，深化多省份对比分析，增加定量数据支撑，提升图表专业性。预计修改后可达到优秀水平。"
  },
  {
    name: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告",
    shortName: "报告4",
    filename: "任务2报告3_评审意见.docx",
    scores: { theoretical: 78, technical: 72, logical: 82, normative: 75, value: 76, total: 77 },
    grade: "良好",
    overview: "本报告主要研究用户侧多元负荷特性分析及协同优化技术，理论创新性较强，逻辑结构优秀，是一份质量较高的研究报告，但在理论深度和研究完整性方面仍有提升空间。",
    strengths: [
      "理论创新性较强，负荷特性分析方法有新意",
      "逻辑结构优秀（82分），技术路线清晰",
      "文件大小适中，内容充实",
      "研究方法科学，分析较为深入",
      "技术方案具有较高的应用价值"
    ],
    detailedIssues: [
      {
        section: "第1章 绪论",
        issues: [
          "研究背景阐述不够深入",
          "研究目标不够明确",
          "未充分说明研究意义",
          "国内外研究现状综述不够系统"
        ],
        suggestions: [
          "深入分析用户侧负荷特性研究的背景和意义",
          "明确研究目标和预期成果",
          "充分说明研究的理论意义和实际应用价值",
          "系统梳理国内外研究现状"
        ]
      },
      {
        section: "第2章 理论基础与方法",
        issues: [
          "4A评估模型的理论基础说明不够深入",
          "K-Means聚类方法的详细过程说明不足",
          "方法创新点阐述不够清晰",
          "未说明参数选择依据"
        ],
        suggestions: [
          "深化4A评估模型的理论基础说明",
          "补充K-Means聚类详细过程和参数说明",
          "清晰阐述方法创新点",
          "说明参数选择的理论依据和实验验证"
        ]
      },
      {
        section: "第3章 负荷特性分析",
        issues: [
          "数据来源和数据质量说明不够详细",
          "特征提取方法说明不够清晰",
          "分析维度不够全面",
          "缺乏异常数据处理说明"
        ],
        suggestions: [
          "详细说明数据来源和数据质量",
          "清晰描述特征提取方法",
          "增加分析维度，全面分析负荷特性",
          "说明异常数据处理方法"
        ]
      },
      {
        section: "第4章 协同优化技术",
        issues: [
          "优化模型构建不够完善",
          "算法设计说明不够详细",
          "多场景验证不足",
          "敏感性分析缺失"
        ],
        suggestions: [
          "完善优化模型构建",
          "详细说明算法设计和实现步骤",
          "增加多场景验证",
          "增加敏感性分析章节"
        ]
      },
      {
        section: "第5章 实验结果与分析",
        issues: [
          "实验设计说明不够详细",
          "结果分析不够深入",
          "对比分析不够充分",
          "缺乏统计显著性检验"
        ],
        suggestions: [
          "详细说明实验设计和参数设置",
          "深入分析实验结果，提炼规律性结论",
          "增加与现有方法的对比分析",
          "进行统计显著性检验"
        ]
      },
      {
        section: "第6章 结论与展望",
        issues: [
          "结论部分不够全面",
          "展望部分过于笼统",
          "未提及研究成果的推广应用",
          "未提出具体的未来研究方向"
        ],
        suggestions: [
          "全面总结研究结论",
          "制定具体的未来研究计划",
          "分析研究成果的推广应用前景",
          "提出具体的未来研究方向"
        ]
      }
    ],
    summary: "报告4是一份质量较高的研究报告，理论创新性较强，逻辑结构优秀。建议重点深化理论基础说明，补充方法细节，增加多场景验证和敏感性分析，完善实验分析。预计修改后可达到优秀水平。"
  },
  {
    name: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0",
    shortName: "报告5",
    filename: "课题3报告4_评审意见.docx",
    scores: { theoretical: 92, technical: 88, logical: 95, normative: 90, value: 78, total: 83 },
    grade: "优秀",
    overview: "本报告是一份优秀的研究报告（V2.0版本），理论创新性强，逻辑结构优秀，表述规范性高，内容完整。是5份报告中质量最高的一份，但仍有一些细节可以进一步完善。",
    strengths: [
      "版本迭代完善（V2.0），内容最完整",
      "理论创新性强（92分），方法新颖",
      "逻辑结构优秀（95分），章节安排合理",
      "表述规范性优秀（90分），图表丰富",
      "技术方案详实，具有较高应用价值",
      "研究方法科学，分析深入"
    ],
    detailedIssues: [
      {
        section: "第1章 引言",
        issues: [
          "研究背景可进一步深化",
          "研究目标可更加明确",
          "创新点可更加突出"
        ],
        suggestions: [
          "深入分析多市场需求背景下交易品种优化的必要性",
          "明确量化研究目标",
          "突出3-5个核心创新点"
        ]
      },
      {
        section: "第2章 理论基础与方法",
        issues: [
          "TFN-AHP方法的理论说明可进一步深化",
          "方法的适用性分析可加强",
          "未说明方法与现有方法的对比优势"
        ],
        suggestions: [
          "深化TFN-AHP方法的理论说明",
          "分析方法的适用性和局限性",
          "与现有方法进行对比，说明优势"
        ]
      },
      {
        section: "第3章 市场交易品种分析",
        issues: [
          "品种分类可更加细化",
          "特性分析可更加深入",
          "缺乏定量评价指标"
        ],
        suggestions: [
          "细化交易品种分类",
          "深入分析各类品种的特性",
          "建立定量评价指标体系"
        ]
      },
      {
        section: "第4章 优化选择模型",
        issues: [
          "模型假设说明不够详细",
          "约束条件可更加明确",
          "敏感性分析可更全面",
          "多目标优化权衡分析可加强"
        ],
        suggestions: [
          "详细说明模型假设",
          "明确约束条件",
          "增加全面的敏感性分析",
          "加强多目标优化权衡分析"
        ]
      },
      {
        section: "第5章 案例分析",
        issues: [
          "多省份案例验证不足",
          "案例分析深度可进一步加强",
          "缺乏不同场景下的验证"
        ],
        suggestions: [
          "增加多省份案例验证",
          "深化案例分析，挖掘规律性结论",
          "进行多场景验证"
        ]
      },
      {
        section: "第6章 结论与展望",
        issues: [
          "结论部分可更加简洁明了",
          "展望部分可更加具体",
          "未充分说明研究成果的转化路径"
        ],
        suggestions: [
          "简洁明了地总结研究结论",
          "制定具体的未来研究计划",
          "说明研究成果的转化路径和推广应用计划"
        ]
      }
    ],
    summary: "报告5是一份优秀的研究报告，综合评分最高（83分）。建议重点深化TFN-AHP方法的理论说明，增加敏感性分析，增加多省份案例验证，完善结论和展望部分。预计修改后将成为一份非常优秀的研究报告。"
  }
];

function generateReport(report) {
  const children = [];
  
  // 封面
  children.push(docTitle(report.name));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 480 },
    children: [new TextRun({ text: "评审意见报告", font: FONT, bold: true, size: 36 })]
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 1200, after: 600 },
    children: [new TextRun({ text: "评审日期：2026年5月18日", font: FONT, size: 24 })]
  }));
  children.push(new Paragraph({ children: [new PageBreak()] }));

  // 一、评审概述
  children.push(heading(1, "一、评审概述"));
  children.push(bodyParagraph(report.overview));
  
  children.push(heading(2, "1.1 评分结果"));
  children.push(tableCaption(1, "五维度评分表"));
  
  const scoreRows = [
    new TableRow({
      tableHeader: true,
      children: [headerCell("评审维度", 2000), headerCell("评分", 1500), headerCell("权重", 1500), headerCell("加权分", 1500), headerCell("等级", 1806)]
    }),
    new TableRow({ children: [bodyCell("理论创新性", 2000, AlignmentType.LEFT), bodyCell(`${report.scores.theoretical}分`, 1500), bodyCell("25%", 1500), bodyCell(`${(report.scores.theoretical * 0.25).toFixed(1)}分`, 1500), bodyCell(report.grade, 1806)] }),
    new TableRow({ children: [bodyCell("技术前瞻性", 2000, AlignmentType.LEFT), bodyCell(`${report.scores.technical}分`, 1500), bodyCell("20%", 1500), bodyCell(`${(report.scores.technical * 0.20).toFixed(1)}分`, 1500), bodyCell("", 1806)] }),
    new TableRow({ children: [bodyCell("逻辑结构", 2000, AlignmentType.LEFT), bodyCell(`${report.scores.logical}分`, 1500), bodyCell("20%", 1500), bodyCell(`${(report.scores.logical * 0.20).toFixed(1)}分`, 1500), bodyCell("", 1806)] }),
    new TableRow({ children: [bodyCell("表述规范性", 2000, AlignmentType.LEFT), bodyCell(`${report.scores.normative}分`, 1500), bodyCell("15%", 1500), bodyCell(`${(report.scores.normative * 0.15).toFixed(1)}分`, 1500), bodyCell("", 1806)] }),
    new TableRow({ children: [bodyCell("研究价值", 2000, AlignmentType.LEFT), bodyCell(`${report.scores.value}分`, 1500), bodyCell("20%", 1500), bodyCell(`${(report.scores.value * 0.20).toFixed(1)}分`, 1500), bodyCell("", 1806)] }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: "加权总分", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${report.scores.total}分`, font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "100%", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${report.scores.total}分`, font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 1806, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: report.grade, font: FONT, size: 21, bold: true })] })] })
      ]
    })
  ];
  
  children.push(new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [2000, 1500, 1500, 1500, 1806],
    borders: TABLE_BORDERS,
    rows: scoreRows
  }));

  // 二、主要优点
  children.push(heading(1, "二、主要优点"));
  report.strengths.forEach((s, i) => {
    numberedParagraph(s, i + 1);
    children.push(numberedParagraph(s, i + 1));
  });

  // 三、详细问题与修改意见
  children.push(heading(1, "三、详细问题与修改意见"));
  
  report.detailedIssues.forEach((section, idx) => {
    children.push(heading(2, `${idx + 1}. ${section.section}`));
    
    children.push(new Paragraph({
      spacing: { before: 30, after: 20 },
      indent: { firstLine: 480 },
      children: [highlightText("【存在问题】", "C62828", true)]
    }));
    
    section.issues.forEach((issue, i) => {
      children.push(new Paragraph({
        indent: { firstLine: 720 },
        spacing: { line: 360, lineRule: "auto" },
        children: [
          new TextRun({ text: `${i + 1}. `, font: FONT, size: 24, bold: true, color: "C62828" }),
          new TextRun({ text: issue, font: FONT, size: 24, color: "C62828" })
        ]
      }));
    });
    
    children.push(new Paragraph({
      spacing: { before: 30, after: 20 },
      indent: { firstLine: 480 },
      children: [highlightText("【修改建议】", "2E7D32", true)]
    }));
    
    section.suggestions.forEach((suggestion, i) => {
      children.push(new Paragraph({
        indent: { firstLine: 720 },
        spacing: { line: 360, lineRule: "auto" },
        children: [
          new TextRun({ text: `${i + 1}. `, font: FONT, size: 24, bold: true, color: "2E7D32" }),
          new TextRun({ text: suggestion, font: FONT, size: 24, color: "2E7D32" })
        ]
      }));
    });
    
    children.push(new Paragraph({ children: [new PageBreak()] }));
  });

  // 四、特殊说明（如果有）
  if (report.note) {
    children.push(heading(1, "四、特殊说明"));
    children.push(new Paragraph({
      indent: { firstLine: 480 },
      spacing: { line: 360, lineRule: "auto" },
      children: [highlightText(report.note, "EF6C00", true)]
    }));
  }

  // 五、综合评价
  children.push(heading(1, "五、综合评价"));
  children.push(bodyParagraph(report.summary));
  
  children.push(heading(2, "5.1 修改优先级建议"));
  
  const priorityRows = [
    new TableRow({
      tableHeader: true,
      children: [headerCell("优先级", 1200), headerCell("修改内容", 4000), headerCell("涉及章节", 3106)]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "高", font: FONT, size: 21, bold: true })] })] }),
        new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "理论框架构建和核心创新点提炼", font: FONT, size: 19 })], alignment: AlignmentType.LEFT })] }),
        new TableCell({ width: { size: 3106, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "第2章 理论基础与方法", font: FONT, size: 19 })], alignment: AlignmentType.LEFT })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFE699", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "中", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "研究深度加强和多场景验证", font: FONT, size: 19 })], alignment: AlignmentType.LEFT })] }),
        new TableCell({ width: { size: 3106, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "第3章、第4章、第5章", font: FONT, size: 19 })], alignment: AlignmentType.LEFT })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "F4B084", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "低", font: FONT, size: 21 })] })] }),
        new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "规范性提升和图表优化", font: FONT, size: 19 })], alignment: AlignmentType.LEFT })] }),
        new TableCell({ width: { size: 3106, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "全文", font: FONT, size: 19 })], alignment: AlignmentType.LEFT })] })
      ]
    })
  ];
  
  children.push(new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [1200, 4000, 3106],
    borders: TABLE_BORDERS,
    rows: priorityRows
  }));

  // 创建文档
  const doc = new Document({
    features: { updateFields: true },
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
      children
    }]
  });

  return Packer.toBuffer(doc);
}

async function main() {
  console.log("开始为5份报告生成独立的评审意见文档...\n");
  
  for (const report of reportDetails) {
    console.log(`正在生成：${report.filename}...`);
    
    try {
      const buffer = await generateReport(report);
      const outputPath = path.join(OUTPUT_DIR, report.filename);
      fs.writeFileSync(outputPath, buffer);
      console.log(`✅ 已生成：${outputPath}\n`);
    } catch (err) {
      console.error(`❌ 生成失败：${report.filename}`, err);
    }
  }
  
  console.log("🎉 所有评审意见文档已生成完成！");
}

main().catch(err => {
  console.error("❌ 主程序执行失败：", err);
  process.exit(1);
});
