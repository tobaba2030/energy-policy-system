---
name: docx-cn
description: "中文Word文档生成技能。当用户提到中文word、中文文档、word文档、docx、技术方案、投标文件、项目报告、学术论文、论文、学位论文、期刊论文、课题报告、标书、方案文档、报告文档等字眼时触发本技能。支持多模板（通用文档/学位论文/期刊论文/技术报告）、公式编排、目录、参考文献、中英混排字体。"
argument-hint: "[模板类型: default|thesis|paper|report]"
license: MIT
metadata:
  author: zhuow
  version: "2.1.0"
---

# 中文 Word 文档生成（docx-cn）

基于国内技术文档与学术论文格式规范，使用 `docx-js` 生成格式规范的 .docx 文件。

## 依赖

安装：`npm install docx`（在项目目录或全局安装）。生成脚本前先检查是否已安装，未安装则执行安装。

---

## 模板类型

| 模板 | 说明 | 适用场景 |
|------|------|----------|
| `default` | 通用技术文档，标题居中 | 技术方案、投标文件、项目报告 |
| `thesis` | 学位论文，含封面、摘要、目录 | 本科/硕士/博士学位论文 |
| `paper` | 期刊论文，含中英摘要 | 期刊投稿、会议论文 |
| `report` | 技术报告，含封面、目录 | 课题报告、研究报告、结题报告 |

**默认模板为 `default`**，用户未指定时使用。标题层级默认 3 级（H1/H2/H3），可按用户需求调整至 4-5 级。

---

## 格式规范

### 页面设置

| 项目 | 值 | 说明 |
|------|-----|------|
| 纸张 | A4 (11906 × 16838 DXA) | |
| 上下边距 | 1440 DXA | 1 寸 |
| 左右边距 | 1800 DXA | 1.25 寸 |
| 内容区宽度 | 8306 DXA | 11906 - 1800 × 2 |
| 页眉 | 可选（学术模板启用） | |
| 页脚 | 居中页码，Times New Roman 小五(9pt) | |

### 字体与字号（中英混排）

**所有 `font` 设置统一使用：`{ name: "Times New Roman", eastAsia: "宋体" }`**
Word 会自动为中文使用宋体，英文/数字使用 Times New Roman。

| 用途 | 字号 | sz 值 |
|------|------|-------|
| 文档标题 (Title) | 小二 18pt | 36 |
| 一级标题 H1 | 小三 15pt | 30 |
| 二级标题 H2 | 四号 14pt | 28 |
| 三级标题 H3 | 小四 12pt | 24 |
| 四级标题 H4（可选） | 小四 12pt | 24 |
| 正文 | 小四 12pt | 24 |
| 图注 / 表注 | 五号 10.5pt | 21 |
| 公式 | 小四 12pt | 24 |

### 段落格式

| 项目 | 正文 | 标题 |
|------|------|------|
| 行距 | 1.5 倍 (`line: 360, lineRule: "auto"`) | 1.5 倍 |
| 首行缩进 | 2 字符 (`firstLine: 480, firstLineChars: 200`) | 无 |
| 对齐 | 两端对齐 (`JUSTIFIED`) | Title 居中，H1/H2/H3 左对齐 |
| 加粗 | 否 | 全部加粗 |
| 段前段后 | 无 | Title: 240/120, H1: 120/60, H2/H3: 60/60 |

### 标题编号

标题编号**写在文本中**，不使用 Word 自动编号：

| 级别 | 格式 | 示例 |
|------|------|------|
| Title | 无编号 | 智能系统技术方案 |
| H1 | 中文数字 + 顿号 | 一、项目背景 |
| H2 | 章节号.序号 | 1.1 政策背景 |
| H3 | 章节号.序号.子序号 | 1.1.1 新能源政策 |

### 分页规则

- **H1 标题前强制分页**（`pageBreakBefore: true`），每一章从新页面开始
- 文档标题（Title）不分页
- H2/H3 不强制分页

---

## 代码模板

### 统一字体常量

