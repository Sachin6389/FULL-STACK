import { useState ,useEffect} from 'react'
import  {useDispatch,useSelector} from 'react-redux'
import './App.css'
import SearchBAr from '../Componet/SearchBAr.jsx'

import {Header,Fottar}from '../Componet/index.js'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { logout } from  "../Storage/auth.js";
import { login as authLogin } from  "../Storage/auth.js";
import ScrollToTop from '../Componet/ScrollToTop.jsx';
function App() {
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    const checkToken = async () => {
      const stored = localStorage.getItem("userdata");
      
      
      if (!stored) {
        dispatch(logout());
        return;
      }
  
      let userdata;
      try {
        userdata = JSON.parse(stored);
        
        
      } catch {
        dispatch(logout());
        return;
      }
  
      if (!userdata?.refreshToken) {
        dispatch(logout());
        return;
      }
  
      try {
        const res = await axios.post(
          import.meta.env.VITE_BACKEND_URL_REFRESH,
          { refreshToken: userdata.refreshToken },
          
        );
  
        const accessToken = res.data.massage.accessToken;
        const refreshToken = res.data.massage.refreshToken;
      
        
        
        
  
        if (!accessToken || !refreshToken) {
          dispatch(logout());
          return;
        }
  
        userdata.accessToken = accessToken;
        userdata.refreshToken = refreshToken;
      
  
        // 🔥 update Redux + localStorage
        dispatch(authLogin(userdata));
        
        
        
      } catch (error) {
        dispatch(logout());
      }
    };
  
    checkToken();
  }, [dispatch]);
 

  return (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'><div
    className='w-full block'>
      <ScrollToTop />
      <Header/>
      <SearchBAr/>
      
      <main>
        <Outlet/>
        </main>
        <Fottar/></div></div>
  )
}

export default App
