# -*- coding: utf-8 -*-
# VPP v5 - 融合未来3年技术场景趋势 + 高价值业务场景
# 所有中文引号通过 chr() 运行时生成
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
# 一、项目背景与意义（新增趋势分析小节）
# ============================================================
SEC1_1_1 = [
    f"当前，我国能源体系正经历以{LQ}清洁化、数字化、智能化{RQ}为核心特征的深度变革。"
    f"随着{LQ}双碳{RQ}战略深入推进，新能源装机快速增长——截至2026年初，全国风电、光伏装机已突破14亿千瓦，"
    f"新能源发电占比持续攀升，其出力波动性与间歇性使电力系统灵活调节能力面临巨大挑战。"
    f"虚拟电厂（VPP）作为聚合分布式能源资源、参与电网协同调控的新型市场主体，"
    f"已被纳入国家新型电力系统建设重点方向，国家明确2027年调节能力突破2000万千瓦、2030年达5000万千瓦的目标。"
    f"国家能源局启动{LQ}人工智能+{RQ}能源高价值场景建设，"
    f"将虚拟电厂明确列为重点培育场景，为虚拟电厂的智能化升级提供了战略指引。",
    f"贵州省作为国家{LQ}西电东送{RQ}工程的重要能源枢纽，全省水电可开发量约2300万千瓦、"
    f"光伏装机超2000万千瓦，同时拥有电解铝、磷化工、铁合金、数据中心等高载能产业园区，"
    f"具备构建大规模虚拟电厂的独特资源禀赋，聚合潜力超500万千瓦。"
    f"贵州省能源发展规划已将虚拟电厂纳入新型电力系统建设重点工程，"
    f"省发改委印发虚拟电厂建设管理工作方案（试行），为虚拟电厂的市场化运营提供了基础制度框架。"
    f"此外，贵州作为全国首个国家大数据综合试验区，"
    f"在数据中心算力基础设施和数据治理能力方面具有先发优势，为{LQ}算电协同{RQ}这一前沿场景奠定了基础。",
    f"从人工智能赋能趋势看，电力系统正从{LQ}经验调度{RQ}向{LQ}数据+AI双驱动{RQ}转型，"
    f"2026年被业界定义为虚拟电厂{LQ}AI实战元年{RQ}。大语言模型、多智能体强化学习、时序预测等技术的快速成熟，"
    f"正推动虚拟电厂AI从{LQ}辅助决策{RQ}向{LQ}自主交易{RQ}升级——AI不再只是帮助分析数据，"
    f"而是直接参与电力现货市场的实时报价、策略生成与风险对冲。"
    f"在此背景下，贵州亟需通过本项目打通"
    f"{LQ}技术可行{AR}商业可用{AR}规模可复制{RQ}的完整链路，"
    f"抢占AI+虚拟电厂融合发展的先发优势。",
]

# ============================================================
# 新增：（四）未来三年技术及场景发展趋势
# ============================================================
SEC1_4_INTRO = (
    f"2026至2029年是虚拟电厂从{LQ}试点示范{RQ}迈向{LQ}规模化商业运营{RQ}的关键窗口期。"
    f"根据行业权威研究机构（中研普华、清华大学能源战略研究中心）及市场数据（全球VPP市场2026年约31.6亿美元、"
    f"预计2035年突破5000亿美元），未来三年将呈现以下六大核心技术趋势与五大高价值业务场景："
)

