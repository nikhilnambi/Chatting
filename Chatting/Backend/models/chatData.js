const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatdata = new Schema({
    from:String,
    to:String,
    message:String,
    image:String,
    date:{ type: Date, default: Date.now },
    room:String,
    firsttime:String,
    room2:String,
    toImage:String,
    fromImage:String,
    time:String,
    dateformat:String,
    mute:String,
    members:[String],
    
});

const chatData = mongoose.model(
    "chatdata",
    chatdata
);

module.exports= chatData;