import React from 'react'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store  from '../Storage/Storagedata.js'
import ChangedPassword from '../pages/ChangedPassword.jsx'
import Profile from '../pages/Profile.jsx'
import EditProfile from '../pages/EditProfile.jsx'

import ReactDOM from 'react-dom/client'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home.jsx'
import { Login } from "../Componet/index.js"
import AuthLayout from '../Componet/Protector/AuthLayout.jsx'
import About from '../pages/About.jsx'
import Signup from '../Componet/Signup.jsx'
import Contact from '../pages/Contact.jsx'
import Product from '../pages/Product.jsx'
import Carts from '../pages/Carts.jsx'
import OrderPlace from '../pages/OrderPlace.jsx'
import Order from '../pages/Order.jsx'
import Collection from '../pages/Collection.jsx'
import SearchBAr from '../Componet/SearchBAr.jsx'
import Logout from '../Componet/Header/Logout.jsx'
import Verify from '../pages/Verify.jsx'






const router=createBrowserRouter([
  { path:"/",
    element:<App/>,
    children:[
      { index: true, element: <Home /> },
      {
        path:"/Home",
        element:<Home/>,
      },
      {
        path:"/verify",
        element:<Verify/>

      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
            </AuthLayout>
        ),
      },
      
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        ),
      },
      {
        path:"/about",
        element:(
          <AuthLayout authentication>
            {""}
           <About/>
          </AuthLayout>
        ),
      },
      {
        path:"/profile",
        element:(
          <AuthLayout authentication>
            {""}
           <Profile/>
          </AuthLayout>
        ),
      },
      {
        path:"/EditProfile",
        element:(
          <AuthLayout authentication>
            {""}
           <EditProfile/>
          </AuthLayout>
        ),
      },
      {
        path:"/contact",
        element:(
          <AuthLayout authentication>
            {""}
           <Contact/>
          </AuthLayout>
        ),
      },
     
       {
        path:"/changed-password",
        element:(
          <AuthLayout authentication>
            {""}
            <ChangedPassword/>
          </AuthLayout>
        ),
      },
      {
        path:'/product/:productId',
        element:(
          
            <Product/>
          
        ),
      },
      {
        path:'/cart',
        element:(
          <AuthLayout authentication>
            {""}
            
            <Carts/>
          </AuthLayout>
        ),
      },
      {
        path:'/place-order',
        element:(
          <AuthLayout authentication>
            {""}
            <OrderPlace/>
          </AuthLayout>
        ),
      },
      {
        path:'/orders',
        element:(
          <AuthLayout authentication>
            {""}
            <Order/>
          </AuthLayout>
        ),
      },
       {
        path:'/collection',
        element:(
          <AuthLayout authentication>
            {""}
            <Collection/>
          </AuthLayout>
        ),
      },
      {
        path:'/search',
        element:(
          <AuthLayout authentication>
            {""}
            <SearchBAr/>
          </AuthLayout>
        ),
      },
        {
        path:'/logout',
        element:(
          <AuthLayout authentication>
            {""}
            <Logout/>
          </AuthLayout>
        ),
      },
      
      
      
    ],
     }
])







ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      
    <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)
