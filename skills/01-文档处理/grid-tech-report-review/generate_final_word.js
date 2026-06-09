/**
 * 生成最终版专业评审意见书 Word 文档
 */
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel, PageBreak, BorderStyle, WidthType, ShadingType, Footer, PageNumber } = require("docx");
const fs = require("fs");

// 中英混排字体常量
const FONT = { name: "Times New Roman", eastAsia: "宋体" };

async function generateFinalReport() {
  const children = [
    // --- 封面 ---
    new Paragraph({ spacing: { before: 3600, after: 480 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "电网科技项目技术研究报告", font: FONT, bold: true, size: 44 })] }),
    new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评  审  意  见  书", font: FONT, bold: true, size: 44 })] }),
    new Paragraph({ spacing: { before: 2400, after: 1200 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, bold: true, size: 36 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "项目类型：研究类", font: FONT, size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审类型：立项评审", font: FONT, size: 24 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审日期：2026年5月13日", font: FONT, size: 24 })] }),
    new Paragraph({ children: [new PageBreak()] }),
    
    // --- 评审概述 ---
    new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "一、评审概述", font: FONT, bold: true, size: 30 })] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.1 项目基本信息", font: FONT }), new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "项目名称：任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 24 })] }),
    new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "项目类型：研究类", font: FONT, size: 24 })] }),
    new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "评审类型：立项评审", font: FONT, size: 24 })] }),
    new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "评审日期：2026年5月13日", font: FONT, size: 24 })] }),
    
    new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.2 评审重点", font: FONT, bold: true, size: 28 })] }),
    new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "本次评审重点关注：理论创新性、技术前瞻性、逻辑结构、表述规范性、研究价值五个维度。", font: FONT, size: 24 })] }),
    
    // --- 评分汇总 ---
    new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "二、评审得分汇总", font: FONT, bold: true, size: 30 })] }),
    new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表1 五维评审得分汇总表", font: FONT, bold: true, size: 21 })] }),
  ];
  
  // 评分表格
  const tableRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审维度", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "权重", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "得分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "核心评价", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    
    new TableRow({ children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "理论创新性", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "25%", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "提出了 NLP+BERT 融合新方法和 4A 评估模型", font: FONT, size: 19 })] })] }),
    ]}),
    
    new TableRow({ children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "技术前瞻性", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20%", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "紧扣新型电力系统和双碳目标，采用前沿 AI 技术", font: FONT, size: 19 })] })] }),
    ]}),
    
    new TableRow({ children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "逻辑结构", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20%", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "95分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优秀", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "结构完整，章节清晰，符合规范", font: FONT, size: 19 })] })] }),
    ]}),
    
    new TableRow({ children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "表述规范性", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "20%", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "合格", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "表述专业，有图表辅助", font: FONT, size: 19 })] })] }),
    ]}),
    
    new TableRow({ children: [
      new TableCell({ width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "研究价值", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "15%", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优秀", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2706, type: WidthType.DXA }, children: [new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "学术价值高，应用价值明确，战略意义重大", font: FONT, size: 19 })] })] }),
    ]}),
    
    // 总分
    new TableRow({ children: [
      new TableCell({ width: { size: 3200, type: WidthType.DXA }, columnSpan: 2, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "加权总分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 3906, type: WidthType.DXA }, columnSpan: 2, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好 - 表现较好，有一定创新性和前瞻性", font: FONT, size: 21, bold: true })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [2000, 1200, 1200, 1200, 2706], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: tableRows }));
  
  // --- 各维度评价 ---
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "三、各维度详细评价", font: FONT, bold: true, size: 30 })] }));
  
  // 理论创新性
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.1 理论创新性", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "得分：85分（良好）", font: FONT, bold: true, size: 24 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24 })] }));
  ["提出了 NLP+BERT 融合的电力市场规则提取新方法", "提出了 4A 评估模型（可接入性、准确性、自动化、协同性）", "建立了数学模型和公式推导，理论深度足够"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24 })] }));
  ["增加与传统方法的性能对比实验"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  // 技术前瞻性
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.2 技术前瞻性", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "得分：80分（良好）", font: FONT, bold: true, size: 24 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24 })] }));
  ["紧扣新型电力系统和双碳目标的发展趋势", "采用了人工智能（NLP/BERT）等前沿技术", "对未来技术发展有清晰的展望"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24 })] }));
  ["增加与国际前沿技术的对标分析"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  // 逻辑结构
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.3 逻辑结构", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "得分：95分（优秀）", font: FONT, bold: true, size: 24 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24 })] }));
  ["结构非常完整（绪论、3个技术模块、4个省份路径、总结展望）", "章节层次清晰，逻辑连贯", "有目录、图表、参考文献，结构规范"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24 })] }));
  ["建议增加中英文摘要"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  // 表述规范性
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.4 表述规范性", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "得分：75分（合格）", font: FONT, bold: true, size: 24 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24 })] }));
  ["使用了电网领域专业术语，表述专业", "使用了表格、示意图辅助说明"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24 })] }));
  ["增加术语表，统一专业术语表述"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  // 研究价值
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.5 研究价值", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "得分：90分（优秀）", font: FONT, bold: true, size: 24 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24 })] }));
  ["具有较高的学术价值（多算法融合创新）", "具有明确的应用价值（针对公司实际问题）", "对公司战略发展具有重要意义"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24 })] }));
  ["增加成果可推广性分析"].forEach(text => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: `• ${text}`, font: FONT, size: 24 })] }));
  });
  
  // --- 综合结论 ---
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "四、综合评价与建议", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.1 总体评价", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "经综合评审，本项目技术研究报告加权总分为 85 分，综合评价等级为【良好】。", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.2 评审结论", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "建议【通过评审】，可继续深入研究。", font: FONT, bold: true, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "本报告在理论创新性、技术前瞻性、逻辑结构和研究价值方面表现优秀，是一份高质量的电网科技项目研究报告。", font: FONT, size: 24 })] }));
  
  const doc = new Document({
    features: { updateFields: true },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 } } }, children }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("c:\\AI学习资料\\mesheer\\评审意见书_最终专业版.docx", buffer);
  console.log("最终版专业评审意见书已生成！");
}

generateFinalReport().catch(err => {
  console.error(err);
});
