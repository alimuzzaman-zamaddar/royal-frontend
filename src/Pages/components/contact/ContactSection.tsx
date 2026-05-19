/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSubmitContactMutation } from "../../../redux/Slices/contactApi";


type ContactFormValues = {
  fullName: string;
  email: string;
  message: string;
};

type ContactInfoItem = {
  title: string;
  icon: string;
  subtitle: string;
};

type ContactSectionData = {
  title: string;
  items: ContactInfoItem[];
};

type ContactSectionProps = {
  contactSection?: ContactSectionData;
};

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

export const ContactSection = ({ contactSection }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [submitContact] = useSubmitContactMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      message: "",
    },
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
        rootMargin: "0px 0px -80px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  if (!contactSection || !contactSection.items?.length) {
    return null;
  }

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitted(false);

    try {
      const response = await submitContact({
        name: data.fullName,
        email: data.email,
        message: data.message,
      }).unwrap();

      toast.success(response?.message || "Your message has been sent.");
      setIsSubmitted(true);
      reset();
    } catch (error: any) {
      const errorMessage =
        error?.data?.message ||
        error?.data?.error ||
        "Failed to send message. Please try again.";

      toast.error(errorMessage);
    }
  };

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full overflow-hidden bg-[#4A0E4E] px-4 py-14 sm:px-6 sm:py-16 md:py-20 xl:px-8 xl:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-20">
        {/* LEFT CONTACT INFO */}
        <div
          className={`w-full max-w-[520px] text-center transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:text-left ${revealClass}`}
          style={{
            transitionDelay: isVisible ? "100ms" : "0ms",
          }}
        >
          <h2
            className="mb-8 text-center text-[28px] font-bold leading-[120%] text-[#FFFAF0] sm:text-[32px] md:text-[38px] lg:mb-10 lg:text-left"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {contactSection.title}
          </h2>

          <div className="mx-auto max-w-[390px] space-y-8 sm:space-y-10 lg:mx-0 lg:max-w-none">
            {contactSection.items.map((item, index) => {
              const iconSrc = getCmsAssetUrl(item.icon);

              return (
                <div
                  key={`${item.title}-${index}`}
                  className={`flex items-center justify-start gap-4 transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${revealClass}`}
                  style={{
                    transitionDelay: isVisible
                      ? `${220 + index * 120}ms`
                      : "0ms",
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#D4A800] text-[#020202] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)]">
                    <img
                      src={iconSrc}
                      alt={item.title}
                      className="h-5 w-5 object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-left text-[16px] font-normal leading-[120%] text-[#FFFAF0] md:text-[18px]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="mt-2 break-words text-left text-sm font-normal leading-[150%] text-[#a8a8a8] sm:text-base"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div
          className={`w-full max-w-[1000px] rounded-[18px] bg-[#6A2A6A]/70 px-4 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 sm:py-6 lg:px-7 ${revealClass}`}
          style={{
            transitionDelay: isVisible ? "240ms" : "0ms",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-left text-base font-normal text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  placeholder="Your Full Name"
                  autoComplete="name"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 60,
                      message: "Full name cannot be more than 60 characters",
                    },
                  })}
                  className={`h-11 w-full rounded-md border bg-[#8B5A87]/70 px-4 text-sm text-[#FFFAF0] outline-none placeholder:text-[#FFFAF0]/85 transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-10 sm:px-5 ${
                    errors.fullName
                      ? "border-[#E0115F]"
                      : "border-[#C9A6C8]/50"
                  }`}
                  style={{ fontFamily: "'Lora', serif" }}
                />

                {errors.fullName && (
                  <p className="mt-2 text-left text-xs text-[#FFD700]">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-left text-base font-normal text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Your@gmail.com"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email address is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className={`h-11 w-full rounded-md border bg-[#8B5A87]/70 px-4 text-sm text-[#FFFAF0] outline-none placeholder:text-[#FFFAF0]/85 transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:h-10 sm:px-5 ${
                    errors.email
                      ? "border-[#E0115F]"
                      : "border-[#C9A6C8]/50"
                  }`}
                  style={{ fontFamily: "'Lora', serif" }}
                />

                {errors.email && (
                  <p className="mt-2 text-left text-xs text-[#FFD700]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2 block text-left text-base font-normal text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Message
              </label>

              <textarea
                id="message"
                placeholder="Tell us how can we help you...."
                rows={5}
                {...register("message", {
                  required: "Message is required",
                  minLength: {
                    value: 10,
                    message: "Message must be at least 10 characters",
                  },
                  maxLength: {
                    value: 500,
                    message: "Message cannot be more than 500 characters",
                  },
                })}
                className={`w-full resize-none rounded-md border bg-[#8B5A87]/70 px-4 py-4 text-sm text-[#FFFAF0] outline-none placeholder:text-[#FFFAF0]/85 transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] sm:px-5 ${
                  errors.message
                    ? "border-[#E0115F]"
                    : "border-[#C9A6C8]/50"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              {errors.message && (
                <p className="mt-2 text-left text-xs text-[#FFD700]">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-4 h-11 w-full overflow-hidden rounded-lg border border-[#C9A6C8]/50 bg-black/0 text-center text-base font-normal text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#250027] hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)] disabled:cursor-not-allowed disabled:opacity-70 sm:h-10"
              style={{ fontFamily: "'Lora', serif" }}
            >
              <span className="relative z-10">
                {isSubmitting ? "Sending..." : "Send message"}
              </span>

              <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
            </button>

            {isSubmitted && (
              <p
                className="mt-4 text-center text-sm text-[#FFD700]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Thank you. Your message has been received.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};