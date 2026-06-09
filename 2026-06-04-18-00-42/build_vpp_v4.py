# -*- coding: utf-8 -*-
# VPP v4 - 完整重写版本，所有中文引号通过 chr() 运行时生成
import os, sys
from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn, nsdecls
from docx.oxml import parse_xml

OUT_DIR = r'C:\AI学习资料\mesheer\2026-06-04-18-00-42'

# 中文标点运行时生成（避免源码编码问题）
LQ = chr(0x201C)   # 左双引号 "
RQ = chr(0x201D)   # 右双引号 "
DA = chr(0x2014)   # 破折号 ——
AR = chr(0x2192)   # 箭头 ->

# ============================================================
# 标题常量
# ============================================================
TITLE1 = f"国家能源局{LQ}人工智能+{RQ}能源高价值场景"
TITLE2 = "试点建设方案"

# ============================================================
# 一、项目背景与意义
# ============================================================
SEC1_1_1 = [
    f"当前，我国能源体系正经历以{LQ}清洁化、数字化、智能化{RQ}为核心特征的深度变革。"
    f"随着{LQ}双碳{RQ}战略深入推进，新能源装机快速增长，"
    f"新能源出力的波动性与间歇性使电力系统灵活调节能力面临巨大挑战，"
    f"虚拟电厂（Virtual Power Plant, VPP）作为聚合分布式能源资源、参与电网协同调控的新型市场主体，"
    f"已被纳入国家新型电力系统建设重点方向。"
    f"国家能源局启动{LQ}人工智能+{RQ}能源高价值场景建设，"
    f"将虚拟电厂明确列为重点培育场景，为虚拟电厂的智能化升级提供了战略指引。",
    f"贵州省作为国家{LQ}西电东送{RQ}工程的重要能源枢纽，全省水电可开发量约2300万千瓦、"
    f"光伏装机超2000万千瓦，同时拥有电解铝、磷化工、铁合金、数据中心等高载能产业园区，"
    f"具备构建大规模虚拟电厂的独特资源禀赋，聚合潜力超500万千瓦。"
    f"贵州省能源发展规划已将虚拟电厂纳入新型电力系统建设重点工程，"
    f"省发改委印发虚拟电厂建设管理工作方案（试行），"
    f"为虚拟电厂的市场化运营提供了基础制度框架。"
    f"此外，贵州作为全国首个国家大数据综合试验区，"
    f"在数据中心算力基础设施和数据治理能力方面具有先发优势。",
    f"从人工智能赋能趋势看，电力系统正从{LQ}经验调度{RQ}向{LQ}数据+AI双驱动{RQ}转型。"
    f"大语言模型、多智能体强化学习、时序预测等技术的快速成熟，"
    f"为虚拟电厂在大规模资源聚合、多市场协同报价、海量约束实时优化等核心业务环节提供了全新解决方案。"
    f"然而，当前虚拟电厂在贵州及南方区域的落地应用仍以试点示范为主，"
    f"尚未形成规模化、常态化的商业运营闭环，亟需通过本项目打通"
    f"{LQ}技术可行{AR}商业可用{AR}规模可复制{RQ}的完整链路。",
]

SEC1_1_2 = (
    f"贵州虚拟电厂的发展在实践中面临{LQ}看得见聚不起来、聚起来调不精准、调得动赚不到钱{RQ}的现实困境，"
    f"具体表现为四个层面的突出问题："
)

