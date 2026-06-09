# -*- coding: utf-8 -*-
"""
中核集团电算协同业务战略研究报告
面向：集团高层领导
定位：战略级智库报告
密级：内部资料
编制单位：科技创新业务中心
编制日期：2026年5月
"""
from docx import Document
from docx.shared import Pt, Inches, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

def set_cell_shading(cell, fill):
    shading_elm = OxmlElement('w:shd')
    shading_elm.set(qn('w:fill'), fill)
    cell._tc.get_or_add_tcPr().append(shading_elm)

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

def add_text_box(doc, content, caption=""):
    if caption:
        cap_para = doc.add_paragraph()
        cap_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = cap_para.add_run(caption)
        run.bold = True
        run.font.name = 'Times New Roman'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
        run.font.size = Pt(10.5)
    
    for line in content.split('\n'):
        para = doc.add_paragraph()
        para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        para.paragraph_format.line_spacing = 1.2
        run = para.add_run(line)
        run.font.name = 'Times New Roman'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
        run.font.size = Pt(10.5)
        run.font.color.rgb = RGBColor(100, 100, 100)

def add_table(doc, headers, rows, caption=""):
    if caption:
        cap_para = doc.add_paragraph()
        cap_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = cap_para.add_run(caption)
        run.bold = True
        run.font.name = 'Times New Roman'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
        run.font.size = Pt(10.5)
    
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = 'Table Grid'
    
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
                run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
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
                    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
                    run.font.size = Pt(10.5)
    
    return table

def add_image_with_caption(doc, image_path, caption, width=Cm(14)):
    para = doc.add_paragraph()
    para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = para.add_run()
    try:
        run.add_picture(image_path, width=width)
    except:
        run.add_text(f"[图片: {caption}]")
    
    cap_para = doc.add_paragraph()
    cap_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = cap_para.add_run(caption)
    run.bold = True
    run.font.name = 'Times New Roman'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    run.font.size = Pt(10.5)

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

# 封面
for _ in range(4):
    doc.add_paragraph()

title1 = doc.add_paragraph()
title1.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = title1.add_run("中核集团电算协同业务")
run.bold = True
run.font.name = 'Times New Roman'
run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
run.font.size = Pt(26)

title2 = doc.add_paragraph()
title2.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = title2.add_run("战略研究报告")
run.bold = True
run.font.name = 'Times New Roman'
run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
run.font.size = Pt(26)

for _ in range(6):
    doc.add_paragraph()

info_para = doc.add_paragraph()
info_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = info_para.add_run("面向：集团高层领导\n定位：战略级智库报告\n密级：内部资料\n编制单位：科技创新业务中心\n编制日期：2026年5月")
run.font.name = 'Times New Roman'
run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
run.font.size = Pt(12)

doc.add_page_break()

# 摘要
add_heading(doc, "【报告摘要】", 1)

add_paragraph(doc, '电算协同作为新型电力系统建设与数字经济深度融合的战略交汇点，正在加速从"概念验证"迈向"规模化落地"。本报告站在国家战略高度，系统研判中核集团开展电算协同业务的宏观机遇、技术前沿与生态布局，为集团高层决策提供前瞻性智库支撑。')

add_paragraph(doc, '', '核心研判：')
add_bullet_point(doc, "战略机遇：中核集团在\"东数西算\"和\"新型电力系统\"双重战略交汇点上占据独特地位，核电是实现绿色算力的最优能源载体")
add_bullet_point(doc, "技术前沿：数字孪生、电力大模型、具身智能、源网荷储算脑、碳能算一体化、量子计算六大技术方向构成电算协同的技术护城河")
add_bullet_point(doc, "生态位势：构建\"核电算力+绿色认证+碳资产\"三位一体竞争优势，确立\"绿色算力核心供应商\"定位")
add_bullet_point(doc, "实施路径：2026-2028年完成从试点探索到规模引领的战略跨越，2030年确立行业领先地位")

doc.add_page_break()

# 第一章
add_heading(doc, "一、形势研判：电算协同的战略窗口期", 1)

add_heading(doc, "1.1 全球算力竞争格局演变", 2)

add_paragraph(doc, '算力已成为衡量国家竞争力的关键指标。在全球数字化竞争加剧的背景下，主要经济体纷纷将算力基础设施提升至国家战略层面。这场算力竞赛的本质，正在从单纯的"算力规模"竞争，向"算力质量"和"算力效率"竞争转变。')

