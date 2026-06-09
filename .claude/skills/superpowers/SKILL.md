---
name: superpowers
description: "Superpowers 是 Claude Code 的完整软件开发工作流，包含一组可组合的技能，让你的 AI 编程助手更聪明、更可靠、更系统化。覆盖从头脑风暴、设计规划、TDD、代码审查的完整开发流程。"
argument-hint: ""
license: MIT
metadata:
  author: Jesse Vincent
  version: "2.0.0"
---

# Superpowers - Claude Code 超级技能库

Superpowers 是 Claude Code 的完整软件开发工作流，通过一组可组合的技能，让你的 AI 编程助手更聪明、更可靠、更系统化。

## 核心工作流

### 1. brainstorming（头脑风暴）
在编写代码之前启动，通过提问提炼需求，探索替代方案，分节展示设计供你验证，保存设计文档。

### 2. using-git-worktrees（Git 工作树）
设计批准后，在新分支上创建隔离的工作区，运行项目设置，验证干净的测试基线。

### 3. writing-plans（编写计划）
有了批准的设计后，将工作分解为 2-5 分钟的小任务。每个任务都有精确的文件路径、完整的代码、验证步骤。

### 4. subagent-driven-development 或 executing-plans（子代理驱动开发或执行计划）
有了计划后启动，按任务派发给新鲜子代理并两阶段审查（规范合规性，然后代码质量），或批量执行并设置人工检查点。

### 5. test-driven-development（测试驱动开发）
在实施期间启动。强制 RED-GREEN-REFACTOR：编写失败的测试，看着它失败，编写最少的代码，看着它通过，提交。删除在测试前编写的代码。

### 6. requesting-code-review（请求代码审查）
在任务之间启动。根据计划进行审查，按严重程度报告问题。关键问题会阻止进度。

### 7. finishing-a-development-branch（完成开发分支）
任务完成后启动。验证测试，提供选项（合并/PR/保留/丢弃），清理工作树。

## 内置技能库

### 测试
- **test-driven-development** - RED-GREEN-REFACTOR 循环（包括测试反模式参考）

### 调试
- **systematic-debugging** - 4 阶段根本原因流程（包括根本原因追踪、深度防御、基于条件的等待技术）
- **verification-before-completion** - 确保它真的被修复了

### 协作
- **brainstorming** - 苏格拉底式设计提炼
- **writing-plans** - 详细的实施计划
- **executing-plans** - 带检查点的批量执行
- **dispatching-parallel-agents** - 并发子代理工作流
- **requesting-code-review** - 预审查检查清单
- **receiving-code-review** - 响应反馈
- **using-git-worktrees** - 并行开发分支
- **finishing-a-development-branch** - 合并/PR 决策工作流
- **subagent-driven-development** - 两阶段审查的快速迭代（规范合规性，然后代码质量）

### 元技能
- **writing-skills** - 按照最佳实践创建新技能（包括测试方法）
- **using-superpowers** - 技能系统介绍

## 核心理念

- **测试驱动开发** - 始终先写测试
- **系统化而非临时** - 过程优先于猜测
- **降低复杂度** - 简约为主要目标
- **证据而非主张** - 在声明成功前进行验证

## 使用方式

在 Claude Code 中，当你要求：
- "帮我规划这个功能"
- "让我们调试这个问题"
- "我们来写一些代码"

时，Superpowers 会自动触发相关技能。

## 设计原则

每个技能系统在任何任务前都会检查相关技能。这些是强制工作流，不是建议。

1. 先思考，后编码
2. 先规划，后执行
3. 先测试，后实现
4. 先审查，后前进
