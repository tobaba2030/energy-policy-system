const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// 创建演示文稿
const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 16:9

// 颜色定义
const COLORS = {
  primary: "2563EB",      // 蓝色
  secondary: "F59E0B",    // 橙色
  success: "10B981",      // 绿色
  danger: "EF4444",       // 红色
  lightBlue: "DBEAFE",    // 浅蓝色背景
  lightOrange: "FEF3C7",  // 浅橙色背景
  lightGreen: "D1FAE5",   // 浅绿色背景
  textDark: "1F2937",     // 深色文字
  textGray: "6B7280",     // 灰色文字
  white: "FFFFFF",
  accent: "3B82F6"        // 装饰色
};

// 创建幻灯片
const slide = pptx.addSlide();
slide.background = { color: "F8FAFC" };

// ========== 标题区域 ==========
slide.addText("项目任务外委情况分析", {
  x: 0.4, y: 0.25, w: 8, h: 0.5,
  fontSize: 26,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

slide.addText("ANALYSIS OF PROJECT TASK OUTSOURCING", {
  x: 0.4, y: 0.72, w: 8, h: 0.25,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});

// ========== 左侧主区域：任务1详情 ==========
// 主卡片背景
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.4, y: 1.1, w: 7.5, h: 5.4,
  fill: { color: COLORS.white },
  line: { color: COLORS.primary, width: 1.5 },
  rectRadius: 0.12
});

// 任务1标题栏
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.4, y: 1.1, w: 7.5, h: 0.55,
  fill: { color: COLORS.primary },
  rectRadius: 0.12
});
// 覆盖底部圆角
slide.addShape(pptx.ShapeType.rect, {
  x: 0.4, y: 1.35, w: 7.5, h: 0.3,
  fill: { color: COLORS.primary },
  line: { color: COLORS.primary, width: 0 }
});

// 任务1图标
slide.addText("📋", {
  x: 0.55, y: 1.15, w: 0.4, h: 0.4,
  fontSize: 18,
  align: "center"
});

slide.addText("任务1：基于多源数据的负荷特性解析与多维画像技术研究", {
  x: 1.0, y: 1.15, w: 6.7, h: 0.45,
  fontSize: 13,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.white,
  valign: "middle"
});

// 核心指标卡片区
// 第一个指标卡片 - 是否外委
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.6, y: 1.8, w: 1.7, h: 1.0,
  fill: { color: COLORS.lightBlue },
  rectRadius: 0.08
});
slide.addShape(pptx.ShapeType.rect, {
  x: 0.6, y: 1.95, w: 1.7, h: 0.85,
  fill: { color: COLORS.lightBlue },
  line: { color: COLORS.primary, width: 1 }
});
slide.addText("是否外委", {
  x: 0.7, y: 1.85, w: 1.5, h: 0.25,
  fontSize: 9,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});
