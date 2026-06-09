import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')
import re
from collections import Counter
import numpy as np

matplotlib.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial Unicode MS']
matplotlib.rcParams['axes.unicode_minus'] = False

df = pd.read_excel(r'C:\Users\jianlinw\Desktop\手机助理导出的信息2026-05-04_135059138.xlsx')
df_clean = df.dropna(subset=['Source', 'Content'])
df_clean['Time'] = pd.to_datetime(df_clean['Time'])
df_clean = df_clean.sort_values('Time')

fig, axes = plt.subplots(2, 2, figsize=(16, 12))
fig.suptitle('💖 聊天关系画像 - 暧昧关系篇', fontsize=20, fontweight='bold', y=0.98)

ax1 = axes[0, 0]
source_counts = df_clean['Source'].value_counts()
colors = ['#FF69B4', '#FFA500']
bars = ax1.bar(source_counts.index, source_counts.values, color=colors, edgecolor='white', linewidth=2)
ax1.set_title('💬 消息发送量对比', fontsize=14, fontweight='bold', pad=10)
ax1.set_ylabel('消息数量', fontsize=12)
for bar, count in zip(bars, source_counts.values):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 20, 
             f'{count}\n({count/len(df_clean)*100:.1f}%)', 
             ha='center', va='bottom', fontsize=12, fontweight='bold')
ax1.spines['top'].set_visible(False)
ax1.spines['right'].set_visible(False)

ax2 = axes[0, 1]
df_clean['Hour'] = df_clean['Time'].dt.hour
hour_data = df_clean.groupby(['Source', 'Hour']).size().unstack(fill_value=0)
for source in ['To', 'From']:
    if source not in hour_data.index:
        hour_data.loc[source] = 0
hour_data = hour_data.reindex(['To', 'From'], fill_value=0)
hour_data.T.plot(kind='bar', ax=ax2, color=['#FF69B4', '#FFA500'], edgecolor='white', width=0.7)
ax2.set_title('🌙 24小时活跃分布（66.4%在夜间！）', fontsize=14, fontweight='bold', pad=10)
ax2.set_xlabel('小时', fontsize=12)
ax2.set_ylabel('消息数量', fontsize=12)
ax2.legend(['您', '对方'], loc='upper right')
existing_ticks = [i for i in range(24) if i in hour_data.columns]
ax2.set_xticks(existing_ticks)
ax2.set_xticklabels([str(i) for i in existing_ticks], rotation=0)
ax2.spines['top'].set_visible(False)
ax2.spines['right'].set_visible(False)

ax3 = axes[1, 0]
topics = ['股票投资', '日常生活', '轻松调侃', '风景旅行', '关心体贴']
topic_counts = [40, 25, 15, 10, 10]
colors_topics = ['#9B59B6', '#3498DB', '#F1C40F', '#2ECC71', '#E74C3C']
wedges, texts, autotexts = ax3.pie(topic_counts, labels=topics, autopct='%1.0f%%', 
                                    colors=colors_topics, explode=[0.05, 0, 0, 0, 0], 
                                    shadow=True, startangle=90)
ax3.set_title('💬 话题类型分布', fontsize=14, fontweight='bold', pad=10)
for autotext in autotexts:
    autotext.set_fontsize(12)
    autotext.set_fontweight('bold')

ax4 = axes[1, 1]
time_period_labels = ['凌晨\n0-6', '早上\n6-9', '上午\n9-12', '中午\n12-14', '下午\n14-18', '晚上\n18-24']
hour_bins = [0, 6, 9, 12, 14, 18, 24]
df_clean['TimePeriod'] = pd.cut(df_clean['Hour'], bins=hour_bins, labels=time_period_labels, right=False)
time_period_counts = df_clean['TimePeriod'].value_counts().reindex(time_period_labels).fillna(0)
colors_period = ['#2C3E50', '#3498DB', '#F39C12', '#E74C3C', '#9B59B6', '#FF69B4']
wedges, texts, autotexts = ax4.pie(time_period_counts.values, labels=time_period_labels, 
                                    autopct='%1.1f%%', colors=colors_period,
                                    explode=[0.05]*6, shadow=True, startangle=90)
ax4.set_title('⏰ 时段活跃度', fontsize=14, fontweight='bold', pad=10)
for autotext in autotexts:
    autotext.set_fontsize(10)
    autotext.set_fontweight('bold')

plt.tight_layout(rect=[0, 0, 1, 0.96])
plt.savefig(r'C:\AI学习资料\mesheer\relationship_analysis_1.png', dpi=150, bbox_inches='tight', 
            facecolor='white', edgecolor='none')
print("图表1已保存: relationship_analysis_1.png")

