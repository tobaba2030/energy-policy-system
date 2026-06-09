# -*- coding: utf-8 -*-
"""
补充：国家算力网最新政策与中核前瞻性研究工作
"""
from docx import Document
from docx.shared import Pt, Inches, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn

def add_heading(doc, text, level=1):
    heading = doc.add_heading(text, level=level)
    heading.alignment = WD_ALIGN_PARAGRAPH.LEFT
    for run in heading.runs:
        run.font.name = 'Times New Roman'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    return heading

def add_paragraph(doc, text, bold_prefix=""):
    para = doc.add_paragraph()
    para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    para.paragraph_format.first_line_indent = Cm(0.74)
    para.paragraph_format.line_spacing = 1.5
    
    if bold_prefix:
        run = para.add_run(bold_prefix)
        run.bold = True
        run.font.name = 'Times New Roman'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
        run.font.size = Pt(12)
    
    run = para.add_run(text)
    run.font.name = 'Times New Roman'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    run.font.size = Pt(12)
    return para

def add_bullet_point(doc, text):
    para = doc.add_paragraph(style='List Bullet')
    para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    para.paragraph_format.line_spacing = 1.5
    run = para.add_run(text)
    run.font.name = 'Times New Roman'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    run.font.size = Pt(12)
    return para

def add_table(doc, headers, rows, caption=""):
    from docx.oxml.ns import qn as docqn
    from docx.oxml import OxmlElement
    
    if caption:
        cap_para = doc.add_paragraph()
        cap_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = cap_para.add_run(caption)
        run.bold = True
        run.font.name = 'Times New Roman'
        run._element.rPr.rFonts.set(docqn('w:eastAsia'), '宋体')
        run.font.size = Pt(10.5)
    
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = 'Table Grid'
    
    def set_cell_shading(cell, fill):
        shading_elm = OxmlElement('w:shd')
        shading_elm.set(docqn('w:fill'), fill)
        cell._tc.get_or_add_tcPr().append(shading_elm)
    
    header_row = table.rows[0]
    for i, header in enumerate(headers):
        cell = header_row.cells[i]
        cell.text = header
        set_cell_shading(cell, 'D9E2F3')
        for para in cell.paragraphs:
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            for run in para.runs:
                run.bold = True
                run.font.name = 'Times New Roman'
                run._element.rPr.rFonts.set(docqn('w:eastAsia'), '宋体')
                run.font.size = Pt(10.5)
    
    for row_idx, row_data in enumerate(rows):
        row = table.rows[row_idx + 1]
        for col_idx, cell_text in enumerate(row_data):
            cell = row.cells[col_idx]
            cell.text = cell_text
            for para in cell.paragraphs:
                para.alignment = WD_ALIGN_PARAGRAPH.CENTER
                for run in para.runs:
                    run.font.name = 'Times New Roman'
                    run._element.rPr.rFonts.set(docqn('w:eastAsia'), '宋体')
                    run.font.size = Pt(10.5)
    
    return table

doc = Document()

doc.styles['Normal'].font.name = 'Times New Roman'
doc.styles['Normal']._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
doc.styles['Normal'].font.size = Pt(12)

sections = doc.sections
for section in sections:
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.left_margin = Inches(1.25)
    section.right_margin = Inches(1.25)
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)

# 补充章节：国家算力网最新政策
add_heading(doc, "附录一：国家算力网最新政策解读", 1)

add_heading(doc, "1.1 六张网战略正式确立", 2)

add_paragraph(doc, "2026年4月28日，中共中央政治局召开会议，明确要求加强水网、新型电网、算力网、新一代通信网、城市地下管网、物流网等规划建设。这是六张网首次以系统性表述写入中央政治局会议部署，标志着算力网正式与水网、电网等传统基础设施平起平坐，上升为国家战略级基础设施。")

add_paragraph(doc, "2026年5月9日，国务院常务会议正式获批六张网规划，明确投资规模与建设优先级。根据规划，十五五期间（2026-2030年），六张网投资规模预计超过7万亿元，其中算力网与新型电网投资占比超过50%，成为最具潜力的投资赛道。")

add_heading(doc, "1.2 1+M+N三级节点体系建设", 2)

add_paragraph(doc, "2026年2月，工业和信息化部正式发布《关于组织开展国家算力互联互通节点建设工作的通知》（工信部通信函〔2026〕58号），部署国家级算力基础设施工程，核心是构建1+M+N三级节点体系：")

add_table(doc,
    ["节点类型", "定位", "数量", "核心功能"],
    [
        ["1：国家算力互联网服务节点", "国家级核心枢纽", "1个", "统一调度、算力交易、互联互通"],
        ["M：区域算力节点", "区域算力中心", "8-10个", "区域算力供给、负载均衡"],
        ["N：行业专用算力节点", "行业特色算力", "50+个", "行业垂直应用、定制化服务"],
    ],
    "表1 1+M+N国家算力互联互通节点体系"
)

add_paragraph(doc, "该体系通过构建统一标识、统一标准、统一规则的运行机制，实现不同区域、主体、架构的算力资源标准化互联和高效流动应用。")

