import { useEffect, useState } from "react";
import "./App.css";
import Navebar from "./components/Navebar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Update from "./pages/Update.jsx";
import Order from "./pages/Order.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home.jsx";

function App() {
  const [token, settoken] = useState(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">

      <ToastContainer />

      {token === "" ? (
        <Login settoken={settoken} />
      ) : (
        <>
          {/* Navbar */}
          <Navebar settoken={settoken} />
          <hr />

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row w-full">

            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white shadow-md">
              <Sidebar />
            </div>

            {/* Page Content */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 min-h-[80vh]">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/products" element={<List token={token} />} />
                  <Route path="/update" element={<Update token={token} />} />
                  <Route path="/order" element={<Order token={token} />} />
                </Routes>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default App;
