// backend/routes/user.js
const express = require("express");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { User } = require("../db/schemas");
const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../db/bank.schema");
const userRouter = express.Router();
userRouter.use(express.json());

const signupBody = zod.object({
  email: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
    
    const success = signupBody.safeParse(req.body);
    
    if (!success) {
        return res
          .status(400)
          .json({
            msg: "Invalid input. Please check your details and try again.",
         
        });
    }
    const existinguser = await User.findOne({
        email: req.body.email,
    });
    if (existinguser) {
    return res
      .status(409)
      .json({
        msg: "Email is already taken or invalid input. Please check your details and try again.",
      });
    }
    const newUser = await User.create({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
    });
    const userId = newUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ msg: "User created successfully.", token: token });

   await Account.create({
    userId,
    balance:1+Math.random()*10000
   })
    console.log(req.body.email, "has Signed Up succesfully");
});
const userLoginSchema=zod.object({
    email:zod.string().email(),
    password:zod.string()
})
userRouter.post("/signin",async(req,res) => {
    const {success}=userLoginSchema.safeParse(req.body);
    if(!success) {
        return res
          .status(411)
          .json({
            msg: "Invalid input. Please check your details and try again.",
          });
    }
    const existingUser=await User.findOne({email:req.body.email})
    if (!existingUser) {
      return res
        .status(404)
        .json({
          msg: "User not found. Please sign up to create a new account.",
        });
    } else if (existingUser.password !== req.body.password) {
      return res
        .status(401)
        .json({ msg: "Incorrect password. Please try again." });
    } 
    
    
    const userId = existingUser._id;
    const token=jwt.sign({userId},JWT_SECRET)
    console.log(existingUser.email,"has logged in successfully")
    
res.json({token:token})

})

const updateBody=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
})

userRouter.put("/modify",authMiddleware,async(req,res)=>{
const {success}=updateBody.safeParse(req.body)
if(!success){
    res.status(411).json({
        msg:"Error while updating information. Please try again."
    })
}

await User.updateOne({ _id: req.userId },req.body);
res.json({msg:"Information updated successfully."})

})



userRouter.get("/bulk",authMiddleware,async(req,res)=>{
    const filter=req.query.filter||"";
    const users = await User.find({
      $or: [{
          firstname: {
            "$regex": filter
          }
        },{
          lastname: {
            "$regex": filter
         }
        }]
    });
    res.json({
        user:users.map(user => ({
            firstname:user.firstname,
            lastname:user.lastname,
            email:user.email,
            
            _id:user._id,
        }))
    })

})

module.exports = userRouter;
