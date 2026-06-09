const { execSync } = require('child_process');
const path = require('path');

const scriptsDir = path.join(__dirname);

// Chart 1: 数据中心市场规模趋势
const chart1 = {
  tool: "generate_line_chart",
  args: {
    data: [
      {time: "2024年", value: 2773},
      {time: "2025年", value: 3180},
      {time: "2026年", value: 3621},
      {time: "2027年(预测)", value: 4100},
      {time: "2028年(预测)", value: 4600}
    ],
    title: "中国数据中心市场规模增长趋势",
    axisXTitle: "年份",
    axisYTitle: "市场规模（亿元）",
    theme: "academy",
    width: 800,
    height: 500
  }
};

// Chart 2: 关键指标柱状图
const chart2 = {
  tool: "generate_bar_chart",
  args: {
    data: [
      {category: "数据中心耗电量(亿kWh)", value: 2500},
      {category: "占全社会用电比重(%)", value: 2.6},
      {category: "碳市场年成交额(亿元)", value: 181},
      {category: "碳配额均价(元/吨)", value: 99.4},
      {category: "标准机架(万架)", value: 900}
    ],
    title: "2024年电算协同关键指标",
    theme: "academy",
    width: 800,
    height: 500
  }
};

// Chart 3: 生态体系架构流程图
const chart3 = {
  tool: "generate_flow_diagram",
  args: {
    data: {
      nodes: [
        {name: "核心层", description: "核电基地+算力设施"},
        {name: "能力层", description: "技术研发+平台运营"},
        {name: "连接层", description: "标准规范+协作机制"},
        {name: "价值层", description: "绿色算力+数据服务+碳资产"},
        {name: "用户层", description: "数据中心+企业客户"}
      ],
      edges: [
        {source: "核心层", target: "能力层", name: "资源支撑"},
        {source: "能力层", target: "连接层", name: "能力输出"},
        {source: "连接层", target: "价值层", name: "机制保障"},
        {source: "价值层", target: "用户层", name: "服务交付"}
      ]
    },
    title: "电算协同生态体系四层架构",
    theme: "academy",
    width: 1000,
    height: 600
  }
};

// Chart 4: 组织架构图
const chart4 = {
  tool: "generate_organization_chart",
  args: {
    data: {
      name: "集团电算协同发展委员会",
      description: "决策层",
      children: [
        {
          name: "电算协同推进办公室",
          description: "推进层",
          children: [
            {name: "战略规划组", description: "规划与协调"},
            {name: "技术研发组", description: "研发与攻关"},
            {name: "项目管理组", description: "项目实施"}
          ]
        },
        {
          name: "执行层单位",
          description: "专业化公司",
          children: [
            {name: "中国核电/同方股份", description: "业务牵头"},
            {name: "核电运行研究院", description: "技术研发"},
            {name: "秦山/福清核电", description: "基地建设"}
          ]
        }
      ]
    },
    orient: "vertical",
    title: "电算协同组织架构建议",
    theme: "academy",
    width: 1000,
    height: 700
  }
};

// Chart 5: 技术成熟度雷达图
const chart5 = {
  tool: "generate_radar_chart",
  args: {
    data: [
      {name: "数字孪生", value: 85},
      {name: "边缘智能", value: 80},
      {name: "电力大模型", value: 60},
      {name: "具身智能", value: 40},
      {name: "源网荷储算脑", value: 55},
      {name: "碳能算一体化", value: 50},
      {name: "量子计算", value: 25}
    ],
    title: "电算协同技术成熟度评估",
    theme: "academy",
    width: 800,
    height: 600
  }
};

const charts = [chart1, chart2, chart3, chart4, chart5];
const results = [];

charts.forEach((chart, index) => {
  try {
    console.log(`\n生成图表 ${index + 1}: ${chart.args.title}`);
    const jsonStr = JSON.stringify(chart);
    const result = execSync(`node generate.js '${jsonStr}'`, {
      cwd: scriptsDir,
      encoding: 'utf8'
    });
    console.log('结果:', result);
    results.push({index: index + 1, name: chart.args.title, result});
  } catch (error) {
    console.error(`图表 ${index + 1} 生成失败:`, error.message);
    results.push({index: index + 1, name: chart.args.title, error: error.message});
  }
});

console.log('\n\n========== 生成结果汇总 ==========');
results.forEach(r => {
  console.log(`图表${r.index} ${r.name}: ${r.error || '成功'}`);
});
