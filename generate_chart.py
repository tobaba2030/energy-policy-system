import matplotlib.pyplot as plt
import matplotlib
matplotlib.rcParams['font.sans-serif'] = ['SimHei']
matplotlib.rcParams['axes.unicode_minus'] = False

# 数据
years = ['2024', '2025', '2026E', '2027E', '2028E', '2029E', '2030E']
global_twh = [415, 485, 600, 720, 850, 920, 950]
china_100m_kwh = [2500, 1960, 2500, 3200, 4000, 5000, 5500]

# 创建图表
fig, ax1 = plt.subplots(figsize=(12, 6))

# 全球数据中心耗电量 - 折线图
color1 = '#1f77b4'
ax1.set_xlabel('年份', fontsize=14)
ax1.set_ylabel('全球数据中心耗电量 (TWh)', color=color1, fontsize=14)
line1, = ax1.plot(years, global_twh, marker='o', linewidth=3, color=color1, label='全球数据中心耗电量(TWh)')
ax1.tick_params(axis='y', labelcolor=color1)

# 中国数据中心耗电量 - 柱状图
ax2 = ax1.twinx()
color2 = '#ff7f0e'
ax2.set_ylabel('中国数据中心耗电量 (亿千瓦时)', color=color2, fontsize=14)
bars = ax2.bar(years, china_100m_kwh, alpha=0.6, color=color2, label='中国数据中心耗电量(亿千瓦时)')
ax2.tick_params(axis='y', labelcolor=color2)

# 添加标题和图例
plt.title('2024-2030年全球与中国数据中心耗电量趋势', fontsize=16, fontweight='bold', pad=20)
fig.legend(loc='upper left', bbox_to_anchor=(0.1, 0.95))

# 添加网格
ax1.grid(True, alpha=0.3)

# 调整布局
plt.tight_layout()

# 保存图表
plt.savefig('data_center_power_consumption.png', dpi=300, bbox_inches='tight')
print("图表已生成并保存为: data_center_power_consumption.png")

# 显示图表
plt.show()
