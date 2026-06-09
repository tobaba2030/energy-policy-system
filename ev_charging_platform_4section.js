const PptxGenJS = require("pptxgenjs");
const path = require("path");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

const COLORS = {
  primary: "1E40AF",      // 深蓝色
  secondary: "3B82F6",    // 蓝色
  accent: "60A5FA",       // 浅蓝色
  success: "10B981",      // 绿色
  warning: "F59E0B",      // 橙色
  bgLight: "F8FAFC",      // 浅色背景
  bgCard: "FFFFFF",       // 卡片背景
  textDark: "1F2937",     // 深灰
  textGray: "4B5563",     // 中灰
  textLight: "9CA3AF"     // 浅灰
};

// ========== 封面页 ==========
let slide = pptx.addSlide();
slide.background = { color: COLORS.primary };

slide.addText("广东省电动汽车充电设施", {
  x: 0.5, y: 2.5, w: 12, h: 0.5,
  fontSize: 28,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center"
});

slide.addText("智能服务平台建设与实践", {
  x: 0.5, y: 3.1, w: 12, h: 0.5,
  fontSize: 28,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center"
});

slide.addText("SOUTHERN POWER GRID", {
  x: 0.5, y: 4.0, w: 12, h: 0.3,
  fontSize: 14,
  fontFace: "Arial",
  color: "#93C5FD",
  align: "center"
});

slide.addText("南方电网 | 广东电网", {
  x: 0.5, y: 4.8, w: 12, h: 0.3,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  color: "#DBEAFE",
  align: "center"
});

// ========== 目录页 ==========
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("目录", {
  x: 0.5, y: 1.0, w: 12, h: 0.5,
  fontSize: 24,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark,
  align: "center"
});

slide.addShape(pptx.ShapeType.rect, {
  x: 5.5, y: 1.6, w: 2.5, h: 0.06,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});

const sections = [
  { num: "01", title: "建设背景与目标", desc: "政策驱动与平台定位" },
  { num: "02", title: "平台架构与核心功能", desc: "技术架构与四大核心能力" },
  { num: "03", title: "建设实践与成效", desc: "案例实践与运营数据" },
  { num: "04", title: "未来展望与生态合作", desc: "发展规划与合作伙伴" }
];

sections.forEach((section, idx) => {
  const y = 2.5 + idx * 1.0;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: y, w: 12.3, h: 0.75,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.accent, width: 1 },
    rectRadius: 0.08
  });
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: y, w: 1.2, h: 0.75,
    fill: { color: COLORS.primary },
    line: { width: 0 },
    rectRadius: 0.08
  });
  
  slide.addText(section.num, {
    x: 0.5, y: y, w: 1.2, h: 0.75,
    fontSize: 20,
    fontFace: "Arial",
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle"
  });
  
  slide.addText(section.title, {
    x: 1.9, y: y + 0.08, w: 6, h: 0.35,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark
  });
  
  slide.addText(section.desc, {
    x: 1.9, y: y + 0.42, w: 8, h: 0.25,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// ========== 第一章：建设背景与目标 ==========

// 建设背景
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fill: { color: COLORS.primary },
  rectRadius: 0.2
});
slide.addText("01", {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fontSize: 16,
  fontFace: "Arial",
  bold: true,
  color: "FFFFFF",
  align: "center",
  valign: "middle"
});

