const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, WidthType, BorderStyle, ShadingType, VerticalAlign,
        HeadingLevel } = require('docx');

const PAGE_WIDTH = 11906;
const MARGIN = 1440;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

function boldPara(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: opts.size || 24, font: "仿宋" })],
    spacing: { before: opts.before || 120, after: opts.after || 120 },
    alignment: opts.alignment || AlignmentType.LEFT,
    ...opts.extra || {},
  });
}

function normalPara(children, opts = {}) {
  const kids = Array.isArray(children) ? children : [new TextRun({ text: children, size: 24, font: "仿宋" })];
  return new Paragraph({
    children: kids,
    spacing: { before: opts.before || 80, after: opts.after || 80 },
    alignment: opts.alignment || AlignmentType.LEFT,
    ...opts.extra || {},
  });
}

function textItem(t, opts = {}) {
  return new TextRun({ text: t, bold: !!opts.bold, size: opts.size || 22, font: opts.font || "仿宋" });
}

function headingPara(text, level) {
  const sizes = [32, 28, 24];
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: sizes[level] || 24, font: "黑体" })],
    spacing: { before: 240, after: 180 },
    alignment: AlignmentType.CENTER,
    heading: level === 0 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_1,
  });
}

function makeTable(headers, rows, colPercents) {
  const total = colPercents.reduce((a, b) => a + b, 0);
  const colWidths = colPercents.map(p => Math.round(CONTENT_WIDTH * p / total));

  const headerRow = new TableRow({
    children: headers.map((h, i) =>
      new TableCell({
        borders,
        width: { size: colWidths[i], type: WidthType.DXA },
        shading: { fill: "D5E8F0", type: ShadingType.CLEAR, color: "auto" },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [textItem(h, { bold: true })], alignment: AlignmentType.CENTER })],
      })
    ),
  });

  const dataRows = rows.map(row =>
    new TableRow({
      children: row.map((cell, i) => {
        const cellChildren = Array.isArray(cell)
          ? [normalPara(cell.map(c => textItem(c.text, { bold: c.bold }), { before: 40, after: 40 })]
          : [new Paragraph({ children: [textItem(String(cell))], alignment: AlignmentType.LEFT })];
        return new TableCell({
          borders,
          width: { size: colWidths[i], type: WidthType.DXA },
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: cellChildren,
        });
      }),
    })
  );

  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

// ── Build document ─────────────────────────────────────────────────────────
const children = [];

// Title
children.push(new Paragraph({
  children: [new TextRun({ text: `国家能源局"人工智能+"能源高价值场景试点建设方案`, bold: true, size: 36, font: "黑体" })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 360 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: `项目名称：虚拟电厂多时空尺度智能协同运营`, bold: true, size: 28, font: "黑体" })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 0, after: 240 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "——————————————————————", font: "仿宋" })],
  alignment: AlignmentType.CENTER,
  spacing: { before: 120, after: 240 },
}));

// 一、项目背景与意义
children.push(headingPara("一、项目背景与意义", 1));
children.push(headingPara("（一）行业背景与政策环境", 2));

children.push(boldPara("1. 国家级政策领航，奠定虚拟电厂发展基石")));
children.push(normalPara(`全国统一电力市场体系建设背景下，新型经营主体政策红利持续释放。国家能源局《关于支持电力领域新型经营主体创新发展的指导意见》明确了虚拟电厂等新型经营主体的市场地位；《加快构建新型电力系统行动方案（2024—2027年）》提出建设一批虚拟电厂示范项目；《关于深化新能源上网电价市场化改革 促进新能源高质量发展的通知》推动新能源上网电量全面进入电力市场，为虚拟电厂参与市场交易提供了广阔空间。`)));

children.push(boldPara("2. 广东省政策支撑，打造虚拟电厂先行样板")));
children.push(normalPara(`广东省在全国率先出台《广东省虚拟电厂参与电力市场交易实施方案》，明确虚拟电厂参与各类市场的方式及其准入条件，为虚拟电厂商业化运营提供了制度保障。《广东省培育新能源战略性新兴产业集群行动计划（2023—2025年）》《2024年电动汽车充电基础设施建设任务》《电动汽车充电基础设施设备更新计划》等文件，明确了充电基础设施、分布式新能源建设任务，为虚拟电厂聚合灵活资源奠定了坚实基础。`)));