add_heading(doc, "1.3 政策时间线与关键节点", 2)

add_table(doc,
    ["时间", "政策事件", "核心内容"],
    [
        ["2026年2月6日", "工信部发布算力互联互通通知", "部署1+M+N节点体系建设"],
        ["2026年4月28日", "中央政治局会议", "首次系统部署六张网建设"],
        ["2026年5月8日", "国家发改委等四部门", "联合发布算力基础设施建设意见"],
        ["2026年5月9日", "国务院常务会议", "正式批准六张网规划，7万亿投资落地"],
        ["2026年下半年", "配套政策密集出台", "超长期特别国债、专项债等资金到位"],
        ["2027年", "节点建设加速期", "区域节点和行业节点全面启动"],
        ["2030年", "体系基本成型", "形成全国一体化算力网络"],
    ],
    "表2 国家算力网政策时间线"
)

add_heading(doc, "1.4 中核集团在国家算力网中的战略机遇", 2)

add_paragraph(doc, "基于1+M+N体系架构，中核集团可在以下三个维度寻求战略突破：")

add_paragraph(doc, '', '战略机遇一：N类节点（行业专用节点）')
add_bullet_point(doc, "核电行业专用算力节点：依托秦山、大亚湾、福清等核电基地，建设核电行业专属算力节点")
add_bullet_point(doc, "核科学计算专用节点：支撑核聚变、核物理等前沿科学研究")
add_bullet_point(doc, "核工业仿真专用节点：支撑核电站设计、建设、运维全生命周期仿真")

add_paragraph(doc, '', '战略机遇二：M类节点（区域算力节点）')
add_bullet_point(doc, "长三角算力节点：依托秦山核电基地，打造核电驱动绿色算力示范区")
add_bullet_point(doc, "粤港澳算力节点：依托大亚湾核电基地，服务大湾区数字经济")
add_bullet_point(doc, "西部清洁能源算力节点：依托内蒙古、宁夏新能源基地，打造绿电算力走廊")

add_paragraph(doc, '', '战略机遇三：绿色算力标准制定者')
add_bullet_point(doc, "主导核电算力基础设施技术规范制定")
add_bullet_point(doc, "参与绿色算力碳足迹核算标准制定")
add_bullet_point(doc, "推动核电+算力一体化认证体系建立")

doc.add_page_break()

# 第二部分：前瞻性研究工作
add_heading(doc, "附录二：中核集团前瞻性研究工作规划", 1)

add_heading(doc, "2.1 前瞻性研究的战略定位", 2)

add_paragraph(doc, "前瞻性研究是中核集团电算协同业务的核心驱动力。通过技术预研、标准引领、生态构建三大路径，为集团在未来算力竞争中占据有利地位奠定坚实基础。")

add_heading(doc, "2.2 六大前瞻性技术研究方向", 2)

add_table(doc,
    ["研究方向", "技术内涵", "与算力网结合点", "研究周期", "预期成果"],
    [
        ["核电数字孪生", "核电站全生命周期数字镜像", "N类行业节点核心能力", "3-5年", "数字孪生平台v2.0"],
        ["核电具身智能", "AI与核岛设备深度融合", "高危作业替代", "5-8年", "三代核电机器人"],
        ["电力大模型", "电力垂直领域专用大模型", "智能调度与诊断", "2-3年", "CNNC-PowerLM v1.0"],
        ["源网荷储算脑", "电力流与算力流协同优化", "M类区域节点调度", "3-4年", "协同调度平台"],
        ["碳能算一体化", "碳-电-算三要素联合优化", "绿色算力认证", "2-3年", "碳能算一体化平台"],
        ["量子计算应用", "量子算法在核科学中应用", "科学计算加速", "5-10年", "量子计算实验室"],
    ],
    "表3 六大前瞻性技术研究方向"
)

add_heading(doc, "2.3 2026-2030年前瞻性研究路线图", 2)

add_paragraph(doc, '', '第一阶段（2026年）：战略布局与能力储备')
add_bullet_point(doc, "成立电算协同研究院，下设数字孪生、具身智能、电力大模型三个研究中心")
add_bullet_point(doc, "启动核电数字孪生平台研发，完成1.0版本架构设计")
add_bullet_point(doc, "与华为、阿里等企业建立战略合作，联合研发电力大模型")
add_bullet_point(doc, "申报1+M+N体系中核电行业专用算力节点")

add_paragraph(doc, '', '第二阶段（2027年）：核心技术突破')
add_bullet_point(doc, "发布CNNC-PowerLM v1.0电力大模型，实现核电运维智能诊断")
add_bullet_point(doc, "完成秦山核电基地数字孪生平台部署，实现设备状态实时感知")
add_bullet_point(doc, "启动具身智能预研，完成核电高危作业场景调研与方案设计")
add_bullet_point(doc, "主导或参与3-5项绿色算力相关标准制定")