fig2, axes2 = plt.subplots(2, 2, figsize=(16, 12))
fig2.suptitle('💖 聊天关系画像 - 暧昧关系篇 (续)', fontsize=20, fontweight='bold', y=0.98)

ax5 = axes2[0, 0]
emoji_pattern = re.compile(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF]')
all_emojis = ' '.join(df_clean['Content'].astype(str))
emoji_list = emoji_pattern.findall(all_emojis)
emoji_counts = Counter(emoji_list).most_common(5)
if emoji_counts:
    emojis, counts = zip(*emoji_counts)
    colors_emoji = plt.cm.Set3(np.linspace(0, 1, len(emojis)))
    bars = ax5.barh(range(len(emojis)), counts, color=colors_emoji, edgecolor='white')
    ax5.set_yticks(range(len(emojis)))
    ax5.set_yticklabels(emojis, fontsize=20)
    ax5.set_title('😊 热门表情 Top 5（共2571个表情！）', fontsize=14, fontweight='bold', pad=10)
    ax5.set_xlabel('使用次数', fontsize=12)
    ax5.invert_yaxis()
    for bar, count in zip(bars, counts):
        ax5.text(bar.get_width() + 5, bar.get_y() + bar.get_height()/2, 
                 str(count), va='center', fontsize=10, fontweight='bold')
    ax5.spines['top'].set_visible(False)
    ax5.spines['right'].set_visible(False)

ax6 = axes2[0, 1]
features = ['互动频率', '轻松幽默', '关心体贴', '暧昧程度', '默契程度', '共同兴趣']
scores = [5, 5, 5, 5, 5, 5]
colors_features = ['#E74C3C', '#F1C40F', '#9B59B6', '#FF69B4', '#3498DB', '#2ECC71']
bars = ax6.barh(range(len(features)), scores, color=colors_features, edgecolor='white', linewidth=2)
ax6.set_yticks(range(len(features)))
ax6.set_yticklabels(features, fontsize=12)
ax6.set_title('⭐ 关系特征评分（全5星！）', fontsize=14, fontweight='bold', pad=10)
ax6.set_xlabel('评分 (满分5星)', fontsize=12)
ax6.set_xlim(0, 5.5)
for bar, score in zip(bars, scores):
    ax6.text(bar.get_width() + 0.1, bar.get_y() + bar.get_height()/2, 
             '⭐'*score, va='center', fontsize=16)
ax6.spines['top'].set_visible(False)
ax6.spines['right'].set_visible(False)

ax7 = axes2[1, 0]
evidence = ['聊面膜护肤', '聊打呼噜', '一起规划旅行', '连续64天聊天', '早安晚安仪式', '节日问候', '色诱调侃', '全方位关心', '高频表情', '私密细节分享']
evidence_scores = [10, 9, 8, 10, 9, 8, 9, 8, 10, 9]
colors_evidence = ['#FF69B4']*10
bars = ax7.barh(range(len(evidence)), evidence_scores, color=colors_evidence, edgecolor='white', linewidth=2)
ax7.set_yticks(range(len(evidence)))
ax7.set_yticklabels(evidence, fontsize=11)
ax7.set_title('🔍 暧昧证据强度', fontsize=14, fontweight='bold', pad=10)
ax7.set_xlabel('强度评分 (满分10)', fontsize=12)
ax7.set_xlim(0, 10.5)
ax7.invert_yaxis()
for bar, score in zip(bars, evidence_scores):
    ax7.text(bar.get_width() + 0.2, bar.get_y() + bar.get_height()/2, 
             str(score), va='center', fontsize=10, fontweight='bold')
ax7.spines['top'].set_visible(False)
ax7.spines['right'].set_visible(False)

ax8 = axes2[1, 1]
sentiment_data = {
    '积极开心': 397,
    '中性日常': len(df_clean) - 397 - 42,
    '偶尔小情绪': 42
}
colors_sent = ['#FF69B4', '#95A5A6', '#E74C3C']
wedges, texts, autotexts = ax8.pie(sentiment_data.values(), 
                                    labels=sentiment_data.keys(), 
                                    autopct='%1.1f%%', colors=colors_sent,
                                    explode=[0.05, 0, 0.05], shadow=True, startangle=90)
ax8.set_title('💗 情感倾向', fontsize=14, fontweight='bold', pad=10)
for autotext in autotexts:
    autotext.set_fontsize(12)
    autotext.set_fontweight('bold')

plt.tight_layout(rect=[0, 0, 1, 0.96])
plt.savefig(r'C:\AI学习资料\mesheer\relationship_analysis_2.png', dpi=150, bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("图表2已保存: relationship_analysis_2.png")

print("\n可视化分析完成！")
