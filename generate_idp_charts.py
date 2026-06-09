
# -*- coding: utf-8 -*-
"""
生成电网领域AI专项IDP落地执行手册所需的10个专业图表
使用matplotlib生成高质量数据可视化图表
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
output_dir = 'c:/AI学习资料/mesheer/idp_charts'
os.makedirs(output_dir, exist_ok=True)

def save_chart(fig, filename):
    """保存图表"""
    filepath = os.path.join(output_dir, filename)
    fig.savefig(filepath, dpi=150, bbox_inches='tight', facecolor='white', edgecolor='none')
    plt.close(fig)
    print(f'已生成: {filepath}')
    return filepath

# ==================== 图1: AI技术在电网领域应用趋势 ====================
fig, ax = plt.subplots(figsize=(12, 6))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

years = ['2022', '2023', '2024', '2025', '2026', '2027']
ai_applications = {
    '大模型应用': [5, 15, 35, 55, 75, 88],
    '计算机视觉': [20, 35, 50, 65, 78, 85],
    '自然语言处理': [15, 28, 42, 58, 72, 80],
    '强化学习': [8, 18, 30, 45, 60, 72],
}

colors = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF']
markers = ['o', 's', '^', 'D']

for i, (name, values) in enumerate(ai_applications.items()):
    ax.plot(years, values, label=name, color=colors[i], marker=markers[i], linewidth=3, markersize=8)

ax.set_xlabel('年份', fontsize=12, fontweight='bold')
ax.set_ylabel('应用成熟度指数（0-100）', fontsize=12, fontweight='bold')
ax.set_title('AI技术在电网领域应用趋势（2022-2027年预测）', fontsize=14, fontweight='bold', pad=20)
ax.legend(loc='upper left', fontsize=10)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.set_ylim(0, 100)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

save_chart(fig, 'idp_chart01_ai_trend.png')

# ==================== 图2: AI能力建设目标拆解 ====================
fig, ax = plt.subplots(figsize=(10, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

labels = ['效率提升', '人才培养', '体系建设', '项目创新']
sizes = [30, 25, 25, 20]
colors_pie = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF']
explode = (0.05, 0.05, 0, 0)

wedges, texts, autotexts = ax.pie(sizes, explode=explode, labels=labels, colors=colors_pie,
                                    autopct='%1.1f%%', startangle=90, pctdistance=0.85,
                                    wedgeprops=dict(width=0.4, edgecolor='white', linewidth=3))
ax.set_title('AI能力建设四大目标权重分配', fontsize=14, fontweight='bold', pad=20)

# 添加详细说明
descriptions = [
    '效率提升40%以上\n工作流程优化',
    '3-4人成为AI专家\n全员掌握工具',
    '完整知识库建立\n60+提示词模板',
    '3-5个创新应用\n业务价值创造'
]

ax.legend(wedges, descriptions, loc='center left', bbox_to_anchor=(1, 0.5), fontsize=10)
save_chart(fig, 'idp_chart02_goals.png')

# ==================== 图3: 项目执行里程碑甘特图 ====================
fig, ax = plt.subplots(figsize=(14, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

stages = [
    '阶段一：AI启蒙',
    '阶段二：知识库建设',
    '阶段三：模板体系',
    '阶段四：能力提升'
]

start_dates = [0, 2, 4, 6]  # 以周为单位
durations = [2, 3, 3, 11]
colors_gantt = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF']

y_pos = np.arange(len(stages))
for i, (stage, start, duration, color) in enumerate(zip(stages, start_dates, durations, colors_gantt)):
    ax.barh(y_pos[i], duration, left=start, color=color, height=0.6, edgecolor='white', linewidth=2)
    
    # 添加里程碑标记
    milestones = ['AI工具配置', '首批知识库', '60+提示词', '项目上线']
    milestone_pos = start + duration
    ax.scatter(milestone_pos, y_pos[i], color='#E57373', s=100, zorder=5, edgecolor='white', linewidth=2)
    ax.text(milestone_pos + 0.3, y_pos[i], milestones[i], va='center', fontsize=10, color='#E57373', fontweight='bold')

ax.set_yticks(y_pos)
ax.set_yticklabels(stages, fontsize=11)
ax.set_xlabel('时间（周）', fontsize=12, fontweight='bold')
ax.set_title('IDP项目执行里程碑甘特图', fontsize=14, fontweight='bold', pad=20)
ax.set_xlim(0, 18)
ax.grid(axis='x', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

save_chart(fig, 'idp_chart03_gantt.png')

# ==================== 图4: AI工具推荐星级雷达图 ====================
fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

tools = ['Claude 3.5', 'GPT-4o', 'Gamma', 'Notion', 'Cursor']
categories = ['功能丰富度', '易用性', '性价比', '电网适配度', '学习成本']

# 转换学习成本为得分（低=5，中=3，中高=2）
scores = {
    'Claude 3.5': [5, 4, 4, 5, 5],
    'GPT-4o': [5, 4, 3, 4, 5],
    'Gamma': [4, 5, 4, 4, 5],
    'Notion': [4, 3, 4, 3, 3],
    'Cursor': [4, 3, 3, 4, 2]
}

colors_radar = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF', '#C5E5FF']
angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False)

for i, (tool, score) in enumerate(scores.items()):
    values = np.concatenate((score, [score[0]]))
    angles_complete = np.concatenate((angles, [angles[0]]))
    ax.plot(angles_complete, values, label=tool, color=colors_radar[i], linewidth=2, marker='o', markersize=6)
    ax.fill(angles_complete, values, color=colors_radar[i], alpha=0.2)

ax.set_xticks(angles)
ax.set_xticklabels(categories, fontsize=11)
ax.set_ylim(0, 5)
ax.set_title('AI工具推荐星级对比雷达图', fontsize=14, fontweight='bold', pad=20)
ax.legend(loc='upper right', bbox_to_anchor=(1.3, 1.1), fontsize=10)
ax.grid(True, alpha=0.3)

save_chart(fig, 'idp_chart04_radar.png')

# ==================== 图5: 知识库分类结构树图 ====================
fig, ax = plt.subplots(figsize=(12, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 树结构数据
main_categories = ['政策法规库', '技术方向库', '研究机构库', '典型案例库', '文献资料库']
sub_categories = [
    ['国家政策', '行业标准', '申报指南'],
    ['智能电网', '电力市场', '新能源', '设备监测', '调度优化'],
    ['高校院所', '电网企业', '设备厂商'],
    ['成功项目', '申报材料', 'PPT范例'],
    ['中文期刊', '外文期刊']
]
colors_tree = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF', '#C5E5FF']

# 绘制中心
center = plt.Circle((0.5, 0.5), 0.08, color='#00529B', alpha=0.9)
ax.add_patch(center)
ax.text(0.5, 0.5, '电网领域\n知识库', ha='center', va='center', fontsize=11, fontweight='bold', color='white')

# 绘制主分类和子分类
angles = np.linspace(0, 2 * np.pi, len(main_categories), endpoint=False)
for i, (main, subs, color) in enumerate(zip(main_categories, sub_categories, colors_tree)):
    angle = angles[i]
    x = 0.5 + 0.3 * np.cos(angle)
    y = 0.5 + 0.3 * np.sin(angle)
    
    # 主分类节点
    circle = plt.Circle((x, y), 0.06, color=color, alpha=0.9)
    ax.add_patch(circle)
    ax.text(x, y, main, ha='center', va='center', fontsize=10, fontweight='bold', color='white')
    
    # 连接线
    ax.plot([0.5, x], [0.5, y], color=color, linewidth=3, alpha=0.6)
    
    # 子分类
    sub_angles = np.linspace(angle - 0.3, angle + 0.3, len(subs))
    for j, (sub, sub_angle) in enumerate(zip(subs, sub_angles)):
        sx = x + 0.2 * np.cos(sub_angle)
        sy = y + 0.2 * np.sin(sub_angle)
        rect = mpatches.FancyBboxPatch((sx - 0.08, sy - 0.03), 0.16, 0.06, 
                                        boxstyle="round,pad=0.01", facecolor=color, alpha=0.5)
        ax.add_patch(rect)
        ax.text(sx, sy, sub, ha='center', va='center', fontsize=8)
        ax.plot([x, sx], [y, sy], color=color, linewidth=2, alpha=0.4)

ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.set_aspect('equal')
ax.axis('off')
ax.set_title('电网领域知识库分类结构', fontsize=14, fontweight='bold', pad=20)

save_chart(fig, 'idp_chart05_knowledge_tree.png')

# ==================== 图6: 提示词模板效率提升对比 ====================
fig, ax = plt.subplots(figsize=(12, 6))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

template_types = ['申报简表', '申报书', '可研报告', 'PPT制作', '技术报告', '专利申请', '小论文']
efficiency_gains = [60, 50, 45, 55, 40, 35, 40]
colors_bar = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF', '#C5E5FF', '#A5D6A7', '#81C784']

bars = ax.bar(template_types, efficiency_gains, color=colors_bar, width=0.6, edgecolor='white', linewidth=2)
ax.set_ylabel('效率提升（%）', fontsize=12, fontweight='bold')
ax.set_title('各类型提示词模板效率提升对比', fontsize=14, fontweight='bold', pad=20)

for bar, val in zip(bars, efficiency_gains):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 2, f'{val}%',
            ha='center', va='bottom', fontsize=11, fontweight='bold')

ax.set_ylim(0, 70)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3, linestyle='--')

save_chart(fig, 'idp_chart06_efficiency.png')

# ==================== 图7: 三级项目体系金字塔 ====================
fig, ax = plt.subplots(figsize=(10, 10))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

# 金字塔层级
levels = [
    ('Level 3\n业务创新应用', 0.3, '#00529B'),
    ('Level 2\n团队协作工具', 0.5, '#0072BC'),
    ('Level 1\n个人效率工具', 0.7, '#57ABFB')
]

for i, (name, width, color) in enumerate(reversed(levels)):
    y = i * 0.3
    triangle = plt.Polygon([
        (0.5 - width/2, y),
        (0.5 + width/2, y),
        (0.5, y + 0.25)
    ], color=color, alpha=0.8, edgecolor='white', linewidth=2)
    ax.add_patch(triangle)
    ax.text(0.5, y + 0.12, name, ha='center', va='center', fontsize=11, fontweight='bold', color='white')
    
    # 添加说明
    descriptions = [
        '产生可量化业务价值\n6-12个月',
        '团队效率提升15%\n3-5个月',
        '个人效率提升20%\n1-2个月'
    ]
    ax.text(0.5, y - 0.05, descriptions[i], ha='center', va='top', fontsize=9, color='#666')

ax.set_xlim(0, 1)
ax.set_ylim(0, 1)
ax.axis('off')
ax.set_title('三级项目实践体系金字塔', fontsize=14, fontweight='bold', pad=20)

save_chart(fig, 'idp_chart07_pyramid.png')

# ==================== 图8: 重点项目任务分配矩阵 ====================
fig, ax = plt.subplots(figsize=(14, 8))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

team_members = ['张伟', '李明', '王芳', '刘洋', '陈静', '赵强', '周杰', '吴敏', '孙浩', '朱婷']
projects = [
    '政策智能推送助手',
    '术语智能翻译',
    '申报模板系统',
    '文献管理系统',
    '技术创新挖掘',
    '智能评估助手'
]

# 责任分配：3=主导，2=协作，1=参与，0=不参与
responsibility_matrix = [
    [3, 1, 1, 3, 2, 1],
    [2, 1, 1, 3, 2, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 2, 2, 1, 3, 1],
    [1, 1, 1, 1, 3, 1],
    [1, 1, 1, 1, 2, 1],
    [1, 3, 1, 1, 1, 2],
    [1, 3, 1, 1, 1, 1],
    [1, 1, 3, 1, 1, 3],
    [1, 1, 1, 1, 1, 3],
]

# 绘制热力图
im = ax.imshow(responsibility_matrix, cmap='Blues', vmin=0, vmax=3, aspect='auto')

# 设置轴标签
ax.set_xticks(np.arange(len(projects)))
ax.set_yticks(np.arange(len(team_members)))
ax.set_xticklabels(projects, rotation=45, ha='right', fontsize=10)
ax.set_yticklabels(team_members, fontsize=10)

# 添加数值标签
for i in range(len(team_members)):
    for j in range(len(projects)):
        val = responsibility_matrix[i][j]
        text = ax.text(j, i, ['', '参与', '协作', '主导'][val],
                      ha='center', va='center', color='white' if val >= 2 else '#666', fontweight='bold', fontsize=8)

ax.set_title('重点项目团队成员责任分配矩阵', fontsize=14, fontweight='bold', pad=20)
plt.tight_layout()

save_chart(fig, 'idp_chart08_assignment_matrix.png')

# ==================== 图9: 团队能力成熟度演进 ====================
fig, ax = plt.subplots(figsize=(12, 6))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

time_points = ['第1周', '第2月', '第4月', '第6月', '第8月']
maturity_levels = {
    'Level 1：初始级': [100, 60, 30, 10, 0],
    'Level 2：应用级': [0, 40, 50, 30, 10],
    'Level 3：整合级': [0, 0, 20, 50, 60],
    'Level 4：创新级': [0, 0, 0, 10, 30],
}

bottom = np.zeros(len(time_points))
colors_maturity = ['#FFB3B3', '#FFD699', '#B3E5FC', '#C8E6C9']

for i, (level, values) in enumerate(maturity_levels.items()):
    ax.bar(time_points, values, bottom=bottom, label=level, color=colors_maturity[i], edgecolor='white', linewidth=1)
    bottom += np.array(values)

ax.set_ylabel('团队能力分布（%）', fontsize=12, fontweight='bold')
ax.set_title('团队AI能力成熟度演进预测（8个月周期）', fontsize=14, fontweight='bold', pad=20)
ax.legend(loc='upper right', fontsize=10)
ax.set_ylim(0, 110)
ax.grid(axis='y', alpha=0.3, linestyle='--')
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

save_chart(fig, 'idp_chart09_maturity.png')

# ==================== 图10: 团队成员任务负荷分布 ====================
fig, ax = plt.subplots(figsize=(12, 6))
ax.set_facecolor('#f8f9fa')
fig.patch.set_facecolor('white')

workloads = [85, 80, 70, 85, 80, 75, 80, 75, 80, 70]
colors_work = ['#00529B', '#0072BC', '#57ABFB', '#8ECAFF', '#C5E5FF',
               '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047']

bars = ax.bar(team_members, workloads, color=colors_work, width=0.6, edgecolor='white', linewidth=2)
ax.set_ylabel('任务负荷指数（0-100）', fontsize=12, fontweight='bold')
ax.set_title('团队成员任务负荷分布', fontsize=14, fontweight='bold', pad=20)

for bar, val in zip(bars, workloads):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 2, f'{val}',
            ha='center', va='bottom', fontsize=10, fontweight='bold')

# 添加平均负荷线
avg_load = np.mean(workloads)
ax.axhline(y=avg_load, color='#E57373', linestyle='--', linewidth=2, label=f'平均负荷: {avg_load:.1f}')
ax.legend(loc='upper right', fontsize=10)

ax.set_ylim(0, 100)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.grid(axis='y', alpha=0.3, linestyle='--')

save_chart(fig, 'idp_chart10_workload.png')

print('\n' + '='*50)
print('所有IDP图表生成完成！')
print(f'图表保存位置: {output_dir}')
print('='*50)
