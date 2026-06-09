
# -*- coding: utf-8 -*-
"""
生成电网领域AI专项IDP落地执行手册 - 完整版
包含10个图表、详细执行内容、人员分工
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
    f'{chart_dir}/idp_chart05_knowledge_tree.png',
    f'{chart_dir}/idp_chart06_efficiency.png',
    f'{chart_dir}/idp_chart07_pyramid.png',
    f'{chart_dir}/idp_chart08_assignment_matrix.png',
    f'{chart_dir}/idp_chart09_maturity.png',
    f'{chart_dir}/idp_chart10_workload.png'
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
        run.add_picture(image_path, width=Inches(6))
        if caption:
            p = doc.add_paragraph()
            run = p.add_run(caption)
            set_chinese_font(run, size=10, bold=True)
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        doc.add_paragraph()  # 添加空行

def create_document():
    """创建文档"""
    doc = Document()
    
    # 文档标题页
    add_title(doc, '电网领域科创业务中心', level=1)
    add_title(doc, '个人数字化AI专项IDP落地执行手册', level=1)
    add_paragraph(doc, '', align_center=True)
    add_paragraph(doc, '版本号：v3.0', align_center=True)
    add_paragraph(doc, '编制日期：2026年5月', align_center=True)
    add_paragraph(doc, '执行周期：2026年6月 - 2027年1月', align_center=True)
    
    doc.add_page_break()
    
    # 目录
    add_title(doc, '目  录', level=1)
    
    doc.add_page_break()
    
    # 第一章：执行总览
    add_title(doc, '第一章 执行总览', level=1)
    
    add_title(doc, '1.1 项目背景', level=2)
    add_paragraph(doc, '随着人工智能技术的快速发展，大模型、深度学习等技术在电网领域的应用前景日益广阔。为提升科创业务中心的项目策划、申报、研究能力，特制定本IDP（个人发展计划）执行手册。', indent=True)
    add_paragraph(doc, '本手册旨在通过系统性的AI能力建设，在8个月内实现团队工作效率的显著提升，建立完整的AI应用体系，并形成可复制、可推广的创新应用案例。', indent=True)
    
    add_image(doc, charts[0], '图1-1 AI技术在电网领域应用趋势（2022-2027年预测）')
    
    add_title(doc, '1.2 总体目标', level=2)
    add_paragraph(doc, '通过8个月的系统性AI能力建设（2026年6月-2027年1月），实现以下目标：', indent=True)
    
    add_paragraph(doc, '• 工作效率整体提升40%以上')
    add_paragraph(doc, '• 全员掌握AI工具应用，3-4人成为AI专家')
    add_paragraph(doc, '• 建立完整的电网领域AI工作体系')
    add_paragraph(doc, '• 产出3-5个创新应用项目')
    
    add_image(doc, charts[1], '图1-2 AI能力建设四大目标权重分配')
    
    add_title(doc, '1.3 时间规划', level=2)
    time_table_headers = ['阶段', '时间周期', '核心任务', '预期成果']
    time_table_data = [
        ['阶段一', '2026.6-2026.7', 'AI启蒙，工具试用', 'AI工具配置完成'],
        ['阶段二', '2026.7-2026.8', '知识库建设', '完成首批知识库内容'],
        ['阶段三', '2026.8-2026.9', '模板体系建立', '完成60+提示词模板'],
        ['阶段四', '2026.9-2027.1', '能力提升与项目实践', '完成三级项目实践']
    ]
    add_table(doc, time_table_headers, time_table_data, '表1-1 总体时间规划表')
    
    add_image(doc, charts[2], '图1-3 IDP项目执行里程碑甘特图')
    
    doc.add_page_break()
    
    # 第二章：第一阶段
    add_title(doc, '第二章 第一阶段：AI启蒙（2026年6月-7月）', level=1)
    
    add_title(doc, '2.1 立即行动清单', level=2)
    action_headers = ['序号', '任务', '负责人', '协同人员', '产出物', '时间估计']
    action_data = [
        ['1', 'AI工具选型与账号配置', team_members[0], team_members[1], 'AI工具配置手册', '2小时'],
        ['2', '电网政策文件收集', team_members[2], '全员', '政策库（首批20份）', '4小时'],
        ['3', '首批提示词模板制作', team_members[3], f'{team_members[4]}、{team_members[5]}', '5个核心模板', '3小时'],
        ['4', '团队首次AI分享会', team_members[6], f'{team_members[7]}、{team_members[8]}', '会议纪要+行动清单', '2小时']
    ]
    add_table(doc, action_headers, action_data, '表2-1 立即行动清单及人员分工')
    
    add_title(doc, '2.2 AI工具配置包', level=2)
    add_paragraph(doc, '推荐配置以下AI工具：', indent=True)
    
    tool_headers = ['工具名称', '用途', '推荐等级', '学习成本']
    tool_data = [
        ['Claude 3.5 Sonnet', '长文档写作、深度思考', '5星', '低'],
        ['GPT-4o', '多模态、PPT生成', '5星', '低'],
        ['Gamma', 'AI生成PPT演示', '5星', '低'],
        ['Notion', '知识库管理', '4星', '中'],
        ['Cursor', 'AI编程', '4星', '中高']
    ]
    add_table(doc, tool_headers, tool_data, '表2-2 AI工具配置表')
    
    add_image(doc, charts[3], '图2-1 AI工具推荐星级对比雷达图')
    
    add_title(doc, '2.3 第1周日程安排', level=2)
    schedule_headers = ['日期', '任务安排']
    schedule_data = [
        ['周一', 'AI工具选型与账号注册'],
        ['周二', '政策文件收集（首批20份）'],
        ['周三', '首批提示词模板制作（5个）'],
        ['周四', '第一个文档AI尝试（简表练习）'],
        ['周五', '团队首次AI分享会 + 复盘']
    ]
    add_table(doc, schedule_headers, schedule_data, '表2-3 第1周日程安排表')
    
    doc.add_page_break()
    
    # 第三章：第二阶段
    add_title(doc, '第三章 第二阶段：知识库建设（2026年7月-8月）', level=1)
    
    add_title(doc, '3.1 知识库结构设计', level=2)
    add_paragraph(doc, '电网领域知识库分为以下5个主要分类：', indent=True)
    
    add_paragraph(doc, '• 政策法规库 - 国家政策、行业标准、申报指南')
    add_paragraph(doc, '• 技术方向库 - 智能电网、电力市场、新能源、设备监测、调度优化')
    add_paragraph(doc, '• 研究机构库 - 高校院所、电网企业、设备厂商')
    add_paragraph(doc, '• 典型案例库 - 成功项目、申报材料、PPT范例')
    add_paragraph(doc, '• 文献资料库 - 中文期刊、外文期刊')
    
    add_image(doc, charts[4], '图3-1 电网领域知识库分类结构')
    
    add_title(doc, '3.2 首批知识库内容清单', level=2)
    add_paragraph(doc, '第1个月内需完成以下内容：', indent=True)
    
    knowledge_headers = ['分类', '内容数量', '负责人', '说明']
    knowledge_data = [
        ['政策文件', '20份', team_members[2], '近2年国家级、省部级重要政策'],
        ['申报指南', '10份', team_members[3], '近2年重点项目申报指南'],
        ['典型案例', '10个', team_members[4], '成功申报的电网项目'],
        ['文献资料', '50篇', f'{team_members[5]}、{team_members[9]}', '高质量期刊论文']
    ]
    add_table(doc, knowledge_headers, knowledge_data, '表3-1 首批知识库内容清单及负责人')
    
    doc.add_page_break()
    
    # 第四章：第三阶段
    add_title(doc, '第四章 第三阶段：提示词模板体系（2026年8月-9月）', level=1)
    
    add_title(doc, '4.1 提示词模板矩阵', level=2)
    template_headers = ['材料类型', '提示词数量', '难度等级', '预计效率提升', '负责人']
    template_data = [
        ['申报简表', '8个', '初级', '60%', team_members[0]],
        ['申报书', '15个', '中级', '50%', team_members[1]],
        ['可研报告', '12个', '中级', '45%', team_members[6]],
        ['PPT制作', '10个', '中级', '55%', team_members[7]],
        ['技术报告', '8个', '高级', '40%', team_members[8]],
        ['专利申请', '6个', '高级', '35%', team_members[9]],
        ['小论文', '8个', '高级', '40%', team_members[5]]
    ]
    add_table(doc, template_headers, template_data, '表4-1 提示词模板矩阵')
    
    add_image(doc, charts[5], '图4-1 各类型提示词模板效率提升对比')
    
    add_title(doc, '4.2 TOP5高频提示词模板', level=2)
    add_title(doc, '4.2.1 模板1：电网项目简表亮点提炼', level=3)
    add_paragraph(doc, '【功能】快速提炼项目申报简表的核心亮点，严格控制字数', indent=True)
    add_paragraph(doc, '【使用方法】填写项目基本信息和核心内容，AI将自动生成亮点。', indent=True)
    
    add_title(doc, '4.2.2 模板2：电网技术方案AI设计', level=3)
    add_paragraph(doc, '【功能】自动设计电网项目技术方案，包含架构图、技术路线', indent=True)
    add_paragraph(doc, '【输出内容】总体架构、关键技术、实施路线、可行性分析', indent=True)
    
    add_title(doc, '4.2.3 模板3：电网文献综述AI辅助', level=3)
    add_paragraph(doc, '【功能】智能梳理电网领域研究方向，分析技术发展路线', indent=True)
    add_paragraph(doc, '【输出内容】发展历程、技术对比、团队分析、研究空白', indent=True)
    
    add_title(doc, '4.2.4 模板4：电网项目PPT自动生成', level=3)
    add_paragraph(doc, '【功能】自动生成PPT大纲，逐页设计内容和图表', indent=True)
    add_paragraph(doc, '【输出内容】15-20页完整PPT大纲，含演讲备注', indent=True)
    
    add_title(doc, '4.2.5 模板5：电网项目指南AI分析', level=3)
    add_paragraph(doc, '【功能】深度分析项目指南，提炼重点，推荐申报方向', indent=True)
    add_paragraph(doc, '【输出内容】导向分析、关键词云、申报矩阵、避坑提醒', indent=True)
    
    doc.add_page_break()
    
    # 第五章：第四阶段
    add_title(doc, '第五章 第四阶段：三级项目实践（2026年9月-2027年1月）', level=1)
    
    add_title(doc, '5.1 三级项目体系', level=2)
    add_paragraph(doc, '项目实践分为三个等级，从个人到团队再到业务创新：', indent=True)
    
    three_level_headers = ['项目等级', '定位', '时间周期', '负责人', '预期效果']
    three_level_data = [
        ['第一级', '个人效率工具', '2026.9-2026.10', '全员', '个人效率提升20%'],
        ['第二级', '团队协作工具', '2026.10-2026.11', f'{team_members[0]}、{team_members[3]}', '团队效率提升15%'],
        ['第三级', '业务创新应用', '2026.11-2027.1', f'{team_members[1]}、{team_members[6]}', '产生可量化业务价值']
    ]
    add_table(doc, three_level_headers, three_level_data, '表5-1 三级项目体系表')
    
    add_image(doc, charts[6], '图5-1 三级项目实践体系金字塔')
    
    add_title(doc, '5.2 重点项目介绍', level=2)
    add_title(doc, '5.2.1 项目1：电网政策智能推送助手', level=3)
    add_paragraph(doc, '【功能】自动追踪电网领域政策动态，AI摘要生成，关键词订阅推送', indent=True)
    
    project1_headers = ['功能模块', '实现方式', '难度', '负责人', '预计时间']
    project1_data = [
        ['政策源配置', '手动配置10个政策网站', '初级', team_members[2], '2小时'],
        ['AI摘要生成', 'Claude API自动摘要', '中级', team_members[3], '4小时'],
        ['关键词订阅', 'Notion数据库 + 标签', '初级', team_members[4], '2小时'],
        ['推送提醒', '邮件/企业微信通知', '中级', team_members[5], '3小时']
    ]
    add_table(doc, project1_headers, project1_data, '表5-2 电网政策智能推送助手功能模块')
    
    add_title(doc, '5.2.2 项目2：电网术语智能翻译与解释', level=3)
    add_paragraph(doc, '【功能】建立电网术语库，支持智能查询、双语对照、概念关联', indent=True)
    add_paragraph(doc, f'【负责人】{team_members[6]}、{team_members[7]}协同完成', indent=True)
    
    add_title(doc, '5.2.3 项目3：电网项目申报智能模板系统', level=3)
    add_paragraph(doc, '【功能】支持5类典型电网项目，AI自动生成申报书初稿', indent=True)
    add_paragraph(doc, f'【负责人】{team_members[8]}牵头，{team_members[9]}配合', indent=True)
    
    add_title(doc, '5.2.4 项目4：电网文献智能管理系统', level=3)
    add_paragraph(doc, '【功能】智能检索、AI摘要、知识关联、阅读进度追踪', indent=True)
    add_paragraph(doc, f'【负责人】{team_members[0]}、{team_members[1]}共同负责', indent=True)
    
    add_title(doc, '5.2.5 项目5：电网技术创新点挖掘系统', level=3)
    add_paragraph(doc, '【功能】文献分析、专利分析、趋势预测、创新建议', indent=True)
    add_paragraph(doc, f'【负责人】{team_members[3]}、{team_members[4]}技术攻关', indent=True)
    
    add_title(doc, '5.2.6 项目6：电网项目智能评估助手', level=3)
    add_paragraph(doc, '【功能】技术可行性、创新性、应用前景、风险分析', indent=True)
    add_paragraph(doc, f'【负责人】{team_members[2]}、{team_members[5]}联合开发', indent=True)
    
    add_title(doc, '5.2.7 项目7：科技项目原型设计与Demo开发', level=3)
    add_paragraph(doc, '【功能】需求智能解析、架构自动生成、原型快速构建、方案比选优化、文档自动生成', indent=True)
    add_paragraph(doc, '【目标】实现7天完成完整项目原型设计，效率提升70%', indent=True)
    add_paragraph(doc, f'【负责人】{team_members[6]}、{team_members[7]}、{team_members[8]}协同完成', indent=True)
    
    project7_headers = ['业务场景', '典型Demo项目', '实现方式', '负责人']
    project7_data = [
        ['申报前原型验证', '关键技术POC验证', 'Claude+Cursor快速开发', team_members[6]],
        ['技术方案演示', '可视化技术展示', 'AI生成演示界面', team_members[7]],
        ['项目评审演示', '项目Demo演示系统', 'AI辅助界面设计', team_members[8]],
        ['技术创新验证', '新技术快速验证', '快速迭代开发', team_members[6]],
        ['用户体验测试', '原型测试平台', 'AI生成测试用例', team_members[7]]
    ]
    add_table(doc, project7_headers, project7_data, '表5-3 Demo开发业务场景与负责人')
    
    add_paragraph(doc, '【Demo开发流程】Step1. 需求拆解 → Step2. 快速原型 → Step3. 验证迭代 → Step4. 最终Demo', indent=True)
    add_paragraph(doc, '【核心价值】快速验证技术可行性，降低项目申报风险，提升方案说服力', indent=True)
    
    add_image(doc, charts[7], '图5-2 重点项目团队成员责任分配矩阵')
    
    doc.add_page_break()
    
    # 第六章：第五阶段
    add_title(doc, '第六章 第五阶段：评估与持续改进（贯穿全周期）', level=1)
    
    add_title(doc, '6.1 能力成熟度评估模型', level=2)
    maturity_headers = ['等级', '名称', '特征描述']
    maturity_data = [
        ['Level 1', '初始级', 'AI启蒙，开始试用'],
        ['Level 2', '应用级', '熟练使用，效率提升'],
        ['Level 3', '整合级', '体系建立，流程优化'],
        ['Level 4', '创新级', '应用创新，价值创造'],
        ['Level 5', '引领级', '方法论输出，行业引领']
    ]
    add_table(doc, maturity_headers, maturity_data, '表6-1 能力成熟度评估模型')
    
    add_image(doc, charts[8], '图6-1 团队AI能力成熟度演进预测（8个月周期）')
    
    add_title(doc, '6.2 月度评估检查清单', level=2)
    eval_headers = ['评估维度', '第1周', '第2-3月', '第4-5月', '第6-7月', '第8月', '评估人']
    eval_data = [
        ['AI工具使用', '尝试使用', '日常使用', '熟练使用', '创新使用', '引领使用', team_members[0]],
        ['效率提升', '0-10%', '10-25%', '25-40%', '40-60%', '60%+', team_members[1]],
        ['知识沉淀', '零散收集', '有序整理', '体系建立', '智能应用', '开放共享', team_members[2]],
        ['团队协作', '独立使用', '经验分享', '协同工作', '共创创新', '生态构建', team_members[3]],
        ['价值创造', '无', '效率提升', '质量提升', '业务创新', '行业影响', team_members[6]]
    ]
    add_table(doc, eval_headers, eval_data, '表6-2 月度评估检查清单（周期调整为8个月）')
    
    add_title(doc, '6.3 成功关键', level=2)
    add_paragraph(doc, '• 先试用，再深入 - 不要等准备完美，先开始用起来', indent=False)
    add_paragraph(doc, '• 小步快跑，快速迭代 - 每周都有小成果，每月都有大进步', indent=False)
    add_paragraph(doc, '• 团队协作，经验分享 - 每周分享，共同进步', indent=False)
    add_paragraph(doc, '• 业务导向，价值驱动 - 始终围绕实际工作需求', indent=False)
    add_paragraph(doc, '• 持续学习，拥抱变化 - AI发展很快，保持学习心态', indent=False)
    
    doc.add_page_break()
    
    # 第七章：附录
    add_title(doc, '第七章 附 录', level=1)
    
    add_title(doc, '7.1 模板1：电网项目简表亮点提炼（完整版）', level=2)
    add_paragraph(doc, '【系统提示】', indent=True)
    add_paragraph(doc, '你是一位拥有20年电网领域项目申报经验的资深专家。你曾作为评审专家参与过100+个国家级、省部级电网项目的评审工作。你非常了解评审专家的关注点和偏好。', indent=True)
    add_paragraph(doc, '【用户输入】', indent=True)
    add_paragraph(doc, '请帮我为以下电网项目提炼申报简表的核心亮点：', indent=True)
    add_paragraph(doc, '项目名称：基于多模态大模型的配电网故障智能诊断与预警系统', indent=True)
    add_paragraph(doc, '技术方向：智能电网/故障诊断/人工智能', indent=True)
    add_paragraph(doc, '申报类型：科技部重点研发计划青年科学家项目', indent=True)
    add_paragraph(doc, '【输出要求】', indent=True)
    add_paragraph(doc, '请严格按照JSON格式输出，包含立项意义、技术创新、应用前景、团队优势等部分，每部分严格控制字数。', indent=True)
    
    add_title(doc, '7.2 模板2-5（概要）', level=2)
    add_paragraph(doc, '• 模板2：电网技术方案AI设计 - 总体架构、关键技术、实施路线、可行性分析', indent=False)
    add_paragraph(doc, '• 模板3：电网文献综述AI辅助 - 发展历程、技术对比、团队分析、研究空白', indent=False)
    add_paragraph(doc, '• 模板4：电网项目PPT自动生成 - 15-20页完整PPT大纲，含演讲备注', indent=False)
    add_paragraph(doc, '• 模板5：电网项目指南AI分析 - 导向分析、关键词云、申报矩阵、避坑提醒', indent=False)
    
    add_title(doc, '7.3 团队成员分工总览', level=2)
    member_headers = ['姓名', '主要负责任务']
    member_data = [
        [team_members[0], 'AI工具选型、申报简表模板、文献智能管理系统'],
        [team_members[1], '账号配置、申报书模板、文献智能管理系统'],
        [team_members[2], '政策文件收集、政策法规库、政策智能推送助手'],
        [team_members[3], '首批提示词模板、申报指南、技术创新点挖掘系统'],
        [team_members[4], '典型案例库、政策智能推送助手'],
        [team_members[5], '文献资料库、专利申请模板、政策智能推送助手'],
        [team_members[6], 'AI分享会、可研报告模板、术语智能翻译系统、Demo开发'],
        [team_members[7], 'PPT制作模板、术语智能翻译系统、Demo开发'],
        [team_members[8], '技术报告模板、项目智能评估助手、Demo开发'],
        [team_members[9], '小论文模板、文献资料库、项目智能评估助手']
    ]
    add_table(doc, member_headers, member_data, '表7-1 10位团队成员任务分配总览')
    
    add_image(doc, charts[9], '图7-1 团队成员任务负荷分布')
    
    doc.add_page_break()
    
    # 文档信息页
    add_paragraph(doc, '============================================================', align_center=True)
    add_paragraph(doc, '文档信息', align_center=True)
    add_paragraph(doc, '版本号：v3.0', align_center=True)
    add_paragraph(doc, '编制日期：2026年5月', align_center=True)
    add_paragraph(doc, '执行周期：2026年6月 - 2027年1月', align_center=True)
    add_paragraph(doc, '更新周期：每月复盘调整', align_center=True)
    add_paragraph(doc, '============================================================', align_center=True)
    
    return doc

if __name__ == '__main__':
    print('正在生成Word文档...')
    doc = create_document()
    output_path = 'c:/AI学习资料/mesheer/电网领域AI专项IDP落地执行手册_v3.0完整版.docx'
    doc.save(output_path)
    print(f'文档生成成功！保存位置：{output_path}')
