const { body, validationResult } = require('express-validator');

const userBodyParams = [
    body('name')
        .notEmpty()
        .isString()
        .isLength({min: 3})
        .withMessage('The name is required and must be a string of at least 3 characters'),

    body('surname')
        .notEmpty()
        .isString()
        .isLength({min: 3})
        .withMessage('The surname is required and must be a string of at least 3 characters'),

    body("email")
        .notEmpty()
        .isEmail()
        .withMessage('The email is required and must be a File'),

    body("password")
        .notEmpty()
        .isString()
        .isLength({min: 5})
        .withMessage('The password is required and must be a Number of at least 5 characters')
];

const validateUserBody = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    next();
};

module.exports= {userBodyParams, validateUserBody};