SEC1_4_TRENDS_TECH = [
    # 六大技术趋势
    (f"趋势一：AI大模型从{LQ}辅助决策{RQ}升级为{LQ}自主交易引擎{RQ}",
     f"大语言模型（LLM）和多智能体强化学习（MARL）正深度渗透虚拟电厂的调度与交易环节。"
     f"AI系统可毫秒级接入气象数据（预测光伏出力）、96点实时现货电价、用户历史行为数据，"
     f"自动生成最优充放电策略，实现电力交易{LQ}低买高卖{RQ}。山西试点中，风行测控依托AI调度策略，"
     f"聚合容量超220万千瓦，2025年实现结算电量超13亿千瓦时，某冶铸企业累计获红利超269万元。"
     f"预计2027年，AI自主交易将在电力现货市场中成为主流调度方式，"
     f"交易决策从{LQ}小时级人工判断{RQ}进化为{LQ}秒级AI自动执行{RQ}。"),
    (f"趋势二：边缘计算+5G实现{LQ}最后一公里{RQ}毫秒级响应",
     f"AMI 2.0（先进计量架构2.0）正成为行业标配，传统智能电表升级为边缘计算网关，"
     f"可直接在边缘侧执行调度指令。配合OpenADR 3.0开放协议，"
     f"空调、楼宇暖通系统、充电桩等分散终端实现{LQ}即插即用{RQ}接入，"
     f"调控响应时间从分钟级压缩至毫秒级。5G+TSN（时间敏感网络）配合HPLC高速载波，"
     f"支撑海量终端实时互联，彻底解决过去通讯协议不互通、响应速度慢的痛点。"),
    (f"趋势三：V2G车网互动从{LQ}概念验证{RQ}走向{LQ}商业化变现{RQ}",
     f"随着电动汽车保有量快速攀升（预计2027年全国将超4000万辆），"
     f"数以亿计的动力电池将成为全球最大的分布式移动储能资源池。"
     f"深圳虚拟电厂小镇试点中，电动车用户可在电价高峰时段向电网售电，单次放电可获约200元收益。"
     f"未来三年，V2G将形成{LQ}充电桩聚合-平台调度-电力市场交易{RQ}的完整商业闭环，"
     f"成为虚拟电厂聚合资源中增长最快、用户参与度最高的新场景，"
     f"预计2030年V2G可调节容量将占虚拟电厂总容量的20%以上。"),
    (f"趋势四：算电协同{DA}{DA}AI数据中心成为虚拟电厂新{LQ}超级负荷{RQ}",
     f"AI大模型训练和推理对算力的爆炸性需求，使数据中心成为电力系统增长最快的新负荷类型。"
     f"2026年大唐发电200万千瓦级{LQ}算电协同{RQ}绿电直供项目已投运，成为行业标杆。"
     f"未来三年，通过虚拟电厂聚合数据中心可中断/可转移的算力负荷参与现货市场，"
     f"实现{LQ}电价低时全力运算、电价高时弹性降载{RQ}，"
     f"算电协同将成为虚拟电厂最具想象力的高价值增量场景，预计可贡献超过15%的调节能力增量。"),
    (f"趋势五：电碳耦合与绿色价值变现{DA}{DA}虚拟电厂激活{LQ}源网荷储碳{RQ}全链条",
     f"虚拟电厂通过提升新能源消纳比例，帮助用户获取绿证与碳减排收益，"
     f"形成{LQ}绿电交易+绿证开发+碳资产变现{RQ}的绿色价值变现通道。"
     f"部分头部企业已完成{LQ}双绿证{RQ}布局（国际绿证超300万张+中国绿证超1万张），"
     f"实现每度绿电额外增收0.03-0.05元。未来三年，全国碳市场覆盖行业将扩围至电解铝、水泥等领域，"
     f"碳价预计从当前约80元/吨升至150-200元/吨，"
     f"虚拟电厂的碳资产开发价值将成倍增长，成为聚合商和终端用户的重要增量收益来源。"),
    (f"趋势六：数字孪生+区块链构建{LQ}透明可信{RQ}的运营底座",
     f"数字孪生技术实现虚拟电厂资源状态的实时仿真与运行风险预判，"
     f"区块链+智能合约技术实现多主体交易的可信执行与自动分账。"
     f"《电网技术》2026年发表的{LQ}车网互动+动态碳交易+数字孪生{RQ}调控策略研究，"
     f"证明了数字孪生在解决多能源VPP源荷不确定性方面的有效性。"
     f"未来三年，{LQ}数字孪生仿真+区块链结算{RQ}将成为虚拟电厂运营平台的标配架构，"
     f"确保终端用户、聚合商、电网三方{LQ}每一分钱收益都能说清楚{RQ}，"
     f"大幅提升各参与方的信任度与持续参与意愿。"),
]

