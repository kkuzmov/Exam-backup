const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET, SALT_ROUNDS } = require('../config/config')

// ВНИМАВАЙ КАКВО СЛАГАШ В COOKIE КАТО ГО ВРЪЩАШ  - ако е нужно например за профил!!

async function register({username, password, amount}) { 
    const repeatUser = await User.findOne({username})
    if(repeatUser){
        throw {message: 'Username already in use!'};
    }
    const user = new User({username,password, amount}); 
    return await user.save();
}
async function login({username,password}){
    let user = await User.findOne({username})
    if(!user) throw {message: 'User not found!'};

    let isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw {message: 'Wrong password!'};
    let token = jwt.sign({_id: user._id, username: user.username}, SECRET)

    return token
}
async function getUser(userId){
    let user = await User.findById(userId)
    return user;
}
async function updateOne(userId, newData){
    return User.updateOne({_id: userId}, newData);
}

module.exports = {
    register,
    login,
    getUser,
    updateOne
}