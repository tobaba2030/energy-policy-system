const pptxgen = require("pptxgenjs");
const ppt = new pptxgen();

ppt.layout = "LAYOUT_WIDE";
ppt.title = "朗新科技电网领域科创业务系统性提升方案";
ppt.author = "科创中心";
ppt.subject = "科创业务提升方案";
ppt.company = "朗新科技";

function addTitleSlide(title, subtitle) {
  const slide = ppt.addSlide();
  slide.addText(title, { x: 0.5, y: 1.5, w: 9, h: 1.5, fontSize: 44, bold: true, color: "0078D4", align: "center" });
  slide.addText(subtitle, { x: 0.5, y: 3.5, w: 9, h: 0.8, fontSize: 24, color: "333333", align: "center" });
  slide.addText("科创中心 | 2026年5月", { x: 0.5, y: 6.5, w: 9, h: 0.5, fontSize: 14, color: "666666", align: "center" });
  
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 7.2, w: 10, h: 0.3, fill: { type: "solid", color: "0078D4" } });
}

function addSectionSlide(title) {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 2, w: 10, h: 3, fill: { type: "gradient", color: ["0078D4", "00BCF5"] } });
  slide.addText(title, { x: 0.5, y: 3, w: 9, h: 1, fontSize: 36, bold: true, color: "FFFFFF", align: "center" });
}

function addContentSlide(title, content, options = {}) {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addText(title, { x: 0.5, y: 0.6, w: 9, h: 0.6, fontSize: 28, bold: true, color: "0078D4" });
  
  if (typeof content === "string") {
    slide.addText(content, { x: 0.5, y: 1.4, w: 9, h: 5, fontSize: 18, color: "333333" });
  } else if (Array.isArray(content)) {
    let y = 1.4;
    content.forEach((item, index) => {
      slide.addText(`• ${item}`, { x: 0.8, y: y, w: 8.5, h: 0.4, fontSize: 18, color: "333333" });
      y += 0.45;
    });
  }
}

function addTableSlide(title, tableData, options = {}) {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addText(title, { x: 0.5, y: 0.6, w: 9, h: 0.6, fontSize: 28, bold: true, color: "0078D4" });
  
  const tableRows = tableData.map(row => 
    row.map(cell => ({ text: String(cell), options: { fontSize: 14, color: "333333" } }))
  );
  
  const tableOptions = {
    x: 0.5, y: 1.4, w: 9, h: 5,
    rowH: 0.45,
    fill: { color: "F3F3F3" },
    border: { type: "solid", color: "CCCCCC" },
  };
  
  slide.addTable(tableRows, tableOptions);
}

function addTwoColumnSlide(title, leftTitle, leftContent, rightTitle, rightContent) {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addText(title, { x: 0.5, y: 0.6, w: 9, h: 0.6, fontSize: 28, bold: true, color: "0078D4" });
  
  slide.addText(leftTitle, { x: 0.5, y: 1.4, w: 4.3, h: 0.5, fontSize: 20, bold: true, color: "0078D4" });
  slide.addText(rightTitle, { x: 5.2, y: 1.4, w: 4.3, h: 0.5, fontSize: 20, bold: true, color: "0078D4" });
  
  if (Array.isArray(leftContent)) {
    let y = 2;
    leftContent.forEach(item => {
      slide.addText(`• ${item}`, { x: 0.8, y: y, w: 3.8, h: 0.35, fontSize: 16, color: "333333" });
      y += 0.4;
    });
  }
  
  if (Array.isArray(rightContent)) {
    let y = 2;
    rightContent.forEach(item => {
      slide.addText(`• ${item}`, { x: 5.5, y: y, w: 3.8, h: 0.35, fontSize: 16, color: "333333" });
      y += 0.4;
    });
  }
}

