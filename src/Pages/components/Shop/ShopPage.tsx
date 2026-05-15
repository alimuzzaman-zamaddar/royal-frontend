import { useMemo, useState } from "react";
import { FaSearch, FaSlidersH, FaStar } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import bookImg1 from "../../../assets/middlecard.jpeg";
import bookImg2 from "../../../assets/Front cover.png";
import { CheckSvg } from "../../../lib/Svg";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../lib/cartStorage";

type Category =
  | "All"
  | "Books"
  | "Men's Collection"
  | "Woman's Collection"
  | "King Gorilla Collection"
  | "Others";

type PriceRangeId =
  | "all"
  | "1-20"
  | "21-50"
  | "51-99"
  | "100-150"
  | "151-250"
  | "250-plus";

type SortOption = "featured" | "low-high" | "high-low" | "newest";

type Product = {
  id: number;
  name: string;
  author?: string;
  category: Exclude<Category, "All">;
  image: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
  softPrice?: number;
  hardPrice?: number;
  price?: number;
  isNewest?: boolean;
  buttonText: string;
};

const categories: Category[] = [
  "All",
  "Books",
  "Men's Collection",
  "Woman's Collection",
  "King Gorilla Collection",
  "Others",
];

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

const products: Product[] = [
  {
    id: 1,
    name: "No Sense Security",
    author: "by Julius Spenser",
    category: "Books",
    image: bookImg1,
    badge: "New Arrival",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 2,
    name: "The Yachat Klub",
    author: "by Julius Spenser",
    category: "Books",
    image: bookImg2,
    badge: "Up Coming",
    rating: 5,
    reviewCount: 5,
    softPrice: 29,
    hardPrice: 39.99,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 3,
    name: "No Sense Security Special Edition",
    author: "by Julius Spenser",
    category: "Books",
    image: bookImg1,
    isNewest: true,
    buttonText: "Link",
  },
  {
    id: 4,
    name: "Royal Exchange Classic Tee",
    category: "Men's Collection",
    image: bookImg1,
    badge: "New Arrival",
    rating: 4,
    reviewCount: 12,
    price: 35,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 5,
    name: "King Frequency Hoodie",
    category: "Men's Collection",
    image: bookImg2,
    badge: "Best Seller",
    rating: 5,
    reviewCount: 18,
    price: 89.99,
    isNewest: false,
    buttonText: "View Details",
  },
  {
    id: 6,
    name: "Royal Crown Joggers",
    category: "Men's Collection",
    image: bookImg1,
    rating: 4,
    reviewCount: 9,
    price: 64.99,
    isNewest: false,
    buttonText: "View Details",
  },
  {
    id: 7,
    name: "Legacy Varsity Jacket",
    category: "Men's Collection",
    image: bookImg2,
    badge: "Premium",
    rating: 5,
    reviewCount: 6,
    price: 149.99,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 8,
    name: "Queen Lineage Tee",
    category: "Woman's Collection",
    image: bookImg1,
    badge: "New Arrival",
    rating: 5,
    reviewCount: 11,
    price: 35,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 9,
    name: "Divine Crown Hoodie",
    category: "Woman's Collection",
    image: bookImg2,
    rating: 4,
    reviewCount: 7,
    price: 84.99,
    isNewest: false,
    buttonText: "View Details",
  },
  {
    id: 10,
    name: "Royal Exchange Crop Top",
    category: "Woman's Collection",
    image: bookImg1,
    badge: "Featured",
    rating: 5,
    reviewCount: 15,
    price: 42,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 11,
    name: "Golden Memory Sweater",
    category: "Woman's Collection",
    image: bookImg2,
    rating: 4,
    reviewCount: 10,
    price: 74.99,
    isNewest: false,
    buttonText: "View Details",
  },
  {
    id: 12,
    name: "King Gorilla Signature Tee",
    category: "King Gorilla Collection",
    image: bookImg1,
    badge: "New Arrival",
    rating: 5,
    reviewCount: 20,
    price: 44.99,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 13,
    name: "King Gorilla Hoodie",
    category: "King Gorilla Collection",
    image: bookImg2,
    badge: "Best Seller",
    rating: 5,
    reviewCount: 25,
    price: 94.99,
    isNewest: false,
    buttonText: "View Details",
  },
  {
    id: 14,
    name: "King Gorilla Cap",
    category: "King Gorilla Collection",
    image: bookImg1,
    rating: 4,
    reviewCount: 13,
    price: 29.99,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 15,
    name: "King Gorilla Collector Jacket",
    category: "King Gorilla Collection",
    image: bookImg2,
    badge: "Limited",
    rating: 5,
    reviewCount: 5,
    price: 199.99,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 16,
    name: "Royal Exchange Belt",
    category: "Others",
    image: bookImg1,
    rating: 4,
    reviewCount: 6,
    price: 59.99,
    isNewest: false,
    buttonText: "View Details",
  },
  {
    id: 17,
    name: "Legacy Crown Cap",
    category: "Others",
    image: bookImg2,
    badge: "New Arrival",
    rating: 5,
    reviewCount: 9,
    price: 32,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 18,
    name: "Royal Exchange Tote Bag",
    category: "Others",
    image: bookImg1,
    rating: 4,
    reviewCount: 4,
    price: 24.99,
    isNewest: false,
    buttonText: "View Details",
  },
  {
    id: 19,
    name: "Ancestral Memory Notebook",
    category: "Others",
    image: bookImg2,
    badge: "Featured",
    rating: 5,
    reviewCount: 14,
    price: 18.99,
    isNewest: true,
    buttonText: "View Details",
  },
  {
    id: 20,
    name: "Royal Exchange Collector Bundle",
    category: "Others",
    image: bookImg1,
    badge: "Premium",
    rating: 5,
    reviewCount: 3,
    price: 259.99,
    isNewest: true,
    buttonText: "View Details",
  },
];

