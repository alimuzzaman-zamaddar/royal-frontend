/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTimes, FaEnvelope } from "react-icons/fa";
import logo from "../../../assets/lineage/6DF99710-9C58-4B44-8A31-20FDC393A953 3.png";
import { useSubscribeNewsletterMutation } from "../../../redux/Slices/storyApi";
import toast from "react-hot-toast";

type NewsletterFormValues = {
  email: string;
};

export const NewsletterPopup = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<NewsletterFormValues>({
      mode: "onBlur",
      defaultValues: { email: "" },
    });

  const [subscribeNewsletter, { isLoading }] = useSubscribeNewsletterMutation();

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("royal_newsletter_popup_seen");
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 20);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMounted]);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem("royal_newsletter_popup_seen", "true");
    setTimeout(() => setIsMounted(false), 300);
  };

  const onSubmit = async (data: NewsletterFormValues) => {
    setApiError("");
    setSuccessMessage("");

    try {
      const result = await subscribeNewsletter({ email: data.email }).unwrap();

      // Only display the message returned from API
      setSuccessMessage(result.message);

      if (result.success) reset();
      closePopup();

    } catch (error: any) {
      if (error.data?.message) {
        setApiError(error.data.message);
      } else {
        setApiError("Something went wrong.");
      }
    }
  };

  // Show toast notifications
  useEffect(() => {
    if (successMessage) toast.success(successMessage, { style: { borderRadius: "10px" } });
  }, [successMessage]);

  useEffect(() => {
    if (apiError) toast.error(apiError, { style: { borderRadius: "10px" } });
  }, [apiError]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={closePopup}
    >
      <div
        className={`relative w-full max-w-[520px] rounded-[20px] border border-[#FFD700]/40 bg-[rgba(75,15,78,0.92)] px-5 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all duration-300 sm:px-8 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#FFD700]/35 text-[#FFD700] transition-all duration-300 hover:rotate-90 hover:bg-[#FFD700] hover:text-[#080500]"
        >
          <FaTimes className="text-sm" />
        </button>

        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <img src={logo} alt="Royal Exchange Logo" className="h-[82px] w-auto object-contain sm:h-[95px]" />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[30px] font-normal uppercase leading-[115%] tracking-[1.5px] text-[#FFD700] sm:text-[40px]" style={{ fontFamily: "'Cinzel', serif" }}>
            Join The Kingdom
          </h2>

          <div className="mx-auto my-5 h-px w-full max-w-[190px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />

          <p className="mx-auto max-w-[430px] text-sm font-normal leading-[160%] text-[#FFFAF0] sm:text-base" style={{ fontFamily: "'Lora', serif" }}>
            Subscribe to receive Royal Exchange updates, book releases, service announcements, and exclusive legacy drops.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7">
          <label htmlFor="newsletterEmail" className="mb-3 block text-base font-semibold text-[#FFFAF0]" style={{ fontFamily: "'Lora', serif" }}>
            Email Address <span className="text-[#E0115F]">*</span>
          </label>

          <div className="relative">
            <input
              id="newsletterEmail"
              type="email"
              placeholder="you@gmail.com"
              autoComplete="email"
              {...register("email", {
                required: "Email address is required",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Please enter a valid email address" },
              })}
              className={`h-[52px] w-full rounded-lg border bg-[#6A0E69] px-4 pr-12 text-base text-[#FFFAF0] outline-none placeholder:text-[#BFA7C0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${errors.email ? "border-[#E0115F]" : "border-[#B8860B]/40"}`}
              style={{ fontFamily: "'Lora', serif" }}
            />
            <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BFA7C0]" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="group relative mt-6 h-[54px] w-full overflow-hidden rounded-lg bg-[#FFD700] text-base font-semibold uppercase tracking-[1.5px] text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span className="relative z-10">{isSubmitting || isLoading ? "Subscribing..." : "Subscribe Newsletter"}</span>
            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>

          <button type="button" onClick={closePopup} className="mt-5 w-full text-center text-sm text-[#CDBDCA] transition-colors hover:text-[#FFD700]" style={{ fontFamily: "'Lora', serif" }}>
            Maybe later
          </button>
        </form>
      </div>
    </div>
  );
};