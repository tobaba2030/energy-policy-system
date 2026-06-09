# 新型电力系统建设与计量技术发展 - Design Spec

## I. Project Information

| Item | Value |
| ---- | ----- |
| **Project Name** | 新型电力系统建设与计量技术发展 |
| **Canvas Format** | PPT 16:9 (1280×720) |
| **Page Count** | 30 |
| **Design Style** | B) General Consulting - 专业咨询风格 |
| **Target Audience** | 电网领域技术人员、管理人员、培训学员 |
| **Use Case** | 电网领域专业培训材料 |
| **Created Date** | 2026-05-14 |

---

## II. Canvas Specification

| Property | Value |
| -------- | ----- |
| **Format** | PPT 16:9 |
| **Dimensions** | 1280×720 |
| **viewBox** | 0 0 1280 720 |
| **Margins** | 左侧/右侧 60px, 顶部/底部 50px |
| **Content Area** | 1160×620 |

---

## III. Visual Theme

### Theme Style

- **Style**: General Consulting - 专业咨询风格
- **Theme**: Light theme (白色背景，蓝色主调)
- **Tone**: Professional, Technical, Innovative

### Color Scheme

| Role | HEX | Purpose |
| ---- | --- | ------- |
| **Background** | `#FFFFFF` | 页面背景 |
| **Secondary bg** | `#F0F8FF` | 卡片背景、章节背景 |
| **Primary** | `#003366` | 标题、重点区域、图标（深蓝色） |
| **Accent** | `#0066CC` | 数据高亮、关键信息（亮蓝色） |
| **Secondary accent** | `#009933` | 正面指标（绿色） |
| **Body text** | `#333333` | 主要正文文本 |
| **Secondary text** | `#666666` | 注释、辅助说明 |
| **Tertiary text** | `#999999` | 补充信息、页脚 |
| **Border/divider** | `#E0E0E0` | 卡片边框、分隔线 |
| **Success** | `#2E7D32` | 正向指标（深绿） |
| **Warning** | `#C62828` | 问题标记（红色） |

### Gradient Scheme

```xml
<!-- 标题渐变 -->
<linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stop-color="#003366"/>
  <stop offset="100%" stop-color="#0066CC"/>
</linearGradient>
```

---

## IV. Typography System

### Font Plan

**Typography direction**: Modern CJK sans - 现代中文无衬线风格

| Role | Chinese | English | Fallback tail |
| ---- | ------- | ------- | ------------- |
| **Title** | `"Microsoft YaHei"` | `Arial` | sans-serif |
| **Body** | `"Microsoft YaHei"` | `Arial` | sans-serif |
| **Emphasis** | `SimHei` | `Arial` | sans-serif |

**Per-role font stacks**:

- **Title**: `"Microsoft YaHei", Arial, sans-serif`
- **Body**: `"Microsoft YaHei", Arial, sans-serif`
- **Emphasis**: `SimHei, "Microsoft YaHei", sans-serif`
- **Code**: `Consolas, "Courier New", monospace`

### Font Size Hierarchy

**Baseline**: Body font size = 18px (信息密集型培训材料)

| Purpose | Ratio to body | Example @ body=18 |
| ------- | ------------- | ----------------- |
| Cover title (hero headline) | 3-4x | 54-72px |
| Chapter / section opener | 2-2.5x | 36-45px |
| Page title | 1.5-2x | 27-36px |
| Subtitle | 1.2-1.5x | 22-27px |
| **Body content** | **1x** | **18px** |
| Annotation / caption | 0.7-0.85x | 13-15px |
| Page number / footnote | 0.5-0.65x | 9-12px |

---

## V. Layout Principles

### Page Structure

- **Header area**: 高度 80px, 包含页面标题
- **Content area**: 高度 520px, 主要内容区域
- **Footer area**: 高度 40px, 页码和版权信息

### Layout Pattern Library

