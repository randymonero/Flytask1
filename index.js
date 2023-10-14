const express = require('express')
const app = express()
const PORT =4000
cors = require('cors')
const bodyParser = require('body-parser')
require('express-async-errors')

const db = require('./db')
const taskRoute = require('./todoRouters/task_router')
const userRoute = require('./todoRouters/user_router')
const middlewares = require('./middleware')




//let the frontend be able to read the data
app.use(cors({origin:'*'}))

// middlewares
app.use(bodyParser.urlencoded({extend:true}))
app.use(bodyParser.json())

 // user routes
//  userRoute.route('/users/register/').post(user_controller)
//  userRoute.route('/users/login/').post(user_controller)

 // task routes
app.use('/api/users',userRoute)
app.use('/api/task',middlewares.checkToken, taskRoute)


app.use((err,req,res,next) => {
    console.log(err);
    res.status(err.status || 500).send('Something went wrong!')
})

// db.query('SELECT 1')
// .then(()=>{
//     console.log("db connected");
//     // console.log(app.use('/api/task',taskRoute))
//     app.listen(PORT,()=> console.log("port:4000"))
// })
// .catch(err => console.log('batabase connection failed. \n' + err ))

    app.listen(PORT,()=> console.log("port:4000"))






