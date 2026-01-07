import React from "react";
import { getAvtarName, getBgColor } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { FaLongArrowAltRight } from "react-icons/fa";

const TableCard = ({ key, name, status, initials, seats }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleClick = (name) => {
    if (status === "Booked") return;
    dispatch(updateTable({tableNo: name}))
    navigate(`/menu`);
  };

  return (
    <div
      onClick={() => handleClick(name)}
      key={key}
      className="w-[340px] hover:bg-[#2c2c2c] bg-[#262626] rounded-lg p-4 cursor-pointer shadeow"
    >
      <div className="flex justify-between items-center px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">Table <FaLongArrowAltRight className="taxt-[#ababab] ml-2 inline" /> {name}</h1>
        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-white"
          } px-2 py-1 p-1 rounded-lg`}
        >
          {status}
        </p>
      </div>
      <div className="flex justify-center items-center my-5 mb-9  ">
        <h1 className={` text-white rounded-full p-5 text-xl`} style={{backgroundColor : initials ?  getBgColor() : "#1f1f1f"}}>
          {getAvtarName(initials) || "N/A"}
        </h1>
      </div>
      <p className="text-[#ababab] text-xs">Seats: <span className="text-[#f5f5f5]">{seats}</span></p>
    </div>
  );
};

export default TableCard;
