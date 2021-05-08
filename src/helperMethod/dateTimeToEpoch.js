// datetime to epoch
const  dateTimeToEpoch = (date) => {
  return Date.parse(date);
}

// convert date time to mins
const timeStampToMinute = (timestamp) => {
   var hours = Math.floor(timestamp / 60 / 60),
    mins = Math.floor((timestamp - hours * 60 * 60) / 60),
    output = (hours % 24) + ':' + mins;
    return hours;
};

// exports 
module.exports = { dateTimeToEpoch, timeStampToMinute };
