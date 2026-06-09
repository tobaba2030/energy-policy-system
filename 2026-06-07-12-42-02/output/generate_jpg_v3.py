from PIL import Image, ImageDraw, ImageFont
import os, math

W, H = 1400, 2000
img = Image.new('RGB', (W, H), '#060c18')
draw = ImageDraw.Draw(img)

font_path = r'C:\Windows\Fonts\msyh.ttc'

def get_font(size, bold=False):
    try:
        return ImageFont.truetype(font_path, size, index=0 if bold else 1)
    except:
        return ImageFont.truetype(font_path, size)

F_TITLE = get_font(48, True)
F_SUB = get_font(26)
F_SECTION = get_font(32, True)
F_COL_TITLE = get_font(26, True)
F_CARD_TITLE = get_font(22, True)
F_CARD_DESC = get_font(17)
F_DATA_BIG = get_font(44, True)
F_DATA_LABEL = get_font(20)
F_DATA_SUB = get_font(16)
F_STEP_TITLE = get_font(22, True)
F_STEP_DESC = get_font(17)
F_QUOTE = get_font(28, True)
F_BOTTOM = get_font(17)
F_NUM = get_font(22, True)
F_ICON = get_font(30)
F_SMALL = get_font(15)
F_TINY = get_font(13)

cx = W // 2

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rrect(x, y, w, h, r, fill, outline=None, outline_w=1):
    draw.rounded_rectangle([x, y, x+w, y+h], radius=r, fill=fill, outline=outline, width=outline_w)

def draw_icon_circle(x, y, r, icon_text, bg_color, text_color='#ffffff'):
    draw.ellipse([x-r, y-r, x+r, y+r], fill=bg_color)
    draw.text((x, y), icon_text, fill=text_color, font=F_ICON, anchor='mm')

def draw_diamond(x, y, r, fill):
    draw.polygon([(x, y-r), (x+r, y), (x, y+r), (x-r, y)], fill=fill)

def draw_hexagon(x, y, r, fill, outline=None):
    pts = []
    for i in range(6):
        angle = math.pi / 3 * i - math.pi / 6
        pts.append((x + r * math.cos(angle), y + r * math.sin(angle)))
    draw.polygon(pts, fill=fill, outline=outline)

def draw_arrow_right(x1, y, x2, color='#d4a843', width=3):
    draw.line([(x1, y), (x2-12, y)], fill=color, width=width)
    draw.polygon([(x2-12, y-10), (x2, y), (x2-12, y+10)], fill=color)

def draw_arrow_down(x, y1, y2, color='#d4a843', width=3):
    draw.line([(x, y1), (x, y2-10)], fill=color, width=width)
    draw.polygon([(x-10, y2-10), (x, y2), (x+10, y2-10)], fill=color)

# ============================================================
# BACKGROUND
# ============================================================

# Deep gradient background
for y in range(H):
    ratio = y / H
    r = int(6 + ratio * 10)
    g = int(12 + ratio * 12)
    b = int(24 + ratio * 16)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Grid pattern
for x in range(0, W, 50):
    draw.line([(x, 0), (x, H)], fill='#0a1428', width=1)
for y in range(0, H, 50):
    draw.line([(0, y), (W, y)], fill='#0a1428', width=1)

# Large decorative circles
for bx, by, br, bc in [(150, 400, 180, '#0a1a30'), (1250, 350, 140, '#0a1a30'),
                        (100, 1400, 160, '#0a1a30'), (1300, 1350, 130, '#0a1a30'),
                        (700, 900, 200, '#0a1a2a'), (50, 700, 80, '#0a1a30'),
                        (1350, 600, 90, '#0a1a30')]:
    draw.ellipse([bx-br, by-br, bx+br, by+br], fill=bc)

# ============================================================
# TOP HEADER
# ============================================================

