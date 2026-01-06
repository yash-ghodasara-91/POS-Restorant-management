import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  };

  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  };

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    navigate("/tables");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#262626] px-2 py-2 h-16 flex items-center justify-between">

      {/* Home */}
      <button
        onClick={() => navigate("/")}
        className={`flex-1 mx-1 h-full rounded-[20px] font-bold flex items-center justify-center
        ${isActive("/") ? "bg-[#343434] text-[#f5f5f5]" : "text-[#ababab]"}`}
      >
        <FaHome size={18} className="mr-2" />
        <span className="hidden sm:block">Home</span>
      </button>

      {/* Orders */}
      <button
        onClick={() => navigate("/orders")}
        className={`flex-1 mx-1 h-full rounded-[20px] font-bold flex items-center justify-center
        ${isActive("/orders") ? "bg-[#343434] text-[#f5f5f5]" : "text-[#ababab]"}`}
      >
        <MdOutlineReorder size={18} className="mr-2" />
        <span className="hidden sm:block">Orders</span>
      </button>

      {/* Tables */}
      <button
        onClick={() => navigate("/tables")}
        className={`flex-1 mx-1 h-full rounded-[20px] font-bold flex items-center justify-center
        ${isActive("/tables") ? "bg-[#343434] text-[#f5f5f5]" : "text-[#ababab]"}`}
      >
        <MdTableBar size={18} className="mr-2" />
        <span className="hidden sm:block">Tables</span>
      </button>

      {/* More */}
      <button className="flex-1 mx-1 h-full rounded-[20px] font-bold flex items-center justify-center text-[#ababab]">
        <CiCircleMore size={18} className="mr-2" />
        <span className="hidden sm:block">More</span>
      </button>

      {/* Floating Create Order Button */}
      <button
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="absolute left-1/2 -translate-x-1/2 -top-6 bg-[#F6B100] text-white rounded-full p-4 shadow-lg"
      >
        <BiSolidDish size={34} />
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">

        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter customer name"
              className="bg-transparent flex-1 text-white outline-none"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-[#1f1f1f]">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              placeholder="+91-4585956525"
              className="bg-transparent flex-1 text-white outline-none"
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="block mb-2 text-sm font-medium text-[#ababab]">
            Guest
          </label>
          <div className="flex items-center justify-between rounded-lg py-2 px-4 bg-[#1f1f1f]">
            <button onClick={decrement} className="text-yellow-500 text-2xl">
              &minus;
            </button>
            <span className="text-white">{guestCount} Person</span>
            <button onClick={increment} className="text-yellow-500 text-2xl">
              &#43;
            </button>
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          className="w-full bg-[#F6B100] text-white rounded-lg py-3 mt-6 hover:bg-yellow-600"
        >
          Create Order
        </button>

      </Modal>
    </div>
  );
};

export default BottomNav;
