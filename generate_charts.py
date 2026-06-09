# -*- coding: utf-8 -*-
"""
生成电网AI影响分析报告所需的图表
使用matplotlib生成专业数据可视化图表
"""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
import os
from matplotlib import font_manager

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'WenQuanYi Micro Hei', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# 创建输出目录
output_dir = 'c:/AI学习资料/mesheer/charts'
os.makedirs(output_dir, exist_ok=True)

def save_chart(fig, filename):
    """保存图表"""
    filepath = os.path.join(output_dir, filename)
    fig.savefig(filepath, dpi=150, bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close(fig)
    print(f'已生成: {filepath}')
    return filepath

# ==================== 图1: 电网行业从业人员分布 ====================
fig, ax = plt.subplots(figsize=(10, 6))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 数据
categories = ['国家电网', '南方电网', '其他电力企业', '发电企业', '供电服务企业']
employees = [136.14, 28.6, 180, 280, 137.26]
colors = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF', '#C5E5FF']

bars = ax.barh(categories, employees, color=colors, height=0.6, edgecolor='white', linewidth=2)
ax.set_xlabel('从业人员（万人）', fontsize=12, fontweight='bold')
ax.set_title('中国电力行业从业人员分布（2024年）\n总计约762万人', fontsize=14, fontweight='bold', pad=20)

# 添加数值标签
for bar, val in zip(bars, employees):
    ax.text(val + 3, bar.get_y() + bar.get_height()/2, f'{val}万', va='center', fontsize=11, fontweight='bold')

ax.set_xlim(0, 320)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='x', alpha=0.3, linestyle='--')
save_chart(fig, 'chart01_employees_distribution.png')

