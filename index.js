const checkDependencies = require("check-dependencies");
const isOnline = require("is-online");
const Listr = require("listr");

console.log("🔑 ", "Prestart");
console.log("");

const tasks = new Listr([
  {
    title: "🔌  Check connection",
    task: ctx => {
      return isOnline().catch(() => (ctx.isOnline = false));
    }
  },
  {
    title: "📦  Install dependencies",
    enabled: ctx => (ctx.isOnline = true),
    task: () => {
      const options = {
        checkGitUrls: true,
        install: true,
        packageManager: "npm",
        verbose: false
      };

      return checkDependencies(options);
    }
  }
]);

tasks
  .run()
  .then(() => {
    console.log("");
    console.log("✨ Have fun developing :)");
  })
  .catch(err => {
    console.error(err);
  });
