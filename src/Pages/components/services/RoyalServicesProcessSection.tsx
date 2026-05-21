/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCrown, FaTimes } from "react-icons/fa";
import logo from "../../../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { useJoinExchangeMutation } from "../../../redux/Slices/storyApi";
import toast from "react-hot-toast";

type ContactServicesFormValues = {
  firstName: string;
  email: string;
  interests: string[];
};

type ServicesEngageSection = {
  title: string;
  subtitle: string;
  description: string;
  items: {
    title: string;
  }[];
};

type ServicesSubFooterSection = {
  title: string;
  subtitle: string;
  description: string;
  button_text: string;
  button_link: string;
};

type RoyalServicesProcessSectionProps = {
  engageSection?: ServicesEngageSection;
  subFooterSection?: ServicesSubFooterSection;
};

export const RoyalServicesProcessSection = ({
  engageSection,
  subFooterSection,
}: RoyalServicesProcessSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isPopupMounted, setIsPopupMounted] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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
        threshold: 0.16,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPopupMounted) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isPopupMounted]);

  if (!engageSection && !subFooterSection) {
    return null;
  }

  const openPopup = () => {
    setIsPopupMounted(true);

    window.setTimeout(() => {
      setIsPopupVisible(true);
    }, 20);
  };

  const closePopup = () => {
    setIsPopupVisible(false);

    window.setTimeout(() => {
      setIsPopupMounted(false);
    }, 300);
  };

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full overflow-hidden bg-[#4A0E4E] px-5 py-16 text-center sm:px-6 md:py-20 xl:px-8 xl:py-24"
      >
        <div className="mx-auto max-w-370">
          {/* Heading */}
          {engageSection && (
            <div
              className={`mx-auto max-w-305 transition-all duration-850 ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
              style={{ transitionDelay: isVisible ? "80ms" : "0ms" }}
            >
              <h2
                className="text-[42px] font-normal uppercase leading-[115%] tracking-[2px] text-[#FFD700] sm:text-[58px] md:text-[72px]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {engageSection.title}
              </h2>

              <p
                className="mt-8 text-lg font-normal leading-[150%] text-[#FFFAF0] sm:text-xl md:text-2xl"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {engageSection.subtitle}
              </p>

              <p
                className="mx-auto mt-8 max-w-[1180px] text-base font-normal leading-[160%] text-[#FFFAF0] sm:text-xl md:text-2xl"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {engageSection.description}
              </p>
            </div>
          )}

          {/* Steps */}
          {engageSection?.items?.length ? (
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 xl:mt-14 xl:gap-8">
              {engageSection.items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={`group flex min-h-[142px] flex-col items-center justify-center rounded-xl bg-[#250027] px-6 py-7 text-center shadow-[0_12px_34px_rgba(0,0,0,0.18)] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_18px_48px_rgba(255,215,0,0.12)] ${revealClass}`}
                  style={{
                    transitionDelay: isVisible
                      ? `${220 + index * 110}ms`
                      : "0ms",
                  }}
                >
                  <h3
                    className="mb-6 flex items-center justify-center gap-2 text-[22px] font-semibold leading-[120%] text-[#FFD700] transition-colors duration-300 group-hover:text-[#FFFAF0]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Step
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#FFD700] text-sm leading-none">
                      {index + 1}
                    </span>
                  </h3>

                  <p
                    className="max-w-[360px] text-sm font-normal leading-[150%] text-[#FFFAF0] transition-colors duration-300 group-hover:text-[#f8ead8] sm:text-base"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {/* CTA Box */}
          {subFooterSection && (
            <div
              className={`mt-12 rounded-[14px] border border-[#D4AF37]/40 px-5 py-8 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 md:py-9 xl:mt-14 ${revealClass}`}
              style={{ transitionDelay: isVisible ? "560ms" : "0ms" }}
            >
              <h3
                className="text-[28px] font-normal uppercase leading-[120%] tracking-[1.5px] text-[#FFD700] sm:text-[34px] md:text-[40px]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {subFooterSection.title}
              </h3>

              <p
                className="mx-auto mt-5 max-w-[1050px] text-sm font-normal leading-[160%] text-[#FFFAF0] sm:text-base md:text-lg"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {subFooterSection.description}
              </p>

              <button
                type="button"
                onClick={openPopup}
                className="group relative mt-6 cursor-pointer overflow-hidden rounded-md bg-[#FFD700] px-8 py-3 text-sm font-bold uppercase tracking-[3px] text-[#080500] shadow-[0_8px_28px_rgba(255,215,0,0.20)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#f5d87a] hover:shadow-[0_12px_36px_rgba(255,215,0,0.30)] sm:px-10 sm:text-base"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                <span className="relative z-10">
                  {subFooterSection.button_text}
                </span>

                <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-3">
                <FaCrown className="text-base text-[#FFFAF0]" />

                <p
                  className="text-sm font-normal leading-[150%] text-[#FFFAF0] sm:text-base"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {subFooterSection.subtitle}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {isPopupMounted && (
        <JoinExchangePopup isVisible={isPopupVisible} onClose={closePopup} />
      )}
    </>
  );
};

const JoinExchangePopup = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
    const [interestOptions, setInterestOptions] = useState<string[]>([]);
    const [joinExchange, { isLoading }] = useJoinExchangeMutation();



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactServicesFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      email: "",
      interests: [],
    },
  });

    useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/exchange/interests`
        );
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          setInterestOptions(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch interests:", error);
      }
    };

    fetchInterests();
  }, []);

const onSubmit = async (data: ContactServicesFormValues) => {
  setApiError("");
  setSuccessMessage("");

  try {
    const payload = {
      name: data.firstName,
      email: data.email,
      interested_in: data.interests,
    };

    const response = await joinExchange(payload).unwrap();

    if (response.success) {
      setSuccessMessage("Thank you. You have joined the exchange.");
      toast.success("Thank you. You have joined the exchange.");
      reset();
      onClose();
    } else {
      setApiError(response.message || "Failed to submit");
    }
  } catch (err: any) {
    setApiError(err?.data?.message || err.message || "Something went wrong");
  }
};
  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-[#4A0E4E]/60 backdrop-blur-sm px-4 py-8 transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={onClose}
    >
      <div
        className={`relative w-full max-w-[540px] rounded-[14px] bg-[#4F0D53] px-4 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-300 sm:px-5 sm:py-6 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-[#FFD700] transition-all duration-300 hover:rotate-90 hover:bg-[#FFD700] hover:text-[#080500]"
          aria-label="Close popup"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Logo */}
        <div className="mb-3 flex justify-center">
          <img
            src={logo}
            alt="Royal Exchange Logo"
            className="h-[58px] w-auto object-contain sm:h-[64px]"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2
            className="text-[22px] font-normal uppercase leading-[120%] text-[#FFD700] sm:text-[26px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Join The Exchange
          </h2>

          <div className="mx-auto my-3 h-px w-full max-w-[140px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />

          <p
            className="mx-auto max-w-[440px] text-[11px] font-normal leading-[150%] text-[#D4AF37] sm:text-xs"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Get early access to drops, book releases, and exclusive Royal
            Exchange updates. No spam only legacy.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              First Name<span className="text-[#E0115F]">*</span>
            </label>

            <input
              id="firstName"
              type="text"
              placeholder="Enter your name..."
              autoComplete="given-name"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
                maxLength: {
                  value: 40,
                  message: "First name cannot be more than 40 characters",
                },
              })}
              className={`h-[40px] w-full rounded-md border bg-[#6A0E69] px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#CDBDCA] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                errors.firstName ? "border-[#E0115F]" : "border-[#B8860B]/50"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            />

            {errors.firstName && (
              <p className="mt-1 text-xs text-[#FFD700]">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mt-4">
            <label
              htmlFor="popupEmail"
              className="mb-2 block text-sm font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Email Address <span className="text-[#E0115F]">*</span>
            </label>

            <input
              id="popupEmail"
              type="email"
              placeholder="you@gmail.com"
              autoComplete="email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              className={`h-[40px] w-full rounded-md border bg-[#6A0E69] px-3 text-sm text-[#FFFAF0] outline-none placeholder:text-[#CDBDCA] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                errors.email ? "border-[#E0115F]" : "border-[#B8860B]/50"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-[#FFD700]">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Interests */}
          <div className="mt-4">
            <p
              className="mb-3 text-sm font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              I am interested in :
            </p>

        <div className="space-y-3">
          {interestOptions.map((interest) => (
            <label
              key={interest}
              className="flex h-[40px] cursor-pointer items-center gap-3 rounded-md border border-[#B8860B]/45 bg-[#6A0E69] px-3 text-sm text-[#FFFAF0] transition-all duration-300 hover:border-[#FFD700] hover:bg-[#761179]"
            >
              <input
                type="checkbox"
                value={interest}
                {...register("interests", {
                  validate: (value) =>
                    value.length > 0 || "Please select at least one interest",
                })}
                className="h-4 w-4 cursor-pointer accent-[#FFD700]"
              />
              {interest}
            </label>
          ))}
        </div>

        {errors.interests && (
          <p className="mt-1 text-xs text-[#FFD700]">
            {errors.interests.message}
          </p>
        )}
      </div>

            {errors.interests && (
              <p className="mt-1 text-xs text-[#FFD700]">
                {errors.interests.message}
              </p>
            )}

          {/* API Messages */}
          {apiError && (
            <p className="mt-3 text-center text-xs text-[#E0115F]">
              {apiError}
            </p>
          )}

          {successMessage && (
            <p className="mt-3 text-center text-xs text-[#FFD700]">
              {successMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative mt-6 h-[46px] w-full overflow-hidden rounded-md bg-[#FFD700] text-sm font-medium uppercase tracking-[1px] text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="relative z-10">
              {isLoading ? "Submitting..." : "Enter The Exchange"}
            </span>

            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>

          <p
            className="mt-4 text-center text-[10px] leading-[150%] text-[#FFFAF0] sm:text-[11px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            By joining, you agree to our{" "}
            <a
              href="/privacy-policy"
              className="text-[#FFD700] transition-colors hover:text-[#FFFAF0]"
            >
              Privacy Policy
            </a>
            . Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
};