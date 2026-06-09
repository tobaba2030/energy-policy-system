from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1360, 1600
img = Image.new('RGB', (W, H), '#0a1628')
draw = ImageDraw.Draw(img)

font_path = r'C:\Windows\Fonts\msyh.ttc'

def get_font(size, bold=False):
    try:
        return ImageFont.truetype(font_path, size, index=0 if bold else 1)
    except:
        return ImageFont.truetype(font_path, size)

font_title = get_font(44, True)
font_sub = get_font(28)
font_col_title = get_font(26, True)
font_card_title = get_font(22, True)
font_card_desc = get_font(18)
font_data_big = get_font(36, True)
font_data_label = get_font(18)
font_data_sub = get_font(16)
font_step_title = get_font(22, True)
font_step_desc = get_font(18)
font_quote = get_font(28, True)
font_bottom = get_font(18)
font_num = get_font(22, True)

cx = W // 2

# Decorative lines top
draw.rectangle([80, 24, 320, 26], fill='#d4a843')
draw.ellipse([348, 24, 356, 32], fill='#d4a843')
draw.rectangle([372, 24, 532, 26], fill='#d4a843')

# Title
draw.text((cx, 80), '学术文献智能流转闭环', fill='#ffffff', font=font_title, anchor='mt')
draw.text((cx, 120), '从人工爬取到智能报告，全流程自动化升级', fill='#d4a843', font=font_sub, anchor='mt')

# Column layout
col_w = 380
col_h = 560
col_y = 160
col_gap = 20
col1_x = (W - 3*col_w - 2*col_gap) // 2
col2_x = col1_x + col_w + col_gap
col3_x = col2_x + col_w + col_gap

def draw_rounded_rect(x, y, w, h, r, fill, outline=None, outline_w=1):
    draw.rounded_rectangle([x, y, x+w, y+h], radius=r, fill=fill, outline=outline, width=outline_w)