| Pattern | Suitable Scenarios |
| ------- | ----------------- |
| **Single column centered** | 封面、结论、关键要点 |
| **Symmetric split (5:5)** | 对比页面（传统vs新型） |
| **Asymmetric split (3:7 / 2:8)** | 图表+要点、数据+说明 |
| **Top-bottom split** | 流程图、时间线 |
| **Four/four column cards** | 四大特征、四大变革 |
| **Matrix grid (2×2)** | SWOT分析、四象限框架 |
| **Z-pattern / waterfall** | 案例研究、递进展示 |
| **Center-radiating** | 核心理念+周边节点 |
| **Full-bleed + floating text** | 章节过渡页 |

### Spacing Specification

| Element | Recommended Range | Current Project |
| ------- | ---------------- | --------------- |
| Safe margin from canvas edge | 40-60px | 60px |
| Content block gap | 24-40px | 30px |
| Icon-text gap | 8-16px | 12px |
| Card gap | 20-32px | 24px |
| Card padding | 20-32px | 24px |
| Card border radius | 8-16px | 12px |

---

## VI. Icon Usage Specification

### Source

- **Built-in icon library**: `templates/icons/`
- **Usage method**: SVG placeholder `<use data-icon="library/icon-name" .../>`

### Recommended Icon List

| Purpose | Icon Path | Page |
| ------- | --------- | ---- |
| 电源/能源 | `chunk-filled/bolt` | P07-P11 |
| 电网/传输 | `chunk-filled/broadcast` | P12-P18 |
| 用户/负荷 | `chunk-filled/users` | P12-P18 |
| 储能 | `chunk-filled/battery-charging` | P12-P18 |
| 仪表 | `chunk-filled/gauge` | P19-P30 |
| 云计算 | `chunk-filled/cloud` | P26-P27 |
| 数据分析 | `chunk-filled/chart-line-up` | P22-P26 |

---

## VII. Visualization Reference List

Catalog read: 71 templates

| Page | Template | Path | Summary-quote (verbatim from `charts_index.json`) | Usage |
| ---- | -------- | ---- | ------------------------------------------------- | ----- |
| P06 | quadrant_text_bullets | `templates/charts/quadrant_text_bullets.svg` | "Pick for any 2×2 framework where each quadrant holds a titled bullet list" | 四大核心特征展示 |
| P08 | icon_grid | `templates/charts/icon_grid.svg` | "Pick for 4-9 parallel features/capabilities/services as icon cards" | 特征表现形式 |
| P11 | comparison_table | `templates/charts/comparison_table.svg` | "Pick for 2-4 plans/products compared across many feature rows" | 传统vs新型对比 |
| P12 | hub_spoke | `templates/charts/hub_spoke.svg` | "Pick for 1 core capability + 4-8 surrounding capabilities" | 源网荷储架构图 |
| P19 | icon_grid | `templates/charts/icon_grid.svg` | "Pick for 4-9 parallel features/capabilities/services as icon cards" | 计量新定位 |
| P22 | line_chart | `templates/charts/line_chart.svg` | "Pick for 1-3 time-series on a continuous axis showing direction" | 采集时效趋势 |
| P29 | pros_cons_chart | `templates/charts/pros_cons_chart.svg` | "Pick for bilateral pros/cons list, 2-5 items per side" | 挑战与展望 |

**Runners-up considered**:

- `process_flow` | rejected for P12: 不需要流程箭头，需要中心辐射结构
- `vertical_pillars` | rejected for P06: 需要2×2矩阵结构，不是单列展示
- `bullet_chart` | rejected for P22: 需要趋势线，不是目标对比

---

## VIII. Image Resource List

| Filename | Dimensions | Ratio | Purpose | Type | Status | Generation Description |
| -------- | --------- | ----- | ------- | ---- | ------ | --------------------- |
| cover_bg.png | 1280x720 | 1.78 | 封面背景 | Illustration | Pending | 抽象电力网络背景，深蓝色渐变，科技感设计 |
| section_divider.png | 1280x720 | 1.78 | 章节分隔页背景 | Illustration | Pending | 电力设施与数字元素结合，电网主题 |

---

## IX. Content Outline

### Part 1: 新型电力系统的概念 (P01-P05)

