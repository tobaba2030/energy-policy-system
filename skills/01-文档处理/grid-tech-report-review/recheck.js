/**
 * 读取并分析技术研究报告
 */
const fs = require("fs");
const path = require("path");
const { reviewReport, generateReviewReport } = require("./scripts/review_engine");

const reportPath = "C:\\Users\\jianlinw\\Desktop\\考虑多元市场化及资源禀赋特征的电力交易关键技术研究与应用科技项目\\研究报告\\to\\任务1报告1：适合公司发展的典型省份市场化交易路径设计.doc";

async function main() {
  console.log("=" .repeat(70));
  console.log("电网科技项目技术研究报告评审 - 重新测评");
  console.log("=" .repeat(70));
  
  // 尝试不同方式读取文件
  let reportContent = "";
  
  try {
    // 检查文件是否存在
    if (!fs.existsSync(reportPath)) {
      console.log(`文件不存在: ${reportPath}`);
      console.log("\n尝试使用模拟内容进行测试...");
    } else {
      console.log(`文件存在: ${reportPath}`);
      
      const ext = path.extname(reportPath).toLowerCase();
      console.log(`文件类型: ${ext}`);
      
      // 尝试使用 mammoth 读取 doc/docx
      try {
        console.log("\n尝试读取 Word 文档内容...");
        const mammoth = require("mammoth");
        const result = await mammoth.extractRawText({ path: reportPath });
        reportContent = result.value;
        console.log(`成功读取，内容长度: ${reportContent.length} 字符`);
        
        // 截取部分内容预览
        console.log("\n内容预览（前200字符）:");
        console.log(reportContent.substring(0, 200) + "...");
      } catch (e) {
        console.log(`mammoth 读取失败: ${e.message}`);
      }
    }
  } catch (err) {
    console.log(`读取文件时出错: ${err.message}`);
  }
  
  // 如果没获取到内容，使用模拟内容
  if (!reportContent) {
    console.log("\n未能获取报告实际内容，使用模拟测试数据...");
    reportContent = `
# 适合公司发展的典型省份市场化交易路径设计

## 摘要
本报告研究了适合公司发展的典型省份市场化交易路径设计。

## 一、绪论
1.1 研究背景
随着电力体制改革的深化和新型电力系统建设，电力市场建设不断推进。

## 二、理论分析
2.1 市场机制分析
本章分析了电力市场的基本理论和运行机制。

## 三、路径设计
3.1 典型省份选择
选择广东、浙江、山东等典型省份进行分析。

## 四、总结
本报告提出了适合公司发展的市场化交易路径。

## 参考文献
[1] 电力市场理论与实践.
`;
  }
  
  console.log("\n" + "-".repeat(70));
  console.log("开始五维评审分析...");
  
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
  const outputPath = "c:\\AI学习资料\\mesheer\\评审意见书_重新测评.docx";
  await generateReviewReport(reviewData, outputPath);
  
  console.log("\n" + "=".repeat(70));
  console.log("重新测评完成！");
  console.log(`完整评审意见书: ${outputPath}`);
  console.log("=".repeat(70));
}

main().catch(err => {
  console.error("执行出错:", err);
});
