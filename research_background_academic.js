const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

const COLORS = {
  primary: "1E40AF",      // 深蓝色 - 学术风格
  secondary: "3B82F6",    // 蓝色
  accent: "60A5FA",       // 浅蓝色
  textDark: "1F2937",     // 深灰
  textGray: "4B5563",     // 中灰
  textLight: "9CA3AF",    // 浅灰
  bgLight: "F8FAFC",      // 浅色背景
  bgCard: "FFFFFF",       // 卡片背景
  border: "E5E7EB"        // 边框色
};

const slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

// ========== 页头 ==========
// 公司Logo占位区
slide.addShape(pptx.ShapeType.rect, {
  x: 10.5, y: 0.3, w: 2.0, h: 0.8,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});

// 公司名称
slide.addText("中国南方电网", {
  x: 10.6, y: 0.45, w: 1.8, h: 0.25,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.bgLight,
  align: "right"
});
slide.addText("CHINA SOUTHERN POWER GRID", {
  x: 10.6, y: 0.68, w: 1.8, h: 0.18,
  fontSize: 7,
  fontFace: "Arial",
  color: COLORS.bgLight,
  align: "right"
});

// ========== 标题区域 ==========
slide.addText("（一）研究背景及思路", {
  x: 0.5, y: 0.35, w: 8, h: 0.5,
  fontSize: 22,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 副标题
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.88, w: 1.5, h: 0.08,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});
slide.addText("面临的问题", {
  x: 0.5, y: 0.85, w: 3, h: 0.35,
  fontSize: 16,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 引言
slide.addText("面对安全形势加剧与产业政策发展双重驱动，电力量测系统数字化转型需要解决以下三方面问题：", {
  x: 0.5, y: 1.3, w: 12, h: 0.35,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray,
  align: "justify"
});

// ========== 三个问题卡片 ==========
const cardWidth = 3.8;
const cardHeight = 3.5;
const cardGap = 0.4;
const startX = 0.5;
const startY = 1.85;

// 问题1：系统架构重构
slide.addShape(pptx.ShapeType.roundRect, {
  x: startX, y: startY, w: cardWidth, h: cardHeight,
  fill: { color: COLORS.bgCard },
  line: { color: COLORS.border, width: 1 },
  rectRadius: 0.08
});

// 问题1标题
slide.addShape(pptx.ShapeType.rect, {
  x: startX, y: startY, w: cardWidth, h: 0.45,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});
slide.addText("01", {
  x: startX + 0.15, y: startY + 0.08, w: 0.4, h: 0.3,
  fontSize: 14,
  fontFace: "Arial",
  bold: true,
  color: COLORS.bgLight
});
slide.addText("系统架构重构", {
  x: startX + 0.6, y: startY + 0.08, w: 3.0, h: 0.3,
  fontSize: 13,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.bgLight
});

// 问题1内容 - 架构图示意
slide.addShape(pptx.ShapeType.rect, {
  x: startX + 0.25, y: startY + 0.6, w: cardWidth - 0.5, h: 1.5,
  fill: { color: "#F1F5F9" },
  line: { width: 0 },
  rectRadius: 0.05
});

// 架构示意图 - 左侧节点
for (let i = 0; i < 4; i++) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x: startX + 0.5, y: startY + 0.75 + i * 0.35, w: 0.25, h: 0.25,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
}

// 架构示意图 - 中间处理层
slide.addShape(pptx.ShapeType.rect, {
  x: startX + 0.95, y: startY + 0.65, w: 1.0, h: 1.7,
  fill: { color: COLORS.accent, transparency: 30 },
  line: { color: COLORS.secondary, width: 1 },
  rectRadius: 0.03
});

// 架构示意图 - 右侧存储
slide.addShape(pptx.ShapeType.rect, {
  x: startX + 2.2, y: startY + 0.95, w: 0.8, h: 1.1,
  fill: { color: COLORS.primary },
  line: { width: 0 },
  rectRadius: 0.03
});

// 连接线示意
slide.addShape(pptx.ShapeType.line, {
  x: startX + 0.62, y: startY + 0.87, x2: startX + 0.95, y2: startY + 0.87,
  line: { color: COLORS.accent, width: 1.5 }
});
slide.addShape(pptx.ShapeType.line, {
  x: startX + 0.62, y: startY + 1.22, x2: startX + 0.95, y2: startY + 1.22,
  line: { color: COLORS.accent, width: 1.5 }
});
slide.addShape(pptx.ShapeType.line, {
  x: startX + 0.62, y: startY + 1.57, x2: startX + 0.95, y2: startY + 1.57,
  line: { color: COLORS.accent, width: 1.5 }
});
slide.addShape(pptx.ShapeType.line, {
  x: startX + 0.62, y: startY + 1.92, x2: startX + 0.95, y2: startY + 1.92,
  line: { color: COLORS.accent, width: 1.5 }
});

slide.addShape(pptx.ShapeType.line, {
  x: startX + 1.95, y: startY + 1.3, x2: startX + 2.2, y2: startY + 1.3,
  line: { color: COLORS.primary, width: 1.5 }
});

// 问题1挑战列表
const challenges1 = ["海量高速写入", "PB级数据存储", "分钟级离线处理", "秒级实时处理"];
challenges1.forEach((item, idx) => {
  slide.addShape(pptx.ShapeType.rect, {
    x: startX + 0.25, y: startY + 2.25 + idx * 0.28, w: cardWidth - 0.5, h: 0.22,
    fill: { color: idx % 2 === 0 ? "#EFF6FF" : "#F8FAFC" },
    line: { width: 0 }
  });
  slide.addText("▸ " + item, {
    x: startX + 0.35, y: startY + 2.25 + idx * 0.28, w: cardWidth - 0.7, h: 0.22,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textDark
  });
});

// 问题1结论
slide.addShape(pptx.ShapeType.rect, {
  x: startX, y: startY + cardHeight - 0.45, w: cardWidth, h: 0.45,
  fill: { color: "#FEF2F2" },
  line: { width: 0 }
});
slide.addText("任意单一数据存储计算架构都无法同时满足", {
  x: startX + 0.2, y: startY + cardHeight - 0.4, w: cardWidth - 0.4, h: 0.35,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "#DC2626",
  align: "center",
  valign: "middle"
});

// ========== 问题2：1分钟频次数据入库 ==========
const startX2 = startX + cardWidth + cardGap;

slide.addShape(pptx.ShapeType.roundRect, {
  x: startX2, y: startY, w: cardWidth, h: cardHeight,
  fill: { color: COLORS.bgCard },
  line: { color: COLORS.border, width: 1 },
  rectRadius: 0.08
});

slide.addShape(pptx.ShapeType.rect, {
  x: startX2, y: startY, w: cardWidth, h: 0.45,
  fill: { color: COLORS.secondary },
  line: { width: 0 }
});
slide.addText("02", {
  x: startX2 + 0.15, y: startY + 0.08, w: 0.4, h: 0.3,
  fontSize: 14,
  fontFace: "Arial",
  bold: true,
  color: COLORS.bgLight
});
slide.addText("1分钟频次数据入库", {
  x: startX2 + 0.6, y: startY + 0.08, w: 3.0, h: 0.3,
  fontSize: 13,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.bgLight
});

// 电力量测领域对比图
slide.addShape(pptx.ShapeType.rect, {
  x: startX2 + 0.25, y: startY + 0.6, w: cardWidth - 0.5, h: 1.8,
  fill: { color: "#F1F5F9" },
  line: { width: 0 },
  rectRadius: 0.05
});

// 特殊场景（电力量测）
slide.addText("电力量测领域", {
  x: startX2 + 1.3, y: startY + 0.7, w: 1.2, h: 0.2,
  fontSize: 9,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark,
  align: "center"
});

slide.addShape(pptx.ShapeType.rect, {
  x: startX2 + 0.4, y: startY + 0.95, w: 0.8, h: 0.22,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});
slide.addText("数据记录", {
  x: startX2 + 0.4, y: startY + 0.95, w: 0.8, h: 0.22,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.bgLight,
  align: "center",
  valign: "middle"
});

slide.addShape(pptx.ShapeType.rect, {
  x: startX2 + 0.4, y: startY + 1.2, w: 0.8, h: 0.22,
  fill: { color: COLORS.secondary },
  line: { width: 0 }
});
slide.addText("更新记录", {
  x: startX2 + 0.4, y: startY + 1.2, w: 0.8, h: 0.22,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.bgLight,
  align: "center",
  valign: "middle"
});

// 合并后的记录（圆柱形）
slide.addShape(pptx.ShapeType.roundRect, {
  x: startX2 + 1.45, y: startY + 0.95, w: 1.0, h: 0.47,
  fill: { color: COLORS.accent },
  line: { width: 0 },
  rectRadius: 0.2
});
slide.addText("合并为1条", {
  x: startX2 + 1.45, y: startY + 0.95, w: 1.0, h: 0.22,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.bgLight,
  align: "center",
  valign: "middle"
});

// 箭头
slide.addShape(pptx.ShapeType.line, {
  x: startX2 + 1.2, y: startY + 1.06, x2: startX2 + 1.45, y2: startY + 1.06,
  line: { color: COLORS.textGray, width: 1 },
  endArrow: true
});

// 传统场景对比
slide.addText("传统场景", {
  x: startX2 + 1.35, y: startY + 1.5, w: 0.8, h: 0.18,
  fontSize: 9,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark,
  align: "center"
});

slide.addShape(pptx.ShapeType.rect, {
  x: startX2 + 0.4, y: startY + 1.75, w: 0.8, h: 0.22,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});
slide.addText("数据记录", {
  x: startX2 + 0.4, y: startY + 1.75, w: 0.8, h: 0.22,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.bgLight,
  align: "center",
  valign: "middle"
});

slide.addShape(pptx.ShapeType.rect, {
  x: startX2 + 0.4, y: startY + 2.0, w: 0.8, h: 0.22,
  fill: { color: COLORS.secondary },
  line: { width: 0 }
});
slide.addText("更新记录", {
  x: startX2 + 0.4, y: startY + 2.0, w: 0.8, h: 0.22,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.bgLight,
  align: "center",
  valign: "middle"
});

slide.addShape(pptx.ShapeType.roundRect, {
  x: startX2 + 1.45, y: startY + 1.75, w: 1.0, h: 0.47,
  fill: { color: "#CBD5E1" },
  line: { width: 0 },
  rectRadius: 0.2
});
slide.addText("每次1条", {
  x: startX2 + 1.45, y: startY + 1.75, w: 1.0, h: 0.47,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray,
  align: "center",
  valign: "middle"
});

// 问题2结论
slide.addShape(pptx.ShapeType.rect, {
  x: startX2, y: startY + cardHeight - 0.45, w: cardWidth, h: 0.45,
  fill: { color: "#FEF2F2" },
  line: { width: 0 }
});
slide.addText("传统分布式关系型数据高速入库方法无法解决", {
  x: startX2 + 0.2, y: startY + cardHeight - 0.4, w: cardWidth - 0.4, h: 0.35,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "#DC2626",
  align: "center",
  valign: "middle"
});

// ========== 问题3：数据应用一致性及经济性 ==========
const startX3 = startX2 + cardWidth + cardGap;

slide.addShape(pptx.ShapeType.roundRect, {
  x: startX3, y: startY, w: cardWidth, h: cardHeight,
  fill: { color: COLORS.bgCard },
  line: { color: COLORS.border, width: 1 },
  rectRadius: 0.08
});

slide.addShape(pptx.ShapeType.rect, {
  x: startX3, y: startY, w: cardWidth, h: 0.45,
  fill: { color: COLORS.accent },
  line: { width: 0 }
});
slide.addText("03", {
  x: startX3 + 0.15, y: startY + 0.08, w: 0.4, h: 0.3,
  fontSize: 14,
  fontFace: "Arial",
  bold: true,
  color: COLORS.bgLight
});
slide.addText("数据应用一致性及经济性", {
  x: startX3 + 0.6, y: startY + 0.08, w: 3.0, h: 0.3,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.bgLight
});

// 数据融合应用示意图
slide.addShape(pptx.ShapeType.rect, {
  x: startX3 + 0.25, y: startY + 0.6, w: cardWidth - 0.5, h: 1.8,
  fill: { color: "#F1F5F9" },
  line: { width: 0 },
  rectRadius: 0.05
});

// 下级数据系统（圆形）
for (let i = 0; i < 3; i++) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x: startX3 + 0.4, y: startY + 0.75 + i * 0.5, w: 0.6, h: 0.4,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 }
  });
  slide.addText("下级系统" + (i + 1), {
    x: startX3 + 0.4, y: startY + 0.75 + i * 0.5, w: 0.6, h: 0.4,
    fontSize: 8,
    fontFace: "Microsoft YaHei",
    color: COLORS.textDark,
    align: "center",
    valign: "middle"
  });
}

