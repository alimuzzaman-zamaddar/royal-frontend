/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from "react";
import { FaStar, FaPlus, FaMinus, FaBoxes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import { RelatedProductsSection } from "./components/Shop/RelatedProductsSection";
import {
  addToCart,
  type CopyType,
  type ProductVariant,
} from "../lib/cartStorage";
import {
  useGetProductDetailsQuery,
  type ApiProductDetails,
  type ApiProduct,
} from "../redux/Slices/productApi";
import { Loader } from "../lib/Loader";
import toast from "react-hot-toast";
import SEO from "../lib/SEO";

type ProductDetailsProduct = ApiProductDetails & {
  variants?: ProductVariant[];
};

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

const formatPrice = (price?: number | null) => {
  if (price === null || price === undefined) return "";
  return `$${price.toFixed(2)} USD`;
};

const formatBadge = (badge?: string | null) => {
  if (!badge) return "";
  return badge
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getMainPrice = (product: ApiProductDetails) => {
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

const getOldPrice = (product: ApiProductDetails) => {
  const originalPrice = parsePrice(product.original_price);
  const discountPrice = parsePrice(product.discount_price);

  if (originalPrice && discountPrice) {
    return originalPrice;
  }

  return null;
};

const getProductImages = (product?: ProductDetailsProduct) => {
  if (!product) return [];

  const thumbnail = getCmsAssetUrl(product.thumbnail);

  const galleryImages =
    product.images
      ?.map((item) => {
        if (typeof item === "string") {
          return getCmsAssetUrl(item);
        }

        return getCmsAssetUrl(item.image || item.path || item.url || "");
      })
      .filter(Boolean) || [];

  const allImages = [thumbnail, ...galleryImages].filter(Boolean);

  return Array.from(new Set(allImages));
};

export const ShopDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetProductDetailsQuery(
    slug || "",
    {
      skip: !slug,
    },
  );

  const product = data?.data?.product as ProductDetailsProduct | undefined;
  const relatedProducts: ApiProduct[] = data?.data?.related ?? [];

  const productImages = useMemo(() => getProductImages(product), [product]);

  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedCopyType, setSelectedCopyType] = useState<CopyType | null>(
    null,
  );
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (productImages.length > 0) {
      setSelectedImage(productImages[0]);
    }
  }, [productImages]);

  useEffect(() => {
    if (!product) return;

    if (product.soft_copy_price != null) {
      setSelectedCopyType("soft");
    } else if (product.hard_copy_price != null) {
      setSelectedCopyType("hard");
    } else {
      setSelectedCopyType(null);
    }

    if (product.variants?.length) {
      setSelectedVariantId(product.variants[0].id);
    } else {
      setSelectedVariantId(null);
    }
  }, [product]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) {
    return <Loader title="Loading product..." fullScreen />;
  }

  if (isError) {
    console.log("Product details error:", error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Failed to load product details.
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020202] px-5 text-center text-[#FFFAF0]">
        Product not found.
      </div>
    );
  }

  const categoryTitle = product.category?.title ?? "Uncategorized";
  const productTitle = product.title ?? "Untitled";
  const rating = Math.round(Number(product.avg_rating || 0));
  const mainPrice = getMainPrice(product);
  const oldPrice = getOldPrice(product);

  const softCopyPrice =
    parsePrice(product.soft_copy_discount_price) ??
    parsePrice(product.soft_copy_price);

  const hardCopyPrice =
    parsePrice(product.hard_copy_discount_price) ??
    parsePrice(product.hard_copy_price);

  const variantOptions = product.variants ?? [];
  const selectedVariant =
    variantOptions.find((variant) => variant.id === selectedVariantId) ?? null;

  // const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";
  const stockCount =
    product.stock > 0 ? `${product.stock} items left` : "Unavailable";

  const handleAddToCart = () => {
    if (variantOptions.length > 0 && !selectedVariant) {
      toast.error("Please select a variant.");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: productTitle,
        category: categoryTitle,
        image: selectedImage,
        price: mainPrice,
        softPrice: softCopyPrice ?? undefined,
        hardPrice: hardCopyPrice ?? undefined,
        badge: formatBadge(product.badge) || "Product Details",
        rating,
        reviewCount: product.rating_count,
        buttonText: "View Details",
        variants: variantOptions,
      },
      quantity,
      {
        selectedCopyType,
        selectedVariant,
      },
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  return (
    <main className="min-h-screen w-full bg-[#020202] px-5 py-10 sm:px-6 md:py-14 xl:px-8 xl:py-16">

          <SEO
      title={product?.meta_title || product?.title}
      description={
        product?.meta_description ||
        product?.description
      }
    />
      <div className="mx-auto max-w-370">
        <div
          className="mb-8 flex flex-wrap items-center gap-2 text-sm font-normal text-[#FFFAF0] sm:text-base"
          style={{ fontFamily: "'Lora', serif" }}
        >
          <span>The Throne Room</span>
          <span className="mx-2 text-[#FFFAF0]">/</span>
          <span>Shop</span>
          <span className="mx-2 text-[#FFFAF0]">/</span>
          <span className="text-[#FFD700]">{productTitle}</span>
        </div>

        <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-8 xl:py-20">
          <div className="w-full">
            <div className="overflow-hidden rounded-[14px]">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={productTitle}
                  className="h-105 w-full rounded-[14px] object-contain transition-all duration-500 sm:h-140 lg:h-155 xl:h-166.25"
                />
              ) : (
                <div className="flex h-105 w-full items-center justify-center rounded-[14px] border border-[#FFD700]/25 bg-[#050505] text-center text-[#B8B0A4] sm:h-140 lg:h-155 xl:h-166.25">
                  No Image Available
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col justify-start lg:pt-2">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1
                  className="text-[34px] font-bold leading-[120%] text-[#FFFAF0] sm:text-[42px] xl:text-[44px]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {productTitle}
                </h1>

                <p
                  className="mt-2 text-base text-[#D4AF37]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {categoryTitle}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {rating > 0 ? (
                      Array.from({ length: rating }).map((_, index) => (
                        <FaStar
                          key={index}
                          className="text-lg text-[#FFD700]"
                        />
                      ))
                    ) : (
                      <span
                        className="text-sm text-[#FFD700]"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        No reviews yet
                      </span>
                    )}
                  </div>

                  {rating > 0 && (
                    <span
                      className="text-xl text-[#FFFAF0]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      ({product.rating_count})
                    </span>
                  )}
                </div>
              </div>

              <div
                className="flex items-center gap-4 text-left xl:pt-14 xl:text-right"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {oldPrice && (
                  <span className="text-sm text-[#FFFAF0] line-through">
                    {formatPrice(oldPrice)}
                  </span>
                )}

                <span className="text-[24px] font-normal text-[#FFD700]">
                  {formatPrice(mainPrice)}
                </span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <FaBoxes className="text-[22px] text-[#FFD700]" />

              <p
                className="text-base font-normal text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                <span
                  className={
                    product.stock > 0 ? "text-[#8BC34A]" : "text-[#E0115F]"
                  }
                >
                  {selectedVariant?.stock ?? product.stock}
                </span>{" "}
                - {stockCount}
              </p>
            </div>

            <p
              className="mt-8 max-w-172.5 text-base font-normal leading-[150%] text-[#FFFAF0] sm:text-lg lg:text-base xl:text-[17px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {product.description || product.short_description}
            </p>

            {product.tags?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#FFD700]/40 px-3 py-1 text-xs text-[#FFD700]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(softCopyPrice || hardCopyPrice) && (
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {softCopyPrice && (
                  <div className="rounded-md border border-[#FFD700]/30 px-4 py-3">
                    <p
                      className="text-sm text-[#FFFAF0]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      Soft Copy
                    </p>
                    <p
                      className="mt-1 text-xl font-bold text-[#FFD700]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      ${softCopyPrice.toFixed(2)}
                    </p>
                  </div>
                )}

                {hardCopyPrice && (
                  <div className="rounded-md border border-[#FFD700]/30 px-4 py-3">
                    <p
                      className="text-sm text-[#FFFAF0]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      Hard Copy
                    </p>
                    <p
                      className="mt-1 text-xl font-bold text-[#FFD700]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      ${hardCopyPrice.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {variantOptions.length > 0 && (
              <div className="mt-7">
                <p
                  className="mb-3 text-sm font-normal text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Select Variant
                </p>

                <div className="flex flex-wrap gap-3">
                  {variantOptions.map((variant) => {
                    const isActive = selectedVariantId === variant.id;
                    const isOutOfStock =
                      variant.stock != null && variant.stock <= 0;

                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        disabled={isOutOfStock}
                        className={`group relative flex flex-col items-start justify-center rounded-[8px] border px-3 py-2 text-left transition-all duration-300 ${
                          isActive
                            ? "border-[#FFD700] bg-[#FFD700] text-[#020202] shadow-[0_10px_28px_rgba(255,215,0,0.18)]"
                            : "border-[#FFD700]/30 bg-[#050505] text-[#FFFAF0] hover:border-[#FFD700]/70 hover:bg-[#0b0b0b]"
                        } ${isOutOfStock ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                      >
                        <span
                          className={`text-sm font-semibold ${
                            isActive ? "text-[#020202]" : "text-[#FFFAF0]"
                          }`}
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {variant.title}
                        </span>

                        <span
                          className={`mt-1 text-xs ${
                            isActive ? "text-[#020202]/80" : "text-[#B8B0A4]"
                          }`}
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {isOutOfStock
                            ? "Out of stock"
                            : `${variant.stock ?? 0} left`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedVariant?.stock != null && (
                  <p
                    className="mt-2 text-sm text-[#B8B0A4]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    Selected variant stock: {selectedVariant.stock}
                  </p>
                )}
              </div>
            )}

            {(softCopyPrice || hardCopyPrice) && (
              <div className="mt-7">
                <p
                  className="mb-3 text-sm font-normal text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Copy Type
                </p>

                <select
                  value={selectedCopyType ?? ""}
                  onChange={(e) =>
                    setSelectedCopyType(e.target.value as CopyType)
                  }
                  className="h-11 w-full rounded-md border border-[#FFD700]/30 bg-[#050505] px-4 text-sm text-[#FFFAF0] outline-none transition-all duration-300 focus:border-[#FFD700]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {softCopyPrice != null && (
                    <option value="soft">Soft Copy</option>
                  )}
                  {hardCopyPrice != null && (
                    <option value="hard">Hard Copy</option>
                  )}
                </select>
              </div>
            )}

            <div className="mt-7 flex h-10 w-26.25 items-center justify-between rounded-md border border-[#FFD700] px-3 text-[#FFFAF0]">
              <button
                type="button"
                onClick={handleDecrease}
                className="flex h-6 w-6 items-center justify-center rounded border border-[#FFFAF0]/70 text-xs transition-all hover:border-[#FFD700] hover:text-[#FFD700]"
                aria-label="Decrease quantity"
              >
                <FaMinus />
              </button>

              <span
                className="text-base"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={handleIncrease}
                className="flex h-6 w-6 items-center justify-center rounded border border-[#FFFAF0]/70 text-xs transition-all hover:border-[#FFD700] hover:text-[#FFD700]"
                aria-label="Increase quantity"
              >
                <FaPlus />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="h-11 w-full rounded-md border border-[#FFD700]/30 text-base font-normal text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:bg-[#FFD700] hover:text-[#020202] hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="h-11 w-full rounded-md bg-[#aa9102] text-base font-normal text-[#020202] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Buy Now
              </button>
            </div>

            {productImages.length > 1 && (
              <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
                {productImages.map((image, index) => {
                  const isActive = selectedImage === image;

                  return (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      className={`overflow-hidden rounded-md border transition-all duration-300 hover:-translate-y-1 ${
                        isActive
                          ? "border-[#FFD700]/30"
                          : "border-transparent hover:border-[#FFD700]/40"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${productTitle} thumbnail ${index + 1}`}
                        className="h-17.5 w-full rounded-md object-cover sm:h-20.5"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedProductsSection products={relatedProducts} />
    </main>
  );
};