slide.addText("建设背景", {
  x: 1.1, y: 0.5, w: 5, h: 0.4,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const bgItems = [
  { icon: "🚗", title: "300万辆", desc: "2024年广东省新能源汽车保有量突破" },
  { icon: "🔌", title: "分散异构", desc: "充电设施互联互通痛点突出" },
  { icon: "🌱", title: "双碳目标", desc: "国家与广东省专项规划驱动" },
  { icon: "⚡", title: "央企使命", desc: "南方电网承担先行示范职责" }
];

bgItems.forEach((item, idx) => {
  const x = 0.5 + (idx % 2) * 6.2;
  const y = 1.5 + Math.floor(idx / 2) * 1.6;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: 5.8, h: 1.3,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.08
  });
  
  slide.addText(item.icon, {
    x: x + 0.3, y: y + 0.15, w: 0.5, h: 0.5,
    fontSize: 24
  });
  
  slide.addText(item.title, {
    x: x + 0.95, y: y + 0.15, w: 3, h: 0.35,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary
  });
  
  slide.addText(item.desc, {
    x: x + 0.95, y: y + 0.55, w: 4.5, h: 0.6,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 平台目标
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("平台建设目标", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const targets = [
  { title: "统一管理", desc: "全省充电设施\"一张网\"统一管理", metric: "100%", label: "覆盖" },
  { title: "数据打通", desc: "运营商、电网、车主、政府多方数据互通", metric: "4+", label: "参与方" },
  { title: "效率提升", desc: "提升充电效率、降低运营成本、保障电网安全", metric: "50%", label: "效率提升" },
  { title: "生态支撑", desc: "支撑新型电力系统与绿色出行生态建设", metric: "300万+", label: "服务车辆" }
];

targets.forEach((target, idx) => {
  const x = 0.5 + idx * 3.15;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.5, w: 2.9, h: 3.2,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.accent, width: 1 },
    rectRadius: 0.1
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.2, y: 1.7, w: 2.5, h: 1.2,
    fill: { color: COLORS.primary, transparency: 10 },
    line: { color: COLORS.primary, width: 1 }
  });
  
  slide.addText(target.metric, {
    x: x + 0.2, y: 1.7, w: 2.5, h: 0.7,
    fontSize: 24,
    fontFace: "Arial",
    bold: true,
    color: COLORS.primary,
    align: "center"
  });
  
  slide.addText(target.label, {
    x: x + 0.2, y: 2.35, w: 2.5, h: 0.4,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
  
  slide.addText(target.title, {
    x: x + 0.2, y: 3.0, w: 2.5, h: 0.3,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark,
    align: "center"
  });
  
  slide.addText(target.desc, {
    x: x + 0.2, y: 3.35, w: 2.5, h: 0.6,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
});

// 平台定位
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("平台总体定位", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const positions = [
  { icon: "🏛️", title: "面向政府", desc: "监管决策工具", color: COLORS.primary },
  { icon: "🔧", title: "面向运营商", desc: "运维赋能平台", color: COLORS.secondary },
  { icon: "🚙", title: "面向车主", desc: "一站式服务入口", color: COLORS.accent },
  { icon: "⚡", title: "面向电网", desc: "负荷灵活调度节点", color: COLORS.success }
];

// 中心连接点
slide.addShape(pptx.ShapeType.ellipse, {
  x: 5.9, y: 3.0, w: 1.6, h: 1.6,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});
slide.addText("智能服务平台", {
  x: 5.9, y: 2.9, w: 1.6, h: 0.8,
  fontSize: 11,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center",
  valign: "middle"
});

positions.forEach((pos, idx) => {
  const angles = [0, Math.PI/2, Math.PI, 3*Math.PI/2];
  const x = 5.9 + Math.cos(angles[idx]) * 3.5;
  const y = 3.0 + Math.sin(angles[idx]) * 2.2;
  
  // 连接线
  slide.addShape(pptx.ShapeType.line, {
    x: 5.9 + Math.cos(angles[idx]) * 0.8,
    y: 3.0 + Math.sin(angles[idx]) * 0.8,
    x2: x,
    y2: y,
    line: { color: COLORS.accent, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x - 1.0, y: y - 0.5, w: 2.0, h: 1.0,
    fill: { color: COLORS.bgCard },
    line: { color: pos.color, width: 1.5 },
    rectRadius: 0.08
  });
  
  slide.addText(pos.icon, {
    x: x - 0.65, y: y - 0.4, w: 0.4, h: 0.4,
    fontSize: 16
  });
  
  slide.addText(pos.title, {
    x: x - 0.15, y: y - 0.35, w: 1.3, h: 0.3,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: pos.color
  });
  
  slide.addText(pos.desc, {
    x: x - 0.15, y: y - 0.05, w: 1.3, h: 0.3,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// ========== 第二章：平台架构与核心功能 ==========

// 技术架构
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fill: { color: COLORS.secondary },
  rectRadius: 0.2
});
slide.addText("02", {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fontSize: 16,
  fontFace: "Arial",
  bold: true,
  color: "FFFFFF",
  align: "center",
  valign: "middle"
});

slide.addText("平台架构与核心功能", {
  x: 1.1, y: 0.5, w: 8, h: 0.4,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const layers = [
  { name: "应用层", items: ["监控调度", "运维服务", "用户服务", "政府监管"], color: COLORS.primary },
  { name: "数据中台", items: ["统一接入", "数据融合", "AI分析", "开放接口"], color: COLORS.secondary },
  { name: "网络层", items: ["5G/4G", "物联专网", "边缘计算", "安全传输"], color: COLORS.accent },
  { name: "感知层", items: ["充电桩", "车联网终端", "传感器", "智能电表"], color: COLORS.success }
];

layers.forEach((layer, idx) => {
  const y = 1.5 + idx * 1.3;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: y, w: 12.3, h: 1.0,
    fill: { color: layer.color, transparency: 15 },
    line: { color: layer.color, width: 1.5 },
    rectRadius: 0.05
  });
  
  slide.addText(layer.name, {
    x: 0.7, y: y + 0.15, w: 2, h: 0.4,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: layer.color
  });
  
  layer.items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 3.5 + i * 2.1, y: y + 0.15, w: 1.9, h: 0.6,
      fill: { color: COLORS.bgCard },
      line: { color: layer.color, width: 1 },
      rectRadius: 0.05
    });
    slide.addText(item, {
      x: 3.5 + i * 2.1, y: y + 0.15, w: 1.9, h: 0.6,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: COLORS.textDark,
      align: "center",
      valign: "middle"
    });
  });
});

// 核心功能1：智能监控与运维
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("核心功能一：智能监控与运维", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const opsFeatures = [
  { title: "实时告警", desc: "7×24小时监控，异常实时推送" },
  { title: "远程诊断", desc: "远程检测设备状态，快速定位故障" },
  { title: "预测性维护", desc: "AI预测故障，提前干预" },
  { title: "自动派单", desc: "智能工单分配，提升响应效率" }
];

opsFeatures.forEach((item, idx) => {
  const x = 0.5 + (idx % 2) * 6.2;
  const y = 1.4 + Math.floor(idx / 2) * 1.4;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: 5.8, h: 1.1,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.08
  });
  
  slide.addText("▸", {
    x: x + 0.25, y: y + 0.15, w: 0.3, h: 0.35,
    fontSize: 14,
    color: COLORS.primary
  });
  
  slide.addText(item.title, {
    x: x + 0.6, y: y + 0.15, w: 3, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark
  });
  
  slide.addText(item.desc, {
    x: x + 0.6, y: y + 0.5, w: 5, h: 0.5,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 运维效率提升卡片
slide.addShape(pptx.ShapeType.roundRect, {
  x: 4.0, y: 4.0, w: 5.3, h: 1.5,
  fill: { color: COLORS.lightBlue },
  line: { color: COLORS.primary, width: 1.5 },
  rectRadius: 0.1
});
slide.addText("📊 运维效率提升50%", {
  x: 4.2, y: 4.15, w: 4.9, h: 0.5,
  fontSize: 16,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addText("充电桩健康度画像、智能派单、故障预警", {
  x: 4.2, y: 4.7, w: 4.9, h: 0.5,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray
});

// 核心功能2：负荷调度与V2G
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("核心功能二：负荷调度与V2G", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

// 示意图区域
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 1.4, w: 12.3, h: 3.2,
  fill: { color: "#F1F5F9" },
  line: { width: 0 },
  rectRadius: 0.1
});

// 电网图标
slide.addShape(pptx.ShapeType.ellipse, {
  x: 2.0, y: 2.3, w: 2.0, h: 1.2,
  fill: { color: COLORS.primary, transparency: 20 },
  line: { color: COLORS.primary, width: 1.5 }
});
slide.addText("⚡ 电网", {
  x: 2.0, y: 2.2, w: 2.0, h: 0.7,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary,
  align: "center"
});

// 充电站
slide.addShape(pptx.ShapeType.roundRect, {
  x: 5.3, y: 1.8, w: 2.8, h: 2.2,
  fill: { color: COLORS.bgCard },
  line: { color: COLORS.secondary, width: 1.5 },
  rectRadius: 0.1
});
slide.addText("🔌 充电站", {
  x: 5.3, y: 2.0, w: 2.8, h: 0.4,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.secondary,
  align: "center"
});

// 充电桩图标
for (let i = 0; i < 3; i++) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 5.6 + i * 0.8, y: 2.6, w: 0.6, h: 0.8,
    fill: { color: COLORS.accent, transparency: 30 },
    line: { color: COLORS.accent, width: 1 }
  });
}

// 电动汽车
slide.addShape(pptx.ShapeType.ellipse, {
  x: 9.5, y: 2.3, w: 2.0, h: 1.2,
  fill: { color: COLORS.success, transparency: 20 },
  line: { color: COLORS.success, width: 1.5 }
});
slide.addText("🚙 EV", {
  x: 9.5, y: 2.2, w: 2.0, h: 0.7,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.success,
  align: "center"
});

// 双向箭头
slide.addText("⚡→", {
  x: 3.2, y: 2.6, w: 0.8, h: 0.4,
  fontSize: 20,
  color: COLORS.primary
});
slide.addText("←→", {
  x: 8.2, y: 2.6, w: 0.8, h: 0.4,
  fontSize: 20,
  color: COLORS.success
});

// 功能要点
const v2gFeatures = [
  { title: "动态电价", desc: "基于电网负荷的价格引导" },
  { title: "有序充电", desc: "错峰充电，平衡电网负荷" },
  { title: "V2G车网互动", desc: "车辆放电参与电网调节" },
  { title: "需求响应", desc: "参与电网调峰服务" }
];

v2gFeatures.forEach((item, idx) => {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5 + idx * 3.15, y: 5.0, w: 2.9, h: 0.55,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.05
  });
  slide.addText("• " + item.title + ": " + item.desc, {
    x: 0.7 + idx * 3.15, y: 5.05, w: 2.5, h: 0.45,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 核心功能3：用户服务
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("核心功能三：用户服务", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const userFeatures = [
  { icon: "📍", title: "一键找桩", desc: "精准推荐、空闲提示、导航直达" },
  { icon: "💳", title: "在线支付", desc: "多渠道支付、账单管理" },
  { icon: "📅", title: "充电预约", desc: "预约充电、优先保障" },
  { icon: "📊", title: "充电报告", desc: "充电记录、能耗分析" },
  { icon: "🌱", title: "碳积分", desc: "绿色出行激励计划" },
  { icon: "🔔", title: "消息通知", desc: "充电进度、异常提醒" }
];

userFeatures.forEach((item, idx) => {
  const x = 0.5 + (idx % 3) * 4.1;
  const y = 1.4 + Math.floor(idx / 3) * 1.5;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: 3.8, h: 1.25,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.08
  });
  
  slide.addText(item.icon, {
    x: x + 0.3, y: y + 0.15, w: 0.5, h: 0.4,
    fontSize: 20
  });
  
  slide.addText(item.title, {
    x: x + 0.9, y: y + 0.15, w: 2.5, h: 0.35,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark
  });
  
  slide.addText(item.desc, {
    x: x + 0.9, y: y + 0.55, w: 2.5, h: 0.5,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 核心功能4：政府监管
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("核心功能四：政府监管", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const govFeatures = [
  { title: "设施统计", items: ["桩数统计", "电量分析", "利用率监测", "区域分布"] },
  { title: "补贴管理", items: ["申报入口", "自动审核", "资金拨付", "审计追溯"] },
  { title: "安全监管", items: ["设备合规", "数据上报", "隐患排查", "告警联动"] }
];

govFeatures.forEach((feature, idx) => {
  const x = 0.5 + idx * 4.1;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.4, w: 3.8, h: 2.8,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.1
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 3.8, h: 0.5,
    fill: { color: COLORS.primary, transparency: 15 },
    line: { width: 0 },
    rectRadius: 0.08
  });
  
  slide.addText(feature.title, {
    x: x + 0.2, y: 1.45, w: 3.4, h: 0.4,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary
  });
  
  feature.items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.2, y: 2.1 + i * 0.5, w: 3.4, h: 0.4,
      fill: { color: i % 2 === 0 ? "#F8FAFC" : COLORS.bgCard },
      line: { width: 0 }
    });
    slide.addText("▸ " + item, {
      x: x + 0.35, y: 2.15 + i * 0.5, w: 3.1, h: 0.3,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: COLORS.textDark
    });
  });
});

// 平台特色
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("平台特色", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const highlights = [
  { title: "多源数据融合", desc: "电网、车企、运营商数据打通", highlight: "打破数据孤岛" },
  { title: "AI智能预测", desc: "充电行为预测，负荷曲线精度>90%", highlight: "准确率90%+" },
  { title: "跨区域互联互通", desc: "全省通充通付，一站式服务", highlight: "覆盖全省" }
];

highlights.forEach((item, idx) => {
  const x = 0.5 + idx * 4.1;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.4, w: 3.8, h: 2.2,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.accent, width: 1 },
    rectRadius: 0.1
  });
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.25, y: 2.8, w: 3.3, h: 0.4,
    fill: { color: COLORS.lightBlue },
    line: { width: 0 },
    rectRadius: 0.05
  });
  
  slide.addText(item.title, {
    x: x + 0.25, y: 1.55, w: 3.3, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark
  });
  
  slide.addText(item.desc, {
    x: x + 0.25, y: 1.95, w: 3.3, h: 0.6,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
  
  slide.addText(item.highlight, {
    x: x + 0.25, y: 2.85, w: 3.3, h: 0.3,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary,
    align: "center"
  });
});

// ========== 第三章：建设实践与成效 ==========

// 实践案例
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fill: { color: COLORS.accent },
  rectRadius: 0.2
});
slide.addText("03", {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fontSize: 16,
  fontFace: "Arial",
  bold: true,
  color: "FFFFFF",
  align: "center",
  valign: "middle"
});

slide.addText("建设实践与成效", {
  x: 1.1, y: 0.5, w: 8, h: 0.4,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const cases = [
  { city: "广州", desc: "城市级充电网示范区", status: "已建成" },
  { city: "深圳", desc: "超充站网络建设", status: "推进中" },
  { city: "全省", desc: "数据直连广东省能源局", status: "已接入" }
];

cases.forEach((item, idx) => {
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5 + idx * 4.1, y: 1.4, w: 3.8, h: 2.0,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.1
  });
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5 + idx * 4.1, y: 1.4, w: 3.8, h: 0.6,
    fill: { color: COLORS.primary },
    line: { width: 0 },
    rectRadius: 0.08
  });
  
  slide.addText(item.city, {
    x: 0.5 + idx * 4.1, y: 1.45, w: 3.8, h: 0.5,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  slide.addText(item.desc, {
    x: 0.7 + idx * 4.1, y: 2.2, w: 3.4, h: 0.4,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textDark
  });
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.7 + idx * 4.1, y: 2.8, w: 1.5, h: 0.35,
    fill: { color: COLORS.lightGreen },
    line: { width: 0 },
    rectRadius: 0.05
  });
  slide.addText(item.status, {
    x: 0.7 + idx * 4.1, y: 2.85, w: 1.5, h: 0.25,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.success,
    align: "center"
  });
});

// 技术创新
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("关键技术创新", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const innovations = [
  { icon: "🤖", title: "AI充电行为预测", desc: "基于机器学习预测充电需求", impact: "高峰负荷降低15%" },
  { icon: "🔹", title: "边缘计算", desc: "桩端智能决策，减少云端延迟", impact: "响应时延<100ms" },
  { icon: "🌐", title: "数字孪生", desc: "充电站虚拟仿真与优化", impact: "运营效率提升30%" }
];

innovations.forEach((item, idx) => {
  const x = 0.5 + idx * 4.1;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.4, w: 3.8, h: 2.5,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.1
  });
  
  slide.addText(item.icon, {
    x: x + 1.5, y: 1.6, w: 0.8, h: 0.6,
    fontSize: 32
  });
  
  slide.addText(item.title, {
    x: x + 0.25, y: 2.4, w: 3.3, h: 0.35,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark,
    align: "center"
  });
  
  slide.addText(item.desc, {
    x: x + 0.25, y: 2.8, w: 3.3, h: 0.4,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x + 0.5, y: 3.35, w: 2.8, h: 0.35,
    fill: { color: COLORS.lightBlue },
    line: { width: 0 },
    rectRadius: 0.05
  });
  slide.addText(item.impact, {
    x: x + 0.5, y: 3.4, w: 2.8, h: 0.25,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary,
    align: "center"
  });
});

