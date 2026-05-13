/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

const archiveStatementData = {
  paragraphs: [
    <>
      Today, we are <em>the correction.</em> A portal for authors whose words
      carry codes that activate, heal, and elevate.
    </>,
    <>
      We do not publish books. We <strong>crown stories</strong> — placing them
      where they cannot be erased, where readers searching for direction find
      it, and where your name becomes part of a living archive.
    </>,
  ],
  quote: "The Lineage does not beg. It recognizes.",
};

export const ArchiveStatementSection = () => {
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

  const lineClass = isVisible
    ? "scale-x-100 opacity-100"
    : "scale-x-0 opacity-0";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#020202] px-5 py-14 sm:px-6 md:py-8 xl:px-8 xl:py-10"
    >
      {/* Soft Bottom Glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.08)_0%,rgba(2,2,2,0)_68%)]" />

      <div className="relative z-10 mx-auto max-w-[1480px]">
        <div
          className={`rounded-[18px] border border-[#FFD700]/30 bg-[radial-gradient(circle_at_center,rgba(84,11,87,0.55)_0%,rgba(26,3,25,0.88)_58%,rgba(2,2,2,0.96)_100%)] px-5 py-10 text-center shadow-[0_18px_60px_rgba(255,215,0,0.07)] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 sm:py-12 md:px-12 xl:px-20 xl:py-14 ${revealClass}`}
        >
          <div className="mx-auto max-w-[1260px] space-y-10 sm:space-y-12">
            {archiveStatementData.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={`font-lora text-base font-normal leading-[165%] text-[#FFFAF0] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-lg md:text-xl xl:text-[22px] [&_em]:font-semibold [&_em]:italic [&_strong]:font-bold ${revealClass}`}
                style={{
                  fontFamily: "'Lora', serif",
                  transitionDelay: isVisible
                    ? `${140 + index * 140}ms`
                    : "0ms",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Center Line */}
          <div
            className={`mx-auto mt-12 h-[2.5px] w-full max-w-[560px] origin-center bg-[linear-gradient(90deg,_rgba(0,0,0,0)_0%,_rgba(10,7,0,0.14)_7.14%,_rgba(42,34,0,0.29)_14.29%,_rgba(79,65,0,0.43)_21.43%,_rgba(120,100,0,0.57)_28.57%,_rgba(163,136,0,0.71)_35.71%,_rgba(208,175,0,0.86)_42.86%,_#FFD700_50%,_rgba(208,175,0,0.86)_57.14%,_rgba(163,136,0,0.71)_64.29%,_rgba(120,100,0,0.57)_71.43%,_rgba(79,65,0,0.43)_78.57%,_rgba(42,34,0,0.29)_85.71%,_rgba(10,7,0,0.14)_92.86%,_rgba(0,0,0,0)_100%)] ${lineClass}`}
            style={{ transitionDelay: isVisible ? "460ms" : "0ms" }}
          />

          <p
            className={`mt-12 font-lora text-xl italic leading-[150%] text-[#FFD700] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#FFFAF0] sm:text-2xl xl:text-[28px] ${revealClass}`}
            style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "580ms" : "0ms",
            }}
          >
            {archiveStatementData.quote}
          </p>
        </div>
      </div>
    </section>
  );
};