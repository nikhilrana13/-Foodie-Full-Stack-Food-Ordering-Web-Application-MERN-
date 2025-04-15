import sharp from "sharp";
import Admin from "../models/AdminModel.js";
// import Product from "../models/ProductModel.js";
import ProductModel from "../models/ProductModel.js"
import cloudinary from "../utils/cloudinary.js"





export const Addproduct = async(req,res)=>{
    try {
        let {adminId,name,description,category,price} = req.body;
        // console.log("req.body",req.body)
        // console.log("req.file",req.file);
        adminId = req.user
        // console.log("admin id ",adminId)
        // check if admin exists or not 
        const admin = await Admin.findById({_id:adminId});

        if(!admin){
            return res.status(404).json({message:"Admin not found"});
        }

       // check all fields are filled or not 
        if(!adminId || !name || !description || !category || !price || !req.file){
            return res.status(400).json({message:"Please fill all fields"});
        }
        
        // check image is upload or not 

        if(!req.file){
            return res.status(400).json({message:"Please upload an image"});
        }

        // optimize image or cloduinary

        const OptimizedBufferImage = await sharp(req.file.buffer).resize({ width: 500, height: 500, fit:"inside"}).toFormat("jpeg",{quality:80}).toBuffer();

        const fileUrl = `data:image/jpeg;base64,${OptimizedBufferImage.toString("base64")}`
        
        const cloudResponse = await cloudinary.uploader.upload(fileUrl);
        const imageUrl = cloudResponse.secure_url;

        const Product = await ProductModel.create({
            adminId,
            name,
            description,
            category,
            price,
            image:imageUrl,
        })
    
        admin.products.push(Product._id)
        await admin.save();

        return res.status(200).json({message:"product add successfully",Product})
        
    } catch (error) {
        console.log("failed to add product",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const GetAllproducts = async(req,res)=>{
    try {
        const products = await ProductModel.find().populate("adminId","name email");

        if(!products){
            return res.status(404).json({message:"No products found"})
        }

        return res.status(200).json({message:"products found",products})
    } catch (error) {
        console.log("failed to get all products",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const EachProductDetails = async(req,res)=>{
    try {
         const adminId = req.user
        //  console.log("req.user",req.user)

        //  check admin exists or not 

        const admin = await Admin.findById(adminId)

        if(!admin){
            return res.status(404).json({message:"Admin not found"})
        }


        const productId = req.params.id;

        const product = await ProductModel.findById(productId)
        .populate("adminId","name email")

        if(!product){
            return res.status(404).json({message:"product not found"})
        }

        return res.status(200).json({message:"product details",product})
        
    } catch (error) {
        console.log("failed to get product details",error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}


export const GetListItems = async(req,res)=>{
    try {
          const adminId = req.user;

        // fetch products added by admin 
        const products = await ProductModel.find({adminId})
        .populate("adminId","name email")

        if(!products || products.length === 0){
            return res.status(404).json({message:"No products found"})
        }   

        return res.status(200).json({message:"products found",products})
    } catch (error) {
        console.log("failed to get products",error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}
export const DeleteProduct = async(req,res)=>{
    try {
        const adminId = req.user;

        // check admin exits or not 

        const admin = await Admin.findById(adminId)

        if(!admin){
            return res.status(404).json({message:"Admin not found"})
        }

        // delete product
        const productId = req.params.id;

        const product = await ProductModel.findByIdAndDelete(productId)
        if(!product){
            return res.status(404).json({message:"product not found"})
        }
         
        // delete product from admin product array also
        await Admin.findByIdAndUpdate(adminId,{
             $pull:{products:productId}
        })

        return res.status(200).json({message:"product deleted successfully"})

    } catch (error) {
        console.log("failed to delete product",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

