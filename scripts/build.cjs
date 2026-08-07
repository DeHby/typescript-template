const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const config = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../build/config.json"), "utf8")
);

const green = "\x1b[32m";
const cyan = "\x1b[36m";
const red = "\x1b[31m";
const gray = "\x1b[90m";
const reset = "\x1b[0m";

function status(text) {
  process.stdout.write(`\r${cyan}▶${reset} ${text}...`);
}

function success(text) {
  process.stdout.write(`\r${green}✓${reset} ${text}\n`);
}

function fail(text) {
  process.stdout.write(`\r${red}✗${reset} ${text}\n`);
}

function run(name, cmd) {
  status(name);

  try {
    execSync(cmd, {
      stdio: "pipe",
    });

    success(name);
  } catch (err) {
    fail(name);

    if (err.stdout) {
      process.stdout.write(err.stdout.toString());
    }

    if (err.stderr) {
      process.stderr.write(err.stderr.toString());
    }

    process.exit(1);
  }
}

console.log(`${gray}=== Build Binary ===${reset}`);

run("Clean", "yarn clean");

process.env.PKG_NODE_PATH = path.resolve(
  __dirname,
  "../build/pkg-node",
  config.pkg.nodeRuntime
);

run("Type Check", "tsc --noEmit");

run(
  "Bundle",
  [
    "esbuild",
    config.entry,
    "--bundle",
    "--platform=node",
    "--format=cjs",
    ...config.esbuild,
    `--outfile=${config.bundle}`,
  ].join(" ")
);

run(
  "Package",
  [
    "pkg",
    config.bundle,
    "-t",
    config.pkg.target,
    "-o",
    config.pkg.output,
    "-C",
    config.pkg.compress,
  ].join(" ")
);

console.log(`\n${green}✓ Build Complete${reset}`);
