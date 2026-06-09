# -*- coding: utf-8 -*-
"""
生成碳价与绿色溢价预测可视化图表
"""
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

# 设置中文字体
matplotlib.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'SimSun']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['font.family'] = 'sans-serif'

def generate_carbon_price_chart():
    """生成碳价与绿色溢价预测图表"""
    
    # 数据
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    carbon_price = [110, 125, 140, 155, 170, 185]           # 碳配额均价(元/吨)
    green_premium = [5, 5, 8, 10, 12, 15]                   # 绿色算力溢价%
    green_power_premium = [10, 12, 14, 16, 18, 20]           # 绿电采购成本溢价%
    nuclear_premium_low = [15, 18, 20, 22, 24, 26]          # 核电零碳溢价空间(低)
    nuclear_premium_high = [20, 23, 25, 27, 29, 31]         # 核电零碳溢价空间(高)
    
    # 创建图表
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('表8 2025-2030年碳价与绿色溢价预测', 
                 fontsize=18, fontweight='bold', y=0.98)
    
    # 子图1：碳配额均价趋势
    ax1 = axes[0, 0]
    colors_carbon = plt.cm.Blues(np.linspace(0.4, 0.9, len(years)))
    bars = ax1.bar(years, carbon_price, color=colors_carbon, edgecolor='#1f77b4', 
                   alpha=0.85, width=0.6)
    ax1.set_ylabel('碳配额均价 (元/吨)', fontsize=12, fontweight='bold')
    ax1.set_title('碳配额均价变化趋势', fontsize=14, fontweight='bold', pad=10)
    ax1.grid(True, alpha=0.3, axis='y')
    ax1.set_ylim(0, 220)
    
    for bar, val in zip(bars, carbon_price):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 3, 
                f'{val}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    # 添加趋势线
    ax1.plot(years, carbon_price, 'o-', color='#1f77b4', linewidth=2, markersize=8)
    
    # 子图2：绿色算力溢价与绿电采购成本溢价对比
    ax2 = axes[0, 1]
    x = np.arange(len(years))
    width = 0.35
    
    bars1 = ax2.bar(x - width/2, green_premium, width, label='绿色算力溢价', 
                    color='#2ecc71', alpha=0.85, edgecolor='#27ae60')
    bars2 = ax2.bar(x + width/2, green_power_premium, width, label='绿电采购成本溢价', 
                    color='#3498db', alpha=0.85, edgecolor='#2980b9')
    
    ax2.set_ylabel('溢价比例 (%)', fontsize=12, fontweight='bold')
    ax2.set_title('绿色溢价对比', fontsize=14, fontweight='bold', pad=10)
    ax2.set_xticks(x)
    ax2.set_xticklabels(years)
    ax2.legend(loc='upper left')
    ax2.grid(True, alpha=0.3, axis='y')
    ax2.set_ylim(0, 25)
    
    # 添加趋势线
    ax2.plot(years, green_premium, 's--', color='#2ecc71', linewidth=2, markersize=6)
    ax2.plot(years, green_power_premium, 's--', color='#3498db', linewidth=2, markersize=6)
    
    # 子图3：核电零碳溢价空间（区间图）
    ax3 = axes[1, 0]
    ax3.fill_between(years, nuclear_premium_low, nuclear_premium_high, 
                     alpha=0.4, color='#e74c3c', label='核电零碳溢价空间')
    ax3.plot(years, nuclear_premium_low, 'o-', color='#c0392b', linewidth=2, 
             markersize=8, label='下限')
    ax3.plot(years, nuclear_premium_high, 's-', color='#e74c3c', linewidth=2, 
             markersize=8, label='上限')
    
    ax3.set_ylabel('溢价空间 (%)', fontsize=12, fontweight='bold')
    ax3.set_title('核电零碳溢价空间', fontsize=14, fontweight='bold', pad=10)
    ax3.grid(True, alpha=0.3)
    ax3.legend(loc='upper left')
    ax3.set_ylim(0, 35)
    
    # 添加数值标注
    for x, low, high in zip(years, nuclear_premium_low, nuclear_premium_high):
        ax3.annotate(f'{low}-{high}%', (x, (low+high)/2), textcoords="offset points", 
                    xytext=(0, 5), ha='center', fontsize=9, fontweight='bold', color='white')
    
    # 子图4：所有溢价指标汇总
    ax4 = axes[1, 1]
    
    # 创建堆叠效果的折线图
    ax4.plot(years, green_premium, 'o-', color='#2ecc71', linewidth=3, markersize=10, 
             label='绿色算力溢价', markeredgecolor='white', markeredgewidth=2)
    ax4.plot(years, green_power_premium, 's-', color='#3498db', linewidth=3, markersize=10, 
             label='绿电采购成本溢价', markeredgecolor='white', markeredgewidth=2)
    ax4.plot(years, [(l+h)/2 for l, h in zip(nuclear_premium_low, nuclear_premium_high)], 
             '^-', color='#e74c3c', linewidth=3, markersize=10, 
             label='核电零碳溢价(中值)', markeredgecolor='white', markeredgewidth=2)
    
    ax4.set_ylabel('溢价比例 (%)', fontsize=12, fontweight='bold')
    ax4.set_title('三类绿色溢价对比汇总', fontsize=14, fontweight='bold', pad=10)
    ax4.grid(True, alpha=0.3, linestyle='--')
    ax4.legend(loc='upper left')
    ax4.set_ylim(0, 35)
    
    # 添加说明文字
    fig.text(0.5, 0.01, '注：碳配额均价将从110元/吨上涨至185元/吨；核电零碳溢价空间达26-31%', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('chart_carbon_price_prediction.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：chart_carbon_price_prediction.png")

def generate_carbon_combined_chart():
    """生成碳价与溢价综合对比图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    carbon_price = [110, 125, 140, 155, 170, 185]
    nuclear_premium_low = [15, 18, 20, 22, 24, 26]
    nuclear_premium_high = [20, 23, 25, 27, 29, 31]
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
    fig.suptitle('2025-2030年碳价与核电零碳溢价预测综合图表', 
                 fontsize=16, fontweight='bold', y=1.02)
    
    # 左图：双轴图（碳价 + 溢价区间）
    ax1_2 = ax1.twinx()
    
    # 碳价柱状图
    colors_carbon = plt.cm.Blues(np.linspace(0.4, 0.9, len(years)))
    bars = ax1.bar(years, carbon_price, color=colors_carbon, alpha=0.7, 
                   width=0.5, label='碳配额均价(元/吨)')
    
    # 核电溢价区间
    ax1_2.fill_between(years, nuclear_premium_low, nuclear_premium_high, 
                        alpha=0.3, color='#e74c3c')
    ax1_2.plot(years, nuclear_premium_low, '--', color='#c0392b', linewidth=2)
    ax1_2.plot(years, nuclear_premium_high, '--', color='#e74c3c', linewidth=2)
    
    ax1.set_ylabel('碳配额均价 (元/吨)', fontsize=12, fontweight='bold', color='#1f77b4')
    ax1_2.set_ylabel('溢价空间 (%)', fontsize=12, fontweight='bold', color='#e74c3c')
    ax1.set_title('碳价与核电溢价联动', fontsize=14, fontweight='bold')
    
    ax1.set_ylim(0, 220)
    ax1_2.set_ylim(0, 35)
    
    # 添加数值标签
    for bar, val in zip(bars, carbon_price):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 3, 
                f'{val}', ha='center', va='bottom', fontsize=10, fontweight='bold')
    
    # 合并图例
    lines1, labels1 = ax1.get_legend_handles_labels()
    lines2 = [plt.Rectangle((0,0),1,1, fc='#e74c3c', alpha=0.3)]
    labels2 = ['核电零碳溢价空间']
    ax1.legend(lines1 + lines2, labels1 + labels2, loc='upper left')
    
    ax1.grid(True, alpha=0.3, axis='y')
    
    # 右图：溢价增长倍数
    premium_2025 = [5, 10, 17.5]  # 绿色算力、绿电采购、核电溢价(中值)
    premium_2030 = [15, 20, 28.5]
    categories = ['绿色算力\n溢价', '绿电采购\n成本溢价', '核电零碳\n溢价']
    
    x = np.arange(len(categories))
    width = 0.35
    
    bars1 = ax2.bar(x - width/2, premium_2025, width, label='2025年', 
                    color='#3498db', alpha=0.85, edgecolor='#2980b9')
    bars2 = ax2.bar(x + width/2, premium_2030, width, label='2030年E', 
                    color='#e74c3c', alpha=0.85, edgecolor='#c0392b')
    
    ax2.set_ylabel('溢价比例 (%)', fontsize=12, fontweight='bold')
    ax2.set_title('溢价比例变化对比', fontsize=14, fontweight='bold')
    ax2.set_xticks(x)
    ax2.set_xticklabels(categories)
    ax2.legend(loc='upper left')
    ax2.grid(True, alpha=0.3, axis='y')
    ax2.set_ylim(0, 35)
    
    # 添加倍数标注
    multiples = [f'{m2/m1:.1f}倍' for m1, m2 in zip(premium_2025, premium_2030)]
    for i, (b1, b2, mult) in enumerate(zip(bars1, bars2, multiples)):
        ax2.text(i, max(b1.get_height(), b2.get_height()) + 1, mult, 
                ha='center', va='bottom', fontsize=10, fontweight='bold', color='#e67e22')
    
    # 添加说明
    fig.text(0.5, 0.02, '关键洞察：核电零碳溢价空间从15-20%提升至26-31%，碳价上涨推动绿色溢价持续增长', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_carbon_combined.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("综合图表已生成：chart_carbon_combined.png")

def generate_carbon_trend_chart():
    """生成碳价与溢价趋势图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    carbon_price = [110, 125, 140, 155, 170, 185]
    nuclear_premium_low = [15, 18, 20, 22, 24, 26]
    nuclear_premium_high = [20, 23, 25, 27, 29, 31]
    
    fig, ax = plt.subplots(figsize=(14, 8))
    
    # 主图：碳配额均价
    colors_carbon = plt.cm.Blues(np.linspace(0.3, 0.8, len(years)))
    ax.fill_between(years, 0, carbon_price, alpha=0.3, color='#3498db')
    ax.plot(years, carbon_price, 'o-', color='#3498db', linewidth=4, markersize=14,
           markeredgecolor='white', markeredgewidth=2, label='碳配额均价(元/吨)')
    
    # 添加数值标签
    for x, val in zip(years, carbon_price):
        ax.annotate(f'{val}元', (x, val), textcoords="offset points", 
                    xytext=(0, 15), ha='center', fontsize=12, fontweight='bold', color='#3498db')
    
    ax.set_ylabel('碳配额均价 (元/吨)', fontsize=14, fontweight='bold', color='#3498db')
    ax.set_xlabel('年份', fontsize=14, fontweight='bold')
    ax.set_title('2025-2030年碳价与核电零碳溢价预测趋势', 
                 fontsize=18, fontweight='bold', pad=20)
    
    ax.set_ylim(0, 220)
    ax.grid(True, alpha=0.3, linestyle='--')
    
    # 添加核电溢价区域
    ax.fill_between(years, 100, 115, nuclear_premium_low, nuclear_premium_high, 
                     alpha=0.2, color='#e74c3c', label='核电零碳溢价空间(15-20% → 26-31%)')
    
    # 右侧Y轴：溢价比例
    ax2 = ax.twinx()
    ax2.fill_between(years, 0, 35, alpha=0.05, color='#e74c3c')
    ax2.set_ylim(0, 35)
    ax2.set_ylabel('溢价比例 (%)', fontsize=14, fontweight='bold', color='#e74c3c')
    
    # 合并图例
    lines1, labels1 = ax.get_legend_handles_labels()
    ax.legend(lines1, labels1, loc='upper left', fontsize=12)
    
    # 添加关键洞察文本框
    props = dict(boxstyle='round,pad=0.5', facecolor='#fef9e7', alpha=0.9, edgecolor='#e67e22')
    ax.text(0.02, 0.98, '关键数据：\n• 碳价：110→185元/吨\n• 涨幅：68%\n• 核电溢价：15-20%→26-31%\n• 绿电溢价同步增长',
            transform=ax.transAxes, fontsize=11, verticalalignment='top', bbox=props)
    
    # 添加数据来源
    fig.text(0.99, 0.01, '数据来源：中核集团调研报告', 
             ha='right', fontsize=9, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_carbon_trend.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("趋势图已生成：chart_carbon_trend.png")

def generate_premium_comparison_radar():
    """生成溢价对比雷达图"""
    
    fig, ax = plt.subplots(figsize=(10, 8), subplot_kw=dict(projection='polar'))
    
    # 指标名称
    categories = ['绿色算力\n溢价', '绿电采购\n成本溢价', '核电零碳\n溢价']
    
    # 2025年数据
    values_2025 = [5, 10, 17.5]
    values_2025 += values_2025[:1]
    
    # 2030年数据
    values_2030 = [15, 20, 28.5]
    values_2030 += values_2030[:1]
    
    # 角度
    angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()
    angles += angles[:1]
    
    # 绘制雷达图
    ax.plot(angles, values_2025, 'o-', linewidth=2, color='#3498db', 
            markersize=10, label='2025年')
    ax.fill(angles, values_2025, alpha=0.25, color='#3498db')
    
    ax.plot(angles, values_2030, 's-', linewidth=2, color='#e74c3c', 
            markersize=10, label='2030年E')
    ax.fill(angles, values_2030, alpha=0.25, color='#e74c3c')
    
    # 设置标签
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(categories, fontsize=12)
    ax.set_ylim(0, 35)
    
    ax.set_title('绿色溢价对比雷达图', fontsize=16, fontweight='bold', pad=20)
    ax.legend(loc='upper right', bbox_to_anchor=(1.2, 1.0))
    
    plt.tight_layout()
    plt.savefig('chart_premium_radar.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("雷达图已生成：chart_premium_radar.png")

if __name__ == '__main__':
    print("开始生成碳价与绿色溢价预测图表...")
    generate_carbon_price_chart()
    generate_carbon_combined_chart()
    generate_carbon_trend_chart()
    generate_premium_comparison_radar()
    print("\n所有图表生成完成！")
