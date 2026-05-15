/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTimes, FaTrashAlt, FaUpload, FaFileAlt, FaCheckCircle } from "react-icons/fa";

import img1 from "../../../assets/Ebook cover.jpeg";
import img2 from "../../../assets/middlecard.jpeg";
import img3 from "../../../assets/Frame 33 (2).png";
import logomodal from "../../../assets/image.png"
import { Book2Svg, BookSvg } from "../../../lib/Svg";

type SubmitWorkFormValues = {
  firstName: string;
  email: string;
  interests: string[];
};

type UploadedFileItem = {
  id: string;
  file: File;
};

const interestOptions = [
  "Clothing Drops",
  "Publishing",
  "Book Releases",
  "Everything",
];

const libraryData = [
  {
    image: img1,
    title: "NO SENSE OF SECURITY",
    subtitle: "by Julius Spenser",
    description:
      "A powerful narrative exploring human vulnerability and ancestral truth.",
    buttonText: "GET YOUR COPY",
    buttonBg: "#FFD700",
    buttonTextColor: "#080500",
    status: "AVAILABLE NOW",
    statusBg: "#FFD700",
    statusTextColor: "#080500",

    cardBorder: "1px solid rgba(255, 215, 0, 0.30)",
    cardBg:
      "linear-gradient(180deg, rgba(255, 215, 0, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
  },
  {
    image: img2,
    title: "THE YACHT KLUB",
    subtitle: "by Julius Spenser",
    description:
      "The next chapter in the Royal Exchange legacy. A journey into power, purpose, and inheritance.",
    buttonText: "NOTIFY ME",
    buttonBg: "transparent",
    border: "1px solid #0F52BA",
    buttonTextColor: "#0F52BA",
    status: "COMING SOON",
    statusBg: "#0F52BA",
    statusTextColor: "#ffffff",

    cardBorder: "1px solid rgba(15, 82, 186, 0.30)",
    cardBg:
      "linear-gradient(180deg, rgba(15, 82, 186, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
  },
  {
    image: img3,
    title: "YOUR STORY DESERVES A THRONE",
    subtitle: "",
    description:
      "Are you an author with a message that honors our lineage? We are accepting manuscripts.",
    buttonText: "SUBMIT YOUR WORK",
    buttonBg: "#E0115F",
    buttonTextColor: "#ffffff",
    status: null,
    statusBg: "#E0115F",
    statusTextColor: "#ffffff",

    cardBorder: "1px solid rgba(224, 17, 95, 0.30)",
    cardBg:
      "linear-gradient(180deg, rgba(224, 17, 95, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)",
  },
];

