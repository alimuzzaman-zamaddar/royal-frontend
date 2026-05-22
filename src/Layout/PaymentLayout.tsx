import { Outlet } from "react-router-dom";

const PaymentLayout = () => {
  return (
    <div className="bg-[#4A0E4E] ">
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default PaymentLayout;
