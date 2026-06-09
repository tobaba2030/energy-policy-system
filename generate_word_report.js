/**
 * 生成4份报告对比分析Word文档
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
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审日期：2026年5月13日", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ children: [new PageBreak()] }));
  
  // 概述
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "一、概述", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "本报告对研究报告文件夹中的4份报告进行了综合评审和对比分析，从理论创新性、技术前瞻性、逻辑结构、表述规范性、研究价值五个维度进行评价。", font: FONT, size: 24 })] }));
  
  // 报告清单表格
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "1.1 报告清单", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表1 报告基本信息", font: FONT, bold: true, size: 21 })] }));
  
  const infoRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "序号", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "大小", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "660 KB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1.33 MB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4.41 MB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "14.26 MB", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, shading: { fill: "FFF2CC", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优秀", font: FONT, size: 21, bold: true })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [1000, 4500, 1500, 1306], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: infoRows }));
  
  // 五维评分对比表
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "二、五维评分对比", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表2 五维评分对比表", font: FONT, bold: true, size: 21 })] }));
  
  const scoreRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "评审维度(权重)", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告1", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告2", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告3", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1453, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告4", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "理论创新性(25%)", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1453, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "92分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "技术前瞻性(20%)", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "75分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "82分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1453, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "逻辑结构(20%)", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1453, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "95分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "表述规范性(20%)", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1453, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "研究价值(15%)", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "78分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, shading: { fill: "E2EFDA", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "88分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "82分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1453, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 2500, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: "加权总分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1451, type: WidthType.DXA }, shading: { fill: "F2F2F2", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1453, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90分", font: FONT, size: 21, bold: true })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [2500, 1451, 1451, 1451, 1453], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: scoreRows }));
  
  // 排名分析
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "三、排名分析", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表3 综合排名", font: FONT, bold: true, size: 21 })] }));
  
  const rankRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "排名", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告名称", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "总分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "等级", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "FFD700", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "1", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4：计及多市场需求的市场交易品种优化选择技术研究报告V2.0", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90分", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优秀", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "C0C0C0", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3：用户侧多元负荷特性分析及协同优化技术研究报告", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "85分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, shading: { fill: "CD7F32", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2：面向多元市场需求的电力交易业务商业模式研究", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "83分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1000, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "4", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1：适合公司发展的典型省份市场化交易路径设计", font: FONT, size: 19 })] })] }),
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "80分", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 1306, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "良好", font: FONT, size: 21 })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [1000, 4500, 1500, 1306], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: rankRows }));
  
  // 各报告详细分析
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "四、各报告详细分析", font: FONT, bold: true, size: 30 })] }));
  
  // 报告1
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.1 课题3报告4（第1名，90分，优秀）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "文件大小：14.26 MB，版本：V2.0", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【亮点】", font: FONT, bold: true, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 版本迭代完善，内容最完整", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 理论创新性强（92分），提出了新的优化选择模型", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 逻辑结构和表述规范性达到优秀水平", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 图表丰富，数据详实", font: FONT, size: 24 })] }));
  
  // 报告2
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.2 任务2报告3（第2名，85分，良好）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "文件大小：4.41 MB", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【亮点】", font: FONT, bold: true, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 理论创新性较强（88分），负荷特性分析方法有新意", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 逻辑结构优秀（90分），技术路线清晰", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 文件大小适中，内容充实", font: FONT, size: 24 })] }));
  
  // 报告3
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.3 任务1报告2（第3名，83分，良好）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "文件大小：1.33 MB", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【亮点】", font: FONT, bold: true, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 研究价值最高（88分），商业模式设计具有较高应用价值", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 技术前瞻性良好（82分），准确把握市场需求", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 理论创新性较好（85分），商业模式设计有新意", font: FONT, size: 24 })] }));
  
  // 报告4
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "4.4 任务1报告1（第4名，80分，良好）", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "文件大小：660 KB", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 240 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "【亮点】", font: FONT, bold: true, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 逻辑结构良好（85分），章节层次清晰", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 提出了NLP+BERT融合的电力市场规则提取方法", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 表述专业，使用了电网领域专业术语", font: FONT, size: 24 })] }));
  
  // 综合结论
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "五、综合结论", font: FONT, bold: true, size: 30 })] }));
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.1 总体评价", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun({ text: "4份报告整体质量较高，全部达到良好及以上水平。其中课题3报告4表现最为突出，综合评分达到90分（优秀），建议优先推进。", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.2 优势领域", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 逻辑结构：整体表现优秀，平均得分87.5分", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 理论创新性：整体表现良好，平均得分86.25分", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 研究价值：商业模式类报告表现突出", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.3 改进方向", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 理论创新性：建议各报告进一步提升理论深度，增加原创性贡献", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 技术前瞻性：加强与国际前沿技术的对标分析", font: FONT, size: 24 })] }));
  children.push(new Paragraph({ indent: { firstLine: 480 }, spacing: { line: 360, lineRule: "auto" }, children: [new TextRun({ text: "• 研究价值：深化成果可推广性分析，明确应用场景", font: FONT, size: 24 })] }));
  
  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 60, after: 30 }, children: [new TextRun({ text: "5.4 推荐优先级", font: FONT, bold: true, size: 28 })] }));
  children.push(new Paragraph({ spacing: { after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "表4 推荐优先级", font: FONT, bold: true, size: 21 })] }));
  
  const priorityRows = [
    new TableRow({ tableHeader: true, children: [
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "优先级", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "报告", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, shading: { fill: "D9E2F3", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "理由", font: FONT, size: 21, bold: true })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "C6E0B4", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "高", font: FONT, size: 21, bold: true })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "课题3报告4", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "综合评分最高，内容最完整", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "FFE699", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "中", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务2报告3", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "理论创新性强，逻辑结构优秀", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "FFE699", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "中", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告2", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "研究价值高，商业模式设计出色", font: FONT, size: 19 })] })] }),
    ]}),
    new TableRow({ children: [
      new TableCell({ width: { size: 1500, type: WidthType.DXA }, shading: { fill: "F4B084", type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "低", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 4500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "任务1报告1", font: FONT, size: 21 })] })] }),
      new TableCell({ width: { size: 2306, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "基础扎实，但需进一步提升", font: FONT, size: 19 })] })] }),
    ]}),
  ];
  
  children.push(new Table({ width: { size: 8306, type: WidthType.DXA }, columnWidths: [1500, 4500, 2306], borders: { top: { style: BorderStyle.SINGLE, size: 4 }, bottom: { style: BorderStyle.SINGLE, size: 4 }, left: { style: BorderStyle.SINGLE, size: 4 }, right: { style: BorderStyle.SINGLE, size: 4 }, insideHorizontal: { style: BorderStyle.SINGLE, size: 4 }, insideVertical: { style: BorderStyle.SINGLE, size: 4 } }, rows: priorityRows }));
  
  // 创建文档
  const doc = new Document({
    features: { updateFields: true },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 } } }, children }]
  });
  
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync("c:\\AI学习资料\\mesheer\\4份报告对比分析报告.docx", buffer);
  console.log("Word文档已生成: c:\\AI学习资料\\mesheer\\4份报告对比分析报告.docx");
}

main().catch(err => {
  console.error("生成失败:", err);
});
