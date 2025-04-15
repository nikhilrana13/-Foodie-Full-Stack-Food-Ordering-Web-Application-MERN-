import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
     userId:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
     items:[{
          productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
          adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
          quantity:{type:Number,default:1},
          subtotal:{type:Number,default:0}  
     }],
     Deliveryinformation:{
          name:{type:String,required:true},
          address:{type:String,required:true},
          email:{type:String,required:true},
          city:{type:String,required:true},
          state:{type:String,required:true},
          country:{type:String,required:true},
          pincode:{type:String,required:true},
          phone:{type:String,required:true}
     },
     totalAmount: {type:Number,required:true},
     status:{type:String, default:"pending", enum:["pending","food processing","out for delivery","delivered","cancelled"]},
     OrderAt:{type:Date, default:Date.now},
})

const Order = mongoose.model("Order", OrderSchema);
export default Order;