children.push(boldPara("3. 地市政策协同，激发虚拟电厂市场活力")));
children.push(normalPara(`各地市相继出台虚拟电厂运营实施细则和高质量发展实施方案，明确了虚拟电厂的建设路径、运营管理规范和激励政策，形成了国家—省—市三级政策协同推进的良好局面。`)));

children.push(boldPara("4. 人工智能技术赋能，开启虚拟电厂智能运营新时代")));
children.push(normalPara(`随着大语言模型、深度学习、强化学习等AI技术的快速发展，虚拟电厂正从"简单聚合"向"智能协同"跨越。国家能源局启动"人工智能+"能源高价值场景试点建设，为AI技术在虚拟电厂中的深度应用提供了政策风口和创新舞台。`)));

// （二）问题分析与需求痛点
children.push(headingPara("（二）问题分析与需求痛点", 2));

children.push(boldPara("1. 电源结构清洁化、分布式发展，出力波动加剧")));
children.push(normalPara(`截至2024年9月，广东省统调新能源装机规模达345万千瓦，占统调装机27%。以分布式光伏为主的分布式新能源与集中式新能源规模相当，其中XXXX市分布式光伏装机容量超过300万千瓦，同比增长超50%。分布式新能源的大规模接入，导致配网出力波动加剧，短时功率预测精度不足，对电网调度灵活性提出严峻挑战。`)));

children.push(boldPara("2. 能源终端电气化趋势显著，尖峰负荷特征突出")));
children.push(normalPara(`2024年XXXX市电网最高负荷达2455万千瓦，市内充换电设施规模不断提升，充换电最高负荷已超100万千瓦。负荷侧短时波动导致高峰负荷持续提升且持续时间变短，"十四五"期间，3%尖峰负荷的持续时间不足20小时。传统"源随荷动"的调度模式难以应对新型电力系统的波动性、随机性和不确定性。`)));

children.push(boldPara("3. 负荷侧资源爆发式增长，配网供电可靠性面临威胁")));
children.push(normalPara(`XXXX市老旧线路、台区容量不足叠加充电桩等间歇性负荷及空调负荷等季节性负荷激增，导致配电网面临设备重过载、电压波动及低电压等突出问题。大量分布式灵活性资源（充电桩、空调、储能、可调节工业负荷）处于"沉睡"状态，缺乏有效的聚合、协调和市场化机制。`)));

children.push(boldPara("4. 虚拟电厂运营面临"多时空尺度协同"技术瓶颈")));
children.push(normalPara(`当前虚拟电厂普遍存在"三重三轻"问题：`)));
children.push(normalPara([textItem("• 重聚合、轻协同：", { bold: true }), textItem("资源聚合能力不足，多品类资源协同调度技术缺失")], { before: 40, after: 40 }));
children.push(normalPara([textItem("• 重短期、轻长期：", { bold: true }), textItem("缺乏多时间尺度（秒级—分钟级—小时级—日级—周级）的协调优化能力")], { before: 40, after: 40 }));
children.push(normalPara([textItem("• 重经验、轻智能：", { bold: true }), textItem("依赖人工经验和规则调度，缺乏AI驱动的智能决策和自适应学习能力")], { before: 40, after: 40 }));

children.push(boldPara("5. 人工智能技术在虚拟电厂中的应用仍处于"浅层化"阶段")));
children.push(normalPara(`现有虚拟电厂平台在负荷预测、资源调度、市场交易等环节的智能化水平不足，主要表现为：`)));
children.push(normalPara([textItem("• ", { bold: true }), textItem("负荷预测精度低，难以支撑高精度交易决策")], { before: 40, after: 40 }));
children.push(normalPara([textItem("• ", { bold: true }), textItem("多目标协同优化能力不足，难以实现"安全—经济—低碳"多目标平衡")], { before: 40, after: 40 }));
children.push(normalPara([textItem("• ", { bold: true }), textItem("缺乏面向电力市场的智能化交易策略生成能力")], { before: 40, after: 40 })));

