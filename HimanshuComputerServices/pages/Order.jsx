import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Axios from "axios";
import Tittle from "../components/Tittle.jsx";
import { fetchProducts } from "../Storage/Product.js";

function Order() {
    const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  const userData = useSelector((state) => state.auth.userdata);
  const { productList } = useSelector((state) => state.product);
  
  
  const currency = useSelector((state) => state.product.currency);

  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL_ORDER;

  const loadOrders = async () => {
    try {
      const response = await Axios.post(
        `${backendURL}/getuserorder`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userData?.accessToken}`,
          },
        }
      );

      if (response.data?.success) {
        const allOrders = response.data.massage.flatMap(order =>
          order.items.map(item => ({
            ...item,
            orderDate: order.orderDate,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
          }))
        );
        
        

        setOrderData(allOrders.reverse());
      }
    } catch (err) {
      console.error(err);
      setError("Network error, please try again");
    }
  };

  useEffect(() => {
    if (userData?.accessToken) loadOrders();
  }, [userData?.accessToken]);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="pt-16 border-t px-4 md:px-8 lg:px-16 pb-8 space-y-6  min-h-screen">
      <div className="text-2xl px-8">
        <Tittle text1="ORDER" text2="SUMMARY" />
      </div>

      {orderData.map((item, index) => {
  const productData = productList.find(
    (p) => p._id === item._id
  );

  if (!productData) return null;

  return (
    <div
      key={index}
      className="
        mt-0
        
        p-4
        border
        rounded-lg
        shadow-sm
        hover:shadow-md
        transition
        bg-white
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        
        gap-6
      "
    >
      {/* LEFT SECTION */}
      <div className="flex gap-4 items-start">
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border"
          src={productData.FrontImage}
          alt={productData.name}
        />

        <div className="flex flex-col gap-1">
          <p className="text-base sm:text-lg font-semibold text-gray-800">
            {productData.name}
          </p>

          <p className="text-sm text-gray-600">
            Price: <span className="font-medium">{currency}{item.price}</span>
          </p>

          <p className="text-sm text-gray-600">
            Date: {new Date(item.orderDate).toLocaleDateString()}
          </p>

          <p className="text-sm text-gray-600">
            Payment:{" "}
            <span className="font-medium">
              {item.payment ? "Paid" : item.paymentMethod}
            </span>
          </p>

          {/* QUANTITY — visible everywhere */}
          <span
            className="
              mt-2
              inline-flex
              w-fit
              items-center
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
              bg-blue-100
              text-blue-700
            "
          >
            Quantity: {item.quantity}
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="  flex py-8 items-center justify-between md:justify-end gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
          <p className="text-sm font-medium capitalize text-gray-700 py-6">
            {item.status}
          </p>
        </div>

        <button onClick={loadOrders}
          className="
            px-10
            py-2
            text-sm
            font-medium
            border
            rounded-lg
            text-gray-700
            hover:bg-gray-100
            transition
          "
        >
          Track Order
        </button>
      </div>
    </div>
  );
})}

    </div>
  );
}

export default Order;
