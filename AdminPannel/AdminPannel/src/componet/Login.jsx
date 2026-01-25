import React from 'react'
import { useState } from 'react'
import axios, {Axios} from "axios"
import {toast} from "react-toastify"



function Login({settoken}) {
 const backurl= import.meta.env.VITE_BACKEND_URL

    const[password,setpassword]=useState("")
      const[email ,setemail]=useState("")
    const OnSubmitHandler=async(e)=>{
    try {
        e.preventDefault()
        const res = await axios.post(`${backurl}/api/v1/users/AdminLogin`,{email,password})
        
        if (res.data.massage) {
            settoken(res.data.massage)
            toast.success(res.data.data)
        }
        
        
       
    } catch (error) {
         
         
        toast.error(error.response?.data?.massage)
        
    }
}
    return (
        <div className='min-h-screen w-full flex border-2 items-center justify-center'>
            <div  className=' bg-white shadow-md rounded-lg px-4 py-6 max-w-md'>
                <h1 className=' text-2xl font-bold text-center py-2'>Admin-Pannel</h1>
                <form onSubmit={OnSubmitHandler} >
                    <div className='md-3 min-w-72'>
                        <p className='text-1xl font-medium text-gray-700 md-2 px-4 py-1'>Email-Id</p>
                        <input className='border-2 w-full border-r-2 rounded-2xl px-4 text-sm' type='email' placeholder='Enter the email-ID' required={true}
                          onChange={(e)=>setemail(e.target.value) } value={email}
                       />
                    </div>
                    <div>
                        <p className='text-1xl font-medium text-gray-700 md-2 px-4 py-1'>Password</p>
                        <input className=' border-2 w-full border-r-2 rounded-2xl px-4 text-sm' type='password' placeholder='Emter the Password' required={true}
                        onChange={(e)=>setpassword(e.target.value)
                        } value={password}/>
                    </div>
                    <div className='py-4'>
                    <button className='flex items-center text-center w-full justify-center rounded-2xl bg-blue-600 border-1'>Login</button>
                </div> </form>
            </div>
        </div>
    )
}

export default Login
