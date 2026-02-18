import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Update({ token }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.item;

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    companyName: "",
  });

  const [images, setImages] = useState({
    top: null,
    bottom: null,
    front: null,
    back: null,
  });

  const [preview, setPreview] = useState({});

  /* ------------------ preload data ------------------ */
  useEffect(() => {
    if (!product) {
      toast.error("No product data found");
      navigate("/products");
      return;
    }

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      companyName: product.companyName,
    });

    setPreview({
      top: product.TopImage,
      bottom: product.BottomImage,
      front: product.FrontImage,
      back: product.BackImage,
    });
  }, [product, navigate]);

  /* ------------------ input change ------------------ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ------------------ image change ------------------ */
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    setImages({ ...images, [name]: file });
    setPreview({ ...preview, [name]: URL.createObjectURL(file) });
  };

  /* ------------------ submit ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("productId", product._id);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("companyName", formData.companyName);

      data.append("top", images.top);
      data.append("bottom", images.bottom);
      data.append("front", images.front);
      data.append("back", images.back);

      const res = await axios.post(
        `${BACKEND_URL}/api/v1/Product/update`,
        data,
        {
          headers: {
            token:token
            
          },
        }
      );
      
      

      if (res.data.success) {
        toast.success("Product updated successfully");
        
      }
    } catch (error) {
        
        
      toast.error(error?.response?.data?.message || "Update failed");
    }
  };

 return (
  <div className="w-full min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-10">
    <div className="max-w-6xl mx-auto">
      
      <h2 className="mb-8 text-2xl sm:text-3xl font-bold text-gray-800">
        Update Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-6 sm:p-8"
      >
        {/* ================= PRODUCT DETAILS ================= */}
        <h3 className="mb-6 text-lg font-semibold text-gray-700 border-b pb-2">
          Product Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* ================= PRODUCT IMAGES ================= */}
        <h3 className="mt-10 mb-6 text-lg font-semibold text-gray-700 border-b pb-2">
          Product Images
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { key: "top", label: "Top Image" },
            { key: "bottom", label: "Bottom Image" },
            { key: "front", label: "Front Image" },
            { key: "back", label: "Back Image" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="border rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
            >
              <label className="block mb-3 text-sm font-medium text-gray-600">
                {label}
              </label>

              <input
                type="file"
                name={key}
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm"
              />

              {preview[key] && (
                <img
                  src={preview[key]}
                  alt={label}
                  className="mt-4 h-36 w-full rounded-lg border object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="w-full sm:w-auto flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Update Product
          </button>
        </div>

      </form>
    </div>
  </div>
);

}

export default Update;
