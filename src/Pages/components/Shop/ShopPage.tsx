import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaSlidersH, FaStar } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { CheckSvg } from "../../../lib/Svg";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../lib/cartStorage";
import { useGetCategoriesQuery } from "../../../redux/Slices/categoryApi";
import {
  useGetProductsQuery,
  type ApiProduct,
} from "../../../redux/Slices/productApi";

type CategoryFilter = {
  id: number | "all";
  title: string;
};

type PriceRangeId =
  | "all"
  | "1-20"
  | "21-50"
  | "51-99"
  | "100-150"
  | "151-250"
  | "250-plus";

type SortOption = "featured" | "low-high" | "high-low" | "newest";

const priceRanges: {
  id: PriceRangeId;
  label: string;
  min: number;
  max: number;
}[] = [
  {
    id: "all",
    label: "All Price",
    min: 0,
    max: Infinity,
  },
  {
    id: "1-20",
    label: "$1 - $20",
    min: 1,
    max: 20,
  },
  {
    id: "21-50",
    label: "$21 - $50",
    min: 21,
    max: 50,
  },
  {
    id: "51-99",
    label: "$51 - $99",
    min: 51,
    max: 99,
  },
  {
    id: "100-150",
    label: "$100 - $150",
    min: 100,
    max: 150,
  },
  {
    id: "151-250",
    label: "$151 - $250",
    min: 151,
    max: 250,
  },
  {
    id: "250-plus",
    label: "$250 +",
    min: 250,
    max: Infinity,
  },
];

const useDebouncedValue = <T,>(value: T, delay = 450) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const getCmsAssetUrl = (path?: string | null) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return `${import.meta.env.VITE_API_URL_IMAGE}${path}`;
};