```javascript
// 中英混排字体：中文宋体，英文/数字 Times New Roman
const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306; // A4 减去左右各 1.25 寸边距
```

### 完整骨架

```javascript
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  TableOfContents, Footer, Header, Math: DocxMath, MathRun,
  AlignmentType, HeadingLevel, PageBreak,
  BorderStyle, WidthType, ShadingType, PageNumber,
} = require("docx");

const FONT = { name: "Times New Roman", eastAsia: "宋体" };
const CONTENT_WIDTH = 8306;

// ————— 辅助函数 —————

/** 正文段落 */
function bodyParagraph(text) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text, font: FONT, size: 24 }),
    ],
  });
}

/** 文档标题（居中、小二、加粗） */
function docTitle(text) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({ text, font: FONT, bold: true, size: 36 }),
    ],
  });
}

/** 标题段落（level: 1/2/3/4） — H1 自动分页 */
function heading(level, text) {
  const config = {
    1: { heading: HeadingLevel.HEADING_1, size: 30, before: 120, after: 60 },
    2: { heading: HeadingLevel.HEADING_2, size: 28, before: 60,  after: 60 },
    3: { heading: HeadingLevel.HEADING_3, size: 24, before: 60,  after: 60 },
    4: { heading: HeadingLevel.HEADING_4, size: 24, before: 60,  after: 60 },
  };
  const c = config[level];
  return new Paragraph({
    heading: c.heading,
    alignment: AlignmentType.LEFT,
    spacing: { line: 360, lineRule: "auto", before: c.before, after: c.after },
    pageBreakBefore: level === 1, // H1 前强制分页
    children: [
      new TextRun({ text, font: FONT, bold: true, size: c.size }),
    ],
  });
}

/**
 * 目录页（返回数组，展开到 children）
 * 打开 Word 后按 Ctrl+A → F9 刷新目录
 */
function tocPage(title = "目  录") {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 240 },
      children: [
        new TextRun({ text: title, font: FONT, bold: true, size: 36 }),
      ],
    }),
    new TableOfContents("TOC", {
      hyperlink: true,
      headingStyleRange: "1-3",
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  ];
}

/**
 * 公式块（返回数组，使用时用 ... 展开）
 * 所有内容在一个无边框表格内：公式行(2列) + 其中行(合并) + 参数行(合并)
 *
 * @param {string} formula - 公式文本，如 "P = UI cosφ"
 * @param {string} number - 公式编号，如 "1-1"（生成"式（1-1）"）
 * @param {Array<{symbol: string, desc: string}>} params - 参数说明数组
 *
 * 输出效果（全部在一个无边框表格中）：
 *   | [公式对象] P = UI cosφ    |  式（1-1） |  ← Row0: 2列
 *   |   其中：                               |  ← Row1: 合并，首行缩进2字符
 *   |       P——有功功率（W）；                |  ← Row2+: 合并，首行缩进4字符
 *   |       U——电压（V）；                    |
 *   |       I——电流（A）。                    |  ← 最后用句号
 */
function formulaBlock(formula, number, params) {
  const noBorder = { style: BorderStyle.NONE, size: 0 };
  const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

  // 构建所有行
  const rows = [
    // Row 0: 公式(居中, Math对象) + 编号(居中)
    new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: 6928, type: WidthType.DXA },
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { line: 360, lineRule: "auto" },
            children: [
              new DocxMath({
                children: [new MathRun(formula)],
              }),
            ],
          })],
        }),
        new TableCell({
          borders: noBorders,
          width: { size: 1378, type: WidthType.DXA },
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { line: 360, lineRule: "auto" },
            children: [new TextRun({ text: `式（${number}）`, font: FONT, size: 24 })],
          })],
        }),
      ],
    }),
    // Row 1: "其中：" — 合并2列，首行缩进2字符
    new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnSpan: 2,
          children: [new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { line: 360, lineRule: "auto" },
            indent: { firstLine: 480, firstLineChars: 200 },
            children: [new TextRun({ text: "其中：", font: FONT, size: 24 })],
          })],
        }),
      ],
    }),
  ];

  // Row 2+: 参数说明 — 合并2列，首行缩进4字符
  params.forEach((p, i) => {
    const isLast = i === params.length - 1;
    rows.push(new TableRow({
      children: [
        new TableCell({
          borders: noBorders,
          width: { size: CONTENT_WIDTH, type: WidthType.DXA },
          columnSpan: 2,
          children: [new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { line: 360, lineRule: "auto" },
            indent: { firstLine: 960, firstLineChars: 400 },
            children: [new TextRun({
              text: `${p.symbol}——${p.desc}${isLast ? "。" : "；"}`,
              font: FONT, size: 24,
            })],
          })],
        }),
      ],
    }));
  });

  return [
    new Table({
      width: { size: CONTENT_WIDTH, type: WidthType.DXA },
      columnWidths: [6928, 1378],
      rows,
    }),
  ];
}

/**
 * 图片占位符（返回数组）
 */
function createImagePlaceholder(description, figureNumber, caption) {
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 0 },
      border: {
        top:    { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
        left:   { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
        right:  { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
      },
      shading: { type: ShadingType.CLEAR, fill: "F0F0F0" },
      children: [
        new TextRun({
          text: `（描述：${description}）`,
          font: FONT, size: 21, color: "666666",
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 120 },
      children: [
        new TextRun({ text: `图${figureNumber} ${caption}`, font: FONT, size: 21, bold: true }),
      ],
    }),
  ];
}

/**
 * 表注段落（放在表格前面）
 */
function tableCaption(tableNumber, caption) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({ text: `表${tableNumber} ${caption}`, font: FONT, size: 21, bold: true }),
    ],
  });
}

// ————— 表格辅助 —————

// 表格边框统一在 Table 级别定义，单元格不再单独设置边框
const TABLE_BORDERS = {
  top:     { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  bottom:  { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  left:    { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  right:   { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "auto" },
  insideVertical:   { style: BorderStyle.SINGLE, size: 4, color: "auto" },
};

/** 表头单元格（加粗、浅蓝底、居中） */
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

/** 表格内容单元格 */
function bodyCell(text, width) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: FONT, size: 21 })],
    })],
  });
}

/**
 * 参考文献（返回数组，仅在用户需要时调用）
 * @param {Array<string>} refs - 参考文献条目
 */
function references(refs) {
  const elements = [
    heading(1, "参考文献"),
  ];
  refs.forEach((ref, i) => {
    elements.push(new Paragraph({
      spacing: { line: 360, lineRule: "auto" },
      indent: { left: 480, hanging: 480 }, // 悬挂缩进
      alignment: AlignmentType.JUSTIFIED,
      children: [
        new TextRun({ text: `[${i + 1}] ${ref}`, font: FONT, size: 24 }),
      ],
    }));
  });
  return elements;
}

// ————— 文档定义 —————

const doc = new Document({
  features: { updateFields: true }, // 支持目录刷新
  styles: {
    default: {
      document: {
        run: { font: "Times New Roman", size: 24 },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 120, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 2 },
      },
      {
        id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Times New Roman" },
        paragraph: { spacing: { line: 360, lineRule: "auto", before: 60, after: 60 }, alignment: AlignmentType.LEFT, outlineLevel: 3 },
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
      docTitle("文档标题"),
      ...tocPage(),
      heading(1, "一、章节标题"),
      bodyParagraph("正文内容..."),
      heading(2, "1.1 二级标题"),
      bodyParagraph("正文内容..."),
      heading(3, "1.1.1 三级标题"),
      bodyParagraph("正文内容..."),

      // —— 公式示例 ——
      ...formulaBlock("P = UI cosφ", "1-1", [
        { symbol: "P", desc: "有功功率（W）" },
        { symbol: "U", desc: "电压有效值（V）" },
        { symbol: "I", desc: "电流有效值（A）" },
        { symbol: "cosφ", desc: "功率因数" },
      ]),

      // —— 表格示例（含表头标记） ——
      tableCaption(1, "参数对照表"),
      new Table({
        width: { size: CONTENT_WIDTH, type: WidthType.DXA },
        columnWidths: [2000, 2500, 3806],
        borders: TABLE_BORDERS, // 表格级边框（含内部横竖线）
        rows: [
          new TableRow({
            tableHeader: true, // 表头行：跨页时自动重复
            children: [
              headerCell("参数", 2000),
              headerCell("符号", 2500),
              headerCell("说明", 3806),
            ],
          }),
          new TableRow({
            children: [
              bodyCell("电压", 2000),
              bodyCell("U", 2500),
              bodyCell("电路两端的电位差", 3806),
            ],
          }),
        ],
      }),

      // —— 图片占位符示例 ——
      ...createImagePlaceholder("系统整体架构示意图，包含数据采集层、处理层、应用层", 1, "系统架构图"),
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("output.docx", buffer);
  console.log("文档生成成功: output.docx");
});
```