SEC1_4_TRENDS_SCENE = [
    # 五大高价值业务场景
    (f"场景一：现货市场{LQ}低买高卖{RQ}价差套利（预计年化收益率8%-15%）",
     f"利用电力现货市场的峰谷价差，通过AI策略在低价时段（如午间光伏大发、甚至出现负电价）"
     f"引导储能充电和负荷增加，在高价时段（傍晚用电高峰）储能放电或降低负荷，"
     f"实现无需政府补贴的纯市场化盈利。山西已跑通此模式，"
     f"未来三年随着现货市场在全国铺开，将成为虚拟电厂最核心的基础收益来源。"),
    (f"场景二：辅助服务市场高频响应（调频年均收益弹性空间大）",
     f"虚拟电厂聚合分布式资源参与调频、调峰、备用等辅助服务市场，"
     f"其中调频服务因响应速度要求高（秒级）、补偿单价高，"
     f"是虚拟电厂{LQ}小而美{RQ}的高利润业务。山东已实现40家虚拟电厂常态化参与市场、"
     f"调节能力达150万千瓦。未来三年辅助服务品种将进一步丰富（新增爬坡、惯性响应等），"
     f"虚拟电厂在辅助服务市场的收入占比预计从当前的30%提升至50%以上。"),
    (f"场景三：V2G移动储能{LQ}充电即赚钱{RQ}（单次放电收益约150-250元）",
     f"电动车用户在电价低谷时充电、高峰时放电，通过虚拟电厂平台参与电网互动获取收益。"
     f"这一场景将虚拟电厂的用户触点从{LQ}工厂园区{RQ}延伸到{LQ}每一位电动车车主{RQ}，"
     f"是用户侧参与度最高、社会价值最大的场景。深圳虚拟电厂小镇已验证可行性，"
     f"未来三年随着双向充电桩和V2G标准的成熟，将成为虚拟电厂{LQ}破圈{RQ}进入C端市场的杀手级场景。"),
    (f"场景四：零碳园区{LQ}电碳耦合{RQ}综合能源服务（度电绿色溢价0.03-0.08元）",
     f"将虚拟电厂作为零碳园区的{LQ}数字大脑{RQ}，通过{LQ}源网荷储碳{RQ}一体化运营，"
     f"实现园区清洁能源消纳+绿电绿证交易+碳减排量开发的全链条价值变现。"
     f"零碳园区+虚拟电厂的融合模式正在成为工业园区转型的标准范式，"
     f"未来三年预计将有超过200个国家级/省级零碳园区部署虚拟电厂运营平台。"),
    (f"场景五：算电协同{DA}{DA}数据中心弹性负荷变现（单kW调节收益约300-800元/年）",
     f"AI数据中心是高密度、可转移的优质可调负荷资源，通过虚拟电厂聚合，"
     f"数据中心的计算任务可在{LQ}电价低时全力运算、电价高时弹性降载{RQ}，"
     f"同时获取电力市场收益。大唐发电200万千瓦算电协同项目已投运，"
     f"贵州作为全国算力枢纽节点（贵安新区），算电协同是本项目最具差异化优势的特色业务场景。"),
]

# ============================================================
# 问题分析（保持不变）
# ============================================================
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
     f"虚拟电厂需要同时参与现货市场、辅助服务市场、需求响应、绿电绿证交易、碳市场等多个交易品种，"
     f"各市场的价格信号、时间尺度、结算规则相互耦合，人工决策难以在短时间内完成多市场联合优化报价，"
     f"导致{LQ}有资源参与不了、参与了收益不高{RQ}，聚合商和用户的积极性难以持续。"),
    (f"协同调控层面{DA}{DA}海量资源{LQ}调不精{RQ}",
     f"当聚合资源达到数万级别、调控时间窗口压缩至分钟级时，传统集中式优化算法面临维度爆炸，"
     f"指令分解与执行反馈链路长、误差积累大，难以满足现货市场出清和实时调控的精度要求，"
     f"制约了虚拟电厂从{LQ}邀约型响应{RQ}向{LQ}常态化运营{RQ}的跨越。"),
    (f"商业闭环层面{DA}{DA}运营模式{LQ}转不动{RQ}",
     f"目前贵州虚拟电厂整体处于{LQ}政策驱动、试点为主{RQ}的阶段，缺乏可持续的商业运营模式和收益分配机制。"
     f"资源聚合商参与意愿不足、终端用户获得感不强，导致虚拟电厂的规模化推广缺乏内生动力，"
     f"未能形成{LQ}用户获益-聚合商盈利-电网受益{RQ}的正向循环。"
     f"更关键的是，贵州尚未打通V2G、算电协同、绿色价值变现等高价值业务场景，"
     f"停留在传统需求响应的低附加值阶段。"),
]

