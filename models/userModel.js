const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    shippingAddress:{
        address:{
            type: String,
            required: false
        },
        city:{
            type: String,
            required: false
        },
        state:{
            type: String,
            required: false
        },
        zipCode:{
            type: Number,
            required: false
        },
        country:{
            type: String,
            required: false
        },
    },
    phone:{
        prefix:{
            type: Number,
            required: false
        },
        number:{
            type: Number,
            required: false
        },
    },
    role:{
        type: String,
        enum: ["user","admin"],
        default: "user",
        required: true
    },
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
        },
    ],
    order:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
    ]
}, { timestamps: true, strict: true});

module.exports = mongoose.model('User', UserModelSchema, 'users')