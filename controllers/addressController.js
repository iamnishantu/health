const address = require('../models/addressModel');
exports.Addadress = async(req,res)=>{
	try{
	const myAddress = new address(req.body)
	myAddress.user = req.user._id
	myAddress.save()
	return res.status(200).json({
		message:"Succefully add",myAddress
	})
	}catch (error){
		console.log(error)
		res.status(500).json({
		message:error.message
		})
	}
}

exports.getAddress = async(req,res)=>{
	   try{
		console.log(req.user._id)
		const getAdress = await address.find({user: req.user._id})
		console.log(getAdress)
		return res.status(200).json({
		message:"Succefully get", getAdress
		})
	   }catch(error){
		console.log(error)
		res.status(500).json({
			message:error.message
		})
	}
}
