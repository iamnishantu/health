const Comment=require("../models/commentModel")

// COMMENT ADD

exports.addcomment=async (req,res)=>{
    try {
        const comment=new Comment(req.body)
        comment.user=req.user._id
        comment.save()
        return res.status(200).json({msg:"Commnet add successfully",comment})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})        
    }
}

// GET COMMENT

exports.view = async (req, res) => {
    try {
      const viewcomment = await Comment.find({});
      return res.status(200).json({msg:"successfully get comment",viewcomment});
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  };