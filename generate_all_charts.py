import matplotlib.pyplot as plt
import matplotlib
import numpy as np

matplotlib.rcParams['font.sans-serif'] = ['SimHei']
matplotlib.rcParams['axes.unicode_minus'] = False

def generate_power_consumption_chart():
    """生成图1：全球与中国数据中心耗电量趋势"""
    years = ['2024', '2025', '2026E', '2027E', '2028E', '2029E', '2030E']
    global_twh = [415, 485, 600, 720, 850, 920, 950]
    china_100m_kwh = [2500, 1960, 2500, 3200, 4000, 5000, 5500]

    fig, ax1 = plt.subplots(figsize=(12, 6))
    color1 = '#1f77b4'
    ax1.set_xlabel('年份', fontsize=14)
    ax1.set_ylabel('全球数据中心耗电量 (TWh)', color=color1, fontsize=14)
    line1, = ax1.plot(years, global_twh, marker='o', linewidth=3, color=color1, label='全球数据中心耗电量(TWh)')
    ax1.tick_params(axis='y', labelcolor=color1)
    ax2 = ax1.twinx()
    color2 = '#ff7f0e'
    ax2.set_ylabel('中国数据中心耗电量 (亿千瓦时)', color=color2, fontsize=14)
    bars = ax2.bar(years, china_100m_kwh, alpha=0.6, color=color2, label='中国数据中心耗电量(亿千瓦时)')
    ax2.tick_params(axis='y', labelcolor=color2)
    plt.title('2024-2030年全球与中国数据中心耗电量趋势', fontsize=16, fontweight='bold', pad=20)
    lines = [line1, bars]
    labels = [l.get_label() for l in lines]
    ax1.legend(lines, labels, loc='upper left')
    ax1.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('chart1_power_consumption.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("图表1已生成：图1 2024-2030年全球与中国数据中心耗电量趋势")

def generate_market_trend_chart():
    """生成图2：市场动态与中核收入预测"""
    years = ['2026E', '2027E', '2028E', '2029E', '2030E']
    market_size = [3500, 4000, 4600, 5200, 6000]
    carbon_price = [125, 140, 155, 170, 185]
    cnnc_revenue_low = [10, 25, 50, 80, 150]
    cnnc_revenue_high = [15, 35, 70, 100, 200]

    fig, ax1 = plt.subplots(figsize=(12, 6))
    color1 = '#2ca02c'
    ax1.set_xlabel('年份', fontsize=14)
    ax1.set_ylabel('数据中心市场规模 (亿元)', color=color1, fontsize=14)
    line1, = ax1.plot(years, market_size, marker='s', linewidth=3, color=color1, label='数据中心市场规模')
    ax1.tick_params(axis='y', labelcolor=color1)
    ax2 = ax1.twinx()
    color2 = '#d62728'
    ax2.set_ylabel('碳配额均价 (元/吨) & 中核收入 (亿元)', color=color2, fontsize=14)
    line2, = ax2.plot(years, carbon_price, marker='^', linewidth=2, color=color2, label='碳配额均价')
    line3, = ax2.plot(years, cnnc_revenue_low, marker='o', linestyle='--', linewidth=2, color='#9467bd', label='中核收入(低预测)')
    line4, = ax2.plot(years, cnnc_revenue_high, marker='D', linestyle='--', linewidth=2, color='#8c564b', label='中核收入(高预测)')
    ax2.tick_params(axis='y', labelcolor=color2)
    plt.title('2026-2030年市场动态与中核收入预测', fontsize=16, fontweight='bold', pad=20)
    lines = [line1, line2, line3, line4]
    labels = [l.get_label() for l in lines]
    ax1.legend(lines, labels, loc='upper left')
    ax1.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('chart2_market_trend.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("图表2已生成：图2 市场竞争格局演进与中核收入预测")

def generate_tech_maturity_chart():
    """生成技术成熟度雷达图"""
    tech_categories = ['数字孪生', '边缘智能', '电力大模型', '源网荷储算脑', '碳能算一体化', '具身智能', '量子计算']
    maturity_scores = [4.5, 4.0, 3.0, 3.0, 3.0, 2.0, 1.0]
    cnnc_basics = [4.5, 4.0, 3.0, 3.0, 3.0, 2.0, 1.0]

    angles = np.linspace(0, 2 * np.pi, len(tech_categories), endpoint=False).tolist()
    maturity_scores += maturity_scores[:1]
    cnnc_basics += cnnc_basics[:1]
    angles += angles[:1]

    fig, ax = plt.subplots(figsize=(10, 10), subplot_kw=dict(projection='polar'))
    ax.plot(angles, maturity_scores, 'o-', linewidth=2, label='技术成熟度', color='#1f77b4')
    ax.fill(angles, maturity_scores, alpha=0.25, color='#1f77b4')
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(tech_categories, fontsize=12)
    ax.set_ylim(0, 5)
    ax.set_yticks([1, 2, 3, 4, 5])
    ax.set_yticklabels(['1', '2', '3', '4', '5'], fontsize=10)
    plt.title('技术成熟度雷达图 (1-5星)', fontsize=16, fontweight='bold', pad=20)
    ax.grid(True)
    plt.tight_layout()
    plt.savefig('chart3_tech_maturity.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("图表3已生成：技术成熟度雷达图")

def generate_business_chart():
    """生成业务板块收入预测堆叠图"""
    years = ['2026E', '2027E', '2028E', '2029E', '2030E']
    green_power = [6, 15, 30, 45, 80]
    carbon_asset = [2, 6, 12, 20, 40]
    tech_output = [2, 4, 8, 15, 40]

    fig, ax = plt.subplots(figsize=(12, 6))
    ax.bar(years, green_power, label='绿色算力服务', color='#1f77b4')
    ax.bar(years, carbon_asset, bottom=green_power, label='碳资产管理', color='#ff7f0e')
    ax.bar(years, tech_output, bottom=np.array(green_power)+np.array(carbon_asset), label='技术输出', color='#2ca02c')
    ax.set_xlabel('年份', fontsize=14)
    ax.set_ylabel('收入 (亿元)', fontsize=14)
    plt.title('2026-2030年中核电算协同业务板块收入预测', fontsize=16, fontweight='bold', pad=20)
    plt.legend(loc='upper left')
    ax.grid(True, alpha=0.3, axis='y')
    plt.tight_layout()
    plt.savefig('chart4_business_segments.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("图表4已生成：业务板块收入预测堆叠图")

def generate_investment_chart():
    """生成资金投入与回报预测图"""
    years = ['2026E', '2027E', '2028E', '2029E', '2030E']
    investment = [25, 30, 35, 30, 25]
    revenue_avg = [12.5, 30, 60, 90, 175]

    x = np.arange(len(years))
    width = 0.35

    fig, ax = plt.subplots(figsize=(12, 6))
    rects1 = ax.bar(x - width/2, investment, width, label='资金投入', color='#d62728')
    rects2 = ax.bar(x + width/2, revenue_avg, width, label='预计收入', color='#2ca02c')
    ax.set_xlabel('年份', fontsize=14)
    ax.set_ylabel('金额 (亿元)', fontsize=14)
    ax.set_title('2026-2030年资金投入与回报预测', fontsize=16, fontweight='bold', pad=20)
    ax.set_xticks(x)
    ax.set_xticklabels(years)
    ax.legend()
    ax.grid(True, alpha=0.3, axis='y')
    plt.tight_layout()
    plt.savefig('chart5_investment_return.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("图表5已生成：资金投入与回报预测图")

def generate_regional_layout_chart():
    """生成区域布局示意图"""
    plt.figure(figsize=(10, 8))
    regions = ['长三角(秦山)', '粤港澳(大亚湾)', '京津冀', '东南(福清)', '内蒙古', '甘肃', '宁夏', '新疆']
    importance = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5]
    colors = ['#1f77b4', '#1f77b4', '#1f77b4', '#1f77b4', '#ff7f0e', '#ff7f0e', '#ff7f0e', '#ff7f0e']
    plt.barh(regions, importance, color=colors)
    plt.xlabel('战略重要性 (1-5)', fontsize=14)
    plt.title('中核电算协同业务区域布局战略重要性', fontsize=16, fontweight='bold', pad=20)
    plt.xlim(0, 5.5)
    plt.grid(True, alpha=0.3, axis='x')
    plt.tight_layout()
    plt.savefig('chart6_regional_layout.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("图表6已生成：区域布局示意图")

def generate_talent_chart():
    """生成人才队伍结构饼图"""
    categories = ['AI/大数据专家', '电力系统专家', '碳资产专家', '项目管理人才', '复合型人才']
    numbers = [40, 30, 20, 35, 75]
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']
    plt.figure(figsize=(10, 8))
    plt.pie(numbers, labels=categories, autopct='%1.1f%%', colors=colors, startangle=90)
    plt.title('2026-2030年人才队伍结构规划', fontsize=16, fontweight='bold', pad=20)
    plt.axis('equal')
    plt.tight_layout()
    plt.savefig('chart7_talent_structure.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("图表7已生成：人才队伍结构饼图")

if __name__ == '__main__':
    print("开始生成报告图表...")
    generate_power_consumption_chart()
    generate_market_trend_chart()
    generate_tech_maturity_chart()
    generate_business_chart()
    generate_investment_chart()
    generate_regional_layout_chart()
    generate_talent_chart()
    print("\n所有图表生成完成！")
