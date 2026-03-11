#!/usr/bin/env bun

import { spawn } from "child_process";
import { existsSync } from "fs";
import { join } from "path";

const TEMP_DIR = ".i18n-temp";
const PORT = 3000;

function log(message: string) {
  console.log(`[i18n-start] ${message}`);
}

function checkBuildExists(): boolean {
  const distPath = join(TEMP_DIR, "packages/web/dist");
  if (!existsSync(distPath)) {
    log(`Error: Build not found at ${distPath}`);
    log("Please run 'bun scripts/i18n-build.ts' first");
    return false;
  }
  return true;
}

function startServer(): void {
  log(`Starting i18n server on port ${PORT}...`);
  
  const serverProc = spawn("bun", ["run", "start", "--port", PORT.toString()], {
    cwd: join(TEMP_DIR, "packages/web"),
    stdio: "inherit",
    shell: true,
  });

  serverProc.on("close", (code) => {
    log(`Server exited with code ${code}`);
    process.exit(code ?? 1);
  });
}

async function main() {
  log("Starting i18n services...");

  if (!checkBuildExists()) {
    process.exit(1);
  }

  startServer();

  log(`Server started at http://localhost:${PORT}`);
}

main();
