// import route
const router = require('express').Router();

// game controller
const {
  bookGameSlot,
  editNewGameSlot,
  getAllBookedSlot,
} = require('../controller/gameSlotController');

// router
router.post('/book/new/slot', bookGameSlot);
router.put('/game/slot', editNewGameSlot);
router.get('/game/slots/:userId', getAllBookedSlot);

// export router
module.exports = router;
