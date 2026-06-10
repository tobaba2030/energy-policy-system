/**
 * 能源政策情报系统 - 对话记录导出脚本
 * 生成包含时间线的完整对话记录Word文档
 */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  TableOfContents, Footer, AlignmentType, HeadingLevel, PageBreak,
  BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

// 对话时间线数据（根据会话历史整理）
const conversationTimeline = [
  {
    time: "2026年6月9日 10:00 - 初始需求",
    user: "想结合AI大模型技术给能源集团做一个政策情报影响研究与仿真推演的系统，同时附带3060长期政策影响的沙盘推演，最好是可动态展示的界面",
    assistant: "开始构建能源政策情报系统基础架构，包含政策分析模块、3060双碳沙盘推演模块等核心功能"
  },
  {
    time: "2026年6月9日 10:30 - 情报链条完善",
    user: "请结合这两个方案材料，继续细化、完善能源政策情报系统，形成情报信息传递链条循环",
    assistant: "完善情报信息传递链条：数据整合→知识图谱构建→智能体推理→平台应用，增加InformationCycle组件展示循环过程"
  },
  {
    time: "2026年6月9日 11:00 - 政研报告体系",
    user: "想结合未来最新的政策对能源发电集团的具体业务版本的影响做一个专题，并形成分层分级管理的政研报告体系",
    assistant: "新增PolicyResearch页面，实现战略层/战术层/执行层三级报告体系，包含业务板块影响分析和政策业务影响矩阵"
  },
  {
    time: "2026年6月9日 11:30 - 对外分享需求",
    user: "请给我一个对外分享版本的链接",
    assistant: "准备GitHub仓库，将代码推送到GitHub，为Vercel部署做准备"
  },
  {
    time: "2026年6月9日 12:00 - GitHub仓库创建",
    user: "Token已准备好",
    assistant: "使用GitHub API创建仓库tobaba2030/energy-policy-system，成功推送代码"
  },
  {
    time: "2026年6月9日 13:30 - Vercel部署问题",
    user: "https://energy-policy-system.vercel.app/ 为啥无法访问呢",
    assistant: "诊断Vercel部署问题，发现本地服务正常，Vercel链接超时，开始排查部署配置"
  },
  {
    time: "2026年6月9日 14:00 - 多链接尝试",
    user: "https://energy-policy-system-2sae.vercel.app/ 可以访问吗",
    assistant: "测试新链接，同样超时，开始深入排查部署问题"
  },
  {
    time: "2026年6月9日 14:30 - 路由问题修复",
    user: "点击Deployments标签，亲帮我操作，我没有看到",
    assistant: "进入Vercel控制台检查，发现使用BrowserRouter导致SPA路由问题，改为HashRouter解决"
  },
  {
    time: "2026年6月9日 15:00 - 组件链接修复",
    user: "页面显示空白，请帮我自行修复下",
    assistant: "修复App.tsx使用HashRouter，Navbar和Home组件的链接改为react-router-dom的Link组件"
  },
  {
    time: "2026年6月9日 15:30 - 部署验证",
    user: "请帮我Vercel部署",
    assistant: "通过Vercel控制台确认部署成功，提交6dac0cf已成功部署到生产环境"
  },
  {
    time: "2026年6月9日 16:00 - 国内访问问题",
    user: "请给我一个链接，我可以外网访问的",
    assistant: "Vercel在国内网络超时，使用localtunnel创建临时公网访问链接"
  },
  {
    time: "2026年6月9日 16:30 - 文档导出",
    user: "请将本项目的所有对话和反馈记录，导出来，形成word文档",
    assistant: "生成包含完整时间线的对话记录Word文档"
  }
];

