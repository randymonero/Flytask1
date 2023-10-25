var jwt = require('jsonwebtoken')

const JWT_SIGN_SECRET = "dfgsefdsfdsfseefsefdsfgdjdtgfdrfgrf6vugt7iujhiyryerdf"

module.exports = {
    generateTokenForUser: function (userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
            JWT_SIGN_SECRET,
            {
                expiresIn: '24h'
            }
        )
    },
    parseAuthorization: function (authorization) {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null
    },
    getUserId: function (authorization) {
        let userId = -1;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
                if (jwtToken != null) {
                    userId = jwtToken.userId
                }
            } catch (error) { }
        }
        return userId
    },
    getUserAdmin: function (authorization) {
        let isAdmin = false;
        let token = module.exports.parseAuthorization(authorization);
        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
                if (jwtToken != null) {
                    isAdmin = jwtToken.isAdmin
                }
            } catch (error) { }
        }
        return isAdmin
    },
    
    getUserToken: function (req) {
        let headerAuth = req.headers['authorization'];
        return headerAuth
    }
}