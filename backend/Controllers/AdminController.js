import Admin from "../models/AdminModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import Order from "../models/OrderModel.js";


export const AdminSignUp = async(req,res)=>{
      try {
         const {name,email,password} = req.body;
        //  console.log("req.body",req.body)

         // check if admin already exists

         const user = await Admin.findOne({email});

         if(user){

            return res.status(400).json({message:"Admin already exists"});
         }
         
         const hashPassword = await bcrypt.hash(password,10);

         const newAdmin = await Admin.create({
            name,
            email,
            password:hashPassword,
         });

         await newAdmin.save();
         return res.status(201).json({message:"Sign up successfully"});

      } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
      }
}

export const AdminSignIn = async(req,res)=>{
    try {
        const {email,password} = req.body;
        // console.log("req.body",req.body)

        // check if admin exists or not

        const admin = await Admin.findOne({email});
        if(!admin){
            return res.status(400).json({message:"Admin not found"});
        }

        const isMatch = await bcrypt.compare(password,admin.password);

        if(!isMatch){
            return res.status(400).json({message:"Invalid password or email"});
        }

        const token = jwt.sign({id:admin._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"});
        res.cookie("token",token,{httpOnly:true,secure:false,sameSite:"lax"});

        return res.status(200).json({message:"Sign in successfully",admin,token});
        
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}

export const AdminSignOut = async(req,res)=>{
    try {
        res.clearCookie("token",{httpOnly:true,secure:false,sameSite:"lax"});
        return res.status(200).json({message:"Logout successfully"});
    } catch (error) {
        return res.status(500).json({message:"Internal server error"});
    }
}


export const GetAdminOrders = async(req,res)=>{
    try {
        const adminId = req.user;
         
        // check admin exists or not 
        const admin = await Admin.findById(adminId);
       
        if(!admin){
            return res.status(404).json({message:"Admin not found"})
        }

         // Find orders where at  product belongs to this admin
        const orders = await Order.find({"items.adminId":adminId}).populate("userId","name email").populate("items.productId","name image")


        if(!orders || orders.length === 0){
            return res.status(404).json({message:"No orders found"})
        }

        // Filter only the items that belong to this admin
        const filteredOrders = orders.map(order=>{
            return{
                _id:order._id,
                userId:order.userId,
                Deliveryinformation:order.Deliveryinformation,
                totalAmount:order.totalAmount,
                createdAt:order.createdAt,
                items:order.items.filter(item=>item.adminId.toString() === adminId.toString()),
                status:order.status
            }
        })
         return res.status(200).json({message:"Orders found Successfully",orders:filteredOrders})

    } catch (error) {
        console.log("Failed to get admin orders", error);
        return res.status(500).json({message:"Internal server error"});   
    }
}

export const UpdateOrderStatus = async(req,res)=>{
    try {
        const {orderId,productId,status} = req.body;

        const adminId = req.user

        // console.log("Incoming Request:", {orderId, productId, status, adminId});

        // check admin exists or not
        const admin = await Admin.findById(adminId)

        if(!admin){
            return res.status(404).json({message:"Admin not found"})
        }

        // check order exists or not
        const order = await Order.findById(orderId)

        if(!order){
            return res.status(404).json({message:"Order not found"})
        }        
        // console.log("Order before update:", JSON.stringify(order, null, 2));
        // check status value
        const validStatuses = ["pending","food processing","out for delivery","delivered","cancelled"]
        if(!validStatuses.includes(status)){
            return res.status(400).json({message:"Invalid status value"})
        }

        // Check if this admin has any product in the order
        const isAdminAllowed = order.items.some(item=> item.adminId.toString() === adminId.toString());
        if(!isAdminAllowed){
            return res.status(403).json({message:"You are not allowed to update this order"});
        }

        
        order.status = status;

       await order.save();
        return res.status(200).json({message:"Order status updated successfully",order})
        
    } catch (error) {
        console.log("Failed to update order status", error);
        return res.status(500).json({message:"Internal server error"});
    }
}


