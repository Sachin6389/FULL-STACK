import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function List({ token }) {
  const navigate = useNavigate();
  const backurl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";

  const [list, setList] = useState([]);

  // Fetch products
  const fetchList = async () => {
    try {
      const res = await axios.get(`${backurl}/api/v1/Product/products`);

      if (res.data.success) {
        setList(res.data.massage.reverse());
        toast.success(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.data || "Failed to fetch products");
    }
  };

  // Delete product
  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(`${backurl}/api/v1/Product/${id}`, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success(res.data.data);
        fetchList();
      }
    } catch (error) {
      toast.error(error?.response?.data?.data || "Delete failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className ="flex flex-col gap-1 p-2">
      <p className="mb-4  text-xl font-bold text-gray-800">
        Product Management
      </p>

      <div className="w-full overflow-x-auto rounded-lg border bg-white shadow-sm">
        {/* Header */}
        <div className="sticky top-0 z-10 grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1.5fr] place-items-center bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600">
          <span>Image</span>
          <span>Name</span>
          <span>Company</span>
          <span>Description</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={item._id}
              className={`grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1.5fr] place-items-center px-6 py-4 text-sm
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                hover:bg-gray-100 transition`}
            >
              {/* Image */}
              <img
                src={item.FrontImage}
                alt={item.name}
                className="h-14 w-14 rounded-md border object-cover"
              />

              {/* Name */}
              <span className="font-semibold text-gray-800">{item.name}</span>

              {/* Company */}
              <span className="text-gray-600">{item.companyName}</span>

              {/* Description */}
              <span className="w-full text-left text-sm text-gray-500 line-clamp-2">
                {item.description || "No description"}
              </span>

              {/* Price */}
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                {currency}
                {item.price}
              </span>

              {/* Action */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeProduct(item._id)}
                  className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-1.5 text-xs font-semibold text-white
                             hover:bg-red-600 active:scale-95 transition"
                >
                  🗑 Delete
                </button>

                <button
                  onClick={() =>
                    navigate("/update", { state: { item } })
                  }
                  className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white
                             hover:bg-blue-700 active:scale-95 transition"
                >
                  ✏️ Update
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-sm text-gray-500">
            No products available
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
