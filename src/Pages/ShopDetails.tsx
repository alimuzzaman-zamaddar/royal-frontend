import { useState } from "react";
import { FaStar, FaPlus, FaMinus, FaBoxes } from "react-icons/fa";

import productMainImg from "../assets/Ebook cover.jpeg";
import thumb1 from "../assets/Ebook cover.jpeg";
import thumb2 from "../assets/middlecard.jpeg";
import thumb3 from "../assets/Ebook cover.jpeg";
import thumb4 from "../assets/Ebook cover.jpeg";
import { RelatedProductsSection } from "./components/Shop/RelatedProductsSection";
import { addToCart } from "../lib/cartStorage";

const productDetailsData = {
  id: 1,
  breadcrumb: ["The Throne Room", "Shop", "Product Details"],
  title: "No Sense Security",
  author: "by Julius Spenser",
  rating: 5,
  reviewCount: 20,
  oldPrice: "$49.99 USD",
  price: "$39.99 USD",
  priceAmount: 39.99,
  stockStatus: "In Stock",
  stockCount: "12 items left",
  description:
    'Hard Back Book "No Sense of Security" by Julius Spenser. It\'s an adventurous day for Leo, a ride-share driver who engages with different characters battling their life challenges and finds it therapeutic and secure to open up to someone they don\'t know. Is it his Moroccan pecan complexion and high cheekbones that gave off the distinguishing look of a Pharaoh that deemed him trustworthy? When Leo doesn\'t return the Black Spade\'s alligator briefcase, whose whole life fortunes and memories are locked. One day turns into seven days of cat-and-mouse travel throughout San Francisco. Both endure scars and losses and almost death before their agreement is finalized. It trickles down to who is more exhausted or unforgiving to overcome this situation or ratify the agreement.',
  images: [productMainImg, thumb1, thumb2, thumb3, thumb4],
};

export const ShopDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(
    productDetailsData.images[0],
  );
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: productDetailsData.id,
        name: productDetailsData.title,
        author: productDetailsData.author,
        image: selectedImage,
        price: productDetailsData.priceAmount,
        badge: "Product Details",
      },
      quantity,
    );
  };

  return (
    <main className="min-h-screen w-full bg-[#020202] px-5 py-10 sm:px-6 md:py-14 xl:px-8 xl:py-16">
      <div className="mx-auto max-w-370">
        {/* Breadcrumb */}
        <div
          className="mb-8 flex flex-wrap items-center gap-2 text-sm font-normal text-[#FFFAF0] sm:text-base"
          style={{ fontFamily: "'Lora', serif" }}
        >
          {productDetailsData.breadcrumb.map((item, index) => (
            <span
              key={item}
              className={
                index === productDetailsData.breadcrumb.length - 1
                  ? "text-[#FFD700]"
                  : ""
              }
            >
              {item}
              {index !== productDetailsData.breadcrumb.length - 1 && (
                <span className="mx-2 text-[#FFFAF0]">/</span>
              )}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-8 xl:py-20">
          {/* LEFT IMAGE */}
          <div className="w-full">
            <div className="overflow-hidden rounded-[14px]">
              <img
                src={selectedImage}
                alt={productDetailsData.title}
                className="h-105 w-full rounded-[14px] object-contain transition-all duration-500 sm:h-140 lg:h-155 xl:h-166.25"
              />
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex w-full flex-col justify-start lg:pt-2">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1
                  className="text-[34px] font-bold leading-[120%] text-[#FFFAF0] sm:text-[42px] xl:text-[44px]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {productDetailsData.title}
                </h1>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: productDetailsData.rating }).map(
                      (_, index) => (
                        <FaStar
                          key={index}
                          className="text-lg text-[#FFD700]"
                        />
                      ),
                    )}
                  </div>

                  <span
                    className="text-xl text-[#FFFAF0]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    ({productDetailsData.reviewCount})
                  </span>
                </div>
              </div>

              <div
                className="flex items-center gap-4 text-left xl:pt-14 xl:text-right"
                style={{ fontFamily: "'Lora', serif" }}
              >
                <span className="text-sm text-[#FFFAF0]">
                  {productDetailsData.oldPrice}
                </span>

                <span className="text-[24px] font-normal text-[#FFD700]">
                  {productDetailsData.price}
                </span>
              </div>
            </div>

            {/* Stock */}
            <div className="mt-8 flex items-center gap-3">
              <FaBoxes className="text-[22px] text-[#FFD700]" />

              <p
                className="text-base font-normal text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                <span className="text-[#8BC34A]">
                  {productDetailsData.stockStatus}
                </span>{" "}
                - {productDetailsData.stockCount}
              </p>
            </div>

            {/* Description */}
            <p
              className="mt-8 max-w-172.5 text-base font-normal leading-[150%] text-[#FFFAF0] sm:text-lg lg:text-base xl:text-[17px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {productDetailsData.description}
            </p>

            {/* Quantity */}
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

            {/* Buttons */}
            <div className="mt-5 flex flex-col gap-5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="h-11 w-full rounded-md border border-[#FFD700] text-base font-normal text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:bg-[#FFD700] hover:text-[#020202] hover:shadow-[0_8px_24px_rgba(255,215,0,0.18)]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Add to Cart
              </button>

              <button
                type="button"
                className="h-11 w-full rounded-md bg-[#FFD700] text-base font-normal text-[#020202] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Buy Now
              </button>
            </div>

            {/* Thumbnails */}
            <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
              {productDetailsData.images.slice(1).map((image, index) => {
                const isActive = selectedImage === image;

                return (
                  <button
                    key={index}
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
                      alt={`${productDetailsData.title} thumbnail ${index + 1}`}
                      className="h-17.5 w-full rounded-md object-cover sm:h-20.5"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <RelatedProductsSection />
    </main>
  );
};