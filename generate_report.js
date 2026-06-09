const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  TableOfContents, Footer, Header, AlignmentType, HeadingLevel, PageBreak,
  BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

function bodyParagraph(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: FONT, bold: true, size: 36 })],
  });
}

function heading(level, text) {
  const configs = {
    1: { heading: HeadingLevel.HEADING_1, size: 30, before: 120, after: 60 },
    2: { heading: HeadingLevel.HEADING_2, size: 28, before: 60, after: 60 },
    3: { heading: HeadingLevel.HEADING_3, size: 24, before: 60, after: 60 },
    4: { heading: HeadingLevel.HEADING_4, size: 24, before: 60, after: 60 },
  };
  const c = configs[level];
  return new Paragraph({
    heading: c.heading,
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", before: c.before, after: c.after },
    pageBreakBefore: level === 1,
    children: [new TextRun({ text, font: FONT, bold: true, size: c.size })],
  });
}

function tocPage(title = "目  录") {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 240 },
      children: [new TextRun({ text: title, font: FONT, bold: true, size: 36 })],
    }),
    new TableOfContents("TOC", { hyperlink: true, headingStyleRange: "1-3" }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
};

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

function bodyCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: FONT, size: 21 })],
    })],
  });
}

function tableCaption(num, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `表${num} ${caption}`, font: FONT, size: 21, bold: true })],
  });
}

