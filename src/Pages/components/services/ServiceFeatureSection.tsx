/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

type ServiceInnerItem = {
  id: number;
  service_category_id: number;
  title: string;
  description: string;
};

type ServiceCategoryItem = {
  id: number;
  title: string;
  icon: string;
  description: string;
  color_code: string;
  services: ServiceInnerItem[];
};

type ServiceFeatureSectionProps = {
  category?: ServiceCategoryItem;
};

export const ServiceFeatureSection = ({
  category,
}: ServiceFeatureSectionProps) => {
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

  if (!category || !category.services?.length) {
    return null;
  }

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const Icon = FaBookOpen;

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#020202] px-5 py-16 sm:px-6 md:py-20 xl:px-8 xl:py-24"
    >
      <div className="mx-auto max-w-[1480px]">
        {/* Section Title */}
        <div
          className={`mb-10 flex items-center justify-center gap-4 transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
          style={{
            transitionDelay: isVisible ? "80ms" : "0ms",
          }}
        >
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#E0115F] text-[#E0115F] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(224,17,95,0.28)]">
            <Icon className="text-xl" />
          </div>

          <h2
            className="text-[28px] font-normal uppercase leading-[120%] tracking-[1px] text-[#FFFAF0] sm:text-[34px] md:text-[40px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {category.title}
          </h2>
        </div>

        {/* Content Box */}
        <div
          className={`rounded-3xl border border-[#E0115F]/30 px-4 py-4 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 sm:py-5 md:px-6 md:py-6 ${revealClass}`}
          style={{
            transitionDelay: isVisible ? "180ms" : "0ms",
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {category.services.map((item, index) => (
              <div
                key={item.id}
                className={`group rounded-[10px] bg-[rgba(224,17,95,0.20)] px-5 py-5 text-center transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[rgba(110,5,45,0.26)] hover:shadow-[0_12px_34px_rgba(224,17,95,0.16)] sm:px-7 sm:py-6 ${revealClass}`}
                style={{
                  transitionDelay: isVisible
                    ? `${280 + index * 100}ms`
                    : "0ms",
                }}
              >
                <div className="mb-3 flex items-center justify-center gap-3">
                  <FaCheck className="text-base text-[#E0115F] transition-transform duration-300 group-hover:scale-125" />

                  <h3
                    className="text-base font-semibold leading-[130%] text-[#FFD700] transition-colors duration-300 group-hover:text-[#FFFAF0] xl:text-xl"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className="mx-auto max-w-[480px] text-sm font-normal leading-[150%] text-[#CDBDCA] transition-colors duration-300 group-hover:text-[#FFFAF0] xl:text-base"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};