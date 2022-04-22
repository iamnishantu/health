const {Schema,model} = require("mongoose");

const addressSchema = new Schema({

	 user:{
	 	type:Schema.Types.ObjectId,
	 	ref:"user",
	 	required:true
	 },

	 addressLine1:{
	 	type:String,
	 	required:true
	 },
	 addressLine2:{
	 	type:String,
	 	required:true
	 },
	 city:{
	 	type:String,
	 	required:true
	 },
	 state:{
	 	type:String,
	 	required:true
	 },

	 pincode:{
	       type:String,
	       required:true
	 },
	 name:{
	 	type:String,
	 	required:true
	 },


	 location:{
	 	coordinates:{
	 		type:[Number],
	 		required:true,
	   },
	   type:{
	   	type:String,
	   	enum: ["Point"],
	   	required:true
	   }
	 },


	 mobile_number:{
	 	type:String,
	 	required:true
	 },
	
	 appointmentMethod:{
	 	type:String,
	 	enum:['offline','online'],
	 	required:true
	 }

},
{
	timestamps:true
})

module.exports = model("address",addressSchema)