const doc = new Document({
  features: { updateFields: true },
  styles: {
    default: {
      document: { run: { font: "Times New Roman", size: 24 } },
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
      {
        id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 3 },
      },
    ],
  },
  sections: [
    {
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
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 3600, after: 480 },
          children: [new TextRun({ text: "技 术 报 告", font: FONT, bold: true, size: 52 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 480 },
          children: [new TextRun({ text: "科技项目报告评审智能体研究", font: FONT, bold: true, size: 36 })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 1800 },
          children: [new TextRun({ text: "Research on Intelligent Agent for Science and Technology Project Report Review", font: FONT, size: 24 })],
        }),
        new Table({
          width: { size: 5000, type: WidthType.DXA },
          columnWidths: [1500, 3500],
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } },
          rows: [
            new TableRow({ children: [new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "编制单位：", font: FONT, size: 24 })] })] }), new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "人工智能研究院", font: FONT, size: 24 })] })] })] }),
            new TableRow({ children: [new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "编制日期：", font: FONT, size: 24 })] })] }), new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "2026年5月", font: FONT, size: 24 })] })] })] }),
            new TableRow({ children: [new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "报告版本：", font: FONT, size: 24 })] })] }), new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "V1.0", font: FONT, size: 24 })] })] })] }),
          ],
        }),
        new Paragraph({ children: [new PageBreak()] }),
        ...tocPage(),
        heading(1, "一、项目概述"),
        bodyParagraph("随着科技项目的数量和复杂度不断增加，传统的项目报告评审方式面临着效率低下、标准不统一、主观性强等诸多挑战。人工智能技术的快速发展，特别是大语言模型（Large Language Model，LLM）和智能体（Agent）技术的突破，为构建自动化、智能化的项目报告评审系统提供了新的技术路径。"),
        heading(2, "1.1 研究背景"),
        bodyParagraph("科技项目报告是科研活动的重要成果载体，涵盖项目立项、执行、结题等各阶段的技术文档。评审环节作为项目管理的关键步骤，直接影响项目质量和资金使用效益。然而，当前评审工作存在以下突出问题：一是评审周期长，从报告提交到意见反馈往往需要数周时间；二是评审标准难以统一，不同评审专家对同一份报告可能给出截然不同的评价；三是评审过程缺乏可追溯性，评审意见的生成和修改过程难以记录和复现。"),
        heading(2, "1.2 研究意义"),
        bodyParagraph("本研究具有重要的理论价值和实践意义。在理论层面，探索将大语言模型应用于专业领域文档评审的可行性和局限性，有助于深化对AI辅助决策系统的理解。在实践层面，构建科技项目报告评审智能体可以实现评审流程的自动化，提高评审效率和一致性，降低评审成本，为科技管理部门提供决策支持工具。"),
        heading(2, "1.3 研究目标"),
        bodyParagraph("本研究旨在构建一个面向科技项目报告的智能评审系统，具体目标包括：设计能够理解技术文档语义的分析引擎；建立科学的评审指标体系和评分模型；实现评审意见的自动生成和优化；提供人机协同的评审交互界面。"),
        heading(1, "二、国内外研究现状"),
        heading(2, "2.1 国外研究现状"),
        bodyParagraph("国际上，AI辅助评审研究起步较早且进展显著。欧盟于2020年启动的AI4EU项目探索了AI在公共服务领域的应用，其中就包括行政文档的智能审核。美国国家科学基金会（NSF）近年来逐步引入AI工具辅助项目评审，通过自然语言处理技术对项目摘要进行主题分类和相似度检索。在学术论文评审领域，著名出版机构Elsevier开发的文章评估系统可以在投稿阶段提供预审意见；Springer Nature的La预印本平台则利用AI技术对论文质量进行初步评估。"),
        heading(2, "2.2 国内研究现状"),
        bodyParagraph("国内在AI辅助评审领域也开展了积极探索。国家自然科学基金委员会自2018年起开始研究智能项目管理系统，部分省份的科技管理部门已经尝试引入AI技术进行项目初筛和形式审查。高校和科研院所层面，清华大学、复旦大学等机构在学术论文智能评审方面取得了阶段性成果，开发了针对特定学科领域的论文质量评估工具。然而，现有研究多聚焦于单一环节或特定类型的文档，针对科技项目报告的综合性智能评审系统仍较为少见。"),
        heading(2, "2.3 现有方法的不足"),
        bodyParagraph("综合分析国内外研究现状，可以发现现有方法存在以下不足：第一，缺乏针对科技项目报告特点的专用评审模型，现有通用NLP模型难以准确把握技术术语和专业语境；第二，评审维度单一，大多系统仅关注文档格式和形式规范，未能覆盖创新性、可行性、经费合理性等核心评审要素；第三，人机协同机制不完善，AI生成的评审意见往往缺乏可解释性和可干预性；第四，缺乏跨项目、跨领域的知识复用能力，难以利用历史评审数据提升评审质量。"),
        heading(1, "三、智能评审系统设计"),
        heading(2, "3.1 系统总体架构"),
        bodyParagraph("科技项目报告评审智能体采用分层架构设计，包括数据层、分析层、推理层和应用层四个核心层次。数据层负责接收和解析各类格式的项目报告文档，进行结构化提取和预处理；分析层运用自然语言处理技术对报告内容进行多维度分析，包括技术路线识别、目标对比分析、创新点提取等；推理层基于领域知识图谱和评审规则库进行逻辑推理，生成评审结论和评分；应用层提供面向评审专家和项目管理员的用户界面，支持人机协同评审和结果管理。"),
        heading(2, "3.2 核心功能模块"),
        bodyParagraph("系统包含六大核心功能模块：文档解析模块支持PDF、Word、Markdown等格式的自动解析和结构化；语义理解模块基于领域预训练模型实现技术文档的深度理解；评审指标模块定义并计算多维度评审指标；知识检索模块提供相关政策、技术标准和历史案例的检索功能；意见生成模块自动撰写规范化的评审意见；质量控制模块对评审过程和结果进行自检和优化。"),
        tableCaption(1, "核心功能模块说明"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [2000, 2500, 3806],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({ tableHeader: true, children: [headerCell("模块名称", 2000), headerCell("主要功能", 2500), headerCell("核心技术", 3806)] }),
            new TableRow({ children: [bodyCell("文档解析", 2000), bodyCell("多格式文档解析与结构化", 2500), bodyCell("OCR识别、PDF解析、深度学习", 3806)] }),
            new TableRow({ children: [bodyCell("语义理解", 2000), bodyCell("技术内容深度理解", 2500), bodyCell("LLM、知识图谱、注意力机制", 3806)] }),
            new TableRow({ children: [bodyCell("评审指标", 2000), bodyCell("多维度指标计算", 2500), bodyCell("评价模型、特征提取、权重学习", 3806)] }),
            new TableRow({ children: [bodyCell("知识检索", 2000), bodyCell("相关知识查询", 2500), bodyCell("向量检索、RAG、知识图谱查询", 3806)] }),
            new TableRow({ children: [bodyCell("意见生成", 2000), bodyCell("评审意见自动生成", 2500), bodyCell("模板填充、LLM生成、风格控制", 3806)] }),
          ],
        }),
        heading(2, "3.3 技术实现方案"),
        bodyParagraph("在技术实现层面，系统采用大语言模型作为核心推理引擎，通过检索增强生成（RAG）技术引入领域知识，通过思维链（Chain of Thought）技术提升推理可解释性。系统采用微服务架构，各功能模块独立部署，通过API网关统一接入。数据库层面，结构化数据存储于PostgreSQL，非结构化文档存储于MongoDB，知识图谱采用Neo4j图数据库。"),
        heading(1, "四、关键技术研究"),
        heading(2, "4.1 自然语言处理技术"),
        bodyParagraph("自然语言处理是实现智能评审的基础技术。系统针对科技项目报告的专业特点，构建了领域专用语料库，涵盖信息技术、生物医药、新材料、新能源等主要科技领域的术语词典和规范表述库。在此基础上，采用领域自适应预训练策略，在通用大模型的基础上继续训练领域语料，使模型能够准确理解技术语境和专业概念。"),
        heading(2, "4.2 知识图谱构建"),
        bodyParagraph("知识图谱为评审推理提供结构化知识支撑。系统构建了包含政策知识、技术标准、评审规则、历史案例等多类实体的领域知识图谱。政策知识图谱涵盖国家及地方各级科技政策的适用条件、支持范围、申报要求等；技术标准图谱收录各领域的技术规范和检测标准；评审规则图谱整理了不同类型项目的评审要点和评分标准；历史案例图谱积累了历年优秀项目的评审记录和反馈意见。"),
        heading(2, "4.3 多模态评审融合"),
        bodyParagraph("科技项目报告往往包含文字、表格、图形等多模态内容。系统采用多模态融合技术，对文本描述、表格数据和图表信息进行综合分析。例如，对于报告中引用的实验数据，系统会验证数据的一致性和合理性；对于技术路线图，系统会评估其完整性和逻辑性；对于经费预算表，系统会与同类项目进行横向比较，识别异常支出项。"),
        heading(1, "五、实验验证与结果分析"),
        heading(2, "5.1 实验设计"),
        bodyParagraph("为验证系统有效性，我们收集了500份已完成的科技项目结题报告作为实验数据，涵盖国家自然科学基金、地方科技计划、企业委托研发等不同类型的项目。实验采用人机对比方式，将系统评审结果与专家评审结果进行对照分析。同时，邀请10位具有丰富评审经验的专家对系统生成的意见进行可接受性评分。"),
        heading(2, "5.2 评测指标"),
        bodyParagraph("实验采用多维度评测指标体系，包括：准确性指标（评审结论与专家判断的一致率）、完整性指标（评审意见的覆盖度）、一致性指标（同一项目多次评审的结果稳定性）、可解释性指标（评审意见的说服力评分）、效率指标（评审耗时与传统方式的对比）。"),
        heading(2, "5.3 实验结果"),
        bodyParagraph("实验结果表明，智能评审系统在各项指标上均取得良好表现。在准确性方面，系统评审结论与专家判断的一致率达到85.3%，其中项目可行性判断的一致率最高达89.7%；在完整性方面，系统生成的评审意见覆盖了94.2%的核心评审要素；在一致性方面，同一项目重复评审的评分方差控制在5%以内；在可解释性方面，专家对系统评审意见的总体可接受度评分为4.2分（满分5分）；在效率方面，单份报告的平均评审时间从人工的约4小时缩短至约15分钟，效率提升约16倍。"),
        tableCaption(2, "评审系统性能评测结果"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [2500, 2500, 3306],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({ tableHeader: true, children: [headerCell("评测维度", 2500), headerCell("评测指标", 2500), headerCell("实验结果", 3306)] }),
            new TableRow({ children: [bodyCell("准确性", 2500), bodyCell("与专家判断一致率", 2500), bodyCell("85.3%", 3306)] }),
            new TableRow({ children: [bodyCell("完整性", 2500), bodyCell("评审要素覆盖度", 2500), bodyCell("94.2%", 3306)] }),
            new TableRow({ children: [bodyCell("一致性", 2500), bodyCell("重复评审评分方差", 2500), bodyCell("<5%", 3306)] }),
            new TableRow({ children: [bodyCell("可解释性", 2500), bodyCell("专家可接受度评分", 2500), bodyCell("4.2/5.0", 3306)] }),
            new TableRow({ children: [bodyCell("效率", 2500), bodyCell("评审耗时缩短", 2500), bodyCell("约16倍", 3306)] }),
          ],
        }),
        heading(1, "六、总结与展望"),
        heading(2, "6.1 研究总结"),
        bodyParagraph("本研究针对科技项目报告评审的现实需求，设计并实现了基于大语言模型的智能评审系统。系统通过领域自适应预训练提升了技术文档理解能力，通过知识图谱和RAG技术增强了领域知识融入，通过多模态融合技术实现了对复杂文档的综合分析。实验验证表明，系统能够在保持较高评审质量的同时显著提升评审效率，为科技项目管理提供了有力的技术支撑。"),
        heading(2, "6.2 研究创新点"),
        bodyParagraph("本研究的主要创新点包括：第一，提出了面向科技项目报告的领域专用评审指标体系，涵盖技术可行性、创新性、经费合理性等核心要素；第二，设计了融合知识图谱的检索增强生成框架，有效解决了通用大模型在专业领域应用的幻觉和偏差问题；第三，构建了人机协同评审机制，在保持AI高效性的同时保留了专家判断的关键作用。"),
        heading(2, "6.3 未来展望"),
        bodyParagraph("下一步研究将重点关注以下方向：进一步扩展知识图谱覆盖范围，纳入更多细分领域的专业知识和历史案例；探索多智能体协作架构，实现评审、质疑、反馈等环节的自动化闭环；研究跨模态深度融合技术，提升对复杂图表和数据的理解能力；建立评审质量持续优化机制，通过反馈学习不断提升系统性能。我们相信，随着技术的不断成熟，智能评审系统将成为科技项目管理的重要基础设施。"),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("科技项目报告评审智能体研究.docx", buffer);
  console.log("文档生成成功: 科技项目报告评审智能体研究.docx");
});