function addCardSlide(title, cards) {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addText(title, { x: 0.5, y: 0.6, w: 9, h: 0.6, fontSize: 28, bold: true, color: "0078D4" });
  
  const cardWidth = 2.2;
  const cardHeight = 2.5;
  const cardSpacing = 0.3;
  const startX = 0.5;
  const startY = 1.4;
  
  cards.forEach((card, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const x = startX + col * (cardWidth + cardSpacing);
    const y = startY + row * (cardHeight + 0.3);
    
    slide.addShape(pptxgen.shapes.RECTANGLE, { 
      x: x, y: y, w: cardWidth, h: cardHeight, 
      fill: { type: "gradient", color: ["E6F3FF", "FFFFFF"] },
      border: { type: "solid", color: "0078D4" }
    });
    
    slide.addText(card.icon, { x: x, y: y + 0.2, w: cardWidth, h: 0.8, fontSize: 36, align: "center" });
    slide.addText(card.title, { x: x, y: y + 0.9, w: cardWidth, h: 0.5, fontSize: 14, bold: true, color: "0078D4", align: "center" });
    slide.addText(card.desc, { x: x + 0.15, y: y + 1.3, w: cardWidth - 0.3, h: 1, fontSize: 11, color: "333333" });
  });
}

function addTimelineSlide(title, timelineItems) {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addText(title, { x: 0.5, y: 0.6, w: 9, h: 0.6, fontSize: 28, bold: true, color: "0078D4" });
  
  timelineItems.forEach((item, index) => {
    const y = 1.4 + index * 0.9;
    
    slide.addShape(pptxgen.shapes.ELLIPSE, { x: 0.8, y: y + 0.1, w: 0.3, h: 0.3, fill: { type: "solid", color: "0078D4" } });
    
    if (index < timelineItems.length - 1) {
      slide.addShape(pptxgen.shapes.LINE, { x: 0.95, y: y + 0.4, x2: 0.95, y2: y + 0.9, line: { color: "0078D4", width: 2 } });
    }
    
    slide.addText(item.phase, { x: 1.3, y: y, w: 2, h: 0.5, fontSize: 18, bold: true, color: "0078D4" });
    slide.addText(item.content, { x: 3.5, y: y, w: 6, h: 0.8, fontSize: 16, color: "333333" });
  });
}

function addChartSlide(title, chartType, data, options = {}) {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.5, fill: { type: "solid", color: "0078D4" } });
  slide.addText(title, { x: 0.5, y: 0.6, w: 9, h: 0.6, fontSize: 28, bold: true, color: "0078D4" });
  
  slide.addChart(chartType, data, { x: 0.5, y: 1.4, w: 9, h: 5, showLegend: true });
}

function addEndSlide() {
  const slide = ppt.addSlide();
  slide.addShape(pptxgen.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 8, fill: { type: "gradient", color: ["0078D4", "005A9E"] } });
  slide.addText("谢谢聆听", { x: 0.5, y: 2.5, w: 9, h: 1.5, fontSize: 54, bold: true, color: "FFFFFF", align: "center" });
  slide.addText("交流与探讨", { x: 0.5, y: 4.2, w: 9, h: 0.8, fontSize: 24, color: "FFFFFF", align: "center" });
}

// 开始创建PPT内容
addTitleSlide("朗新科技电网领域", "科创业务系统性提升方案");

addSectionSlide("方案概述");

addContentSlide("背景与现状", [
  "新型电力系统建设和能源数字化转型的大背景",
  "电网领域对科技创新的需求日益迫切",
  "科创中心承担公司科技项目核心技术研究与孵化的重要使命",
  "在项目交付、技术落地、人才培养等方面仍面临挑战"
]);

addCardSlide("四大支柱体系", [
  { icon: "🔬", title: "技术研究", desc: "三层四域框架，明确研究路径" },
  { icon: "🛠️", title: "AI工具链", desc: "五层架构，赋能超级个体" },
  { icon: "🎓", title: "高校合作", desc: "三层合作体系，借力科研力量" },
  { icon: "🚀", title: "项目试点", desc: "三个代表性项目，验证模式" },
]);

addTableSlide("预期效益", [
  ["效益类别", "具体指标", "预期提升"],
  ["研发效率", "代码生成速度", "2-3倍"],
  ["研发效率", "项目交付周期", "缩短20-30%"],
  ["成本效益", "综合研发成本", "降低15-25%"],
  ["市场竞争力", "客户满意度", "提升至90%+"],
  ["技术壁垒", "专利申请数量", "年均10项+"]
]);

addSectionSlide("一、技术研究方向路线图");

addContentSlide("三层四域研究框架", [
  "基础层：通用AI能力、数据处理能力",
  "平台层：电力业务AI平台、数字孪生平台",
  "应用层：智能运维、智能调度、智能营销"
]);