// 运营数据
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("运营核心数据", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const metrics = [
  { label: "接入充电桩", value: "XX万根", unit: "最新" },
  { label: "累计服务车主", value: "XX万", unit: "人次" },
  { label: "平台可用率", value: "≥99.9%", unit: "高可用" },
  { label: "日均交易", value: "XX万", unit: "笔" }
];

metrics.forEach((metric, idx) => {
  const x = 0.5 + idx * 3.15;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.4, w: 2.9, h: 2.5,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.accent, width: 1 },
    rectRadius: 0.1
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.2, y: 1.6, w: 2.5, h: 1.4,
    fill: { color: COLORS.primary, transparency: 10 },
    line: { color: COLORS.primary, width: 1 }
  });
  
  slide.addText(metric.value, {
    x: x + 0.2, y: 1.7, w: 2.5, h: 0.9,
    fontSize: 28,
    fontFace: "Arial",
    bold: true,
    color: COLORS.primary,
    align: "center"
  });
  
  slide.addText(metric.unit, {
    x: x + 0.2, y: 2.55, w: 2.5, h: 0.3,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
  
  slide.addText(metric.label, {
    x: x + 0.2, y: 3.1, w: 2.5, h: 0.35,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textDark,
    align: "center"
  });
});

// 效益分析
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("低碳与经济效益", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const benefits = [
  { icon: "🌍", title: "碳减排", desc: "累计减少碳排放XX万吨", color: COLORS.success },
  { icon: "💰", title: "成本降低", desc: "运营商运维成本降低20%", color: COLORS.primary },
  { icon: "📈", title: "产业增收", desc: "带动充电产业生态发展", color: COLORS.secondary }
];

benefits.forEach((benefit, idx) => {
  const x = 0.5 + idx * 4.1;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: 1.4, w: 3.8, h: 2.0,
    fill: { color: COLORS.bgCard },
    line: { color: benefit.color, width: 1.5 },
    rectRadius: 0.1
  });
  
  slide.addText(benefit.icon, {
    x: x + 1.6, y: 1.5, w: 0.6, h: 0.6,
    fontSize: 28
  });
  
  slide.addText(benefit.title, {
    x: x + 0.25, y: 2.3, w: 3.3, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: benefit.color
  });
  
  slide.addText(benefit.desc, {
    x: x + 0.25, y: 2.7, w: 3.3, h: 0.5,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
});

// 社会影响
slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.5, y: 3.8, w: 12.3, h: 1.4,
  fill: { color: COLORS.lightBlue },
  line: { color: COLORS.primary, width: 1 },
  rectRadius: 0.1
});

