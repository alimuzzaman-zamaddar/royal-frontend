import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import img from "../../../assets/mainlogo.png";
import { SvgHamburger } from "../../../lib/Svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    "LINEAGE",
    "BOOKS",
    "ROYAL EXCHANGE",
    "SERVICES",
    "CONTACT",
  ];

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 flex h-[56px] items-center justify-between rounded-[6px] border border-[#ffd9009f] bg-[rgba(2,2,2,0.78)] px-4 py-2 mx-6 xl:mx-0 mt-8 xl:h-auto xl:w-[1480px] xl:mx-auto xl:px-8 xl:py-3 xl:rounded-lg xl:border-[#ffd9005e] xl:border-[0.4px] xl:bg-[rgba(2,2,2,0.40)]">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <img
            src={img}
            alt="Logo"
            className="h-[38px] w-auto object-contain xl:h-auto"
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#FFD700] [font-feature-settings:'liga'_off,'clig'_off] font-lora text-base font-normal leading-[150%]"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="text-[#101828] text-center font-montserrat text-sm xl:text-base font-medium leading-6 px-4 xl:px-5 py-2 transition-colors rounded bg-[#FFD700] hover:bg-[#f5d87a]">
            SHOP
          </button>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center text-[#FFD700] text-2xl xl:hidden"
            aria-label="Open menu"
          >
            <SvgHamburger />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/70 transition-opacity duration-300 xl:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Left Sliding Menu */}
      <aside
        className={`fixed left-0 top-0 z-[100] h-full w-[82%] max-w-[330px] border-r border-[#FFD700]/50 bg-[#020202] px-6 py-6 shadow-2xl transition-transform duration-300 ease-in-out xl:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#FFD700]/20 pb-5">
          <img
            src={img}
            alt="Logo"
            className="h-[46px] w-auto object-contain"
          />

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#FFD700] text-xl"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="mt-8 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-[#FFD700]/10 pb-4 text-[#FFD700] font-lora text-base font-normal tracking-[0.5px] transition-colors hover:text-[#FFFAF0]"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Drawer Button */}
        <button className="mt-8 w-full rounded bg-[#FFD700] px-5 py-3 text-[#080500] font-montserrat text-sm font-semibold uppercase tracking-[1px] transition-colors hover:bg-[#f5d87a]">
          SHOP
        </button>
      </aside>
    </>
  );
};