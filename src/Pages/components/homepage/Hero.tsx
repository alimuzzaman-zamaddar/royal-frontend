/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import img from "../../../assets/logo (4).png";
import bgimage from "../../../assets/bgimage.png";
import videoxl from "../../../assets/IMG_1875.mp4";
import video from "../../../assets/IMG_1874 (1).mp4";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroBackground = {
    backgroundImage: `
    linear-gradient(180deg, rgba(2, 2, 2, 0.90) 0%, #070603 100%),
    url(${bgimage})
  `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const fadeUp = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted
      ? "translateY(0) scale(1)"
      : "translateY(24px) scale(0.98)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  });
  return (
    <>
      <section
        className="hero-section relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-0 text-center z-10 xl:min-h-[calc(100vh-56px)] xl:px-6"
        style={heroBackground}
      >
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute hidden xl:block ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="850"
              height="752"
              viewBox="0 0 850 752"
              fill="none"
            >
              <g filter="url(#filter0_f_8040_1516)">
                <path
                  d="M649.795 551.449L-186 -153.285L25.9879 -303.488L649.795 551.449Z"
                  fill="url(#paint0_linear_8040_1516)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_8040_1516"
                  x="-386"
                  y="-503.488"
                  width="1235.79"
                  height="1254.94"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="100"
                    result="effect1_foregroundBlur_8040_1516"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_8040_1516"
                  x1="-262.676"
                  y1="-302.659"
                  x2="502.73"
                  y2="541.169"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFD700" />
                  <stop offset="1" stop-color="#998100" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute  block xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="306"
              height="308"
              viewBox="0 0 306 308"
              fill="none"
            >
              <g filter="url(#filter0_f_8174_1142)">
                <path
                  d="M205.444 207.738L-38.6399 -11.5016L17.2727 -51.1183L205.444 207.738Z"
                  fill="url(#paint0_linear_8174_1142)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_8174_1142"
                  x="-138.64"
                  y="-151.118"
                  width="444.084"
                  height="458.857"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="50"
                    result="effect1_foregroundBlur_8174_1142"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_8174_1142"
                  x1="-62.5763"
                  y1="-56.1398"
                  x2="172.753"
                  y2="194.394"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFD700" />
                  <stop offset="1" stop-color="#998100" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute right-0 rounded-full blur-3xl hidden xl:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="870"
              height="754"
              viewBox="0 0 870 754"
              fill="none"
            >
              <g filter="url(#filter0_f_8040_1515)">
                <path
                  d="M200 553.088L847.205 -315.002L1047.56 -149.601L200 553.088Z"
                  fill="url(#paint0_linear_8040_1515)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_8040_1515"
                  x="0"
                  y="-515.002"
                  width="1247.56"
                  height="1268.09"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="100"
                    result="effect1_foregroundBlur_8040_1515"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_8040_1515"
                  x1="888.864"
                  y1="-11.6908"
                  x2="391.899"
                  y2="344.304"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFD700" />
                  <stop offset="1" stop-color="#998100" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="absolute right-0 rounded-full blur-3xl block xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="293"
              height="311"
              viewBox="0 0 293 311"
              fill="none"
            >
              <g filter="url(#filter0_f_8174_1143)">
                <path
                  d="M99.9999 210.891L291.525 -45.9998L350.815 2.94649L99.9999 210.891Z"
                  fill="url(#paint0_linear_8174_1143)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_8174_1143"
                  x="0"
                  y="-146"
                  width="450.815"
                  height="456.891"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="50"
                    result="effect1_foregroundBlur_8174_1143"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_8174_1143"
                  x1="303.853"
                  y1="43.7578"
                  x2="156.788"
                  y2="149.106"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFD700" />
                  <stop offset="1" stop-color="#998100" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="div">
          <video
            src={videoxl}
            autoPlay
            loop
            muted
            className="absolute inset-0 mx-auto h-full object-cover opacity-20 z-0 hidden xl:block"
          />
          <video
            src={video}
            autoPlay
            loop
            muted
            className="absolute inset-0 mx-auto h-full object-cover opacity-20 z-0 block xl:hidden"
          />
        </div>

        {/* HERO CONTENT */}
        <div className="relative z-30 flex w-full flex-col items-center text-center px-4 pt-[95px] sm:pt-[110px] md:pt-[120px] xl:pt-0">
          {/* Logo */}
          <div
            className="group mb-7 rounded-lg bg-[#020202] p-3 shadow-[0_0_40px_0_rgba(255,215,0,0.60)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_55px_0_rgba(255,215,0,0.70)] sm:p-4 mt-22 xl:mb-6"
            style={fadeUp(0.15)}
          >
            <img
              src={img}
              alt="Logo"
              className="h-18 w-18 object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_16px_rgba(255,215,0,0.45)] sm:h-[80px] sm:w-[90px] md:h-[90px] md:w-[100px]"
            />
          </div>

          {/* Small Title */}
          <p
            className="text-[#FFD700] font-cinzel mb-4 xl-mb-0 text-[20px] font-normal uppercase leading-[110%] tracking-[2px] transition-all duration-500 sm:text-[44px] md:text-[56px] xl:text-[38px] xl:leading-[120%] xl:tracking-[1.92px]"
            style={{ fontFamily: "'Cinzel', serif", ...fadeUp(0.3) }}
          >
            WE ARE THE
          </p>

          {/* Main Heading */}
          <h1
            className="text-[#FFD700] font-cinzel text-[32px] font-bold uppercase leading-[110%] tracking-[1px] drop-shadow-[0_0_18px_rgba(255,215,0,0.18)] transition-all duration-500 sm:text-[44px] md:text-[84px] xl:text-[96px] xl:leading-[120%] xl:tracking-[1.92px]"
            style={{ fontFamily: "'Cinzel', serif", ...fadeUp(0.45) }}
          >
            INHERITORS
          </h1>

          {/* Subheading */}
          <p
            className="my-5 max-w-[420px] text-[#D4AF37] font-cinzel text-[19px] font-normal uppercase leading-[130%] tracking-[1px] transition-all duration-500 sm:text-[24px] md:text-[30px] xl:my-6 xl:max-w-none xl:text-[32px] xl:leading-[120%]"
            style={{ fontFamily: "'Cinzel', serif", ...fadeUp(0.6) }}
          >
            Of the Earth and All Within It
          </p>

          {/* Description */}
          <p
            className="mx-auto mb-7 max-w-[430px] text-[#FFFAF0] font-lora text-base font-normal leading-[150%] transition-all duration-500 sm:text-lg md:max-w-[620px] xl:mb-12 xl:w-[35%] xl:max-w-none xl:text-lg"
            style={{
              ...fadeUp(0.75),
              fontFamily: "'Lora', serif",
            }}
          >
            Royal Exchange Publishing stands as a creative platform for authors
            who carry the ancestral memory of this land. We guide you to build
            your legacy.
          </p>

          {/* Buttons */}
          <div
            className="button-container flex w-full flex-col items-center justify-center gap-4 sm:flex-row xl:flex-row"
            style={fadeUp(0.9)}
          >
            <button className="group relative w-[235px] overflow-hidden rounded-lg bg-[#FFD700] px-7 py-3 text-[#080500] font-cinzel text-sm font-bold tracking-[0.12em] shadow-[0_4px_24px_#d4a01740] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_10px_34px_rgba(212,160,23,0.36)] md:w-auto md:text-base xl:text-[0.72rem]">
              <span className="relative z-10">ENTER THE KINGDOM</span>
              <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
            </button>

            <button className="group relative w-[235px] overflow-hidden rounded-lg bg-[#c0185a] px-7 py-3 text-white font-cinzel text-sm font-bold tracking-[0.12em] shadow-[0_4px_24px_#c0185a40] transition-all duration-300 hover:-translate-y-[2px] hover:scale-[1.03] hover:brightness-110 hover:shadow-[0_10px_34px_rgba(192,24,90,0.36)] md:w-auto md:text-base xl:text-[0.72rem]">
              <span className="relative z-10">EXPLORE OUR WORKS</span>
              <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-full" />
            </button>
          </div>
        </div>
      </section>

      <div className="h-24 bg-[linear-gradient(180deg,#0D0803_0%,#4A0E4E_100%)]"></div>
    </>
  );
};