add_paragraph(doc, '', '第三阶段（2028年）：示范应用与推广')
add_bullet_point(doc, "建成核电+算力一体化示范项目，形成可复制模式")
add_bullet_point(doc, "发布数字孪生平台v2.0，扩展至5个以上核电基地")
add_bullet_point(doc, "具身智能在核岛实现试点应用，减少人员辐照暴露50%")
add_bullet_point(doc, "建立源网荷储算脑原型系统，完成仿真验证")

add_paragraph(doc, '', '第四阶段（2029-2030年）：规模引领与生态构建')
add_bullet_point(doc, "建成10+核电算力节点，形成全国核电算力网络")
add_bullet_point(doc, "主导3-5项国家标准，行业话语权确立")
add_bullet_point(doc, "具身智能迭代至三代，实现核岛核心区域自主作业")
add_bullet_point(doc, "启动量子计算实验室建设，储备下一代计算能力")

add_heading(doc, "2.4 前瞻性研究组织保障", 2)

add_table(doc,
    ["机构设置", "核心职能", "人员规模", "牵头单位"],
    [
        ["电算协同研究院", "统筹集团电算协同前瞻性研究", "50-80人", "集团科技部"],
        ["数字孪生研究中心", "核电数字孪生技术研发", "15-20人", "核电运行研究院"],
        ["具身智能研究中心", "核电具身智能技术研发", "15-20人", "核电运行研究院"],
        ["电力大模型研究中心", "电力大模型研发与应用", "20-30人", "同方股份"],
        ["量子计算实验室", "量子计算应用研究", "10-15人", "集团战略研究院"],
    ],
    "表4 前瞻性研究组织架构"
)

add_heading(doc, "2.5 前瞻性研究资源配置", 2)

add_table(doc,
    ["资源类型", "2026年", "2027年", "2028年", "2029-2030年"],
    [
        ["研发投入（亿元）", "3-5", "5-8", "8-12", "10-15/年"],
        ["研发人员（人）", "50", "80", "120", "150+"],
        ["合作机构（家）", "5", "10", "15", "20+"],
        ["专利申报（项）", "10", "20", "30", "50+/年"],
    ],
    "表5 前瞻性研究资源配置规划"
)

add_heading(doc, "2.6 前瞻性研究与1+M+N体系对接", 2)

add_paragraph(doc, "中核集团前瞻性研究成果将直接支撑1+M+N体系中N类节点（行业专用算力节点）建设，形成研究-技术-应用-标准完整创新链条：")

add_bullet_point(doc, "核电数字孪生技术 → N类节点核心能力 → 核电运维智能化标准")
add_bullet_point(doc, "电力大模型技术 → N类节点智能服务 → 电力行业AI应用标准")
add_bullet_point(doc, "具身智能技术 → N类节点自主作业 → 核工业机器人标准")
add_bullet_point(doc, "源网荷储算脑技术 → M类节点协同调度 → 算力调度接口标准")
add_bullet_point(doc, "碳能算一体化技术 → N类节点绿色认证 → 绿色算力碳足迹标准")

doc.add_page_break()

# 结语
add_heading(doc, "附录三：总结与建议", 1)

add_paragraph(doc, '', '政策机遇研判')
add_paragraph(doc, "算力网纳入六张网核心基建，标志着算力基础设施正式上升为国家战略。十五五期间，7万亿投资将重塑算力产业格局。中核集团应抓住这一历史性机遇，将电算协同业务提升至集团核心战略高度。")

add_paragraph(doc, '', '前瞻性研究建议')
add_bullet_point(doc, "尽快成立电算协同研究院，统筹前瞻性研究工作")
add_bullet_point(doc, "聚焦六大技术方向，形成数字孪生+电力大模型+具身智能三大技术支柱")
add_bullet_point(doc, "积极参与1+M+N体系申报，争取核电行业专用算力节点资格")
add_bullet_point(doc, "主导或参与绿色算力相关标准制定，争取行业话语权")
add_bullet_point(doc, "加强与华为、阿里、国网、南网等头部企业战略合作")

add_paragraph(doc, '', '2030年愿景')
add_paragraph(doc, "到2030年，中核集团应建成覆盖10+核电基地的全国核电算力网络，成为1+M+N体系中N类节点的核心建设者和运营者，确立核电算力领域的技术引领者和标准制定者地位，为国家算力网建设贡献中核方案。")

# 页脚
footer_para = doc.add_paragraph()
footer_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = footer_para.add_run("— 完 —")
run.font.size = Pt(12)

disclaimer = doc.add_paragraph()
disclaimer.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = disclaimer.add_run("免责声明：本报告基于公开信息和行业研究形成，部分前瞻性判断存在不确定性，仅供集团高层领导决策参考。")
run.font.size = Pt(9)

note_para = doc.add_paragraph()
note_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = note_para.add_run("数据更新时间：2026年5月 | 政策信息截止日期：2026年5月")
run.font.size = Pt(9)

output_path = r'C:\AI学习资料\mesheer\中核集团电算协同_政策解读与前瞻性研究.docx'
doc.save(output_path)
print(f"补充文件生成成功: {output_path}")
