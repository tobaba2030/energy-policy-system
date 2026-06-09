
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
from collections import Counter
import jieba
import re
import numpy as np
from datetime import datetime
import json

# 设置中文字体
matplotlib.rcParams['font.sans-serif'] = ['SimHei', 'Microsoft YaHei', 'Arial Unicode MS']
matplotlib.rcParams['axes.unicode_minus'] = False

# 读取聊天记录
file_path = r'C:\Users\jianlinw\Desktop\手机助理导出的信息2026-05-04_135059138.xlsx'
df = pd.read_excel(file_path)

print("=== 聊天记录基本信息 ===")
print(f"总行数: {len(df)}")
print(f"列名: {df.columns.tolist()}")
print("\n前10行数据:")
print(df.head(10))

# 保存数据概览
with open('chat_overview.txt', 'w', encoding='utf-8') as f:
    f.write(f"总行数: {len(df)}\n")
    f.write(f"列名: {df.columns.tolist()}\n")
    f.write("\n前50行数据:\n")
    f.write(df.head(50).to_string())

print("\n=== 分析完成，结果已保存 ===")
