import React from "react";

const earthSectionData = {
  title: "THE EARTH IS OURS",
  description:
    "We are not visitors on this land. We are its inheritors. Every page we publish, every garment we create, every service we offer is a reminder of that truth.",
  subDescription:
    "Join the Royal Exchange. Reclaim your narrative. Wear your crown. Publish your legacy.",
  buttonText: "BEGIN YOUR REIGN",
  quote: "Just focus on Creating. We handle the rest.",
};

export const EarthIsOursSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#020202] px-5 py-20 text-center sm:px-6 md:py-24 lg:py-28">
      {/* Background Glow */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#FFD700]/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.10)_0%,rgba(2,2,2,0.96)_52%,#020202_100%)]" />
      </div> */}

      <div className="relative z-10 mx-auto max-w-[1100px]">
        {/* Top Gold Line */}
        <div className="mx-auto mb-10 h-[3px] w-full max-w-[520px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-70" />

        <h2
          className="text-[42px] font-normal uppercase leading-[115%] tracking-[2px] text-[#FFD700] sm:text-[58px] md:text-[72px] lg:text-[82px]"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {earthSectionData.title}
        </h2>

        <div className="mx-auto mt-9 max-w-[980px] space-y-4">
          <p
            className="text-sm font-normal leading-[170%] text-[#FFFAF0] sm:text-base"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {earthSectionData.description}
          </p>

          <p
            className="text-sm font-normal leading-[170%] text-[#FFFAF0] sm:text-base"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {earthSectionData.subDescription}
          </p>
        </div>

        <button
          className="mt-8 rounded-md bg-[#FFD700] px-7 py-3 text-xs font-bold uppercase tracking-[2px] text-[#080500] shadow-[0_4px_24px_rgba(255,215,0,0.28)] transition-all duration-300 hover:scale-[1.03] hover:bg-[#f5d87a] sm:px-8 sm:py-3.5 sm:text-sm"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {earthSectionData.buttonText}
        </button>

        <p
          className="mt-8 text-sm italic leading-[150%] text-[#FFD700] sm:text-base"
          style={{ fontFamily: "'Lora', serif" }}
        >
          "{earthSectionData.quote}"
        </p>

        {/* Bottom Gold Line */}
        <div className="mx-auto mt-10 h-[3px] w-full max-w-[520px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60" />
      </div>
    </section>
  );
};