from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
import os

def add_heading(doc, text, level=1):
    heading = doc.add_heading(text, level=level)
    heading.alignment = WD_ALIGN_PARAGRAPH.LEFT if level > 1 else WD_ALIGN_PARAGRAPH.CENTER
    for run in heading.runs:
        run.font.name = '宋体'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
        run.font.bold = True
        if level == 1:
            run.font.size = Pt(18)
        elif level == 2:
            run.font.size = Pt(16)
        else:
            run.font.size = Pt(14)
    return heading

def add_paragraph(doc, text, bold=False, indent=True):
    p = doc.add_paragraph()
    if indent:
        p.paragraph_format.first_line_indent = Inches(0.3)
    run = p.add_run(text)
    run.font.name = '宋体'
    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
    run.font.size = Pt(12)
    run.font.bold = bold
    return p

def add_bullet_point(doc, text):
    p = doc.add_paragraph(text, style='List Bullet')
    for run in p.runs:
        run.font.name = '宋体'
        run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
        run.font.size = Pt(12)
    return p

def add_table(doc, data, headers=None):
    table = doc.add_table(rows=1, cols=len(headers) if headers else len(data[0]))
    table.style = 'Table Grid'
    
    if headers:
        hdr_cells = table.rows[0].cells
        for i, header in enumerate(headers):
            hdr_cells[i].text = header
            for paragraph in hdr_cells[i].paragraphs:
                for run in paragraph.runs:
                    run.font.bold = True
                    run.font.name = '宋体'
                    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
                    run.font.size = Pt(11)
    
    for row_data in data:
        row_cells = table.add_row().cells
        for i, cell_data in enumerate(row_data):
            row_cells[i].text = str(cell_data)
            for paragraph in row_cells[i].paragraphs:
                for run in paragraph.runs:
                    run.font.name = '宋体'
                    run._element.rPr.rFonts.set(qn('w:eastAsia'), '宋体')
                    run.font.size = Pt(11)
    
    return table

