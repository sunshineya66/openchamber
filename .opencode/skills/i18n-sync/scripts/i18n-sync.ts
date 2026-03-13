#!/usr/bin/env bun

import { execSync } from "child_process";
import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const SYNC_LOGS_DIR = "sync-logs";
const UPSTREAM_REMOTE = "upstream";
const UPSTREAM_BRANCH = "main";

function log(message: string) {
  console.log(`[i18n-sync] ${message}`);
}

function getLastSyncCommit(): string | null {
  const markerFile = ".i18n-last-sync";
  if (existsSync(markerFile)) {
    return readFileSync(markerFile, "utf-8").trim();
  }
  return null;
}

function saveLastSyncCommit(commit: string) {
  writeFileSync(".i18n-last-sync", commit);
}

function syncUpstream() {
  log("Checking upstream remote...");

  try {
    execSync(`git remote get-url ${UPSTREAM_REMOTE}`, { stdio: "pipe" });
  } catch {
    log(`Adding upstream remote: ${UPSTREAM_REMOTE}`);
    execSync(
      `git remote add ${UPSTREAM_REMOTE} https://github.com/btriapitsyn/openchamber.git`
    );
  }

  log("Fetching upstream...");
  execSync(`git fetch ${UPSTREAM_REMOTE}`);

  const lastCommit = getLastSyncCommit();
  const currentCommit = execSync(`git rev-parse ${UPSTREAM_REMOTE}/${UPSTREAM_BRANCH}`)
    .toString()
    .trim();

  if (lastCommit === currentCommit) {
    log("Already up to date with upstream");
    return null;
  }

  log(`Merging ${UPSTREAM_REMOTE}/${UPSTREAM_BRANCH}...`);
  try {
    execSync(`git merge ${UPSTREAM_REMOTE}/${UPSTREAM_BRANCH}`, {
      stdio: "inherit",
    });
  } catch (e) {
    log("Merge conflict detected. Please resolve manually.");
    throw e;
  }

  saveLastSyncCommit(currentCommit);
  return { lastCommit, currentCommit };
}

function generateChangeLog(lastCommit: string | null, currentCommit: string) {
  if (!existsSync(SYNC_LOGS_DIR)) {
    mkdirSync(SYNC_LOGS_DIR, { recursive: true });
  }

  const date = new Date().toISOString().split("T")[0];
  const logFile = join(SYNC_LOGS_DIR, `${date}.json`);

  let diff = "";
  if (lastCommit) {
    diff = execSync(`git diff ${lastCommit}..${currentCommit} --stat`).toString();
  } else {
    diff = execSync(`git diff ${currentCommit} --stat`).toString();
  }

  const changes: Array<{ file: string; diff: string }> = [];

  const changedFiles = diff
    .split("\n")
    .filter((line) => line.includes("|"))
    .map((line) => line.split("|")[0].trim())
    .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"));

  for (const file of changedFiles) {
    try {
      const fileDiff = execSync(
        `git diff ${lastCommit || currentCommit}..${currentCommit} -- ${file}`
      ).toString();
      changes.push({ file, diff: fileDiff });
    } catch {
      changes.push({ file, diff: "(new file)" });
    }
  }

  const logEntry = {
    syncDate: date,
    upstreamCommit: currentCommit,
    changes,
  };

  writeFileSync(logFile, JSON.stringify(logEntry, null, 2));
  log(`Change log saved to: ${logFile}`);

  return logEntry;
}

async function main() {
  log("Starting i18n sync...");

  const result = syncUpstream();

  if (result) {
    const { lastCommit, currentCommit } = result;
    const logEntry = generateChangeLog(lastCommit, currentCommit);

    console.log("\n=== Sync Summary ===");
    console.log(`Files changed: ${logEntry.changes.length}`);
    console.log(`Commit: ${currentCommit}`);
    console.log(`Log: sync-logs/${new Date().toISOString().split("T")[0]}.json`);
  } else {
    console.log("\n=== No changes ===");
  }
}

main().catch(console.error);