const formatBadge = (badge?: string | null) => {
  if (!badge) return "";

  return badge
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const parsePrice = (price?: string | null) => {
  if (!price) return null;

  const parsedPrice = Number(price);

  return Number.isNaN(parsedPrice) ? null : parsedPrice;
};

const getSortQuery = (sortBy: SortOption) => {
  if (sortBy === "low-high") {
    return {
      sort: "low_to_high" as const,
      direction: "asc" as const,
    };
  }

  if (sortBy === "high-low") {
    return {
      sort: "high_to_low" as const,
      direction: "desc" as const,
    };
  }

  if (sortBy === "newest") {
    return {
      sort: "newest" as const,
      direction: "desc" as const,
    };
  }

  return {};
};

const getSelectedPriceQuery = (selectedPriceRanges: PriceRangeId[]) => {
  if (selectedPriceRanges.includes("all")) {
    return {};
  }

  const activeRange = priceRanges.find(
    (range) => range.id === selectedPriceRanges[0],
  );

  if (!activeRange) {
    return {};
  }

  return {
    min_price: activeRange.min,
    max_price: activeRange.max,
  };
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

export const ShopPage = () => {
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();

  const categories = useMemo<CategoryFilter[]>(() => {
    const apiCategories = categoryData?.data || [];

    return [
      {
        id: "all",
        title: "All",
      },
      ...apiCategories.map((category) => ({
        id: category.id,
        title: category.title,
      })),
    ];
  }, [categoryData]);

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<
    Array<number | "all">
  >(["all"]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    PriceRangeId[]
  >(["all"]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const debouncedSearchValue = useDebouncedValue(searchValue);

  const selectedApiCategoryIds = selectedCategoryIds.filter(
    (categoryId): categoryId is number => categoryId !== "all",
  );

  const productQueryParams = useMemo(() => {
    return {
      categories: selectedApiCategoryIds,
      search: debouncedSearchValue.trim() || undefined,
      ...getSortQuery(sortBy),
      ...getSelectedPriceQuery(selectedPriceRanges),
    };
  }, [
    selectedApiCategoryIds,
    debouncedSearchValue,
    sortBy,
    selectedPriceRanges,
  ]);

  const {
    data: productData,
    isLoading: isProductLoading,
    isFetching: isProductFetching,
    isError: isProductError,
  } = useGetProductsQuery(productQueryParams);

  const productGroups = productData?.data || [];

  const handleCategoryChange = (categoryId: number | "all") => {
    if (categoryId === "all") {
      setSelectedCategoryIds(["all"]);
      return;
    }

    setSelectedCategoryIds((prev) => {
      const withoutAll = prev.filter((item) => item !== "all");

      const alreadySelected = withoutAll.includes(categoryId);

      const nextCategories = alreadySelected
        ? withoutAll.filter((item) => item !== categoryId)
        : [...withoutAll, categoryId];

      return nextCategories.length > 0 ? nextCategories : ["all"];
    });
  };

  const handlePriceRangeChange = (rangeId: PriceRangeId) => {
    if (rangeId === "all") {
      setSelectedPriceRanges(["all"]);
      return;
    }

    setSelectedPriceRanges([rangeId]);
  };

  return (
    <main className="min-h-screen w-full bg-[#020202] px-5 py-12 sm:px-6 md:py-16 xl:px-8 xl:py-20">
      <div className="mx-auto flex max-w-[1480px] flex-col gap-8 lg:flex-row">
        {/* FILTER SIDEBAR */}
        <aside className="w-full rounded-md border border-[#FFD700]/30 bg-[#050505] px-5 py-6 lg:w-[250px] xl:w-[270px]">
          <div className="mb-6 flex items-center gap-3 text-[#FFFAF0]">
            <FaSlidersH className="text-[#FFD700]" />
            <h2
              className="text-base font-normal"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Filters
            </h2>
          </div>

          {/* Category Filter */}
          <div>
            <h3
              className="mb-4 text-sm font-normal text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Category
            </h3>

            {isCategoryLoading ? (
              <p
                className="text-sm text-[#B8B0A4]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Loading categories...
              </p>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => {
                  const isChecked = selectedCategoryIds.includes(category.id);

                  return (
                    <label
                      key={category.id}
                      className="flex cursor-pointer items-center gap-2 text-sm text-[#B8B0A4] transition-colors hover:text-[#FFD700]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryChange(category.id)}
                        className="sr-only"
                      />

                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-[3px] border transition-all duration-200 ${
                          isChecked
                            ? "border-transparent text-[#FFD700]"
                            : "border-[#B8B0A4] text-transparent"
                        }`}
                      >
                        {isChecked && <CheckSvg />}
                      </span>

                      <span>{category.title}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          <div className="my-6 h-px w-full bg-[#FFD700]/35" />

          {/* Price Filter */}
          <div>
            <h3
              className="mb-4 text-sm font-normal text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Price Range
            </h3>

            <div className="space-y-3">
              {priceRanges.map((range) => {
                const isChecked = selectedPriceRanges.includes(range.id);

                return (
                  <label
                    key={range.id}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[#B8B0A4] transition-colors hover:text-[#FFD700]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handlePriceRangeChange(range.id)}
                      className="sr-only"
                    />

                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-[3px] border transition-all duration-200 ${
                        isChecked
                          ? "border-transparent text-[#FFD700]"
                          : "border-[#B8B0A4] text-transparent"
                      }`}
                    >
                      {isChecked && <CheckSvg />}
                    </span>

                    <span>{range.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* SHOP CONTENT */}
        <section className="w-full flex-1">
          {/* Search + Sort */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative w-full xl:max-w-[80%]">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search"
                className="h-11 w-full rounded-md border border-[#FFD700]/30 bg-[#050505] px-4 pr-11 text-sm text-[#FFFAF0] outline-none placeholder:text-[#FFFAF0] transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)]"
                style={{ fontFamily: "'Lora', serif" }}
              />

              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FFFAF0]" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-11 w-full rounded-md border border-[#FFD700]/30 bg-[#050505] px-4 text-sm text-[#FFFAF0] outline-none transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] md:w-[190px] xl:w-[20%]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {isProductFetching && (
            <p
              className="mt-5 text-sm text-[#FFD700]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Loading products...
            </p>
          )}

          {isProductError && (
            <div className="mt-10 rounded-md border border-[#FFD700]/30 px-5 py-10 text-center">
              <p
                className="text-base text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Failed to load products. Please try again.
              </p>
            </div>
          )}

          {!isProductError &&
            !isProductLoading &&
            productGroups.length === 0 && (
              <div className="mt-10 rounded-md border border-[#FFD700]/30 px-5 py-10 text-center">
                <p
                  className="text-base text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  No products found. Try changing your filters or search
                  keyword.
                </p>
              </div>
            )}

          {!isProductError &&
            productGroups.map((group) => (
              <div key={group.category}>
                <h1
                  className="mt-8 text-xl font-normal text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {group.category}
                </h1>

                {group.products.length > 0 ? (
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {group.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 rounded-md border border-[#FFD700]/30 px-5 py-10 text-center">
                    <p
                      className="text-base text-[#FFFAF0]"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      No products found in this category.
                    </p>
                  </div>
                )}
              </div>
            ))}
        </section>
      </div>
    </main>
  );
};

const ProductCard = ({ product }: { product: ApiProduct }) => {
  const navigate = useNavigate();

  const thumbnail = getCmsAssetUrl(product.thumbnail);
  const badge = formatBadge(product.badge);

  const originalPrice = parsePrice(product.original_price);
  const discountPrice = parsePrice(product.discount_price);

  const softCopyPrice =
    parsePrice(product.soft_copy_discount_price) ??
    parsePrice(product.soft_copy_price);

  const hardCopyPrice =
    parsePrice(product.hard_copy_discount_price) ??
    parsePrice(product.hard_copy_price);

  const rating = Math.round(Number(product.avg_rating || 0));
  const productPrice = getPrimaryPrice(product);

  const cartPayload = {
    id: product.id,
    name: product.title,
    category: product.category.title,
    image: thumbnail,
    badge,
    rating,
    reviewCount: product.rating_count,
    price: productPrice,
    softPrice: softCopyPrice ?? undefined,
    hardPrice: hardCopyPrice ?? undefined,
    buttonText: "View Details",
  };

const isExternalProduct =
  product.product_type === "external" && Boolean(product.product_link);

const handleViewDetails = () => {
  if (isExternalProduct && product.product_link) {
    window.open(product.product_link, "_blank", "noopener,noreferrer");
    return;
  }

  navigate(`/shop/${product.slug}`);
};
  return (
    <article className="group flex h-full flex-col rounded-[18px] border border-[#FFD700]/30 bg-[#020202] p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(255,215,0,0.12)]">
      <div className="relative overflow-hidden rounded-[12px]">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={product.title}
            className="h-[370px] w-full rounded-[12px] object-contain transition-transform duration-700 group-hover:scale-[1.035] sm:h-[390px] xl:h-[420px]"
          />
        ) : (
          <div className="flex h-[370px] w-full items-center justify-center rounded-[12px] border border-[#FFD700]/20 bg-[#050505] text-center text-sm text-[#B8B0A4] sm:h-[390px] xl:h-[420px]">
            No Image Available
          </div>
        )}

        <div className="flex h-full w-full items-end justify-between p-4">
          <button
            type="button"
            onClick={() => addToCart(cartPayload)}
            className="absolute left-3 top-3 flex cursor-pointer items-center justify-center rounded-md border border-[#D4AF37] bg-[rgba(255,215,0,0.50)] p-2 text-[#020202] transition-all duration-300 hover:scale-105 hover:bg-[#FFD700] xl:text-base"
            aria-label="Add to cart"
          >
            <BsCart3 />
          </button>

          {badge && (
            <span
              className="absolute right-3 top-3 rounded-md border border-[#D4AF37] bg-[rgba(255,215,0,0.50)] px-3 py-1 text-xs text-[#020202] xl:text-base"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {badge}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              className="text-base font-normal text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {product.title}
            </h2>

            {product.short_description && (
              <p
                className="mt-1 line-clamp-2 text-xs text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {product.short_description}
              </p>
            )}
          </div>

          {(softCopyPrice || hardCopyPrice) && (
            <div className="flex gap-8 text-right">
              {softCopyPrice && (
                <p
                  className="text-sm text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Soft Copy
                </p>
              )}

              {hardCopyPrice && (
                <p
                  className="text-sm text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Hard Copy
                </p>
              )}
            </div>
          )}
        </div>

        <div className="my-5 flex items-center justify-between gap-4">
          {rating > 0 && (
            <div className="flex items-center gap-1">
              {Array.from({ length: rating }).map((_, index) => (
                <FaStar key={index} className="text-sm text-[#FFD700]" />
              ))}

              <span
                className="ml-1 text-sm text-[#FFD700]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                ({product.rating_count}/5)
              </span>
            </div>
          )}

          {(softCopyPrice || hardCopyPrice) && (
            <div className="flex gap-8">
              {softCopyPrice && (
                <p
                  className="text-xl font-bold text-[#D4A800]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${softCopyPrice.toFixed(2)}
                </p>
              )}

              {hardCopyPrice && (
                <p
                  className="text-xl font-bold text-[#D4A800]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${hardCopyPrice.toFixed(2)}
                </p>
              )}
            </div>
          )}

          {!softCopyPrice && !hardCopyPrice && (
            <div className="flex items-center gap-3">
              {discountPrice && (
                <p
                  className="text-xl font-bold text-[#D4A800]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${discountPrice.toFixed(2)}
                </p>
              )}

              {originalPrice && (
                <p
                  className={`text-xl font-bold ${
                    discountPrice
                      ? "text-[#B8B0A4] line-through"
                      : "text-[#D4A800]"
                  }`}
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>

<button
  onClick={handleViewDetails}
  className="mt-auto h-12 w-full cursor-pointer rounded-md bg-[#FFD700] text-sm font-bold tracking-[1px] text-[#020202] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)]"
  style={{ fontFamily: "'Montserrat', sans-serif" }}
>
  {isExternalProduct ? "Link" : "View Details"}
</button>
      </div>
    </article>
  );
};
