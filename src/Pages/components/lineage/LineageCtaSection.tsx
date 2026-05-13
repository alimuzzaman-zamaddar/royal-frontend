/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { FaCrown } from "react-icons/fa";

const lineageCtaData = {
  intro: "If you have felt the pull, the current has already found you.",
  question:
    "The only question: are you ready to claim the throne that was always yours?",
  buttonText: "JOIN THE LINEAGE",
  quote: "Where story becomes covenant, and authors become lineage.",
};

export const LineageCtaSection = () => {
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
        threshold: 0.18,
        rootMargin: "0px 0px -80px 0px",
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
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#020202] px-5 py-16 text-center sm:px-6 md:py-16 xl:px-8 xl:py-20"
    >
      {/* Center Gold Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[391px] w-[391px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "rgba(255, 215, 0, 0.80)",
            filter: "blur(400px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[980px]">
        <p
          className={`font-lora text-base font-normal leading-[150%] text-[#FFFAF0] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-lg md:text-xl ${revealClass}`}
          style={{
            fontFamily: "'Lora', serif",
            transitionDelay: isVisible ? "100ms" : "0ms",
          }}
        >
          {lineageCtaData.intro}
        </p>

        <p
          className={`mt-4 font-lora text-base font-normal leading-[150%] text-[#FFD700] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-lg md:text-xl ${revealClass}`}
          style={{
            fontFamily: "'Lora', serif",
            transitionDelay: isVisible ? "220ms" : "0ms",
          }}
        >
          {lineageCtaData.question}
        </p>

        <button
          className={`group relative mt-8 inline-flex items-center justify-center gap-3 overflow-hidden rounded-md bg-[#FFD700] px-7 py-3 text-sm font-bold uppercase tracking-[3px] text-[#080500] shadow-[0_8px_28px_rgba(255,215,0,0.20)] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:bg-[#f5d87a] hover:shadow-[0_12px_36px_rgba(255,215,0,0.30)] sm:px-8 sm:py-3.5 sm:text-base ${revealClass}`}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            transitionDelay: isVisible ? "340ms" : "0ms",
          }}
        >
          <span className="relative z-10 flex items-center gap-3">
            <FaCrown className="text-sm sm:text-base" />
            {lineageCtaData.buttonText}
          </span>

          <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
        </button>

        <p
          className={`mt-8 font-lora text-sm font-normal leading-[150%] text-[#BBA400] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FFD700] sm:text-base ${revealClass}`}
          style={{
            fontFamily: "'Lora', serif",
            transitionDelay: isVisible ? "460ms" : "0ms",
          }}
        >
          "{lineageCtaData.quote}"
        </p>
      </div>
    </section>
  );
};