/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import img1 from "../../../assets/Frame 33.png";
import img2 from "../../../assets/Frame 33 (1).png";
import img3 from "../../../assets/Frame 33 (2).png";

// JSON Data for Books and Submission Section
const libraryData = [
  {
    image: img1,
    title: "NO SENSE OF SECURITY",
    subtitle: "by Julius Spenser",
    description:
      "A powerful narrative exploring human vulnerability and ancestral truth.",
    buttonText: "GET YOUR COPY",
    buttonBg: "#FFD700",
    buttonTextColor: "#080500",
    status: "AVAILABLE NOW",
    statusBg: "#FFD700",
    statusTextColor: "#080500",
  },
  {
    image: img2,
    title: "THE YACHT KLUB",
    subtitle: "by Julius Spenser",
    description:
      "The next chapter in the Royal Exchange legacy. A journey into power, purpose, and inheritance.",
    buttonText: "NOTIFY ME",
    buttonBg: "#0F52BA",
    buttonTextColor: "#ffffff",
    status: "COMING SOON",
    statusBg: "#0F52BA",
    statusTextColor: "#ffffff",
  },
  {
    image: img3,
    title: "YOUR STORY DESERVES A THRONE",
    subtitle: "",
    description:
      "Are you an author with a message that honors our lineage? We are accepting manuscripts.",
    buttonText: "NOTIFY ME",
    buttonBg: "#E0115F",
    buttonTextColor: "#ffffff",
    status: null,
    statusBg: "#E0115F",
    statusTextColor: "#ffffff",
  },
];

export const RoyalLibrarySection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -90px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  return (
    <section
      id="books"
      ref={sectionRef}
      className="w-full bg-[#020202] px-5 py-12 text-center sm:px-6 sm:py-16 xl:px-8 xl:py-20"
    >
      <div className="mx-auto max-w-[1480px]">
        <h2
          className={`mb-4 text-[#ffffff] font-cinzel text-[34px] font-bold leading-[120%] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-5xl lg:text-6xl ${revealClass}`}
          style={{ transitionDelay: isVisible ? "80ms" : "0ms" }}
        >
          THE ROYAL LIBRARY
        </h2>

        <p
          className={`mb-10 text-[#ffffff] font-lora text-base leading-[150%] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mb-12 sm:text-xl ${revealClass}`}
          style={{ transitionDelay: isVisible ? "160ms" : "0ms" }}
        >
          Words that carry the weight of legacy
        </p>

        {/* Card Container */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:flex-wrap xl:items-stretch xl:gap-10">
          {libraryData.map((item, index) => (
            <div
              key={index}
              className={`group flex w-full max-w-[413px] flex-col overflow-hidden rounded-xl bg-[#1E1E1E] shadow-lg transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(255,215,0,0.12)] xl:min-h-[760px] ${revealClass}`}
              style={{
                transitionDelay: isVisible ? `${240 + index * 120}ms` : "0ms",
              }}
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[390px] w-full rounded-t-xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] sm:h-[460px] xl:h-[510px]"
                />
              </div>

              {/* Bottom aligned content on XL */}
              <div className="flex flex-1 flex-col items-start p-4 text-left xl:min-h-[250px] xl:justify-end">
                {item.status && (
                  <button
                    className="mb-4 rounded-full px-4 py-1 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      backgroundColor: item.statusBg,
                      color: item.statusTextColor,
                    }}
                  >
                    {item.status}
                  </button>
                )}

                <p
                  className="text-[#FFFAF0] text-[22px] font-normal leading-[140%] transition-colors duration-300 group-hover:text-[#FFD700] sm:text-2xl sm:leading-[150%]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.title}
                </p>

                {item.subtitle && (
                  <p className="mt-1 text-[#D4AF37] font-lora text-base font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#FFD700] [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.subtitle}
                  </p>
                )}

                <p className="mt-2 text-[#FFFAF0] font-lora text-sm font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#f8ead8] [font-feature-settings:'liga'_off,'clig'_off]">
                  {item.description}
                </p>

                <div className="mt-auto w-full pt-4">
                  <button
                    className="relative w-full overflow-hidden rounded-md px-4 py-3 text-xs font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)]"
                    style={{
                      backgroundColor: item.buttonBg,
                      color: item.buttonTextColor,
                    }}
                  >
                    <span className="relative z-10">{item.buttonText}</span>
                    <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-full" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};