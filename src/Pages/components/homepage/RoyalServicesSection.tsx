import React from "react";
import {
  FaArrowRight,
} from "react-icons/fa";
import { BookingSvg, CrownSvg, DesignSvg, FormattingSvg } from "../../../lib/Svg";

const royalServicesData = {
  title: "ROYAL SERVICES",
  subtitle: "We build the throne so you can wear the crown",
  services: [
    {
      id: 1,
      icon: BookingSvg,
      iconColor: "#FF006E",
      title: "BOOK EDITING",
      description:
        "Polish your manuscript to royal standards. Our editors ensure your voice rings with clarity and power.",
      buttonText: "Learn More",
    },
    {
      id: 2,
      icon: FormattingSvg,
      iconColor: "#0066FF",
      title: "FORMATTING",
      description:
        "Professional interior and exterior formatting that honors your work with presentation fit for a king.",
      buttonText: "Learn More",
    },
    {
      id: 3,
      icon: DesignSvg,
      iconColor: "#4ADE80",
      title: "WEB DESIGN",
      description:
        "Custom websites that crown your brand with digital sovereignty. Built with the same royal aesthetic.",
      buttonText: "Learn More",
    },
    {
      id: 4,
      icon: CrownSvg,
      iconColor: "#A855F7",
      title: "PUBLISHING",
      description:
        "Full-service publishing guidance from manuscript to marketplace. We navigate the channels so you create.",
      buttonText: "Learn More",
    },
  ],
};

export const RoyalServicesSection = () => {
  return (
    <section className="w-full bg-[#4F0D53] px-5 py-16 sm:px-6 md:py-20 xl:px-8">
      <div className="mx-auto max-w-[1480px]">
        {/* Heading */}
        <div className="mb-12 text-center sm:mb-14 lg:mb-16">
          <h2
            className="text-[#FFFAF0] text-[38px] font-normal leading-[120%] sm:text-[52px] md:text-[64px] lg:text-[72px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {royalServicesData.title}
          </h2>

          <p
            className="mt-4 text-[#FFD700] text-lg font-normal leading-[150%] sm:text-xl md:text-2xl"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {royalServicesData.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {royalServicesData.services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="rounded-[18px] border border-[#6A1B6F] bg-[#250027] px-6 py-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:px-7 sm:py-10"
              >
                {/* Icon */}
                <div
                  className="mx-auto mb-8 flex h-[64px] w-[64px] items-center justify-center rounded-full border"
                  style={{ borderColor: service.iconColor }}
                >
                  <Icon
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-[#FFFAF0] text-[24px] font-normal leading-[130%] sm:text-[28px]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-6 min-h-[105px] text-[#E9D8E9] text-base font-normal leading-[160%]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {service.description}
                </p>

                {/* Button */}
                <button
                  className="mt-7 inline-flex items-center gap-2 rounded border border-[#B8860B] px-4 py-2 text-sm font-semibold text-[#FFD700] transition-all hover:bg-[#FFD700] hover:text-[#250027]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {service.buttonText}
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};