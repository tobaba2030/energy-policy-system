/**
 * 电网科技项目技术研究报告评审引擎 v3.0
 * 针对技术研究报告，重点评审：理论创新性、技术前瞻性、逻辑结构、表述规范性
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel, PageBreak, BorderStyle, WidthType, ShadingType } = require("docx");
const fs = require("fs");
const path = require("path");

// 中英混排字体常量
const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

// 五个评审维度
const REVIEW_DIMENSIONS = {
  theoreticalInnovation: {
    name: "理论创新性",
    weight: 0.25,
    criteria: [
      "是否提出新理论、新方法、新机制",
      "原创性程度：原创/改进/集成/应用",
      "与现有理论方法的差异性",
      "理论深度和严谨性"
    ]
  },
  technicalForwardLooking: {
    name: "技术前瞻性",
    weight: 0.20,
    criteria: [
      "是否把握行业发展趋势（新型电力系统、双碳、数字化）",
      "对未来技术发展的指引价值",
      "与国际前沿技术的接轨程度",
      "战略眼光和前瞻性判断"
    ]
  },
  logicalStructure: {
    name: "逻辑结构",
    weight: 0.20,
    criteria: [
      "报告结构是否完整（摘要、引言、正文、结论、参考文献）",
      "逻辑是否清晰，层次是否分明",
      "各章节衔接是否顺畅",
      "论证是否充分，论据是否可靠"
    ]
  },
  presentationQuality: {
    name: "表述规范性",
    weight: 0.20,
    criteria: [
      "文字是否精炼、专业、准确",
      "是否符合电网领域科技报告写作规范",
      "图表使用是否规范",
      "术语使用是否统一、准确"
    ]
  },
  researchValue: {
    name: "研究价值",
    weight: 0.15,
    criteria: [
      "学术价值：对学科发展的贡献",
      "应用价值：对电网实际问题的解决",
      "研究成果的可推广性",
      "对公司发展的战略意义"
    ]
  }
};

/**
 * 根据分数获取等级
 */
function getGrade(score) {
  if (score >= 90) return { grade: "优秀", label: "优秀", description: "表现突出，具有重要创新性和前瞻性" };
  if (score >= 80) return { grade: "良好", label: "良好", description: "表现较好，有一定创新性和前瞻性" };
  if (score >= 70) return { grade: "合格", label: "合格", description: "基本达标，存在改进空间" };
  if (score >= 60) return { grade: "基本合格", label: "基本合格", description: "勉强达标，需较大改进" };
  return { grade: "不合格", label: "不合格", description: "不达标，需重大修改" };
}

/**
 * 分析技术研究报告
 */
function analyzeReportContent(content) {
  const analysis = {
    theoreticalInnovation: {
      hasNewTheory: /新理论|新方法|新机制|提出了|建立了|提出了一种/.test(content),
      hasInnovationType: /原创|集成|改进|应用/.test(content),
      hasComparison: /相比|对比|优于|提高|降低/.test(content),
      hasDepth: /数学模型|公式推导|严格证明|理论分析/.test(content)
    },
    technicalForwardLooking: {
      hasTrends: /新型电力系统|双碳|数字化|人工智能|机器学习|数字孪生|边缘计算|物联网/.test(content),
      hasFutureGuidance: /未来|趋势|发展方向|展望|远景/.test(content),
      hasInternationalBenchmark: /国际|全球|世界前沿|国际先进/.test(content),
      hasStrategicVision: /战略|规划|布局|体系/.test(content)
    },
    logicalStructure: {
      hasAbstract: /摘要|Abstract/.test(content),
      hasIntroduction: /引言|绪论|研究背景/.test(content),
      hasConclusion: /结论|总结|结语/.test(content),
      hasReferences: /参考文献|References/.test(content),
      hasClearStructure: /一|二|三|1\.|2\.|3\./.test(content)
    },
    presentationQuality: {
      isConcise: content.length > 1000 && content.length < 20000,
      hasProfessionalLanguage: /电力系统|电网|新能源|负荷|电压|电流|频率|阻抗|容量|功率/.test(content),
      hasDiagrams: /图|表|Figure|Table/.test(content),
      hasConsistentTerms: /统一|规范|术语/.test(content)
    },
    researchValue: {
      hasAcademicValue: /学术|理论|研究|发表|期刊|会议/.test(content),
      hasApplicationValue: /应用|实际|工程|落地|实践/.test(content),
      hasScalability: /推广|复制|扩展|广泛应用/.test(content),
      hasStrategicValue: /公司|战略|发展|竞争力/.test(content)
    }
  };
  
  return analysis;
}

