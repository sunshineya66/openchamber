#!/usr/bin/env bun

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { globSync } from "glob";

const LOCALES_DIR = "locales";
const SOURCE_DIRS = ["packages/ui/src"];

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
  return translations;
}

function extractJSXText(content: string): string[] {
  const strings: string[] = [];
  
  const patterns = [
    /\{\s*(\([^\)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*\|\|\s*"([^"]*)"\s*\}/g,
    /\{\s*"([^"]*)"\s*\}/g,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const text = match[1] || match[2];
      if (text && text.length > 0 && /^[a-zA-Z]/.test(text)) {
        strings.push(text);
      }
    }
  }

  return [...new Set(strings)];
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
  
  const strings = parseJSXSimple(content);
  
  for (const str of strings) {
    if (translations[str]) {
      const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`>${escaped}<`, 'g');
      const matches = result.match(pattern);
      if (matches) {
        count += matches.length;
        result = result.replace(pattern, `>${translations[str]}<`);
      }
    }
  }

  return { result, count };
}

function build() {
  log("Starting i18n build...");

  const translations = loadTranslationFiles();

  if (Object.keys(translations).length === 0) {
    log("No translations found. Exiting.");
    return;
  }

  const sourceFiles = globSync([
    ...SOURCE_DIRS.flatMap(dir => [`${dir}/**/*.tsx`, `${dir}/**/*.ts`])
  ]);

  let totalReplaced = 0;
  let processedFiles = 0;

  for (const file of sourceFiles) {
    try {
      const content = readFileSync(file, "utf-8");
      const { result, count } = replaceInContent(content, translations);

      if (count > 0) {
        const outputDir = join("dist", dirname(file));
        if (!existsSync(outputDir)) {
          mkdirSync(outputDir, { recursive: true });
        }
        writeFileSync(join("dist", file), result);
        processedFiles++;
        totalReplaced += count;
        log(`Processed: ${file} (${count} replacements)`);
      }
    } catch (e) {
      log(`Warning: Failed to process ${file}: ${e}`);
    }
  }

  log(`Build complete. Processed ${processedFiles} files, ${totalReplaced} replacements.`);
}

build();
