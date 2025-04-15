import express from "express";
import { AdminSignUp,AdminSignIn,AdminSignOut, GetAdminOrders, UpdateOrderStatus } from "../Controllers/AdminController.js";
import { AdminisAuthenticated } from "../middleware/AdminisAuthenticated.js";

const router = express.Router();


router.post("/signup",AdminSignUp)
router.post("/signin",AdminSignIn)
router.get("/signout",AdminSignOut)
router.get("/signout",AdminSignOut)
router.get("/orders",AdminisAuthenticated,GetAdminOrders)
router.put("/updateorderstatus",AdminisAuthenticated,UpdateOrderStatus);

export default router