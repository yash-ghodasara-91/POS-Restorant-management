import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/Orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https";
import { enqueueSnackbar } from "notistack"

const Orders = () => {

  const [status, setStatus] = useState("all");

  const {data: resData, isError} = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData:keepPreviousData
  })

  if(isError) {
    enqueueSnackbar("Something Went Wrong!", {variant: "error"})
  }

  return (
    <section className="bg-[#121212] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex justify-between items-center px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
            Orders
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>
            All
          </button>
          <button onClick={() => setStatus("process")} className={`text-[#ababab] text-lg ${status === "process" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>
            In Progress
          </button>
          <button onClick={() => setStatus("ready")} className={`text-[#ababab] text-lg ${status === "ready" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}>
            Ready
          </button>
          <button onClick={() => setStatus("completed")} className={`text-[#ababab] text-lg ${status === "completed" && "bg-[#383838] rounded-lg px-5 py-2"} rounded-lg px-5 py-2 font-semibold`}
            >
            Completed
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center justify-center px-8 py-4 overflow-y-scroll h-[calc(100vh-5rem-11rem)] scrollbar-hide">
        {
          resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => {
              return <OrderCard key={order._id} order={order} />
            })
          ) : <p className="col-span-3 text-gray-500 " >No Orders available</p>
        }
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
