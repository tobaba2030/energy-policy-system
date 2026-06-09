# -*- coding: utf-8 -*-
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
for _ in range(3):
    doc.add_paragraph()

title1 = doc.add_paragraph()
title1.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = title1.add_run("中核集团电算协同业务")
run.bold = True
run.font.name = 'Times New Roman'
run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
run.font.size = Pt(22)

title2 = doc.add_paragraph()
title2.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = title2.add_run("前瞻性技术研究与战略布局专题报告")
run.bold = True
run.font.name = 'Times New Roman'
run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
run.font.size = Pt(22)

for _ in range(4):
    doc.add_paragraph()

info_para = doc.add_paragraph()
info_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = info_para.add_run("密级：内部资料\n编制单位：科技创新业务中心\n编制日期：2026年5月")
run.font.name = 'Times New Roman'
run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
run.font.size = Pt(12)

doc.add_page_break()

# 一、摘要
add_heading(doc, "一、摘要", 1)

add_paragraph(doc, '电算协同作为新型电力系统建设与数字经济深度融合的核心命题，正在加速从"概念验证"迈向"规模化落地"。本报告以2026年为研究起点，从国家算力布局战略高度审视中核集团电算协同业务的独特价值，系统研判前瞻性技术与业务融合的关键路径，为集团战略决策提供前瞻性智库支撑。')

add_paragraph(doc, '', '核心研判：')
add_paragraph(doc, '中核集团在国家"东数西算"和"新型电力系统"双重战略交汇点上占据独特地位。核电作为唯一能够同时满足"零碳+稳定+可靠"三重特性的电源，是国家算力基础设施实现绿色转型的关键支撑。建议将电算协同定位为服务国家战略的核心业务。', '战略定位：')
add_paragraph(doc, '前瞻性技术与电算协同业务的结合点集中在三个维度——核电站智能化运维（数字孪生+具身智能）、核电商用场景创新（电力大模型+碳能算一体化）、核电科学计算支撑（量子计算+高性能计算）。', '技术融合：')
add_paragraph(doc, '应构建"核电算力+绿色算力认证+碳资产服务"三位一体的差异化竞争优势，在国家算力生态中确立"绿色算力核心供应商"的独特定位。', '生态位势：')

doc.add_page_break()

# 二、形势研判
add_heading(doc, "二、形势研判", 1)

add_heading(doc, "2.1 算力需求态势", 2)

add_paragraph(doc, '算力需求激增正在重塑全球能源格局。2024年中国数据中心耗电量超过2500亿千瓦时，约占全社会用电量的2.6%；预计2030年将突破5500亿千瓦时，占比达5%-6%。')

add_text_box(doc, '''
【2024-2030年数据中心耗电量预测】（单位：亿千瓦时）
=================================================================
2024: ████████████████████████████████ 2500
2025: ██████████████████████████ 1960（注：统计口径差异）
2026E: ████████████████████████████████ 2500
2027E: ████████████████████████████████████████ 3200
2028E: ██████████████████████████████████████████████ 4000
2029E: ██████████████████████████████████████████████████████ 5000
2030E: ██████████████████████████████████████████████████████████ 5500
=================================================================
 CAGR(2024-2030): 14.1%
''', '图1 2024-2030年中国数据中心耗电量增长趋势')

add_paragraph(doc, '关键结论：算力与电力的协同发展已从"可选项"变为"必选项"，谁掌握了清洁能源供给，谁就掌握了算力时代的主动权。')

add_heading(doc, "2.2 国家战略布局", 2)

add_text_box(doc, '''
中国算力枢纽节点与中核布局对照
=================================================================
┌─────────────────┐                    ┌─────────────────────────────────┐
│  京津冀枢纽    │                    │       长三角枢纽              │
│  火电为主       │                    │  AI算力聚集 · 秦山核电基地     │
└─────────────────┘                    └─────────────────────────────────┘
                                              ↓
                                      ┌─────────────────┐
                                      │    成渝枢纽    │
                                      │   新型算力崛起   │
                                      └─────────────────┘
┌─────────────────┐                    ┌─────────────────┐
│  粤港澳枢纽    │                    │  贵州/甘肃枢纽  │
│  智算密集      │                    │  清洁能源丰富   │
│  大亚湾核电    │                    │  风光为主       │
└─────────────────┘                    └─────────────────┘
=================================================================
★ 中核核心布局：秦山（长三角）、福清（东南）、大亚湾（粤港澳）
★ 协同布局：田湾、三门及西部新能源基地
''', '图2 国家算力枢纽布局与中核节点对照')

