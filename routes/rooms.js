const express = require("express");

const { getSingleRoom, getAllRoom, ubdqateRooms, createRoom, deleteRoom, ubdqateRoomsavailability } = require("../service/Room");
const { verifyAdmin } = require("../utils/veriftyToken");

const router = express.Router();



router.route('/getSingleRoom/:id').get(getSingleRoom)
router.route('/getAllRoom').get(getAllRoom)
router.route('/ubdqateRooms/:id').put(ubdqateRooms)
router.route('/availability/:id').put(ubdqateRoomsavailability)
router.route('/createRoom/:hotelId').post(createRoom)
router.route('/deleteRoom/:id/:hotelId').delete(deleteRoom)

module.exports = router;