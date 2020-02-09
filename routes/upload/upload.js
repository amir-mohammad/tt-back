const express = require('express');
const route = express.Router();

route.post('/',(req,res) => {
    const file = req.files.file;
    file.mv(`${__dirname}/uploadfiles/${file.name}`);
    res.json({url:`${__dirname}/uploadfiles/${file.name}`});
})

module.exports = route;