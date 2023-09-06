const mongoose = require('mongoose')

const CartModelSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            require: true
        },
        product:{
            id:{
                type: String,
                require: true
            },
            name:{
                type: String,
                require: true
            },
            price:{
                type: Number,
                require: true
            },
            img:{
                type: String,
                require: true
            },
        },
        quantity: {
            type: Number,
            require: true,
            default: 1
        }
    },
    {
        timestamps: true, 
        strict: true
    }
)

module.exports = mongoose.model('Cart', CartModelSchema, "carts" )
