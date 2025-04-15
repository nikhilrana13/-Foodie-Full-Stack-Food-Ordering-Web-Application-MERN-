import express from "express"
import { UserisAuthenticated } from "../middleware/UserisAuthenticated.js";
import { MyOrders, PlacedOrder } from "../Controllers/OrderController.js";

const router = express.Router();

router.post("/placedorder",UserisAuthenticated,PlacedOrder)
router.get("/Myorders",UserisAuthenticated,MyOrders)
export default router;