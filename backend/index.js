import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import CartRoute from "./routes/CartRoute.js"
import OrderRoute from "./routes/OrderRoute.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;




// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes //
app.use("/api/user",UserRoute);
app.use("/api/admin",AdminRoute);
app.use("/api/product",ProductRoute);
app.use("/api/cart",CartRoute);
app.use("/api/order",OrderRoute);


// connect to db
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("failed to connect MongoDB");
})


app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
