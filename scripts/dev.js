const { spawn, execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const appDir = path.join(rootDir, "srv-admin-frontend");
const lockFile = path.join(appDir, ".next", "dev", "lock");
const nextBin = path.join(appDir, "node_modules", "next", "dist", "bin", "next");
const ports = new Set(["3000", "3001"]);

function run(command) {
  try {
    return execSync(command, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return "";
  }
}

function killDevPortProcesses() {
  const output = run("netstat -ano -p tcp");
  const pids = new Set();

  for (const line of output.split(/\r?\n/)) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 5 || parts[0] !== "TCP" || parts[3] !== "LISTENING") continue;

    const localAddress = parts[1];
    const port = localAddress.slice(localAddress.lastIndexOf(":") + 1);
    if (ports.has(port)) {
      pids.add(parts[4]);
    }
  }

  for (const pid of pids) {
    run(`taskkill /PID ${pid} /F /T`);
  }
}

function removeStaleLock() {
  try {
    if (fs.existsSync(lockFile)) {
      fs.rmSync(lockFile, { force: true });
    }
  } catch (error) {
    console.warn(`Could not remove stale Next lock: ${error.message}`);
  }
}

if (!fs.existsSync(nextBin)) {
  console.error("Next.js is not installed. Run npm install inside srv-admin-frontend first.");
  process.exit(1);
}

killDevPortProcesses();
removeStaleLock();

const child = spawn(process.execPath, [nextBin, "dev"], {
  cwd: appDir,
  stdio: "inherit",
  shell: false,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
