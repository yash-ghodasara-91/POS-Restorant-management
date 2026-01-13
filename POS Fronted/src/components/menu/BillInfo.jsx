// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { getTotalPrice } from "../../redux/slices/cartSlice";
// import { enqueueSnackbar } from "notistack";
// import { createOrderRazorpay, verifyPaymentRazorpay } from "../../https";


// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };
//     document.body.appendChild(script);
//   });
// }

// const BillInfo = () => {

//   const customerData = useSelector((state) => state.customer)
//   const cartData = useSelector((state) => state.cart);
//   const total = useSelector(getTotalPrice);
//   const taxRate = 5.25;
//   const tax = (total * taxRate) / 100;
//   const totalPriceWithTax = total + tax;


//   const [paymentMethod, setPaymentMethod] = useState();

//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) {
//       enqueueSnackbar("Please select your payment method!", {
//         variant: "warning",
//       });
//       return;
//     }

//     try {
//       const res = await loadScript(
//         "https://checkout.razorpay.com/v1/checkout.js"
//       );

//       if (!res) {
//         enqueueSnackbar("Razorpay SDK failed to load. Are you online?", {
//           variant: "warning",
//         });
//         return;
//       }

//       const reqData = {
//         amount: totalPriceWithTax, // Amount in INR
//         currency: "INR",
//       };

//       const { data } = await createOrderRazorpay(reqData);

//       const options = {
//         key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "RESTRO",
//         description: "Secure Payment for Your Meal",
//         order_id: data.order.id,
//         handler: async function (response) {
//           const verification = await verifyPaymentRazorpay(response);
//           console.log(verification);
//           enqueueSnackbar(verification.data.message, { variant: "success" });
//         },
//         prefill: {
//           name: customerData.name,
//           email: "",
//           contact: customerData.phone,
//         },
//         theme: { color: "#025cca" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.log(error);
//       enqueueSnackbar("Payment Failed!", { variant: "error" });
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium">
//           Item({cartData.length})
//         </p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">₹{total.toFixed(2)}</h1>
//       </div>

//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium mt-2">Tax(5.25%)</p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">₹{tax.toFixed(2)}</h1>
//       </div>

//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium mt-2">Total with Tax</p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">₹{totalPriceWithTax.toFixed()}</h1>
//       </div>

//       <div className="flex items-center gap-3 px-5 mt-4">
//         <button onClick={() => setPaymentMethod("Cash")} className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold cursor-pointer ${paymentMethod === "Cash" ? "bg-[#383737]" : ""}`}>
//           Cash
//         </button>
//         <button onClick={() => setPaymentMethod("Online")} className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold cursor-pointer ${paymentMethod === "Online" ? "bg-[#383737]" : ""}`}>
//           Online
//         </button>
//       </div>

//       <div className="flex items-center gap-3 px-5 mt-4">
//         <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg cursor-pointer">
//           Print Receipt
//         </button>
//         <button onClick={handlePlaceOrder} className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg cursor-pointer">
//           Place Order
//         </button>
//       </div>
//     </>
//   );
// };

// export default BillInfo;


// ==========================================================================================================================================================================================
// ==========================================================================================================================================================================================
// ==========================================================================================================================================================================================

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalPrice, clearCart } from "../../redux/slices/cartSlice";
import { enqueueSnackbar } from "notistack";
// import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  addOrder,
  createOrderRazorpay,
  updateTable,
  verifyPaymentRazorpay
} from "../../https";
import { useMutation } from "@tanstack/react-query";
import { removeCustomer } from "../../redux/slices/customerSlice";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const BillInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();
  const customerData = useSelector((state) => state.customer);
  const cartData = useSelector((state) => state.cart);
  const total = useSelector(getTotalPrice);

  const taxRate = 5.25;
  const tax = (total * taxRate) / 100;
  const totalPriceWithTax = total + tax;
  const finalAmount = Math.round(totalPriceWithTax);

  const [paymentMethod, setPaymentMethod] = useState();

  // ================= ORDER MUTATION =================
  const orderMutation = useMutation({
    mutationFn: (data) => addOrder(data),

    onSuccess: (res) => {
      const order = res.data.data;

      enqueueSnackbar("Order Placed!", { variant: "success" });

      // ✅ TABLE BOOK HERE
      tableUpdateMutation.mutate({
        tableId: order.table,
        status: "Booked",
        orderId: order._id
      });
    },

    onError: (err) => {
      console.log(err);
      enqueueSnackbar("Order failed!", { variant: "error" });
    }
  });




  // ================= TABLE UPDATE =================
  const tableUpdateMutation = useMutation({
    mutationFn: (Data) => updateTable(Data),



    onSuccess: () => {
      // ✅ clear redux
      dispatch(clearCart());
      dispatch(removeCustomer());

      enqueueSnackbar("Order Completed!", { variant: "success" });

      // ✅ IMPORTANT: redirect to Tables
      setTimeout(() => {
        navigate("/tables");
      }, 800);
    },

    onError: (error) => {
      console.log(error);
      enqueueSnackbar("Table update failed!", { variant: "error" });
    }
  });


  // ================= PAYMENT HANDLER =================
  const handlePlaceOrder = async () => {

    // ❌ CASH abhi allowed nahi
    if (paymentMethod !== "Online") {
      enqueueSnackbar("Please select Online payment", { variant: "warning" });
      return;
    }

    try {
      const loaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!loaded) {
        enqueueSnackbar("Razorpay SDK failed to load", {
          variant: "error"
        });
        return;
      }

      const { data } = await createOrderRazorpay({ amount: finalAmount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "RESTRO",
        description: "Food Payment",
        order_id: data.order.id,

        handler: async function (response) {
          const verify = await verifyPaymentRazorpay(response);

          enqueueSnackbar(verify.data.message, {
            variant: "success"
          });

          const orderData = {
            customerDetailes: {               // ✅ SAME spelling as backend
              name: customerData.customerName,
              phone: customerData.customerPhone,  // ✅ lowercase phone
              guests: customerData.guests
            },
            orderStatus: "In Progress",
            bills: {
              total: total,
              tax: tax,
              totalWithTax: totalPriceWithTax
            },
            items: cartData,
            table: customerData.table.tableId
          };



          orderMutation.mutate(orderData);
        },

        prefill: {
          name: customerData.customerName,
          contact: customerData.phone
        },

        theme: { color: "#025cca" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error);
      enqueueSnackbar("Payment Failed!", { variant: "error" });
    }
  };

  return (
    <>
      <div className="flex justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab]">
          Item({cartData.length})
        </p>
        <p className="text-white">₹{total.toFixed(2)}</p>
      </div>

      <div className="flex justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab]">Tax (5.25%)</p>
        <p className="text-white">₹{tax.toFixed(2)}</p>
      </div>

      <div className="flex justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab]">Total</p>
        <p className="text-white">₹{finalAmount}</p>
      </div>

      <div className="flex gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`w-full py-3 rounded ${paymentMethod === "Cash" ? "bg-[#383737]" : "bg-[#1f1f1f]"
            } text-[#ababab]`}
        >
          Cash
        </button>

        <button
          onClick={() => setPaymentMethod("Online")}
          className={`w-full py-3 rounded ${paymentMethod === "Online" ? "bg-[#383737]" : "bg-[#1f1f1f]"
            } text-[#ababab]`}
        >
          Online
        </button>
      </div>

      <div className="flex gap-3 px-5 mt-4">
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] w-full py-3 rounded font-semibold"
        >
          Place Order
        </button>
      </div>
    </>
  );
};

export default BillInfo;
