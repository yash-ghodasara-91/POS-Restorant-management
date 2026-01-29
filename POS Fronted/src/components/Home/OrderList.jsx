import React from "react";
import { FaCheckDouble, FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import { getAvtarName } from "../../utils";

const OrderList = ({  order }) => {
  return (
    <div className="bg-[#1f1f1f] rounded-xl p-4 mb-4 w-full shadow-md">

      {/* Top Row */}
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className="bg-[#f6b100] min-w-[48px] h-[48px] rounded-lg flex items-center justify-center font-bold text-black">
          {getAvtarName(order.customerDetailes.name)}
        </div>

        {/* Name + Items */}
        <div className="flex flex-col flex-1">
          <h1 className="text-[#f5f5f5] text-base font-semibold">
            {order.customerDetailes.name}
          </h1>
          <p className="text-[#ababab] text-sm">{order.items.length} Items</p>
        </div>

        {/* Status */}
        <div className="flex flex-col items-end">
          {
            order.orderStatus === "Ready" ? (
              <>
                <p className=" text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className=" inline mr-2" />{order.orderStatus}</p>
              </>
            ) : (
              <>
                <p className=" text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCheckDouble className=" inline mr-2" />{order.orderStatus}</p>
              </>
            )
          }
        </div>
      </div>

      {/* Table Info */}
      <div className="mt-3">
        <p className="border border-[#f6b100] text-[#f6b100] text-sm font-medium rounded-lg px-4 py-2">
          Table No <FaLongArrowAltRight className="taxt-[#ababab] ml-2 inline" /> {order?.table?.tableNo}
        </p>
      </div>

    </div>
  );
};

export default OrderList;
