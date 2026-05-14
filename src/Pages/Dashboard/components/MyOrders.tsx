import { useState } from "react";
import toast from "react-hot-toast";
import capImg from "../../../assets/middlecard.jpeg";

type OrderStatus = "Pending" | "Cancelled" | "Completed";

type OrderProduct = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  canCancel?: boolean;
};

type Order = {
  id: number;
  orderId: string;
  totalPayment: number;
  paymentMethod: string;
  orderDate: string;
  status: OrderStatus;
  products: OrderProduct[];
};

const initialOrders: Order[] = [
  {
    id: 1,
    orderId: "#ORD25654",
    totalPayment: 311.88,
    paymentMethod: "Card",
    orderDate: "25 Dec 2025",
    status: "Pending",
    products: [
      {
        id: 1,
        name: "Checked Out Cap",
        price: 60,
        quantity: 1,
        image: capImg,
        canCancel: true,
      },
      {
        id: 2,
        name: "Checked Out Cap",
        price: 60,
        quantity: 1,
        image: capImg,
        canCancel: true,
      },
    ],
  },
  {
    id: 2,
    orderId: "#ORD25654",
    totalPayment: 311.88,
    paymentMethod: "Card",
    orderDate: "25 Dec 2025",
    status: "Pending",
    products: [
      {
        id: 1,
        name: "Checked Out Cap",
        price: 60,
        quantity: 1,
        image: capImg,
        canCancel: true,
      },
    ],
  },
];

export const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleCancelOrderProduct = (orderId: number, productId: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          products: order.products.filter((product) => product.id !== productId),
        };
      }),
    );

    toast.success("Order item cancelled successfully.");
  };

  const activeOrders = orders.filter((order) => order.products.length > 0);

  return (
    <div className="w-full">
      <h2
        className="mb-6 text-lg font-semibold leading-[120%] text-[#FFFAF0]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        Orders({activeOrders.length})
      </h2>

      <div className="space-y-8">
        {activeOrders.length > 0 ? (
          activeOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancelProduct={handleCancelOrderProduct}
            />
          ))
        ) : (
          <div className="rounded-[14px] border border-[#D4AF37]/30 px-5 py-16 text-center">
            <h3
              className="text-[28px] font-normal text-[#FFD700]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              No Active Orders
            </h3>

            <p
              className="mt-3 text-base text-[#FFFAF0]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Your active orders will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const OrderCard = ({
  order,
  onCancelProduct,
}: {
  order: Order;
  onCancelProduct: (orderId: number, productId: number) => void;
}) => {
  return (
    <article className="overflow-hidden rounded-[14px] border border-[#D4AF37]/35 bg-[#5A0F58]">
      {/* Order Header */}
      <div className="grid grid-cols-2 gap-y-4 bg-[linear-gradient(90deg,#D4AF37_0%,#E0BB39_100%)] px-4 py-4 text-[#080500] sm:grid-cols-3 lg:grid-cols-5">
        <OrderInfo label="Order ID" value={order.orderId} />
        <OrderInfo label="Total Payment" value={`$${order.totalPayment.toFixed(2)}`} />
        <OrderInfo label="Payment Method" value={order.paymentMethod} />
        <OrderInfo label="Order date" value={order.orderDate} />
        <OrderInfo label="Order Status" value={order.status} />
      </div>

      {/* Invoice Button */}
      <div className="px-4 pt-4">
        <button
          type="button"
          className="h-8 rounded-md bg-[#7A3478] px-6 text-xs font-normal text-[#FFFAF0] transition-all duration-300 hover:-translate-y-px hover:bg-[#FFD700] hover:text-[#080500]"
          style={{ fontFamily: "'Lora', serif" }}
        >
          Invoice
        </button>
      </div>

      {/* Products */}
      <div className="space-y-4 px-4 py-4">
        {order.products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col gap-4 rounded-[10px] border border-[#D4AF37]/20 bg-[#6A0E69] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-[92px] w-full rounded-md object-cover sm:w-[92px]"
              />

              <div>
                <h3
                  className="text-lg font-normal leading-[130%] text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {product.name}
                </h3>

                <p
                  className="mt-3 text-base font-normal text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Price: ${product.price.toFixed(2)}
                </p>

                <p
                  className="mt-3 text-base font-normal text-[#FFFAF0]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Quantity: {product.quantity}
                </p>
              </div>
            </div>

            {product.canCancel && (
              <button
                type="button"
                onClick={() => onCancelProduct(order.id, product.id)}
                className="self-start rounded-md bg-[#7A0F55] cursor-pointer px-5 py-2 text-xs font-normal text-[#E0115F] transition-all duration-300 hover:-translate-y-px hover:bg-[#E0115F] hover:text-[#FFFAF0] sm:self-center"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </article>
  );
};

const OrderInfo = ({ label, value }: { label: string; value: string }) => {
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