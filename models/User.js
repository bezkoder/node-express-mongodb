const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: String,
    mobile: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    version: String,
    address: String,
    cordinates : String, 
    password: String,
    status: String,
    balance: Number,
    pending_balance: Number,
    email: String,
    details: String,
    affiliater_id: String,
    language: {
      type: String,
      default: 'EN',
    },
    rate: {
      type: Number,
      default: 0,
    },
    image: String,
    otp: String,
    role: String,
    isAgent : {
      type : Boolean , 
      default : false
    },
    deviceId : String,
    CorporateId : String,
    firebase_token: String,
    hitsDailyCount: [{
      day: String,
      shares: Number,
      clicks: Number,
    }]
  },
  { timestamps: true }
);



module.exports = mongoose.model('User', UserSchema);
