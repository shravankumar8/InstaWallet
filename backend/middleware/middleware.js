const { JWT_SECRET } = require("../config");

const authMiddleware =(req,res,next)=>{
        const authHeader = req.headers.authorization
    const token=authHeader.split(" ")[1]
    if (!authHeader) {
      return res.status(401).json({ msg: "unauthorized" });
    }
    try{
        const {userId}=jwt.verify(token,JWT_SECRET);
        req.userId=userId;
        next();
    }catch(e){
        return res.status(401).json({msg:"unauthorized"})
    }
}
module.exports={authMiddleware}