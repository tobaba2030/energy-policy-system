
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
from collections import Counter
import jieba
import re
import numpy as np
from datetime import datetime
import json
from wordcloud import WordCloud
from datetime import timedelta

# 设置中文字体
matplotlib.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial Unicode MS']
matplotlib.rcParams['axes.unicode_minus'] = False

# 读取聊天记录
file_path = r'C:\Users\jianlinw\Desktop\手机助理导出的信息2026-05-04_135059138.xlsx'
df = pd.read_excel(file_path)

# 清理数据 - 去除第一行无效数据
df = df.dropna(subset=['Source', 'Content'], how='all').reset_index(drop=True)
df = df[df['Source'].isin(['To', 'From'])].copy()

print("=== 聊天记录基本信息 ===")
print(f"有效消息数: {len(df)}")
print(f"对话ID: {df['ConversationID'].unique()}")
print(f"\n时间范围:")
print(f"最早: {df['Time'].min()}")
print(f"最晚: {df['Time'].max()}")

# 基本统计
sender_stats = df['Source'].value_counts()
print(f"\n发送者分布:")
print(sender_stats)

# 1. 消息数量对比
plt.figure(figsize=(10, 6))
sender_stats.plot(kind='bar', color=['#FF6B6B', '#4ECDC4'])
plt.title('两人消息数量对比', fontsize=16)
plt.xlabel('发送者', fontsize=12)
plt.ylabel('消息数量', fontsize=12)
plt.xticks(rotation=0)
plt.tight_layout()
plt.savefig('message_count_comparison.png', dpi=300, bbox_inches='tight')

# 2. 消息长度分析
df['message_length'] = df['Content'].astype(str).apply(len)
length_stats = df.groupby('Source')['message_length'].agg(['mean', 'median', 'std', 'sum'])
print(f"\n消息长度统计:")
print(length_stats)

plt.figure(figsize=(12, 6))
for sender in ['To', 'From']:
    data = df[df['Source'] == sender]['message_length']
    plt.hist(data, bins=30, alpha=0.5, label=sender, density=True)
plt.title('消息长度分布', fontsize=16)
plt.xlabel('消息长度', fontsize=12)
plt.ylabel('密度', fontsize=12)
plt.legend()
plt.tight_layout()
plt.savefig('message_length_distribution.png', dpi=300, bbox_inches='tight')

# 3. 时间分析
df['Time'] = pd.to_datetime(df['Time'])
df['hour'] = df['Time'].dt.hour
df['date'] = df['Time'].dt.date
df['day_of_week'] = df['Time'].dt.dayofweek
df['month'] = df['Time'].dt.to_period('M')

# 按小时的消息分布
hourly_stats = df.groupby(['hour', 'Source']).size().unstack(fill_value=0)
plt.figure(figsize=(14, 6))
hourly_stats.plot(kind='bar', width=0.8, ax=plt.gca())
plt.title('各时段消息分布', fontsize=16)
plt.xlabel('小时', fontsize=12)
plt.ylabel('消息数量', fontsize=12)
plt.legend()
plt.tight_layout()
plt.savefig('hourly_distribution.png', dpi=300, bbox_inches='tight')

# 按日期的消息趋势
daily_stats = df.groupby(['date', 'Source']).size().unstack(fill_value=0)
plt.figure(figsize=(16, 6))
daily_stats.plot(kind='line', marker='o', ax=plt.gca())
plt.title('每日消息趋势', fontsize=16)
plt.xlabel('日期', fontsize=12)
plt.ylabel('消息数量', fontsize=12)
plt.xticks(rotation=45)
plt.legend()
plt.tight_layout()
plt.savefig('daily_trend.png', dpi=300, bbox_inches='tight')

# 按星期的分布
day_names = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
weekly_stats = df.groupby(['day_of_week', 'Source']).size().unstack(fill_value=0)
weekly_stats.index = day_names
plt.figure(figsize=(12, 6))
weekly_stats.plot(kind='bar', ax=plt.gca())
plt.title('周内消息分布', fontsize=16)
plt.xlabel('星期', fontsize=12)
plt.ylabel('消息数量', fontsize=12)
plt.legend()
plt.tight_layout()
plt.savefig('weekly_distribution.png', dpi=300, bbox_inches='tight')

# 4. 文本分析 - 高频词
stop_words = set([
    '的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一', '一个',
    '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有', '看', '好',
    '自己', '这', '那', '他', '她', '我们', '你们', '他们', '什么', '怎么', '为什么',
    '吧', '呢', '啊', '呀', '哦', '嗯', '哈', '啦', '嘛', '呗', '呢', '啊', '呀',
    '图片', '表情', '语音', '视频', '通话', '已', '已取消', '已拒绝', '已接听',
    '撤回', '消息', '删除', '系统', '提示'
])

def get_word_frequency(texts):
    words = []
    for text in texts:
        if pd.isna(text):
            continue
        text = str(text)
        seg_list = jieba.cut(text, cut_all=False)
        for word in seg_list:
            if len(word) > 1 and word not in stop_words:
                words.append(word)
    return Counter(words)