SEC1_1_2_LIST = [
    (f"资源认知层面{DA}{DA}可调潜力{LQ}看不清{RQ}",
     f"贵州电网辖区内分布式资源种类繁多（工业负荷、小水电、分布式光伏、储能、充电桩等），"
     f"各类资源的运行特性、工艺约束、市场参与意愿差异巨大，当前缺乏系统化的资源普查与可调潜力评估方法，"
     f"导致{LQ}资源底数不清、调节能力不明{RQ}，无法形成高质量的规模化可调节资源池。"),
    (f"聚合运营层面{DA}{DA}多市场协同{LQ}算不准{RQ}",
     f"虚拟电厂需要同时参与现货市场、辅助服务市场、需求响应等多个交易品种，"
     f"各市场的价格信号、时间尺度、结算规则相互耦合，人工决策难以在短时间内完成多市场联合优化报价，"
     f"导致{LQ}有资源参与不了、参与了收益不高{RQ}，聚合商和用户的积极性难以持续。"),
    (f"协同调控层面{DA}{DA}海量资源{LQ}调不精{RQ}",
     f"当聚合资源达到数万级别、调控时间窗口压缩至分钟级时，传统集中式优化算法面临维度爆炸，"
     f"指令分解与执行反馈链路长、误差积累大，难以满足现货市场出清和实时调控的精度要求，"
     f"制约了虚拟电厂从{LQ}邀约型响应{RQ}向{LQ}常态化运营{RQ}的跨越。"),
    (f"商业闭环层面{DA}{DA}运营模式{LQ}转不动{RQ}",
     f"目前贵州虚拟电厂整体处于{LQ}政策驱动、试点为主{RQ}的阶段，缺乏可持续的商业运营模式和收益分配机制。"
     f"资源聚合商参与意愿不足、终端用户获得感不强，导致虚拟电厂的规模化推广缺乏内生动力，"
     f"未能形成{LQ}用户获益-聚合商盈利-电网受益{RQ}的正向循环。"),
]

SEC1_2 = [
    f"贵州电网作为南方电网西电东送的南部通道枢纽，承担着大规模清洁能源外送和省内负荷平衡的双重责任。"
    f"一方面，贵州新能源装机快速增长，出力波动对电网安全运行构成挑战，"
    f"亟需通过虚拟电厂聚合灵活负荷资源，提升系统灵活调节能力，保障清洁能源消纳；"
    f"另一方面，贵州电解铝、磷化工、数据中心等高载能产业是全省经济支柱，"
    f"在电力供需紧张时期，这些产业因刚性限电面临巨大经济损失，"
    f"亟需通过虚拟电厂的柔性调控手段实现{LQ}削峰不减产{RQ}。",
    f"本项目的实施具有四方面重要意义："
    f"一是服务贵州电力保供大局，通过虚拟电厂聚合高载能工业园区可调资源，"
    f"在供需紧张时段提供分钟级柔性调节能力，避免刚性拉闸限电；"
    f"二是助力贵州清洁能源消纳，通过虚拟电厂引导负荷侧资源跟踪新能源出力曲线，"
    f"减少弃风弃光；"
    f"三是培育贵州电力市场新型经营主体，构建{LQ}资源聚合-交易辅助-调控执行-结算分配{RQ}"
    f"全链路商业运营模式；"
    f"四是促进贵州大数据+能源产业融合发展，发挥贵州国家大数据综合试验区的算力和数据治理优势，"
    f"打造人工智能赋能能源行业的标杆场景，形成具有全国示范意义的{LQ}贵州模式{RQ}。",
]

# ============================================================
# 二、主要研究内容（业务场景驱动，弱化纯技术细节）
# ============================================================
SEC2_INTRO = (
    f"本项目以{LQ}业务场景驱动、价值闭环验证{RQ}为总体思路，"
    f"围绕虚拟电厂在实际运营中面临的核心业务痛点，"
    f"设置五大研究课题。课题设置原则为：每个课题对应一个明确的业务场景、解决一组实际运营问题、"
    f"产出可量化的业务价值，确保研究成果能够直接转化为虚拟电厂的商业运营能力。"
)

