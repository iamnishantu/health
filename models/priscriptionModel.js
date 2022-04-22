const mongoose=require("mongoose")
const Schema=mongoose.Schema;

const priscriptionSchema=new Schema({
    priscription:{
        type:String
    }
},
{
    timestamps:true
}
)

const Priscription=mongoose.model("priscription",priscriptionSchema)
module.exports=Priscription