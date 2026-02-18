import { useEffect, useState } from 'react'
import './App.css'
import Navebar from './components/Navebar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import Update from './pages/Update.jsx'
import Order from './pages/Order.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify'

function App() {
  const [token, settoken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"")
  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])

  return (
    
    <div className="min-h-screen bg-gray-50">
      <ToastContainer/>
      { token==="" ? 
      <Login settoken={settoken}/>
      : <>
       {/* Navbar at the top */}
      <Navebar settoken={settoken} />
      <hr/>

      <div className="flex w-full">
        {/* Sidebar on the left */}
        <Sidebar  />
        <div>
          <Routes>
            <Route  path='/add' element={<Add token={token}/>}/>
            <Route  path='/products' element={<List token={token}/>}/>
            <Route  path='/update' element={<Update token={token}/>}/>
            <Route  path='/order' element={<Order token={token}/>}/>
            
          </Routes>
        </div>

        
      </div>
      </>}
      
    </div>
    
  )
}

export default App
