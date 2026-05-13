/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import {  FaCrown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";


const publishingGuidanceData = {
  icon: FaCrown,
  title: "Publishing Guidance & Consultation",
  items: [
    {
      id: 1,
      title: "Publishing Roadmap Sessions",
      description:
        "Self-publishing vs. traditional vs. hybrid. We map the path that serves your goals, not industry defaults.",
    },
    {
      id: 2,
      title: "Distribution Strategy",
      description:
        "Amazon KDP, IngramSpark, Barnes & Noble Press, Draft2Digital, direct sales. Where to go, when, and why.",
    },
    {
      id: 3,
      title: "ISBN & Copyright Registration",
      description:
        "Step-by-step assistance with legal protection and cataloging.",
    },
    {
      id: 4,
      title: "Marketing Strategy",
      description:
        "Pre-launch, launch, and post-launch planning. Email campaigns, social sequencing, review generation, and long-term platform building.",
    },
  ],
};

export const PublishingGuidanceSection = () => {
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

  const Icon = publishingGuidanceData.icon;

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
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[#A855F7] text-[#A855F7] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_24px_rgba(168,85,247,0.35)]">
            <Icon className="text-xl" />
          </div>

          <h2
            className="text-[24px] font-normal uppercase leading-[120%] tracking-[1px] text-[#FFFAF0] sm:text-[30px] md:text-[38px] xl:text-[40px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {publishingGuidanceData.title}
          </h2>
        </div>

        {/* Content Box */}
        <div
          className={`rounded-3xl border border-[#A855F7]/40 px-4 py-4 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 sm:py-5 md:px-6 md:py-6 ${revealClass}`}
          style={{
            transitionDelay: isVisible ? "180ms" : "0ms",
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {publishingGuidanceData.items.map((item, index) => (
              <div
                key={item.id}
                className={`group rounded-[10px] bg-[rgba(168,85,247,0.16)] px-5 py-5 text-center transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-[rgba(168,85,247,0.24)] hover:shadow-[0_12px_34px_rgba(168,85,247,0.16)] sm:px-7 sm:py-6 ${revealClass}`}
                style={{
                  transitionDelay: isVisible
                    ? `${280 + index * 100}ms`
                    : "0ms",
                }}
              >
                <div className="mb-3 flex items-center justify-center gap-3">
                  <FaCheck className="text-base text-[#A855F7] transition-transform duration-300 group-hover:scale-125" />

                  <h3
                    className="text-base font-semibold leading-[130%] text-[#FFD700] transition-colors duration-300 group-hover:text-[#FFFAF0] xl:text-xl"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className="mx-auto max-w-[560px] text-sm font-normal leading-[150%] text-[#CDBDCA] transition-colors duration-300 group-hover:text-[#FFFAF0] xl:text-base"
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