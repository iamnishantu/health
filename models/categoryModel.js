const mongoose=require("mongoose")
const { required } = require("nodemon/lib/config")
const Schema=mongoose.Schema

const categorySchema=new Schema({
    categoryname:{
        type:String,
        required:true
        },
        doctorname:{
            type:String,
            required:true
        },
    testname:{
        type:String
    }
    },
    {
        timestamps:true
    }
    )

const Category=mongoose.model("category",categorySchema)
module.exports=Category