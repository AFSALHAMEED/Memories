const jwt = require("jsonwebtoken")

const auth = async (req,res,next)=>{
    try {
        console.log(req.headers);
        const token = req.headers.authorization.split(" ")[1]
        const isCustom = token.length<500

        let decodedData

        if(token&& isCustom){
            decodedData = jwt.verify(token,"test")
            console.log(decodedData);
            req.userId= decodedData?.id
        }else{
            decodedData = jwt.decode(token,)
            req.userId = decodedData?.sub

        }
        next()
    } catch (error) {
        console.log(error);
    }
}
module.exports = auth