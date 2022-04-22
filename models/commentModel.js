const mongoose=require("mongoose")
const Schema=mongoose.Schema

const commentSchema=new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    comment:{
        type:String
    },
    active: {
        type: Boolean,
        default: true,
      },
      modifiedOn: {
        type: Date,
        default: Date.now,
      },
    });
    

const Comment=mongoose.model("comment",commentSchema)
module.exports=Comment 