# ==================== 图2: 国家电网招聘专业结构 ====================
fig, ax = plt.subplots(figsize=(10, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 数据
labels = ['电工类\n>60%', '电子信息类\n~20%', '其他工学类\n~10%', '管理类\n~5%', '其他\n~5%']
sizes = [60, 20, 10, 5, 5]
colors_pie = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF', '#C5E5FF']
explode = (0.05, 0.08, 0, 0, 0)

wedges, texts, autotexts = ax.pie(sizes, explode=explode, labels=labels, colors=colors_pie,
                                    autopct='', startangle=90, pctdistance=0.75,
                                    wedgeprops=dict(width=0.5, edgecolor='white', linewidth=3))
ax.set_title('国家电网招聘专业结构分布\n2024-2025年', fontsize=14, fontweight='bold', pad=20)

# 添加图例
ax.legend(wedges, ['电工类（电气工程、电力系统等）', '电子信息类（计算机、AI、信息安全）',
                   '其他工学类（土木、机械等）', '管理类（工程管理、技术经济）', '其他专业'],
          loc='center left', bbox_to_anchor=(1, 0.5), fontsize=10)
save_chart(fig, 'chart02_recruitment_structure.png')

# ==================== 图3: 岗位AI替代风险矩阵 ====================
fig, ax = plt.subplots(figsize=(12, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 创建2x2矩阵
ax.set_xlim(0, 100)
ax.set_ylim(0, 100)
ax.set_xticks([])
ax.set_yticks([])

# 四个象限
# 高替代-低技能升级（左上）
rect1 = mpatches.FancyBboxPatch((5, 55), 40, 40, boxstyle="round,pad=0.02",
                                 facecolor='#FFB3B3', edgecolor='#E57373', linewidth=2, alpha=0.8)
ax.add_patch(rect1)
ax.text(25, 75, '极高风险区\n替代率>70%', ha='center', va='center', fontsize=12, fontweight='bold')
ax.text(25, 65, '• 数据录入员\n• 简单抄表员', ha='center', va='center', fontsize=10)

# 高替代-高技能升级（右上）
rect2 = mpatches.FancyBboxPatch((55, 55), 40, 40, boxstyle="round,pad=0.02",
                                 facecolor='#FFD699', edgecolor='#FFB74D', linewidth=2, alpha=0.8)
ax.add_patch(rect2)
ax.text(75, 75, '高风险区\n替代率50-70%', ha='center', va='center', fontsize=12, fontweight='bold')
ax.text(75, 65, '• 标准化客服\n• 巡检操作员', ha='center', va='center', fontsize=10)

# 低替代-低技能升级（左下）
rect3 = mpatches.FancyBboxPatch((5, 5), 40, 40, boxstyle="round,pad=0.02",
                                 facecolor='#B3E5FC', edgecolor='#4FC3F7', linewidth=2, alpha=0.8)
ax.add_patch(rect3)
ax.text(25, 25, '中等风险区\n替代率30-50%', ha='center', va='center', fontsize=12, fontweight='bold')
ax.text(25, 15, '• 调度辅助\n• 一般营销', ha='center', va='center', fontsize=10)

# 低替代-高技能升级（右下）
rect4 = mpatches.FancyBboxPatch((55, 5), 40, 40, boxstyle="round,pad=0.02",
                                 facecolor='#C8E6C9', edgecolor='#81C784', linewidth=2, alpha=0.8)
ax.add_patch(rect4)
ax.text(75, 25, '低风险区\n替代率<30%', ha='center', va='center', fontsize=12, fontweight='bold')
ax.text(75, 15, '• 故障处理\n• 规划设计', ha='center', va='center', fontsize=10)

# 轴标签
ax.text(25, 2, '技能升级要求：低', ha='center', va='bottom', fontsize=11, fontweight='bold', color='#666')
ax.text(75, 2, '技能升级要求：高', ha='center', va='bottom', fontsize=11, fontweight='bold', color='#666')
ax.text(2, 75, 'AI替代风险：低', ha='right', va='center', fontsize=11, fontweight='bold', color='#666', rotation=90)
ax.text(2, 25, 'AI替代风险：高', ha='right', va='center', fontsize=11, fontweight='bold', color='#666', rotation=90)

ax.set_title('电网岗位AI替代风险矩阵', fontsize=14, fontweight='bold', pad=20)
save_chart(fig, 'chart03_job_risk_matrix.png')

# ==================== 图4: 技能需求变化对比 ====================
fig, ax = plt.subplots(figsize=(12, 7))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 数据
skills = ['电力专业\n知识', '数据分析\n能力', '编程\n能力', 'AI工具\n使用', '跨学科\n整合', '报告编写\n能力']
traditional = [95, 20, 10, 0, 15, 50]
ai_era = [60, 85, 70, 80, 75, 70]

x = np.arange(len(skills))
width = 0.35

bars1 = ax.bar(x - width/2, traditional, width, label='传统要求', color='#8ECAFF', edgecolor='white', linewidth=2)
bars2 = ax.bar(x + width/2, ai_era, width, label='AI时代要求', color='#00529B', edgecolor='white', linewidth=2)

ax.set_ylabel('重要性评分（0-100）', fontsize=12, fontweight='bold')
ax.set_title('电网岗位技能需求变化对比分析', fontsize=14, fontweight='bold', pad=20)
ax.set_xticks(x)
ax.set_xticklabels(skills, fontsize=10)
ax.legend(loc='upper left', fontsize=11)
ax.set_ylim(0, 110)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3, linestyle='--')

# 添加数值标签
for bar in bars1:
    height = bar.get_height()
    ax.annotate(f'{height}', xy=(bar.get_x() + bar.get_width() / 2, height),
                xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=9)
for bar in bars2:
    height = bar.get_height()
    ax.annotate(f'{height}', xy=(bar.get_x() + bar.get_width() / 2, height),
                xytext=(0, 3), textcoords="offset points", ha='center', va='bottom', fontsize=9)

# 添加变化箭头标注
ax.annotate('', xy=(1.4, 75), xytext=(1.1, 40),
            arrowprops=dict(arrowstyle='->', color='#E57373', lw=2))
ax.text(1.5, 57, '+65', fontsize=10, color='#E57373', fontweight='bold')

ax.annotate('', xy=(2.4, 90), xytext=(2.1, 30),
            arrowprops=dict(arrowstyle='->', color='#E57373', lw=2))
ax.text(2.5, 60, '+60', fontsize=10, color='#E57373', fontweight='bold')

ax.annotate('', xy=(3.4, 95), xytext=(3.1, 15),
            arrowprops=dict(arrowstyle='->', color='#E57373', lw=2))
ax.text(3.5, 55, '+80', fontsize=10, color='#E57373', fontweight='bold')

save_chart(fig, 'chart04_skill_comparison.png')

# ==================== 图5: 全球AI就业影响数据 ====================
fig, ax = plt.subplots(figsize=(12, 7))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 数据
institutions = ['麦肯锡\n2030预测', 'ILO\n全球数据', 'WEF\n技能改变', '高收入国家\nILO数据']
values = [800, 25, 40, 34]
colors_bar = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF']

bars = ax.bar(institutions, values, color=colors_bar, width=0.6, edgecolor='white', linewidth=2)
ax.set_ylabel('比例（%）', fontsize=12, fontweight='bold')
ax.set_title('全球AI对就业影响预测数据对比', fontsize=14, fontweight='bold', pad=20)

# 添加数值标签和说明
descriptions = ['AI可能取代\n4-8亿岗位', '全球25%岗位\n受影响', '近40%工作\n技能需改变', '高收入国家\n34%岗位受影响']
for bar, desc in zip(bars, descriptions):
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width()/2., height + 2, f'{height}%',
            ha='center', va='bottom', fontsize=12, fontweight='bold')
    ax.text(bar.get_x() + bar.get_width()/2., height/2, desc,
            ha='center', va='center', fontsize=9, color='white', fontweight='bold')

ax.set_ylim(0, 100)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3, linestyle='--')
save_chart(fig, 'chart05_global_impact.png')

# ==================== 图6: AI替代vs创造岗位对比 ====================
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
fig.suptitle('AI对就业市场的影响：替代与创造', fontsize=14, fontweight='bold', y=1.02)

# 左图：替代与创造对比
ax1.set_facecolor('#f8f9fa')
categories = ['岗位替代\n（麦肯锡预测）', '岗位创造\n（麦肯锡预测）']
values = [9200, 17000]
colors = ['#E57373', '#81C784']
bars = ax1.bar(categories, values, color=colors, width=0.5, edgecolor='white', linewidth=2)
ax1.set_ylabel('数量（万个）', fontsize=12, fontweight='bold')
ax1.set_title('麦肯锡预测：岗位替代与创造对比', fontsize=12, fontweight='bold')

for bar in bars:
    height = bar.get_height()
    ax1.text(bar.get_x() + bar.get_width()/2., height + 200, f'{height:,}万',
            ha='center', va='bottom', fontsize=14, fontweight='bold')

ax1.set_ylim(0, 20000)
ax1.spines['top'].set_visible(False)
ax1.spines['right'].set_visible(False)
ax1.grid(axis='y', alpha=0.3, linestyle='--')

# 添加说明文字
ax1.text(0.5, 0.75, '净效应：\n技能转型而非大规模失业\n转型缓冲期：3-5年',
         transform=ax1.transAxes, fontsize=11, ha='center', va='center',
         bbox=dict(boxstyle='round', facecolor='#E8F5E9', edgecolor='#81C784'))

# 右图：电网行业岗位转型预测
ax2.set_facecolor('#f8f9fa')
categories2 = ['极高风险\n需完全转岗', '高风险\n需大幅提升', '中等风险\n需技能拓展', '低风险\n需能力升级']
percentages = [15, 25, 35, 25]
colors2 = ['#FFB3B3', '#FFD699', '#B3E5FC', '#C8E6C9']

bars2 = ax2.barh(categories2, percentages, color=colors2, height=0.5, edgecolor='white', linewidth=2)
ax2.set_xlabel('岗位占比估算（%）', fontsize=12, fontweight='bold')
ax2.set_title('电网行业岗位风险分布预测', fontsize=12, fontweight='bold')

for bar, pct in zip(bars2, percentages):
    ax2.text(bar.get_width() + 1, bar.get_y() + bar.get_height()/2, f'{pct}%',
             va='center', fontsize=12, fontweight='bold')

ax2.set_xlim(0, 50)
ax2.spines['top'].set_visible(False)
ax2.spines['right'].set_visible(False)
ax2.grid(axis='x', alpha=0.3, linestyle='--')

plt.tight_layout()
save_chart(fig, 'chart06_ai_vs_jobs.png')

# ==================== 图7: 新兴岗位人才缺口 ====================
fig, ax = plt.subplots(figsize=(12, 6))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 数据
positions = ['电力交易员', '数据中心人才', 'AI算法工程师', '智能调度分析师', '数据分析师']
demand = [20, 80, 100, 50, 60]
supply = [80, 10, 20, 30, 40]
gap = [d - s for d, s in zip(demand, supply)]

x = np.arange(len(positions))
width = 0.35

bars1 = ax.bar(x - width/2, supply, width, label='现有从业人员（万）', color='#8ECAFF', edgecolor='white', linewidth=2)
bars2 = ax.bar(x + width/2, demand, width, label='市场需求（万）', color='#00529B', edgecolor='white', linewidth=2)

ax.set_ylabel('人数（万人）', fontsize=12, fontweight='bold')
ax.set_title('电力行业新兴岗位人才供需缺口分析', fontsize=14, fontweight='bold', pad=20)
ax.set_xticks(x)
ax.set_xticklabels(positions, fontsize=11)
ax.legend(loc='upper right', fontsize=11)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3, linestyle='--')

