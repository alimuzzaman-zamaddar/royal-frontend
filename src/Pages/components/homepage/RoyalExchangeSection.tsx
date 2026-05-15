/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";

import mainImg from "../../../assets/Frame 61.png";
import tshirtImg from "../../../assets/tshirt (1).png";
import beltImg from "../../../assets/belt.png";
import hoodieImg from "../../../assets/hoodie.png";
import capImg from "../../../assets/cap.png";

const royalExchangeData = {
  label: "THE ROYAL EXCHANGE",
  title: "Wear Your Crown",
  paragraphs: [
    "Royal Exchange is more than clothing — it is regalia. Every thread is woven with the memory of who we are: the original inhabitants, the inheritors of the earth.",
    "From the crown to the sole, our garments declare your royal status. T-shirts, hoodies, joggers, sweaters, belts, caps — each piece designed to remind you and the world of your divine inheritance.",
  ],
  features: [
    "Premium fabrics fit for royalty",
    "Designs that honor ancestral memory",
    "Every purchase supports indigenous authors",
  ],
  buttonText: "ENTER THE ROYAL WARDROBE",
  mainImage: mainImg,
  mainImageAlt: "Royal Exchange clothing model",
  caption: "Royal Exchange — Regalia for the Inheritors",
  gallery: [
    {
      image: tshirtImg,
      alt: "Royal Exchange T-shirt",
    },
    {
      image: beltImg,
      alt: "Royal Exchange belt",
    },
    {
      image: hoodieImg,
      alt: "Royal Exchange hoodie",
    },
    {
      image: capImg,
      alt: "Royal Exchange cap",
    },
  ],
};

export const RoyalExchangeSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState({
    image: royalExchangeData.mainImage,
    alt: royalExchangeData.mainImageAlt,
  });

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
        rootMargin: "0px 0px -90px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const imageRevealClass = isVisible
    ? "translate-y-0 opacity-100 lg:translate-x-0"
    : "translate-y-8 opacity-0 lg:translate-x-8";

  return (
    <section
      id="royal-exchange"
      ref={sectionRef}
      className="w-full bg-[#020202] px-5 py-14 sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-14">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left w-full">
          <p
            className={`mb-4 text-sm font-normal uppercase leading-[150%] text-[#FFD700] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
            style={{
              fontFamily: "'Cinzel', serif",
              transitionDelay: isVisible ? "80ms" : "0ms",
            }}
          >
            {royalExchangeData.label}
          </p>

          <h2
            className={`mb-8 lineage-heading transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
            style={{
              fontFamily: "'Cinzel', serif",
              transitionDelay: isVisible ? "160ms" : "0ms",
            }}
          >
            {royalExchangeData.title}
          </h2>

          <div className="mx-auto max-w-[650px] space-y-5 lg:mx-0">
            {royalExchangeData.paragraphs.map((text, index) => (
              <p
                key={index}
                className={`text-base font-normal leading-[150%] text-[#FFFAF0] transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-lg ${revealClass}`}
                style={{
                  fontFamily: "'Lora', serif",
                  transitionDelay: isVisible
                    ? `${250 + index * 110}ms`
                    : "0ms",
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="mt-9 space-y-4">
            {royalExchangeData.features.map((feature, index) => (
              <div
                key={index}
                className={`group flex items-start justify-center gap-3 transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-1 lg:justify-start ${revealClass}`}
                style={{
                  transitionDelay: isVisible
                    ? `${430 + index * 100}ms`
                    : "0ms",
                }}
              >
                <span className="mt-[2px] text-lg leading-none text-[#FFD700] transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.55)]">
                  ✓
                </span>

                <p
                  className="text-sm leading-[150%] text-[#FFFAF0] transition-colors duration-300 group-hover:text-[#FFD700] sm:text-base"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <button
            className={`group relative mt-8 overflow-hidden rounded-md bg-[#FFD700] px-6 py-3 text-sm font-bold uppercase tracking-[1.2px] text-[#080500] shadow-[0_4px_24px_rgba(255,215,0,0.28)] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:scale-[1.02] hover:bg-[#f5d87a] hover:shadow-[0_12px_34px_rgba(255,215,0,0.28)] sm:px-7 sm:text-base ${revealClass}`}
            style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "160ms" : "0ms",
            }}
          >
            <span className="relative z-10">
              {royalExchangeData.buttonText}
            </span>
            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div
          className={`w-full transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${imageRevealClass}`}
          style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
        >
          <div className="group relative overflow-hidden rounded-xl shadow-[0_16px_50px_rgba(0,0,0,0.28)] transition-all duration-500 hover:shadow-[0_22px_60px_rgba(255,215,0,0.12)]">
            <img
              src={selectedImage.image}
              alt={selectedImage.alt}
              className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] h-[420px] lg:h-[378px] xl:h-[410px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-16">
              <p
                className="text-center text-xs font-normal leading-[150%] text-[#FFFAF0] transition-colors duration-300 group-hover:text-[#FFD700] sm:text-xl"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {royalExchangeData.caption}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 grid-cols-4 sm:gap-4">
            {royalExchangeData.gallery.map((item, index) => {
              const isActive = selectedImage.image === item.image;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      image: item.image,
                      alt: item.alt,
                    })
                  }
                  className={`group cursor-pointer overflow-hidden rounded-lg bg-[#FFFAF0] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,215,0,0.14)] ${
                    isActive
                      ? "border border-[#FFD700] ring-2 ring-[#FFD700]/40"
                      : "border border-transparent"
                  } ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isVisible
                      ? `${520 + index * 90}ms`
                      : "0ms",
                  }}
                  aria-label={`Show ${item.alt}`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="xl:h-[110px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 sm:h-[96px] lg:h-[86px] xl:h-[96px]"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};