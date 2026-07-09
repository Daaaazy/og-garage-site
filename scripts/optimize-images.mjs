import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicImagesDir = path.join(root, "public", "images");
const backupDir = path.join(root, "backup_originals");
const backupImagesDir = path.join(backupDir, "images");
const folders = ["single", "double"];
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const skipFileName = "IMG_79231.jpg";

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

async function backupOriginals() {
  if (await exists(backupImagesDir)) {
    throw new Error(
      `Backup already exists at ${backupImagesDir}. Refusing to overwrite it.`
    );
  }

  await fs.mkdir(backupDir, { recursive: true });
  await fs.cp(publicImagesDir, backupImagesDir, { recursive: true, errorOnExist: true });
}

async function optimizeImages() {
  for (const folder of folders) {
    const directory = path.join(publicImagesDir, folder);
    const files = await walk(directory);

    for (const filePath of files) {
      const fileName = path.basename(filePath);
      const extension = path.extname(fileName).toLowerCase();

      if (!imageExtensions.has(extension)) {
        continue;
      }

      if (fileName === skipFileName) {
        console.log(`Skipped banner: ${path.relative(root, filePath)}`);
        continue;
      }

      const destination = path.join(
        path.dirname(filePath),
        `${path.basename(fileName, extension)}.webp`
      );
      const temporaryDestination = `${destination}.tmp`;

      await sharp(filePath)
        .rotate()
        .resize({ width: 1080, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(temporaryDestination);

      await fs.rename(temporaryDestination, destination);

      if (filePath !== destination) {
        await fs.unlink(filePath);
      }

      console.log(`Optimized: ${path.relative(root, destination)}`);
    }
  }
}

await backupOriginals();
await optimizeImages();
console.log("Image backup and optimization complete.");
