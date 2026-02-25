import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = path.join(__dirname, '../packages/ui/src/locales');
const SRC_DIR = path.join(__dirname, '../packages/ui/src');

const en = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'en.json'), 'utf-8'));
const zhCN = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'zh-CN.json'), 'utf-8'));

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = new Set(getAllKeys(en));
const zhKeys = new Set(getAllKeys(zhCN));

const missingInZh = [...enKeys].filter(k => !zhKeys.has(k));
const missingInEn = [...zhKeys].filter(k => !enKeys.has(k));

console.log('=== 缺失的 key ===\n');
console.log(`英文缺失 (zh-CN 有但 en 没有): ${missingInEn.length}`);
missingInEn.slice(0, 30).forEach(k => console.log(`  - ${k}`));
if (missingInEn.length > 30) {
  console.log(`  ... 还有 ${missingInEn.length - 30} 个`);
}

console.log(`\n中文缺失 (en 有但 zh-CN 没有): ${missingInZh.length}`);
missingInZh.slice(0, 30).forEach(k => console.log(`  - ${k}`));
if (missingInZh.length > 30) {
  console.log(`  ... 还有 ${missingInZh.length - 30} 个`);
}

const sourceFiles = [];
function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      walkDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      sourceFiles.push(fullPath);
    }
  }
}
walkDir(SRC_DIR);

const usedKeys = new Set();
const keyPattern = /t\s*\(\s*['"]([^'"]+)['"]/g;

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  let match;
  while ((match = keyPattern.exec(content)) !== null) {
    usedKeys.add(match[1]);
  }
}

const usedButNotInEn = [...usedKeys].filter(k => !enKeys.has(k));
const usedButNotInZh = [...usedKeys].filter(k => !zhKeys.has(k));

console.log('\n=== 代码中使用了但英文缺失 ===\n');
console.log(`${usedButNotInEn.length} 个 key 在代码中使用但 en.json 中没有`);
usedButNotInEn.forEach(k => console.log(`  - ${k}`));

console.log('\n=== 代码中使用了但中文缺失 ===\n');
console.log(`${usedButNotInZh.length} 个 key 在代码中使用但 zh-CN.json 中没有`);
usedButNotInZh.forEach(k => console.log(`  - ${k}`));