children.push(normalPara(`本项目的紧迫性和重要性：在新能源高比例接入、电力市场化改革深化的背景下，研发基于人工智能的虚拟电厂多时空尺度智能协同运营技术，是破解新型电力系统调度难题、释放负荷侧灵活性潜力、支撑能源安全低碳转型的关键抓手，具有重要的战略意义和现实紧迫性。`, { after: 240 }));

children.push(new Paragraph({ children: [new TextRun({ text: "——————————————————————", font: "仿宋" })], alignment: AlignmentType.CENTER, spacing: { before: 240, after: 240 } }));

// 二、主要研究内容
children.push(headingPara("二、主要研究内容", 1)));
children.push(normalPara(`本项目划分为5个课题、12项子任务，由南网综合能源公司牵头，联合高校、科研院所、产业链上下游企业共同实施。5个课题按照"资源认知→预测感知→协同决策→市场交易→平台落地"的逻辑链条展开，层层递进、有机衔接。`, { after: 120 })));

children.push(boldPara("课题逻辑关系说明：")));
children.push(normalPara([textItem("• 课题一（基础层）：", { bold: true }), textItem("解决"资源是什么、怎么聚合"的问题，为后续AI算法提供高质量的资源模型")], { before: 40, after: 40 }));
children.push(normalPara([textItem("• 课题二（感知层）：", { bold: true }), textItem("解决"负荷/出力怎么预测"的问题，为协同调度和市场交易提供高精度输入")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 课题三（决策层）：", { bold: true }), textItem("解决"多资源怎么协同调度"的问题，实现多时空尺度的智能决策")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 课题四（市场层）：", { bold: true }), textItem("解决"怎么参与市场赚钱"的问题，将协同调度能力转化为经济效益")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 课题五（落地层）：", { bold: true }), textItem("解决"技术怎么变成产品"的问题，研发平台并在示范工程中验证闭环")], { before: 40, after: 240 })));

// Table: 主要研究内容
children.push(makeTable(
  ["序号", "课题名称", "子任务", "牵头方", "参与方"],
  [
    ["1",  "课题一：虚拟电厂多时空尺度灵活性资源建模与聚合理论（基础层）",  "任务1.1 多品类灵活性资源精细化建模",  "南网综合能源公司",  "XX大学"],
    ["2",  "同上",  "任务1.2 资源聚合特性分析与聚合边界识别方法",  "南网综合能源公司",  "XX研究院"],
    ["3",  "同上",  "任务1.3 考虑不确定性的资源聚合鲁棒优化方法",  "XX大学",  "南网综合能源公司"],
    ["4",  "课题二：基于AI的多时空尺度负荷/出力预测技术（感知层）",  "任务2.1 基于大语言模型（LLM）的多源数据融合与负荷/出力预测",  "南网综合能源公司",  "XX科技公司"],
    ["5",  "同上",  "任务2.2 多时间尺度（秒级—分钟级—小时级—日级—周级）层次化预测架构",  "XX大学",  "南网综合能源公司"],
    ["6",  "课题三：基于多智能体深度强化学习的协同调度技术（决策层）",  "任务3.1 多智能体深度强化学习（MADRL）协同调度算法研发",  "南网综合能源公司",  "XX大学"],
    ["7",  "同上",  "任务3.2 多时间尺度分层协同机制（秒级调频—分钟级调峰—小时级经济调度—日级交易）",  "XX研究院",  "南网综合能源公司"],
    ["8",  "同上",  "任务3.3 安全—经济—低碳多目标协同优化方法",  "南网综合能源公司",  "XX大学"],
    ["9",  "课题四：基于AI的电力市场交易策略自适应生成技术（市场层）",  "任务4.1 基于"LLM+DRL"混合决策引擎的交易策略生成",  "南网综合能源公司",  "XX研究院"],
    ["10", "同上",  "任务4.2 多市场（电能量市场、调频辅助服务、调峰辅助服务）协同参与机制",  "XX研究院",  "南网综合能源公司"],
    ["11", "课题五：虚拟电厂智能运营平台研发与示范应用（落地层）",  "任务5.1 虚拟电厂智能运营平台架构设计与核心模块开发（国产自主可控）",  "南网综合能源公司",  "XX科技公司"],
    ["12", "同上",  "任务5.2 XXXX市虚拟电厂示范工程建设与多时空尺度智能协同运营验证",  "南网综合能源公司",  "电网公司、充电运营商、工商业用户"],
  ],
  [8, 25, 32, 18, 17]
)));

children.push(new Paragraph({ children: [new TextRun({ text: "——————————————————————", font: "仿宋" })], alignment: AlignmentType.CENTER, spacing: { before: 240, after: 240 } }));

// 三、创新点
children.push(headingPara("三、创新点", 1)));
children.push(normalPara(`本项目在理念、模式、技术、场景四个维度实现系统性创新，形成"理念引领—模式突破—技术赋能—场景落地"的完整创新链条。`, { after: 120 })));

