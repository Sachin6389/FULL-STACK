import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addtocart as addToCartAction } from "../Storage/Product";
import { assets } from "../src/assets/Assets";
import RelatedProduct from "../Componet/RelatedProduct";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../Storage/Product.js";

function Product() {
  const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch]);
  const { productId } = useParams();
  

  const { productList, loading, error } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.product.currency);
  
  

  const [cartData, setCartData] = useState([]);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  const addToCart = (itemId, price) => {
    const newItem = { _id: itemId, price, quantity: 1 };

    const existingIndex = cartData.findIndex(
      (item) => item._id === itemId && item.price === price
    );

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cartData];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + 1,
      };
    } else {
      updatedCart = [...cartData, newItem];
    }

    setCartData(updatedCart);
    dispatch(addToCartAction(updatedCart));
  };

  // Load single product
  useEffect(() => {
    const found = productList.find((item) => item._id === productId);

    if (found) {
      setProductData(found);
      setImage(found.FrontImage || "");
    }
  }, [productId, productList]);

  const { FrontImage, BackImage, TopImage, BottomImage } = productData || {};

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return (
      <div className="text-center py-20 text-red-500">Error: {error}</div>
    );

  if (!productData)
    return (
      <div className="text-center py-20 text-gray-600">
        Product not found.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <div className="flex flex-col lg:flex-row gap-10">

        {/* Image Thumbnails */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-scroll w-full lg:w-[15%] px-2">
          {[FrontImage, BackImage, TopImage, BottomImage]
            .filter(Boolean)
            .map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${productData?.name || "Product"} ${idx + 1}`}
                className={`cursor-pointer rounded-lg border p-1 hover:scale-105 transition-transform ${
                  image === img ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setImage(img)}
              />
            ))}
        </div>

        {/* Main Image */}
        <div className="w-full lg:w-[50%] flex justify-center items-center max-h-min">
          <img
            src={image}
            alt={productData?.name || "Product Image"}
            className="rounded-xl shadow-lg object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            {productData?.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <img
                  key={i}
                  src={assets.iconStar}
                  alt="star"
                  className="w-5 h-5"
                />
              ))}
            <span className="ml-2 text-gray-600 text-sm">
              {productData.rating} / 5
            </span>
          </div>

          {/* Price */}
          <p className="text-4xl font-bold text-gray-900 mt-4">
            {currency} {productData.price}
          </p>

          {/* Description */}
          <p className="text-gray-600 mt-4">{productData.description}</p>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, productData.price)}
            className="mt-6 bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="mt-6 text-gray-700 text-sm flex flex-col gap-1">
            <p>✅ 100% Original product</p>
            <p>💵 Cash on delivery available</p>
            <p>🔄 Easy return/exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-14">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <RelatedProduct category={productData.companyName} />
      </div>
    </div>
  );
}

export default Product;
