/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

type LineageServiceItem = {
  title: string;
  icon: string;
};

type LineageServicesSection = {
  title: string;
  items: LineageServiceItem[];
};

type LegacyCardsSectionProps = {
  lineageServices?: LineageServicesSection;
};

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

export const LegacyCardsSection = ({
  lineageServices,
}: LegacyCardsSectionProps) => {
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

  if (!lineageServices || !lineageServices.items?.length) {
    return null;
  }

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#020202] px-5 py-14 sm:px-6 md:py-16 xl:px-8 xl:py-20"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
          {lineageServices.items.map((item, index) => {
            const iconSrc = getCmsAssetUrl(item.icon);

            return (
              <div
                key={`${item.title}-${index}`}
                className={`group flex min-h-[152px] flex-col items-center justify-center rounded-xl bg-[#540B57] px-6 py-8 text-center shadow-[0_10px_35px_rgba(84,11,87,0.28)] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_18px_48px_rgba(255,215,0,0.12)] sm:min-h-[170px] xl:min-h-[166px] ${revealClass}`}
                style={{
                  transitionDelay: isVisible
                    ? `${120 + index * 120}ms`
                    : "0ms",
                }}
              >
                <div className="mb-6 flex h-[64px] w-[64px] items-center justify-center rounded-full border border-[#B8860B] text-[#FFD700] transition-all duration-500 group-hover:scale-110 group-hover:border-[#FFD700] group-hover:shadow-[0_0_28px_rgba(255,215,0,0.20)]">
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt={item.title}
                      className="h-[28px] w-[28px] object-contain"
                    />
                  )}
                </div>

                <h3
                  className="text-[20px] font-normal uppercase leading-[120%] tracking-[0.5px] text-[#FFFAF0] transition-colors duration-300 group-hover:text-[#FFD700] sm:text-[22px]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};