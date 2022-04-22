const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  { 
number: {
    type: String,
    unique:true
  },
  name:{
   type:String 
  },
  email:{
    type:String
  },
  age:{
    type:Number
  },
 gender:{
     type:String,
 },
 image:{
  type:String
},
 tokens: {
    type: String,
  }
  }, 
  {
    timestamps: true,
  }
);


var User = mongoose.model("user", userSchema);
module.exports = User;
