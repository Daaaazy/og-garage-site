"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type DoorType = "single" | "double";

const galleryContent = {
  single: {
    title: "Single Garage Doors",
    subtitle:
      "Single garage door samples selected for compact openings, clean proportions, and refined curb appeal by OG Garage Door."
  },
  double: {
    title: "Double Garage Doors",
    subtitle:
      "Double garage door samples with wider proportions, balanced panels, and a confident modern presence by OG Garage Door."
  }
} satisfies Record<DoorType, { title: string; subtitle: string }>;

function GalleryTabs({ activeType }: { activeType: DoorType }) {
  const tabs: Array<{ href: string; label: string; type: DoorType }> = [
    { href: "/gallery?type=single", label: "Single Garage Doors", type: "single" },
    { href: "/gallery?type=double", label: "Double Garage Doors", type: "double" }
  ];

  return (
    <div className="mx-auto flex w-full max-w-xl rounded-full bg-[#f5f5f7] p-1">
      {tabs.map((tab) => {
        const isActive = activeType === tab.type;

        return (
          <Link
            key={tab.type}
            href={tab.href}
            className={`flex-1 rounded-full px-4 py-3 text-center text-sm font-semibold transition ${
              isActive ? "bg-black text-white" : "text-black/45 hover:text-black"
            }`}
            style={isActive ? { color: "#ffffff" } : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

function GalleryGrid({
  title,
  subtitle,
  images,
  activeType
}: {
  title: string;
  subtitle: string;
  images: string[];
  activeType: DoorType;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
      <div className="mb-8 flex flex-col justify-between gap-3 border-t border-black pt-6 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-normal text-black sm:text-5xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-black/60">{subtitle}</p>
        </div>
        <p className="text-sm font-medium text-black/45">
          {images.length} OG Garage Door samples
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {images.map((src, index) => (
          <Link
            key={src}
            href={`/contact?doorType=${activeType}`}
            className="group relative aspect-square overflow-hidden rounded-md bg-[#f5f5f7] p-3"
            aria-label={`Request a quote for ${title} sample ${index + 1} by OG Garage Door`}
          >
            <Image
              src={src}
              alt={`${title} sample ${index + 1} by OG Garage Door`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

function GalleryView({
  singleImages,
  doubleImages
}: {
  singleImages: string[];
  doubleImages: string[];
}) {
  const searchParams = useSearchParams();
  const activeType: DoorType = searchParams.get("type") === "double" ? "double" : "single";
  const content = galleryContent[activeType];
  const images = activeType === "double" ? doubleImages : singleImages;

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-5 pb-6 pt-12 text-center sm:px-8 sm:pt-16">
        <GalleryTabs activeType={activeType} />
      </section>
      <GalleryGrid
        title={content.title}
        subtitle={content.subtitle}
        images={images}
        activeType={activeType}
      />
    </div>
  );
}

export function GalleryClient(props: { singleImages: string[]; doubleImages: string[] }) {
  return (
    <Suspense fallback={null}>
      <GalleryView {...props} />
    </Suspense>
  );
}
