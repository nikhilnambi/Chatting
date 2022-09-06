var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    username:String,
    image:String,
});

module.exports = new mongoose.model('image',imageSchema);