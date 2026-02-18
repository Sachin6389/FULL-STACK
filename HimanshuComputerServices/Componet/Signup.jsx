import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login }from "../Storage/auth.js"
import{ CommonButton,Input ,Logo} from './index.js'
import { useDispatch } from 'react-redux'
import{useForm} from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
function SignUp() {
    const backurl=import.meta.env.VITE_BACKEND_URL_LOGIN
    const navigate = useNavigate();
        const dispatch = useDispatch();
        const{register,handleSubmit} = useForm();
        const[error,seterror] = useState("");
        const CreateAc=async(data)=>{
        
            
            seterror("")
         try {
            const avatarFile = data.avatar?.[0];
            if (!avatarFile) {
                seterror("Please upload your profile image");
                return;
            }
        
            

            const formData = new FormData();
            formData.append("avatar", avatarFile);
            formData.append("fullName", data.fullName);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("phone", data.phone);
            formData.append("address", data.address);
            formData.append("PinCode", data.PinCode);
            formData.append("City", data.City);
            formData.append("State", data.State);
            
            

            const session = await axios.post(`${backurl}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            if (session.data.success) {
                const userdata = session.data.massage;
                
                
                dispatch(login(userdata));
                navigate("/Home");
            }

        } catch (error) {
        
            
            seterror(error.response.data.data || "Registration failed");
        }
        }
    return (
        <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline cursor-pointer text-blue-700"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(CreateAc)}>
                <div className='space-y-5'>
                    <Input
                    label="Profile-Image: "
                    type="file"
                    placeholder="Enter your Image"
                    {...register("avatar", {
                        required: true,})}
                    />
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("fullName", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,})}
                    />
                    <Input
                    label="Phone: "
                    type="number"
                    placeholder="Enter your phone"
                    {...register("phone", {
                        required: true,})}
                    />
                    <Input
                    label="Address: "
                    type="text"
                    placeholder="Enter the Addresh"
                    {...register("address", {
                        required: true,})}
                    />
                    <Input
                    label="Pin-Code: "
                    type="number"
                    placeholder="Enter your pincode"
                    {...register("PinCode", {
                        required: true,})}
                    />
                    <Input
                    label="City: "
                    type="text"
                    placeholder="Enter your City"
                    {...register("City", {
                        required: true,})}
                    />
                    <Input
                    label="State: "
                    type="text"
                    placeholder="Enter your state"
                    {...register("State", {
                        required: true,})}
                    />
                    <CommonButton type="submit" className="w-full hover:bg-blue-600 bg-green-400 text-white py-1.5">
                        Create Account
                    </CommonButton>
                </div>
            </form>
        </div>

</div>
    )
}

export default SignUp
