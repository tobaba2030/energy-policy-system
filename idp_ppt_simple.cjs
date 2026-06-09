
const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = '电网领域科创业务中心';
pptx.company = '电网领域科创业务中心';
pptx.subject = '个人数字化AI专项IDP落地执行手册';
pptx.title = '电网领域AI专项IDP落地执行手册';

const COLORS = {
    primary: '00529B',
    secondary: '0072BC',
    accent: 'E57373',
    light: 'E6F2FF',
    white: 'FFFFFF',
    gray: '666666',
    success: '4CAF50',
    warning: 'FF9800'
};

const CHART_DIR = 'c:/AI学习资料/mesheer/idp_charts/';

// 第1页：封面
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
    color: 'CCCCCC',
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

// 第2页：目录
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
    { text: '五、科技项目原型设计与Demo开发', options: { bullet: { indent: 0, type: 'numbered' } } },
    { text: '六、评估与持续改进', options: { bullet: { indent: 0, type: 'numbered' } } }
];
slide2.addText(tocItems, {
    x: 1.5, y: 1.8, w: 10, h: 5,
    fontSize: 24,
    lineSpacing: 36,
    fontFace: 'Microsoft YaHei'
});

// 第3页：执行总览
const slide3 = pptx.addSlide();
slide3.addText('一、执行总览', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide3.addText('项目背景', {
    x: 0.6, y: 1.2, w: 5.6, h: 0.4,
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
slide3.addText('总体目标', {
    x: 6.6, y: 1.2, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.success,
    fontFace: 'Microsoft YaHei'
});
slide3.addText([
    { text: '申报效率整体提升60%以上', options: { bullet: { indent: 0 } } },
    { text: '建成完整的业务场景AI辅助体系', options: { bullet: { indent: 0 } } },
    { text: '完成科技项目原型设计与Demo开发', options: { bullet: { indent: 0 } } },
    { text: '全员掌握AI工具应用', options: { bullet: { indent: 0 } } }
], {
    x: 6.8, y: 1.8, w: 5.2, h: 2,
    fontSize: 16,
    lineSpacing: 28,
    fontFace: 'Microsoft YaHei'
});

const chart1Path = path.join(CHART_DIR, 'idp_chart01_ai_trend.png');
if (fs.existsSync(chart1Path)) {
    slide3.addImage({ path: chart1Path, x: 0.5, y: 4.2, w: 12, h: 3 });
}

// 第4页：时间规划
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
        { text: '阶段一', options: { fill: { color: 'F5F5F5' } } },
        '2026.6-2026.7',
        'AI工具配置+核心业务梳理',
        '完成申报简表、指南、可研模板'
    ],
    [
        { text: '阶段二', options: { fill: { color: 'F5F5F5' } } },
        '2026.7-2026.8',
        'AI辅助体系建立',
        '60+提示词模板+业务工具'
    ],
    [
        { text: '阶段三', options: { fill: { color: 'F5F5F5' } } },
        '2026.8-2026.9',
        '科技项目原型开发',
        '原型设计+DM开发初步成果'
    ],
    [
        { text: '阶段四', options: { fill: { color: 'F5F5F5' } } },
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

const chart3Path = path.join(CHART_DIR, 'idp_chart03_gantt.png');
if (fs.existsSync(chart3Path)) {
    slide4.addImage({ path: chart3Path, x: 0.5, y: 4.0, w: 12, h: 3 });
}

// 第5页：AI工具配置
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
        { text: 'Claude 3.5 Sonnet', options: { fill: { color: 'F5F5F5' } } },
        '申报简表、指南、可研撰写',
        '★★★★★',
        '低'
    ],
    [
        { text: 'GPT-4o', options: { fill: { color: 'F5F5F5' } } },
        '标书撰写、多模态内容生成',
        '★★★★★',
        '低'
    ],
    [
        { text: 'Gamma', options: { fill: { color: 'F5F5F5' } } },
        'PPT自动生成',
        '★★★★☆',
        '低'
    ],
    [
        { text: 'Notion', options: { fill: { color: 'F5F5F5' } } },
        '知识库管理',
        '★★★☆☆',
        '中'
    ],
    [
        { text: 'Cursor', options: { fill: { color: 'F5F5F5' } } },
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
    x: 0.8, y: 5.0, w: 11, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

// 第6页：核心业务场景概览
const slide6 = pptx.addSlide();
slide6.addText('三、核心业务场景AI辅助体系', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});

slide6.addText('1. 申报简表AI辅助系统', {
    x: 0.7, y: 1.2, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide6.addText([
    { text: '简表自动生成', options: { bullet: { indent: 0 } } },
    { text: '亮点智能提炼', options: { bullet: { indent: 0 } } },
    { text: '技术路线设计', options: { bullet: { indent: 0 } } }
], {
    x: 0.9, y: 1.8, w: 5.2, h: 1.8,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

slide6.addText('2. 申报指南AI分析系统', {
    x: 6.7, y: 1.2, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.success,
    fontFace: 'Microsoft YaHei'
});
slide6.addText([
    { text: '指南智能解析', options: { bullet: { indent: 0 } } },
    { text: '方向智能匹配', options: { bullet: { indent: 0 } } },
    { text: '材料清单生成', options: { bullet: { indent: 0 } } }
], {
    x: 6.9, y: 1.8, w: 5.2, h: 1.8,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

slide6.addText('3. 可研报告AI辅助系统', {
    x: 3.7, y: 4.0, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.warning,
    fontFace: 'Microsoft YaHei'
});
slide6.addText([
    { text: '大纲自动生成', options: { bullet: { indent: 0 } } },
    { text: '技术方案设计', options: { bullet: { indent: 0 } } },
    { text: '经济性分析+风险评估', options: { bullet: { indent: 0 } } }
], {
    x: 3.9, y: 4.6, w: 5.2, h: 1.8,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

const chart6Path = path.join(CHART_DIR, 'idp_chart06_efficiency.png');
if (fs.existsSync(chart6Path)) {
    slide6.addImage({ path: chart6Path, x: 0.5, y: 6.7, w: 12, h: 2.8 });
}

// 第7页：标书AI辅助系统
const slide7 = pptx.addSlide();
slide7.addText('四、标书AI辅助系统', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});

slide7.addText('系统定位：为电网科技项目投标提供全流程AI支持，提升标书撰写效率70%以上', {
    x: 0.7, y: 1.2, w: 11.933, h: 0.6,
    fontSize: 24,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei',
    fill: { color: COLORS.primary }
});

const bidTable = [
    [
        { text: '功能模块', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '实现方式', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '效率提升', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '负责人', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: '投标策略分析', options: { fill: { color: 'F5F5F5' } } },
        'AI+历史数据分析',
        '75%',
        '王芳'
    ],
    [
        { text: '技术方案生成', options: { fill: { color: 'F5F5F5' } } },
        '模板+知识库',
        '70%',
        '刘洋'
    ],
    [
        { text: '商务标撰写', options: { fill: { color: 'F5F5F5' } } },
        '标准化模板+AI填充',
        '65%',
        '陈静'
    ],
    [
        { text: '价格策略优化', options: { fill: { color: 'F5F5F5' } } },
        '成本模型+市场分析',
        '60%',
        '赵强'
    ],
    [
        { text: '合规自动检查', options: { fill: { color: 'F5F5F5' } } },
        '规则引擎+AI校验',
        '80%',
        '周杰'
    ],
    [
        { text: '标书排版优化', options: { fill: { color: 'F5F5F5' } } },
        '格式模板+自动化',
        '70%',
        '吴敏'
    ]
];
slide7.addTable(bidTable, {
    x: 0.5, y: 2.2, w: 12.333, h: 3,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});

// 第8页：科技项目原型设计与Demo开发
const slide8 = pptx.addSlide();
slide8.addText('五、科技项目原型设计与Demo开发', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});

slide8.addText('核心目标', {
    x: 0.7, y: 1.2, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide8.addText([
    { text: '原型设计效率提升70%', options: { bullet: { indent: 0 } } },
    { text: '完成多个科技项目Demo开发', options: { bullet: { indent: 0 } } },
    { text: '形成3-5个可复用原型库', options: { bullet: { indent: 0 } } },
    { text: '培养2-3个原型设计专家', options: { bullet: { indent: 0 } } }
], {
    x: 0.9, y: 1.8, w: 5.2, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

slide8.addText('原型设计AI辅助', {
    x: 6.7, y: 1.2, w: 5.6, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.success,
    fontFace: 'Microsoft YaHei'
});
slide8.addText([
    { text: '需求智能解析', options: { bullet: { indent: 0 } } },
    { text: '架构自动生成', options: { bullet: { indent: 0 } } },
    { text: '原型快速构建', options: { bullet: { indent: 0 } } },
    { text: '方案比选优化', options: { bullet: { indent: 0 } } },
    { text: '文档自动生成', options: { bullet: { indent: 0 } } }
], {
    x: 6.9, y: 1.8, w: 5.2, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

const chart8Path = path.join(CHART_DIR, 'idp_chart08_assignment_matrix.png');
if (fs.existsSync(chart8Path)) {
    slide8.addImage({ path: chart8Path, x: 0.5, y: 4.2, w: 12, h: 3 });
}

// 第9页：Demo开发业务场景
const slide9 = pptx.addSlide();
slide9.addText('Demo开发业务场景', {
    x: 0.5, y: 0.3, w: 12.333, h: 0.6,
    fontSize: 32,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});

slide9.addText('定位：构建科技项目快速原型验证体系，实现从需求到Demo的快速交付', {
    x: 0.7, y: 1.2, w: 11.933, h: 0.6,
    fontSize: 24,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei',
    fill: { color: COLORS.primary }
});

const demoTable = [
    [
        { text: '业务场景', options: { bold: true, fill: { color: COLORS.primary }, color: 'FFFFFF' } },
        { text: '典型Demo项目', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '实现方式', options: { bold: true, fill: { color: COLORS.light } } },
        { text: '负责人', options: { bold: true, fill: { color: COLORS.light } } }
    ],
    [
        { text: '申报前原型验证', options: { fill: { color: 'F5F5F5' } } },
        '关键技术POC验证',
        'Claude+Cursor快速开发',
        '周杰'
    ],
    [
        { text: '技术方案演示', options: { fill: { color: 'F5F5F5' } } },
        '可视化技术展示',
        'AI生成演示界面',
        '吴敏'
    ],
    [
        { text: '项目评审演示', options: { fill: { color: 'F5F5F5' } } },
        '项目Demo演示系统',
        'AI辅助界面设计',
        '孙浩'
    ],
    [
        { text: '技术创新验证', options: { fill: { color: 'F5F5F5' } } },
        '新技术快速验证',
        '快速迭代开发',
        '周杰'
    ],
    [
        { text: '用户体验测试', options: { fill: { color: 'F5F5F5' } } },
        '原型测试平台',
        'AI生成测试用例',
        '吴敏'
    ]
];
slide9.addTable(demoTable, {
    x: 0.5, y: 2.2, w: 12.333, h: 2.5,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});

slide9.addText('Demo开发流程：Step1. 需求拆解 → Step2. 快速原型 → Step3. 验证迭代 → Step4. 最终Demo', {
    x: 0.8, y: 5.1, w: 11.8, h: 0.6,
    fontSize: 18,
    bold: true,
    color: COLORS.primary,
    fontFace: 'Microsoft YaHei'
});
slide9.addText('目标：7天完成完整Demo，快速验证技术可行性！', {
    x: 0.8, y: 5.8, w: 11.8, h: 0.6,
    fontSize: 18,
    bold: true,
    color: COLORS.accent,
    fontFace: 'Microsoft YaHei'
});

// 第10页：评估与持续改进
const slide10 = pptx.addSlide();
slide10.addText('六、评估与持续改进', {
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
        { text: 'Level 1', options: { fill: { color: 'F5F5F5' } } },
        '初始级',
        '开始使用AI工具',
        '完成工具配置'
    ],
    [
        { text: 'Level 2', options: { fill: { color: 'F5F5F5' } } },
        '应用级',
        '日常业务应用',
        '完成3个业务场景AI辅助'
    ],
    [
        { text: 'Level 3', options: { fill: { color: 'F5F5F5' } } },
        '熟练级',
        '熟练使用+优化',
        '60+模板+持续优化'
    ],
    [
        { text: 'Level 4', options: { fill: { color: 'F5F5F5' } } },
        '创新级',
        '创新应用+推广',
        '原型设计+Demo开发上线'
    ],
    [
        { text: 'Level 5', options: { fill: { color: 'F5F5F5' } } },
        '专家级',
        '方法论输出',
        '形成可复制的方法论'
    ]
];
slide10.addTable(maturityTable, {
    x: 0.5, y: 1.2, w: 12.333, h: 2.5,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});

const chart9Path = path.join(CHART_DIR, 'idp_chart09_maturity.png');
if (fs.existsSync(chart9Path)) {
    slide10.addImage({ path: chart9Path, x: 0.5, y: 4.0, w: 12, h: 3 });
}

// 第11页：团队分工与成功关键
const slide11 = pptx.addSlide();
slide11.addText('团队分工与成功关键', {
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
        { text: '张伟', options: { fill: { color: 'F5F5F5' } } },
        '申报简表系统、文献智能管理系统'
    ],
    [
        { text: '李明', options: { fill: { color: 'F5F5F5' } } },
        '账号配置、申报书模板、文献智能管理'
    ],
    [
        { text: '王芳', options: { fill: { color: 'F5F5F5' } } },
        '政策库、申报指南系统、投标策略分析'
    ],
    [
        { text: '刘洋', options: { fill: { color: 'F5F5F5' } } },
        '首批提示词模板、技术创新点挖掘'
    ],
    [
        { text: '陈静', options: { fill: { color: 'F5F5F5' } } },
        '典型案例库、商务标撰写'
    ],
    [
        { text: '赵强', options: { fill: { color: 'F5F5F5' } } },
        '文献资料库、决策知识库'
    ],
    [
        { text: '周杰', options: { fill: { color: 'F5F5F5' } } },
        '可研报告系统、智能决策助手'
    ],
    [
        { text: '吴敏', options: { fill: { color: 'F5F5F5' } } },
        'PPT模板、术语翻译系统'
    ],
    [
        { text: '孙浩', options: { fill: { color: 'F5F5F5' } } },
        '技术报告模板、数据分析看板'
    ],
    [
        { text: '朱婷', options: { fill: { color: 'F5F5F5' } } },
        '小论文模板、风险预警'
    ]
];
slide11.addTable(teamTable, {
    x: 0.5, y: 1.2, w: 12.333, h: 3.5,
    fontSize: 14,
    align: 'center',
    valign: 'mid',
    fontFace: 'Microsoft YaHei'
});

slide11.addText('成功关键', {
    x: 0.7, y: 4.9, w: 12, h: 0.4,
    fontSize: 20,
    bold: true,
    color: COLORS.warning,
    fontFace: 'Microsoft YaHei',
    fill: { color: 'FFF9E6' }
});
slide11.addText([
    { text: '聚焦核心业务：重点突破申报简表、指南、可研、标书等高频业务', options: { bullet: { indent: 0 } } },
    { text: '快速迭代验证：小步快跑，每周都有小成果', options: { bullet: { indent: 0 } } },
    { text: '团队协作共享：每周分享经验，共同进步', options: { bullet: { indent: 0 } } },
    { text: '业务导向驱动：始终围绕实际工作需求', options: { bullet: { indent: 0 } } }
], {
    x: 0.9, y: 5.5, w: 11.5, h: 2,
    fontSize: 16,
    lineSpacing: 30,
    fontFace: 'Microsoft YaHei'
});

// 第12页：总结与致谢
const slide12 = pptx.addSlide();
slide12.background = { color: COLORS.primary };
slide12.addText('总结与致谢', {
    x: 0.5, y: 1, w: 12.333, h: 1,
    fontSize: 44,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});

slide12.addText([
    { text: '8个月系统性AI能力建设', options: { bullet: { indent: 0 } } },
    { text: '重点突破4大核心业务场景', options: { bullet: { indent: 0 } } },
    { text: '完成科技项目原型设计与Demo开发', options: { bullet: { indent: 0 } } },
    { text: '预计效率提升60%以上！', options: { bullet: { indent: 0 } } }
], {
    x: 2.0, y: 2.5, w: 8.6, h: 3,
    fontSize: 24,
    color: COLORS.primary,
    lineSpacing: 40,
    fontFace: 'Microsoft YaHei',
    fill: { color: COLORS.white }
});

slide12.addText('谢谢！', {
    x: 0.5, y: 6.0, w: 12.333, h: 0.8,
    fontSize: 40,
    color: COLORS.white,
    bold: true,
    align: 'center',
    fontFace: 'Microsoft YaHei'
});

// 保存PPT
pptx.writeFile({ fileName: 'c:/AI学习资料/mesheer/idp_presentation_final_v2.pptx' })
    .then(() => {
        console.log('PPT生成成功！');
    })
    .catch((error) => {
        console.error('PPT生成失败：', error);
    });
