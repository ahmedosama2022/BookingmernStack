
const User = require('../moduls/User');




exports.createuser = async(req, res, next) => {
  const newHotel = new Hootel(req.body)
  try{
  const saveHotel = await newHotel.save()
   res.status(200).json(saveHotel)
      
  }catch(err){
   res.status(500).json(err)
  }
}




exports.ubdqateuser = async(req,res,next) => {
  try{
    const ubdqateuser= await User.findByIdAndUpdate(req.params.id, {$set: req.body})
    res.status(200).json(ubdqateuser)

}catch(err){
    res.status(500).json(err)
}
}


exports.getAlluser = async(req,res,next) => {
  try{
    const user =  await User.find();
     res.status(200).json(user)
 }catch(err){
     next(err)
 }
}





exports.getSingleuser  = async (req, res, next) => {
  try{
    const user =  await User.findById(req.params.id);
     res.status(200).json(user)
 
 }catch(err){
     res.status(500).json(err)
 }
}



exports.deleteuser  = async(req, res,next) => {
  try{
    await User.findByIdAndDelete(req.params.id);
   res.status(200).json({message:"successfuly"})

}catch(err){
   res.status(500).json(err)
}
}
