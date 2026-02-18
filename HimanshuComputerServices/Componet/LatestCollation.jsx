import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ProductDisplay from "../Componet/ProductDisplay"
import Tittle from '../Componet/Tittle'

function LatestCollation() {
    const[letest,setletest]=useState([])
    const {productList, loading} = useSelector(state => state.product)
    
    
    useEffect(()=>{
       setletest(productList.slice(-10).reverse());
    },[productList])
    if (loading) return <p>Loading...</p>;
    return (
        <div className='my-10'>
            <div className=' text-center py-8 text-3xl'>
        <Tittle text1={"latest"} text2={"Collections"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-black-800 font-medium'> Product Description </p>
        </div>
        <div className='grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-6'>
            {
                letest.map((item,index)=>(
                    <ProductDisplay key={index} id={item._id} image={item.FrontImage} name={item.name} price={item.price} company={item.companyName}/>
                ))
            }
        </div>
        
          </div>
    )
}

export default LatestCollation
