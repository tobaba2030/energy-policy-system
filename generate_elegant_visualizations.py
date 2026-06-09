# -*- coding: utf-8 -*-
"""
生成高大上的中核集团电算协同业务可视化图表
"""
import matplotlib.pyplot as plt
import matplotlib
import numpy as np
from matplotlib.patches import FancyBboxPatch, Circle, FancyArrowPatch, Rectangle
import matplotlib.patches as mpatches
from matplotlib.colors import LinearSegmentedColormap

# 设置中文字体
matplotlib.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'SimSun']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['font.family'] = 'sans-serif'

def create_corporate_colormap():
    """创建企业级配色方案"""
    colors = [
        '#0a3d62',  # 深蓝
        '#0c4a7c',
        '#0f5c9e',
        '#126eb7',
        '#157ed0',
        '#38ada9',  # 青色
        '#6bcfc7',
        '#eafaf1'
    ]
    return LinearSegmentedColormap.from_list('nuclear_green', colors)

def generate_corporate_infographic():
    """生成企业级的高端信息图"""
    fig = plt.figure(figsize=(16, 10))
    ax = fig.add_subplot(111)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # 创建渐变背景
    gradient = np.linspace(0, 1, 256).reshape(1, -1)
    gradient = np.vstack([gradient, gradient])
    colormap = create_corporate_colormap()
    ax.imshow(gradient, extent=[0, 100, 0, 100], aspect='auto', cmap=colormap, alpha=0.15)
    
    # 标题区域
    title_bg = FancyBboxPatch((15, 82), 70, 15, boxstyle="round,pad=0.5,rounding_size=0.8", 
                              facecolor='#0a3d62', edgecolor='#0c4a7c', linewidth=3, 
                              alpha=0.95)
    ax.add_patch(title_bg)
    ax.text(50, 90, '中核集团', ha='center', va='center', 
             fontsize=28, fontweight='bold', color='#eafaf1')
    ax.text(50, 84, '电算协同业务战略研究报告', ha='center', va='center', 
             fontsize=20, fontweight='medium', color='#6bcfc7')
    
    # 中心概念圆
    center_circle = Circle((50, 50), 15, facecolor='#0c4a7c', edgecolor='#126eb7', linewidth=4, alpha=0.92)
    ax.add_patch(center_circle)
    ax.text(50, 52, '绿色算力', ha='center', va='center', fontsize=20, fontweight='bold', color='white')
    ax.text(50, 47, '核心供应商', ha='center', va='center', fontsize=14, color='#6bcfc7')
    
    # 六个核心能力
    capabilities = [
        ('数字孪生', '#e55039', (20, 70)),
        ('具身智能', '#f6b93b', (80, 70)),
        ('电力大模型', '#079992', (20, 30)),
        ('源网荷储算脑', '#1e3799', (80, 30)),
        ('碳能算一体化', '#4a69bd', (35, 15)),
        ('量子计算', '#6a89cc', (65, 15))
    ]
    
    for name, color, (x, y) in capabilities:
        # 画圆
        circle = Circle((x, y), 10, facecolor=color, edgecolor='white', linewidth=3, alpha=0.85)
        ax.add_patch(circle)
        # 写字
        ax.text(x, y + 2, name, ha='center', va='center', fontsize=12, fontweight='bold', color='white')
        # 画线
        ax.annotate('', xy=(50, 50), xytext=(x, y),
                    arrowprops=dict(arrowstyle='->', color='white', linewidth=2, alpha=0.7))
    
    # 底部关键数据面板
    data_panel = FancyBboxPatch((10, 2), 80, 16, boxstyle="round,pad=0.5,rounding_size=0.8", 
                                 facecolor='white', edgecolor='#0c4a7c', linewidth=2, alpha=0.92)
    ax.add_patch(data_panel)
    
    # 四个关键指标
    metrics = [
        ('2030年愿景', '50,000 P', '算力规模'),
        ('碳资产管理', '500 万吨', '年碳交易'),
        ('技术标准', '3-5 项', '国家标准主导'),
        ('营业收入', '150-200 亿', '年营收')
    ]
    
    x_positions = [18, 38, 58, 78]
    for i, (title, value, subtitle) in enumerate(metrics):
        x = x_positions[i]
        ax.text(x, 14, title, ha='center', va='bottom', fontsize=11, color='#0a3d62', fontweight='bold')
        ax.text(x, 10, value, ha='center', va='center', fontsize=18, color='#0f5c9e', fontweight='bold')
        ax.text(x, 6, subtitle, ha='center', va='top', fontsize=9, color='#666666')
    
    # 顶部年份标签
    year_box = FancyBboxPatch((43, 96), 14, 3.5, boxstyle="round,pad=0.15,rounding_size=0.2", 
                              facecolor='#38ada9', edgecolor='#079992', linewidth=2)
    ax.add_patch(year_box)
    ax.text(50, 97.5, '2026-2030', ha='center', va='center', fontsize=13, fontweight='bold', color='white')
    
    # 右上角标签
    tag_box = FancyBboxPatch((78, 90), 17, 4, boxstyle="round,pad=0.15,rounding_size=0.2", 
                             facecolor='#f6b93b', edgecolor='#e55039', linewidth=2)
    ax.add_patch(tag_box)
    ax.text(86.5, 92, '战略级智库报告', ha='center', va='center', fontsize=10, fontweight='bold', color='#0a3d62')
    
    # 左侧业务定位
    left_box = FancyBboxPatch((2, 45), 10, 12, boxstyle="round,pad=0.15,rounding_size=0.2", 
                               facecolor='#eafaf1', edgecolor='#6bcfc7', linewidth=2)
    ax.add_patch(left_box)
    ax.text(7, 51, '战略定位', ha='center', va='bottom', fontsize=10, color='#079992', fontweight='bold', rotation=90)
    
    plt.tight_layout()
    plt.savefig('nuclear_computing_infographic.png', dpi=400, bbox_inches='tight', facecolor='#f5f9fa')
    plt.close()
    print("生成企业级信息图: nuclear_computing_infographic.png")

