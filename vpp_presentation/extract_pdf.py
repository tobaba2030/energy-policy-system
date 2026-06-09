
import sys
import os

# 尝试安装PyPDF2用于提取PDF文本
try:
    import PyPDF2
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "PyPDF2"])
    import PyPDF2

pdf_path = r"C:\Users\jianlinw\Desktop\南方电网《虚拟电厂技术的探索与实践》.pdf"

print("尝试从PDF提取文本...")
print("=" * 80)

with open(pdf_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    print(f"PDF页数: {len(reader.pages)}")
    
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text = page.extract_text()
        print(f"\n--- 第 {page_num + 1} 页 ---")
        if text and text.strip():
            print(text)
        else:
            print("(没有可提取的文本 - 可能是图片)")
