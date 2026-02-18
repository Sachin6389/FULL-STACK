import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function List({ token }) {
  const navigate = useNavigate();
  const backurl = import.meta.env.VITE_BACKEND_URL;
  const currency = "$";

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${backurl}/api/v1/Product/products`);
      if (res.data.success) {
        setList(res.data.massage.reverse());
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(`${backurl}/api/v1/Product/${id}`, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("Product deleted");
        fetchList();
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4">
      <p className="text-xl font-bold text-gray-800">
        Product Management
      </p>

      {list.length > 0 ? (
        <>
          {/* ================= MOBILE VIEW (CARD STYLE) ================= */}
          <div className="grid gap-4 md:hidden">
            {list.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow p-4 flex flex-col gap-3"
              >
                <div className="flex gap-4">
                  <img
                    src={item.FrontImage}
                    alt={item.name}
                    className="h-20 w-20 rounded-lg object-cover border"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.companyName}
                    </span>
                    <span className="text-xs text-gray-500 line-clamp-2">
                      {item.description || "No description"}
                    </span>
                    <span className="text-green-600 font-bold">
                      {currency}{item.price}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-md text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      navigate("/update", { state: { item } })
                    }
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP VIEW (TABLE STYLE) ================= */}
          <div className="hidden md:block overflow-x-auto rounded-lg border bg-white shadow-sm">
            <div className="grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1.5fr] bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600">
              <span>Image</span>
              <span>Name</span>
              <span>Company</span>
              <span>Description</span>
              <span>Price</span>
              <span>Action</span>
            </div>

            {list.map((item, index) => (
              <div
                key={item._id}
                className={`grid grid-cols-[1fr_2fr_2fr_3fr_1fr_1.5fr] px-6 py-4 text-sm items-center
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  hover:bg-gray-100 transition`}
              >
                <img
                  src={item.FrontImage}
                  alt={item.name}
                  className="h-14 w-14 rounded-md border object-cover"
                />
                <span className="font-semibold text-gray-800">
                  {item.name}
                </span>
                <span className="text-gray-600">
                  {item.companyName}
                </span>
                <span className="text-gray-500 line-clamp-2">
                  {item.description || "No description"}
                </span>
                <span className="bg-green-100 px-3 py-1 rounded-full text-xs font-bold text-green-700">
                  {currency}{item.price}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-md text-xs hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      navigate("/update", { state: { item } })
                    }
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="py-10 text-center text-sm text-gray-500">
          No products available
        </div>
      )}
    </div>
  );
}

export default List;