SEC1_2 = [
    f"贵州电网作为南方电网西电东送的南部通道枢纽，承担着大规模清洁能源外送和省内负荷平衡的双重责任。"
    f"一方面，贵州新能源装机快速增长，出力波动对电网安全运行构成挑战，"
    f"亟需通过虚拟电厂聚合灵活负荷资源，提升系统灵活调节能力，保障清洁能源消纳；"
    f"另一方面，贵州电解铝、磷化工、数据中心等高载能产业是全省经济支柱，"
    f"在电力供需紧张时期，这些产业因刚性限电面临巨大经济损失，"
    f"亟需通过虚拟电厂的柔性调控手段实现{LQ}削峰不减产{RQ}。"
    f"更为重要的是，随着全国电力现货市场加速推进、碳市场行业扩围、V2G技术商业化落地，"
    f"虚拟电厂正从{LQ}调峰工具{RQ}向{LQ}能源互联网核心价值节点{RQ}演进，"
    f"贵州若不在未来三年内抢占这一战略先机，将面临{LQ}资源流失、场景滞后{RQ}的风险。",
    f"本项目的实施具有五方面重要意义："
    f"一是服务贵州电力保供大局，通过虚拟电厂聚合高载能工业园区可调资源，"
    f"在供需紧张时段提供分钟级柔性调节能力，避免刚性拉闸限电；"
    f"二是助力贵州清洁能源消纳，通过虚拟电厂引导负荷侧资源追踪新能源出力曲线，减少弃风弃光；"
    f"三是培育贵州电力市场新型经营主体，构建{LQ}资源聚合-交易辅助-调控执行-绿色价值变现-结算分配{RQ}"
    f"全链路商业运营模式，率先实现虚拟电厂从{LQ}补贴依赖{RQ}向{LQ}市场化盈利{RQ}的转型；"
    f"四是抢占V2G、算电协同、电碳耦合等前沿高价值场景的先发优势，"
    f"打造具有全国示范意义的{LQ}贵州模式{RQ}；"
    f"五是促进贵州大数据+能源产业深度融合，发挥贵州国家大数据综合试验区的算力和数据治理优势，"
    f"打造人工智能赋能能源行业的标杆场景。",
]

# ============================================================
# 二、主要研究内容（强化高价值业务场景）
# ============================================================
SEC2_INTRO = (
    f"本项目以{LQ}场景驱动、价值闭环、前瞻布局{RQ}为总体思路，"
    f"紧密对标未来三年虚拟电厂技术演进趋势与高价值业务场景发展方向，"
    f"设置六大研究课题。课题设置原则为：每个课题对应一个明确的高价值业务场景、"
    f"融入前沿AI技术、产出可量化的商业价值，"
    f"确保项目成果不仅解决当前痛点，更具备面向2026-2029年的前瞻性和可拓展性。"
)

