#!/usr/bin/env bun

import { globSync } from "glob";
import { dirname, join } from "path";
import { mkdirSync, existsSync } from "fs";

const SOURCE_DIRS = ["packages/ui/src"];

function log(message: string) {
  console.log(`[i18n-scan] ${message}`);
}

function ensureDir(path: string) {
  const dir = dirname(path);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function scanFiles() {
  const patterns = SOURCE_DIRS.flatMap((dir) => [
    `${dir}/**/*.tsx`,
    `${dir}/**/*.ts`,
  ]);

  const files = globSync(patterns, { nodir: true });

  const result = files.map((file) => {
    const translationPath = `locales/${file}.json`;
    ensureDir(translationPath);
    return {
      source: file,
      translation: translationPath,
    };
  });

  log(`Found ${result.length} files`);
  log(`Created ${result.length} directories`);

  console.log(JSON.stringify(result, null, 2));

  return result;
}

if (!existsSync("locales")) {
  mkdirSync("locales", { recursive: true });
  log("Created locales directory");
}

scanFiles();
