// import model
const gameSlots = require('../models/gameSlotModel');

// game edit slot time limit
const slotEditTimeLimit = process.env.GAME_SLOT_EDIT_TIME_LIMIT;

// constant error messages
const {
  mongodberror,
  newSlotBooked,
  slotsCantEdited,
  invalidUser,
  gameSlotHasBooked,
  bookingDateTimeUpdated,
  SMWWhileUpdatingSlot,
  newSlotAddedToExistingGameslot,
  addingNewSlotToExistingFailed,
  cantBookSlotInPast,
  invalidSlot,
  gameSlotsFetched,
  userIdNotFound,
  descriptionMissing,
  durationMissing,
  dateTimeMissing,
  gameNameMissing,
} = require('../contants/constantErrorMessages');

// date time to epoch
const {
  DATETIMETOEPOC,
  addExpireDurationToMoment,
  differentiate,
} = require('../helperMethod/momentMethod');

// Book game slot
exports.bookGameSlot = (req, res) => {
  const { userId, duration, bookingDateTime, gameName, description } = req.body;

  if (!userId) {
    return res.status(400).json({
      message: invalidUser,
    });
  }

  if (!gameName) {
    return res.status(400).json({
      message: gameNameMissing,
    });
  }

  if (!bookingDateTime) {
    return res.status(400).json({
      message: dateTimeMissing,
    });
  }

  if (!duration) {
    return res.status(400).json({
      message: durationMissing,
    });
  }

  if (!description) {
    return res.status(400).json({
      message: descriptionMissing,
    });
  }

  const currentDateTime = DATETIMETOEPOC(new Date());
  const currentBookingTime = currentDateTime.valueOf();
  const slotBookingTime = DATETIMETOEPOC(bookingDateTime);
  const expDuration = duration; // must be number
  const timeUnit = 'm';
  const expireTime = addExpireDurationToMoment(
    expDuration,
    slotBookingTime,
    timeUnit
  );
  const slotStartTime = slotBookingTime.valueOf();
  const slotEndingTime = expireTime.valueOf();
  if (slotStartTime - currentBookingTime < 0) {
    return res.status(400).json({
      message: cantBookSlotInPast,
    });
  }
  if (slotStartTime - currentBookingTime >= 0) {
    gameSlots
      .findOne({
        $or: [
          {
            $and: [
              { 'bookingDateTime.slotStartTime': { $lte: slotStartTime } },
              { 'bookingDateTime.slotEndingTime': { $gt: slotStartTime } },
            ],
          },
          {
            $and: [
              { 'bookingDateTime.slotStartTime': { $lt: slotEndingTime } },
              { 'bookingDateTime.slotEndingTime': { $gte: slotEndingTime } },
            ],
          },
        ],
      })
      .exec((err, slotExist) => {
        if (err) {
          return res.status(500).json({
            message: mongodberror,
            error: err,
          });
        }
        if (slotExist) {
          return res.status(400).json({
            message: gameSlotHasBooked,
            slot: slotExist,
          });
        }
        gameSlots.findOne({ userId: userId }).exec((err, userExist) => {
          if (err) {
            return res.status(500).json({
              message: mongodberror,
              error: err,
            });
          }
          if (userExist) {
            if (userExist.userId == userId) {
              let condition = { userId: userId };
              let update = {
                $push: {
                  bookingDateTime: {
                    slotStartTime,
                    slotEndingTime,
                    gameName,
                    description,
                    duration,
                  },
                },
              };
              gameSlots
                .findOneAndUpdate(condition, update, {
                  new: true,
                })
                .exec((err, newSlotAdded) => {
                  if (err) {
                    return res.status(500).json({
                      message: mongodberror,
                      error: err,
                    });
                  }
                  if (newSlotAdded) {
                    const { bookingDateTime } = newSlotAdded;
                    const newSlot =
                      bookingDateTime.length > 1
                        ? bookingDateTime[bookingDateTime.length - 1]
                        : undefined;
                    return res.status(200).json({
                      status: 1,
                      message: newSlotAddedToExistingGameslot,
                      slot: newSlot,
                    });
                  } else {
                    return res.status(400).json({
                      message: addingNewSlotToExistingFailed,
                    });
                  }
                });
            }
          } else {
            const addGameSlot = new gameSlots({
              userId,
              duration,
              bookingDateTime: [
                {
                  slotStartTime,
                  slotEndingTime,
                  gameName,
                  description,
                  duration,
                },
              ],
            });
            addGameSlot.save((err, gameSlotAdded) => {
              if (err) {
                return res.status(500).json({
                  message: mongodberror,
                  error: err,
                });
              }
              if (gameSlotAdded) {
                const { bookingDateTime } = gameSlotAdded;
                return res.status(200).json({
                  message: newSlotBooked,
                  slot: bookingDateTime[0],
                });
              }
            });
          }
        });
      });
  }
};

