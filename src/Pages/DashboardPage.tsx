/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaRegUser,
  FaShoppingCart,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaPencilAlt,
} from "react-icons/fa";

import avatarImg from "../assets/images (3).jpg";
import { MyOrders } from "./Dashboard/components/MyOrders";
import { OrderHistoryTab } from "./Dashboard/components/OrderHistoryTab";
import { SettingsTab } from "./Dashboard/components/SettingsTab";
import { LogoutTab } from "./Dashboard/components/LogoutTab";

type TabKey = "personal" | "orders" | "history" | "settings" | "logout";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
};

const dashboardTabs = [
  {
    id: "personal",
    label: "Personal Information",
    icon: FaRegUser,
  },
  {
    id: "orders",
    label: "My Orders",
    icon: FaShoppingCart,
  },
  {
    id: "history",
    label: "Order History",
    icon: FaHistory,
  },
  {
    id: "settings",
    label: "Setting",
    icon: FaCog,
  },
  {
    id: "logout",
    label: "Logout",
    icon: FaSignOutAlt,
  },
] as const;

export const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [isSaved, setIsSaved] = useState(false);

  // Replace this with real user profile image from API when available
const userProfileImage = "";

const fileInputRef = useRef<HTMLInputElement | null>(null);

const [profileImagePreview, setProfileImagePreview] = useState(
  userProfileImage || avatarImg,
);

// const [selectedProfileFile, setSelectedProfileFile] = useState<File | null>(
//   null,
// );

useEffect(() => {
  return () => {
    if (profileImagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(profileImagePreview);
    }
  };
}, [profileImagePreview]);

const handleProfileImageClick = () => {
  fileInputRef.current?.click();
};

