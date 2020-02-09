const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoURI');


const connectDB = () =>{
    mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    },() => {
        try {
            console.log('Connect to db ');
            return true
        } catch (error) {
            console.log('db can not connect');
            process.exit(1);
            return false;
        }
    })
}

module.exports = connectDB;