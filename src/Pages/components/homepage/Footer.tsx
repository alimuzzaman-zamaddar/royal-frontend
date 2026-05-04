import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

import logo from "../../../assets/Frame 67.png";

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
  return (
    <footer className="relative w-full overflow-hidden bg-[#020202] px-5 py-14 sm:px-6 lg:py-16">
      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD700]/[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[360px] sm:max-w-[520px] xl:max-w-[1480px]">
        {/* Flex Footer Layout */}
        <div className="flex flex-wrap justify-between gap-y-8 xl:flex-nowrap xl:gap-x-16">
          {/* Brand */}
          <div className="flex w-full flex-col items-center text-center xl:w-[28%] xl:items-start xl:text-left">
            <img
              src={footerData.brand.logo}
              alt="Royal Exchange Logo"
              className="mb-4 w-auto object-contain xl:mb-6"
            />

            <p
              className="text-sm font-normal leading-[150%] text-[#FFD700]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {footerData.brand.tagline}
            </p>
          </div>

          {/* Navigate */}
          <div className="w-1/2 pr-4 text-left xl:w-[18%] xl:pr-0">
            <h3
              className="mb-4 text-base font-normal uppercase leading-[150%] text-[#FFD700] xl:mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {footerData.navigate.title}
            </h3>

            <ul className="space-y-3">
              {footerData.navigate.links.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-base font-normal leading-[150%] text-[#B8B0A4] transition-colors hover:text-[#FFD700] xl:text-sm"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="w-1/2 pl-4 text-left xl:w-[18%] xl:pl-0">
            <h3
              className="mb-4 text-base font-normal uppercase leading-[150%] text-[#FFD700] xl:mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {footerData.services.title}
            </h3>

            <ul className="space-y-3">
              {footerData.services.links.map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-base font-normal leading-[150%] text-[#B8B0A4] transition-colors hover:text-[#FFD700] xl:text-sm"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex w-full flex-col items-center text-center xl:w-[24%] xl:items-start xl:text-left">
            {/* Newsletter - mobile/tablet first, XL after social */}
            <p
              className="order-1 mb-3 text-base font-semibold text-[#FFD700] xl:order-3 xl:mb-3 xl:text-sm"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {footerData.connect.newsletterTitle}
            </p>

            <form className="order-2 w-full max-w-[292px] xl:order-4 xl:max-w-[300px]">
              <input
                type="email"
                placeholder={footerData.connect.placeholder}
                className="mb-3 h-10 w-full rounded-md border border-[#3A3024] bg-[#1E1A16] px-4 text-sm text-[#FFFAF0] outline-none placeholder:text-[#8D8277] focus:border-[#FFD700]"
                style={{ fontFamily: "'Lora', serif" }}
              />

              <button
                type="submit"
                className="h-10 w-full rounded-md bg-[#FFD700] px-5 text-xs font-bold uppercase tracking-[0.8px] text-[#080500] transition-all hover:bg-[#f5d87a]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {footerData.connect.buttonText}
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
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD700]/20 bg-[#FFD700]/15 text-[#FFD700] transition-all hover:scale-110 hover:bg-[#FFD700] hover:text-[#080500] xl:h-8 xl:w-8"
                  >
                    <Icon className="text-base xl:text-sm" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent" />

        {/* Bottom Text */}
        <div className="pt-8 text-center">
          <p
            className="text-xs font-normal leading-[150%] text-[#8D8277]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {footerData.copyright}
          </p>

          <p
            className="mt-2 text-xs font-normal leading-[150%] text-[#A58B00]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {footerData.credit}
          </p>
        </div>
      </div>
    </footer>
  );
};