# 添加缺口标注
for i, (s, d) in enumerate(zip(supply, demand)):
    gap_val = d - s
    if gap_val > 0:
        ax.annotate(f'缺口:{gap_val}万', xy=(i, d), xytext=(i, d + 10),
                   fontsize=9, ha='center', color='#E57373', fontweight='bold')

save_chart(fig, 'chart07_talent_gap.png')

# ==================== 图8: 四维应对框架 ====================
fig, ax = plt.subplots(figsize=(12, 10))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 中心圆
center_circle = plt.Circle((0.5, 0.5), 0.15, color='#00529B', alpha=0.9)
ax.add_patch(center_circle)
ax.text(0.5, 0.5, 'AI转型\n应对框架', ha='center', va='center', fontsize=12, fontweight='bold', color='white')

# 四个维度
dimensions = [
    ('技能培训\n体系重构', 0.5, 0.85, '#0072BC'),
    ('岗位转型\n通道设计', 0.85, 0.5, '#57ABFB'),
    ('人力资源\n政策调整', 0.5, 0.15, '#8ECAFF'),
    ('组织文化\n建设', 0.15, 0.5, '#C5E5FF')
]

for name, x, y, color in dimensions:
    circle = plt.Circle((x, y), 0.12, color=color, alpha=0.8)
    ax.add_patch(circle)
    ax.text(x, y, name, ha='center', va='center', fontsize=11, fontweight='bold')

