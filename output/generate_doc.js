const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  TableOfContents, Footer, Header,
  AlignmentType, HeadingLevel, PageBreak,
  BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

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

function bodyParagraphWithBold(boldText, normalText) {
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

function bodyCell(text, width, align = AlignmentType.CENTER) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, font: FONT, size: 21 })],
    })],
  });
}

function tableCaption(num, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: `表${num} ${caption}`, font: FONT, size: 21, bold: true }),
    ],
  });
}

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
      docTitle("科创中心超级个体模式方案"),

      ...tocPage(),

      heading(1, "一、为什么要推进超级个体模式"),

      heading(2, "1.1 效率革命的必然性"),
      bodyParagraph("利用AI辅助编写报告、研究算法生成代码，能将个体能力放大数十倍。将原本需要数月的多团队协作压缩到极短的周期内完成，大幅降低项目成本，提升公司收益。"),

      heading(2, "1.2 规模化交付能力"),
      bodyParagraph("国网、南网每年科技项目数较多，从省公司到地市公司都有大量需求。团队的规模化有瓶颈（招人，培养，管理），但超级智能个体理论上可以支持无限并行的项目交付。"),

      heading(2, "1.3 解决知识碎片化与流转断点"),
      bodyParagraph("科技项目常被拆成算法研究、报告撰写、软件开发三部分，由不同的部门的人完成，信息衰减严重，每个人理解不一样。一个能贯通所有环节的超级个体，可以从底层数学推导到顶层代码架构，再到报告中的结论图表，进行端到端的无损传递和逻辑自洽验证。"),

      heading(2, "1.4 应对政策和市场的快速变化"),
      bodyParagraph("电力行业政策变化快、市场需求变化快，智能个体可以第一时间学习并融入项目申报和执行中，响应速度快。"),

      heading(2, "1.5 全流程一致性"),
      bodyParagraph("有一个能全流程跟踪指导的角色，保持项目策划申报到投标执行的一致性。"),

      heading(2, "1.6 降本增效"),
      bodyParagraph("减少不同专业人员沟通成本和犯错成本。"),

      heading(1, "二、问题与挑战分析"),

      heading(2, "2.1 当前工作流程的痛点"),
      bodyParagraph("当前科技项目交付面临的主要问题是全流程断裂。研究设计与开发实现之间存在明显断层，导致以下问题："),
      bodyParagraph("沟通成本高：需求传递需要经过多次转译，信息衰减严重，业务理解与代码实现容易出现偏差。"),
      bodyParagraph("迭代效率低：开发部门采用传统开发模式，需求变更响应周期长，无法满足科技项目快速迭代的要求。"),
      bodyParagraph("交付质量难控：复杂业务逻辑和个性化需求难以准确传递给开发人员，交付成果与预期存在差距。"),

      heading(2, "2.2 开发部门的局限性"),
      bodyParagraph("传统开发部门的定位和模式难以适应科技项目的特殊要求："),
      bodyParagraph("成本效益考量：科技项目开发需求碎片化、个性化强，传统开发模式投入产出比低，开发部门承接意愿不足。"),
      bodyParagraph("技术栈差异：科技项目需要快速原型开发、算法验证和模型集成，传统开发流程过于冗长。"),
      bodyParagraph("业务理解断层：开发人员对业务场景理解深度不够，难以实现真正意义上的个性化开发。"),

      heading(2, "2.3 业务边界模糊"),
      bodyParagraph("当前科创中心与开发部门的职责划分不清晰，导致："),
      bodyParagraph("项目归属争议：涉及模型设计、demo开发等项目，到底由哪个部门承接缺乏明确依据。"),
      bodyParagraph("资源竞争：核心技术人员被抽调参与不同项目，影响整体效率。"),
      bodyParagraph("客户体验：多方协调增加沟通成本，影响客户满意度。"),

      heading(2, "2.4 核心难点——三人观点深度剖析"),
      bodyParagraph("通过团队内部讨论，我们识别出以下核心挑战："),

      bodyParagraphWithBold("难点一：能力要求极高——\u201C不可能三角\u201D", "。超级智能需要同时具备："),
      bodyParagraph("数学功底（算法）"),
      bodyParagraph("电力系统专业知识（计量、营销、现货、负控...）"),
      bodyParagraph("软件开发能力（设计、开发、测试、部署）"),
      bodyParagraph("高质量学术写作能力"),
      bodyParagraph("这类复合型人才市场上极少。"),

      bodyParagraphWithBold("难点二：学习成本大——时间投入长", "："),
      bodyParagraph("前期对产品设计、UI、开发、集成工具不熟悉"),
      bodyParagraph("需要学习工作流程和常用工具的底层认知"),
      bodyParagraph("需要不断尝试和筛选AI工具"),
      bodyParagraph("需要熟悉AI的提示词和操作技巧"),
      bodyParagraph("预计需要2年以上才能真正投入实战"),

      bodyParagraphWithBold("难点三：交付质量与口碑风险——最底层挑战", "："),
      bodyParagraph("AI\u201C幻觉\u201D：算法引用失败论文、代码存在隐患、报告给出错误结论"),
      bodyParagraph("朗新30年靠口碑赢得客户，一旦出错影响巨大"),
      bodyParagraph("科技项目必须跑真实业务数据，AI代码看似能跑通demo，但往往："),
      bodyParagraph("对真实业务场景理解不到位"),
      bodyParagraph("数据适配性差，逻辑经不起实际数据校验"),
      bodyParagraph("结论很容易失真、不准"),

      bodyParagraphWithBold("难点四：单人认知盲区——缺乏交叉验证", "："),
      bodyParagraph("一个人很容易陷入\u201C局部最优\u201D，缺乏多人的交叉验证"),
      bodyParagraph("电网科技项目往往需要团队研讨的碰撞，单人很容易进入思维死角"),
      bodyParagraph("难以应对客户的沟通、汇报、答辩、细节追问"),
      bodyParagraph("难以面对评审专家的质疑"),

      bodyParagraphWithBold("难点五：质量保障机制缺失——既是运动员又是裁判员", "："),
      bodyParagraph("传统软件有需求、设计、测试等层层关卡"),
      bodyParagraph("当所有环节集于一身时，无法自证交付的系统是可靠、可信的"),
      bodyParagraph("工程伦理上就是巨大难题"),

      bodyParagraphWithBold("难点六：合规红线——最难跨越的鸿沟", "："),
      bodyParagraph("南方电网作为关乎国计民生的核心基础设施，对系统稳定性和数据安全有着极高的要求"),
      bodyParagraph("所有系统部署在安全I区-安全V区"),
      bodyParagraph("如果智能个体无法安全地跨越系统边界获取实时数据，它就会变成一个\u201C睁眼瞎\u201D"),
      bodyParagraph("AI的\u201C黑盒\u201D特性难以通过南网严格的网络安全与数据合规性审查"),

      heading(2, "2.5 核心矛盾"),
      bodyParagraph("不是\u201C能不能快速写代码\u201D，而是\u201CAI代码扛不扛得住实际业务、真实数据的运行校验\u201D。"),
      bodyParagraph("AI编程灵活性高、出原型快，不用配一堆普通开发，靠几个超级个体就能把从创意、拆解、开发到成果沉淀全部闭环掉。但这里面最大的关键问题是："),
      bodyParagraph("科技项目哪怕不要求落地商用、不用上线实用化，也必须基于真实业务逻辑、跑实际业务数据，得出可信结论。"),
      bodyParagraph("AI生成的代码最大短板就在这，看似能跑通demo，但往往对真实业务场景理解不到位、数据适配性差、逻辑经不起实际数据校验，真拿真实业务数据一跑，模型结果、分析结论很容易失真、不准，根本支撑不了科技项目的论证要求。"),

      heading(1, "三、解决方案设计"),

      heading(2, "3.1 核心理念：超级个体模式"),
      bodyParagraph("我们提出\u201C超级个体\u201D概念，即培养和引进既具备深厚业务理解能力，又掌握AI编程技能的复合型人才。这类人才能够独立完成从需求分析、方案设计到代码实现的全流程工作，实现科技项目的闭环交付。"),

      heading(2, "3.2 职能扩展方案"),
      bodyParagraph("开发能力整合：将原有的算法研究、模型设计与开发实现进行整合，形成完整的技术闭环。"),
      bodyParagraph("交付能力提升：建立从研究到落地的全流程交付能力，实现科技项目的一揽子服务。"),
      bodyParagraph("个性化开发：针对科技项目个性化需求多的特点，建立敏捷开发模式，支持快速迭代和定制开发。"),

      heading(2, "3.3 与开发部门的职责划分"),
      bodyParagraph("建议按照项目类型进行职责划分："),
      tableCaption(1, "项目类型与承接部门划分"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2768, 2769, 2769],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("项目类型", 2768),
              headerCell("承接部门", 2769),
              headerCell("说明", 2769),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("科技项目（含个性化开发）", 2768),
              bodyCell("科创中心", 2769),
              bodyCell("研究+开发一体化交付", 2769),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("成熟产品开发与维护", 2768),
              bodyCell("开发部门", 2769),
              bodyCell("标准化、规模化软件开发", 2769),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("大型系统集成项目", 2768),
              bodyCell("联合团队", 2769),
              bodyCell("科创中心负责算法模块，开发部门负责系统架构", 2769),
            ],
          }),
        ],
      }),

      heading(2, "3.4 AI编程赋能策略"),
      bodyParagraph("适用场景：常规界面开发、基本数据库操作、简单业务逻辑、标准化模块实现。"),
      bodyParagraph("AI辅助开发流程：需求描述→AI生成→人工审核→优化调整→质量验证。"),
      bodyParagraph("关键控制点：复杂业务逻辑必须人工把控，输出质量需经过严格验证。"),

      heading(2, "3.5 超级个体的角色定位"),
      bodyParagraph("咨询岗位在项目过程中的作用："),
      bodyParagraph("对于需求产品设计，可以提供原型初稿做优化"),
      bodyParagraph("或者直接承担一部分产品原型设计工作"),
      bodyParagraph("能够全流程跟踪指导，保持项目策划申报到投标执行的一致性"),
      bodyParagraph("对于开发工作的定位："),
      bodyParagraph("不要求承担全部全栈开发工作，尤其是后端模型部署、数据库、接口等"),
      bodyParagraph("开发工作的主要目的是帮助提供开发集成同事的效率、避免开发错误、实现算法研究到代码落地的快速转化"),
      bodyParagraph("业务系统的复杂部分仍由专业开发团队负责"),
      bodyParagraph("对于集成工作的定位："),
      bodyParagraph("主要是算法模块的集成和验证"),
      bodyParagraph("不强求跨越系统边界获取实时数据"),
      bodyParagraph("重点是原型验证和可行性论证"),

      heading(1, "四、人员配置方案"),

      heading(2, "4.1 超级个体能力画像"),
      bodyParagraph("业务理解能力：深入理解科技项目业务逻辑，能够准确把握客户需求和项目目标。"),
      bodyParagraph("技术研究能力：具备算法设计、模型开发等技术研究能力，能够完成前沿技术探索。"),
      bodyParagraph("AI编程能力：熟练掌握AI编程工具，能够利用AI辅助完成代码开发、调试和优化。"),
      bodyParagraph("全栈思维：了解从需求到交付的完整流程，能够独立完成项目闭环。"),

      heading(1, "五、软件功能模块开发：能力要求与工作内容"),

      heading(2, "5.1 开发涉及的核心能力"),
      bodyParagraph("需求理解能力：业务场景分析与建模、用户需求深度挖掘、功能边界清晰界定、非功能性需求识别"),
      bodyParagraph("技术设计能力：系统架构设计、数据库设计、算法与业务逻辑设计、技术选型"),
      bodyParagraph("编码实现能力：前端开发、后端开发、数据库开发、API设计与实现、第三方服务集成"),
      bodyParagraph("测试验证能力：单元测试、集成测试、功能测试、性能测试、边界条件与异常场景测试"),
      bodyParagraph("部署运维能力：开发环境与生产环境配置、部署脚本编写与自动化、监控日志与告警配置、故障排查与问题定位"),

      heading(2, "5.2 开发全流程工作内容"),

      heading(3, "第一阶段：需求分析"),
      bodyParagraph("与业务方深度沟通，明确功能目标和业务价值"),
      bodyParagraph("编写需求规格说明书，明确功能范围"),
      bodyParagraph("绘制功能原型或流程图"),
      bodyParagraph("组织需求评审，确认需求基线"),

      heading(3, "第二阶段：技术设计"),
      bodyParagraph("系统架构设计、数据库设计、API接口设计、详细设计方案评审与确认"),

      heading(3, "第三阶段：编码开发"),
      bodyParagraph("开发环境搭建与配置、基础框架搭建、数据库表创建、后端接口开发、前端界面开发、核心算法实现、第三方服务集成"),

      heading(3, "第四阶段：测试验证"),
      bodyParagraph("代码Review、单元测试、集成测试、性能测试、Bug修复与回归测试"),

      heading(3, "第五阶段：部署交付"),
      bodyParagraph("部署文档编写、用户手册编写、上线部署、用户培训、后续运维与迭代优化"),

      heading(2, "5.3 AI辅助开发的适用场景"),
      tableCaption(2, "AI辅助开发适用场景分析"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [3000, 2303, 3003],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("能力/工作", 3000),
              headerCell("AI可辅助程度", 2303),
              headerCell("说明", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("需求分析", 3000),
              bodyCell("30-50%", 2303),
              bodyCell("AI可辅助生成需求模板、整理思路", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("架构设计", 3000),
              bodyCell("20-40%", 2303),
              bodyCell("AI可提供参考方案，需人工决策", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("数据库设计", 3000),
              bodyCell("60-80%", 2303),
              bodyCell("AI可辅助生成DDL语句", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("前端开发", 3000),
              bodyCell("70-90%", 2303),
              bodyCell("AI生成界面代码效果较好", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("后端逻辑", 3000),
              bodyCell("50-70%", 2303),
              bodyCell("简单CRUD效果好，复杂逻辑需审核", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("API开发", 3000),
              bodyCell("70-90%", 2303),
              bodyCell("标准化接口生成效果很好", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("测试用例", 3000),
              bodyCell("60-80%", 2303),
              bodyCell("AI可辅助生成测试用例", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("文档编写", 3000),
              bodyCell("80-95%", 2303),
              bodyCell("AI辅助文档生成效果非常好", 3003),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("Bug修复", 3000),
              bodyCell("50-70%", 2303),
              bodyCell("常见问题定位和修复效果较好", 3003),
            ],
          }),
        ],
      }),
      bodyParagraph("核心结论：AI在代码实现、文档编写、简单逻辑处理方面能力强，但架构设计、复杂业务逻辑、质量把控仍需人工主导。"),

      heading(1, "六、利弊综合分析"),

      heading(2, "6.1 核心优势（利）"),
      bodyParagraph("实现全流程闭环：从研究→算法→模型→开发→交付，一站式完成"),
      bodyParagraph("显著提升效率：AI辅助编程可提升开发效率2-3倍"),
      bodyParagraph("深化业务理解：超级个体既懂业务又懂技术"),
      bodyParagraph("增强市场竞争力：形成差异化竞争优势"),
      bodyParagraph("加速创新落地：研究成果快速转化为可演示产品"),
      bodyParagraph("成本效益优化：综合成本可降低15-25%"),

      heading(2, "6.2 潜在挑战（弊）"),
      bodyParagraph("人员招聘与留存风险：复合型人才稀缺，培养周期长（2年以上）"),
      bodyParagraph("能力覆盖局限性：复杂系统架构仍需团队协作"),
      bodyParagraph("与开发部门的潜在冲突：职能划分可能引发资源竞争"),
      bodyParagraph("技术与安全风险：AI生成代码质量需要严格审核"),
      bodyParagraph("短期成本投入：超级个体薪酬高于普通开发人员30-50%"),
      bodyParagraph("真实业务数据校验风险：AI生成内容难以通过实际数据验证"),
      bodyParagraph("合规审查挑战：AI的\u201C黑盒\u201D特性难以通过南网合规性审查"),

      heading(2, "6.3 利弊权衡结论"),
      tableCaption(3, "利弊权衡综合分析"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 2500, 2500, 1806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("评估维度", 1500),
              headerCell("利处", 2500),
              headerCell("弊处", 2500),
              headerCell("综合判断", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("战略价值", 1500),
              bodyCell("实现闭环、提升竞争力", 2500),
              bodyCell("短期投入大", 2500),
              bodyCell("战略性投入，长期收益显著", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("运营效率", 1500),
              bodyCell("效率提升2-3倍", 2500),
              bodyCell("人员培训周期长（2年以上）", 2500),
              bodyCell("效率提升是核心竞争力，但需耐心", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("风险可控性", 1500),
              bodyCell("风险可通过机制管控", 2500),
              bodyCell("存在多维风险", 2500),
              bodyCell("建立完善机制后风险可控", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("业务契合度", 1500),
              bodyCell("完全契合科技项目特点", 2500),
              bodyCell("能力边界有限", 2500),
              bodyCell("高度契合，但需合理分工", 1806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("交付质量", 1500),
              bodyCell("快速出原型", 2500),
              bodyCell("真实数据校验难通过", 2500),
              bodyCell("适用于论证类项目，落地需谨慎", 1806),
            ],
          }),
        ],
      }),
      bodyParagraph("结论：超级个体模式是科创中心实现战略突破的关键路径，但需要正视\u201CAI代码扛不住实际业务、真实数据运行校验\u201D这一核心瓶颈。建议从论证类、验证类项目起步，逐步建立能力，同时保持与开发部门的协作，确保交付质量。"),

      heading(1, "七、风险管控"),

      heading(2, "7.1 主要风险识别"),
      bodyParagraph("技术风险：AI生成代码质量不稳定，复杂业务逻辑处理能力有限。"),
      bodyParagraph("人员风险：超级个体招聘难度大，培养周期长，存在人才流失风险。"),
      bodyParagraph("组织风险：与开发部门的职责划分可能引发内部矛盾。"),
      bodyParagraph("安全风险：直接使用AI生成内容进行生产交付存在质量和安全风险。"),
      bodyParagraph("合规风险：AI的\u201C黑盒\u201D特性难以通过南网严格的网络安全与数据合规性审查。"),
      bodyParagraph("质量风险：AI生成内容缺乏专业测试和交叉验证，存在交付隐患。"),

      heading(2, "7.2 应对策略"),
      bodyParagraph("技术风险应对："),
      bodyParagraph("建立分阶段验证机制，确保每个环节输出质量"),
      bodyParagraph("复杂场景必须人工审核把关"),
      bodyParagraph("持续关注AI技术发展，及时更新工具和方法"),
      bodyParagraph("人员风险应对："),
      bodyParagraph("设计有竞争力的薪酬和成长通道"),
      bodyParagraph("建立知识沉淀机制，降低人员依赖"),
      bodyParagraph("培养后备人才，形成梯队"),
      bodyParagraph("组织风险应对："),
      bodyParagraph("与公司管理层和开发部门充分沟通，争取支持"),
      bodyParagraph("明确职责边界，形成书面协议"),
      bodyParagraph("建立协作机制，实现优势互补"),
      bodyParagraph("合规风险应对："),
      bodyParagraph("选择不影响生产系统的验证类项目试点"),
      bodyParagraph("不强求跨越系统边界的实时数据获取"),
      bodyParagraph("建立与开发部门的协作机制，确保系统集成安全"),
      bodyParagraph("质量风险应对："),
      bodyParagraph("建立项目评审机制，确保算法、代码、报告的逻辑自洽"),
      bodyParagraph("引入交叉验证环节，避免单人认知盲区"),
      bodyParagraph("保留充分的评审记录，应对客户和专家质疑"),

      heading(1, "八、效率与成本分析"),

      heading(2, "8.1 效率提升预期"),
      bodyParagraph("沟通效率：减少需求传递环节，沟通效率提升30-50%。"),
      bodyParagraph("开发效率：AI辅助编程可提升开发效率2-3倍。"),
      bodyParagraph("迭代效率：敏捷开发模式支持快速迭代，需求响应周期缩短50%以上。"),
      bodyParagraph("交付效率：全流程闭环减少等待时间，项目整体周期缩短20-30%。"),

      heading(2, "8.2 成本效益分析"),
      bodyParagraph("人力成本：超级个体薪酬水平高于普通开发人员，但考虑到效率提升，综合成本可降低15-25%。"),
      bodyParagraph("沟通成本：减少多方协调，沟通成本显著降低。"),
      bodyParagraph("机会成本：快速响应市场需求，抓住更多商业机会。"),
      bodyParagraph("长期收益：建立核心能力壁垒，形成差异化竞争优势。"),
      bodyParagraph("培训成本：前期投入大，预计需要2年以上的培养周期才能形成战斗力。"),

      heading(1, "九、方案总结"),

      heading(2, "9.1 扩展职能边界"),
      bodyParagraph("科创中心从单一的研究职能，扩展为研究+开发一体化交付。"),

      heading(2, "9.2 创新用人模式"),
      bodyParagraph("引进和培养既懂业务又懂AI编程的复合型人才——超级个体。"),

      heading(2, "9.3 明晰业务边界"),
      bodyParagraph("科技项目由科创中心一揽子承接，成熟产品开发由开发部门负责。"),

      heading(2, "9.4 分步实施推进"),
      bodyParagraph("从试点项目起步，逐步建立能力，最终实现规模化交付。"),

      heading(2, "9.5 正视核心瓶颈"),
      bodyParagraph("不是\u201C能不能快速写代码\u201D，而是\u201CAI代码扛不扛得住实际业务、真实数据的运行校验\u201D。这是方案成败的关键。"),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("c:\\AI学习资料\\mesheer\\output\\科创中心超级个体模式方案.docx", buffer);
  console.log("文档生成成功: 科创中心超级个体模式方案.docx");
});
