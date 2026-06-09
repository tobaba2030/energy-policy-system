/**
 * 测试电网科技项目技术研究报告评审
 */
const { reviewReport, generateReviewReport } = require("./scripts/review_engine");

const testReport = `
# 适合公司发展的典型省份市场化交易路径设计

## 摘要
本报告研究了适合公司发展的典型省份市场化交易路径设计，提出了一种新的多元资源聚合交易方法。

## 一、研究背景
随着新型电力系统的建设和双碳目标的推进，电力市场改革不断深化。分布式能源、储能、需求响应等多元资源大量接入电网，对传统交易模式提出了新挑战。

## 二、研究方法
### 2.1 理论基础
本研究基于博弈论和优化理论，提出了一种新的市场主体协同优化方法。相比传统方法，本方法提高了交易效率15%。

### 2.2 技术路径
我们建立了数学模型，考虑了新能源出力不确定性、用户响应弹性等因素。公式推导如下：

$$ \max \sum_{i \in N} \pi_i(x_i) - \sum_{j \in M} c_j(y_j) $$

$$ \text{s.t.} \quad \sum_{i \in N} x_i = \sum_{j \in M} y_j $$

## 三、主要创新点
1. **理论创新**：提出了一种新的多元资源聚合交易机制
2. **方法改进**：改进了传统的市场出清算法，提高了计算效率
3. **集成创新**：将人工智能技术与电力市场分析相结合

## 四、技术前瞻性分析
本研究顺应电力市场数字化发展趋势，考虑了未来新型电力系统的需求。对未来5-10年的技术发展具有一定的指引作用。

## 五、研究结论
本报告提出的方法具有重要的学术价值和应用前景，建议在广东、浙江等典型省份开展试点应用。

## 参考文献
[1] 张三, 电力市场理论与实践, 中国电力出版社, 2023.
[2] 李四, 新型电力系统交易机制研究, 电力系统自动化, 2024.
`;

async function test() {
  console.log("=" .repeat(60));
  console.log("测试电网科技项目技术研究报告评审 v3.0");
  console.log("=" .repeat(60));
  
  const reviewData = reviewReport({
    projectName: "适合公司发展的典型省份市场化交易路径设计",
    reportContent: testReport,
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
  
  console.log("\n正在生成评审意见书...");
  const outputPath = "c:\\AI学习资料\\mesheer\\评审意见书_测试版.docx";
  await generateReviewReport(reviewData, outputPath);
  
  console.log("\n测试完成！");
  console.log(`评审意见书: ${outputPath}`);
  console.log("=".repeat(60));
}

test();
