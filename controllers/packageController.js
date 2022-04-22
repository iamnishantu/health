const Package=require("../models/packageModel")

// ADD PACKAGE

exports.addpackage=async (req,res)=>{
    try {
        const package=new Package(req.body)
        package.save()
        return res.status(200).json({ msg:'package add successfully',package})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}

// GET PACKAGE

exports.getpackage=async (req,res)=>{
    try {
        const getpackage=await Package.findById({_id:req.params.id}).populate("categoryId")
        return res.status(200).json({ msg:'package get successfully',getpackage})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}

exports.getallpackage=async (req,res)=>{
    try {
        const getpackage=await Package.find().populate("categoryId")
        return res.status(200).json({ msg:'package get successfully',getpackage})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}