def generate_business_architecture():
    """生成业务架构图（高端可视化风格）"""
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # 背景
    bg_rect = Rectangle((0, 0), 100, 100, facecolor='#f8f9fa', alpha=1.0)
    ax.add_patch(bg_rect)
    
    # 顶层目标
    top_title = FancyBboxPatch((20, 85), 60, 12, boxstyle="round,pad=0.3,rounding_size=1.5", 
                                facecolor='#0a3d62', edgecolor='#0c4a7c', linewidth=3, alpha=0.95)
    ax.add_patch(top_title)
    ax.text(50, 91, '顶层战略目标', ha='center', va='center', fontsize=18, fontweight='bold', color='white')
    ax.text(50, 87.5, '国家绿色算力核心供应商', ha='center', va='center', fontsize=13, color='#6bcfc7')
    
    # 业务层
    business_box = FancyBboxPatch((12, 55), 22, 25, boxstyle="round,pad=0.3,rounding_size=1.2", 
                                   facecolor='#e55039', edgecolor='#eb2f06', linewidth=2, alpha=0.9)
    ax.add_patch(business_box)
    ax.text(23, 77, '业务层', ha='center', va='top', fontsize=14, fontweight='bold', color='white')
    business_items = ['绿色算力服务', '碳资产管理', '技术输出']
    for i, item in enumerate(business_items):
        ax.text(23, 71 - i*4.5, item, ha='center', va='center', fontsize=11, color='white')
    
    # 能力层
    capability_box = FancyBboxPatch((39, 55), 22, 25, boxstyle="round,pad=0.3,rounding_size=1.2", 
                                    facecolor='#079992', edgecolor='#077a73', linewidth=2, alpha=0.9)
    ax.add_patch(capability_box)
    ax.text(50, 77, '能力层', ha='center', va='top', fontsize=14, fontweight='bold', color='white')
    capability_items = ['数字孪生', '电力大模型', '具身智能']
    for i, item in enumerate(capability_items):
        ax.text(50, 71 - i*4.5, item, ha='center', va='center', fontsize=11, color='white')
    
    # 支撑层
    support_box = FancyBboxPatch((66, 55), 22, 25, boxstyle="round,pad=0.3,rounding_size=1.2", 
                                  facecolor='#f6b93b', edgecolor='#fa983a', linewidth=2, alpha=0.9)
    ax.add_patch(support_box)
    ax.text(77, 77, '支撑层', ha='center', va='top', fontsize=14, fontweight='bold', color='#0a3d62')
    support_items = ['组织架构', '人才队伍', '安全体系']
    for i, item in enumerate(support_items):
        ax.text(77, 71 - i*4.5, item, ha='center', va='center', fontsize=11, color='#0a3d62')
    
    # 基础设施层
    infra_box = FancyBboxPatch((25, 22), 50, 18, boxstyle="round,pad=0.3,rounding_size=1.5", 
                                facecolor='#38ada9', edgecolor='#0c4a7c', linewidth=3, alpha=0.9)
    ax.add_patch(infra_box)
    ax.text(50, 35, '基础设施层', ha='center', va='top', fontsize=16, fontweight='bold', color='white')
    infra_items = ['核电基地', '算力设施', '储能系统', '新能源电场']
    for i, item in enumerate(infra_items):
        ax.text(32 + i*14, 28, item, ha='center', va='center', fontsize=10.5, color='white')
    
    # 连接线
    for x_pos in [23, 50, 77]:
        ax.annotate('', xy=(x_pos, 55), xytext=(x_pos, 80),
                    arrowprops=dict(arrowstyle='->', color='#0c4a7c', linewidth=2, alpha=0.7))
        ax.annotate('', xy=(x_pos, 22), xytext=(x_pos, 48),
                    arrowprops=dict(arrowstyle='->', color='#0c4a7c', linewidth=2, alpha=0.7))
    
    # 标题
    ax.text(50, 98, '中核集团电算协同业务架构', ha='center', va='top', fontsize=20, fontweight='bold', color='#0a3d62')
    
    plt.tight_layout()
    plt.savefig('business_architecture_modern.png', dpi=400, bbox_inches='tight', facecolor='#f8f9fa')
    plt.close()
    print("生成业务架构图: business_architecture_modern.png")

