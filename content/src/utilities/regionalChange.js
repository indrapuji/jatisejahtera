const regionalChange = (category) => {
  switch (category) {
    case 'kantor-pusat':
      return 'Kantor Pusat';
    case 'jawa-barat':
      return 'Jawa Barat';
    case 'jawa-tengah':
      return 'Jawa Tengah';
    default:
      return 'Jawa Timur';
  }
};

export default regionalChange;
