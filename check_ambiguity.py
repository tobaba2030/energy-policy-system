import pandas as pd
import re

df = pd.read_excel(r'C:\Users\jianlinw\Desktop\手机助理导出的信息2026-05-04_135059138.xlsx')
df_clean = df.dropna(subset=['Source', 'Content'])
df_clean['Time'] = pd.to_datetime(df_clean['Time'])
df_clean = df_clean.sort_values('Time')

print("="*80)
print("聊天记录仔细分析 - 寻找暧昧线索")
print("="*80)
print("\n")

# 寻找特定关键词和细节
keywords_to_check = ['想', '喜欢', '爱', '么么', '亲亲', '抱抱', '晚安', '早安', '节日快乐', '想你', '爱你', '关心', '注意身体', '想你了', '开心', '想见面', '漂亮', '可爱', '好看', '宝贝']

print("\n【特定亲密词汇出现情况】:")
for keyword in keywords_to_check:
    count = df_clean['Content'].str.contains(keyword, na=False).sum()
    if count > 0:
        print(f"  '{keyword}': {count} 次")

print("\n\n【详细查看包含亲密词汇的消息内容 - 逐条分析】:")
for keyword in ['想', '喜欢', '爱', '晚安', '早安', '节日快乐', '开心', '想你', '爱你', '注意', '好看', '可爱', '关心']:
    matches = df_clean[df_clean['Content'].str.contains(keyword, na=False)]
    if len(matches) > 0:
        print(f"\n--- '{keyword}' (共{len(matches)}条) ---")
        for idx, row in matches.head(15).iterrows():
            print(f"  {row['Time'].strftime('%m-%d %H:%M')} [{row['Source']}]: {row['Content']}")

print("\n\n【查看有大量使用表情符号的密集对话】:")
emoji_pattern = re.compile(r'[\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF]')
df_clean['Emoji_Count'] = df_clean['Content'].apply(lambda x: len(emoji_pattern.findall(str(x))))
emoji_heavy = df_clean[df_clean['Emoji_Count'] > 2]
print(f"表情丰富的对话（表情>2）: {len(emoji_heavy)}条")
for idx, row in emoji_heavy.head(25).iterrows():
    print(f"  {row['Time'].strftime('%m-%d %H:%M')} [{row['Source']}]: {row['Content']}")

print("\n\n【查看节日问候和早安晚安:")
greeting_keywords = ['晚安', '早安', '早上好', '节日快乐', '新年快乐', '节日']
greeting_msgs = df_clean[df_clean['Content'].str.contains('|'.join(greeting_keywords), na=False)]
print(f"问候消息: {len(greeting_msgs)}条")
for idx, row in greeting_msgs.iterrows():
    print(f"  {row['Time'].strftime('%m-%d %H:%M')} [{row['Source']}]: {row['Content']}")

print("\n\n【查看关心身体的话语:")
care_keywords = ['注意', '保暖', '身体', '别', '小心', '累', '休息', '早点睡', '睡吧', '睡好']
care_msgs = df_clean[df_clean['Content'].str.contains('|'.join(care_keywords), na=False)]
print(f"关心话语: {len(care_msgs)}条")
for idx, row in care_msgs.head(20).iterrows():
    print(f"  {row['Time'].strftime('%m-%d %H:%M')} [{row['Source']}]: {row['Content']}")

print("\n\n【查看一些关键时段的完整对话:")
key_dates = ['2026-03-01', '2026-03-02', '2026-03-07', '2026-04-26', '2026-05-03', '2026-05-04']
for date in key_dates:
    day_data = df_clean[df_clean['Time'].dt.strftime('%Y-%m-%d') == date]
    if len(day_data) > 0:
        print(f"\n===== {date} =====")
        for idx, row in day_data.iterrows():
            print(f"  {row['Time'].strftime('%H:%M:%S')} [{row['Source']}]: {row['Content']}")
