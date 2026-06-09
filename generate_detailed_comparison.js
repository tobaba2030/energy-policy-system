/**
 * 4份报告对比分析Word文档 - 详细评审版
 */
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, HeadingLevel, PageBreak, BorderStyle, WidthType, ShadingType } = require("docx");
const fs = require("fs");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };

async function main() {
  const children = [];
  
  // 封面
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 3600, after: 480 }, children: [new TextRun({ text: "电网科技项目研究报告", font: FONT, bold: true, size: 44 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "对比分析报告", font: FONT, bold: true, size: 44 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 2400, after: 1200 }, children: [new TextRun({ text: "考虑多元市场化及资源禀赋特征的电力交易关键技术研究与应用", font: FONT, bold: true, size: 32 })] }));
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审日期：2026年5月14日", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ children: [new PageBreak()] }));
  
  // 概述
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "一、概述", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "本报告对研究报告文件夹中的4份报告进行了综合评审和对比分析，从理论创新性、技术前瞻性、逻辑结构、表述规范性、研究价值五个维度进行评价。本次评审严格按照科技项目研究报告评审要求，详细指出每份报告存在的具体问题，并提供针对性的改进建议。", font: FONT, size: 24 })] }));
  
  // 报告清单表格
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.1 报告清单", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表1 报告基本信息", font: FONT, bold: true, size: 21 })] }));
  
  const infoRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 800, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "序号", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "文件大小", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "660 KB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "合格", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.33 MB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4.41 MB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 800, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "14.26 MB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优秀", font: FONT, size: 21, bold: true })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [800, 4000, 1200, 1306], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: infoRows }));
  
  // 五维评分对比表
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "二、五维评分对比", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表2 五维评分对比表", font: FONT, bold: true, size: 21 })] }));
  
  const scoreRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 2300, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审维度", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告1", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告2", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告3", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告4", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "理论创新性（25%）", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "92分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "技术前瞻性（20%）", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "65分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "82分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "72分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "逻辑结构（20%）", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "68分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "82分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "95分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "表述规范性（15%）", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "65分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2300, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "研究价值（20%）", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "68分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "76分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1506, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2300, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "加权总分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "77分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1506, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [2300, 1500, 1500, 1500, 1506], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: scoreRows }));
  
  // 排名分析
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "三、排名分析", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表3 综合排名", font: FONT, bold: true, size: 21 })] }));
  
  const rankRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "排名", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "总分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "FFD700", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优秀", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "C0C0C0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "77分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "CD7F32", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "70分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "合格", font: FONT, size: 21 })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [1000, 4306, 1500, 1500], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: rankRows }));
  
  // 各报告详细分析
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "四、各报告详细分析", font: FONT, bold: true, size: 30 })] }));
  
  // 报告1
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.1 任务1报告1（第4名，70分，合格）", font: FONT, bold: true, size: 28 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• NLP/BERT方法仅描述做法，未说明理论基础", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 未明确提出本报告的3-5个核心创新点", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 缺乏数学模型推导和公式说明", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 研究深度方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 仅重点分析广东省，其他三省（云南、贵州、广西）分析深度不足", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 关键结论缺乏具体数据支撑", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 敏感性分析和鲁棒性验证缺失", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 表述规范性方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 图表数量较少，专业图表不足", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 参考文献标注不规范", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24, color: "008000" })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 增加理论创新章节，明确3-5个创新点，补充数学模型推导", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 深化云南省、贵州省、广西壮族自治区的案例分析，增加数据支撑", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 增加敏感性分析和多场景验证", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 补充专业图表（如技术路线图、流程图、对比分析图）", font: FONT, size: 22 })] }));
  
  // 报告2
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.2 任务1报告2（第3名，75分，良好）", font: FONT, bold: true, size: 28 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 研究价值最高（88分），商业模式设计具有较高应用价值", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 技术前瞻性良好（82分），准确把握市场需求方向", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 理论创新性较好（85分），定性分析较为完整", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 缺乏电力交易商业模式的理论框架构建", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 未构建数学模型支撑商业模式设计", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 逻辑结构方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 章节之间逻辑衔接不够紧密", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 技术路线图不清晰", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 表述规范性方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 专业图表数量不足，可视化效果有待提升", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 风险分析方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 风险识别不全面，应对措施不够具体", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24, color: "008000" })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 构建电力交易商业模式理论框架，补充数学模型", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 完善风险分析章节，增加具体风险应对措施", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 增加专业图表（商业模式架构图、流程图、对比分析图）", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "4. 优化章节逻辑，绘制清晰的技术路线图", font: FONT, size: 22 })] }));
  
  // 报告3
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.3 任务2报告3（第2名，77分，良好）", font: FONT, bold: true, size: 28 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性较强（78分），负荷特性分析方法有新意", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 逻辑结构优秀（82分），技术路线清晰", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 文件大小适中，内容充实", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要问题】", font: FONT, bold: true, size: 24, color: "FF0000" })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 理论创新性方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 4A评估模型的理论基础说明不够深入", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• K-Means聚类方法的详细过程说明不足", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 研究深度方面：", font: FONT, bold: true, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 多场景验证不足", font: FONT, size: 21 })] }));
  children.push(new Paragraph({ indent: { firstLine: 720 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 敏感性分析缺失", font: FONT, size: 21 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24, color: "008000" })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 深化4A评估模型的理论基础说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 补充K-Means聚类详细过程和参数说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 增加多场景验证和敏感性分析", font: FONT, size: 22 })] }));
  
  // 报告4
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.4 课题3报告4（第1名，83分，优秀）", font: FONT, bold: true, size: 28 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【主要优点】", font: FONT, bold: true, size: 24, color: "008000" })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 版本迭代完善（V2.0），内容最完整", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 理论创新性强（92分），逻辑结构优秀（95分）", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 表述规范性优秀（90分），图表丰富", font: FONT, size: 22 })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【改进建议】", font: FONT, bold: true, size: 24, color: "FF8C00" })] }));
  
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "1. 深化TFN-AHP方法的理论说明", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "2. 增加敏感性分析", font: FONT, size: 22 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "3. 增加多省份案例验证", font: FONT, size: 22 })] }));
  
  // 综合结论
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "五、综合结论", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.1 总体评价", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "4份报告整体质量较高，3份达到良好及以上水平，1份达到合格水平。报告4表现最为突出，综合评分达到83分（优秀），建议优先推进。各报告均有改进空间，建议按照上述针对性意见进行修改完善。", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.2 推荐优先级", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表4 推荐优先级", font: FONT, bold: true, size: 21 })] }));
  
  const priorityRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优先级", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 3500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 3606, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "理由", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "高", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "综合评分最高，内容最完整，理论创新性强", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFE699", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "中高", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "理论创新性强，逻辑结构优秀", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "FFE699", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "中", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "研究价值高，商业模式设计出色", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1200, type: WidthType.DXA }, shading: { fill: "F4B084", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "低", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 3500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 3606, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "需增加理论创新和案例分析", font: FONT, size: 19 })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [1200, 3500, 3606], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: priorityRows }));
  
  // 创建文档
  const doc = new Document({
    features: { updateFields: true },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 } } }, children }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("c:\\AI学习资料\\mesheer\\4份报告对比分析报告_详细评审版.docx", buffer);
  console.log("Word文档已生成: c:\\AI学习资料\\mesheer\\4份报告对比分析报告_详细评审版.docx");
}

main().catch(err => {
  console.error("生成失败:", err);
});