SEC2_RESEARCH = [
    (f"课题一：多类型资源普查与可调节能力评估\n（核心场景：虚拟电厂资源池规模化构建 | 行业对标：深圳虚拟电厂小镇）",
     [
         ("子任务1.1", "贵州省全域分布式可调资源普查方法与标准规范", "贵州电网\n（调度中心）", "各市州供电局\n朗新科技"),
         ("子任务1.2", "面向多类型资源（含充电桩V2G潜力）的分级分类可调潜力评估模型", "朗新科技", "贵州电网\n贵州大学"),
         ("子任务1.3", "虚拟电厂资源准入标准与质量分级体系", "贵州电网\n（交易中心）", "黔能三安\n贵州矿能"),
     ]),
    (f"课题二：多时空协同调控与精准执行\n（核心场景：现货市场出清响应、日内滚动调控 | 行业对标：山西AI调度模式）",
     [
         ("子任务2.1", "园区级负荷群调群控策略与分钟级滚动优化", "朗新科技", "贵州电网\n黔能三安"),
         ("子任务2.2", "直控型（秒级AGC）与邀约型资源分层协同调控机制", "贵州电网\n（调度中心）", "贵州矿能\n贵州国能"),
         ("子任务2.3", "调控指令下发-执行-反馈全链路闭环验证", "黔能三安", "朗新科技\n贵州电网"),
     ]),
    (f"课题三：多市场AI联合交易辅助决策\n（核心场景：现货+辅助服务+绿电联合报价 | 行业对标：广东现货交易模式）",
     [
         ("子任务3.1", "面向现货市场{LQ}低买高卖{RQ}与辅助服务联合报价的AI策略生成", "朗新科技", "贵州电网\n（交易中心）"),
         ("子任务3.2", "融合气象、负荷、电价的多元市场价格预测与交易风险评估模型", "朗新科技", "贵州大学"),
         ("子任务3.3", "多约束条件下AI交易策略自动化生成与事中校验", "贵州电网\n（交易中心）", "朗新科技\n黔能三安"),
     ]),
    (f"课题四：绿色价值挖掘与电碳耦合运营\n（核心场景：绿电绿证交易、碳资产开发 | 行业对标：头部企业双绿证模式）",
     [
         ("子任务4.1", "负荷侧资源追踪新能源出力曲线的优化调度策略", "贵州电网\n（调度中心）", "朗新科技"),
         ("子任务4.2", "聚合资源绿色价值量化方法与绿电绿证交易辅助决策", "贵州电网\n（交易中心）", "贵州国能\n黔能三安"),
         ("子任务4.3", "面向碳市场的可调节负荷减排量核算与碳资产开发", "贵州矿能", "贵州大学\n朗新科技"),
     ]),
    (f"课题五：算电协同与V2G前沿场景验证\n（核心场景：AI数据中心弹性负荷变现、车网互动移动储能 | 行业对标：大唐算电协同+深圳V2G）",
     [
         ("子任务5.1", "贵安新区数据中心集群可转移算力负荷评估与弹性调度策略", "贵州电网\n（调度中心）", "朗新科技\n贵安新区管委会"),
         ("子任务5.2", "基于V2G的充电桩聚合参与现货与辅助服务市场模式验证", "朗新科技", "贵州电网\n黔能三安"),
         ("子任务5.3", "算电协同+V2G多场景联合运营的商业模式与经济性评价", "贵州大学", "所有参与单位"),
     ]),
    (f"课题六：商业化运营模式与规模化推广\n（核心场景：多方收益分配、用户运营、跨园区复制 | 行业对标：三元收益结构）",
     [
         ("子任务6.1", "基于{LQ}基础电费+市场收益+绿色溢价{RQ}三元结构的收益测算与分配机制", "贵州电网\n（交易中心）", "朗新科技\n黔能三安"),
         ("子任务6.2", "面向终端用户的{LQ}无感参与{RQ}体验优化与区块链透明分账", "朗新科技", "贵州矿能\n贵州国能"),
         ("子任务6.3", "可复制推广的虚拟电厂运营标准与{LQ}贵州模式{RQ}推广路径设计", "贵州电网\n（发展部）", "所有参与单位"),
     ]),
]