### 表格模板（含表头重复）

```javascript
// 列宽之和必须等于 CONTENT_WIDTH (8306)
const colWidths = [2000, 2500, 3806];

tableCaption(1, "表格标题"),
new Table({
  width: { size: CONTENT_WIDTH, type: WidthType.DXA },
  columnWidths: colWidths,
  borders: TABLE_BORDERS, // ★ 表格级边框（含 insideH/insideV 内部线）
  rows: [
    new TableRow({
      tableHeader: true, // ★ 关键：跨页时表头自动重复
      children: colWidths.map((w, i) => headerCell(["列A","列B","列C"][i], w)),
    }),
    new TableRow({
      children: colWidths.map((w, i) => bodyCell(["值1","值2","值3"][i], w)),
    }),
  ],
}),
```

### 公式模板

```javascript
// 使用示例
...formulaBlock("E = mc²", "2-1", [
  { symbol: "E", desc: "能量（J）" },
  { symbol: "m", desc: "质量（kg）" },
  { symbol: "c", desc: "光速（3×10⁸ m/s）" },
]),
```

输出效果（全部在一个无边框表格内）：
```
┌──────────────────────────────┬────────────┐
│    [公式] E = mc²            │  式（2-1） │  ← Row0: 2列(6928+1378)
├─────────────────────────────────────────────┤
│  其中：                                     │  ← Row1: 合并, 首行缩进2字符
├─────────────────────────────────────────────┤
│      E——能量（J）；                          │  ← Row2+: 合并, 首行缩进4字符
│      m——质量（kg）；                         │
│      c——光速（3×10⁸ m/s）。                  │  ← 最后句号
└─────────────────────────────────────────────┘
```