add_paragraph(doc, '这一转变意味着，算力的"绿色化"将成为决定竞争胜负的关键变量。谁能提供稳定、清洁、低碳的算力能源，谁就能在未来的算力竞争中占据制高点。')

add_heading(doc, "1.2 算力需求爆发：2025-2030年数据洞察", 2)

add_paragraph(doc, '算力需求激增正在重塑全球能源格局。根据国际能源署（IEA）和多家权威机构预测：')

add_table(doc,
    ["指标", "2025年", "2026E", "2027E", "2028E", "2029E", "2030E", "CAGR"],
    [
        ["全球数据中心耗电（TWh）", "485", "600", "720", "850", "920", "950", "15.5%"],
        ["中国数据中心耗电（亿度）", "1960", "2500", "3200", "4000", "5000", "5500", "14.1%"],
        ["占全社会用电比重", "1.89%", "2.5%", "3.0%", "3.5%", "4.5%", "5.5%", "-"],
        ["碳配额均价（元/吨）", "110", "125", "140", "155", "170", "185", "11.2%"],
        ["绿色算力溢价", "5%", "5%", "8%", "10%", "12%", "15%", "-"],
    ],
    "表1 2025-2030年算力与电力协同核心指标预测"
)

add_paragraph(doc, '关键洞察：到2030年，全球数据中心年耗电量将突破950 TWh，约等于日本全国一年的用电总量；中国数据中心用电量将突破5500亿千瓦时，占全社会用电比重达5.5%。AI驱动的算力需求将成为主要增长引擎。')

add_heading(doc, "1.3 国家战略布局：算力枢纽节点分布", 2)

add_text_box(doc, '''
【中国算力枢纽节点与中核布局对照图】
================================================================================
┌─────────────────────────────────────────────────────────────────────────────┐
│                        全国八大算力枢纽节点分布                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────┐                    ┌─────────────────────────────────┐ │
│   │  京津冀枢纽     │                    │       长三角枢纽              │ │
│   │                 │                    │                               │ │
│   │  算力需求最大   │                    │  AI算力聚集                   │ │
│   │  火电为主       │                    │  外来电为主                   │ │
│   │  政治中心       │                    │  ★秦山核电基地               │ │
│   └─────────────────┘                    └─────────────────────────────────┘ │
│                  ↓                                ↓                         │
│        ┌─────────────────────────────────────────────────┐                   │
│        │                  成渝枢纽                     │                   │
│        │                                             │                   │
│        │         新型算力崛起  水电为主               │                   │
│        └─────────────────────────────────────────────────┘                   │
│                                                                             │
│   ┌─────────────────┐                    ┌─────────────────┐               │
│   │  粤港澳枢纽     │                    │  贵州/甘肃枢纽  │               │
│   │                 │                    │                 │               │
│   │  智算中心密集   │                    │  清洁能源丰富   │               │
│   │  煤电+核电     │                    │  风光为主       │               │
│   │  ★大亚湾核电  │                    │                 │               │
│   └─────────────────┘                    └─────────────────┘               │
│                                                                             │
│   ┌─────────────────┐                    ┌─────────────────┐               │
│   │  内蒙古枢纽     │                    │   宁夏枢纽      │               │
│   │                 │                    │                 │               │
│   │  能源基地       │                    │  绿电直供       │               │
│   │  风光煤电       │                    │  电价优惠       │               │
│   └─────────────────┘                    └─────────────────┘               │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ★ 中核集团核心布局：秦山（长三角）、大亚湾（粤港澳）、福清、田湾            │
│  ★ 中核集团协同布局：内蒙古、宁夏、甘肃等西部清洁能源基地                     │
└─────────────────────────────────────────────────────────────────────────────┘
================================================================================
''', '图1 中国算力枢纽节点与中核布局对照图')

add_heading(doc, "1.4 政策演进：2026-2030年仿真推演", 2)

add_paragraph(doc, '基于政策文本分析和历史演进规律，对2026-2030年政策走向进行仿真推演：')

add_table(doc,
    ["时间", "政策预判", "核心内容", "战略影响"],
    [
        ["2026年", "绿色算力国家标准", "建立全国统一的绿色算力认证标准", "行业门槛明确，核电零碳优势凸显"],
        ["2027年", "算力参与辅助服务市场", "出台算力负荷参与调峰政策", "算力负荷从用电向调节资源转变"],
        ["2028年", "数据中心碳排放要求", "出台碳排放配额管理办法", "倒逼数据中心绿色化转型"],
        ["2029年", "东数西算深化", "完善国家级算力枢纽体系", "东西部协同机制成熟"],
        ["2030年", "算电协同生态成型", "形成完整的绿色算力市场", "行业格局定型"],
    ],
    "表2 2026-2030年政策演进仿真推演"
)

