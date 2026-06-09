const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  TableOfContents, Footer, Header,
  AlignmentType, HeadingLevel, PageBreak,
  BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

// 10个团队成员名单
const teamMembers = [
  "张伟", "李明", "王芳", "刘洋", "陈静",
  "赵强", "周杰", "吴敏", "孙浩", "朱婷"
];

// ————— 辅助函数 —————

function bodyParagraph(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

function centerParagraph(text, size = 24, bold = false) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { line: 360, lineRule: "auto" },
    children: [new TextRun({ text, font: FONT, size, bold })],
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

function tocPage(title = "目    录") {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 240 },
      children: [new TextRun({ text: title, font: FONT, bold: true, size: 36 })],
    }),
    new TableOfContents("TOC", {
      hyperlink: true,
      headingStyleRange: "1-3",
    }),
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
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, font: FONT, size: 21, bold: true })],
      }),
    ],
  });
}

function bodyCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text, font: FONT, size: 21 })],
      }),
    ],
  });
}

function tableCaption(tableNumber, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `表${tableNumber} ${caption}`, font: FONT, size: 21, bold: true })],
  });
}

function listItem(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { left: 480 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24 })],
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
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

function chartPlaceholder(chartNumber, chartTitle, description) {
  return [
    new Paragraph({
      spacing: { before: 60, after: 0 },
      alignment: AlignmentType.CENTER,
      border: {
        top: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
        left: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
        right: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" },
      },
      shading: { type: ShadingType.CLEAR, fill: "F0F7FF" },
      children: [
        new TextRun({ text: `【图表${chartNumber}位置】`, font: FONT, size: 21, color: "666666", bold: true }),
      ],
    }),
    new Paragraph({
      spacing: { before: 30, after: 0 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: description, font: FONT, size: 21, color: "444444" })],
    }),
    new Paragraph({
      spacing: { before: 30, after: 60 },
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `图${chartNumber} ${chartTitle}`, font: FONT, size: 21, bold: true })],
    }),
  ];
}