def create_report():
    doc = Document()
    
    # Title Page
    doc.add_heading('朗新科技电网领域', 0)
    doc.add_heading('科创业务系统性提升方案', 0)
    
    title_para = doc.add_paragraph()
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title_para.add_run('\n' * 3)
    run = title_para.add_run('科创中心')
    run.font.size = Pt(16)
    run.font.bold = True
    title_para = doc.add_paragraph()
    title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = title_para.add_run('2026年5月')
    run.font.size = Pt(14)
    
    doc.add_page_break()
    
    # Table of Contents
    add_heading(doc, '目 录', 1)
    add_paragraph(doc, '', indent=False)
    add_paragraph(doc, '一、方案概述 .................................................................... 3', indent=False)
    add_paragraph(doc, '二、四大支柱体系设计 .................................................... 5', indent=False)
    add_paragraph(doc, '三、技术研究方向路线图 ............................................... 10', indent=False)
    add_paragraph(doc, '四、AI工具链详细设计 ................................................... 15', indent=False)
    add_paragraph(doc, '五、高校合作具体方案 ................................................... 20', indent=False)
    add_paragraph(doc, '六、项目试点方案设计 ................................................... 25', indent=False)
    add_paragraph(doc, '七、风险评估与应对措施 ............................................... 32', indent=False)
    add_paragraph(doc, '八、详细预算规划 ........................................................ 36', indent=False)
    add_paragraph(doc, '九、实施保障措施 ........................................................ 40', indent=False)
    add_paragraph(doc, '十、总结与建议 ........................................................... 43', indent=False)
    
    doc.add_page_break()
    
    # Section 1: Overview
    add_heading(doc, '一、方案概述', 1)
    add_heading(doc, '1.1 背景与现状', 2)
    add_paragraph(doc, '在新型电力系统建设和能源数字化转型的大背景下，电网领域对科技创新的需求日益迫切。朗新科技作为能源数字化领域的领先企业，迫切需要从系统层面提升科创业务水平，增强核心竞争力。')
    add_paragraph(doc, '科创中心自成立以来，承担着公司科技项目核心技术研究与孵化的重要使命。然而，当前在项目交付、技术落地、人才培养等方面仍面临诸多挑战，需要系统性的改进和提升。')
    
    add_heading(doc, '1.2 核心目标', 2)
    add_bullet_point(doc, '短期目标（1年）：完成3个试点项目，验证"超级个体"模式，建立基础AI工具链')
    add_bullet_point(doc, '中期目标（2-3年）：形成规模化交付能力，建立技术壁垒，培养超级个体团队')
    add_bullet_point(doc, '长期目标（3-5年）：成为行业领先的电力AI创新中心，引领行业技术发展')
    
    add_heading(doc, '1.3 预期效益', 2)
    table_data = [
        ['效益类别', '具体指标', '预期提升'],
        ['研发效率', '代码生成速度', '2-3倍'],
        ['研发效率', '项目交付周期', '缩短20-30%'],
        ['成本效益', '综合研发成本', '降低15-25%'],
        ['市场竞争力', '客户满意度', '提升至90%+'],
        ['技术壁垒', '专利申请数量', '年均10项+'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    doc.add_page_break()
    
    # Section 2: Four Pillars
    add_heading(doc, '二、四大支柱体系设计', 1)
    add_paragraph(doc, '本方案从技术研究、AI工具链、高校合作、项目试点四大维度构建完整的科创业务提升框架。')
    
    add_heading(doc, '2.1 支柱一：技术研究方向', 2)
    add_paragraph(doc, '建立"三层四域"技术研究框架，明确AI、大数据、物联网等前沿技术在电网领域的应用路径：')
    add_bullet_point(doc, '基础层：通用AI能力、数据处理能力')
    add_bullet_point(doc, '平台层：电力业务AI平台、数字孪生平台')
    add_bullet_point(doc, '应用层：智能运维、智能调度、智能营销')
    
    add_heading(doc, '2.2 支柱二：AI工具链', 2)
    add_paragraph(doc, '构建五层AI工具链架构，赋能超级个体，提升研发效率2-3倍：')
    add_bullet_point(doc, '数据层：数据采集、清洗、标注、管理')
    add_bullet_point(doc, '模型层：训练、评估、管理、部署')
    add_bullet_point(doc, '开发层：AI编程、代码审查、CI/CD')
    add_bullet_point(doc, '应用层：业务应用、API、监控、交互')
    add_bullet_point(doc, '管理层：权限、审计、成本分析')
    
    add_heading(doc, '2.3 支柱三：高校合作', 2)
    add_paragraph(doc, '建立"战略+研发+培养"三层合作体系，借力顶尖高校科研力量：')
    add_bullet_point(doc, '战略合作：与2-3所顶尖高校建立联合实验室')
    add_bullet_point(doc, '研发合作：与5-8所高校开展项目合作')
    add_bullet_point(doc, '人才培养：与10+所高校建立人才输送通道')
    
    add_heading(doc, '2.4 支柱四：项目试点', 2)
    add_paragraph(doc, '选择负荷预测、故障诊断、智能问答三个代表性项目，通过试点验证技术可行性和业务价值，形成可复制推广的经验。')
    
    doc.add_page_break()
    
    # Section 3: Tech Roadmap
    add_heading(doc, '三、技术研究方向路线图', 1)
    
    add_heading(doc, '3.1 技术研究框架', 2)
    add_paragraph(doc, '基于电网行业数字化转型需求，规划"三层四域"技术研究框架：')
    
    table_data = [
        ['技术领域', '研究方向', '优先级', '时间节点'],
        ['智能电网', '配电网智能化、微电网优化', '⭐⭐⭐⭐⭐', '2024-2025'],
        ['电力市场', '交易辅助、负荷预测、价格分析', '⭐⭐⭐⭐', '2024-2026'],
        ['用户服务', '智能客服、用能优化、需求响应', '⭐⭐⭐⭐', '2025-2026'],
        ['绿色能源', '新能源消纳、虚拟电厂、碳资产', '⭐⭐⭐', '2026-2027'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '3.2 三阶段发展路线', 2)
    
    add_heading(doc, '3.2.1 能力筑基期（2024-2025）', 3)
    add_paragraph(doc, '重点任务：')
    add_bullet_point(doc, '基于深度学习的短期和中长期负荷预测研究')
    add_bullet_point(doc, '电力设备故障诊断AI系统开发')
    add_bullet_point(doc, '电力业务智能问答系统')
    add_bullet_point(doc, '数据治理体系建设')
    
    add_paragraph(doc, '预期成果：')
    add_bullet_point(doc, '负荷预测准确率达95%以上')
    add_bullet_point(doc, '设备故障预警准确率达85%以上')
    add_bullet_point(doc, '申请专利3-5项')
    
    add_heading(doc, '3.2.2 能力突破期（2025-2026）', 3)
    add_paragraph(doc, '重点任务：')
    add_bullet_point(doc, '配电网优化算法研究')
    add_bullet_point(doc, '用户需求响应优化系统')
    add_bullet_point(doc, '分布式新能源消纳评估')
    add_bullet_point(doc, '电力市场分析平台')
    
    add_paragraph(doc, '预期成果：')
    add_bullet_point(doc, '配电网网损降低3-5%')
    add_bullet_point(doc, '需求响应参与率提升20%')
    add_bullet_point(doc, '申请专利5-8项')
    
    add_heading(doc, '3.2.3 创新引领期（2026-2027）', 3)
    add_paragraph(doc, '重点任务：')
    add_bullet_point(doc, '虚拟电厂运营方案')
    add_bullet_point(doc, '数字孪生电网平台')
    add_bullet_point(doc, '碳资产管理中心')
    add_bullet_point(doc, '区块链在电力中的应用')
    
    add_paragraph(doc, '预期成果：')
    add_bullet_point(doc, '形成完整的虚拟电厂运营解决方案')
    add_bullet_point(doc, '建立典型场景数字孪生模型')
    add_bullet_point(doc, '申请专利8-12项')
    
    add_heading(doc, '3.3 技术研究组织架构', 2)
    add_bullet_point(doc, '基础算法组：机器学习算法、深度学习模型、优化算法')
    add_bullet_point(doc, '电力应用组：智能调度算法、负荷预测模型、设备诊断技术')
    add_bullet_point(doc, '前沿探索组：强化学习应用、数字孪生技术、区块链应用')
    add_bullet_point(doc, '技术转化组：算法产品化、技术标准制定、专利布局')
    
    doc.add_page_break()
    
    # Section 4: AI Toolchain
    add_heading(doc, '四、AI工具链详细设计', 1)
    
    add_heading(doc, '4.1 AI工具链架构', 2)
    add_paragraph(doc, '构建数据层、模型层、开发层、应用层、管理层五层架构的AI工具链体系，覆盖AI研发全生命周期。')
    
    add_heading(doc, '4.2 AI编程助手选型', 2)
    table_data = [
        ['工具', '适用场景', '优势', '优先级'],
        ['Claude API', '代码生成、代码审查、技术文档', '上下文理解强、中文支持好', '⭐⭐⭐⭐⭐'],
        ['GitHub Copilot', '代码补全、函数生成', '集成度高、响应快', '⭐⭐⭐⭐'],
        ['Cursor', '交互式编程、代码重构', '对话式开发', '⭐⭐⭐⭐'],
        ['通义灵码', '中文场景开发', '中文理解好、成本低', '⭐⭐⭐'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '4.3 AI辅助开发流程', 2)
    add_bullet_point(doc, 'Step 1：需求输入 - 自然语言描述、上传需求文档、知识库推荐')
    add_bullet_point(doc, 'Step 2：AI理解与设计 - AI理解需求、生成技术方案、评估可行性')
    add_bullet_point(doc, 'Step 3：代码开发 - AI生成框架、生成核心逻辑、人工审核优化')
    add_bullet_point(doc, 'Step 4：质量保障 - AI代码审查、自动化测试、安全扫描、性能评估')
    add_bullet_point(doc, 'Step 5：文档交付 - AI生成API文档、使用说明、部署文档')
    
    add_heading(doc, '4.4 AI辅助效率分析', 2)
    table_data = [
        ['工作内容', 'AI可辅助程度', '说明'],
        ['需求分析', '30-50%', '生成需求模板、整理思路、提取关键信息'],
        ['架构设计', '20-40%', '提供参考方案和最佳实践，需人工决策'],
        ['数据库设计', '60-80%', '辅助生成DDL语句和表结构建议'],
        ['前端开发', '70-90%', '生成界面代码效果好，快速搭建原型'],
        ['后端逻辑', '50-70%', '简单CRUD效果好，复杂逻辑需人工审核优化'],
        ['API开发', '70-90%', '标准化接口生成效果很好'],
        ['测试用例', '60-80%', '辅助生成测试用例和测试数据'],
        ['文档编写', '80-95%', '辅助文档生成效果非常好'],
        ['Bug修复', '50-70%', '常见问题定位和修复效果较好'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '4.5 AI工具链预算规划', 2)
    table_data = [
        ['项目', '第一年', '第二年', '第三年', '三年合计'],
        ['AI编程工具（Claude API）', '20', '30', '40', '90'],
        ['开发工具授权', '10', '15', '20', '45'],
        ['训练平台建设', '50', '20', '20', '90'],
        ['知识库建设', '30', '20', '20', '70'],
        ['监控运维', '10', '15', '20', '45'],
        ['合计', '120', '100', '120', '340'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    doc.add_page_break()
    
    # Section 5: University Cooperation
    add_heading(doc, '五、高校合作具体方案', 1)
    
    add_heading(doc, '5.1 重点合作高校', 2)
    table_data = [
        ['高校', '学院/系所', '优势领域', '合作方式'],
        ['清华大学', '电机工程与应用电子技术系', '电力系统分析、电力市场', '联合实验室+项目合作'],
        ['华北电力大学', '电气与电子工程学院', '电力系统自动化、新能源', '联合实验室+人才培养'],
        ['浙江大学', '电气工程学院', '智能电网、数字孪生', '联合实验室+项目合作'],
        ['上海交通大学', '电气工程系', '电力系统优化、新能源消纳', '项目合作+人才培养'],
        ['西安交通大学', '电气工程学院', '电工理论、新能源并网', '项目合作+学术交流'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '5.2 合作模式设计', 2)
    
    add_heading(doc, '5.2.1 联合实验室模式', 3)
    add_paragraph(doc, '与高校共同建立联合实验室，作为长期合作的载体和平台：')
    table_data = [
        ['实验室名称', '依托高校', '研究方向', '合作期限', '预算投入'],
        ['智能电网AI联合实验室', '清华大学', '负荷预测、设备诊断', '3年', '300万'],
        ['电力市场联合研究中心', '华北电力大学', '电力交易辅助、负荷预测', '3年', '250万'],
        ['数字孪生电网实验室', '浙江大学', '电网数字孪生、仿真', '2年', '200万'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '5.2.2 项目合作模式', 3)
    add_paragraph(doc, '针对具体技术难题或研发需求，以项目形式开展合作：')
    table_data = [
        ['项目类型', '周期', '预算范围', '典型产出'],
        ['技术预研项目', '6-12月', '30-50万', '论文1-2篇、算法原型'],
        ['应用开发项目', '12-18月', '80-150万', '软件系统、专利2-3项'],
        ['重大攻关项目', '18-24月', '200-300万', '完整解决方案、行业标准'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '5.2.3 人才培养模式', 3)
    add_bullet_point(doc, '"3+1"联合培养：大学三年级进入企业实习，毕业后留任')
    add_bullet_point(doc, '研究生联合培养：博士10-15万/年，硕士5-8万/年')
    add_bullet_point(doc, '博士后工作站：年薪25-35万，科研经费10-20万')
    
    add_heading(doc, '5.3 2024-2025年度联合研究计划', 2)
    table_data = [
        ['序号', '研究课题', '合作高校', '负责人', '预算', '周期'],
        ['1', '基于深度学习的短期负荷预测研究', '清华大学', '张教授', '50万', '12月'],
        ['2', '电力设备故障诊断AI系统开发', '浙江大学', '李教授', '60万', '18月'],
        ['3', '配电网智能优化调度算法', '华中科技大学', '王教授', '45万', '12月'],
        ['4', '分布式新能源消纳评估模型', '上海交通大学', '赵教授', '40万', '12月'],
        ['5', '虚拟电厂多能协调优化', '华北电力大学', '刘教授', '55万', '18月'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '5.4 激励机制', 2)
    add_paragraph(doc, '学术论文合作激励：')
    table_data = [
        ['论文级别', '奖励金额', '附加条件'],
        ['SCI一区', '10万', '朗新科技为署名单位'],
        ['SCI二区', '5万', '朗新科技为署名单位'],
        ['SCI三区/核心期刊', '2万', '朗新科技为署名单位'],
        ['顶级会议论文', '1万', '朗新科技为署名单位'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '5.5 三年合作预算规划', 2)
    table_data = [
        ['合作类型', '2024年', '2025年', '2026年', '三年合计'],
        ['联合实验室', '150', '180', '200', '530'],
        ['项目合作', '200', '250', '300', '750'],
        ['人才培养', '100', '120', '150', '370'],
        ['学术交流', '50', '60', '70', '180'],
        ['合计', '500', '610', '720', '1830'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    doc.add_page_break()
    
    # Section 6: Pilot Projects
    add_heading(doc, '六、项目试点方案设计', 1)
    
    add_heading(doc, '6.1 试点项目选择原则', 2)
    add_bullet_point(doc, '业务价值高：能够解决电网实际业务痛点')
    add_bullet_point(doc, '技术可行：在现有技术能力范围内可以实现')
    add_bullet_point(doc, '数据可得：有足够的数据支撑模型训练')
    add_bullet_point(doc, '客户需求强：网省公司有明确的业务需求')
    add_bullet_point(doc, '可复制推广：成功经验可以推广到其他场景')
    
    add_heading(doc, '6.2 试点项目一：电网负荷预测AI系统', 2)
    add_paragraph(doc, '项目概述：开发基于深度学习的短期和中长期负荷预测系统，支撑电网调度和电力市场交易决策。')
    
    table_data = [
        ['项目要素', '内容'],
        ['项目目标', '基于深度学习的短期和中长期负荷预测系统'],
        ['技术方案', 'Transformer+LSTM混合模型+知识图谱辅助'],
        ['预期成果', '短期预测准确率≥95%，中期预测准确率≥90%'],
        ['项目周期', '12个月'],
        ['项目预算', '200万元'],
        ['试点省份', '江苏省电力公司'],
    ]
    add_table(doc, table_data, headers=None)
    
    add_paragraph(doc, '详细实施方案：')
    add_heading(doc, '第一阶段：需求调研与数据准备（1-2月）', 3)
    add_bullet_point(doc, '与江苏电力营销部、调度中心对接，明确业务需求')
    add_bullet_point(doc, '收集近3年负荷数据、气象数据、日历数据')
    add_bullet_point(doc, '完成数据质量评估和清洗')
    add_bullet_point(doc, '建立负荷预测数据集')
    
    add_heading(doc, '第二阶段：算法研究与模型开发（3-6月）', 3)
    add_bullet_point(doc, '调研现有负荷预测方法')
    add_bullet_point(doc, '设计基于Transformer的负荷预测模型')
    add_bullet_point(doc, '引入天气、节假日等因素的增强模型')
    add_bullet_point(doc, '进行模型训练和参数调优')
    add_bullet_point(doc, '模型准确率验证（≥95%）')
    
    add_heading(doc, '第三阶段：系统开发与集成（7-9月）', 3)
    add_bullet_point(doc, '开发负荷预测系统前端界面')
    add_bullet_point(doc, '开发预测结果展示模块')
    add_bullet_point(doc, '开发预警和异常检测模块')
    add_bullet_point(doc, '与现有调度系统对接')
    add_bullet_point(doc, '系统集成测试')
    
    add_heading(doc, '第四阶段：试点运行与优化（10-12月）', 3)
    add_bullet_point(doc, '在江苏电力进行试点运行')
    add_bullet_point(doc, '收集用户反馈和预测误差分析')
    add_bullet_point(doc, '进行模型持续优化')
    add_bullet_point(doc, '完成试点验收')
    add_bullet_point(doc, '形成可复制推广方案')
    
    add_heading(doc, '6.3 试点项目二：配电网故障智能诊断系统', 2)
    add_paragraph(doc, '项目概述：基于AI技术实现配电网故障的快速定位和原因分析，提升供电可靠性。')
    
    table_data = [
        ['项目要素', '内容'],
        ['项目目标', 'AI驱动的故障快速定位与原因分析'],
        ['技术方案', '知识图谱+深度学习+专家规则混合系统'],
        ['预期成果', '故障定位时间缩短50%，诊断准确率≥90%'],
        ['项目周期', '15个月'],
        ['项目预算', '250万元'],
        ['试点省份', '浙江省电力公司'],
    ]
    add_table(doc, table_data, headers=None)
    
    add_heading(doc, '6.4 试点项目三：电力客户服务智能问答系统', 2)
    add_paragraph(doc, '项目概述：基于大模型和知识图谱，为客服人员提供智能辅助，提升客户服务效率和质量。')
    
    table_data = [
        ['项目要素', '内容'],
        ['项目目标', '基于大模型和知识图谱的智能客服辅助'],
        ['技术方案', 'RAG增强的大模型问答+知识图谱'],
        ['预期成果', '客服效率提升30%，客户满意度≥90%'],
        ['项目周期', '9个月'],
        ['项目预算', '150万元'],
        ['试点省份', '广东省电力公司'],
    ]
    add_table(doc, table_data, headers=None)
    
    add_heading(doc, '6.5 试点项目推进计划', 2)
    table_data = [
        ['时间', '负荷预测', '故障诊断', '智能问答'],
        ['2024 Q3', '需求调研、数据准备', '知识梳理、数据采集', '知识库建设'],
        ['2024 Q4', '算法研究、模型开发', '数据采集、处理', '系统开发'],
        ['2025 Q1', '模型开发', '算法研究、系统开发', '系统开发'],
        ['2025 Q2', '系统开发', '系统开发', '试点运行'],
        ['2025 Q3', '试点运行', '试点运行', '验收优化'],
        ['2025 Q4', '验收推广', '验收推广', '复制推广'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '6.6 资源配置汇总', 2)
    table_data = [
        ['项目名称', '项目经理', '算法/AI', '开发', '测试', '业务专家', '合计'],
        ['负荷预测AI系统', '1', '2-3', '2', '1', '1', '7-8人'],
        ['故障智能诊断', '1', '2-3', '2-3', '1', '1-2', '8-10人'],
        ['智能问答系统', '1', '1-2', '2', '1', '1', '6-7人'],
        ['合计', '3', '5-8', '6-7', '3', '3-4', '21-25人'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    table_data = [
        ['项目', '第一年', '第二年', '合计'],
        ['负荷预测AI系统', '150', '50', '200'],
        ['故障智能诊断', '180', '70', '250'],
        ['智能问答系统', '120', '30', '150'],
        ['项目管理费（10%）', '45', '15', '60'],
        ['合计', '495', '165', '660'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    doc.add_page_break()
    
    # Section 7: Risk Assessment
    add_heading(doc, '七、风险评估与应对措施', 1)
    
    add_heading(doc, '7.1 技术风险', 2)
    table_data = [
        ['风险描述', '发生概率', '影响程度', '应对措施'],
        ['AI生成代码质量不稳定', '中', '高', '建立分阶段验证机制，复杂场景人工审核把关'],
        ['复杂业务逻辑AI处理能力有限', '中', '高', '关键环节人工主导，持续关注AI技术发展'],
        ['技术更新换代过快', '高', '中', '建立技术跟踪机制，定期评估更新工具和方法'],
        ['数据质量问题影响模型效果', '高', '高', '建立数据质量评估和清洗流程，数据治理体系'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '7.2 人才风险', 2)
    table_data = [
        ['风险描述', '发生概率', '影响程度', '应对措施'],
        ['超级个体招聘难度大', '高', '高', '多渠道招聘，建立人才储备池，内部培养'],
        ['人才流失风险', '中', '高', '设计有竞争力的薪酬和成长通道，建立知识沉淀机制'],
        ['培养周期长', '中', '中', '提前启动招聘，建立梯队培养，降低单点依赖'],
        ['能力局限性', '中', '中', '团队协作，合理分工，定期能力评估和培训'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '7.3 组织风险', 2)
    table_data = [
        ['风险描述', '发生概率', '影响程度', '应对措施'],
        ['与开发部门职责划分不清', '中', '高', '充分沟通，形成书面协议，建立协作机制'],
        ['跨部门协作困难', '中', '中', '建立跨部门项目组，明确沟通机制和决策流程'],
        ['资源竞争', '中', '中', '优先级管理，资源规划和协调机制'],
        ['内部政治', '低', '中', '高层支持，透明化管理，建立信任机制'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '7.4 市场风险', 2)
    table_data = [
        ['风险描述', '发生概率', '影响程度', '应对措施'],
        ['客户需求变化', '中', '高', '敏捷开发，快速迭代，客户深度参与'],
        ['竞争对手跟进', '高', '中', '快速建立技术壁垒，申请专利保护，持续创新'],
        ['预算削减', '低', '高', '优先级管理，分阶段投入，ROI分析'],
        ['政策变化', '中', '中', '密切关注政策动态，建立应对预案'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '7.5 安全与合规风险', 2)
    table_data = [
        ['风险描述', '发生概率', '影响程度', '应对措施'],
        ['直接使用AI生成内容交付', '中', '高', '建立代码审查和质量检查机制，关键环节人工把控'],
        ['知识产权归属问题', '中', '中', '与公司和合作方明确界定，及时申请专利保护'],
        ['数据安全与隐私', '高', '高', '建立数据安全管理制度，遵守相关法规'],
        ['安全审计', '中', '中', '定期进行安全审计，建立安全监测机制'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '7.6 风险监控与预警', 2)
    add_bullet_point(doc, '建立风险识别机制，定期进行风险评估')
    add_bullet_point(doc, '设立风险预警指标，及时发现风险苗头')
    add_bullet_point(doc, '建立风险应对预案，提前准备应对措施')
    add_bullet_point(doc, '定期复盘，持续改进风险管理流程')
    
    doc.add_page_break()
    
    # Section 8: Budget
    add_heading(doc, '八、详细预算规划', 1)
    
    add_heading(doc, '8.1 总体预算框架', 2)
    add_paragraph(doc, '本方案三年总预算规模约3000万元，具体分配如下：')
    
    table_data = [
        ['预算类别', '2024年', '2025年', '2026年', '三年合计', '占比'],
        ['技术研究', '300', '350', '400', '1050', '35%'],
        ['AI工具链', '120', '100', '120', '340', '11%'],
        ['高校合作', '500', '610', '720', '1830', '61%'],
        ['项目试点', '495', '165', '-', '660', '22%'],
        ['小计', '1415', '1225', '1240', '3880', '-'],
        ['注：高校合作与技术研究、项目试点有重叠，去重后实际总投入约2500-3000万', '', '', '', '', ''],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '8.2 技术研究详细预算', 2)
    table_data = [
        ['项目', '2024年', '2025年', '2026年', '合计'],
        ['人员费用', '150', '200', '250', '600'],
        ['算力投入', '50', '60', '70', '180'],
        ['数据标注', '20', '30', '40', '90'],
        ['外部合作', '30', '40', '50', '120'],
        ['专利申请', '10', '15', '20', '45'],
        ['差旅费', '20', '25', '30', '75'],
        ['设备软件', '20', '20', '30', '70'],
        ['其他', '0', '0', '10', '10'],
        ['合计', '300', '390', '500', '1190'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '8.3 AI工具链详细预算', 2)
    table_data = [
        ['项目', '2024年', '2025年', '2026年', '合计'],
        ['Claude API', '20', '30', '40', '90'],
        ['GitHub Copilot', '5', '8', '10', '23'],
        ['其他开发工具', '5', '7', '10', '22'],
        ['训练平台（硬件）', '30', '0', '0', '30'],
        ['训练平台（云服务）', '10', '15', '15', '40'],
        ['知识管理系统', '20', '15', '10', '45'],
        ['监控运维', '10', '15', '20', '45'],
        ['培训费用', '20', '10', '15', '45'],
        ['合计', '120', '100', '120', '340'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '8.4 高校合作详细预算', 2)
    table_data = [
        ['项目', '2024年', '2025年', '2026年', '合计'],
        ['联合实验室建设', '100', '120', '130', '350'],
        ['联合实验室运营', '50', '60', '70', '180'],
        ['研发项目', '150', '200', '250', '600'],
        ['联合培养学生', '40', '60', '80', '180'],
        ['博士后工作站', '30', '40', '50', '120'],
        ['学术交流活动', '30', '40', '50', '120'],
        ['论文专利激励', '30', '40', '60', '130'],
        ['差旅会务', '70', '50', '30', '150'],
        ['合计', '500', '610', '720', '1830'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '8.5 试点项目详细预算', 2)
    table_data = [
        ['项目', '负荷预测', '故障诊断', '智能问答', '合计'],
        ['人员费用', '80', '100', '60', '240'],
        ['算法研究', '40', '60', '30', '130'],
        ['系统开发', '50', '60', '40', '150'],
        ['数据采集与处理', '10', '15', '10', '35'],
        ['云服务/算力', '10', '10', '5', '25'],
        ['差旅客户沟通', '5', '5', '3', '13'],
        ['其他', '5', '0', '2', '7'],
        ['小计', '200', '250', '150', '600'],
        ['项目管理费（10%）', '20', '25', '15', '60'],
        ['合计', '220', '275', '165', '660'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_heading(doc, '8.6 投资回报分析', 2)
    add_paragraph(doc, '通过本方案的实施，预期可获得显著的经济效益和社会效益：')
    
    table_data = [
        ['效益类型', '计算依据', '三年收益估算'],
        ['项目交付能力提升', '每年新增2-3个大型项目，平均项目额500万', '3000-4500万'],
        ['研发效率提升', '效率提升2-3倍，节约人力成本', '600-900万'],
        ['专利技术转让', '专利授权、技术转让收入', '200-300万'],
        ['产品化收入', '标准化产品销售收入', '500-800万'],
        ['合计', '', '4300-6500万'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    add_paragraph(doc, '投资回收期预计约为1.5-2年，ROI预计为150%-200%。')
    
    doc.add_page_break()
    
    # Section 9: Implementation
    add_heading(doc, '九、实施保障措施', 1)
    
    add_heading(doc, '9.1 组织保障', 2)
    add_paragraph(doc, '成立科创业务提升领导小组，负责重大决策和资源协调：')
    add_bullet_point(doc, '组长：公司高层领导')
    add_bullet_point(doc, '副组长：科创中心负责人、技术中心负责人、市场部负责人')
    add_bullet_point(doc, '成员：相关部门负责人')
    
    add_paragraph(doc, '设立项目执行办公室（PMO），负责日常管理：')
    add_bullet_point(doc, '办公室主任：科创中心负责人')
    add_bullet_point(doc, '项目经理：3人（各试点项目1人）')
    add_bullet_point(doc, '协调员：2人')
    
    add_heading(doc, '9.2 制度保障', 2)
    add_paragraph(doc, '制定和完善相关管理制度：')
    add_bullet_point(doc, '《校企合作管理办法》：规范合作流程、权责划分、利益分配')
    add_bullet_point(doc, '《产学研项目管理办法》：规范项目立项、执行、验收流程')
    add_bullet_point(doc, '《科研成果转化管理办法》：激励成果转化，明确收益分配')
    add_bullet_point(doc, '《联合培养人才管理规定》：规范人才培养流程、双方权责')
    add_bullet_point(doc, '《知识产权管理办法》：保护知识产权，规范专利申请流程')
    
    add_heading(doc, '9.3 人才保障', 2)
    add_paragraph(doc, '超级个体招聘：')
    add_bullet_point(doc, '社会招聘：通过猎头、招聘平台等渠道')
    add_bullet_point(doc, '校园招聘：从合作高校招收优秀毕业生')
    add_bullet_point(doc, '内部培养：选拔有潜力的员工进行培养')
    add_bullet_point(doc, '人才引进：从行业内引进高端人才')
    
    add_paragraph(doc, '培训体系建设：')
    add_bullet_point(doc, '入职培训：业务知识、技术栈、公司文化')
    add_bullet_point(doc, '技术培训：AI编程、最新技术、最佳实践')
    add_bullet_point(doc, '业务培训：电网业务、客户需求、行业动态')
    add_bullet_point(doc, '案例复盘：定期复盘项目经验，沉淀知识')
    
    add_paragraph(doc, '激励机制：')
    add_bullet_point(doc, '有竞争力的薪酬：高于市场水平30-50%')
    add_bullet_point(doc, '项目跟投机制：分享项目收益')
    add_bullet_point(doc, '专利奖励：专利申请和授权奖励')
    add_bullet_point(doc, '职业发展：技术专家和管理双通道')
    
    add_heading(doc, '9.4 资金保障', 2)
    add_paragraph(doc, '设立科创业务发展专项基金，三年预算规模约3000万元：')
    add_bullet_point(doc, '资金来源：公司自筹、政府科技项目、战略投资')
    add_bullet_point(doc, '预算管理：建立年度预算、季度调整、月度监控机制')
    add_bullet_point(doc, '资金监控：定期审计，确保资金使用效益')
    add_bullet_point(doc, '动态调整：根据业务进展和市场变化灵活调整预算')
    
    add_heading(doc, '9.5 关键成功因素', 2)
    table_data = [
        ['因素', '说明'],
        ['高层支持', '公司高层领导对科创业务的战略支持和资源投入承诺'],
        ['人才先行', '超级个体的招聘和培养是整个方案成功的关键'],
        ['客户协同', '与网省公司的深度合作是项目成功的保障'],
        ['持续迭代', 'AI技术发展快，需要保持技术敏感度和学习能力'],
        ['容错文化', '建立容忍失败的创新文化，鼓励大胆尝试'],
        ['敏捷管理', '采用敏捷方法，快速迭代，及时调整'],
    ]
    add_table(doc, table_data[1:], headers=table_data[0])
    
    doc.add_page_break()
    
    # Section 10: Summary
    add_heading(doc, '十、总结与建议', 1)
    
    add_heading(doc, '10.1 方案总结', 2)
    add_paragraph(doc, '本方案从技术研究、AI工具链、高校合作、项目试点四大维度系统性地设计了朗新科技电网领域科创业务的提升路径，通过"超级个体"创新模式的引入，有望显著提升研发效率和创新能力，增强公司核心竞争力。')
    
    add_paragraph(doc, '核心亮点：')
    add_bullet_point(doc, '系统性设计：覆盖从技术研究到项目落地的全链条')
    add_bullet_point(doc, '创新模式："超级个体"模式充分发挥AI工具的潜力')
    add_bullet_point(doc, '务实可行：从试点起步，分阶段推进，降低风险')
    add_bullet_point(doc, '回报显著：投资回收期约1.5-2年，ROI达150%-200%')
    
    add_heading(doc, '10.2 实施建议', 2)
    add_paragraph(doc, '近期（1-3个月）：')
    add_bullet_point(doc, '向公司高层汇报方案，争取原则性支持')
    add_bullet_point(doc, '与开发部门沟通，明确职责划分方案')
    add_bullet_point(doc, '启动超级个体招聘工作')
    add_bullet_point(doc, '完成AI编程环境搭建和团队培训')
    
    add_paragraph(doc, '中期（3-6个月）：')
    add_bullet_point(doc, '启动第一个试点项目')
    add_bullet_point(doc, '与1-2所高校签署合作协议')
    add_bullet_point(doc, '建立基础AI工具链')
    add_bullet_point(doc, '完善相关管理制度')
    
    add_paragraph(doc, '长期（6-12个月）：')
    add_bullet_point(doc, '全面展开各项工作')
    add_bullet_point(doc)
    add_bullet_point(doc, '形成标准化流程和方法论')
    add_bullet_point(doc, '建立核心技术壁垒')
    
    add_heading(doc, '10.3 结束语', 2)
    add_paragraph(doc, '在新型电力系统建设和能源数字化转型的大背景下，科技创新已成为企业发展的核心驱动力。本方案的实施将助力朗新科技在电网领域建立领先的技术优势，抓住历史机遇，实现跨越式发展。')
    add_paragraph(doc, '')
    add_paragraph(doc, '让我们携手共进，共创美好未来！')
    
    # Save document
    output_path = 'c:\\AI学习资料\\mesheer\\朗新科技电网领域科创业务系统性提升方案.docx'
    doc.save(output_path)
    print(f'文档已成功生成：{output_path}')
    
    return output_path

if __name__ == '__main__':
    create_report()
