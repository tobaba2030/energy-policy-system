const { execSync } = require('child_process');
const path = require('path');

const scriptPath = 'C:/Users/jianlinw/.trae-cn/skills/chart-visualization/scripts/generate.js';
const fs = require('fs');

const charts = [
  {
    name: '市场规模趋势',
    payload: {
      tool: 'generate_line_chart',
      args: {
        data: [
          {time: '2024年', value: 2773},
          {time: '2025年', value: 3180},
          {time: '2026年', value: 3621},
          {time: '2027年预测', value: 4100},
          {time: '2028年预测', value: 4600}
        ],
        title: '中国数据中心市场规模增长趋势',
        axisXTitle: '年份',
        axisYTitle: '市场规模（亿元）',
        theme: 'academy',
        width: 800,
        height: 500
      }
    }
  },
  {
    name: '技术成熟度',
    payload: {
      tool: 'generate_radar_chart',
      args: {
        data: [
          {name: '数字孪生', value: 85},
          {name: '边缘智能', value: 80},
          {name: '电力大模型', value: 60},
          {name: '具身智能', value: 40},
          {name: '源网荷储算脑', value: 55},
          {name: '碳能算一体化', value: 50},
          {name: '量子计算', value: 25}
        ],
        title: '电算协同技术成熟度评估',
        theme: 'academy',
        width: 700,
        height: 600
      }
    }
  },
  {
    name: '关键指标',
    payload: {
      tool: 'generate_bar_chart',
      args: {
        data: [
          {category: '数据中心耗电量(亿kWh)', value: 2500},
          {category: '占全社会用电比重(%)', value: 2.6},
          {category: '碳市场年成交额(亿元)', value: 181},
          {category: '碳配额均价(元/吨)', value: 99.4},
          {category: '标准机架(万架)', value: 900}
        ],
        title: '2024年电算协同关键指标',
        theme: 'academy',
        width: 800,
        height: 500
      }
    }
  },
  {
    name: '组织架构',
    payload: {
      tool: 'generate_organization_chart',
      args: {
        data: {
          name: '集团电算协同发展委员会',
          description: '决策层',
          children: [
            {
              name: '电算协同推进办公室',
              description: '推进层',
              children: [
                {name: '战略规划组', description: '规划与协调'},
                {name: '技术研发组', description: '研发与攻关'},
                {name: '项目管理组', description: '项目实施'}
              ]
            },
            {
              name: '执行层单位',
              description: '专业化公司',
              children: [
                {name: '中国核电/同方股份', description: '业务牵头'},
                {name: '核电运行研究院', description: '技术研发'},
                {name: '秦山/福清核电', description: '基地建设'}
              ]
            }
          ]
        },
        orient: 'vertical',
        title: '电算协同组织架构建议',
        theme: 'academy',
        width: 1000,
        height: 700
      }
    }
  }
];

async function generateChart(chart) {
  return new Promise((resolve, reject) => {
    try {
      const jsonStr = JSON.stringify(chart.payload);
      console.log(`\n[${chart.name}] 生成中...`);
      const result = execSync(`node "${scriptPath}" "${jsonStr.replace(/"/g, '\\"')}"`, {
        encoding: 'utf8',
        timeout: 60000
      });
      console.log(`[${chart.name}] 成功`);
      resolve({ name: chart.name, result: result.trim() });
    } catch (error) {
      console.error(`[${chart.name}] 失败: ${error.message}`);
      resolve({ name: chart.name, error: error.message });
    }
  });
}

async function main() {
  console.log('开始生成图表...\n');
  const results = [];
  for (const chart of charts) {
    const result = await generateChart(chart);
    results.push(result);
  }
  
  console.log('\n========== 生成结果 ==========');
  results.forEach(r => {
    if (r.result) {
      console.log(`[${r.name}] OK: ${r.result}`);
    } else {
      console.log(`[${r.name}] FAIL: ${r.error}`);
    }
  });
}

main();
