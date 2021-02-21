const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: [true, 'You must specify a merchant name'],
        minlength: [4, 'Merchant name should be at least 4 characters long']
    },
    total: {
        type: Number,
        required: true,
        min: [0, 'Total should be a positive number!']
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [3, 'Description should be at least 3 characters long'],
        maxlength: [30, 'Description should no more than 30 characters long'],
    },
    report: {
        type: Boolean,
        default: false,
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})


module.exports = mongoose.model('Product', productSchema);