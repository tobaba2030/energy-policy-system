/**
 * 电网科技项目技术研究报告评审 CLI v3.0
 */
const fs = require("fs");
const path = require("path");
const { reviewReport, generateReviewReport } = require("./review_engine");

// 帮助信息
function showHelp() {
  console.log(`
电网科技项目技术研究报告评审工具 v3.0

用法:
  node cli.js [选项] <输入文件或内容>

选项:
  -o, --output <路径>    输出文件路径 (默认: 评审意见书.docx)
  -n, --name <名称>      项目名称
  -t, --type <类型>      项目类型: 研究类/应用类 (默认: 研究类)
  -r, --review <类型>    评审类型: 立项评审/中期评审/结题验收 (默认: 立项评审)
  -h, --help               显示帮助信息

评审维度:
  1. 理论创新性 (25%) - 是否提出新理论、新方法、新机制？原创性如何？
  2. 技术前瞻性 (20%) - 是否把握行业发展趋势？对未来有何指引？
  3. 逻辑结构 (20%) - 报告结构是否完整？逻辑是否清晰？
  4. 表述规范性 (20%) - 文字是否精炼？符合电网领域专业规范？
  5. 研究价值 (15%) - 学术价值和应用前景如何？
`);
}

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    output: "评审意见书.docx",
    name: "",
    type: "研究类",
    review: "立项评审",
    input: ""
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-h" || arg === "--help") {
      showHelp();
      process.exit(0);
    } else if (arg === "-o" || arg === "--output") {
      options.output = args[++i];
    } else if (arg === "-n" || arg === "--name") {
      options.name = args[++i];
    } else if (arg === "-t" || arg === "--type") {
      options.type = args[++i];
    } else if (arg === "-r" || arg === "--review") {
      options.review = args[++i];
    } else {
      if (!options.input) {
        options.input = arg;
      }
    }
  }
  
  return options;
}

// 获取等级标签
function getGrade(score) {
  if (score >= 90) return "优秀";
  if (score >= 80) return "良好";
  if (score >= 70) return "合格";
  if (score >= 60) return "基本合格";
  return "不合格";
}

async function main() {
  const options = parseArgs();
  
  if (!options.input) {
    console.error("错误: 请提供输入文件或内容");
    showHelp();
    process.exit(1);
  }
  
  let reportContent = "";
  let projectName = options.name;
  
  if (fs.existsSync(options.input)) {
    const ext = path.extname(options.input).toLowerCase();
    
    if (ext === ".docx" || ext === ".doc") {
      try {
        const mammoth = require("mammoth");
        const result = await mammoth.extractRawText({ path: options.input });
        reportContent = (await result).value;
      } catch(e) {
        console.error("读取Word文档失败，尝试直接读取文本内容");
        reportContent = "模拟报告内容（需要实际的报告文本用于分析）";
      }
    } else {
      reportContent = fs.readFileSync(options.input, "utf-8");
    }
    
    if (!projectName) {
      projectName = path.basename(options.input, ext);
    }
  } else {
    reportContent = options.input;
    if (!projectName) {
      projectName = "未命名项目";
    }
  }
  
  console.log("=" .repeat(70));
  console.log("电网科技项目技术研究报告评审系统 v3.0");
  console.log("=" .repeat(70));
  console.log(`项目名称: ${projectName}`);
  console.log(`项目类型: ${options.type}`);
  console.log(`评审类型: ${options.review}`);
  console.log("-".repeat(70));
  
  console.log("\n正在进行五维评审分析...");
  const reviewData = reviewReport({
    projectName, reportContent,
    projectType: options.type,
    reviewType: options.review
  });
  
  console.log("\n【五维评审得分】");
  console.log("-".repeat(50));
  
  const dimNames = {
    theoreticalInnovation: "理论创新性",
    technicalForwardLooking: "技术前瞻性",
    logicalStructure: "逻辑结构",
    presentationQuality: "表述规范性",
    researchValue: "研究价值"
  };
  
  for (const [key, name] of Object.entries(dimNames)) {
    const score = reviewData.dimensionScores[key];
    const weight = reviewData.dimensions[key].weight;
    const grade = getGrade(score);
    console.log(`${name.padEnd(14)}: ${score}分（${(weight * 100).toFixed(0)}%）[${grade}]`);
  }
  
  console.log("-".repeat(50));
  console.log(`加权总分: ${reviewData.totalScore}分`);
  console.log(`综合评价: ${reviewData.overallGrade.grade}`);
  console.log(`评审建议: ${reviewData.overallGrade.description}`);
  console.log("-".repeat(50));
  
  console.log("\n正在生成评审意见书...");
  const outputPath = path.resolve(options.output);
  await generateReviewReport(reviewData, outputPath);
  
  console.log("\n" + "=".repeat(70));
  console.log("评审完成！");
  console.log(`评审意见书已生成: ${outputPath}`);
  console.log("=".repeat(70));
}

main().catch(err => {
  console.error("执行出错: ", err);
  process.exit(1);
});
