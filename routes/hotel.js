const express = require("express");

const { getSinglhotel, getAllHotel, ubdqateHotels,getHotelRooms, createHotel, deleteHotel, countByCity ,countByType} = require("../service/HotelService");
const { verifyAdmin } = require("../utils/veriftyToken");

const router = express.Router();

router.get("/", getAllHotel);

router.route('/find/:id').get(getSinglhotel)
router.route('/countByCity').get(countByCity)
router.route('/countByType').get(countByType)
///router.route('/getAllHotel').get(getAllHotel)
router.route('/ubdqateHotels/:id').put(ubdqateHotels)
router.route('/createHotel').post(createHotel)
router.route('/:id').delete(deleteHotel)
router.route('/room/:id').get(getHotelRooms)
module.exports = router;