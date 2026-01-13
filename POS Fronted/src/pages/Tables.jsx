import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { useSnackbar } from "notistack";


const Tables = () => {
  const [status, setStatus] = useState("all");
  const { enqueueSnackbar } = useSnackbar();


  const { data: resData, isError } = useQuery({
    queryKey: ['tables'],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData
  })

  if (isError) {
    enqueueSnackbar("Something went Wrong!", { variant: "error" });
  }

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex justify-between items-center px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
            Tables
          </h1>
        </div>

        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
              } rounded-lg px-5 py-2 font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg ${status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"
              } rounded-lg px-5 py-2 font-semibold`}
          >
            Booked
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 px-10 py-5 items-center justify-center overflow-y-scroll h-[calc(102vh-4rem-10rem)] scrollbar-hide">
        {
          resData?.data.data.map((table) => {
            return (
              <TableCard
                key={table._id}
                id={table._id}
                name={table.tableNo}
                status={table.status}
               initials={table?.currentOrder?.customerDetailes?.name}
                seats={table.seats} />
            )
          })

        }
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
