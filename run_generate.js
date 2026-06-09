const fs = require('fs');
const { execSync } = require('child_process');

const specPath = 'c:/AI学习资料/mesheer/mindmap_spec.json';
const specContent = fs.readFileSync(specPath, 'utf8');

try {
  const spec = JSON.parse(specContent);
  const jsonArgs = JSON.stringify(spec);
  
  const result = execSync(`node "C:/Users/jianlinw/.trae-cn/skills/chart-visualization/scripts/generate.js" "${jsonArgs}"`, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
  
  console.log('SUCCESS:', result);
} catch (error) {
  console.error('ERROR:', error.message);
  if (error.stdout) console.log('STDOUT:', error.stdout);
  if (error.stderr) console.log('STDERR:', error.stderr);
}
