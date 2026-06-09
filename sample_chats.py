import pandas as pd

# 读取聊天记录
df = pd.read_excel(r'C:\Users\jianlinw\Desktop\手机助理导出的信息2026-05-04_135059138.xlsx')
df_clean = df.dropna(subset=['Source', 'Content'])
df_clean['Time'] = pd.to_datetime(df_clean['Time'])
df_clean = df_clean.sort_values('Time')

print("="*80)
print("聊天记录内容预览")
print("="*80)

print("\n1. 最早的100条消息:")
print("-"*80)
for idx, row in df_clean.head(100).iterrows():
    print(f"{row['Time'].strftime('%Y-%m-%d %H:%M')} [{row['Source']}] {row['Content']}")

print("\n"*2)
print("2. 随机抽样50条消息:")
print("-"*80)
for idx, row in df_clean.sample(50, random_state=1).iterrows():
    print(f"{row['Time'].strftime('%Y-%m-%d %H:%M')} [{row['Source']}] {row['Content']}")

print("\n"*2)
print("3. 最近的100条消息:")
print("-"*80)
for idx, row in df_clean.tail(100).iterrows():
    print(f"{row['Time'].strftime('%Y-%m-%d %H:%M')} [{row['Source']}] {row['Content']}")

print("\n"*2)
print("="*80)
print("END")
print("="*80)