export const ShopPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    "All",
  ]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<
    PriceRangeId[]
  >(["all"]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const handleCategoryChange = (category: Category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
      return;
    }

    setSelectedCategories((prev) => {
      const withoutAll = prev.filter((item) => item !== "All");

      const alreadySelected = withoutAll.includes(category);

      const nextCategories = alreadySelected
        ? withoutAll.filter((item) => item !== category)
        : [...withoutAll, category];

      return nextCategories.length > 0 ? nextCategories : ["All"];
    });
  };

  const handlePriceRangeChange = (rangeId: PriceRangeId) => {
    if (rangeId === "all") {
      setSelectedPriceRanges(["all"]);
      return;
    }

    setSelectedPriceRanges((prev) => {
      const withoutAll = prev.filter((item) => item !== "all");

      const alreadySelected = withoutAll.includes(rangeId);

      const nextRanges = alreadySelected
        ? withoutAll.filter((item) => item !== rangeId)
        : [...withoutAll, rangeId];

      return nextRanges.length > 0 ? nextRanges : ["all"];
    });
  };

  const getProductPrice = (product: Product) => {
    return product.softPrice ?? product.price ?? product.hardPrice ?? 0;
  };

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    const normalizedSearch = searchValue.trim().toLowerCase();

    if (normalizedSearch) {
      filtered = filtered.filter((product) => {
        return (
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.author?.toLowerCase().includes(normalizedSearch)
        );
      });
    }

    if (!selectedCategories.includes("All")) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    if (!selectedPriceRanges.includes("all")) {
      const activeRanges = priceRanges.filter((range) =>
        selectedPriceRanges.includes(range.id),
      );

      filtered = filtered.filter((product) => {
        const productPrice = getProductPrice(product);

        return activeRanges.some(
          (range) => productPrice >= range.min && productPrice <= range.max,
        );
      });
    }

    if (sortBy === "low-high") {
      filtered.sort((a, b) => getProductPrice(a) - getProductPrice(b));
    }

    if (sortBy === "high-low") {
      filtered.sort((a, b) => getProductPrice(b) - getProductPrice(a));
    }

    if (sortBy === "newest") {
      filtered.sort(NumberSortByNewest);
    }

    return filtered;
  }, [searchValue, selectedCategories, selectedPriceRanges, sortBy]);

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

            <div className="space-y-3">
              {categories.map((category) => {
                const isChecked = selectedCategories.includes(category);

                return (
                  <label
                    key={category}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[#B8B0A4] transition-colors hover:text-[#FFD700]"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryChange(category)}
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

                    <span>{category}</span>
                  </label>
                );
              })}
            </div>
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
              className="h-11 w-full xl:w-[20%] rounded-md border border-[#FFD700]/30 bg-[#050505] px-4 text-sm text-[#FFFAF0] outline-none transition-all duration-300 focus:border-[#FFD700] focus:shadow-[0_0_0_3px_rgba(255,215,0,0.12)] md:w-[190px]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <h1
            className="mt-8 text-xl font-normal text-[#FFFAF0]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Book
          </h1>

          {/* Products */}
          {filteredProducts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-md border border-[#FFD700]/30 px-5 py-10 text-center">
              <p
                className="text-base text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                No products found. Try changing your filters or search keyword.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  return (
    <article className="group flex h-full flex-col rounded-[18px] border border-[#FFD700]/30 bg-[#020202] p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_50px_rgba(255,215,0,0.12)]">
      <div className="relative overflow-hidden rounded-[12px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-[370px] w-full rounded-[12px] object-contain transition-transform duration-700 group-hover:scale-[1.035] sm:h-[390px] xl:h-[420px]"
        />

<div className=" flex h-full w-full items-end justify-between p-4">
          <button
          type="button"
          onClick={() => addToCart(product)}
          className="absolute left-3 top-3 cursor-pointer xl:text-base flex p-2 items-center justify-center rounded-md border border-[#D4AF37] bg-[rgba(255,215,0,0.50)] text-[#020202] transition-all duration-300 hover:scale-105 hover:bg-[#FFD700]"
          aria-label="Add to cart"
        >
          <BsCart3  />
        </button>

        {product.badge && (
          <span
            className="absolute right-3 top-3 rounded-md border border-[#D4AF37] bg-[rgba(255,215,0,0.50)] px-3 py-1 text-xs xl:text-base text-[#020202]"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {product.badge}
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
              {product.name}
            </h2>

            {product.author && (
              <p
                className="mt-1 text-xs text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {product.author}
              </p>
            )}
          </div>

          {(product.softPrice || product.hardPrice) && (
            <div className="flex gap-8 text-right">
              <p
                className="text-sm text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Soft Copy
              </p>

              <p
                className="text-sm text-[#FFFAF0]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Hard Copy
              </p>
            </div>
          )}
        </div>

        <div className="my-5 flex items-center justify-between gap-4">
          {product.rating && (
            <div className="flex items-center gap-1">
              {Array.from({ length: product.rating }).map((_, index) => (
                <FaStar key={index} className="text-sm text-[#FFD700]" />
              ))}

              {product.reviewCount && (
                <span
                  className="ml-1 text-sm text-[#FFD700]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ({product.reviewCount}/5)
                </span>
              )}
            </div>
          )}

          {(product.softPrice || product.hardPrice) && (
            <div className="flex gap-8">
              {product.softPrice && (
                <p
                  className="text-xl font-bold text-[#D4A800]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${product.softPrice.toFixed(2)}
                </p>
              )}

              {product.hardPrice && (
                <p
                  className="text-xl font-bold text-[#D4A800]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  ${product.hardPrice.toFixed(2)}
                </p>
              )}
            </div>
          )}

          {product.price && (
            <p
              className="text-xl font-bold text-[#D4A800]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>

        <button
          onClick={() => navigate(`/shop/${product.id}`)}
          className="mt-auto h-12 w-full rounded-md cursor-pointer bg-[#FFD700] text-sm font-bold tracking-[1px] text-[#020202] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_8px_24px_rgba(255,215,0,0.22)]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {product.buttonText}
        </button>
      </div>
    </article>
  );
};

const NumberSortByNewest = (a: Product, b: Product) => {
  return Number(Boolean(b.isNewest)) - Number(Boolean(a.isNewest));
};
