import PptxGenJS from "pptxgenjs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";

// 白底风格配色
const COLORS = {
  primary: "0F4C81",
  secondary: "2A6FAD",
  accent: "4A90D9",
  success: "2E7D32",
  warning: "D48806",
  bgWhite: "FFFFFF",
  bgLight: "F5F7FA",
  bgCard: "FFFFFF",
  textDark: "1A1A1A",
  textGray: "5A5A5A",
  textLight: "8A8A8A",
  border: "E0E0E0"
};

// ========== 封面页 ==========
let slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

// Logo区域
slide.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.3, w: 2.5, h: 0.6,
  fill: { color: COLORS.primary },
  line: { width: 0 },
  rectRadius: 0.05
});
slide.addText("中国南方电网", {
  x: 0.5, y: 0.3, w: 2.5, h: 0.3,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center",
  valign: "bottom"
});
slide.addText("CHINA SOUTHERN POWER GRID", {
  x: 0.5, y: 0.6, w: 2.5, h: 0.3,
  fontSize: 9,
  fontFace: "Arial",
  color: "FFFFFF",
  align: "center",
  valign: "top"
});

// 主标题
slide.addText("广东省电动汽车充电设施", {
  x: 0.5, y: 2.8, w: 12, h: 0.6,
  fontSize: 32,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary,
  align: "center"
});

slide.addText("智能服务平台建设与实践", {
  x: 0.5, y: 3.5, w: 12, h: 0.5,
  fontSize: 28,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  align: "center"
});

// 装饰线
slide.addShape(pptx.ShapeType.rect, {
  x: 4.5, y: 4.3, w: 4, h: 0.08,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});

// 底部信息
slide.addText("南方电网广东电网公司", {
  x: 0.5, y: 5.5, w: 12, h: 0.3,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray,
  align: "center"
});
slide.addText("2026年5月", {
  x: 0.5, y: 5.85, w: 12, h: 0.3,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  color: COLORS.textLight,
  align: "center"
});

// ========== 目录页 ==========
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 1.2,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});

slide.addText("目录", {
  x: 0.8, y: 0.35, w: 12, h: 0.5,
  fontSize: 26,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF"
});

const sections = [
  { num: "01", title: "建设背景与目标", desc: "政策驱动与平台定位" },
  { num: "02", title: "平台架构与核心功能", desc: "技术架构与四大核心能力" },
  { num: "03", title: "建设实践与成效", desc: "案例实践与运营数据" },
  { num: "04", title: "未来展望与生态合作", desc: "发展规划与合作伙伴" }
];

