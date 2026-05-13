import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import bookImg1 from "../../../assets/middlecard.jpeg";
import bookImg2 from "../../../assets/Ebook cover.jpeg";

type RelatedProduct = {
  id: number;
  name: string;
  author?: string;
  image: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  softPrice?: number;
  hardPrice?: number;
  price?: number;
  buttonText: string;
};

const relatedProductsData: RelatedProduct[] = [
  {
    id: 1,
    name: "No Sense Security",
    author: "by Julius Spenser",
    image: bookImg1,
    badge: "New Arrival",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    buttonText: "View Details",
  },
  {
    id: 2,
    name: "The Yachat Klub",
    author: "by Julius Spenser",
    image: bookImg2,
    badge: "Up Coming",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    buttonText: "View Details",
  },
  {
    id: 3,
    name: "No Sense Security",
    author: "by Julius Spenser",
    image: bookImg1,
    badge: "New Arrival",
    buttonText: "Link",
  },
  {
    id: 4,
    name: "No Sense Security",
    author: "by Julius Spenser",
    image: bookImg1,
    badge: "New Arrival",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    buttonText: "View Details",
  },
  {
    id: 5,
    name: "The Yachat Klub",
    author: "by Julius Spenser",
    image: bookImg2,
    badge: "Up Coming",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    buttonText: "View Details",
  },
  {
    id: 3,
    name: "No Sense Security",
    author: "by Julius Spenser",
    image: bookImg1,
    badge: "New Arrival",
    buttonText: "Link",
  },
  {
    id: 4,
    name: "No Sense Security",
    author: "by Julius Spenser",
    image: bookImg1,
    badge: "New Arrival",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    buttonText: "View Details",
  },
  {
    id: 5,
    name: "The Yachat Klub",
    author: "by Julius Spenser",
    image: bookImg2,
    badge: "Up Coming",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    buttonText: "View Details",
  },
];

export const RelatedProductsSection = () => {
  return (
    <section className="w-full bg-[#020202] px-5 py-12 sm:px-6 md:py-14 xl:px-8 xl:py-16">
      <div className="mx-auto max-w-[1480px]">
        <h2
          className="mb-6 text-lg font-normal text-[#FFFAF0] sm:text-xl"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Related Products
        </h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={relatedProductsData.length > 4}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          className="related-products-swiper !pb-4"
        >
          {relatedProductsData.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <RelatedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const RelatedProductCard = ({ product }: { product: RelatedProduct }) => {
  return (
    <article className="group flex h-full flex-col rounded-[10px] border border-[#FFD700]/30  bg-[#020202] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(255,215,0,0.12)]">
      <div className="relative overflow-hidden rounded-[7px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-[225px] w-full rounded-[7px] object-contain transition-transform duration-700 group-hover:scale-[1.035] sm:h-[270px]"
        />

        <button
          type="button"
          className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded bg-[#BBA400] text-[#020202] transition-all duration-300 hover:scale-105 hover:bg-[#FFD700]"
          aria-label="Add to cart"
        >
          <FaShoppingCart className="text-xs" />
        </button>

        {product.badge && (
          <span
            className="absolute right-2 top-3 rounded-sm bg-[#D4A800] px-2 py-1 text-[10px] leading-none text-[#020202]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3
              className="truncate text-[10px] font-normal leading-[140%] text-[#FFFAF0] sm:text-xs"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {product.name}
            </h3>

            {product.author && (
              <p
                className="mt-0.5 truncate text-[8px] text-[#FFFAF0] sm:text-[9px]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {product.author}
              </p>
            )}
          </div>

          {(product.softPrice || product.hardPrice) && (
            <div className="flex shrink-0 gap-3 text-right">
              <p
                className="text-[8px] text-[#FFFAF0] sm:text-[9px]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Soft Copy
              </p>

              <p
                className="text-[8px] text-[#FFFAF0] sm:text-[9px]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Hard Copy
              </p>
            </div>
          )}
        </div>

        <div className="my-4 flex items-center justify-between gap-2">
          {product.rating && (
            <div className="flex items-center gap-[1px]">
              {Array.from({ length: product.rating }).map((_, index) => (
                <FaStar key={index} className="text-[9px] text-[#FFD700]" />
              ))}

              {product.reviewCount && (
                <span
                  className="ml-1 text-[9px] text-[#FFD700]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ({product.reviewCount}/5)
                </span>
              )}
            </div>
          )}

          {(product.softPrice || product.hardPrice) && (
            <div className="flex gap-3">
              {product.softPrice && (
                <p
                  className="text-xs font-bold text-[#D4A800] sm:text-sm"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${product.softPrice.toFixed(2)}
                </p>
              )}

              {product.hardPrice && (
                <p
                  className="text-xs font-bold text-[#D4A800] sm:text-sm"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${product.hardPrice.toFixed(2)}
                </p>
              )}
            </div>
          )}

          {product.price && (
            <p
              className="ml-auto text-xs font-bold text-[#D4A800] sm:text-sm"
              style={{ fontFamily: "'Lora', serif" }}
            >
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>

        <button
          type="button"
          className="mt-auto h-9 w-full rounded-md bg-[#FFD700] text-xs font-bold tracking-[0.8px] text-[#020202] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_20px_rgba(255,215,0,0.20)]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {product.buttonText}
        </button>
      </div>
    </article>
  );
};