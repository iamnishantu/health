const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const reportSchema=new Schema({
    report:{
        type:String
    }
},
{
    timestamps:true
}
)

const Report=mongoose.model("report",reportSchema)
module.exports=Report