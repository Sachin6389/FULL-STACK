import React, { useEffect, useState } from 'react';
import { assets } from "../src/assets/Assets.js";
import { useSelector, useDispatch } from 'react-redux';
import Tittle from '../Componet/Tittle.jsx';
import ProductDisplay from '../Componet/ProductDisplay.jsx';
import { fetchProducts } from "../Storage/Product.js";

function Collection() {
  const dispatch = useDispatch();

  // Fetch products on mount
  useEffect(() => { 
    dispatch(fetchProducts());
  }, [dispatch]);

  const { productList: product = [], loading, error } = useSelector((state) => state.product);
  
  
  const searchshow = useSelector((state) => state.product.showsearch);
  const search = useSelector((state) => state.product.search);

  const [filter, setFilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // ✅ Update filter list whenever products change
  useEffect(() => {
    setFilterProduct(product);
  }, [product , setFilterProduct]);

  // ✅ Category toggle function
  const toggleCategory = (e) => {
    const value = e.target.value;
    
    
    if (category.includes(value)) {
        

      setCategory((prev) => prev.filter((item) => item !== value));
      
      
    } else {
      setCategory((prev) => [...prev, value]);
    }
  };

  // ✅ Apply filters (search + category)
  const Apply = () => {
    let productCopy = [...product];

    if (searchshow && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      console.log(category);
      
      productCopy = productCopy.filter((item) =>
        
        
        category.includes(item.companyName.toLowerCase())
      );
    }
    
    

    setFilterProduct(productCopy);
    
    
  };

  // ✅ Sort products
  const SortByPrice = () => {
    let sortedCopy = [...filterProduct];

    switch (sortType) {
      case "low-high":
        sortedCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sortedCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        Apply();
        return;
    }

    setFilterProduct(sortedCopy);
  };

  // Re-run Apply when filters/search changes
  useEffect(() => {
    Apply();
  }, [category, search, searchshow]);

  // Re-run sorting when sortType changes
  useEffect(() => {
    SortByPrice();
  }, [sortType]);

  // ✅ Loading & error states
  if (loading) return <p>Loading...</p>;
  if (error) return <h2 style={{ color: "red" }}>❌ Error: {error}</h2>;

  return (
    <div className="flex flex-col sm:flex-row sm:gap-10 pt-10 border-t">
      {/* LEFT SIDEBAR FILTERS */}
      <div className="min-w-60">
        <p
          onClick={() => setFilter(!filter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 text-black-500"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${filter ? "rotate-90" : ""}`}
            src={assets.back}
            alt=""
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            filter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-70  ">
            {["apple", "dell", "hp", "acer"].map((brand) => (
              <label key={brand} className="flex gap-2 text-2xl text-black ">
                <input
                  className="w-3 "
                  type="checkbox"
                  value={brand}
                  onChange={toggleCategory}
                />
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PRODUCT GRID */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl  px-4 items-center h-6 w-full">
          <Tittle text1={"ALL"} text2={"COLLECTION"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 px-2 text-sm font-medium text-black bg-amber-50"
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 px-3">
          {filterProduct.map((item, index) => (
            <ProductDisplay
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.FrontImage}
              company={item.companyName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Collection;
