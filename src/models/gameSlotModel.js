// import mongoose
const mongoose = require('mongoose');

// game schema
const bookingGameSlotSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
    },
    duration: {
      type: Number,
      require: true,
      min: 10,
      max: 60,
    },
    bookingDateTime: [
      {
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
