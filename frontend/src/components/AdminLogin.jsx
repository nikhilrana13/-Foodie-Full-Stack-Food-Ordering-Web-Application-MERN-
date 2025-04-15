import { SetAuthAdmin } from '@/redux/UserSlice';
import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { NavLink} from 'react-router-dom';
import { Button } from './ui/button';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = async(data)=>{
   
          const AdminInfo = {
              email: data.email,
              password: data.password
          }

          try {
            const response = await axios.post("http://localhost:4000/api/admin/signin",AdminInfo,{withCredentials:true});
            // console.log(response.data);
            if(response.data){
               toast.success(response.data?.message || "Sign in successfully");
               dispatch(SetAuthAdmin(response.data.admin))
               navigate('/admin/add')
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
        <input type="text" name="email"  className='px-3 py-2 w-full border border-gray-800 rounded-sm' placeholder='Email' {...register("email", { required: true })} />
        {errors.email && <span className='text-red-500'>This field is required</span>}
          <input type="password" name="password" className='px-3 py-2 w-full border border-gray-800 rounded-sm' placeholder='password' {...register("password", { required: true })} />
          {errors.password && <span className='text-red-500'>This field is required</span>}
          <div className='flex justify-between '>
             <p className='text-sm font-[500]'>Forget your password?</p>
             <NavLink to='/admin/signup' className="text-sm font-[500]">Create Account </NavLink>
          </div>
          <Button className='mx-auto px-7 py-5 '>Login</Button>
    </form>
    </div>
    
</div>
    
  )}

export default AdminLogin
