
const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = '电网领域科创业务中心';
pptx.company = '电网领域科创业务中心';
pptx.subject = '个人数字化AI专项IDP落地执行手册';
pptx.title = '电网领域AI专项IDP落地执行手册';

// 配色方案
const COLORS = {
    primary: '#00529B',
    secondary: '#0072BC',
    accent: '#E57373',
    light: '#E6F2FF',
    white: '#FFFFFF',
    gray: '#666666',
    success: '#4CAF50',
    warning: '#FF9800'
};

// 辅助函数：添加安全检查
function addSafetyChecks(slide) {
    // 简化版，暂时不做复杂检查
}

// 图表路径
const CHART_DIR = 'c:/AI学习资料/mesheer/idp_charts/';
const CHARTS = {
    trend: path.join(CHART_DIR, 'idp_chart01_ai_trend.png'),
    goals: path.join(CHART_DIR, 'idp_chart02_goals.png'),
    gantt: path.join(CHART_DIR, 'idp_chart03_gantt.png'),
    radar: path.join(CHART_DIR, 'idp_chart04_radar.png'),
    knowledge: path.join(CHART_DIR, 'idp_chart05_knowledge_tree.png'),
    efficiency: path.join(CHART_DIR, 'idp_chart06_efficiency.png'),
    pyramid: path.join(CHART_DIR, 'idp_chart07_pyramid.png'),
    matrix: path.join(CHART_DIR, 'idp_chart08_assignment_matrix.png'),
    maturity: path.join(CHART_DIR, 'idp_chart09_maturity.png'),
    workload: path.join(CHART_DIR, 'idp_chart10_workload.png')
};

