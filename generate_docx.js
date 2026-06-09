const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  TableOfContents, Footer, Header, AlignmentType, HeadingLevel, PageBreak,
  BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
};

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

function subtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

function heading(level, text) {
  const config = {
    1: { heading: HeadingLevel.HEADING_1, size: 30, before: 240, after: 120 },
    2: { heading: HeadingLevel.HEADING_2, size: 28, before: 120, after: 60 },
    3: { heading: HeadingLevel.HEADING_3, size: 24, before: 60, after: 60 },
    4: { heading: HeadingLevel.HEADING_4, size: 24, before: 60, after: 60 },
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

function headingWithNumber(level, text) {
  const config = {
    1: { size: 30, before: 240, after: 120 },
    2: { size: 28, before: 120, after: 60 },
    3: { size: 24, before: 60, after: 60 },
    4: { size: 24, before: 60, after: 60 },
  };
  const c = config[level];
  return new Paragraph({
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
    new TableOfContents("TOC", {
      hyperlink: true,
      headingStyleRange: "1-3",
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function tableCaption(number, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: `表${number} ${caption}`, font: FONT, size: 21, bold: true })],
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

function boldText(text) {
  return new TextRun({ text, font: FONT, size: 24, bold: true });
}

function normalText(text) {
  return new TextRun({ text, font: FONT, size: 24 });
}

function mixedParagraph(bolds, normals) {
  const children = [];
  bolds.forEach(b => children.push(boldText(b)));
  normals.forEach(n => children.push(normalText(n)));
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children,
  });
}

function bulletPoint(text, indent = 480) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { left: indent, hanging: 480 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: "\u2022  ", font: FONT, size: 24 }),
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

function numberedPoint(num, text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { left: 480 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: `（${num}）`, font: FONT, size: 24 }),
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

function createImagePlaceholder(description, figureNumber, caption) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 0 },
      border: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
        left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
        right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
      },
      shading: { type: ShadingType.CLEAR, fill: "F0F0F0" },
      children: [
        new TextRun({ text: `[图示：${description}]`, font: FONT, size: 21, color: "666666" }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 120 },
      children: [
        new TextRun({ text: `图${figureNumber} ${caption}`, font: FONT, size: 21, bold: true }),
      ],
    }),
  ];
}

function infoBox(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { left: 480, right: 480 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 8, color: "0066CC", space: 10 },
    },
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

