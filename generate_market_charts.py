# -*- coding: utf-8 -*-
"""
生成中国电算协同市场规模预测可视化图表
"""
import matplotlib.pyplot as plt
import matplotlib
import numpy as np

# 设置中文字体
matplotlib.rcParams['font.sans-serif'] = ['Microsoft YaHei', 'SimHei', 'SimSun']
matplotlib.rcParams['axes.unicode_minus'] = False
matplotlib.rcParams['font.family'] = 'sans-serif'

def generate_market_chart():
    """生成电算协同市场规模预测图表"""
    
    # 数据
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    market_total = [2800, 3500, 4200, 5000, 5800, 6500]  # 总市场规模
    market_ecompute = [140, 245, 420, 700, 986, 1300]    # 电算协同市场规模
    penetration = [5, 7, 10, 14, 17, 20]                  # 渗透率
    cagr = [75, 71, 67, 41, 32]                           # 同比增速
    years_cagr = ['2026E', '2027E', '2028E', '2029E', '2030E']
    
    # 创建图表
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle('表7 2025-2030年中国电算协同市场规模预测', 
                 fontsize=18, fontweight='bold', y=0.98)
    
    # 子图1：双轴柱状图+折线图
    ax1 = axes[0, 0]
    x = np.arange(len(years))
    width = 0.35
    
    bars1 = ax1.bar(x - width/2, market_total, width, label='数据中心市场规模', 
                    color='#3498db', alpha=0.8, edgecolor='#2980b9')
    bars2 = ax1.bar(x + width/2, market_ecompute, width, label='电算协同市场规模', 
                    color='#e74c3c', alpha=0.8, edgecolor='#c0392b')
    
    ax1.set_ylabel('市场规模 (亿元)', fontsize=12, fontweight='bold')
    ax1.set_title('市场规模对比', fontsize=14, fontweight='bold', pad=10)
    ax1.set_xticks(x)
    ax1.set_xticklabels(years)
    ax1.legend(loc='upper left')
    ax1.grid(True, alpha=0.3, axis='y')
    
    # 添加数值标签
    for bar, val in zip(bars1, market_total):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 80, 
                f'{val}', ha='center', va='bottom', fontsize=9, fontweight='bold')
    for bar, val in zip(bars2, market_ecompute):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 80, 
                f'{val}', ha='center', va='bottom', fontsize=9, fontweight='bold')
    
    ax1.set_ylim(0, 7500)
    
    # 子图2：渗透率变化
    ax2 = axes[0, 1]
    colors_penetration = plt.cm.Greens(np.linspace(0.3, 0.9, len(years)))
    bars3 = ax2.bar(years, penetration, color=colors_penetration, edgecolor='#27ae60', 
                    alpha=0.85, width=0.6)
    ax2.set_ylabel('渗透率 (%)', fontsize=12, fontweight='bold')
    ax2.set_title('电算协同渗透率变化', fontsize=14, fontweight='bold', pad=10)
    ax2.grid(True, alpha=0.3, axis='y')
    ax2.set_ylim(0, 25)
    
    for bar, val in zip(bars3, penetration):
        ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.5, 
                f'{val}%', ha='center', va='bottom', fontsize=11, fontweight='bold', color='#27ae60')
    
    # 添加趋势线
    ax2.plot(years, penetration, 'o-', color='#27ae60', linewidth=2, markersize=6)
    
    # 子图3：CAGR变化
    ax3 = axes[1, 0]
    colors_cagr = plt.cm.Oranges(np.linspace(0.9, 0.3, len(years_cagr)))
    bars4 = ax3.bar(years_cagr, cagr, color=colors_cagr, edgecolor='#d35400', 
                    alpha=0.85, width=0.5)
    ax3.set_ylabel('CAGR (%)', fontsize=12, fontweight='bold')
    ax3.set_title('年复合增长率变化趋势', fontsize=14, fontweight='bold', pad=10)
    ax3.grid(True, alpha=0.3, axis='y')
    ax3.set_ylim(0, 90)
    
    for i, (x, val) in enumerate(zip(years_cagr, cagr)):
        ax3.text(i, val + 2, f'{val}%', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    # 添加下降趋势线
    z = np.polyfit(range(len(cagr)), cagr, 1)
    p = np.poly1d(z)
    ax3.plot(range(len(cagr)), p(range(len(cagr))), '--', color='#c0392b', linewidth=2, 
             label='下降趋势')
    ax3.legend(loc='upper right')
    
    # 子图4：渗透率饼图变化
    ax4 = axes[1, 1]
    
    # 创建双饼图
    sizes_2025 = [95, 5]
    sizes_2030 = [80, 20]
    
    colors_pie = ['#bdc3c7', '#e74c3c']
    
    # 2025年饼图
    wedge_props = {'width': 0.4, 'edgecolor': 'white', 'linewidth': 2}
    ax4_1 = fig.add_axes([0.58, 0.12, 0.15, 0.3])
    wedges1, texts1, autotexts1 = ax4_1.pie(sizes_2025, labels=['传统\n95%', '电算协同\n5%'], 
                                            colors=colors_pie, autopct='',
                                            startangle=90, textprops={'fontsize': 9},
                                            wedgeprops=wedge_props)
    ax4_1.set_title('2025年', fontsize=11, fontweight='bold')
    
    # 2030年饼图
    colors_pie2 = ['#95a5a6', '#e74c3c']
    ax4_2 = fig.add_axes([0.78, 0.12, 0.15, 0.3])
    wedges2, texts2, autotexts2 = ax4_2.pie(sizes_2030, labels=['传统\n80%', '电算协同\n20%'], 
                                            colors=colors_pie2, autopct='',
                                            startangle=90, textprops={'fontsize': 9},
                                            wedgeprops=wedge_props)
    ax4_2.set_title('2030年E', fontsize=11, fontweight='bold')
    
    ax4.axis('off')
    ax4.set_title('渗透率从5%提升至20%', fontsize=14, fontweight='bold', pad=10)
    
    # 添加说明文字
    fig.text(0.5, 0.01, '注：电算协同市场规模将从140亿元增长至1300亿元，渗透率从5%提升至20%', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout(rect=[0, 0.03, 1, 0.95])
    plt.savefig('chart_market_prediction.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("图表已生成：chart_market_prediction.png")

def generate_market_combined_chart():
    """生成市场规模综合对比图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    market_total = [2800, 3500, 4200, 5000, 5800, 6500]
    market_ecompute = [140, 245, 420, 700, 986, 1300]
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))
    fig.suptitle('2025-2030年中国电算协同市场规模预测综合图表', 
                 fontsize=16, fontweight='bold', y=1.02)
    
    # 左图：双轴面积图
    ax1.fill_between(years, 0, market_total, alpha=0.2, color='#3498db', label='数据中心总市场')
    ax1.fill_between(years, 0, market_ecompute, alpha=0.4, color='#e74c3c', label='电算协同市场')
    ax1.plot(years, market_total, 'o-', color='#3498db', linewidth=3, markersize=10)
    ax1.plot(years, market_ecompute, 's-', color='#e74c3c', linewidth=3, markersize=10)
    
    ax1.set_ylabel('市场规模 (亿元)', fontsize=12, fontweight='bold')
    ax1.set_xlabel('年份', fontsize=12, fontweight='bold')
    ax1.set_title('市场规模双轴对比', fontsize=14, fontweight='bold')
    ax1.legend(loc='upper left')
    ax1.grid(True, alpha=0.3, linestyle='--')
    ax1.set_ylim(0, 7500)
    
    # 添加数值标签
    for x, val1, val2 in zip(years, market_total, market_ecompute):
        ax1.annotate(f'{val1}', (x, val1), textcoords="offset points", 
                    xytext=(0, 10), ha='center', fontsize=9, fontweight='bold', color='#3498db')
        ax1.annotate(f'{val2}', (x, val2), textcoords="offset points", 
                    xytext=(0, 10), ha='center', fontsize=9, fontweight='bold', color='#e74c3c')
    
    # 右图：增长倍数柱状图
    growth_multiples = [1.0, 1.75, 3.0, 5.0, 7.0, 9.3]  # 相对于2025年的倍数
    years_label = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    
    colors_growth = ['#3498db' if m < 3 else '#e67e22' if m < 6 else '#e74c3c' for m in growth_multiples]
    bars = ax2.bar(years_label, growth_multiples, color=colors_growth, edgecolor='white', 
                   alpha=0.85, width=0.6)
    
    ax2.set_ylabel('增长倍数 (以2025年为基准)', fontsize=12, fontweight='bold')
    ax2.set_title('电算协同市场增长倍数', fontsize=14, fontweight='bold')
    ax2.grid(True, alpha=0.3, axis='y')
    ax2.set_ylim(0, 12)
    
    for bar, val in zip(bars, growth_multiples):
        ax2.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.2, 
                f'{val:.1f}倍', ha='center', va='bottom', fontsize=11, fontweight='bold')
    
    # 添加说明
    fig.text(0.5, 0.02, '关键洞察：电算协同市场规模将增长9.3倍，从140亿元增长至1300亿元，超70%CAGR', 
             ha='center', fontsize=11, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_market_combined.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("综合图表已生成：chart_market_combined.png")

def generate_market_trend_chart():
    """生成市场规模趋势图表"""
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    market_total = [2800, 3500, 4200, 5000, 5800, 6500]
    market_ecompute = [140, 245, 420, 700, 986, 1300]
    
    fig, ax = plt.subplots(figsize=(14, 8))
    
    # 双Y轴设置
    ax2 = ax.twinx()
    
    # 主图：电算协同市场规模
    ax.fill_between(years, 0, market_ecompute, alpha=0.3, color='#e74c3c')
    line1 = ax.plot(years, market_ecompute, 'o-', color='#e74c3c', linewidth=4, markersize=14, 
                   markeredgecolor='white', markeredgewidth=2, label='电算协同市场规模')
    
    # 副图：总市场规模
    ax2.fill_between(years, 0, market_total, alpha=0.1, color='#3498db')
    line2 = ax2.plot(years, market_total, 's--', color='#3498db', linewidth=2, markersize=10, 
                    label='数据中心总市场')
    
    ax.set_ylabel('电算协同市场规模 (亿元)', fontsize=14, fontweight='bold', color='#e74c3c')
    ax2.set_ylabel('数据中心总市场规模 (亿元)', fontsize=14, fontweight='bold', color='#3498db')
    ax.set_xlabel('年份', fontsize=14, fontweight='bold')
    ax.set_title('2025-2030年中国电算协同市场规模预测趋势', 
                 fontsize=18, fontweight='bold', pad=20)
    
    # 设置Y轴范围
    ax.set_ylim(0, 1500)
    ax2.set_ylim(0, 7500)
    
    # 添加数值标签
    for x, val in zip(years, market_ecompute):
        ax.annotate(f'{val}亿', (x, val), textcoords="offset points", 
                    xytext=(0, 15), ha='center', fontsize=12, fontweight='bold', color='#e74c3c')
    
    # 合并图例
    lines1, labels1 = ax.get_legend_handles_labels()
    lines2, labels2 = ax2.get_legend_handles_labels()
    ax.legend(lines1 + lines2, labels1 + labels2, loc='upper left', fontsize=11)
    
    ax.grid(True, alpha=0.3, linestyle='--')
    
    # 添加关键洞察文本框
    props = dict(boxstyle='round,pad=0.5', facecolor='#fef9e7', alpha=0.9, edgecolor='#e67e22')
    ax.text(0.02, 0.98, '关键数据：\n• 电算协同市场增长9.3倍\n• 从140亿增至1300亿元\n• CAGR超70%\n• 渗透率达20%',
            transform=ax.transAxes, fontsize=11, verticalalignment='top', bbox=props)
    
    # 添加数据来源
    fig.text(0.99, 0.01, '数据来源：中核集团调研报告', 
             ha='right', fontsize=9, style='italic', color='gray')
    
    plt.tight_layout()
    plt.savefig('chart_market_trend.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("趋势图已生成：chart_market_trend.png")

def generate_penetration_radar():
    """生成渗透率增长雷达图"""
    
    fig, ax = plt.subplots(figsize=(10, 8), subplot_kw=dict(projection='polar'))
    
    years = ['2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    penetration = [5, 7, 10, 14, 17, 20]
    
    # 转换为雷达图角度
    angles = np.linspace(0, 2 * np.pi, len(years), endpoint=False).tolist()
    angles += angles[:1]  # 闭合
    penetration += penetration[:1]  # 闭合
    
    # 绘制雷达图
    ax.plot(angles, penetration, 'o-', linewidth=3, color='#e74c3c', markersize=12)
    ax.fill(angles, penetration, alpha=0.3, color='#e74c3c')
    
    # 设置标签
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(years, fontsize=12)
    ax.set_ylim(0, 25)
    ax.set_yticks([5, 10, 15, 20])
    ax.set_yticklabels(['5%', '10%', '15%', '20%'], fontsize=10)
    
    ax.set_title('电算协同渗透率增长雷达图', fontsize=16, fontweight='bold', pad=20)
    
    plt.tight_layout()
    plt.savefig('chart_penetration_radar.png', dpi=400, bbox_inches='tight', facecolor='white')
    plt.close()
    print("雷达图已生成：chart_penetration_radar.png")

if __name__ == '__main__':
    print("开始生成电算协同市场规模预测图表...")
    generate_market_chart()
    generate_market_combined_chart()
    generate_market_trend_chart()
    generate_penetration_radar()
    print("\n所有图表生成完成！")