print(f"\n=== 词频分析 ===")
for sender in ['To', 'From']:
    texts = df[df['Source'] == sender]['Content']
    word_freq = get_word_frequency(texts)
    print(f"\n{sender} 高频词TOP 20:")
    print(word_freq.most_common(20))
    
    # 生成词云
    if len(word_freq) > 0:
        wc = WordCloud(
            font_path='C:/Windows/Fonts/msyh.ttc',
            width=800,
            height=600,
            background_color='white',
            max_words=100
        ).generate_from_frequencies(word_freq)
        
        plt.figure(figsize=(10, 8))
        plt.imshow(wc, interpolation='bilinear')
        plt.axis('off')
        plt.title(f'{sender} 词云', fontsize=16)
        plt.tight_layout()
        plt.savefig(f'wordcloud_{sender}.png', dpi=300, bbox_inches='tight')

# 5. 对话模式分析 - 回复间隔
df_sorted = df.sort_values('Time').copy()
df_sorted['time_diff'] = df_sorted['Time'].diff()
df_sorted['prev_sender'] = df_sorted['Source'].shift(1)

# 计算两人之间的平均回复时间
def calculate_response_times(df_sub):
    to_response = []
    from_response = []
    
    for i in range(1, len(df_sub)):
        prev_sender = df_sub.iloc[i-1]['Source']
        curr_sender = df_sub.iloc[i]['Source']
        time_diff = df_sub.iloc[i]['time_diff']
        
        if pd.notna(time_diff):
            if prev_sender == 'From' and curr_sender == 'To':
                to_response.append(time_diff.total_seconds())
            elif prev_sender == 'To' and curr_sender == 'From':
                from_response.append(time_diff.total_seconds())
    
    return to_response, from_response

to_resp, from_resp = calculate_response_times(df_sorted)

print(f"\n=== 回复时间分析 ===")
if to_resp:
    print(f"To 平均回复时间: {np.mean(to_resp)/60:.2f} 分钟")
    print(f"To 中位数回复时间: {np.median(to_resp)/60:.2f} 分钟")
if from_resp:
    print(f"From 平均回复时间: {np.mean(from_resp)/60:.2f} 分钟")
    print(f"From 中位数回复时间: {np.median(from_resp)/60:.2f} 分钟")

# 6. 情感倾向简单分析（基于积极/消极词汇）
positive_words = ['开心', '高兴', '喜欢', '爱', '好', '棒', '优秀', '完美', '幸福', '快乐',
                  '谢谢', '感谢', '太棒了', '真好', '好看', '漂亮', '帅', '美', '甜', '暖']
negative_words = ['难过', '伤心', '生气', '烦', '讨厌', '不好', '糟糕', '痛苦', '难过',
                  '失望', '害怕', '担心', '郁闷', '不开心', '生气', '烦躁']

def count_sentiment_words(texts):
    pos_count = 0
    neg_count = 0
    for text in texts:
        if pd.isna(text):
            continue
        text = str(text)
        for word in positive_words:
            pos_count += text.count(word)
        for word in negative_words:
            neg_count += text.count(word)
    return pos_count, neg_count

print(f"\n=== 情感词分析 ===")
for sender in ['To', 'From']:
    texts = df[df['Source'] == sender]['Content']
    pos, neg = count_sentiment_words(texts)
    print(f"{sender}: 积极词={pos}, 消极词={neg}, 积极比例={pos/(pos+neg+1)*100:.1f}%")

# 7. 对话活跃度 - 活跃天数
active_days = df['date'].nunique()
total_days = (df['date'].max() - df['date'].min()).days + 1
print(f"\n=== 活跃度分析 ===")
print(f"总天数: {total_days} 天")
print(f"活跃天数: {active_days} 天")
print(f"活跃比例: {active_days/total_days*100:.1f}%")
print(f"日均消息数: {len(df)/active_days:.1f} 条")

# 8. 生成完整的分析报告
report = {
    "basic_info": {
        "total_messages": len(df),
        "date_range": {
            "start": str(df['Time'].min()),
            "end": str(df['Time'].max())
        },
        "sender_distribution": sender_stats.to_dict()
    },
    "message_length": length_stats.to_dict(),
    "time_analysis": {
        "active_days": active_days,
        "total_days": total_days,
        "daily_average": len(df)/active_days
    }
}

with open('chat_analysis_report.json', 'w', encoding='utf-8') as f:
    json.dump(report, f, ensure_ascii=False, indent=2)

print(f"\n=== 分析完成 ===")
print(f"生成的文件:")
print("- message_count_comparison.png (消息数量对比)")
print("- message_length_distribution.png (消息长度分布)")
print("- hourly_distribution.png (时段分布)")
print("- daily_trend.png (每日趋势)")
print("- weekly_distribution.png (周内分布)")
print("- wordcloud_To.png (To词云)")
print("- wordcloud_From.png (From词云)")
print("- chat_analysis_report.json (分析报告)")

plt.close('all')