slide.addText("🏆 社会影响", {
  x: 0.7, y: 3.95, w: 3, h: 0.35,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

slide.addText("缓解\"充电焦虑\"，提升用户满意度；促进新能源汽车推广，广东渗透率持续提升；获评\"智慧能源典型案例\"等荣誉", {
  x: 0.7, y: 4.35, w: 11.5, h: 0.6,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark
});

// ========== 第四章：未来展望与生态合作 ==========

// 合作生态
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fill: { color: COLORS.success },
  rectRadius: 0.2
});
slide.addText("04", {
  x: 0.5, y: 0.5, w: 0.4, h: 0.4,
  fontSize: 16,
  fontFace: "Arial",
  bold: true,
  color: "FFFFFF",
  align: "center",
  valign: "middle"
});

slide.addText("未来展望与生态合作", {
  x: 1.1, y: 0.5, w: 8, h: 0.4,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const partners = [
  { category: "运营商", items: ["南方充电", "特来电", "星星充电", "国家电网"] },
  { category: "车企", items: ["比亚迪", "广汽", "小鹏", "蔚来"] },
  { category: "政府", items: ["广东省能源局", "各地市发改委"] },
  { category: "技术伙伴", items: ["华为", "阿里云", "腾讯"] }
];

partners.forEach((group, idx) => {
  const x = 0.5 + (idx % 2) * 6.2;
  const y = 1.5 + Math.floor(idx / 2) * 1.6;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: 5.8, h: 1.3,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.border, width: 1 },
    rectRadius: 0.08
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 2.0, h: 1.3,
    fill: { color: COLORS.primary, transparency: 15 },
    line: { width: 0 },
    rectRadius: 0.08
  });
  
  slide.addText(group.category, {
    x: x + 0.2, y: y + 0.45, w: 1.6, h: 0.4,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary
  });
  
  slide.addText(group.items.join(" · "), {
    x: x + 2.2, y: y + 0.45, w: 3.4, h: 0.4,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textDark
  });
});

