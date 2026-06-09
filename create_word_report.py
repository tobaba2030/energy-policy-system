# -*- coding: utf-8 -*-
import requests
import os
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# 图片URL列表
IMAGE_URLS = {
    'cover': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+infographic+showing+AI+technology+transforming+power+grid+operations+in+China%2C+featuring+smart+grid+visualization%2C+data+analytics+dashboards%2C+drone+inspection+systems%2C+and+diverse+workers+using+digital+tools%2C+modern+corporate+style%2C+blue+and+green+color+scheme&image_size=landscape_16_9',
    'ai_grid': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Illustration+of+artificial+intelligence+and+power+grid+system+integration%2C+neural+network+connected+to+electrical+infrastructure%2C+smart+sensors+and+data+flow+visualization%2C+futuristic+technology+concept%2C+blue+and+orange+color+scheme&image_size=square',
    'employment_stats': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data+visualization+showing+Chinese+power+grid+industry+employment+statistics%2C+bar+charts+and+numbers+displaying+7.62+million+workers+total%2C+1.36+million+in+State+Grid+Corporation%2C+hiring+trends%2C+professional+corporate+infographic+style&image_size=landscape_16_9',
    'ai_maturity': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI+application+maturity+stages+in+power+grid+industry%2C+showing+progression+from+pilot+testing+to+large-scale+deployment%2C+with+icons+representing+smart+dispatch%2C+drone+inspection%2C+load+forecasting%2C+smart+customer+service%2C+modern+infographic+with+progress+indicators&image_size=landscape_16_9',
    'six_scenarios': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Infographic+showing+six+major+AI+application+scenarios+in+power+grid%3A+smart+dispatching%2C+transmission+inspection%2C+customer+service%2C+load+forecasting%2C+data+entry%2C+and+electricity+trading%2C+with+icons+and+brief+descriptions+for+each+scenario%2C+modern+corporate+style&image_size=landscape_16_9',
    'job_matrix': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professional+2x2+matrix+chart+showing+power+grid+job+positions+categorized+by+AI+replacement+risk+and+skill+upgrade+requirements%2C+with+four+quadrants%3A+high+risk%2Freplacement%2C+medium+risk%2Ftransformation%2C+low+risk%2Faugmentation%2C+and+emerging+jobs%2C+with+specific+job+examples+in+each+quadrant%2C+corporate+infographic+style+with+clear+labels&image_size=landscape_16_9',
    'employee_impact': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Infographic+showing+estimated+AI+impact+on+power+grid+employees+in+China%2C+with+icons+representing+different+job+types+and+arrows+showing+transformation+paths%2C+showing+millions+of+workers+transitioning+to+new+roles%2C+data+visualization+style&image_size=landscape_16_9',
    'skill_radar': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Radar+chart+visualization+showing+changing+skill+requirements+in+power+grid+industry%2C+comparing+traditional+skills+vs+new+digital+skills%2C+including%3A+electrical+knowledge%2C+programming%2C+data+analysis%2C+AI+tools+usage%2C+cross-disciplinary+thinking%2C+report+writing%2C+modern+corporate+style+with+blue+gradient+colors&image_size=square',
    'employee_concerns': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Human+resources+survey+concept+showing+employee+concerns+about+AI+in+workplace%2C+diverse+employees+expressing+worries+and+questions+about+job+security+and+career+development%2C+corporate+training+context%2C+professional+illustration+style+with+warm+colors&image_size=landscape_16_9',
    'recruitment_pie': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Pie+chart+visualization+showing+State+Grid+Corporation+recruitment+structure+breakdown+by+major+categories%3A+electrical+engineering+60%25%2C+electronic+information%2Fcomputer%2FAI+20%25%2C+other+engineering+10%25%2C+management+and+others+10%25%2C+with+percentages+and+icons%2C+professional+corporate+infographic+style+with+blue+and+green+colors&image_size=square',
    'skill_comparison': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Comparison+chart+showing+before+and+after+AI+era+job+requirements+for+power+grid+positions%2C+left+side+showing+traditional+requirements%2C+right+side+showing+new+digital+requirements%2C+with+icons+for+each+skill%2C+professional+infographic+with+arrow+transition+elements&image_size=landscape_16_9',
    'global_impact': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Global+AI+impact+on+employment+statistics+visualization%2C+showing+McKinsey%2C+WEF%2C+and+ILO+data+about+job+displacement+and+creation%2C+world+map+with+data+points%2C+professional+data+journalism+style+with+multiple+chart+types&image_size=landscape_16_9',
    'ai_vs_jobs': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Bar+chart+comparing+jobs+displaced+by+AI+versus+new+jobs+created%2C+showing+McKinsey+data%3A+92+million+jobs+replaced+but+170+million+new+opportunities+created%2C+with+human+workers+transitioning+to+new+roles%2C+positive+future+outlook+visualization&image_size=landscape_16_9',
    'strategy_framework': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Strategic+framework+diagram+showing+four+dimensions+of+AI+adaptation+strategy+for+power+grid+companies%3A+skill+training+system+reconstruction%2C+job+transformation+pathway+design%2C+HR+policy+adjustment%2C+organizational+culture+building%2C+connected+with+arrows+in+a+circular+flow%2C+modern+infographic+style&image_size=landscape_16_9',
    'training': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Corporate+training+session+about+AI+and+digital+skills%2C+diverse+employees+learning+programming+and+data+analysis%2C+modern+training+room+with+technology+devices%2C+collaborative+learning+atmosphere%2C+professional+photography+style&image_size=landscape_16_9',
    'career_path': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Career+transformation+pathway+diagram+for+power+grid+employees%2C+showing+transition+from+traditional+roles+to+new+digital+roles+with+training+programs+and+intermediate+steps%2C+professional+flowchart+with+arrows+and+icons%2C+corporate+style+with+blue+colors&image_size=landscape_16_9',
    'hr_policy': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Human+resources+management+concept+for+AI+era%2C+showing+policy+adjustment+and+talent+development+strategies%2C+diverse+professional+team+in+modern+office%2C+strategic+planning+discussion%2C+corporate+photography+style&image_size=landscape_16_9',
    'culture': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Learning+organization+culture+in+power+grid+company%2C+employees+collaborating+and+sharing+knowledge+about+AI+and+new+technologies%2C+modern+corporate+culture+illustration%2C+diverse+team+working+together%2C+professional+illustration+style+with+warm+colors&image_size=landscape_16_9',
    'conclusions': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Research+conclusion+infographic+showing+key+findings+about+AI+impact+on+power+grid+employees%2C+with+icons+and+brief+summaries+of+main+conclusions%2C+professional+corporate+style+with+blue+gradient+colors&image_size=landscape_16_9',
    'future': 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Future+vision+of+AI-powered+power+grid%2C+showing+next-generation+smart+grid+with+autonomous+systems%2C+AI+operators+working+alongside+intelligent+machines%2C+futuristic+technology+concept%2C+blue+and+cyan+color+scheme+with+glowing+effects&image_size=landscape_16_9'
}

