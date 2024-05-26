const mongoose = require('mongoose');
const express=require("express")
const rootRouter=require('./routes/index')
const cors=require("cors")
const router=express.Router()
const app=express()
const JWT_SECRET=require("./config");
app.use(express.json());
app.use("/api/v1", rootRouter);
app.use(cors())


const connectToMongo=()=>{
    try{

mongoose.connect("mongodb://localhost:27017/paytm-clone");
console.log("connected to MongoDB");
    }catch (e){

        console.error("error connection to mongoDb",e);
        console.error("check is the MongoDB server is running");
    }
}
connectToMongo()
module.exports={router}

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})