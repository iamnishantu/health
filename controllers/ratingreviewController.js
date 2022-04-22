const Rating=require("../models/rating.reviewModel")

// REVIEW RATING ADD

exports.addrating=async (req,res)=>{
    try {
        const rating=new Rating(req.body)
        rating.user=req.user._id
        rating.package=req.body.package
        rating.save()
        return res.status(200).json({msg:"Rating and Review add successfully",rating})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})        
    }
}

// GET COMMENT

exports.view = async (req, res) => {
    try {
      const viewrating = await Rating.find({})
      .populate('user')
      return res.status(200).json({msg:"successfully get comment",viewrating});
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  };