// 问题与解决方案记录
const issuesAndSolutions = [
  {
    issue: "GitHub Token权限不足",
    error: "Resource not accessible by personal access token (403)",
    solution: "指导用户重新生成包含repo和workflow权限的Token"
  },
  {
    issue: "Node.js模块导入错误",
    error: "ReferenceError: require is not defined in ES module scope",
    solution: "将.js文件重命名为.cjs，以CommonJS模块方式执行"
  },
  {
    issue: "Vercel CLI未登录",
    error: "No existing credentials found",
    solution: "建议通过Vercel网页端导入GitHub仓库进行部署"
  },
  {
    issue: "端口占用问题",
    error: "Port 5173 is in use",
    solution: "Vite自动切换到可用端口（5174等）"
  },
  {
    issue: "Vercel部署链接无法访问",
    error: "ERR_CONNECTION_TIMED_OUT",
    solution: "修改BrowserRouter为HashRouter，更新vercel.json配置"
  },
  {
    issue: "Vercel在国内网络超时",
    error: "Connection timeout",
    solution: "使用localtunnel创建临时公网访问链接"
  }
];

// 系统功能模块记录
const systemModules = [
  {
    name: "政策情报分析 (PolicyIntelligence)",
    features: ["政策数据库", "多维度分析", "趋势预警", "关键词提取", "影响评估矩阵"]
  },
  {
    name: "3060双碳沙盘推演 (CarbonSandbox)",
    features: ["四大情景模拟", "关键指标追踪", "能源结构演进可视化", "时间轴控制"]
  },
  {
    name: "知识图谱 (KnowledgeGraph)",
    features: ["可视化展示", "节点类型筛选", "关联关系展示"]
  },
  {
    name: "智能推理 (AgentInference)",
    features: ["AI大模型推理", "快速提问", "对话式分析"]
  },
  {
    name: "政研报告 (PolicyResearch)",
    features: ["战略层报告", "战术层报告", "执行层报告", "业务板块影响分析"]
  },
  {
    name: "文件管理 (FileManagement)",
    features: ["公开渠道采集", "内部文件上传", "智能解析", "密级管理"]
  },
  {
    name: "情报信息传递循环 (InformationCycle)",
    features: ["数据整合", "知识图谱构建", "智能体推理", "平台应用"]
  }
];

// 辅助函数
function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text, font: FONT, bold: true, size: 36 })],
  });
}

function heading(level, text, pageBreak) {
  const config = {
    1: { size: 30, before: 120, after: 60 },
    2: { size: 28, before: 60, after: 60 },
    3: { size: 24, before: 60, after: 60 },
    4: { size: 24, before: 60, after: 60 }
  };
  const c = config[level];
  return new Paragraph({
    heading: level === 1 ? HeadingLevel.HEADING_1 : level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3,
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", before: c.before, after: c.after },
    pageBreakBefore: pageBreak,
    children: [new TextRun({ text, font: FONT, bold: true, size: c.size })],
  });
}

function bodyParagraph(text, indent) {
  indent = indent === undefined ? true : indent;
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: indent ? { firstLine: 480, firstLineChars: 200 } : undefined,
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: FONT, size: 24 })],
  });
}

function emptyLine() {
  return new Paragraph({ children: [new TextRun({ text: "", font: FONT, size: 24 })] });
}

function tableCaption(num, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "表" + num + " " + caption, font: FONT, size: 21, bold: true })],
  });
}

const TABLE_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
};

function headerCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "D9E2F3", type: ShadingType.CLEAR },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: FONT, size: 21, bold: true })],
    })],
  });
}

function bodyCell(text, width, align) {
  align = align || AlignmentType.LEFT;
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, font: FONT, size: 21 })],
    })],
  });
}

// 生成对话记录表格行
function timelineTableRow(time, userContent, assistantContent, isHeader) {
  if (isHeader) {
    return new TableRow({
      tableHeader: true,
      children: [
        headerCell("时间", 1500),
        headerCell("用户问题", 3403),
        headerCell("助手响应", 3403)
      ]
    });
  }
  return new TableRow({
    children: [
      bodyCell(time, 1500, AlignmentType.CENTER),
      bodyCell(userContent, 3403),
      bodyCell(assistantContent, 3403)
    ]
  });
}