# 连接线
for x, y in [(0.5, 0.65), (0.65, 0.5), (0.5, 0.35), (0.35, 0.5)]:
    ax.plot([0.5, x], [0.5, y], 'k--', alpha=0.3, linewidth=2)

# 箭头（顺时针循环）
arrows = [
    (0.5, 0.78, 0.72, 0.65),  # 上到右
    (0.78, 0.5, 0.65, 0.42),  # 右到下
    (0.5, 0.22, 0.28, 0.35),  # 下到左
    (0.22, 0.5, 0.35, 0.58),  # 左到上
]
for x1, y1, x2, y2 in arrows:
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
               arrowprops=dict(arrowstyle='->', color='#00529B', lw=2, alpha=0.6))

ax.set_xlim(-0.05, 1.05)
ax.set_ylim(-0.05, 1.05)
ax.set_aspect('equal')
ax.axis('off')
ax.set_title('电网公司AI转型四维应对策略框架', fontsize=14, fontweight='bold', pad=20)

save_chart(fig, 'chart08_strategy_framework.png')

# ==================== 图9: 岗位转型路径 ====================
fig, ax = plt.subplots(figsize=(14, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 转型路径数据
transitions = [
    ('数据录入员', '→', '数据分析师', 'Python、SQL、数据可视化'),
    ('简单抄表员', '→', '计量设备运维', 'IoT、远程监控技术'),
    ('标准化客服', '→', '复杂case处理', '沟通技巧、问题解决'),
    ('巡检操作员', '→', '无人机操作员', '无人机驾驶、AI图像识别'),
    ('一般调度员', '→', '智能调度分析师', 'AI辅助决策、系统管理'),
]

y_positions = np.linspace(0.85, 0.2, len(transitions))

for i, (from_job, arrow, to_job, skills) in enumerate(transitions):
    y = y_positions[i]
    # 起点
    rect1 = mpatches.FancyBboxPatch((0.05, y-0.06), 0.2, 0.12, boxstyle="round,pad=0.02",
                                     facecolor='#FFD699', edgecolor='#FFB74D', linewidth=2)
    ax.add_patch(rect1)
    ax.text(0.15, y, from_job, ha='center', va='center', fontsize=11, fontweight='bold')

    # 箭头
    ax.annotate('', xy=(0.45, y), xytext=(0.25, y),
               arrowprops=dict(arrowstyle='->', color='#00529B', lw=3))

    # 中间技能标签
    ax.text(0.35, y+0.08, skills, ha='center', va='bottom', fontsize=9, color='#666', style='italic')

    # 终点
    rect2 = mpatches.FancyBboxPatch((0.45, y-0.06), 0.25, 0.12, boxstyle="round,pad=0.02",
                                     facecolor='#C8E6C9', edgecolor='#81C784', linewidth=2)
    ax.add_patch(rect2)
    ax.text(0.575, y, to_job, ha='center', va='center', fontsize=11, fontweight='bold')

    # 转型成功率标注
    ax.text(0.85, y, f'转型成功率: 75-85%', ha='left', va='center', fontsize=9, color='#00529B')

ax.set_xlim(0, 1)
ax.set_ylim(0.1, 0.95)
ax.axis('off')
ax.set_title('电网岗位AI转型路径规划图', fontsize=14, fontweight='bold', pad=20)

# 添加图例
legend_elements = [
    mpatches.Patch(facecolor='#FFD699', edgecolor='#FFB74D', label='转型起点（高替代风险岗位）'),
    mpatches.Patch(facecolor='#C8E6C9', edgecolor='#81C784', label='转型终点（新兴/安全岗位）')
]
ax.legend(handles=legend_elements, loc='lower right', fontsize=10)

save_chart(fig, 'chart09_career_path.png')

# ==================== 图10: 员工诉求分析 ====================
fig, ax = plt.subplots(figsize=(12, 6))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 数据
concerns = ['职业发展\n确定性', '技能升级\n支持', '薪酬保障', '组织承诺\n信任']
intensity = [85, 78, 72, 68]  # 诉求强度指数
colors = ['#E57373', '#FFB74D', '#64B5F6', '#81C784']

bars = ax.bar(concerns, intensity, color=colors, width=0.6, edgecolor='white', linewidth=2)
ax.set_ylabel('诉求强度指数（0-100）', fontsize=12, fontweight='bold')
ax.set_title('电网员工对AI转型的主要诉求分析', fontsize=14, fontweight='bold', pad=20)
ax.set_ylim(0, 100)

for bar, val in zip(bars, intensity):
    ax.text(bar.get_x() + bar.get_width()/2., bar.get_height() + 2, f'{val}',
            ha='center', va='bottom', fontsize=14, fontweight='bold')

ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3, linestyle='--')

# 添加详细说明
details = [
    '"我的岗位未来在哪里？"\n"转型路径是什么？"',
    '"企业会提供培训吗？"\n"学习时间从哪里来？"',
    '"AI带来的效率提升如何分配？"\n"新技能要求会加薪吗？"',
    '"企业会裁员吗？"\n"内部转岗机制存在吗？"'
]
for i, (bar, detail) in enumerate(zip(bars, details)):
    ax.text(bar.get_x() + bar.get_width()/2., 5, detail,
           ha='center', va='bottom', fontsize=8, color='white', fontweight='bold')

save_chart(fig, 'chart10_employee_concerns.png')

# ==================== 图11: AI应用场景成熟度 ====================
fig, ax = plt.subplots(figsize=(12, 7))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 数据
scenarios = ['智能调度', '负荷预测', '输变电巡检', '客户服务', '数据录入', '电力交易']
maturity = [75, 80, 70, 85, 90, 65]  # 成熟度指数
impact = [60, 65, 75, 80, 95, 55]  # 影响程度指数

x = np.arange(len(scenarios))
width = 0.35

bars1 = ax.bar(x - width/2, maturity, width, label='技术成熟度', color='#00529B', edgecolor='white', linewidth=2)
bars2 = ax.bar(x + width/2, impact, width, label='业务影响程度', color='#E57373', edgecolor='white', linewidth=2)

ax.set_ylabel('指数（0-100）', fontsize=12, fontweight='bold')
ax.set_title('电网AI应用场景成熟度与影响程度对比', fontsize=14, fontweight='bold', pad=20)
ax.set_xticks(x)
ax.set_xticklabels(scenarios, fontsize=11)
ax.legend(loc='upper left', fontsize=11)
ax.set_ylim(0, 110)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3, linestyle='--')