// ————— 文档定义 —————

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
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ children: [PageNumber.CURRENT], font: { name: "Times New Roman" }, size: 18 }),
              ],
            }),
          ],
        }),
      },
      children: [
        // 封面页
        docTitle("电网领域科创业务中心"),
        docTitle("个人数字化AI专项IDP落地执行手册"),
        new Paragraph({ children: [new PageBreak()] }),
        centerParagraph("版本号：v2.0", 28, true),
        centerParagraph("编制日期：2026年5月", 28, true),
        centerParagraph("执行周期：2026年6月 - 2027年1月", 28, true),
        new Paragraph({ children: [new PageBreak()] }),
        ...tocPage(),

        // 第1章
        heading(1, "1. 执行总览"),
        heading(2, "1.1 项目背景"),
        bodyParagraph("随着人工智能技术的快速发展，大模型、深度学习等技术在电网领域的应用前景日益广阔。为提升科创业务中心的项目策划、申报、研究能力，特制定本IDP（个人发展计划）执行手册。"),
        ...chartPlaceholder(1, "AI技术在电网领域应用趋势图", "折线图展示2023-2027年AI技术在电网领域的应用增长趋势，包括大模型、计算机视觉、自然语言处理等技术的应用比例"),
        
        heading(2, "1.2 总体目标"),
        bodyParagraph("通过8个月的系统性AI能力建设（2026年6月-2027年1月），实现以下目标："),
        listItem("工作效率整体提升40%以上"),
        listItem("全员掌握AI工具应用，3-4人成为AI专家"),
        listItem("建立完整的电网领域AI工作体系"),
        listItem("产出3-5个创新应用项目"),
        ...chartPlaceholder(2, "AI能力建设目标拆解图", "饼图展示四大目标的权重分配：效率提升30%、人才培养25%、体系建设25%、项目创新20%"),
        
        heading(2, "1.3 时间规划"),
        tableCaption(1, "总体时间规划表"),
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
                bodyCell("2026.7-2026.8", 2000),
                bodyCell("知识库建设", 2600),
                bodyCell("完成首批知识库内容", 2506),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("第三阶段", 1200),
                bodyCell("2026.8-2026.9", 2000),
                bodyCell("模板体系建立", 2600),
                bodyCell("完成60+提示词模板", 2506),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("第四阶段", 1200),
                bodyCell("2026.9-2027.1", 2000),
                bodyCell("能力提升与项目实践", 2600),
                bodyCell("完成三级项目实践", 2506),
              ],
            }),
          ],
        }),
        ...chartPlaceholder(3, "项目执行里程碑甘特图", "甘特图展示四个阶段的时间线和关键里程碑节点"),

        // 第2章
        heading(1, "2. 第一阶段：即刻启动（2026年6月-7月）"),
        heading(2, "2.1 立即行动清单"),
        tableCaption(2, "立即行动清单及人员分工"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [800, 2200, 1200, 1800, 800, 1506],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headerCell("序号", 800),
                headerCell("任务", 2200),
                headerCell("负责人", 1200),
                headerCell("协同人员", 1800),
                headerCell("产出物", 800),
                headerCell("时间估计", 1506),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("1", 800),
                bodyCell("AI工具选型与账号配置", 2200),
                bodyCell(teamMembers[0], 1200),
                bodyCell(teamMembers[1], 1800),
                bodyCell("AI工具配置手册", 800),
                bodyCell("2小时", 1506),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("2", 800),
                bodyCell("电网政策文件收集", 2200),
                bodyCell(teamMembers[2], 1200),
                bodyCell("全员", 1800),
                bodyCell("政策库（首批20份）", 800),
                bodyCell("4小时", 1506),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("3", 800),
                bodyCell("首批提示词模板制作", 2200),
                bodyCell(teamMembers[3], 1200),
                bodyCell(`${teamMembers[4]}、${teamMembers[5]}`, 1800),
                bodyCell("5个核心模板", 800),
                bodyCell("3小时", 1506),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("4", 800),
                bodyCell("团队首次AI分享会", 2200),
                bodyCell(teamMembers[6], 1200),
                bodyCell(`${teamMembers[7]}、${teamMembers[8]}`, 1800),
                bodyCell("会议纪要+行动清单", 800),
                bodyCell("2小时", 1506),
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
                bodyCell("AI编程", 3000),
                bodyCell("4星", 1500),
                bodyCell("中高", 1806),
              ],
            }),
          ],
        }),
        ...chartPlaceholder(4, "AI工具推荐星级对比图", "雷达图对比5款AI工具在功能、易用性、性价比、集成度、更新速度五个维度的评分"),

        heading(2, "2.3 第1周日程安排"),
        tableCaption(4, "第1周日程安排表"),
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

        // 第3章
        heading(1, "3. 第二阶段：知识库建设（2026年7月-8月）"),
        heading(2, "3.1 知识库结构设计"),
        bodyParagraph("电网领域知识库分为以下5个主要分类："),
        listItem("政策法规库 - 国家政策、行业标准、申报指南"),
        listItem("技术方向库 - 智能电网、电力市场、新能源、设备监测、调度优化"),
        listItem("研究机构库 - 高校院所、电网企业、设备厂商"),
        listItem("典型案例库 - 成功项目、申报材料、PPT范例"),
        listItem("文献资料库 - 中文期刊、外文期刊"),
        ...chartPlaceholder(5, "知识库分类结构图", "树形图展示5个知识库分类及其子分类的层级结构"),
        
        heading(2, "3.2 首批知识库内容清单"),
        bodyParagraph("第1个月内需完成以下内容："),
        tableCaption(5, "首批知识库内容清单及负责人"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1500, 1500, 1200, 4106],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headerCell("分类", 1500),
                headerCell("内容数量", 1500),
                headerCell("负责人", 1200),
                headerCell("说明", 4106),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("政策文件", 1500),
                bodyCell("20份", 1500),
                bodyCell(teamMembers[2], 1200),
                bodyCell("近2年国家级、省部级重要政策", 4106),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("申报指南", 1500),
                bodyCell("10份", 1500),
                bodyCell(teamMembers[3], 1200),
                bodyCell("近2年重点项目申报指南", 4106),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("典型案例", 1500),
                bodyCell("10个", 1500),
                bodyCell(teamMembers[4], 1200),
                bodyCell("成功申报的电网项目", 4106),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("文献资料", 1500),
                bodyCell("50篇", 1500),
                bodyCell(`${teamMembers[5]}、${teamMembers[9]}`, 1200),
                bodyCell("高质量期刊论文", 4106),
              ],
            }),
          ],
        }),

        // 第4章
        heading(1, "4. 第三阶段：提示词模板体系（2026年8月-9月）"),
        heading(2, "4.1 提示词模板矩阵"),
        tableCaption(6, "提示词模板矩阵"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1800, 1500, 1500, 1800, 1706],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headerCell("材料类型", 1800),
                headerCell("提示词数量", 1500),
                headerCell("难度等级", 1500),
                headerCell("预计效率提升", 1800),
                headerCell("负责人", 1706),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("申报简表", 1800),
                bodyCell("8个", 1500),
                bodyCell("初级", 1500),
                bodyCell("60%", 1800),
                bodyCell(teamMembers[0], 1706),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("申报书", 1800),
                bodyCell("15个", 1500),
                bodyCell("中级", 1500),
                bodyCell("50%", 1800),
                bodyCell(teamMembers[1], 1706),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("可研报告", 1800),
                bodyCell("12个", 1500),
                bodyCell("中级", 1500),
                bodyCell("45%", 1800),
                bodyCell(teamMembers[6], 1706),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("PPT制作", 1800),
                bodyCell("10个", 1500),
                bodyCell("中级", 1500),
                bodyCell("55%", 1800),
                bodyCell(teamMembers[7], 1706),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("技术报告", 1800),
                bodyCell("8个", 1500),
                bodyCell("高级", 1500),
                bodyCell("40%", 1800),
                bodyCell(teamMembers[8], 1706),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("专利申请", 1800),
                bodyCell("6个", 1500),
                bodyCell("高级", 1500),
                bodyCell("35%", 1800),
                bodyCell(teamMembers[9], 1706),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("小论文", 1800),
                bodyCell("8个", 1500),
                bodyCell("高级", 1500),
                bodyCell("40%", 1800),
                bodyCell(teamMembers[5], 1706),
              ],
            }),
          ],
        }),
        ...chartPlaceholder(6, "提示词模板效率提升对比图", "柱状图展示7类材料的效率提升百分比对比"),

        heading(2, "4.2 TOP5高频提示词模板"),
        heading(3, "4.2.1 模板1：电网项目简表亮点提炼"),
        bodyParagraph("【功能】快速提炼项目申报简表的核心亮点，严格控制字数"),
        bodyParagraph("【使用方法】填写项目基本信息和核心内容，AI将自动生成亮点。"),
        
        heading(3, "4.2.2 模板2：电网技术方案AI设计"),
        bodyParagraph("【功能】自动设计电网项目技术方案，包含架构图、技术路线"),
        bodyParagraph("【输出内容】总体架构、关键技术、实施路线、可行性分析"),
        
        heading(3, "4.2.3 模板3：电网文献综述AI辅助"),
        bodyParagraph("【功能】智能梳理电网领域研究方向，分析技术发展路线"),
        bodyParagraph("【输出内容】发展历程、技术对比、团队分析、研究空白"),
        
        heading(3, "4.2.4 模板4：电网项目PPT自动生成"),
        bodyParagraph("【功能】自动生成PPT大纲，逐页设计内容和图表"),
        bodyParagraph("【输出内容】15-20页完整PPT大纲，含演讲备注"),
        
        heading(3, "4.2.5 模板5：电网项目指南AI分析"),
        bodyParagraph("【功能】深度分析项目指南，提炼重点，推荐申报方向"),
        bodyParagraph("【输出内容】导向分析、关键词云、申报矩阵、避坑提醒"),

        // 第5章
        heading(1, "5. 第四阶段：三级项目实践（2026年9月-2027年1月）"),
        heading(2, "5.1 三级项目体系"),
        bodyParagraph("项目实践分为三个等级，从个人到团队再到业务创新："),
        tableCaption(7, "三级项目体系表"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1500, 2500, 1500, 1500, 1306],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headerCell("项目等级", 1500),
                headerCell("定位", 2500),
                headerCell("时间周期", 1500),
                headerCell("负责人", 1500),
                headerCell("预期效果", 1306),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("第一级", 1500),
                bodyCell("个人效率工具", 2500),
                bodyCell("2026.9-2026.10", 1500),
                bodyCell("全员", 1500),
                bodyCell("个人效率提升20%", 1306),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("第二级", 1500),
                bodyCell("团队协作工具", 2500),
                bodyCell("2026.10-2026.11", 1500),
                bodyCell(`${teamMembers[0]}、${teamMembers[3]}`, 1500),
                bodyCell("团队效率提升15%", 1306),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("第三级", 1500),
                bodyCell("业务创新应用", 2500),
                bodyCell("2026.11-2027.1", 1500),
                bodyCell(`${teamMembers[1]}、${teamMembers[6]}`, 1500),
                bodyCell("产生可量化业务价值", 1306),
              ],
            }),
          ],
        }),
        ...chartPlaceholder(7, "三级项目体系架构图", "金字塔图展示从个人到团队再到业务创新的三级项目体系"),

        heading(2, "5.2 重点项目介绍"),
        heading(3, "5.2.1 项目1：电网政策智能推送助手"),
        bodyParagraph("【功能】自动追踪电网领域政策动态，AI摘要生成，关键词订阅推送"),
        tableCaption(8, "电网政策智能推送助手功能模块"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1800, 3200, 1000, 1300, 1006],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headerCell("功能模块", 1800),
                headerCell("实现方式", 3200),
                headerCell("难度", 1000),
                headerCell("负责人", 1300),
                headerCell("预计时间", 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("政策源配置", 1800),
                bodyCell("手动配置10个政策网站", 3200),
                bodyCell("初级", 1000),
                bodyCell(teamMembers[2], 1300),
                bodyCell("2小时", 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("AI摘要生成", 1800),
                bodyCell("Claude API自动摘要", 3200),
                bodyCell("中级", 1000),
                bodyCell(teamMembers[3], 1300),
                bodyCell("4小时", 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("关键词订阅", 1800),
                bodyCell("Notion数据库 + 标签", 3200),
                bodyCell("初级", 1000),
                bodyCell(teamMembers[4], 1300),
                bodyCell("2小时", 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("推送提醒", 1800),
                bodyCell("邮件/企业微信通知", 3200),
                bodyCell("中级", 1000),
                bodyCell(teamMembers[5], 1300),
                bodyCell("3小时", 1006),
              ],
            }),
          ],
        }),

        heading(3, "5.2.2 项目2：电网术语智能翻译与解释"),
        bodyParagraph("【功能】建立电网术语库，支持智能查询、双语对照、概念关联"),
        bodyParagraph(`【负责人】${teamMembers[6]}、${teamMembers[7]}协同完成`),

        heading(3, "5.2.3 项目3：电网项目申报智能模板系统"),
        bodyParagraph("【功能】支持5类典型电网项目，AI自动生成申报书初稿"),
        bodyParagraph(`【负责人】${teamMembers[8]}牵头，${teamMembers[9]}配合`),

        heading(3, "5.2.4 项目4：电网文献智能管理系统"),
        bodyParagraph("【功能】智能检索、AI摘要、知识关联、阅读进度追踪"),
        bodyParagraph(`【负责人】${teamMembers[0]}、${teamMembers[1]}共同负责`),

        heading(3, "5.2.5 项目5：电网技术创新点挖掘系统"),
        bodyParagraph("【功能】文献分析、专利分析、趋势预测、创新建议"),
        bodyParagraph(`【负责人】${teamMembers[3]}、${teamMembers[4]}技术攻关`),

        heading(3, "5.2.6 项目6：电网项目智能评估助手"),
        bodyParagraph("【功能】技术可行性、创新性、应用前景、风险分析"),
        bodyParagraph(`【负责人】${teamMembers[2]}、${teamMembers[5]}联合开发`),
        ...chartPlaceholder(8, "重点项目任务分配矩阵图", "矩阵图展示6个重点项目与10位团队成员的责任分配关系"),

        // 第6章
        heading(1, "6. 第五阶段：评估与持续改进（贯穿全周期）"),
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
        ...chartPlaceholder(9, "团队能力成熟度演进路线图", "折线图展示团队从Level 1到Level 4的预计时间线"),

        heading(2, "6.2 季度评估检查清单"),
        tableCaption(10, "月度评估检查清单（周期调整为8个月）"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1500, 1200, 1200, 1200, 1200, 1200, 1006],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headerCell("评估维度", 1500),
                headerCell("6月", 1200),
                headerCell("7-8月", 1200),
                headerCell("9-10月", 1200),
                headerCell("11-12月", 1200),
                headerCell("1月", 1200),
                headerCell("评估人", 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("AI工具使用", 1500),
                bodyCell("尝试使用", 1200),
                bodyCell("日常使用", 1200),
                bodyCell("熟练使用", 1200),
                bodyCell("创新使用", 1200),
                bodyCell("引领使用", 1200),
                bodyCell(teamMembers[0], 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("效率提升", 1500),
                bodyCell("0-10%", 1200),
                bodyCell("10-25%", 1200),
                bodyCell("25-40%", 1200),
                bodyCell("40-60%", 1200),
                bodyCell("60%+", 1200),
                bodyCell(teamMembers[1], 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("知识沉淀", 1500),
                bodyCell("零散收集", 1200),
                bodyCell("有序整理", 1200),
                bodyCell("体系建立", 1200),
                bodyCell("智能应用", 1200),
                bodyCell("开放共享", 1200),
                bodyCell(teamMembers[2], 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("团队协作", 1500),
                bodyCell("独立使用", 1200),
                bodyCell("经验分享", 1200),
                bodyCell("协同工作", 1200),
                bodyCell("共创创新", 1200),
                bodyCell("生态构建", 1200),
                bodyCell(teamMembers[3], 1006),
              ],
            }),
            new TableRow({
              children: [
                bodyCell("价值创造", 1500),
                bodyCell("无", 1200),
                bodyCell("效率提升", 1200),
                bodyCell("质量提升", 1200),
                bodyCell("业务创新", 1200),
                bodyCell("行业影响", 1200),
                bodyCell(teamMembers[6], 1006),
              ],
            }),
          ],
        }),

        heading(2, "6.3 成功关键"),
        listItem("先试用，再深入 - 不要等准备完美，先开始用起来"),
        listItem("小步快跑，快速迭代 - 每周都有小成果，每月都有大进步"),
        listItem("团队协作，经验共享 - 每周分享，共同进步"),
        listItem("业务导向，价值驱动 - 始终围绕实际工作需求"),
        listItem("持续学习，拥抱变化 - AI发展很快，保持学习心态"),

        // 第7章
        heading(1, "7. 附：核心提示词模板（完整示例）"),
        heading(2, "7.1 模板1：电网项目简表亮点提炼（完整版）"),
        bodyParagraph("【系统提示】"),
        boxParagraph("你是一位拥有20年电网领域项目申报经验的资深专家。你曾作为评审专家参与过100+个国家级、省部级电网项目的评审工作。你非常了解评审专家的关注点和偏好。"),
        bodyParagraph("【用户输入】"),
        boxParagraph("请帮我为以下电网项目提炼申报简表的核心亮点：项目名称：基于多模态大模型的配电网故障智能诊断与预警系统 技术方向：智能电网/故障诊断/人工智能 申报类型：科技部重点研发计划青年科学家项目"),
        bodyParagraph("【输出要求】"),
        boxParagraph("请严格按照JSON格式输出，包含立项意义、技术创新、应用前景、团队优势等部分，每部分严格控制字数。"),

        heading(2, "7.2 模板2-5（概要）"),
        listItem("模板2：电网技术方案AI设计 - 总体架构、关键技术、实施路线、可行性分析"),
        listItem("模板3：电网文献综述AI辅助 - 发展历程、技术对比、团队分析、研究空白"),
        listItem("模板4：电网项目PPT自动生成 - 15-20页完整PPT大纲，含演讲备注"),
        listItem("模板5：电网项目指南AI分析 - 导向分析、关键词云、申报矩阵、避坑提醒"),

        heading(2, "7.3 团队成员分工总览"),
        tableCaption(11, "10位团队成员任务分配总览"),
        new Table({
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnWidths: [1500, 6806],
          borders: TABLE_BORDERS,
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                headerCell("姓名", 1500),
                headerCell("主要负责任务", 6806),
              ],
            }),
            ...teamMembers.map((name, idx) => {
              const responsibilities = [
                "AI工具选型、申报简表模板、文献智能管理系统",
                "账号配置、申报书模板、文献智能管理系统",
                "政策文件收集、政策法规库、政策智能推送助手",
                "首批提示词模板、申报指南、技术创新点挖掘系统",
                "典型案例库、政策智能推送助手",
                "文献资料库、专利申请模板、政策智能推送助手",
                "AI分享会、可研报告模板、术语智能翻译系统",
                "PPT制作模板、术语智能翻译系统",
                "技术报告模板、项目智能评估助手",
                "小论文模板、文献资料库、项目智能评估助手"
              ];
              return new TableRow({
                children: [
                  bodyCell(name, 1500),
                  bodyCell(responsibilities[idx], 6806),
                ],
              });
            }),
          ],
        }),
        ...chartPlaceholder(10, "团队成员任务负荷分布图", "饼图展示10位团队成员的任务分配比例"),

        new Paragraph({ children: [new PageBreak()] }),
        centerParagraph("============================================================"),
        centerParagraph("文档信息"),
        centerParagraph("版本号：v2.0"),
        centerParagraph("编制日期：2026年5月"),
        centerParagraph("执行周期：2026年6月 - 2027年1月"),
        centerParagraph("更新周期：每月复盘调整"),
        centerParagraph("============================================================"),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("电网领域AI专项IDP落地执行手册_v2.0.docx", buffer);
  console.log("文档生成成功: 电网领域AI专项IDP落地执行手册_v2.0.docx");
});
