import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import {createRequire} from "module";
const require = createRequire(import.meta.url);
const crypto = require("crypto")



export const PlacedOrder = async(req,res)=>{
    try {
        const userId = req.user;
         
             // check user exists or not
             const user = await User.findById(userId)

             if(!user){
                 return res.status(404).json({message: "User not found"})
             }
             

        // fetch user cart 

        const cartItems = await Cart.find({user:userId}).populate("product");

        if(!cartItems || cartItems.length === 0){
            return res.status(400).json({message:"Your cart is empty"});
        }
       
        // convert cartitems into order format
        const items = cartItems.map(cartItem =>({
            productId:cartItem.product._id,
            adminId:cartItem.product.adminId,
            quantity:cartItem.quantity,
            subtotal:cartItem.price * cartItem.quantity
        }))


        // calculate total amount
        const totalAmount = items.reduce((acc,item)=> acc + item.subtotal,0);     


        const {Deliveryinformation} = req.body;
        // console.log('deliveryinfo',Deliveryinformation)

        if(!Deliveryinformation){
            return res.status(400).json({message:"Please enter delivery information"});
        }


        // create hash for checking duplicate orders
         const orderHash = crypto.createHash("sha256").update(JSON.stringify({userId,items,Deliveryinformation})).digest("hex")
        
        //  check order if same hash details 

           const existingOrder = await Order.findOne({userId,orderHash});
           if(existingOrder){
            return res.status(400).json({message:"Order placed Already"})

           }
            // create new order
            const newOrder = await Order.create({
                userId:userId,
                items,
                Deliveryinformation,
                totalAmount,
                orderHash
            })

        
        // add order id to user's orders array
        user.Orders.push(newOrder._id)
        user.Cart = [];
        await user.save()

    
    // delete Cart item also from user Cart array
      await Cart.deleteMany({ user: userId });

        return res.status(200).json({message:"Order placed successfully",newOrder})

        
    } catch (error) {
        console.log("failed to placed order",error)
        if(error.name === "ValidationError"){
            // mongoose validation
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({message:"Delivery information is required",details:messages});
        }
        return res.status(500).json({message:"internal server error"})
    }
}

export const MyOrders = async(req,res)=>{
    try {
        const userId = req.user;
        
        // check user exists or not 

        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const Orders = await Order.find({userId}).populate("items.productId","name image")

        if(!Orders || Orders.length === 0){
            return res.status(404).json({message:"No orders found"})
        }

        return res.status(200).json({message:"Orders found successfully",Orders})

        
    } catch (error) {
        console.log("failed to get orders",error)
        return res.status(500).json({message:"internal server error"})
        
    }
}