**关键点：**
- 公式使用 `DocxMath` + `MathRun(string)` 生成 OOXML 公式对象（MathRun 只接受纯字符串参数）
- "其中："和参数行通过 `columnSpan: 2` 合并为全宽单元格
- 缩进使用 `firstLine`（首行缩进），不是 `left`（左缩进）

---

## 模板配置

### default — 通用技术文档

默认模板，标题居中，适用于技术方案、投标文件等。

- 标题：居中、加粗
- 标题层级：默认 3 级
- H1 前分页：是
- 目录：可选
- 参考文献：用户要求时才添加

### thesis — 学位论文

在 default 基础上增加：

```javascript
// 封面页（独立 section，无页眉页脚）
{
  properties: {
    page: {
      size: { width: 11906, height: 16838 },
      margin: { top: 1440, right: 1800, bottom: 1440, left: 1800 },
    },
  },
  children: [
    // 校名（二号黑体居中）
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 1200, after: 480 },
      children: [new TextRun({ text: "XX大学", font: { name: "Times New Roman", eastAsia: "黑体" }, bold: true, size: 44 })],
    }),
    // 论文类型
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 720 },
      children: [new TextRun({ text: "硕士学位论文", font: { name: "Times New Roman", eastAsia: "宋体" }, size: 36 })],
    }),
    // 论文题目
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 480 },
      children: [new TextRun({ text: "论文题目", font: FONT, bold: true, size: 36 })],
    }),
    // 信息表（无边框表格对齐）：作者、导师、学院、专业、日期
    // ... 使用无边框表格排版
  ],
},
// 摘要页
{
  properties: { /* 同上页面设置 */ },
  children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 240, after: 240 },
      children: [new TextRun({ text: "摘  要", font: FONT, bold: true, size: 30 })],
    }),
    bodyParagraph("摘要内容..."),
    new Paragraph({
      spacing: { before: 240, line: 360, lineRule: "auto" },
      children: [
        new TextRun({ text: "关键词：", font: FONT, bold: true, size: 24 }),
        new TextRun({ text: "关键词1；关键词2；关键词3", font: FONT, size: 24 }),
      ],
    }),
  ],
},
// 英文摘要页 Abstract — 同结构，英文内容
// 目录页
// 正文章节（H1 分页）
// 参考文献
// 致谢
```