// ========== 第1页：封面 ==========
const slide1 = pptx.addSlide();
slide1.background = { color: COLORS.primary };
slide1.addText('电网领域科创业务中心', {
    x: 0.5, y: 1.2, w: 12.333, h: 0.8,
    fontSize: 32,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
slide1.addText('个人数字化AI专项IDP落地执行手册', {
    x: 0.5, y: 2.2, w: 12.333, h: 1.2,
    fontSize: 48,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
slide1.addText('v4.0 | 核心业务强化版', {
    x: 0.5, y: 3.8, w: 12.333, h: 0.6,
    fontSize: 24,
    color: '#CCCCCC',
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
slide1.addText('执行周期：2026年6月 - 2027年1月', {
    x: 0.5, y: 4.6, w: 12.333, h: 0.8,
    fontSize: 20,
    color: COLORS.white,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide1);

// ========== 第2页：目录 ==========
const slide2 = pptx.addSlide();
slide2.addText('目 录', {
    x: 0.5, y: 0.5, w: 12.333, h: 0.8,
    fontSize: 36,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
const tocItems = [
    { text: '一、执行总览', options: { bullet: { indent: 0, type: 'numbered' } } },
    { text: '二、AI工具配置', options: { bullet: { indent: 0, type: 'numbered' } } },
    { text: '三、核心业务场景AI辅助体系', options: { bullet: { indent: 0, type: 'numbered' } } },
    { text: '四、标书AI辅助系统', options: { bullet: { indent: 0, type: 'numbered' } } },
    { text: '五、科技项目原型设计与DM开发', options: { bullet: { indent: 0, type: 'numbered' } } },
    { text: '六、评估与持续改进', options: { bullet: { indent: 0, type: 'numbered' } } }
];
slide2.addText(tocItems, {
    x: 1.5, y: 1.8, w: 10, h: 5,
    fontSize: 24,
    lineSpacing: 36,
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide2);

// ========== 第3页：执行总览 - 项目背景与目标 ==========
const slide3 = pptx.addSlide();
slide3.addText('一、执行总览', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide3.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.2, w: 5.8, h: 2.8,
    fill: { color: COLORS.light },
    line: { color: COLORS.primary, width: 1 }
});
slide3.addText('项目背景', {
    x: 0.6, y: 1.3, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide3.addText('随着AI技术快速发展，大模型在电网领域应用前景广阔。本计划聚焦核心业务场景，打造AI辅助工具矩阵，大幅提升业务效率。', {
    x: 0.7, y: 1.8, w: 5.4, h: 2,
    fontSize: 16,
    lineSpacing: 28,
    fontFace: 'Microsoft YaHei'
});
slide3.addShape(pptx.ShapeType.rect, {
    x: 6.5, y: 1.2, w: 5.8, h: 2.8,
    fill: { color: '#E6FFE6' },
    line: { color: COLORS.success, width: 1 }
});
slide3.addText('总体目标', {
    x: 6.6, y: 1.3, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.success,
    fontFace: 'Microsoft YaHei'
});
slide3.addText([
    { text: '申报效率整体提升60%以上', options: { bullet: { indent: 0 } } },
    { text: '建成完整的业务场景AI辅助体系', options: { bullet: { indent: 0 } } },
    { text: '完成科技项目原型设计与DM开发', options: { bullet: { indent: 0 } } },
    { text: '全员掌握AI工具应用', options: { bullet: { indent: 0 } } }
], {
    x: 6.8, y: 1.8, w: 5.2, h: 2,
    fontSize: 16,
    lineSpacing: 28,
    fontFace: 'Microsoft YaHei'
});
if (fs.existsSync(CHARTS.trend)) {
    slide3.addImage({ path: CHARTS.trend, x: 0.5, y: 4.2, w: 12, h: 3 });
}
addSafetyChecks(slide3);

// ========== 第4页：执行总览 - 时间规划 ==========
const slide4 = pptx.addSlide();
slide4.addText('时间规划', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
const timePlanTable = [
    [
        { text: '阶段', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '时间周期', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '核心任务', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '预期成果', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: '阶段一', options: { fill: { color: '#F5F5F5' } } },
        '2026.6-2026.7',
        'AI工具配置+核心业务梳理',
        '完成申报简表、指南、可研模板'
    ],
    [
        { text: '阶段二', options: { fill: { color: '#F5F5F5' } } },
        '2026.7-2026.8',
        'AI辅助体系建立',
        '60+提示词模板+业务工具'
    ],
    [
        { text: '阶段三', options: { fill: { color: '#F5F5F5' } } },
        '2026.8-2026.9',
        '科技项目原型开发',
        '原型设计+DM开发初步成果'
    ],
    [
        { text: '阶段四', options: { fill: { color: '#F5F5F5' } } },
        '2026.9-2027.1',
        '能力提升与深化应用',
        '标书模板+全面应用'
    ]
];
slide4.addTable(timePlanTable, {
    x: 0.5, y: 1.2, w: 12.333, h: 2.5,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});
if (fs.existsSync(CHARTS.gantt)) {
    slide4.addImage({ path: CHARTS.gantt, x: 0.5, y: 4, w: 12, h: 3.2 });
}
addSafetyChecks(slide4);

// ========== 第5页：二、AI工具配置 ==========
const slide5 = pptx.addSlide();
slide5.addText('二、AI工具配置', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
const toolTable = [
    [
        { text: '工具名称', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '核心用途', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '优先级', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '学习成本', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: 'Claude 3.5 Sonnet', options: { fill: { color: '#F5F5F5' } } },
        '申报简表、指南、可研撰写',
        '★★★★★',
        '低'
    ],
    [
        { text: 'GPT-4o', options: { fill: { color: '#F5F5F5' } } },
        '标书撰写、多模态内容生成',
        '★★★★★',
        '低'
    ],
    [
        { text: 'Gamma', options: { fill: { color: '#F5F5F5' } } },
        'PPT自动生成',
        '★★★★☆',
        '低'
    ],
    [
        { text: 'Notion', options: { fill: { color: '#F5F5F5' } } },
        '知识库管理',
        '★★★☆☆',
        '中'
    ],
    [
        { text: 'Cursor', options: { fill: { color: '#F5F5F5' } } },
        '原型开发、代码生成',
        '★★★★☆',
        '中高'
    ]
];
slide5.addTable(toolTable, {
    x: 0.5, y: 1.2, w: 12.333, h: 3,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});
slide5.addText('第1周行动清单', {
    x: 0.5, y: 4.4, w: 12.333, h: 0.5,
    fontSize: 20,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
const week1Plan = [
    { text: '周一：AI工具选型与账号注册', options: { bullet: { indent: 0 } } },
    { text: '周二：核心业务场景梳理', options: { bullet: { indent: 0 } } },
    { text: '周三：首批提示词模板制作', options: { bullet: { indent: 0 } } },
    { text: '周四：第一个业务场景AI尝试', options: { bullet: { indent: 0 } } },
    { text: '周五：团队AI分享会+复盘', options: { bullet: { indent: 0 } } }
];
slide5.addText(week1Plan, {
    x: 0.8, y: 5, w: 11, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide5);

// ========== 第6页：三、核心业务场景AI辅助体系 - 概览 ==========
const slide6 = pptx.addSlide();
slide6.addText('三、核心业务场景AI辅助体系', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
// 四个主要业务场景
slide6.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.2, w: 5.8, h: 2.8,
    fill: { color: '#E6F2FF' },
    line: { color: COLORS.primary, width: 2 }
});
slide6.addText('1. 申报简表AI辅助系统', {
    x: 0.7, y: 1.4, w: 5.4, h: 0.5,
    fontSize: 22,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide6.addText([
    { text: '简表自动生成', options: { bullet: { indent: 0 } } },
    { text: '亮点智能提炼', options: { bullet: { indent: 0 } } },
    { text: '技术路线设计', options: { bullet: { indent: 0 } } }
], {
    x: 0.9, y: 2, w: 5, h: 1.8,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

slide6.addShape(pptx.ShapeType.rect, {
    x: 6.5, y: 1.2, w: 5.8, h: 2.8,
    fill: { color: '#E6FFE6' },
    line: { color: COLORS.success, width: 2 }
});
slide6.addText('2. 申报指南AI分析系统', {
    x: 6.7, y: 1.4, w: 5.4, h: 0.5,
    fontSize: 22,
    bold: true,
    color: COLORS.success,
    fontFace: 'Microsoft YaHei'
});
slide6.addText([
    { text: '指南智能解析', options: { bullet: { indent: 0 } } },
    { text: '方向智能匹配', options: { bullet: { indent: 0 } } },
    { text: '材料清单生成', options: { bullet: { indent: 0 } } }
], {
    x: 6.9, y: 2, w: 5, h: 1.8,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

slide6.addShape(pptx.ShapeType.rect, {
    x: 3.5, y: 4.3, w: 5.8, h: 2.8,
    fill: { color: '#FFF0E6' },
    line: { color: COLORS.warning, width: 2 }
});
slide6.addText('3. 可研报告AI辅助系统', {
    x: 3.7, y: 4.5, w: 5.4, h: 0.5,
    fontSize: 22,
    bold: true,
    color: COLORS.warning,
    fontFace: 'Microsoft YaHei'
});
slide6.addText([
    { text: '大纲自动生成', options: { bullet: { indent: 0 } } },
    { text: '技术方案设计', options: { bullet: { indent: 0 } } },
    { text: '经济性分析+风险评估', options: { bullet: { indent: 0 } } }
], {
    x: 3.9, y: 5.1, w: 5, h: 1.8,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

if (fs.existsSync(CHARTS.efficiency)) {
    slide6.addImage({ path: CHARTS.efficiency, x: 0.5, y: 7.2, w: 12, h: 2.8 });
}
addSafetyChecks(slide6);

// ========== 第7页：申报简表AI辅助系统 ==========
const slide7 = pptx.addSlide();
slide7.addText('3.1 申报简表AI辅助系统', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
const simpleFormTable = [
    [
        { text: '功能模块', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '实现方式', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '效率提升', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '负责人', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: '简表自动生成', options: { fill: { color: '#F5F5F5' } } },
        'Claude API+模板库',
        '70%',
        '张伟'
    ],
    [
        { text: '亮点智能提炼', options: { fill: { color: '#F5F5F5' } } },
        '大模型+领域知识',
        '65%',
        '李明'
    ],
    [
        { text: '技术路线设计', options: { fill: { color: '#F5F5F5' } } },
        '架构生成+方案推荐',
        '60%',
        '王芳'
    ],
    [
        { text: '创新点分析', options: { fill: { color: '#F5F5F5' } } },
        '文献挖掘+趋势分析',
        '55%',
        '刘洋'
    ]
];
slide7.addTable(simpleFormTable, {
    x: 0.5, y: 1.2, w: 12.333, h: 2,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});
slide7.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 3.5, w: 12.333, h: 3.5,
    fill: { color: '#FAFAFA' },
    line: { color: COLORS.gray, width: 1 }
});
slide7.addText('提示词模板示例', {
    x: 0.7, y: 3.6, w: 12, h: 0.5,
    fontSize: 20,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide7.addText('【系统提示】你是一位拥有20年电网领域项目申报经验的资深专家。你曾作为评审专家参与过100+国家级、省部级电网项目的评审工作。', {
    x: 0.8, y: 4.2, w: 11.8, h: 0.8,
    fontSize: 14,
    color: COLORS.gray,
    fontFace: 'Microsoft YaHei'
});
slide7.addText('【用户输入】请帮我为以下电网项目提炼申报简表的核心亮点：项目名称：[项目名称] | 技术方向：[技术方向] | 申报类型：[申报类型]', {
    x: 0.8, y: 5.1, w: 11.8, h: 0.8,
    fontSize: 14,
    color: COLORS.gray,
    fontFace: 'Microsoft YaHei'
});
slide7.addText('【输出要求】请严格按照JSON格式输出，包含立项意义、技术创新、应用前景、团队优势等部分，每部分严格控制字数。', {
    x: 0.8, y: 6, w: 11.8, h: 0.8,
    fontSize: 14,
    color: COLORS.gray,
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide7);

// ========== 第8页：四、标书AI辅助系统 ==========
const slide8 = pptx.addSlide();
slide8.addText('四、标书AI辅助系统', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide8.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.2, w: 12.333, h: 1.5,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, width: 1 }
});
slide8.addText('系统定位：为电网科技项目投标提供全流程AI支持，提升标书编写效率70%以上', {
    x: 0.7, y: 1.7, w: 11.933, h: 0.6,
    fontSize: 24,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
const bidTable = [
    [
        { text: '功能模块', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '实现方式', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '效率提升', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '负责人', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: '投标策略分析', options: { fill: { color: '#F5F5F5' } } },
        'AI+历史数据分析',
        '75%',
        '王芳'
    ],
    [
        { text: '技术方案生成', options: { fill: { color: '#F5F5F5' } } },
        '模板+知识库',
        '70%',
        '刘洋'
    ],
    [
        { text: '商务标撰写', options: { fill: { color: '#F5F5F5' } } },
        '标准化模板+AI填充',
        '65%',
        '陈静'
    ],
    [
        { text: '价格策略优化', options: { fill: { color: '#F5F5F5' } } },
        '成本模型+市场分析',
        '60%',
        '赵强'
    ],
    [
        { text: '合规自动检查', options: { fill: { color: '#F5F5F5' } } },
        '规则引擎+AI校验',
        '80%',
        '周杰'
    ],
    [
        { text: '标书排版优化', options: { fill: { color: '#F5F5F5' } } },
        '格式模板+自动化',
        '70%',
        '吴敏'
    ]
];
slide8.addTable(bidTable, {
    x: 0.5, y: 3, w: 12.333, h: 3,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide8);

// ========== 第9页：五、科技项目原型设计与DM开发 ==========
const slide9 = pptx.addSlide();
slide9.addText('五、科技项目原型设计与DM开发', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide9.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.2, w: 5.8, h: 3,
    fill: { color: '#E6F2FF' },
    line: { color: COLORS.primary, width: 2 }
});
slide9.addText('核心目标', {
    x: 0.7, y: 1.4, w: 5.4, h: 0.5,
    fontSize: 22,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide9.addText([
    { text: '原型设计效率提升70%', options: { bullet: { indent: 0 } } },
    { text: '完成DM决策管理平台', options: { bullet: { indent: 0 } } },
    { text: '形成3-5个可复用原型库', options: { bullet: { indent: 0 } } },
    { text: '培养2-3名原型设计专家', options: { bullet: { indent: 0 } } }
], {
    x: 0.9, y: 2, w: 5, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});
slide9.addShape(pptx.ShapeType.rect, {
    x: 6.5, y: 1.2, w: 5.8, h: 3,
    fill: { color: '#E6FFE6' },
    line: { color: COLORS.success, width: 2 }
});
slide9.addText('原型设计AI辅助', {
    x: 6.7, y: 1.4, w: 5.4, h: 0.5,
    fontSize: 22,
    bold: true,
    color: COLORS.success,
    fontFace: 'Microsoft YaHei'
});
slide9.addText([
    { text: '需求智能解析', options: { bullet: { indent: 0 } } },
    { text: '架构自动生成', options: { bullet: { indent: 0 } } },
    { text: '原型快速构建', options: { bullet: { indent: 0 } } },
    { text: '方案比选优化', options: { bullet: { indent: 0 } } },
    { text: '文档自动生成', options: { bullet: { indent: 0 } } }
], {
    x: 6.9, y: 2, w: 5, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});
if (fs.existsSync(CHARTS.matrix)) {
    slide9.addImage({ path: CHARTS.matrix, x: 0.5, y: 4.4, w: 12, h: 3 });
}
addSafetyChecks(slide9);

// ========== 第10页：DM决策管理平台 ==========
const slide10 = pptx.addSlide();
slide10.addText('5.2 DM决策管理平台', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide10.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 1.2, w: 12.333, h: 1.2,
    fill: { color: COLORS.primary },
    line: { color: COLORS.primary, width: 1 }
});
slide10.addText('平台定位：构建智能化决策支持系统，实现项目全生命周期的科学决策', {
    x: 0.7, y: 1.6, w: 11.933, h: 0.5,
    fontSize: 22,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
const dmTable = [
    [
        { text: '功能模块', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '核心功能', options: { bold: true, fill: { color: COLORS.light } } },
        { text: 'AI应用', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '负责人', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: '决策知识库', options: { fill: { color: '#F5F5F5' } } },
        '沉淀专家经验、智能检索',
        '知识图谱',
        '赵强'
    ],
    [
        { text: '智能决策助手', options: { fill: { color: '#F5F5F5' } } },
        'AI辅助决策、方案推荐',
        '大语言模型',
        '周杰'
    ],
    [
        { text: '流程自动化', options: { fill: { color: '#F5F5F5' } } },
        '审批流程、任务分配',
        '工作流引擎',
        '吴敏'
    ],
    [
        { text: '数据分析看板', options: { fill: { color: '#F5F5F5' } } },
        '项目数据、决策分析',
        'BI+AI分析',
        '孙浩'
    ],
    [
        { text: '风险预警', options: { fill: { color: '#F5F5F5' } } },
        '风险识别、预警推送',
        '机器学习',
        '朱婷'
    ]
];
slide10.addTable(dmTable, {
    x: 0.5, y: 2.6, w: 12.333, h: 2.5,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});
slide10.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 5.3, w: 12.333, h: 2.5,
    fill: { color: '#FAFAFA' },
    line: { color: COLORS.gray, width: 1 }
});
slide10.addText('原型设计流程：Step1. 需求输入 → Step2. 架构设计 → Step3. 原型构建 → Step4. 方案优化', {
    x: 0.8, y: 5.6, w: 11.8, h: 0.6,
    fontSize: 18,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide10.addText('实现7天完成完整项目原型设计，效率提升70%！', {
    x: 0.8, y: 6.3, w: 11.8, h: 0.6,
    fontSize: 18,
    bold: true,
    color: COLORS.accent,
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide10);

// ========== 第11页：六、评估与持续改进 ==========
const slide11 = pptx.addSlide();
slide11.addText('六、评估与持续改进', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
const maturityTable = [
    [
        { text: '等级', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '名称', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '特征', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '验收标准', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: 'Level 1', options: { fill: { color: '#F5F5F5' } } },
        '初始级',
        '开始使用AI工具',
        '完成工具配置'
    ],
    [
        { text: 'Level 2', options: { fill: { color: '#F5F5F5' } } },
        '应用级',
        '日常业务应用',
        '完成3个业务场景AI辅助'
    ],
    [
        { text: 'Level 3', options: { fill: { color: '#F5F5F5' } } },
        '熟练级',
        '熟练使用+优化',
        '60+模板+持续优化'
    ],
    [
        { text: 'Level 4', options: { fill: { color: '#F5F5F5' } } },
        '创新级',
        '创新应用+推广',
        '原型设计+DM系统上线'
    ],
    [
        { text: 'Level 5', options: { fill: { color: '#F5F5F5' } } },
        '专家级',
        '方法论输出',
        '形成可复制的方法论'
    ]
];
slide11.addTable(maturityTable, {
    x: 0.5, y: 1.2, w: 12.333, h: 2.5,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});
if (fs.existsSync(CHARTS.maturity)) {
    slide11.addImage({ path: CHARTS.maturity, x: 0.5, y: 3.9, w: 12, h: 3 });
}
addSafetyChecks(slide11);

// ========== 第12页：团队分工与成功关键 ==========
const slide12 = pptx.addSlide();
slide12.addText('团队分工与成功关键', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
const teamTable = [
    [
        { text: '姓名', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '主要负责任务', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: '张伟', options: { fill: { color: '#F5F5F5' } } },
        '申报简表系统、文献智能管理系统'
    ],
    [
        { text: '李明', options: { fill: { color: '#F5F5F5' } } },
        '账号配置、申报书模板、文献智能管理'
    ],
    [
        { text: '王芳', options: { fill: { color: '#F5F5F5' } } },
        '政策库、申报指南系统、投标策略分析'
    ],
    [
        { text: '刘洋', options: { fill: { color: '#F5F5F5' } } },
        '首批提示词模板、技术创新点挖掘'
    ],
    [
        { text: '陈静', options: { fill: { color: '#F5F5F5' } } },
        '典型案例库、商务标撰写'
    ],
    [
        { text: '赵强', options: { fill: { color: '#F5F5F5' } } },
        '文献资料库、决策知识库'
    ],
    [
        { text: '周杰', options: { fill: { color: '#F5F5F5' } } },
        '可研报告系统、智能决策助手'
    ],
    [
        { text: '吴敏', options: { fill: { color: '#F5F5F5' } } },
        'PPT模板、术语翻译系统'
    ],
    [
        { text: '孙浩', options: { fill: { color: '#F5F5F5' } } },
        '技术报告模板、数据分析看板'
    ],
    [
        { text: '朱婷', options: { fill: { color: '#F5F5F5' } } },
        '小论文模板、风险预警'
    ]
];
slide12.addTable(teamTable, {
    x: 0.5, y: 1.2, w: 12.333, h: 3.5,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});
slide12.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 4.9, w: 12.333, h: 2.8,
    fill: { color: '#FFF9E6' },
    line: { color: COLORS.warning, width: 2 }
});
slide12.addText('成功关键', {
    x: 0.7, y: 5, w: 12, h: 0.5,
    fontSize: 22,
    bold: true,
    color: COLORS.warning,
    fontFace: 'Microsoft YaHei'
});
slide12.addText([
    { text: '聚焦核心业务：重点突破申报简表、指南、可研、标书等高频业务', options: { bullet: { indent: 0 } } },
    { text: '快速迭代验证：小步快跑，每周都有小成果', options: { bullet: { indent: 0 } } },
    { text: '团队协作共享：每周分享经验，共同进步', options: { bullet: { indent: 0 } } },
    { text: '业务导向驱动：始终围绕实际工作需求', options: { bullet: { indent: 0 } } }
], {
    x: 0.9, y: 5.6, w: 11.5, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide12);

// ========== 第13页：总结与致谢 ==========
const slide13 = pptx.addSlide();
slide13.background = { color: COLORS.primary };
slide13.addText('总结与致谢', {
    x: 0.5, y: 1, w: 12.333, h: 1,
    fontSize: 44,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
slide13.addShape(pptx.ShapeType.roundedRect, {
    x: 1.5, y: 2.5, w: 10, h: 3.5,
    fill: { color: COLORS.white }
});
slide13.addText([
    { text: '8个月系统性AI能力建设', options: { bullet: { indent: 0 } } },
    { text: '重点突破4大核心业务场景', options: { bullet: { indent: 0 } } },
    { text: '完成科技项目原型设计与DM开发', options: { bullet: { indent: 0 } } },
    { text: '预计效率提升60%以上！', options: { bullet: { indent: 0 } } }
], {
    x: 2.2, y: 3, w: 8.6, h: 2.5,
    fontSize: 24,
    color: COLORS.primary,
    lineSpacing: 40,
    fontFace: 'Microsoft YaHei'
});
slide13.addText('谢谢！', {
    x: 0.5, y: 6.2, w: 12.333, h: 0.8,
    fontSize: 40,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});
addSafetyChecks(slide13);

// 保存PPT
pptx.writeFile({ fileName: 'c:\\AI学习资料\\mesheer\\电网领域AI专项IDP落地执行手册_v4.0.pptx' })
    .then(() => {
        console.log('PPT生成成功！');
    })
    .catch((error) => {
        console.error('PPT生成失败：', error);
    });
