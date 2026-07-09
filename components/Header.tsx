import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-normal text-black"
          aria-label="OG Garage Door home"
        >
          OG Garage Door
        </Link>
        <nav className="flex items-center gap-1 text-[13px] font-medium text-black/70 sm:gap-2">
          <Link
            href="/"
            className="rounded-full px-3 py-2 transition hover:bg-black hover:text-white"
          >
            Home
          </Link>
          <div className="group relative">
            <Link
              href="/gallery"
              className="block rounded-full px-3 py-2 transition hover:bg-black hover:text-white"
            >
              Gallery
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 mt-2 w-52 -translate-x-1/2 rounded-2xl border border-black/10 bg-white p-2 opacity-0 shadow-[0_18px_60px_rgba(0,0,0,0.14)] transition group-hover:visible group-hover:opacity-100">
              <Link
                href="/gallery?type=single"
                className="block rounded-xl px-4 py-3 text-black/70 transition hover:bg-black hover:text-white"
              >
                Single Garage Doors
              </Link>
              <Link
                href="/gallery?type=double"
                className="block rounded-xl px-4 py-3 text-black/70 transition hover:bg-black hover:text-white"
              >
                Double Garage Doors
              </Link>
            </div>
          </div>
          <Link
            href="/contact"
            className="rounded-full bg-black px-4 py-2 text-white transition hover:bg-black/80"
            style={{ color: "#ffffff" }}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
