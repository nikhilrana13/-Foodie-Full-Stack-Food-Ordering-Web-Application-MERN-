import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    Cart:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    Orders:[{type:mongoose.Schema.Types.ObjectId, ref:"Order"}],
})

const User = mongoose.model("User", UserSchema);
export default User;