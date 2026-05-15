/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

import logo from "../../../assets/Frame 67 (1).png";

type NewsletterFormValues = {
  email: string;
};

const footerData = {
  brand: {
    logo,
    tagline: "Inheritors of the Earth",
  },

  navigate: {
    title: "NAVIGATE",
    links: ["Lineage", "Books", "Royal Exchange", "Services", "Contact"],
  },

  services: {
    title: "SERVICES",
    links: ["Book Editing", "Formatting", "Web Design", "Publishing"],
  },

  connect: {
    title: "CONNECT",
    newsletterTitle: "Newsletter",
    placeholder: "Your email",
    buttonText: "JOIN THE KINGDOM",
    socials: [
      {
        id: 1,
        icon: FaInstagram,
        url: "#",
        label: "Instagram",
      },
      {
        id: 2,
        icon: FaFacebookF,
        url: "#",
        label: "Facebook",
      },
      {
        id: 3,
        icon: FaTwitter,
        url: "#",
        label: "Twitter",
      },
      {
        id: 4,
        icon: FaEnvelope,
        url: "#",
        label: "Email",
      },
    ],
  },

  copyright: "© 2026 Royal Exchange Publishing. All Rights Reserved.",
  credit: "Designed with ancestral memory. Built for the inheritors.",
};

export const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

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
        rootMargin: "0px 0px -70px 0px",
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const onNewsletterSubmit = async (data: NewsletterFormValues) => {
    try {
      /*
        Ready for API call.

        Example:
        const response = await fetch(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Newsletter subscription failed");
        }
      */

      console.log("Newsletter payload:", data);

      await new Promise((resolve) => setTimeout(resolve, 700));

      toast.success("You have joined the kingdom.");
      reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(message);
    }
  };

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const lineClass = isVisible
    ? "scale-x-100 opacity-100"
    : "scale-x-0 opacity-0";

  return (
    <footer
      id="notify-me"
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#020202] px-5 py-14 sm:px-6 lg:py-16"
    >
      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD700]/[0.06] blur-[120px] transition-opacity duration-[1200ms] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[360px] sm:max-w-[520px] xl:max-w-[1480px]">
        {/* Flex Footer Layout */}
        <div className="flex flex-wrap justify-center xl:justify-between gap-y-8 xl:flex-nowrap xl:gap-x-16">
          {/* Brand */}
          <div
            className={`flex w-full flex-col items-center text-center transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:w-[28%] xl:items-start xl:text-left ${revealClass}`}
            style={{ transitionDelay: isVisible ? "80ms" : "0ms" }}
          >
            <img
              src={footerData.brand.logo}
              alt="Royal Exchange Logo"
              className="mb-4 w-auto object-contain transition-all duration-500 hover:scale-[1.03] hover:drop-shadow-[0_0_18px_rgba(255,215,0,0.35)] xl:mb-6"
            />
          </div>

          {/* Navigate */}
          <div
            className={`w-1/3 pr-4 text-left transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:w-[18%] xl:pr-0 ${revealClass}`}
            style={{ transitionDelay: isVisible ? "170ms" : "0ms" }}
          >
            <h3
              className="mb-4 text-base font-normal uppercase leading-[150%] text-[#FFD700] xl:mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {footerData.navigate.title}
            </h3>

            <ul className="space-y-2 xl:space-y-3">
              {footerData.navigate.links.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group relative inline-block text-xs font-normal leading-[150%] text-[#B8B0A4] transition-all duration-300 hover:translate-x-1 hover:text-[#FFD700] xl:text-sm"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div
            className={`w-1/3 pl-4 text-left transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:w-[18%] xl:pl-0 ${revealClass}`}
            style={{ transitionDelay: isVisible ? "260ms" : "0ms" }}
          >
            <h3
              className="mb-4 text-base font-normal uppercase leading-[150%] text-[#FFD700] xl:mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {footerData.services.title}
            </h3>

            <ul className="space-y-2 xl:space-y-3">
              {footerData.services.links.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="group relative inline-block text-xs font-normal leading-[150%] text-[#B8B0A4] transition-all duration-300 hover:translate-x-1 hover:text-[#FFD700] xl:text-sm"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div
            className={`flex w-full flex-col items-center text-center transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] xl:w-[24%] xl:items-start xl:text-left ${revealClass}`}
            style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
          >
            {/* Newsletter - mobile/tablet first, XL after social */}
            <p
              className="order-1 mb-3 text-base font-semibold text-[#FFD700] xl:order-3 xl:mb-3 xl:text-sm"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {footerData.connect.newsletterTitle}
            </p>

            <form
              onSubmit={handleSubmit(onNewsletterSubmit)}
        
              noValidate
              className="order-2 w-full max-w-[292px] xl:order-4 xl:max-w-[300px]"
            >
              <input
                type="email"
                placeholder={footerData.connect.placeholder}
                autoComplete="email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`mb-3 h-10 w-full rounded-md border bg-[#1E1A16] px-4 text-sm text-[#FFFAF0] outline-none placeholder:text-[#8D8277] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.email ? "border-[#E0115F]" : "border-[#3A3024]"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              {errors.email && (
                <p
                  className="-mt-1 mb-3 text-left text-xs text-[#FFD700]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {errors.email.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative h-10 w-full overflow-hidden rounded-md bg-[#FFD700] px-5 text-xs font-bold uppercase tracking-[0.8px] text-[#080500] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="relative z-10">
                  {isSubmitting ? "JOINING..." : footerData.connect.buttonText}
                </span>
                <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
              </button>
            </form>

            {/* Connect Title */}
            <h3
              className="order-3 mt-6 mb-5 text-xl font-normal uppercase leading-[150%] text-[#FFD700] xl:order-1 xl:mt-0 xl:mb-4 xl:text-base"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {footerData.connect.title}
            </h3>

            {/* Social Icons */}
            <div className="order-4 flex justify-center gap-5 xl:order-2 xl:mb-4 xl:justify-start xl:gap-3">
              {footerData.connect.socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD700]/20 bg-[#FFD700]/15 text-[#FFD700] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-[#FFD700]/60 hover:bg-[#FFD700] hover:text-[#080500] hover:shadow-[0_8px_22px_rgba(255,215,0,0.18)] xl:h-8 xl:w-8"
                  >
                    <Icon className="text-base xl:text-sm" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`mt-12 h-[1px] w-full origin-center bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent transition-all duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${lineClass}`}
          style={{ transitionDelay: isVisible ? "520ms" : "0ms" }}
        />

        {/* Bottom Text */}
        <div
          className={`pt-8 text-center transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
          style={{ transitionDelay: isVisible ? "620ms" : "0ms" }}
        >
          <p
            className="text-xs font-normal leading-[150%] text-[#8D8277]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {footerData.copyright}
          </p>

          <p
            className="mt-2 text-xs font-normal leading-[150%] text-[#A58B00] transition-colors duration-300 hover:text-[#FFD700]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {footerData.credit}
          </p>
        </div>
      </div>
    </footer>
  );
};