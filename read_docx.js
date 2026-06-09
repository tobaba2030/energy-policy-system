
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOMParser } from 'xmldom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docxPath = path.join(__dirname, '..', '..', 'Desktop', 'AI工具专题材料', 'AI+研究报告撰写流程V2.docx');

console.log('正在尝试读取文件:', docxPath);

if (!fs.existsSync(docxPath)) {
  console.error('文件不存在！');
  
  // 尝试列出目录内容
  const parentDir = path.dirname(docxPath);
  if (fs.existsSync(parentDir)) {
    console.log('目录内容:', fs.readdirSync(parentDir));
  }
  process.exit(1);
}

import { extract } from 'zip-lib';
import tempfile from 'tempfile';

const tempDir = tempfile();

console.log('正在解压文件...');

try {
  await extract(docxPath, tempDir);
  
  const docXmlPath = path.join(tempDir, 'word', 'document.xml');
  
  if (!fs.existsSync(docXmlPath)) {
    console.error('找不到document.xml');
    process.exit(1);
  }
  
  const xmlContent = fs.readFileSync(docXmlPath, 'utf8');
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlContent, 'text/xml');
  
  const paragraphs = doc.getElementsByTagName('w:p');
  let text = '';
  
  for (let i = 0; i &lt; paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    const texts = paragraph.getElementsByTagName('w:t');
    let paraText = '';
    
    for (let j = 0; j &lt; texts.length; j++) {
      paraText += texts[j].textContent;
    }
    
    if (paraText.trim()) {
      text += paraText + '\n';
    }
  }
  
  const outputPath = path.join(__dirname, 'ai_report_writing_process.txt');
  fs.writeFileSync(outputPath, text, 'utf8');
  
  console.log('成功提取内容到:', outputPath);
  console.log('总字符数:', text.length);
  
  // 清理临时文件
  fs.rmSync(tempDir, { recursive: true, force: true });
  
} catch (error) {
  console.error('处理错误:', error);
}
