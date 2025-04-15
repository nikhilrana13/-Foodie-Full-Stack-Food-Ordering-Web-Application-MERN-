import React, { useEffect } from 'react';
import { ChevronsDownIcon } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
const AdminOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  // fetch all orders
  useEffect(()=>{
       const FetchOrders = async()=>{
           try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/api/admin/orders',{withCredentials:true});
            if(response.data){
              setOrders(response.data?.orders);
            }
           } catch (error) {
            console.log("failed to get orders",error);
           }finally{
            setTimeout(() => {
              setLoading(false);
            }, 1000);
           }
       }
       FetchOrders();
  },[])

  // handle order status
   const UpdateOrderStatus = async(orderId,productId,newStatus)=>{
             try {
               const response = await axios.put('http://localhost:4000/api/admin/updateorderstatus',{orderId,productId,status:newStatus},{withCredentials:true}); 
               if(response.data){
                 toast.success(response.data?.message || "Status updated successfully");
               }
                setOrders((prevOrders)=>prevOrders.map((order)=>order._id === orderId ? {...order,status:newStatus}:order));
              
             } catch (error) {
              console.log("failed to update order status",error);
              toast.error(error?.response?.data?.message || "Something went wrong");
              
             }
   }
  return (
    <div>
    <p className='text-start font-[500] text-gray-600'>Orders</p>
    <div className='grid grid-cols-[1fr_2fr_3fr_1fr_1fr] gap-3 mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
      <b>#</b>
      <b>Order Details</b>
      <b className='hidden md:inline'>Items</b>
      <b className='hidden md:inline'>Price</b>
      <b className='text-right md:text-center'>Action</b>
    </div>

    {
      loading ? (
        <div className='flex items-center justify-center mt-[50px]'>
          <Loader2 className='mx-auto  w-10 h-10 text-blue-500 animate-spin' />
        </div>
      ) : (
        orders?.length > 0 ? (
          orders.map((item, index) => {
            return (
              <div key={item._id} className='grid grid-cols-[1fr_2fr_3fr_1fr_1fr] mt-2 gap-3 items-center py-1 px-2 border bg-gray-100 text-sm '>
                <p>{index + 1}</p>
                <div className='flex  flex-col   gap-5'>
                   {
                     item.items?.map((item)=>{
                      return(
                        <div key={item._id} className="flex justify-between">
                        <span className="font-bold">{item.productId?.name || "No Product Name"}  <span> X {item.quantity}</span></span>
                      </div>
                      )
                     })
                   }
                   <img className='w-[80px] rounded-md' src={item.items?.map((item)=>item.productId?.image)} alt="" />
                   <div className='flex flex-col sm:leading-5   '>
                      <span className='font-bold'>Name : {item.Deliveryinformation?.name}</span>
                      <span>Address : {item.Deliveryinformation?.address}</span>
                      <span>Phone : {item.Deliveryinformation?.phone}</span>
                      <span>City : {item.Deliveryinformation?.city}</span>
                      <span>state : {item.Deliveryinformation?.city}</span>
                      <span>Country : {item.Deliveryinformation?.country}</span>
                      <span>Pincode : {item.Deliveryinformation?.pincode}</span>
                   </div>
                </div>
                <span className='hidden md:inline p-2'>Items : {item.items?.map((item)=>{
                  return item.quantity
                })}</span>
                <span className='hidden md:inline text-center'>${item?.totalAmount}</span>
              
                      <select className='cursor-pointer border-2 p-2 md:w-[30] rounded-md ' onChange={(e)=>UpdateOrderStatus(item._id,item.items[0].productId._id,e.target.value)} value={item.status || "pending"} >
                        <option value="pending">Pending</option>
                          <option value="food processing" className='cursor-pointer'>food processing</option>
                          <option value="out for delivery" className='cursor-pointer'>out for delivery</option>
                          <option value="delivered" className='cursor-pointer'>delivered</option>
                          <option value="cancelled" className='cursor-pointer'>cancelled</option>
                      </select>
              
              </div>

            )
          })
        ) : (
          <p className='text-center text-gray-700 mt-10'>No Orders found</p>
        )
      )
    }

  </div>
  );
}

export default AdminOrders;