def generate_three_force_layout():
    """生成三力协同布局图（高端设计版）"""
    fig, ax = plt.subplots(figsize=(16, 10))
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # 背景
    ax.set_facecolor('#f5f9fa')
    
    # 核电圆
    nuke_circle = Circle((25, 65), 16, facecolor='#e55039', edgecolor='#eb2f06', linewidth=4, alpha=0.9)
    ax.add_patch(nuke_circle)
    ax.text(25, 72, '核电', ha='center', va='center', fontsize=22, fontweight='bold', color='white')
    ax.text(25, 66, '算力绿心', ha='center', va='center', fontsize=13, color='#ffeaa7')
    nuke_features = ['零碳排放', '稳定基荷', '秦山·大亚湾']
    for i, feat in enumerate(nuke_features):
        ax.text(25, 59 - i*4.5, feat, ha='center', va='center', fontsize=10.5, color='white')
    
    # 新能源圆
    new_circle = Circle((75, 65), 16, facecolor='#38ada9', edgecolor='#079992', linewidth=4, alpha=0.9)
    ax.add_patch(new_circle)
    ax.text(75, 72, '新能源', ha='center', va='center', fontsize=22, fontweight='bold', color='white')
    ax.text(75, 66, '算力西基地', ha='center', va='center', fontsize=13, color='#dfe6e9')
    new_features = ['风光富集', '土地充足', '内蒙古·宁夏']
    for i, feat in enumerate(new_features):
        ax.text(75, 59 - i*4.5, feat, ha='center', va='center', fontsize=10.5, color='white')
    
    # 绿电圆
    green_circle = Circle((50, 25), 18, facecolor='#f6b93b', edgecolor='#fa983a', linewidth=4, alpha=0.9)
    ax.add_patch(green_circle)
    ax.text(50, 33, '绿电', ha='center', va='center', fontsize=24, fontweight='bold', color='#0a3d62')
    ax.text(50, 27, '算力东枢纽', ha='center', va='center', fontsize=14, color='#0c4a7c')
    green_features = ['混合供电', '绿色认证', '京津冀·长三角']
    for i, feat in enumerate(green_features):
        ax.text(50, 18 - i*4.5, feat, ha='center', va='center', fontsize=11, color='#0a3d62')
    
    # 连接线
    ax.annotate('', xy=(41, 33), xytext=(32, 57),
                arrowprops=dict(arrowstyle='<->', color='#0c4a7c', linewidth=3, alpha=0.7))
    ax.annotate('', xy=(59, 33), xytext=(68, 57),
                arrowprops=dict(arrowstyle='<->', color='#0c4a7c', linewidth=3, alpha=0.7))
    
    # 商业模式创新
    business_panel = FancyBboxPatch((20, 2), 60, 15, boxstyle="round,pad=0.5,rounding_size=1.2", 
                                    facecolor='white', edgecolor='#0c4a7c', linewidth=2)
    ax.add_patch(business_panel)
    ax.text(50, 13, '商业模式创新', ha='center', va='top', fontsize=15, fontweight='bold', color='#0c4a7c')
    business_items = ['绿电直供模式', '绿电认证服务', '碳资产管理']
    for i, item in enumerate(business_items):
        x = 25 + i * 20
        ax.text(x, 8, item, ha='center', va='center', fontsize=11.5, color='#0a3d62', fontweight='medium')
    
    # 标题
    ax.text(50, 96, '核电-新能源-绿电三力协同布局', ha='center', va='top', fontsize=20, fontweight='bold', color='#0a3d62')
    
    plt.tight_layout()
    plt.savefig('three_force_layout_modern.png', dpi=400, bbox_inches='tight', facecolor='#f5f9fa')
    plt.close()
    print("生成三力布局图: three_force_layout_modern.png")