// 创新点1
children.push(boldPara("创新点1（理念创新）：首次提出"多时空尺度智能协同"虚拟电厂运营理念", { before: 240 })));
children.push(boldPara("理念内涵：")));
children.push(normalPara(`突破传统虚拟电厂"单一时间尺度、单一资源品类、单一市场参与"的局限，首次系统性提出"多时空尺度智能协同"运营理念——在时间维度上实现"秒级调频—分钟级调峰—小时级经济调度—日级交易决策—周级容量管理"的全尺度覆盖；在空间上实现"分布式资源—聚合商—电网—电力市场"的多层级协同；在目标维度上实现"安全—经济—低碳"的多目标平衡。`, { after: 120 })));
children.push(boldPara("与现有理念差异：")));
children.push(normalPara(`现有虚拟电厂理念多聚焦于"资源聚合"和"削峰填谷"，缺乏系统性的多时空尺度协同框架。本理念首次将"时间尺度解耦+层次化协同"引入虚拟电厂运营，为破解新能源高比例接入背景下的电力系统灵活性难题提供了系统性解决方案。`, { after: 120 })));
children.push(boldPara("引领价值：")));
children.push(normalPara(`该理念已通过论文、专利、标准等形式进行知识产权布局，有望成为虚拟电厂领域的重要理论成果，引领行业技术发展方向。`, { after: 240 })));

// 创新点2
children.push(boldPara("创新点2（模式创新）：构建"AI驱动+市场导向+多方共赢"的虚拟电厂商业运营新模式", { before: 240 })));
children.push(boldPara("模式设计：")));
children.push(normalPara(`打破传统虚拟电厂"设备厂商卖设备、软件厂商卖平台、运营商赚差价"的割裂模式，构建"AI算法赋能+多元市场主体协同+价值共享"的新型商业生态：`, { after: 120 })));
children.push(normalPara([textItem("• AI算法赋能：", { bold: true }), textItem("将大语言模型、深度强化学习等AI技术深度嵌入虚拟电厂运营全流程，实现从"人工经验驱动"向"数据智能驱动"的范式转变")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 多元主体协同：", { bold: true }), textItem(`建立"电网公司（提供接入和调度支持）+虚拟电厂运营商（提供聚合和调度服务）+资源拥有者（提供灵活性资源并分享收益）+AI技术提供商（提供算法引擎）"的四方协同机制`)], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 价值共享机制：", { bold: true }), textItem("设计基于"贡献度量化+智能合约"的收益分配机制，实现灵活性资源价值的精准量化与公平分配，激发各类市场主体参与积极性")], { before: 40, after: 120 })));
children.push(boldPara("与现有模式差异：")));
children.push(normalPara(`现有虚拟电厂商业模式多依赖"峰谷价差套利"，盈利模式单一、可持续性差。本模式通过AI技术提升市场收益（策略收益提升20%以上），通过多元协同机制扩大资源规模（可接入资源规模提升3～5倍），通过价值共享机制保障各方积极性，实现商业可持续。`, { after: 120 })));
children.push(boldPara("推广应用价值：")));
children.push(normalPara(`该模式可在全国各类虚拟电厂项目中复制推广，预计可带动百亿级市场规模，推动虚拟电厂从"示范试点"向"规模化商用"跨越。`, { after: 240 })));