// 数据同步复制（中间层）
slide.addShape(pptx.ShapeType.rect, {
  x: startX3 + 1.2, y: startY + 0.85, w: 0.4, h: 1.6,
  fill: { color: COLORS.accent, transparency: 30 },
  line: { color: COLORS.secondary, width: 1 },
  rectRadius: 0.03
});
slide.addText("数据\n同步\n复制", {
  x: startX3 + 1.2, y: startY + 0.85, w: 0.4, h: 1.6,
  fontSize: 8,
  fontFace: "Microsoft YaHei",
  color: COLORS.primary,
  bold: true,
  align: "center",
  valign: "middle"
});

// 上级数据融合应用（椭圆）
slide.addShape(pptx.ShapeType.ellipse, {
  x: startX3 + 1.8, y: startY + 1.3, w: 1.4, h: 0.8,
  fill: { color: COLORS.primary, transparency: 15 },
  line: { color: COLORS.primary, width: 1.5 }
});
slide.addText("上级数据融合应用", {
  x: startX3 + 1.8, y: startY + 1.25, w: 1.4, h: 0.9,
  fontSize: 9,
  fontFace: "Microsoft YaHei",
  color: COLORS.primary,
  bold: true,
  align: "center",
  valign: "middle"
});

// 箭头
slide.addShape(pptx.ShapeType.line, {
  x: startX3 + 1.0, y: startY + 0.95, x2: startX3 + 1.2, y2: startY + 0.95,
  line: { color: COLORS.textGray, width: 1 },
  endArrow: true
});
slide.addShape(pptx.ShapeType.line, {
  x: startX3 + 1.0, y: startY + 1.45, x2: startX3 + 1.2, y2: startY + 1.45,
  line: { color: COLORS.textGray, width: 1 },
  endArrow: true
});
slide.addShape(pptx.ShapeType.line, {
  x: startX3 + 1.0, y: startY + 1.95, x2: startX3 + 1.2, y2: startY + 1.95,
  line: { color: COLORS.textGray, width: 1 },
  endArrow: true
});

