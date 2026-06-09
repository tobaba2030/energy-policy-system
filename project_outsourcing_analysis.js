const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// 加载 helpers
const helpersPath = path.join(__dirname, "pptxgenjs_helpers");
const { calcTextBox, autoFontSize, imageSizingContain, warnIfSlideHasOverlaps, warnIfSlideElementsOutOfBounds } = require(path.join(helpersPath, "layout.js"));

// 创建演示文稿
const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 16:9

// 设置主题字体
pptx.defineSlideMaster({
  title: "MASTER_SLIDE",
  background: { color: "F5F7FA" }
});

// 颜色定义
const COLORS = {
  primary: "4A90D9",      // 主蓝色
  secondary: "E8B87D",    // 橙色
  lightBlue: "D6E6F2",    // 浅蓝色背景
  lightOrange: "F5E6D3",  // 浅橙色背景
  textDark: "333333",     // 深色文字
  textGray: "666666",     // 灰色文字
  white: "FFFFFF",
  accent: "7FB3D5"        // 装饰色
};

// 创建幻灯片
const slide = pptx.addSlide({ masterName: "MASTER_SLIDE" });

// ========== 标题区域 ==========
// 主标题
slide.addText("项目任务外委情况分析", {
  x: 0.5, y: 0.3, w: 9, h: 0.6,
  fontSize: 28,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark,
  align: "left"
});

// 副标题
slide.addText("ANALYSIS OF PROJECT TASK OUTSOURCING", {
  x: 0.5, y: 0.85, w: 9, h: 0.3,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray,
  align: "left"
});

// ========== 装饰元素 ==========
// 左上角装饰圆
slide.addShape(pptx.ShapeType.ellipse, {
  x: 0.0, y: 0.0, w: 1.2, h: 1.2,
  fill: { color: COLORS.lightBlue, transparency: 60 }
});

// 右上角装饰圆
slide.addShape(pptx.ShapeType.ellipse, {
  x: 11.5, y: 0.2, w: 0.8, h: 0.8,
  fill: { color: COLORS.lightOrange, transparency: 50 }
});

// 右下角装饰圆
slide.addShape(pptx.ShapeType.ellipse, {
  x: 11.2, y: 5.5, w: 1.2, h: 1.2,
  fill: { color: COLORS.lightOrange, transparency: 50 }
});

// ========== 任务1：主要内容区域（左侧大卡片） ==========
// 任务1卡片背景
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.5, y: 1.3, w: 7.2, h: 5.2,
  fill: { color: COLORS.lightBlue },
  line: { color: COLORS.primary, width: 1 },
  rectRadius: 0.1
});

// 任务1图标
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.7, y: 1.5, w: 0.6, h: 0.6,
  fill: { color: COLORS.primary },
  rectRadius: 0.3
});
slide.addText("🔍", {
  x: 0.7, y: 1.5, w: 0.6, h: 0.6,
  fontSize: 20,
  align: "center",
  valign: "middle"
});

