import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Order({ token }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${backendUrl}/api/v1/Order/getorders`, {
        headers: {
          token: token,
        },
      });
      console.log(response);
      

      if (response.data?.success) {
        setOrders(response.data.massage.reverse() || []);
        toast.success(response.data.data);
      }
    } catch (err) {
      console.log(err);
      
      setError("Error fetching orders");
      toast.error(err.response?.data?.massage || "Failed to fetch orders");

    } finally {
      setLoading(false);
    }
  };
  const StatusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/Order/updatestatus`,
        {
          orderId,
          status: e.target.value,
        },
        {
          headers: {
            token: token,
          },
        },
      );
      if (response.data.success) {
        toast.success(response.data.data);
        await fetchOrders();
      }
    } catch (error) {
      toast.error(error.response.data.massage
);
    }
  };
  const DeleteHandler = async (orderId) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/v1/Order/deleteOrder`,
        {orderId} ,
        {
        headers: {
          token: token,
        },
      }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.data);

        await fetchOrders();
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.massage
);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (!token) {
    return <p className="text-center mt-10">Please login to view orders</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="  bg-white shadow-sm grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 md:my-4 text-xs texte-gray-700"
          >
            {/* ORDER HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
              <div className="text-sm text-gray-700">
                <p className="text-gray-800 font-bold border-b py-1">
                  ID & Date:-
                </p>
                <p>
                  <span className="font-medium ">Order ID:</span> {order._id}
                </p>
                <p>
                  <span className="font-medium">User ID:</span> {order.userId}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="capitalize">
                  <span className="font-medium">Status:</span> {order.status}
                </p>
              </div>

              <div className="text-sm text-gray-700 px-4 border-l border-gray-500 mb-1">
                <p className="text-gray-800 font-bold border-b py-1">Fees:-</p>
                <p>
                  <span className="font-medium">Total:</span> ₹
                  {order.totalAmount}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {order.payment ? "Paid" : order.paymentMethod}
                </p>
              </div>
            </div>

            {/* CUSTOMER DETAILS */}
            <div className=" text-sm text-gray-700 px-4 border-x border-gray-500 mb-2">
              <p className="text-gray-800 font-bold border-b  md-1 ">
                Delivery Details:-
              </p>
              <p>{order.address.fullName}</p>
              <p>{order.address.email}</p>
              <p>{order.address.phone}</p>
              <p>
                {order.address.address}, {order.address.City},{" "}
                {order.address.State} - {order.address.PinCode}
              </p>
            </div>

            {/* ORDER ITEMS */}
            <div className=" text-sm text-gray-700 px-4 border-f border-gray-500  ">
              <p className="text-gray-800 font-bold border-b py-1">Items:-</p>
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="text-sm text-gray-700 flex flex-col gap-1"
                >
                  <p>
                    <span className="font-medium">Product ID:</span> {item._id}
                  </p>

                  {/* Quantity at bottom */}
                  <span
                    className="
      mt-2
      w-fit
      px-3
      py-1
      rounded-full
      bg-blue-100
      text-blue-700
      text-xs
      font-semibold
    "
                  >
                    Quantity: {item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <select
              onChange={(e) => StatusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold border-2 rounded-lg border-gray-500"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="out of delivery">Out of Delivery</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this order?")
                ) {
                  DeleteHandler(order._id);
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Order;
