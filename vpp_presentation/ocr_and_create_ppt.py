
import os
import sys
import json
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN

print("=" * 80)
print("虚拟电厂PPT - OCR识别与生成工具")
print("=" * 80)

# 配置路径
images_dir = r"c:\AI学习资料\mesheer\vpp_presentation\extracted_images"
original_ppt_path = r"C:\Users\jianlinw\Desktop\南方电网《虚拟电厂技术的探索与实践》 (1).pptx"
output_ppt_path = r"c:\AI学习资料\mesheer\vpp_presentation\虚拟电厂_OCR可编辑版.pptx"
text_output_path = r"c:\AI学习资料\mesheer\vpp_presentation\recognized_text.json"

# 步骤1: 尝试OCR识别
print("\n[步骤1] 初始化OCR...")
ocr_texts = {}

# 先检查是否已有缓存的识别结果
if os.path.exists(text_output_path):
    print("找到已存在的识别结果，加载中...")
    with open(text_output_path, 'r', encoding='utf-8') as f:
        ocr_texts = json.load(f)
    print(f"已加载 {len(ocr_texts)} 张幻灯片的文字")
else:
    # 尝试使用不同的OCR方案
    ocr_success = False
    
    # 方案1: 尝试使用paddleocr
    try:
        print("尝试使用PaddleOCR...")
        from paddleocr import PaddleOCR
        import numpy as np
        from PIL import Image
        
        ocr = PaddleOCR(use_angle_cls=True, lang='ch')
        print("✓ PaddleOCR加载成功")
        
        for slide_num in range(1, 32):
            img_path = os.path.join(images_dir, f"image_{slide_num}.jpg")
            if os.path.exists(img_path):
                print(f"识别幻灯片 {slide_num}/31...")
                result = ocr.ocr(img_path, cls=True)
                
                text_lines = []
                if result and result[0]:
                    for line in result[0]:
                        if line[1][0]:
                            text_lines.append(line[1][0])
                
                full_text = '\n'.join(text_lines)
                ocr_texts[str(slide_num)] = full_text
                ocr_success = True
    
    except Exception as e:
        print(f"✗ PaddleOCR不可用: {e}")
    
    # 方案2: 如果OCR都失败，使用占位文本
    if not ocr_success:
        print("\nOCR工具暂不可用，使用占位文本模式")
        print("您可以稍后手动编辑文本内容")
        
        for slide_num in range(1, 32):
            ocr_texts[str(slide_num)] = f"【幻灯片 {slide_num} 内容】\n\n请在此处根据背景图片输入内容...\n\n提示：\n- 参考背景图片中的文字\n- 调整格式和排版\n- 添加必要的内容"
    
    # 保存识别结果
    with open(text_output_path, 'w', encoding='utf-8') as f:
        json.dump(ocr_texts, f, ensure_ascii=False, indent=2)
    print(f"\n✓ 识别结果已保存到: {text_output_path}")

# 步骤2: 创建PPT
print("\n[步骤2] 创建可编辑PPT...")

# 读取原PPT获取尺寸
original_prs = Presentation(original_ppt_path)
prs = Presentation()
prs.slide_width = original_prs.slide_width
prs.slide_height = original_prs.slide_height
width_in = prs.slide_width / 914400
height_in = prs.slide_height / 914400

for slide_num in range(1, 32):
    print(f"生成幻灯片 {slide_num}/31...")
    
    blank_slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(blank_slide_layout)
    
    # 添加背景图片
    img_path = os.path.join(images_dir, f"image_{slide_num}.jpg")
    if os.path.exists(img_path):
        slide.shapes.add_picture(
            img_path,
            left=0,
            top=0,
            width=prs.slide_width,
            height=prs.slide_height
        )
    
    # 获取识别的文字
    text = ocr_texts.get(str(slide_num), "【请输入内容】")
    
    # 尝试从文本中提取标题（第一行）
    lines = text.strip().split('\n')
    title = lines[0] if lines else f"幻灯片 {slide_num}"
    content = '\n'.join(lines[1:]) if len(lines) > 1 else text
    
    # 添加标题文本框
    title_box = slide.shapes.add_textbox(
        left=Inches(0.5), 
        top=Inches(0.3), 
        width=prs.slide_width - Inches(1), 
        height=Inches(0.8)
    )
    title_frame = title_box.text_frame
    title_frame.text = title[:100]  # 限制标题长度
    title_para = title_frame.paragraphs[0]
    title_para.font.size = Pt(32)
    title_para.font.bold = True
    title_para.alignment = PP_ALIGN.CENTER
    title_box.fill.background()
    
    # 添加内容文本框
    content_box = slide.shapes.add_textbox(
        left=Inches(0.7), 
        top=Inches(1.2), 
        width=prs.slide_width - Inches(1.4), 
        height=prs.slide_height - Inches(2)
    )
    content_frame = content_box.text_frame
    content_frame.word_wrap = True
    
    # 添加内容
    if content.strip():
        content_frame.text = content
    else:
        content_frame.text = "【在此输入内容】\n\n根据背景图片编辑此文本框"
    
    # 格式化内容
    for paragraph in content_frame.paragraphs:
        paragraph.font.size = Pt(18)
    content_box.fill.background()
    
    # 添加页码标签
    note_box = slide.shapes.add_textbox(
        left=Inches(0.2), 
        top=Inches(height_in - 0.4), 
        width=Inches(3), 
        height=Inches(0.3)
    )
    note_frame = note_box.text_frame
    note_frame.text = f"幻灯片 {slide_num} - OCR可编辑版"
    note_para = note_frame.paragraphs[0]
    note_para.font.size = Pt(10)

# 保存
prs.save(output_ppt_path)
print("\n" + "=" * 80)
print(f"✓ 完成！可编辑PPT已保存至:")
print(f"  {output_ppt_path}")
print(f"\n✓ 识别的文字已保存至:")
print(f"  {text_output_path}")
print("\n说明：")
print("- 每张幻灯片保留了原始背景图片")
print("- OCR识别的文字已填入可编辑文本框")
print("- 您可以在PowerPoint中自由编辑和调整")
print("- 如果识别效果不理想，可以手动修改或重新OCR")
print("=" * 80)
