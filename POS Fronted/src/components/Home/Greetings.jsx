import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Greetings = () => {

  const userData = useSelector(state => state.user);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatData = (date) => {
    const months = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
  };

  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, '0')} : ${String(
      date.getMinutes()
    ).padStart(2, '0')} : ${String(date.getSeconds()).padStart(2, '0')}`;

  return (
    <div
      className="
        flex flex-col gap-3
        sm:flex-row sm:justify-between sm:items-center
        px-4 sm:px-8
        mt-5
      "
    >
      {/* Greeting */}
      <div>
        <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-semibold tracking-wide leading-snug">
          Good Morning, {userData.name || "TEST USER"}
        </h1>
        <p className="text-[#ababab] text-sm">
          Give your best services for customers 😀
        </p>
      </div>

      {/* Time */}
      <div className="sm:text-right">
        <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wide whitespace-nowrap">
          {formatTime(dateTime)}
        </h1>
        <p className="text-[#ababab] text-sm ">
          {formatData(dateTime)}
        </p>
      </div>
    </div>
  )
}

export default Greetings;
