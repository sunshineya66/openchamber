#!/usr/bin/env bun

import { readFileSync, existsSync, writeFileSync, mkdirSync, rmSync, cpSync } from "fs";
import { join, dirname } from "path";
import { globSync } from "glob";
import { spawn } from "child_process";

const LOCALES_DIR = "locales";
const SOURCE_DIRS = ["packages/ui/src"];
const TEMP_DIR = ".i18n-temp";
const PORT = 10031;

function log(message: string) {
  console.log(`[i18n-build] ${message}`);
}

interface TranslationMap {
  [key: string]: string;
}

function loadTranslationFiles(): TranslationMap {
  const translations: TranslationMap = {};

  if (!existsSync(LOCALES_DIR)) {
    log(`Warning: ${LOCALES_DIR} directory not found`);
    return translations;
  }

  const jsonFiles = globSync(`${LOCALES_DIR}/**/*.json`);

  for (const file of jsonFiles) {
    try {
      const content = readFileSync(file, "utf-8");
      const translationsObj = JSON.parse(content);
      Object.entries(translationsObj).forEach(([key, value]) => {
        translations[key] = value as string;
      });
    } catch (e) {
      log(`Warning: Failed to parse ${file}: ${e}`);
    }
  }

  log(`Loaded ${Object.keys(translations).length} translation entries`);
  
  // Debug: show some translations
  const keys = Object.keys(translations).slice(0, 5);
  for (const key of keys) {
    log(`  "${key}" -> "${translations[key]}"`);
  }
  
  return translations;
}

function isValidJSXText(text: string): boolean {
  const trimmed = text.trim();
  
  if (!trimmed) return false;
  if (!/^[a-zA-Z]/.test(trimmed)) return false;
  if (trimmed.length < 2) return false;
  if (trimmed.length > 200) return false;
  
  if (trimmed.includes('{')) return false;
  if (trimmed.includes('<')) return false;
  if (trimmed.includes('=>')) return false;
  if (trimmed.includes('==')) return false;
  if (trimmed.includes('!=')) return false;
  if (trimmed.includes('=') && !trimmed.includes('===') && !trimmed.includes('==')) return false;
  if (trimmed.includes('()')) return false;
  if (trimmed.includes('function')) return false;
  if (trimmed.includes('import')) return false;
  if (trimmed.includes('export')) return false;
  if (trimmed.includes('return')) return false;
  if (trimmed.includes('if (')) return false;
  if (trimmed.includes('for (')) return false;
  if (trimmed.includes('while ')) return false;
  if (trimmed.includes('switch')) return false;
  if (trimmed.includes('case ')) return false;
  if (trimmed.includes('default:')) return false;
  if (trimmed.startsWith('//')) return false;
  if (trimmed.startsWith('/*')) return false;
  if (trimmed.startsWith('*')) return false;
  if (trimmed.startsWith('@')) return false;
  if (trimmed.startsWith('#')) return false;
  if (trimmed.startsWith('.')) return false;
  if (trimmed.startsWith('/')) return false;
  
  return true;
}

function parseJSXSimple(content: string): string[] {
  const strings: string[] = [];
  let i = 0;
  
  while (i < content.length) {
    if (content[i] === '<' && content[i + 1] !== '!') {
      let j = i + 1;
      
      if (content[j] === '/') {
        j++;
      }
      
      while (j < content.length && /[a-zA-Z0-9]/.test(content[j])) {
        j++;
      }
      
      let inTag = true;
      let attrStart = j;
      
      while (inTag && attrStart < content.length) {
        if (content[attrStart] === '>') {
          inTag = false;
          attrStart++;
          
          let text = '';
          while (attrStart < content.length && content[attrStart] !== '<') {
            text += content[attrStart];
            attrStart++;
          }
          
          text = text.trim();
          if (isValidJSXText(text)) {
            strings.push(text);
          }
          
          i = attrStart - 1;
        } else if (content[attrStart] === '{') {
          let braceCount = 1;
          attrStart++;
          while (attrStart < content.length && braceCount > 0) {
            if (content[attrStart] === '{') braceCount++;
            if (content[attrStart] === '}') braceCount--;
            attrStart++;
          }
        } else if (content[attrStart] === '"') {
          attrStart++;
          while (attrStart < content.length && content[attrStart] !== '"') {
            if (content[attrStart] === '\\') attrStart++;
            attrStart++;
          }
          attrStart++;
        } else {
          attrStart++;
        }
      }
    }
    i++;
  }
  
  return [...new Set(strings)];
}

function replaceInContent(content: string, translations: TranslationMap): { result: string; count: number } {
  let count = 0;
  let result = content;
  
  // Simple direct replacement for all translations
  const keys = Object.keys(translations);
  log(`replaceInContent: checking ${keys.length} translation keys`);
  
  for (const [key, value] of Object.entries(translations)) {
    // Escape regex special characters in the key before creating the pattern
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Replace >key< pattern
    const pattern = new RegExp('>' + escapedKey + '<', 'g');
    const matches = result.match(pattern);
    if (matches) {
      count += matches.length;
      result = result.replace(pattern, '>' + value + '<');
      log(`Replaced >${key}< with >${value}< (${matches.length} times)`);
    }
  }

  return { result, count };
}

