const Category=require("../models/categoryModel")

// CATEGORY ADD BY ADMIN

exports.addcategory=async (req,res)=>{
    // console.log("dfjasdfsakfvj")
    try {
        const category=new Category(req.body)
        category.save()
        return res.status(200).json({ msg:'category add successfully',category})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}

// CATEGORY GET BY ADMIN

exports.getsinglecategory=async (req,res)=>{
    try {
        const getcategory=await Category.findById({ _id: req.params.id})
        return res.status(200).json({ msg:'category get successfully',getcategory})
    } catch (error) {
        console.log(error)        
        return res.status(400).json({msg:"something went wrong",error:error.message})

    }
}

// GET ALL CATEGORY

exports.getallcategory=async (req,res)=>{
    try {
        const getallcategory=await Category.find({})
        return res.status(200).json({ msg:' get all category successfully',getallcategory})
    } catch (error) {
        console.log(error)        
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}

// UPDATE CATEGORY

exports.updatecategory=async (req,res)=>{
    try {
        const {categoryname,testname}=req.body;
        const updatecategory=await Category.findByIdAndUpdate(req.params.id,{
            categoryname,
            testname
        })
        return res.status(200).json({ msg:'update category successfully',updatecategory})
    } catch (error) {
        console.log(error)        
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}

//DELETE CATEGORY 

exports.deletecategory=async (req,res)=>{
    try {
        const deletecategory=await Category.findByIdAndDelete({ _id: req.params.id})
        return res.status(200).json({ msg:'category delete successfully',deletecategory})
    } catch (error) {
        console.log(error)        
        return res.status(400).json({msg:"something went wrong",error:error.message})

    }
}

exports.search = async (req, res) => {
    try {
      var regex = new RegExp(req.params.name, "i");
      const categoryname = await Category.find({ categoryname: regex });
      console.log(req.params.name);
      return res.status(200).json(categoryname);
  
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  };