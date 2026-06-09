from PIL import Image, ImageDraw, ImageFont
import os, math

W, H = 1360, 1800
img = Image.new('RGB', (W, H), '#080e1e')
draw = ImageDraw.Draw(img)

font_path = r'C:\Windows\Fonts\msyh.ttc'

def get_font(size, bold=False):
    try:
        return ImageFont.truetype(font_path, size, index=0 if bold else 1)
    except:
        return ImageFont.truetype(font_path, size)

# Font definitions
F_TITLE = get_font(46, True)
F_SUB = get_font(26)
F_SECTION = get_font(30, True)
F_COL_TITLE = get_font(24, True)
F_CARD_TITLE = get_font(20, True)
F_CARD_DESC = get_font(16)
F_DATA_BIG = get_font(40, True)
F_DATA_LABEL = get_font(18)
F_DATA_SUB = get_font(15)
F_STEP_TITLE = get_font(20, True)
F_STEP_DESC = get_font(16)
F_QUOTE = get_font(26, True)
F_BOTTOM = get_font(16)
F_NUM = get_font(20, True)
F_ICON = get_font(28)
F_SMALL = get_font(14)
F_TINY = get_font(12)

cx = W // 2

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def rrect(x, y, w, h, r, fill, outline=None, outline_w=1):
    """Draw rounded rectangle"""
    draw.rounded_rectangle([x, y, x+w, y+h], radius=r, fill=fill, outline=outline, width=outline_w)

def draw_icon_circle(x, y, r, icon_text, bg_color, text_color='#ffffff'):
    """Draw a circle with an icon/emoji character"""
    draw.ellipse([x-r, y-r, x+r, y+r], fill=bg_color)
    draw.text((x, y), icon_text, fill=text_color, font=F_ICON, anchor='mm')

def draw_hexagon(x, y, r, fill, outline=None):
    """Draw a hexagon shape"""
    pts = []
    for i in range(6):
        angle = math.pi / 3 * i - math.pi / 6
        pts.append((x + r * math.cos(angle), y + r * math.sin(angle)))
    draw.polygon(pts, fill=fill, outline=outline)

def draw_diamond(x, y, r, fill):
    """Draw a diamond shape"""
    draw.polygon([(x, y-r), (x+r, y), (x, y+r), (x-r, y)], fill=fill)

