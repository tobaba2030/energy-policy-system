
/**
 * 能源电网科技项目申报书 - Word文档生成脚本
 * 基于 docx-cn 技能的格式规范
 */

import fs from "fs";
import {
  Document, Packer, Paragraph, TextRun,
  TableOfContents, Footer,
  AlignmentType, HeadingLevel, PageBreak,
  PageNumber,
} from "docx";

// 中英混排字体
const FONT = { name: "Times New Roman", eastAsia: "宋体" };

// ————— 辅助函数 —————

/** 正文段落 */
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

/** 文档标题（居中、小二、加粗） */
function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({ text, font: FONT, bold: true, size: 36 }),
    ],
  });
}

/** 标题段落（level: 1/2/3） */
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

/** 目录页 */
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

/** 带加粗前缀的正文 */
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

/** 列表项 */
function listItem(text, indentLevel = 1) {
  const leftIndent = indentLevel * 480;
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto", before: 60, after: 60 },
    indent: { left: leftIndent, firstLineChars: 200 },
    alignment: AlignmentType.LEFT,
    children: [
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

// ————— 生成申报书文档 —————
const children = [];

// 标题页
children.push(docTitle("基于多源数据融合的区域电网新能源消纳能力提升关键技术研究申报书"));
children.push(new Paragraph({ children: [new PageBreak()] }));

// 目录
children.push(...tocPage());

// 一、项目概述
children.push(heading(1, "一、项目概述"));
children.push(heading(2, "1.1 项目背景"));
children.push(bodyParagraph("在\u201c双碳\u201d战略目标引领下，我国新能源发展步入快车道。截至2025年底，区域电网新能源装机容量已超过30GW，占总装机容量比例达到35%，预计到2030年新能源装机占比将超过50%（数据来源：区域电网2025年运行年报）。然而，随着新能源大规模并网，新能源消纳问题日益突出，年均弃电率约为8%，在新能源大发高峰期甚至超过15%，给电网安全稳定运行和新能源高效利用带来巨大挑战。"));
children.push(bodyParagraph("当前，制约新能源消纳能力提升的主要问题包括：一是新能源发电预测精度不足，传统单一数据源预测方法难以应对复杂气象条件下的出力波动；二是多源数据协同利用程度不高，气象、发电、负荷、电网运行等数据分散在不同系统，缺乏有效融合；三是源网荷储协同优化能力不足，难以充分挖掘各类调节资源的潜力；四是调峰辅助服务市场机制有待完善，市场主体参与调峰的积极性尚未充分调动。"));

children.push(heading(2, "1.2 研究意义"));
children.push(bodyParagraphWithBoldPrefix("理论意义：", "本研究将多源数据融合、人工智能预测、优化调度等理论方法应用于新能源消纳领域，拓展了新型电力系统优化运行理论的应用边界，丰富了复杂电力系统不确定性决策的方法论体系，对相关学科的发展具有积极推动作用。"));
children.push(bodyParagraphWithBoldPrefix("应用价值：", "本项目研究成果可直接应用于区域电网调度运行，通过提升新能源预测精度、优化源网荷储协同运行，预计可将区域新能源消纳率提升5-8个百分点，显著减少新能源弃电量，带来显著的经济效益和环境效益。同时，研究成果可在其他省区电网推广应用，具有广阔的应用前景。"));

children.push(heading(2, "1.3 研究目标"));
children.push(bodyParagraphWithBoldPrefix("总体目标：", "突破多源数据融合、高精度预测、协同优化等关键技术，显著提升区域电网新能源消纳能力，支撑新型电力系统建设。"));
children.push(bodyParagraphWithBoldPrefix("具体目标：", ""));
children.push(listItem("1. 构建多源异构数据融合平台，实现气象、发电、负荷、电网运行等数据的高效集成与共享"));
children.push(listItem("2. 研发新能源发电高精度预测技术，短期预测精度达到90%以上，超短期预测精度达到95%以上"));
children.push(listItem("3. 建立源网荷储协同优化调度模型，实现区域调峰资源的高效利用"));
children.push(listItem("4. 开发新能源消纳能力评估与提升决策支持系统，并在实际电网开展示范应用"));

// 二、国内外研究现状与发展趋势
children.push(heading(1, "二、国内外研究现状与发展趋势"));
children.push(heading(2, "2.1 国内外研究现状"));
children.push(bodyParagraph("国外学者在新能源发电预测方面开展了大量研究，传统方法主要基于时间序列分析（如ARIMA、GARCH等），近年来机器学习方法（如神经网络、支持向量机、随机森林等）得到广泛应用。Google的DeepMind团队利用深度学习技术在风电预测方面取得显著成果，预测精度提升约20%。"));
children.push(bodyParagraph("在多源数据融合技术方面，国际电工委员会（IEC）制定了电力系统数据交换标准，为多源数据融合提供了技术规范。基于深度学习的特征融合、基于贝叶斯网络的决策融合等方法不断丰富。"));
children.push(bodyParagraph("国内在新能源预测领域也开展了深入研究，中国电科院、清华大学等单位在预测算法、数据融合等方面取得系列成果。多个省区电网也开展了源网荷储协同运行的示范工程。"));

children.push(heading(2, "2.2 发展趋势分析"));
children.push(bodyParagraphWithBoldPrefix("技术发展趋势：", "一是人工智能与电力系统深度融合，机器学习、深度学习等技术在预测、调度、控制等环节的应用将更加广泛；二是多能互补与综合能源系统发展，打破传统电力系统边界，实现电、气、热等多种能源协同优化；三是数字化与智能化技术持续升级，数字孪生、边缘计算等技术将为电力系统运行提供更强支撑。"));
children.push(bodyParagraphWithBoldPrefix("行业发展趋势：", "一是新能源装机规模持续扩大，预计到2030年我国新能源装机将超过12亿千瓦；二是新型电力系统建设加速推进，对系统灵活性、安全性提出更高要求；三是电力市场改革不断深化，市场在资源配置中的决定性作用将更加突出。"));

children.push(heading(2, "2.3 现有研究基础与差距"));
children.push(bodyParagraph("尽管相关研究已取得较多成果，但在以下方面仍存在不足：一是多源数据融合深度不够，现有研究多关注数据层面的简单集成，缺乏面向新能源消纳场景的深度特征融合与知识挖掘；二是预测精度仍有提升空间，特别是在极端天气等复杂场景下，现有预测方法的适应性和鲁棒性有待提升；三是协同优化的实用性有待加强，现有优化模型多基于理想假设，对实际电网的复杂约束和运行特性考虑不足，难以直接应用于工程实践；四是系统集成与示范验证不足，缺乏完整的技术集成与系统级示范验证，难以全面评估技术方案的综合效益。"));

// 三、研究内容与技术方案
children.push(heading(1, "三、研究内容与技术方案"));
children.push(heading(2, "3.1 总体技术路线"));
children.push(bodyParagraph("本项目采用\u201c数据融合-智能预测-协同优化-系统集成-示范应用\u201d的总体技术路线，包含4项关键研究内容：多源异构数据融合技术、新能源高精度预测技术、源网荷储协同优化调度技术、新能源消纳能力评估与提升决策支持系统开发。"));

children.push(heading(2, "3.2 关键研究内容"));
children.push(heading(3, "3.2.1 多源异构数据融合技术"));
children.push(bodyParagraph("研究面向新能源消纳的多源异构数据融合技术，构建统一的数据接入标准和数据模型，实现气象、发电、负荷、电网运行等多源数据的高效集成与共享。研究基于深度学习的特征融合方法，挖掘多源数据中的互补信息，为后续的预测和优化提供数据支撑。"));

children.push(heading(3, "3.2.2 新能源高精度预测技术"));
children.push(bodyParagraph("研究基于多源数据融合的新能源发电高精度预测技术，构建融合数值天气预报、历史运行数据、实时气象数据的预测模型。研究深度学习在新能源预测中的应用，结合注意力机制、迁移学习等方法，提升预测模型在复杂场景下的适应性和鲁棒性。"));

children.push(heading(3, "3.2.3 源网荷储协同优化调度技术"));
children.push(bodyParagraph("研究考虑多不确定性因素的源网荷储协同优化调度模型，构建包含新能源出力、负荷预测、储能状态等多维度不确定性的随机优化模型。研究快速求解算法，确保优化调度的时效性，满足实时运行需求。"));

children.push(heading(3, "3.2.4 新能源消纳能力评估与提升决策支持系统开发"));
children.push(bodyParagraph("开发新能源消纳能力评估与提升决策支持系统，集成数据融合、预测、优化等功能模块。研究人机交互界面设计，为调度人员提供直观、易用的决策支持工具。"));

children.push(heading(2, "3.3 技术创新点"));
children.push(listItem("1. 多源异构数据深度融合方法：提出面向新能源消纳场景的多源数据融合框架，实现不同类型数据的有效融合与特征提取。"));
children.push(listItem("2. 融合注意力机制的新能源高精度预测技术：将注意力机制与深度学习模型结合，提升复杂场景下的预测精度。"));
children.push(listItem("3. 多不确定性源网荷储协同优化模型：构建考虑多维度不确定性的随机优化模型，提升优化方案的实用性。"));

children.push(heading(2, "3.4 技术难点与解决方案"));
children.push(bodyParagraphWithBoldPrefix("技术难点一：", "多源异构数据的有效融合与特征提取。解决方案：研究不同类型数据的统一表示方法，提出基于深度学习的多模态特征融合技术。"));
children.push(bodyParagraphWithBoldPrefix("技术难点二：", "复杂场景下新能源预测精度不足。解决方案：结合迁移学习、领域自适应等方法，提升模型在极端天气等复杂场景下的适应性。"));
children.push(bodyParagraphWithBoldPrefix("技术难点三：", "多不确定性协同优化问题的求解效率。解决方案：研究降维方法和快速算法，在保证优化精度的同时提升求解效率。"));

// 四、研究计划与进度安排
children.push(heading(1, "四、研究计划与进度安排"));
children.push(heading(2, "4.1 研究阶段划分"));
children.push(bodyParagraph("本项目计划分3个阶段实施，总周期为3年。"));
children.push(bodyParagraphWithBoldPrefix("第一阶段（第1年）：关键技术研究与原型开发", ""));
children.push(listItem("主要目标：完成数据融合平台搭建，突破核心预测技术"));
children.push(listItem("主要任务：完成需求调研与技术方案论证；建立多源数据融合平台原型；研发新能源高精度预测算法；发表学术论文2-3篇，申请专利1-2项"));
children.push(bodyParagraphWithBoldPrefix("第二阶段（第2年）：核心技术突破与系统集成", ""));
children.push(listItem("主要目标：突破协同优化技术，完成系统集成开发"));
children.push(listItem("主要任务：研发源网荷储协同优化调度算法；开发决策支持系统；完成实验室验证与性能测试；发表学术论文3-4篇，申请专利2-3项，完成软件著作权登记1-2项"));
children.push(bodyParagraphWithBoldPrefix("第三阶段（第3年）：示范应用与成果总结", ""));
children.push(listItem("主要目标：完成示范应用，总结提炼成果"));
children.push(listItem("主要任务：在区域电网开展示范应用；优化完善系统功能；总结项目成果，形成技术报告；发表高水平论文1-2篇，申请专利1-2项"));

children.push(heading(2, "4.2 里程碑节点与交付物"));
children.push(listItem("M1（第6个月）：完成需求调研与技术方案论证，形成技术方案文档"));
children.push(listItem("M2（第12个月）：完成数据融合平台原型与预测算法，提交原型系统"));
children.push(listItem("M3（第18个月）：完成协同优化算法开发，提交算法文档"));
children.push(listItem("M4（第24个月）：完成系统集成与实验室验证，提交测试报告"));
children.push(listItem("M5（第30个月）：完成示范应用与效果评估，提交示范报告"));
children.push(listItem("M6（第36个月）：项目验收，提交完整项目成果"));

children.push(heading(2, "4.3 研究任务分解与责任分工"));
children.push(listItem("任务1：需求调研与技术方案论证（负责人：张三，参与人：李四、王五）"));
children.push(listItem("任务2：多源数据融合技术研究（负责人：李四，参与人：赵六、钱七）"));
children.push(listItem("任务3：新能源高精度预测技术研究（负责人：王五，参与人：张三、赵六）"));
children.push(listItem("任务4：源网荷储协同优化技术研究（负责人：赵六，参与人：李四、钱七）"));
children.push(listItem("任务5：系统开发与示范应用（负责人：钱七，参与人：张三、王五）"));

// 五、预期成果与考核指标
children.push(heading(1, "五、预期成果与考核指标"));
children.push(heading(2, "5.1 预期成果形式与内容"));
children.push(bodyParagraphWithBoldPrefix("技术成果：", "1. 多源异构数据融合平台1套，支持8类以上数据源接入；2. 新能源高精度预测算法1套，形成技术规范；3. 源网荷储协同优化调度模型与算法1套；4. 新能源消纳能力评估与提升决策支持系统1套。"));
children.push(bodyParagraphWithBoldPrefix("知识产权：", "1. 申请发明专利4-6项；2. 发表高水平学术论文6-9篇，其中SCI/EI收录3-5篇；3. 登记软件著作权2-3项；4. 形成企业技术标准或规范1-2项。"));
children.push(bodyParagraphWithBoldPrefix("示范应用：", "在区域电网调度中心完成示范应用，验证技术方案的有效性。"));

children.push(heading(2, "5.2 技术指标与应用指标"));
children.push(bodyParagraphWithBoldPrefix("技术指标：", ""));
children.push(listItem("1. 数据融合平台：支持≥8类数据源接入，数据处理延迟≤1秒"));
children.push(listItem("2. 新能源预测精度：短期预测准确率≥90%，超短期预测准确率≥95%"));
children.push(listItem("3. 优化算法：求解规模≥1000节点，计算时间≤10分钟"));
children.push(listItem("4. 系统可用性：示范应用期间系统可用率≥99%"));
children.push(bodyParagraphWithBoldPrefix("应用指标：", ""));
children.push(listItem("1. 示范区域新能源消纳率提升≥5个百分点"));
children.push(listItem("2. 示范区域新能源弃电率降低≥3个百分点"));
children.push(listItem("3. 形成可复制推广的技术方案，在≥2个省级电网推广应用"));
children.push(bodyParagraphWithBoldPrefix("知识产权指标：", ""));
children.push(listItem("1. 申请发明专利≥4项"));
children.push(listItem("2. 发表学术论文≥6篇"));
children.push(listItem("3. 登记软件著作权≥2项"));

children.push(heading(2, "5.3 知识产权布局"));
children.push(bodyParagraph("本项目将围绕多源数据融合、新能源预测、协同优化、系统集成等核心技术进行知识产权布局。针对核心算法和关键技术，申请发明专利进行保护；对于软件系统，登记软件著作权；对于有价值的研究成果，及时发表学术论文。同时，将形成企业内部技术标准和规范，保障技术成果的推广应用。"));

// 六、研究团队与保障条件
children.push(heading(1, "六、研究团队与保障条件"));
children.push(heading(2, "6.1 研究团队组成"));
children.push(bodyParagraph("本项目由多学科交叉团队组成，核心成员包括：项目负责人，教授/研究员，长期从事电力系统运行控制研究，具有丰富的科研项目组织经验。"));
children.push(bodyParagraph("核心成员包括：张三，副教授，研究方向为大数据与人工智能在电力系统中的应用；李四，高级工程师，研究方向为新能源预测与并网技术；王五，副研究员，研究方向为电力系统优化调度；赵六，工程师，研究方向为软件开发与系统集成。"));
children.push(bodyParagraph("团队结构：研究团队共15人，其中高级职称6人，中级职称5人，博士研究生4人。团队成员在电力系统、人工智能、软件工程等领域具有扎实的理论基础和丰富的实践经验。"));

children.push(heading(2, "6.2 已有研究基础"));
children.push(bodyParagraphWithBoldPrefix("研究基础：", "团队在新能源预测、优化调度等方面已取得系列前期成果，发表相关论文30余篇；已开发相关原型系统3套，为项目开展奠定了良好的技术基础；与区域电网公司建立了长期合作关系，可获取必要的数据资源和技术支持。"));
children.push(bodyParagraphWithBoldPrefix("实验条件：", "拥有电力系统仿真实验室，配置有先进的仿真软件和硬件设备；拥有高性能计算集群，可满足大规模优化计算需求；已获取区域电网历史运行数据，为算法研发提供数据支撑。"));

children.push(heading(2, "6.3 实验条件与保障措施"));
children.push(bodyParagraphWithBoldPrefix("设备保障：", "项目单位拥有完备的电力系统仿真实验条件，包括实时数字仿真器、硬件在环测试平台等，可满足项目研究需求。"));
children.push(bodyParagraphWithBoldPrefix("数据保障：", "已与区域电网公司建立数据合作机制，可获取历史运行数据和实时运行数据，为算法研发和系统测试提供数据支撑。"));
children.push(bodyParagraphWithBoldPrefix("合作保障：", "与高校、科研院所建立了长期稳定的合作关系，可联合开展关键技术攻关，共同推进项目研究。"));

// 七、经费预算
children.push(heading(1, "七、经费预算（按科目明细）"));
children.push(heading(2, "7.1 设备费：100万元"));
children.push(bodyParagraph("主要用于购置必要的硬件设备，包括：高性能计算服务器2台（40万元）、存储设备1套（20万元）、测试终端设备（20万元）、其他辅助设备（20万元）。"));

children.push(heading(2, "7.2 材料费：50万元"));
children.push(bodyParagraph("主要用于数据采集、传输、存储等相关材料，包括：数据采集设备（15万元）、数据传输服务（20万元）、耗材及易耗品（15万元）。"));

children.push(heading(2, "7.3 测试化验加工费：80万元"));
children.push(bodyParagraph("主要用于系统测试和验证，包括：第三方测试服务（40万元）、现场试验费用（30万元）、样机加工制造（10万元）。"));

children.push(heading(2, "7.4 差旅费：40万元"));
children.push(bodyParagraph("主要用于调研、现场测试、学术交流等，包括：调研差旅费（20万元）、现场测试差旅费（10万元）、学术交流差旅费（10万元）。"));

children.push(heading(2, "7.5 会议费：30万元"));
children.push(bodyParagraph("主要用于项目研讨会、技术评审会等，包括：项目启动会及中期检查会议（10万元）、技术研讨会（10万元）、验收会议（10万元）。"));

children.push(heading(2, "7.6 合作与交流费：20万元"));
children.push(bodyParagraph("主要用于与合作单位的技术交流，包括：合作单位技术咨询费（10万元）、联合实验费（10万元）。"));

children.push(heading(2, "7.7 出版/文献/信息传播/知识产权事务费：30万元"));
children.push(bodyParagraph("主要用于论文发表、专利申请、文献检索等，包括：论文版面费（10万元）、专利申请费（10万元）、文献检索及资料费（5万元）、知识产权事务费（5万元）。"));

children.push(heading(2, "7.8 劳务费：100万元"));
children.push(bodyParagraph("主要用于研究生和临时人员的劳务费用，包括：研究生助研津贴（60万元）、临时人员劳务费（40万元）。"));

children.push(heading(2, "7.9 专家咨询费：30万元"));
children.push(bodyParagraph("主要用于技术咨询和指导，包括：技术咨询会议费用（15万元）、技术评审费用（15万元）。"));

children.push(heading(2, "7.10 其他费用：20万元"));
children.push(bodyParagraph("主要用于其他必要的支出，包括：办公费（5万元）、培训费（5万元）、验收审计费（10万元）。"));

children.push(bodyParagraphWithBoldPrefix("经费总计：", "500万元"));

// 八、风险分析与应对措施
children.push(heading(1, "八、风险分析与应对措施"));
children.push(heading(2, "8.1 技术风险分析与应对"));
children.push(bodyParagraphWithBoldPrefix("风险描述：", "核心技术（如多源数据融合、高精度预测等）的研发可能面临技术瓶颈，导致预期指标难以达成。风险等级：中。"));
children.push(bodyParagraphWithBoldPrefix("应对措施：", "制定多技术路线备选方案，当主技术路线遇到困难时，及时切换备选方案；加强与国内外先进研究机构的交流合作，及时跟踪技术发展动态；分阶段验证关键技术，降低技术集成风险；预留充足的技术攻关时间，保障关键难点突破。"));

children.push(heading(2, "8.2 管理风险分析与应对"));
children.push(bodyParagraphWithBoldPrefix("风险描述：", "项目组织管理不当可能导致进度延期、成本超支、质量不达标等问题。风险等级：中。"));
children.push(bodyParagraphWithBoldPrefix("应对措施：", "建立完善的项目管理制度，明确各参与方的责任与分工；制定详细的项目计划，定期检查进度，及时调整偏差；建立质量管控机制，分阶段开展技术评审与验收；加强团队建设与沟通，营造良好的协作氛围。"));

children.push(heading(2, "8.3 市场风险分析与应对"));
children.push(bodyParagraphWithBoldPrefix("风险描述：", "技术成果可能面临市场接受度不高、推广应用困难等问题。风险等级：中。"));
children.push(bodyParagraphWithBoldPrefix("应对措施：", "加强用户需求调研，确保研究内容贴合实际需求；邀请电网公司专家全程参与项目，提供指导；尽早开展原型验证与试点应用，及时发现并解决问题；制定推广应用计划，明确推广路径与保障措施。"));

children.push(heading(2, "8.4 其他风险分析与应对"));
children.push(bodyParagraphWithBoldPrefix("数据风险：", "数据获取不充分或数据质量不高可能影响算法研发与系统性能。应对措施：提前与数据提供方签订合作协议，保障数据供给；建立数据质量评估与治理机制，确保数据质量；构建仿真数据生成方法，在实际数据不足时提供补充；采用数据脱敏与隐私保护技术，确保数据安全合规。"));

// ————— 构建文档 —————
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
    children: children,
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  const timestamp = Date.now();
  const outputPath = `科技项目申报书_${timestamp}.docx`;
  fs.writeFileSync(outputPath, buffer);
  console.log("✅ Word申报书生成成功：", outputPath);
  console.log("📝 提示：打开Word后请按 Ctrl+A → F9 刷新目录");
}).catch((err) => {
  console.error("❌ Word申报书生成失败：", err);
});