doc.add_page_break()

# 第二章
add_heading(doc, "二、战略研判：中核集团的独特优势", 1)

add_heading(doc, "2.1 核电：绿色算力的最优能源载体", 2)

add_paragraph(doc, '在众多能源类型中，核电具有不可替代的三大特性，使其成为绿色算力的最优能源载体：')

add_table(doc,
    ["核心特性", "核电指标", "对比能源", "对算力的价值"],
    [
        ["零碳排放", "12g CO2/kWh", "火电900g/kWh（75倍）", "满足双碳要求，获得碳溢价"],
        ["稳定基荷", "7×24h连续运行", "风光受天气影响大", "保障算力可靠性，消除波动风险"],
        ["调节可控", "出力可调度", "风光不可控", "参与调峰，创造辅助服务收益"],
    ],
    "表3 核电三大核心特性分析"
)

add_paragraph(doc, '核电容装规模：中核集团在运核电机组25台，装机容量2375万千瓦；在建及核准待开工18台，装机容量2064万千瓦。到2035年，核电占比将达到10%，届时全国核电装机容量有望翻倍。')

add_heading(doc, "2.2 \"源网荷储算\"五力协同架构", 2)

add_text_box(doc, '''
【源网荷储算五力协同节点布局图】
================================================================================
                            ┌──────────────────────────────────┐
                            │       国家级调度指挥中心         │
                            │      （源网荷储算脑平台）        │
                            └──────────────────────────────────┘
                                         │
        ┌─────────────┬───────────┬───────────┬───────────┬─────────────┐
        │             │           │           │           │             │
        ▼             ▼           ▼           ▼           ▼             ▼
┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐
│   源侧   │  │   网侧   │  │   荷侧   │  │   储侧   │  │   算侧   │
│  （电源）│  │  （电网）│  │  （负荷）│  │  （储能）│  │  （算力）│
│           │  │          │  │          │  │          │  │           │
│ ┌───────┐│  │          │  │          │  │          │  │ ┌───────┐ │
│ │ 核电  ││  │  智能    │  │  智算    │  │ 电化学  │  │ │ 绿色  │ │
│ │ 基地  ││  │  调度    │  │  中心    │  │  储能   │  │ │ 算力  │ │
│ └───────┘│  │          │  │          │  │          │  │ └───────┘ │
│ ┌───────┐│  │  电力    │  │  超算    │  │ 抽水    │  │ │ ┌───────┐ │
│ │ 新能源││  │  市场    │  │  中心    │  │ 蓄能    │  │ │ │ 碳    │ │
│ │  电源 ││  │          │  │          │  │          │  │ │ │ 认证  │ │
│ └───────┘│  │          │  │          │  │          │  │ └───────┘ │
└───────────┘  └───────────┘  └───────────┘  └───────────┘  └───────────┘
        │                                                         │
        └─────────────────────────┬───────────────────────────────┘
                                  ▼
          ┌─────────────────────────────────────────────────┐
          │               中核集团战略定位                   │
          │                                                 │
          │    核电算力绿心  +  新能源算力西基地  +  绿电算力东枢纽  │
          │                                                 │
          └─────────────────────────────────────────────────┘
================================================================================
''', '图2 源网荷储算五力协同节点布局图')

add_heading(doc, "2.3 \"核电-新能源-绿电\"三力协同布局", 2)

