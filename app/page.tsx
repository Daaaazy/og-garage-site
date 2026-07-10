import Image from "next/image";
import Link from "next/link";

const advantages = [
  "Over 10 Years Experience",
  "Skilled Team",
  "Commitment to Excellence",
  "Local Manufacturers"
];

export default function Home() {
  return (
    <div className="bg-white">
      <section className="relative isolate min-h-[560px] overflow-hidden bg-black text-white sm:aspect-[1452/695] sm:min-h-0">
        <Image
          src="/images/double/IMG_79231.jpg"
          alt="OG Garage Door modern garage door installation"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.52))]" />
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center sm:h-full sm:min-h-0 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            OG Garage Door
          </p>
          <h1 className="mt-5 max-w-5xl text-4xl font-semibold leading-[1.02] tracking-normal sm:mt-6 sm:text-7xl sm:leading-[0.95] lg:text-8xl">
            Modern garage doors built for Canadian homes.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:mt-8 sm:text-xl sm:leading-8 sm:text-white/70">
            OG Garage Door sources garage doors from leading manufacturers, delivering strong insulation performance designed for Canadian winters while elevating your home exterior.
          </p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
              style={{ color: "#000000" }}
            >
              Get a Quote
            </Link>
            <Link
              href="/gallery?type=single"
              className="rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              style={{ color: "#ffffff" }}
            >
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
              Why Choose OG Garage Door
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal text-black sm:text-6xl">
              Warranty-backed doors with winter-ready insulation.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-black/62">
            <p>
              We source our garage doors from the best manufacturers. OG Garage Door is confident in the quality of our garage doors, which is why warranty options are available. Ask us about coverage to learn more.
            </p>
            <p>
              Our garage doors are designed with Canadian winters in mind. They are injected with polyurethane to help your garage insulate your home, save money, and keep you warm. Available doors come in a variety of panel styles and colors, improving curb appeal and supporting resale value.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <article key={item} className="border-t border-black pt-6 text-center">
              <h3 className="text-xl font-semibold text-black">{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black px-5 py-24 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
              The Way OG Garage Door Does It
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
              We start where ordinary garage doors stop.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-white/68">
            <p>
              Our journey begins where conventionality ends. OG Garage Door has never been accustomed to the word impossible.
            </p>
            <p>
              Challenges guide the work, and innovation is the trusted compass. With a legacy rooted in metals, glass, and wood, OG Garage Door transforms raw materials into refined functional design.
            </p>
            <p>
              Each project is an embodiment of our dedication to excellence and our pursuit of a garage door that feels precise, durable, and visually complete.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
            Contact OG Garage Door
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-normal sm:text-6xl">
            Ready for a cleaner garage door experience?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/62">
            Email oggaragedoortoronto@gmail.com or call 647-505-8764 to start a clear quote with OG Garage Door.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-black/80"
            style={{ color: "#ffffff" }}
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}