# ============================================================
# 三、创新点（强化前瞻性创新）
# ============================================================
SEC3_INNOVATIONS = [
    (f"创新点一：{LQ}资源普查-潜力评估-分级准入{RQ}全流程标准化方法",
     f"打破当前虚拟电厂分散接入、标准不统一的行业痛点，首次面向贵州省全域，"
     f"建立覆盖工业负荷、小水电、分布式光伏、储能、充电桩（含V2G潜力评估）等五类资源的系统化普查方法，"
     f"形成{LQ}逐户画像、分级定量、动态更新{RQ}的可调资源评估体系。"
     f"该方法填补了贵州存量可调资源{LQ}底数不清、潜力不明{RQ}的信息空白，"
     f"为虚拟电厂的规模化、规范化资源准入提供了可操作的标准范式。",
     f"【与现有做法对比】当前虚拟电厂入市以{LQ}自愿申报+人工审核{RQ}为主，"
     f"运营商各自接入手册标准不统一。本项目提出的标准化普查方法首次实现贵州全省统一的分级分类体系，"
     f"并在全国率先将V2G充电桩纳入了可调资源评估框架。"),
    (f"创新点二：{LQ}直控+邀约{RQ}双通道协同调控模式",
     f"针对贵州高载能工业园区的工艺约束与连续生产需求，首创{LQ}直控型资源秒级响应+邀约型资源经济激励{RQ}"
     f"的双通道协同调控模式，在保障企业生产安全的前提下实现柔性调节。"
     f"该模式解决了传统需求响应{LQ}一刀切限电{RQ}的痛点，"
     f"为高载能产业园区参与虚拟电厂提供了可落地的商业路径。",
     f"【与现有做法对比】现有虚拟电厂调控以邀约型为主，响应时效慢（小时级）、执行率偏低。"
     f"本项目将直控型资源响应压缩至秒级，同时保留邀约型的经济激励灵活性，兼顾调控精度与参与意愿。"),
    (f"创新点三：多市场AI联合报价与自主交易决策引擎",
     f"基于大语言模型+强化学习的AI交易引擎，构建覆盖现货市场、辅助服务市场、绿电绿证交易、"
     f"碳市场四类交易品种的联合报价策略自动生成方法，实现从{LQ}人工分析报价{RQ}到{LQ}AI自主交易{RQ}的跨越。"
     f"对标山西风行测控已验证的AI调度模式（聚合超220万千瓦、年结算电量超13亿千瓦时），"
     f"本项目的AI交易引擎还将纳入贵州特有的水电出力预测和西电东送通道约束，"
     f"形成适配贵州电网特点的差异化AI策略。",
     f"【与现有做法对比】现有虚拟电厂交易以人工经验决策为主，难以应对多品种、多时段耦合的复杂市场。"
     f"本项目将AI从{LQ}辅助看数{RQ}升级为{LQ}自主决策{RQ}，交易决策效率从小时级压缩至秒级。"),
    (f"创新点四：算电协同+电碳耦合{LQ}双场景{RQ}创新运营",
     f"依托贵州贵安新区全国算力枢纽节点的独特优势，首次将{LQ}数据中心弹性算力负荷{RQ}纳入虚拟电厂调控资源池，"
     f"同时构建{LQ}绿电消纳-绿证开发-碳减排核算{RQ}的绿色价值全链条。"
     f"对标大唐发电200万千瓦算电协同项目，贵州贵安数据中心集群的算力密度和规模更具优势，"
     f"算电协同将形成虚拟电厂调节能力的{LQ}第二增长曲线{RQ}。",
     f"【与现有做法对比】现有虚拟电厂几乎未涉及数据中心算力负荷的聚合调度，"
     f"也未建立电碳耦合的全链条绿色价值变现体系。本项目首创将两个前沿场景整合在同一运营平台上，"
     f"实现{LQ}算力弹性+碳价值{RQ}的双轮驱动。"),
]

# ============================================================
# 四、资金情况
# ============================================================
SEC4_INTRO = (
    f"本项目总预算为2000万元（较v4增加200万元，专项用于新增的算电协同与V2G场景研究），"
    f"资金来源包括：国家能源局{LQ}人工智能+{RQ}能源专项补贴、"
    f"贵州电网科技项目配套资金、联合申报单位自筹资金三部分。"
    f"资金安排坚持{LQ}业务价值导向+前瞻场景布局{RQ}，重点保障可验证的核心业务场景研发"
    f"与算电协同、V2G等前沿方向探索。"
)

