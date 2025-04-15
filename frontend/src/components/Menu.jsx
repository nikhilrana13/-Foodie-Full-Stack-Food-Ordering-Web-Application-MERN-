import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { SearchIcon,CrossIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from './Footer';

const Menu = () => {
    const user = useSelector((state)=>state.user.user);
    const products = useSelector((state)=>state.product.products)
    // console.log("products",products)
    const [open,setOpen] = useState(false);
    const [filter,setFilter] = useState([]);
    const [selectedCategory,setSelectedCategory] = useState('');

    // fetch filter products
    useEffect(()=>{
        setFilter(products);
    },[products])
    
    // handle search bar
    const handleOpen = ()=>{
        setOpen(!open);
    }

    // handle category filter
    const handleCategoryFilter =(e)=>{
         const value = e.target.value;
         let updatedCategory = [...selectedCategory];

         if(updatedCategory.includes(value)){
            updatedCategory = updatedCategory.filter((category)=> category !== value);

         }else{
            updatedCategory.push(value);
         }
         setSelectedCategory(updatedCategory);

         if(updatedCategory.length > 0){
            const filteredProduct = products.filter((category)=>updatedCategory.includes(category.category));
            setFilter(filteredProduct);
         } else{
            setFilter(products);
         }
    }

    // handle search bar
    const handleSearch = (e)=>{
        const value = e.target.value;
        const filteredProduct = products.filter((product)=>{
            return product.name.toLowerCase().includes(value.toLowerCase());
        })
        setFilter(filteredProduct);
    }

    // handle sorting 
    const handleSorting = (e)=>{
        const value = e.target.value;
        let sortedproduct = [...filter];

        if(value === 'lowtohigh'){
            sortedproduct.sort((a,b)=> a.price - b.price)
            setFilter(sortedproduct)
        } else if(value === 'hightolow'){
            sortedproduct.sort((a,b)=> b.price - a.price)
            setFilter(sortedproduct)
        }else if(value === 'sortbyrelevant'){
            setFilter(products);
        }
    }

    // handle add to cart
    
  const handleAddToCart = async (id,quantity)=>{
    try {
       const response =  await axios.post('http://localhost:4000/api/cart/addtocart',{
        product:id,
        quantity:quantity
      },{withCredentials:true});
      console.log("response",response.data)
      if(response.data){
        toast.success(response.data?.message || "Product added to cart successfully");
       
      }
    } catch (error) {
      console.log("failed to add product to cart",error);
      toast.error(!user ? "please login to add product" : error.response.data?.message || "something went wrong")

    }
  }

    




  return (
    <>
    <Navbar />
    <div className='border-t border-b bg-gray-50 relative flex  items-center justify-center'>
        {
           !open && (
            <>
            <div className='flex gap-2 items-center relative text-center  px-5 py-2 my-5  w-3/4  sm:w-1/2'>
            <input onChange={handleSearch}   type="text" className='outline none flex-1   text-sm bg-inherit px-3 py-2   rounded-full' placeholder='Search' />
            <SearchIcon  className='w-6 h-6 cursor-pointer absolute top-3 right-8' />
         </div>
         <CrossIcon className='cursor-pointer' onClick={handleOpen} />
         </>
           )
         }
       </div>
       <div className='flex flex-col mb-5 sm:flex-row gap-1 min-h-screen sm:gap-10 pt-10 border-t'>
        <div className='min-w-60'>
            <p className='my-2 text-xl text=[500] flex items-center cursor-pointer gap-2'>
                FILTERS
                <img src="" className='h-3 sm:hidden rotate-90' alt="" />
            </p>
            <div className='border border-gray-300 pl-5 py-3 mt-6 text-black'>
                <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="pasta" onChange={handleCategoryFilter} />
                        <span>pasta</span>
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="chinese" onChange={handleCategoryFilter}  />
                        <span>chinese</span>
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="pure veg" onChange={handleCategoryFilter}  />
                        <span>pure veg</span>
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="non veg" onChange={handleCategoryFilter} />
                        <span>non veg</span>
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="fast food" onChange={handleCategoryFilter} />
                        <span>fast food</span>
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="snacks" onChange={handleCategoryFilter}  />
                        <span>snacks</span>
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="dinner" onChange={handleCategoryFilter}  />
                        <span>dinner</span>
                    </p>
                    <p className='flex gap-2'>
                        <input type="checkbox" value="breakfast" onChange={handleCategoryFilter}  />
                        <span>breakfast</span>
                    </p>
                </div>
            </div>
        </div>
        <div className='flex-1 '>
            <div className=' flex items-center flex-col sm:flex-row justify-between px-5 '>
                <div className='flex items-center  gap-2'>
                <p className='my-2 text-xl sm:text-2xl text-gray-500 text-[500] flex items-center cursor-pointer gap-2'>
                    ALL
                    <span className='text-gray-800'>MENU</span>
                </p>
                <hr className='w-8 sm:w-12 h-[3px] bg-gray-800' />
                </div>
            <div className='border-gray-500 border-[2px] '>
                <select   name="Sort" className=' py-2 px-3' onChange={handleSorting}>
                    <option  value="sortbyrelevant">Sort by : Relevant</option>
                    <option value="lowtohigh">Sort by : Low to High</option>
                    <option value="hightolow"> Sort by : High to Low</option>
                </select>

            </div>    
               
            </div>
            <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-3'>
                {
                    filter.length > 0 ? (
                        filter.map((product)=>{
                            return(
                            
                                <ProductCard id={product.id} image={product?.image} name={product?.name} description={product?.description} price={product?.price} onClick={()=>handleAddToCart(product?._id,1)}/>
                               
                            )
                        })

                    ):(
                        <p className='text-center'>
                            No products found
                        </p>
                    )
                }

        </div>
      </div>
      </div>
    <Footer />
    </>
  );
}

export default Menu;
