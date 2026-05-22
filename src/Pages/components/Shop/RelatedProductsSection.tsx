/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import { type ApiProduct } from "../../../redux/Slices/productApi";

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const parsePrice = (price?: string | null) => {
  if (!price) return null;

  const parsedPrice = Number(price);
  return Number.isNaN(parsedPrice) ? null : parsedPrice;
};

const getPrimaryPrice = (product: ApiProduct) => {
  return (
    parsePrice(product.discount_price) ??
    parsePrice(product.original_price) ??
    parsePrice(product.soft_copy_discount_price) ??
    parsePrice(product.soft_copy_price) ??
    parsePrice(product.hard_copy_discount_price) ??
    parsePrice(product.hard_copy_price) ??
    0
  );
};

type RelatedProductsSectionProps = {
  products: ApiProduct[];
};

export const RelatedProductsSection = ({ products }: RelatedProductsSectionProps) => {
  const navigate = useNavigate();

  if (!products.length) return null;

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
          loop={products.length > 4}
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
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!h-auto">
              <RelatedProductCard product={product} navigate={navigate} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const RelatedProductCard = ({
  product,
  navigate,
}: {
  product: ApiProduct;
  navigate: ReturnType<typeof useNavigate>;
}) => {
  const thumbnail = getCmsAssetUrl(product.thumbnail);
  const isExternalProduct =
    product.product_type === "external" && Boolean(product.product_link);
  const price = getPrimaryPrice(product);

  const badge = product.badge
    ? product.badge.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    : "";

  const productTitle = product.title ?? "Untitled";
  const shortDescription = product.short_description ?? "";

  const handleAction = () => {
    if (isExternalProduct && product.product_link) {
      window.open(product.product_link, "_blank", "noopener,noreferrer");
      return;
    }

    navigate(`/shop/${product.slug}`);
  };

  return (
    <article className="group flex h-full flex-col rounded-[10px] border border-[#FFD700]/30 bg-[#020202] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(255,215,0,0.12)]">
      <div className="relative overflow-hidden rounded-[7px]">
        <img
          src={thumbnail}
          alt={productTitle}
          className="h-[225px] w-full rounded-[7px] object-contain transition-transform duration-700 group-hover:scale-[1.035] sm:h-[270px]"
        />

        {badge && (
          <span
            className="absolute right-2 top-3 rounded-sm bg-[#D4A800] px-2 py-1 text-[10px] leading-none text-[#020202]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {badge}
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
              {productTitle}
            </h3>

            {shortDescription && (
              <p
                className="mt-0.5 truncate text-[8px] text-[#FFFAF0] sm:text-[9px]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {shortDescription}
              </p>
            )}
          </div>

          <div className="flex shrink-0 gap-3 text-right">
            {parsePrice(product.soft_copy_price) != null && (
              <p className="text-[8px] text-[#FFFAF0] sm:text-[9px]">Soft Copy</p>
            )}
            {parsePrice(product.hard_copy_price) != null && (
              <p className="text-[8px] text-[#FFFAF0] sm:text-[9px]">Hard Copy</p>
            )}
          </div>
        </div>

        <div className="my-4 flex items-center justify-between gap-2">
          {product.avg_rating > 0 && (
            <div className="flex items-center gap-[1px]">
              {Array.from({ length: Math.round(product.avg_rating) }).map((_, index) => (
                <FaStar key={index} className="text-[9px] text-[#FFD700]" />
              ))}
              {product.rating_count > 0 && (
                <span
                  className="ml-1 text-[9px] text-[#FFD700]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ({product.rating_count}/5)
                </span>
              )}
            </div>
          )}

          <p
            className="ml-auto text-xs font-bold text-[#D4A800] sm:text-sm"
            style={{ fontFamily: "'Lora', serif" }}
          >
            ${price.toFixed(2)}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAction}
          className="mt-auto h-9 w-full rounded-md bg-[#FFD700] text-xs font-bold tracking-[0.8px] text-[#020202] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_20px_rgba(255,215,0,0.20)]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {isExternalProduct ? "Link" : "View Details"}
        </button>
      </div>
    </article>
  );
};