slide.addText("✓ 全部外委", {
  x: 0.7, y: 2.15, w: 1.5, h: 0.35,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addText("核心能力保留", {
  x: 0.7, y: 2.5, w: 1.5, h: 0.2,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.success
});

// 第二个指标卡片 - 外委费用
slide.addShape(pptx.ShapeType.roundRect, {
  x: 2.4, y: 1.8, w: 1.7, h: 1.0,
  fill: { color: COLORS.lightOrange },
  rectRadius: 0.08
});
slide.addShape(pptx.ShapeType.rect, {
  x: 2.4, y: 1.95, w: 1.7, h: 0.85,
  fill: { color: COLORS.lightOrange },
  line: { color: COLORS.secondary, width: 1 }
});
slide.addText("外委费用", {
  x: 2.5, y: 1.85, w: 1.5, h: 0.25,
  fontSize: 9,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});
slide.addText("¥90万", {
  x: 2.5, y: 2.1, w: 1.5, h: 0.45,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary
});
slide.addText("占总预算 19%", {
  x: 2.5, y: 2.55, w: 1.5, h: 0.2,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});

// 第三个指标卡片 - 外委占比饼图
slide.addShape(pptx.ShapeType.roundRect, {
  x: 4.2, y: 1.8, w: 3.5, h: 1.0,
  fill: { color: COLORS.white },
  rectRadius: 0.08
});
slide.addShape(pptx.ShapeType.rect, {
  x: 4.2, y: 1.95, w: 3.5, h: 0.85,
  fill: { color: COLORS.white },
  line: { color: COLORS.primary, width: 1 }
});
slide.addText("外委占比分析", {
  x: 4.35, y: 1.85, w: 1.5, h: 0.25,
  fontSize: 9,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});

// 饼图
slide.addChart(pptx.ChartType.pie, [{
  name: "外委占比",
  labels: ["外委部分", "自研部分"],
  values: [19, 81]
}], {
  x: 4.35, y: 1.95, w: 1.2, h: 0.8,
  showLegend: false,
  showValue: false,
  showPercent: false,
  showTitle: false,
  chartColors: [COLORS.secondary, COLORS.lightBlue],
  dataBorder: { pt: 1, color: COLORS.white }
});

// 饼图标签
slide.addText("19%", {
  x: 5.6, y: 2.0, w: 0.6, h: 0.35,
  fontSize: 16,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary
});
slide.addText("外委", {
  x: 6.2, y: 2.05, w: 0.5, h: 0.25,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});
slide.addText("81%", {
  x: 5.6, y: 2.35, w: 0.6, h: 0.35,
  fontSize: 16,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addText("自研", {
  x: 6.2, y: 2.4, w: 0.5, h: 0.25,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});

// 重点标注区域
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.6, y: 2.95, w: 7.1, h: 0.65,
  fill: { color: "FEF3C7" },
  line: { color: COLORS.secondary, width: 1.5 },
  rectRadius: 0.08
});
slide.addText("⚡", {
  x: 0.7, y: 3.0, w: 0.4, h: 0.5,
  fontSize: 16,
  valign: "middle"
});
slide.addText("外委原因：研发技术不足", {
  x: 1.1, y: 3.0, w: 2.5, h: 0.25,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary
});
slide.addText("核心能力外委：否（已确保关键技术自主掌握）", {
  x: 1.1, y: 3.25, w: 5, h: 0.25,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark
});

// 外委内容
slide.addText("外委内容", {
  x: 0.6, y: 3.75, w: 1.2, h: 0.3,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.6, y: 4.05, w: 3.3, h: 0.5,
  fill: { color: COLORS.lightBlue },
  rectRadius: 0.06
});
slide.addText("建立多维资源画像指标体系", {
  x: 0.7, y: 4.1, w: 3.1, h: 0.4,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 合作单位标准
slide.addText("合作单位标准", {
  x: 4.1, y: 3.75, w: 1.5, h: 0.3,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addShape(pptx.ShapeType.roundRect, {
  x: 4.1, y: 4.05, w: 3.6, h: 0.5,
  fill: { color: COLORS.lightBlue },
  rectRadius: 0.06
});
slide.addText("具备多类型负荷分析和AI创新研发能力", {
  x: 4.2, y: 4.1, w: 3.4, h: 0.4,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 经费测算区域标题
slide.addText("📊 外委经费测算依据", {
  x: 0.6, y: 4.7, w: 2.5, h: 0.3,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 经费明细 - 柱状图
slide.addChart(pptx.ChartType.bar, [{
  name: "费用(万元)",
  labels: ["人工费", "测试化验\n加工费", "会议\n差旅费"],
  values: [68.5, 20, 1.5]
}], {
  x: 0.6, y: 5.0, w: 3.5, h: 1.4,
  barDir: "col",
  showLegend: false,
  showTitle: false,
  chartColors: [COLORS.secondary],
  dataBorder: { pt: 2, color: COLORS.white },
  catAxisLabelColor: COLORS.textGray,
  catAxisLabelFontSize: 8,
  valAxisLabelColor: COLORS.textGray,
  valAxisLabelFontSize: 8,
  valGridLine: { color: "E5E7EB", size: 0.5 },
  catGridLine: { style: "none" },
  showValue: true,
  dataLabelPosition: "outEnd",
  dataLabelColor: COLORS.textDark,
  dataLabelFontSize: 9,
  dataLabelFontBold: true
});

// 经费详情卡片
slide.addShape(pptx.ShapeType.roundRect, {
  x: 4.3, y: 4.95, w: 3.4, h: 1.45,
  fill: { color: COLORS.lightOrange },
  rectRadius: 0.08
});
slide.addText("💰 经费构成明细", {
  x: 4.45, y: 5.0, w: 2, h: 0.25,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary
});

slide.addText([
  { text: "人工费：68.5万 (76%)", options: { bold: true, breakLine: true } },
  { text: "  • 数据收集整理：20万", options: { breakLine: true } },
  { text: "  • 数据收集整理：30万", options: { breakLine: true } },
  { text: "  • 测试化验加工费：18.5万", options: { breakLine: true } },
  { text: "测试化验加工费：20万 (22%)", options: { breakLine: true } },
  { text: "会议差旅费：1.5万 (2%)", options: {} }
], {
  x: 4.45, y: 5.25, w: 3.1, h: 1.1,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  paraSpaceAfter: 2
});

// ========== 右侧任务2和任务3卡片 ==========
// 任务2卡片
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 1.1, w: 4.4, h: 2.5,
  fill: { color: COLORS.white },
  line: { color: COLORS.success, width: 1.5 },
  rectRadius: 0.1
});

// 任务2标题栏
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 1.1, w: 4.4, h: 0.5,
  fill: { color: COLORS.success },
  rectRadius: 0.1
});
slide.addShape(pptx.ShapeType.rect, {
  x: 8.1, y: 1.35, w: 4.4, h: 0.25,
  fill: { color: COLORS.success },
  line: { color: COLORS.success, width: 0 }
});

slide.addText("📊", {
  x: 8.25, y: 1.15, w: 0.35, h: 0.35,
  fontSize: 14,
  align: "center"
});
slide.addText("任务2", {
  x: 8.6, y: 1.15, w: 0.8, h: 0.35,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.white,
  valign: "middle"
});

slide.addText("机理与数据融合驱动的多类型负荷高保真仿真建模技术研究", {
  x: 8.25, y: 1.7, w: 4.1, h: 0.7,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "top"
});

// 任务2状态
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.35, y: 2.5, w: 1.5, h: 0.45,
  fill: { color: COLORS.lightGreen },
  rectRadius: 0.06
});
slide.addText("✓ 不外委", {
  x: 8.35, y: 2.5, w: 1.5, h: 0.45,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.success,
  align: "center",
  valign: "middle"
});

// 任务2说明
slide.addText("自主研发，掌握核心建模技术", {
  x: 8.25, y: 3.05, w: 4.1, h: 0.4,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray,
  align: "center"
});

// 任务3卡片
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 3.8, w: 4.4, h: 2.5,
  fill: { color: COLORS.white },
  line: { color: COLORS.success, width: 1.5 },
  rectRadius: 0.1
});

// 任务3标题栏
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 3.8, w: 4.4, h: 0.5,
  fill: { color: COLORS.success },
  rectRadius: 0.1
});
slide.addShape(pptx.ShapeType.rect, {
  x: 8.1, y: 4.05, w: 4.4, h: 0.25,
  fill: { color: COLORS.success },
  line: { color: COLORS.success, width: 0 }
});

slide.addText("📈", {
  x: 8.25, y: 3.85, w: 0.35, h: 0.35,
  fontSize: 14,
  align: "center"
});
slide.addText("任务3", {
  x: 8.6, y: 3.85, w: 0.8, h: 0.35,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.white,
  valign: "middle"
});

slide.addText("面向多市场的市场化交易支撑策略研究", {
  x: 8.25, y: 4.4, w: 4.1, h: 0.5,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "top"
});

// 任务3状态
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.35, y: 5.0, w: 1.5, h: 0.45,
  fill: { color: COLORS.lightGreen },
  rectRadius: 0.06
});
slide.addText("✓ 不外委", {
  x: 8.35, y: 5.0, w: 1.5, h: 0.45,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.success,
  align: "center",
  valign: "middle"
});

// 任务3说明
slide.addText("自主研究，确保战略自主可控", {
  x: 8.25, y: 5.55, w: 4.1, h: 0.4,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray,
  align: "center"
});

// 保存文件
const outputPath = path.join(__dirname, "project_outsourcing_analysis_v2.pptx");
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`✅ PPT已保存至: ${outputPath}`);
  })
  .catch((err) => {
    console.error("保存失败:", err);
  });
