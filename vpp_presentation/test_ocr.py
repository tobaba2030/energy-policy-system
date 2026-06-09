
import os
import sys
from PIL import Image

print("检查OCR环境...")
print("=" * 60)

# 检查pytesseract
try:
    import pytesseract
    print("✓ pytesseract库已安装")
    
    # 尝试查找tesseract
    possible_paths = [
        r'C:\Program Files\Tesseract-OCR\tesseract.exe',
        r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
        os.path.expanduser(r'~\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'),
    ]
    
    tesseract_path = None
    for path in possible_paths:
        if os.path.exists(path):
            tesseract_path = path
            print(f"✓ 找到tesseract: {path}")
            pytesseract.pytesseract.tesseract_cmd = path
            break
    
    if not tesseract_path:
        print("✗ 未找到tesseract OCR引擎")
        print("\n正在尝试替代方案...")
except Exception as e:
    print(f"✗ pytesseract导入失败: {e}")

# 检查是否有其他OCR选项
print("\n检查图片是否可读取...")
test_img = r"c:\AI学习资料\mesheer\vpp_presentation\extracted_images\image_1.jpg"
if os.path.exists(test_img):
    try:
        img = Image.open(test_img)
        print(f"✓ 图片可读取: {test_img}")
        print(f"  尺寸: {img.size}")
    except Exception as e:
        print(f"✗ 图片读取失败: {e}")
else:
    print("✗ 测试图片不存在")

print("\n" + "=" * 60)
print("尝试安装简单OCR替代方案...")
print("正在安装easyocr (无需tesseract)...")

try:
    import easyocr
    print("✓ easyocr已安装")
except ImportError:
    import subprocess
    print("正在安装easyocr...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "easyocr"])
        print("✓ easyocr安装成功")
    except Exception as e:
        print(f"✗ easyocr安装失败: {e}")