export const RoyalLibrarySection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isModalMounted, setIsModalMounted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        rootMargin: "0px 0px -90px 0px",
      },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isModalMounted) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSubmitWorkModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalMounted]);

  const openSubmitWorkModal = () => {
    setIsModalMounted(true);

    window.setTimeout(() => {
      setIsModalVisible(true);
    }, 20);
  };

  const closeSubmitWorkModal = () => {
    setIsModalVisible(false);

    window.setTimeout(() => {
      setIsModalMounted(false);
    }, 300);
  };

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  return (
    <>
      <section
        id="books"
        ref={sectionRef}
        className="w-full bg-[#020202] px-5 py-12 text-center sm:px-6 sm:py-16 xl:px-8 xl:py-20"
      >
        <div className="mx-auto max-w-[1480px]">
          <h2
            className={`mb-4 flex items-center justify-center gap-3 text-[#ffffff] font-cinzel text-base leading-[120%] transition-all duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] xs:text-[24px] sm:text-5xl lg:text-6xl ${revealClass}`}
            style={{
              fontFamily: "'Cinzel', serif",
              transitionDelay: isVisible ? "80ms" : "0ms",
            }}
          >
            <span className="hidden sm:block">
              <BookSvg />
            </span>

            <span className="block sm:hidden">
              <Book2Svg />
            </span>

            THE ROYAL LIBRARY
          </h2>

          <p
            className={`mb-10 text-[#D4AF37] font-normal text-base leading-[150%] transition-all [font-feature-settings:'liga'_off,'clig'_off] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mb-12 sm:text-xl ${revealClass}`}
            style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "80ms" : "0ms",
            }}
          >
            Words that carry the weight of legacy
          </p>

          {/* Card Container */}
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:flex-wrap xl:items-stretch xl:gap-10">
            {libraryData.map((item, index) => (
              <div
                key={index}
                className={`group flex w-full max-w-[413px] flex-col overflow-hidden rounded-xl p-5 shadow-lg transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(255,215,0,0.12)] xl:min-h-[760px] xl:p-8 ${revealClass}`}
                style={{
                  transitionDelay: isVisible ? `${240 + index * 120}ms` : "0ms",
                  borderRadius: "16px",
                  border: item.cardBorder,
                  background: item.cardBg,
                }}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-[460px] w-full rounded-t-xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] xl:h-[510px]"
                  />

                  {index === libraryData.length - 1 && (
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(174deg,rgba(224,17,95,0.20)_4.45%,rgba(224,17,95,0.05)_95.55%)]" />
                  )}
                </div>

                {/* Bottom aligned content on XL */}
                <div className="mt-auto flex flex-1 flex-col items-start p-4 text-left xl:min-h-[250px] xl:justify-end">
                  {item.status && (
                    <button
                      type="button"
                      className="mb-4 rounded-full px-4 py-1 text-xs font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        backgroundColor: item.statusBg,
                        color: item.statusTextColor,
                      }}
                    >
                      {item.status}
                    </button>
                  )}

                  <p
                    className="text-[#FFFAF0] text-[22px] font-normal leading-[140%] transition-colors duration-300 group-hover:text-[#FFD700] sm:text-2xl sm:leading-[150%]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item.title}
                  </p>

                  {item.subtitle && (
                    <p
                      className="mt-1 text-[#D4AF37] font-lora text-base font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#FFD700] [font-feature-settings:'liga'_off,'clig'_off]"
                      style={{
                        fontFamily: "'Lora', serif",
                        transitionDelay: isVisible ? "160ms" : "0ms",
                      }}
                    >
                      {item.subtitle}
                    </p>
                  )}

                  <p
                    className="mt-2 text-[#FFFAF0] font-lora text-sm font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#f8ead8] [font-feature-settings:'liga'_off,'clig'_off]"
                    style={{
                      fontFamily: "'Lora', serif",
                      transitionDelay: isVisible ? "240ms" : "0ms",
                    }}
                  >
                    {item.description}
                  </p>

                  <div className="w-full pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.buttonText === "SUBMIT YOUR WORK") {
                          openSubmitWorkModal();
                        }
                      }}
                      className="relative w-full cursor-pointer overflow-hidden rounded-md px-4 py-3 text-xs font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)]"
                      style={{
                        backgroundColor: item.buttonBg,
                        color: item.buttonTextColor,
                        border: item.border || "none",
                      }}
                    >
                      <span className="relative z-10">{item.buttonText}</span>
                      <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-full" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalMounted && (
        <SubmitWorkModal
          isVisible={isModalVisible}
          onClose={closeSubmitWorkModal}
        />
      )}
    </>
  );
};

const SubmitWorkModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([]);
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmitWorkFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      email: "",
      interests: [],
    },
  });

  const validateAndAddFiles = (files: FileList | File[]) => {
    setFileError("");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxFileSize = 5 * 1024 * 1024;
    const fileArray = Array.from(files);
    const validFiles: UploadedFileItem[] = [];

    for (const file of fileArray) {
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }

      if (file.size > maxFileSize) {
        setFileError("Each file must be 5 MB or less.");
        return;
      }

      validFiles.push({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        file,
      });
    }

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    validateAndAddFiles(files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    if (!files) return;

    validateAndAddFiles(files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const onSubmit = async (data: SubmitWorkFormValues) => {
    if (uploadedFiles.length === 0) {
      setFileError("Please upload at least one manuscript file.");
      return;
    }

    try {
      const payload = {
        ...data,
        files: uploadedFiles.map((item) => item.file),
      };

      console.log("Submit work payload:", payload);

      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Your work has been submitted successfully.");
      reset();
      setUploadedFiles([]);
      setFileError("");

      window.setTimeout(() => {
        onClose();
      }, 700);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={onClose}
    >
      <div
        className={`relative w-full max-w-[500px] rounded-[12px] bg-[#4F0D53] px-4 py-4 shadow-[0_24px_90px_rgba(0,0,0,0.55)] transition-all duration-300 sm:px-5 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#FFD700] transition-all duration-300 hover:rotate-90 hover:bg-[#FFD700] hover:text-[#080500]"
          aria-label="Close popup"
        >
          <FaTimes className="text-xs" />
        </button>

        <div className="mb-2 flex justify-center">
          <img
            src={logomodal}
            alt="Royal Exchange Logo"
            className="h-[46px] w-auto object-contain sm:h-[52px]"
          />
        </div>

        <div className="text-center">
          <h2
            className="text-[20px] font-normal uppercase leading-[120%] text-[#FFD700] sm:text-[24px]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Join The Exchange
          </h2>

          <div className="mx-auto my-2.5 h-px w-full max-w-[130px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />

          <p
            className="mx-auto max-w-[420px] text-[10px] font-normal leading-[150%] text-[#D4AF37] sm:text-[11px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Get early access to drops, book releases, and exclusive Royal
            Exchange updates. No spam only legacy.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1.5 block text-xs font-semibold text-[#FFFAF0]"
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
              })}
              className={`h-[36px] w-full rounded-md border bg-[#6A0E69] px-3 text-xs text-[#FFFAF0] outline-none placeholder:text-[#CDBDCA] transition-all duration-300 focus:border-[#FFD700] ${
                errors.firstName ? "border-[#E0115F]" : "border-[#B8860B]/45"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            />

            {errors.firstName && (
              <p className="mt-1 text-[11px] text-[#FFD700]">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <label
              htmlFor="submitWorkEmail"
              className="mb-1.5 block text-xs font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Email Address <span className="text-[#E0115F]">*</span>
            </label>

            <input
              id="submitWorkEmail"
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
              className={`h-[36px] w-full rounded-md border bg-[#6A0E69] px-3 text-xs text-[#FFFAF0] outline-none placeholder:text-[#CDBDCA] transition-all duration-300 focus:border-[#FFD700] ${
                errors.email ? "border-[#E0115F]" : "border-[#B8860B]/45"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            />

            {errors.email && (
              <p className="mt-1 text-[11px] text-[#FFD700]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <p
              className="mb-2 text-xs font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              I am interested in :
            </p>

            <div className="space-y-2">
              {interestOptions.map((interest) => (
                <label
                  key={interest}
                  className="flex h-[34px] cursor-pointer items-center gap-2 rounded-md border border-[#B8860B]/45 bg-[#6A0E69] px-3 text-xs text-[#FFFAF0] transition-all duration-300 hover:border-[#FFD700]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  <input
                    type="checkbox"
                    value={interest}
                    {...register("interests", {
                      validate: (value) =>
                        value.length > 0 ||
                        "Please select at least one interest",
                    })}
                    className="h-3.5 w-3.5 cursor-pointer accent-[#FFD700]"
                  />

                  {interest}
                </label>
              ))}
            </div>

            {errors.interests && (
              <p className="mt-1 text-[11px] text-[#FFD700]">
                {errors.interests.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <p
              className="mb-2 text-xs font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Upload File
            </p>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="flex min-h-[82px] flex-col items-center justify-center rounded-md border border-dashed border-[#B8860B] bg-[#6A0E69]/40 px-4 py-3 text-center transition-all duration-300 hover:border-[#FFD700]"
            >
              <p
                className="text-[11px] text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Drop your file here
              </p>

              <p
                className="my-0.5 text-[10px] text-[#FFFAF0]/70"
                style={{ fontFamily: "'Lora', serif" }}
              >
                or
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-7 cursor-pointer items-center gap-2 rounded border border-[#B8860B]/50 px-4 text-[11px] text-[#FFFAF0] transition-all duration-300 hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#080500]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                <FaUpload className="text-[10px]" />
                Browse
              </button>

              <p
                className="mt-2 text-[9px] text-[#FFFAF0]/60"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Files must be pdf or doc within max size of 5 MB
              </p>
            </div>

            {fileError && (
              <p
                className="mt-1.5 text-[11px] text-[#FFD700]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {fileError}
              </p>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mt-2 space-y-1.5">
                {uploadedFiles.map((item) => (
                  <div
                    key={item.id}
                    className="flex h-8 items-center justify-between rounded-md border border-[#B8860B]/40 bg-[#6A0E69] px-3"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <FaFileAlt className="shrink-0 text-[10px] text-[#FFD700]" />

                      <p
                        className="truncate text-[11px] text-[#FFFAF0]"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {item.file.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-[10px] text-[#FFD700]" />

                      <button
                        type="button"
                        onClick={() => handleRemoveFile(item.id)}
                        className="cursor-pointer text-[#E0115F] transition-colors duration-300 hover:text-[#FFD700]"
                        aria-label="Remove file"
                      >
                        <FaTrashAlt className="text-[10px]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative mt-4 h-[40px] w-full cursor-pointer overflow-hidden rounded-md bg-[#FFD700] text-xs font-medium uppercase tracking-[0.8px] text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="relative z-10">
              {isSubmitting ? "Submitting..." : "Enter The Exchange"}
            </span>

            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>

          <p
            className="mt-3 text-center text-[9px] leading-[150%] text-[#FFFAF0] sm:text-[10px]"
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