/**
 * 简单可靠的Word文档生成器
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
  
  // 评分表格
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表1 各报告综合评分", font: FONT, bold: true, size: 21 })] }));
  
  const scoreRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "综合评分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审结论", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "合格", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "有条件通过", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "69分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "基本合格", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "有条件通过", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "77分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "建议通过", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "建议通过", font: FONT, size: 21 })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [3000, 1500, 1500, 2306], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: scoreRows }));
  
  // 报告1问题清单
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "二、报告1详细评审意见", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.1 主要问题", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性不足：第2章NLP/BERT方法仅描述了做法，未说明理论基础", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 规则匹配算法的理论基础未阐述，4A评估模型的权重确定方法未说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 未分析全国统一电力市场建设对路径设计的影响", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 仅分析广东省，其他三省分析深度不足，关键结论缺乏数据支撑", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "2.2 改进建议", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 增加理论创新章节，明确提出3-5个创新点，每个创新点需包含创新内容、创新依据、与现有方法的差异对比", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 补充数学模型推导：TFN-AHP的三角模糊数构造、TOPSIS的贴近度计算等需给出完整推导过程", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 增加国内外对标分析：选取PJM电力市场、欧洲EPEX电力市场进行对比", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 深化案例分析：各省案例需包含市场概况、资源禀赋特征、交易路径、效益预测，数据需有来源说明", font: FONT, size: 22 })] }));
  
  // 报告2问题清单
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "三、报告2详细评审意见", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.1 主要问题", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 商业模式研究缺乏理论框架支撑，未构建新的理论模型", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 多元市场需求的界定不够清晰，创新边界模糊", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 商业模式案例分析深度不足，缺乏可操作性", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 商业模式的效益预测缺乏定量数据支撑，风险分析过于简略", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "3.2 改进建议", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 构建电力交易商业模式理论框架：借鉴商业模式画布、服务生态系统等理论", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 明确多元市场需求定义：从市场规模、需求类型、用户特征等维度进行量化界定", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 补充财务分析：包括投资估算、成本结构、收入预测、投资回收期等财务指标", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 完善风险分析：从政策风险、市场风险、技术风险、运营风险等维度进行系统分析", font: FONT, size: 22 })] }));
  
  // 报告3问题清单
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "四、报告3详细评审意见", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.1 主要问题", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 4A评估模型与其他负荷评估模型的对比分析缺失", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. K-Means聚类中k值选择方法未详细说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 负荷样本数据的采集时间跨度、样本量、来源未明确说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 协同优化方法仅在单一场景下验证，缺乏多场景对比", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.2 改进建议", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 深化4A评估模型的理论基础：与现有负荷评估模型进行系统对比", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 补充K-Means聚类的详细过程：包括k值选择的完整对比分析", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 完善数据说明：明确负荷样本数据的采集时间跨度、样本量、数据来源", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 增加多场景验证：至少在工业负荷、商业负荷、居民负荷三类场景下分别验证", font: FONT, size: 22 })] }));
  
  // 报告4问题清单
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "五、报告4详细评审意见", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "报告名称：课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.1 主要问题", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. TFN-AHP方法中三角模糊数的构造方法未详细说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 市场交易品种选择的案例验证仅基于某省数据，缺乏多省份对比", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 各品种的效益预测缺乏定量计算模型", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 对市场规则变化的敏感性分析不足", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.2 改进建议", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 深化TFN-AHP方法的理论说明：详细阐述三角模糊数的构造方法", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 增加优化模型的敏感性分析：对权重系数、阈值参数等进行敏感性分析", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 增加多省份案例验证：至少在3个不同市场发育程度的省份进行案例验证", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 完善效益测算模型：建立各品种的效益测算模型，包括直接经济效益、社会效益", font: FONT, size: 22 })] }));
  
  // 创建文档
  const doc = new Document({
    features: { updateFields: true },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 } } }, children }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("c:\\AI学习资料\\mesheer\\详细评审意见书.docx", buffer);
  console.log("Word文档已生成: c:\\AI学习资料\\mesheer\\详细评审意见书.docx");
}

main().catch(err => {
  console.error("生成失败:", err);
});