/**
 * 计算各维度评分
 */
function calculateDimensionScores(content, analysis) {
  const scores = {};
  
  // 理论创新性
  let tiScore = 50;
  const ti = analysis.theoreticalInnovation;
  if (ti.hasNewTheory) tiScore += 15;
  if (ti.hasInnovationType) tiScore += 10;
  if (ti.hasComparison) tiScore += 10;
  if (ti.hasDepth) tiScore += 15;
  scores.theoreticalInnovation = Math.min(100, tiScore);
  
  // 技术前瞻性
  let tfScore = 50;
  const tf = analysis.technicalForwardLooking;
  if (tf.hasTrends) tfScore += 15;
  if (tf.hasFutureGuidance) tfScore += 15;
  if (tf.hasInternationalBenchmark) tfScore += 10;
  if (tf.hasStrategicVision) tfScore += 10;
  scores.technicalForwardLooking = Math.min(100, tfScore);
  
  // 逻辑结构
  let lsScore = 50;
  const ls = analysis.logicalStructure;
  if (ls.hasAbstract) lsScore += 10;
  if (ls.hasIntroduction) lsScore += 10;
  if (ls.hasConclusion) lsScore += 10;
  if (ls.hasReferences) lsScore += 10;
  if (ls.hasClearStructure) lsScore += 10;
  scores.logicalStructure = Math.min(100, lsScore);
  
  // 表述规范性
  let pqScore = 50;
  const pq = analysis.presentationQuality;
  if (pq.isConcise) pqScore += 10;
  if (pq.hasProfessionalLanguage) pqScore += 20;
  if (pq.hasDiagrams) pqScore += 10;
  if (pq.hasConsistentTerms) pqScore += 10;
  scores.presentationQuality = Math.min(100, pqScore);
  
  // 研究价值
  let rvScore = 50;
  const rv = analysis.researchValue;
  if (rv.hasAcademicValue) rvScore += 15;
  if (rv.hasApplicationValue) rvScore += 15;
  if (rv.hasScalability) rvScore += 10;
  if (rv.hasStrategicValue) rvScore += 10;
  scores.researchValue = Math.min(100, rvScore);
  
  return scores;
}

/**
 * 生成各维度评价意见
 */
function generateDimensionComments(dimension, score, analysis) {
  const comments = { strengths: [], weaknesses: [], suggestions: [] };
  
  switch(dimension) {
    case "theoreticalInnovation":
      const ti = analysis.theoreticalInnovation;
      if (ti.hasNewTheory) comments.strengths.push("提出了新的理论、方法或机制");
      if (ti.hasDepth) comments.strengths.push("具有理论深度和严谨性");
      if (!ti.hasNewTheory) comments.weaknesses.push("理论创新性不足，未明确提出新理论或新方法");
      if (!ti.hasComparison) comments.weaknesses.push("缺乏与现有方法的对比分析");
      if (!ti.hasDepth) comments.suggestions.push("建议增加理论分析和数学推导，提升理论深度");
      break;
      
    case "technicalForwardLooking":
      const tf = analysis.technicalForwardLooking;
      if (tf.hasTrends) comments.strengths.push("把握了行业发展趋势（新型电力系统、双碳等）");
      if (tf.hasFutureGuidance) comments.strengths.push("对未来技术发展有指引价值");
      if (!tf.hasTrends) comments.weaknesses.push("对行业发展趋势关注不足");
      if (!tf.hasFutureGuidance) comments.weaknesses.push("缺乏对未来技术发展的展望和指引");
      if (!tf.hasStrategicVision) comments.suggestions.push("建议增加战略眼光和前瞻性判断");
      break;
      
    case "logicalStructure":
      const ls = analysis.logicalStructure;
      if (ls.hasClearStructure) comments.strengths.push("逻辑结构清晰，层次分明");
      if (ls.hasAbstract && ls.hasIntroduction && ls.hasConclusion && ls.hasReferences) comments.strengths.push("报告结构完整");
      if (!ls.hasAbstract) comments.weaknesses.push("缺少摘要");
      if (!ls.hasReferences) comments.weaknesses.push("缺少参考文献");
      if (!ls.hasClearStructure) comments.weaknesses.push("结构不够清晰，建议使用规范的章节编号");
      break;
      
    case "presentationQuality":
      const pq = analysis.presentationQuality;
      if (pq.hasProfessionalLanguage) comments.strengths.push("使用了电网领域专业术语");
      if (pq.hasDiagrams) comments.strengths.push("使用了图表辅助说明");
      if (!pq.isConcise) comments.weaknesses.push("文字表述不够精炼，建议精简");
      if (!pq.hasDiagrams) comments.weaknesses.push("缺少图表，建议增加示意图或表格");
      break;
      
    case "researchValue":
      const rv = analysis.researchValue;
      if (rv.hasAcademicValue) comments.strengths.push("具有一定学术价值");
      if (rv.hasApplicationValue) comments.strengths.push("具有应用价值");
      if (!rv.hasStrategicValue) comments.weaknesses.push("对公司发展的战略意义阐述不足");
      if (!rv.hasScalability) comments.suggestions.push("建议增加研究成果的可推广性分析");
      break;
  }
  
  return comments;
}

