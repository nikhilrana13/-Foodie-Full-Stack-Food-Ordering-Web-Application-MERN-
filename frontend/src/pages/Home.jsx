import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import heroImg from "../assets/burger.jpg"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '@/redux/Products';
import ProductCard from '@/components/ProductCard';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Footer from '@/components/Footer';

const Home = () => {
  const user = useSelector((state)=>state.user.user)
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
console.log("all products",allproducts)

// fetch all products
  useEffect(()=>{
          const fetchProducts = async()=>{
            try {
              setLoading(true);
               const response = await axios.get('http://localhost:4000/api/product/products',{withCredentials:true});
               if(response.data){
                 setAllProducts(response.data?.products);
                 dispatch(setProducts(response.data?.products))
               }
              
            } catch (error) {
              console.log("failed to get products",error);  
            }finally{
            setTimeout(() => {
              setLoading(false);
            },1000);
            }
          }
          fetchProducts();
  },[])

  // handle add to cart 
  const handleAddToCart = async (id,quantity)=>{
    try {
       const response =  await axios.post('http://localhost:4000/api/cart/addtocart',{
        product:id,
        quantity:quantity
      },{withCredentials:true});
      // console.log("response",response.data)
      if(response.data){
        toast.success(response.data?.message || "Product added to cart successfully");
       
      }
    } catch (error) {
      console.log("failed to add product to cart",error);
      toast.error(!user ? "please login to add product" : error.response.data?.message || "something went wrong")

    }
  }

  return (
    <div className='w-full'>
          <Navbar />
          <div className='main mt-20 '>
            <div className=' flex flex-col gap-5 py-2 px-2 justify-center items-center  md:flex-row'>
                <div className='flex flex-col justify-center items-center  '>
                    <h2 className='text-[2rem] sm:text-[2.5rem] text-center font-[700]'>THE ULTIMATE</h2>
                    <h1 className='text-[3rem] lg:text-[4rem] text-center font-[700]'>Burger Club</h1>
                    <p className='text-[1rem] text-center  font-[500] text-gray-500 '>Savor the Flavor, Join the Burger Revolution</p>
                
                </div>
                   <img src={heroImg} className='w-[500px] rounded-md overflow-hidden' alt="" />
            </div>

            <div className='products mt-20 '>
                  <div className='flex flex-col gap-4 p-5'>
                     <h3 className='text-[2rem] font-bold'>Explore our menu</h3>
                     <p className='text-gray-500 text-sm font-[500]'>Choose from a diverse menu featuring a detectable array of dishes.Our mission is to satisfy your <br /> cravings and elevate your dining experience, one delicious bite at a time</p>
                  </div>
                  <hr className='my-5' />
                  {/* products */}
                <div className='products p-5'>
                     <h3 className='text-[2rem] font-bold'>
                      Top dishes near you
                     </h3>

                     {
                       loading ? (
                            <div className='grid  mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>      
                            {
                              Array(8).fill("").map((_,index)=>{
                                return(
                                  <div key={index} className="animate-pulse p-2 px-3 overflow-hidden">
                                  <div className=" w-full h-[200px] md:h-[250px]  bg-gray-300 rounded-[14px]"></div>
                                  <div className="mt-3 h-6 w-3/4 bg-gray-300 rounded"></div>
                                  <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
                                </div>

                                )
                              })
                            }               
                     </div>
                       ):(allproducts.length > 0 ) ? (
                        <div className='grid  mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'> 
                         {
                          allproducts?.map((product)=>{
                            return(
                               <ProductCard id={product.id} image={product?.image} name={product?.name} description={product?.description} price={product?.price} onClick={()=>handleAddToCart(product?._id,1)} />
                            )
                          })
                         }                    
                     </div>

                       ):(
                        <div className='flex justify-center mt-12 items-center'>
                        <h1 className='text-2xl font-bold'>No products found</h1>
                     </div>
                       )
                     }
         
                  </div>  
                
                    
                  
            </div>
          </div>
          <Footer />
    </div>
  )
}

export default Home