# Top gold bar with decorations
for i in range(8):
    alpha = 1 - i * 0.12
    c = tuple(int(v * alpha) for v in (0xd4, 0xa8, 0x43))
    draw.rectangle([60+i, 18+i, W-60-i, 20+i], fill=c)

# Decorative hexagons
for hx in [70, 150, 250, W-250, W-150, W-70]:
    draw_hexagon(hx, 18, 10, '#1a3050', '#2a4a6c')

# Diamond accents
for dx in [330, 410, W-410, W-330]:
    draw_diamond(dx, 18, 8, '#d4a843')

# Title with glow effect
for r in range(20, 0, -2):
    c = tuple(int(v * 0.15 * (1 - r/22)) for v in (0xd4, 0xa8, 0x43))
    draw.ellipse([cx-r, 68-r, cx+r, 68+r], fill=c)
draw.ellipse([cx-6, 62, cx+6, 74], fill='#d4a843')

draw.text((cx, 72), '学术文献智能流转闭环', fill='#ffffff', font=F_TITLE, anchor='mt')
draw.text((cx, 122), '从人工爬取到智能报告，全流程自动化升级', fill='#d4a843', font=F_SUB, anchor='mt')

# Subtitle underline with dots
draw.rectangle([cx-220, 154, cx+220, 155], fill='#d4a843')
draw.ellipse([cx-5, 151, cx+5, 159], fill='#d4a843')
draw.ellipse([cx-200, 152, cx-194, 158], fill='#2a4a6c')
draw.ellipse([cx+194, 152, cx+200, 158], fill='#2a4a6c')

# ============================================================
# SOURCE BAR (中国科技云)
# ============================================================

src_y = 180
rrect(40, src_y, W-80, 72, 16, '#0c1a2c', outline='#1a3050', outline_w=2)

# Left icon cluster
draw_icon_circle(90, src_y+36, 22, '☁', '#1a4a6c')
draw_icon_circle(130, src_y+36, 14, '🔬', '#2a5a7c')

draw.text((160, src_y+22), '数据源头：中国科技云学术智能体平台', fill='#8ba4be', font=F_DATA_LABEL, anchor='lt')
draw.text((160, src_y+46), '人工爬取 → 粘贴/上传到 WorkBuddy（唯一手动环节）', fill='#5dcaa5', font=F_SMALL, anchor='lt')

# Right side status indicators
rrect(W-240, src_y+16, 80, 40, 8, '#1a0c0c', outline='#5a2020', outline_w=1)
draw.text((W-200, src_y+36), '无API', fill='#e24b4a', font=F_SMALL, anchor='mm')
rrect(W-150, src_y+16, 100, 40, 8, '#0a1a14', outline='#1d6e55', outline_w=1)
draw.text((W-100, src_y+36), '需人工', fill='#5dcaa5', font=F_SMALL, anchor='mm')

# Down arrow
draw_arrow_down(cx, src_y+72, src_y+100, '#d4a843', 3)

# ============================================================
# THREE COLUMNS
# ============================================================

col_y = src_y + 110
col_w = 400
col_h = 560
col_gap = 30
col1_x = (W - 3*col_w - 2*col_gap) // 2
col2_x = col1_x + col_w + col_gap
col3_x = col2_x + col_w + col_gap

# --- Column 1: Traditional ---
rrect(col1_x, col_y, col_w, col_h, 18, '#0a1624', outline='#1a3a5c', outline_w=2)

# Header
rrect(col1_x, col_y, col_w, 64, 18, '#142840')
draw.rectangle([col1_x, col_y+52, col1_x+col_w, col_y+64], fill='#142840')
draw_icon_circle(col1_x+50, col_y+32, 22, '📋', '#1a3a5c')
draw.text((col1_x+88, col_y+32), '传统手工模式', fill='#6a8aae', font=F_COL_TITLE, anchor='lm')

