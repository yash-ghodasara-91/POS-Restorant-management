import React from "react";
import { FaCheckDouble, FaCircle } from "react-icons/fa";

const OrderList = () => {
  return (
    <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4 w-full shadow-md">

      {/* Top Row */}
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className="bg-[#f6b100] min-w-[48px] h-[48px] rounded-lg flex items-center justify-center font-bold text-black">
          YG
        </div>

        {/* Name + Items */}
        <div className="flex flex-col flex-1">
          <h1 className="text-[#f5f5f5] text-base font-semibold">
            Ghodasara Yash
          </h1>
          <p className="text-[#ababab] text-sm">8 Items</p>
        </div>

        {/* Status */}
        <div className="flex flex-col items-end">
          <p className="text-green-600 text-sm font-medium">
            <FaCheckDouble className="inline mr-1" />
            Ready
          </p>
          <p className="text-[#ababab] text-xs">
            <FaCircle className="inline mr-1 text-green-600" />
            Ready to serve
          </p>
        </div>
      </div>

      {/* Table Info */}
      <div className="mt-3">
        <p className="border border-[#f6b100] text-[#f6b100] text-sm font-medium rounded-lg px-4 py-2">
          Table No: 3
        </p>
      </div>

    </div>
  );
};

export default OrderList;
