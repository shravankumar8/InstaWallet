const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    firstname:{type:String,required:true,trim:true},
    lastname:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true,minLength:6},

})
const User=mongoose.model("User",userSchema)
module.exports={User}
