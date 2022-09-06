const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://usernk:usernk@ictak.svswr.mongodb.net/Chatting?retryWrites=true&w=majority');

// schema definition
const Schema=mongoose.Schema;
const MutechatSchema = new Schema({
    from:String,
    to:String
});

//Model creation
var Mutechatdata =mongoose.model('Mutechatdata',MutechatSchema);
module.exports= Mutechatdata;