// 未来展望
slide = pptx.addSlide();
slide.background = { color: COLORS.bgLight };

slide.addText("未来展望", {
  x: 0.5, y: 0.5, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.textDark
});

const futures = [
  { icon: "🔋", title: "V2G商业化", desc: "车网互动规模化应用" },
  { icon: "⚡", title: "虚拟电厂", desc: "充电站+共享储能+聚合调度" },
  { icon: "🌉", title: "大湾区推广", desc: "向粤港澳大湾区全面覆盖" },
  { icon: "🔗", title: "新型电力系统", desc: "深度融入新型电力系统建设" }
];

futures.forEach((item, idx) => {
  const x = 0.5 + (idx % 2) * 6.2;
  const y = 1.4 + Math.floor(idx / 2) * 1.6;
  
  slide.addShape(pptx.ShapeType.roundRect, {
    x: x, y: y, w: 5.8, h: 1.3,
    fill: { color: COLORS.bgCard },
    line: { color: COLORS.accent, width: 1 },
    rectRadius: 0.08
  });
  
  slide.addText(item.icon, {
    x: x + 0.3, y: y + 0.15, w: 0.5, h: 0.5,
    fontSize: 24
  });
  
  slide.addText(item.title, {
    x: x + 0.95, y: y + 0.15, w: 3, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark
  });
  
  slide.addText(item.desc, {
    x: x + 0.95, y: y + 0.55, w: 4.5, h: 0.6,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 致谢页
slide = pptx.addSlide();
slide.background = { color: COLORS.primary };

slide.addText("感谢聆听", {
  x: 0.5, y: 2.8, w: 12, h: 0.6,
  fontSize: 32,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center"
});

slide.addText("THANK YOU", {
  x: 0.5, y: 3.6, w: 12, h: 0.4,
  fontSize: 18,
  fontFace: "Arial",
  color: "#93C5FD",
  align: "center"
});

slide.addText("南方电网 | 广东电网", {
  x: 0.5, y: 4.8, w: 12, h: 0.3,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  color: "#DBEAFE",
  align: "center"
});

slide.addText("互动交流", {
  x: 0.5, y: 5.3, w: 12, h: 0.3,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  color: "#93C5FD",
  align: "center"
});

const outputPath = path.join(__dirname, "ev_charging_platform_4section.pptx");
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`✅ PPT已保存至: ${outputPath}`);
  })
  .catch((err) => {
    console.error("保存失败:", err);
  });