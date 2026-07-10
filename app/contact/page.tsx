"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const selectedDoorType = searchParams.get("doorType") === "double" ? "double" : searchParams.get("doorType") === "single" ? "single" : "";
  const [state, handleSubmit] = useForm("xvzjnqja");

  return (
    <div className="bg-white">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-black/45">
            Contact OG Garage Door
          </p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-normal text-black sm:text-7xl">
            Request a focused quote.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-black/62">
            Share the basics with OG Garage Door. The form is fully front-end and ready to connect to your preferred quote workflow.
          </p>
          <div className="mt-10 space-y-3 border-t border-black pt-6 text-sm leading-6 text-black/65">
            <p>Email: oggaragedoortoronto@gmail.com</p>
            <p>Tel: 647-505-8764</p>
            <p>Tel: 437-340-4408</p>
            <p>4978 Yonge St, North York, ON M2N 7G8</p>
          </div>
        </div>

        {state.succeeded ? (
          <p className="border-t border-black pt-8 text-lg leading-8 text-black/62">
            Request Sent. Thank you. We will get back to you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-5 border-t border-black pt-8">
            <label className="grid gap-2 text-sm font-semibold text-black">
              Name
              <input
                className="h-12 border border-black/15 px-4 text-base font-normal outline-none transition placeholder:text-black/35 focus:border-black"
                name="name"
                placeholder="Your name for OG Garage Door"
                type="text"
              />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-black">
                Phone
                <input
                  className="h-12 border border-black/15 px-4 text-base font-normal outline-none transition placeholder:text-black/35 focus:border-black"
                  name="phone"
                  placeholder="Phone for OG Garage Door"
                  type="tel"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-black">
                Email
                <input
                  className="h-12 border border-black/15 px-4 text-base font-normal outline-none transition placeholder:text-black/35 focus:border-black"
                  name="email"
                  placeholder="Email for OG Garage Door"
                  type="email"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </label>
            </div>
            <label className="grid gap-2 text-sm font-semibold text-black">
              Door Type
              <select
                className="h-12 border border-black/15 bg-white px-4 text-base font-normal outline-none transition focus:border-black"
                name="doorType"
                defaultValue={selectedDoorType}
              >
                <option value="" disabled>
                  Select a door type for OG Garage Door
                </option>
                <option value="single">Single</option>
                <option value="double">Double</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-semibold text-black">
              Message
              <textarea
                className="min-h-36 resize-y border border-black/15 px-4 py-3 text-base font-normal outline-none transition placeholder:text-black/35 focus:border-black"
                name="message"
                placeholder="Tell OG Garage Door about the opening size, style preference, color, and timeline."
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </label>
            <button
              className="mt-2 h-12 rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/80"
              type="submit"
              disabled={state.submitting}
              style={{ color: "#ffffff" }}
            >
              Send Quote Request
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageContent />
    </Suspense>
  );
}




