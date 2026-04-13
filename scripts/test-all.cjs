/**
 * Запуск unit → сервер → API (Cucumber) → UI (Playwright).
 */
const path = require("path");
const { spawn } = require("child_process");
const waitOn = require("wait-on");
const treeKill = require("tree-kill");

const projectRoot = path.join(__dirname, "..");

function runNpm(script) {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", script], {
      stdio: "inherit",
      shell: true,
      env: process.env,
    });
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with ${code}`));
    });
  });
}

async function main() {
  await runNpm("test:unit");

  const server = spawn(process.execPath, [path.join(projectRoot, "server.js")], {
    cwd: projectRoot,
    stdio: "inherit",
    env: process.env,
    detached: false,
  });

  try {
    await waitOn({
      resources: ["http-get://127.0.0.1:3000/api/health"],
      timeout: 60000,
      interval: 250,
    });
    await runNpm("test:api");
    await runNpm("test:ui");
  } finally {
    if (server.pid) {
      await new Promise((resolve) => {
        treeKill(server.pid, "SIGTERM", () => resolve());
      });
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
