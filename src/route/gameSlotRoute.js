// import route
const router = require('express').Router();

// game controller
const {
  bookGameSlot,
  editNewGameSlot,
} = require('../controller/gameSlotController');

// router
router.put('/user/new/game/slot', editNewGameSlot);
router.post('/game/new/bookGameSlot', bookGameSlot);

// export router
module.exports = router;
