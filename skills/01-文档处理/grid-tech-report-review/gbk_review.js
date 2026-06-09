/**
 * 使用 GBK 编码读取并分析技术研究报告
 */
const fs = require("fs");
const path = require("path");
const { reviewReport, generateReviewReport } = require("./scripts/review_engine");

const reportPath = "C:\\Users\\jianlinw\\Desktop\\考虑多元市场化及资源禀赋特征的电力交易关键技术研究与应用科技项目\\任务1报告1：适合公司发展的典型省份市场化交易路径设计.txt";

async function main() {
  console.log("=" . repeat(70));
  console.log("使用 GBK 编码重新测评 - 技术研究报告分析");
  console.log("=" . repeat(70));
  
  // 用 GBK 编码读取文件（通过 Buffer）
  console.log("\n正在用 GBK 编码读取报告文件...");
  const buffer = fs.readFileSync(reportPath);
  
  // 简单的 GBK 解码方法（简化版）
  let reportContent = "";
  try {
    const iconv = require('iconv-lite');
    reportContent = iconv.decode(buffer, 'gbk');
  } catch (e) {
    console.log("iconv-lite 未安装，使用 UTF-8 代替");
    reportContent = buffer.toString('utf8');
  }
  
  console.log("\n报告基本信息：");
  console.log(`- 文件大小: ${Math.round(buffer.length/1024)} KB`);
  console.log(`- 内容长度: ${reportContent.length} 字符`);
  
  // 截取预览内容
  const preview = reportContent.substring(0, 800);
  console.log("\n报告内容预览：");
  console.log("-".repeat(70));
  console.log(preview);
  console.log("-".repeat(70));
  
  console.log("\n开始五维评审分析...");
  const reviewData = reviewReport({
    projectName: "任务1报告1：适合公司发展的典型省份市场化交易路径设计",
    reportContent,
    projectType: "研究类",
    reviewType: "立项评审"
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
    const grade = (score >= 90) ? "优秀" : (score >= 80) ? "良好" : (score >= 70) ? "合格" : (score >= 60) ? "基本合格" : "不合格";
    console.log(`${name.padEnd(14)}: ${score}分（${(weight * 100).toFixed(0)}%）[${grade}]`);
  }
  
  console.log("-".repeat(50));
  console.log(`加权总分: ${reviewData.totalScore}分`);
  console.log(`综合评价: ${reviewData.overallGrade.grade}`);
  console.log(`评审建议: ${reviewData.overallGrade.description}`);
  console.log("-".repeat(50));
  
  console.log("\n【各维度评价详情】");
  for (const [key, name] of Object.entries(dimNames)) {
    const comments = reviewData.dimensionComments[key];
    console.log(`\n${name}:`);
    if (comments.strengths.length > 0) {
      console.log("  优点:");
      comments.strengths.forEach(s => console.log(`    • ${s}`));
    }
    if (comments.weaknesses.length > 0) {
      console.log("  问题:");
      comments.weaknesses.forEach(w => console.log(`    • ${w}`));
    }
    if (comments.suggestions.length > 0) {
      console.log("  建议:");
      comments.suggestions.forEach(s => console.log(`    • ${s}`));
    }
  }
  
  console.log("\n正在生成完整评审意见书...");
  const outputPath = "c:\\AI学习资料\\mesheer\\评审意见书_GBK_完整版.docx";
  await generateReviewReport(reviewData, outputPath);
  
  console.log("\n" + "=".repeat(70));
  console.log("GBK 编码重新测评完成！");
  console.log(`完整评审意见书: ${outputPath}`);
  console.log("=".repeat(70));
}

main().catch(err => {
  console.error("执行出错:", err);
});
