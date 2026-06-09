const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 图表URL和文件名映射
const charts = [
  {
    url: 'https://mdn.alipayobjects.com/one_clip/afts/img/HDySQYbD3DwAAAAARmAAAAgAoEACAQFr/original',
    filename: 'flow_diagram.png'
  },
  {
    url: 'https://mdn.alipayobjects.com/one_clip/afts/img/uE61SaVgXcAAAAAAUaAAAAgAoEACAQFr/original',
    filename: 'radar_chart.png'
  },
  {
    url: 'https://mdn.alipayobjects.com/one_clip/afts/img/Bv4iSpXKKAcAAAAASXAAAAgAoEACAQFr/original',
    filename: 'line_chart.png'
  },
  {
    url: 'https://mdn.alipayobjects.com/one_clip/afts/img/Wz-xSb9_QJoAAAAASvAAAAgAoEACAQFr/original',
    filename: 'org_chart.png'
  }
];

// 下载单个文件
function downloadFile(url, filename) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, 'charts', filename);
    const file = fs.createWriteStream(outputPath);
    
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      // 处理重定向
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to: ${response.headers.location}`);
        downloadFile(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename}`);
        resolve(outputPath);
      });
      
      file.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // 删除不完整的文件
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // 删除不完整的文件
      reject(err);
    });
  });
}

// 下载所有图表
async function downloadAllCharts() {
  console.log('开始下载图表...\n');
  
  for (const chart of charts) {
    try {
      await downloadFile(chart.url, chart.filename);
      await new Promise(resolve => setTimeout(resolve, 500)); // 避免请求过快
    } catch (error) {
      console.error(`下载 ${chart.filename} 失败:`, error.message);
    }
  }
  
  console.log('\n所有图表下载完成！');
}

downloadAllCharts();
