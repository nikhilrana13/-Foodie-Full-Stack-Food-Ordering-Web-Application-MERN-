import express from "express";
import { UserisAuthenticated } from "../middleware/UserisAuthenticated.js";
import { AddtoCart, DeleteCartItem, getCartItems } from "../Controllers/CartController.js";

const router = express.Router();


router.post("/addtocart",UserisAuthenticated,AddtoCart);
router.get("/Cartitems",UserisAuthenticated,getCartItems)
router.delete("/delete/:id",UserisAuthenticated,DeleteCartItem)


export default router;