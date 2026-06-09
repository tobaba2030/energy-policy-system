/**
 * 生成详细评审意见Word文档
 */
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel, PageBreak, BorderStyle, WidthType, ShadingType } = require("docx");
const fs = require("fs");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };

async function main() {
  const children = [];
  
  // 封面
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 480 }, children: [new TextRun({ text: "电网科技项目研究报告", font: FONT, bold: true, size: 44 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "详细评审意见书", font: FONT, bold: true, size: 44 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 1200 }, children: [new TextRun({ text: "考虑多元市场化及资源禀赋特征的电力交易关键技术研究与应用", font: FONT, bold: true, size: 32 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审日期：2026年5月13日", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审依据：电网领域科技项目研究报告评审标准", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ children: [new PageBreak()] }));
  
  // 报告1详细评审
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "报告1详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.1 理论创新性（评分：70分，合格）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【严重问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '1. 第2章NLP/BERT方法仅描述了"怎么做"，未说明"为什么这样做"', font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '2. 规则匹配算法的理论基础未阐述', font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '3. 4A评估模型的权重确定方法未说明', font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '4. TFN-AHP方法中三角模糊数的构造依据缺失', font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.2 技术前瞻性（评分：65分，基本合格）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【严重问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '1. 未分析全国统一电力市场建设对路径设计的影响', font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '2. 未对比国际先进电力市场（如PJM、EPEX）的交易品种设计', font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '3. 广东省份案例的代表性论证不足', font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: '4. 缺乏对未来市场发展趋势的定量预测', font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.3 研究深度（评分：68分，基本合格）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【严重问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 仅分析广东省，其他三省分析深度不足", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 关键结论缺乏数据支撑，如"提高交易效率15%"的依据缺失", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 各省电力市场规则差异的定量分析不足", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.4 逐条改进建议", font: FONT, bold: true, size: 28 })] }));
  
  const suggestions1 = [
    "【理论创新】增加理论创新章节，明确提出3-5个创新点，每个创新点需包含：①创新内容②创新依据③与现有方法的差异对比",
    "【理论创新】补充数学模型推导：TFN-AHP的三角模糊数构造、TOPSIS的贴近度计算等需给出完整推导过程",
    "【技术前瞻】增加国内外对标分析：选取2-3个国际先进案例（建议PJM电力市场、欧洲EPEX电力市场），从市场规模、交易品种、准入机制等维度进行对比",
    "【技术前瞻】补充政策敏感性分析：分析全国统一电力市场建设、新能源渗透率提升等趋势对路径设计的影响",
    "【逻辑结构】增加文献综述章节：系统梳理电力市场规则提取、多元资源聚合交易等领域的研究现状，指出现有研究的不足",
    "【逻辑结构】统一评价标准：第5章各省路径设计需采用统一的评价指标体系，便于横向对比",
    "【研究深度】深化案例分析：各省案例需包含：①市场概况②资源禀赋特征③交易路径④效益预测，数据需有来源说明",
    "【研究深度】补充敏感性分析：对市场规则变化、资源禀赋波动等关键因素进行敏感性分析",
    "【表述规范】规范图表格式：所有图表需有明确标题、坐标轴标签、图例说明，表格需有表头",
    "【表述规范】统一术语使用：建立全文术语表，确保同一术语在全文中使用一致"
  ];
  
  suggestions1.forEach((s, i) => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: `${i+1}. ${s}`, font: FONT, size: 22 })] }));
  });
  
  // 报告2详细评审
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "报告2详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.1 理论创新性（评分：72分，合格）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【严重问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 商业模式研究缺乏理论框架支撑，未构建新的理论模型", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. "多元市场需求"的界定不够清晰，创新边界模糊", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 商业模式画布、价值链分析等方法为通用方法，缺乏电力交易领域特色", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.2 研究深度（评分：70分，合格）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【严重问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 商业模式案例分析深度不足，缺乏可操作性", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 商业模式的效益预测缺乏定量数据支撑", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 商业模式的风险分析过于简略", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.3 逐条改进建议", font: FONT, bold: true, size: 28 })] }));
  
  const suggestions2 = [
    "【理论创新】构建电力交易商业模式理论框架：借鉴商业模式画布、服务生态系统等理论，构建适用于电力交易领域的商业模式分析框架",
    "【理论创新】明确"多元市场需求"定义：从市场规模、需求类型、用户特征等维度对"多元市场需求"进行量化界定",
    "【技术前瞻】补充行业对标分析：选取3-5家国内外典型电力交易主体的商业模式进行对标分析",
    "【技术前瞻】分析技术驱动力：明确大数据、人工智能、区块链等技术对商业模式的驱动作用",
    "【逻辑结构】完善商业模式设计框架：采用Osterwalder商业模式画布方法，完整呈现9个构造块",
    "【逻辑结构】明确商业模式层次：区分战略层（定位、价值主张）、战术层（渠道、客户关系）、操作层（关键业务、核心资源）",
    "【研究深度】深化案例分析：每个商业模式需包含完整的画布分析、SWOT分析、实施路径、效益预测",
    "【研究深度】补充财务分析：包括投资估算，成本结构、收入预测，投资回收期等财务指标",
    "【研究深度】完善风险分析：从政策风险、市场风险、技术风险、运营风险等维度进行系统分析",
    "【表述规范】增加专业图表：包括商业模式画布、价值链图、商业模式演进路线图等"
  ];
  
  suggestions2.forEach((s, i) => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: `${i+1}. ${s}`, font: FONT, size: 22 })] }));
  });
  
  // 报告3详细评审
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "报告3详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.1 理论创新性（评分：78分，良好）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【中等问题】", font: FONT, bold: true, size: 24, color: "FF8C00" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 4A评估模型与其他负荷评估模型（如EPA、OpenADR）的对比分析缺失", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. K-Means聚类中k值选择方法（手肘法/轮廓系数）未详细说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 负荷特性指标的选取依据不够充分", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.2 研究深度（评分：76分，合格）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【严重问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 负荷样本数据的采集时间跨度、样本量、来源未明确说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 协同优化方法仅在单一场景下验证，缺乏多场景对比", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 工业、商业、居民负荷的分类标准未明确说明", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.3 逐条改进建议", font: FONT, bold: true, size: 28 })] }));
  
  const suggestions3 = [
    "【理论创新】深化4A评估模型的理论基础：与现有负荷评估模型（如OpenADR、SEP2.0）进行系统对比，明确4A模型的优势和创新点",
    "【理论创新】补充K-Means聚类的详细过程：包括k值选择的完整对比分析（k=2~10的SSE和轮廓系数对比表）",
    "【理论创新】说明负荷特性指标的选取依据：借鉴IEC 61850、IEEE 1547等国际标准，明确指标选取的理论基础",
    "【技术前瞻】增加前沿技术对标：分析深度学习、知识图谱等技术在负荷特性分析中的应用潜力，与本方法进行对比",
    "【技术前瞻】补充与主流系统对比：选取AutoGrid、Uplight、泰豪等典型负荷管理系统，从技术架构、功能模块、性能指标等维度进行对比",
    "【逻辑结构】增加技术路线图：以流程图形式呈现"负荷特性分析→指标体系构建→协同优化→路径设计"的完整技术路线",
    "【研究深度】完善数据说明：明确负荷样本数据的采集时间跨度、样本量、采集设备型号、数据来源，并对样本代表性进行论证",
    "【研究深度】增加多场景验证：至少在工业负荷、商业负荷、居民负荷三类场景下分别验证协同优化方法的有效性",
    "【研究深度】深化案例分析：选取2-3个典型用户案例，详细分析负荷特性、协同优化效果、经济社会效益",
    "【表述规范】规范图表格式：所有图表需有明确标题、坐标轴标签、单位，表格需有表头和数据来源说明"
  ];
  
  suggestions3.forEach((s, i) => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: `${i+1}. ${s}`, font: FONT, size: 22 })] }));
  });
  
  // 报告4详细评审
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "报告4详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.1 理论创新性（评分：85分，良好）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【轻微问题】", font: FONT, bold: true, size: 24, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. TFN-AHP方法中三角模糊数的构造方法未详细说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 与现有市场交易品种选择方法的对比分析可以更深入", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.2 研究深度（评分：78分，良好）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【中等问题】", font: FONT, bold: true, size: 24, color: "FF8C00" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 市场交易品种选择的案例验证仅基于某省数据，缺乏多省份对比", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 各品种的效益预测缺乏定量计算模型", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 对市场规则变化的敏感性分析不足", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.3 逐条改进建议", font: FONT, bold: true, size: 28 })] }));
  
  const suggestions4 = [
    "【理论创新】深化TFN-AHP方法的理论说明：详细阐述三角模糊数的构造方法、专家打分的一致性检验方法",
    "【理论创新】增加优化模型的敏感性分析：对权重系数、阈值参数等进行敏感性分析，验证模型的稳健性",
    "【理论创新】补充与其他方法的对比实验：与AHP+TOPSIS、熵权法+TOPSIS、理想点法等方法进行对比实验",
    "【技术前瞻】增加容量市场和灵活性市场的分析：作为前瞻性内容，分析这两类新品种的设计要点和实施条件",
    "【技术前瞻】量化国际对标分析：从品种数量、交易规模、流动性等维度对PJM、EPEX等进行量化对比",
    "【研究深度】增加多省份案例验证：至少在3个不同市场发育程度的省份进行案例验证",
    "【研究深度】完善效益测算模型：建立各品种的效益测算模型，包括直接经济效益、社会效益、风险成本等",
    "【研究深度】补充实施风险分析：从政策风险、市场风险、技术风险等维度分析品种选择的实施风险",
    "【表述规范】规范公式推导：对关键公式补充完整的推导过程，特别是TOPSIS贴近度计算和灰色关联分析",
    "【表述规范】提高图表分辨率：确保所有图表清晰可读，特别是优化模型流程图和结果对比图"
  ];
  
  suggestions4.forEach((s, i) => {
    children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: `${i+1}. ${s}`, font: FONT, size: 22 })] }));
  });
  
  // 综合结论
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "综合结论", font: FONT, bold: true, size: 30 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.1 各报告综合评分", font: FONT, bold: true, size: 28 })] }));
  
  const finalScoreRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "理论创新", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "技术前瞻", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "研究深度", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "总分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "结论", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "报告1", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "65分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "68分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "有条件通过", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "报告2", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "72分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "69分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "有条件通过", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "报告3", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "72分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "76分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "77分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "建议通过", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "报告4", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "建议通过", font: FONT, size: 19 })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [2500, 1200, 1200, 1200, 1200, 1006], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: finalScoreRows }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.2 评审结论", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【报告1】有条件通过：必须按照10条必改项进行修改后重新提交", font: FONT, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【报告2】有条件通过：必须按照10条必改项进行修改后重新提交", font: FONT, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【报告3】建议通过：建议按照10条建议项进行完善后可进入下一阶段", font: FONT, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【报告4】建议通过：建议按照10条建议项进行完善后可进入下一阶段", font: FONT, size: 22, color: "008000" })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.3 项目整体评价", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "整体评价：4份报告整体质量处于合格至良好水平，未达到优秀标准。", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "主要差距：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性普遍不足，缺乏原创性贡献", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 研究深度有待加强，特别是案例分析和数据支撑", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 与国际前沿技术的对标分析普遍缺失", font: FONT, size: 22 })] }));
  
  // 创建文档
  const doc = new Document({
    features: { updateFields: true },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 } } }, children }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("c:\\AI学习资料\\mesheer\\4份报告详细评审意见书.docx", buffer);
  console.log("详细评审意见书已生成: c:\\AI学习资料\\mesheer\\4份报告详细评审意见书.docx");
}

main().catch(err => {
  console.error("生成失败:", err);
});