// 创建文档
const doc = new Document({
  features: { updateFields: true },
  styles: {
    default: {
      document: { run: { font: "Times New Roman", size: 24 } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: FONT },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 120, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: FONT },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: FONT },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 2 },
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1800, bottom: 1440, left: 1800, footer: 992 },
      },
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            children: [PageNumber.CURRENT],
            font: { name: "Times New Roman" },
            size: 18,
          })],
        })],
      }),
    },
    children: [
      // 封面
      docTitle("能源政策情报系统"),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 120, after: 240 },
        children: [new TextRun({ text: "开发对话记录与反馈报告", font: FONT, bold: true, size: 28 })],
      }),
      emptyLine(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480, after: 120 },
        children: [new TextRun({ text: "项目时间：2026年6月9日 10:00 - 16:30", font: FONT, size: 24 })],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "开发周期：1天（约6.5小时）", font: FONT, size: 24 })],
      }),
      emptyLine(),
      emptyLine(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480 },
        children: [new TextRun({ text: "报告生成日期：2026年6月9日", font: FONT, size: 24 })],
      }),

      new Paragraph({ children: [new PageBreak()] }),

      // 目录
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 240, after: 240 },
        children: [new TextRun({ text: "目  录", font: FONT, bold: true, size: 36 })],
      }),
      new TableOfContents("TOC", { hyperlink: true, headingStyleRange: "1-3" }),
      new Paragraph({ children: [new PageBreak()] }),

      // 一、项目概述
      heading(1, "一、项目概述", true),
      bodyParagraph("本项目旨在为能源集团开发一套基于AI大模型技术的政策情报影响研究与仿真推演系统。该系统融合了3060双碳目标的长期政策影响分析，通过动态沙盘推演界面为决策者提供直观的数据支撑和情景模拟。"),
      emptyLine(),
      bodyParagraph("系统采用React + TypeScript + Tailwind CSS + ECharts技术栈构建，支持政策数据库管理、多维度分析、知识图谱可视化、智能推理以及分层分级政研报告等功能。"),

      // 二、系统功能架构
      heading(1, "二、系统功能架构", true),
      bodyParagraph("系统包含以下核心功能模块："),
      emptyLine(),

      ...systemModules.map(function(mod, i) {
        var result = [heading(2, (i + 1) + ". " + mod.name)];
        result.push(bodyParagraph("主要功能：" + mod.features.join("、"), false));
        result.push(emptyLine());
        return result;
      }).flat(),

      // 三、对话时间线
      heading(1, "三、对话时间线记录", true),
      bodyParagraph("以下是本次项目开发过程中的完整对话记录，按时间顺序整理："),
      emptyLine(),

      tableCaption(1, "对话时间线记录"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1500, 3403, 3403],
        borders: TABLE_BORDERS,
        rows: [
          timelineTableRow("时间", "用户问题", "助手响应", true),
        ].concat(conversationTimeline.map(function(item) {
          return timelineTableRow(item.time, item.user, item.assistant);
        }))
      }),

      // 四、问题与解决方案
      heading(1, "四、问题与解决方案记录", true),
      bodyParagraph("在项目开发过程中遇到的问题及其解决方案汇总如下："),
      emptyLine(),

      tableCaption(2, "问题与解决方案对照表"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [1800, 2500, 4006],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("问题", 1800),
              headerCell("错误信息", 2500),
              headerCell("解决方案", 4006)
            ]
          })
        ].concat(issuesAndSolutions.map(function(item) {
          return new TableRow({
            children: [
              bodyCell(item.issue, 1800),
              bodyCell(item.error, 2500),
              bodyCell(item.solution, 4006)
            ]
          });
        }))
      }),

      // 五、技术决策记录
      heading(1, "五、重要技术决策记录", true),

      heading(2, "5.1 路由方案决策"),
      bodyParagraph("问题：由于Vercel静态部署环境不支持BrowserRouter所需的服务器端路由重写，导致直接访问子路由（如/policy、/sandbox）时返回404。"),
      emptyLine(),
      bodyParagraph("决策：采用HashRouter替代BrowserRouter，将路由信息存储在URL的hash部分（#path），完全在浏览器端处理路由，无需服务器配置。"),
      emptyLine(),
      bodyParagraph("影响：URL格式从 /policy 变为 /#/policy，需要更新所有内部链接组件（Navbar、Home等）使用react-router-dom的Link组件。"),

      heading(2, "5.2 部署方案决策"),
      bodyParagraph("问题：Vercel在国内网络环境下访问超时。"),
      emptyLine(),
      bodyParagraph("决策：为临时访问使用localtunnel创建公网链接；长期方案建议部署到国内平台（如Gitee Pages、腾讯云等）。"),

      heading(2, "5.3 GitHub仓库配置"),
      bodyParagraph("仓库地址：https://github.com/tobaba2030/energy-policy-system"),
      emptyLine(),
      bodyParagraph("部署状态：已成功配置Vercel自动部署，每次推送到main分支自动触发生产部署。"),

      // 六、关键文件修改记录
      heading(1, "六、关键文件修改记录", true),

      tableCaption(3, "关键文件修改记录"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2500, 2000, 3806],
        borders: TABLE_BORDERS,
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              headerCell("文件名", 2500),
              headerCell("修改类型", 2000),
              headerCell("修改说明", 3806)
            ]
          }),
          new TableRow({
            children: [
              bodyCell("src/App.tsx", 2500),
              bodyCell("路由修改", 2000),
              bodyCell("BrowserRouter改为HashRouter", 3806)
            ]
          }),
          new TableRow({
            children: [
              bodyCell("src/components/Navbar.tsx", 2500),
              bodyCell("链接修改", 2000),
              bodyCell("a标签改为Link组件", 3806)
            ]
          }),
          new TableRow({
            children: [
              bodyCell("src/pages/Home.tsx", 2500),
              bodyCell("链接修改", 2000),
              bodyCell("内部链接改为Link组件", 3806)
            ]
          }),
          new TableRow({
            children: [
              bodyCell("vercel.json", 2500),
              bodyCell("新增文件", 2000),
              bodyCell("添加SPA路由重写配置", 3806)
            ]
          }),
          new TableRow({
            children: [
              bodyCell("vite.config.ts", 2500),
              bodyCell("配置优化", 2000),
              bodyCell("移除可能导致问题的插件", 3806)
            ]
          })
        ],
      }),

      // 七、访问链接
      heading(1, "七、项目访问链接", true),

      heading(2, "7.1 Vercel部署链接"),
      bodyParagraph("生产环境：https://energy-policy-system-flss.vercel.app"),
      emptyLine(),
      bodyParagraph("注意事项：由于网络环境差异，Vercel链接在国内可能存在访问延迟或超时。"),

      heading(2, "7.2 临时公网访问链接"),
      bodyParagraph("localtunnel链接：https://brave-emus-relax.loca.lt"),
      emptyLine(),
      bodyParagraph("使用说明："),
      bodyParagraph("首次访问时可能需要输入公共IP地址进行验证，点击页面上的验证按钮即可继续访问。", false),
      bodyParagraph("此链接为临时链接，服务重启后将失效。", false),

      heading(2, "7.3 GitHub仓库"),
      bodyParagraph("仓库地址：https://github.com/tobaba2030/energy-policy-system"),

      // 八、后续优化建议
      heading(1, "八、后续优化建议", true),
      bodyParagraph("根据项目开发过程中的反馈和讨论，提出以下后续优化建议："),

      heading(2, "8.1 国内部署优化"),
      bodyParagraph("考虑将项目部署到国内平台（如Gitee Pages、腾讯云、阿里云等），以提升国内用户的访问体验。"),

      heading(2, "8.2 持续功能迭代"),
      bodyParagraph("根据实际业务需求，持续完善政研报告体系，补充更多政策分析维度和情景模拟场景。"),

      heading(2, "8.3 AI能力增强"),
      bodyParagraph("接入更多AI大模型能力，提升智能推理的准确性和实用性，实现更智能的政策影响预测。"),

      emptyLine(),
      emptyLine(),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 480 },
        children: [new TextRun({ text: "—— 文档结束 ——", font: FONT, size: 24, bold: true })],
      }),
    ],
  }],
});

// 生成文档
var outputPath = path.join(__dirname, "能源政策情报系统_对话记录.docx");
Packer.toBuffer(doc).then(function(buffer) {
  fs.writeFileSync(outputPath, buffer);
  console.log("文档生成成功: " + outputPath);
}).catch(function(err) {
  console.error("文档生成失败:", err);
  process.exit(1);
});