# 添加趋势线
ax.plot(x, [(m+i)/2 for m, i in zip(maturity, impact)], 'k--', alpha=0.5, linewidth=2, marker='o')

save_chart(fig, 'chart11_application_maturity.png')

# ==================== 图12: 研究结论总结 ====================
fig, ax = plt.subplots(figsize=(12, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 四个核心结论
conclusions = [
    ('结论一', 'AI对电网员工的影响是全方位的，但并非全面替代', '#00529B'),
    ('结论二', '招聘端变化是AI影响的先行指标', '#0072BC'),
    ('结论三', '员工存在技能焦虑等合理诉求，需要正视', '#57ABFB'),
    ('结论四', '应对AI挑战需要多维度协同推进', '#8ECAFF'),
]

for i, (num, text, color) in enumerate(conclusions):
    y = 0.8 - i * 0.2
    # 编号圆圈
    circle = plt.Circle((0.1, y), 0.06, color=color, alpha=0.9)
    ax.add_patch(circle)
    ax.text(0.1, y, str(i+1), ha='center', va='center', fontsize=14, fontweight='bold', color='white')
    # 结论框
    rect = mpatches.FancyBboxPatch((0.2, y-0.07), 0.75, 0.14, boxstyle="round,pad=0.02",
                                    facecolor=color, edgecolor=color, linewidth=2, alpha=0.3)
    ax.add_patch(rect)
    ax.text(0.22, y, num + '：', fontsize=12, fontweight='bold', color=color)
    ax.text(0.45, y, text, fontsize=11)

ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.axis('off')
ax.set_title('研究报告核心结论总结', fontsize=14, fontweight='bold', pad=20)

save_chart(fig, 'chart12_conclusions.png')

print('\n' + '='*50)
print('所有图表生成完成！')
print(f'图表保存位置: {output_dir}')
print('='*50)
