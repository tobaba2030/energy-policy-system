# -*- coding: utf-8 -*-
"""
生成中核集团电算协同智库报告的可视化图表
"""
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
from matplotlib.patches import FancyBboxPatch, Circle, FancyArrowPatch
import matplotlib.patches as mpatches

matplotlib.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'SimSun']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['font.family'] = 'sans-serif'

def generate_table1_chart():
    """生成表1：2025-2030年算力与电力协同核心指标预测"""
    years = ['2025年', '2026E', '2027E', '2028E', '2029E', '2030E']
    
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('表1 2025-2030年算力与电力协同核心指标预测', fontsize=18, fontweight='bold', y=1.02)
    
    # 子图1：全球数据中心耗电量
    ax1 = axes[0, 0]
    global_twh = [485, 600, 720, 850, 920, 950]
    bars1 = ax1.bar(years, global_twh, color='#1f77b4', alpha=0.8, edgecolor='navy')
    ax1.set_ylabel('TWh', fontsize=12)
    ax1.set_title('全球数据中心耗电量', fontsize=14, fontweight='bold')
    ax1.grid(True, alpha=0.3, axis='y')
    for bar, val in zip(bars1, global_twh):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 15, 
                f'{val}', ha='center', va='bottom', fontsize=10, fontweight='bold')
    ax1.set_ylim(0, 1100)
    
    # 子图2：中国数据中心耗电量
    ax2 = axes[0, 1]
    china_kwh = [1960, 2500, 3200, 4000, 5000, 5500]
    bars2 = ax2.bar(years, china_kwh, color='#ff7f0e', alpha=0.8, edgecolor='darkorange')
    ax2.set_ylabel('亿千瓦时', fontsize=12)
    ax2.set_title('中国数据中心耗电量', fontsize=14, fontweight='bold')
    ax2.grid(True, alpha=0.3, axis='y')
    for bar, val in zip(bars2, china_kwh):
        ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 80, 
                f'{val}', ha='center', va='bottom', fontsize=10, fontweight='bold')
    ax2.set_ylim(0, 6500)
    
    # 子图3：占全社会用电比重
    ax3 = axes[1, 0]
    usage_ratio = [1.89, 2.5, 3.0, 3.5, 4.5, 5.5]
    bars3 = ax3.bar(years, usage_ratio, color='#2ca02c', alpha=0.8, edgecolor='darkgreen')
    ax3.set_ylabel('%', fontsize=12)
    ax3.set_title('占全社会用电比重', fontsize=14, fontweight='bold')
    ax3.grid(True, alpha=0.3, axis='y')
    for bar, val in zip(bars3, usage_ratio):
        ax3.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1, 
                f'{val}%', ha='center', va='bottom', fontsize=10, fontweight='bold')
    ax3.set_ylim(0, 7)
    
    # 子图4：碳配额均价与绿色算力溢价
    ax4 = axes[1, 1]
    carbon_price = [110, 125, 140, 155, 170, 185]
    green_premium = [5, 5, 8, 10, 12, 15]
    x = np.arange(len(years))
    width = 0.35
    bars4a = ax4.bar(x - width/2, carbon_price, width, label='碳配额均价（元/吨）', color='#d62728', alpha=0.8)
    bars4b = ax4.bar(x + width/2, green_premium, width, label='绿色算力溢价（%）', color='#9467bd', alpha=0.8)
    ax4.set_ylabel('数值', fontsize=12)
    ax4.set_title('碳配额均价与绿色算力溢价', fontsize=14, fontweight='bold')
    ax4.set_xticks(x)
    ax4.set_xticklabels(years)
    ax4.legend(loc='upper left')
    ax4.grid(True, alpha=0.3, axis='y')
    
    plt.tight_layout()
    plt.savefig('viz_table1_indicators.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：表1 2025-2030年算力与电力协同核心指标预测")

def generate_figure1_map():
    """生成图1：中国算力枢纽节点与中核布局对照图"""
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 60)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # 标题
    ax.text(50, 58, '图1 中国算力枢纽节点与中核布局对照图', fontsize=18, 
             fontweight='bold', ha='center', va='top')
    
    # 定义节点位置和颜色
    nodes = {
        '京津冀': (20, 45, '#FF6B6B', '算力需求最大\n火电为主'),
        '长三角': (50, 45, '#4ECDC4', 'AI算力聚集\n★秦山核电'),
        '成渝': (35, 35, '#95E1D3', '新型算力崛起'),
        '粤港澳': (60, 35, '#F38181', '智算中心密集\n★大亚湾核电'),
        '贵州': (25, 20, '#AA96DA', '清洁能源丰富'),
        '甘肃': (45, 15, '#FCBAD3', '新能源富集'),
        '内蒙古': (15, 25, '#A8D8EA', '能源基地'),
        '宁夏': (55, 20, '#FFD93D', '绿电直供'),
    }
    
    # 绘制节点
    for name, (x, y, color, desc) in nodes.items():
        circle = Circle((x, y), 5, facecolor=color, edgecolor='black', linewidth=2, alpha=0.8)
        ax.add_patch(circle)
        ax.text(x, y, name, ha='center', va='center', fontsize=11, fontweight='bold')
        ax.text(x, y-7, desc, ha='center', va='top', fontsize=9, style='italic')
    
    # 绘制连接线
    connections = [
        ('京津冀', '长三角'), ('长三角', '成渝'), ('成渝', '粤港澳'),
        ('成渝', '贵州'), ('贵州', '内蒙古'), ('内蒙古', '京津冀'),
        ('甘肃', '宁夏'), ('粤港澳', '宁夏')
    ]
    for n1, n2 in connections:
        x1, y1, _, _ = nodes[n1]
        x2, y2, _, _ = nodes[n2]
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                   arrowprops=dict(arrowstyle='->', color='gray', lw=1, alpha=0.5))
    
    # 添加图例
    legend_elements = [
        mpatches.Patch(color='#4ECDC4', label='东部枢纽（核电基地）'),
        mpatches.Patch(color='#AA96DA', label='西部枢纽（清洁能源）'),
        mpatches.Patch(color='#FFD93D', label='可联动枢纽'),
    ]
    ax.legend(handles=legend_elements, loc='lower right', fontsize=11)
    
    # 添加中核布局说明
    box_text = '''★ 中核集团核心布局：
   秦山（长三角）、大亚湾（粤港澳）
   福清（东南）、田湾（江苏）

★ 中核集团协同布局：
   内蒙古、宁夏、甘肃等西部基地'''
    props = dict(boxstyle='round,pad=0.5', facecolor='lightyellow', alpha=0.8, edgecolor='orange')
    ax.text(2, 8, box_text, fontsize=10, verticalalignment='center', bbox=props, family='monospace')
    
    plt.tight_layout()
    plt.savefig('viz_figure1_hub_map.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：图1 中国算力枢纽节点与中核布局对照图")

def generate_table2_policy():
    """生成表2：2026-2030年政策演进仿真推演"""
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.axis('off')
    
    ax.text(0.5, 0.98, '表2 2026-2030年政策演进仿真推演', fontsize=18, 
             fontweight='bold', ha='center', va='top', transform=ax.transAxes)
    
    data = [
        ['时间', '政策预判', '核心内容', '战略影响'],
        ['2026年', '绿色算力国家标准', '建立全国统一的绿色算力认证标准和碳足迹核算方法', '行业门槛明确，核电零碳优势凸显'],
        ['2027年', '算力参与辅助\n服务市场', '出台算力负荷参与调峰、调频等辅助服务的配套政策', '算力负荷从用电向调节资源转变'],
        ['2028年', '数据中心碳\n排放要求', '出台数据中心碳排放配额管理办法', '碳排放成本内部化，绿色溢价扩大'],
        ['2029年', '东数西算深化', '完善国家级算力枢纽体系，建立算力调度平台', '东西部协同机制成熟'],
        ['2030年', '算电协同\n生态成型', '形成完整的绿色算力供给体系和市场机制', '行业格局定型，先入者占据优势'],
    ]
    
    table = ax.table(cellText=data[1:], colLabels=data[0],
                     cellLoc='center', loc='center',
                     colWidths=[0.1, 0.2, 0.4, 0.3])
    
    table.auto_set_font_size(False)
    table.set_fontsize(11)
    table.scale(1.2, 2.5)
    
    # 设置表头样式
    for i in range(4):
        table[(0, i)].set_facecolor('#4472C4')
        table[(0, i)].set_text_props(color='white', fontweight='bold')
    
    # 设置交替行颜色
    for i in range(1, 6):
        for j in range(4):
            if i % 2 == 0:
                table[(i, j)].set_facecolor('#E6F2FF')
            else:
                table[(i, j)].set_facecolor('#FFFFFF')
    
    plt.tight_layout()
    plt.savefig('viz_table2_policy.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：表2 2026-2030年政策演进仿真推演")

def generate_figure2_five_force():
    """生成图2：源网荷储算五力协同节点布局图"""
    fig, ax = plt.subplots(figsize=(16, 12))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 80)
    ax.set_aspect('equal')
    ax.axis('off')
    
    ax.text(50, 78, '图2 源网荷储算五力协同节点布局图', fontsize=18, 
             fontweight='bold', ha='center', va='top')
    
    # 中心：调度指挥中心
    center_circle = Circle((50, 55), 8, facecolor='#4472C4', edgecolor='navy', linewidth=3)
    ax.add_patch(center_circle)
    ax.text(50, 55, '国家级调度\n指挥中心\n(源网荷储算脑)', ha='center', va='center', 
             fontsize=10, fontweight='bold', color='white')
    
    # 五力节点
    forces = {
        '源侧\n(电源)': (15, 40, '#FF6B6B', ['核电基地', '新能源电站']),
        '网侧\n(电网)': (50, 75, '#4ECDC4', ['智能调度', '电力市场']),
        '荷侧\n(负荷)': (85, 40, '#FFD93D', ['智算中心', '超算中心']),
        '储侧\n(储能)': (85, 15, '#AA96DA', ['电化学储能', '抽水蓄能']),
        '算侧\n(算力)': (15, 15, '#F38181', ['绿色算力', '碳认证']),
    }
    
    for name, (x, y, color, items) in forces.items():
        circle = Circle((x, y), 7, facecolor=color, edgecolor='black', linewidth=2, alpha=0.8)
        ax.add_patch(circle)
        ax.text(x, y, name, ha='center', va='center', fontsize=11, fontweight='bold')
        
        # 添加子项
        for i, item in enumerate(items):
            ax.text(x+9, y-3+i*4, f'• {item}', fontsize=9, ha='left', va='center')
        
        # 绘制连接线
        ax.annotate('', xy=(50, 55), xytext=(x, y),
                   arrowprops=dict(arrowstyle='->', color='gray', lw=2))
    
    # 中核战略定位框
    box = FancyBboxPatch((30, 3), 40, 8, boxstyle="round,pad=0.1", 
                         facecolor='#E6F2FF', edgecolor='#4472C4', linewidth=2)
    ax.add_patch(box)
    ax.text(50, 7, '中核集团战略定位', ha='center', va='center', fontsize=12, fontweight='bold')
    ax.text(50, 4, '核电算力绿心 + 新能源算力西基地 + 绿电算力东枢纽', 
             ha='center', va='center', fontsize=10)
    
    plt.tight_layout()
    plt.savefig('viz_figure2_five_force.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：图2 源网荷储算五力协同节点布局图")

def generate_figure4_tech_roadmap():
    """生成图4：2026-2030年前瞻性技术发展路线图"""
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.axis('off')
    
    ax.text(0.5, 0.98, '图4 2026-2030年前瞻性技术发展路线图', fontsize=18, 
             fontweight='bold', ha='center', va='top', transform=ax.transAxes)
    
    # 时间轴
    years = ['2026年', '2027年', '2028年', '2030年']
    x_positions = [0.15, 0.4, 0.65, 0.9]
    
    for x, year in zip(x_positions, years):
        ax.plot([x, x], [0.15, 0.85], 'k-', linewidth=2, transform=ax.transAxes)
        ax.text(x, 0.9, year, fontsize=14, fontweight='bold', ha='center', transform=ax.transAxes)
    
    # 技术节点
    tech_data = [
        ('数字孪生', '#1f77b4', ['• 规模化应用', '• 5基地覆盖']),
        ('电力大模型', '#ff7f0e', ['• 发布1.0版本', '• 诊断准确率85%']),
        ('碳能算一体化', '#2ca02c', ['• 平台启动', '• 标准制定']),
        ('源网荷储算脑', '#d62728', ['• 试点上线', '• 协同调度']),
        ('具身智能', '#9467bd', ['• 安全突破', '• 减少辐照50%→80%']),
        ('量子计算', '#8c564b', ['• 预研启动', '• 能力储备']),
    ]
    
    y_positions = [0.75, 0.6, 0.45, 0.3]
    for i, (tech, color, items) in enumerate(tech_data):
        y = y_positions[i // 2]
        x_offset = x_positions[i % 4]
        
        # 技术名称
        box = FancyBboxPatch((x_offset-0.08, y-0.08), 0.16, 0.12, 
                            boxstyle="round,pad=0.02", facecolor=color, alpha=0.8,
                            transform=ax.transAxes, edgecolor='black')
        ax.add_patch(box)
        ax.text(x_offset, y-0.02, tech, fontsize=11, fontweight='bold', 
                ha='center', va='center', transform=ax.transAxes, color='white')
        
        # 里程碑
        for j, item in enumerate(items):
            ax.text(x_offset, y-0.14-j*0.05, item, fontsize=9, ha='center', 
                   va='top', transform=ax.transAxes, color='dimgray')
    
    # 关键里程碑
    milestones = [
        (0.15, 0.12, '数字孪生5基地覆盖'),
        (0.4, 0.12, '源网荷储算脑试点上线'),
        (0.65, 0.12, '主导2-3项行业标准'),
        (0.9, 0.12, '技术输出开始'),
    ]
    
    for x, y, text in milestones:
        ax.text(x, y, text, fontsize=9, ha='center', va='top', 
               transform=ax.transAxes, style='italic', color='darkblue')
    
    plt.tight_layout()
    plt.savefig('viz_figure4_tech_roadmap.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：图4 2026-2030年前瞻性技术发展路线图")

def generate_figure5_ecosystem():
    """生成图5：中核电算协同生态体系架构图"""
    fig, ax = plt.subplots(figsize=(16, 12))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 80)
    ax.set_aspect('equal')
    ax.axis('off')
    
    ax.text(50, 78, '图5 中核电算协同生态体系架构图', fontsize=18, 
             fontweight='bold', ha='center', va='top')
    
    # 顶层目标
    top_box = FancyBboxPatch((30, 65), 40, 8, boxstyle="round,pad=0.1", 
                             facecolor='#4472C4', edgecolor='navy', linewidth=2)
    ax.add_patch(top_box)
    ax.text(50, 69, '顶层战略目标：绿色算力核心供应商', ha='center', va='center', 
             fontsize=12, fontweight='bold', color='white')
    
    # 三层架构
    layers = {
        '业务层': (15, 50, 20, 12, '#FF6B6B', ['• 绿色算力服务', '• 碳资产管理', '• 技术输出服务']),
        '能力层': (42, 50, 20, 12, '#4ECDC4', ['• 数字孪生', '• 电力大模型', '• 具身智能']),
        '支撑层': (70, 50, 20, 12, '#FFD93D', ['• 组织架构', '• 人才队伍', '• 安全体系']),
    }
    
    for name, (x, y, w, h, color, items) in layers.items():
        box = FancyBboxPatch((x-w/2, y-h/2), w, h, boxstyle="round,pad=0.1", 
                            facecolor=color, edgecolor='black', linewidth=2, alpha=0.8)
        ax.add_patch(box)
        ax.text(x, y+h/4, name, ha='center', va='center', fontsize=12, fontweight='bold')
        for i, item in enumerate(items):
            ax.text(x, y-i*3-2, item, ha='center', va='center', fontsize=9)
    
    # 基础设施层
    infra_box = FancyBboxPatch((25, 10), 50, 12, boxstyle="round,pad=0.1", 
                               facecolor='#2ca02c', edgecolor='darkgreen', linewidth=2, alpha=0.8)
    ax.add_patch(infra_box)
    ax.text(50, 18, '基础设施层', ha='center', va='center', fontsize=12, fontweight='bold', color='white')
    ax.text(50, 14, '核电基地 + 算力设施 + 储能系统 + 新能源电场', 
             ha='center', va='center', fontsize=10, color='white')
    
    # 连接箭头
    ax.annotate('', xy=(50, 58), xytext=(50, 63),
               arrowprops=dict(arrowstyle='->', color='gray', lw=2))
    ax.annotate('', xy=(50, 22), xytext=(50, 38),
               arrowprops=dict(arrowstyle='->', color='gray', lw=2))
    
    plt.tight_layout()
    plt.savefig('viz_figure5_ecosystem.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：图5 中核电算协同生态体系架构图")

def generate_figure3_three_force():
    """生成图3：核电-新能源-绿电三力协同布局图"""
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 70)
    ax.set_aspect('equal')
    ax.axis('off')
    
    ax.text(50, 68, '图3 核电-新能源-绿电三力协同布局图', fontsize=18, 
             fontweight='bold', ha='center', va='top')
    
    # 核电节点
    nuke_box = FancyBboxPatch((5, 30), 28, 25, boxstyle="round,pad=0.1", 
                               facecolor='#FF6B6B', edgecolor='darkred', linewidth=2)
    ax.add_patch(nuke_box)
    ax.text(19, 50, '核电（第一力）', ha='center', va='center', fontsize=14, fontweight='bold', color='white')
    ax.text(19, 45, '核电算力绿心', ha='center', va='center', fontsize=11, color='white')
    nuke_features = ['★ 零碳排放：12g CO2/kWh', '★ 稳定基荷：7×24h', '★ 秦山、福清、大亚湾、田湾']
    for i, feat in enumerate(nuke_features):
        ax.text(19, 40-i*4, feat, ha='center', va='center', fontsize=9, color='white')
    
    # 新能源节点
    new_box = FancyBboxPatch((67, 30), 28, 25, boxstyle="round,pad=0.1", 
                              facecolor='#4ECDC4', edgecolor='darkgreen', linewidth=2)
    ax.add_patch(new_box)
    ax.text(81, 50, '新能源（第二力）', ha='center', va='center', fontsize=14, fontweight='bold', color='white')
    ax.text(81, 45, '新能源算力西基地', ha='center', va='center', fontsize=11, color='white')
    new_features = ['★ 清洁能源富集', '★ 土地资源充足', '★ 内蒙古、甘肃、宁夏布局']
    for i, feat in enumerate(new_features):
        ax.text(81, 40-i*4, feat, ha='center', va='center', fontsize=9, color='white')
    
    # 绿电节点（中心下方）
    green_box = FancyBboxPatch((28, 5), 44, 15, boxstyle="round,pad=0.1", 
                               facecolor='#FFD93D', edgecolor='orange', linewidth=2)
    ax.add_patch(green_box)
    ax.text(50, 16, '绿电（第三力）', ha='center', va='center', fontsize=14, fontweight='bold')
    ax.text(50, 12, '绿电算力东枢纽', ha='center', va='center', fontsize=11)
    green_features = ['✓ 整合核电+新能源混合供电  ✓ 绿色算力认证  ✓ 京津冀、长三角、粤港澳']
    ax.text(50, 8, green_features, ha='center', va='center', fontsize=9)
    
    # 连接箭头
    ax.annotate('', xy=(42, 12), xytext=(19, 30),
               arrowprops=dict(arrowstyle='->', color='gray', lw=2))
    ax.annotate('', xy=(58, 12), xytext=(81, 30),
               arrowprops=dict(arrowstyle='->', color='gray', lw=2))
    
    # 商业模式创新框
    biz_box = FancyBboxPatch((20, -5), 60, 8, boxstyle="round,pad=0.1", 
                              facecolor='#E6F2FF', edgecolor='#4472C4', linewidth=2)
    ax.add_patch(biz_box)
    ax.text(50, -2, '商业模式创新：绿电直供模式 | 绿电认证服务 | 碳资产管理', 
             ha='center', va='center', fontsize=10)
    
    plt.tight_layout()
    plt.savefig('viz_figure3_three_force.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：图3 核电-新能源-绿电三力协同布局图")

if __name__ == '__main__':
    print("开始生成可视化图表...")
    generate_table1_chart()
    generate_figure1_map()
    generate_table2_policy()
    generate_figure2_five_force()
    generate_figure3_three_force()
    generate_figure4_tech_roadmap()
    generate_figure5_ecosystem()
    print("\n所有可视化图表生成完成！")
    print("图表文件已保存到当前目录")
