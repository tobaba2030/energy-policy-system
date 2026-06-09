
# -*- coding: utf-8 -*-
"""
生成电网领域AI专项IDP落地执行手册 - 核心业务强化版 v4.0
重点补充申报简表、指南、可研、标书等业务场景
新增：科技项目原型设计与DM开发
"""
from docx import Document
from docx.shared import Inches, Pt, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.enum.table import WD_TABLE_ALIGNMENT
import os

# 团队成员
team_members = ['张伟', '李明', '王芳', '刘洋', '陈静', '赵强', '周杰', '吴敏', '孙浩', '朱婷']

# 图表路径
chart_dir = 'c:/AI学习资料/mesheer/idp_charts'
charts = [
    f'{chart_dir}/idp_chart01_ai_trend.png',
    f'{chart_dir}/idp_chart02_goals.png',
    f'{chart_dir}/idp_chart03_gantt.png',
    f'{chart_dir}/idp_chart04_radar.png',
    f'{chart_dir}/idp_chart06_efficiency.png',
]

def set_chinese_font(run, size=12, bold=False):
    """设置中文字体"""
    run.font.name = '微软雅黑'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '微软雅黑')
    run.font.size = Pt(size)
    run.font.bold = bold

def add_title(doc, text, level=1):
    """添加标题"""
    if level == 1:
        p = doc.add_heading(text, level=level)
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_chinese_font(p.runs[0], size=18, bold=True)
    elif level == 2:
        p = doc.add_heading(text, level=level)
        set_chinese_font(p.runs[0], size=16, bold=True)
    elif level == 3:
        p = doc.add_heading(text, level=level)
        set_chinese_font(p.runs[0], size=14, bold=True)
    return p

def add_paragraph(doc, text, indent=False, align_center=False):
    """添加段落"""
    p = doc.add_paragraph()
    run = p.add_run(text)
    set_chinese_font(run, size=12)
    if indent:
        p.paragraph_format.first_line_indent = Inches(0.3)
    if align_center:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    return p

def add_table(doc, headers, data, caption=None):
    """添加表格"""
    if caption:
        p = doc.add_paragraph()
        run = p.add_run(caption)
        set_chinese_font(run, size=11, bold=True)
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    table = doc.add_table(rows=1, cols=len(headers))
    table.style = 'Light Grid Accent 1'
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    # 表头
    hdr_cells = table.rows[0].cells
    for i, header in enumerate(headers):
        hdr_cells[i].text = header
        for para in hdr_cells[i].paragraphs:
            for run in para.runs:
                set_chinese_font(run, size=11, bold=True)
    
    # 数据行
    for row_data in data:
        row_cells = table.add_row().cells
        for i, cell_data in enumerate(row_data):
            row_cells[i].text = str(cell_data)
            for para in row_cells[i].paragraphs:
                for run in para.runs:
                    set_chinese_font(run, size=10)
    
    return table

def add_image(doc, image_path, caption=None):
    """添加图片"""
    if os.path.exists(image_path):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run()
        run.add_picture(image_path, width=Inches(5.5))
        if caption:
            p = doc.add_paragraph()
            run = p.add_run(caption)
            set_chinese_font(run, size=10, bold=True)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_paragraph()

