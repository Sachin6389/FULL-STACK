import React from 'react'
import Tittle from "../Componet/Tittle"
import { Link } from 'react-router-dom'
import { assets } from '../src/assets/Assets.js'


function About() {
    return (
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Tittle text1={"ABOUT"} text2={"US"}/>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full md:max-w-[450px] object-cover' src={assets.logo} alt="" />
                {/* image add */}
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                <p className='text-black'>Founded with a passion for technology, Himanshu Computer Services has grown into a trusted destination for laptops, accessories, and repair services. We partner with top brands like Dell, HP, Lenovo, Asus, and Apple to ensure our customers always get the best quality and value.</p>
                <p className='text-black'>From powerful gaming laptops and sleek ultrabooks to budget-friendly student models, we provide solutions for every need and lifestyle. Our expert team not only helps you select the right laptop but also offers after-sales support, upgrades, and repair services to keep your devices running smoothly.</p>
                <p className='text-black'>Over the years, we’ve served thousands of happy customers who trust us for our honesty, expertise, and dedication. Whether you’re shopping online or visiting our store, our goal remains the same – to deliver a smooth, trustworthy, and satisfying experience.</p>
                <b className='text-black'>Our Mission</b>
                <p className='text-black'>At Himanshu Computer Services, our mission is simple: to make technology accessible, reliable, and affordable for everyone.
We believe laptops are more than just machines – they are tools that empower students, professionals, businesses, and gamers to achieve their goals. That’s why we focus on offering genuine products, excellent service, and the right guidance to help you choose the perfect device.</p>
        </div>
        </div>
        <div className='text-4xl py-4'>
            <Tittle text1={"Why"} text2={"choose us"}/>


        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-2'>
                <b className='text-black'>Quality Assurance:</b>
                <p className='text-black'>Every product we sell is 100% genuine and backed by warranty. We carefully source and test our devices to guarantee top performance and long-term reliability.</p>
        </div>
        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-2'>
                <b className='text-black'>Convenience:</b>
                <p className='text-black'>Whether you shop online or visit our store, we make the buying process simple and hassle-free. With fast delivery, secure payments, and easy returns, we put your convenience first.</p>
        </div>
        <div className='border px-10 md:px-16 py-4 sm:py-20 flex flex-col gap-2'>
                <b className='text-black'>Exceptional Customer Services:</b>
                <p className='text-black'>Our friendly and knowledgeable team is always here to guide you. From product selection to after-sales support, we ensure that your experience with us is smooth, transparent, and satisfying.</p>
        </div>
        </div>
        
        </div>
    )
}

export default About