addTimelineSlide("三阶段发展路线", [
  { phase: "能力筑基期 (2024-2025)", content: "负荷预测、故障诊断、智能问答、数据治理" },
  { phase: "能力突破期 (2025-2026)", content: "配电网优化、需求响应、新能源消纳、电力市场分析" },
  { phase: "创新引领期 (2026-2027)", content: "虚拟电厂、数字孪生、碳资产管理、区块链应用" },
]);

addTableSlide("重点技术研究方向", [
  ["技术领域", "研究方向", "优先级", "时间节点"],
  ["智能电网", "配电网智能化、微电网优化", "⭐⭐⭐⭐⭐", "2024-2025"],
  ["电力市场", "交易辅助、负荷预测、价格分析", "⭐⭐⭐⭐", "2024-2026"],
  ["用户服务", "智能客服、用能优化、需求响应", "⭐⭐⭐⭐", "2025-2026"],
  ["绿色能源", "新能源消纳、虚拟电厂、碳资产", "⭐⭐⭐", "2026-2027"]
]);

addSectionSlide("二、AI工具链详细设计");

addCardSlide("AI工具链五层架构", [
  { icon: "📊", title: "数据层", desc: "采集、清洗、标注、管理" },
  { icon: "🧠", title: "模型层", desc: "训练、评估、管理、部署" },
  { icon: "💻", title: "开发层", desc: "AI编程、代码审查、CI/CD" },
  { icon: "📱", title: "应用层", desc: "业务应用、API、监控、交互" },
]);

addTableSlide("AI编程助手选型", [
  ["工具", "适用场景", "优势", "优先级"],
  ["Claude API", "代码生成、代码审查、技术文档", "上下文理解强、中文支持好", "⭐⭐⭐⭐⭐"],
  ["GitHub Copilot", "代码补全、函数生成", "集成度高、响应快", "⭐⭐⭐⭐"],
  ["Cursor", "交互式编程、代码重构", "对话式开发", "⭐⭐⭐⭐"],
  ["通义灵码", "中文场景开发", "中文理解好、成本低", "⭐⭐⭐"]
]);

addTableSlide("AI辅助效率分析", [
  ["工作内容", "AI可辅助程度", "说明"],
  ["需求分析", "30-50%", "生成需求模板、整理思路"],
  ["前端开发", "70-90%", "生成界面代码效果好"],
  ["API开发", "70-90%", "标准化接口生成效果很好"],
  ["文档编写", "80-95%", "辅助文档生成效果非常好"]
]);

addSectionSlide("三、高校合作具体方案");

addCardSlide("重点合作高校", [
  { icon: "🎓", title: "清华大学", desc: "电力系统分析、电力市场" },
  { icon: "🏫", title: "华电/浙大", desc: "新能源、智能电网、数字孪生" },
  { icon: "📚", title: "上交/西交", desc: "电力优化、新能源并网" },
  { icon: "🤝", title: "其他高校", desc: "人才培养、项目合作" },
]);

addTwoColumnSlide("三种合作模式", "联合实验室", [
  "与顶尖高校建立长期合作",
  "持续研发投入",
  "联合培养人才",
  "共享知识产权"
], "项目合作", [
  "针对具体技术难题",
  "灵活的合作机制",
  "明确的产出要求",
  "可控的投入"
]);

addTableSlide("2024-2025年度研究计划", [
  ["序号", "研究课题", "合作高校", "预算", "周期"],
  ["1", "负荷预测研究", "清华大学", "50万", "12月"],
  ["2", "故障诊断系统", "浙江大学", "60万", "18月"],
  ["3", "配网优化算法", "华中科技大学", "45万", "12月"],
  ["4", "新能源消纳评估", "上海交通大学", "40万", "12月"],
  ["5", "虚拟电厂优化", "华北电力大学", "55万", "18月"]
]);

addSectionSlide("四、项目试点方案设计");

addCardSlide("三个试点项目", [
  { icon: "📈", title: "负荷预测AI系统", desc: "短期/中长期预测，准确率≥95%" },
  { icon: "🔧", title: "故障诊断系统", desc: "快速定位，处理时间缩短50%" },
  { icon: "💬", title: "智能问答系统", desc: "客服效率提升30%，满意度90%+" },
]);

