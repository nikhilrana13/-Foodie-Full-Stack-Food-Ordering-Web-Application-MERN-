import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'react-toastify';


const UserSignUp = () => {
  const navigate = useNavigate();
  const { register, handleSubmit,  formState: { errors } } = useForm();

  const onSubmit = async(data) =>{
       await axios.post('http://localhost:4000/api/user/signup',data,{withCredentials:true}).then((res)=>{
          console.log(res.data);
          if(res.data){
              toast.success("Sign up successfully" || res.data.message);
              navigate('/login');
          }
      }).catch((error)=>{
          console.log("failed to sign up",error);
          toast.error(error.response?.data?.message || "something went wrong");
      })

  }
  return (
    <div className=' translate-y-20'>
    <div className=' items-center mx-auto flex flex-col'>
    <div className='flex  items-center mt-10 gap-2'>
            <p className='prata-regular  text-3xl'>SIGN UP</p>
            <hr className='w-8 border-none h-[1.5px] bg-gray-800' />
        </div>
    <form onSubmit={handleSubmit(onSubmit)}  className='mx-auto mt-14 flex flex-col  p-5  w-[90%] sm:max-w-96 text-gray-800 gap-4'>
    <input type="text" name="username" className='px-3 py-2 w-full border border-gray-800 rounded-sm' placeholder='Name'
    {...register("name", { required: true })} />
     {errors.name && <span className='text-red-500'>This field is required</span>}
        <input type="text" name="email" className='px-3 py-2 w-full border border-gray-800 rounded-sm' placeholder='Email' {...register("email", { required: true })} />
        {errors.email && <span className='text-red-500'>This field is required</span>}
          <input type="password" name="password" className='px-3 py-2 w-full border border-gray-800 rounded-sm' placeholder='password'
          {...register("password", { required: true })} />
     {errors.password && <span className='text-red-500'>This field is required</span>}
          <div className='flex justify-between '>
             <p className='text-sm font-[500]'>Forget your password?</p>
             <NavLink to="/admin/login" className="text-sm font-[500]">Login Here</NavLink>
          </div>
          <Button type='submit' className='mx-auto px-7 py-5 '>Sign Up</Button>
    </form>
     

    </div>
</div>
  )
}

export default UserSignUp