SEC2_RESEARCH = [
    (f"课题一：多类型资源普查与可调节能力评估\n（对应业务场景：虚拟电厂资源池构建与准入评估）",
     [
         ("子任务1.1", "贵州省分布式可调资源普查方法与标准规范",
          "贵州电网\n（调度中心）", "各市州供电局\n朗新科技"),
         ("子任务1.2", "面向多类型资源的分级分类可调潜力评估模型",
          "朗新科技", "贵州电网\n贵州大学"),
         ("子任务1.3", "虚拟电厂资源准入标准与质量分级体系",
          "贵州电网\n（交易中心）", "黔能三安\n贵州矿能"),
     ]),
    (f"课题二：多时空协同调控与精准执行\n（对应业务场景：现货市场出清响应、日内滚动调控、应急备用）",
     [
         ("子任务2.1", "园区级负荷群调群控策略与分钟级滚动优化",
          "朗新科技", "贵州电网\n黔能三安"),
         ("子任务2.2", "直控型与邀约型资源分层协同调控机制",
          "贵州电网\n（调度中心）", "贵州矿能\n贵州国能"),
         ("子任务2.3", "调控指令下发-执行-反馈全链路闭环验证",
          "黔能三安", "朗新科技\n贵州电网"),
     ]),
    (f"课题三：多市场联合交易辅助决策\n（对应业务场景：现货市场报价、辅助服务投标、需求响应申报）",
     [
         ("子任务3.1", "面向现货与辅助服务的联合报价策略研究",
          "朗新科技", "贵州电网\n（交易中心）"),
         ("子任务3.2", "市场价格预测与交易风险评估方法",
          "朗新科技", "贵州大学"),
         ("子任务3.3", "多约束条件下交易策略自动化生成与校验",
          "贵州电网\n（交易中心）", "朗新科技\n黔能三安"),
     ]),
    (f"课题四：新能源消纳与绿色价值挖掘\n（对应业务场景：清洁能源就地消纳、绿电绿证交易、碳资产开发）",
     [
         ("子任务4.1", "负荷侧资源追踪新能源出力曲线的优化调度策略",
          "贵州电网\n（调度中心）", "朗新科技"),
         ("子任务4.2", "虚拟电厂聚合资源的绿色价值量化与绿证交易",
          "贵州电网\n（交易中心）", "贵州国能\n黔能三安"),
         ("子任务4.3", "面向碳市场的可调节负荷减排量核算方法",
          "贵州矿能", "贵州大学\n朗新科技"),
     ]),
    (f"课题五：商业化运营模式与规模化推广\n（对应业务场景：收益分配、用户运营、多园区复制推广）",
     [
         ("子任务5.1", "虚拟电厂运营收益测算与多方利益分配机制",
          "贵州电网\n（交易中心）", "朗新科技\n黔能三安"),
         ("子任务5.2", f"面向终端用户的{LQ}无感参与{RQ}体验优化与激励机制",
          "朗新科技", "贵州矿能\n贵州国能"),
         ("子任务5.3", "可复制推广的虚拟电厂运营标准与推广路径设计",
          "贵州电网\n（发展部）", "所有参与单位"),
     ]),
]

# ============================================================
# 三、创新点
# ============================================================
SEC3_INNOVATIONS = [
    (f"创新点一：{LQ}资源普查-潜力评估-分级准入{RQ}全流程标准化方法",
     f"打破当前虚拟电厂分散接入、标准不统一的行业痛点，首次面向贵州省全域，"
     f"建立覆盖工业负荷、小水电、分布式光伏、储能、充电桩等五类资源的系统化普查方法，"
     f"形成{LQ}逐户画像、分级定量、动态更新{RQ}的可调资源评估体系。"
     f"该方法填补了贵州存量可调资源{LQ}底数不清、潜力不明{RQ}的信息空白，"
     f"为虚拟电厂的规模化、规范化资源准入提供了可操作的标准范式。",
     f"【与现有做法对比】当前虚拟电厂入市以{LQ}自愿申报+人工审核{RQ}为主，"
     f"运营商各自接入手册标准不统一，难以实现跨园区、跨地市的资源聚合。"
     f"本项目提出的标准化普查方法，首次实现贵州全省统一的分级分类资源评估与准入体系。"),
    (f"创新点二：{LQ}直控+邀约{RQ}双通道协同调控业务模式",
     f"针对贵州高载能工业园区的工艺约束与连续生产需求，首创{LQ}直控型资源秒级响应+邀约型资源经济激励{RQ}"
     f"的双通道协同调控模式，在保障企业生产安全的前提下实现柔性调节。"
     f"该模式解决了传统需求响应{LQ}一刀切限电{RQ}的痛点，"
     f"为高载能产业园区参与虚拟电厂提供了可落地的商业路径。",
     f"【与现有做法对比】现有虚拟电厂调控以邀约型为主，响应时效慢（小时级）、"
     f"执行率偏低。本项目提出的双通道模式，将直控型资源的响应时效压缩至分钟级，"
     f"同时保留邀约型资源的经济激励灵活性，兼顾了调控精度与用户参与意愿。"),
    (f"创新点三：面向多市场交易的{LQ}AI辅助报价+收益分配透明化{RQ}机制",
     f"基于AI辅助决策技术，构建覆盖现货市场、辅助服务市场、需求响应三类交易品种的联合报价策略生成方法，"
     f"同时设计基于区块链的收益分配透明化机制，确保终端用户、聚合商、电网三方"
     f"{LQ}每一分钱收益都能说清楚{RQ}，提升各参与方的信任度与持续参与意愿。",
     f"【与现有做法对比】现有虚拟电厂收益分配以{LQ}黑箱协商{RQ}为主，"
     f"终端用户难以理解自身的贡献度与收益来源，参与意愿低。"
     f"本项目将AI报价辅助决策与区块链收益分配相结合，实现{LQ}报价有策略、分配有依据{RQ}。"),
]

