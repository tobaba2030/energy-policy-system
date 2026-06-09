from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
import os
import json

print("=" * 80)
print("创建完全保留原图片的可编辑PPT")
print("=" * 80)

# 文件路径
images_dir = r"c:\AI学习资料\mesheer\vpp_presentation\extracted_images"
text_file = r"c:\AI学习资料\mesheer\vpp_presentation\recognized_text.json"
output_file = r"c:\AI学习资料\mesheer\vpp_presentation\虚拟电厂技术的探索与实践_保留原图版.pptx"

# 读取文字内容
with open(text_file, 'r', encoding='utf-8') as f:
    slide_texts = json.load(f)

# 创建新PPT
prs = Presentation()

# 设置尺寸与原PPT一致（10x5.625英寸，16:9）
prs.slide_width = int(10 * 914400)
prs.slide_height = int(5.625 * 914400)

# 处理每一张幻灯片
for slide_num in range(1, 32):
    print(f"处理第 {slide_num}/31 页...")
    
    # 使用空白布局
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    
    # 1. 添加原图片作为背景（全屏）
    img_path = os.path.join(images_dir, f"image_{slide_num}.jpg")
    if os.path.exists(img_path):
        slide.shapes.add_picture(
            img_path,
            left=0,
            top=0,
            width=prs.slide_width,
            height=prs.slide_height
        )
    
    # 获取当前页文字
    text = slide_texts.get(str(slide_num), "")
    lines = text.strip().split('\n')
    
    # 2. 添加标题文字框（透明背景）
    if lines:
        title_text = lines[0]
        title_box = slide.shapes.add_textbox(
            left=Inches(0.5),
            top=Inches(0.3),
            width=prs.slide_width - Inches(1),
            height=Inches(0.8)
        )
        title_frame = title_box.text_frame
        title_frame.word_wrap = True
        title_paragraph = title_frame.paragraphs[0]
        title_paragraph.text = title_text
        title_paragraph.font.size = Pt(32)
        title_paragraph.font.bold = True
        title_paragraph.font.color.rgb = RGBColor(0, 80, 158)
        title_paragraph.alignment = PP_ALIGN.CENTER
        title_box.fill.background()  # 透明背景
        title_box.line.fill.background()  # 透明边框
    
    # 3. 添加内容文字框（透明背景）
    if len(lines) > 1:
        content_text = '\n'.join(lines[1:])
        content_box = slide.shapes.add_textbox(
            left=Inches(0.7),
            top=Inches(1.2),
            width=prs.slide_width - Inches(1.4),
            height=prs.slide_height - Inches(2)
        )
        content_frame = content_box.text_frame
        content_frame.word_wrap = True
        
        # 分段落添加
        content_paragraphs = content_text.split('\n')
        first_paragraph = True
        
        for para_text in content_paragraphs:
            if first_paragraph:
                p = content_frame.paragraphs[0]
                first_paragraph = False
            else:
                p = content_frame.add_paragraph()
            
            p.text = para_text
            p.font.size = Pt(18)
            p.font.color.rgb = RGBColor(51, 51, 51)
            p.line_spacing = 1.5
        
        content_box.fill.background()
        content_box.line.fill.background()
    
    # 4. 添加页码标识（右下角，透明背景）
    page_box = slide.shapes.add_textbox(
        left=Inches(10.5),
        top=Inches(5.1),
        width=Inches(2),
        height=Inches(0.4)
    )
    page_frame = page_box.text_frame
    page_para = page_frame.paragraphs[0]
    page_para.text = f"第 {slide_num} 页"
    page_para.font.size = Pt(12)
    page_para.font.color.rgb = RGBColor(100, 100, 100)
    page_para.alignment = PP_ALIGN.RIGHT
    page_box.fill.background()

# 保存PPT
prs.save(output_file)

print("\n" + "=" * 80)
print("✓ PPT创建成功！")
print(f"✓ 文件位置: {output_file}")
print("=" * 80)
print("\n特点说明：")
print("- ✅ 完全保留原PPT的所有图片作为背景")
print("- ✅ 添加可编辑的文字层（标题+内容）")
print("- ✅ 文字框使用透明背景，不影响图片显示")
print("- ✅ 统一字体和排版")
print("- ✅ 保持原PPT的尺寸比例")
print("- ✅ 31页完整内容")
print("=" * 80)
