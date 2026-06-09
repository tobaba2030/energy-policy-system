# -*- coding: utf-8 -*-
"""Build v10 docx from markdown - 按照国家能源局6板块格式"""
import re
from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from lxml import etree

def build():
    doc = Document()

    # Page margins
    for section in doc.sections:
        section.top_margin = Cm(2.54)
        section.bottom_margin = Cm(2.54)
        section.left_margin = Cm(3.17)
        section.right_margin = Cm(3.17)

    # Default style
    style = doc.styles['Normal']
    style.font.size = Pt(12)
    style.font.name = '\u4eff\u5b8b'
    style.element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')
    style.paragraph_format.line_spacing = 1.5

    def add_title(text, level=0):
        if level == 0:
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p.add_run(text)
            run.bold = True
            run.font.size = Pt(22)
            run.font.name = '\u9ed1\u4f53'
            run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u9ed1\u4f53')
        elif level == 1:
            p = doc.add_paragraph()
            run = p.add_run(text)
            run.bold = True
            run.font.size = Pt(16)
            run.font.name = '\u9ed1\u4f53'
            run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u9ed1\u4f53')
        elif level == 2:
            p = doc.add_paragraph()
            run = p.add_run(text)
            run.bold = True
            run.font.size = Pt(14)
            run.font.name = '\u9ed1\u4f53'
            run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u9ed1\u4f53')
        elif level == 3:
            p = doc.add_paragraph()
            run = p.add_run(text)
            run.bold = True
            run.font.size = Pt(12)
            run.font.name = '\u6977\u4f53'
            run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u6977\u4f53')
        return p

    def add_body(text):
        p = doc.add_paragraph()
        # Handle bold markers **text**
        parts = re.split(r'(\*\*.*?\*\*)', text)
        for part in parts:
            if part.startswith('**') and part.endswith('**'):
                run = p.add_run(part[2:-2])
                run.bold = True
                run.font.size = Pt(12)
                run.font.name = '\u4eff\u5b8b'
                run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')
            else:
                run = p.add_run(part)
                run.font.size = Pt(12)
                run.font.name = '\u4eff\u5b8b'
                run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')
        return p

    def add_table(headers, rows):
        table = doc.add_table(rows=1 + len(rows), cols=len(headers))
        table.style = 'Table Grid'
        # Header row
        for i, h in enumerate(headers):
            cell = table.rows[0].cells[i]
            cell.text = ''
            p = cell.paragraphs[0]
            run = p.add_run(h)
            run.bold = True
            run.font.size = Pt(10)
            run.font.name = '\u4eff\u5b8b'
            run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')
            # Shade header
            tc = cell._tc
            tcPr = tc.get_or_add_tcPr()
            shd = etree.SubElement(tcPr, qn('w:shd'))
            shd.set(qn('w:val'), 'clear')
            shd.set(qn('w:color'), 'auto')
            shd.set(qn('w:fill'), 'D5E8F0')
        # Data rows
        for r_idx, row in enumerate(rows):
            for c_idx, val in enumerate(row):
                cell = table.rows[r_idx + 1].cells[c_idx]
                cell.text = ''
                p = cell.paragraphs[0]
                run = p.add_run(str(val))
                run.font.size = Pt(10)
                run.font.name = '\u4eff\u5b8b'
                run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')
        return table

    # ===================== DOCUMENT CONTENT =====================

    add_title('国家能源局"人工智能+"能源高价值场景试点建设方案', 0)
    add_body('')
    add_title('项目名称：虚拟电厂多时空尺度智能协同运营', 1)
    add_body('（对应国家能源局首批51个"人工智能+"能源高价值场景清单 \u2014 能源新业态类）')

    # ===================== 一、项目背景与意义 =====================
    add_title('一、项目背景与意义', 1)
    add_title('（一）行业背景与政策环境', 2)

    add_title('1. 场景说明', 3)
    add_body('虚拟电厂通过先进信息和控制技术，将分散在配电网末端的充电桩、空调、储能、分布式光伏、工业柔性负荷等碎片化灵活性资源聚合成一个可调度、可交易的统一主体，对增强电力保供、促进新能源消纳具有重要作用。')
    add_body('2025年12月29日，广东首批5家发电类虚拟电厂以"报量报价"方式正式参与电力现货市场交易\u2014\u2014这标志着虚拟电厂正式从"被动管理对象"转型为"主动市场参与者"。但高度市场化环境下的海量资源认知、多时间尺度协同决策、跨市场联合交易、安全可信部署等系统性智能化短板，正在成为制约其规模化商用的瓶颈。')
    add_body('国内虚拟电厂已进入规模化发展快车道。截至2025年底，全国虚拟电厂调节能力突破3500万千瓦，南方电网全网聚合容量近1800万千瓦。深圳建成全国首个网地一体虚拟电厂平台，2022年8月成立国内首家虚拟电厂管理中心（设在南方电网深圳供电局），截至2025年聚合虚拟电厂运营商61家，最大可调能力超130万千瓦，占全市电网最高负荷比率超5.4%，为全国最高；佛山禅城区获批全国首个公共机构虚拟电厂示范区，2026\u20142028年建设方案已发布，将推动区属公共机构、工商业园区、电动汽车充电站场等多元主体接入，构建总聚合资源规模超20万千瓦的可控负荷群。广东全省2025年电力市场交易规模达6541.8亿千瓦时，直接交易电量4586.3亿千瓦时（同比增长16.2%），市场经营主体突破14万家，资源底座雄厚。')
    add_body('当前核心矛盾已从"有没有虚拟电厂"转变为"虚拟电厂够不够智能"：海量异构资源能否被AI精准认知并动态聚合？多时间尺度下的协同调度能否由AI自主优化？多市场价格信号能否被AI实时解析并形成最优交易策略？整个运营平台能否在AI驱动下实现安全可信的自动化闭环？回答这些问题，需要人工智能技术体系性地渗透到虚拟电厂"认知\u2014决策\u2014交易\u2014部署"全链条。')

    add_title('2. 人工智能应用赋能现状', 3)
    add_body('虚拟电厂领域的AI应用目前处于"单点探索、未成体系"阶段：')
    add_body('\u2022 资源认知侧：仍以人工参数整定和典型值建模为主，少数项目尝试用机器学习进行负荷预测，但尚未系统性应用于资源响应特性自动辨识和动态聚合评估。')
    add_body('\u2022 调度决策侧：主流方案仍依赖混合整数线性规划（MILP）、随机优化、鲁棒优化等传统方法，深度强化学习（DRL）在国际学术界已展现显著优势（PPO、DDPG、TD3+分层架构），但国内工程化应用几近空白。')
    add_body('\u2022 市场交易侧：电价预测以ARIMA、LSTM等单市场模型为主，缺乏多市场联合预测与协同优化能力；收益分配仍按容量比例"一刀切"，未引入博弈论精准量化。')
    add_body('\u2022 平台架构侧：现有平台为"集中式+规则驱动"架构，缺乏边缘AI、联邦学习、AI安全约束、可解释AI等AI原生能力。')
    add_body('总体判断：AI技术在虚拟电厂各环节均有尝试性应用，但各自为战、互不联通，未形成"AI全链条驱动"的系统性赋能方案。本项目正是要填补这一空白。')

    add_title('3. 面临的挑战', 3)
    add_body('\u2022 数据异构与质量参差：资源侧设备品牌型号繁杂，通信协议不统一，数据缺失和异常频发，为AI建模带来输入端挑战。')
    add_body('\u2022 AI决策安全可信：电网运行对安全性要求极高，AI"黑盒"决策难以被调度机构直接采信，可解释性和安全约束保障是工程化的关键卡点。')
    add_body('\u2022 仿真到现实的鸿沟：DRL等AI算法依赖高保真仿真环境训练，仿真与真实运行环境的差异（域偏移）影响策略泛化能力。')
    add_body('\u2022 商业模式可持续性：AI投入成本高，但虚拟电厂市场收益受政策波动影响大，AI赋能的增量价值需有清晰的商业闭环。')

    add_title('4. 政策环境', 3)
    add_body('国家层面\u2014\u2014AI+能源顶层设计全面落地：')
    add_body('2025年3月，国家发改委、能源局印发《关于加快推进虚拟电厂发展的指导意见》（发改能源〔2025〕357号），明确提出到2027年全国虚拟电厂调节能力达2000万千瓦以上、2030年达5000万千瓦以上的发展目标。')
    add_body('2025年9月，国家发改委、能源局联合印发《关于推进"人工智能+"能源高质量发展的实施意见》（国能发科技〔2025〕73号），落实《国务院关于深入实施"人工智能+"行动的意见》（国发〔2025〕11号），明确在虚拟电厂、源网荷储协同等领域打造"人工智能+"高价值应用场景。')
    add_body('2026年5月26日，国家能源局在深圳召开全国"人工智能+"能源现场推进会，正式发布首批51个"人工智能+"能源高价值场景清单。本项目所申报的"虚拟电厂多时空尺度智能协同运营"位列其中（能源新业态类），为本项目申报提供了最直接、最权威的政策依据。')
    add_body('此外，《关于深化新能源上网电价市场化改革的通知》（发改价格〔2025〕136号）推动新能源全面进入市场，现货电价波动性进一步增强，对虚拟电厂AI辅助交易决策的需求日益迫切。')
    add_body('地方层面\u2014\u2014深圳佛山双核示范格局已成形：')
    add_body('广东省在全国率先建立虚拟电厂参与电力市场交易机制，2025年12月已实现首批虚拟电厂以"报量报价"方式参与现货市场交易，覆盖深圳、佛山、中山等地。深圳市依托虚拟电厂管理中心，推动龙华区建设混合型虚拟电厂（工业厂房+商业综合体+居民住宅），宝安区建设"虚拟电厂小镇"示范，2025年7月完成深圳首例"车网互动"直送城中村居民用电并完成放电结算；佛山市禅城区建设全国首个公共机构虚拟电厂示范区，2026年底前推动60%以上区属公共机构接入虚拟电厂，2027年底前实现80%以上区属公共机构接入，带动20家以上工商业园区、50个以上电动汽车充电站场接入。广东省已形成"政策推动+市场驱动+深圳佛山双核示范"的协同发展格局。')

    add_title('5. 人工智能技术应用前景', 3)
    add_body('AI技术在虚拟电厂全链条的应用前景广阔：')
    add_body('\u2022 感知层：ML自动辨识+LSTM时变建模+GNN空间依赖+BNN概率估计，可将资源认知效率提升80%以上，准确率提升至90%以上。')
    add_body('\u2022 决策层：分层DRL（PPO+DDPG+TD3）可突破传统优化的实时性瓶颈，调度成本较规则策略降低15%以上，决策时延降至毫秒级。')
    add_body('\u2022 市场层：Transformer多市场联合预测+Scenario GAN极端场景生成+Shapley值公平分配，可提升交易综合收益20%以上。')
    add_body('\u2022 平台层：边缘AI+联邦学习+AI安全层+可解释AI，可实现百毫秒级就地响应、隐私保护训练、100%约束满足率、80%+决策可解释覆盖率。')

    # ===================== （二）问题分析与需求痛点 =====================
    add_title('（二）问题分析与需求痛点', 2)
    add_body('当前虚拟电厂规模化运营面临四大系统性难题。以下结合深圳、佛山虚拟电厂实际运行场景，从AI技术赋能角度进行分析。')

    add_title('痛点一：海量异构资源认知能力不足\u2014\u2014"看不准"（感知层智能化短板）', 3)
    add_body('虚拟电厂面临的首要挑战是如何准确"认知"其聚合的数千个分布式资源。以深圳龙华区混合型虚拟电厂为例，聚合工业厂房、商业综合体、居民住宅等多类场景，同一品牌型号的空调设备因建筑围护结构差异、商户经营时间不同、用户设定偏好各异，导致响应特性存在显著离散性。传统基于典型参数和经验公式的建模方法，实际响应率明显低于理论评估值，影响可调容量申报可信度。佛山禅城区公共机构（政府办公楼、学校、医院）的空调系统品牌型号繁杂、控制接口不统一，精细化建模工作量巨大。')
    add_body('当资源节点数量从几十个增长到数百、数千个时，"怎样准确认知每一类资源的响应能力、怎样在变化环境中动态评估可调容量、怎样在用户意愿约束下优化聚合方案"\u2014\u2014传统的人工参数整定和静态建模方法已力不从心。机器学习（ML）和深度学习技术为资源参数自动辨识、异常特性检测、多源异构数据融合提供了有效手段，但尚未在虚拟电厂工程化场景中系统性应用。')

    add_title('痛点二：多时间尺度协同调控缺乏高效智能决策引擎\u2014\u2014"算不快"（决策层智能化短板）', 3)
    add_body('虚拟电厂调度涉及秒级调频、分钟级调峰、日前优化等多时间尺度协同，本质上是一个高维、非线性、混合整数优化问题。随着资源数量增加，计算复杂度呈指数级增长。以佛山工业园区虚拟电厂为例，聚合的生产工艺复杂、能源梯级利用关系紧密，在参与调频辅助服务时，传统集中式优化算法（MILP、随机优化、鲁棒优化）计算耗时远超响应时间窗口，导致被迫退出调频市场。深圳迎峰度夏期间，调峰指令响应延迟同样处于临界状态。')
    add_body('深度强化学习（DRL）通过构建"智能体\u2014环境"交互框架，无需显式建模复杂环境动态，即可从高维状态空间自主学习最优调度策略。国际前沿研究（PPO、DDPG、TD3算法+分层架构）已证明其在处理高维连续动作空间和多重不确定性方面优于传统方法。本项目将DRL定位为核心智能决策引擎，解决"感知\u2014决策\u2014执行"闭环中的决策层瓶颈。')

    add_title('痛点三：多市场联合交易智能化决策能力不足\u2014\u2014"赚不多"（市场层智能化短板）', 3)
    add_body('深圳、佛山虚拟电厂可同时参与电能量、调频、调峰三类市场，但目前交易策略多针对单一市场独立设计，缺乏跨市场协同优化的智能决策能力。同时，多市场电价信号的时序预测、极端场景（尖峰电价、负电价）的快速应变、聚合体内多类资源属主的收益公平分配，均需要智能化的算法支撑。时间序列深度学习模型（LSTM、Transformer）在电价预测领域已展现显著优势，可有效提升交易策略的前瞻性和精准度。')

    add_title('痛点四：运营平台智能化架构滞后、安全可信机制缺失\u2014\u2014"部署难"（平台层智能化短板）', 3)
    add_body('当前虚拟电厂平台在数据实时性、安全约束保障、决策可解释性三方面存在短板。随着资源规模扩大，边缘AI（Edge AI）技术可在园区/片区侧实现轻量化智能决策和就地快速响应；AI异常检测与预测性维护可提前预警设备故障和性能衰减；知识蒸馏和注意力可视化可将深度神经网络策略近似为可理解的规则集，解决电网调度机构对AI决策"黑盒"的信任顾虑。')

    add_body('四大痛点的内在逻辑关系与AI赋能路径：')
    add_table(
        ['\u5c42\u7ea7', '\u6838\u5fc3\u75db\u70b9', 'AI\u8d4b\u80fd\u65b9\u5411', 'AI\u6280\u672f\u8f7d\u4f53'],
        [
            ['\u611f\u77e5\u5c42', '\u6d77\u91cf\u5f02\u6784\u8d44\u6e90\u8ba4\u77e5\u80fd\u529b\u4e0d\u8db3', '\u4ece\u201c\u4eba\u5de5\u7ecf\u9a8c\u5efa\u6a21\u201d\u5230\u201cAI\u6570\u636e\u9a71\u52a8\u8ba4\u77e5\u201d', '\u673a\u5668\u5b66\u4e60\uff08ML\uff09\u3001\u6df1\u5ea6\u5b66\u4e60\uff08LSTM\uff09\u3001\u8fc1\u79fb\u5b66\u4e60'],
            ['\u51b3\u7b56\u5c42', '\u534f\u540c\u8c03\u63a7\u7f3a\u4e4f\u9ad8\u6548\u667a\u80fd\u51b3\u7b56\u5f15\u64ce', '\u4ece\u201c\u89c4\u5219+\u4f20\u7edf\u4f18\u5316\u201d\u5230\u201cAI\u81ea\u4e3b\u51b3\u7b56\u201d', '\u6df1\u5ea6\u5f3a\u5316\u5b66\u4e60\uff08DRL\uff09\u2014\u2014\u672c\u9879\u76ee\u6838\u5fc3\u5f15\u64ce'],
            ['\u5e02\u573a\u5c42', '\u591a\u5e02\u573a\u4ea4\u6613\u667a\u80fd\u5316\u51b3\u7b56\u80fd\u529b\u4e0d\u8db3', '\u4ece\u201c\u4eba\u5de5\u5224\u65ad+\u9759\u6001\u7b56\u7565\u201d\u5230\u201cAI\u9884\u6d4b+\u52a8\u6001\u4f18\u5316\u201d', '\u65f6\u95f4\u5e8f\u5217\u6df1\u5ea6\u5b66\u4e60\u3001AI\u8f85\u52a9\u4f18\u5316'],
            ['\u5e73\u53f0\u5c42', '\u667a\u80fd\u5316\u67b6\u6784\u6ede\u540e\u3001\u5b89\u5168\u53ef\u4fe1\u7f3a\u5931', '\u4ece\u201c\u96c6\u4e2d\u5f0f+\u9ed1\u76d2\u201d\u5230\u201c\u4e91\u8fb9\u534f\u540cAI+\u53ef\u89e3\u91ca\u201d', '\u8fb9\u7f18AI\u3001\u77e5\u8bc6\u84b8\u998f\u3001\u6ce8\u610f\u529b\u53ef\u89c6\u5316'],
        ]
    )

    # ===================== 二、主要研究内容 =====================
    add_title('二、主要研究内容', 1)
    add_body('本项目划分为五个子课题，按照"感知\u2014决策\u2014交易\u2014部署\u2014验证"的AI全链条逻辑展开。由南网综合能源公司牵头，联合高校、科研院所、产业链上下游企业共同实施。')

    add_title('课题总览', 3)
    add_table(
        ['\u5b50\u8bfe\u9898', '\u540d\u79f0', '\u5b9a\u4f4d', '\u7275\u5934\u65b9', '\u53c2\u4e0e\u65b9'],
        [
            ['\u5b50\u8bfe\u9898\u4e00', 'AI\u9a71\u52a8\u7684\u5206\u5e03\u5f0f\u8d44\u6e90\u591a\u65f6\u7a7a\u5c3a\u5ea6\u7cbe\u7ec6\u5316\u5efa\u6a21\u4e0e\u52a8\u6001\u805a\u5408\u6280\u672f', '\u611f\u77e5\u5c42', 'XX\u5927\u5b66', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90\u3001XX\u79d1\u6280\u516c\u53f8'],
            ['\u5b50\u8bfe\u9898\u4e8c', '\u878d\u5408\u6df1\u5ea6\u5f3a\u5316\u5b66\u4e60\u7684\u865a\u62df\u7535\u5382\u667a\u80fd\u8c03\u5ea6\u7b97\u6cd5\u4e0e\u63a7\u5236\u7b56\u7565', '\u51b3\u7b56\u5c42\u2605', 'XX\u5927\u5b66', 'XX\u7814\u7a76\u9662\u3001\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['\u5b50\u8bfe\u9898\u4e09', 'AI\u8d4b\u80fd\u7684\u865a\u62df\u7535\u5382\u591a\u5e02\u573a\u8054\u5408\u4ea4\u6613\u51b3\u7b56\u4e0e\u6536\u76ca\u5206\u914d\u673a\u5236', '\u5e02\u573a\u5c42', 'XX\u7814\u7a76\u9662', 'XX\u5927\u5b66\u3001\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['\u5b50\u8bfe\u9898\u56db', '\u4e91\u8fb9\u7aef\u534f\u540c\u7684AI\u539f\u751f\u865a\u62df\u7535\u5382\u667a\u80fd\u8fd0\u8425\u5e73\u53f0\u4e0e\u5b89\u5168\u53ef\u4fe1\u67b6\u6784', '\u5e73\u53f0\u5c42', 'XX\u79d1\u6280\u516c\u53f8', 'XX\u7814\u7a76\u9662\u3001\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['\u5b50\u8bfe\u9898\u4e94', '\u6df1\u5733+\u4f5b\u5c71\u865a\u62df\u7535\u5382AI\u5168\u94fe\u6761\u667a\u80fd\u8c03\u5ea6\u793a\u8303\u5e94\u7528', '\u5e94\u7528\u5c42', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90', '\u6df1\u5733\u4f9b\u7535\u5c40\u3001\u4f5b\u5c71\u4f9b\u7535\u5c40\u3001XX\u5927\u5b66\u3001XX\u7814\u7a76\u9662\u3001XX\u79d1\u6280\u516c\u53f8'],
        ]
    )

    # Sub-task tables
    add_title('子课题一任务分解', 3)
    add_table(
        ['\u5e8f\u53f7', '\u5b50\u4efb\u52a1', '\u7275\u5934\u65b9', '\u53c2\u4e0e\u65b9'],
        [
            ['1.1', '\u57fa\u4e8eML\u7684\u591a\u7c7b\u578b\u5206\u5e03\u5f0f\u8d44\u6e90\u54cd\u5e94\u7279\u6027\u81ea\u52a8\u8fa8\u8bc6', 'XX\u5927\u5b66', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['1.2', '\u57fa\u4e8e\u6df1\u5ea6\u5b66\u4e60\u7684\u591a\u6e90\u5f02\u6784\u6570\u636e\u878d\u5408\u72b6\u6001\u8bc4\u4f30\uff08TCN/Transformer\u529f\u7387\u9884\u6d4b\u3001BNN\u6982\u7387\u5316SOC\u4f30\u8ba1\u3001GNN\u7a7a\u95f4\u4f9d\u8d56\u5efa\u6a21\uff09', 'XX\u5927\u5b66', 'XX\u79d1\u6280\u516c\u53f8'],
            ['1.3', 'AI\u8f85\u52a9\u7684\u591a\u65f6\u7a7a\u5c3a\u5ea6\u52a8\u6001\u805a\u5408\u4f18\u5316\uff08\u8fdb\u5316\u7b97\u6cd5+ML\u4ee3\u7406\u6a21\u578b+\u4e3b\u52a8\u5b66\u4e60\uff09', 'XX\u5927\u5b66', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['1.4', '\u8d44\u6e90\u54cd\u5e94\u7279\u6027AI\u6570\u636e\u5e93\u4e0e\u805a\u5408\u5e73\u53f0\u6a21\u5757\u5f00\u53d1', 'XX\u79d1\u6280\u516c\u53f8', 'XX\u5927\u5b66'],
        ]
    )

    add_title('子课题二任务分解（核心）', 3)
    add_table(
        ['\u5e8f\u53f7', '\u5b50\u4efb\u52a1', '\u7275\u5934\u65b9', '\u53c2\u4e0e\u65b9'],
        [
            ['2.1', '\u865a\u62df\u7535\u5382\u8c03\u5ea6\u95ee\u9898\u7684DRL\u5efa\u6a21\u4e0e\u6846\u67b6\u8bbe\u8ba1\uff08MDP\u5efa\u6a21\uff1a\u72b6\u6001\u7a7a\u95f4/\u52a8\u4f5c\u7a7a\u95f4/\u5956\u52b1\u51fd\u6570\u8bbe\u8ba1\uff0c\u53c2\u6570\u5316\u52a8\u4f5c\u7a7a\u95f4\uff09', 'XX\u5927\u5b66', 'XX\u7814\u7a76\u9662'],
            ['2.2', '\u5206\u5c42DRL\u534f\u540c\u8c03\u63a7\u67b6\u6784\u4e0e\u7b97\u6cd5\u5b9e\u73b0\uff08\u4e0a\u5c42PPO\u65e5\u524d\u6295\u6807+\u4e2d\u5c42DDPG\u65e5\u5185\u6eda\u52a8+\u4e0b\u5c42TD3\u5b9e\u65f6\u63a7\u5236\uff09', 'XX\u5927\u5b66', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['2.3', 'DRL\u8bad\u7ec3\u4f18\u5316\u4e0e\u89c4\u6a21\u5316\u6269\u5c55\uff08\u793a\u8303\u5b66\u4e60\u9884\u8bad\u7ec3\u3001\u6a21\u578b\u57faRL\u3001MADRL+CTDE+\u6ce8\u610f\u529b\u673a\u5236\u3001\u8fc1\u79fb\u4e0e\u6301\u7eed\u5b66\u4e60\uff09', 'XX\u5927\u5b66', 'XX\u7814\u7a76\u9662'],
            ['2.4', 'DRL\u8c03\u5ea6\u7b97\u6cd5\u5728\u6570\u5b57\u5b6a\u751f\u73af\u5883\u4e2d\u7684\u5168\u573a\u666f\u9a8c\u8bc1', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90', 'XX\u5927\u5b66'],
        ]
    )

    add_title('子课题三任务分解', 3)
    add_table(
        ['\u5e8f\u53f7', '\u5b50\u4efb\u52a1', '\u7275\u5934\u65b9', '\u53c2\u4e0e\u65b9'],
        [
            ['3.1', '\u57fa\u4e8e\u6df1\u5ea6\u5b66\u4e60\u7684\u591a\u5e02\u573a\u7535\u4ef7\u8054\u5408\u9884\u6d4b\u6280\u672f\uff08Transformer+\u5206\u4f4d\u6570\u9884\u6d4b+\u5bf9\u6297\u8bad\u7ec3\u9c81\u68d2\u589e\u5f3a\uff09', 'XX\u7814\u7a76\u9662', 'XX\u5927\u5b66'],
            ['3.2', 'AI\u8f85\u52a9\u7684\u591a\u5e02\u573a\u5bb9\u91cf\u534f\u540c\u5206\u914d\u4e0e\u4ea4\u6613\u7b56\u7565\u4f18\u5316\uff08Scenario GAN\u573a\u666f\u751f\u6210+\u8d1d\u53f6\u65af\u4f18\u5316\u8d85\u53c2\u8c03\u4f18\uff09', 'XX\u7814\u7a76\u9662', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['3.3', '\u57fa\u4e8eShapley\u503c\u7684\u591a\u4e3b\u4f53\u6536\u76ca\u516c\u5e73\u5206\u914d\u673a\u5236\uff08Kernel SHAP\u8fd1\u4f3c\u7b97\u6cd5\uff09', 'XX\u7814\u7a76\u9662', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
            ['3.4', 'AI\u9a71\u52a8\u7684\u865a\u62df\u7535\u5382\u5546\u4e1a\u8fd0\u8425\u6a21\u5f0f\u8bbe\u8ba1\u4e0e\u53ef\u6301\u7eed\u6027\u5206\u6790', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90', 'XX\u7814\u7a76\u9662'],
        ]
    )

    add_title('子课题四任务分解', 3)
    add_table(
        ['\u5e8f\u53f7', '\u5b50\u4efb\u52a1', '\u7275\u5934\u65b9', '\u53c2\u4e0e\u65b9'],
        [
            ['4.1', 'AI\u539f\u751f\u201c\u4e91\u7aef\u2014\u8fb9\u7f18\u2014\u7ec8\u7aef\u201d\u4e09\u7ea7\u534f\u540c\u67b6\u6784\u8bbe\u8ba1\uff08\u8054\u90a6\u5b66\u4e60+\u8fb9\u7f18AI\u81ea\u9002\u5e94\u91cf\u5316\u4e0e\u526a\u679d\uff09', 'XX\u79d1\u6280\u516c\u53f8', 'XX\u7814\u7a76\u9662'],
            ['4.2', 'AI\u5b89\u5168\u7ea6\u675f\u6ee1\u8db3\u4fdd\u969c\u4f53\u7cfb\uff08\u5b89\u5168\u5c42QP\u673a\u5236+\u9ad8\u65af\u8fc7\u7a0b\u5b89\u5168\u8fb9\u754c\u5b66\u4e60+\u4e09\u7ea7\u9012\u8fdb\u5b89\u5168\u673a\u5236\uff09', 'XX\u7814\u7a76\u9662', 'XX\u79d1\u6280\u516c\u53f8'],
            ['4.3', 'AI\u51b3\u7b56\u53ef\u89e3\u91ca\u6027\u4e0e\u53ef\u4fe1\u673a\u5236\uff08\u6ce8\u610f\u529b\u53ef\u89c6\u5316+\u77e5\u8bc6\u84b8\u998f\u89c4\u5219\u63d0\u53d6+\u53cd\u4e8b\u5b9e\u89e3\u91ca+\u53ef\u5ba1\u8ba1AI\u51b3\u7b56\u65e5\u5fd7\uff09', 'XX\u7814\u7a76\u9662', 'XX\u79d1\u6280\u516c\u53f8'],
            ['4.4', 'AI\u539f\u751f\u667a\u80fd\u8fd0\u8425\u5e73\u53f0\u6838\u5fc3\u6a21\u5757\u5f00\u53d1\u4e0e\u96c6\u6210\uff08AI\u751f\u4ea7\u8fd0\u884c\u6a21\u5757+AI\u534f\u540c\u8c03\u63a7\u6a21\u5757+AI\u5e02\u573a\u4ea4\u6613\u6a21\u5757\uff09', 'XX\u79d1\u6280\u516c\u53f8', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90'],
        ]
    )

    add_title('子课题五任务分解', 3)
    add_table(
        ['\u5e8f\u53f7', '\u5b50\u4efb\u52a1', '\u7275\u5934\u65b9', '\u53c2\u4e0e\u65b9'],
        [
            ['5.1', '\u6df1\u5733\u5546\u4e1a\u4e0e\u5c45\u6c11\u8d1f\u8377\u6df7\u5408\u578bAI\u865a\u62df\u7535\u5382\u793a\u8303\u5de5\u7a0b\uff08\u9f99\u534e\u533a+\u5b9d\u5b89\u533a\uff0c\u2265130\u4e07kW\uff09', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90', '\u6df1\u5733\u4f9b\u7535\u5c40\u3001XX\u5927\u5b66\u3001XX\u79d1\u6280\u516c\u53f8'],
            ['5.2', '\u4f5b\u5c71\u5de5\u4e1a\u4e0e\u5206\u5e03\u5f0f\u65b0\u80fd\u6e90\u6df7\u5408\u578bAI\u865a\u62df\u7535\u5382\u793a\u8303\u5de5\u7a0b\uff08\u7985\u57ce\u533a\uff0c\u226520\u4e07kW\uff09', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90', '\u4f5b\u5c71\u4f9b\u7535\u5c40\u3001XX\u7814\u7a76\u9662\u3001XX\u79d1\u6280\u516c\u53f8'],
            ['5.3', 'AI\u4e13\u5c5e\u6548\u679c\u8bc4\u4f30\u4e0e\u6807\u51c6\u5316\u65b9\u6848\u7f16\u5236\uff08AI\u51b3\u7b56\u91c7\u7eb3\u7387\u3001\u7b56\u7565\u6cdb\u5316\u80fd\u529b\u3001\u6301\u7eed\u5b66\u4e60\u6548\u7387\u8bc4\u4f30\uff09', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90', 'XX\u5927\u5b66\u3001XX\u7814\u7a76\u9662'],
        ]
    )

    # ===================== 三、创新点 =====================
    add_title('三、创新点', 1)

    add_title('创新点1（理念创新）：提出"AI全链条驱动、产调销一体"的虚拟电厂智能运营理念', 3)
    add_body('与现有技术的差异：当前虚拟电厂运营普遍采用"聚合\u2192调度\u2192交易"三段割裂模式，AI仅在单环节做"点状修补"（如用LSTM做负荷预测），AI能力碎片化、互不联通。本项目系统性提出"AI全链条驱动、产调销一体"理念\u2014\u2014AI技术从感知、决策、交易、部署到验证五个环节系统性贯穿，以DRL为核心引擎贯通"生产运行\u2014协同调控\u2014市场交易"三大运营模块，实现从状态感知到策略生成到调度执行到收益结算的AI自动化闭环，终结"联而不通"的运营困局。')
    add_body('可落地性：深圳、佛山双示范工程为理念落地提供了真实业务场景和资源底座，分别覆盖"商业+居民负荷型"和"工业+新能源型"两大典型VPP形态。')

    add_title('创新点2（技术创新）：构建以DRL为核心引擎、多元AI协同赋能的四层技术体系', 3)
    add_body('与现有技术的差异对比：')
    add_table(
        ['\u6280\u672f\u5c42\u7ea7', '\u73b0\u6709\u4e3b\u6d41\u65b9\u6848', '\u672c\u9879\u76ee\u521b\u65b0\u65b9\u6848', '\u6838\u5fc3\u5dee\u5f02'],
        [
            ['\u611f\u77e5\u5c42', '\u4eba\u5de5\u53c2\u6570\u6574\u5b9a+\u5178\u578b\u503c\u5efa\u6a21', 'ML\u81ea\u52a8\u8fa8\u8bc6+LSTM\u65f6\u53d8\u5efa\u6a21+GNN\u7a7a\u95f4\u4f9d\u8d56+BNN\u6982\u7387\u4f30\u8ba1', '\u4ece\u201c\u4eba\u5de5\u7ecf\u9a8c\u62cd\u53c2\u6570\u201d\u5230\u201cAI\u6570\u636e\u9a71\u52a8\u8ba4\u77e5\u201d\uff0c\u6548\u7387\u63d0\u5347\u226580%'],
            ['\u51b3\u7b56\u5c42', 'MILP/\u968f\u673a\u4f18\u5316/\u9c81\u68d2\u4f18\u5316', '\u5206\u5c42DRL\uff08PPO+DDPG+TD3\uff09+MADRL+\u793a\u8303\u5b66\u4e60', '\u4ece\u201c\u5206\u949f\u7ea7\u79bb\u7ebf\u4f18\u5316\u201d\u5230\u201c\u6beb\u79d2\u7ea7\u5728\u7ebf\u51b3\u7b56\u201d\uff0c\u8c03\u5ea6\u6210\u672c\u964d\u4f4e\u226515%'],
            ['\u5e02\u573a\u5c42', '\u5355\u5e02\u573aARIMA/LSTM\u9884\u6d4b+\u5bb9\u91cf\u6bd4\u4f8b\u5206\u914d', 'Transformer\u591a\u5e02\u573a\u8054\u5408\u9884\u6d4b+Scenario GAN+Shapley\u503c\u5206\u914d', '\u4ece\u201c\u5355\u5e02\u573a\u7c97\u653e\u5206\u914d\u201d\u5230\u201c\u591a\u5e02\u573a\u7cbe\u51c6\u534f\u540c\u201d\uff0c\u6536\u76ca\u63d0\u5347\u226520%'],
            ['\u5e73\u53f0\u5c42', '\u96c6\u4e2d\u5f0f\u89c4\u5219\u9a71\u52a8\u5e73\u53f0', '\u8fb9\u7f18AI+\u8054\u90a6\u5b66\u4e60+AI\u5b89\u5168\u5c42+\u53ef\u89e3\u91caAI\u539f\u751f\u5e73\u53f0', '\u4ece\u201c\u5e73\u53f0\u627f\u8f7d\u8ba1\u7b97\u201d\u5230\u201c\u5e73\u53f0\u539f\u751fAI\u201d\uff0c\u7ea6\u675f\u6ee1\u8db3\u7387100%'],
        ]
    )
    add_body('核心引擎\u2014\u2014DRL智能调度的可落地性：\u2460采用示范学习（传统MILP生成次优方案预训练）加速DRL收敛，降低训练风险；\u2461构建高保真数字孪生环境（集成广东电力市场真实数据），缩小仿真到现实的鸿沟；\u2462采用"安全层（QP）+传统控制保底"的双重保障架构，确保DRL输出100%满足物理约束。')

    add_title('创新点3（模式创新）：构建"AI算法赋能+多方协同+智能分配"的商业运营新模式', 3)
    add_body('与现有技术的差异：传统虚拟电厂商业模式为"设备厂商卖设备、软件厂商卖平台、运营商赚差价"的割裂模式，收益分配按容量比例"一刀切"。本项目创新点在于：\u2460建立"电网公司+虚拟电厂运营商+资源拥有者+技术服务商"四方协同机制，AI算法为四方创造增量价值；\u2461以Shapley值方法替代容量比例分配，基于多维贡献度（可调容量、响应质量、机会成本、风险承担）精准量化各主体边际贡献，实现灵活性资源价值的精准定价与公平分配；\u2462利用AI代理模型加速商业可持续性分析，识别不同市场条件下的盈亏平衡临界条件。')
    add_body('可落地性：深圳61家运营商的多主体场景和佛山四方协同场景，为Shapley值分配和商业闭环验证提供了天然试验场。')

    add_title('创新点4（场景应用创新）：打造深圳+佛山AI全链条双示范标杆', 3)
    add_body('与现有技术的差异：国内已有虚拟电厂示范工程（如上海黄浦区商业建筑VPP、冀北可再生能源VPP），但均为单一类型资源、单一场景、规则驱动的传统示范，未实现AI全链条部署。本项目打造国内首个覆盖"商业负荷+居民负荷+工业负荷+分布式新能源"四类型资源的AI全链条虚拟电厂双示范标杆：深圳示范（\u2265130万kW，全国城市级最大）聚焦商业+居民负荷型AI调度，佛山示范（\u226520万kW）聚焦工业+新能源型AI调度，两大示范形成互为补充、可复制推广的AI+虚拟电厂全套解决方案。')

    # ===================== 四、资金情况 =====================
    add_title('四、资金情况', 1)
    add_body('本项目总投资估算为3000万元。')

    add_title('（一）各需求方出资情况', 3)
    add_table(
        ['\u8d44\u91d1\u6765\u6e90', '\u51fa\u8d44\u65b9', '\u51fa\u8d44\u989d\uff08\u4e07\u5143\uff09', '\u5360\u6bd4', '\u6295\u8d44\u9879\u76ee\u7c7b\u578b'],
        [
            ['\u4f01\u4e1a\u81ea\u7b79', '\u5357\u7f51\u7efc\u5408\u80fd\u6e90\u516c\u53f8', '1800', '60%', '\u793a\u8303\u5de5\u7a0b\u5efa\u8bbe\u3001AI\u5e73\u53f0\u90e8\u7f72\u3001\u5e02\u573a\u5bf9\u63a5\u3001\u9879\u76ee\u7ba1\u7406'],
            ['\u653f\u5e9c\u8865\u52a9', '\u56fd\u5bb6\u80fd\u6e90\u5c40AI+\u8bd5\u70b9\u8865\u52a9', '900', '30%', 'AI\u7b97\u6cd5\u7814\u53d1\u3001AI\u6280\u672f\u9a8c\u8bc1\u3001\u6807\u51c6\u89c4\u8303\u7f16\u5236'],
            ['\u5408\u4f5c\u5355\u4f4d\u6295\u5165', '\u9ad8\u6821/\u79d1\u7814\u9662\u6240\uff08\u6298\u7b97\uff09', '300', '10%', 'AI\u7b97\u6cd5\u7814\u53d1\u4eba\u529b\u6295\u5165\u3001\u5b9e\u9a8c\u8bbe\u5907\u5171\u4eab'],
            ['\u5408\u8ba1', '\u2014', '3000', '100%', '\u2014'],
        ]
    )

    add_title('（二）各技术方分配经费情况', 3)
    add_table(
        ['\u627f\u62c5\u89d2\u8272', '\u5206\u914d\u7ecf\u8d39\uff08\u4e07\u5143\uff09', '\u4e3b\u8981\u7528\u9014'],
        [
            ['\u5357\u7f51\u7efc\u5408\u80fd\u6e90\u516c\u53f8\uff08\u7275\u5934\uff09', '1200', 'AI\u5e73\u53f0\u7814\u53d1\u3001\u6df1\u5733+\u4f5b\u5c71\u793a\u8303\u5de5\u7a0b\u3001\u9879\u76ee\u7ba1\u7406\u3001\u5e02\u573a\u5bf9\u63a5'],
            ['XX\u5927\u5b66\uff08AI\u7b97\u6cd5\u6838\u5fc3\uff09', '600', '\u5b50\u8bfe\u9898\u4e00ML\u5efa\u6a21+\u5b50\u8bfe\u9898\u4e8cDRL\u7b97\u6cd5\u7814\u53d1'],
            ['XX\u7814\u7a76\u9662\uff08AI\u4ea4\u6613+AI\u5b89\u5168\uff09', '450', '\u5b50\u8bfe\u9898\u4e09\u4ea4\u6613\u673a\u5236+\u5b50\u8bfe\u9898\u56dbAI\u5b89\u5168\u53ef\u89e3\u91ca'],
            ['XX\u79d1\u6280\u516c\u53f8\uff08AI\u5e73\u53f0\u5de5\u7a0b\u5316\uff09', '450', 'AI\u5e73\u53f0\u5f00\u53d1\u4e0e\u7cfb\u7edf\u96c6\u6210'],
            ['\u5176\u4ed6\u53c2\u4e0e\u5355\u4f4d', '300', '\u5b50\u8bfe\u9898\u4e94\u6df1\u5733+\u4f5b\u5c71\u793a\u8303\u914d\u5957\u3001\u6570\u636e\u652f\u6301'],
            ['\u5408\u8ba1', '3000', '\u2014'],
        ]
    )

    # ===================== 五、项目整体计划 =====================
    add_title('五、项目整体计划（包含主要阶段）', 1)
    add_table(
        ['\u5e8f\u53f7', '\u4efb\u52a1\u540d\u79f0', '\u8ba1\u5212\u5f00\u59cb\u65f6\u95f4', '\u9884\u8ba1\u5de5\u671f', '\u4efb\u52a1\u63cf\u8ff0'],
        [
            ['1', '\u9879\u76ee\u542f\u52a8\u4e0e\u9700\u6c42\u8c03\u7814', '2026\u5e747\u6708', '2\u4e2a\u6708', '\u5b8c\u6210\u6df1\u5733+\u4f5b\u5c71AI\u9700\u6c42\u6df1\u5ea6\u8c03\u7814\uff0c\u660e\u786e\u8d44\u6e90\u63a5\u5165\u8303\u56f4\u3001\u5e02\u573a\u4ea4\u6613\u63a5\u53e3\u3001\u8c03\u5ea6\u6307\u4ee4\u89c4\u8303'],
            ['2', '\u5b50\u8bfe\u9898\u4e00\uff1aAI\u9a71\u52a8\u8d44\u6e90\u5efa\u6a21\u4e0e\u52a8\u6001\u805a\u5408', '2026\u5e749\u6708', '8\u4e2a\u6708', '\u5b8c\u6210ML\u53c2\u6570\u81ea\u52a8\u8fa8\u8bc6\u6a21\u578b\u3001LSTM\u65f6\u53d8\u5efa\u6a21\u3001GNN\u805a\u5408\u5efa\u6a21\u3001\u8d44\u6e90\u7279\u6027AI\u6570\u636e\u5e93'],
            ['3', '\u5b50\u8bfe\u9898\u4e8c\uff1aDRL\u667a\u80fd\u8c03\u5ea6\u7b97\u6cd5\u7814\u53d1', '2027\u5e741\u6708', '10\u4e2a\u6708', '\u5b8c\u6210MDP\u6846\u67b6\u8bbe\u8ba1\u3001\u5206\u5c42DRL\u7b97\u6cd5\uff08PPO/DDPG/TD3\uff09\u5b9e\u73b0\u3001MADRL\u6846\u67b6\u3001\u6570\u5b57\u5b6a\u751f\u5168\u573a\u666f\u9a8c\u8bc1'],
            ['4', '\u5b50\u8bfe\u9898\u4e09\uff1aAI\u5e02\u573a\u4ea4\u6613\u51b3\u7b56', '2027\u5e745\u6708', '10\u4e2a\u6708', '\u5b8c\u6210Transformer\u591a\u5e02\u573a\u7535\u4ef7\u9884\u6d4b\u6a21\u578b\u3001Scenario GAN\u573a\u666f\u751f\u6210\u3001Shapley\u503c\u5206\u914d\u673a\u5236\u3001\u5546\u4e1a\u8fd0\u8425\u6a21\u5f0f\u8bbe\u8ba1'],
            ['5', '\u5b50\u8bfe\u9898\u56db\uff1aAI\u539f\u751f\u5e73\u53f0\u4e0e\u5b89\u5168\u53ef\u4fe1\u67b6\u6784', '2027\u5e749\u6708', '10\u4e2a\u6708', '\u5b8c\u6210\u4e91\u7aef\u2014\u8fb9\u7f18\u2014\u7ec8\u7aef\u4e09\u7ea7\u67b6\u6784\u90e8\u7f72\u3001\u8054\u90a6\u5b66\u4e60\u6846\u67b6\u3001AI\u5b89\u5168\u5c42\u673a\u5236\u3001\u53ef\u89e3\u91caAI\u6a21\u5757\u3001\u4e09\u5927AI\u529f\u80fd\u6a21\u5757\u96c6\u6210'],
            ['6', '\u5b50\u8bfe\u9898\u4e94\uff1aAI\u5168\u94fe\u6761\u793a\u8303\u90e8\u7f72', '2028\u5e747\u6708', '8\u4e2a\u6708', '\u6df1\u5733\u793a\u8303\u5de5\u7a0b\uff08\u2265130\u4e07kW\uff09+\u4f5b\u5c71\u793a\u8303\u5de5\u7a0b\uff08\u226520\u4e07kW\uff09AI\u5168\u94fe\u6761\u4e0a\u7ebf\u8fd0\u884c'],
            ['7', 'AI\u7cfb\u7edf\u8bd5\u8fd0\u884c\u4e0e\u4f18\u5316', '2029\u5e741\u6708', '6\u4e2a\u6708', 'AI\u51b3\u7b56\u91c7\u7eb3\u7387\u4f18\u5316\u3001\u6301\u7eed\u5b66\u4e60\u9a8c\u8bc1\u3001\u6781\u7aef\u573a\u666f\u538b\u529b\u6d4b\u8bd5'],
            ['8', '\u793a\u8303\u8bc4\u4f30\u3001\u9a8c\u6536\u4e0e\u63a8\u5e7f', '2029\u5e747\u6708', '3\u4e2a\u6708', 'AI\u6548\u679c\u8bc4\u4f30\u62a5\u544a\u3001AI+\u865a\u62df\u7535\u5382\u6807\u51c6\u5316\u65b9\u6848\u7f16\u5236\u4e0e\u53d1\u5e03'],
        ]
    )

    # ===================== 六、待协调事项 =====================
    add_title('六、待协调事项', 1)
    add_table(
        ['\u5e8f\u53f7', '\u5f85\u534f\u8c03\u4e8b\u9879', '\u534f\u8c03\u5bf9\u8c61', '\u5efa\u8bae\u65b9\u6848'],
        [
            ['1', '\u6df1\u5733\u793a\u8303\u5de5\u7a0bAI\u63a5\u5165\u8d44\u6e90\u534f\u8c03', '\u6df1\u5733\u5e02\u53d1\u6539\u59d4\u3001\u6df1\u5733\u4f9b\u7535\u5c40\u3001\u9f99\u534e/\u5b9d\u5b89\u533a\u53d1\u6539\u59d4', '\u8054\u5408\u653f\u5e9c\u53ec\u5f00\u8d44\u6e90\u63a5\u5165\u534f\u8c03\u4f1a\uff0c\u660e\u786eAI\u63a5\u5165\u8865\u8d34\u4e0e\u6fc0\u52b1\u653f\u7b56'],
            ['2', '\u4f5b\u5c71\u793a\u8303\u5de5\u7a0bAI\u63a5\u5165\u8d44\u6e90\u534f\u8c03', '\u4f5b\u5c71\u5e02\u80fd\u6e90\u5c40\u3001\u7985\u57ce\u533a\u53d1\u6539\u59d4\u3001\u5de5\u4e1a\u56ed\u533a\u7ba1\u59d4\u4f1a', '\u4f9d\u6258\u7985\u57ce\u533a\u5168\u56fd\u9996\u4e2a\u516c\u5171\u673a\u6784VPP\u793a\u8303\u533a\u653f\u7b56\uff0c\u63a8\u52a8\u516c\u5171\u673a\u6784\u5f3a\u5236\u63a5\u5165'],
            ['3', '\u7535\u529b\u5e02\u573aAI\u4ea4\u6613\u7b56\u7565\u5408\u89c4\u6027\u5ba1\u67e5', '\u5e7f\u4e1c\u7535\u529b\u4ea4\u6613\u4e2d\u5fc3\u3001\u5357\u65b9\u80fd\u6e90\u76d1\u7ba1\u5c40', '\u63d0\u524d\u5bf9\u63a5AI\u4ea4\u6613\u7b56\u7565\u7684\u5e02\u573a\u51c6\u5165\u5408\u89c4\u6027\uff0c\u660e\u786eAI\u51b3\u7b56\u7684\u4e3b\u4f53\u8d23\u4efb\u754c\u5b9a'],
            ['4', 'AI\u4ea7\u5b66\u7814\u5408\u4f5c\u534f\u8bae\u7b7e\u7f72', 'XX\u5927\u5b66\u3001XX\u7814\u7a76\u9662\u3001XX\u79d1\u6280\u516c\u53f8', '\u660e\u786eAI\u77e5\u8bc6\u4ea7\u6743\u5f52\u5c5e\u3001\u6570\u636e\u5171\u4eab\u673a\u5236\u3001\u6210\u679c\u8f6c\u5316\u5206\u6210\u6bd4\u4f8b'],
            ['5', 'AI\u8bd5\u70b9\u8865\u52a9\u8d44\u91d1\u62e8\u4ed8\u8282\u594f', '\u56fd\u5bb6\u80fd\u6e90\u5c40\u3001\u5730\u65b9\u80fd\u6e90\u4e3b\u7ba1\u90e8\u95e8', '\u6309AI\u91cc\u7a0b\u7891\u8282\u70b9\uff08DRL\u6a21\u578b\u9a8c\u6536\u3001\u793a\u8303\u5de5\u7a0b\u4e0a\u7ebf\u7b49\uff09\u5206\u6279\u7533\u8bf7\u8d44\u91d1\u62e8\u4ed8'],
            ['6', 'DRL\u8c03\u5ea6\u7b97\u6cd5\u4e0e\u7535\u7f51\u8c03\u5ea6\u7cfb\u7edf\u63a5\u53e3\u5bf9\u63a5', '\u6df1\u5733\u4f9b\u7535\u5c40\u8c03\u5ea6\u4e2d\u5fc3\u3001\u4f5b\u5c71\u4f9b\u7535\u5c40\u8c03\u5ea6\u4e2d\u5fc3', '\u660e\u786eAI\u8c03\u5ea6\u6307\u4ee4\u7684\u63a5\u53e3\u89c4\u8303\u3001\u5b89\u5168\u6821\u9a8c\u6d41\u7a0b\u548c\u4eba\u5de5\u590d\u6838\u673a\u5236'],
        ]
    )

    # Footer
    add_body('')
    add_body('')
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run('\u7533\u62a5\u5355\u4f4d\uff1a\u5357\u7f51\u7efc\u5408\u80fd\u6e90\u80a1\u4efd\u6709\u9650\u516c\u53f8')
    run.font.size = Pt(12)
    run.font.name = '\u4eff\u5b8b'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = p.add_run('\u7533\u62a5\u65e5\u671f\uff1a2026\u5e746\u6708')
    run.font.size = Pt(12)
    run.font.name = '\u4eff\u5b8b'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '\u4eff\u5b8b')

    # Save
    import os
    base_dir = os.path.dirname(os.path.abspath(__file__))
    out = os.path.join(base_dir, '虚拟电厂多时空尺度智能协同运营_申报材料_v10.docx')
    doc.save(out)
    print(f'Saved: {out}')

if __name__ == '__main__':
    build()
