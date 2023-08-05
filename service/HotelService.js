
const Hootel = require('../moduls/Hotel');
const Room = require('../moduls/Room');
exports.createHotel = async(req, res, next) => {
  const newHotel = new Hootel(req.body)
  try{
  const saveHotel = await newHotel.save()
   res.status(200).json(saveHotel)
      
  }catch(err){
   res.status(500).json(err)
  }
}




exports.ubdqateHotels = async(req,res,next) => {
  try{
    const ubdqateHotel = await Hootel.findByIdAndUpdate(req.params.id, {$set: req.body})
    res.status(200).json(ubdqateHotel)

}catch(err){
    res.status(500).json(err)
}
}

exports.getAllHotel = async(req,res,next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hootel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max ||  999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
}










exports.countByCity = async(req,res,next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hootel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
}


exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hootel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hootel.countDocuments({ type: "apartment" });
    const resortCount = await Hootel.countDocuments({ type: "resort" });
    const villaCount = await Hootel.countDocuments({ type: "villa" });
    const cabinCount = await Hootel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};



exports.getSinglhotel  = async (req, res, next) => {
  try {
    const hotel = await Hootel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  
 }
}



exports.deleteHotel  = async(req, res,next) => {
  try{
    await Hootel.findByIdAndDelete(req.params.id);
   res.status(200).json({message:"successfuly"})

}catch(err){
   res.status(500).json(err)
}
}


exports.getHotelRooms = async(req, res, next) => {
  try {
    const hotel = await Hootel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
}