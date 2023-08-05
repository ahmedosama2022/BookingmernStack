const express = require("express");

const {createuser,ubdqateuser,getAlluser,getSingleuser,deleteuser} = require("../service/userService");

const { verifyUser,verifyAdmin} = require("../utils/veriftyToken")
const router = express.Router();



router.route('/getSingleuser/:id',verifyUser).get(getSingleuser)
router.route('/',verifyAdmin).get(getAlluser)
router.route('/ubdqateuser/:id',verifyUser ).put(ubdqateuser)
router.route('/createuser', verifyAdmin).post(createuser)
router.route('/:id', verifyUser).delete(deleteuser)



module.exports = router;