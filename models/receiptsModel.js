const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const receiptsSchema=new Schema({
    receipt:{
        type:String
    }
},
{
    timestamps:true
}
)

const Receipt=mongoose.model("receipt",receiptsSchema)
module.exports=Receipt