#### Slide 01 - 封面

- **Layout**: Full-bleed + floating text (呼吸页)
- **Title**: 新型电力系统建设与计量技术发展
- **Subtitle**: 源网荷储协同 · 智能柔性计量 · 助力双碳目标
- **Info**: 电网领域培训材料 | 2025年

#### Slide 02 - 目录

- **Layout**: Agenda list (章节导航)
- **Title**: 目录
- **Content**:
  - 第一部分：新型电力系统的概念
  - 第二部分：新型电力系统的特征与表现形式
  - 第三部分：源网荷储各环节的变革
  - 第四部分：计量领域的创新与应用

#### Slide 03 - 新型电力系统的定义

- **Layout**: Single column centered + card
- **Title**: 新型电力系统的定义
- **Content**:
  - **官方定义**: 以高比例新能源供给消纳为主线任务
  - **核心要素**: 源网荷储多向协同、坚强智能柔性电网枢纽、技术与机制创新
  - **目标定位**: 新型能源体系核心组成与碳中和关键支撑

#### Slide 04 - 政策背景与发展历程

- **Layout**: Two-column split
- **Title**: 政策背景与发展历程
- **Content**:
  - **国家战略**: 双碳目标、能源安全新战略、构建新型能源体系
  - **最新政策（2025年）**: 《电力系统调节能力优化专项行动实施方案》、《政府工作报告》
  - **投资规模**: 国家电网"十五五"4万亿元，较"十四五"增长40%

#### Slide 05 - 建设新型电力系统的必要性

- **Layout**: Four-column cards (icon_grid)
- **Title**: 建设新型电力系统的必要性
- **Content**:
  - 能源安全保障
  - 清洁低碳转型
  - 经济高质量发展
  - 国际竞争需要

---

### Part 2: 新型电力系统的特征 (P06-P11)

#### Slide 06 - 新型电力系统的核心特征

- **Layout**: Matrix grid (2×2) - quadrant_text_bullets
- **Title**: 新型电力系统的核心特征
- **Content**:
  - 高比例新能源
  - 源网荷储一体化
  - 坚强智能柔性电网
  - 技术与机制创新双轮驱动

#### Slide 07 - 特征一：高比例新能源

- **Layout**: Icon grid
- **Title**: 特征一：高比例新能源（表现形式）
- **Content**:
  - 新能源装机占比超50%，成为电力装机主体
  - 风电、光伏成为主力电源
  - 随机性、波动性、间歇性挑战
  - 案例：西北新能源基地建设

#### Slide 08 - 特征二：源网荷储一体化

- **Layout**: Icon grid
- **Title**: 特征二：源网荷储一体化（表现形式）
- **Content**:
  - 打破传统电力管理的条块分割
  - 多能互补、灵活互动的能源生态体系
  - 建立更加开放、灵活、高效的市场运行机制
  - 以改革释放制度红利

#### Slide 09 - 特征三：坚强智能柔性电网

- **Layout**: Icon grid
- **Title**: 特征三：坚强智能柔性电网（表现形式）
- **Content**:
  - 电网智能化与柔性化改造
  - 支撑高比例新能源就地消纳
  - 多元负荷灵活互动
  - 成为新型电力系统的核心枢纽平台

#### Slide 10 - 特征四：数字与AI赋能

- **Layout**: Icon grid
- **Title**: 特征四：数字与AI赋能（表现形式）
- **Content**:
  - AI技术深度融合（核心产业规模超1.2万亿元）
  - 算力与电力柔性共生
  - 大数据分析与智能决策
  - 物联网技术广泛应用

#### Slide 11 - 传统电力系统与新型电力系统对比

- **Layout**: Comparison table
- **Title**: 传统电力系统与新型电力系统对比
- **Content**:
  | 对比维度 | 传统电力系统 | 新型电力系统 |
  |--------|------------|------------|
  | 电源结构 | 化石能源为主 | 新能源为主（占比超50%）|
  | 电网形态 | 单向输送、刚性 | 智能柔性、双向互动 |
  | 运行模式 | 源随荷动 | 源网荷储协同 |
  | 用户角色 | 被动消费者 | 产销者、主动参与者 |

