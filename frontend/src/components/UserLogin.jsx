import React from 'react'
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { SetAuthUser } from '@/redux/UserSlice';



const UserLogin = () => {
     const { register, handleSubmit, formState: { errors } } = useForm();
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const onSubmit = async(data)=>{
            const UserInfo = {
                email: data.email,
                password: data.password
            }

            try {
                const response = await axios.post("http://localhost:4000/api/user/signin",UserInfo,{withCredentials:true})
                console.log("response",response.data);
                if(response.data){
                    toast.success(response.data?.message || "Sign in successfully");
                    dispatch(SetAuthUser(response.data.user))
                    navigate("/")
                }
                
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong");
            }
     } 
    return (
        <div className='translate-y-20'>
            <div className=' items-center mx-auto flex flex-col'>
                <div className='flex  items-center mt-10 gap-2'>
                    <p className='prata-regular  text-3xl'>LOGIN</p>
                    <hr className='w-8 border-none h-[1.5px] bg-gray-800' />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='mx-auto mt-14 flex flex-col  p-5  w-[90%] sm:max-w-96 text-gray-800 gap-4'>
                    <input type="text" name="email" className='px-3 py-2 w-full border border-gray-800 rounded-sm' placeholder='Email' {...register("email", { required: true })} />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                    <input type="password" name="password" className='px-3 py-2 w-full border border-gray-800 rounded-sm' placeholder='password' {...register("password", { required: true })} />
                    {errors.password && <span className='text-red-500'>This field is required</span>}
                    <div className='flex justify-between '>
                        <p className='text-sm font-[500]'>Forget your password?</p>
                        <NavLink to='/signup' className="text-sm font-[500]">Create Account </NavLink>
                    </div>
                    <Button className='mx-auto px-7 py-5 '>Login</Button>
                </form>
            </div>

        </div>
    )
}


export default UserLogin