# Cards with icons and colored accents
cards1 = [
    ('🔍', '#2a4060', '人工检索下载', '知网/万方/科技云逐个查找'),
    ('📁', '#2a4060', '手动整理分类', 'Excel表格记录，文件夹归档'),
    ('📖', '#2a4060', '人工阅读提炼', '逐篇阅读，手动写摘要笔记'),
    ('✏️', '#2a4060', '手动编写报告', 'Word中手动排版引用格式'),
]

for i, (icon, color, title, desc) in enumerate(cards1):
    cy = col_y + 84 + i * 110
    rrect(col1_x+16, cy, col_w-32, 96, 12, '#0a1420', outline='#1a3050', outline_w=1)
    # Left accent bar
    draw.rectangle([col1_x+16, cy+10, col1_x+20, cy+86], fill='#3a5060')
    # Icon
    draw_icon_circle(col1_x+56, cy+48, 22, icon, color)
    # Text
    draw.text((col1_x+92, cy+34), title, fill='#ffffff', font=F_CARD_TITLE, anchor='lm')
    draw.text((col1_x+92, cy+62), desc, fill='#6a8aae', font=F_CARD_DESC, anchor='lm')

# Bottom status
rrect(col1_x+16, col_y+col_h-76, col_w-32, 60, 12, '#1a0c0c', outline='#5a2020', outline_w=1)
draw_icon_circle(col1_x+56, col_y+col_h-46, 18, '⏰', '#5a2020')
draw.text((col1_x+90, col_y+col_h-56), '耗时 4-8 小时/10篇', fill='#e24b4a', font=F_DATA_LABEL, anchor='lm')
draw.text((col1_x+90, col_y+col_h-32), '效率低 · 易遗漏 · 难追溯', fill='#8a5a5a', font=F_SMALL, anchor='lm')

# --- Column 2: WorkBuddy (highlighted with glow) ---
# Outer glow
for g in range(15, 0, -1):
    gc = tuple(int(v * 0.08 * (1 - g/16)) for v in (0xd4, 0xa8, 0x43))
    rrect(col2_x-g, col_y-g, col_w+2*g, col_h+2*g, 18+g, None, outline=gc, outline_w=1)

rrect(col2_x, col_y, col_w, col_h, 18, '#0e1a28', outline='#d4a843', outline_w=3)

# Header (gold)
rrect(col2_x, col_y, col_w, 64, 18, '#d4a843')
draw.rectangle([col2_x, col_y+52, col2_x+col_w, col_y+64], fill='#d4a843')
draw_icon_circle(col2_x+50, col_y+32, 22, '🤖', '#b8922e')
draw.text((col2_x+88, col_y+32), 'WorkBuddy 自动化', fill='#0a1628', font=F_COL_TITLE, anchor='lm')

cards2 = [
    ('📤', '#4a3818', '粘贴/上传文献', 'PDF/链接/全文粘贴到对话框'),
    ('⚙️', '#4a3818', 'AI自动清洗提取', '去重、标准化、元数据提取'),
    ('🏷️', '#4a3818', '智能分类标签', 'NLP关键词提取，自动归类'),
    ('🔄', '#4a3818', '自动传入IMA', 'OpenAPI三条通道自动写入'),
]

for i, (icon, color, title, desc) in enumerate(cards2):
    cy = col_y + 84 + i * 110
    rrect(col2_x+16, cy, col_w-32, 96, 12, '#0a1420', outline='#4a3818', outline_w=1)
    draw.rectangle([col2_x+16, cy+10, col2_x+20, cy+86], fill='#6a5018')
    draw_icon_circle(col2_x+56, cy+48, 22, icon, color)
    draw.text((col2_x+92, cy+34), title, fill='#ffffff', font=F_CARD_TITLE, anchor='lm')
    draw.text((col2_x+92, cy+62), desc, fill='#b8a060', font=F_CARD_DESC, anchor='lm')

