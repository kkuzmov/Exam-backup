const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config')
let ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;


const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'You must specify a username'],
        unique: true,
        minlength: [4, 'Username should be at least four characters long'],
        validate: {
            validator: (value) =>{
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value);
             },
            message: (props)=>{
                return `${props.value} is invalid! Username should consist only of english letters and digits`
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [4, 'Password should be at least four characters long'],
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
        min: [0, 'Account amount must be a positive number!']
    },
    expenses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    }]
})


userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt =>{
            return bcrypt.hash(this.password, salt);
        })
        .then(hash =>{
            this.password = hash;
            next()
        })
        .catch(err=>{
            console.log(err)
        })
    
    })

module.exports = mongoose.model('User', userSchema)