sections.forEach((section, idx) => {
  const y = 1.8 + idx * 1.1;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: y, w: 11.7, h: 0.95,
    fill: { color: idx % 2 === 0 ? COLORS.bgLight : COLORS.bgWhite },
    line: { color: COLORS.border, width: 1 }
  });
  
  slide.addText(section.num, {
    x: 0.9, y: y + 0.2, w: 0.8, h: 0.5,
    fontSize: 20,
    fontFace: "Arial",
    bold: true,
    color: COLORS.primary
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 1.8, y: y + 0.1, w: 0.06, h: 0.75,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(section.title, {
    x: 2.0, y: y + 0.15, w: 6, h: 0.35,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark
  });
  
  slide.addText(section.desc, {
    x: 2.0, y: y + 0.5, w: 8, h: 0.3,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// ========== 第一章：建设背景与目标 ==========

// 建设背景
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

// 标题栏
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("第一章 建设背景与目标", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const bgItems = [
  { num: "01", title: "300万辆", desc: "2024年广东省新能源汽车保有量突破", icon: "🚗" },
  { num: "02", title: "分散异构", desc: "充电设施互联互通痛点突出", icon: "🔌" },
  { num: "03", title: "双碳目标", desc: "国家与广东省专项规划驱动", icon: "🌱" },
  { num: "04", title: "央企使命", desc: "南方电网承担先行示范职责", icon: "⚡" }
];

bgItems.forEach((item, idx) => {
  const x = 0.8 + (idx % 2) * 6.1;
  const y = 1.4 + Math.floor(idx / 2) * 1.8;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 5.8, h: 1.55,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 0.6, h: 1.55,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(item.num, {
    x: x, y: y + 0.45, w: 0.6, h: 0.6,
    fontSize: 16,
    fontFace: "Arial",
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  slide.addText(item.icon, {
    x: x + 0.9, y: y + 0.2, w: 0.5, h: 0.5,
    fontSize: 26
  });
  
  slide.addText(item.title, {
    x: x + 1.5, y: y + 0.25, w: 4, h: 0.4,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary
  });
  
  slide.addText(item.desc, {
    x: x + 1.5, y: y + 0.7, w: 4.8, h: 0.6,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 平台目标
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("1.2 平台建设目标", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const targets = [
  { title: "统一管理", desc: "全省充电设施\"一张网\"统一管理", metric: "100%", label: "覆盖" },
  { title: "数据打通", desc: "运营商、电网、车主、政府多方数据互通", metric: "4+", label: "参与方" },
  { title: "效率提升", desc: "提升充电效率、降低运营成本、保障电网安全", metric: "50%", label: "效率提升" },
  { title: "生态支撑", desc: "支撑新型电力系统与绿色出行生态建设", metric: "300万+", label: "服务车辆" }
];

targets.forEach((target, idx) => {
  const x = 0.8 + idx * 3.1;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 2.8, h: 3.2,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 2.8, h: 0.5,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(target.metric, {
    x: x, y: 2.0, w: 2.8, h: 0.8,
    fontSize: 32,
    fontFace: "Arial",
    bold: true,
    color: COLORS.primary,
    align: "center"
  });
  
  slide.addText(target.label, {
    x: x, y: 2.8, w: 2.8, h: 0.3,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
  
  slide.addText(target.title, {
    x: x + 0.2, y: 3.25, w: 2.4, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark,
    align: "center"
  });
  
  slide.addText(target.desc, {
    x: x + 0.2, y: 3.65, w: 2.4, h: 0.7,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
});

// 平台定位
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("1.3 平台总体定位", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const positions = [
  { icon: "🏛️", title: "面向政府", desc: "监管决策工具", color: COLORS.primary, x: 5.9, y: 1.5 },
  { icon: "🔧", title: "面向运营商", desc: "运维赋能平台", color: COLORS.secondary, x: 9.5, y: 3.0 },
  { icon: "🚙", title: "面向车主", desc: "一站式服务入口", color: COLORS.accent, x: 5.9, y: 4.5 },
  { icon: "⚡", title: "面向电网", desc: "负荷灵活调度节点", color: COLORS.success, x: 2.3, y: 3.0 }
];

// 中心节点
slide.addShape(pptx.ShapeType.ellipse, {
  x: 5.5, y: 2.8, w: 1.8, h: 1.8,
  fill: { color: COLORS.primary },
  line: { width: 2, color: COLORS.secondary }
});
slide.addText("智能服务平台", {
  x: 5.5, y: 2.7, w: 1.8, h: 0.5,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center",
  valign: "bottom"
});

positions.forEach((pos, idx) => {
  // 连接线
  const cx = 6.4, cy = 3.7;
  const tx = pos.x + 0.4, ty = pos.y + 0.5;
  
  slide.addShape(pptx.ShapeType.line, {
    x: cx, y: cy, x2: tx, y2: ty,
    line: { color: COLORS.textLight, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: pos.x, y: pos.y, w: 1.2, h: 1.0,
    fill: { color: COLORS.bgWhite },
    line: { color: pos.color, width: 1.5 }
  });
  
  slide.addText(pos.icon, {
    x: pos.x, y: pos.y + 0.05, w: 1.2, h: 0.4,
    fontSize: 18,
    align: "center"
  });
  
  slide.addText(pos.title, {
    x: pos.x, y: pos.y + 0.45, w: 1.2, h: 0.25,
    fontSize: 10,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: pos.color,
    align: "center"
  });
  
  slide.addText(pos.desc, {
    x: pos.x, y: pos.y + 0.7, w: 1.2, h: 0.25,
    fontSize: 9,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
});

// ========== 第二章：平台架构与核心功能 ==========

// 技术架构
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("第二章 平台架构与核心功能", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addText("2.1 整体技术架构", {
  x: 0.8, y: 1.1, w: 12, h: 0.3,
  fontSize: 16,
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
  const y = 1.7 + idx * 1.0;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: y, w: 11.7, h: 0.85,
    fill: { color: idx % 2 === 0 ? COLORS.bgLight : COLORS.bgWhite },
    line: { color: COLORS.border, width: 1 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: y, w: 1.8, h: 0.85,
    fill: { color: layer.color },
    line: { width: 0 }
  });
  
  slide.addText(layer.name, {
    x: 0.8, y: y + 0.25, w: 1.8, h: 0.35,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  layer.items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 2.8 + i * 2.4, y: y + 0.15, w: 2.1, h: 0.55,
      fill: { color: COLORS.bgWhite },
      line: { color: layer.color, width: 1 }
    });
    slide.addText(item, {
      x: 2.8 + i * 2.4, y: y + 0.15, w: 2.1, h: 0.55,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: COLORS.textDark,
      align: "center",
      valign: "middle"
    });
  });
});

// 核心功能1：智能监控与运维
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("2.2 核心功能一：智能监控与运维", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const opsFeatures = [
  { title: "实时告警", desc: "7×24小时监控，异常实时推送" },
  { title: "远程诊断", desc: "远程检测设备状态，快速定位故障" },
  { title: "预测性维护", desc: "AI预测故障，提前干预" },
  { title: "自动派单", desc: "智能工单分配，提升响应效率" }
];

opsFeatures.forEach((item, idx) => {
  const x = 0.8 + (idx % 2) * 6.1;
  const y = 1.4 + Math.floor(idx / 2) * 1.6;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 5.8, h: 1.3,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1 }
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  slide.addText(String(idx + 1), {
    x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7,
    fontSize: 18,
    fontFace: "Arial",
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle"
  });
  
  slide.addText(item.title, {
    x: x + 1.3, y: y + 0.25, w: 4, h: 0.4,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.textDark
  });
  
  slide.addText(item.desc, {
    x: x + 1.3, y: y + 0.7, w: 4.2, h: 0.5,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

slide.addShape(pptx.ShapeType.rect, {
  x: 0.8, y: 4.7, w: 11.7, h: 0.7,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});
slide.addText("📊 运维效率提升50%：充电桩健康度画像、智能派单、故障预警", {
  x: 1.0, y: 4.8, w: 11.3, h: 0.5,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  color: "FFFFFF",
  align: "center",
  valign: "middle"
});

// 核心功能2：负荷调度与V2G
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("2.3 核心功能二：负荷调度与V2G", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

// 示意图区域
slide.addShape(pptx.ShapeType.rect, {
  x: 0.8, y: 1.4, w: 11.7, h: 2.8,
  fill: { color: COLORS.bgLight },
  line: { color: COLORS.border, width: 1 }
});

slide.addShape(pptx.ShapeType.ellipse, {
  x: 1.5, y: 2.2, w: 1.6, h: 1.2,
  fill: { color: COLORS.primary },
  line: { width: 2 }
});
slide.addText("⚡ 电网", {
  x: 1.5, y: 2.1, w: 1.6, h: 0.6,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center"
});

slide.addShape(pptx.ShapeType.rect, {
  x: 4.5, y: 1.7, w: 2.5, h: 2.0,
  fill: { color: COLORS.bgWhite },
  line: { color: COLORS.secondary, width: 2 }
});
slide.addText("🔌 充电站", {
  x: 4.5, y: 1.8, w: 2.5, h: 0.4,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary,
  align: "center"
});
for (let i = 0; i < 3; i++) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 4.7 + i * 0.7, y: 2.4, w: 0.5, h: 0.7,
    fill: { color: COLORS.accent, transparency: 30 },
    line: { color: COLORS.accent, width: 1 }
  });
}

slide.addShape(pptx.ShapeType.ellipse, {
  x: 8.5, y: 2.2, w: 1.6, h: 1.2,
  fill: { color: COLORS.success },
  line: { width: 2 }
});
slide.addText("🚙 EV", {
  x: 8.5, y: 2.1, w: 1.6, h: 0.6,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: "FFFFFF",
  align: "center"
});

slide.addText("→", {
  x: 3.2, y: 2.5, w: 1.0, h: 0.5,
  fontSize: 26,
  color: COLORS.primary,
  align: "center"
});
slide.addText("↔", {
  x: 7.1, y: 2.5, w: 1.0, h: 0.5,
  fontSize: 26,
  color: COLORS.success,
  align: "center"
});

const v2gFeatures = [
  { title: "动态电价", desc: "基于电网负荷的价格引导" },
  { title: "有序充电", desc: "错峰充电，平衡电网负荷" },
  { title: "V2G车网互动", desc: "车辆放电参与电网调节" },
  { title: "需求响应", desc: "参与电网调峰服务" }
];

v2gFeatures.forEach((item, idx) => {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.8 + idx * 3.0, y: 4.6, w: 2.7, h: 0.6,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1 }
  });
  slide.addText("• " + item.title, {
    x: 1.0 + idx * 3.0, y: 4.65, w: 2.3, h: 0.25,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary
  });
  slide.addText(item.desc, {
    x: 1.0 + idx * 3.0, y: 4.9, w: 2.3, h: 0.25,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 核心功能3：用户服务
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("2.4 核心功能三：用户服务", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
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
  const x = 0.8 + (idx % 3) * 4.0;
  const y = 1.4 + Math.floor(idx / 3) * 1.6;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 3.7, h: 1.3,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1 }
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.3, y: y + 0.2, w: 0.9, h: 0.9,
    fill: { color: COLORS.primary, transparency: 15 },
    line: { color: COLORS.primary, width: 1 }
  });
  
  slide.addText(item.icon, {
    x: x + 0.3, y: y + 0.2, w: 0.9, h: 0.9,
    fontSize: 24,
    align: "center",
    valign: "middle"
  });
  
  slide.addText(item.title, {
    x: x + 1.4, y: y + 0.2, w: 2, h: 0.4,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary
  });
  
  slide.addText(item.desc, {
    x: x + 1.4, y: y + 0.65, w: 2.1, h: 0.5,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 核心功能4：政府监管
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("2.5 核心功能四：政府监管", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const govFeatures = [
  { title: "设施统计", items: ["桩数统计", "电量分析", "利用率监测", "区域分布"] },
  { title: "补贴管理", items: ["申报入口", "自动审核", "资金拨付", "审计追溯"] },
  { title: "安全监管", items: ["设备合规", "数据上报", "隐患排查", "告警联动"] }
];

govFeatures.forEach((feature, idx) => {
  const x = 0.8 + idx * 4.0;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 3.7, h: 3.4,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 3.7, h: 0.6,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(feature.title, {
    x: x, y: 1.5, w: 3.7, h: 0.4,
    fontSize: 15,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  feature.items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: x + 0.2, y: 2.2 + i * 0.7, w: 3.3, h: 0.55,
      fill: { color: i % 2 === 0 ? COLORS.bgLight : COLORS.bgWhite },
      line: { width: 0 }
    });
    slide.addText("▸ " + item, {
      x: x + 0.4, y: 2.25 + i * 0.7, w: 2.9, h: 0.45,
      fontSize: 12,
      fontFace: "Microsoft YaHei",
      color: COLORS.textDark
    });
  });
});

// 平台特色
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("2.6 平台特色", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const highlights = [
  { title: "多源数据融合", desc: "电网、车企、运营商数据打通", highlight: "打破数据孤岛" },
  { title: "AI智能预测", desc: "充电行为预测，负荷曲线精度>90%", highlight: "准确率90%+" },
  { title: "跨区域互联互通", desc: "全省通充通付，一站式服务", highlight: "覆盖全省" }
];

highlights.forEach((item, idx) => {
  const x = 0.8 + idx * 4.0;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 3.7, h: 2.8,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.primary, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 3.7, h: 0.7,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(item.title, {
    x: x, y: 1.5, w: 3.7, h: 0.5,
    fontSize: 15,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  slide.addText(item.desc, {
    x: x + 0.25, y: 2.3, w: 3.2, h: 0.7,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.3, y: 3.2, w: 3.1, h: 0.6,
    fill: { color: COLORS.bgLight },
    line: { color: COLORS.primary, width: 1 }
  });
  slide.addText(item.highlight, {
    x: x + 0.3, y: 3.25, w: 3.1, h: 0.5,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary,
    align: "center",
    valign: "middle"
  });
});

// ========== 第三章：建设实践与成效 ==========

// 实践案例
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("第三章 建设实践与成效", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addText("3.1 重点实践案例", {
  x: 0.8, y: 1.1, w: 12, h: 0.3,
  fontSize: 16,
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
  const x = 0.8 + idx * 4.0;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.7, w: 3.7, h: 3.0,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.7, w: 3.7, h: 0.9,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(item.city, {
    x: x, y: 1.8, w: 3.7, h: 0.7,
    fontSize: 22,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  slide.addText(item.desc, {
    x: x + 0.25, y: 2.9, w: 3.2, h: 0.6,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: COLORS.textDark,
    align: "center"
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.5, y: 3.7, w: 2.7, h: 0.6,
    fill: { color: COLORS.bgLight },
    line: { color: COLORS.primary, width: 1 }
  });
  slide.addText(item.status, {
    x: x + 0.5, y: 3.75, w: 2.7, h: 0.5,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.primary,
    align: "center",
    valign: "middle"
  });
});

// 技术创新
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("3.2 关键技术创新", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const innovations = [
  { icon: "🤖", title: "AI充电行为预测", desc: "基于机器学习预测充电需求", impact: "高峰负荷降低15%" },
  { icon: "🔹", title: "边缘计算", desc: "桩端智能决策，减少云端延迟", impact: "响应时延<100ms" },
  { icon: "🌐", title: "数字孪生", desc: "充电站虚拟仿真与优化", impact: "运营效率提升30%" }
];

innovations.forEach((item, idx) => {
  const x = 0.8 + idx * 4.0;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 3.7, h: 3.3,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 1.2, y: 1.6, w: 1.3, h: 1.3,
    fill: { color: COLORS.primary, transparency: 10 },
    line: { color: COLORS.primary, width: 1.5 }
  });
  
  slide.addText(item.icon, {
    x: x + 1.2, y: 1.6, w: 1.3, h: 1.3,
    fontSize: 36,
    align: "center",
    valign: "middle"
  });
  
  slide.addText(item.title, {
    x: x, y: 3.1, w: 3.7, h: 0.4,
    fontSize: 14,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary,
    align: "center"
  });
  
  slide.addText(item.desc, {
    x: x + 0.25, y: 3.55, w: 3.2, h: 0.5,
    fontSize: 11,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x + 0.3, y: 4.15, w: 3.1, h: 0.5,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  slide.addText(item.impact, {
    x: x + 0.3, y: 4.18, w: 3.1, h: 0.45,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: "FFFFFF",
    align: "center",
    valign: "middle"
  });
});

// 运营数据
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("3.3 运营核心数据", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const metrics = [
  { label: "接入充电桩", value: "XX万根", unit: "最新" },
  { label: "累计服务车主", value: "XX万", unit: "人次" },
  { label: "平台可用率", value: "≥99.9%", unit: "高可用" },
  { label: "日均交易", value: "XX万", unit: "笔" }
];

metrics.forEach((metric, idx) => {
  const x = 0.8 + idx * 3.0;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 2.7, h: 3.4,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.primary, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 2.7, h: 0.5,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(metric.label, {
    x: x, y: 1.45, w: 2.7, h: 0.4,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: "FFFFFF",
    align: "center"
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.35, y: 2.1, w: 2.0, h: 1.3,
    fill: { color: COLORS.bgLight },
    line: { color: COLORS.primary, width: 1.5 }
  });
  
  slide.addText(metric.value, {
    x: x + 0.35, y: 2.2, w: 2.0, h: 0.9,
    fontSize: 30,
    fontFace: "Arial",
    bold: true,
    color: COLORS.primary,
    align: "center"
  });
  
  slide.addText(metric.unit, {
    x: x + 0.35, y: 3.05, w: 2.0, h: 0.3,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
});

// 效益分析
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("3.4 低碳与经济效益", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const benefits = [
  { icon: "🌍", title: "碳减排", desc: "累计减少碳排放XX万吨", color: COLORS.success },
  { icon: "💰", title: "成本降低", desc: "运营商运维成本降低20%", color: COLORS.primary },
  { icon: "📈", title: "产业增收", desc: "带动充电产业生态发展", color: COLORS.secondary }
];

benefits.forEach((benefit, idx) => {
  const x = 0.8 + idx * 4.0;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: 1.4, w: 3.7, h: 2.6,
    fill: { color: COLORS.bgWhite },
    line: { color: benefit.color, width: 2 }
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 1.2, y: 1.55, w: 1.3, h: 1.3,
    fill: { color: benefit.color, transparency: 20 },
    line: { color: benefit.color, width: 2 }
  });
  
  slide.addText(benefit.icon, {
    x: x + 1.2, y: 1.55, w: 1.3, h: 1.3,
    fontSize: 32,
    align: "center",
    valign: "middle"
  });
  
  slide.addText(benefit.title, {
    x: x, y: 3.0, w: 3.7, h: 0.4,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: benefit.color,
    align: "center"
  });
  
  slide.addText(benefit.desc, {
    x: x + 0.25, y: 3.45, w: 3.2, h: 0.45,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray,
    align: "center"
  });
});

slide.addShape(pptx.ShapeType.rect, {
  x: 0.8, y: 4.3, w: 11.7, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { color: COLORS.border, width: 1.5 }
});
slide.addText("🏆 社会影响", {
  x: 1.0, y: 4.35, w: 11.3, h: 0.35,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addText("缓解\"充电焦虑\"，提升用户满意度；促进新能源汽车推广，广东渗透率持续提升；获评\"智慧能源典型案例\"等荣誉", {
  x: 1.0, y: 4.75, w: 11.3, h: 0.4,
  fontSize: 12,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark
});

// ========== 第四章：未来展望与生态合作 ==========

// 合作生态
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("第四章 未来展望与生态合作", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});
slide.addText("4.1 合作生态图谱", {
  x: 0.8, y: 1.1, w: 12, h: 0.3,
  fontSize: 16,
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
  const x = 0.8 + (idx % 2) * 6.1;
  const y = 1.7 + Math.floor(idx / 2) * 1.5;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 5.8, h: 1.3,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 2.0, h: 1.3,
    fill: { color: COLORS.primary },
    line: { width: 0 }
  });
  
  slide.addText(group.category, {
    x: x, y: y + 0.45, w: 2.0, h: 0.4,
    fontSize: 15,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: "FFFFFF",
    align: "center"
  });
  
  slide.addText(group.items.join(" · "), {
    x: x + 2.2, y: y + 0.45, w: 3.4, h: 0.4,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textDark
  });
});

// 未来展望
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: 13.33, h: 0.9,
  fill: { color: COLORS.bgLight },
  line: { width: 0 }
});
slide.addText("4.2 未来展望", {
  x: 0.8, y: 0.3, w: 12, h: 0.35,
  fontSize: 20,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary
});

const futures = [
  { icon: "🔋", title: "V2G商业化", desc: "车网互动规模化应用" },
  { icon: "⚡", title: "虚拟电厂", desc: "充电站+共享储能+聚合调度" },
  { icon: "🌉", title: "大湾区推广", desc: "向粤港澳大湾区全面覆盖" },
  { icon: "🔗", title: "新型电力系统", desc: "深度融入新型电力系统建设" }
];

futures.forEach((item, idx) => {
  const x = 0.8 + (idx % 2) * 6.1;
  const y = 1.4 + Math.floor(idx / 2) * 1.6;
  
  slide.addShape(pptx.ShapeType.rect, {
    x: x, y: y, w: 5.8, h: 1.35,
    fill: { color: COLORS.bgWhite },
    line: { color: COLORS.border, width: 1.5 }
  });
  
  slide.addShape(pptx.ShapeType.ellipse, {
    x: x + 0.3, y: y + 0.2, w: 1.0, h: 1.0,
    fill: { color: COLORS.primary, transparency: 15 },
    line: { color: COLORS.primary, width: 1.5 }
  });
  
  slide.addText(item.icon, {
    x: x + 0.3, y: y + 0.2, w: 1.0, h: 1.0,
    fontSize: 30,
    align: "center",
    valign: "middle"
  });
  
  slide.addText(item.title, {
    x: x + 1.5, y: y + 0.2, w: 4, h: 0.45,
    fontSize: 16,
    fontFace: "Microsoft YaHei",
    bold: true,
    color: COLORS.primary
  });
  
  slide.addText(item.desc, {
    x: x + 1.5, y: y + 0.7, w: 4, h: 0.5,
    fontSize: 12,
    fontFace: "Microsoft YaHei",
    color: COLORS.textGray
  });
});

// 致谢页
slide = pptx.addSlide();
slide.background = { color: COLORS.bgWhite };

// 装饰线
slide.addShape(pptx.ShapeType.rect, {
  x: 0, y: 2.0, w: 13.33, h: 0.12,
  fill: { color: COLORS.primary },
  line: { width: 0 }
});

slide.addText("感谢聆听", {
  x: 0.5, y: 2.5, w: 12, h: 0.8,
  fontSize: 42,
  fontFace: "Microsoft YaHei",
  bold: true,
  color: COLORS.primary,
  align: "center"
});

slide.addShape(pptx.ShapeType.rect, {
  x: 4.5, y: 3.6, w: 4.3, h: 0.08,
  fill: { color: COLORS.textGray },
  line: { width: 0 }
});

slide.addText("南方电网广东电网公司", {
  x: 0.5, y: 4.3, w: 12, h: 0.4,
  fontSize: 16,
  fontFace: "Microsoft YaHei",
  color: COLORS.textDark,
  align: "center"
});

slide.addText("互动交流", {
  x: 0.5, y: 4.9, w: 12, h: 0.3,
  fontSize: 14,
  fontFace: "Microsoft YaHei",
  color: COLORS.textGray,
  align: "center"
});

const outputPath = join(__dirname, "ev_charging_platform_white_style.pptx");
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log("✅ PPT已保存至: " + outputPath);
  })
  .catch((err) => {
    console.error("保存失败:", err);
  });