# Bottom status
rrect(col2_x+16, col_y+col_h-76, col_w-32, 60, 12, '#0a1a14', outline='#1d6e55', outline_w=1)
draw_icon_circle(col2_x+56, col_y+col_h-46, 18, '⚡', '#1d6e55')
draw.text((col2_x+90, col_y+col_h-56), '仅需 5 分钟/10篇', fill='#5dcaa5', font=F_DATA_LABEL, anchor='lm')
draw.text((col2_x+90, col_y+col_h-32), '唯一手动：粘贴上传', fill='#4a8a6a', font=F_SMALL, anchor='lm')

# --- Column 3: IMA ---
rrect(col3_x, col_y, col_w, col_h, 18, '#0a1624', outline='#1a3a5c', outline_w=2)

# Header
rrect(col3_x, col_y, col_w, 64, 18, '#142840')
draw.rectangle([col3_x, col_y+52, col3_x+col_w, col_y+64], fill='#142840')
draw_icon_circle(col3_x+50, col_y+32, 22, '📚', '#1a3a5c')
draw.text((col3_x+88, col_y+32), 'IMA 知识库', fill='#6a8aae', font=F_COL_TITLE, anchor='lm')

cards3 = [
    ('📄', '#2a4060', '文件上传通道', 'PDF/Word/PPT → COS存储'),
    ('🔗', '#2a4060', 'URL导入通道', '在线论文链接一键收录'),
    ('📝', '#2a4060', '笔记创建通道', 'Markdown综述笔记自动写入'),
    ('🗄️', '#2a4060', '结构化文献库', '可搜索、可引用、可追溯'),
]

for i, (icon, color, title, desc) in enumerate(cards3):
    cy = col_y + 84 + i * 110
    rrect(col3_x+16, cy, col_w-32, 96, 12, '#0a1420', outline='#1a3050', outline_w=1)
    draw.rectangle([col3_x+16, cy+10, col3_x+20, cy+86], fill='#3a5060')
    draw_icon_circle(col3_x+56, cy+48, 22, icon, color)
    draw.text((col3_x+92, cy+34), title, fill='#ffffff', font=F_CARD_TITLE, anchor='lm')
    draw.text((col3_x+92, cy+62), desc, fill='#6a8aae', font=F_CARD_DESC, anchor='lm')

# Bottom status
rrect(col3_x+16, col_y+col_h-76, col_w-32, 60, 12, '#0a1a14', outline='#1d6e55', outline_w=1)
draw_icon_circle(col3_x+56, col_y+col_h-46, 18, '✅', '#1d6e55')
draw.text((col3_x+90, col_y+col_h-56), '全自动入库，零人工', fill='#5dcaa5', font=F_DATA_LABEL, anchor='lm')
draw.text((col3_x+90, col_y+col_h-32), '三种通道适配所有文献类型', fill='#4a8a6a', font=F_SMALL, anchor='lm')

# --- Arrows between columns ---
arrow_y_list = [col_y + 200, col_y + 310, col_y + 420]
for ay in arrow_y_list:
    draw_arrow_right(col1_x + col_w + 4, ay, col2_x - 4, '#d4a843', 3)
    draw_arrow_right(col2_x + col_w + 4, ay, col3_x - 4, '#d4a843', 3)

# ============================================================
# GOLD SEPARATOR
# ============================================================

sep_y = col_y + col_h + 20
draw.rectangle([50, sep_y+4, W-50, sep_y+5], fill='#1a3050')
draw.rectangle([80, sep_y+8, W-80, sep_y+10], fill='#d4a843')
draw.rectangle([50, sep_y+13, W-50, sep_y+14], fill='#1a3050')

draw_diamond(cx, sep_y+9, 10, '#d4a843')
draw_hexagon(130, sep_y+9, 8, '#d4a843')
draw_hexagon(W-130, sep_y+9, 8, '#d4a843')

# ============================================================
# LOOP-BACK SECTION
# ============================================================

