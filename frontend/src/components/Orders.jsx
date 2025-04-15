import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate()
    const [cartItem,setCartItem] = useState([]);
    const [subtotal,setSubtotal] = useState(0)
    const [deliveryinfoInput,setDeliveryinfoInput] = useState({
           name:'',
           email:'',
           phone:'',
           address:'',
           city:'',
           state:'',
           country:'',
           pincode:'',
    })
     
    const handleChange = (e)=>{
        setDeliveryinfoInput({...deliveryinfoInput,[e.target.name]:e.target.value})
    }

    console.log("delivery info",deliveryinfoInput)
      
      
    // fetch cart info 
    useEffect(()=>{
        const fetchCartItems = async()=>{
            try {
               const response = await axios.get('http://localhost:4000/api/cart/cartitems',{withCredentials:true});
               if(response.data){
                 setCartItem(response.data?.cartItems);
                 setSubtotal(response.data?.total);
               }
             
            } catch (error) {
             console.error("failed to get cart items",error.response?.data?.message || "something went wrong");
            }
        }
        fetchCartItems();
   },[])

   //  placed order 
   const placedOrder = async()=>{
    try {
        const response = await axios.post('http://localhost:4000/api/order/placedorder',{
            Deliveryinformation:deliveryinfoInput
        },{withCredentials:true})
        if(response.data){
            toast.success(response.data?.message || "Orders placed successfully")
            navigate('/placedorders')
        }
        
    } catch (error) {
        console.error("failed to place order",error.response?.data?.message || "something went wrong")
        if(error.response && error.response.data){
            toast.error(error.response.data?.message)
        }else{
            toast.error("Something went wrong")
        }
  
   }
}
    
  return (
    <div>
    <Navbar />
    <div className=' w-full mt-14 flex flex-col gap-5 lg:flex-row justify-between'>
          <div className='mt-5 w-full '>
             <h3 className='text-[1.8rem] font-bold'>Delivery Information</h3>
             {/*  delivery information */}
              <div className='form mt-12  p-2'>
                <form className='flex flex-col md:max-w-[600px] gap-3'>
                    <Input value={deliveryinfoInput.name} onChange={handleChange}  type="text" required   name="name" placeholder='Name' />
                    <Input value={deliveryinfoInput.email} onChange={handleChange} required type="email" name="email" placeholder='Email' />
                    <Input value={deliveryinfoInput.phone} onChange={handleChange} required  name="phone" placeholder='Phone' />
                    <Input value={deliveryinfoInput.address} onChange={handleChange}  type="text" name="address" placeholder='Address' />
                    <Input value={deliveryinfoInput.city} onChange={handleChange}  type="text" name="city" placeholder='City' />
                    <Input value={deliveryinfoInput.state} onChange={handleChange}  type="text" name="state" placeholder='State' />
                    <Input value={deliveryinfoInput.pincode} onChange={handleChange} type="number" name="pincode" placeholder='Zip' />
                    <Input value={deliveryinfoInput.country} onChange={handleChange} type="text" name="country" placeholder='Country' />
                </form>

                 
              </div>
          </div>

    <div className='flex my-20 '>
        <div className='w-full sm:w-[450px]'>
        <div className='w-full'>
                <div className='flex flex-col gap-3 mt-2 text-sm'>
                    <h3 className='text-2xl font-bold'>Cart Totals</h3>
                    <div className='flex justify-between'>
                        <p>Subtotal</p>
                        <p>$ {subtotal ? subtotal :"0"}</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p>Delivery fees</p>
                        <p>$ 10</p>
                    </div>
                    <hr />
                    <div className='flex justify-between'>
                        <p className='text-lg font-bold'>Total</p>
                        <p className='text-lg font-bold'>${subtotal + 10}</p>
                    </div>
                </div>
            </div>

            <div className='w-full text-end'>
                <Button onClick={placedOrder} className="bg-black text-white text-sm my-8 px-8 py-3 ">
                    Placed order
                </Button>
            </div>
        </div>

    </div>

    </div>
    </div>
  );
   }
export default Orders;
