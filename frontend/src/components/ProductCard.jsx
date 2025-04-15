import React from 'react';
import { Button } from './ui/button';

const ProductCard = ({image,name,price,description,id,onClick}) => {
  return (
    <div key={id} className='border shadow-md rounded-md'>
    <div className='overflow-hidden  h-[300px]'>
        <img src={image} className='hover:scale-110 object-cover w-full  rounded-md h-full transition ease-in-out' alt={name} />
    </div>
    <div className=' p-5 flex flex-col gap-3 h-[200px]'>
    <p className='pt-3 pb-1 text-[1.2rem] font-[700]'>{name}</p>
    <p className='text-sm font-[500] text-gray-500   leading-2 h-[80px] overflow-hidden line-clamp-2 '>{description}</p>
    <p className='text-[1.2rem] text-red-500 font-bold'>${price}</p>
    </div>
    <div className='px-3 mt-5 pb-3'>
    <Button onClick={onClick}  className="w-full py-3 px-3">Add to cart</Button>
    </div>

  
</div>
  );
}

export default ProductCard;
