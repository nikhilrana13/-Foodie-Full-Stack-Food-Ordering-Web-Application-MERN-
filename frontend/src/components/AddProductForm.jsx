import React, { useState } from 'react'
import { Button } from './ui/button'
import upload from '../assets/upload.png'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Loader2 } from 'lucide-react'

const AddProductForm = () => {
    const {register,handleSubmit,reset,formState:{errors}} = useForm();
    const [loading,setLoading] = useState(false)
     
    const onSubmit = async(data)=>{
         const formdata = new FormData();
         formdata.append('name',data.name);
         formdata.append('description',data.description);
         formdata.append('price',data.price);
         formdata.append('category',data.category);

         if(data.image.length > 0){
            formdata.append('image',data.image[0]);
         }
        //   for check form data value //
        //  for (let pair of formdata.entries()){
        //     console.log(pair[0] , pair[1]);
        //  }
         try {
            setLoading(true)
            const response = await axios.post('http://localhost:4000/api/product/addproduct',formdata,{withCredentials:true,
                headers:{
                    'Content-Type': 'multipart/form-data',
                }});
             if(response.data){
                toast.success(response.data?.message || "Product added successfully");
                reset();
             }
            
         } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
         } finally{
            setLoading(false)
         }

    }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full items-start gap-3'>
    <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
            <label htmlFor="image">
                <img src={upload} className='w-20' alt="" />
                <input type="file" id='image' hidden  {...register("image", { required: true })} />
            </label>
        </div>
    </div>
    {errors.image && <span className='text-red-500'>This field is required</span>}
    <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input type="text" placeholder='Enter product name' name="productname" className='w-full max-w[500px] px-3 py-2 border border-gray-300 rounded-sm' {...register("name", { required: true })}  />
    </div>
    {errors.name && <span className='text-red-500'>This field is required</span>}
    <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-sm ' placeholder='write product description' {...register("description", { required: true })}  />
    </div>
  {errors.description && <span className='text-red-500'>This field is required</span>}
    <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
            <p className='mb-2'>Product category</p>
            <select className='w-full px-3 py-2 border rounded-md' {...register("category", { required: true })}>
                <option value="pasta">pasta</option>
                <option value="chinese">chinese</option>
                <option value="pure veg">pure veg</option>
                <option value="non-veg">non veg</option>
                <option value="fast food">fast food</option>
                <option value="snacks">snacks</option>
                <option value="dinner">dinner</option>
                <option value="dinner">breakfast</option>
                
            </select>
        </div>
        {errors.category && <span className='text-red-500'>This field is required</span>}
        <div>
            <p className='mb-2'>Product price</p>
            <input type='number' className='w-full sm:w-[120px] px-3 py-2 border border-gray-300 rounded-sm' placeholder='30' {...register("price", { required: true })} />
        </div>
    </div>
    {errors.price && <span className='text-red-500'>This field is required</span>}
    
            {
                loading ? (
                    <Button type="submit" className="px-9 mt-2 py-5">
                    <Loader2 className='mr-2 w-4 h-4 animate-spin' /> 
                  </Button>

                ):(
                    <div>
                    <Button type="submit" className="px-9 mt-2 py-5">Add</Button>
                    </div>
                )
            }


</form>
  )
}

export default AddProductForm