add_heading(doc, "2.3 政策动态与仿真推演", 2)

add_paragraph(doc, '基于政策文本分析和历史演进规律，对2026-2030年政策走向进行仿真推演：')

add_table(doc,
    ["时间节点", "政策预判", "核心内容", "影响研判"],
    [
        ["2026年", "绿色算力国家标准", "出台全国统一的绿色算力认证标准", "行业门槛明确，核电优势凸显"],
        ["2027年", "绿电交易机制完善", "扩大电力市场规模，完善交易机制", "核电绿电溢价空间打开"],
        ["2028年", "数据中心碳排放要求", "出台数据中心碳排放强制性要求", "倒逼数据中心转向绿电"],
        ["2029年", "东数西算深化", "建设国家级算力枢纽体系", "西部布局机遇显现"],
        ["2030年", "新型电力系统完善", "形成完善的算电协同体系", "行业格局定型"],
    ],
    "表1 2026-2030年政策演进仿真推演"
)

add_heading(doc, "2.4 市场动态仿真推演", 2)

add_table(doc,
    ["指标", "2026E", "2027E", "2028E", "2029E", "2030E"],
    [
        ["数据中心市场规模（亿元）", "3500", "4000", "4600", "5200", "6000"],
        ["碳配额均价（元/吨）", "125", "140", "155", "170", "185"],
        ["绿色算力溢价", "5%", "8%", "10%", "12%", "15%"],
        ["算力中心用电增速", "27.6%", "28.0%", "25.0%", "25.0%", "10.0%"],
        ["中核潜在收入（亿元）", "10-15", "25-35", "50-70", "80-100", "150-200"],
    ],
    "表2 2026-2030年市场动态仿真推演"
)

doc.add_page_break()

# 三、核心研判
add_heading(doc, "三、核心研判", 1)

add_heading(doc, "3.1 战略定位研判：中核集团的独特战略地位", 2)

add_paragraph(doc, '', '核心卡位一：绿色算力核心供应商')
add_paragraph(doc, '中核集团应定位为国家算力基础设施的"绿色能源心脏"。核电的三大特性使其成为数据中心最理想的能源来源：零碳排放（12g/kWh，仅为火电的1.5%）、稳定基荷（7×24h连续运行）、调节可控（可参与调峰）。')

add_paragraph(doc, '', '核心卡位二：电算协同标准制定者')
add_paragraph(doc, '应积极参与甚至主导电算协同领域国家标准和行业标准的制定：核电算力基础设施技术规范、绿色算力碳足迹核算标准、源网荷储算脑接口标准。')

add_paragraph(doc, '', '核心卡位三：电算协同示范引领者')
add_paragraph(doc, '通过打造"核电+算力"一体化示范项目，形成可复制、可推广的发展模式，为国家电算协同战略提供"中核方案"。')

add_heading(doc, "3.2 技术融合研判：前瞻性技术与业务深度融合", 2)

add_table(doc,
    ["技术方向", "成熟度", "与业务结合点", "战略建议"],
    [
        ["数字孪生", "★★★★☆", "核电站全生命周期管理", "深化应用，支撑智能运维"],
        ["具身智能", "★★☆☆☆", "核岛高危作业替代", "安全突破，减少辐照80%"],
        ["电力大模型", "★★★☆☆", "调度决策、故障诊断", "重点突破，诊断准确率95%"],
        ["源网荷储算脑", "★★★☆☆", "源网荷储算协同调度", "试点验证，成本降10-15%"],
        ["碳能算一体化", "★★★☆☆", "碳足迹追溯、绿色认证", "标准引领，溢价5-15%"],
        ["量子计算", "★☆☆☆☆", "核电科学计算", "能力储备，加速100倍"],
    ],
    "表3 前瞻性技术成熟度与融合点研判"
)

add_heading(doc, "3.3 生态位势研判：构建差异化竞争优势", 2)

