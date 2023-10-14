const express = require('express')
const user_controller = require('../controller/user_controller')
userRoute = express.Router()
const middlewares = require('../middleware')
// Router

    // // user routes
    userRoute.post('/register',(req,res) => {
        user_controller.register(req,res)
    })
    
    

    userRoute.route('/login').post(user_controller.login)
    userRoute.route('/me').get(middlewares.checkToken, user_controller.getUserProfile)
    




module.exports = userRoute







    // OR
    // userRoute.route('/register').post(user_controller.register)