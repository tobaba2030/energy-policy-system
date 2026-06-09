
import os

image_dir = r"c:\AI学习资料\mesheer\vpp_presentation\extracted_images"

html = """&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;查看PPT图片&lt;/title&gt;
    &lt;style&gt;
        body { font-family: Arial, sans-serif; margin: 20px; }
        .gallery { display: flex; flex-wrap: wrap; gap: 20px; }
        .slide { border: 1px solid #ccc; padding: 10px; }
        .slide img { max-width: 500px; height: auto; }
        h2 { margin-top: 30px; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;虚拟电厂PPT - 提取的图片&lt;/h1&gt;
    &lt;div class="gallery"&gt;
"""

# 按数字顺序添加图片
for i in range(1, 32):
    img_path = os.path.join(image_dir, f"image_{i}.jpg")
    if os.path.exists(img_path):
        html += f'        &lt;div class="slide"&gt;\n'
        html += f'            &lt;h3&gt;幻灯片 {i}&lt;/h3&gt;\n'
        html += f'            &lt;img src="extracted_images/image_{i}.jpg" alt="幻灯片 {i}"&gt;\n'
        html += f'        &lt;/div&gt;\n'

html += """
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
"""

with open(r"c:\AI学习资料\mesheer\vpp_presentation\view_slides.html", "w", encoding="utf-8") as f:
    f.write(html)

print("HTML已生成")
