const mongoose = require("mongoose");


// 1- Create Schema
const RoomSchema = new mongoose.Schema({

    title: {
        type: String,
        required : [true, 'please enter your name']
    }, 
   
   price: {
    type: Number,
    required: true ,
   },

   maxPeople: {
    type: Number,
    required: [true ,'password required'],
   },
   desc: {
    type: String,
    required: true,
   },
   roomNumber:[{number:Number, unavailableDates:[{type: [Date]}]}],
  },
  {timestamps: true}
  )

  


const User = mongoose.model('Room', RoomSchema);

module.exports = User;