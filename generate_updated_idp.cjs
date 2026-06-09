const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  TableOfContents, Footer, Header,
  AlignmentType, HeadingLevel, PageBreak,
  BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

// ————— 辅助函数 —————

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

function centerParagraph(text, size = 24, bold = false) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 360, lineRule: "auto" },
    children: [
      new TextRun({ text, font: FONT, size, bold }),
    ],
  });
}

function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({ text, font: FONT, bold: true, size: 36 }),
    ],
  });
}

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
    pageBreakBefore: level === 1,
    children: [
      new TextRun({ text, font: FONT, bold: true, size: c.size }),
    ],
  });
}

function tocPage(title = "目    录") {
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

const TABLE_BORDERS = {
  top:     { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom:  { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left:    { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right:   { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical:   { style: BorderStyle.SINGLE, size: 4, color: "auto" },
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

function tableCaption(tableNumber, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: `表${tableNumber} ${caption}`, font: FONT, size: 21, bold: true }),
    ],
  });
}

function listItem(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { left: 480 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

function boxParagraph(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    shading: { type: ShadingType.CLEAR, fill: "F8F9FA" },
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
    },
    children: [
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

// ————— 文档定义 —————

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
    children: [
      docTitle("电网领域科创业务中心"),
      docTitle("个人数字化AI专项IDP落地执行手册"),
      new Paragraph({
        children: [new PageBreak()],
      }),
      centerParagraph("版本号：v1.0", 28, true),
      centerParagraph("编制日期：2026年5月", 28, true),
      centerParagraph("执行周期：2026年6月 - 2028年5月", 28, true),
      new Paragraph({
        children: [new PageBreak()],
      }),
      ...tocPage(),
      
      heading(1, "一、执行总览"),
      heading(2, "1.1 项目背景"),
      bodyParagraph("随着人工智能技术的快速发展，大模型、深度学习等技术在电网领域的应用前景日益广阔。为提升科创业务中心的项目策划、申报、研究能力，特制定本IDP（个人发展计划）执行手册。"),
      
      heading(2, "1.2 总体目标"),
      bodyParagraph("通过2年的系统性AI能力建设，实现以下目标："),
      listItem("（1）工作效率整体提升40%以上；"),
      listItem("（2）全员掌握AI工具应用，3-4人成为AI专家；"),
      listItem("（3）建立完整的电网领域AI工作体系；"),
      listItem("（4）产出3-5个创新应用项目。"),
      
      heading(2, "1.3 时间规划"),
      tableCaption(1, "时间规划表"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1200, 2000, 2600, 2506],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("阶段", 1200),
              headerCell("时间周期", 2000),
              headerCell("核心任务", 2600),
              headerCell("预期成果", 2506),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第一阶段", 1200),
              bodyCell("2026.6-2026.7", 2000),
              bodyCell("AI启蒙，工具试用", 2600),
              bodyCell("AI工具配置完成", 2506),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第二阶段", 1200),
              bodyCell("2026.7-2026.9", 2000),
              bodyCell("知识库建设", 2600),
              bodyCell("完成首批知识库内容", 2506),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第三阶段", 1200),
              bodyCell("2026.8-2026.10", 2000),
              bodyCell("模板体系建立", 2600),
              bodyCell("完成60+提示词模板", 2506),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第四阶段", 1200),
              bodyCell("2026.9-2027.6", 2000),
              bodyCell("能力提升", 2600),
              bodyCell("完成三级项目实践", 2506),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第五阶段", 1200),
              bodyCell("2027.7-2028.5", 2000),
              bodyCell("价值创造", 2600),
              bodyCell("形成方法论", 2506),
            ],
          }),
        ],
      }),
      
      heading(1, "二、第一阶段：即刻启动（第1-2个月）"),
      heading(2, "2.1 立即行动清单"),
      tableCaption(2, "立即行动清单"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [800, 3000, 1500, 2000, 1006],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("序号", 800),
              headerCell("任务", 3000),
              headerCell("负责人", 1500),
              headerCell("产出物", 2000),
              headerCell("时间估计", 1006),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("1", 800),
              bodyCell("AI工具选型与账号配置", 3000),
              bodyCell("A类人员", 1500),
              bodyCell("AI工具配置手册", 2000),
              bodyCell("2小时", 1006),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("2", 800),
              bodyCell("电网政策文件收集", 3000),
              bodyCell("全员", 1500),
              bodyCell("政策库（首批20份）", 2000),
              bodyCell("4小时", 1006),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("3", 800),
              bodyCell("首批提示词模板制作", 3000),
              bodyCell("B类人员", 1500),
              bodyCell("5个核心模板", 2000),
              bodyCell("3小时", 1006),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("4", 800),
              bodyCell("团队首次AI分享会", 3000),
              bodyCell("C类人员", 1500),
              bodyCell("会议纪要+行动清单", 2000),
              bodyCell("2小时", 1006),
            ],
          }),
        ],
      }),
      
      heading(2, "2.2 AI工具配置包"),
      bodyParagraph("推荐配置以下AI工具："),
      tableCaption(3, "AI工具配置表"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 3000, 1500, 1806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("工具名称", 2000),
              headerCell("用途", 3000),
              headerCell("推荐等级", 1500),
              headerCell("学习成本", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Claude 3.5 Sonnet", 2000),
              bodyCell("长文档写作、深度思考", 3000),
              bodyCell("5星", 1500),
              bodyCell("低", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("GPT-4o", 2000),
              bodyCell("多模态、PPT生成", 3000),
              bodyCell("5星", 1500),
              bodyCell("低", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Gamma", 2000),
              bodyCell("AI生成PPT演示", 3000),
              bodyCell("5星", 1500),
              bodyCell("低", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Notion", 2000),
              bodyCell("知识库管理", 3000),
              bodyCell("4星", 1500),
              bodyCell("中", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Cursor", 2000),
              bodyCell("AI编程（A类）", 3000),
              bodyCell("4星", 1500),
              bodyCell("中高", 1806),
            ],
          }),
        ],
      }),
      
      heading(2, "2.3 第1周日程安排"),
      tableCaption(4, "第1周日程安排"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 6806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("日期", 1500),
              headerCell("任务安排", 6806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("周一", 1500),
              bodyCell("AI工具选型与账号注册", 6806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("周二", 1500),
              bodyCell("政策文件收集（首批20份）", 6806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("周三", 1500),
              bodyCell("首批提示词模板制作（5个）", 6806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("周四", 1500),
              bodyCell("第一个文档AI尝试（简表练习）", 6806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("周五", 1500),
              bodyCell("团队首次AI分享会 + 复盘", 6806),
            ],
          }),
        ],
      }),
      
      heading(1, "三、第二阶段：知识库建设（第2-4个月）"),
      heading(2, "3.1 知识库结构设计"),
      bodyParagraph("电网领域知识库分为以下5个主要分类："),
      listItem("（1）政策法规库 - 国家政策、行业标准、申报指南；"),
      listItem("（2）技术方向库 - 智能电网、电力市场、新能源、设备监测、调度优化；"),
      listItem("（3）研究机构库 - 高校院所、电网企业、设备厂商；"),
      listItem("（4）典型案例库 - 成功项目、申报材料、PPT范例；"),
      listItem("（5）文献资料库 - 中文期刊、外文期刊。"),
      
      heading(2, "3.2 首批知识库内容清单"),
      bodyParagraph("第1个月内需完成以下内容："),
      tableCaption(5, "首批知识库内容清单"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 2000, 4306],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("分类", 2000),
              headerCell("内容数量", 2000),
              headerCell("说明", 4306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("政策文件", 2000),
              bodyCell("20份", 2000),
              bodyCell("近2年国家级、省部级重要政策", 4306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("申报指南", 2000),
              bodyCell("10份", 2000),
              bodyCell("近2年重点项目申报指南", 4306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("典型案例", 2000),
              bodyCell("10个", 2000),
              bodyCell("成功申报的电网项目", 4306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("文献资料", 2000),
              bodyCell("50篇", 2000),
              bodyCell("高质量期刊论文", 4306),
            ],
          }),
        ],
      }),
      
      heading(1, "四、第三阶段：提示词模板体系（第3-5个月）"),
      heading(2, "4.1 提示词模板矩阵"),
      tableCaption(6, "提示词模板矩阵"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 2000, 2000, 2306],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("材料类型", 2000),
              headerCell("提示词数量", 2000),
              headerCell("难度等级", 2000),
              headerCell("预计效率提升", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("申报简表", 2000),
              bodyCell("8个", 2000),
              bodyCell("初级", 2000),
              bodyCell("60%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("申报书", 2000),
              bodyCell("15个", 2000),
              bodyCell("中级", 2000),
              bodyCell("50%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("可研报告", 2000),
              bodyCell("12个", 2000),
              bodyCell("中级", 2000),
              bodyCell("45%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("PPT制作", 2000),
              bodyCell("10个", 2000),
              bodyCell("中级", 2000),
              bodyCell("55%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("技术报告", 2000),
              bodyCell("8个", 2000),
              bodyCell("高级", 2000),
              bodyCell("40%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("专利申请", 2000),
              bodyCell("6个", 2000),
              bodyCell("高级", 2000),
              bodyCell("35%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("小论文", 2000),
              bodyCell("8个", 2000),
              bodyCell("高级", 2000),
              bodyCell("40%", 2306),
            ],
          }),
        ],
      }),
      
      heading(2, "4.2 TOP5高频提示词模板"),
      heading(3, "4.2.1 模板1：电网项目简表亮点提炼"),
      bodyParagraph("【功能】快速提炼项目申报简表的核心亮点，严格控制字数。"),
      bodyParagraph("【使用方法】填写项目基本信息和核心内容，AI将自动生成亮点。"),
      
      heading(3, "4.2.2 模板2：电网技术方案AI设计"),
      bodyParagraph("【功能】自动设计电网项目技术方案，包含架构图、技术路线。"),
      bodyParagraph("【输出内容】总体架构、关键技术、实施路线、可行性分析。"),
      
      heading(3, "4.2.3 模板3：电网文献综述AI辅助"),
      bodyParagraph("【功能】智能梳理电网领域研究方向，分析技术发展路线。"),
      bodyParagraph("【输出内容】发展历程、技术对比、团队分析、研究空白。"),
      
      heading(3, "4.2.4 模板4：电网项目PPT自动生成"),
      bodyParagraph("【功能】自动生成PPT大纲，逐页设计内容和图表。"),
      bodyParagraph("【输出内容】15-20页完整PPT大纲，含演讲备注。"),
      
      heading(3, "4.2.5 模板5：电网项目指南AI分析"),
      bodyParagraph("【功能】深度分析项目指南，提炼重点，推荐申报方向。"),
      bodyParagraph("【输出内容】导向分析、关键词云、申报矩阵、避坑提醒。"),
      
      heading(1, "五、第四阶段：三级项目实践（第4-12个月）"),
      heading(2, "5.1 三级项目体系"),
      bodyParagraph("项目实践分为三个等级，从个人到团队再到业务创新："),
      tableCaption(7, "三级项目体系"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 2500, 2000, 2306],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("项目等级", 1500),
              headerCell("定位", 2500),
              headerCell("时间周期", 2000),
              headerCell("预期效果", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第一级", 1500),
              bodyCell("个人效率工具", 2500),
              bodyCell("1-2个月", 2000),
              bodyCell("个人效率提升20%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第二级", 1500),
              bodyCell("团队协作工具", 2500),
              bodyCell("3-5个月", 2000),
              bodyCell("团队效率提升15%", 2306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("第三级", 1500),
              bodyCell("业务创新应用", 2500),
              bodyCell("6-12个月", 2000),
              bodyCell("产生可量化业务价值", 2306),
            ],
          }),
        ],
      }),
      
      heading(2, "5.2 重点项目介绍"),
      heading(3, "5.2.1 项目1：电网政策智能推送助手"),
      bodyParagraph("【功能】自动追踪电网领域政策动态，AI摘要生成，关键词订阅推送。"),
      tableCaption(8, "电网政策智能推送助手功能模块"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 3500, 1200, 1606],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("功能模块", 2000),
              headerCell("实现方式", 3500),
              headerCell("难度", 1200),
              headerCell("预计时间", 1606),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("政策源配置", 2000),
              bodyCell("手动配置10个政策网站", 3500),
              bodyCell("初级", 1200),
              bodyCell("2小时", 1606),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("AI摘要生成", 2000),
              bodyCell("Claude API自动摘要", 3500),
              bodyCell("中级", 1200),
              bodyCell("4小时", 1606),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("关键词订阅", 2000),
              bodyCell("Notion数据库 + 标签", 3500),
              bodyCell("初级", 1200),
              bodyCell("2小时", 1606),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("推送提醒", 2000),
              bodyCell("邮件/企业微信通知", 3500),
              bodyCell("中级", 1200),
              bodyCell("3小时", 1606),
            ],
          }),
        ],
      }),
      
      heading(3, "5.2.2 项目2：电网术语智能翻译与解释"),
      bodyParagraph("【功能】建立电网术语库，支持智能查询、双语对照、概念关联。"),
      
      heading(3, "5.2.3 项目3：电网项目申报智能模板系统"),
      bodyParagraph("【功能】支持5类典型电网项目，AI自动生成申报书初稿。"),
      
      heading(3, "5.2.4 项目4：电网文献智能管理系统"),
      bodyParagraph("【功能】智能检索、AI摘要、知识关联、阅读进度追踪。"),
      
      heading(3, "5.2.5 项目5：电网技术创新点挖掘系统"),
      bodyParagraph("【功能】文献分析、专利分析、趋势预测、创新建议。"),
      
      heading(3, "5.2.6 项目6：电网项目智能评估助手"),
      bodyParagraph("【功能】技术可行性、创新性、应用前景、风险分析。"),
      
      heading(1, "六、第五阶段：评估与持续改进"),
      heading(2, "6.1 能力成熟度评估模型"),
      tableCaption(9, "能力成熟度评估模型"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 2000, 4806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("等级", 1500),
              headerCell("名称", 2000),
              headerCell("特征描述", 4806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Level 1", 1500),
              bodyCell("初始级", 2000),
              bodyCell("AI启蒙，开始试用", 4806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Level 2", 1500),
              bodyCell("应用级", 2000),
              bodyCell("熟练使用，效率提升", 4806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Level 3", 1500),
              bodyCell("整合级", 2000),
              bodyCell("体系建立，流程优化", 4806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Level 4", 1500),
              bodyCell("创新级", 2000),
              bodyCell("应用创新，价值创造", 4806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Level 5", 1500),
              bodyCell("引领级", 2000),
              bodyCell("方法论输出，行业引领", 4806),
            ],
          }),
        ],
      }),
      
      heading(2, "6.2 季度评估检查清单"),
      tableCaption(10, "季度评估检查清单"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1800, 1300, 1300, 1300, 1300, 1306],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("评估维度", 1800),
              headerCell("Level 1", 1300),
              headerCell("Level 2", 1300),
              headerCell("Level 3", 1300),
              headerCell("Level 4", 1300),
              headerCell("Level 5", 1306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("AI工具使用", 1800),
              bodyCell("尝试使用", 1300),
              bodyCell("日常使用", 1300),
              bodyCell("熟练使用", 1300),
              bodyCell("创新使用", 1300),
              bodyCell("引领使用", 1306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("效率提升", 1800),
              bodyCell("0-10%", 1300),
              bodyCell("10-25%", 1300),
              bodyCell("25-40%", 1300),
              bodyCell("40-60%", 1300),
              bodyCell("60%+", 1306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("知识沉淀", 1800),
              bodyCell("零散收集", 1300),
              bodyCell("有序整理", 1300),
              bodyCell("体系建立", 1300),
              bodyCell("智能应用", 1300),
              bodyCell("开放共享", 1306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("团队协作", 1800),
              bodyCell("独立使用", 1300),
              bodyCell("经验分享", 1300),
              bodyCell("协同工作", 1300),
              bodyCell("共创创新", 1300),
              bodyCell("生态构建", 1306),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("价值创造", 1800),
              bodyCell("无", 1300),
              bodyCell("效率提升", 1300),
              bodyCell("质量提升", 1300),
              bodyCell("业务创新", 1300),
              bodyCell("行业影响", 1306),
            ],
          }),
        ],
      }),
      
      heading(2, "6.3 成功关键"),
      listItem("（1）先试用，再深入 - 不要等准备完美，先开始用起来；"),
      listItem("（2）小步快跑，快速迭代 - 每周都有小成果，每月都有大进步；"),
      listItem("（3）团队协作，经验共享 - 每周分享，共同进步；"),
      listItem("（4）业务导向，价值驱动 - 始终围绕实际工作需求；"),
      listItem("（5）持续学习，拥抱变化 - AI发展很快，保持学习心态。"),
      
      heading(1, "七、附：核心提示词模板（完整示例）"),
      heading(2, "7.1 模板1：电网项目简表亮点提炼（完整版）"),
      bodyParagraph("【系统提示】"),
      boxParagraph("你是一位拥有20年电网领域项目申报经验的资深专家。你曾作为评审专家参与过100+个国家级、省部级电网项目的评审工作。你非常了解评审专家的关注点和偏好。"),
      bodyParagraph("【用户输入】"),
      boxParagraph("请帮我为以下电网项目提炼申报简表的核心亮点：项目名称：基于多模态大模型的配电网故障智能诊断与预警系统技术方向：智能电网/故障诊断/人工智能申报类型：科技部重点研发计划青年科学家项目"),
      bodyParagraph("【输出要求】"),
      boxParagraph("请严格按照JSON格式输出，包含立项意义、技术创新、应用前景、团队优势等部分，每部分严格控制字数。"),
      
      heading(2, "7.2 模板2-5（概要）"),
      listItem("（1）模板2：电网技术方案AI设计 - 总体架构、关键技术、实施路线、可行性分析；"),
      listItem("（2）模板3：电网文献综述AI辅助 - 发展历程、技术对比、团队分析、研究空白；"),
      listItem("（3）模板4：电网项目PPT自动生成 - 15-20页完整PPT大纲，含演讲备注；"),
      listItem("（4）模板5：电网项目指南AI分析 - 导向分析、关键词云、申报矩阵、避坑提醒。"),
      
      new Paragraph({
        children: [new PageBreak()],
      }),
      centerParagraph("============================================================"),
      centerParagraph("文档信息"),
      centerParagraph("版本号：v1.0"),
      centerParagraph("编制日期：2026年5月"),
      centerParagraph("更新周期：每季度复盘调整"),
      centerParagraph("============================================================"),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("电网领域AI专项IDP落地执行手册_更新版.docx", buffer);
  console.log("文档生成成功: 电网领域AI专项IDP落地执行手册_更新版.docx");
});
