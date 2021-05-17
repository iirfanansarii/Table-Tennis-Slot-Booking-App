// import mongoose
const mongoose = require('mongoose');

// game schema
const bookingGameSlotSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
    },
    bookingDateTime: [
      {
        gameName: {
          type: String,
          required: true,
          max: 30,
          min: 10,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          max: 50,
          min: 5,
        },
        duration: {
          type: Number,
          require: true,
          min: 10,
          max: 60,
        },
        slotStartTime: {
          type: Number,
        },
        slotEndingTime: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

// exports collection
module.exports = mongoose.model('gameSlots', bookingGameSlotSchema);
