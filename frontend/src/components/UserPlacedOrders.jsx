import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import axios from 'axios';
import { ArrowLeftCircle, Loader2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const UserPlacedOrders = () => {
    const [loading, setLoading] = useState(false);
    const [placedOrder, setPlacedOrder] = useState([]);


    useEffect(() => {
        const fetchPlacedOrders = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:4000/api/order/Myorders', { withCredentials: true });
                // console.log("response",response.data)
                if (response.data) {
                    setPlacedOrder(response.data?.Orders)
                }
            } catch (error) {
                console.error('Error fetching placed orders:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        }
        fetchPlacedOrders();
    }, [])
    return (
      <>
        <div className='mt-12'>
            <span>
                <NavLink to="/" className=" rounded-md hover:bg-gray-500">
                     <ArrowLeftCircle />
                    </NavLink> 
            </span>
        </div>
         <div className="p-4 mt-5">
  <h2 className="text-2xl font-bold">All Orders</h2>
  <p className="text-gray-600 text-sm mb-4">
    Here you can check status of your placed orders.
  </p>

  <div className='p-4'>
    <p className='text-start font-[500] text-gray-600'>Your Placed Orders</p>
    
    <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-3 mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
      <b>#</b>
      <b className='hidden md:inline'>Date</b>
      <b>Image</b>
      <b className='hidden md:inline'>Name</b>
      <b>Price</b>
      <b>Items</b>
      <b className='text-right md:text-center'>Status</b>
    </div>

    <div>
      {
        loading ? (
          <div className='flex items-center justify-center mt-[50px]'>
            <Loader2 className='mx-auto w-10 h-10 text-blue-500 animate-spin' />
          </div>
        ) : (
          placedOrder.length > 0 ? (
            placedOrder.map((item, index) => (
              <div key={item._id} className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-3 sm:gap-2 mt-2 items-center py-1 px-2 border bg-gray-100 text-sm'>
                <p>{index + 1}</p>
                <p className='hidden md:inline'>{new Date(item.OrderAt).toLocaleDateString("en-IN")}</p>
                <img src={item.items?.map(item => item.productId?.image)[0]} className='w-10 rounded-md' alt="" />
                <p className='hidden md:inline leading-10 '>{item.items?.map(item => item.productId?.name)}</p>
                <p>${item?.totalAmount}</p>
                <p>{item.items?.map(item => item.quantity)}</p>
                <p className="text-center">
                  {
                    item.status === "pending" || item.status === "food processing" ? (
                      <span className='text-gray-500'>{item.status}</span>
                    ) : item.status === "out for delivery" ? (
                      <span className='text-yellow-500'>{item.status}</span>
                    ) : item.status === "cancelled" ? (
                      <span className='text-red-500'>{item.status}</span>
                    ) : (
                      <span className='text-green-500'>{item.status}</span>
                    )
                  }
                </p>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-700 mt-10'>No Orders found 😟</p>
          )
        )
      }
    </div>
  </div>
</div>
      </>
  


    );
}

export default UserPlacedOrders;
