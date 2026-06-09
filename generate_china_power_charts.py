# -*- coding: utf-8 -*-
"""
生成中国数据中心耗电量预测可视化图表
"""
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

# 设置中文字体
matplotlib.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'SimSun']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['font.family'] = 'sans-serif'

def generate_china_power_chart():
    """生成中国数据中心耗电量预测图表"""
    
    # 数据
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    power_100m = [1960, 2500, 3200, 4000, 5000, 5500]
    growth_rates = [27.6, 28.0, 25.0, 25.0, 10.0]
    years_growth = ['2026E', '2027E', '2028E', '2029E', '2030E']
    global_ratio = [1.89, 2.5, 3.0, 3.5, 4.5, 5.5]
    ai_ratio = [30, 35, 40, 45, 48, 50]
    
    # 创建图表
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('表6 2025-2030年中国数据中心耗电量预测', 
                 fontsize=18, fontweight='bold', y=0.98)
    
    # 子图1：耗电量柱状图
    ax1 = axes[0, 0]
    colors = ['#e74c3c' if 'E' not in y else '#c0392b' for y in years]
    bars = ax1.bar(years, power_100m, color=colors, edgecolor='#922b21', alpha=0.85, width=0.6)
    ax1.set_ylabel('耗电量 (亿度)', fontsize=12, fontweight='bold')
    ax1.set_title('中国数据中心耗电量趋势', fontsize=14, fontweight='bold', pad=10)
    ax1.grid(True, alpha=0.3, axis='y')
    ax1.set_ylim(0, 6500)
    
    # 添加数值标签
    for bar, val in zip(bars, power_100m):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 120, 
                f'{val}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    # 添加趋势线
    ax1.plot(years, power_100m, color='#e74c3c', marker='o', linewidth=2, markersize=6, label='增长趋势')
    ax1.legend(loc='upper left')
    
    # 子图2：同比增速折线图
    ax2 = axes[0, 1]
    colors_growth = plt.cm.Reds(np.linspace(0.8, 0.3, len(years_growth)))
    ax2.bar(years_growth, growth_rates, color=colors_growth, edgecolor='#7f8c8d', alpha=0.8, width=0.5)
    ax2.set_ylabel('同比增速 (%)', fontsize=12, fontweight='bold')
    ax2.set_title('年同比增速变化', fontsize=14, fontweight='bold', pad=10)
    ax2.grid(True, alpha=0.3, axis='y')
    ax2.set_ylim(0, 35)
    
    for i, (x, val) in enumerate(zip(years_growth, growth_rates)):
        ax2.text(i, val + 0.8, f'{val}%', ha='center', va='bottom', fontsize=10, fontweight='bold')
    
    # 子图3：占全社会用电比重
    ax3 = axes[1, 0]
    ax3.fill_between(years, 0, global_ratio, alpha=0.3, color='#3498db')
    ax3.plot(years, global_ratio, 's-', color='#3498db', linewidth=3, markersize=10, label='占全社会用电比重')
    ax3.set_ylabel('占全社会用电比重 (%)', fontsize=12, fontweight='bold')
    ax3.set_title('占全社会用电比重变化', fontsize=14, fontweight='bold', pad=10)
    ax3.grid(True, alpha=0.3)
    ax3.set_ylim(0, 7)
    
    for x, val in zip(years, global_ratio):
        ax3.annotate(f'{val}%', (x, val), textcoords="offset points", 
                    xytext=(0, 10), ha='center', fontsize=10, fontweight='bold')
    
    ax3.legend(loc='upper left')
    
    # 子图4：AI算力占比
    ax4 = axes[1, 1]
    ax4.plot(years, ai_ratio, 'D-', color='#2ecc71', linewidth=3, markersize=12, label='AI算力占比')
    ax4.fill_between(years, 0, ai_ratio, alpha=0.2, color='#2ecc71')
    ax4.set_ylabel('AI算力占比 (%)', fontsize=12, fontweight='bold')
    ax4.set_title('AI算力占比变化趋势', fontsize=14, fontweight='bold', pad=10)
    ax4.grid(True, alpha=0.3)
    ax4.set_ylim(0, 60)
    
    for x, val in zip(years, ai_ratio):
        ax4.annotate(f'{val}%', (x, val), textcoords="offset points", 
                    xytext=(0, 10), ha='center', fontsize=10, fontweight='bold')
    
    ax4.legend(loc='upper left')
    
    # 添加说明文字
    fig.text(0.5, 0.01, '注：2030年中国AI用电量将达4000-7000亿千瓦时，占全社会用电比重达5.5%', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('chart_china_power_prediction.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：chart_china_power_prediction.png")

def generate_china_combined_chart():
    """生成中国综合对比图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    power_100m = [1960, 2500, 3200, 4000, 5000, 5500]
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
    fig.suptitle('2025-2030年中国数据中心耗电量预测综合图表', 
                 fontsize=16, fontweight='bold', y=1.02)
    
    # 左图：堆叠柱状图（AI vs 传统）
    ai_power = [p * (ar/100) for p, ar in zip(power_100m, [30, 35, 40, 45, 48, 50])]
    non_ai_power = [p - a for p, a in zip(power_100m, ai_power)]
    
    x = np.arange(len(years))
    width = 0.6
    
    bars1 = ax1.bar(x, non_ai_power, width, label='传统数据中心耗电', color='#3498db', alpha=0.8)
    bars2 = ax1.bar(x, ai_power, width, bottom=non_ai_power, label='AI算力耗电', color='#2ecc71', alpha=0.8)
    
    ax1.set_ylabel('耗电量 (亿度)', fontsize=12, fontweight='bold')
    ax1.set_title('中国数据中心耗电量构成', fontsize=14, fontweight='bold')
    ax1.set_xticks(x)
    ax1.set_xticklabels(years)
    ax1.legend(loc='upper left')
    ax1.grid(True, alpha=0.3, axis='y')
    
    # 添加总计标签
    for i, (n, a, total) in enumerate(zip(non_ai_power, ai_power, power_100m)):
        ax1.text(i, total + 100, f'{total}', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    ax1.set_ylim(0, 6500)
    
    # 右图：AI占比变化对比
    ai_ratio = [30, 35, 40, 45, 48, 50]
    ax2.plot(years, ai_ratio, 'o-', color='#2ecc71', linewidth=4, markersize=14, 
             markeredgecolor='white', markeredgewidth=2, label='AI算力占比')
    ax2.fill_between(years, 0, ai_ratio, alpha=0.2, color='#2ecc71')
    
    ax2.set_ylabel('AI算力占比 (%)', fontsize=12, fontweight='bold')
    ax2.set_xlabel('年份', fontsize=12, fontweight='bold')
    ax2.set_title('AI算力占比持续提升', fontsize=14, fontweight='bold')
    ax2.grid(True, alpha=0.3, linestyle='--')
    ax2.set_ylim(0, 60)
    
    for x, val in zip(years, ai_ratio):
        ax2.annotate(f'{val}%', (x, val), textcoords="offset points", 
                    xytext=(0, 12), ha='center', fontsize=11, fontweight='bold', color='#2ecc71')
    
    ax2.legend(loc='upper left')
    
    # 添加说明
    fig.text(0.5, 0.02, '关键洞察：中国数据中心耗电量从1960亿度增长至5500亿度，增幅达180%；AI算力占比从30%提升至50%', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_china_power_combined.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("综合图表已生成：chart_china_power_combined.png")

def generate_china_trend_line_chart():
    """生成中国趋势线图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    power_100m = [1960, 2500, 3200, 4000, 5000, 5500]
    
    fig, ax = plt.subplots(figsize=(14, 8))
    
    # 创建渐变填充区域
    ax.fill_between(years, 0, power_100m, alpha=0.3, color='#e74c3c')
    
    # 主趋势线
    ax.plot(years, power_100m, 'o-', color='#e74c3c', linewidth=4, markersize=14, 
            markeredgecolor='white', markeredgewidth=2, label='耗电量 (亿度)')
    
    # 添加数值标签
    for x, val in zip(years, power_100m):
        ax.annotate(f'{val} 亿度', (x, val), textcoords="offset points", 
                    xytext=(0, 15), ha='center', fontsize=12, fontweight='bold',
                    color='#e74c3c')
    
    ax.set_ylabel('耗电量 (亿度)', fontsize=14, fontweight='bold')
    ax.set_xlabel('年份', fontsize=14, fontweight='bold')
    ax.set_title('2025-2030年中国数据中心耗电量预测趋势', 
                 fontsize=18, fontweight='bold', pad=20)
    
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.set_ylim(0, 6500)
    
    # 添加关键洞察文本框
    props = dict(boxstyle='round,pad=0.5', facecolor='#fef9e7', alpha=0.9, edgecolor='#e67e22')
    ax.text(0.02, 0.98, '关键数据：\n• 2030年耗电量将达5500亿度\n• 较2025年增长180%\n• AI算力占比提升至50%\n• 占全社会用电5.5%',
            transform=ax.transAxes, fontsize=11, verticalalignment='top', bbox=props)
    
    # 添加数据来源
    fig.text(0.99, 0.01, '数据来源：中核集团调研报告', 
             ha='right', fontsize=9, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_china_power_trend.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("趋势图已生成：chart_china_power_trend.png")

if __name__ == '__main__':
    print("开始生成中国数据中心耗电量预测图表...")
    generate_china_power_chart()
    generate_china_combined_chart()
    generate_china_trend_line_chart()
    print("\n所有图表生成完成！")
