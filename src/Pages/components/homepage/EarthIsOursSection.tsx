/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type SubFooterSectionData = {
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_link?: string;
};

type EarthIsOursSectionProps = {
  subFooter?: SubFooterSectionData;
};

const earthSectionData = {
  title: "THE EARTH IS OURS",
  description:
    "We are not visitors on this land. We are its inheritors. Every page we publish, every garment we create, every service we offer is a reminder of that truth.",
  subDescription:
    "Join the Royal Exchange. Reclaim your narrative. Wear your crown. Publish your legacy.",
  buttonText: "BEGIN YOUR REIGN",
  buttonLink: "#",
  quote: "Just focus on Creating. We handle the rest.",
};

export const EarthIsOursSection = ({
  subFooter,
}: EarthIsOursSectionProps) => {
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
        threshold: 0.22,
        rootMargin: "0px 0px -90px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const title = subFooter?.title || earthSectionData.title;
  const description = subFooter?.description || earthSectionData.description;
  const quote = subFooter?.subtitle || earthSectionData.quote;
  const buttonText = subFooter?.button_text || earthSectionData.buttonText;
  // const buttonLink = subFooter?.button_link || earthSectionData.buttonLink;

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const lineClass = isVisible
    ? "scale-x-100 opacity-70"
    : "scale-x-0 opacity-0";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#020202] px-5 py-20 text-center sm:px-6 md:py-24 lg:py-28"
    >
      {/* Premium Soft Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-1/2 top-1/2 h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD700]/[0.06] blur-[120px] transition-opacity duration-[1200ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1480px]">
        {/* Top Gold Line */}
        <div
          className={`mx-auto mb-10 h-[3px] w-full max-w-[520px] origin-center bg-gradient-to-r from-transparent via-[#FFD700] to-transparent transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${lineClass}`}
          style={{ transitionDelay: isVisible ? "80ms" : "0ms" }}
        />

        <h2
          className={`text-[42px] font-normal uppercase leading-[115%] tracking-[2px] text-[#FFD700] drop-shadow-[0_0_18px_rgba(255,215,0,0.14)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[58px] md:text-[72px] lg:text-[82px] ${revealClass}`}
          style={{
            fontFamily: "'Cinzel', serif",
            transitionDelay: isVisible ? "180ms" : "0ms",
          }}
        >
          {title}
        </h2>

        <div className="mx-auto mt-9 space-y-4">
          <p
            className={`text-sm font-normal leading-[170%] text-[#FFFAF0] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-base ${revealClass}`}
            style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "300ms" : "0ms",
            }}
          >
            {description}
          </p>
        </div>

        <Link
          to="/services#process"
          className={`group relative mt-8 inline-block overflow-hidden rounded-md bg-[#FFD700] px-7 py-3 text-xs font-bold uppercase tracking-[2px] text-[#080500] shadow-[0_4px_24px_rgba(255,215,0,0.28)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:scale-[1.03] hover:bg-[#f5d87a] hover:shadow-[0_12px_34px_rgba(255,215,0,0.30)] sm:px-8 sm:py-3.5 sm:text-sm ${revealClass}`}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            transitionDelay: isVisible ? "540ms" : "0ms",
          }}
        >
          <span className="relative z-10">{buttonText}</span>
          <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
        </Link>

        <p
          className={`mt-8 text-sm italic leading-[150%] text-[#FFD700] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FFFAF0] sm:text-base ${revealClass}`}
          style={{
            fontFamily: "'Lora', serif",
            transitionDelay: isVisible ? "660ms" : "0ms",
          }}
        >
          "{quote}"
        </p>

        {/* Bottom Gold Line */}
        <div
          className={`mx-auto mt-10 h-[3px] w-full max-w-[520px] origin-center bg-gradient-to-r from-transparent via-[#FFD700] to-transparent transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${lineClass}`}
          style={{ transitionDelay: isVisible ? "760ms" : "0ms" }}
        />
      </div>
    </section>
  );
};