// INVOICE COMPONENT

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";

const Invoice = ({ orderInfo, setShowInvoice }) => {
  const invoiceRef = useRef(null);

  if (!orderInfo) return null;

  // 🔒 SAFE DATA EXTRACTION
  const customer =
    orderInfo.customerDetails || orderInfo.customerDetailes || {};

  const items = orderInfo.items || [];
  const bills = orderInfo.bills || {};

  // 🖨️ PRINT FUNCTION
  const handlePrint = () => {
    if (!invoiceRef.current) return;

    const printContent = invoiceRef.current.innerHTML;
    const WinPrint = window.open("", "", "width=900,height=650");

    WinPrint.document.write(`
      <html>
        <head>
          <title>Order Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            .receipt-container {
              width: 300px;
            }
            h2 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    WinPrint.document.close();
    WinPrint.focus();

    setTimeout(() => {
      WinPrint.print();
      WinPrint.close();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[400px]">

        {/* RECEIPT CONTENT */}
        <div ref={invoiceRef} className="p-4 receipt-container">

          {/* SUCCESS ICON */}
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 150 }}
              className="w-12 h-12 border-4 border-green-500 rounded-full flex items-center justify-center bg-green-500"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FaCheck className="text-white text-xl" />
              </motion.span>
            </motion.div>
          </div>

          {/* HEADER */}
          <h2 className="text-xl font-bold text-center mb-1">
            Order Receipt
          </h2>
          <p className="text-gray-600 text-center text-sm">
            Thank you for your order!
          </p>

          {/* ORDER DETAILS */}
          <div className="mt-4 border-t pt-4 text-sm text-gray-700 space-y-1">
            <p>
              <strong>Order ID:</strong>{" "}
              {orderInfo._id || "—"}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {orderInfo.createdAt
                ? new Date(orderInfo.createdAt).toLocaleString()
                : "-"}
            </p>
            <p>
              <strong>Name:</strong> {customer.name || "Guest"}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone || "-"}
            </p>
            <p>
              <strong>Guests:</strong> {customer.guests || "-"}
            </p>
          </div>

          {/* ITEMS */}
          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-semibold mb-2">
              Items Ordered
            </h3>

            <ul className="text-sm text-gray-700 space-y-1">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between text-xs"
                >
                  <span>
                    {item.name} × {item.qty || item.quantity || 1}
                  </span>
                  <span>
                    ₹{item.total ?? item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* BILL SUMMARY */}
          <div className="mt-4 border-t pt-4 text-sm space-y-1">
            <p>
              <strong>Subtotal:</strong>{" "}
              ₹{bills.total?.toFixed?.(2) || bills.total || 0}
            </p>
            <p>
              <strong>Tax:</strong>{" "}
              ₹{bills.tax?.toFixed?.(2) || bills.tax || 0}
            </p>
            <p className="text-md font-semibold">
              <strong>Grand Total:</strong>{" "}
              ₹{bills.totalWithTax?.toFixed?.(2) || bills.totalWithTax || 0}
            </p>
          </div>

          {/* PAYMENT */}
          <div className="mt-4 border-t pt-4 text-xs space-y-1">
            <p>
              <strong>Payment Method:</strong>{" "}
              {orderInfo.paymentMethod || "-"}
            </p>

            {orderInfo.paymentMethod === "Online" && (
              <>
                <p>
                  <strong>Razorpay Order ID:</strong>{" "}
                  {orderInfo.paymentData?.razorpay_order_id || "-"}
                </p>
                <p>
                  <strong>Razorpay Payment ID:</strong>{" "}
                  {orderInfo.paymentData?.razorpay_payment_id || "-"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrint}
            className="text-blue-500 hover:underline text-xs px-4 py-2"
          >
            Print Receipt
          </button>

          <button
            onClick={() => setShowInvoice(false)}
            className="text-red-500 hover:underline text-xs px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;