addTwoColumnSlide("项目一：负荷预测AI系统", "项目概况", [
  "基于深度学习的负荷预测",
  "Transformer+LSTM混合模型",
  "短期预测准确率≥95%",
  "试点省份：江苏省电力公司"
], "实施周期", [
  "1-2月：需求调研、数据准备",
  "3-6月：算法研究、模型开发",
  "7-9月：系统开发、集成",
  "10-12月：试点运行、优化"
]);

addTableSlide("资源配置汇总", [
  ["项目名称", "人员", "预算", "周期"],
  ["负荷预测AI系统", "7-8人", "200万", "12月"],
  ["故障智能诊断", "8-10人", "250万", "15月"],
  ["智能问答系统", "6-7人", "150万", "9月"],
  ["合计", "21-25人", "600万", "-"]
]);

addSectionSlide("五、风险评估与应对措施");

addTwoColumnSlide("主要风险类别", "技术风险", [
  "AI生成代码质量不稳定",
  "复杂业务逻辑AI处理能力有限",
  "技术更新换代过快",
  "数据质量问题"
], "人才风险", [
  "超级个体招聘难度大",
  "人才流失风险",
  "培养周期长",
  "能力局限性"
]);

addTableSlide("风险应对矩阵", [
  ["风险类型", "发生概率", "影响程度", "应对措施"],
  ["技术风险", "中", "高", "分阶段验证，复杂场景人工审核"],
  ["人才风险", "高", "高", "多渠道招聘，建立知识沉淀"],
  ["组织风险", "中", "高", "充分沟通，形成书面协议"],
  ["市场风险", "中", "高", "敏捷开发，快速迭代"],
  ["安全风险", "中", "高", "建立审查机制，关键环节人工把控"]
]);

addSectionSlide("六、详细预算规划");

const chartData = [
  {
    name: "预算分配",
    labels: ["技术研究", "AI工具链", "高校合作", "项目试点"],
    values: [1050, 340, 1830, 660]
  }
];

addChartSlide("总体预算框架（万元）", ppt.ChartType.BAR, chartData);

addTableSlide("三年预算规划", [
  ["预算类别", "2024年", "2025年", "2026年", "三年合计"],
  ["技术研究", "300", "390", "500", "1190"],
  ["AI工具链", "120", "100", "120", "340"],
  ["高校合作", "500", "610", "720", "1830"],
  ["项目试点", "495", "165", "-", "660"],
  ["合计", "1415", "1265", "1340", "4020"]
]);

addContentSlide("投资回报分析", [
  "投资回收期预计约为1.5-2年",
  "ROI预计为150%-200%",
  "三年收益估算：4300-6500万元",
  "包括：项目交付能力提升、研发效率提升、专利转让、产品化收入"
]);

addSectionSlide("七、实施保障措施");

addCardSlide("四大保障体系", [
  { icon: "🏛️", title: "组织保障", desc: "成立领导小组，设立PMO" },
  { icon: "📜", title: "制度保障", desc: "完善管理制度，规范流程" },
  { icon: "👥", title: "人才保障", desc: "多渠道招聘，建立培训体系" },
  { icon: "💰", title: "资金保障", desc: "设立专项基金，预算管理" },
]);

addContentSlide("关键成功因素", [
  "高层支持：公司高层领导的战略支持和资源投入",
  "人才先行：超级个体的招聘和培养是关键",
  "客户协同：与网省公司的深度合作是保障",
  "持续迭代：保持技术敏感度和学习能力",
  "容错文化：建立容忍失败的创新文化",
  "敏捷管理：快速迭代，及时调整"
]);

addTimelineSlide("实施计划", [
  { phase: "近期（1-3月）", content: "汇报方案、启动招聘、搭建环境" },
  { phase: "中期（3-6月）", content: "启动试点、高校合作、完善工具链" },
  { phase: "长期（6-12月）", content: "全面展开、建立流程、形成壁垒" },
]);

addEndSlide();

// 保存PPT
ppt.writeFile({ fileName: "c:\\AI学习资料\\mesheer\\朗新科技电网领域科创业务系统性提升方案.pptx" })
  .then(fileName => {
    console.log(`PPT演示文稿已成功生成：${fileName}`);
  })
  .catch(error => {
    console.error("生成PPT时出错：", error);
  });
