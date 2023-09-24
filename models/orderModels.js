const mongoose = require('mongoose');

const OrderModelSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    cart:[{}],
    state:{
        type: String,
        enum: ["processing","confirmed","shipped","completed","canceled"],
        default: "processing",
        required: true
    },
    shippingAddress:{},
    paid:{
        total:{
            type: Number,
            require: true
        },
        products:{
            type: Number,
            require: true
        },
        shipping:{
            type: Number,
            require: true
        }
    }
}, { timestamps: true, strict: true});

module.exports = mongoose.model('Order', OrderModelSchema, 'orders')