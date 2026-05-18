// src/components/common/Loader.tsx

type LoaderProps = {
  title?: string;
  className?: string;
  fullScreen?: boolean;
};

export const Loader = ({
  title = "Loading...",
  className = "",
  fullScreen = false,
}: LoaderProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen bg-[#4A0E4E]" : "min-h-[420px]"
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-[#FFD700]/20" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#FFD700] border-r-[#FFD700]" />

          <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFD700] shadow-[0_0_22px_rgba(255,215,0,0.55)]" />
        </div>

        <p
          className="text-base font-normal leading-[150%] text-[#FFFAF0]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {title}
        </p>
      </div>
    </div>
  );
};