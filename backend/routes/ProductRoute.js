import express from "express";
import multer from "multer";
import { Addproduct, DeleteProduct, EachProductDetails, GetAllproducts, GetListItems } from "../Controllers/ProductController.js";
import {AdminisAuthenticated} from "../middleware/AdminisAuthenticated.js"

const router = express.Router();

// confrigure multer 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/addproduct",upload.single("image"),AdminisAuthenticated,Addproduct);
router.get("/products",GetAllproducts);
router.get("/listitems",AdminisAuthenticated,GetListItems)
router.get("/:id",AdminisAuthenticated,EachProductDetails)
router.delete("/:id",AdminisAuthenticated,DeleteProduct)



export default router;