// Edit game slot
exports.editNewGameSlot = (req, res) => {
  const {
    userId,
    duration,
    bookingDateTime,
    existingSlotStartTime,
    existingSlotEndTime,
  } = req.body;

  gameSlots.findOne({ userId: userId }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        status: 0,
        message: mongodberror,
        error: err,
      });
    }
    if (user) {
      const existingStartTime = DATETIMETOEPOC(existingSlotStartTime);
      const existingEndTime = DATETIMETOEPOC(existingSlotEndTime);
      const currentDateTime = DATETIMETOEPOC(new Date());
      const newBookingDateTime = DATETIMETOEPOC(bookingDateTime);
      const slotStartTime = newBookingDateTime.valueOf();
      const timeUnit = 'm';
      const newSlotEndingTime = addExpireDurationToMoment(
        duration,
        slotStartTime,
        timeUnit
      );
      const existingSlotStartTimeValue = existingStartTime.valueOf();
      const existingSlotEndTimeValue = existingEndTime.valueOf();
      const slotEndingTime = newSlotEndingTime.valueOf();
      const currentBookingTime = currentDateTime.valueOf();
      gameSlots
        .find({
          $and: [
            { userId: { $eq: userId } },
            {
              'bookingDateTime.slotStartTime': {
                $eq: existingSlotStartTimeValue,
              },
            },
            {
              'bookingDateTime.slotEndingTime': {
                $eq: existingSlotEndTimeValue,
              },
            },
          ],
        })
        .exec((err, existingSlotVerified) => {
          if (err) {
            return res.status(500).json({
              status: 0,
              message: mongodberror,
              error: err,
            });
          }
          if (existingSlotVerified.length > 0) {
            if (slotStartTime - currentBookingTime < 0) {
              return res.status(400).json({
                status: 0,
                message: cantBookSlotInPast,
              });
            } else if (slotStartTime - currentBookingTime >= 0) {
              gameSlots
                .findOne({
                  $or: [
                    {
                      $and: [
                        {
                          'bookingDateTime.slotStartTime': {
                            $lte: slotStartTime,
                          },
                        },
                        {
                          'bookingDateTime.slotEndingTime': {
                            $gt: slotStartTime,
                          },
                        },
                      ],
                    },
                    {
                      $and: [
                        {
                          'bookingDateTime.slotStartTime': {
                            $lt: slotEndingTime,
                          },
                        },
                        {
                          'bookingDateTime.slotEndingTime': {
                            $gte: slotEndingTime,
                          },
                        },
                      ],
                    },
                  ],
                })
                .exec((err, slotHasBooked) => {
                  if (err) {
                    return res.status(500).json({
                      status: 0,
                      message: mongodberror,
                      error: err,
                    });
                  }
                  if (slotHasBooked) {
                    return res.status(400).json({
                      status: 0,
                      message: gameSlotHasBooked,
                    });
                  } else {
                    // const slotBookingTime = DATETIMETOEPOC(new Date());
                    const existingBookingTime = existingSlotStartTimeValue;
                    const fixedDuration = 10;
                    const timeUnit = 'm';
                    const twoMinExpiryEpoch = addExpireDurationToMoment(
                      fixedDuration,
                      existingBookingTime,
                      timeUnit
                    );
                    const twoMinExpValue = twoMinExpiryEpoch.valueOf();
                    // const currentBookingTime = slotBookingTime.valueOf();
                    const diff = differentiate(
                      currentBookingTime,
                      twoMinExpValue
                    );
                    const diffInMin = diff / 1000 / 60;
                    const diffInt = parseInt(diffInMin, 10);
                    if (diffInt >= slotEditTimeLimit) {
                      return res.status(400).json({
                        status: 0,
                        message: slotsCantEdited,
                        timeDiff: diffInt,
                        timeLimit: slotEditTimeLimit,
                      });
                    }
                    if (diffInt < slotEditTimeLimit) {
                      let condition = {
                        $and: [
                          { userId: { $eq: userId } },
                          {
                            'bookingDateTime.slotStartTime': {
                              $eq: existingSlotStartTimeValue,
                            },
                          },
                          {
                            'bookingDateTime.slotEndingTime': {
                              $eq: existingSlotEndTimeValue,
                            },
                          },
                        ],
                      };
                      let update = {
                        $set: {
                          'bookingDateTime.$': {
                            slotStartTime: slotStartTime,
                            slotEndingTime: slotEndingTime,
                          },
                        },
                      };
                      let modiffy = { useFindAndModify: false };
                      gameSlots
                        .findOneAndUpdate(condition, update, modiffy)
                        .exec((errors, slotUpdated) => {
                          if (errors) {
                            return res.status(500).json({
                              status: 0,
                              message: mongodberror,
                              errors,
                            });
                          }
                          if (slotUpdated) {
                            return res.status(201).json({
                              status: 1,
                              message: bookingDateTimeUpdated,
                              slot: slotUpdated,
                            });
                          } else {
                            return res.status(400).json({
                              status: 0,
                              messsage: SMWWhileUpdatingSlot,
                              data: slotUpdated,
                            });
                          }
                        });
                    }
                  }
                });
            }
          } else {
            return res.status(400).json({
              status: 0,
              messsage: invalidSlot,
            });
          }
        });
    } else {
      return res.status(400).json({
        status: 0,
        message: invalidUser,
      });
    }
  });
};

// get all book slot by user id
exports.getAllBookedSlot = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      error: userIdNotFound,
    });
  }
  gameSlots.findOne({ userId: userId }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        message: mongodberror,
        error: err,
      });
    }
    if (user) {
      return res.status(200).json({
        messsage: gameSlotsFetched,
        records: user.bookingDateTime.length,
        slots: user.bookingDateTime,
      });
    } else {
      return res.status(400).json({
        error: invalidUser,
      });
    }
  });
};
