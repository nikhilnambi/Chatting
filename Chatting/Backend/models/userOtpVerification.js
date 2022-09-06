const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserOtpVerificationSchema = new Schema({
    email: String,
    otp: String,
    createdAt:Date,
    expiresAt:Date,
    

});

const UserOtpVerification = mongoose.model(
    "UserOtpVerification",
    UserOtpVerificationSchema
);

module.exports=UserOtpVerification;
