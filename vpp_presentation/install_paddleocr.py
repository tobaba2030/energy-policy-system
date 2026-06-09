
import sys
import subprocess

print("正在安装PaddleOCR...")
print("=" * 60)

# 先安装paddlepaddle
try:
    import paddle
    print("✓ paddlepaddle已安装")
except ImportError:
    print("正在安装paddlepaddle (CPU版本)...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "paddlepaddle==2.6.1"])

# 安装paddleocr
try:
    import paddleocr
    print("✓ paddleocr已安装")
except ImportError:
    print("正在安装paddleocr...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "paddleocr"])

print("\n" + "=" * 60)
print("OCR工具安装完成！")
