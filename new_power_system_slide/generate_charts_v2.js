const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const SKILL_PATH = "C:\\Users\\jianlinw\\.trae-cn\\skills\\chart-visualization\\scripts\\generate.js";

// 图表1：源网荷储一体化架构图
const flowDiagramPayload = {
  tool: "generate_flow_diagram",
  args: {
    data: {
      nodes: [
        { name: "电源侧(新能源)" },
        { name: "电网侧(智能电网)" },
        { name: "负荷侧(用户)" },
        { name: "储能侧(储能系统)" },
        { name: "协同运行平台" }
      ],
      edges: [
        { source: "电源侧(新能源)", target: "电网侧(智能电网)", name: "供电" },
        { source: "电网侧(智能电网)", target: "负荷侧(用户)", name: "配送" },
        { source: "负荷侧(用户)", target: "电网侧(智能电网)", name: "反馈" },
        { source: "储能侧(储能系统)", target: "电网侧(智能电网)", name: "调峰" },
        { source: "电网侧(智能电网)", target: "储能侧(储能系统)", name: "储电" },
        { source: "电源侧(新能源)", target: "储能侧(储能系统)", name: "存储" },
        { source: "储能侧(储能系统)", target: "负荷侧(用户)", name: "供电" },
        { source: "电源侧(新能源)", target: "负荷侧(用户)", name: "直供" }
      ]
    },
    title: "源网荷储一体化架构",
    theme: "default",
    width: 800,
    height: 600,
    style: {
      texture: "default"
    }
  }
};

// 图表2：新型电力系统特征雷达图
const radarChartPayload = {
  tool: "generate_radar_chart",
  args: {
    data: [
      { name: "新能源比例", value: 95 },
      { name: "智能化程度", value: 85 },
      { name: "柔性化程度", value: 80 },
      { name: "市场化程度", value: 70 },
      { name: "数字化程度", value: 90 },
      { name: "绿色低碳程度", value: 95 }
    ],
    title: "新型电力系统特征评估",
    theme: "default",
    width: 600,
    height: 600,
    style: {
      backgroundColor: "white",
      lineWidth: 2,
      palette: ["#003366", "#0066CC", "#009933"]
    }
  }
};

// 图表3：计量技术发展趋势折线图
const lineChartPayload = {
  tool: "generate_line_chart",
  args: {
    data: [
      { time: "2020", value: 30, group: "采集时效(分钟)" },
      { time: "2021", value: 25, group: "采集时效(分钟)" },
      { time: "2022", value: 20, group: "采集时效(分钟)" },
      { time: "2023", value: 15, group: "采集时效(分钟)" },
      { time: "2024", value: 10, group: "采集时效(分钟)" },
      { time: "2025", value: 5, group: "采集时效(分钟)" },
      { time: "2020", value: 20, group: "数据精度(%)" },
      { time: "2021", value: 40, group: "数据精度(%)" },
      { time: "2022", value: 60, group: "数据精度(%)" },
      { time: "2023", value: 75, group: "数据精度(%)" },
      { time: "2024", value: 88, group: "数据精度(%)" },
      { time: "2025", value: 95, group: "数据精度(%)" }
    ],
    title: "计量技术发展趋势",
    theme: "default",
    width: 800,
    height: 500,
    style: {
      backgroundColor: "white",
      lineWidth: 3,
      palette: ["#003366", "#CC0000"]
    },
    axisXTitle: "年份",
    axisYTitle: "指标值"
  }
};

// 图表4：计量技术架构组织图
const orgChartPayload = {
  tool: "generate_organization_chart",
  args: {
    data: {
      name: "计量技术架构",
      description: "新型电力系统计量体系",
      children: [
        {
          name: "采集层",
          description: "智能电表/传感器",
          children: [
            { name: "高速采集终端" },
            { name: "柔性采集模块" }
          ]
        },
        {
          name: "传输层",
          description: "通信网络",
          children: [
            { name: "5G通信" },
            { name: "宽带载波" }
          ]
        },
        {
          name: "平台层",
          description: "数据处理",
          children: [
            { name: "云计算平台" },
            { name: "边缘计算" }
          ]
        },
        {
          name: "应用层",
          description: "业务应用",
          children: [
            { name: "负荷管理" },
            { name: "虚拟电厂" }
          ]
        }
      ]
    },
    title: "计量技术架构",
    theme: "default",
    orient: "horizontal",
    width: 900,
    height: 600,
    style: {
      texture: "default"
    }
  }
};

// 执行生成图表的函数
function generateChart(payload, chartName, filename) {
  return new Promise((resolve, reject) => {
    // 将payload写入临时文件
    const tempFile = path.join(__dirname, `temp_${filename}.json`);
    fs.writeFileSync(tempFile, JSON.stringify(payload));
    
    // 使用 PowerShell 调用 node 命令
    const psCommand = `node "${SKILL_PATH}" --spec "@${tempFile}"`;
    
    exec(psCommand, { cwd: path.dirname(SKILL_PATH) }, (error, stdout, stderr) => {
      // 删除临时文件
      try {
        fs.unlinkSync(tempFile);
      } catch (e) {
        // ignore
      }
      
      if (error) {
        console.error(`生成${chartName}失败:`, error.message);
        reject(error);
        return;
      }
      console.log(`${chartName}生成成功`);
      console.log(stdout);
      resolve(stdout);
    });
  });
}

// 按顺序生成图表
async function generateAllCharts() {
  try {
    console.log('开始生成图表...\n');
    
    await generateChart(flowDiagramPayload, '源网荷储一体化架构图', 'flow');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await generateChart(radarChartPayload, '新型电力系统特征雷达图', 'radar');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await generateChart(lineChartPayload, '计量技术发展趋势图', 'line');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    await generateChart(orgChartPayload, '计量技术架构图', 'org');
    
    console.log('\n所有图表生成完成！');
  } catch (error) {
    console.error('生成图表时出错:', error);
  }
}

generateAllCharts();