def create_document():
    """创建文档"""
    doc = Document()
    
    # ===== 封面页 =====
    add_title(doc, '电网领域科创业务中心', level=1)
    add_title(doc, '个人数字化AI专项IDP落地执行手册', level=1)
    add_paragraph(doc, '', align_center=True)
    add_paragraph(doc, '版本号：v4.0（核心业务强化版）', align_center=True)
    add_paragraph(doc, '编制日期：2026年5月', align_center=True)
    add_paragraph(doc, '执行周期：2026年6月 - 2027年1月', align_center=True)
    
    doc.add_page_break()
    
    # ===== 第一章：执行总览 =====
    add_title(doc, '第一章 执行总览', level=1)
    
    add_title(doc, '1.1 项目背景', level=2)
    add_paragraph(doc, '随着人工智能技术的快速发展，大模型、深度学习等技术在电网领域的应用前景日益广阔。为提升科创业务中心的项目策划、申报、研究能力，特制定本IDP（个人发展计划）执行手册。', indent=True)
    add_paragraph(doc, '本手册聚焦核心业务场景，重点围绕申报简表、申报指南、可研报告、标书撰写等日常工作，打造AI辅助工具矩阵，大幅提升业务效率。', indent=True)
    
    add_title(doc, '1.2 总体目标', level=2)
    add_paragraph(doc, '通过8个月的系统性AI能力建设（2026年6月-2027年1月），实现以下目标：', indent=True)
    add_paragraph(doc, '• 申报效率整体提升60%以上')
    add_paragraph(doc, '• 建成完整的业务场景AI辅助体系')
    add_paragraph(doc, '• 完成科技项目原型设计与DM开发')
    add_paragraph(doc, '• 全员掌握AI工具应用')
    
    add_image(doc, charts[0])
    
    add_title(doc, '1.3 时间规划', level=2)
    time_headers = ['阶段', '时间周期', '核心任务', '预期成果']
    time_data = [
        ['阶段一', '2026.6-2026.7', 'AI工具配置+核心业务梳理', '完成申报简表、指南、可研模板'],
        ['阶段二', '2026.7-2026.8', 'AI辅助体系建立', '60+提示词模板+业务工具'],
        ['阶段三', '2026.8-2026.9', '科技项目原型开发', '原型设计+DM开发初步成果'],
        ['阶段四', '2026.9-2027.1', '能力提升与深化应用', '标书模板+全面应用']
    ]
    add_table(doc, time_headers, time_data, '表1-1 总体时间规划表')
    
    add_image(doc, charts[1])
    
    doc.add_page_break()
    
    # ===== 第二章：AI工具配置 =====
    add_title(doc, '第二章 AI工具配置（第1-2周）', level=1)
    
    add_title(doc, '2.1 AI工具配置包', level=2)
    tool_headers = ['工具名称', '核心用途', '优先级', '学习成本']
    tool_data = [
        ['Claude 3.5 Sonnet', '申报简表、指南、可研撰写', '★★★★★', '低'],
        ['GPT-4o', '标书撰写、多模态内容生成', '★★★★★', '低'],
        ['Gamma', 'PPT自动生成', '★★★★☆', '低'],
        ['Notion', '知识库管理', '★★★☆☆', '中'],
        ['Cursor', '原型开发、代码生成', '★★★★☆', '中高']
    ]
    add_table(doc, tool_headers, tool_data, '表2-1 核心AI工具配置表')
    
    add_image(doc, charts[3])
    
    add_title(doc, '2.2 第1周行动清单', level=2)
    action_headers = ['日期', '任务', '负责人', '产出物']
    action_data = [
        ['周一', 'AI工具账号配置+试用', team_members[0], '工具配置手册'],
        ['周二', '核心业务场景梳理', team_members[1], '业务场景清单'],
        ['周三', '首批提示词模板制作（5个）', team_members[2], '5个核心模板'],
        ['周四', '第一个业务场景AI尝试', team_members[3], '简表练习成果'],
        ['周五', '团队AI分享会+复盘', team_members[4], '会议纪要']
    ]
    add_table(doc, action_headers, action_data, '表2-2 第1周行动清单')
    
    doc.add_page_break()
    
    # ===== 第三章：核心业务场景AI辅助体系 =====
    add_title(doc, '第三章 核心业务场景AI辅助体系（第2-8周）', level=1)
    
    # 3.1 申报简表AI辅助系统
    add_title(doc, '3.1 申报简表AI辅助系统', level=2)
    add_paragraph(doc, '【系统定位】快速生成高质量项目申报简表，提升申报效率60%以上', indent=True)
    
    add_title(doc, '3.1.1 核心功能模块', level=3)
    func_headers = ['功能模块', '实现方式', '效率提升', '负责人']
    func_data = [
        ['简表自动生成', 'Claude API + 模板库', '70%', team_members[0]],
        ['亮点智能提炼', '大模型 + 领域知识', '65%', team_members[1]],
        ['技术路线设计', '架构生成 + 方案推荐', '60%', team_members[2]],
        ['创新点分析', '文献挖掘 + 趋势分析', '55%', team_members[3]]
    ]
    add_table(doc, func_headers, func_data, '表3-1 申报简表系统功能模块')
    
    add_title(doc, '3.1.2 提示词模板示例', level=3)
    add_paragraph(doc, '【模板1：简表自动生成】', indent=True)
    add_paragraph(doc, '【角色】你是一位拥有20年电网领域项目申报经验的资深专家，熟悉各类科技项目申报流程。', indent=True)
    add_paragraph(doc, '【输入】请生成[项目类型]的申报简表，包含：项目名称、技术路线、预期成果。', indent=True)
    add_paragraph(doc, '【输出】生成符合申报要求的简表，严格控制字数，突出创新性。', indent=True)
    
    add_title(doc, '3.1.3 实施计划', level=3)
    plan_headers = ['时间', '任务', '交付物', '负责人']
    plan_data = [
        ['第2周', '简表模板设计', '10个简表模板', team_members[0]],
        ['第3周', '亮点提炼流程', '亮点提炼SOP', team_members[1]],
        ['第4周', '系统集成测试', '内测报告', team_members[2]],
        ['第5周', '正式上线运行', '用户手册', team_members[3]]
    ]
    add_table(doc, plan_headers, plan_data, '表3-2 申报简表系统实施计划')
    
    # 3.2 申报指南AI分析系统
    add_title(doc, '3.2 申报指南AI分析系统', level=2)
    add_paragraph(doc, '【系统定位】深度解析申报指南，自动匹配最适合的申报方向', indent=True)
    
    add_title(doc, '3.2.1 核心功能模块', level=3)
    guide_headers = ['功能模块', '实现方式', '效率提升', '负责人']
    guide_data = [
        ['指南智能解析', 'NLP + 结构化提取', '70%', team_members[4]],
        ['方向智能匹配', '向量数据库 + 推荐算法', '65%', team_members[5]],
        ['材料清单生成', '模板 + 智能填充', '60%', team_members[6]],
        ['时间节点提醒', '日历集成 + 自动化', '50%', team_members[7]]
    ]
    add_table(doc, guide_headers, guide_data, '表3-3 申报指南系统功能模块')
    
    add_title(doc, '3.2.2 提示词模板示例', level=3)
    add_paragraph(doc, '【模板：指南深度分析】', indent=True)
    add_paragraph(doc, '【任务】分析以下申报指南，识别：1）重点支持方向；2）关键考核指标；3）申报注意事项；4）推荐的申报策略。', indent=True)
    add_paragraph(doc, '【输出】结构化分析报告，包含：重点方向排名、材料清单、避坑指南、申报建议。', indent=True)
    
    add_title(doc, '3.2.3 实施计划', level=3)
    plan2_headers = ['时间', '任务', '交付物', '负责人']
    plan2_data = [
        ['第3周', '指南解析模型', '指南解析器', team_members[4]],
        ['第4周', '方向匹配算法', '推荐引擎', team_members[5]],
        ['第5周', '清单生成模块', '材料清单生成器', team_members[6]],
        ['第6周', '提醒系统集成', '日历提醒功能', team_members[7]]
    ]
    add_table(doc, plan2_headers, plan2_data, '表3-4 申报指南系统实施计划')
    
    # 3.3 可研报告AI辅助系统
    add_title(doc, '3.3 可研报告AI辅助系统', level=2)
    add_paragraph(doc, '【系统定位】自动生成高质量可行性研究报告，提升编写效率50%', indent=True)
    
    add_title(doc, '3.3.1 核心功能模块', level=3)
    research_headers = ['功能模块', '实现方式', '效率提升', '负责人']
    research_data = [
        ['大纲自动生成', '模板 + 领域知识', '60%', team_members[8]],
        ['技术方案设计', '架构生成 + 方案比选', '55%', team_members[9]],
        ['经济性分析', '计算模型 + 数据填充', '65%', team_members[0]],
        ['风险评估', 'AI风险识别 + 对策建议', '50%', team_members[1]]
    ]
    add_table(doc, research_headers, research_data, '表3-5 可研报告系统功能模块')
    
    add_title(doc, '3.3.2 提示词模板示例', level=3)
    add_paragraph(doc, '【模板：可研报告大纲生成】', indent=True)
    add_paragraph(doc, '【任务】为[项目名称]生成可行性研究报告大纲，要求：1）符合国家电网可研报告规范；2）包含技术、经济、社会评价；3）突出创新性和可行性。', indent=True)
    add_paragraph(doc, '【输出】完整的大纲，包含：章节结构、每章要点、推荐数据来源。', indent=True)
    
    add_title(doc, '3.3.3 实施计划', level=3)
    plan3_headers = ['时间', '任务', '交付物', '负责人']
    plan3_data = [
        ['第4周', '大纲生成模板', '20个大纲模板', team_members[8]],
        ['第5周', '方案设计模块', '方案设计工具', team_members[9]],
        ['第6周', '经济分析模型', '经济分析模板', team_members[0]],
        ['第7周', '风险评估模块', '风险评估工具', team_members[1]]
    ]
    add_table(doc, plan3_headers, plan3_data, '表3-6 可研报告系统实施计划')
    
    doc.add_page_break()
    
    # ===== 第四章：标书AI辅助系统 =====
    add_title(doc, '第四章 标书AI辅助系统（第6-12周）', level=1)
    
    add_title(doc, '4.1 系统定位', level=2)
    add_paragraph(doc, '【系统定位】为电网科技项目投标提供全流程AI支持，提升标书编写效率70%以上', indent=True)
    add_paragraph(doc, '【核心价值】标准化投标流程、智能化标书生成、自动化合规检查', indent=True)
    
    add_title(doc, '4.2 核心功能模块', level=2)
    bid_headers = ['功能模块', '实现方式', '效率提升', '负责人']
    bid_data = [
        ['投标策略分析', 'AI + 历史数据分析', '75%', team_members[2]],
        ['技术方案生成', '模板 + 知识库', '70%', team_members[3]],
        ['商务标撰写', '标准化模板 + AI填充', '65%', team_members[4]],
        ['价格策略优化', '成本模型 + 市场分析', '60%', team_members[5]],
        ['合规自动检查', '规则引擎 + AI校验', '80%', team_members[6]],
        ['标书排版优化', '格式模板 + 自动化', '70%', team_members[7]]
    ]
    add_table(doc, bid_headers, bid_data, '表4-1 标书系统功能模块')
    
    add_title(doc, '4.3 提示词模板库', level=2)
    add_title(doc, '4.3.1 技术方案模板', level=3)
    add_paragraph(doc, '【模板：投标技术方案生成】', indent=True)
    add_paragraph(doc, '【角色】你是一位资深的电网项目投标专家，熟悉各类电网项目的技术要求。', indent=True)
    add_paragraph(doc, '【输入】投标项目：[项目名称]，招标要求：[核心要求]，公司优势：[技术优势]。', indent=True)
    add_paragraph(doc, '【输出】生成完整的技术方案，包含：技术路线、项目实施方案、质量保证措施、售后服务承诺。', indent=True)
    
    add_title(doc, '4.3.2 商务标模板', level=3)
    add_paragraph(doc, '【模板：商务标自动生成】', indent=True)
    add_paragraph(doc, '【任务】生成符合招标要求的商务标，包含：公司资质、业绩证明、项目团队配置、报价方案。', indent=True)
    add_paragraph(doc, '【要求】严格遵守招标文件格式，字数控制在规定范围内。', indent=True)
    
    add_title(doc, '4.4 实施计划', level=2)
    bid_plan_headers = ['时间', '任务', '交付物', '负责人']
    bid_plan_data = [
        ['第6周', '投标策略分析模型', '策略分析工具', team_members[2]],
        ['第7周', '技术方案模板库', '30个技术方案模板', team_members[3]],
        ['第8周', '商务标标准化模板', '商务标模板', team_members[4]],
        ['第9周', '价格策略模型', '价格计算工具', team_members[5]],
        ['第10周', '合规检查引擎', '合规检查工具', team_members[6]],
        ['第11周', '系统集成测试', '集成测试报告', team_members[7]],
        ['第12周', '正式上线运行', '用户手册+培训', team_members[8]]
    ]
    add_table(doc, bid_plan_headers, bid_plan_data, '表4-2 标书系统实施计划')
    
    add_image(doc, charts[4])
    
    doc.add_page_break()
    
    # ===== 第五章：科技项目原型设计与DM开发 =====
    add_title(doc, '第五章 科技项目原型设计与DM开发（第6-16周）', level=1)
    
    add_title(doc, '5.1 项目背景', level=2)
    add_paragraph(doc, '科技项目原型设计与DM（Decision Management，决策管理）开发是科创中心提升核心竞争力的关键能力。通过AI辅助，快速构建项目原型，验证技术路线，形成可落地的解决方案。', indent=True)
    
    add_title(doc, '5.2 核心目标', level=2)
    add_paragraph(doc, '• 建成科技项目原型快速设计能力（时间缩短70%）', indent=True)
    add_paragraph(doc, '• 完成DM决策管理平台开发', indent=True)
    add_paragraph(doc, '• 形成3-5个可复用的项目原型库', indent=True)
    add_paragraph(doc, '• 培养2-3名原型设计专家', indent=True)
    
    add_title(doc, '5.3 原型设计AI辅助系统', level=2)
    
    add_title(doc, '5.3.1 系统功能架构', level=3)
    proto_headers = ['功能模块', '核心功能', '实现方式', '负责人']
    proto_data = [
        ['需求智能解析', '自动理解招标/申报需求', 'NLP + 意图识别', team_members[0]],
        ['架构自动生成', '系统架构、技术选型', '知识图谱 + 推荐算法', team_members[1]],
        ['原型快速构建', '低代码 + AI辅助', '可视化工具 + AI', team_members[2]],
        ['方案比选优化', '多方案对比、评分推荐', '多目标优化算法', team_members[3]],
        ['文档自动生成', '技术文档、说明文档', '模板 + AI生成', team_members[4]]
    ]
    add_table(doc, proto_headers, proto_data, '表5-1 原型设计系统功能模块')
    
    add_title(doc, '5.3.2 原型设计流程', level=3)
    add_paragraph(doc, 'Step 1：需求输入（第1天）', indent=True)
    add_paragraph(doc, '• AI自动解析招标/申报文件，提取关键技术要求', indent=True)
    add_paragraph(doc, '• 生成需求理解报告，明确设计要点', indent=True)
    
    add_paragraph(doc, 'Step 2：架构设计（第2-3天）', indent=True)
    add_paragraph(doc, '• AI推荐3-5种技术架构方案', indent=True)
    add_paragraph(doc, '• 自动生成架构对比分析报告', indent=True)
    add_paragraph(doc, '• 辅助选择最优架构方案', indent=True)
    
    add_paragraph(doc, 'Step 3：原型构建（第4-5天）', indent=True)
    add_paragraph(doc, '• AI辅助快速原型开发', indent=True)
    add_paragraph(doc, '• 自动化代码生成和组件复用', indent=True)
    add_paragraph(doc, '• 实时预览和交互测试', indent=True)
    
    add_paragraph(doc, 'Step 4：方案优化（第6-7天）', indent=True)
    add_paragraph(doc, '• 多方案比选和性能优化', indent=True)
    add_paragraph(doc, '• AI驱动的方案迭代改进', indent=True)
    add_paragraph(doc, '• 生成最终原型和设计文档', indent=True)
    
    add_title(doc, '5.3.3 提示词模板', level=3)
    add_paragraph(doc, '【模板：原型架构自动生成】', indent=True)
    add_paragraph(doc, '【任务】为[项目名称]设计系统架构，要求：1）满足[技术要求]；2）考虑[约束条件]；3）符合电网行业标准。', indent=True)
    add_paragraph(doc, '【输出】3种架构方案对比，包含：架构图、技术选型理由、优缺点分析、成本估算。', indent=True)
    
    add_title(doc, '5.4 DM决策管理平台开发', level=2)
    
    add_title(doc, '5.4.1 DM平台定位', level=3)
    add_paragraph(doc, '【平台定位】构建智能化决策支持系统，实现项目全生命周期的科学决策', indent=True)
    add_paragraph(doc, '【核心价值】数据驱动决策、流程自动化、知识沉淀复用', indent=True)
    
    add_title(doc, '5.4.2 功能模块设计', level=3)
    dm_headers = ['功能模块', '核心功能', 'AI应用', '负责人']
    dm_data = [
        ['决策知识库', '沉淀专家经验、智能检索', '知识图谱', team_members[5]],
        ['智能决策助手', 'AI辅助决策、方案推荐', '大语言模型', team_members[6]],
        ['流程自动化', '审批流程、任务分配', '工作流引擎', team_members[7]],
        ['数据分析看板', '项目数据、决策分析', 'BI + AI分析', team_members[8]],
        ['风险预警', '风险识别、预警推送', '机器学习', team_members[9]]
    ]
    add_table(doc, dm_headers, dm_data, '表5-2 DM平台功能模块')
    
    add_title(doc, '5.4.3 DM开发提示词模板', level=3)
    add_paragraph(doc, '【模板：智能决策建议生成】', indent=True)
    add_paragraph(doc, '【背景】项目[项目名称]面临[决策问题]，历史类似项目决策：[历史决策]。', indent=True)
    add_paragraph(doc, '【任务】基于历史数据和专家经验，生成3个决策建议方案。', indent=True)
    add_paragraph(doc, '【输出】包含：决策选项、推荐方案、风险评估、支持依据。', indent=True)
    
    add_title(doc, '5.5 实施计划', level=2)
    dev_plan_headers = ['时间', '阶段', '任务', '交付物', '负责人']
    dev_plan_data = [
        ['第6-7周', '原型设计系统V1.0', '需求分析+基础架构', '需求文档+架构设计', team_members[0]],
        ['第8-10周', '原型设计系统V2.0', '核心功能开发', '原型系统+测试报告', team_members[1]],
        ['第10-12周', 'DM平台V1.0', '知识库+决策助手', 'DM基础版本', team_members[2]],
        ['第12-14周', 'DM平台V2.0', '流程自动化+看板', 'DM完整版', team_members[3]],
        ['第15-16周', '系统集成优化', '联调测试+性能优化', '发布版本+用户手册', team_members[4]]
    ]
    add_table(doc, dev_plan_headers, dev_plan_data, '表5-3 科技项目原型设计与DM开发实施计划')
    
    doc.add_page_break()
    
    # ===== 第六章：评估与持续改进 =====
    add_title(doc, '第六章 评估与持续改进', level=1)
    
    add_title(doc, '6.1 能力成熟度模型', level=2)
    maturity_headers = ['等级', '名称', '特征', '验收标准']
    maturity_data = [
        ['Level 1', '初始级', '开始使用AI工具', '完成工具配置'],
        ['Level 2', '应用级', '日常业务应用', '完成3个业务场景AI辅助'],
        ['Level 3', '熟练级', '熟练使用+优化', '60+模板+持续优化'],
        ['Level 4', '创新级', '创新应用+推广', '原型设计+DM系统上线'],
        ['Level 5', '专家级', '方法论输出', '形成可复制的方法论']
    ]
    add_table(doc, maturity_headers, maturity_data, '表6-1 AI能力成熟度评估模型')
    
    add_title(doc, '6.2 月度评估检查表', level=2)
    eval_headers = ['评估维度', '第1月', '第2-3月', '第4-5月', '第6-8月', '评估人']
    eval_data = [
        ['申报简表', '完成模板', '系统上线', '持续优化', '全面应用', team_members[0]],
        ['申报指南', '完成解析器', '系统上线', '持续优化', '全面应用', team_members[1]],
        ['可研报告', '完成模板', '系统上线', '持续优化', '全面应用', team_members[2]],
        ['标书撰写', '未开始', '完成模板', '系统上线', '全面应用', team_members[3]],
        ['原型设计', '未开始', '未开始', '开始开发', '系统上线', team_members[4]],
        ['DM开发', '未开始', '未开始', '开始开发', '系统上线', team_members[5]]
    ]
    add_table(doc, eval_headers, eval_data, '表6-2 月度评估检查表')
    
    add_title(doc, '6.3 成功关键', level=2)
    add_paragraph(doc, '• 聚焦核心业务：重点突破申报简表、指南、可研、标书等高频业务', indent=True)
    add_paragraph(doc, '• 快速迭代验证：小步快跑，每周都有小成果', indent=True)
    add_paragraph(doc, '• 团队协作共享：每周分享经验，共同进步', indent=True)
    add_paragraph(doc, '• 业务导向驱动：始终围绕实际工作需求', indent=True)
    add_paragraph(doc, '• 持续学习进化：保持学习心态，拥抱AI变化', indent=True)
    
    doc.add_page_break()
    
    # ===== 第七章：附录 =====
    add_title(doc, '第七章 附 录', level=1)
    
    add_title(doc, '7.1 团队成员分工总览', level=2)
    member_headers = ['姓名', '核心职责', '主要负责模块']
    member_data = [
        [team_members[0], '申报简表系统', '简表模板+亮点提炼'],
        [team_members[1], '简表系统优化', '技术路线+创新分析'],
        [team_members[2], '申报指南系统', '指南解析+方向匹配'],
        [team_members[3], '指南系统优化', '材料清单+提醒功能'],
        [team_members[4], '可研报告系统', '大纲生成+方案设计'],
        [team_members[5], '可研系统优化+DM开发', '经济分析+风险评估'],
        [team_members[6], '标书系统+DM平台', '策略分析+合规检查'],
        [team_members[7], '标书系统优化', '商务标+排版优化'],
        [team_members[8], '原型设计系统', '需求解析+架构生成'],
        [team_members[9], '原型设计优化+DM平台', '原型构建+数据分析']
    ]
    add_table(doc, member_headers, member_data, '表7-1 10位团队成员任务分配总览')
    
    add_title(doc, '7.2 提示词模板快速参考', level=2)
    add_paragraph(doc, '【申报简表】', indent=True)
    add_paragraph(doc, '• 简表自动生成：角色设定 + 项目信息 + 输出要求', indent=True)
    add_paragraph(doc, '• 亮点智能提炼：项目信息 + 提炼要求 + 字数限制', indent=True)
    
    add_paragraph(doc, '【申报指南】', indent=True)
    add_paragraph(doc, '• 指南深度分析：指南全文 + 分析维度 + 输出格式', indent=True)
    add_paragraph(doc, '• 方向智能匹配：我的优势 + 指南要求 + 匹配逻辑', indent=True)
    
    add_paragraph(doc, '【可研报告】', indent=True)
    add_paragraph(doc, '• 大纲自动生成：项目背景 + 写作要求 + 章节结构', indent=True)
    add_paragraph(doc, '• 技术方案设计：项目需求 + 技术选型 + 方案对比', indent=True)
    
    add_paragraph(doc, '【标书撰写】', indent=True)
    add_paragraph(doc, '• 技术方案生成：招标要求 + 公司优势 + 写作规范', indent=True)
    add_paragraph(doc, '• 商务标撰写：资质要求 + 业绩说明 + 报价策略', indent=True)
    
    add_paragraph(doc, '【原型设计】', indent=True)
    add_paragraph(doc, '• 架构自动生成：项目需求 + 技术要求 + 约束条件', indent=True)
    add_paragraph(doc, '• 方案比选优化：候选方案 + 比选维度 + 推荐逻辑', indent=True)
    
    add_paragraph(doc, '【DM开发】', indent=True)
    add_paragraph(doc, '• 智能决策建议：决策问题 + 历史案例 + 推荐要求', indent=True)
    add_paragraph(doc, '• 风险预警分析：项目信息 + 风险类型 + 预警阈值', indent=True)
    
    doc.add_page_break()
    
    # 文档信息页
    add_paragraph(doc, '============================================================', align_center=True)
    add_paragraph(doc, '文档信息', align_center=True)
    add_paragraph(doc, '版本号：v4.0（核心业务强化版）', align_center=True)
    add_paragraph(doc, '编制日期：2026年5月', align_center=True)
    add_paragraph(doc, '执行周期：2026年6月 - 2027年1月', align_center=True)
    add_paragraph(doc, '更新周期：每月复盘调整', align_center=True)
    add_paragraph(doc, '============================================================', align_center=True)
    
    return doc

if __name__ == '__main__':
    print('正在生成Word文档...')
    doc = create_document()
    output_path = 'c:/AI学习资料/mesheer/电网领域AI专项IDP落地执行手册_v4.0_核心业务版.docx'
    doc.save(output_path)
    print(f'文档生成成功！保存位置：{output_path}')
