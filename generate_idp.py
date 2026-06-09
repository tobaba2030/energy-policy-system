# -*- coding: utf-8 -*-
"""
电网领域科创业务中心个人数字化AI专项IDP落地执行手册
生成Word文档的Python脚本
"""

from docx import Document
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.enum.table import WD_TABLE_ALIGNMENT

def add_chinese_font(run, font_name='微软雅黑', size=11):
    run.font.name = font_name
    run._element.rPr.rFonts.set(qn('w:eastAsia'), font_name)
    run.font.size = Pt(size)

def add_heading(doc, text, level=1):
    heading = doc.add_heading(text, level=level)
    for run in heading.runs:
        add_chinese_font(run, '微软雅黑', 16 if level == 1 else 14)
    return heading

def add_paragraph(doc, text, bold=False, italic=False, size=11):
    p = doc.add_paragraph()
    run = p.add_run(text)
    add_chinese_font(run, '微软雅黑', size)
    run.bold = bold
    run.italic = italic
    return p

def add_table(doc, data, headers=None):
    if headers:
        table = doc.add_table(rows=1, cols=len(headers))
        table.style = 'Table Grid'
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        
        hdr_cells = table.rows[0].cells
        for i, header in enumerate(headers):
            hdr_cells[i].text = header
            for paragraph in hdr_cells[i].paragraphs:
                for run in paragraph.runs:
                    add_chinese_font(run, '微软雅黑', 11)
                    run.bold = True
        
        for row_data in data:
            row_cells = table.add_row().cells
            for i, cell_data in enumerate(row_data):
                row_cells[i].text = str(cell_data)
                for paragraph in row_cells[i].paragraphs:
                    for run in paragraph.runs:
                        add_chinese_font(run, '微软雅黑', 10)
    else:
        table = doc.add_table(rows=1, cols=len(data[0]))
        table.style = 'Table Grid'
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        
        hdr_cells = table.rows[0].cells
        for i in range(len(data[0])):
            hdr_cells[i].text = str(data[0][i])
            for paragraph in hdr_cells[i].paragraphs:
                for run in paragraph.runs:
                    add_chinese_font(run, '微软雅黑', 11)
                    run.bold = True
        
        for row_data in data[1:]:
            row_cells = table.add_row().cells
            for i, cell_data in enumerate(row_data):
                row_cells[i].text = str(cell_data)
                for paragraph in row_cells[i].paragraphs:
                    for run in paragraph.runs:
                        add_chinese_font(run, '微软雅黑', 10)
    return table

