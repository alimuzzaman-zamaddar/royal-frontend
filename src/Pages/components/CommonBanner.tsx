/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

type CommonBannerProps = {
  id?: string;
  backgroundImage: string;
  title: string;
  description: string;
  subDescription?: string;
  minHeight?: string;
  logoimg?: string | null;
};

export const CommonBanner = ({
  id,
  backgroundImage,
  title,
  logoimg,
  description,
  subDescription,
  minHeight = "min-h-[520px] lg:min-h-[650px]",
}: CommonBannerProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeUp = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
  });

  return (
    <section
      id={id}
      className={`relative flex w-full items-center justify-center overflow-hidden bg-[#020202] px-5 py-24 text-center sm:px-6 lg:px-8 ${minHeight}`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(2, 2, 2, 0.54) 27.4%, rgba(7, 6, 3, 0.60) 100%)",
        }}
      />

      {/* Extra Side Depth Overlay */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.24)_52%,rgba(0,0,0,0.72)_100%)]" />

      {/* Content */}
      <div className="relative z-30 mx-auto max-w-370">
        {logoimg && (
          <div           style={{
            ...fadeUp(0.15),
          }} className="mx-auto mt-10 max-w-305">
            <img
              src={logoimg}
              alt="Logo"
              className="mx-auto w-25 h-20 xl:h-42 xl:w-50 max-w-full"
            />
          </div>
        )}
        <h1
          className="mx-auto max-w-[680px] text-[#FFD700] font-cinzel text-[24px] font-normal uppercase leading-[115%] tracking-[2px] drop-shadow-[0_0_16px_rgba(255,215,0,0.18)] sm:text-[28px] md:text-[38px] lg:text-[48px] mt-6"
          style={{
            fontFamily: "'Cinzel', serif",
            ...fadeUp(0.15),
          }}
        >
          {title}
        </h1>

        <div className="mx-auto mt-10 max-w-[1220px] space-y-6">
          <p
            className="text-[rgba(212,175,55,1)] uppercase font-cinzel text-base font-normal leading-[165%] sm:text-xl md:text-2xl"
            style={{
              fontFamily: "'Cinzel', serif",
              ...fadeUp(0.35),
            }}
          >
            {description}
          </p>

          {subDescription && (
            <p
              className="text-[rgba(212,175,55,1)] uppercase font-cinzel text-base font-normal leading-[165%] sm:text-xl md:text-2xl"
              style={{
                fontFamily: "'Cinzel', serif",
                ...fadeUp(0.5),
              }}
            >
              {subDescription}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
