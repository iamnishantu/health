const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const packageSchema=new Schema({
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"category"
    },
    recommended:{
        type:String
    },
    agegroup:{
        type:String
    },
    field1:{
        type:String,
        required:true
    },
    field2:{
        type:String,
    },
    field3:{
        type:String,
    },
    field4:{
        type:String,
    },
    field5:{
        type:String,
    },
    field6:{
        type:String,
    },
    description:{
        type:String,
    },
    price: {
        type: Number
    },
    discount: {
        type: Number,
        default: 0
    }
},{
    timestamps:true
}

)

const Package=mongoose.model("package",packageSchema)
module.exports=Package