const doc = new Document({
  features: { updateFields: true },
  styles: {
    default: {
      document: { run: { font: FONT, size: 24 } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: FONT },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 240, after: 120 }, alignment: AlignmentType.LEFT, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: FONT },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 120, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: FONT },
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
      // 封面
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400 }, children: [new TextRun({ text: "中核集团电算协同业务", font: FONT, bold: true, size: 44 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 240, after: 480 }, children: [new TextRun({ text: "前瞻性技术研究与生态运营体系专题报告", font: FONT, bold: true, size: 44 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1200, after: 120 }, children: [new TextRun({ text: "报告定位：供集团高层领导决策参考的战略级智库报告", font: FONT, size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "研究起点：2026年", font: FONT, size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 2400 }, children: [new TextRun({ text: "密级：内部资料", font: FONT, size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: "编制单位：科技创新业务中心", font: FONT, size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: "编制日期：2026年5月", font: FONT, size: 24 })] }),

      // 摘要
      new Paragraph({ children: [new PageBreak()] }),
      headingWithNumber(1, "摘  要"),
      bodyParagraph("电算协同作为新型电力系统建设与数字经济深度融合的核心命题，正在加速从\u201c概念验证\u201d迈向\u201c规模化落地\u201d。本报告以2026年为研究起点，从国家算力布局战略高度审视中核集团电算协同业务的独特价值，系统研判前瞻性技术与业务融合的关键路径，为集团战略决策提供前瞻性智库支撑。"),
      new Paragraph({ spacing: { line: 360, lineRule: "auto", before: 240 }, children: [boldText("核心研判")] }),

      mixedParagraph(["战略定位研判："], ["中核集团在国家\u201c东数西算\u201d和\u201c新型电力系统\u201d双重战略交汇点上占据独特地位。核电作为唯一能够同时满足\u201c零碳+稳定+可靠\u201d三重特性的电源，是国家算力基础设施实现绿色转型的关键支撑。中核集团应将电算协同定位为服务国家战略的核心业务，而非单纯的多元化探索。"]),
      mixedParagraph(["技术融合研判："], ["前瞻性技术与电算协同业务的结合点集中在三个维度\u2014\u2014核电站智能化运维（数字孪生+具身智能）、核电商用场景创新（电力大模型+碳能算一体化）、核电科学计算支撑（量子计算+高性能计算）。这三个维度构成了中核电算协同业务的技术护城河。"]),
      mixedParagraph(["生态位势研判："], ["中核集团应构建\u201c核电算力+绿色算力认证+碳资产服务\u201d三位一体的差异化竞争优势，在国家算力生态中确立\u201c绿色算力核心供应商\u201d的独特定位。"]),

      // 目录
      new Paragraph({ children: [new PageBreak()] }),
      ...tocPage(),

      // 第一章
      headingWithNumber(1, "一、国家算力布局战略视角下的电算协同"),

      headingWithNumber(2, "1.1 国家算力战略的顶层设计逻辑"),

      headingWithNumber(3, "1.1.1 \u201c东数西算\u201d工程的战略意图"),
      bodyParagraph("国家实施\u201c东数西算\u201d工程具有深层次的战略考量："),
      mixedParagraph(["能源安全维度："], ["我国数据中心耗电量持续攀升，2024年已超过2500亿千瓦时，约占全社会用电量的2.6%。到2030年预计将突破5000亿千瓦时。数据中心作为\u201c数字时代的电力大户\u201d，其能源供应安全已上升为国家战略议题。"]),
      mixedParagraph(["双碳目标维度："], ["数据中心碳排放问题日益突出。2024年数据中心行业碳排放约占全国总排放的2%，且仍在快速增长。在\u201c双碳\u201d目标约束下，数据中心的绿色化转型成为刚性需求。"]),
      mixedParagraph(["区域协调发展维度："], ["\u201c东数西算\u201d希望通过算力基础设施的西部布局，带动西部新能源消纳和经济发展，实现\u201c算力西迁\u201d与\u201c绿电东送\u201d的双向协同。"]),

      headingWithNumber(3, "1.1.2 新型电力系统建设的核心诉求"),
      bodyParagraph("构建以新能源为主体的新型电力系统面临三大挑战："),
      mixedParagraph(["灵活性资源短缺："], ["新能源出力具有间歇性和波动性，需要大量灵活性资源进行调节。传统火电灵活性改造空间有限，储能成本尚未完全解决，灵活性资源缺口日益扩大。"]),
      mixedParagraph(["系统平衡难度增加："], ["新能源发电占比提升使得电力系统\u201c源随荷动\u201d的传统模式难以为继，需要发展\u201c源网荷储\u201d协调互动的新型模式。"]),
      mixedParagraph(["市场机制创新需求："], ["适应新能源高渗透率的市场机制尚未完善，电力现货市场、辅助服务市场、容量市场等制度建设仍需深化。"]),

      headingWithNumber(3, "1.1.3 电算协同的战略价值"),
      bodyParagraph("电算协同正是解决上述问题的\u201c关键一招\u201d："),

      tableCaption(1, "电算协同与国家战略的对应关系"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 3000, 3306],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("国家战略诉求", 2000), headerCell("电算协同的解决路径", 3000), headerCell("中核的独特价值", 3306)] }),
          new TableRow({ children: [bodyCell("数据中心绿色化", 2000), bodyCell("绿电直供+碳足迹追溯", 3000), bodyCell("核电零碳+稳定基荷", 3306)] }),
          new TableRow({ children: [bodyCell("灵活性资源挖掘", 2000), bodyCell("算力负荷参与调峰", 3000), bodyCell("核电+算力协同调度", 3306)] }),
          new TableRow({ children: [bodyCell("新型电力系统", 2000), bodyCell("源网荷储算一体化", 3000), bodyCell("核电全产业链优势", 3306)] }),
          new TableRow({ children: [bodyCell("区域协调发展", 2000), bodyCell("算力西迁+绿电东送", 3000), bodyCell("沿海核电基地布局", 3306)] }),
        ],
      }),

      headingWithNumber(2, "1.2 国家算力版图中的中核定位"),

      headingWithNumber(3, "1.2.1 现有算力布局格局"),

      tableCaption(2, "国家算力枢纽布局与中核机会"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 2500, 2000, 2306],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("算力枢纽", 1500), headerCell("主要特点", 2500), headerCell("能源结构", 2000), headerCell("中核机会", 2306)] }),
          new TableRow({ children: [bodyCell("京津冀枢纽", 1500), bodyCell("算力需求最大", 2500), bodyCell("火电为主", 2000), bodyCell("可布局绿电算力", 2306)] }),
          new TableRow({ children: [bodyCell("长三角枢纽", 1500), bodyCell("AI算力聚集", 2500), bodyCell("外来电为主", 2000), bodyCell("秦山核电基地", 2306)] }),
          new TableRow({ children: [bodyCell("粤港澳枢纽", 1500), bodyCell("智算中心密集", 2500), bodyCell("煤电+核电", 2000), bodyCell("大亚湾核电基地", 2306)] }),
          new TableRow({ children: [bodyCell("成渝枢纽", 1500), bodyCell("新型算力崛起", 2500), bodyCell("水电为主", 2000), bodyCell("可联动布局", 2306)] }),
          new TableRow({ children: [bodyCell("贵州/甘肃枢纽", 1500), bodyCell("清洁能源丰富", 2500), bodyCell("风光为主", 2000), bodyCell("可联动布局", 2306)] }),
        ],
      }),

      headingWithNumber(3, "1.2.2 中核集团的战略卡位"),
      mixedParagraph(["核心卡位一：绿色算力核心供应商"], [""]),
      bodyParagraph("中核集团应定位为国家算力基础设施的\u201c绿色能源心脏\u201d。核电的三大特性使其成为数据中心最理想的能源来源："),
      infoBox("核电特性 → 数据中心价值：零碳排放（12g/kWh）→ 满足双碳要求，获得碳溢价；稳定基荷（7×24h）→ 保障算力连续运行，消除供电波动风险；调节可控 → 可参与调峰辅助服务，创造额外收益"),
      mixedParagraph(["核心卡位二：电算协同标准制定者"], [""]),
      bodyParagraph("依托中核集团的行业地位和技术积累，应积极参与甚至主导电算协同领域国家标准和行业标准的制定："),
      bulletPoint("核电算力基础设施技术规范"),
      bulletPoint("绿色算力碳足迹核算标准"),
      bulletPoint("源网荷储算脑接口标准"),
      bulletPoint("电算协同安全评估标准"),
      mixedParagraph(["核心卡位三：电算协同示范引领者"], [""]),
      bodyParagraph("通过打造\u201c核电+算力\u201d一体化示范项目，形成可复制、可推广的发展模式，为国家电算协同战略提供\u201c中核方案\u201d。"),

      // 第二章
      headingWithNumber(1, "二、前瞻性技术与电算协同业务的深度融合"),

      headingWithNumber(2, "2.1 技术-业务融合矩阵"),
      bodyParagraph("六大前瞻性技术与四大业务场景的融合应用形成了完整的技术-业务融合矩阵："),
      ...createImagePlaceholder("技术-业务融合矩阵：业务场景（核电站智能化运维、绿色算力服务、电力市场交易、碳资产管理）× 技术赋能（数字孪生、具身智能、电力大模型、源网荷储算脑、碳能算一体化、量子计算）× 融合应用", "1", "技术-业务融合矩阵"),

      headingWithNumber(2, "2.2 融合点一：数字孪生 × 核电站智能化运维"),

      headingWithNumber(3, "2.2.1 融合逻辑"),
      bodyParagraph("核电站是高度复杂的系统性工程，其运行、维护、安全管理涉及海量数据和复杂决策。数字孪生技术可以为核电站构建高保真数字镜像，实现物理世界与数字世界的实时映射。"),

      headingWithNumber(3, "2.2.2 具体应用场景"),

      tableCaption(3, "数字孪生应用场景"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 3000, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("应用场景", 2500), headerCell("技术融合点", 3000), headerCell("预期效果", 2806)] }),
          new TableRow({ children: [bodyCell("全生命周期数字孪生", 2500), bodyCell("3D可视化+实时数据+AI推理", 3000), bodyCell("设备状态实时感知", 2806)] }),
          new TableRow({ children: [bodyCell("设备健康预测", 2500), bodyCell("机理模型+数据驱动+时序分析", 3000), bodyCell("故障预警提前30天", 2806)] }),
          new TableRow({ children: [bodyCell("运行优化决策", 2500), bodyCell("数字仿真+优化算法+专家知识", 3000), bodyCell("提升发电效率2-5%", 2806)] }),
          new TableRow({ children: [bodyCell("应急演练仿真", 2500), bodyCell("事故仿真+VR/AR+决策支持", 3000), bodyCell("提升应急响应能力", 2806)] }),
        ],
      }),

      headingWithNumber(3, "2.2.3 中核已有基础与差距"),
      mixedParagraph(["已有基础："], [""]),
      bulletPoint("金七门核电\u201c新质华龙\u201d精益建造数字孪生实践"),
      bulletPoint("秦山、福清等基地的数字化改造"),
      bulletPoint("核电运行研究院的数字化研发能力"),
      mixedParagraph(["需要补强："], [""]),
      bulletPoint("实时数字孪生技术（毫秒级同步）"),
      bulletPoint("AI推理引擎与数字孪生深度集成"),
      bulletPoint("跨基地统一的数字孪生平台"),

      headingWithNumber(2, "2.3 融合点二：具身智能 × 核电高危作业"),

      headingWithNumber(3, "2.3.1 融合逻辑"),
      bodyParagraph("核电站存在大量高辐射、高温、高压等危险作业环境，传统人工作业面临人员安全风险和用工短缺问题。具身智能技术可以替代人类执行这些危险任务。"),

      headingWithNumber(3, "2.3.2 具体应用场景"),

      tableCaption(4, "具身智能应用场景"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 3000, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("应用场景", 2500), headerCell("技术融合点", 3000), headerCell("预期效果", 2806)] }),
          new TableRow({ children: [bodyCell("核岛巡检机器人", 2500), bodyCell("多模态感知+自主导航+缺陷识别", 3000), bodyCell("减少人员辐照剂量80%", 2806)] }),
          new TableRow({ children: [bodyCell("带电作业机器人", 2500), bodyCell("力控操作+视觉引导+安全联锁", 3000), bodyCell("提升作业效率50%", 2806)] }),
          new TableRow({ children: [bodyCell("燃料组件操作机器人", 2500), bodyCell("精密定位+力柔顺控制+防错机制", 3000), bodyCell("零失误操作保障", 2806)] }),
          new TableRow({ children: [bodyCell("应急处置机器人", 2500), bodyCell("远程遥操作+特种机构+核辐射耐受", 3000), bodyCell("提升应急响应能力", 2806)] }),
        ],
      }),

      headingWithNumber(3, "2.3.3 战略价值"),
      bodyParagraph("具身智能在核电领域的应用不仅能解决安全和用工问题，更能形成中核集团独特的技术护城河："),
      infoBox("具身智能核电应用 → 技术积累 → 行业标准制定 → 市场独占"),

      headingWithNumber(2, "2.4 融合点三：电力大模型 × 智能调度决策"),

      headingWithNumber(3, "2.4.1 融合逻辑"),
      bodyParagraph("电力系统运行涉及海量数据、复杂规则和专业经验。电力大模型可以将这些知识进行有效整合，为调度人员提供智能辅助决策。"),

      headingWithNumber(3, "2.4.2 具体应用场景"),

      tableCaption(5, "电力大模型应用场景"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 3000, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("应用场景", 2500), headerCell("技术融合点", 3000), headerCell("预期效果", 2806)] }),
          new TableRow({ children: [bodyCell("调度指令生成", 2500), bodyCell("自然语言理解+调度规则+历史案例", 3000), bodyCell("指令生成效率提升70%", 2806)] }),
          new TableRow({ children: [bodyCell("异常工况诊断", 2500), bodyCell("专家知识+实时数据+因果推理", 3000), bodyCell("诊断准确率提升至95%", 2806)] }),
          new TableRow({ children: [bodyCell("市场策略优化", 2500), bodyCell("价格预测+供需分析+博弈论", 3000), bodyCell("交易收益提升5-10%", 2806)] }),
          new TableRow({ children: [bodyCell("负荷预测", 2500), bodyCell("时序模型+气象数据+事件感知", 3000), bodyCell("预测精度提升15%", 2806)] }),
        ],
      }),

      headingWithNumber(3, "2.4.3 中核独特优势"),
      bodyParagraph("中核集团电力大模型应聚焦核电特色场景："),
      bulletPoint("核电商用策略：基于核电成本结构的市场报价模型"),
      bulletPoint("核电调峰优化：核电参与调峰的智能决策支持"),
      bulletPoint("多基地协同调度：集团内部核电机组的协调优化"),

      headingWithNumber(2, "2.5 融合点四：源网荷储算脑 × 绿电算力服务"),

      headingWithNumber(3, "2.5.1 融合逻辑"),
      bodyParagraph("源网荷储算脑将算力负荷纳入电力系统调度体系，实现\u201c电-算\u201d联合优化。这为核电+算力一体化提供了核心技术支撑。"),

      headingWithNumber(3, "2.5.2 具体应用场景"),

      tableCaption(6, "源网荷储算脑应用场景"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 3000, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("应用场景", 2500), headerCell("技术融合点", 3000), headerCell("预期效果", 2806)] }),
          new TableRow({ children: [bodyCell("核电-算力联合调度", 2500), bodyCell("分层优化+实时响应+市场联动", 3000), bodyCell("算力成本降低10-15%", 2806)] }),
          new TableRow({ children: [bodyCell("绿电算力认证", 2500), bodyCell("碳流追踪+实时核算+区块链存证", 3000), bodyCell("可信绿色算力溯源", 2806)] }),
          new TableRow({ children: [bodyCell("调峰辅助服务", 2500), bodyCell("算力弹性+核电配合+市场交易", 3000), bodyCell("额外收益来源", 2806)] }),
          new TableRow({ children: [bodyCell("需求响应聚合", 2500), bodyCell("负荷聚合+调度优化+结算分账", 3000), bodyCell("参与电网调节", 2806)] }),
        ],
      }),

      headingWithNumber(2, "2.6 融合点五：碳能算一体化 × 绿色算力认证"),

      headingWithNumber(3, "2.6.1 融合逻辑"),
      bodyParagraph("在\u201c双碳\u201d时代，数据中心的碳排放成为客户选择供应商的重要考量。碳能算一体化平台可以为绿色算力提供可信的碳足迹认证。"),

      headingWithNumber(3, "2.6.2 具体应用场景"),

      tableCaption(7, "碳能算一体化应用场景"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 3000, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("应用场景", 2500), headerCell("技术融合点", 3000), headerCell("预期效果", 2806)] }),
          new TableRow({ children: [bodyCell("核电碳足迹核算", 2500), bodyCell("生命周期评价+实时监测+核查认证", 3000), bodyCell("权威零碳认证", 2806)] }),
          new TableRow({ children: [bodyCell("绿电算力溯源", 2500), bodyCell("区块链存证+电力流追踪+时间戳", 3000), bodyCell("防伪溯源", 2806)] }),
          new TableRow({ children: [bodyCell("碳成本优化", 2500), bodyCell("碳价预测+调度优化+成本传导", 3000), bodyCell("最优碳效益", 2806)] }),
          new TableRow({ children: [bodyCell("碳资产管理", 2500), bodyCell("碳配额管理+CCER开发+碳交易", 3000), bodyCell("碳资产增值", 2806)] }),
        ],
      }),

      headingWithNumber(3, "2.6.3 市场价值"),

      tableCaption(8, "碳服务市场价值"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 2000, 3806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("服务类型", 2500), headerCell("溢价空间", 2000), headerCell("目标客户", 3806)] }),
          new TableRow({ children: [bodyCell("核电绿电算力认证", 2500), bodyCell("5-15%", 2000), bodyCell("互联网大厂、科技企业", 3806)] }),
          new TableRow({ children: [bodyCell("碳足迹报告服务", 2500), bodyCell("2-5%", 2000), bodyCell("上市公司、出口企业", 3806)] }),
          new TableRow({ children: [bodyCell("碳中和解决方案", 2500), bodyCell("面议", 2000), bodyCell("外资企业、ESG要求高企业", 3806)] }),
        ],
      }),

      headingWithNumber(2, "2.7 融合点六：量子计算 × 核电科学计算"),

      headingWithNumber(3, "2.7.1 融合逻辑"),
      bodyParagraph("核能科学研究涉及大量高复杂度计算问题，如核反应堆物理仿真、材料辐照损伤模拟等。量子计算在这些问题上具有天然优势。"),

      headingWithNumber(3, "2.7.2 具体应用场景"),

      tableCaption(9, "量子计算应用场景"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 3000, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("应用场景", 2500), headerCell("技术融合点", 3000), headerCell("预期效果", 2806)] }),
          new TableRow({ children: [bodyCell("反应堆优化设计", 2500), bodyCell("量子模拟+多物理场耦合", 3000), bodyCell("设计周期缩短30%", 2806)] }),
          new TableRow({ children: [bodyCell("燃料管理优化", 2500), bodyCell("量子优化+组合规划", 3000), bodyCell("燃料利用率提升", 2806)] }),
          new TableRow({ children: [bodyCell("设备维护排程", 2500), bodyCell("量子调度+约束优化", 3000), bodyCell("维护效率提升20%", 2806)] }),
          new TableRow({ children: [bodyCell("辐射防护优化", 2500), bodyCell("蒙特卡罗+量子采样", 3000), bodyCell("计算加速100倍", 2806)] }),
        ],
      }),

      headingWithNumber(3, "2.7.3 战略布局建议"),
      bodyParagraph("量子计算商业化应用仍需时日，建议采取\u201c能力储备+场景聚焦\u201d策略："),
      bulletPoint("2026-2027年：与本源量子等建立合作，跟踪技术进展"),
      bulletPoint("2028-2029年：在非实时优化场景开展试点"),
      bulletPoint("2030年以后：根据技术成熟度决定规模化投入"),

      // 第三章
      headingWithNumber(1, "三、生态运营体系关键研究"),

      headingWithNumber(2, "3.1 差异化定位与核心竞争力构建"),

      headingWithNumber(3, "3.1.1 中核电算协同的独特定位"),
      bodyParagraph("中核集团在国家算力生态中的独特定位："),
      infoBox("┌─────────────────────────────────────────────────────────────┐\n│                    国家算力生态格局                          │\n├─────────────────────────────────────────────────────────────┤\n│  算力供给侧：超大规模云服务商（阿里、腾讯、华为等）           │\n│  能源供给侧：五大发电集团、新能源运营商                       │\n│  电网调度侧：国家电网、南方电网                              │\n│  ════════════════════════════════════════════════          │\n│  ★ 中核集团定位：绿色算力核心供应商 + 电算协同标准制定者      │\n│  ★ 差异化优势：核电零碳+稳定基荷+核级安全                    │\n└─────────────────────────────────────────────────────────────┘"),

      headingWithNumber(3, "3.1.2 核心竞争力矩阵"),

      tableCaption(10, "核心竞争力矩阵"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 2500, 2000, 1806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("竞争力维度", 2000), headerCell("核心要素", 2500), headerCell("构建路径", 2000), headerCell("护城河强度", 1806)] }),
          new TableRow({ children: [bodyCell("能源禀赋", 2000), bodyCell("核电零碳、稳定、高可靠", 2500), bodyCell("现有基地+新建项目", 2000), bodyCell("★★★★★", 1806)] }),
          new TableRow({ children: [bodyCell("技术能力", 2000), bodyCell("数字孪生、电力大模型、具身智能", 2500), bodyCell("自研+合作", 2000), bodyCell("★★★★", 1806)] }),
          new TableRow({ children: [bodyCell("标准主导", 2000), bodyCell("电算协同行业标准、国家标准", 2500), bodyCell("牵头制定", 2000), bodyCell("★★★★★", 1806)] }),
          new TableRow({ children: [bodyCell("品牌信任", 2000), bodyCell("核级安全文化、质量保障", 2500), bodyCell("核电口碑延伸", 2000), bodyCell("★★★★", 1806)] }),
          new TableRow({ children: [bodyCell("生态连接", 2000), bodyCell("电网合作、云商合作、政府关系", 2500), bodyCell("战略合作", 2000), bodyCell("★★★", 1806)] }),
        ],
      }),

      headingWithNumber(2, "3.2 四层生态体系架构"),
      bodyParagraph("电算协同的产业生态呈现\u201c核心层—能力层—连接层—价值层\u201d四层架构："),
      ...createImagePlaceholder("四层生态体系架构图：核心层（核电基地群、算力基础设施、新能源项目）→ 能力层（数字孪生能力、AI大模型能力、具身智能能力、安全可信能力）→ 连接层（标准规范、协作机制、基础设施）→ 价值层（绿色算力服务、数字智能服务、碳资产服务、综合解决方案）", "2", "四层生态体系架构图"),

      headingWithNumber(2, "3.3 合作伙伴生态网络"),

      tableCaption(11, "合作伙伴类型与战略价值"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1800, 1500, 2500, 2506],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("合作伙伴类型", 1800), headerCell("战略价值", 1500), headerCell("合作重点", 2500), headerCell("代表企业", 2506)] }),
          new TableRow({ children: [bodyCell("算力技术厂商", 1800), bodyCell("技术赋能", 1500), bodyCell("AI大模型、云计算、基础设施", 2500), bodyCell("华为、阿里、百度", 2506)] }),
          new TableRow({ children: [bodyCell("电网企业", 1800), bodyCell("市场准入", 1500), bodyCell("调度接入、电力市场、绿电采购", 2500), bodyCell("国网、南网", 2506)] }),
          new TableRow({ children: [bodyCell("云服务商", 1800), bodyCell("市场渠道", 1500), bodyCell("算力分销、联合运营，品牌背书", 2500), bodyCell("阿里云、腾讯云、华为云", 2506)] }),
          new TableRow({ children: [bodyCell("科研机构", 1800), bodyCell("前沿创新", 1500), bodyCell("联合研发、人才培养、标准制定", 2500), bodyCell("清华、中科院", 2506)] }),
          new TableRow({ children: [bodyCell("碳服务机构", 1800), bodyCell("碳业务支撑", 1500), bodyCell("碳认证、碳交易、碳核查", 2500), bodyCell("碳交所、核查机构", 2506)] }),
          new TableRow({ children: [bodyCell("IDC运营商", 1800), bodyCell("运营经验", 1500), bodyCell("合作运营、经验借鉴", 2500), bodyCell("万国数据、秦淮数据", 2506)] }),
          new TableRow({ children: [bodyCell("投资机构", 1800), bodyCell("资本支持", 1500), bodyCell("项目融资、产业基金", 2500), bodyCell("国新建投、诚通", 2506)] }),
        ],
      }),

      // 第四章
      headingWithNumber(1, "四、实施建议与保障措施"),

      headingWithNumber(2, "4.1 战略定位与愿景"),
      mixedParagraph(["战略定位："], ["国家绿色算力核心供应商 + 电算协同标准制定者"]),
      mixedParagraph(["发展愿景："], ["到2028年，成为国内领先、国际一流的核电驱动绿色算力服务商，形成\u201c核电+算力+碳资产\u201d三位一体的发展格局。"]),

      headingWithNumber(2, "4.2 三阶段实施路线"),
      ...createImagePlaceholder("三阶段实施路线甘特图：第一阶段（2026）：战略规划与组织保障、试点项目启动、技术平台原型开发；第二阶段（2027）：示范项目运营、能力平台建设、生态伙伴网络构建；第三阶段（2028）：规模化运营、标准制定主导、行业引领确立", "3", "三阶段实施路线图"),

      tableCaption(12, "三阶段关键里程碑"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 1500, 2500, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("阶段", 1500), headerCell("时间", 1500), headerCell("核心目标", 2500), headerCell("关键里程碑", 2806)] }),
          new TableRow({ children: [bodyCell("第一阶段", 1500), bodyCell("2026年", 1500), bodyCell("战略布局", 2500), bodyCell("战略白皮书发布；秦山/福清试点启动", 2806)] }),
          new TableRow({ children: [bodyCell("第二阶段", 1500), bodyCell("2027年", 1500), bodyCell("能力形成", 2500), bodyCell("示范项目运营；大模型1.0发布", 2806)] }),
          new TableRow({ children: [bodyCell("第三阶段", 1500), bodyCell("2028年", 1500), bodyCell("规模引领", 2500), bodyCell("3-5个基地运营；行业标准发布", 2806)] }),
        ],
      }),

      headingWithNumber(2, "4.3 组织与治理"),
      bodyParagraph("建议建立\u201c决策层—推进层—执行层\u201d三层组织架构："),
      ...createImagePlaceholder("三层组织架构图：董事会/执委会 → 电算协同发展委员会（集团领导任主任）→ 电算协同推进办公室（科技管理部）→ 战略规划组/技术研发组/项目运营组 → 中国核电/同方股份、核电运行研究院、秦山/福清/田湾核电", "4", "组织架构图"),

      headingWithNumber(2, "4.4 资源配置"),

      headingWithNumber(3, "4.4.1 资金投入"),
      bodyParagraph("建议设立电算协同发展专项基金，规模15-25亿元（分三年投入）："),

      tableCaption(13, "资金投入规划"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 2000, 3806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("来源", 2500), headerCell("比例", 2000), headerCell("金额", 3806)] }),
          new TableRow({ children: [bodyCell("集团自有资金", 2500), bodyCell("50%", 2000), bodyCell("7.5-12.5亿元", 3806)] }),
          new TableRow({ children: [bodyCell("政策性贷款", 2500), bodyCell("20%", 2000), bodyCell("3-5亿元", 3806)] }),
          new TableRow({ children: [bodyCell("产业投资基金", 2500), bodyCell("20%", 2000), bodyCell("3-5亿元", 3806)] }),
          new TableRow({ children: [bodyCell("市场化融资", 2500), bodyCell("10%", 2000), bodyCell("1.5-2.5亿元", 3806)] }),
        ],
      }),

      headingWithNumber(3, "4.4.2 人才队伍"),
      bodyParagraph("建议实施电算协同人才专项计划，三年内引进培养150+复合型人才："),

      tableCaption(14, "人才队伍建设规划"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 2000, 3806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("人才类型", 2500), headerCell("引进重点", 2000), headerCell("培养路径", 3806)] }),
          new TableRow({ children: [bodyCell("AI大模型专家", 2500), bodyCell("10-15人", 2000), bodyCell("外部引进+内部培养", 3806)] }),
          new TableRow({ children: [bodyCell("数字孪生专家", 2500), bodyCell("10-15人", 2000), bodyCell("外部引进+项目实战", 3806)] }),
          new TableRow({ children: [bodyCell("电力系统专家", 2500), bodyCell("15-20人", 2000), bodyCell("内部转型+外部引进", 3806)] }),
          new TableRow({ children: [bodyCell("碳资产管理专家", 2500), bodyCell("5-10人", 2000), bodyCell("外部引进+专业培训", 3806)] }),
          new TableRow({ children: [bodyCell("平台运营专家", 2500), bodyCell("10-15人", 2000), bodyCell("外部引进+行业交流", 3806)] }),
        ],
      }),

      // 第五章
      headingWithNumber(1, "五、结语与展望"),

      headingWithNumber(2, "5.1 核心结论"),

      mixedParagraph(["战略层面："], ["电算协同不是\u201c锦上添花\u201d的可选业务，而是中核集团服务国家战略、实现转型升级的\u201c核心战略方向\u201d。在\u201c双碳\u201d目标和\u201c数字中国\u201d战略的双重驱动下，电算协同正处于历史性发展窗口期。"]),
      mixedParagraph(["技术层面："], ["前瞻性技术与电算协同业务的深度融合，将形成中核集团独特的技术护城河。数字孪生、具身智能、电力大模型、源网荷储算脑、碳能算一体化五大技术方向，需要系统布局、重点突破。"]),
      mixedParagraph(["生态层面："], ["中核集团应构建\u201c核电算力+绿色认证+碳资产\u201d三位一体的差异化竞争优势，在国家算力生态中确立\u201c绿色算力核心供应商\u201d的独特定位。"]),

      headingWithNumber(2, "5.2 战略建议"),
      numberedPoint(1, "提升战略定位：将电算协同提升为集团核心战略业务，而非单纯的多元化探索"),
      numberedPoint(2, "加快布局节奏：2026年完成战略规划，2027年建成示范项目，2028年形成规模效应"),
      numberedPoint(3, "强化技术引领：依托核电运行研究院和同方股份，加快核心技术研发"),
      numberedPoint(4, "主导标准制定：积极参与国家标准、行业标准制定，争取行业话语权"),
      numberedPoint(5, "构建开放生态：与电网企业、云服务商、科研机构建立战略合作"),

      headingWithNumber(2, "5.3 未来展望"),
      bodyParagraph("展望2030年，中核集团电算协同业务有望形成以下格局："),
      bulletPoint("算力规模：运营绿色算力超过50000P"),
      bulletPoint("碳资产：管理核电碳资产超过500万吨"),
      bulletPoint("技术标准：主导制定3-5项国家标准"),
      bulletPoint("行业地位：成为国内领先、国际一流的绿色算力服务商"),
      bodyParagraph("中核集团应以\u201c强核强国、造福人类\u201d的企业使命为引领，在电算协同这一战略性赛道上勇毅前行，为国家能源转型和数字经济发展贡献\u201c中核力量\u201d。"),

      // 附录
      headingWithNumber(1, "附录"),

      headingWithNumber(2, "附录一：关键数据汇总"),

      tableCaption(15, "关键数据汇总"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 3500, 2806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("指标类别", 2000), headerCell("具体指标", 3500), headerCell("数据", 2806)] }),
          new TableRow({ children: [bodyCell("市场规模", 2000), bodyCell("中国数据中心市场规模（2024）", 3500), bodyCell("2773亿元", 2806)] }),
          new TableRow({ children: [bodyCell("能耗规模", 2000), bodyCell("数据中心耗电量（2024）", 3500), bodyCell("2500亿千瓦时", 2806)] }),
          new TableRow({ children: [bodyCell("能耗占比", 2000), bodyCell("占全社会用电比重", 3500), bodyCell("2.6%", 2806)] }),
          new TableRow({ children: [bodyCell("碳市场", 2000), bodyCell("全国碳市场年成交额（2024）", 3500), bodyCell("181.14亿元", 2806)] }),
          new TableRow({ children: [bodyCell("碳价格", 2000), bodyCell("碳配额均价", 3500), bodyCell("99.4元/吨", 2806)] }),
          new TableRow({ children: [bodyCell("核电规模", 2000), bodyCell("中核在运装机容量", 3500), bodyCell("2375万千瓦", 2806)] }),
          new TableRow({ children: [bodyCell("核电机组", 2000), bodyCell("中核在运核电机组", 3500), bodyCell("25台", 2806)] }),
          new TableRow({ children: [bodyCell("竞争优势", 2000), bodyCell("WANO满分机组比例", 3500), bodyCell("连续三年世界第一", 2806)] }),
        ],
      }),

      headingWithNumber(2, "附录二：技术成熟度评估"),

      tableCaption(16, "技术成熟度评估矩阵"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 1500, 2300, 2006],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("技术方向", 2500), headerCell("成熟度", 1500), headerCell("中核基础", 2300), headerCell("建议策略", 2006)] }),
          new TableRow({ children: [bodyCell("数字孪生", 2500), bodyCell("★★★★☆", 1500), bodyCell("金七门实践", 2300), bodyCell("深化应用", 2006)] }),
          new TableRow({ children: [bodyCell("边缘智能", 2500), bodyCell("★★★★☆", 1500), bodyCell("基地数字化", 2300), bodyCell("规模推广", 2006)] }),
          new TableRow({ children: [bodyCell("电力大模型", 2500), bodyCell("★★★☆☆", 1500), bodyCell("同方股份", 2300), bodyCell("重点突破", 2006)] }),
          new TableRow({ children: [bodyCell("源网荷储算脑", 2500), bodyCell("★★★☆☆", 1500), bodyCell("核电调度", 2300), bodyCell("试点验证", 2006)] }),
          new TableRow({ children: [bodyCell("碳能算一体化", 2500), bodyCell("★★★☆☆", 1500), bodyCell("核电零碳", 2300), bodyCell("标准引领", 2006)] }),
          new TableRow({ children: [bodyCell("具身智能", 2500), bodyCell("★★☆☆☆", 1500), bodyCell("运维机器人", 2300), bodyCell("安全突破", 2006)] }),
          new TableRow({ children: [bodyCell("量子计算", 2500), bodyCell("★☆☆☆☆", 1500), bodyCell("需起步", 2300), bodyCell("能力储备", 2006)] }),
        ],
      }),

      headingWithNumber(2, "附录三：政策演进时间轴"),

      tableCaption(17, "政策演进时间轴"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 4000, 2306],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({ tableHeader: true, children: [headerCell("时间节点", 2000), headerCell("政策文件", 4000), headerCell("核心内容", 2306)] }),
          new TableRow({ children: [bodyCell("2021年7月", 2000), bodyCell("《全国一体化大数据中心协同创新体系算力枢纽实施方案》", 4000), bodyCell("\u201c东数西算\u201d工程启动", 2306)] }),
          new TableRow({ children: [bodyCell("2024年8月", 2000), bodyCell("《加快构建新型电力系统行动方案（2024\u20142027年）》", 4000), bodyCell("算力与电力协同纳入核心任务", 2306)] }),
          new TableRow({ children: [bodyCell("2025年5月", 2000), bodyCell("《关于促进人工智能与能源双向赋能的行动方案》", 4000), bodyCell("四部门部署29项重点任务", 2306)] }),
          new TableRow({ children: [bodyCell("2025年", 2000), bodyCell("政府工作报告", 4000), bodyCell("算电协同列入新基建工程", 2306)] }),
        ],
      }),

      // 页脚信息
      new Paragraph({ spacing: { before: 480 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "— 完 —", font: FONT, size: 24 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120 }, children: [new TextRun({ text: "免责声明：本报告基于公开信息和行业研究形成，部分前瞻性判断存在不确定性，仅供集团高层领导决策参考。", font: FONT, size: 18 })] }),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("C:\\AI学习资料\\mesheer\\中核集团电算协同智库报告.docx", buffer);
  console.log("Word文档生成成功: C:\\AI学习资料\\mesheer\\中核集团电算协同智库报告.docx");
});
