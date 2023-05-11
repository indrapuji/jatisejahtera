function GaleriCount(newData) {
  let result = [];
  let temp = [];
  for (let i = 0; i < newData.length; i++) {
    temp.push(newData[i]);
    if ((i + 1) % 4 === 0) {
      result.push(temp);
      temp = [];
    } else if (i === newData.length - 1) {
      result.push(temp);
    }
  }
  return result;
}

export default GaleriCount;
