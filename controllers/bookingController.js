const Booking = require("../models/bookingModel")
const Order = require("../models/orderModel")
const Package = require("../models/packageModel")
const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// BOOKING ADD

exports.addbooking=async (req,res)=>{
    const bookingdate = req.body.bookingdate;
    const bookingtime = req.body.bookingtime
        const checkUser = await Booking.findOne({ bookingdate: bookingdate, bookingtime });
    if (checkUser) {
         return res
        .status(400)
        .json({ errors: [{ msg: "This date is already booked" }] });
    }
    try {
        const booking=new Booking(req.body)
        booking.user=req.user._id
        booking.member = {
            name: req.body.name,
            relation:req.body.relation,
            DOB:req.body.DOB,
            gender:req.body.gender,
            number:req.body.number,
            email:req.body.email      
          };
        booking.save()
        const package = await Package.findById(req.body.package);

        const order = await Order.create({
            user: req.user._id,
            price: package.price,
            discount: package.discount,
            booking: booking._id

        })

        const orderOptions = {
            amount: (package.price - package.discount) * 100,
            currency: "INR",
          };
      
        const paymentGatewayorder = await instance.orders.create(orderOptions);
        order.razorpay_order_id = paymentGatewayorder.id;
        await order.save();
        return res.status(200).json({msg:"booking successfully",booking, order: {
            razorpayOrderId: paymentGatewayorder.id,
            currency: "INR",
            amount: orderOptions.amount
        }})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})        
    }
}


// GET BOOKING DETAIL

exports.getbooking=async (req,res)=>{
try {
    const getbooking=await Booking.find({user:req.user._id})
    .populate("package")
    .populate("user")
    .populate("package.categoryId")
    return res.status(200).json({msg:"booking get successfully",getbooking})
} catch (error) {
    console.log(error)
    return res.status(400).json({msg:"something went wrong"})       
 }
}

// UPDATE BOOKING

exports.updatebooking=async (req,res)=>{
    try {
        const {bookingdate,bookingtime,patientname,patientnumber}=req.body
        const updatebooking=await Booking.findOneAndUpdate(req.user.id,{
            bookingdate,
            bookingtime,
            patientname,
            patientnumber
        })
        return res.status(200).json({msg:"booking update successfully",updatebooking})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     } 
}

// DELETE BOOKING

exports.deletebooking=async (req,res)=>{
    try {
        const deletebooking=await Booking.findOneAndDelete({user:req.user._id})
        return res.status(200).json({msg:"booking delete successfully",deletebooking})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})       
     } 
}


// GET ALL BOOKING
exports.allbooking=async (req,res)=>{
    try {
        const allboking=await Booking.find({})
        return res.status(200).json({msg:"all booking get successfully",allboking})
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:"something went wrong"})          
    }
}