/**
 * 主评审函数
 */
function reviewReport(options) {
  const { projectName, reportContent, projectType = "研究类", reviewType = "立项评审" } = options;
  
  const analysis = analyzeReportContent(reportContent);
  const dimensionScores = calculateDimensionScores(reportContent, analysis);
  
  let totalScore = 0;
  for (const [key, score] of Object.entries(dimensionScores)) {
    totalScore += score * REVIEW_DIMENSIONS[key].weight;
  }
  totalScore = Math.round(totalScore);
  
  const overallGrade = getGrade(totalScore);
  
  const dimensionComments = {};
  for (const [key, score] of Object.entries(dimensionScores)) {
    dimensionComments[key] = generateDimensionComments(key, score, analysis);
  }
  
  return {
    projectName, projectType, reviewType,
    reviewDate: new Date().toISOString().split("T")[0],
    dimensionScores, totalScore, overallGrade,
    dimensionComments, analysis, dimensions: REVIEW_DIMENSIONS
  };
}

// 辅助函数
function bodyParagraph(text) {
  return new Paragraph({ spacing: { line: 360, lineRule: "auto" }, indent: { firstLine: 480, firstLineChars: 200 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text, font: FONT, size: 24 })] });
}
function heading(level, text) {
  const sizes = { 1: 30, 2: 28, 3: 24 };
  return new Paragraph({ heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3, alignment: AlignmentType.LEFT, spacing: { line: 360, lineRule: "auto", before: level === 1 ? 120 : 60, after: level === 1 ? 60 : 60 }, pageBreakBefore: level === 1, children: [new TextRun({ text, font: FONT, bold: true, size: sizes[level] })] });
}
function tableCaption(num, caption) {
  return new Paragraph({ spacing: { before: 120, after: 60 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: `表${num} ${caption}`, font: FONT, size: 21, bold: true })] });
}

/**
 * 生成评审报告
 */
