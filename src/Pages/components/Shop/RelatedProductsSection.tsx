/* eslint-disable @typescript-eslint/no-explicit-any */

import {  FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// import { addToCart } from "../../../lib/cartStorage";
import { useGetProductsQuery } from "../../../redux/Slices/productApi";

export const RelatedProductsSection = () => {
  // Fetch all products (or adjust params if needed)
  const { data, isLoading, isError } = useGetProductsQuery({});

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (isError || !data?.data) return <p className="text-white">Failed to load products.</p>;

  // Flatten grouped products into a single array
  const relatedProductsData = data.data

    .map((group: any) => group.products)
    .flat();

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
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 },
          }}
          className="related-products-swiper !pb-4"
        >
          {relatedProductsData.map((product: any) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <RelatedProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const RelatedProductCard = ({ product }: { product: any }) => {
  return (
    <article className="group flex h-full flex-col rounded-[10px] border border-[#FFD700]/30  bg-[#020202] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(255,215,0,0.12)]">
      <div className="relative overflow-hidden rounded-[7px]">
        <img
          src={import.meta.env.VITE_API_URL_IMAGE + product.thumbnail || ""}
          alt={product.title}
          className="h-[225px] w-full rounded-[7px] object-contain transition-transform duration-700 group-hover:scale-[1.035] sm:h-[270px]"
        />

        {/* <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded bg-[#BBA400] text-[#020202] transition-all duration-300 hover:scale-105 hover:bg-[#FFD700]"
          aria-label="Add to cart"
        >
          <FaShoppingCart className="text-xs" />
        </button> */}

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
              {product.title}
            </h3>

            {product.writer_name && (
              <p
                className="mt-0.5 truncate text-[8px] text-[#FFFAF0] sm:text-[9px]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {product.writer_name}
              </p>
            )}
          </div>

          {(product.soft_copy_price || product.hard_copy_price) && (
            <div className="flex shrink-0 gap-3 text-right">
              {product.soft_copy_price && <p className="text-[8px] text-[#FFFAF0] sm:text-[9px]">Soft Copy</p>}
              {product.hard_copy_price && <p className="text-[8px] text-[#FFFAF0] sm:text-[9px]">Hard Copy</p>}
            </div>
          )}
        </div>

        <div className="my-4 flex items-center justify-between gap-2">
          {product.avg_rating > 0 && (
            <div className="flex items-center gap-[1px]">
              {Array.from({ length: Math.round(product.avg_rating) }).map((_, index) => (
                <FaStar key={index} className="text-[9px] text-[#FFD700]" />
              ))}
              {product.rating_count > 0 && (
                <span className="ml-1 text-[9px] text-[#FFD700]" style={{ fontFamily: "'Lora', serif" }}>
                  ({product.rating_count}/5)
                </span>
              )}
            </div>
          )}

          <div className="flex gap-3">
            {product.soft_copy_price && (
              <p className="text-xs font-bold text-[#D4A800] sm:text-sm" style={{ fontFamily: "'Lora', serif" }}>
                ${product.soft_copy_price}
              </p>
            )}
            {product.hard_copy_price && (
              <p className="text-xs font-bold text-[#D4A800] sm:text-sm" style={{ fontFamily: "'Lora', serif" }}>
                ${product.hard_copy_price}
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="mt-auto h-9 w-full rounded-md bg-[#FFD700] text-xs font-bold tracking-[0.8px] text-[#020202] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_20px_rgba(255,215,0,0.20)]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {product.button_text || "View Details"}
        </button>
      </div>
    </article>
  );
};