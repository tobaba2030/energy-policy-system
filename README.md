# 能源政策情报系统

一个基于 AI 大模型技术的能源集团政策情报分析与推演系统，融合双碳目标沙盘推演、动态展示界面与分层分级政研报告体系。

## 功能特点

### 1. 政策情报分析
- **政策数据库**：涵盖国家能源局、发改委、生态环境部等多部门政策文件
- **多维度分析**：政策关键词提取、影响评估矩阵、区域影响雷达图
- **趋势预警**：碳排放趋势预测与政策风险提示

### 2. 3060 双碳沙盘推演
- **情景模拟**：基准情景 / 强化政策 / 激进转型 / 延迟行动 四大推演路径
- **关键指标**：碳达峰年份、碳中和目标、可再生能源占比、经济影响评估
- **可视化**：能源结构演进、碳排放结构、目标进度综合展示
- **时间轴控制**：播放 / 暂停 / 重置，支持自动推演

### 3. 文件管理中心
- **公开渠道采集**：从国家部委、行业协会官网自动采集政策文件
- **内部文件上传**：支持内部研究报告、战略规划的上传与管理
- **智能解析**：AI 提取摘要、关键词、核心指标、元信息
- **密级管理**：机密 / 内部 / 公开 三级管理

### 4. 知识图谱
- 可视化展示能源知识图谱
- 节点类型筛选
- 关联关系展示

### 5. 智能推理
- 基于 AI 大模型的政策推理献策
- 快速提问与对话式分析

### 6. 分层分级政研报告
- 战略层 / 战术层 / 执行层三级报告
- 业务板块影响分析
- 政策业务影响矩阵

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 6
- **路由管理**：React Router 7
- **样式方案**：Tailwind CSS 3
- **图表库**：ECharts 6
- **状态管理**：Zustand
- **图标库**：Lucide React

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 生产构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```
src/
├── components/         # 可复用组件
│   ├── Charts/        # 图表组件
│   └── ...
├── pages/             # 页面组件
│   ├── Home.tsx
│   ├── PolicyIntelligence.tsx
│   ├── CarbonSandbox.tsx
│   ├── FileManagement.tsx
│   ├── KnowledgeGraph.tsx
│   ├── AgentInference.tsx
│   └── PolicyResearch.tsx
├── data/              # 模拟数据
│   ├── policyData.ts
│   └── businessImpactData.ts
├── store/             # 状态管理
│   └── taskStore.ts
├── hooks/             # 自定义 Hooks
│   └── useTheme.ts
├── App.tsx            # 主应用组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 情报信息传递链条

```
公开渠道采集 → 智能解析 → 知识图谱 → 情报分析 → 报告输出 → 决策支撑
    ↑                                                                ↓
    └────────────────────────── 政策反馈 ←──────────────────────────┘
```

## 部署

### Vercel (推荐)

1. Fork 本仓库
2. 访问 [Vercel](https://vercel.com)，使用 GitHub 登录
3. 导入本仓库
4. 保持默认配置，点击 Deploy
5. 完成后即可获得公网访问链接

### 手动部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录并部署
vercel login
vercel --prod
```

## License

MIT
