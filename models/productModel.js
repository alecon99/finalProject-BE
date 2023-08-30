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
    images:{
        main:{
            type: String,
            required: true
        },
        optional:{
            type: String,
            required: false
        }
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