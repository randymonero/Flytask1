const { response } = require("express");
const jwtUtils = require("../utils/jwt.utils")




exports.checkToken = (req,res,next) =>{
     // Getting auth header
     var headerAuth = jwtUtils.getUserToken(req)
     var userId = jwtUtils.getUserId(headerAuth)

     if (userId < 0){
        res.status(498).json({"error": "invalid taken"})
     }else{
        next()}
}