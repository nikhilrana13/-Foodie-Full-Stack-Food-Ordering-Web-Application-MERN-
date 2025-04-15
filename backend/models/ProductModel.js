import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    adminId:{type:mongoose.Schema.Types.ObjectId,ref:"Admin",required:true},
    name:{type:String, required:true},
    image:{type:String, required:true},
    price:{type:Number, required:true},
    category:{type:String, required:true, enum:["pasta","chinese","pure veg","non-veg","fast food","snacks","dinner","breakfast"]},
    description:{type:String, required:true},
});

const ProductModel = mongoose.model("Product", ProductSchema)
export default ProductModel

