import React from 'react'
import Tittle from '../components/Tittle.jsx'
import { Link } from 'react-router-dom'
import { assets } from '../src/assets/Assets.js'

function Contact() {
    return (
        <div >
            <div className='text-center text-2xl pt-10 border-t '>
                <Tittle text1={"CONTACT"} text2={"US"}/>
            </div>
            
            <div className=' my-10 flex flex-col justify-around md:flex-row gap-10 mb-28 '>
                <img className='w-full md:max-w-[750px] object-cover  px-8' src={assets.map} alt="" />
                <Link to="https://maps.app.goo.gl/R1ZrtaQ8kbVkrTWA9 " className='text-blue-900 underline text-2xl '>View on Google Maps</Link>

                <div className='flex flex-col justify-center gap-2 items-start'>
                    <p className='font-semibold text-xl text-black'>Our Store</p>
                    <p className='text-black-900'>Address <br/> Chhavani , Lalganj<br />Dist-Azamgarh, Pin-276202 <br />Uttar Pardesh</p>
                    <p className='text-black-900'>Phone: (+91) 6280261117</p>
                    <p className='text-black-900'>Email: HimanshuComputerLalganj@gmail.com</p>
                    <p className='text-black-900'>Website: www.yourstore.com</p>
                    <p className='text-black-900'>Social Media: @yourstore</p>

                </div>
            </div>
        </div>
    )
}

export default Contact
