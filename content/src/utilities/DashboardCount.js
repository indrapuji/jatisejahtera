function DashboardCount(newData) {
  let result = [];
  let countPendidikan = 0;
  let countPerumahan = 0;
  let countKesehatan = 0;
  let countBerita = 0;
  let countGaleri = 0;
  for (let i = 0; i < newData.length; i++) {
    if (newData[i].category === 'pendidikan') {
      countPendidikan++;
    }
    if (newData[i].category === 'perumahan') {
      countPerumahan++;
    }
    if (newData[i].category === 'kesehatan') {
      countKesehatan++;
    }
    if (newData[i].category === 'berita') {
      countBerita++;
    }
    if (newData[i].category === 'galeri') {
      countGaleri++;
    }
  }
  result = {
    dataDropdown: {
      pendidikan: {nama: 'Pendidikan', count: countPendidikan},
      perumahan: {nama: 'Perumahan', count: countPerumahan},
      kesehatan: {nama: 'Kesehatan', count: countKesehatan},
    },
    dataCard: {
      berita: {nama: 'Berita', count: countBerita},
      galeri: {nama: 'Galeri', count: countGaleri},
    },
  };
  return result;
}

function ClaimCount(dataUser) {
  let result = [];
  result = {
    dataUser: {
      userRegister: {nama: 'User Register', count: dataUser.total_user_register},
      userUpdated: {nama: 'User Updated', count: dataUser.total_user_update.updated},
      userNotUpdate: {nama: 'User Not Update', count: dataUser.total_user_update.not_update},
    },
    dataRegional: {
      kantorPusat: {nama: 'Kantor Pusat', count: dataUser.total_user_regional.kantor_pusat},
      jawaBarat: {nama: 'Jawa Barat', count: dataUser.total_user_regional.jawa_barat},
      jawaTengah: {nama: 'Jawa Tengah', count: dataUser.total_user_regional.jawa_tengah},
      jawaTimur: {nama: 'Jawa Timur', count: dataUser.total_user_regional.jawa_timur},
    },
    dataClaim: {
      totalPengajuan: {nama: 'Total Pengajuan', count: dataUser.total_user_claim},
      claimCreated: {nama: 'Sedang Mengajukan', count: dataUser.total_claim_status.created},
      claimApprove: {nama: 'Claim Di Setujui', count: dataUser.total_claim_status.approve},
      claimReject: {nama: 'Claim Di Tolak', count: dataUser.total_claim_status.reject},
    },
  };
  return result;
}

export {DashboardCount, ClaimCount};
