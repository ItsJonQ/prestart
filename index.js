"use strict";

const checkDependencies = require("check-dependencies");
const isOnline = require("is-online");

function Prestart() {
  console.log("🔑 ", "PreStart");
  console.log("");

  console.log("  ", "🔌 ", "Check connection");

  const tasks = new Promise(resolve => {
    return isOnline({ timeout: 2500 }).then(online => {
      if (!online) {
        console.log("  ", "📦 ", "Install dependencies (Skipped)");
        console.log("");
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
    console.log("✨ ", "Have fun developing!");
  });

  return tasks;
}

function sync(cb) {
  new Prestart().then(cb).catch(cb);
}

function prestart() {
  return new Prestart();
}

prestart.sync = sync;

module.exports = prestart;