add_text_box(doc, '''
【核电-新能源-绿电三力协同布局图】
================================================================================
┌──────────────────────────────────┐         ┌──────────────────────────────────┐
│           核电（第一力）          │         │        新能源（第二力）          │
│          【核电算力绿心】         │         │       【新能源算力西基地】        │
│                                  │         │                                  │
│  ★ 零碳排放：12g CO2/kWh        │         │  ★ 清洁能源富集：风光资源丰富      │
│  ★ 稳定基荷：7×24h连续运行      │         │  ★ 土地资源充足：大规模数据中心   │
│  ★ 秦山、福清、大亚湾、田湾      │         │  ★ 内蒙古、甘肃、宁夏布局        │
│                                  │         │                                  │
│  战略价值：                      │         │  战略价值：                      │
│  • 绿色算力核心供给              │         │  • 成本优势显著                  │
│  • 碳溢价获取                    │         │  • 东数西算战略契合              │
│  • 调峰辅助服务                  │         │  • 多能互补协同                  │
└──────────────────────────────────┘         └──────────────────────────────────┘
                    ↘                           ↙
                      ┌───────────────────────────────┐
                      │         绿电（第三力）        │
                      │       【绿电算力东枢纽】      │
                      │                               │
                      │  ✓ 整合核电+新能源混合供电    │
                      │  ✓ 绿色算力认证              │
                      │  ✓ 京津冀、长三角、粤港澳      │
                      └───────────────────────────────┘
                                        │
┌───────────────────────────────────────────────────────────────────────────────┐
│                           商业模式创新                                        │
│                                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐               │
│  │  绿电直供模式   │  │  绿电认证服务   │  │   碳资产管理   │               │
│  │                 │  │                 │  │                 │               │
│  │ 核电+新能源     │  │ 可信绿电溯源    │  │ 碳配额管理      │               │
│  │ 直供智算中心    │  │ 绿电溢价分成    │  │ 碳交易服务      │               │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘               │
└───────────────────────────────────────────────────────────────────────────────┘
================================================================================
''', '图3 核电-新能源-绿电三力协同布局图')

add_heading(doc, "2.4 中核集团的战略卡位", 2)

add_paragraph(doc, '', '卡位一：绿色算力核心供应商')
add_paragraph(doc, '中核集团应定位为国家算力基础设施的"绿色能源心脏"。核电的三大特性使其成为数据中心最理想的能源来源，这一战略卡位具有不可复制性。')

add_paragraph(doc, '', '卡位二：电算协同标准制定者')
add_paragraph(doc, '依托行业地位和技术积累，积极参与甚至主导电算协同领域国家标准制定：核电算力基础设施技术规范、绿色算力碳足迹核算标准、源网荷储算脑接口标准。')

add_paragraph(doc, '', '卡位三：电算协同示范引领者')
add_paragraph(doc, '打造"核电+算力"一体化示范项目，形成可复制、可推广的发展模式，为国家电算协同战略提供"中核方案"。')

doc.add_page_break()

# 第三章
add_heading(doc, "三、技术前沿：前瞻性技术研判与布局", 1)

add_heading(doc, "3.1 六大前沿技术方向", 2)

add_paragraph(doc, '基于技术成熟度、战略价值、与中核业务契合度等维度，识别六大前瞻性技术方向：')

add_table(doc,
    ["技术方向", "成熟度", "技术内涵", "与中核的结合点", "布局建议"],
    [
        ["数字孪生", "★★★★☆", "高保真数字镜像+实时仿真", "核电站全生命周期管理", "2026年规模化应用"],
        ["具身智能", "★★☆☆☆", "AI与物理设备深度融合", "核岛高危作业替代", "2027年安全突破"],
        ["电力大模型", "★★★☆☆", "电力垂直领域大模型", "智能调度与诊断", "2026年发布1.0"],
        ["源网荷储算脑", "★★★☆☆", "电力流与算力流协同", "源网荷储算协同调度", "2027年试点验证"],
        ["碳能算一体化", "★★★☆☆", "碳-电-算三要素联合", "碳足迹追溯与认证", "2026年启动"],
        ["量子计算", "★☆☆☆☆", "量子算法应用", "科学计算加速", "2026年能力储备"],
    ],
    "表4 六大前瞻性技术方向研判"
)

add_heading(doc, "3.2 技术发展路线图（2026-2030年）", 2)

add_text_box(doc, '''
【2026-2030年前瞻性技术发展路线图】
================================================================================

            2026年           2027年           2028年           2030年
    ┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
    │                 │                 │                 │                 │
    │  【数字孪生】    │  【具身智能】    │  【技术融合】    │  【成熟应用】    │
    │  • 规模化应用   │  • 安全突破     │  • 深化应用     │  • 技术输出     │
    │  • 5基地覆盖   │  • 减少辐照50% │  • 标准主导     │  • 行业引领     │
    │                 │                 │                 │                 │
    │  【电力大模型】  │  【源网荷储算脑】│  【具身智能】   │                 │
    │  • 发布1.0版本 │  • 试点上线     │  • 应用深化     │                 │
    │  • 诊断准确率85%│  • 协同调度     │  • 减少辐照80% │                 │
    │                 │                 │                 │                 │
    │  【碳能算一体化】│  【具身智能】   │                 │                 │
    │  • 平台启动    │  • 预研启动     │                 │                 │
    │  • 标准制定    │                 │                 │                 │
    └─────────────────┴─────────────────┴─────────────────┴─────────────────┘

【关键里程碑】
• 2026年：数字孪生5基地覆盖 | 电力大模型1.0发布 | 碳能算一体化平台启动
• 2027年：源网荷储算脑试点上线 | 具身智能安全突破 | 量子计算预研启动
• 2028年：具身智能应用深化 | 主导2-3项行业标准 | 电力大模型3.0发布
• 2030年：技术成熟应用 | 技术输出开始 | 行业地位确立
================================================================================
''', '图4 2026-2030年前瞻性技术发展路线图')

