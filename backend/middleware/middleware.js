const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware =(req,res,next)=>{
    
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ msg: "token missing / unauthorized" });
        }
        const token=authHeader.split(" ")[1]
    try{
        
        const {userId}=jwt.verify(token,JWT_SECRET);
        req.userId=userId;
        next();
    }catch(e){
        console.log(e)
        return res.status(401).json({msg:"unauthorized /user not found / relogin or signup"})
    }
}
module.exports={authMiddleware}