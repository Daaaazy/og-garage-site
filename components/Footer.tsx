const instagramUrl = "https://www.instagram.com/og_garage_doors?igsh=MTllc3BrMHl1d3dldA%3D%3D&utm_source=qr";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f5f5f7]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm text-black/65 sm:px-8 md:grid-cols-[1.3fr_1.1fr_1fr]">
        <div>
          <p className="font-semibold text-black">OG Garage Door</p>
          <p className="mt-3 max-w-md leading-6">
            OG Garage Door delivers insulated, refined garage door solutions for Canadian homes.
          </p>
        </div>
        <div>
          <p className="font-semibold text-black">Contact OG Garage Door</p>
          <p className="mt-3 leading-6">Email: oggaragedoortoronto@gmail.com</p>
          <p className="leading-6">Tel: 647-505-8764</p>
          <p className="leading-6">Tel: 437-340-4408</p>
          <p className="mt-3 leading-6">4978 Yonge St</p>
          <p className="leading-6">North York, ON M2N 7G8</p>
        </div>
        <div>
          <p className="font-semibold text-black">Instagram</p>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-black transition hover:bg-black/5 hover:text-black/70"
            aria-label="Open OG Garage Door on Instagram"
          >
            <InstagramIcon />
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-8 text-xs text-black/45 sm:px-8">
        (c) {new Date().getFullYear()} OG Garage Door. All rights reserved.
      </div>
    </footer>
  );
}




