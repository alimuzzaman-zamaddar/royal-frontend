/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

type ServiceApiItem = {
  id: number;
  title: string;
  icon: string;
  description: string;
  color_code: string;
};

type ServicesSectionData = {
  title: string;
  subtitle: string;
  items: ServiceApiItem[];
};

type RoyalServicesSectionProps = {
  servicesSection?: ServicesSectionData;
};

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

export const RoyalServicesSection = ({
  servicesSection,
}: RoyalServicesSectionProps) => {
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

  if (!servicesSection || !servicesSection.items?.length) {
    return null;
  }

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const getServiceHref = (id: number) => {
    if (id === 1) return "/services#book";
    if (id === 2) return "/services#formatting";
    if (id === 3) return "/services#web-design";
    if (id === 4) return "/services#publishing";

    return "/services";
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full bg-[#4A0E4E] px-5 py-16 sm:px-6 md:py-20 xl:px-8"
    >
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-12 text-center sm:mb-14 lg:mb-16">
          <h2
            className={`text-[#FFFAF0] text-[38px] font-normal leading-[120%] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[52px] md:text-[64px] ${revealClass}`}
            style={{
              fontFamily: "'Cinzel', serif",
              transitionDelay: isVisible ? "80ms" : "0ms",
            }}
          >
            {servicesSection.title}
          </h2>

          <p
            className={`mt-4 text-[#FFD700] text-lg font-thin leading-[150%] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-xl md:text-2xl ${revealClass}`}
            style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "160ms" : "0ms",
            }}
          >
            {servicesSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {servicesSection.items.map((service, index) => {
            const iconSrc = getCmsAssetUrl(service.icon);

            return (
              <div
                key={service.id}
                className={`group rounded-[18px] border border-[#6A1B6F] bg-[#250027] px-6 py-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-[#FFD700]/35 hover:shadow-[0_18px_48px_rgba(255,215,0,0.12)] sm:px-7 sm:py-10 ${revealClass}`}
                style={{
                  transitionDelay: isVisible ? `${260 + index * 110}ms` : "0ms",
                }}
              >
                <div
                  className="mx-auto mb-8 flex h-[64px] w-[64px] items-center justify-center rounded-full border transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(255,215,0,0.16)]"
                  style={{
                    borderColor: service.color_code,
                    boxShadow: isVisible ? "0 0 0 rgba(255,255,255,0)" : "none",
                  }}
                >
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    <img
                      src={iconSrc}
                      alt={service.title}
                      className="h-8 w-8 object-contain"
                    />
                  </div>
                </div>

                <h3
                  className="text-[#FFFAF0] text-[24px] font-normal leading-[130%] transition-colors duration-300 group-hover:text-[#FFD700] sm:text-[28px]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {service.title}
                </h3>

                <p
                  className="mt-6 min-h-[105px] text-[#E9D8E9] text-sm font-normal leading-[160%] transition-colors duration-300 group-hover:text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {service.description}
                </p>
                <Link
                  to={getServiceHref(service.id)}
                  className="group/btn relative inline-flex overflow-hidden items-center gap-2 rounded border border-[#B8860B] px-4 py-2 text-sm font-semibold text-[#FFD700] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#FFD700] hover:text-[#250027] hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <span className="relative z-10">Learn More</span>

                  <FaArrowRight className="relative z-10 text-sm transition-transform duration-300 group-hover/btn:translate-x-1" />

                  <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover/btn:left-full" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
