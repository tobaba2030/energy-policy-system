# -*- coding: utf-8 -*-
"""
生成包含精美可视化图表的Word报告
"""
from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn

def add_heading(doc, text, level=1):
    """添加标题"""
    heading = doc.add_heading(text, level=level)
    heading.alignment = WD_ALIGN_PARAGRAPH.LEFT
    for run in heading.runs:
        run.font.name = 'Times New Roman'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    return heading

def add_paragraph(doc, text, bold_prefix=""):
    """添加段落"""
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
    """添加项目符号"""
    para = doc.add_paragraph(style='List Bullet')
    para.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    para.paragraph_format.line_spacing = 1.5
    run = para.add_run(text)
    run.font.name = 'Times New Roman'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    run.font.size = Pt(12)
    return para

def add_image_with_caption(doc, image_path, caption, width=Cm(14)):
    """添加带标题的图片"""
    para = doc.add_paragraph()
    para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = para.add_run()
    try:
        run.add_picture(image_path, width=width)
    except Exception as e:
        run.add_text(f"[图片: {caption}]")
        print(f"警告: 无法插入图片 {image_path}")
    
    cap_para = doc.add_paragraph()
    cap_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = cap_para.add_run(caption)
    run.bold = True
    run.font.name = 'Times New Roman'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    run.font.size = Pt(10.5)

# 创建文档
doc = Document()

# 设置默认字体
doc.styles['Normal'].font.name = 'Times New Roman'
doc.styles['Normal']._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
doc.styles['Normal'].font.size = Pt(12)

# 页面设置
sections = doc.sections
for section in sections:
    section.page_width = Inches(8.27)
    section.page_height = Inches(11.69)
    section.left_margin = Inches(1.25)
    section.right_margin = Inches(1.25)
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)

# 首先添加封面图
add_image_with_caption(doc, 'report_cover_elegant.png', '', width=Cm(16))
doc.add_page_break()

# 执行摘要
add_heading(doc, '【报告摘要】', 1)

add_paragraph(doc, '电算协同作为新型电力系统建设与数字经济深度融合的战略交汇点，正在加速从"概念验证"迈向"规模化落地"。本报告站在国家战略高度，系统研判中核集团开展电算协同业务的宏观机遇、技术前沿与生态布局，为集团高层决策提供前瞻性智库支撑。')

add_paragraph(doc, '', '核心研判：')
add_bullet_point(doc, '战略机遇：中核集团在"东数西算"和"新型电力系统"双重战略交汇点上占据独特地位，核电是实现绿色算力的最优能源载体')
add_bullet_point(doc, '技术前沿：数字孪生、电力大模型、具身智能、源网荷储算脑、碳能算一体化、量子计算六大技术方向构成电算协同的技术护城河')
add_bullet_point(doc, '生态位势：构建"核电算力+绿色认证+碳资产"三位一体竞争优势，确立"绿色算力核心供应商"定位')
add_bullet_point(doc, '实施路径：2026-2028年完成从试点探索到规模引领的战略跨越，2030年确立行业领先地位')

doc.add_page_break()

# 企业级信息图
add_heading(doc, '一、中核集团电算协同业务全景', 1)
add_image_with_caption(doc, 'nuclear_computing_infographic.png', '图1 中核集团电算协同业务全景图', width=Cm(15))

doc.add_page_break()

# 形势研判
add_heading(doc, '二、形势研判：战略窗口期', 1)

add_heading(doc, '2.1 全球算力竞争格局', 2)
add_paragraph(doc, '算力已成为衡量国家竞争力的关键指标。在全球数字化竞争加剧的背景下，主要经济体纷纷将算力基础设施提升至国家战略层面。这场算力竞赛的本质，正在从单纯的"算力规模"竞争，向"算力质量"和"算力效率"竞争转变。')

add_heading(doc, '2.2 关键数据洞察', 2)
add_paragraph(doc, '根据预测，到2030年全球数据中心年耗电量将突破950TWh，约等于日本全国一年的用电总量；中国数据中心用电量将突破5500亿千瓦时，占全社会用电比重达5.5%。AI驱动的算力需求将成为主要增长引擎。')

add_heading(doc, '2.3 政策演进', 2)
add_paragraph(doc, '2026年绿色算力国家标准出台，2027年算力参与辅助服务市场，2028年数据中心碳排放要求强制执行，2029年东数西算深化，2030年算电协同生态成熟。')

doc.add_page_break()

# 业务架构
add_heading(doc, '三、业务架构：多层协同体系', 1)
add_image_with_caption(doc, 'business_architecture_modern.png', '图2 中核集团电算协同业务架构', width=Cm(15))

doc.add_page_break()

# 三力布局
add_heading(doc, '四、三力布局：核电-新能源-绿电协同', 1)
add_image_with_caption(doc, 'three_force_layout_modern.png', '图3 核电-新能源-绿电三力协同布局', width=Cm(15))

doc.add_page_break()

# 战略定位与实施路径
add_heading(doc, '五、战略定位与实施路径', 1)

add_heading(doc, '5.1 三大战略卡位', 2)
add_paragraph(doc, '', '卡位一：绿色算力核心供应商')
add_paragraph(doc, '中核集团应定位为国家算力基础设施的"绿色能源心脏"。核电的三大特性使其成为数据中心最理想的能源来源，这一战略卡位具有不可复制性。')

