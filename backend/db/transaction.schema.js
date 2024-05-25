const mongoose = require('mongoose')
const transactionSchema= new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },status:{
        type:String,
        required:true,
        enum:['success', 'failed'],
        required:true
    },
    description:String,

    

},{timestamps:true})
const Transaction=mongoose.model("Transaction",transactionSchema)
module.exports=Transaction