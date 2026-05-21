/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaTimes,
  FaTrashAlt,
  FaUpload,
  FaFileAlt,
  FaCheckCircle,
} from "react-icons/fa";

import img1 from "../../../assets/Ebook cover.jpeg";
import img2 from "../../../assets/middlecard.jpeg";
import img3 from "../../../assets/Frame 33 (2).png";
import logomodal from "../../../assets/image.png";
import { Book2Svg, BookSvg } from "../../../lib/Svg";
import { useSubmitStoryMutation } from "../../../redux/Slices/storyApi";

type SubmitWorkFormValues = {
  firstName: string;
  email: string;
  bookTitle: string;
  aboutManuscript: string;
};

type UploadedFileItem = {
  id: string;
  file: File;
};

type LibraryApiItem = {
  id: number;
  image: string;
  tag: string | null;
  title: string;
  writer_name: string | null;
  short_description: string;
  description: string | null;
  button_text: string;
  button_link: string;
  color_code: string;
};

type LibrarySectionData = {
  title: string;
  subtitle: string;
  items: LibraryApiItem[];
};

type RoyalLibrarySectionProps = {
  library?: LibrarySectionData;
};

const fallbackImages = [img1, img2, img3];

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const addHexOpacity = (hex: string, opacityHex: string) => {
  if (!hex) return `#000000${opacityHex}`;

  const cleanHex = hex.trim();

  if (cleanHex.length === 7) {
    return `${cleanHex}${opacityHex}`;
  }

  return cleanHex;
};

const formatTag = (tag?: string | null) => {
  if (!tag) return null;

  return tag.replace(/_/g, " ").toUpperCase();
};

const getButtonTextColor = (colorCode: string) => {
  return colorCode.toLowerCase() === "#ffd700" ? "#080500" : "#ffffff";
};