slide.addShape(pptx.ShapeType.line, {
  x: startX3 + 1.6, y: startY + 1.3, x2: startX3 + 1.8, y2: startY + 1.3,
  line: { color: COLORS.textGray, width: 1 },
  endArrow: true
});

// 问题3结论
slide.addShape(pptx.ShapeType.rect, {
  x: startX3, y: startY + cardHeight - 0.45, w: cardWidth, h: 0.45,
  fill: { color: "#FEF2F2" },
  line: { width: 0 }
});
slide.addText("两级应用源数据不一致，经济性不高", {
  x: startX3 + 0.2, y: startY + cardHeight - 0.4, w: cardWidth - 0.4, h: 0.35,
  fontSize: 10,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "#DC2626",
  align: "center",
  valign: "middle"
});

// ========== 页脚 ==========
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 6.45, w: 13.33, h: 0.02,
  fill: { color: COLORS.border },
  line: { width: 0 }
});
slide.addText("©CSG 2022. All Rights Reserved", {
  x: 0.5, y: 6.55, w: 5, h: 0.25,
  fontSize: 8,
  fontFace: "Arial",
  color: COLORS.textLight
});

const outputPath = path.join(__dirname, "research_background_academic.pptx");
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`✅ PPT已保存至: ${outputPath}`);
  })
  .catch((err) => {
    console.error("保存失败:", err);
  });