import img1 from "../../../assets/Frame 33.png";
import img2 from "../../../assets/Frame 33 (1).png";
import img3 from "../../../assets/Frame 33 (2).png";

// JSON Data for Books and Submission Section
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
  },
  {
    image: img2,
    title: "THE YACHT KLUB",
    subtitle: "by Julius Spenser",
    description:
      "The next chapter in the Royal Exchange legacy. A journey into power, purpose, and inheritance.",
    buttonText: "NOTIFY ME",
    buttonBg: "#0F52BA",
    buttonTextColor: "#ffffff",
    status: "COMING SOON",
    statusBg: "#0F52BA",
    statusTextColor: "#ffffff",
  },
  {
    image: img3,
    title: "YOUR STORY DESERVES A THRONE",
    subtitle: "",
    description:
      "Are you an author with a message that honors our lineage? We are accepting manuscripts.",
    buttonText: "NOTIFY ME",
    buttonBg: "#E0115F",
    buttonTextColor: "#ffffff",
    status: null,
    statusBg: "#E0115F",
    statusTextColor: "#ffffff",
  },
];

export const RoyalLibrarySection = () => {
  return (
    <section className="w-full bg-[#020202] px-5 py-12 text-center sm:px-6 sm:py-16 xl:px-8 xl:py-20">
      <div className="mx-auto max-w-[1480px]">
        <h2 className="mb-4 text-[#ffffff] font-cinzel text-[34px] font-bold leading-[120%] sm:text-5xl lg:text-6xl">
          THE ROYAL LIBRARY
        </h2>

        <p className="mb-10 text-[#ffffff] font-lora text-base leading-[150%] sm:mb-12 sm:text-xl">
          Words that carry the weight of legacy
        </p>

        {/* Card Container */}
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:flex-wrap xl:items-stretch xl:gap-10">
          {libraryData.map((item, index) => (
            <div
              key={index}
              className="flex w-full max-w-[413px] flex-col overflow-hidden rounded-xl bg-[#1E1E1E] shadow-lg xl:min-h-[760px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[390px] w-full rounded-t-xl object-cover sm:h-[460px] xl:h-[510px]"
              />

              {/* Bottom aligned content on XL */}
              <div className="flex flex-1 flex-col items-start p-4 text-left xl:min-h-[250px] xl:justify-end">
                {item.status && (
                  <button
                    className="mb-4 rounded-full px-4 py-1 text-sm font-semibold shadow-md transition-colors hover:brightness-110"
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
                  className="text-[#FFFAF0] text-[22px] font-normal leading-[140%] sm:text-2xl sm:leading-[150%]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {item.title}
                </p>

                {item.subtitle && (
                  <p className="mt-1 text-[#D4AF37] font-lora text-base font-normal leading-[150%] [font-feature-settings:'liga'_off,'clig'_off]">
                    {item.subtitle}
                  </p>
                )}

                <p className="mt-2 text-[#FFFAF0] font-lora text-sm font-normal leading-[150%] [font-feature-settings:'liga'_off,'clig'_off]">
                  {item.description}
                </p>

                <div className="mt-auto w-full pt-4">
                  <button
                    className="w-full rounded-md px-4 py-3 text-xs font-semibold shadow-md transition-all hover:brightness-110"
                    style={{
                      backgroundColor: item.buttonBg,
                      color: item.buttonTextColor,
                    }}
                  >
                    {item.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};