loop_y = sep_y + 30
draw.text((cx, loop_y), '🔄  闭环回流：WorkBuddy 反向调用 IMA 知识库', fill='#d4a843', font=F_SECTION, anchor='mt')
draw.text((cx, loop_y+40), '知识积累 → 智能分析 → 报告输出 → 再积累', fill='#6a8aae', font=F_SMALL, anchor='mt')

# 4 Steps
step_w = 300
step_h = 200
step_gap = 20
step_y = loop_y + 70
total_steps_w = 4 * step_w + 3 * step_gap
step_start_x = (W - total_steps_w) // 2

steps = [
    ('1', '💬', '发起分析请求', ['"帮我分析虚拟电厂"', '"最新研究进展"'], 'WorkBuddy接收指令', '#2a5070'),
    ('2', '🔎', '检索IMA知识库', ['自动搜索知识库中', '相关文献与笔记'], 'IMA OpenAPI查询', '#2a5070'),
    ('3', '🧠', 'AI分析整合', ['多文献交叉分析', '提炼观点与趋势'], 'WorkBuddy智能处理', '#2a5070'),
    ('4', '📊', '输出报告', ['技术报告 · 文献综述', '含自动引用格式'], 'GB/T 7714标准', '#2a5070'),
]

for i, (num, icon, title, descs, note, bg) in enumerate(steps):
    sx = step_start_x + i * (step_w + step_gap)

    # Card with glow
    for g in range(6, 0, -1):
        gc = tuple(int(v * 0.05 * (1 - g/7)) for v in (0xd4, 0xa8, 0x43))
        rrect(sx-g, step_y-g, step_w+2*g, step_h+2*g, 14+g, None, outline=gc, outline_w=1)

    rrect(sx, step_y, step_w, step_h, 14, '#0c1828', outline='#d4a843', outline_w=2)

    # Step number badge
    badge_x = sx + 36
    badge_y = step_y + 28
    draw.ellipse([badge_x-20, badge_y-20, badge_x+20, badge_y+20], fill='#d4a843')
    draw.text((badge_x, badge_y), num, fill='#0a1628', font=F_NUM, anchor='mm')

    # Icon
    draw_icon_circle(sx + step_w - 44, step_y + 32, 20, icon, bg)

    # Title
    draw.text((sx + step_w//2, step_y + 36), title, fill='#ffffff', font=F_STEP_TITLE, anchor='mm')

    # Separator
    draw.rectangle([sx+24, step_y+62, sx+step_w-24, step_y+63], fill='#1a3050')

    # Description
    for j, desc in enumerate(descs):
        draw.text((sx + step_w//2, step_y + 84 + j*26), desc, fill='#8ba4be', font=F_STEP_DESC, anchor='mm')

    # Note badge
    rrect(sx+20, step_y+step_h-48, step_w-40, 32, 10, '#0a1a14', outline='#1d6e55', outline_w=1)
    draw.text((sx + step_w//2, step_y + step_h - 32), note, fill='#5dcaa5', font=F_SMALL, anchor='mm')

    # Arrow between steps
    if i < 3:
        ax = sx + step_w
        draw_arrow_right(ax + 2, step_y + step_h//2, ax + step_gap - 2, '#d4a843', 3)

# Curved return arrow
ret_y = step_y + step_h + 16
for x in range(step_start_x + step_w*3 + step_gap*3, step_start_x, -14):
    draw.ellipse([x, ret_y, x+7, ret_y+5], fill='#5dcaa5')
draw.polygon([
    (step_start_x + 8, ret_y + 2),
    (step_start_x + 20, ret_y - 8),
    (step_start_x + 20, ret_y + 12)
], fill='#5dcaa5')

draw.text((cx, ret_y + 18), '♻  持续积累，知识库越用越智能  ♻', fill='#5dcaa5', font=F_DATA_LABEL, anchor='mt')

# ============================================================
# DATA METRICS BAR
# ============================================================

data_y = ret_y + 56
rrect(40, data_y, W-80, 160, 16, '#0c1828', outline='#1a3050', outline_w=2)

# Section header
draw_icon_circle(80, data_y + 28, 18, '📈', '#1a3050')
draw.text((110, data_y + 18), '核心数据亮点', fill='#8ba4be', font=F_DATA_LABEL, anchor='lt')

data_items = [
    ('10x', '效率提升', '8小时→30分钟', '⚡', '#1a3050'),
    ('100%', '引用可追溯', 'GB/T 7714格式', '✅', '#1a3050'),
    ('3', '导入通道', '文件/URL/笔记', '🔌', '#1a3050'),
    ('0', '手动整理', '粘贴后全自动', '🚀', '#1a3050'),
    ('闭环', '持续积累', '分析→报告→入库', '🔁', '#1a3050'),
]

item_w = (W - 120 - 60) // 5
for i, (val, label, sub, icon, bg) in enumerate(data_items):
    ix = 60 + i * item_w
    iy = data_y + 48
    rrect(ix, iy, item_w - 12, 100, 12, '#0a1420', outline='#1a3050', outline_w=1)

    # Icon at top
    draw.text((ix + (item_w-12)//2, iy + 16), icon, font=F_SMALL, fill='#d4a843', anchor='mm')
    # Big number
    draw.text((ix + (item_w-12)//2, iy + 44), val, fill='#ffffff', font=F_DATA_BIG, anchor='mm')
    # Label
    draw.text((ix + (item_w-12)//2, iy + 74), label, fill='#8ba4be', font=F_SMALL, anchor='mm')
    # Sub
    draw.text((ix + (item_w-12)//2, iy + 92), sub, fill='#5dcaa5', font=F_TINY, anchor='mm')

# ============================================================
# BIDIRECTIONAL DETAIL
# ============================================================

detail_y = data_y + 180
rrect(40, detail_y, W-80, 150, 16, '#0c1828', outline='#2a4a28', outline_w=2)

# Header
draw_icon_circle(80, detail_y + 28, 18, '🔗', '#2a4a28')
draw.text((110, detail_y + 18), 'WorkBuddy ↔ IMA 双向联动机制', fill='#5dcaa5', font=F_DATA_LABEL, anchor='lt')

half_w = (W - 120 - 30) // 2

# Left: Forward
rrect(60, detail_y + 50, half_w, 90, 12, '#0a1a14', outline='#1d6e55', outline_w=1)
draw_icon_circle(100, detail_y + 72, 18, '➡', '#1d6e55')
draw.text((60 + half_w//2, detail_y + 68), '正向：WorkBuddy → IMA', fill='#5dcaa5', font=F_CARD_TITLE, anchor='mm')
draw.text((60 + half_w//2, detail_y + 94), '文献清洗 → 分类标签 → 自动导入知识库', fill='#4a8a6a', font=F_SMALL, anchor='mm')
draw.text((60 + half_w//2, detail_y + 116), 'create_media / import_urls / import_doc', fill='#3a6a5a', font=F_TINY, anchor='mm')

# Right: Reverse
rrect(80 + half_w, detail_y + 50, half_w, 90, 12, '#1a1a0c', outline='#8a7a30', outline_w=1)
draw_icon_circle(120 + half_w, detail_y + 72, 18, '⬅', '#8a7a30')
draw.text((80 + half_w + half_w//2, detail_y + 68), '反向：IMA → WorkBuddy', fill='#d4a843', font=F_CARD_TITLE, anchor='mm')
draw.text((80 + half_w + half_w//2, detail_y + 94), '检索知识库 → AI分析整合 → 生成报告', fill='#a89050', font=F_SMALL, anchor='mm')
draw.text((80 + half_w + half_w//2, detail_y + 116), 'search_doc / get_doc_content → AI分析', fill='#6a5a30', font=F_TINY, anchor='mm')

# Bidirectional arrow in middle
mid_x = 70 + half_w + 15
# Up arrow
draw.polygon([(mid_x-8, detail_y+78), (mid_x, detail_y+66), (mid_x+8, detail_y+78)], fill='#5dcaa5')
# Down arrow
draw.polygon([(mid_x-8, detail_y+112), (mid_x, detail_y+124), (mid_x+8, detail_y+112)], fill='#d4a843')

# ============================================================
# QUOTE BAR
# ============================================================

quote_y = detail_y + 168
# Large quote marks
draw.text((80, quote_y-10), '"', fill='#d4a843', font=get_font(70, True), anchor='lt')
draw.text((W-80, quote_y+70), '"', fill='#d4a843', font=get_font(70, True), anchor='rb')

rrect(130, quote_y + 12, W-260, 72, 16, '#1a1508', outline='#d4a843', outline_w=2)
draw.text((cx, quote_y + 48), '真正的变化不是工具，而是工作流的重新定义', fill='#d4a843', font=F_QUOTE, anchor='mm')

# ============================================================
# BOTTOM
# ============================================================

bot_y = quote_y + 110
# Scene tags
scenes = [('⚡', '电网科技项目研究'), ('📝', '技术报告编写'), ('📋', '专利文献调研'), ('🎓', '学术论文综述')]
tag_w = (W - 180) // 4
for i, (icon, scene) in enumerate(scenes):
    tx = 90 + i * tag_w
    rrect(tx, bot_y, tag_w - 12, 40, 10, '#0c1828', outline='#1a3050', outline_w=1)
    draw.text((tx + (tag_w-12)//2, bot_y + 20), f'{icon}  {scene}', fill='#6a8aae', font=F_SMALL, anchor='mm')

# Bottom decorative line
draw.rectangle([cx-240, bot_y+56, cx+240, bot_y+58], fill='#d4a843')
draw.ellipse([cx-5, bot_y+54, cx+5, bot_y+60], fill='#d4a843')
draw.ellipse([cx-235, bot_y+55, cx-229, bot_y+59], fill='#2a4a6c')
draw.ellipse([cx+229, bot_y+55, cx+235, bot_y+59], fill='#2a4a6c')

# Logo
draw.text((cx, bot_y + 78), 'WorkBuddy  ×  IMA 知识库联动方案', fill='#4a6a8a', font=F_DATA_LABEL, anchor='mt')
draw.text((cx, bot_y + 104), 'v2.0  |  2026.06', fill='#2a4a6a', font=F_TINY, anchor='mt')

# ============================================================
# SIDE DECORATIONS
# ============================================================

# Left side dots
for y in range(col_y, col_y + col_h, 24):
    draw.ellipse([col1_x - 20, y, col1_x - 12, y+8], fill='#1a3050')

# Right side dots
for y in range(col_y, col_y + col_h, 24):
    draw.ellipse([col3_x + col_w + 12, y, col3_x + col_w + 20, y+8], fill='#1a3050')

# Corner decorations
corner_r = 35
for (cx_c, cy_c) in [(35, 35), (W-35, 35), (35, H-35), (W-35, H-35)]:
    dx = 1 if cx_c < W//2 else -1
    dy = 1 if cy_c < H//2 else -1
    draw.line([(cx_c, cy_c), (cx_c + dx*corner_r, cy_c)], fill='#d4a843', width=2)
    draw.line([(cx_c, cy_c), (cx_c, cy_c + dy*corner_r)], fill='#d4a843', width=2)
    draw.ellipse([cx_c-3, cy_c-3, cx_c+3, cy_c+3], fill='#d4a843')

# ============================================================
# SAVE
# ============================================================

output_path = r'C:\AI学习资料\mesheer\2026-06-07-12-42-02\output\学术文献智能流转闭环_v3.jpg'
img.save(output_path, 'JPEG', quality=95)
print(f'Saved to: {output_path}')
print(f'Size: {os.path.getsize(output_path)} bytes')
