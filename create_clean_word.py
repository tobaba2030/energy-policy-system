# -*- coding: utf-8 -*-
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def set_cell_shading(cell, color):
    shading_elm = OxmlElement('w:shd')
    shading_elm.set(qn('w:fill'), color)
    cell._tc.get_or_add_tcPr().append(shading_elm)

def create_report():
    doc = Document()
    style = doc.styles['Normal']
    style.font.name = '微软雅黑'
    style.font.size = Pt(11)
    style._element.rPr.rFonts.set(qn('w:eastAsia'), '微软雅黑')

    # ==================== 封面 ====================
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title.add_run('\n\n\n\n\n\nAI发展及大规模应用对电网公司员工的影响与新诉求')
    run.bold = True
    run.font.size = Pt(26)
    run.font.color.rgb = RGBColor(0, 82, 155)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run2 = subtitle.add_run('\n\n深度调研报告')
    run2.bold = True
    run2.font.size = Pt(20)
    run2.font.color.rgb = RGBColor(0, 82, 155)

    doc.add_paragraph('\n\n\n')
    info = doc.add_paragraph()
    info.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run3 = info.add_run('\n面向：管理层、人力资源部门\n\n范围：国家电网/南方电网总部、省级电网、地市级供电局\n\n报告日期：2025年5月')
    run3.font.size = Pt(14)
    run3.font.color.rgb = RGBColor(80, 80, 80)

    doc.add_page_break()

    # ==================== 执行摘要 ====================
    h1 = doc.add_heading('执行摘要', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    doc.add_paragraph('人工智能技术的快速发展正在深刻重塑全球职场结构，电网行业作为国民经济的支柱性基础设施，正处于这场变革的核心地带。本报告围绕国家电网、南方电网及其各级分支机构的员工群体，系统分析AI大规模应用对电网公司员工的具体影响及新诉求。')
    doc.add_paragraph('研究发现，当前电网系统AI应用正处于从"局部试点向规模化应用过渡"的关键阶段。在调度运行、输变电巡检、客户服务、负荷预测、数据录入与计量采集、电力交易等核心业务场景中，AI技术已开始深度渗透。')

    doc.add_heading('核心数据概览', level=2)
    table1 = doc.add_table(rows=8, cols=2)
    table1.style = 'Table Grid'
    data1 = [
        ('中国电力行业从业人员总数', '762万人'),
        ('国家电网员工总数', '136.14万人'),
        ('全球25%就业岗位受AI影响', 'ILO报告'),
        ('高收入国家受影响比例', '34%'),
        ('到2025年底中国岗位被AI替代比例', '38%'),
        ('电力行业连续第三年成为全球就业增长重要引擎', 'IEA报告'),
        ('麦肯锡：AI将替代9200万高度重复岗位', '但同时创造1.7亿新机会'),
        ('转型缓冲期', '3-5年')
    ]
    for i, (col1, col2) in enumerate(data1):
        table1.rows[i].cells[0].text = col1
        table1.rows[i].cells[1].text = col2
        set_cell_shading(table1.rows[i].cells[0], 'E8F4FC')

    doc.add_paragraph('\n本报告的核心发现表明：AI对电网员工的影响呈现出显著的岗位分化特征——数据处理型岗位和重复性操作岗位受冲击最为直接，而需要复杂决策和现场应变能力的岗位则相对安全且面临能力升级要求。招聘端已出现明显变化，计算机、人工智能、数据科学等非电类专业占比从传统格局下的较低水平显著提升至约20%，编程能力和数据分析能力已成为跨岗位的核心任职要求。')
    doc.add_page_break()

    # ==================== 一、研究背景 ====================
    h1 = doc.add_heading('一、研究背景与方法论', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('1.1 研究背景', level=2)
    doc.add_paragraph('2025年《政府工作报告》明确提出推进"人工智能+"行动，能源电力领域被列为重点发展方向。2024年12月19日，国家电网发布千亿级多模态行业大模型——光明电力大模型，标志着电网AI应用进入新阶段。')

    h3 = doc.add_heading('关键政策节点', level=3)
    for b in ['2024年12月：国家电网发布"光明电力大模型"', '2025年《政府工作报告》：推进"人工智能+"行动', '中国电力企业联合会发布《中国电力行业人才年度发展报告2024》']:
        doc.add_paragraph(b, style='List Bullet')

    h2 = doc.add_heading('1.2 行业规模数据', level=2)
    doc.add_paragraph('根据中国电力企业联合会2025年报告：')

    table2 = doc.add_table(rows=5, cols=2)
    table2.style = 'Table Grid'
    data2 = [
        ('2024年中国电力行业从业人员总数', '762万人'),
        ('国家电网员工总数', '136.14万人'),
        ('国家电网2025年第一批录用人数', '19,990人'),
        ('国家电网2025年报名人数（一批+二批）', '112万人'),
        ('录用竞争比', '约1:56')
    ]
    for i, (col1, col2) in enumerate(data2):
        table2.rows[i].cells[0].text = col1
        table2.rows[i].cells[1].text = col2
        set_cell_shading(table2.rows[i].cells[0], 'E8F4FC')
    doc.add_page_break()

    # ==================== 二、AI应用现状 ====================
    h1 = doc.add_heading('二、AI在电网领域的应用现状分析', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('2.1 应用阶段定位', level=2)
    doc.add_paragraph('当前电网系统AI应用整体处于"局部试点向规模化过渡"阶段：')

    p = doc.add_paragraph()
    run = p.add_run('【发展阶段】')
    run.bold = True
    run.font.color.rgb = RGBColor(0, 82, 155)
    for stage in ['概念探索期：AI技术评估与可行性研究', '局部试点期（当前主流）：特定场景小范围验证', '规模化应用期：全面推广与系统集成']:
        doc.add_paragraph(stage, style='List Bullet')

    h2 = doc.add_heading('2.2 重点应用场景分析', level=2)

    table3 = doc.add_table(rows=7, cols=4)
    table3.style = 'Table Grid'
    headers3 = ['应用场景', 'AI技术', '当前效果', '替代影响']
    for i, h in enumerate(headers3):
        table3.rows[0].cells[i].text = h
        set_cell_shading(table3.rows[0].cells[i], '00529B')
        table3.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table3.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data3 = [
        ('智能调度', '负荷预测AI、态势感知', '杭州3秒完成全市负荷分析', '中等替代'),
        ('输变电巡检', '无人机+AI图像识别', '缺陷自动识别准确率超人工', '高替代'),
        ('客户服务', '智能客服机器人', '标准化咨询自动处理', '高替代'),
        ('负荷预测', '深度学习模型', '预测精准度大幅提升', '中等替代'),
        ('数据录入采集', 'RPA+OCR', '自动化率超80%', '极高替代'),
        ('电力交易', '量化交易AI', '实时策略优化', '中等替代')
    ]
    for i, row_data in enumerate(data3):
        for j, cell_text in enumerate(row_data):
            table3.rows[i+1].cells[j].text = cell_text

    doc.add_page_break()

    # ==================== 三、员工影响分析 ====================
    h1 = doc.add_heading('三、AI对电网员工的影响分析', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('3.1 岗位影响矩阵', level=2)

    p = doc.add_paragraph()
    run = p.add_run('【岗位替代风险分类】')
    run.bold = True
    run.font.color.rgb = RGBColor(0, 82, 155)

    table4 = doc.add_table(rows=6, cols=4)
    table4.style = 'Table Grid'
    headers4 = ['岗位类别', 'AI替代风险', '能力升级要求', '代表岗位']
    for i, h in enumerate(headers4):
        table4.rows[0].cells[i].text = h
        set_cell_shading(table4.rows[0].cells[i], '00529B')
        table4.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table4.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data4 = [
        ('极高风险', '>70%', '需完全转岗', '数据录入员、简单抄表员'),
        ('高风险', '50-70%', '需大幅提升', '标准化客服、巡检操作员'),
        ('中等风险', '30-50%', '需技能拓展', '一般调度辅助、营销岗'),
        ('低风险', '<30%', '需能力升级', '复杂故障处理、规划设计'),
        ('新兴岗位', '—', '全新能力', 'AI运维师、数据分析师')
    ]
    for i, row_data in enumerate(data4):
        for j, cell_text in enumerate(row_data):
            table4.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('3.2 员工规模影响估算', level=2)

    table5 = doc.add_table(rows=6, cols=2)
    table5.style = 'Table Grid'
    data5 = [
        ('电网行业总从业人员', '762万人'),
        ('高替代风险岗位占比（估算）', '15-25%'),
        ('受影响员工人数（估算）', '114-190万人'),
        ('转型缓冲期', '3-5年'),
        ('新型岗位需求', '持续增长')
    ]
    for i, (col1, col2) in enumerate(data5):
        table5.rows[i].cells[0].text = col1
        table5.rows[i].cells[1].text = col2
        set_cell_shading(table5.rows[i].cells[0], 'E8F4FC')

    h2 = doc.add_heading('3.3 技能需求变化趋势', level=2)

    table6 = doc.add_table(rows=7, cols=3)
    table6.style = 'Table Grid'
    headers6 = ['技能维度', '传统要求', 'AI时代要求']
    for i, h in enumerate(headers6):
        table6.rows[0].cells[i].text = h
        set_cell_shading(table6.rows[0].cells[i], '00529B')
        table6.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table6.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data6 = [
        ('电力专业知识', '核心能力', '基础门槛'),
        ('数据分析能力', '加分项', '必备技能 ↑↑'),
        ('编程能力', 'IT岗位专有', '跨岗位需求 ↑↑'),
        ('AI工具使用', '无要求', '普遍要求 ↑↑↑'),
        ('报告编写能力', '一般要求', '成效展示 ↑'),
        ('跨学科整合', '稀缺能力', '竞争优势 ↑↑')
    ]
    for i, row_data in enumerate(data6):
        for j, cell_text in enumerate(row_data):
            table6.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('3.4 员工诉求与焦虑分析', level=2)

    concerns = [
        ('职业发展确定性诉求', '"我的岗位未来在哪里？" "转型路径是什么？" "需要多长时间准备？"'),
        ('技能升级支持诉求', '"企业会提供培训吗？" "学习时间从哪里来？" "转型成本谁承担？"'),
        ('薪酬保障诉求', '"AI带来的效率提升如何分配？" "新技能要求会加薪吗？" "绩效评价标准会变吗？"'),
        ('组织承诺信任诉求', '"企业会裁员吗？" "内部转岗机制存在吗？" "变革过程中有人文关怀吗？"')
    ]
    for title, content in concerns:
        p = doc.add_paragraph()
        run1 = p.add_run('• ' + title + '：')
        run1.bold = True
        run1.font.color.rgb = RGBColor(0, 82, 155)
        p.add_run(content)
    doc.add_page_break()

    # ==================== 四、招聘端变化 ====================
    h1 = doc.add_heading('四、招聘端变化的实证分析', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('4.1 国家电网招聘结构变化', level=2)

    p = doc.add_paragraph()
    run = p.add_run('【2024-2025年招聘专业结构】')
    run.bold = True
    run.font.color.rgb = RGBColor(0, 82, 155)

    table7 = doc.add_table(rows=6, cols=3)
    table7.style = 'Table Grid'
    headers7 = ['专业类别', '占比', '典型专业']
    for i, h in enumerate(headers7):
        table7.rows[0].cells[i].text = h
        set_cell_shading(table7.rows[0].cells[i], '00529B')
        table7.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table7.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data7 = [
        ('电工类', '>60%', '电气工程、电力系统自动化'),
        ('电子信息类', '~20%', '计算机、人工智能、信息安全'),
        ('其他工学类', '~10%', '土木工程、机械工程'),
        ('管理类', '~5%', '工程管理、技术经济'),
        ('其他', '~5%', '会计、法学等')
    ]
    for i, row_data in enumerate(data7):
        for j, cell_text in enumerate(row_data):
            table7.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('4.2 岗位能力要求对比', level=2)

    table8 = doc.add_table(rows=6, cols=4)
    table8.style = 'Table Grid'
    headers8 = ['能力要求', '2020年前', '2024-2025年', '变化趋势']
    for i, h in enumerate(headers8):
        table8.rows[0].cells[i].text = h
        set_cell_shading(table8.rows[0].cells[i], '00529B')
        table8.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table8.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data8 = [
        ('编程能力', '可选/加分', '部分岗位必备', '显著提升'),
        ('数据分析', 'IT岗位专有', '跨岗位普遍要求', '大幅提升'),
        ('AI工具使用', '不要求', '越来越多岗位要求', '全新要求'),
        ('项目经验', '一般要求', '重点考察', '更受重视'),
        ('计算机证书', '加分项', '明确优先', '权重提升')
    ]
    for i, row_data in enumerate(data8):
        for j, cell_text in enumerate(row_data):
            table8.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('4.3 新兴岗位人才缺口', level=2)
    table9 = doc.add_table(rows=4, cols=4)
    table9.style = 'Table Grid'
    headers9 = ['岗位方向', '人才缺口', '从业现状', '入行窗口期']
    for i, h in enumerate(headers9):
        table9.rows[0].cells[i].text = h
        set_cell_shading(table9.rows[0].cells[i], '00529B')
        table9.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table9.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data9 = [
        ('电力交易员', '20万人', '80万人', '巨大'),
        ('数据中心人才', '80万人', '供需比1:6', '严重失衡'),
        ('AI算法工程师', '持续增长', '供不应求', '长期')
    ]
    for i, row_data in enumerate(data9):
        for j, cell_text in enumerate(row_data):
            table9.rows[i+1].cells[j].text = cell_text
    doc.add_page_break()

    # ==================== 五、行业数据 ====================
    h1 = doc.add_heading('五、行业数据与趋势分析', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('5.1 全球AI就业影响数据', level=2)

    table10 = doc.add_table(rows=7, cols=3)
    table10.style = 'Table Grid'
    headers10 = ['研究机构', '预测数据', '时间节点']
    for i, h in enumerate(headers10):
        table10.rows[0].cells[i].text = h
        set_cell_shading(table10.rows[0].cells[i], '00529B')
        table10.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table10.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data10 = [
        ('麦肯锡全球研究院', 'AI可能取代全球4-8亿个工作岗位', '2030年'),
        ('麦肯锡', '57%工作时长将被自动化', '理论上限'),
        ('世界经济论坛', 'AI净减少8500万个工作岗位', '2020-2025年'),
        ('世界经济论坛', '近40%工作技能需改变', '未来5年'),
        ('ILO', '全球25%就业岗位受生成式AI影响', '当前'),
        ('高收入国家', '34%岗位受影响', '当前')
    ]
    for i, row_data in enumerate(data10):
        for j, cell_text in enumerate(row_data):
            table10.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('5.2 AI替代与创造岗位对比', level=2)

    table11 = doc.add_table(rows=5, cols=2)
    table11.style = 'Table Grid'
    data11 = [
        ('麦肯锡：高度重复岗位替代', '9200万个'),
        ('麦肯锡：新机会创造', '1.7亿个'),
        ('净效应', '技能转型而非大规模失业'),
        ('转型缓冲期', '3-5年')
    ]
    for i, (col1, col2) in enumerate(data11):
        table11.rows[i].cells[0].text = col1
        table11.rows[i].cells[1].text = col2
        set_cell_shading(table11.rows[i].cells[0], 'E8F4FC')
    doc.add_page_break()

    # ==================== 六、应对策略 ====================
    h1 = doc.add_heading('六、应对挑战与策略建议', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('6.1 四维应对框架', level=2)

    p = doc.add_paragraph()
    run = p.add_run('【策略框架】')
    run.bold = True
    run.font.color.rgb = RGBColor(0, 82, 155)

    strategies = [
        '策略一：技能培训体系重构',
        '策略二：岗位转型通道设计',
        '策略三：人力资源政策调整',
        '策略四：组织文化建设'
    ]
    for s in strategies:
        doc.add_paragraph(s, style='List Bullet')

    h2 = doc.add_heading('6.2 策略一：技能培训体系重构', level=2)

    table12 = doc.add_table(rows=5, cols=3)
    table12.style = 'Table Grid'
    headers12 = ['培训对象', '培训重点', '目标']
    for i, h in enumerate(headers12):
        table12.rows[0].cells[i].text = h
        set_cell_shading(table12.rows[0].cells[i], '00529B')
        table12.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table12.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data12 = [
        ('高替代风险岗位', '转岗技能培训', '内部转岗'),
        ('中等替代风险岗位', 'AI工具使用', '人机协同'),
        ('低替代风险岗位', 'AI技术理解', '效率提升'),
        ('管理层', 'AI战略思维', '决策升级')
    ]
    for i, row_data in enumerate(data12):
        for j, cell_text in enumerate(row_data):
            table12.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('6.3 策略二：岗位转型通道设计', level=2)

    table13 = doc.add_table(rows=6, cols=3)
    table13.style = 'Table Grid'
    headers13 = ['起点岗位', '转型方向', '所需能力']
    for i, h in enumerate(headers13):
        table13.rows[0].cells[i].text = h
        set_cell_shading(table13.rows[0].cells[i], '00529B')
        table13.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table13.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data13 = [
        ('数据录入员', '数据分析师', 'Python、SQL、数据可视化'),
        ('简单抄表员', '计量设备运维', 'IoT、远程监控'),
        ('标准化客服', '复杂case处理', '沟通技巧、问题解决'),
        ('巡检操作员', '无人机操作员', '无人机驾驶、AI图像识别'),
        ('一般调度员', '智能调度分析师', 'AI辅助决策、系统管理')
    ]
    for i, row_data in enumerate(data13):
        for j, cell_text in enumerate(row_data):
            table13.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('6.4 策略三：人力资源政策调整', level=2)

    policies = [
        '1. 任职资格修订：将数据分析、编程、AI工具使用纳入岗位任职资格',
        '2. 绩效评价优化：纳入AI工具应用、数据驱动决策表现',
        '3. 薪酬激励机制：对稀缺技能员工给予薪酬补偿',
        '4. 培训投入保障：将AI技能学习纳入年度必修内容'
    ]
    for p_text in policies:
        doc.add_paragraph(p_text)

    h2 = doc.add_heading('6.5 策略四：组织文化建设', level=2)

    culture = [
        '• 透明沟通：定期发布AI应用进展报告',
        '• 学习氛围：营造"人人学AI、人人用AI"的文化',
        '• 人文关怀：关注员工心理状态，提供职业发展辅导',
        '• 信任建设：明确组织承诺，消除变革恐惧'
    ]
    for c in culture:
        doc.add_paragraph(c)
    doc.add_page_break()

    # ==================== 七、结论与展望 ====================
    h1 = doc.add_heading('七、结论与展望', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('7.1 核心结论', level=2)

    conclusions = [
        ('结论一', 'AI对电网员工的影响是全方位、结构性的，但并非"洪水猛兽"式的全面替代'),
        ('结论二', '招聘端变化是AI影响的先行指标，反映人才需求结构的深刻变化'),
        ('结论三', '员工层面存在技能焦虑、职业发展不确定性和组织承诺关切等合理诉求'),
        ('结论四', '应对AI挑战需要从培训、转型、政策、文化等多维度协同推进')
    ]
    for num, content in conclusions:
        p = doc.add_paragraph()
        run1 = p.add_run(num + '：')
        run1.bold = True
        run1.font.color.rgb = RGBColor(0, 82, 155)
        p.add_run(content)

    h2 = doc.add_heading('7.2 未来趋势展望', level=2)

    outlook = [
        ('技术层面', '行业大模型将推动AI从辅助工具向决策伙伴演进'),
        ('组织层面', '电网公司组织架构和岗位设置将持续优化，"数字原生"一代员工将逐步成为主力'),
        ('员工层面', '持续学习和能力迭代将成为职业发展常态，终身学习不再是口号而是现实需要'),
        ('管理层面', '"技术进步与员工发展双赢"是检验人力资源管理智慧的重要标准')
    ]
    for title, content in outlook:
        p = doc.add_paragraph()
        run1 = p.add_run('• ' + title + '：')
        run1.bold = True
        run1.font.color.rgb = RGBColor(0, 82, 155)
        p.add_run(content)
    doc.add_page_break()

    # ==================== 八、附录 ====================
    h1 = doc.add_heading('八、附录', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('附录一：主要参考数据来源', level=2)
    table14 = doc.add_table(rows=7, cols=3)
    table14.style = 'Table Grid'
    headers14 = ['来源', '报告/数据名称', '发布时间']
    for i, h in enumerate(headers14):
        table14.rows[0].cells[i].text = h
        set_cell_shading(table14.rows[0].cells[i], '00529B')
        table14.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table14.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data14 = [
        ('中国电力企业联合会', '《中国电力行业人才年度发展报告2024》', '2024年'),
        ('国际劳工组织(ILO)', '《生成式人工智能与就业》', '2024年'),
        ('世界经济论坛(WEF)', '《2025年未来就业报告》', '2025年1月'),
        ('国际能源署(IEA)', '《2025年世界能源就业报告》', '2025年'),
        ('麦肯锡全球研究院', '《自动化与就业报告》', '持续更新'),
        ('国家电网', '"光明电力大模型"发布', '2024年12月')
    ]
    for i, row_data in enumerate(data14):
        for j, cell_text in enumerate(row_data):
            table14.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('附录二：核心数据汇总表', level=2)
    table15 = doc.add_table(rows=10, cols=3)
    table15.style = 'Table Grid'
    headers15 = ['指标', '数值', '备注']
    for i, h in enumerate(headers15):
        table15.rows[0].cells[i].text = h
        set_cell_shading(table15.rows[0].cells[i], '00529B')
        table15.rows[0].cells[i].paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        table15.rows[0].cells[i].paragraphs[0].runs[0].font.bold = True

    data15 = [
        ('中国电力行业从业人员', '762万人', '中电联2025年报告'),
        ('国家电网员工总数', '136.14万人', '《财富》500强2024年数据'),
        ('国网2025年一批录用', '19,990人', '全系统67家单位'),
        ('国网2025年报名人数', '112万人', '一批+二批合计'),
        ('计算机/AI类招聘占比', '~20%', '电子信息类合计'),
        ('电工类专业招聘占比', '>60%', '传统核心专业'),
        ('全球25%就业受AI影响', 'ILO数据', '高收入国家34%'),
        ('技能需改变比例', '~40%', 'WEF未来5年预测'),
        ('转型缓冲期', '3-5年', '麦肯锡建议')
    ]
    for i, row_data in enumerate(data15):
        for j, cell_text in enumerate(row_data):
            table15.rows[i+1].cells[j].text = cell_text

    doc.add_paragraph('\n\n')
    p = doc.add_paragraph()
    run = p.add_run('报告编制说明：')
    run.bold = True
    doc.add_paragraph('本报告数据来源于公开信息渠道，包括政府政策文件、行业研究报告、企业公开招聘信息、国际组织研究数据等。部分数据为基于公开信息的合理推算，仅供参考。')
    doc.add_paragraph('报告完成日期：2025年5月')

    # 保存文档
    output_path = 'c:/AI学习资料/mesheer/AI发展对电网公司员工影响深度调研报告_纯净版.docx'
    doc.save(output_path)
    print(f'\n报告已生成：{output_path}')
    return output_path

if __name__ == '__main__':
    print('=' * 50)
    print('开始生成纯净版Word文档（不含图片）...')
    print('=' * 50)
    create_report()
    print('=' * 50)
    print('完成！')