const handleProfileImageChange = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    console.log("Please upload a valid image file.");
    return;
  }

  const previewUrl = URL.createObjectURL(file);

  // setSelectedProfileFile(file);
  setProfileImagePreview(previewUrl);
};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    mode: "onBlur",
    defaultValues: {
      firstName: "John",
      lastName: "Dey",
      email: "your@email.com",
      phone: "+1 5566 55552",
      gender: "Male",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSaved(false);

    console.log("Profile updated:", data);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsSaved(true);
  };

  const renderTabContent = () => {
    if (activeTab === "personal") {
      return (
        <form className="border border-[#FFD700]/30 p-6 rounded-xl" onSubmit={handleSubmit(onSubmit)} noValidate>
<div className="relative mb-9 h-[92px] w-[92px]">
  <img
    src={profileImagePreview}
    alt="User avatar"
    className="h-[92px] w-[92px] rounded-full object-cover"
  />

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    onChange={handleProfileImageChange}
    className="hidden"
  />

  <button
    type="button"
    onClick={handleProfileImageClick}
    className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#FFFAF0] bg-[#003D21] text-[#FFFAF0] transition-all duration-300 hover:scale-105 hover:bg-[#005C32]"
    aria-label="Edit profile image"
  >
    <FaPencilAlt className="text-sm" />
  </button>
</div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-4 block text-lg font-normal leading-[120%] text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                First Name<span className="text-[#E0115F]">*</span>
              </label>

              <input
                id="firstName"
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 40,
                    message: "First name cannot exceed 40 characters",
                  },
                })}
                className={`h-12 w-full rounded-md border bg-[#6A0E69] px-4 text-base text-[#FFFAF0] outline-none transition-all duration-300 placeholder:text-[#FFFAF0]/70 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.firstName
                    ? "border-[#E0115F]"
                    : "border-transparent"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              {errors.firstName && (
                <p className="mt-2 text-sm text-[#FFD700]">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-4 block text-lg font-normal leading-[120%] text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Last Name<span className="text-[#E0115F]">*</span>
              </label>

              <input
                id="lastName"
                type="text"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 40,
                    message: "Last name cannot exceed 40 characters",
                  },
                })}
                className={`h-12 w-full rounded-md border bg-[#6A0E69] px-4 text-base text-[#FFFAF0] outline-none transition-all duration-300 placeholder:text-[#FFFAF0]/70 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.lastName
                    ? "border-[#E0115F]"
                    : "border-transparent"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              {errors.lastName && (
                <p className="mt-2 text-sm text-[#FFD700]">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-4 block text-lg font-normal leading-[120%] text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Email Address <span className="text-[#E0115F]">*</span>
              </label>

              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`h-12 w-full rounded-md border bg-[#6A0E69] px-4 text-base text-[#FFFAF0] outline-none transition-all duration-300 placeholder:text-[#FFFAF0]/70 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.email ? "border-[#E0115F]" : "border-transparent"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              {errors.email && (
                <p className="mt-2 text-sm text-[#FFD700]">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-4 block text-lg font-normal leading-[120%] text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Phone Number <span className="text-[#E0115F]">*</span>
              </label>

              <input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 7,
                    message: "Phone number is too short",
                  },
                  maxLength: {
                    value: 20,
                    message: "Phone number is too long",
                  },
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Please enter a valid phone number",
                  },
                })}
                className={`h-12 w-full rounded-md border bg-[#6A0E69] px-4 text-base text-[#FFFAF0] outline-none transition-all duration-300 placeholder:text-[#FFFAF0]/70 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.phone ? "border-[#E0115F]" : "border-transparent"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              />

              {errors.phone && (
                <p className="mt-2 text-sm text-[#FFD700]">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Gender */}
            <div className="md:col-span-2">
              <label
                htmlFor="gender"
                className="mb-4 block text-lg font-normal leading-[120%] text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Gender <span className="text-[#E0115F]">*</span>
              </label>

              <select
                id="gender"
                {...register("gender", {
                  required: "Gender is required",
                })}
                className={`h-12 w-full appearance-none rounded-md border bg-[#6A0E69] px-4 text-base text-[#FFFAF0] outline-none transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] ${
                  errors.gender ? "border-[#E0115F]" : "border-transparent"
                }`}
                style={{ fontFamily: "'Lora', serif" }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {errors.gender && (
                <p className="mt-2 text-sm text-[#FFD700]">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 h-12 rounded-lg bg-[#FFD700] px-9 text-base font-normal text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {isSubmitting ? "Saving..." : "Save Change"}
          </button>

          {isSaved && (
            <p
              className="mt-4 text-sm text-[#FFD700]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Profile information updated successfully.
            </p>
          )}
        </form>
      );
    }

    if (activeTab === "orders") {
      return <MyOrders />;
    }

    if (activeTab === "history") {
      return <OrderHistoryTab />;
    }

    if (activeTab === "settings") {
      return <SettingsTab/>;
    }

    return <LogoutTab />;
  };

  return (
    <section className="min-h-screen w-full bg-[#4A0E4E] px-5 py-16 sm:px-6 lg:px-8 xl:py-24">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-8 lg:flex-row lg:items-start">
        {/* Sidebar */}
        <aside className="w-full rounded-[14px] border border-[#FFD700]/30 p-4 lg:w-[380px] xl:w-[390px]">
          <div className="flex flex-col gap-6">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabKey)}
                  className={`flex h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-4 text-left text-base transition-all duration-300 sm:h-14 sm:text-lg ${
                    isActive
                      ? "rounded-xl bg-[linear-gradient(90deg,#6E5B1D_0%,#D4AF37_100%)] text-[#FFFAF0]"
                      : "bg-[#5A105D] text-[#FFFAF0] hover:bg-[#791579]"
                  }`}
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  <Icon className="text-xl" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <main className="w-full">
          {renderTabContent()}
        </main>
      </div>
    </section>
  );
};

// const EmptyTab = ({ title, text }: { title: string; text: string }) => {
//   return (
//     <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
//       <h2
//         className="text-[32px] font-normal text-[#FFD700] sm:text-[42px]"
//         style={{ fontFamily: "'Cinzel', serif" }}
//       >
//         {title}
//       </h2>

//       <p
//         className="mt-4 max-w-[520px] text-base leading-[160%] text-[#FFFAF0] sm:text-lg"
//         style={{ fontFamily: "'Lora', serif" }}
//       >
//         {text}
//       </p>
//     </div>
//   );
// };