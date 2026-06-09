# -*- coding: utf-8 -*-
"""
生成全球数据中心耗电量预测可视化图表
来源：IEA 2026年5月特别报告
"""
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

# 设置中文字体
matplotlib.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'SimSun']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['font.family'] = 'sans-serif'

def generate_global_power_chart():
    """生成全球数据中心耗电量预测图表"""
    
    # 数据
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    power_twh = [485, 600, 720, 850, 920, 950]
    ai_ratio = [32, 38, 43, 48, 50, 49]
    global_ratio = [2.0, 2.5, 3.0, 3.5, 4.0, 5.0]
    
    # 创建图表
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('表5 2025-2030年全球数据中心耗电量预测\n来源：IEA 2026年5月特别报告', 
                 fontsize=18, fontweight='bold', y=0.98)
    
    # 子图1：耗电量柱状图
    ax1 = axes[0, 0]
    colors = ['#4472C4' if 'E' not in y else '#5B9BD5' for y in years]
    bars = ax1.bar(years, power_twh, color=colors, edgecolor='navy', alpha=0.85, width=0.6)
    ax1.set_ylabel('耗电量 (TWh)', fontsize=12, fontweight='bold')
    ax1.set_title('全球数据中心耗电量趋势', fontsize=14, fontweight='bold', pad=10)
    ax1.grid(True, alpha=0.3, axis='y')
    ax1.set_ylim(0, 1100)
    
    # 添加数值标签
    for bar, val in zip(bars, power_twh):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 20, 
                f'{val}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    # 添加趋势线
    ax1.plot(years, power_twh, 'r-o', linewidth=2, markersize=6, label='增长趋势')
    ax1.legend(loc='upper left')
    
    # 子图2：同比增速折线图
    ax2 = axes[0, 1]
    growth_rates = [23.7, 20.0, 18.1, 8.2, 3.3]
    years_growth = ['2026E', '2027E', '2028E', '2029E', '2030E']
    
    colors_growth = plt.cm.RdYlGn(np.linspace(0.8, 0.3, len(years_growth)))
    ax2.bar(years_growth, growth_rates, color=colors_growth, edgecolor='darkgreen', alpha=0.8, width=0.5)
    ax2.set_ylabel('同比增速 (%)', fontsize=12, fontweight='bold')
    ax2.set_title('年同比增速变化', fontsize=14, fontweight='bold', pad=10)
    ax2.grid(True, alpha=0.3, axis='y')
    ax2.set_ylim(0, 30)
    
    for i, (x, val) in enumerate(zip(years_growth, growth_rates)):
        ax2.text(i, val + 0.5, f'{val}%', ha='center', va='bottom', fontsize=10, fontweight='bold')
    
    # 子图3：AI专用数据中心占比
    ax3 = axes[1, 0]
    ax3.fill_between(years, 0, ai_ratio, alpha=0.3, color='#FF6B6B')
    ax3.plot(years, ai_ratio, 'o-', color='#FF6B6B', linewidth=3, markersize=10, label='AI专用占比')
    ax3.set_ylabel('AI专用数据中心占比 (%)', fontsize=12, fontweight='bold')
    ax3.set_title('AI专用数据中心耗电量占比变化', fontsize=14, fontweight='bold', pad=10)
    ax3.grid(True, alpha=0.3)
    ax3.set_ylim(0, 60)
    
    for x, val in zip(years, ai_ratio):
        ax3.annotate(f'{val}%', (x, val), textcoords="offset points", 
                    xytext=(0, 10), ha='center', fontsize=10, fontweight='bold')
    
    ax3.legend(loc='upper left')
    
    # 子图4：占全球用电比重
    ax4 = axes[1, 1]
    colors_stack = ['#2ca02c', '#1e90ff', '#ff7f0e', '#d62728', '#9467bd', '#8c564b']
    ax4.plot(years, global_ratio, 's-', color='#1e90ff', linewidth=3, markersize=12, label='占全球用电比重')
    ax4.fill_between(years, 0, global_ratio, alpha=0.2, color='#1e90ff')
    ax4.set_ylabel('占全球用电比重 (%)', fontsize=12, fontweight='bold')
    ax4.set_title('占全球用电比重变化趋势', fontsize=14, fontweight='bold', pad=10)
    ax4.grid(True, alpha=0.3)
    ax4.set_ylim(0, 6)
    
    for x, val in zip(years, global_ratio):
        ax4.annotate(f'{val}%', (x, val), textcoords="offset points", 
                    xytext=(0, 10), ha='center', fontsize=10, fontweight='bold')
    
    ax4.legend(loc='upper left')
    
    # 添加说明文字
    fig.text(0.5, 0.01, '注：2030年全球数据中心耗电量将达950 TWh，约等于日本全国一年用电总量', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('chart_global_power_prediction.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：chart_global_power_prediction.png")

def generate_combined_chart():
    """生成综合对比图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    power_twh = [485, 600, 720, 850, 920, 950]
    ai_power = [155, 228, 310, 408, 460, 465]  # AI专用耗电量估算
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
    fig.suptitle('2025-2030年全球数据中心耗电量预测综合图表\n来源：IEA 2026年5月特别报告', 
                 fontsize=16, fontweight='bold', y=1.02)
    
    # 左图：堆叠柱状图
    non_ai_power = [p - a for p, a in zip(power_twh, ai_power)]
    
    x = np.arange(len(years))
    width = 0.6
    
    bars1 = ax1.bar(x, non_ai_power, width, label='传统数据中心耗电', color='#4472C4', alpha=0.8)
    bars2 = ax1.bar(x, ai_power, width, bottom=non_ai_power, label='AI专用数据中心耗电', color='#FF6B6B', alpha=0.8)
    
    ax1.set_ylabel('耗电量 (TWh)', fontsize=12, fontweight='bold')
    ax1.set_title('全球数据中心耗电量构成', fontsize=14, fontweight='bold')
    ax1.set_xticks(x)
    ax1.set_xticklabels(years)
    ax1.legend(loc='upper left')
    ax1.grid(True, alpha=0.3, axis='y')
    
    # 添加总计标签
    for i, (n, a, total) in enumerate(zip(non_ai_power, ai_power, power_twh)):
        ax1.text(i, total + 15, f'{total}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    ax1.set_ylim(0, 1100)
    
    # 右图：AI占比变化饼图组
    colors_pie = ['#4472C4', '#FF6B6B']
    explode = (0, 0.1)
    
    # 2025年饼图
    ax2_1 = fig.add_axes([0.55, 0.55, 0.18, 0.35])
    ax2_1.pie([68, 32], labels=['传统\n32%', 'AI\n32%'], colors=colors_pie, autopct='',
               explode=explode, startangle=90, textprops={'fontsize': 9})
    ax2_1.set_title('2025年', fontsize=11, fontweight='bold')
    
    # 2030年饼图
    ax2_2 = fig.add_axes([0.75, 0.55, 0.18, 0.35])
    ax2_2.pie([51, 49], labels=['传统\n51%', 'AI\n49%'], colors=colors_pie, autopct='',
               explode=explode, startangle=90, textprops={'fontsize': 9})
    ax2_2.set_title('2030年E', fontsize=11, fontweight='bold')
    
    ax2.axis('off')
    ax2.set_title('AI专用数据中心占比变化', fontsize=14, fontweight='bold')
    
    # 添加说明
    fig.text(0.5, 0.02, '关键洞察：AI专用数据中心耗电量将从155 TWh增长超3倍至465 TWh，占比从32%提升至49%', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_global_power_combined.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("综合图表已生成：chart_global_power_combined.png")

def generate_trend_line_chart():
    """生成趋势线图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    power_twh = [485, 600, 720, 850, 920, 950]
    
    fig, ax = plt.subplots(figsize=(14, 8))
    
    # 创建渐变填充区域
    ax.fill_between(years, 0, power_twh, alpha=0.3, color='#4472C4')
    
    # 主趋势线
    ax.plot(years, power_twh, 'o-', color='#4472C4', linewidth=4, markersize=14, 
            markeredgecolor='white', markeredgewidth=2, label='耗电量 (TWh)')
    
    # 添加数值标签
    for x, val in zip(years, power_twh):
        ax.annotate(f'{val} TWh', (x, val), textcoords="offset points", 
                    xytext=(0, 15), ha='center', fontsize=12, fontweight='bold',
                    color='#4472C4')
    
    # 添加增长箭头和标注
    ax.annotate('', xy=(5, 950), xytext=(4, 920),
                arrowprops=dict(arrowstyle='->', color='green', lw=2))
    
    ax.set_ylabel('耗电量 (TWh)', fontsize=14, fontweight='bold')
    ax.set_xlabel('年份', fontsize=14, fontweight='bold')
    ax.set_title('2025-2030年全球数据中心耗电量预测趋势\n来源：IEA 2026年5月特别报告', 
                 fontsize=18, fontweight='bold', pad=20)
    
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.set_ylim(0, 1100)
    
    # 添加关键洞察文本框
    props = dict(boxstyle='round,pad=0.5', facecolor='lightyellow', alpha=0.9, edgecolor='orange')
    ax.text(0.02, 0.98, '关键数据：\n• 2030年耗电量将达950 TWh\n• 相当于日本全国全年用电\n• 较2025年翻一番\n• CAGR: 14.4%',
            transform=ax.transAxes, fontsize=11, verticalalignment='top', bbox=props)
    
    # 添加数据来源
    fig.text(0.99, 0.01, '数据来源：国际能源署(IEA) 2026年5月特别报告', 
             ha='right', fontsize=9, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_global_power_trend.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("趋势图已生成：chart_global_power_trend.png")

if __name__ == '__main__':
    print("开始生成全球数据中心耗电量预测图表...")
    generate_global_power_chart()
    generate_combined_chart()
    generate_trend_line_chart()
    print("\n所有图表生成完成！")
