"use client";

import { Suspense, useState } from "react";
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
  onOpen
}: {
  title: string;
  subtitle: string;
  images: string[];
  onOpen: (index: number) => void;
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
          <button
            key={src}
            type="button"
            onClick={() => onOpen(index)}
            className="group relative aspect-square overflow-hidden rounded-md bg-[#f5f5f7] p-3"
            aria-label={`View ${title} sample ${index + 1} by OG Garage Door`}
          >
            <Image
              src={src}
              alt={`${title} sample ${index + 1} by OG Garage Door`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function Lightbox({
  images,
  activeIndex,
  title,
  onClose,
  onPrevious,
  onNext
}: {
  images: string[];
  activeIndex: number;
  title: string;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const activeImage = images[activeIndex];
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) return;

    const delta = touchStart - clientX;

    if (Math.abs(delta) > 40) {
      if (delta > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }

    setTouchStart(null);
  };

  if (!activeImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/92 text-white"
      onTouchStart={(event) => setTouchStart(event.changedTouches[0]?.clientX ?? null)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl leading-none transition hover:bg-white/20"
        aria-label="Close image viewer"
      >
        x
      </button>
      <button
        type="button"
        onClick={onPrevious}
        className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl leading-none transition hover:bg-white/20 sm:left-6"
        aria-label="Previous image"
      >
        {"<"}
      </button>
      <button
        type="button"
        onClick={onNext}
        className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl leading-none transition hover:bg-white/20 sm:right-6"
        aria-label="Next image"
      >
        {">"}
      </button>
      <div className="relative h-full w-full px-6 py-16 sm:px-20">
        <Image
          src={activeImage}
          alt={`${title} large sample ${activeIndex + 1} by OG Garage Door`}
          fill
          sizes="100vw"
          className="object-contain p-6 sm:p-12"
          priority
        />
      </div>
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-medium text-white/65">
        {activeIndex + 1} / {images.length}
      </p>
    </div>
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeLightbox = () => setActiveIndex(null);
  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === 0 ? images.length - 1 : current - 1;
    });
  };
  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return current === images.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-5 pb-6 pt-12 text-center sm:px-8 sm:pt-16">
        <GalleryTabs activeType={activeType} />
      </section>
      <GalleryGrid
        title={content.title}
        subtitle={content.subtitle}
        images={images}
        onOpen={setActiveIndex}
      />
      {activeIndex !== null ? (
        <Lightbox
          images={images}
          activeIndex={activeIndex}
          title={content.title}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      ) : null}
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