def create_word_document():
    print('开始创建Word文档...')
    
    doc = Document()
    
    doc.styles['Normal'].font.name = '微软雅黑'
    doc.styles['Normal']._element.rPr.rFonts.set(qn('w:eastAsia'), '微软雅黑')
    
    print('添加封面页...')
    title = add_heading(doc, '电网领域科创业务中心', 0)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    subtitle = add_heading(doc, '个人数字化AI专项IDP落地执行手册', 1)
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    add_paragraph(doc, '')
    add_paragraph(doc, '')
    info_p = doc.add_paragraph()
    info_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = info_p.add_run('版本号：v1.0')
    add_chinese_font(run)
    info_p = doc.add_paragraph()
    info_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = info_p.add_run('编制日期：2026年5月')
    add_chinese_font(run)
    info_p = doc.add_paragraph()
    info_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = info_p.add_run('执行周期：2026年6月 - 2028年5月')
    add_chinese_font(run)
    
    doc.add_page_break()
    
    print('添加目录...')
    add_heading(doc, '目    录', 1)
    toc_items = [
        '1. 执行总览',
        '2. 第一阶段：即刻启动（第1-2个月）',
        '3. 第二阶段：知识库建设（第2-4个月）',
        '4. 第三阶段：提示词模板体系（第3-5个月）',
        '5. 第四阶段：三级项目实践（第4-12个月）',
        '6. 第五阶段：评估与持续改进',
        '7. 附：核心提示词模板库'
    ]
    for item in toc_items:
        add_paragraph(doc, item)
    
    doc.add_page_break()
    
    print('添加第一章...')
    add_heading(doc, '1. 执行总览', 1)
    add_heading(doc, '1.1 项目背景', 2)
    add_paragraph(doc, '随着人工智能技术的快速发展，大模型、深度学习等技术在电网领域的应用前景日益广阔。为提升科创业务中心的项目策划、申报、研究能力，特制定本IDP（个人发展计划）执行手册。')
    
    add_heading(doc, '1.2 总体目标', 2)
    add_paragraph(doc, '通过2年的系统性AI能力建设，实现以下目标：')
    
    goals = [
        '工作效率整体提升40%以上',
        '全员掌握AI工具应用，3-4人成为AI专家',
        '建立完整的电网领域AI工作体系',
        '产出3-5个创新应用项目'
    ]
    for goal in goals:
        p = doc.add_paragraph(style='List Bullet')
        run = p.add_run(goal)
        add_chinese_font(run, '微软雅黑', 11)
    
    add_heading(doc, '1.3 时间规划', 2)
    timeline_data = [
        ['第一阶段', '2026.6-2026.7', 'AI启蒙，工具试用', 'AI工具配置完成'],
        ['第二阶段', '2026.7-2026.9', '知识库建设', '完成首批知识库内容'],
        ['第三阶段', '2026.8-2026.10', '模板体系建立', '完成60+提示词模板'],
        ['第四阶段', '2026.9-2027.6', '能力提升', '完成三级项目实践'],
        ['第五阶段', '2027.7-2028.5', '价值创造', '形成方法论']
    ]
    add_table(doc, timeline_data, ['阶段', '时间周期', '核心任务', '预期成果'])
    
    doc.add_page_break()
    
    print('添加第二章...')
    add_heading(doc, '2. 第一阶段：即刻启动（第1-2个月）', 1)
    add_heading(doc, '2.1 立即行动清单', 2)
    action_data = [
        ['1', 'AI工具选型与账号配置', 'A类人员', 'AI工具配置手册', '2小时'],
        ['2', '电网政策文件收集', '全员', '政策库（首批20份）', '4小时'],
        ['3', '首批提示词模板制作', 'B类人员', '5个核心模板', '3小时'],
        ['4', '团队首次AI分享会', 'C类人员', '会议纪要+行动清单', '2小时']
    ]
    add_table(doc, action_data, ['序号', '任务', '负责人', '产出物', '时间估计'])
    
    add_heading(doc, '2.2 AI工具配置包', 2)
    add_paragraph(doc, '推荐配置以下AI工具：')
    tool_data = [
        ['Claude 3.5 Sonnet', '长文档写作、深度思考', '5星', '低'],
        ['GPT-4o', '多模态、PPT生成', '5星', '低'],
        ['Gamma', 'AI生成PPT演示', '5星', '低'],
        ['Notion', '知识库管理', '4星', '中'],
        ['Cursor', 'AI编程（A类）', '4星', '中高']
    ]
    add_table(doc, tool_data, ['工具名称', '用途', '推荐等级', '学习成本'])
    
    add_heading(doc, '2.3 第1周日程安排', 2)
    schedule_data = [
        ['周一', 'AI工具选型与账号注册'],
        ['周二', '政策文件收集（首批20份）'],
        ['周三', '首批提示词模板制作（5个）'],
        ['周四', '第一个文档AI尝试（简表练习）'],
        ['周五', '团队首次AI分享会 + 复盘']
    ]
    add_table(doc, schedule_data, ['日期', '任务安排'])
    
    doc.add_page_break()
    
    print('添加第三章...')
    add_heading(doc, '3. 第二阶段：知识库建设（第2-4个月）', 1)
    add_heading(doc, '3.1 知识库结构设计', 2)
    add_paragraph(doc, '电网领域知识库分为以下5个主要分类：')
    kb_structure = [
        '政策法规库 - 国家政策、行业标准、申报指南',
        '技术方向库 - 智能电网、电力市场、新能源、设备监测、调度优化',
        '研究机构库 - 高校院所、电网企业、设备厂商',
        '典型案例库 - 成功项目、申报材料、PPT范例',
        '文献资料库 - 中文期刊、外文期刊'
    ]
    for item in kb_structure:
        p = doc.add_paragraph(style='List Bullet')
        run = p.add_run(item)
        add_chinese_font(run, '微软雅黑', 11)
    
    add_heading(doc, '3.2 首批知识库内容清单', 2)
    add_paragraph(doc, '第1个月内需完成以下内容：')
    kb_content = [
        ['政策文件', '20份', '近2年国家级、省部级重要政策'],
        ['申报指南', '10份', '近2年重点项目申报指南'],
        ['典型案例', '10个', '成功申报的电网项目'],
        ['文献资料', '50篇', '高质量期刊论文']
    ]
    add_table(doc, kb_content, ['分类', '内容数量', '说明'])
    
    doc.add_page_break()
    
    print('添加第四章...')
    add_heading(doc, '4. 第三阶段：提示词模板体系（第3-5个月）', 1)
    add_heading(doc, '4.1 提示词模板矩阵', 2)
    template_matrix = [
        ['申报简表', '8个', '初级', '60%'],
        ['申报书', '15个', '中级', '50%'],
        ['可研报告', '12个', '中级', '45%'],
        ['PPT制作', '10个', '中级', '55%'],
        ['技术报告', '8个', '高级', '40%'],
        ['专利申请', '6个', '高级', '35%'],
        ['小论文', '8个', '高级', '40%']
    ]
    add_table(doc, template_matrix, ['材料类型', '提示词数量', '难度等级', '预计效率提升'])
    
    add_heading(doc, '4.2 TOP5高频提示词模板', 2)
    add_heading(doc, '模板1：电网项目简表亮点提炼', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '快速提炼项目申报简表的核心亮点，严格控制字数')
    add_paragraph(doc, '【使用方法】', bold=True)
    add_paragraph(doc, '填写项目基本信息和核心内容，AI将自动生成亮点。', italic=True)
    
    add_heading(doc, '模板2：电网技术方案AI设计', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '自动设计电网项目技术方案，包含架构图、技术路线')
    add_paragraph(doc, '【输出内容】', bold=True)
    add_paragraph(doc, '总体架构、关键技术、实施路线、可行性分析', italic=True)
    
    add_heading(doc, '模板3：电网文献综述AI辅助', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '智能梳理电网领域研究方向，分析技术发展路线')
    add_paragraph(doc, '【输出内容】', bold=True)
    add_paragraph(doc, '发展历程、技术对比、团队分析、研究空白', italic=True)
    
    add_heading(doc, '模板4：电网项目PPT自动生成', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '自动生成PPT大纲，逐页设计内容和图表')
    add_paragraph(doc, '【输出内容】', bold=True)
    add_paragraph(doc, '15-20页完整PPT大纲，含演讲备注', italic=True)
    
    add_heading(doc, '模板5：电网项目指南AI分析', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '深度分析项目指南，提炼重点，推荐申报方向')
    add_paragraph(doc, '【输出内容】', bold=True)
    add_paragraph(doc, '导向分析、关键词云、申报矩阵、避坑提醒', italic=True)
    
    doc.add_page_break()
    
    print('添加第五章...')
    add_heading(doc, '5. 第四阶段：三级项目实践（第4-12个月）', 1)
    add_heading(doc, '5.1 三级项目体系', 2)
    add_paragraph(doc, '项目实践分为三个等级，从个人到团队再到业务创新：')
    project_levels = [
        ['第一级', '个人效率工具', '1-2个月', '个人效率提升20%'],
        ['第二级', '团队协作工具', '3-5个月', '团队效率提升15%'],
        ['第三级', '业务创新应用', '6-12个月', '产生可量化业务价值']
    ]
    add_table(doc, project_levels, ['项目等级', '定位', '时间周期', '预期效果'])
    
    add_heading(doc, '5.2 重点项目介绍', 2)
    add_heading(doc, '项目1：电网政策智能推送助手', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '自动追踪电网领域政策动态，AI摘要生成，关键词订阅推送')
    project1_data = [
        ['政策源配置', '手动配置10个政策网站', '初级', '2小时'],
        ['AI摘要生成', 'Claude API自动摘要', '中级', '4小时'],
        ['关键词订阅', 'Notion数据库 + 标签', '初级', '2小时'],
        ['推送提醒', '邮件/企业微信通知', '中级', '3小时']
    ]
    add_table(doc, project1_data, ['功能模块', '实现方式', '难度', '预计时间'])
    
    add_heading(doc, '项目2：电网术语智能翻译与解释', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '建立电网术语库，支持智能查询、双语对照、概念关联')
    
    add_heading(doc, '项目3：电网项目申报智能模板系统', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '支持5类典型电网项目，AI自动生成申报书初稿')
    
    add_heading(doc, '项目4：电网文献智能管理系统', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '智能检索、AI摘要、知识关联、阅读进度追踪')
    
    add_heading(doc, '项目5：电网技术创新点挖掘系统', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '文献分析、专利分析、趋势预测、创新建议')
    
    add_heading(doc, '项目6：电网项目智能评估助手', 3)
    add_paragraph(doc, '【功能】', bold=True)
    add_paragraph(doc, '技术可行性、创新性、应用前景、风险分析')
    
    doc.add_page_break()
    
    print('添加第六章...')
    add_heading(doc, '6. 第五阶段：评估与持续改进', 1)
    add_heading(doc, '6.1 能力成熟度评估模型', 2)
    maturity_levels = [
        ['Level 1', '初始级', 'AI启蒙，开始试用'],
        ['Level 2', '应用级', '熟练使用，效率提升'],
        ['Level 3', '整合级', '体系建立，流程优化'],
        ['Level 4', '创新级', '应用创新，价值创造'],
        ['Level 5', '引领级', '方法论输出，行业引领']
    ]
    add_table(doc, maturity_levels, ['等级', '名称', '特征描述'])
    
    add_heading(doc, '6.2 季度评估检查清单', 2)
    quarterly_checklist = [
        ['AI工具使用', '尝试使用', '日常使用', '熟练使用', '创新使用', '引领使用'],
        ['效率提升', '0-10%', '10-25%', '25-40%', '40-60%', '60%+'],
        ['知识沉淀', '零散收集', '有序整理', '体系建立', '智能应用', '开放共享'],
        ['团队协作', '独立使用', '经验分享', '协同工作', '共创创新', '生态构建'],
        ['价值创造', '无', '效率提升', '质量提升', '业务创新', '行业影响']
    ]
    add_table(doc, quarterly_checklist, ['评估维度', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'])
    
    add_heading(doc, '6.3 成功关键', 2)
    success_keys = [
        '先试用，再深入 - 不要等准备完美，先开始用起来',
        '小步快跑，快速迭代 - 每周都有小成果，每月都有大进步',
        '团队协作，经验共享 - 每周分享，共同进步',
        '业务导向，价值驱动 - 始终围绕实际工作需求',
        '持续学习，拥抱变化 - AI发展很快，保持学习心态'
    ]
    for key in success_keys:
        p = doc.add_paragraph(style='List Number')
        run = p.add_run(key)
        add_chinese_font(run, '微软雅黑', 11)
    
    doc.add_page_break()
    
    print('添加第七章...')
    add_heading(doc, '7. 附：核心提示词模板（完整示例）', 1)
    add_heading(doc, '7.1 模板1：电网项目简表亮点提炼（完整版）', 2)
    add_paragraph(doc, '【系统提示】', bold=True)
    p = doc.add_paragraph()
    run = p.add_run('你是一位拥有20年电网领域项目申报经验的资深专家。你曾作为评审专家参与过100+个国家级、省部级电网项目的评审工作。你非常了解评审专家的关注点和偏好。')
    run.italic = True
    add_chinese_font(run, '微软雅黑', 11)
    
    add_paragraph(doc, '【用户输入】', bold=True)
    p = doc.add_paragraph()
    run = p.add_run('请帮我为以下电网项目提炼申报简表的核心亮点：\n项目名称：基于多模态大模型的配电网故障智能诊断与预警系统\n技术方向：智能电网/故障诊断/人工智能\n申报类型：科技部重点研发计划青年科学家项目')
    run.italic = True
    add_chinese_font(run, '微软雅黑', 11)
    
    add_paragraph(doc, '【输出要求】', bold=True)
    p = doc.add_paragraph()
    run = p.add_run('请严格按照JSON格式输出，包含立项意义、技术创新、应用前景、团队优势等部分，每部分严格控制字数。')
    run.italic = True
    add_chinese_font(run, '微软雅黑', 11)
    
    add_heading(doc, '7.2 模板2-5（概要）', 2)
    add_paragraph(doc, '模板2：电网技术方案AI设计 - 总体架构、关键技术、实施路线、可行性分析', italic=True)
    add_paragraph(doc, '模板3：电网文献综述AI辅助 - 发展历程、技术对比、团队分析、研究空白', italic=True)
    add_paragraph(doc, '模板4：电网项目PPT自动生成 - 15-20页完整PPT大纲，含演讲备注', italic=True)
    add_paragraph(doc, '模板5：电网项目指南AI分析 - 导向分析、关键词云、申报矩阵、避坑提醒', italic=True)
    
    doc.add_page_break()
    
    print('添加文档结尾...')
    add_paragraph(doc, '='*60, bold=True)
    add_paragraph(doc, '文档信息', bold=True)
    add_paragraph(doc, '版本号：v1.0')
    add_paragraph(doc, '编制日期：2026年5月')
    add_paragraph(doc, '更新周期：每季度复盘调整')
    add_paragraph(doc, '='*60, bold=True)
    
    filename = '电网领域AI专项IDP落地执行手册_v1.0.docx'
    doc.save(filename)
    print(f'\n✅ Word文档生成成功！')
    print(f'📄 文件名：{filename}')
    print(f'📍 文件位置：当前目录')
    
    return filename

if __name__ == '__main__':
    print('='*60)
    print('电网领域AI专项IDP落地执行手册 - Word文档生成器')
    print('='*60)
    print()
    
    try:
        filename = create_word_document()
        print()
        print('🎉 完成！您现在可以打开Word文档查看完整内容了！')
        print(f'📖 文件名：{filename}')
        print()
        print('💡 提示：您可以根据实际需要修改和完善文档内容。')
    except Exception as e:
        print(f'\n❌ 生成Word文档时出错：{e}')
        print()
        print('💡 请确保已安装python-docx库：')
        print('   pip install python-docx')