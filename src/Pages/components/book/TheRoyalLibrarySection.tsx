/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import img1 from "../../../assets/Ebook cover.jpeg";
import img2 from "../../../assets/middlecard.jpeg";
import img3 from "../../../assets/Frame 33 (2).png";
import { Book2Svg, BookSvg } from "../../../lib/Svg";

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

    cardBorder: "1px solid rgba(255, 215, 0, 0.30)",
    cardBg:
      "linear-gradient(180deg, rgba(255, 215, 0, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
  },
  {
    image: img2,
    title: "THE YACHT KLUB",
    subtitle: "by Julius Spenser",
    description:
      "The next chapter in the Royal Exchange legacy. A journey into power, purpose, and inheritance.",
    buttonText: "NOTIFY ME",
    buttonBg: "transparent",
    border: "1px solid #0F52BA",
    buttonTextColor: "#0F52BA",
    status: "COMING SOON",
    statusBg: "#0F52BA",
    statusTextColor: "#ffffff",

    cardBorder: "1px solid rgba(15, 82, 186, 0.30)",
    cardBg:
      "linear-gradient(180deg, rgba(15, 82, 186, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
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

    cardBorder: "1px solid rgba(224, 17, 95, 0.30)",
    cardBg:
      "linear-gradient(180deg, rgba(224, 17, 95, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
  },
];

export const TheRoyalLibrarySection = () => {
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
      className="w-full bg-[#4B0F4E] px-5 py-12 text-center sm:px-6 sm:py-16 xl:px-8 xl:py-20"
    >
      <div className="mx-auto max-w-[1480px]">
        <h2
          className={`mb-4 text-[#ffffff] flex items-center gap-3 justify-center font-cinzel text-base xs:text-[24px]  leading-[120%] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-5xl lg:text-6xl ${revealClass}`}
          style={{
            fontFamily: "'Cinzel', serif",
            transitionDelay: isVisible ? "80ms" : "0ms",
          }}
        >
          <span className="hidden sm:block">
            <BookSvg />
          </span>{" "}
          <span className="block sm:hidden">
            <Book2Svg />
          </span>{" "}
          THE ROYAL LIBRARY
        </h2>

        <p
          className={`mb-10 text-[#D4AF37] font-normal text-base leading-[150%] transition-all [font-feature-settings:'liga'_off,'clig'_off] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mb-12 sm:text-xl ${revealClass}`}
          style={{
            fontFamily: "'Lora', serif",
            transitionDelay: isVisible ? "80ms" : "0ms",
          }}
        >
          Words that carry the weight of legacy
        </p>

        {/* Card Container */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:flex-wrap xl:items-stretch xl:gap-10">
          {libraryData.map((item, index) => (
            <div
              key={index}
              className={`group p-5 xl:p-8 rounded-xl flex w-full max-w-[413px] flex-col overflow-hidden shadow-lg transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(255,215,0,0.12)] xl:min-h-[760px] ${revealClass}`}
              style={{
                transitionDelay: isVisible ? `${240 + index * 120}ms` : "0ms",
                borderRadius: "16px",
                border: item.cardBorder,
                background: item.cardBg,
              }}
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full rounded-t-xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] h-[460px] xl:h-[510px]"
                />

                {index === libraryData.length - 1 && (
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(174deg,rgba(224,17,95,0.20)_4.45%,rgba(224,17,95,0.05)_95.55%)]" />
                )}
              </div>

              {/* Bottom aligned content on XL */}
              <div className="flex flex-1 flex-col items-start p-4 text-left xl:min-h-[250px] xl:justify-end mt-auto">
                {item.status && (
                  <button
                    className="mb-4 rounded-full px-4 py-1 text-xs font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110"
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
                  <p className="mt-1 text-[#D4AF37] font-lora text-base font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#FFD700] [font-feature-settings:'liga'_off,'clig'_off]"              style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "160ms" : "0ms",
            }}>
                    {item.subtitle}
                  </p>
                )}

                <p className="mt-2 text-[#FFFAF0] font-lora text-sm font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#f8ead8] [font-feature-settings:'liga'_off,'clig'_off]"              style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "240ms" : "0ms",
            }}>
                  {item.description}
                </p>

                <div className=" w-full pt-4">
                  <button
                    className="relative w-full overflow-hidden rounded-md px-4 py-3 text-xs font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)]"
                    style={{
                      backgroundColor: item.buttonBg,
                      color: item.buttonTextColor,
                      border: item.border || "none",
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
