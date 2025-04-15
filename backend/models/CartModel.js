import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
       user :{type:mongoose.Schema.Types.ObjectId, ref:"User"},
       product:{type:mongoose.Schema.Types.ObjectId, ref:"Product"},
       quantity:{type:Number, default:1, required:true},
       price:{type:Number, required:true},
       subtotal:{type:Number, default:0},
})

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;