def draw_card(x, y, w, h, title, desc, outline_color='#2a4a6c'):
    draw_rounded_rect(x, y, w, h, 12, '#0a1628', outline=outline_color, outline_w=1)
    draw.text((x + w//2, y + h//2 - 10), title, fill='#ffffff', font=font_card_title, anchor='mm')
    draw.text((x + w//2, y + h//2 + 16), desc, fill='#8ba4be', font=font_card_desc, anchor='mm')

# === Col 1: Traditional ===
draw_rounded_rect(col1_x, col_y, col_w, col_h, 16, '#0d1f3c', outline='#1a3a5c', outline_w=2)
draw_rounded_rect(col1_x, col_y, col_w, 56, 16, '#1a3a5c')
draw.rectangle([col1_x, col_y+44, col1_x+col_w, col_y+56], fill='#1a3a5c')
draw.text((col1_x+col_w//2, col_y+28), '传统手工模式', fill='#8ba4be', font=font_col_title, anchor='mm')

for i, (t, d) in enumerate([
    ('人工检索下载', '知网/万方/科技云逐个查找'),
    ('手动整理分类', 'Excel表格记录，文件夹归档'),
    ('人工阅读提炼', '逐篇阅读，手动写摘要笔记'),
    ('手动编写报告', 'Word中手动排版引用格式'),
]):
    draw_card(col1_x+16, col_y+76+i*104, col_w-32, 88, t, d, '#2a4a6c')

draw_rounded_rect(col1_x+16, col_y+col_h-70, col_w-32, 56, 12, '#0a1628', outline='#3a1a1a', outline_w=1)
draw.text((col1_x+col_w//2, col_y+col_h-52), '耗时 4-8 小时/10篇', fill='#e24b4a', font=font_data_label, anchor='mm')
draw.text((col1_x+col_w//2, col_y+col_h-30), '效率低、易遗漏、难追溯', fill='#8ba4be', font=font_data_sub, anchor='mm')

# === Col 2: WorkBuddy (gold border) ===
draw_rounded_rect(col2_x, col_y, col_w, col_h, 16, '#0d1f3c', outline='#d4a843', outline_w=3)
draw_rounded_rect(col2_x, col_y, col_w, 56, 16, '#d4a843')
draw.rectangle([col2_x, col_y+44, col2_x+col_w, col_y+56], fill='#d4a843')
draw.text((col2_x+col_w//2, col_y+28), 'WorkBuddy 自动化', fill='#0a1628', font=font_col_title, anchor='mm')

for i, (t, d) in enumerate([
    ('粘贴/上传文献', 'PDF/链接/全文粘贴到对话框'),
    ('AI自动清洗提取', '去重、标准化、元数据提取'),
    ('智能分类标签', 'NLP关键词提取，自动归类'),
    ('自动传入IMA', 'OpenAPI三条通道自动写入'),
]):
    draw_card(col2_x+16, col_y+76+i*104, col_w-32, 88, t, d, '#d4a843')

draw_rounded_rect(col2_x+16, col_y+col_h-70, col_w-32, 56, 12, '#0a1628', outline='#1d9e75', outline_w=1)
draw.text((col2_x+col_w//2, col_y+col_h-52), '仅需 5 分钟/10篇', fill='#5dcaa5', font=font_data_label, anchor='mm')
draw.text((col2_x+col_w//2, col_y+col_h-30), '唯一手动环节：粘贴上传', fill='#8ba4be', font=font_data_sub, anchor='mm')

# === Col 3: IMA ===
draw_rounded_rect(col3_x, col_y, col_w, col_h, 16, '#0d1f3c', outline='#1a3a5c', outline_w=2)
draw_rounded_rect(col3_x, col_y, col_w, 56, 16, '#1a3a5c')
draw.rectangle([col3_x, col_y+44, col3_x+col_w, col_y+56], fill='#1a3a5c')
draw.text((col3_x+col_w//2, col_y+28), 'IMA 知识库', fill='#8ba4be', font=font_col_title, anchor='mm')

for i, (t, d) in enumerate([
    ('文件上传通道', 'PDF/Word/PPT \u2192 COS存储'),
    ('URL导入通道', '在线论文链接一键收录'),
    ('笔记创建通道', 'Markdown综述笔记自动写入'),
    ('结构化文献库', '可搜索、可引用、可追溯'),
]):
    draw_card(col3_x+16, col_y+76+i*104, col_w-32, 88, t, d, '#2a4a6c')

draw_rounded_rect(col3_x+16, col_y+col_h-70, col_w-32, 56, 12, '#0a1628', outline='#1d9e75', outline_w=1)
draw.text((col3_x+col_w//2, col_y+col_h-52), '全自动入库，零人工', fill='#5dcaa5', font=font_data_label, anchor='mm')
draw.text((col3_x+col_w//2, col_y+col_h-30), '三种通道适配所有文献类型', fill='#8ba4be', font=font_data_sub, anchor='mm')

# Arrows between columns
arrow_y = col_y + col_h // 2
for ax in [col1_x+col_w+2, col2_x+col_w+2]:
    draw.polygon([(ax, arrow_y-8), (ax+16, arrow_y), (ax, arrow_y+8)], fill='#d4a843')

# Gold separator
draw_rounded_rect(70, col_y+col_h+12, W-140, 16, 8, '#d4a843')

# === Loop-back section ===
loop_y = col_y + col_h + 50
draw.text((cx, loop_y), '闭环回流：WorkBuddy 反向调用 IMA 知识库', fill='#d4a843', font=font_quote, anchor='mt')

# 4 Steps
step_w = 270
step_h = 160
step_gap = 20
step_y = loop_y + 50
total_steps_w = 4 * step_w + 3 * step_gap
step_start_x = (W - total_steps_w) // 2

steps = [
    ('1', '发起分析请求', ['\u201c帮我分析虚拟电厂\u201d', '\u201c最新研究进展\u201d'], 'WorkBuddy接收指令'),
    ('2', '检索IMA知识库', ['自动搜索知识库中', '相关文献与笔记'], 'IMA OpenAPI查询'),
    ('3', 'AI分析整合', ['多文献交叉分析', '提炼观点与趋势'], 'WorkBuddy智能处理'),
    ('4', '输出报告', ['技术报告', '文献综述'], '含自动引用格式'),
]

for i, (num, title, descs, note) in enumerate(steps):
    sx = step_start_x + i * (step_w + step_gap)
    draw_rounded_rect(sx, step_y, step_w, step_h, 16, '#0d1f3c', outline='#d4a843', outline_w=2)
    # Number circle
    cx_c = sx + 36
    cy_c = step_y + 30
    draw.ellipse([cx_c-20, cy_c-20, cx_c+20, cy_c+20], fill='#d4a843')
    draw.text((cx_c, cy_c), num, fill='#0a1628', font=font_num, anchor='mm')
    # Title
    draw.text((sx + step_w//2 + 16, step_y + 30), title, fill='#ffffff', font=font_step_title, anchor='mm')
    # Desc lines
    for j, desc in enumerate(descs):
        draw.text((sx + step_w//2, step_y + 70 + j*24), desc, fill='#8ba4be', font=font_step_desc, anchor='mm')
    # Note
    draw.text((sx + step_w//2, step_y + step_h - 20), note, fill='#5dcaa5', font=font_data_sub, anchor='mm')
    # Arrow between steps
    if i < 3:
        ax = sx + step_w + 2
        draw.polygon([(ax, step_y+step_h//2-10), (ax+16, step_y+step_h//2), (ax, step_y+step_h//2+10)], fill='#d4a843')

# Dashed return arrow text
dash_y = step_y + step_h + 20
draw.text((cx, dash_y), '- - -  持续积累，知识库越用越智能  - - -', fill='#d4a843', font=font_data_label, anchor='mt')

# === Data bar ===
data_y = dash_y + 50
draw_rounded_rect(70, data_y, W-140, 160, 16, '#0d1f3c', outline='#1a3a5c', outline_w=2)

data_items = [
    ('10x', '效率提升', '从8小时\u219230分钟'),
    ('100%', '引用可追溯', 'GB/T 7714标准格式'),
    ('3', '自动导入通道', '文件/URL/笔记全覆盖'),
    ('0', '手动整理环节', '粘贴后全自动处理'),
    ('闭环', '知识库持续积累', '分析\u2192报告\u2192再入库'),
]

item_w = (W - 140 - 40) // 5
for i, (val, label, sub) in enumerate(data_items):
    ix = 90 + i * item_w
    iy = data_y + 20
    draw_rounded_rect(ix, iy, item_w - 10, 120, 12, '#0a1628', outline='#2a4a6c', outline_w=1)
    draw.text((ix + (item_w-10)//2, iy + 35), val, fill='#ffffff', font=font_data_big, anchor='mm')
    draw.text((ix + (item_w-10)//2, iy + 72), label, fill='#8ba4be', font=font_data_label, anchor='mm')
    draw.text((ix + (item_w-10)//2, iy + 96), sub, fill='#5dcaa5', font=font_data_sub, anchor='mm')

# === Quote bar ===
quote_y = data_y + 180
draw_rounded_rect(70, quote_y, W-140, 70, 16, '#2a2010', outline='#d4a843', outline_w=1)
draw.text((cx, quote_y + 35), '真正的变化不是工具，而是工作流的重新定义', fill='#d4a843', font=font_quote, anchor='mm')

# === Bottom ===
draw.text((cx, quote_y + 110), '适用场景：电网科技项目研究 | 技术报告编写 | 专利文献调研 | 学术论文综述', fill='#5a7a9a', font=font_bottom, anchor='mt')
draw.rectangle([cx-180, quote_y+145, cx+180, quote_y+146], fill='#d4a843')
draw.text((cx, quote_y+165), 'WorkBuddy x IMA 知识库联动方案', fill='#4a6a8a', font=font_data_sub, anchor='mt')

# Save as JPG
output_path = r'C:\AI学习资料\mesheer\2026-06-07-12-42-02\output\学术文献智能流转闭环.jpg'
img.save(output_path, 'JPEG', quality=95)
print(f'Saved to: {output_path}')
print(f'Size: {os.path.getsize(output_path)} bytes')
