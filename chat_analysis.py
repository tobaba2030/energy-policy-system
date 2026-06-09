import pandas as pd
import re
from datetime import datetime
import json
import os

df = pd.read_excel(r'C:\Users\jianlinw\Desktop\手机助理导出的信息2026-05-04_135059138.xlsx')

df_clean = df.dropna(subset=['Source', 'Content'])
df_clean['Time'] = pd.to_datetime(df_clean['Time'])
df_clean = df_clean.sort_values('Time')

print("="*80)
print("📊 聊天记录分析报告")
print("="*80)

print("\n📌 基本信息")
print(f"  - 总消息数: {len(df_clean)}")
print(f"  - 日期范围: {df_clean['Time'].min().strftime('%Y-%m-%d')} 到 {df_clean['Time'].max().strftime('%Y-%m-%d')}")
print(f"  - 跨度天数: {(df_clean['Time'].max() - df_clean['Time'].min()).days + 1} 天")
print(f"  - 会话数: {df_clean['ConversationID'].nunique()}")

print("\n📌 消息发送统计")
source_counts = df_clean['Source'].value_counts()
for source, count in source_counts.items():
    pct = count / len(df_clean) * 100
    print(f"  - {source}: {count} 条 ({pct:.1f}%)")

print("\n📌 消息长度统计")
df_clean['Content_Length'] = df_clean['Content'].str.len()
for source in df_clean['Source'].unique():
    subset = df_clean[df_clean['Source'] == source]['Content_Length']
    print(f"  - {source}: 平均 {subset.mean():.1f} 字, 最长 {subset.max()} 字")

print("\n📌 每日消息分布 (最近30天)")
df_clean['Date'] = df_clean['Time'].dt.date
recent = df_clean[df_clean['Time'] >= df_clean['Time'].max() - pd.Timedelta(days=30)]
daily_counts = recent.groupby('Date').size()
for date, count in daily_counts.tail(10).items():
    print(f"  - {date}: {count} 条")

print("\n📌 时段分布")
df_clean['Hour'] = df_clean['Time'].dt.hour
hour_labels = ['凌晨(0-6)', '早上(6-9)', '上午(9-12)', '中午(12-14)', '下午(14-18)', '晚上(18-24)']
hour_bins = [0, 6, 9, 12, 14, 18, 24]
df_clean['TimePeriod'] = pd.cut(df_clean['Hour'], bins=hour_bins, labels=hour_labels, right=False)
time_period_counts = df_clean['TimePeriod'].value_counts()
for period, count in time_period_counts.items():
    print(f"  - {period}: {count} 条")

print("\n📌 表情符号统计")
emoji_pattern = re.compile(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF]')
df_clean['Emoji_Count'] = df_clean['Content'].apply(lambda x: len(emoji_pattern.findall(str(x))))
emoji_total = df_clean['Emoji_Count'].sum()
print(f"  - 总表情数: {emoji_total}")
for source in df_clean['Source'].unique():
    subset = df_clean[df_clean['Source'] == source]['Emoji_Count'].sum()
    print(f"  - {source} 发送表情: {subset} 个")

print("\n📌 常见表情 Top 10")
all_emojis = ' '.join(df_clean['Content'].astype(str))
emoji_list = emoji_pattern.findall(all_emojis)
from collections import Counter
emoji_counts = Counter(emoji_list)
for emoji, count in emoji_counts.most_common(10):
    print(f"  - {emoji}: {count} 次")

print("\n📌 关键词分析")
keywords_to_check = ['想', '爱', '喜欢', '好', '哈哈', '嗯', '晚安', '早安', '么么', '抱抱', '亲亲', '想你了', '爱你']
for keyword in keywords_to_check:
    count = df_clean['Content'].str.contains(keyword, na=False).sum()
    if count > 0:
        print(f"  - '{keyword}': {count} 次")

print("\n📌 问句统计")
question_count = df_clean['Content'].str.contains(r'[?？]', na=False).sum()
print(f"  - 问句数量: {question_count} 条 ({question_count/len(df_clean)*100:.1f}%)")

print("\n📌 回复时间分析 (同会话内)")
df_clean = df_clean.sort_values(['ConversationID', 'Time'])
df_clean['Time_Diff'] = df_clean['Time'].diff()
recent_conversations = df_clean[df_clean['ConversationID'] == df_clean['ConversationID'].max()].head(20)
print("  最近会话的回复间隔 (前20条):")
for idx, row in recent_conversations.iterrows():
    time_diff = row['Time_Diff']
    if pd.notna(time_diff):
        diff_minutes = time_diff.total_seconds() / 60
        print(f"    {row['Time'].strftime('%H:%M')} [{row['Source']}] - {diff_minutes:.1f}分钟后")

print("\n📌 情感词汇分析")
positive_words = ['开心', '高兴', '喜欢', '爱', '棒', '好', '赞', '哈哈', '嘻嘻', '么么', '甜', '幸福']
negative_words = ['难过', '生气', '失望', '无奈', '烦', '累', '困', '辛苦', '心疼']
positive_count = df_clean['Content'].str.contains('|'.join(positive_words), na=False).sum()
negative_count = df_clean['Content'].str.contains('|'.join(negative_words), na=False).sum()
print(f"  - 积极词汇: {positive_count} 次")
print(f"  - 消极词汇: {negative_count} 次")

print("\n" + "="*80)
