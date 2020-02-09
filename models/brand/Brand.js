const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema({
    name:String,
    image:String
});

module.exports = mongoose.model('Brand',BrandSchema);