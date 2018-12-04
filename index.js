#!/usr/bin/env node
"use strict";

const checkDependencies = require("check-dependencies");
const isOnline = require("is-online");

console.log("🔑 ", "Prestart");
console.log("");

console.log("  ", "🔌 ", "Check connection");

const tasks = new Promise(resolve => {
  return isOnline({ timeout: 2500 }).then(online => {
    if (!online) {
      console.log("  ", "📦 ", "Install dependencies (Skipped)");
      return resolve();
    }
    console.log("  ", "📦 ", "Install dependencies");
    console.log("");
    const options = {
      checkGitUrls: true,
      install: true,
      packageManager: "npm",
      verbose: false
    };
    return checkDependencies(options).then(() => {
      resolve();
    });
  });
});

tasks.then(() => {
  console.log("");
  console.log("✨ ", "Have fun developing!");
});
