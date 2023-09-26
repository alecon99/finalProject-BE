const { body, validationResult } = require('express-validator');

const productBodyParams = [
    body('name')
        .notEmpty()
        .isString()
        .withMessage('The name is required and must be a string'),

    body('description')
        .notEmpty()
        .isString()
        .isLength({min: 5})
        .withMessage('The description is required and must be a string of at least 5 characters'),

    body("image")
        .notEmpty()
        .withMessage('The image is required and must be a File'),

    body("price")
        .notEmpty()
        .isNumeric({min: 1})
        .withMessage('The price must be a number greater than 1'),

    body("category")
        .notEmpty()
        .isString()
        .withMessage('The Category is required and must be a string'),

    body("availability")
        .notEmpty()
        .isBoolean()
        .withMessage('The availability is required and must be a Boolean'),
];

const validateProductBody = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    next();
};

module.exports= {productBodyParams, validateProductBody};