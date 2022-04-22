const mongoose=require("mongoose")
const Schema=mongoose.Schema

const bookingSchema=new Schema({
  bookingdate:String,
  bookingtime:String,
  patientname:String,
  patientnumber:String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    package:{
      type:Schema.Types.ObjectId,
      ref:"package" ,
    },
    member: {  
      type: 
        {
          name:String,
          relation:String,
          DOB:String,
          gender:{
            type:String,
          },
          number:{
            type:String,
          },
          email:String
          },
      },
      active: {
        type: Boolean,
        default: false,
      },
      modifiedOn: {
        type: Date,
        default: Date.now,
      },
    });
    

const Booking=mongoose.model("booking",bookingSchema)
module.exports=Booking 