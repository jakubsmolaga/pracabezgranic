let getTimeStamp = () => {
  let date = new Date();
  return date.now();
};

module.exports = {getTimeStamp};