SEC4_BUDGET = [
    ('序号', '预算科目', '金额（万元）', '占比', '主要用途'),
    ('1', '资源普查与潜力评估平台建设', '360', '18%', '覆盖贵州省9个市州的分布式资源普查系统开发与实地调研'),
    ('2', '多市场AI联合交易引擎研发', '500', '25%', '融合大语言模型+强化学习的现货/辅助服务/绿电/碳市场联合报价AI系统'),
    ('3', '双通道协同调控平台开发与部署', '360', '18%', '直控通道AGC/API对接、邀约通道应用开发、边缘计算网关部署'),
    ('4', '算电协同与V2G场景验证', '200', '10%', '贵安数据中心集群算力负荷评估、V2G充电桩聚合调度原型验证'),
    ('5', '试点园区改造与调控终端安装', '290', '14.5%', '黔能三安园区、贵州矿能园区合计不低于5000千瓦可调负荷改造'),
    ('6', '项目管理与成果推广', '290', '14.5%', '技术标准编制、专利申报、成果示范推广与培训、绿电绿证开发'),
    ('', '合计', '2000', '100%', ''),
]

# ============================================================
# 五、项目整体计划
# ============================================================
SEC5_PLAN = [
    ('1', '准备阶段：资源普查与现状调研', '2026.Q3', '3个月',
     '完成贵州省9个市州分布式可调资源普查，建立资源台账（含贵安数据中心集群与充电桩V2G潜力评估）；完成现有平台现状调研与业务痛点分析。'),
    ('2', '研发阶段一：资源评估与准入标准', '2026.Q4', '3个月',
     '研发多类型资源分级分类可调潜力评估模型（含V2G充电桩）；制定资源准入标准与质量分级体系；开发资源普查与潜力评估平台原型。'),
    ('3', '研发阶段二：多市场AI联合交易引擎', '2027.Q1', '3个月',
     '研发融合大语言模型+强化学习的现货/辅助服务/绿电/碳市场联合报价AI系统；完成多市场交易仿真环境搭建并验证策略有效性。'),
    ('4', '研发阶段三：双通道调控+前沿场景验证', '2027.Q2', '3个月',
     '研发直控+邀约双通道调控平台；开展贵安数据中心算力负荷弹性调度验证与V2G充电桩聚合调度原型验证。'),
    ('5', '试点验证：全流程多场景业务跑通', '2027.Q3', '3个月',
     '在贵州选取不少于2个高载能工业园区+1个数据中心集群开展全流程试点；完成不低于5000千瓦可调负荷的常态化调控；形成{LQ}贵州模式{RQ}运营标准。'),
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
     f"当前贵州省虚拟电厂参与现货市场、绿电绿证交易、辅助服务市场的准入条件、结算规则、收益分配指引尚未出台细则，"
     f"导致项目商业化运营路径存在政策不确定性。"
     f"需协调省交易中心加快制定多市场参与的入市细则，明确{LQ}聚合商注册-资源准入-多市场交易-绿证核发-结算分配{RQ}全链路规则。"),
    (f"事项三：贵安新区数据中心集群算力负荷数据共享与协同机制",
     f"算电协同场景需要接入贵安新区数据中心集群的实时算力负荷数据，"
     f"涉及腾讯、华为、苹果等多家数据中心运营商的商业数据共享与协同配合。"
     f"需协调贵安新区管委会、省大数据局及各数据中心运营商，建立算力负荷数据共享机制与弹性调度合作协议。"),
    (f"事项四：联合申报单位的任务分工与知识产权归属",
     f"本项目参与方较多（贵州电网、朗新科技、黔能三安、贵州矿能、贵州国能、贵州大学、贵安新区），"
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
        ('联合申报单位', '贵州电网有限责任公司、朗新科技集团股份有限公司\n贵州矿能集团有限公司、贵州国能科技有限公司\n黔能三安新能源科技有限公司、贵州大学\n贵安新区管理委员会'),
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

    # ================================================================
    # 一、项目背景与意义（新增趋势分析小节）
    # ================================================================
    add_hdg(doc, '一、项目背景与意义', 1)
    add_hdg(doc, '（一）行业背景与政策环境', 2)
    for para_text in SEC1_1_1:
        add_para(doc, para_text, indent=24)

    add_hdg(doc, '（二）问题分析与需求痛点', 2)
    add_para(doc, SEC1_1_2, indent=24)
    for title, detail in SEC1_1_2_LIST:
        add_hdg(doc, title, 3)
        add_para(doc, detail, indent=24)
    add_img(doc, os.path.join(OUT_DIR, 'fig_vpp_arch.png'), 5.5,
             f'图1-1  虚拟电厂{LQ}多时空尺度智能协同运营{RQ}业务架构')

    add_hdg(doc, '（三）项目建设的必要性与意义', 2)
    for para_text in SEC1_2:
        add_para(doc, para_text, indent=24)

    # ===== 新增：（四）未来三年技术及场景发展趋势 =====
    add_hdg(doc, '（四）未来三年技术及场景发展趋势（2026-2029）', 2)
    add_para(doc, SEC1_4_INTRO, indent=24)

    add_hdg(doc, '1. 六大核心技术趋势', 3)
    for title, detail in SEC1_4_TRENDS_TECH:
        add_hdg(doc, title, 4)
        add_para(doc, detail, indent=24)

    add_hdg(doc, '2. 五大高价值业务场景', 3)
    for title, detail in SEC1_4_TRENDS_SCENE:
        add_hdg(doc, title, 4)
        add_para(doc, detail, indent=24)

    add_para(doc, '', font_size=6)
    add_para(doc, (
        f"综上，未来三年虚拟电厂将完成从{LQ}调峰工具{RQ}到{LQ}能源互联网核心节点{RQ}的定位跃迁，"
        f"从{LQ}政策补贴驱动{RQ}到{LQ}市场化盈利驱动{RQ}的模式转型，"
        f"从{LQ}单一需求响应{RQ}到{LQ}现货套利+绿证变现+碳资产开发+V2G+算电协同{RQ}多场景融合的生态升级。"
        f"本项目的课题设置与实施路径，全面对标上述技术趋势与高价值场景，"
        f"旨在将贵州打造为全国虚拟电厂{LQ}AI实战+多场景融合{RQ}的标杆示范区。"),
        indent=24, bold=True, color=RGBColor(0x15, 0x65, 0xC0))

    add_br(doc)
    print('第一章（含趋势分析）完成')

    # ================================================================
    # 二、主要研究内容（6个课题）
    # ================================================================
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
    print('第二章完成（6课题18子任务）')

    # ================================================================
    # 三、创新点（4个创新点）
    # ================================================================
    add_hdg(doc, '三、创新点', 1)
    for title, detail, compare in SEC3_INNOVATIONS:
        add_hdg(doc, title, 3)
        add_para(doc, detail, indent=24)
        add_para(doc, compare, font_size=9.5, indent=24, color=RGBColor(0x15, 0x65, 0xC0))
    add_img(doc, os.path.join(OUT_DIR, 'fig_vpp_sysarch.png'), 5.5,
             f'图3-1  虚拟电厂{LQ}多时空尺度智能协同运营{RQ}系统总体架构')
    add_br(doc)
    print('第三章完成')

    # ================================================================
    # 四、资金情况
    # ================================================================
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

    # ================================================================
    # 五、项目整体计划
    # ================================================================
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

    # ================================================================
    # 六、待协调事项
    # ================================================================
    add_hdg(doc, '六、待协调事项', 1)
    add_para(doc, '为确保项目顺利推进和实施，以下事项需在项目启动前期重点协调落实：', indent=24)
    for title, detail in SEC6_COORD:
        add_hdg(doc, title, 3)
        add_para(doc, detail, indent=24)
    print('第六章完成')

    # ===== 保存 =====
    out_path = os.path.join(OUT_DIR, '虚拟电厂多时空尺度智能协同运营_申报方案_v5.docx')
    doc.save(out_path)
    print(f'生成成功：{out_path}')
    print(f'文件大小：{os.path.getsize(out_path):,} 字节')

if __name__ == '__main__':
    build()
