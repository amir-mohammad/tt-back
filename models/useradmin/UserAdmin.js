const mongoose = require('mongoose');


const UserAdminSchema = mongoose.Schema({

    name:String,
    mobile:String,
    password:String
});


module.exports = mongoose.model('UserAdmin',UserAdminSchema);