
const Room = require('../moduls/Room');
const Hootel = require('../moduls/Hotel');



exports.createRoom = async(req, res, next) => {
   const hotelId = await req.params.hotelId; 
  const newRoom = new Room(req.body)
  try{
    const savedRoom = await newRoom.save();
    try{
        await Hootel.findByIdAndUpdate(hotelId, {
            $push: {rooms: savedRoom._id},
        });
    }catch (err){
   next(err);
    }
    res.status(200).json(savedRoom)
  }catch(err){
 next(err)
  }
};



exports.ubdqateRooms = async(req,res,next) => {
  try{
    const ubdqateRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body})
    res.status(200).json(ubdqateRoom)

}catch(err){
    res.status(500).json(err)
}
}


exports.ubdqateRoomsavailability = async(req,res,next) => {

  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
}


exports.getAllRoom = async(req,res,next) => {
  try{
    const Rooms =  await Room.find();
     res.status(200).json({Rooms})
 }catch(err){
     next(err)
 }
}





exports.getSingleRoom  = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
}



exports.deleteRoom  = async(req, res,next) => {
  const hotelId = req.params.hotelId; 
  try{
    await Room.findByIdAndDelete(req.params.id);
    try{
      await Hootel.findByIdAndUpdate(hotelId, {
          $pull: {rooms: req.param.id},
      });
  }catch (err){
 next(err);
  }
   res.status(200).json({message:"successfuly"})

}catch(err){
   res.status(500).json(err)
}
}
