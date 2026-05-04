

import mainImg from "../../../assets/Frame 61.png";
import tshirtImg from "../../../assets/tshirt (1).png";
import beltImg from "../../../assets/belt.png";
import hoodieImg from "../../../assets/hoodie.png";
import capImg from "../../../assets/cap.png";

const royalExchangeData = {
  label: "THE ROYAL EXCHANGE",
  title: "Wear Your Crown",
  paragraphs: [
    "Royal Exchange is more than clothing — it is regalia. Every thread is woven with the memory of who we are: the original inhabitants, the inheritors of the earth.",
    "From the crown to the sole, our garments declare your royal status. T-shirts, hoodies, joggers, sweaters, belts, caps — each piece designed to remind you and the world of your divine inheritance.",
  ],
  features: [
    "Premium fabrics fit for royalty",
    "Designs that honor ancestral memory",
    "Every purchase supports indigenous authors",
  ],
  buttonText: "ENTER THE ROYAL WARDROBE",
  mainImage: mainImg,
  mainImageAlt: "Royal Exchange clothing model",
  caption: "Royal Exchange — Regalia for the Inheritors",
  gallery: [
    {
      image: tshirtImg,
      alt: "Royal Exchange T-shirt",
    },
    {
      image: beltImg,
      alt: "Royal Exchange belt",
    },
    {
      image: hoodieImg,
      alt: "Royal Exchange hoodie",
    },
    {
      image: capImg,
      alt: "Royal Exchange cap",
    },
  ],
};

export const RoyalExchangeSection = () => {
  return (
    <section className="w-full bg-[#020202] px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1480px] grid-cols-1 items-center gap-10 lg:grid-cols-2 xl:gap-14">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left w-full">
          <p
            className="mb-4 text-sm font-normal uppercase leading-[150%] text-[#FFD700]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {royalExchangeData.label}
          </p>

          <h2
            className="mb-8 lineage-heading"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {royalExchangeData.title}
          </h2>

          <div className="mx-auto max-w-[650px] space-y-5 lg:mx-0">
            {royalExchangeData.paragraphs.map((text, index) => (
              <p
                key={index}
                className="text-base font-normal leading-[150%] text-[#FFFAF0] sm:text-lg"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {text}
              </p>
            ))}
          </div>

          <div className="mt-9 space-y-4">
            {royalExchangeData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start justify-center gap-3 lg:justify-start"
              >
                <span className="mt-[2px] text-lg leading-none text-[#FFD700]">
                  ✓
                </span>

                <p
                  className="text-sm leading-[150%] text-[#FFFAF0] sm:text-base"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <button
            className="mt-8 rounded-md bg-[#FFD700] px-6 py-3 text-sm font-bold uppercase tracking-[1.2px] text-[#080500] shadow-[0_4px_24px_rgba(255,215,0,0.28)] transition-all hover:scale-[1.02] hover:bg-[#f5d87a] sm:px-7 sm:text-base"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {royalExchangeData.buttonText}
          </button>
        </div>

        {/* RIGHT IMAGE AREA */}
        <div className="w-full">
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={royalExchangeData.mainImage}
              alt={royalExchangeData.mainImageAlt}
              className=" w-full object-cover sm:h-[420px] lg:h-[378px] xl:h-[410px]"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-16">
              <p
                className="text-center text-base font-normal leading-[150%] text-[#FFFAF0] sm:text-xl"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {royalExchangeData.caption}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 grid-cols-4 sm:gap-4">
            {royalExchangeData.gallery.map((item, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-[#FFFAF0]"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-[110px] w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-[96px] lg:h-[86px] xl:h-[96px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};