def generate_report_cover():
    """生成报告封面图"""
    fig = plt.figure(figsize=(16, 10))
    ax = fig.add_subplot(111)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # 背景渐变
    gradient = np.linspace(0, 1, 256).reshape(1, -1)
    gradient = np.vstack([gradient, gradient])
    colormap = create_corporate_colormap()
    ax.imshow(gradient, extent=[0, 100, 0, 100], aspect='auto', cmap=colormap, alpha=0.2)
    
    # 主标题区
    main_bg = Rectangle((0, 50), 100, 50, facecolor='#0a3d62', alpha=0.95)
    ax.add_patch(main_bg)
    
    # 装饰线条
    for y in [95, 90, 85]:
        ax.plot([10, 90], [y, y], color='#38ada9', linewidth=1, alpha=0.3)
    
    # 中核集团标题
    ax.text(50, 78, '中核集团', ha='center', va='center', 
             fontsize=42, fontweight='bold', color='white')
    ax.text(50, 70, '电算协同业务', ha='center', va='center', 
             fontsize=30, color='#6bcfc7')
    
    # 副标题
    ax.text(50, 60, '战略研究报告', ha='center', va='center', 
             fontsize=24, fontweight='bold', color='white')
    
    # 底部信息区
    bottom_bg = Rectangle((0, 0), 100, 40, facecolor='white', alpha=0.95)
    ax.add_patch(bottom_bg)
    
    info_items = [
        '面向：集团高层领导',
        '定位：战略级智库报告',
        '密级：内部资料',
        '编制：科技创新业务中心',
        '日期：2026年5月'
    ]
    
    for i, item in enumerate(info_items):
        ax.text(50, 32 - i*5, item, ha='center', va='center', 
                 fontsize=14, color='#0a3d62')
    
    # 装饰元素
    corner_rect1 = Rectangle((2, 52), 6, 6, facecolor='#38ada9', alpha=0.6)
    corner_rect2 = Rectangle((92, 42), 6, 6, facecolor='#f6b93b', alpha=0.6)
    ax.add_patch(corner_rect1)
    ax.add_patch(corner_rect2)
    
    # 年份标签
    year_tag = FancyBboxPatch((45, 43), 10, 5, boxstyle="round,pad=0.15,rounding_size=0.3", 
                               facecolor='#f6b93b', edgecolor='#e55039', linewidth=2)
    ax.add_patch(year_tag)
    ax.text(50, 45.5, '2026-2030', ha='center', va='center', fontsize=13, fontweight='bold', color='#0a3d62')
    
    plt.tight_layout()
    plt.savefig('report_cover_elegant.png', dpi=400, bbox_inches='tight', facecolor='#f8f9fa')
    plt.close()
    print("生成报告封面: report_cover_elegant.png")

if __name__ == '__main__':
    print("开始生成高端可视化图表...")
    generate_corporate_infographic()
    generate_business_architecture()
    generate_three_force_layout()
    generate_report_cover()
    print("\n所有图表生成完成！")
