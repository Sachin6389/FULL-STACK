import React, { useState } from 'react'
import {Assest} from "../assets/Assest.js"
import {toast} from "react-toastify"
import axios from 'axios'



function Add({token}) {
    const backurl=import.meta.env.VITE_BACKEND_URL
    const [top,settop] = useState("")
const [bottom,setbottom] = useState("")
const [front,setfront] = useState("")
const [back,setback] = useState("")
const [name,setname] = useState("")
const [price,setprice] = useState("")
const [description,setdescription] = useState("")
const [companyname,setcompanyname] = useState("")
const OnSubmitHandler= async(e)=>{
    e.preventDefault()
    try {
        const formData=new FormData()
        formData.append("top",top)
        formData.append("bottom",bottom)
        formData.append("front",front)
        formData.append("back",back)
        formData.append("name",name)
        formData.append("price",price)
        formData.append("description",description)
        formData.append("companyName",companyname)
        const res=await axios.post(`${backurl}/api/v1/Product/add`,formData, {headers:{token:token}})
        toast.success(res.data.data)
        
        if (res.data.massage) {
            toast.success(res.data.message)
            setback("")
            setbottom("")
            setcompanyname("")
            setdescription("")
            setfront("")
            setname("")
            setprice("")
            settop("")
            
        }
        
    } catch (error) {
        toast.error(error.response.data.data)
         setback("")
            setbottom("")
            setcompanyname("")
            setdescription("")
            setfront("")
            setname("")
            setprice("")
            settop("")
        
    }

}
    return (
       <form className='flex flex-col w-full items-start gap-3 px-2' onSubmit={OnSubmitHandler} >
        <div className='text-2xl font-bold flex gap-2 '>
            <p className='py-2 px-2'>Upload Image</p>


        </div>
        <div className='flex gap-2 px-2'>
            <label htmlFor="top">Top
                <img className='w-20 ' src={ !top?Assest.image:URL.createObjectURL(top)} alt='' />
                <input type='file'  id='top' hidden
                onChange={(e)=>settop(e.target.files[0])
                } />
             </label>
            <label htmlFor="bottom">Bottom
                <img  className='w-20' src={!bottom?Assest.image:URL.createObjectURL(bottom)} alt='' />
                <input type='file'  id='bottom' hidden
                 onChange={(e)=>setbottom(e.target.files[0])
                } />
            </label>
            <label htmlFor="front">Front
                <img className='w-20' src={!front?Assest.image:URL.createObjectURL(front)} alt='' />
                <input type='file'  id='front' hidden
                onChange={(e)=>setfront(e.target.files[0])
                }
                />
            </label>
            <label htmlFor="back">Back
                <img className='w-20' src={!back?Assest.image:URL.createObjectURL(back)} alt='' />
                <input type='file' id='back' hidden
                onChange={(e)=>setback(e.target.files[0])
                }/>
            </label>
        </div>
        <div className='w-full px-2'>
            <p className='text-2xl font-bold'>Product Name</p>
            <input className='border-2 rounded-2xl   outline-black w-full px-4 py-2' type='text' placeholder='Type here'
            onChange={(e)=>setname(e.target.value)} value={name}/>
        </div>
        <div className='w-full px-2'>
            <p className='text-2xl font-bold'>Product Description</p>
            <textarea className='w-full border-2 rounded-2xl px-2 ' type="text" placeholder='Write about your product'
            onChange={(e)=>setdescription(e.target.value)} value={description}/>

        </div>
        <div className='w-full px-2'>
            <p className='text-2xl font-bold'>Price</p>
            <input  className='w-full border-2 px-2 rounded-2xl py-2' type='Number' placeholder='Type here'
            onChange={(e)=>setprice(e.target.value)} value={price}/>
        </div>
        <div className='w-full px-2'>
            <p className='text-2xl font-bold'>Company Name</p>
            <input className='w-full border-2 px-2 rounded-2xl py-2 mb-3' type='text' placeholder='Type here'
            onChange={(e)=>setcompanyname(e.target.value)} value={companyname}/>
        </div> 
        
        <button className='w-full border-2 bg-blue-500 px-2 text-3xl rounded-2xl py-2 '>Add</button>
       </form>
    )
}

export default Add