// 创新点3
children.push(boldPara("创新点3（技术创新）：基于"LLM+DRL"混合智能的虚拟电厂多时空尺度协同运营技术体系", { before: 240 })));
children.push(boldPara("技术突破1：基于大语言模型的电力负荷/出力多时空尺度预测技术")));
children.push(normalPara([textItem("• 现有技术：", { bold: true }), textItem("传统负荷预测主要基于LSTM、GRU等深度学习模型，对气象、节假日、用户行为等多源异构数据融合能力不足，预测精度难以满足电力市场交易的高精度要求。")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 本技术创新：", { bold: true }), textItem("首次将大语言模型（LLM）应用于电力负荷/出力预测，通过"预训练+电力领域微调"范式，实现多源数据（气象、电价、用户行为、设备状态）的语义级融合；提出"多时间尺度解耦+层次化预测"架构，实现从秒级到周级的全覆盖高精度预测，预测精度较现有技术提升15%以上。")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 算法模型可落地性：", { bold: true }), textItem("基于开源大模型（如Qwen、DeepSeek）进行领域微调，计算资源需求可控；预测结果可直接对接电力市场交易系统，形成"预测—决策—交易"闭环。")], { before: 40, after: 240 })));

children.push(boldPara("技术突破2：基于多智能体深度强化学习的多时空尺度协同调度技术")));
children.push(normalPara([textItem("• 现有技术：", { bold: true }), textItem("虚拟电厂调度多采用集中式优化或简单规则策略，难以处理大规模分布式资源的协同决策问题，且缺乏对不同时间尺度（实时调度、日内调度、日前调度）的协同优化能力。")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 本技术创新：", { bold: true }), textItem("构建"多智能体深度强化学习（MADRL）+数字孪生"协同调度框架，将虚拟电厂中的柔性负荷、储能、分布式电源、充电桩等建模为"智能体"，通过集中式训练—分布式执行（CTDE）范式，实现多智能体协同决策；提出"多时间尺度分层协同"机制，实现秒级调频、分钟级调峰、小时级经济调度、日级交易决策的无缝衔接。")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 应用模式创新：", { bold: true }), textItem("首次将MADRL应用于城市级虚拟电厂协同调度，支持千级资源节点的实时协同决策，决策时延<200ms，满足电网实时调度要求。")], { before: 40, after: 240 })));

children.push(boldPara("技术突破3：基于AI的电力市场交易策略自适应生成技术")));
children.push(normalPara([textItem("• 现有技术：", { bold: true }), textItem("虚拟电厂参与电力市场交易多采用"人工经验+简单优化"策略，难以应对电价波动、市场规则变化等不确定性，且缺乏对不同市场品种（电能量市场、辅助服务市场、容量市场）的协同参与能力。")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 本技术创新：", { bold: true }), textItem(`研发基于"大语言模型+深度强化学习"的混合决策引擎，LLM负责市场规则理解、交易策略解释和人机协同，DRL负责高精度策略优化；构建"多市场协同参与+风险自适应控制"机制，实现电能量市场、调频辅助服务、调峰辅助服务的协同优化，策略收益较人工决策提升20%以上。`)], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 算法模型可落地性：", { bold: true }), textItem("交易策略生成引擎可直接对接电力交易系统，支持"仿真训练—离线优化—在线部署"全流程，具备工程落地条件。")], { before: 40, after: 240 })));