def hex_to_rgb(hex_color):
    """Convert hex color string to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def draw_glow_circle(x, y, r, color, alpha_steps=8):
    """Draw a glowing circle effect"""
    if isinstance(color, str):
        color = hex_to_rgb(color)
    for i in range(alpha_steps, 0, -1):
        cr = r + i * 3
        c = tuple(int(color[j] * (1 - i/(alpha_steps+1)) * 0.3) for j in range(3))
        draw.ellipse([x-cr, y-cr, x+cr, y+cr], fill=c)
    draw.ellipse([x-r, y-r, x+r, y+r], fill=color)

def draw_arrow_right(x1, y, x2, color='#d4a843', width=2):
    """Draw a right-pointing arrow"""
    draw.line([(x1, y), (x2-10, y)], fill=color, width=width)
    draw.polygon([(x2-10, y-8), (x2, y), (x2-10, y+8)], fill=color)

def draw_arrow_down(x, y1, y2, color='#d4a843', width=2):
    """Draw a down-pointing arrow"""
    draw.line([(x, y1), (x, y2-8)], fill=color, width=width)
    draw.polygon([(x-8, y2-8), (x, y2), (x+8, y2-8)], fill=color)

def draw_curved_arrow_down_right(x1, y1, x2, y2, color='#5dcaa5', width=2):
    """Draw a curved return arrow (down then right)"""
    mid_y = (y1 + y2) // 2
    draw.line([(x1, y1), (x1, mid_y)], fill=color, width=width)
    draw.line([(x1, mid_y), (x2-8, mid_y)], fill=color, width=width)
    draw.polygon([(x2-8, mid_y-6), (x2, mid_y), (x2-8, mid_y+6)], fill=color)

def draw_dotted_line(x1, y, x2, color='#3a5a7c', dot_gap=10):
    """Draw horizontal dotted line"""
    for x in range(x1, x2, dot_gap):
        draw.ellipse([x, y-1, x+3, y+2], fill=color)

def draw_circuit_pattern(x, y, w, h, color='#0d1a2e'):
    """Draw subtle circuit-board-like decorative pattern"""
    for i in range(0, w, 40):
        draw.line([(x+i, y), (x+i, y+h)], fill=color, width=1)
    for j in range(0, h, 40):
        draw.line([(x, y+j), (x+w, y+j)], fill=color, width=1)
    for i in range(20, w, 40):
        for j in range(20, h, 40):
            draw.ellipse([x+i-2, y+j-2, x+i+2, y+j+2], fill=color)

def draw_wave(y, color='#0d1a2e', amplitude=8, freq=0.02):
    """Draw a decorative wave line"""
    pts = [(x, y + int(amplitude * math.sin(freq * x))) for x in range(0, W, 3)]
    draw.line(pts, fill=color, width=2)

# ============================================================
# BACKGROUND LAYERS
# ============================================================

# Gradient-like background layers
for y in range(H):
    ratio = y / H
    r = int(8 + ratio * 6)
    g = int(14 + ratio * 8)
    b = int(30 + ratio * 12)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Subtle grid pattern
for x in range(0, W, 60):
    draw.line([(x, 0), (x, H)], fill='#0c1628', width=1)
for y in range(0, H, 60):
    draw.line([(0, y), (W, y)], fill='#0c1628', width=1)

# Decorative background circles (subtle)
bg_circles = [(180, 300, 120, '#0d1a30'), (1100, 200, 80, '#0d1a30'),
              (200, 1200, 100, '#0d1a30'), (1150, 1100, 90, '#0d1a30'),
              (680, 800, 150, '#0d1a2e'), (100, 700, 60, '#0d1a30'),
              (1250, 600, 70, '#0d1a30')]
for bx, by, br, bc in bg_circles:
    draw.ellipse([bx-br, by-br, bx+br, by+br], fill=bc)

# ============================================================
# TOP HEADER AREA
# ============================================================

# Top decorative bar with gradient effect
for i in range(6):
    alpha = 1 - i * 0.15
    c = tuple(int(v * alpha) for v in (0xd4, 0xa8, 0x43))
    draw.rectangle([80+i, 20+i, W-80-i, 22+i], fill=c)

# Hexagon decorations
for hx in [80, 160, W-160, W-80]:
    draw_hexagon(hx, 18, 8, '#1a3050', '#2a4a6c')

# Diamond decorations
for dx in [240, 320, W-320, W-240]:
    draw_diamond(dx, 18, 6, '#d4a843')

# Title with glow
draw_glow_circle(cx, 68, 4, '#d4a843')
draw.text((cx, 70), '学术文献智能流转闭环', fill='#ffffff', font=F_TITLE, anchor='mt')

# Subtitle
draw.text((cx, 118), '从人工爬取到智能报告，全流程自动化升级', fill='#d4a843', font=F_SUB, anchor='mt')

# Subtitle underline
draw.rectangle([cx-200, 148, cx+200, 149], fill='#d4a843')
draw.ellipse([cx-4, 145, cx+4, 153], fill='#d4a843')

# ============================================================
# SOURCE INDICATOR (中国科技云)
# ============================================================

source_y = 170
rrect(50, source_y, W-100, 56, 14, '#0d1a30', outline='#1a3050', outline_w=2)
# Icon circle
draw_icon_circle(100, source_y+28, 18, '☁', '#1a4a6c')
draw.text((130, source_y+18), '数据源头：中国科技云学术智能体平台', fill='#8ba4be', font=F_DATA_LABEL, anchor='lt')
draw.text((130, source_y+38), '人工爬取 → 粘贴/上传到WorkBuddy（唯一手动环节）', fill='#5dcaa5', font=F_SMALL, anchor='lt')
# Right side decoration
draw.ellipse([W-120, source_y+20, W-100, source_y+40], fill='#1a3050')
draw.ellipse([W-90, source_y+20, W-70, source_y+40], fill='#2a4a6c')
draw.ellipse([W-60, source_y+20, W-40, source_y+40], fill='#d4a843')

# Arrow down from source
draw_arrow_down(cx, source_y+56, source_y+80, '#d4a843', 2)

# ============================================================
# THREE COLUMNS COMPARISON
# ============================================================

col_y = source_y + 90
col_w = 370
col_h = 500
col_gap = 25
col1_x = (W - 3*col_w - 2*col_gap) // 2
col2_x = col1_x + col_w + col_gap
col3_x = col2_x + col_w + col_gap

# --- Column 1: Traditional Manual ---
rrect(col1_x, col_y, col_w, col_h, 16, '#0c1828', outline='#1a3a5c', outline_w=2)

# Header with icon
rrect(col1_x, col_y, col_w, 60, 16, '#142840')
draw.rectangle([col1_x, col_y+48, col1_x+col_w, col_y+60], fill='#142840')
draw_icon_circle(col1_x+40, col_y+30, 20, '📋', '#1a3a5c')
draw.text((col1_x+72, col_y+30), '传统手工模式', fill='#6a8aae', font=F_COL_TITLE, anchor='lm')

# Cards with icons
cards1 = [
    ('🔍', '人工检索下载', '知网/万方/科技云逐个查找', '#1a3050'),
    ('📁', '手动整理分类', 'Excel表格记录，文件夹归档', '#1a3050'),
    ('📖', '人工阅读提炼', '逐篇阅读，手动写摘要笔记', '#1a3050'),
    ('✏️', '手动编写报告', 'Word中手动排版引用格式', '#1a3050'),
]

for i, (icon, title, desc, bg) in enumerate(cards1):
    cy = col_y + 76 + i * 100
    rrect(col1_x+14, cy, col_w-28, 88, 10, '#0a1420', outline='#1a3050', outline_w=1)
    # Icon
    draw_icon_circle(col1_x+44, cy+44, 20, icon, bg)
    # Text
    draw.text((col1_x+74, cy+30), title, fill='#ffffff', font=F_CARD_TITLE, anchor='lm')
    draw.text((col1_x+74, cy+56), desc, fill='#6a8aae', font=F_CARD_DESC, anchor='lm')

# Bottom status
rrect(col1_x+14, col_y+col_h-70, col_w-28, 56, 10, '#1a0c0c', outline='#5a2020', outline_w=1)
draw_icon_circle(col1_x+50, col_y+col_h-42, 16, '⏰', '#5a2020')
draw.text((col1_x+76, col_y+col_h-52), '耗时 4-8 小时/10篇', fill='#e24b4a', font=F_DATA_LABEL, anchor='lm')
draw.text((col1_x+76, col_y+col_h-30), '效率低 · 易遗漏 · 难追溯', fill='#8a5a5a', font=F_SMALL, anchor='lm')

# --- Column 2: WorkBuddy (highlighted) ---
# Glow effect behind
for g in range(12, 0, -1):
    gc = tuple(int(v * 0.1 * (1 - g/13)) for v in (0xd4, 0xa8, 0x43))
    rrect(col2_x-g, col_y-g, col_w+2*g, col_h+2*g, 16+g, None, outline=gc, outline_w=1)

rrect(col2_x, col_y, col_w, col_h, 16, '#0e1a28', outline='#d4a843', outline_w=3)

# Header with icon (gold)
rrect(col2_x, col_y, col_w, 60, 16, '#d4a843')
draw.rectangle([col2_x, col_y+48, col2_x+col_w, col_y+60], fill='#d4a843')
draw_icon_circle(col2_x+40, col_y+30, 20, '🤖', '#b8922e')
draw.text((col2_x+72, col_y+30), 'WorkBuddy 自动化', fill='#0a1628', font=F_COL_TITLE, anchor='lm')

cards2 = [
    ('📤', '粘贴/上传文献', 'PDF/链接/全文粘贴到对话框', '#2a2010'),
    ('⚙️', 'AI自动清洗提取', '去重、标准化、元数据提取', '#2a2010'),
    ('🏷️', '智能分类标签', 'NLP关键词提取，自动归类', '#2a2010'),
    ('🔄', '自动传入IMA', 'OpenAPI三条通道自动写入', '#2a2010'),
]

for i, (icon, title, desc, bg) in enumerate(cards2):
    cy = col_y + 76 + i * 100
    rrect(col2_x+14, cy, col_w-28, 88, 10, '#0a1420', outline='#4a3a18', outline_w=1)
    draw_icon_circle(col2_x+44, cy+44, 20, icon, bg)
    draw.text((col2_x+74, cy+30), title, fill='#ffffff', font=F_CARD_TITLE, anchor='lm')
    draw.text((col2_x+74, cy+56), desc, fill='#a89050', font=F_CARD_DESC, anchor='lm')

# Bottom status (green)
rrect(col2_x+14, col_y+col_h-70, col_w-28, 56, 10, '#0a1a14', outline='#1d6e55', outline_w=1)
draw_icon_circle(col2_x+50, col_y+col_h-42, 16, '⚡', '#1d6e55')
draw.text((col2_x+76, col_y+col_h-52), '仅需 5 分钟/10篇', fill='#5dcaa5', font=F_DATA_LABEL, anchor='lm')
draw.text((col2_x+76, col_y+col_h-30), '唯一手动：粘贴上传', fill='#4a8a6a', font=F_SMALL, anchor='lm')

# --- Column 3: IMA ---
rrect(col3_x, col_y, col_w, col_h, 16, '#0c1828', outline='#1a3a5c', outline_w=2)

# Header with icon
rrect(col3_x, col_y, col_w, 60, 16, '#142840')
draw.rectangle([col3_x, col_y+48, col3_x+col_w, col_y+60], fill='#142840')
draw_icon_circle(col3_x+40, col_y+30, 20, '📚', '#1a3a5c')
draw.text((col3_x+72, col_y+30), 'IMA 知识库', fill='#6a8aae', font=F_COL_TITLE, anchor='lm')

cards3 = [
    ('📄', '文件上传通道', 'PDF/Word/PPT → COS存储', '#1a3050'),
    ('🔗', 'URL导入通道', '在线论文链接一键收录', '#1a3050'),
    ('📝', '笔记创建通道', 'Markdown综述笔记自动写入', '#1a3050'),
    ('🗄️', '结构化文献库', '可搜索、可引用、可追溯', '#1a3050'),
]

for i, (icon, title, desc, bg) in enumerate(cards3):
    cy = col_y + 76 + i * 100
    rrect(col3_x+14, cy, col_w-28, 88, 10, '#0a1420', outline='#1a3050', outline_w=1)
    draw_icon_circle(col3_x+44, cy+44, 20, icon, bg)
    draw.text((col3_x+74, cy+30), title, fill='#ffffff', font=F_CARD_TITLE, anchor='lm')
    draw.text((col3_x+74, cy+56), desc, fill='#6a8aae', font=F_CARD_DESC, anchor='lm')

# Bottom status (green)
rrect(col3_x+14, col_y+col_h-70, col_w-28, 56, 10, '#0a1a14', outline='#1d6e55', outline_w=1)
draw_icon_circle(col3_x+50, col_y+col_h-42, 16, '✅', '#1d6e55')
draw.text((col3_x+76, col_y+col_h-52), '全自动入库，零人工', fill='#5dcaa5', font=F_DATA_LABEL, anchor='lm')
draw.text((col3_x+76, col_y+col_h-30), '三种通道适配所有文献类型', fill='#4a8a6a', font=F_SMALL, anchor='lm')

# --- Arrows between columns ---
arrow_y_positions = [col_y + 180, col_y + 280, col_y + 380]
for ay in arrow_y_positions:
    # Arrow Col1 → Col2
    ax1 = col1_x + col_w
    draw_arrow_right(ax1 + 4, ay, ax1 + col_gap - 4, '#d4a843', 3)
    # Arrow Col2 → Col3
    ax2 = col2_x + col_w
    draw_arrow_right(ax2 + 4, ay, ax2 + col_gap - 4, '#d4a843', 3)

# ============================================================
# GOLD SEPARATOR BAR
# ============================================================

sep_y = col_y + col_h + 16
# Decorative separator
draw.rectangle([60, sep_y+4, W-60, sep_y+5], fill='#1a3050')
draw.rectangle([100, sep_y+7, W-100, sep_y+8], fill='#d4a843')
draw.rectangle([60, sep_y+10, W-60, sep_y+11], fill='#1a3050')
# Center diamond
draw_diamond(cx, sep_y+8, 8, '#d4a843')
# Side hexagons
draw_hexagon(120, sep_y+8, 6, '#d4a843')
draw_hexagon(W-120, sep_y+8, 6, '#d4a843')

# ============================================================
# LOOP-BACK SECTION
# ============================================================

loop_y = sep_y + 30
draw.text((cx, loop_y), '🔄 闭环回流：WorkBuddy 反向调用 IMA 知识库', fill='#d4a843', font=F_SECTION, anchor='mt')
draw.text((cx, loop_y+36), '知识积累 → 智能分析 → 报告输出 → 再积累', fill='#6a8aae', font=F_SMALL, anchor='mt')

# 4 Steps
step_w = 280
step_h = 180
step_gap = 16
step_y = loop_y + 60
total_steps_w = 4 * step_w + 3 * step_gap
step_start_x = (W - total_steps_w) // 2

steps = [
    ('1', '💬', '发起分析请求', ['"帮我分析虚拟电厂"', '"最新研究进展"'], 'WorkBuddy接收指令', '#2a5070'),
    ('2', '🔎', '检索IMA知识库', ['自动搜索知识库中', '相关文献与笔记'], 'IMA OpenAPI查询', '#2a5070'),
    ('3', '🧠', 'AI分析整合', ['多文献交叉分析', '提炼观点与趋势'], 'WorkBuddy智能处理', '#2a5070'),
    ('4', '📊', '输出报告', ['技术报告·文献综述', '含自动引用格式'], 'GB/T 7714标准', '#2a5070'),
]

for i, (num, icon, title, descs, note, bg) in enumerate(steps):
    sx = step_start_x + i * (step_w + step_gap)

    # Card with subtle glow
    rrect(sx, step_y, step_w, step_h, 14, '#0c1828', outline='#d4a843', outline_w=2)

    # Step number badge
    badge_x = sx + 30
    badge_y = step_y + 24
    draw.ellipse([badge_x-18, badge_y-18, badge_x+18, badge_y+18], fill='#d4a843')
    draw.text((badge_x, badge_y), num, fill='#0a1628', font=F_NUM, anchor='mm')

    # Icon
    draw_icon_circle(sx + step_w - 36, step_y + 28, 18, icon, bg)

    # Title
    draw.text((sx + step_w//2, step_y + 32), title, fill='#ffffff', font=F_STEP_TITLE, anchor='mm')

    # Separator line
    draw.rectangle([sx+20, step_y+56, sx+step_w-20, step_y+57], fill='#1a3050')

    # Description lines
    for j, desc in enumerate(descs):
        draw.text((sx + step_w//2, step_y + 76 + j*24), desc, fill='#8ba4be', font=F_STEP_DESC, anchor='mm')

    # Note at bottom
    rrect(sx+16, step_y+step_h-40, step_w-32, 28, 8, '#0a1a14', outline='#1d6e55', outline_w=1)
    draw.text((sx + step_w//2, step_y + step_h - 26), note, fill='#5dcaa5', font=F_SMALL, anchor='mm')

    # Arrow between steps
    if i < 3:
        ax = sx + step_w
        draw_arrow_right(ax + 2, step_y + step_h//2, ax + step_gap - 2, '#d4a843', 3)

# Curved return arrow (from step 4 back to step 1)
ret_y = step_y + step_h + 12
# Dashed return line
for x in range(step_start_x + step_w*3 + step_gap*3, step_start_x, -12):
    draw.ellipse([x, ret_y, x+6, ret_y+4], fill='#5dcaa5')
# Arrow head pointing left
draw.polygon([
    (step_start_x + 6, ret_y + 2),
    (step_start_x + 16, ret_y - 6),
    (step_start_x + 16, ret_y + 10)
], fill='#5dcaa5')

# Return label
draw.text((cx, ret_y + 14), '♻  持续积累，知识库越用越智能  ♻', fill='#5dcaa5', font=F_DATA_LABEL, anchor='mt')

# ============================================================
# DATA METRICS BAR
# ============================================================

data_y = ret_y + 50
rrect(50, data_y, W-100, 140, 14, '#0c1828', outline='#1a3050', outline_w=2)

# Section icon
draw_icon_circle(90, data_y + 24, 16, '📈', '#1a3050')
draw.text((114, data_y + 16), '核心数据亮点', fill='#8ba4be', font=F_DATA_LABEL, anchor='lt')

data_items = [
    ('10x', '效率提升', '8小时→30分钟', '⚡'),
    ('100%', '引用可追溯', 'GB/T 7714格式', '✅'),
    ('3', '导入通道', '文件/URL/笔记', '🔌'),
    ('0', '手动整理', '粘贴后全自动', '🚀'),
    ('闭环', '持续积累', '分析→报告→入库', '🔁'),
]

item_w = (W - 140 - 40) // 5
for i, (val, label, sub, icon) in enumerate(data_items):
    ix = 70 + i * item_w
    iy = data_y + 40
    rrect(ix, iy, item_w - 10, 90, 10, '#0a1420', outline='#1a3050', outline_w=1)
    # Icon at top
    draw.text((ix + (item_w-10)//2, iy + 14), icon, font=F_SMALL, fill='#d4a843', anchor='mm')
    # Big number
    draw.text((ix + (item_w-10)//2, iy + 38), val, fill='#ffffff', font=F_DATA_BIG, anchor='mm')
    # Label
    draw.text((ix + (item_w-10)//2, iy + 66), label, fill='#8ba4be', font=F_SMALL, anchor='mm')
    # Sub
    draw.text((ix + (item_w-10)//2, iy + 82), sub, fill='#5dcaa5', font=F_TINY, anchor='mm')

# ============================================================
# WORKBUDDY→IMA REVERSE CALL DETAIL
# ============================================================

detail_y = data_y + 160
rrect(50, detail_y, W-100, 130, 14, '#0c1828', outline='#2a4a28', outline_w=2)

# Header
draw_icon_circle(90, detail_y + 24, 16, '🔗', '#2a4a28')
draw.text((114, detail_y + 16), 'WorkBuddy ↔ IMA 双向联动机制', fill='#5dcaa5', font=F_DATA_LABEL, anchor='lt')

# Two sub-boxes
half_w = (W - 140 - 20) // 2

# Left: 正向
rrect(70, detail_y + 42, half_w, 76, 10, '#0a1a14', outline='#1d6e55', outline_w=1)
draw.text((70 + half_w//2, detail_y + 58), '正向：WorkBuddy → IMA', fill='#5dcaa5', font=F_CARD_TITLE, anchor='mm')
draw.text((70 + half_w//2, detail_y + 80), '文献清洗 → 分类标签 → 自动导入知识库', fill='#4a8a6a', font=F_SMALL, anchor='mm')
draw.text((70 + half_w//2, detail_y + 100), 'create_media / import_urls / import_doc', fill='#3a6a5a', font=F_TINY, anchor='mm')

# Right: 反向
rrect(90 + half_w, detail_y + 42, half_w, 76, 10, '#1a1a0c', outline='#8a7a30', outline_w=1)
draw.text((90 + half_w + half_w//2, detail_y + 58), '反向：IMA → WorkBuddy', fill='#d4a843', font=F_CARD_TITLE, anchor='mm')
draw.text((90 + half_w + half_w//2, detail_y + 80), '检索知识库 → AI分析整合 → 生成报告', fill='#a89050', font=F_SMALL, anchor='mm')
draw.text((90 + half_w + half_w//2, detail_y + 100), 'search_doc / get_doc_content → AI分析', fill='#6a5a30', font=F_TINY, anchor='mm')

# Bidirectional arrow
arrow_cx = 80 + half_w + 10
draw.polygon([(arrow_cx-8, detail_y+72), (arrow_cx, detail_y+64), (arrow_cx+8, detail_y+72)], fill='#5dcaa5')
draw.polygon([(arrow_cx-8, detail_y+88), (arrow_cx, detail_y+96), (arrow_cx+8, detail_y+88)], fill='#d4a843')

# ============================================================
# QUOTE BAR
# ============================================================

quote_y = detail_y + 148
# Decorative quote marks
draw.text((90, quote_y), '"', fill='#d4a843', font=get_font(60, True), anchor='lt')
draw.text((W-90, quote_y+60), '"', fill='#d4a843', font=get_font(60, True), anchor='rb')

rrect(120, quote_y + 8, W-240, 64, 14, '#1a1508', outline='#d4a843', outline_w=2)
draw.text((cx, quote_y + 40), '真正的变化不是工具，而是工作流的重新定义', fill='#d4a843', font=F_QUOTE, anchor='mm')

# ============================================================
# BOTTOM AREA
# ============================================================

bot_y = quote_y + 90
# Scene tags
scenes = ['⚡ 电网科技项目研究', '📝 技术报告编写', '📋 专利文献调研', '🎓 学术论文综述']
tag_w = (W - 200) // 4
for i, scene in enumerate(scenes):
    tx = 100 + i * tag_w
    rrect(tx, bot_y, tag_w - 10, 36, 8, '#0c1828', outline='#1a3050', outline_w=1)
    draw.text((tx + (tag_w-10)//2, bot_y + 18), scene, fill='#6a8aae', font=F_SMALL, anchor='mm')

# Bottom decorative line
draw.rectangle([cx-220, bot_y+52, cx+220, bot_y+53], fill='#d4a843')
draw.ellipse([cx-4, bot_y+50, cx+4, bot_y+58], fill='#d4a843')

# Logo line
draw.text((cx, bot_y + 68), 'WorkBuddy  ×  IMA 知识库联动方案', fill='#4a6a8a', font=F_DATA_LABEL, anchor='mt')
draw.text((cx, bot_y + 92), 'v2.0  |  2026.06', fill='#2a4a6a', font=F_TINY, anchor='mt')

# ============================================================
# SIDE DECORATIONS
# ============================================================

# Left side vertical decorative line with dots
for y in range(col_y, col_y + col_h, 20):
    draw.ellipse([col1_x - 16, y, col1_x - 10, y+6], fill='#1a3050')

# Right side vertical decorative line with dots
for y in range(col3_x + col_w + 10, col3_x + col_w + 16, 1):
    for yy in range(col_y, col_y + col_h, 20):
        draw.ellipse([y, yy, y+6, yy+6], fill='#1a3050')

# Corner decorations
corner_size = 30
for (cx_c, cy_c) in [(40, 40), (W-40, 40), (40, H-40), (W-40, H-40)]:
    draw.rectangle([cx_c-1, cy_c-1, cx_c+1, cy_c+1], fill='#d4a843')
    dx = 1 if cx_c < W//2 else -1
    dy = 1 if cy_c < H//2 else -1
    draw.line([(cx_c, cy_c), (cx_c + dx*corner_size, cy_c)], fill='#1a3050', width=2)
    draw.line([(cx_c, cy_c), (cx_c, cy_c + dy*corner_size)], fill='#1a3050', width=2)

# Save as JPG
output_path = r'C:\AI学习资料\mesheer\2026-06-07-12-42-02\output\学术文献智能流转闭环_v2.jpg'
img.save(output_path, 'JPEG', quality=95)
print(f'Saved to: {output_path}')
print(f'Size: {os.path.getsize(output_path)} bytes')
