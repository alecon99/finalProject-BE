const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    const token = req.header('Authorization')

    if(!token){
        return res.status(401).send({
            statuCode: 401,
            message: 'Unauthorized user'
        })
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify

        next()
    } catch (error) {
            res.status(403).send({
            statuCode: 403,
            message: 'Unauthorized user'
        })
    }
};