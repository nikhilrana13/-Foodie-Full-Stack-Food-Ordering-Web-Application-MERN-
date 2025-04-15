import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
const Cart = () => {
  const [cartItem,setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  // fetch cart items
  useEffect(()=>{
       const fetchCartItems = async()=>{
           try {
              const response = await axios.get('http://localhost:4000/api/cart/cartitems',{withCredentials:true});
              // console.log("response",response.data)
              if(response.data){
                setCartItem(response.data?.cartItems);
                setTotalPrice(response.data?.total);
              }
            
           } catch (error) {
            console.error("failed to get cart items",error.response?.data?.message || "something went wrong");
           }
       }
       fetchCartItems();
  },[])

  // delete cart item
  const handleDeleteCartItem = async(id)=>{
       try {
        const response = await axios.delete(`http://localhost:4000/api/cart/delete/${id}`,{withCredentials:true});
        if(response.data){
           toast.success(response.data?.message || "Cart item deleted successfully");
           setCartItem(cartItem.filter(item=>item._id !== id));
        }
        
       } catch (error) {
        console.error("failed to delete cart item",error.response?.data?.message || "something went wrong");
        toast.error(error?.response?.data?.message || "Something went wrong");
       }
  }

  return (
    <div>
    <Navbar />
    <div className='mt-14'>
     
        <div className='inline-flex items-center gap-4 text-2xl mb-3'>
        <p className='text-gray-600 font-[500]'>Your <span className='text-gray-800 font-[500]'>Cart</span></p>
        <hr className='w-8 sm:w-12 border-none h-[2px] bg-gray-800' />
         </div>

          <div className='mt-5'>
              
              <div className='grid grid-cols-[1fr_1fr_1fr_1fr_] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr]  gap-3 mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
                        <b className=''>Items</b>
                        <b className='hidden md:inline'>Title</b>
                        <b className='hidden md:inline'>Price</b>
                        <b className=''>Quantity</b>
                        <b className='text-center'>Total</b>
                        <b className='text-center'>Remove</b>
                    </div>
              </div>
           {cartItem.length > 0 ? (
                cartItem.map((item)=>{
                    return(
                         
                         
                           <div key={item._id} className='py-4 border-t  text-gray-700 grid grid-cols-[1fr_1fr_1fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr] items-center gap-4'>
                        
                        <img src={item.product?.image} alt="" className='w-16 sm:w-20' />
                        
                            <p className='text-xs sm:text-lg font-medium hidden md:inline'>{item.product?.name}</p>
                                <p className='hidden md:inline'>${item.product?.price}</p>
                                <input type="number" className='border max-w-10 sm:max-w-20 px-1 py-1 text-center' disabled value={item.quantity} />
                                <p className='text-right md:text-center'>${item.subtotal}</p>
                                <p onClick={()=>handleDeleteCartItem(item._id)} className='cursor-pointer font-bold flex justify-center'>X</p>
                        </div>
                        
                    )
                })
            ):(
                <div className='text-center text-gray-600 py-4'>
                    <p>No items in your cart</p>
                </div>

            )
           }

            
             
          </div>

    <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
            <div className='w-full'>
                <div className='text-2xl'>
                <div className='inline-flex items-center gap-2 text-2xl mb-3'>
               <p className='text-gray-600 font-[500]'>Your <span className='text-gray-800 font-[500]'>Cart</span></p>
        <hr className='w-8 sm:w-12 border-none h-[2px] bg-gray-800' />
         </div>

                </div>
                <div className='flex flex-col gap-2 mt-2 text-sm'>
                    <div className='flex justify-between'>
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Delivery fees</p>
                        <p>$ 10</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-lg font-bold'>Total</p>
                        <p className='text-lg font-bold'>${totalPrice + 10}</p>
                    </div>
                </div>
            </div>
            <div className='w-full text-end'>
               <NavLink to="/orders">
               <Button className="bg-black text-white text-sm my-8 px-8 py-3 ">
                    PROCEED TO CHECKOUT
                </Button>
               </NavLink>
              
            </div>
        </div>

    </div>

    </div>
  

  );
}

export default Cart;