---

### Part 3: 源网荷储各环节的变革 (P12-P18)

#### Slide 12 - 源网荷储整体变革框架

- **Layout**: Hub-spoke (中心辐射图)
- **Title**: 源网荷储整体变革框架
- **Content**:
  - **中心**: 源网荷储协同运行平台
  - **源侧**: 清洁化、分散化
  - **网侧**: 智能化、柔性化
  - **荷侧**: 主动化、互动化
  - **储侧**: 规模化、多元化

#### Slide 13 - 源侧变革

- **Layout**: Three-column cards
- **Title**: 源侧变革：从化石能源为主到新能源为主
- **Content**:
  - 新能源装机快速增长
  - 分布式电源大规模接入
  - 传统电源转型（灵活性改造）
  - 多能互补系统建设

#### Slide 14 - 网侧变革

- **Layout**: Three-column cards
- **Title**: 网侧变革：从单向输送到智能柔性枢纽
- **Content**:
  - 输配电网智能化升级
  - 微电网与主动配电网
  - 电力电子设备广泛应用
  - 电网调控模式创新

#### Slide 15 - 荷侧变革

- **Layout**: Three-column cards
- **Title**: 荷侧变革：从被动消费到主动参与
- **Content**:
  - 需求响应常态化
  - 柔性负荷比例提升
  - 用户从消费者变为产销者（Prosumer）
  - 多元负荷聚合管理

#### Slide 16 - 储侧变革

- **Layout**: Three-column cards
- **Title**: 储侧变革：从辅助角色到核心调节资源
- **Content**:
  - 储能规模化发展
  - 电化学储能成本持续下降
  - 多种储能技术路线并行
  - 储充一体化应用

#### Slide 17 - 源网荷储协同机制创新

- **Layout**: Process flow
- **Title**: 源网荷储协同机制创新
- **Content**:
  - 协同运行平台建设
  - 市场交易机制完善
  - 价格信号引导
  - 责任主体多元化

#### Slide 18 - 典型实践案例

- **Layout**: Two-column split
- **Title**: 典型实践案例
- **Content**:
  - **源网荷储一体化示范项目**: 多个国家级项目落地，推动多能互补与协同运行
  - **微电网应用场景**: 工业园区、商业区、社区等多种场景，提升供电可靠性与新能源消纳

---

### Part 4: 计量领域的创新与应用 (P19-P30)

#### Slide 19 - 计量在新型电力系统中的新定位

- **Layout**: Icon grid
- **Title**: 计量在新型电力系统中的新定位
- **Content**:
  - 从单一计量向多元服务转型
  - 支撑电力系统安全稳定运行
  - 促进新能源消纳
  - 赋能电力市场建设

#### Slide 20 - 负荷管理

- **Layout**: Three-column cards
- **Title**: 负荷管理：从被动响应到主动管理
- **Content**:
  - **负荷管理新目标**: 保供、消纳、降本
  - **技术支撑**: 智能电表、新一代用电信息采集系统
  - **响应模式与实践**: 分时电价、需求响应，多省市已开展用户侧响应

#### Slide 21 - 虚拟电厂

- **Layout**: Process flow
- **Title**: 虚拟电厂：计量为核心的聚合平台
- **Content**:
  - **概念与价值**: 实现分布式发电、可控负荷和储能系统的有效聚合
  - **计量技术支撑**: 海量数据采集与聚合
  - **关键技术**: 协调控制、信息通信、智能算法
  - **应用场景**: 电力保供、新能源消纳、市场交易

#### Slide 22 - 采集时效提升

- **Layout**: Asymmetric split (chart + text)
- **Title**: 采集时效提升：从日级到实时级
- **Content**:
  - **传统采集**: 日冻结、小时级
  - **新型要求**: 分钟级、秒级采集
  - **技术实现**: 新一代载波技术（500块电表1分钟内抄读）、采集2.0系统
  - **案例**: 国网昌吉供电公司实现采集2.0全量数据接入

