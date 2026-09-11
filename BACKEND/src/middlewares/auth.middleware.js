const jwt = require('jsonwebtoken');
const {blackListedTokens_Model} = require('../models/blacklist.schema');

async function verifyUser(req,res,next) {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    const blackListedToken = await blackListedTokens_Model.findOne({token});

    if(blackListedToken){
        return res.status(401).json({
            message: "Token is invalid"
        })
    }

    try{

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

    }
    catch(err){

        return res.status(401).json({
            message: "Invalid Token"
        })

    }

}

module.exports = {
    verifyUser
}