add_heading(doc, "3.3 技术-业务融合矩阵", 2)

add_table(doc,
    ["融合方向", "技术组合", "核心价值", "预期效果", "中核基础"],
    [
        ["核电站智能化运维", "数字孪生+具身智能", "设备状态实时感知", "故障预警提前30天", "金七门实践"],
        ["核电商用场景创新", "电力大模型+碳能算一体化", "智能调度与碳认证", "诊断准确率95%", "同方股份"],
        ["核电科学计算支撑", "量子计算+高性能计算", "科学计算加速", "计算加速100倍", "需起步"],
        ["绿电算力调度", "源网荷储算脑+AI调度", "协同优化调度", "成本降低10-15%", "核电调度"],
    ],
    "表5 技术-业务融合矩阵"
)

doc.add_page_break()

# 第四章
add_heading(doc, "四、生态运营：体系构建与路径设计", 1)

add_heading(doc, "4.1 生态体系架构", 2)

add_text_box(doc, '''
【中核电算协同生态体系架构】
================================================================================
                              ┌─────────────────────────┐
                              │      顶层战略目标       │
                              │   绿色算力核心供应商    │
                              └───────────┬─────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │                                 │                                 │
        ▼                                 ▼                                 ▼
┌───────────────┐                 ┌───────────────┐                 ┌───────────────┐
│   核心层     │                 │   能力层     │                 │   连接层     │
│  （基础设施）│                 │  （技术平台）│                 │  （标准机制）│
│               │                 │               │                 │               │
│ • 核电基地    │                 │ • 数字孪生    │                 │ • 标准规范    │
│ • 算力设施    │                 │ • 电力大模型  │                 │ • 协作机制    │
│ • 储能系统    │                 │ • 具身智能    │                 │ • 基础设施    │
│ • 新能源电场  │                 │ • 碳能算平台  │                 │               │
└───────────────┘                 └───────────────┘                 └───────────────┘
        │                                 │                                 │
        └─────────────────────────────────┼─────────────────────────────────┘
                                          ▼
                              ┌─────────────────────────┐
                              │       价值输出层       │
                              │                       │
                              │ • 绿色算力服务        │
                              │ • 碳资产管理          │
                              │ • 技术输出服务        │
                              │ • 综合解决方案        │
                              └─────────────────────────┘
================================================================================
''', '图5 中核电算协同生态体系架构图')

add_heading(doc, "4.2 合作伙伴生态网络", 2)

add_table(doc,
    ["伙伴类型", "战略价值", "合作重点", "代表企业"],
    [
        ["算力技术厂商", "技术赋能", "AI大模型、云计算", "华为、阿里、百度"],
        ["电网企业", "市场准入", "调度接入、电力市场", "国网、南网"],
        ["云服务商", "市场渠道", "算力分销、联合运营", "阿里云、腾讯云"],
        ["科研机构", "前沿创新", "联合研发、人才培养", "清华、中科院"],
        ["碳服务机构", "碳业务支撑", "碳认证、碳交易", "碳交所"],
        ["IDC运营商", "运营经验", "合作运营", "万国数据、秦淮数据"],
    ],
    "表6 生态合作伙伴分类"
)

add_heading(doc, "4.3 商业模式创新", 2)

add_table(doc,
    ["商业模式", "价值创造", "目标客户", "收益来源", "2030年目标"],
    [
        ["核电绿电算力", "零碳+稳定", "高能耗数据中心", "电价+绿电溢价", "50000P规模"],
        ["碳资产管理", "碳资产增值", "所有客户", "碳交易收益", "500万吨碳交易"],
        ["调峰辅助服务", "灵活性价值", "电网企业", "辅助服务分成", "年100亿千瓦时"],
        ["技术能力输出", "轻资产扩张", "行业客户", "授权许可费", "10+企业部署"],
    ],
    "表7 商业模式创新矩阵"
)

