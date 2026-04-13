const path = require("path");
const { spawn } = require("child_process");
const waitOn = require("wait-on");
const treeKill = require("tree-kill");

const scriptToRun = process.argv[2];
const projectRoot = path.join(__dirname, "..");

if (!scriptToRun) {
  console.error("Usage: node scripts/run-with-server.cjs <npm-script>");
  process.exit(1);
}

function runNpm(script) {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", ["run", script], {
      cwd: projectRoot,
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
    await runNpm(scriptToRun);
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