// 任务1标题
slide.addText("任务1：基于多源数据的负荷特性解析与多维画像技术研究", {
  x: 1.4, y: 1.55, w: 6, h: 0.5,
  fontSize: 13,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 第一行信息卡片
// 是否外委
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.7, y: 2.2, w: 1.4, h: 0.8,
  fill: { color: COLORS.white },
  line: { color: COLORS.primary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("是否外委：", {
  x: 0.75, y: 2.25, w: 1.3, h: 0.3,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});
slide.addText("全部外委", {
  x: 0.75, y: 2.55, w: 1.3, h: 0.4,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

// 核心能力外委
slide.addShape(pptx.ShapeType.roundRect, {
  x: 2.2, y: 2.2, w: 1.4, h: 0.8,
  fill: { color: COLORS.white },
  line: { color: COLORS.primary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("核心能力外委：", {
  x: 2.25, y: 2.25, w: 1.3, h: 0.3,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});
slide.addText("否", {
  x: 2.25, y: 2.55, w: 1.3, h: 0.4,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 外委费用
slide.addShape(pptx.ShapeType.roundRect, {
  x: 3.7, y: 2.2, w: 1.6, h: 0.8,
  fill: { color: COLORS.lightOrange },
  line: { color: COLORS.secondary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("外委费用：", {
  x: 3.75, y: 2.25, w: 1.5, h: 0.3,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});
slide.addText("90万元", {
  x: 3.75, y: 2.55, w: 1.5, h: 0.4,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary
});

// 外委占比
slide.addShape(pptx.ShapeType.roundRect, {
  x: 5.4, y: 2.2, w: 2.1, h: 0.8,
  fill: { color: COLORS.white },
  line: { color: COLORS.primary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("外委占比：", {
  x: 5.45, y: 2.25, w: 0.8, h: 0.3,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});
slide.addText("19%", {
  x: 5.45, y: 2.55, w: 0.6, h: 0.4,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
// 饼图示意
slide.addShape(pptx.ShapeType.pie, {
  x: 6.3, y: 2.35, w: 0.5, h: 0.5,
  fill: { color: COLORS.primary },
  line: { color: COLORS.white, width: 2 }
});

// 第二行信息卡片
// 外委内容
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.7, y: 3.1, w: 2.8, h: 0.8,
  fill: { color: COLORS.white },
  line: { color: COLORS.primary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("外委内容：建立多维资源画像指标体系", {
  x: 0.75, y: 3.15, w: 2.7, h: 0.7,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 外委原因
slide.addShape(pptx.ShapeType.roundRect, {
  x: 3.7, y: 3.1, w: 3.8, h: 0.8,
  fill: { color: COLORS.lightOrange },
  line: { color: COLORS.secondary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("外委原因：研发技术不足", {
  x: 3.75, y: 3.15, w: 3.7, h: 0.7,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 合作单位选定标准
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.7, y: 4.0, w: 6.8, h: 0.8,
  fill: { color: COLORS.white },
  line: { color: COLORS.primary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("合作单位选定标准：具备多类型负荷分析和人工智能创新研发能力", {
  x: 0.75, y: 4.05, w: 6.7, h: 0.7,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 外委经费测算依据标题
slide.addText("外委经费测算依据", {
  x: 0.75, y: 4.9, w: 2, h: 0.3,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});

// 人工费详情卡片
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.7, y: 5.2, w: 4.5, h: 1.1,
  fill: { color: COLORS.lightOrange },
  line: { color: COLORS.secondary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("▶ 人工费：68.5万", {
  x: 0.8, y: 5.25, w: 4.3, h: 0.25,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary
});
slide.addText("1、数据收集整理，初级研究员2人×4月×2.5万/人=20万", {
  x: 0.9, y: 5.5, w: 4.2, h: 0.2,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark
});
slide.addText("2、数据收集整理，初级研究员2人×10.5万/人=30万", {
  x: 0.9, y: 5.7, w: 4.2, h: 0.2,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark
});
slide.addText("3、测试化验加工费，初级研究员2人×10万", {
  x: 0.9, y: 5.9, w: 4.2, h: 0.2,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark
});

// 测试化验加工费
slide.addShape(pptx.ShapeType.roundRect, {
  x: 5.3, y: 5.2, w: 1.1, h: 0.5,
  fill: { color: COLORS.lightOrange },
  line: { color: COLORS.secondary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("▶测试化验加工费：20万", {
  x: 5.35, y: 5.25, w: 1.0, h: 0.4,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 会议差旅费
slide.addShape(pptx.ShapeType.roundRect, {
  x: 6.5, y: 5.2, w: 1.0, h: 0.5,
  fill: { color: COLORS.lightOrange },
  line: { color: COLORS.secondary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("会议差旅费：1.5万", {
  x: 6.55, y: 5.25, w: 0.9, h: 0.4,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// ========== 任务2（右上卡片） ==========
slide.addShape(pptx.ShapeType.roundRect, {
  x: 7.9, y: 1.3, w: 4.6, h: 2.3,
  fill: { color: COLORS.white },
  line: { color: COLORS.accent, width: 1 },
  rectRadius: 0.1
});

// 任务2图标
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 1.5, w: 0.5, h: 0.5,
  fill: { color: COLORS.accent },
  rectRadius: 0.25
});
slide.addText("📊", {
  x: 8.1, y: 1.5, w: 0.5, h: 0.5,
  fontSize: 16,
  align: "center",
  valign: "middle"
});

// 任务2标题
slide.addText("任务2：机理与数据融合驱动的多类型负荷高保真仿真建模技术研究", {
  x: 8.7, y: 1.55, w: 3.5, h: 0.8,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 任务2是否外委
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 2.5, w: 1.2, h: 0.6,
  fill: { color: COLORS.lightBlue },
  line: { color: COLORS.primary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("是否外委：否", {
  x: 8.15, y: 2.55, w: 1.1, h: 0.5,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 装饰百分比图标
slide.addShape(pptx.ShapeType.ellipse, {
  x: 11.5, y: 2.8, w: 0.5, h: 0.5,
  fill: { color: COLORS.lightOrange, transparency: 50 }
});
slide.addText("%", {
  x: 11.5, y: 2.8, w: 0.5, h: 0.5,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary,
  align: "center",
  valign: "middle"
});

// ========== 任务3（右下卡片） ==========
slide.addShape(pptx.ShapeType.roundRect, {
  x: 7.9, y: 3.8, w: 4.6, h: 2.3,
  fill: { color: COLORS.white },
  line: { color: COLORS.accent, width: 1 },
  rectRadius: 0.1
});

// 任务3图标
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 4.0, w: 0.5, h: 0.5,
  fill: { color: COLORS.accent },
  rectRadius: 0.25
});
slide.addText("📈", {
  x: 8.1, y: 4.0, w: 0.5, h: 0.5,
  fontSize: 16,
  align: "center",
  valign: "middle"
});

// 任务3标题
slide.addText("任务3：面向多市场的市场化交易支撑策略研究", {
  x: 8.7, y: 4.05, w: 3.5, h: 0.6,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 任务3是否外委
slide.addShape(pptx.ShapeType.roundRect, {
  x: 8.1, y: 5.0, w: 1.2, h: 0.6,
  fill: { color: COLORS.lightBlue },
  line: { color: COLORS.primary, width: 0.5 },
  rectRadius: 0.05
});
slide.addText("是否外委：否", {
  x: 8.15, y: 5.05, w: 1.1, h: 0.5,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  valign: "middle"
});

// 装饰百分比图标
slide.addShape(pptx.ShapeType.ellipse, {
  x: 11.5, y: 5.3, w: 0.5, h: 0.5,
  fill: { color: COLORS.lightOrange, transparency: 50 }
});
slide.addText("%", {
  x: 11.5, y: 5.3, w: 0.5, h: 0.5,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary,
  align: "center",
  valign: "middle"
});

// 验证
warnIfSlideHasOverlaps(slide, pptx);
warnIfSlideElementsOutOfBounds(slide, pptx);

// 保存文件
const outputPath = path.join(__dirname, "project_outsourcing_analysis.pptx");
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`PPT已保存至: ${outputPath}`);
  })
  .catch((err) => {
    console.error("保存失败:", err);
  });
