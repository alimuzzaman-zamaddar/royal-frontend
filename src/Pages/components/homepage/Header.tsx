import { useEffect, useState, type MouseEvent } from "react";
import { FaTimes } from "react-icons/fa";
import img from "../../../assets/mainlogo.png";
import { CartSvg, SvgHamburger } from "../../../lib/Svg";
import { Link } from "react-router-dom";
import { CART_UPDATED_EVENT, getCartCount } from "../../../lib/cartStorage";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartCount());
    };

    updateCartCount();

    window.addEventListener(CART_UPDATED_EVENT, updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMounted(true);
    }, 120);

    return () => window.clearTimeout(timer);
  }, []);

  const navLinks = [
    {
      label: "THE THRONE ROOM",
      href: "/",
    },
    {
      label: "ROYAL EXCHANGE",
      href: "/royal-exchange",
    },
    {
      label: "SHOP",
      href: "/shop",
    },
    {
      label: "SERVICES",
      href: "/services",
    },
    {
      label: "BOOKS",
      href: "/book",
    },
    {
      label: "LINEAGE",
      href: "/lineage",
    },
    {
      label: "CONTACT",
      href: "/contact",
    },
  ];

  const handleSmoothScroll = (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // Only handle anchor links
    if (!href.startsWith("#")) {
      return;
    }

    e.preventDefault();

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    const headerOffset = 90;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setIsMenuOpen(false);

    window.history.pushState(null, "", href);
  };

  return (
    <>
      <header
        className={`absolute top-0 left-0 right-0 z-50 mx-6 mt-8 flex h-[56px] items-center justify-between rounded-[6px] border border-[#ffd9009f] bg-[rgba(2,2,2,0.78)] px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-700 ease-out xl:mx-auto xl:h-auto xl:w-[1480px] xl:px-8 xl:py-3 xl:rounded-lg xl:border-[#ffd9005e] xl:border-[0.4px] xl:bg-[rgba(2,2,2,0.40)] ${
          isMounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
        }`}
      >
        {/* Logo */}
        <a
          href="https://royalexchange230.com/"
          // onClick={(e) => handleSmoothScroll(e, "#home")}
          className="group flex items-center gap-3 cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03]"
        >
          <img
            src={img}
            alt="Logo"
            className="h-[38px] w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(255,215,0,0.45)] xl:h-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="group relative text-[#FFD700] [font-feature-settings:'liga'_off,'clig'_off]  font-lora text-base font-normal leading-[150%] transition-colors duration-300 hover:text-[#FFFAF0]"
              style={{
                fontFamily: "'Lora', serif",
              }}
            >
              {link.label}

              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-8">
          <Link
            to="/cart"
            className="relative inline-flex items-center justify-center"
          >
            <CartSvg />

            {cartCount > 0 && (
              <span
                className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFD700] px-1 text-[11px] font-bold text-[#020202] shadow-[0_0_14px_rgba(255,215,0,0.45)]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/auth/signup"
            className="group xl:block hidden relative overflow-hidden rounded-lg bg-[#FFD700] px-2 py-2 text-center font-montserrat text-sm font-medium leading-6 text-[#101828] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.28)] xl:px-5 xl:text-base cursor-pointer"
            style={{
              fontFamily: "'Lora', serif",
            }}
          >
            <span className="relative z-10">SIGN UP</span>
            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </Link>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center text-[#FFD700] text-2xl transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.55)] xl:hidden"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <SvgHamburger />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/70 backdrop-blur-[2px] transition-all duration-300 xl:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Left Sliding Menu */}
      <aside
        className={`fixed left-0 top-0 z-[100] h-full w-[82%] max-w-[330px] border-r border-[#FFD700]/50 bg-[#020202] px-6 py-6 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] xl:hidden ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-95"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#FFD700]/20 pb-5">
          <a
            href="https://royalexchange230.com"
            // onClick={(e) => handleSmoothScroll(e, "#home")}
            className="group transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              src={img}
              alt="Logo"
              className="h-[46px] w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(255,215,0,0.45)]"
            />
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="text-[#FFD700] text-xl transition-all duration-300 hover:rotate-90 hover:scale-110 hover:text-[#FFFAF0]"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="mt-8 flex flex-col gap-5">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              style={{
                transitionDelay: isMenuOpen ? `${index * 65}ms` : "0ms",
                fontFamily: "'Lora', serif",
              }}
              className={`group border-b border-[#FFD700]/10 pb-4 text-[#FFD700] font-lora text-base font-normal tracking-[0.5px] transition-all duration-500 hover:translate-x-1 hover:border-[#FFD700]/40 hover:text-[#FFFAF0] ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              }`}
            >
              <span className="relative">
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          ))}
        </nav>

        {/* Drawer Button */}
        <div className="">
          <Link
            to="/auth/signup"
            className={`group relative mt-8 block w-full overflow-hidden rounded-lg bg-[#FFD700] px-3 py-3 text-center text-[#080500] font-montserrat text-sm font-semibold uppercase tracking-[1px] transition-all duration-500 hover:-translate-y-[1px] hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.28)] cursor-pointer ${
              isMenuOpen
                ? "translate-y-0 opacity-100 delay-300"
                : "translate-y-3 opacity-0"
            }`}
            style={{
              fontFamily: "'Lora', serif",
            }}
          >
            <span className="relative z-10">SIGN UP</span>
            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </Link>
        </div>
      </aside>
    </>
  );
};
