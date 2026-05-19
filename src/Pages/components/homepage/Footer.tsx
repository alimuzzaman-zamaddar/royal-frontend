/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { useGetHomeCmsQuery } from "../../../redux/Slices/cmsApi";
import { Loader } from "../../../lib/Loader";

type NewsletterFormValues = {
  email: string;
};

type SocialMediaItem = {
  id: number;
  social_media: string;
  profile_link: string;
};

type FooterSettings = {
  id: number;
  system_name: string;
  email: string;
  copyright_text: string;
  description: string;
  logo: string | null;
  favicon: string | null;
  tax: number;
  shipping_fee: number;
  minimum_order: number;
  deleted_at: string | null;
};

type FooterSectionData = {
  image: string;
  items: {
    social_media: SocialMediaItem[];
    settings: FooterSettings;
  };
};

const navigateLinks = [
  {
    label: "Lineage",
    href: "/lineage",
  },
  {
    label: "Books",
    href: "/book",
  },
  {
    label: "Royal Exchange",
    href: "/royal-exchange",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const serviceLinks = [
  {
    label: "Book Editing",
    href: "/services#book",
  },
  {
    label: "Formatting",
    href: "/services#formatting",
  },
  {
    label: "Web Design",
    href: "/services#web-design",
  },
  {
    label: "Publishing",
    href: "/services#publishing",
  },
];

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const getSocialIcon = (socialMedia: string) => {
  const name = socialMedia.toLowerCase();

  if (name.includes("instagram")) return FaInstagram;
  if (name.includes("facebook")) return FaFacebookF;
  if (name.includes("twitter") || name.includes("x")) return FaTwitter;
  if (name.includes("email") || name.includes("mail")) return FaEnvelope;

  return FaEnvelope;
};

const getSocialHref = (item: SocialMediaItem) => {
  const name = item.social_media.toLowerCase();

  if (name.includes("email") || name.includes("mail")) {
    return item.profile_link.startsWith("mailto:")
      ? item.profile_link
      : `mailto:${item.profile_link}`;
  }

  return item.profile_link;
};

export const Footer = () => {
  const { data, isLoading, isError, error } = useGetHomeCmsQuery();

  const footerSection = data?.data?.footer_section as
    | FooterSectionData
    | undefined;

  const footerSettings = footerSection?.items?.settings;
  const socialMedia = footerSection?.items?.social_media || [];
  const footerLogo = getCmsAssetUrl(footerSection?.image);

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

  const onNewsletterSubmit = async (data: NewsletterFormValues) => {
    try {
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

  if (isLoading) {
    return <Loader title="Loading Footer..." />;
  }

  if (isError) {
    console.log("Footer CMS error:", error);

    return (
      <div className="flex min-h-[260px] items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load footer content.
      </div>
    );
  }

  if (!footerSection || !footerSettings) {
    return null;
  }

  return (
    <footer
      id="notify-me"
      className="relative w-full overflow-hidden bg-[#020202] px-5 py-14 sm:px-6 lg:py-16"
    >
      {/* Soft Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFD700]/[0.06] opacity-100 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[360px] sm:max-w-[520px] xl:max-w-[1480px]">
        <div className="flex flex-wrap justify-center gap-y-8 xl:flex-nowrap xl:justify-between xl:gap-x-16">
          {/* Brand */}
          <div className="flex w-full flex-col items-center text-center xl:w-[28%] xl:items-start xl:text-left">
            {footerLogo && (
              <img
                src={footerLogo}
                alt={footerSettings.system_name}
                className="mb-4 w-auto object-contain transition-all duration-500 hover:scale-[1.03] hover:drop-shadow-[0_0_18px_rgba(255,215,0,0.35)] xl:mb-6"
              />
            )}
          </div>

          {/* Navigate */}
          <div className="w-1/3 pr-4 text-left xl:w-[18%] xl:pr-0">
            <h3
              className="mb-4 text-base font-normal uppercase leading-[150%] text-[#FFD700] xl:mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              NAVIGATE
            </h3>

            <ul className="space-y-2 xl:space-y-3">
              {navigateLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group relative inline-block text-xs font-normal leading-[150%] text-[#B8B0A4] transition-all duration-300 hover:translate-x-1 hover:text-[#FFD700] xl:text-sm"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="w-1/3 pl-4 text-left xl:w-[18%] xl:pl-0">
            <h3
              className="mb-4 text-base font-normal uppercase leading-[150%] text-[#FFD700] xl:mb-5"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              SERVICES
            </h3>

            <ul className="space-y-2 xl:space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group relative inline-block text-xs font-normal leading-[150%] text-[#B8B0A4] transition-all duration-300 hover:translate-x-1 hover:text-[#FFD700] xl:text-sm"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="flex w-full flex-col items-center text-center xl:w-[24%] xl:items-start xl:text-left">
            <p
              className="order-1 mb-3 text-base font-semibold text-[#FFD700] xl:order-3 xl:mb-3 xl:text-sm"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Newsletter
            </p>

            <form
              onSubmit={handleSubmit(onNewsletterSubmit)}
              noValidate
              className="order-2 w-full max-w-[292px] xl:order-4 xl:max-w-[300px]"
            >
              <input
                type="email"
                placeholder="Your email"
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
                  {isSubmitting ? "JOINING..." : "JOIN THE KINGDOM"}
                </span>

                <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
              </button>
            </form>

            <h3
              className="order-3 mt-6 mb-5 text-xl font-normal uppercase leading-[150%] text-[#FFD700] xl:order-1 xl:mt-0 xl:mb-4 xl:text-base"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              CONNECT
            </h3>

            <div className="order-4 flex justify-center gap-5 xl:order-2 xl:mb-4 xl:justify-start xl:gap-3">
              {socialMedia.map((social) => {
                const Icon = getSocialIcon(social.social_media);

                return (
                  <a
                    key={social.id}
                    href={getSocialHref(social)}
                    target={
                      social.social_media.toLowerCase().includes("email")
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      social.social_media.toLowerCase().includes("email")
                        ? undefined
                        : "noreferrer"
                    }
                    aria-label={social.social_media}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD700]/20 bg-[#FFD700]/15 text-[#FFD700] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-[#FFD700]/60 hover:bg-[#FFD700] hover:text-[#080500] hover:shadow-[0_8px_22px_rgba(255,215,0,0.18)] xl:h-8 xl:w-8"
                  >
                    <Icon className="text-base xl:text-sm" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 h-[1px] w-full origin-center scale-x-100 bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent opacity-100" />

        <div className="pt-8 text-center">
          <p
            className="text-xs font-normal leading-[150%] text-[#8D8277]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {footerSettings.copyright_text}
          </p>

          <p
            className="mt-2 text-xs font-normal leading-[150%] text-[#A58B00] transition-colors duration-300 hover:text-[#FFD700]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {footerSettings.description}
          </p>
        </div>
      </div>
    </footer>
  );
};