# ============================================================
# 四、资金情况
# ============================================================
SEC4_INTRO = (
    f"本项目总预算为1800万元，资金来源包括：国家能源局{LQ}人工智能+{RQ}能源专项补贴、"
    f"贵州电网科技项目配套资金、联合申报单位自筹资金三部分。"
    f"资金安排坚持{LQ}业务价值导向{RQ}，重点保障可验证、可量化的核心业务场景研发与试点任务。"
)

SEC4_BUDGET = [
    ('序号', '预算科目', '金额（万元）', '占比', '主要用途'),
    ('1', '资源普查与潜力评估平台建设', '360', '20%', '覆盖贵州省9个市州的分布式资源普查系统开发与实地调研'),
    ('2', '多市场协同交易辅助决策系统研发', '540', '30%', '现货+辅助服务+需求响应联合报价AI模型研发与系统集成'),
    ('3', '双通道协同调控平台开发与部署', '360', '20%', '直控通道AGC/API对接、邀约通道微信小程序开发与部署'),
    ('4', '试点园区改造与调控终端安装', '270', '15%', '黔能三安园区、贵州矿能园区合计不低于5000千瓦可调负荷改造'),
    ('5', '项目管理与成果推广', '270', '15%', '技术标准编制、专利申报、成果示范推广与培训'),
    ('', '合计', '1800', '100%', ''),
]

# ============================================================
# 五、项目整体计划
# ============================================================
SEC5_PLAN = [
    ('1', '准备阶段：资源普查与现状调研', '2026.Q3', '3个月',
     '完成贵州省9个市州分布式可调资源普查，建立资源台账；完成现有虚拟电厂平台现状调研与业务痛点分析；确定试点园区名单。'),
    ('2', '研发阶段一：资源评估与准入标准', '2026.Q4', '3个月',
     '研发多类型资源分级分类可调潜力评估模型；制定虚拟电厂资源准入标准与质量分级体系；开发资源普查与潜力评估平台原型。'),
    ('3', '研发阶段二：多市场协同交易辅助决策', '2027.Q1', '3个月',
     '研发现货市场、辅助服务市场、需求响应联合报价AI辅助决策模型；完成多市场交易仿真环境搭建；在仿真环境下验证报价策略有效性。'),
    ('4', '研发阶段三：双通道协同调控平台', '2027.Q2', '3个月',
     '研发直控+邀约双通道协同调控平台；完成AGC/API直控通道对接与邀约通道微信小程序开发；在黔能三安园区开展调控功能闭环验证。'),
    ('5', '试点验证：全流程业务场景跑通', '2027.Q3', '3个月',
     '在贵州选取不少于2个高载能工业园区开展全流程试点验证；完成不低于5000千瓦可调负荷的常态化调控；形成可复制的商业模式与运营标准。'),
]

# ============================================================
# 六、待协调事项
# ============================================================
SEC6_COORD = [
    (f"事项一：贵州电网调度中心AGC/API直控接口开放",
     f"双通道调控模式中的{LQ}直控通道{RQ}需要调度中心开放AGC系统API接口，"
     f"支持虚拟电厂平台以秒级/分钟级频次下发调控指令。"
     f"需协调调度中心明确接口开放的时间表、接口规范与安全认证机制，"
     f"并纳入2026年电网数字化技改计划统筹实施。"),
    (f"事项二：贵州省电力交易中心虚拟电厂准入与结算规则细则",
     f"当前贵州省虚拟电厂参与现货市场的准入条件、结算规则、收益分配指引尚未出台细则，"
     f"导致项目商业化运营路径存在政策不确定性。"
     f"需协调省交易中心加快制定虚拟电厂入市细则，明确{LQ}聚合商注册-资源准入-交易结算-收益分配{RQ}全链路规则。"),
    (f"事项三：试点园区业主单位的内部决策与配合机制",
     f"黔能三安新能源科技有限公司、贵州矿能集团有限公司等试点园区业主单位，"
     f"需要完成内部决策程序，同意园区内可调节负荷参与虚拟电厂调控试点。"
     f"需协调各市州供电局协助对接园区业主，建立{LQ}电网方-聚合商-园区业主{RQ}三方协调推进机制。"),
    (f"事项四：联合申报单位的任务分工与知识产权归属",
     f"本项目参与方较多（贵州电网、朗新科技、黔能三安、贵州矿能、贵州国能、贵州大学），"
     f"需在各参与方之间明确任务分工、交付物标准、知识产权归属与成果转化收益分配机制，"
     f"并签署正式的联合申报协议与任务书，保障项目规范实施。"),
]

