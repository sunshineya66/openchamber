#!/usr/bin/env bun

import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, extname, relative } from "path";
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

function isJSXTextNode(content: string): boolean {
  const trimmed = content.trim();
  return (
    trimmed.length > 0 &&
    !trimmed.startsWith("{") &&
    !trimmed.startsWith("<") &&
    !trimmed.startsWith("import") &&
    !trimmed.startsWith("export") &&
    !trimmed.includes("=") &&
    !trimmed.includes("(") &&
    !trimmed.includes(")")
  );
}

function extractStrings(content: string): string[] {
  const strings: string[] = [];

  const jsxTextPattern = />([^<{}]+)</g;
  let match;
  while ((match = jsxTextPattern.exec(content)) !== null) {
    const text = match[1].trim();
    if (isJSXTextNode(text) && text.length > 0) {
      strings.push(text);
    }
  }

  return strings;
}

function build() {
  log("Starting i18n build...");

  const translations = loadTranslationFiles();

  if (Object.keys(translations).length === 0) {
    log("No translations found. Exiting.");
    return;
  }

  const sourceFiles = globSync(`${SOURCE_DIRS.join("/")}/**/*.{ts,tsx,js,jsx}`);

  let replacedCount = 0;

  for (const file of sourceFiles) {
    try {
      let content = readFileSync(file, "utf-8");
      const originalContent = content;

      const strings = extractStrings(content);

      for (const str of strings) {
        if (translations[str]) {
          content = content.replace(
            new RegExp(`>${escapeRegExp(str)}<`, "g"),
            `>${translations[str]}<`
          );
          replacedCount++;
        }
      }

      if (content !== originalContent) {
        const outputDir = join("dist", file);
        const { mkdirSync, dirname } = require("fs");
        try {
          mkdirSync(dirname(outputDir), { recursive: true });
        } catch {}
        writeFileSync(outputDir, content);
        log(`Processed: ${file}`);
      }
    } catch (e) {
      log(`Warning: Failed to process ${file}: ${e}`);
    }
  }

  log(`Build complete. Replaced ${replacedCount} strings.`);
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

build();
