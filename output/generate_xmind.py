import json
import zipfile
import os

def generate_xmind(output_path, content_json_path):
    """生成XMind文件"""
    try:
        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as xmind_file:
            # 添加content.json
            with open(content_json_path, 'r', encoding='utf-8') as f:
                content_data = json.load(f)

            # 添加metadata.json
            metadata = {
                "creator": {
                    "name": "Document Generator",
                    "version": "1.0.0"
                },
                "format-version": "1.0"
            }

            xmind_file.writestr('content.json', json.dumps(content_data, ensure_ascii=False, indent=2))
            xmind_file.writestr('metadata.json', json.dumps(metadata, ensure_ascii=False, indent=2))

        print(f"XMind文件生成成功: {output_path}")
        return True
    except Exception as e:
        print(f"生成失败: {e}")
        return False

if __name__ == "__main__":
    output_path = r"c:\AI学习资料\mesheer\output\科创中心超级个体模式方案.xmind"
    content_json_path = r"c:\AI学习资料\mesheer\output\content.json"

    if os.path.exists(content_json_path):
        generate_xmind(output_path, content_json_path)
    else:
        print(f"content.json文件不存在: {content_json_path}")
