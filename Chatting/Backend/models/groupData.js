const mongoose = require('mongoose');
// database connection
mongoose.connect('mongodb+srv://usernk:usernk@ictak.svswr.mongodb.net/Chatting?retryWrites=true&w=majority');

// schema definition
const schema = mongoose.Schema;
const roomSchema= new schema({   
    gpname: String,
    members:[String],
    creator:String,
    image:String

});

// model
var roomdata = mongoose.model('roomdata',roomSchema);
module.exports = roomdata;