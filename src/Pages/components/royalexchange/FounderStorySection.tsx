/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import founderImg from "../../../assets/lineage/woner.png";

const founderStoryData = {
  image: founderImg,
  imageAlt: "Julius Spenser",
  paragraphs: [
    "I Am Julius Spenser — Author, Founder, And Owner Of Royal Exchange Publishing And Royal Exchange Clothing. I Come From The Gritty Streets Of Highland Park, Michigan, Where The Odds Were Stacked, The Statistics Were Lethal, And The Dream Was Supposed To Die Young. It Didn't.",

    "Royal Exchange Was Not Built In A Boardroom. It Was Forged In The Fire Of Survival, Sharpened By Ancestral Memory, And Delivered Through A Mind That Refuses To Operate On Anything Less Than High Frequency. This Brand Speaks From Heaven, Into The World, Through The Soul Of A Bonafide King Or Queen Who Gets Things Done — Not By Permission, But By Purpose. Royal Exchange Is An Experience.",

    "It Is The Celebration Of The Best Of Who You Were Created To Be. It Is The Refusal To Let Your Environment Define Your Elevation. It Is The Knowing That Your Story, Your Voice, And Your Vision Are Not Accidents — They Are Assignments.",

    "Through Royal Exchange Publishing, We Crown Authors Who Carry Codes The World Needs. Editing, Design, Sponsorship, Amplification — Every Service Built To Place Your Book Where It Belongs: On A Throne, Not A Shelf.",

    "Through Royal Exchange Clothing, We Wear The Frequency. Deep Navy, Emerald, Gold, Black, Grey, Teal, Orange — Every Piece Designed To Remind You That You Were Born To Vibrate Higher, Look Sharper, And Move Like Legacy Depends On It. This Is Not About Fashion. This Is Not About Books. This Is About Affecting A Generation Hungry For New, Next, Now.",
  ],
};

export const FounderStorySection = () => {
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
      className="w-full overflow-hidden bg-[#4A0E4E] px-5 py-16 sm:px-6 md:py-20 xl:px-8 xl:py-24"
    >
      <div className="mx-auto flex max-w-[1480px] flex-col items-center gap-12 lg:flex-row lg:justify-between xl:gap-20">
        {/* LEFT TEXT */}
        <div
          className={`w-full max-w-[760px] text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:text-left ${revealClass}`}
          style={{
            transitionDelay: isVisible ? "120ms" : "0ms",
          }}
        >
          <div className="space-y-7">
            {founderStoryData.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="font-lora text-base font-normal leading-[130%] text-[#FFFAF0] sm:text-lg lg:text-[18px]"
                style={{
                  fontFamily: "'Lora', serif",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className={`relative w-full max-w-[620px] transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:max-w-[560px] xl:max-w-[620px] ${
            isVisible
              ? "translate-y-0 opacity-100 lg:translate-x-0"
              : "translate-y-8 opacity-0 lg:translate-x-8"
          }`}
          style={{
            transitionDelay: isVisible ? "260ms" : "0ms",
          }}
        >
          {/* Top Right Border Line */}
          <div className="pointer-events-none absolute -right-8 -top-10 hidden h-[190px] w-[190px] rounded-tr-[18px] border-r-2 border-t-2 border-[#FFD700] lg:block" />

          {/* Bottom Left Border Line */}
          <div className="pointer-events-none absolute -bottom-10 -left-8 hidden h-[190px] w-[190px] rounded-bl-[18px] border-b-2 border-l-2 border-[#FFD700] lg:block" />

          <div className="group relative overflow-hidden rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            <img
              src={founderStoryData.image}
              alt={founderStoryData.imageAlt}
              className="h-[420px] w-full rounded-[18px] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] sm:h-[520px] lg:h-[560px] xl:h-[590px]"
            />

            <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-[linear-gradient(180deg,rgba(2,2,2,0.04)_0%,rgba(2,2,2,0.24)_100%)]" />
          </div>
        </div>
      </div>
    </section>
  );
};