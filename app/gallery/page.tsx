import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { GalleryClient } from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery"
};

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

type DoorType = "single" | "double";

function getImages(folder: DoorType) {
  const directory = path.join(process.cwd(), "public", "images", folder);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/images/${folder}/${file}`);
}

export default function GalleryPage() {
  return (
    <GalleryClient
      singleImages={getImages("single")}
      doubleImages={getImages("double")}
    />
  );
}
