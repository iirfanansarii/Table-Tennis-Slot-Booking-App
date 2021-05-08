// import moment
const moment = require('moment');

// convert datetime to epoch
exports.DATETIMETOEPOC = (epocDate) => {
  if (!epocDate) return;
  return moment(epocDate);
};

// calculate epoch difference
exports.differentiate = (date1, date2) => date1 - date2;

// add expiry time
exports.addExpireDurationToMoment = (duration, momentDate, timeUnit) =>
  this.DATETIMETOEPOC(moment(momentDate).add(duration, timeUnit));