add_paragraph(doc, '', '卡位二：电算协同标准制定者')
add_paragraph(doc, '依托行业地位和技术积累，积极参与甚至主导电算协同领域国家标准制定：核电算力基础设施技术规范、绿色算力碳足迹核算标准、源网荷储算脑接口标准。')

add_paragraph(doc, '', '卡位三：电算协同示范引领者')
add_paragraph(doc, '打造"核电+算力"一体化示范项目，形成可复制、可推广的发展模式，为国家电算协同战略提供"中核方案"。')

add_heading(doc, '5.2 三阶段实施路径', 2)
add_bullet_point(doc, '2026年：战略布局期 - 完成顶层设计，启动秦山、福清等核电基地试点')
add_bullet_point(doc, '2027年：能力形成期 - 建成示范项目，发布电力大模型1.0')
add_bullet_point(doc, '2028年：规模引领期 - 3-5个基地运营，发布行业标准')
add_bullet_point(doc, '2029年：快速扩张期 - 5-8个基地，生态伙伴30+')
add_bullet_point(doc, '2030年：成熟领先期 - 10+基地，主导3-5项国家标准，年营收150-200亿元')

doc.add_page_break()

# 技术前沿与生态
add_heading(doc, '六、技术前沿与生态运营', 1)

add_heading(doc, '6.1 六大技术方向', 2)
add_bullet_point(doc, '数字孪生：核电站全生命周期管理，2026年规模化应用')
add_bullet_point(doc, '具身智能：核岛高危作业替代，2027年安全突破')
add_bullet_point(doc, '电力大模型：智能调度与诊断，2026年发布1.0')
add_bullet_point(doc, '源网荷储算脑：电力流与算力流协同，2027年试点验证')
add_bullet_point(doc, '碳能算一体化：碳足迹追溯与认证，2026年启动')
add_bullet_point(doc, '量子计算：科学计算加速，2026年能力储备')

add_heading(doc, '6.2 生态伙伴网络', 2)
add_bullet_point(doc, '算力技术厂商：华为、阿里、百度 - 技术赋能')
add_bullet_point(doc, '电网企业：国网、南网 - 市场准入')
add_bullet_point(doc, '云服务商：阿里云、腾讯云 - 市场渠道')
add_bullet_point(doc, '科研机构：清华、中科院 - 前沿创新')
add_bullet_point(doc, '碳服务机构：碳交所 - 碳业务支撑')
add_bullet_point(doc, 'IDC运营商：万国数据、秦淮数据 - 运营经验')

add_heading(doc, '6.3 商业模式创新', 2)
add_bullet_point(doc, '核电绿电算力：电价+绿电溢价')
add_bullet_point(doc, '碳资产管理：碳交易收益')
add_bullet_point(doc, '调峰辅助服务：辅助服务分成')
add_bullet_point(doc, '技术能力输出：授权许可费')

doc.add_page_break()

# 结语与展望
add_heading(doc, '七、结语与战略建议', 1)

add_paragraph(doc, '', '【核心结论】')
add_paragraph(doc, '电算协同是中核集团服务国家战略、实现转型升级的核心战略方向。在"双碳"目标和"数字中国"战略的双重驱动下，电算协同正处于历史性发展窗口期。')

add_paragraph(doc, '', '【战略建议】')
add_bullet_point(doc, '提升战略定位：将电算协同提升为集团核心战略业务，而非单纯的多元化探索')
add_bullet_point(doc, '加快布局节奏：2026年完成战略规划，2027年建成示范项目，2028年形成规模效应')
add_bullet_point(doc, '强化技术引领：依托核电运行研究院和同方股份，加快核心技术研发')
add_bullet_point(doc, '主导标准制定：积极参与国家标准、行业标准制定，争取行业话语权')
add_bullet_point(doc, '构建开放生态：与电网企业、云服务商、科研机构建立战略合作')

add_paragraph(doc, '', '【2030年愿景】')
add_bullet_point(doc, '算力规模：运营绿色算力超过50,000P')
add_bullet_point(doc, '碳资产管理：管理核电碳资产超过500万吨')
add_bullet_point(doc, '技术标准：主导制定3-5项国家标准')
add_bullet_point(doc, '行业地位：成为国内领先、国际一流的绿色算力服务商')
add_bullet_point(doc, '营业收入：年营业收入突破150-200亿元')

# 页脚
footer_para = doc.add_paragraph()
footer_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = footer_para.add_run('— 完 —')
run.font.size = Pt(12)

disclaimer = doc.add_paragraph()
disclaimer.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = disclaimer.add_run('免责声明：本报告基于公开信息和行业研究形成，部分前瞻性判断存在不确定性，仅供集团高层领导决策参考。')
run.font.size = Pt(9)

note_para = doc.add_paragraph()
note_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = note_para.add_run('数据更新时间：2026年5月')
run.font.size = Pt(9)

# 保存文档
output_path = r'C:\AI学习资料\mesheer\中核集团电算协同战略研究报告_精美版.docx'
doc.save(output_path)
print(f"精美版报告生成成功: {output_path}")