### paper — 期刊论文

```javascript
// 单 section，紧凑排版
children: [
  // 中文标题（小二、居中、加粗）
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 120 },
    children: [new TextRun({ text: "论文标题", font: FONT, bold: true, size: 36 })],
  }),
  // 作者（五号、居中）
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
    children: [new TextRun({ text: "作者1¹，作者2²", font: FONT, size: 21 })],
  }),
  // 单位（小五、居中）
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: "（1. XX大学 XX学院，城市 邮编；2. ...）", font: FONT, size: 18 })],
  }),
  // 中文摘要
  new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    children: [
      new TextRun({ text: "摘要：", font: FONT, bold: true, size: 21 }),
      new TextRun({ text: "摘要内容...", font: FONT, size: 21 }),
    ],
  }),
  // 关键词
  new Paragraph({
    spacing: { line: 360, lineRule: "auto", after: 240 },
    indent: { firstLine: 480, firstLineChars: 200 },
    children: [
      new TextRun({ text: "关键词：", font: FONT, bold: true, size: 21 }),
      new TextRun({ text: "关键词1；关键词2；关键词3", font: FONT, size: 21 }),
    ],
  }),
  // English title, authors, abstract, keywords — 同上结构用英文
  // 正文（使用 heading + bodyParagraph）
  // 参考文献
]
```

### report — 技术报告

在 default 基础上增加封面页和目录页：

```javascript
// Section 1: 封面
{
  children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 3600, after: 480 },
      children: [new TextRun({ text: "技 术 报 告", font: FONT, bold: true, size: 52 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 1200 },
      children: [new TextRun({ text: "报告标题", font: FONT, bold: true, size: 36 })],
    }),
    // 报告信息（无边框表格）：编制单位、编制日期、版本号等
  ],
},
// Section 2: 目录 + 正文
{
  children: [
    ...tocPage(),
    heading(1, "一、项目概述"),
    bodyParagraph("..."),
    // ...
  ],
}
```

---

## 关键规则