export const RoyalLibrarySection = ({ library }: RoyalLibrarySectionProps) => {
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

  const handleLibraryButtonClick = (item: LibraryApiItem) => {
    if (item.button_text === "SUBMIT YOUR WORK") {
      openSubmitWorkModal();
      return;
    }

    if (item.button_text === "NOTIFY ME") {
      const section = document.getElementById("notify-me");

      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }

      return;
    }

    if (item.button_link && item.button_link !== "#") {
      window.location.href = item.button_link;
    }
  };

  const revealClass = isVisible
    ? "translate-y-0 opacity-100"
    : "translate-y-8 opacity-0";

  const libraryItems = library?.items || [];

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

            {library?.title || "THE ROYAL LIBRARY"}
          </h2>

          <p
            className={`mb-10 text-[#D4AF37] font-normal text-base leading-[150%] transition-all [font-feature-settings:'liga'_off,'clig'_off] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:mb-12 sm:text-xl ${revealClass}`}
            style={{
              fontFamily: "'Lora', serif",
              transitionDelay: isVisible ? "80ms" : "0ms",
            }}
          >
            {library?.subtitle || "Words that carry the weight of legacy"}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:flex-wrap xl:items-stretch xl:gap-10">
            {libraryItems.map((item, index) => {
              const colorCode = item.color_code || "#FFD700";
              const status = formatTag(item.tag);
              const isNotifyButton = item.button_text === "NOTIFY ME";
              const imageSrc =
                getCmsAssetUrl(item.image) || fallbackImages[index] || img1;

              const cardBorder = `1px solid ${addHexOpacity(colorCode, "4D")}`;
              const cardBg = `linear-gradient(180deg, ${addHexOpacity(
                colorCode,
                "1A",
              )} 0%, #00000000 100%)`;

              return (
                <div
                  key={item.id}
                  className={`group flex w-full max-w-[413px] flex-col overflow-hidden rounded-xl p-5 shadow-lg transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(255,215,0,0.12)] xl:min-h-[760px] xl:p-8 ${revealClass}`}
                  style={{
                    transitionDelay: isVisible
                      ? `${240 + index * 120}ms`
                      : "0ms",
                    borderRadius: "16px",
                    border: cardBorder,
                    background: cardBg,
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={imageSrc}
                      alt={item.title}
                      className="h-[460px] w-full rounded-t-xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] xl:h-[510px]"
                    />

                    {index === libraryItems.length - 1 && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{
                          background: `linear-gradient(174deg, ${addHexOpacity(
                            colorCode,
                            "33",
                          )} 4.45%, ${addHexOpacity(
                            colorCode,
                            "0D",
                          )} 95.55%)`,
                        }}
                      />
                    )}
                  </div>

                  <div className="mt-auto flex flex-1 flex-col items-start p-4 text-left xl:min-h-[250px] xl:justify-end">
                    {status && (
                      <button
                        type="button"
                        className="mb-4 rounded-full px-4 py-1 text-xs font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110"
                        style={{
                          fontFamily: "'Cinzel', serif",
                          backgroundColor: colorCode,
                          color: getButtonTextColor(colorCode),
                        }}
                      >
                        {status}
                      </button>
                    )}

                    <p
                      className="text-[#FFFAF0] text-[22px] font-normal leading-[140%] transition-colors duration-300 group-hover:text-[#FFD700] sm:text-2xl sm:leading-[150%]"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {item.title}
                    </p>

                    {item.writer_name && (
                      <p
                        className="mt-1 text-[#D4AF37] font-lora text-base font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#FFD700] [font-feature-settings:'liga'_off,'clig'_off]"
                        style={{
                          fontFamily: "'Lora', serif",
                          transitionDelay: isVisible ? "160ms" : "0ms",
                        }}
                      >
                        by {item.writer_name}
                      </p>
                    )}

                    <p
                      className="mt-2 text-[#FFFAF0] font-lora text-sm font-normal leading-[150%] transition-colors duration-300 group-hover:text-[#f8ead8] [font-feature-settings:'liga'_off,'clig'_off]"
                      style={{
                        fontFamily: "'Lora', serif",
                        transitionDelay: isVisible ? "240ms" : "0ms",
                      }}
                    >
                      {item.short_description}
                    </p>

                    <div className="w-full pt-4">
                      <button
                        type="button"
                        onClick={() => handleLibraryButtonClick(item)}
                        className="relative w-full cursor-pointer overflow-hidden rounded-md px-4 py-3 text-xs font-semibold shadow-md transition-all duration-300 hover:-translate-y-[1px] hover:brightness-110 hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)]"
                        style={{
                          backgroundColor: isNotifyButton
                            ? "transparent"
                            : colorCode,
                          color: isNotifyButton
                            ? colorCode
                            : getButtonTextColor(colorCode),
                          border: isNotifyButton
                            ? `1px solid ${colorCode}`
                            : "none",
                        }}
                      >
                        <span className="relative z-10">
                          {item.button_text}
                        </span>
                        <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-700 group-hover:left-full" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
      bookTitle: "",
      aboutManuscript: "",
    },
  });

  const validateAndAddFiles = (files: FileList | File[]) => {
    setFileError("");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxFileSize = 10 * 1024 * 1024;
    const fileArray = Array.from(files);
    const validFiles: UploadedFileItem[] = [];

    for (const file of fileArray) {
      if (!allowedTypes.includes(file.type)) {
        setFileError("Only PDF, DOC, and DOCX files are allowed.");
        return;
      }

      if (file.size > maxFileSize) {
        setFileError("Each file must be 10 MB or less.");
        return;
      }

      validFiles.push({
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? `${file.name}-${file.lastModified}-${crypto.randomUUID()}`
            : `${file.name}-${file.lastModified}-${Date.now()}`,
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

const [submitStory] = useSubmitStoryMutation();

const onSubmit = async (data: SubmitWorkFormValues) => {
  if (uploadedFiles.length === 0) {
    setFileError("Please upload at least one manuscript file.");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("name", data.firstName);
    formData.append("email", data.email);
    formData.append("book_title", data.bookTitle);
    formData.append("manuscript_about", data.aboutManuscript);

    uploadedFiles.forEach((item) => {
      formData.append("files[]", item.file);
    });

    const response = await submitStory(formData).unwrap();

    toast.success(response.message || "Your story has been submitted successfully.");
    reset();
    setUploadedFiles([]);
    setFileError("");

    window.setTimeout(() => {
      onClose();
    }, 700);
  } catch (error: any) {
    const message =
      error?.data?.message ||
      error?.message ||
      "Something went wrong.";
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
            Submit Your Story
          </h2>

          <p
            className="mx-auto mt-2 max-w-[420px] text-[10px] font-semibold leading-[150%] text-[#D4AF37] sm:text-[11px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Your story deserves a throne. Upload your manuscript and share your
            vision with us.
          </p>

          <div className="mx-auto my-3 h-px w-full max-w-[130px] bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />
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
            <label
              htmlFor="bookTitle"
              className="mb-1.5 block text-xs font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Book Title
            </label>

            <input
              id="bookTitle"
              type="text"
              placeholder="Enter your book title"
              {...register("bookTitle", {
                maxLength: {
                  value: 120,
                  message: "Book title cannot exceed 120 characters",
                },
              })}
              className={`h-[36px] w-full rounded-md border bg-[#6A0E69] px-3 text-xs text-[#FFFAF0] outline-none placeholder:text-[#CDBDCA] transition-all duration-300 focus:border-[#FFD700] ${
                errors.bookTitle ? "border-[#E0115F]" : "border-[#B8860B]/45"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            />

            {errors.bookTitle && (
              <p className="mt-1 text-[11px] text-[#FFD700]">
                {errors.bookTitle.message}
              </p>
            )}
          </div>

          <div className="mt-3">
            <label
              htmlFor="aboutManuscript"
              className="mb-1.5 block text-xs font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              About Your manuscript
            </label>

            <textarea
              id="aboutManuscript"
              placeholder="Tell us about manuscript"
              {...register("aboutManuscript", {
                maxLength: {
                  value: 1000,
                  message: "Message cannot exceed 1000 characters",
                },
              })}
              className={`min-h-[90px] w-full resize-none rounded-md border bg-[#6A0E69] px-3 py-3 text-xs text-[#FFFAF0] outline-none placeholder:text-[#CDBDCA] transition-all duration-300 focus:border-[#FFD700] ${
                errors.aboutManuscript
                  ? "border-[#E0115F]"
                  : "border-[#B8860B]/45"
              }`}
              style={{ fontFamily: "'Lora', serif" }}
            />

            {errors.aboutManuscript && (
              <p className="mt-1 text-[11px] text-[#FFD700]">
                {errors.aboutManuscript.message}
              </p>
            )}
          </div>

          <div className="mt-3 rounded-md border border-[#B8860B]/45 px-3 py-3">
            <p
              className="mb-2 text-xs font-semibold text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Upload File
            </p>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-[92px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-[#B8860B] bg-[#6A0E69]/40 px-4 py-3 text-center transition-all duration-300 hover:border-[#FFD700]"
            >
              <FaUpload className="mb-2 text-[26px] text-[#FFD700]" />

              <p
                className="text-xs text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Drag &amp; drop your file here
              </p>

              <p
                className="text-xs text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                or click to browse
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              <p
                className="mt-2 text-[9px] text-[#FFFAF0]/60"
                style={{ fontFamily: "'Lora', serif" }}
              >
                PDF, DOC, DOCX . Max 10 MB
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
                        onClick={(event) => {
                          event.stopPropagation();
                          handleRemoveFile(item.id);
                        }}
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
              {isSubmitting ? "Submitting..." : "Submit Your Work"}
            </span>

            <span className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-all duration-700 group-hover:left-full" />
          </button>

          <p
            className="mt-3 text-center text-[9px] leading-[150%] text-[#FFFAF0]/70 sm:text-[10px]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Your information is secure and confidential.
          </p>
        </form>
      </div>
    </div>
  );
};