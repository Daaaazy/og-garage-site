import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const root = process.cwd();
const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const categories = ["single", "double"];

function readArguments() {
  const values = new Map();

  for (let index = 2; index < process.argv.length; index += 2) {
    const key = process.argv[index];
    const value = process.argv[index + 1];

    if (!key?.startsWith("--") || !value) {
      throw new Error("Arguments must use --name value pairs.");
    }

    values.set(key.slice(2), value);
  }

  for (const category of categories) {
    if (!values.has(category)) {
      throw new Error(`Missing --${category} source directory.`);
    }
  }

  return {
    sources: Object.fromEntries(categories.map((category) => [category, values.get(category)])),
    batch: values.get("batch") ?? new Date().toISOString().slice(0, 10),
  };
}

async function importCategory(category, sourceDirectory, backupRoot) {
  const entries = await fs.readdir(sourceDirectory, { withFileTypes: true });
  const files = entries.filter((entry) => {
    return entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase());
  });
  const backupDirectory = path.join(backupRoot, category);
  const publicDirectory = path.join(root, "public", "images", category);

  await fs.mkdir(backupDirectory, { recursive: true });
  await fs.mkdir(publicDirectory, { recursive: true });

  for (const file of files) {
    const sourcePath = path.join(sourceDirectory, file.name);
    const extension = path.extname(file.name);
    const baseName = path.basename(file.name, extension);
    const backupPath = path.join(backupDirectory, file.name);
    const destinationPath = path.join(publicDirectory, `${baseName}.webp`);
    const temporaryPath = `${destinationPath}.tmp`;

    await fs.copyFile(sourcePath, backupPath, fs.constants.COPYFILE_EXCL);
    await sharp(sourcePath)
      .rotate()
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(temporaryPath);
    await fs.rename(temporaryPath, destinationPath);
  }

  return files.length;
}

const { sources, batch } = readArguments();
const backupRoot = path.join(root, "backup_originals", "imports", batch);

try {
  await fs.access(backupRoot);
  throw new Error(`Import backup already exists: ${backupRoot}`);
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }
}

const counts = {};

for (const category of categories) {
  counts[category] = await importCategory(category, sources[category], backupRoot);
}

console.log(`Imported ${counts.single} single and ${counts.double} double garage images.`);
console.log(`Originals backed up to ${path.relative(root, backupRoot)}.`);