def download_images():
    """下载所有图片"""
    img_dir = 'c:/AI学习资料/mesheer/images'
    os.makedirs(img_dir, exist_ok=True)

    downloaded = {}
    for name, url in IMAGE_URLS.items():
        filename = f'{img_dir}/{name}.png'
        print(f'下载: {name}...')
        try:
            response = requests.get(url, timeout=60)
            if response.status_code == 200:
                with open(filename, 'wb') as f:
                    f.write(response.content)
                downloaded[name] = filename
                print(f'  成功: {filename}')
            else:
                print(f'  失败: HTTP {response.status_code}')
        except Exception as e:
            print(f'  失败: {str(e)}')
    return downloaded

def set_cell_shading(cell, color):
    shading_elm = OxmlElement('w:shd')
    shading_elm.set(qn('w:fill'), color)
    cell._tc.get_or_add_tcPr().append(shading_elm)

def create_report(images):
    doc = Document()
    style = doc.styles['Normal']
    style.font.name = '微软雅黑'
    style.font.size = Pt(11)
    style._element.rPr.rFonts.set(qn('w:eastAsia'), '微软雅黑')

    # ==================== 封面 ====================
    if 'cover' in images:
        doc.add_picture(images['cover'], width=Inches(6.5))

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title.add_run('\n\n\nAI发展及大规模应用对电网公司员工的影响与新诉求')
    run.bold = True
    run.font.size = Pt(24)
    run.font.color.rgb = RGBColor(0, 82, 155)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run2 = subtitle.add_run('深度调研报告')
    run2.bold = True
    run2.font.size = Pt(18)
    run2.font.color.rgb = RGBColor(0, 82, 155)

    doc.add_paragraph('\n\n')
    info = doc.add_paragraph()
    info.alignment = WD_ALIGN_PARAGRAPH.CENTER
    info.add_run('面向：管理层、人力资源部门\n范围：国家电网/南方电网总部、省级电网、地市级供电局\n报告日期：2025年5月').font.size = Pt(12)
    doc.add_page_break()

    # ==================== 执行摘要 ====================
    h1 = doc.add_heading('执行摘要', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    doc.add_paragraph('人工智能技术的快速发展正在深刻重塑全球职场结构，电网行业作为国民经济的支柱性基础设施，正处于这场变革的核心地带。本报告围绕国家电网、南方电网及其各级分支机构的员工群体，系统分析AI大规模应用对电网公司员工的具体影响及新诉求。')
    doc.add_paragraph('研究发现，当前电网系统AI应用正处于从"局部试点向规模化应用过渡"的关键阶段。在调度运行、输变电巡检、客户服务、负荷预测、数据录入与计量采集、电力交易等核心业务场景中，AI技术已开始深度渗透。')

    doc.add_heading('核心数据概览', level=2)
    table1 = doc.add_table(rows=7, cols=2)
    table1.style = 'Table Grid'
    data1 = [
        ('中国电力行业从业人员总数', '762万人'),
        ('国家电网员工总数', '136.14万人'),
        ('全球25%就业岗位受AI影响', 'ILO报告'),
        ('高收入国家受影响比例', '34%'),
        ('到2025年底中国岗位被AI替代比例', '38%'),
        ('电力行业连续第三年成为全球就业增长重要引擎', 'IEA报告'),
        ('麦肯锡：AI将替代9200万高度重复岗位', '但同时创造1.7亿新机会')
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
    if 'ai_grid' in images:
        doc.add_picture(images['ai_grid'], width=Inches(4))

    doc.add_paragraph('2025年《政府工作报告》明确提出推进"人工智能+"行动，能源电力领域被列为重点发展方向。2024年12月19日，国家电网发布千亿级多模态行业大模型——光明电力大模型，标志着电网AI应用进入新阶段。')

    h3 = doc.add_heading('关键政策节点', level=3)
    for b in ['2024年12月：国家电网发布"光明电力大模型"', '2025年《政府工作报告》：推进"人工智能+"行动', '中国电力企业联合会发布《中国电力行业人才年度发展报告2024》']:
        doc.add_paragraph(b, style='List Bullet')

    h2 = doc.add_heading('1.2 行业规模数据', level=2)
    doc.add_paragraph('根据中国电力企业联合会2025年报告：')
    if 'employment_stats' in images:
        doc.add_picture(images['employment_stats'], width=Inches(6))

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
    if 'ai_maturity' in images:
        doc.add_picture(images['ai_maturity'], width=Inches(6))

    h2 = doc.add_heading('2.2 重点应用场景分析', level=2)
    if 'six_scenarios' in images:
        doc.add_picture(images['six_scenarios'], width=Inches(6))

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
    if 'job_matrix' in images:
        doc.add_picture(images['job_matrix'], width=Inches(6))

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
    if 'employee_impact' in images:
        doc.add_picture(images['employee_impact'], width=Inches(6))

    table5 = doc.add_table(rows=5, cols=2)
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
    if 'skill_radar' in images:
        doc.add_picture(images['skill_radar'], width=Inches(4))

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
        ('数据分析能力', '加分项', '必备技能 ↑'),
        ('编程能力', 'IT岗位专有', '跨岗位需求 ↑'),
        ('AI工具使用', '无要求', '普遍要求 ↑'),
        ('报告编写能力', '一般要求', '成效展示 ↑'),
        ('跨学科整合', '稀缺能力', '竞争优势 ↑')
    ]
    for i, row_data in enumerate(data6):
        for j, cell_text in enumerate(row_data):
            table6.rows[i+1].cells[j].text = cell_text

    h2 = doc.add_heading('3.4 员工诉求与焦虑分析', level=2)
    if 'employee_concerns' in images:
        doc.add_picture(images['employee_concerns'], width=Inches(5))

    h3 = doc.add_heading('员工核心诉求', level=3)
    concerns = [
        ('职业发展确定性诉求', '"我的岗位未来在哪里？" "转型路径是什么？" "需要多长时间准备？"'),
        ('技能升级支持诉求', '"企业会提供培训吗？" "学习时间从哪里来？" "转型成本谁承担？"'),
        ('薪酬保障诉求', '"AI带来的效率提升如何分配？" "新技能要求会加薪吗？" "绩效评价标准会变吗？"'),
        ('组织承诺信任诉求', '"企业会裁员吗？" "内部转岗机制存在吗？" "变革过程中有人文关怀吗？"')
    ]
    for title, content in concerns:
        p = doc.add_paragraph()
        run1 = p.add_run(title + '：')
        run1.bold = True
        run1.font.color.rgb = RGBColor(0, 82, 155)
        p.add_run(content)
    doc.add_page_break()

    # ==================== 四、招聘端变化 ====================
    h1 = doc.add_heading('四、招聘端变化的实证分析', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('4.1 国家电网招聘结构变化', level=2)
    if 'recruitment_pie' in images:
        doc.add_picture(images['recruitment_pie'], width=Inches(4))

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
    if 'skill_comparison' in images:
        doc.add_picture(images['skill_comparison'], width=Inches(6))

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
    if 'global_impact' in images:
        doc.add_picture(images['global_impact'], width=Inches(6))

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
    if 'ai_vs_jobs' in images:
        doc.add_picture(images['ai_vs_jobs'], width=Inches(6))

    table11 = doc.add_table(rows=4, cols=2)
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
    if 'strategy_framework' in images:
        doc.add_picture(images['strategy_framework'], width=Inches(6))

    h2 = doc.add_heading('6.2 策略一：技能培训体系重构', level=2)
    if 'training' in images:
        doc.add_picture(images['training'], width=Inches(5))

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
    if 'career_path' in images:
        doc.add_picture(images['career_path'], width=Inches(6))

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
    if 'hr_policy' in images:
        doc.add_picture(images['hr_policy'], width=Inches(5))

    h3 = doc.add_heading('政策调整方向', level=3)
    policies = [
        '任职资格修订：将数据分析、编程、AI工具使用纳入岗位任职资格',
        '绩效评价优化：纳入AI工具应用、数据驱动决策表现',
        '薪酬激励机制：对稀缺技能员工给予薪酬补偿',
        '培训投入保障：将AI技能学习纳入年度必修内容'
    ]
    for i, p in enumerate(policies):
        doc.add_paragraph(f'{i+1}. {p}')

    h2 = doc.add_heading('6.5 策略四：组织文化建设', level=2)
    if 'culture' in images:
        doc.add_picture(images['culture'], width=Inches(5))

    h3 = doc.add_heading('文化建设要点', level=3)
    culture = [
        '透明沟通：定期发布AI应用进展报告',
        '学习氛围：营造"人人学AI、人人用AI"的文化',
        '人文关怀：关注员工心理状态，提供职业发展辅导',
        '信任建设：明确组织承诺，消除变革恐惧'
    ]
    for c in culture:
        doc.add_paragraph(c, style='List Bullet')
    doc.add_page_break()

    # ==================== 七、结论与展望 ====================
    h1 = doc.add_heading('七、结论与展望', level=1)
    h1.runs[0].font.color.rgb = RGBColor(0, 82, 155)

    h2 = doc.add_heading('7.1 核心结论', level=2)
    if 'conclusions' in images:
        doc.add_picture(images['conclusions'], width=Inches(6))

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
    if 'future' in images:
        doc.add_picture(images['future'], width=Inches(6))

    h3 = doc.add_heading('技术层面', level=3)
    doc.add_paragraph('行业大模型将推动AI从辅助工具向决策伙伴演进')
    h3 = doc.add_heading('组织层面', level=3)
    doc.add_paragraph('电网公司组织架构和岗位设置将持续优化，"数字原生"一代员工将逐步成为主力')
    h3 = doc.add_heading('员工层面', level=3)
    doc.add_paragraph('持续学习和能力迭代将成为职业发展常态，终身学习不再是口号而是现实需要')
    h3 = doc.add_heading('管理层面', level=3)
    doc.add_paragraph('"技术进步与员工发展双赢"是检验人力资源管理智慧的重要标准')
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

    doc.add_paragraph('\n\n报告编制说明：本报告数据来源于公开信息渠道，包括政府政策文件、行业研究报告、企业公开招聘信息、国际组织研究数据等。部分数据为基于公开信息的合理推算，仅供参考。')
    doc.add_paragraph('报告完成日期：2025年5月')

    # 保存文档
    output_path = 'c:/AI学习资料/mesheer/AI发展对电网公司员工影响深度调研报告.docx'
    doc.save(output_path)
    print(f'\n报告已生成：{output_path}')
    return output_path

if __name__ == '__main__':
    print('=' * 50)
    print('开始下载图片...')
    print('=' * 50)
    images = download_images()
    print(f'\n成功下载 {len(images)} 个图片')
    print('=' * 50)
    print('开始生成Word文档...')
    print('=' * 50)
    create_report(images)
    print('=' * 50)
    print('完成！')