1. **字体中英混排** — `font: { name: "Times New Roman", eastAsia: "宋体" }`，所有 TextRun 统一使用常量 `FONT`
2. **标题字号递减** — Title 小二(36) > H1 小三(30) > H2 四号(28) > H3 小四(24)
3. **标题编号写在文本中** — 如 `"一、项目背景"` `"1.1 政策背景"`，不依赖 Word 自动编号
4. **H1 前强制分页** — `pageBreakBefore: level === 1`
5. **标题层级默认 3 级** — 可按用户需求扩展到 4-5 级
6. **无页眉**（除学术模板外） — 仅保留页脚页码
7. **占位符用 `...` 展开** — `formulaBlock()`、`createImagePlaceholder()`、`tocPage()` 均返回数组
8. **占位符描述要详细** — 描述应能直接粘贴到 Gemini 生图
9. **不用 `\n`** — 用独立 Paragraph
10. **表格宽度用 DXA** — 不用 `WidthType.PERCENTAGE`
11. **shading 用 `ShadingType.CLEAR`** — 不用 `SOLID`
12. **表格边框在 Table 级定义** — 使用 `borders: TABLE_BORDERS`（含 `insideHorizontal`/`insideVertical`），单元格不再设 borders
13. **表头行标记** — `tableHeader: true`，跨页时自动重复表头
14. **公式全部在一个无边框表格内** — Row0: 公式(DocxMath)+编号(2列)，Row1: "其中："(合并, firstLine缩进2字符)，Row2+: 参数(合并, firstLine缩进4字符)
15. **公式用 Math 对象** — `new DocxMath({ children: [new MathRun("公式文本")] })`，MathRun 只接受纯字符串参数
15. **参考文献按需** — 用户未要求时不生成参考文献章节
16. **目录需刷新** — `features: { updateFields: true }`，提示用户打开 Word 后 Ctrl+A → F9 刷新
17. **中文特殊引号必须转义** — 中文左右双引号 `""`（U+201C / U+201D）在 JS 双引号字符串中**会被误判为字符串终止符**，导致 `SyntaxError: missing ) after argument list`。解决方案：在 JS 字符串中使用 Unicode 转义 `\u201c` 和 `\u201d`，或改用反引号模板字符串包裹含有中文引号的文本。同理适用于中文单引号 `''`（U+2018 / U+2019）。**这是最常见的生成错误，务必在生成脚本时检查所有中文引号。**
18. **require 路径** — 生成脚本时，`require("docx")` 需要确保 docx 模块在当前工作目录的 node_modules 中可用。如果脚本不在 docx-cn-skill 目录下执行，需使用相对路径或绝对路径引用，如 `require("../docx-cn-skill/node_modules/docx")`。

---

## Markdown 转 Word 工作流

当其他 skill 或用户提供 Markdown 格式的内容时，docx-cn 负责将其转换为格式规范的 Word 文档。

### 转换映射规则

| Markdown 元素 | Word 元素 | 转换方式 |
|---------------|-----------|----------|
| `# 一级标题` | H1（小三加粗，前分页） | `heading(1, text)` |
| `## 二级标题` | H2（四号加粗） | `heading(2, text)` |
| `### 三级标题` | H3（小四加粗） | `heading(3, text)` |
| 普通段落 | 正文（小四，首行缩进） | `bodyParagraph(text)` |
| `**粗体前缀**普通文本` | 段首加粗的正文 | `bodyParagraphWithBoldPrefix(bold, normal)` |
| `（1）列表项` | 带缩进的列表段落 | `listItem(text)` |
| `![图片描述](...)` | 图片占位符 | `createImagePlaceholder(desc, num, caption)` |
| Markdown 表格 | Word 表格 | `Table` + `headerCell` / `bodyCell` |
| `$公式$` | 公式块 | `formulaBlock(formula, num, params)` |
| `> [1] 参考文献` | 悬挂缩进文献 | `references(refs)` |

### bodyParagraphWithBoldPrefix 辅助函数

Markdown 中常见 `**加粗前缀：**普通正文` 的写法，转换时使用：

```javascript
/** 加粗段首 + 普通正文的段落 */
function bodyParagraphWithBoldPrefix(boldText, normalText) {
  return new Paragraph({
    spacing: { line: 360, lineRule: "auto" },
    indent: { firstLine: 480, firstLineChars: 200 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: boldText, font: FONT, size: 24, bold: true }),
      new TextRun({ text: normalText, font: FONT, size: 24 }),
    ],
  });
}
```

### 转换流程

1. **读取 Markdown 文件**：解析 Markdown 内容，识别标题层级、段落、表格、列表、公式等元素
2. **逐元素映射**：按上表规则将每个 Markdown 元素转为对应的 docx-js 对象
3. **特殊处理**：
   - 中文引号 `""` → 使用 `\u201c` `\u201d` 转义
   - 连续段落 → 各自独立的 `Paragraph` 对象（不用 `\n`）
   - 表格 → 解析列数和内容，自动计算列宽使总宽等于 `CONTENT_WIDTH`
4. **组装文档**：按模板（default/thesis/paper/report）组装封面、目录、正文
5. **输出 Word**：`Packer.toBuffer(doc)` → `fs.writeFileSync()`