#### Slide 23 - 采集精度适应

- **Layout**: Icon grid
- **Title**: 采集精度适应：从通用到场景化
- **Content**:
  - 不同场景的精度需求
  - 新能源发电计量精度提升
  - 充电桩计量精度要求
  - 谐波、不平衡等复杂工况下的计量
  - 最新进展：攻克精准计量关键技术

#### Slide 24 - 柔性采集

- **Layout**: Icon grid
- **Title**: 柔性采集：从固定周期到动态调整
- **Content**:
  - 柔性采集概念
  - 按需采集策略
  - 从单一计量采集向多业务全场景覆盖转型
  - 同步处理窃电检测、能耗分析等附加功能
  - 技术支撑：智能电表、边缘计算

#### Slide 25 - 计量溯源体系创新

- **Layout**: Icon grid
- **Title**: 计量溯源体系创新
- **Content**:
  - 适应新型电力系统的计量溯源体系
  - 融合数据采集、物联网、AI技术的设备状态在线监测
  - 智慧监管模式
  - 案例：全兼容柔性检定流水线投运

#### Slide 26 - 计量数字化转型

- **Layout**: Layered architecture
- **Title**: 计量数字化转型
- **Content**:
  - **采集层**: 智能电表、传感器
  - **传输层**: 5G通信、宽带载波
  - **平台层**: 云计算、边缘计算
  - **应用层**: 负荷管理、虚拟电厂

#### Slide 27 - 关键技术支撑

- **Layout**: Vertical pillars
- **Title**: 关键技术支撑
- **Content**:
  - 新一代通信技术（宽带载波、5G）
  - 物联网技术
  - 边缘计算与云计算
  - 人工智能技术
  - 区块链技术（交易溯源）

#### Slide 28 - 政策与标准

- **Layout**: Agenda list
- **Title**: 政策与标准
- **Content**:
  - 计量相关政策
  - 技术标准体系建设
  - 检测认证体系
  - 市场监管创新

#### Slide 29 - 挑战与展望

- **Layout**: Pros/cons chart (左右对比)
- **Title**: 挑战与展望
- **Content**:
  - **面临挑战**: 技术挑战、管理挑战、市场挑战
  - **未来展望**: 泛在感知、智能互联、价值创造

#### Slide 30 - 总结与致谢

- **Layout**: Full-bleed + floating text
- **Title**: 总结与致谢
- **Content**:
  - 新型电力系统前景广阔
  - 计量技术创新是关键支撑
  - 携手共进，助力双碳目标！
  - 谢谢！

---

## X. Speaker Notes Requirements

- **Filename**: Match SVG name (e.g., `01_cover.md`)
- **Content**: 演讲要点、时长提示、过渡短语
- **Format**: Markdown格式，每页一个文件

---

## XI. Technical Constraints Reminder

### SVG Generation Must Follow:

1. viewBox: `0 0 1280 720`
2. Background uses `<rect>` elements
3. Text wrapping uses `<tspan>` (`<foreignObject>` FORBIDDEN)
4. Transparency uses `fill-opacity` / `stroke-opacity`; `rgba()` FORBIDDEN
5. FORBIDDEN: `mask`, `<style>`, `class`, `foreignObject`
6. FORBIDDEN: `textPath`, `animate*`, `script`
7. Text characters: write typography & symbols as raw Unicode (em dash `—`, en dash `–`, `©`, `®`, `→`, NBSP, etc.); HTML named entities (`&nbsp;`, `&mdash;`, `&copy;`, `&reg;` …) are FORBIDDEN
8. `marker-start` / `marker-end` conditionally allowed: `<marker>` must be in `<defs>`, `orient="auto"`, shape must be triangle / diamond / circle
9. `clipPath` conditionally allowed **only on `<image>` elements**

### PPT Compatibility Rules:

- `<g opacity="...">` FORBIDDEN (group opacity); set on each child element individually
- Image transparency uses overlay mask layer (`<rect fill="bg-color" opacity="0.x"/>`)
- Inline styles only; external CSS and `@font-face` FORBIDDEN