async function generateReviewReport(reviewData, outputPath) {
  const children = [
    // 封面
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 3600, after: 480 }, children: [new TextRun({ text: "电网科技项目技术研究报告", font: FONT, bold: true, size: 44 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "评 审 意 见 书", font: FONT, bold: true, size: 44 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 1200 }, children: [new TextRun({ text: reviewData.projectName, font: FONT, bold: true, size: 36 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: `项目类型：${reviewData.projectType}`, font: FONT, size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: `评审类型：${reviewData.reviewType}`, font: FONT, size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: `评审日期：${reviewData.reviewDate}`, font: FONT, size: 24 })] }),
    new Paragraph({ children: [new PageBreak()] }),
    
    // 评审概述
    heading(1, "一、评审概述"),
    heading(2, "1.1 项目基本信息"),
    bodyParagraph(`项目名称：${reviewData.projectName}`),
    bodyParagraph(`项目类型：${reviewData.projectType}`),
    bodyParagraph(`评审类型：${reviewData.reviewType}`),
    bodyParagraph(`评审日期：${reviewData.reviewDate}`),
    heading(2, "1.2 评审重点"),
    bodyParagraph("本次评审重点关注：理论创新性、技术前瞻性、逻辑结构、表述规范性、研究价值五个维度。"),
    
    // 评分汇总
    heading(1, "二、评审得分汇总"),
    tableCaption(1, "五维度评审得分汇总表"),
  ];
  
  // 生成评分表格
  const tableRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审维度", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "权重", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "得分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "核心评价", font: FONT, size: 21, bold: true })] })] }),
    ]})
  ];
  
  const dimNames = {
    theoreticalInnovation: "理论创新性",
    technicalForwardLooking: "技术前瞻性",
    logicalStructure: "逻辑结构",
    presentationQuality: "表述规范性",
    researchValue: "研究价值"
  };
  
  for (const [key, score] of Object.entries(reviewData.dimensionScores)) {
    tableRows.push(new TableRow({ children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: dimNames[key], font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${(reviewData.dimensions[key].weight * 100).toFixed(0)}%`, font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${score}分`, font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: getGrade(score).grade, font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: reviewData.dimensions[key].criteria[0], font: FONT, size: 19 })] })] }),
    ]}));
  }
  
  // 汇总行
  tableRows.push(new TableRow({ children: [
    new TableCell({ width: { size: 3200, type: WidthType.DXA }, columnSpan: 2, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "加权总分", font: FONT, size: 21, bold: true })] })] }),
    new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${reviewData.totalScore}分`, font: FONT, size: 21, bold: true })] })] }),
    new TableCell({ width: { size: 3906, type: WidthType.DXA }, columnSpan: 2, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `${reviewData.overallGrade.grade} - ${reviewData.overallGrade.description}`, font: FONT, size: 21, bold: true })] })] }),
  ]}));
  
  children.push(new Table({ width: { size: CONTENT_WIDTH, type: WidthType.DXA }, columnWidths: [2000, 1200, 1200, 1200, 2706], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: tableRows }));
  
  // 各维度详细评价
  let sectionNum = 3;
  for (const [key, score] of Object.entries(reviewData.dimensionScores)) {
    const dimName = dimNames[key];
    const comments = reviewData.dimensionComments[key];
    const grade = getGrade(score);
    
    children.push(heading(1, `${sectionNum === 3 ? "三" : sectionNum === 4 ? "四" : sectionNum === 5 ? "五" : sectionNum === 6 ? "六" : "七"}、${dimName}评价`));
    children.push(heading(2, `${sectionNum-2}.1 评分结果`));
    children.push(bodyParagraph(`${dimName}评分：${score}分（${grade.grade}）`));
    
    if (comments.strengths.length > 0) {
      children.push(heading(2, `${sectionNum-2}.2 主要优点`));
      comments.strengths.forEach(s => children.push(bodyParagraph(`• ${s}`)));
    }
    
    if (comments.weaknesses.length > 0) {
      children.push(heading(2, `${sectionNum-2}.3 存在问题`));
      comments.weaknesses.forEach(w => children.push(bodyParagraph(`• ${w}`)));
    }
    
    if (comments.suggestions.length > 0) {
      children.push(heading(2, `${sectionNum-2}.4 改进建议`));
      comments.suggestions.forEach(s => children.push(bodyParagraph(`• ${s}`)));
    }
    
    sectionNum++;
  }
  
  // 综合评价
  children.push(heading(1, "八、综合评价与建议"));
  children.push(heading(2, "8.1 总体评价"));
  children.push(bodyParagraph(`经综合评审，本项目技术研究报告加权总分为${reviewData.totalScore}分，综合评价等级为“${reviewData.overallGrade.grade}”。`));
  children.push(heading(2, "8.2 评审结论"));
  const conclusion = reviewData.totalScore >= 80 ? "同意通过评审，建议继续开展研究工作。" : 
                    reviewData.totalScore >= 70 ? "建议修改完善后通过评审。" : 
                    reviewData.totalScore >= 60 ? "建议补充完善后重新评审。" : "不予通过，建议重大修改后重新申报。";
  children.push(bodyParagraph(conclusion));
  
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
  fs.writeFileSync(outputPath, buffer);
  console.log(`评审报告已生成: ${outputPath}`);
}

module.exports = { reviewReport, generateReviewReport };