# ============================================================
# 辅助函数
# ============================================================
def set_table_border(table, color='333333', sz='6'):
    tbl = table._tbl
    tblPr = tbl.tblPr if tbl.tblPr is not None else parse_xml(f'<w:tblPr {nsdecls("w")}></w:tblPr>')
    borders = parse_xml(f'<w:tblBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:insideH w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'<w:insideV w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
        f'</w:tblBorders>')
    tblPr.append(borders)

def add_hdg(doc, text, level=1):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_before = Pt(16 if level==1 else 12)
    pf.space_after = Pt(8)
    pf.line_spacing = Pt(26)
    if level == 0:
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fn = 'SimHei'; fs = 22
        pf.space_before = Pt(24); pf.space_after = Pt(18)
    elif level == 1: fn = 'SimHei'; fs = 16
    elif level == 2: fn = 'KaiTi'; fs = 15
    elif level == 3: fn = 'KaiTi'; fs = 13
    else: fn = 'FangSong'; fs = 12
    run = p.add_run(text)
    run.font.size = Pt(fs)
    run.font.name = fn
    run._element.rPr.rFonts.set(qn('w:eastAsia'), fn)
    run.font.bold = True
    return p

def add_para(doc, text, font_name='FangSong', font_size=12, bold=False, align=None, indent=0, color=None):
    p = doc.add_paragraph()
    pf = p.paragraph_format
    pf.space_after = Pt(6)
    pf.line_spacing = Pt(22)
    if indent: pf.first_line_indent = Pt(indent)
    if align: p.alignment = align
    run = p.add_run(text)
    run.font.size = Pt(font_size)
    run.font.name = font_name
    run._element.rPr.rFonts.set(qn('w:eastAsia'), font_name)
    if bold: run.font.bold = True
    if color: run.font.color.rgb = color
    return p

def add_img(doc, img_path, width=5.5, caption=''):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    if os.path.exists(img_path):
        run = p.add_run()
        run.add_picture(img_path, width=Inches(width))
    if caption:
        cp = doc.add_paragraph()
        cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        cr = cp.add_run(caption)
        cr.font.size = Pt(9); cr.font.name = 'SimSun'
        cr._element.rPr.rFonts.set(qn('w:eastAsia'), 'SimSun')
        cr.font.color.rgb = RGBColor(0x66, 0x66, 0x66)

def add_br(doc):
    doc.add_page_break()

