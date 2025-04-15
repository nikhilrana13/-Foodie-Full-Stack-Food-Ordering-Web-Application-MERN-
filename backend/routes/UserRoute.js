import express from "express";
import { UserSignUp,UserSignIn,UserSignOut} from "../Controllers/UserController.js";
import { UserisAuthenticated } from "../middleware/UserisAuthenticated.js";

const router = express.Router();


router.post("/signup",UserSignUp);
router.post("/signin",UserSignIn);
router.get("/signout",UserSignOut);
export default router;
