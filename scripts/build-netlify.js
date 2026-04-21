const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");

const files = ["index.html", "app.js", "styles.css"];
const directories = ["assets"];

async function copyIfExists(source, target) {
  try {
    await fs.cp(source, target, { recursive: true });
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function build() {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });

  await Promise.all(
    files.map((file) => fs.copyFile(path.join(root, file), path.join(dist, file))),
  );

  await Promise.all(
    directories.map((directory) => copyIfExists(path.join(root, directory), path.join(dist, directory))),
  );
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