doc.add_page_break()

# 第五章
add_heading(doc, "五、实施路径：资源配置与保障措施", 1)

add_heading(doc, "5.1 三阶段实施路线", 2)

add_table(doc,
    ["阶段", "时间", "核心目标", "关键里程碑", "收入预测"],
    [
        ["战略布局期", "2026年", "顶层设计，启动试点", "战略白皮书发布；秦山/福清试点启动", "10-15亿元"],
        ["能力形成期", "2027年", "核心能力初步形成", "示范项目运营；大模型1.0发布", "25-35亿元"],
        ["规模引领期", "2028年", "形成规模效应", "3-5个基地运营；行业标准发布", "50-70亿元"],
        ["快速发展期", "2029年", "市场快速扩张", "5-8个基地；生态伙伴30+", "80-100亿元"],
        ["成熟领先期", "2030年", "行业领先地位", "10+基地；主导3-5项国家标准", "150-200亿元"],
    ],
    "表8 三阶段实施路线图"
)

add_heading(doc, "5.2 资源配置规划", 2)

add_paragraph(doc, '', '资金投入规划（2026-2030年）')
add_table(doc,
    ["资金来源", "比例", "金额（亿元）", "主要用途"],
    [
        ["集团自有资金", "50%", "60-85", "核心基地建设、技术研发"],
        ["政策性贷款", "20%", "24-34", "基础设施建设"],
        ["产业投资基金", "20%", "24-34", "生态伙伴投资"],
        ["市场化融资", "10%", "12-17", "运营流动资金"],
    ],
    "表9 资金投入规划"
)

add_paragraph(doc, '', '人才队伍规划（2026-2030年）')
add_table(doc,
    ["人才类型", "需求数量", "来源渠道"],
    [
        ["AI/大数据专家", "40人", "外部引进+内部培养"],
        ["电力系统专家", "30人", "核电系统内部调配"],
        ["碳资产专家", "20人", "外部引进"],
        ["复合型人才", "75人", "综合培养"],
    ],
    "表10 人才队伍规划"
)

add_heading(doc, "5.3 风险评估与防控", 2)

add_table(doc,
    ["风险类型", "发生概率", "影响程度", "防控措施"],
    [
        ["技术风险", "中", "高", "产学研合作；技术储备"],
        ["市场风险", "低", "中", "战略合作锁定；灵活调整"],
        ["政策风险", "中", "中", "密切跟踪；预案准备"],
        ["竞争风险", "高", "中", "加速布局；标准引领"],
        ["安全风险", "极低", "极高", "严格核安全规范"],
    ],
    "表11 风险评估与防控措施"
)

doc.add_page_break()

# 结语
add_heading(doc, "六、结语与战略建议", 1)

add_paragraph(doc, '', '【核心结论】')
add_paragraph(doc, '电算协同是中核集团服务国家战略、实现转型升级的核心战略方向。在"双碳"目标和"数字中国"战略的双重驱动下，电算协同正处于历史性发展窗口期。')

add_paragraph(doc, '', '【战略建议】')
add_bullet_point(doc, "提升战略定位：将电算协同提升为集团核心战略业务，而非单纯的多元化探索")
add_bullet_point(doc, "加快布局节奏：2026年完成战略规划，2027年建成示范项目，2028年形成规模效应")
add_bullet_point(doc, "强化技术引领：依托核电运行研究院和同方股份，加快核心技术研发")
add_bullet_point(doc, "主导标准制定：积极参与国家标准、行业标准制定，争取行业话语权")
add_bullet_point(doc, "构建开放生态：与电网企业、云服务商、科研机构建立战略合作")

add_paragraph(doc, '', '【2030年愿景】')
add_bullet_point(doc, "算力规模：运营绿色算力超过50000P")
add_bullet_point(doc, "碳资产管理：管理核电碳资产超过500万吨")
add_bullet_point(doc, "技术标准：主导制定3-5项国家标准")
add_bullet_point(doc, "行业地位：成为国内领先、国际一流的绿色算力服务商")
add_bullet_point(doc, "收入规模：年营业收入突破150-200亿元")

doc.add_page_break()

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
run = note_para.add_run("数据更新时间：2026年5月")
run.font.size = Pt(9)

output_path = r"C:\AI学习资料\mesheer\中核集团电算协同战略研究报告_高层版.docx"
doc.save(output_path)
print(f"战略研究报告（高层版）生成成功: {output_path}")