// 创新点4
children.push(boldPara("创新点4（场景应用创新）：打造"城市级虚拟电厂多时空尺度智能协同运营"标杆场景", { before: 240 })));
children.push(boldPara("场景设计：")));
children.push(normalPara(`依托XXXX市配电网转型升级和新能源高质量发展需求，打造全国首个"城市级虚拟电厂多时空尺度智能协同运营"标杆场景：`, { after: 120 })));
children.push(normalPara([textItem("• 场景规模：", { bold: true }), textItem("接入分布式光伏（300万千瓦+）、充电桩（100万千瓦+）、储能（50万千瓦+）、可调节工业负荷（100万千瓦+）等多元灵活性资源，总接入规模不低于550万千瓦")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 场景特色：", { bold: true }), textItem(`聚焦"老城区配电网供电可靠性提升+新能源高效消纳+电力市场收益最大化"三大场景价值，实现"安全—经济—低碳"三重效益`)], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 场景创新：", { bold: true }), textItem("首次在城市级虚拟电厂中实现"多时空尺度协同运营"全流程闭环验证——从资源聚合、负荷预测、协同调度到市场交易的全流程AI赋能，为多时空尺度协同运营技术提供真实场景验证环境")], { before: 40, after: 120 })));
children.push(boldPara("与现有示范差异：")));
children.push(normalPara(`现有虚拟电厂示范多聚焦"单一资源品类、单一时间尺度、单一市场参与"，且AI应用多停留在"浅层化"阶段（如简单的负荷预测、规则化调度）。本示范首次实现"多资源品类—多时间尺度—多市场协同"的系统性突破，且AI技术深度嵌入运营全流程，具有显著的示范引领价值。`, { after: 120 })));
children.push(boldPara("经济社会效益：")));
children.push(normalPara([textItem("• 经济效益：", { bold: true }), textItem("示范工程年交易收益超X亿元，投资回收期<5年")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 社会效益：", { bold: true }), textItem("年减少碳排放XX万吨，提升配电网供电可靠性（重过载风险降低30%以上），为XXXX市能源绿色转型和新型电力系统建设提供重要支撑")], { before: 40, after: 40 })));
children.push(normalPara([textItem("• 行业效益：", { bold: true }), textItem(`形成可复制、可推广的"AI+虚拟电厂"解决方案，为全国虚拟电厂建设提供标杆样板。`)], { before: 40, after: 240 })));

children.push(new Paragraph({ children: [new TextRun({ text: "——————————————————————", font: "仿宋" })], alignment: AlignmentType.CENTER, spacing: { before: 240, after: 240 } }));

// 四、资金情况
children.push(headingPara("四、资金情况", 1)));
children.push(normalPara(`本项目总投资估算为3000万元，资金来源包括企业自筹、政府补助和合作单位投入三部分。资金使用严格按照国家能源局"人工智能+"能源高价值场景试点建设要求管理，确保专款专用、结余收回。`, { after: 120 })));

// Table 1: 资金来源
children.push(makeTable(
  ["资金来源", "出资方", "出资额（万元）", "占总额比例", "投资项目类型"],
  [
    ["企业自筹", "南网综合能源公司", "1800", "60%", "核心技术研发、平台建设、示范工程"],
    ["政府补助", "国家能源局（试点补助）", "900", "30%", "示范工程建设、技术验证、成果推广"],
    ["合作单位投入", "高校/科研院所（折算）", "300", "10%", "算法模型研发、人才投入、实验平台"],
    ["合计", "—", "3000", "100%", "—"],
  ],
  [20, 28, 18, 16, 18]
)));

children.push(boldPara("各技术方分配经费大致情况（企业自筹1800万元+合作单位投入300万元）：", { before: 240 })));

// Table 2: 各技术方分配
children.push(makeTable(
  ["承担单位", "分配经费（万元）", "占总经费比例", "主要用途"],
  [
    ["南网综合能源公司（牵头单位）", "1200", "40%", "平台研发、示范工程建设、项目管理、市场对接"],
    ["XX大学（算法研发）", "600", "20%", "多时空尺度协同调度算法、LLM负荷预测模型研发、人才培养"],
    ["XX研究院（交易策略）", "450", "15%", "电力市场交易策略生成技术研发、政策标准研究"],
    ["XX科技公司（平台开发）", "450", "15%", "虚拟电厂智能运营平台软件开发、系统集成"],
    ["其他参与单位", "300", "10%", "示范工程配套、数据支持、试验验证"],
    ["合计", "3000", "100%", "—"],
  ],
  [22, 20, 18, 40]
)));

children.push(boldPara("资金使用计划按年度分解：", { before: 240 })));

// Table 3: 年度资金计划
children.push(makeTable(
  ["年度", "资金计划（万元）", "主要支出方向"],
  [
    ["2026年（第1年）", "900", "需求调研、资源建模、LLM预测模型研发、平台架构设计"],
    ["2027年（第2年）", "1200", "MADRL协同调度算法研发、交易策略引擎研发、平台核心模块开发"],
    ["2028年（第3年）", "700", "平台集成、示范工程建设、系统调试"],
    ["2029年（第4年）", "200", "试运行、项目验收、成果推广"],
    ["合计", "3000", "—"],
  ],
  [25, 25, 50]
)));

