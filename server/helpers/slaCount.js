const slaCount = async (dateFrom) => {
  const start = new Date(dateFrom); //clone
  const end = new Date(); //clone
  let dayCount = 0;

  while (end > start) {
    dayCount++;
    start.setDate(start.getDate() + 1);
  }

  return dayCount;
};

module.exports = slaCount;
