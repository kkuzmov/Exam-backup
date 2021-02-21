const mongoose = require('mongoose');
const { DB } = require('../config/config');
const dbOptions = { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useCreateIndex: true, 
        useFindAndModify: true
                 }
module.exports = (app) => {
mongoose.connect(DB, dbOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '))

db.once('open', console.log.bind(console, 'Exam DB Connected!'))
}