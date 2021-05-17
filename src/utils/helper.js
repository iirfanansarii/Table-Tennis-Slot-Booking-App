const moment = require('moment');
exports.days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
exports.formatDate = (unixTimestamp) => {
  var date = moment.unix(unixTimestamp).format('dddd, MMMM Do YYYY, h:mm:ss A');
  var date1 = new Date(unixTimestamp * 1000);
  var day = this.days[date1.getDay()];
  var fullDate = date.toLocaleString();
  return { day, fullDate };
};
