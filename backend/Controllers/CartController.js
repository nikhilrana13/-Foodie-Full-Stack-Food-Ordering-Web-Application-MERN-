import Cart from "../models/CartModel.js";
import ProductModel from "../models/ProductModel.js";
import User from "../models/UserModel.js";


export const AddtoCart = async(req,res)=>{
    try {
         const userid = req.user

        //  check user exists or not 

         const user = await User.findById(userid)
        if(!user){
            return res.status(400).json({message:"please login to add a product"})
        }

        const {product,quantity} = req.body;
        // console.log("req.body",req.body)

        const productdata = await ProductModel.findById(product)

        if(!productdata){
            return res.status(400).json({message:"product not found"})
        }

        let cartItem = await Cart.findOne({user:userid,product})

        if(cartItem){
            cartItem.quantity += quantity;
            cartItem.subtotal = cartItem.quantity * cartItem.price;
            await cartItem.save()
            return res.status(200).json({message:"product added to cart",cartItem})
        }else{
            const price = productdata.price
            const totalprice = price * quantity

            const newCart = await Cart.create({
                user:userid,
                product,
                quantity:quantity,
                price,
                subtotal:totalprice
            })


            const user = await User.findById(userid);
            if(user){
                user.Cart.push(newCart._id);
                await user.save()
            }

            return res.status(200).json({message:"product added to cart",newCart})
        }
      
    } catch (error) {
        console.log("failed to add product to cart",error)
        return res.status(500).json({message:"internal server error"})
    }
}

export const getCartItems = async(req,res)=>{
    try {
         const userid = req.user

         const user = await User.findById(userid)

         if(!user){
            return res.status(400).json({message:"user not found"})
         }

         const cartItems = await Cart.find({user:userid}).populate("product")
        //  console.log("cart items",cartItems);

         if(!cartItems){
            return res.status(200).json({message:"cart is empty",cartItems})
         }

         let total = cartItems.reduce((acc,item)=>acc + item.subtotal,0);
         return res.status(200).json({message:"cart items",cartItems,total})
        
    } catch (error) {
        console.log("failed to get cart items",error)
        return res.status(500).json({message:"internal server error"})
        
    }
}

export const DeleteCartItem = async(req,res)=>{
    try {
        const userid = req.user
         
        // check user exists or not
        const user = await User.findById(userid)

        if(!user){
            return res.status(400).json({message:"user not found"})
        }


        const Cartid = req.params.id

        const CartItem = await Cart.findByIdAndDelete(Cartid)

        if(!CartItem){
            return res.status(400).json({message:"cart item not found"})
        }

        // delete Cart item also from user Cart array
        await User.findByIdAndUpdate(userid,{
            $pull:{Cart:Cartid}
        })

        return res.status(200).json({message:"Item Removed from Cart"})
        
    } catch (error) {
        console.log("failed to delete cart item",error)
        return res.status(500).json({message:"internal server error"})
    }
}