children.push(new Paragraph({ children: [new TextRun({ text: "——————————————————————", font: "仿宋" })], alignment: AlignmentType.CENTER, spacing: { before: 240, after: 240 } }));

// 五、项目整体计划
children.push(headingPara("五、项目整体计划", 1)));

// Table: 项目整体计划
children.push(makeTable(
  ["序号", "任务名称", "计划开始时间", "预计工期（月）", "任务描述"],
  [
    ["1", "项目启动与需求调研", "2026年7月", "2", "成立项目组，开展虚拟电厂运营现状调研，明确技术需求和示范场景"],
    ["2", "多品类灵活性资源精细化建模", "2026年9月", "6", "研究分布式光伏、储能、充电桩、可调工业负荷等的精细化建模方法"],
    ["3", "基于LLM的负荷/出力多时空尺度预测模型研发", "2027年1月", "8", "构建基于大语言模型的预测框架，完成模型训练与验证"],
    ["4", "多智能体深度强化学习协同调度算法研发", "2027年5月", "10", "研发MADRL协同调度算法，完成数字孪生仿真验证"],
    ["5", "电力市场交易策略自适应生成引擎研发", "2027年9月", "8", "构建LLM+DRL混合决策引擎，完成历史数据回测验证"],
    ["6", "虚拟电厂智能运营平台核心模块开发", "2028年1月", "10", "完成平台架构设计、核心算法引擎集成、人机协同界面开发"],
    ["7", "XXXX市虚拟电厂示范工程建设", "2028年7月", "8", "建设虚拟电厂运营中心，接入不少于100万千瓦灵活性资源"],
    ["8", "平台部署与试运行", "2029年1月", "6", "完成平台部署、调试，开展不少于6个月的试运行"],
    ["9", "项目验收与成果推广", "2029年7月", "3", "准备验收材料，组织专家验收，形成可复制推广方案"],
  ],
  [8, 28, 18, 14, 32]
)));

children.push(new Paragraph({ children: [new TextRun({ text: "——————————————————————", font: "仿宋" })], alignment: AlignmentType.CENTER, spacing: { before: 240, after: 240 } }));

// 六、待协调事项
children.push(headingPara("六、待协调事项", 1)));

// Table: 待协调事项
children.push(makeTable(
  ["序号", "待协调事项", "协调对象", "建议解决方案"],
  [
    ["1", "示范工程接入资源协调（充电桩、工商业负荷、储能等）", "XXXX市发改委、充电运营商、工商业用户", "联合政府主管部门召开资源接入协调会，明确接入补贴政策"],
    ["2", "电力市场交易资质与结算机制", "电力交易中心、能源监管办", "提前对接交易规则，完成虚拟电厂市场注册和结算协议签署"],
    ["3", "高校/科研院所合作协议签署", "XX大学、XX研究院", "加快合作协议审批流程，明确知识产权归属和成果共享机制"],
    ["4", "政府补助资金拨付进度", "国家能源局、地方能源主管部门", "按里程碑节点申请资金拨付，建立资金使用台账"],
    ["5", "示范工程用地与电力接入审批", "自然资源局、电网公司", "提前开展用地预审和电力接入系统设计，压减审批周期"],
  ],
  [8, 30, 22, 40]
)));

children.push(new Paragraph({ children: [new TextRun({ text: "——————————————————————", font: "仿宋" })], alignment: AlignmentType.CENTER, spacing: { before: 360, after: 240 } }));

// 申报单位 & 日期
children.push(new Paragraph({
  children: [new TextRun({ text: "申报单位：南网综合能源股份有限公司", size: 24, font: "仿宋" })],
  alignment: AlignmentType.RIGHT,
  spacing: { before: 240 },
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "申报日期：2026年6月", size: 24, font: "仿宋" })],
  alignment: AlignmentType.RIGHT,
  spacing: { after: 360 },
}));

// ── Assemble & write ──────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "仿宋", size: 24 } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_WIDTH, height: 16838 },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
      },
    },
    children,
  }],
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("虚拟电厂多时空尺度智能协同运营_申报材料.docx", buffer);
  console.log("✅ Word文档生成成功：虚拟电厂多时空尺度智能协同运营_申报材料.docx");
}).catch(err => {
  console.error("❌ 生成失败：", err.message);
  process.exit(1);
});