function copyDir(src: string, dest: string, exclude: string[] = []) {
  if (!existsSync(src)) return;
  
  mkdirSync(dest, { recursive: true });
  
  const entries = require("fs").readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    if (exclude.includes(entry.name)) continue;
    
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, exclude);
    } else {
      cpSync(srcPath, destPath);
    }
  }
}

function processDirectory(sourceDir: string, targetDir: string, translations: TranslationMap) {
  // Use forward slashes for glob pattern (works on all platforms)
  const normalizedSourceDir = sourceDir.replace(/\\/g, '/');
  const pattern = normalizedSourceDir + '/**/*.{tsx,ts}';
  const sourceFiles = globSync([pattern]);
  
  log(`processDirectory: pattern=${pattern}, files=${sourceFiles.length}`);
  
  let totalReplaced = 0;
  
  for (const file of sourceFiles) {
    try {
      // Normalize path separators for Windows compatibility
      const normalizedSourceDir = sourceDir.replace(/\\/g, '/');
      const normalizedFile = file.replace(/\\/g, '/');
      const relativePath = normalizedFile.replace(normalizedSourceDir + '/', '');
      const targetPath = join(targetDir, relativePath);
      const targetDirPath = dirname(targetPath);
      
      if (!existsSync(targetDirPath)) {
        mkdirSync(targetDirPath, { recursive: true });
      }
      
      const content = readFileSync(file, "utf-8");
      const { result, count } = replaceInContent(content, translations);
      
      if (count > 0) {
        writeFileSync(targetPath, result);
        totalReplaced += count;
        log(`Replaced ${count} strings in ${relativePath}`);
      } else {
        cpSync(file, targetPath);
      }
    } catch (e) {
      log(`Warning: Failed to process ${file}: ${e}`);
    }
  }
  
  return totalReplaced;
}

async function buildAndServe() {
  log("Starting i18n build...");
  
  const translations = loadTranslationFiles();
  
  if (Object.keys(translations).length === 0) {
    log("No translations found. Exiting.");
    return;
  }
  
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  
  log("Copying project to temp directory...");
  copyDir(process.cwd(), TEMP_DIR, ['node_modules', 'dist', '.git', '.i18n-temp']);
  
  log("Installing dependencies...");
  const installProc = spawn('bun', ['install'], {
    cwd: TEMP_DIR,
    stdio: 'inherit',
    shell: true
  });
  
  await new Promise<void>((resolve, reject) => {
    installProc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Install failed with code ${code}`));
    });
    installProc.on('error', reject);
  });
  
  // Install missing peer dependency for mermaid
  log("Installing missing peer dependencies...");
  try {
    const peerProc = spawn('bun', ['add', '@braintree/sanitize-url'], {
      cwd: TEMP_DIR,
      stdio: 'inherit',
      shell: true
    });
    
    await new Promise<void>((resolve) => {
      peerProc.on('close', () => resolve());
      peerProc.on('error', () => resolve());
    });
  } catch (e) {
    log(`Peer dependency install warning: ${e}`);
  }
  
  log("Finished installing dependencies, starting translation...");
  
  // Apply translations to TEMP_DIR (not original!)
  log("Applying translations to temp directory...");
  let totalReplaced = 0;
  for (const sourceDir of SOURCE_DIRS) {
    const tempSourceDir = join(TEMP_DIR, sourceDir);
    log(`Processing directory: ${tempSourceDir}`);
    log(`Directory exists: ${existsSync(tempSourceDir)}`);
    
    if (!existsSync(tempSourceDir)) {
      log(`WARNING: ${tempSourceDir} does not exist!`);
      continue;
    }
    
    const files = globSync([`${tempSourceDir}/**/*.tsx`, `${tempSourceDir}/**/*.ts`]);
    log(`Found ${files.length} files`);
    
    totalReplaced += processDirectory(tempSourceDir, tempSourceDir, translations);
  }
  
  log(`Total replacements: ${totalReplaced}`);
  
  log("Building web package...");
  const buildProc = spawn('bun', ['x', 'vite', 'build'], {
    cwd: join(TEMP_DIR, 'packages/web'),
    stdio: 'inherit',
    shell: true
  });
  
  await new Promise<void>((resolve, reject) => {
    buildProc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Build failed with code ${code}`));
    });
    buildProc.on('error', reject);
  });
  
  log("Build completed.");
  log(`Starting static server on port ${PORT}...`);
  
  const distPath = join(process.cwd(), TEMP_DIR, 'packages/web/dist');
  const absDistPath = distPath.replace(/\\/g, '\\\\');
  
  const serverCode = `
import { createServer } from "http";
import { readFileSync, existsSync, statSync } from "fs";
import { join, extname } from "path";

const PORT = ${PORT};
const DIST = "${absDistPath}";

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = createServer((req, res) => {
  let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
  
  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    filePath = join(DIST, 'index.html');
  }
  
  const ext = extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (e) {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log("[i18n-server] Server running at http://localhost:" + PORT);
});
`;
  
  const serverPath = join(process.cwd(), TEMP_DIR, 'static-server.js');
  writeFileSync(serverPath, serverCode);
  
  const serverProc = spawn('bun', [serverPath], {
    stdio: 'inherit',
    shell: true
  });
  
  serverProc.on('close', (code) => {
    log(`Server exited with code ${code}`);
    if (existsSync(TEMP_DIR)) {
      rmSync(TEMP_DIR, { recursive: true, force: true });
    }
  });
}

buildAndServe().catch(e => {
  log(`Error: ${e}`);
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }
});
