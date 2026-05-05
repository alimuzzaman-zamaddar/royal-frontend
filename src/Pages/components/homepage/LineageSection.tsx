/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import img from "../../../assets/photo_2026-05-04_11-01-16.jpg";

export const LineageSection = () => {
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
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const imageRevealClass = isVisible
    ? "translate-y-0 opacity-100 xl:translate-x-0"
    : "translate-y-8 opacity-0 xl:translate-x-8";

  return (
    <section id="lineage" ref={sectionRef} className="lineage-section">
      <div className="lineage-container">
        {/* LEFT CONTENT */}
        <div className="lineage-content">
          <p
            className={`lineage-label transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
            style={{ transitionDelay: isVisible ? "80ms" : "0ms" }}
          >
            Our Ancestral Lineage
          </p>

          <h2
            className={`lineage-heading transition-all duration-[900ms] mt-4 ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
            style={{ transitionDelay: isVisible ? "170ms" : "0ms" }}
          >
            The Original Inhabitants <br />
            Of This Earth
          </h2>

          <p
            className={`lineage-description transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
            style={{ transitionDelay: isVisible ? "260ms" : "0ms" }}
          >
            We are the descendants of the first nations, the builders of ancient
            civilizations, the keepers of sacred knowledge. Our lineage stretches
            back to the shores of Atlantis and the mound builders of this sacred
            land.
            <br />
            <br />
            Royal Exchange Publishing exists to reclaim that narrative — to
            publish the voices of those who carry this memory forward. Every
            book we publish, every garment we design, is a declaration of who we
            are and what we own.
          </p>

          <div
            className={`lineage-quote-wrapper transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#FFFAF0] ${revealClass}`}
            style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
          >
            <p className="lineage-quote transition-colors duration-300 hover:text-[#FFFAF0]">
              We do not seek permission to occupy what is already ours.
            </p>
          </div>

          <button
            className={`lineage-button group transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:bg-[#FFD700]/10 hover:shadow-[0_8px_28px_rgba(255,215,0,0.18)] ${revealClass}`}
            style={{ transitionDelay: isVisible ? "440ms" : "0ms" }}
          >
            READ OUR STORY
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14 5L21 12M21 12L14 19M21 12H3"
                  stroke="#FFD700"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className={`lineage-image-column transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${imageRevealClass}`}
          style={{ transitionDelay: isVisible ? "280ms" : "0ms" }}
        >
          <div className="lineage-image-wrapper group">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={img}
                alt="Lineage"
                className="lineage-image transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
            </div>

            <p className="lineage-caption ">
              The Royal Exchange Lineage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};