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
    ]
}, { timestamps: true, strict: true});

module.exports = mongoose.model('User', UserModelSchema, 'users')