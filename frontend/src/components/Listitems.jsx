import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const Listitems = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // delete product function 
   const handleDeleteProduct = async(id)=>{
            try {
                const response = await axios.delete(`http://localhost:4000/api/product/${id}`,{withCredentials:true});
                if(response.data){
                  setProducts(products.filter((item)=>item._id !== id));
                  toast.success(response.data?.message || "Product deleted successfully");
                }
              
            } catch (error) {
                console.log("failed to delete product",error);
                toast.error(error?.response?.data?.message || "Something went wrong");
            }
   }
// fetch all products posted by admin 
  useEffect(() => {
    const FetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/product/listitems', { withCredentials: true });
        if (response.data) {
          setProducts(response.data?.products);
          // console.log("products", response.data?.products);
        }

      } catch (error) {
        console.log("failed to get products", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
    FetchProducts();
  }, [])
  return (
    <div>
      <div>
        <p className='text-start font-[500] text-gray-600'>All product list</p>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Product Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-right md:text-center'>Delete</b>
        </div>
        {
          loading ? (
              <div className='flex justify-center mt-12 items-center'>
                  <Loader2 className='mr-2 w-10 h-10 animate-spin' /> 
              </div>

          ) : (products.length > 0) ? (
            products?.map((item) => {
              return (

                <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] min-h-[70px] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] mt-2 items-center py-1 px-2 border'>
                  <img src={item.image} alt="" className='w-12' />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p onClick={() => handleDeleteProduct(item._id)} className='cursor-pointer text-right md:text-center text-lg'>X</p>
                </div>

              )
            })
          ) : (
            <div className='flex justify-center mt-12 items-center'>
              <h1 className='text-2xl font-bold'>No products found</h1>
            </div>
          )
        }
      </div>

    </div>

  )
}

export default Listitems;
