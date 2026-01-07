import React from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import BillInfo from "../components/menu/BillInfo";
import { useSelector } from "react-redux";

const Menu = () => {
  const customerData = useSelector(state => state.customer);

  return (
    <section
      className="
    bg-[#1f1f1f]
    min-h-screen
    pb-24
    flex flex-col
    xl:flex-row
    gap-3
    w-full
    max-w-full
    overflow-x-hidden
  ">
      {/* LEFT SECTION */}
      <div className="xl:flex-[3] w-full max-w-full overflow-x-hidden">

        {/* HEADER */}
        <div
          className="
            flex flex-col gap-3
            sm:flex-row sm:justify-between sm:items-center
            px-4 sm:px-6 lg:px-10
            py-4
          "
        >
          {/* Left */}
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wide">
              Menu
            </h1>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 sm:gap-4">
            <MdRestaurantMenu className="text-[#f5f5f5] text-3xl sm:text-4xl" />
            <div className="flex flex-col items-start">
              <h1 className="text-sm sm:text-md text-[#f5f5f5] font-semibold">
                {customerData.customerName || "Customer Name"}
              </h1>
              <p className="text-xs text-[#ababab] font-medium">
                {customerData.tableNo || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* MENU CONTENT */}
        <MenuContainer />
      </div>

      {/* RIGHT SECTION (CART) */}
      <div
        className="xl:flex-[1] w-full max-w-full bg-[#1a1a1a] rounded-lg pb-6 pt-2 xl:mt-4 xl:mr-3 max-h-[calc(100vh-2)] overflow-y-auto overflow-x-hidden">

        <CustomerInfo />
        <hr className="border-[#2a2a2a] border-t-2" />
        <CartInfo />
        <hr className="border-[#2a2a2a] border-t-2" />
        <BillInfo />
      </div>

      {/* BOTTOM NAV */}
      <BottomNav />
    </section>
  );
};
  
export default Menu;
