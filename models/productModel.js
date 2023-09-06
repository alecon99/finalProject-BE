const mongoose = require('mongoose');

const ProductModelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    availability:{
        type: Boolean,
        required: true
    }
}, { timestamps: true, strict: true});

module.exports = mongoose.model('Product', ProductModelSchema, 'products')