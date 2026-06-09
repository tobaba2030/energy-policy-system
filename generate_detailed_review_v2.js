/**
 * 生成详细评审报告 - 严格科技项目评审标准
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
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审日期：2026年5月14日", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ children: [new PageBreak()] }));
  
  // 综合结论
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "一、综合评审结论", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表1 综合评审结果汇总表", font: FONT, bold: true, size: 21 })] }));
  
  const resultRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "总分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 2906, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审结论", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 17 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "合格", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2906, type: WidthType.DXA }, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "有条件通过，需修改后重新提交", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 17 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2906, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "建议通过，需完善后进入下一阶段", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 17 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "77分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2906, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "建议通过，需完善后进入下一阶段", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 17 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优秀", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2906, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "建议通过，优先推进", font: FONT, size: 19 })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [3000, 1200, 1200, 2906], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: resultRows }));
  
  // 报告1详细评审
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "二、任务1报告1详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "报告名称：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.1 理论创新性评审（70分）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要问题（10条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 创新点提炼不足：全文未明确提炼出3-5个核心创新点，创新边界模糊", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 理论基础缺失：NLP+BERT方法仅描述了\"怎么做\"，未说明\"为什么这么做\"，缺少理论依据", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 方法创新不足：规则匹配+K-Means+TOPSIS为已有方法的简单组合，原创性不足", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 4A评估模型权重确定方法未说明：权重是如何确定的？专家打分？层次分析法？数据来源不明确", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. TFN-AHP三角模糊数构造依据缺失：三角模糊数的上下限是如何确定的？缺少说明", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 缺少文献综述：未系统梳理电力市场规则提取、多元资源聚合交易等领域的研究现状", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 缺少研究空白分析：未指出现有研究的不足和本研究的补白作用", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 缺少理论假设：未说明研究的理论假设前提，影响研究的科学性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "9. 缺少方法对比：未与其他方法（如随机森林、SVM等）进行对比，无法体现本方法的优势", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "10. 缺少数学模型推导：优化模型的推导过程缺失，公式编号不规范", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.2 技术前瞻性评审（65分）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要问题（8条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 未分析全国统一电力市场建设对路径设计的影响：政策敏感性分析缺失", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 未对比国际先进电力市场（如PJM、EPEX）的交易品种设计：缺少国际对标", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 广东省份案例的代表性论证不足：为什么选择广东省？未说明其代表性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 缺少对未来技术发展趋势的展望：如区块链在电力交易中的应用前景", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 缺少政策分析：未分析国家\"双碳\"政策、电力体制改革政策对研究的影响", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 缺少技术路线图：未给出技术发展的时间节点和里程碑", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 缺少技术风险分析：未分析技术迭代、政策变化等风险", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 缺少技术经济性分析：未分析技术成本与收益的关系", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.3 研究深度评审（68分）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要问题（10条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 仅分析广东省，其他三省（浙江、山东、广西）分析深度不足，篇幅过小", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 关键结论缺乏数据支撑：如\"提高交易效率15%\"的数据来源和计算方法未说明", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 各省电力市场规则差异的定量分析不足：差异分析过于定性，缺少量化指标", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 缺少敏感性分析：关键参数变化对结果的影响未分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 缺少案例验证：未选取具体企业案例验证路径设计的可行性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 资源禀赋特征分析不够深入：各省的资源禀赋特征（如新能源装机占比、负荷特性）分析较浅", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 市场主体分析不足：未充分分析各市场主体的利益诉求和行为特征", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 交易机制分析不深入：各省交易机制的具体差异分析不够", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "9. 效益分析不完整：仅分析了直接效益，未分析间接效益和社会效益", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "10. 实施保障措施缺失：未说明路径实施的组织保障、资金保障等措施", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.4 改进建议（28条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【理论创新性改进（10条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 增加\"理论创新\"章节，明确提炼出3-5个核心创新点，每个创新点需说明：创新内容、创新依据、与现有方法的差异对比、创新价值", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 补充理论基础分析：详细说明NLP+BERT方法为什么适合电力市场规则提取，其理论依据是什么", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 说明4A评估模型权重确定方法：详细说明权重是如何确定的，是专家打分？层次分析法？数据来源要明确", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 补充TFN-AHP三角模糊数构造依据：详细说明三角模糊数的上下限是如何确定的，数据来源要明确", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 增加\"文献综述\"章节：系统梳理电力市场规则提取、多元资源聚合交易等领域的研究现状，至少引用30篇以上高质量文献", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 增加\"研究空白分析\"：指出现有研究的不足和本研究的补白作用，明确研究价值", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 说明理论假设：明确说明研究的理论假设前提，增加研究的科学性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 增加方法对比实验：与随机森林、SVM等其他方法进行对比，验证本方法的优势", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "9. 补充数学模型推导：详细推导优化模型，规范公式编号", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "10. 增加理论贡献分析：明确说明本研究在理论上的贡献和突破", font: FONT, size: 20 })] }));
  
  // 报告2详细评审
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "三、任务1报告2详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "报告名称：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.1 主要优点（4条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 研究价值高（88分）：商业模式设计具有较高应用价值和指导意义", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 技术前瞻性良好（82分）：准确把握市场需求趋势", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 理论创新性较好（85分）：商业模式设计有新意", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 效益预测定性分析较为完整：因数据限制，不作定量要求", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.2 主要问题（15条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【理论创新性（4条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 商业模式研究缺乏理论框架支撑：未构建新的理论模型", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. \"多元市场需求\"的界定不够清晰：创新边界模糊", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 商业模式画布、价值链分析等方法为通用方法：缺乏电力交易领域特色", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 缺少文献综述：未系统梳理电力交易商业模式研究现状", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【逻辑结构（3条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 缺少商业模式设计的方法论章节：未说明设计思路和方法", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 各业务模式的定位、目标市场、价值主张区分不够清晰", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 商业模式创新与现有业务的协同关系分析不足", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【研究深度（8条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 商业模式案例分析深度不足，缺乏可操作性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "9. 商业模式画布的9个构造块未完整呈现", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "10. 价值链分析图缺失", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "11. 商业模式的风险分析过于简略", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "12. 商业模式的可复制性分析不足", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "13. 商业模式的实施路径时间节点不明确", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "14. 商业模式的市场竞争分析不足", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "15. 商业模式的SWOT分析缺失", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.3 改进建议（20条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【理论创新性改进（4条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 构建电力交易商业模式理论框架：借鉴商业模式画布、服务生态系统等理论，构建适用于电力交易领域的商业模式分析框架", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 明确\"多元市场需求\"定义：从市场规模、需求类型、用户特征等维度进行量化界定", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 增加行业对标分析：选取3-5家国内外典型电力交易主体的商业模式进行对标分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 增加文献综述：系统梳理电力交易商业模式研究现状，至少引用25篇以上高质量文献", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【逻辑结构改进（3条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 增加\"商业模式设计方法论\"章节：说明设计思路和方法", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 明确各业务模式的定位、目标市场、价值主张", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 分析商业模式创新与现有业务的协同关系", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【研究深度改进（13条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 深化案例分析：每个商业模式需包含完整的画布分析、SWOT分析、实施路径", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "9. 完整呈现商业模式画布的9个构造块", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "10. 补充价值链分析图", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "11. 完善风险分析：从政策风险、市场风险、技术风险、运营风险等维度进行系统分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "12. 分析商业模式的可复制性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "13. 明确商业模式实施路径的时间节点和里程碑", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "14. 增加市场竞争分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "15. 增加商业模式SWOT分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "16. 增加商业模式演进路线图", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "17. 增加技术驱动力分析：明确大数据、人工智能、区块链等技术对商业模式的驱动作用", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "18. 增加实施保障措施：组织保障、资金保障、人才保障等", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "19. 增加KPI指标：商业模式实施效果的评估指标", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "20. 增加典型企业案例：选取2-3个典型企业案例进行深入分析", font: FONT, size: 20 })] }));
  
  // 报告3详细评审
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "四、任务2报告3详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "报告名称：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.1 主要优点（3条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性较强（78分）：负荷特性分析方法有新意", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 逻辑结构优秀（82分）：技术路线清晰", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 文件大小适中，内容充实", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.2 主要问题（12条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【理论创新性（4条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 4A评估模型与其他负荷评估模型（如EPA、OpenADR）的对比分析缺失", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. K-Means聚类中k值选择方法未详细说明（手肘法/轮廓系数的对比分析缺失）", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 负荷特性指标的选取依据不够充分：未引用IEC 61850、IEEE 1547等国际标准", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 缺少文献综述：未系统梳理负荷特性分析研究现状", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【研究深度（8条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 负荷样本数据的采集时间跨度、样本量、来源未明确说明", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 协同优化方法仅在单一场景下验证，缺乏多场景对比", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 工业、商业、居民负荷的分类标准未明确说明", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 缺少敏感性分析：关键参数变化对结果的影响未分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "9. 缺少典型用户案例：未选取典型用户进行深入分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "10. 负荷特性分析不够深入：负荷曲线、负荷率、峰谷差等指标分析较浅", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "11. 优化模型验证不够充分：缺少不同场景下的验证", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "12. 缺少实施效果评估指标：未说明如何评估协同优化效果", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.3 改进建议（18条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【理论创新性改进（4条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 深化4A评估模型的理论基础：与现有负荷评估模型（如OpenADR、SEP2.0）进行系统对比，明确4A模型的优势和创新点", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 补充K-Means聚类的详细过程：包括k值选择的完整对比分析（k=2~10的SSE和轮廓系数对比表）", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 说明负荷特性指标的选取依据：借鉴IEC 61850、IEEE 1547等国际标准，明确指标选取的理论依据", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 增加文献综述：系统梳理负荷特性分析研究现状，至少引用30篇以上高质量文献", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【技术前瞻性改进（3条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 增加前沿技术对标：分析深度学习、知识图谱等技术在负荷特性分析中的应用潜力，与本方法进行对比", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 补充与主流系统对比：选取AutoGrid、Uplight、泰豪等典型负荷管理系统，从技术架构、功能模块、性能指标等维度进行对比", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 增加技术路线图：以流程图形式呈现\"负荷特性分析→指标体系构建→协同优化→路径设计\"的完整技术路线", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【研究深度改进（11条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 完善数据说明：明确负荷样本数据的采集时间跨度、样本量、采集设备型号、数据来源，并对样本代表性进行论证", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "9. 增加多场景验证：至少在工业负荷、商业负荷、居民负荷三类场景下分别验证协同优化方法的有效性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "10. 明确工业、商业、居民负荷的分类标准", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "11. 增加敏感性分析：对关键参数（如负荷弹性系数、电价等）进行敏感性分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "12. 增加典型用户案例：选取2-3个典型用户案例进行深入分析", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "13. 深化负荷特性分析：深入分析负荷曲线、负荷率、峰谷差等指标", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "14. 完善优化模型验证：在不同场景下进行充分验证", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "15. 增加实施效果评估指标：说明如何评估协同优化效果", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "16. 增加经济效益分析：分析协同优化带来的经济效益", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "17. 增加风险分析：分析技术风险、市场风险、政策风险等", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "18. 增加实施路径说明：明确技术实施的时间节点和里程碑", font: FONT, size: 20 })] }));
  
  // 报告4详细评审
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "五、课题3报告4详细评审", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "报告名称：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.1 主要优点（4条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性强（92分）：提出了新的优化选择模型", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 逻辑结构优秀（95分）：结构完整，层次清晰", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 表述规范性优秀（90分）：专业术语使用规范，图表丰富", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 版本迭代完善（V2.0）：说明经过多次优化迭代，内容最完整", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.2 主要问题（8条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【理论创新性（2条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. TFN-AHP方法中三角模糊数的构造方法未详细说明", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 与现有市场交易品种选择方法（如AHP+TOPSIS、熵权法+TOPSIS）的对比分析可以更深入", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【研究深度（6条）】", font: FONT, bold: true, size: 22, color: "FF0000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 市场交易品种选择的案例验证仅基于某省数据，缺乏多省份对比", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 各品种的效益预测缺乏定量计算模型", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 对市场规则变化的敏感性分析不足", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 优化模型的假设条件未明确列出", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "7. 部分公式推导可以更详细（如TOPSIS的贴近度计算）", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "8. 部分图表分辨率可提高", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.3 改进建议（14条）", font: FONT, bold: true, size: 26 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【理论创新性改进（3条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 深化TFN-AHP方法的理论说明：详细阐述三角模糊数的构造方法、专家打分的一致性检验方法", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 增加优化模型的敏感性分析：对权重系数、阈值参数等进行敏感性分析，验证模型的稳健性", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 补充与其他方法的对比实验：与AHP+TOPSIS、熵权法+TOPSIS、理想点法等方法进行对比实验", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【技术前瞻性改进（3条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 增加容量市场和灵活性市场的分析：作为前瞻性内容，分析这两类新品种的设计要点和实施条件", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "5. 量化国际对标分析：从品种数量、交易规模、流动性等维度对PJM、EPEX等进行量化对比", font: FONT, size: 20 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "6. 增加技术路线图：明确技术发展的时间节点和里程碑", font: FONT, size: 20 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【研究深度改进（8条）】", font: FONT, bold: true, size: 22, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "