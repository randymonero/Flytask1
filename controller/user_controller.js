const bcrypt = require('bcrypt');
const models = require('../models');
const jwtUtils = require("../utils/jwt.utils");

//routes
module.exports = {
    register: (req, res) => {
        // params 
        const { name, email, password } = req.body;

        if (name == null || name == '' || name == undefined || email == null || email == '' || email == undefined || password == null || password == '' || password == undefined) {

            return res.status(400).json({ 'error': 'missing parameters' })
        }

        models.User.findOne({
            attributes: ['email'],
            where: { email: email }
        })

            .then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 5, (err, bcryptedPassword) => {
                        models.User.create({
                            name: name,
                            email: email,
                            password: bcryptedPassword,
                            isAdmin: false
                        })
                            .then((newUser) => {
                                return res.status(201).json({
                                    userId: newUser.id,
                                    isAdmin: newUser.isAdmin
                                })
                            })
                            .catch((newUser) => {
                                return res.status(500).json({
                                    'error': 'cannot add user'
                                })
                            })
                    })
                } else {
                    return res.status(409).json({ 'error': 'user already exist' })
                }
            })
            .catch((err) => {
                return res.status(500).json({ 'error': 'unable to verify user' })
            })
    },

    login: (req, res) => {
        // params
        let { email, password } = req.body
        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        models.User.findOne({
            where: { email: email }
        })
            .then(function (userFound) {
                if (userFound) {

                    bcrypt.compare(password, userFound.password, function (errBcrypt, resBcrypt) {
                        if (resBcrypt) {
                            return res.status(200).json({
                                "userId": userFound.id,
                                "isAdmin": userFound.isAdmin,
                                "access_token": jwtUtils.generateTokenForUser(userFound)
                            })
                        }
                        else {
                            return res.status(403).json({ 'error': 'invalid password' })
                        }
                    })
                } else {
                    return res.status(404).json({ 'error': 'User not found' })
                }
            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'unable to verify the user' })
            })
    },

    getUserProfile: function (req, res) {
        // Getting auth header
        let headerAuth = req.headers['authorization'];
        let userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0) {
            return res.status(400).json({ 'error': 'wrong token' })
        }

        models.User.findOne({
            where: { id: userId }
        })
            .then(function (userFound) {
                if (userFound) {
                    return res.status(200).json(userFound)
                } else {
                    return res.status(404).json({ 'error': 'user not found' })

                }
            })
            .catch(function (error) {
                return res.status(500).json({ 'error': 'can not fetch user' })

            })
    },
    getAllUsers: async (req, res) => {
        let headerAuth = jwtUtils.getUserToken(req);
        let isAdmin = jwtUtils.getUserAdmin(headerAuth);

        if (isAdmin) {
            let users = await models.User.findAll({
                order: [
                    ['name', 'ASC'],
                    ],
            });
            return res.status(400).json({ users });
        }else{
            return res.status(403).json({ error: "You are not Authorized" });
        }
    }
}



// login:function(req,res)=>{}
// db.query("SELECT email FROM to_do_app.users WHERE email = ?",[email], async(error,results)=>{
// console.log('>>>>>>>>>>>')
    
//     if (error) {
//         console.log(error)
//     }
    
//     if( results.length > 0 ) {
//         return res.render('register',{
//             message: 'that email is already in use'
//         })
//     }
//     else if( password !== passwordConfirm){
//         return res.render('register',{
//             message: 'Password does not match'
//         })
//     }

//     let hashedPassword = await bcrypt.hash(password,5);
//     console.log(hashedPassword);

//     db.query('INSERT INTO users SET ? ',{name: name, email: email, password: password}, (error,results) => {
//         if (error) {
//             console.log(error);
//         }else{
//             console.log(results);
//             return res.render('register',{
//                  message: 'user registered'
//             })
//         }
//     })
// })

//    vrify user's info//