add_table(doc,
    ["竞争力维度", "核心要素", "构建路径", "护城河强度"],
    [
        ["能源禀赋", "核电零碳、稳定、高可靠", "现有基地+新建项目", "★★★★★"],
        ["技术能力", "数字孪生、电力大模型、具身智能", "自研+合作", "★★★★"],
        ["标准主导", "电算协同行业标准、国家标准", "牵头制定", "★★★★★"],
        ["品牌信任", "核级安全文化、质量保障", "核电口碑延伸", "★★★★"],
        ["生态连接", "电网合作、云商合作、政府关系", "战略合作", "★★★"],
    ],
    "表4 核心竞争力矩阵"
)

doc.add_page_break()

# 四、实施建议
add_heading(doc, "四、实施建议", 1)

add_heading(doc, "4.1 战略定位与愿景", 2)

add_paragraph(doc, '', '战略定位：')
add_paragraph(doc, '国家绿色算力核心供应商 + 电算协同标准制定者')

add_paragraph(doc, '', '发展愿景：')
add_paragraph(doc, '到2028年，成为国内领先、国际一流的核电驱动绿色算力服务商，形成"核电+算力+碳资产"三位一体的发展格局。')

add_heading(doc, "4.2 三阶段实施路线", 2)

add_table(doc,
    ["阶段", "时间", "核心目标", "关键举措"],
    [
        ["战略布局期", "2026年", "顶层设计，启动试点", "发布战略白皮书；秦山/福清试点启动；成立电算协同事业部"],
        ["能力形成期", "2027年", "核心能力初步形成", "示范项目运营；电力大模型1.0发布；与电网建立调度合作"],
        ["规模引领期", "2028年", "形成规模效应", "3-5个基地运营；行业标准发布；绿电平台正式上线"],
    ],
    "表5 三阶段实施路线"
)

add_heading(doc, "4.3 资源配置建议", 2)

add_table(doc,
    ["资源类型", "2026-2030年规划", "重点方向"],
    [
        ["资金投入", "累计120-170亿元", "核心基地建设、技术研发、生态合作"],
        ["人才队伍", "引进培养200+复合型人才", "AI/大数据、电力系统、碳资产、复合型人才"],
        ["合作生态", "生态伙伴超50家", "电网企业、科技企业、云服务商、IDC运营商"],
    ],
    "表6 资源配置建议"
)

add_heading(doc, "4.4 风险防控建议", 2)

add_table(doc,
    ["风险类型", "风险描述", "防控措施"],
    [
        ["技术风险", "核心技术研发不及预期", "产学研合作；技术储备"],
        ["市场风险", "市场需求不及预期", "战略合作锁定；灵活调整"],
        ["政策风险", "行业政策变化", "密切跟踪；预案准备"],
        ["竞争风险", "竞争对手快速跟进", "加速布局；标准引领"],
        ["安全风险", "核安全事件影响", "严格遵守核安全规范"],
    ],
    "表7 风险防控建议"
)

doc.add_page_break()

# 五、结语
add_heading(doc, "五、结语与展望", 1)

add_paragraph(doc, '', '战略层面：')
add_paragraph(doc, '电算协同不是"锦上添花"的可选业务，而是中核集团服务国家战略、实现转型升级的"核心战略方向"。在"双碳"目标和"数字中国"战略的双重驱动下，电算协同正处于历史性发展窗口期。2026-2030年将是算力需求爆发的关键五年，中核必须抢占先机。')

add_paragraph(doc, '', '建议举措：')
add_bullet_point(doc, "提升战略定位：将电算协同提升为集团核心战略业务")
add_bullet_point(doc, "加快布局节奏：2026年完成战略规划，2027年建成示范项目")
add_bullet_point(doc, "强化技术引领：依托核电运行研究院和同方股份，加快核心技术研发")
add_bullet_point(doc, "主导标准制定：积极参与国家标准、行业标准制定，争取行业话语权")
add_bullet_point(doc, "构建开放生态：与电网企业、云服务商、科研机构建立战略合作")

add_paragraph(doc, '', '展望2030年：')
add_bullet_point(doc, "算力规模：运营绿色算力超过50000P")
add_bullet_point(doc, "碳资产：管理核电碳资产超过500万吨")
add_bullet_point(doc, "技术标准：主导制定3-5项国家标准")
add_bullet_point(doc, "行业地位：成为国内领先、国际一流的绿色算力服务商")

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

# 保存文档
output_path = r"C:\AI学习资料\mesheer\中核集团电算协同智库报告_精简版.docx"
doc.save(output_path)
print(f"精简版Word文档生成成功: {output_path}")
