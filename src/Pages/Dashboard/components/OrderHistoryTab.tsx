/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar, FaTimes } from "react-icons/fa";
import { useGetOrderHistoryListQuery, useSendReviewMutation } from "../../../redux/Slices/productApi";

type OrderStatus = "Delivered" | "Pending" | "confirmed" | "pending";

type OrderProduct = {
  id: number;
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type OrderHistoryItem = {
  id: number;
  order_id: string;
  total: number;
  payment_method: string;
  created_at: string;
  status: OrderStatus;
  items: OrderProduct[];
};

type SelectedReviewProduct = {
  orderId: string;
  product: OrderProduct;
};

const IMAGE_BASE_URL = import.meta.env.VITE_API_URL_IMAGE;

export const OrderHistoryTab = () => {
  const [selectedReviewProduct, setSelectedReviewProduct] =
    useState<SelectedReviewProduct | null>(null);

  const [isReviewModalMounted, setIsReviewModalMounted] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  // API CALL
  const { data, isLoading, isError } = useGetOrderHistoryListQuery({});

  const orders: OrderHistoryItem[] = data?.data?.data || [];

  console.log("Order history data:", data);

const handleInvoice = async (orderId: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/orders/${orderId}/invoice`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch invoice PDF");
    }

    // Get the file as a blob
    const blob = await response.blob();

    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // Optional: set a filename
    a.download = `invoice-${orderId}.pdf`;

    document.body.appendChild(a);
    a.click();

    // Clean up
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Invoice download failed:", error);
  }
};


  const openReviewModal = (orderId: string, product: OrderProduct) => {
    setSelectedReviewProduct({
      orderId,
      product,
    });

    setIsReviewModalMounted(true);

    window.setTimeout(() => {
      setIsReviewModalVisible(true);
    }, 20);
  };

  const closeReviewModal = () => {
    setIsReviewModalVisible(false);

    window.setTimeout(() => {
      setIsReviewModalMounted(false);
      setSelectedReviewProduct(null);
    }, 300);
  };

  useEffect(() => {
    if (!isReviewModalMounted) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeReviewModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isReviewModalMounted]);

  if (isLoading) {
    return (
      <div className="py-10 text-center text-white">
        Loading orders...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-400">
        Failed to load orders.
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <h2
          className="mb-6 text-lg font-semibold leading-[120%] text-[#FFFAF0]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Orders ({orders.length})
        </h2>

        <div className="space-y-10">
          {orders.map((order) => (
            <article
              key={order.id}
              className="overflow-hidden rounded-[18px] border border-[#D4AF37]/35 bg-[#5A0F58]"
            >
              {/* Order Header */}
              <div className="grid grid-cols-2 gap-y-4 rounded-t-[18px] bg-[linear-gradient(90deg,#D4AF37_0%,#E0BB39_100%)] px-4 py-5 text-[#080500] sm:grid-cols-3 lg:grid-cols-5">
                <OrderInfo
                  label="Order ID"
                  value={order.order_id}
                />

                <OrderInfo
                  label="Total Payment"
                  value={`$${Number(order.total).toFixed(2)}`}
                />

                <OrderInfo
                  label="Payment Method"
                  value={order.payment_method}
                />

                <OrderInfo
                  label="Order Date"
                  value={order.created_at}
                />

                <OrderInfo
                  label="Order Status"
                  value={order.status}
                />
              </div>

              {/* Invoice Button */}
              <div className="px-4 pt-5 w-full flex justify-end">
                <button
                  type="button"
                  onClick={() => handleInvoice(order.id)}
                  className="h-8 cursor-pointer  rounded-md border border-[#D4AF37]/40 bg-[#7A3478] px-7 text-xs font-normal text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#080500]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Invoice
                </button>
              </div>

              {/* Product List */}
              <div className="space-y-5 px-4 py-5">
                {order.items?.map((product) => (
                  <div
                    key={`${order.id}-${product.id}`}
                    className="flex flex-col gap-5 rounded-[12px] border border-[#D4AF37]/25 bg-[#6A0E69] p-4 transition-all duration-300 hover:border-[#FFD700]/60 hover:shadow-[0_12px_34px_rgba(255,215,0,0.10)] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <img
                        src={`${IMAGE_BASE_URL}${product.image}`}
                        alt={product.title}
                        className="h-[92px] w-full rounded-md object-cover sm:w-[92px]"
                      />

                      <div>
                        <h3
                          className="text-xl font-normal leading-[130%] text-[#FFFAF0]"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          {product.title}
                        </h3>

                        <p
                          className="mt-4 text-lg font-normal text-[#FFFAF0]"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          Price: ${Number(product.price).toFixed(2)}
                        </p>

                        <p
                          className="mt-4 text-lg font-normal text-[#FFFAF0]"
                          style={{ fontFamily: "'Lora', serif" }}
                        >
                          Quantity: {product.quantity}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openReviewModal(order.order_id, product)
                      }
                      className="cursor-pointer self-start rounded-md border border-[#D4AF37]/40 bg-[#7A0F55] px-6 py-2 text-xs font-normal text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:border-[#FFD700] hover:bg-[#FFD700] hover:text-[#080500] sm:self-start"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      Send Review
                    </button>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {isReviewModalMounted && selectedReviewProduct && (
        <ReviewModal
          isVisible={isReviewModalVisible}
          selectedReviewProduct={selectedReviewProduct}
          onClose={closeReviewModal}
        />
      )}
    </>
  );
};

const ReviewModal = ({
  isVisible,
  selectedReviewProduct,
  onClose,
}: {
  isVisible: boolean;
  selectedReviewProduct: SelectedReviewProduct;
  onClose: () => void;
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const activeRating = hoverRating || rating;


const [sendReview, { isLoading: isSending }] = useSendReviewMutation();

const handleSendReview = async () => {
  if (rating < 1) {
    toast.error("Please select a rating before sending review.");
    return;
  }

  try {
    const payload = {
      order_item_ids: [selectedReviewProduct.product.id],
      rating,
    };

    const response = await sendReview(payload).unwrap();

    toast.success(response.message);
    onClose();
  } catch (error: any) {
    toast.error(error.data?.message || "Something went wrong.");
  }
};

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm transition-all duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onMouseDown={onClose}
    >
      <div
        className={`relative w-full max-w-[640px] rounded-[28px] bg-[#4F0D53] px-6 py-10 shadow-[0_24px_90px_rgba(0,0,0,0.55)] transition-all duration-300 sm:px-8 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-6 scale-95 opacity-0"
        }`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#FFD700]/40 text-[#FFD700] transition-all duration-300 hover:rotate-90 hover:bg-[#FFD700] hover:text-[#080500]"
          aria-label="Close review modal"
        >
          <FaTimes className="text-sm" />
        </button>

        <div className="flex items-center justify-center gap-5">
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            const isActive = starValue <= activeRating;

            return (
              <button
                key={starValue}
                type="button"
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:scale-110"
              >
                <FaStar
                  className={`text-[42px] transition-colors duration-200 sm:text-[50px] ${
                    isActive ? "text-[#FFD700]" : "text-[#FFFAF0]/20"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <p
          className="mt-5 text-center text-sm text-[#CDBDCA]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Rating: {rating}/5
        </p>

        <button
          type="button"
          onClick={handleSendReview}
          disabled={isSending}
          className="mt-8 h-[60px] w-full cursor-pointer rounded-xl bg-[#FFD700] text-xl font-medium text-[#080500] transition-all duration-300 hover:-translate-y-px hover:bg-[#f5d87a] hover:shadow-[0_10px_30px_rgba(255,215,0,0.25)] disabled:cursor-not-allowed disabled:opacity-70 sm:h-[68px] sm:text-2xl"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {isSending ? "Sending..." : "Send Review"}
        </button>
      </div>
    </div>
  );
};

const OrderInfo = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="border-[#080500]/25 pr-4 lg:border-r lg:last:border-r-0">
      <p
        className="text-[11px] font-normal leading-[130%]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {label}
      </p>

      <p
        className="mt-2 text-sm font-bold leading-[130%]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        {value}
      </p>
    </div>
  );
};