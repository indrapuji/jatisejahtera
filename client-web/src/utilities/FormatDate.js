function formatDate(tanggal) {
  if (tanggal) {
    let year = tanggal.substring(0, 4);
    let month = Number(tanggal.substring(5, 7));
    let date = Number(tanggal.substring(8, 10));

    if (month === 1) {
      month = 'Jan';
    } else if (month === 2) {
      month = 'Feb';
    } else if (month === 3) {
      month = 'Mar';
    } else if (month === 4) {
      month = 'Apr';
    } else if (month === 5) {
      month = 'Mei';
    } else if (month === 6) {
      month = 'Jun';
    } else if (month === 7) {
      month = 'Jul';
    } else if (month === 8) {
      month = 'Aug';
    } else if (month === 9) {
      month = 'Sep';
    } else if (month === 10) {
      month = 'Okt';
    } else if (month === 11) {
      month = 'Nov';
    } else if (month === 12) {
      month = 'Des';
    }
    return `${date}-${month}-${year}`;
  } else {
    return '';
  }
}

export default formatDate;
