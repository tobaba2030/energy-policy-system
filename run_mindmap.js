const fs = require('fs');
const path = require('path');

const specPath = path.join(__dirname, 'mindmap_spec_v2.json');
const specContent = fs.readFileSync(specPath, 'utf8');
const spec = JSON.parse(specContent);

const generateScriptPath = 'C:/Users/jianlinw/.trae-cn/skills/chart-visualization/scripts/generate.js';

const { execSync } = require('child_process');

try {
  const jsonArgs = JSON.stringify(spec);
  const command = `node "${generateScriptPath}" "${jsonArgs}"`;
  
  const result = execSync(command, {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
  
  console.log('SUCCESS:');
  console.log(result);
} catch (error) {
  console.error('ERROR:', error.message);
  if (error.stdout) console.log('STDOUT:', error.stdout);
  if (error.stderr) console.log('STDERR:', error.stderr);
}