# ============================================================
# 文档构建主函数
# ============================================================
def build():
    doc = Document()
    sec = doc.sections[0]
    sec.page_width = Cm(21); sec.page_height = Cm(29.7)
    sec.top_margin = Cm(2.54); sec.bottom_margin = Cm(2.54)
    sec.left_margin = Cm(3.18); sec.right_margin = Cm(3.18)
    print('文档初始化完成')

    # ===== 封面 =====
    add_para(doc, '', font_size=6)
    add_para(doc, TITLE1, font_name='SimHei', font_size=22, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_para(doc, '', font_size=10)
    add_para(doc, TITLE2, font_name='KaiTi', font_size=18, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_para(doc, '', font_size=10)
    add_para(doc, '场景名称：虚拟电厂多时空尺度智能协同运营',
              font_name='FangSong', font_size=14, bold=True, align=WD_ALIGN_PARAGRAPH.CENTER)
    add_para(doc, '', font_size=10)

    info = [
        ('申报单位', '（待填写）'),
        ('联合申报单位', '贵州电网有限责任公司、朗新科技集团股份有限公司\n贵州矿能集团有限公司、贵州国能科技有限公司\n黔能三安新能源科技有限公司'),
        ('项目负责人', '（待填写）'),
        ('联系方式', '（待填写）'),
        ('申报日期', '2026年6月'),
    ]
    t = doc.add_table(rows=len(info), cols=2)
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_border(t)
    for i, (k, v) in enumerate(info):
        c0, c1 = t.cell(i,0), t.cell(i,1)
        c0.width = Cm(3.5); c1.width = Cm(11)
        p0 = c0.paragraphs[0]; p0.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r0 = p0.add_run(k); r0.font.size = Pt(12); r0.font.name = 'SimHei'
        r0._element.rPr.rFonts.set(qn('w:eastAsia'), 'SimHei'); r0.font.bold = True
        shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="E8EAF6" w:val="clear"/>')
        c0._tc.get_or_add_tcPr().append(shading)
        p1 = c1.paragraphs[0]; p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r1 = p1.add_run(v); r1.font.size = Pt(11); r1.font.name = 'FangSong'
        r1._element.rPr.rFonts.set(qn('w:eastAsia'), 'FangSong')
    add_br(doc)
    print('封面完成')

    # ===== 一、项目背景与意义 =====
    add_hdg(doc, '一、项目背景与意义', 1)
    add_hdg(doc, '（一）行业背景与政策环境', 2)
    for para_text in SEC1_1_1:
        add_para(doc, para_text, indent=24)
    add_img(doc, os.path.join(OUT_DIR, 'fig_vpp_arch.png'), 5.5,
             f'图1-1  虚拟电厂{LQ}多时空尺度智能协同运营{RQ}业务架构')

    add_hdg(doc, '（二）问题分析与需求痛点', 2)
    add_para(doc, SEC1_1_2, indent=24)
    for title, detail in SEC1_1_2_LIST:
        add_hdg(doc, title, 3)
        add_para(doc, detail, indent=24)

    add_hdg(doc, '（三）项目建设的必要性与意义', 2)
    for para_text in SEC1_2:
        add_para(doc, para_text, indent=24)
    add_br(doc)
    print('第一章完成')

    # ===== 二、主要研究内容 =====
    add_hdg(doc, '二、主要研究内容', 1)
    add_para(doc, SEC2_INTRO, indent=24)

    rt = doc.add_table(rows=1, cols=4)
    rt.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_border(rt)
    widths_r = [Cm(2.0), Cm(4.5), Cm(3.5), Cm(4.5)]
    for i, hd in enumerate(['子任务编号', '子任务名称', '牵头方', '参与方']):
        cell = rt.rows[0].cells[i]; cell.text = ''
        p = cell.paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(hd); r.font.size = Pt(10); r.font.name = 'SimHei'
        r._element.rPr.rFonts.set(qn('w:eastAsia'), 'SimHei'); r.font.bold = True
        shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="1A237E" w:val="clear"/>')
        cell._tc.get_or_add_tcPr().append(shading)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        cell.width = widths_r[i]

    for topic, subtasks in SEC2_RESEARCH:
        tr = rt.add_row()
        tr.cells[0].merge(tr.cells[3])
        cell = tr.cells[0]; cell.text = ''
        p = cell.paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        r = p.add_run(topic); r.font.size = Pt(10); r.font.name = 'KaiTi'
        r._element.rPr.rFonts.set(qn('w:eastAsia'), 'KaiTi'); r.font.bold = True
        shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="E8EAF6" w:val="clear"/>')
        cell._tc.get_or_add_tcPr().append(shading)
        cell.width = Cm(14.5)
        for sub in subtasks:
            sr = rt.add_row()
            for j, txt in enumerate(sub):
                cell = sr.cells[j]; cell.text = ''
                p = cell.paragraphs[0]
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                r = p.add_run(txt); r.font.size = Pt(9); r.font.name = 'FangSong'
                r._element.rPr.rFonts.set(qn('w:eastAsia'), 'FangSong')
                cell.width = widths_r[j]
    add_br(doc)
    print('第二章完成')

    # ===== 三、创新点 =====
    add_hdg(doc, '三、创新点', 1)
    for title, detail, compare in SEC3_INNOVATIONS:
        add_hdg(doc, title, 3)
        add_para(doc, detail, indent=24)
        add_para(doc, compare, font_size=9.5, indent=24, color=RGBColor(0x15, 0x65, 0xC0))
    add_img(doc, os.path.join(OUT_DIR, 'fig_vpp_sysarch.png'), 5.5,
             f'图3-1  虚拟电厂{LQ}多时空尺度智能协同运营{RQ}系统总体架构')
    add_br(doc)
    print('第三章完成')

    # ===== 四、资金情况 =====
    add_hdg(doc, '四、资金情况', 1)
    add_para(doc, SEC4_INTRO, indent=24)
    bt = doc.add_table(rows=1, cols=5)
    bt.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_border(bt)
    widths_b = [Cm(1.2), Cm(5.0), Cm(2.5), Cm(1.8), Cm(5.5)]
    for i, hd in enumerate(['序号', '预算科目', '金额（万元）', '占比', '主要用途']):
        cell = bt.rows[0].cells[i]; cell.text = ''
        p = cell.paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(hd); r.font.size = Pt(10); r.font.name = 'SimHei'
        r._element.rPr.rFonts.set(qn('w:eastAsia'), 'SimHei'); r.font.bold = True
        shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="1A237E" w:val="clear"/>')
        cell._tc.get_or_add_tcPr().append(shading)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        cell.width = widths_b[i]
    for row_data in SEC4_BUDGET:
        tr = bt.add_row()
        for j, txt in enumerate(row_data):
            cell = tr.cells[j]; cell.text = ''
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(txt); r.font.size = Pt(10)
            fn = 'FangSong' if j == 4 else 'SimHei'
            r.font.name = fn; r._element.rPr.rFonts.set(qn('w:eastAsia'), fn)
            if j == 0:
                r.font.bold = True
                shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="E8EAF6" w:val="clear"/>')
                cell._tc.get_or_add_tcPr().append(shading)
            cell.width = widths_b[j]
    add_br(doc)
    print('第四章完成')

    # ===== 五、项目整体计划 =====
    add_hdg(doc, '五、项目整体计划', 1)
    pt = doc.add_table(rows=1, cols=5)
    pt.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_border(pt)
    widths_p = [Cm(1.0), Cm(3.5), Cm(2.0), Cm(1.8), Cm(6.2)]
    for i, hd in enumerate(['序号', '任务名称', '开始时间', '工期', '任务描述']):
        cell = pt.rows[0].cells[i]; cell.text = ''
        p = cell.paragraphs[0]; p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(hd); r.font.size = Pt(10); r.font.name = 'SimHei'
        r._element.rPr.rFonts.set(qn('w:eastAsia'), 'SimHei'); r.font.bold = True
        shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="1A237E" w:val="clear"/>')
        cell._tc.get_or_add_tcPr().append(shading)
        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
        cell.width = widths_p[i]
    for row_data in SEC5_PLAN:
        tr = pt.add_row()
        for j, txt in enumerate(row_data):
            cell = tr.cells[j]; cell.text = ''
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if j < 4 else WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(txt); r.font.size = Pt(9); r.font.name = 'FangSong'
            r._element.rPr.rFonts.set(qn('w:eastAsia'), 'FangSong')
            cell.width = widths_p[j]
    add_img(doc, os.path.join(OUT_DIR, 'fig_vpp_gantt.png'), 5.5,
             f'图5-1  虚拟电厂{LQ}多时空尺度智能协同运营{RQ}项目实施计划甘特图（15个月）')
    add_br(doc)
    print('第五章完成')

    # ===== 六、待协调事项 =====
    add_hdg(doc, '六、待协调事项', 1)
    add_para(doc, '为确保项目顺利推进和实施，以下事项需在项目启动前期重点协调落实：', indent=24)
    for title, detail in SEC6_COORD:
        add_hdg(doc, title, 3)
        add_para(doc, detail, indent=24)
    print('第六章完成')

    # ===== 保存 =====
    out_path = os.path.join(OUT_DIR, '虚拟电厂多时空尺度智能协同运营_申报方案_v4.docx')
    doc.save(out_path)
    print(f'生成成功：{out_path}')
    print(f'文件大小：{os.path.getsize(out_path):,} 字节')

if __name__ == '__main__':
    build()
