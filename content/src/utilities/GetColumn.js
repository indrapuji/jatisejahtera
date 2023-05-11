const getColumn = (newData) => {
  let column = [];
  let newKey = '';

  for (let key in newData[0]) {
    if (
      key !== 'id' &&
      key !== 'updatedAt' &&
      key !== 'createdAt' &&
      key !== 'userId' &&
      key !== 'dataId' &&
      key !== 'foto_selfie' &&
      key !== 'username' &&
      key !== 'password' &&
      key !== 'role' &&
      key !== 'email' &&
      key !== 'lampiran' &&
      key !== 'bukti_tf' &&
      key !== 'foto_selfie' &&
      key !== 'fotokopi_kk' &&
      key !== 'fotokopi_kp' &&
      key !== 'fotokopi_ktp' &&
      key !== 'fotokopi_sk_pengangkatan' &&
      key !== 'fotokopi_sk_pensiun' &&
      key !== 'fotokopi_sk_pensiun' &&
      key !== 'keterangan_kepolisian' &&
      key !== 'keterangan_meninggal_dunia_lurah' &&
      key !== 'keterangan_meninggal_dunia_rumah_sakit' &&
      key !== 'keterangan_meninggal_dunia_rumah_sakit' &&
      key !== 'kuitansi_asli_rs' &&
      key !== 'permohonan_ahli_waris' &&
      key !== 'permohonan_pensiunan' &&
      key !== 'pernyataan_dari_pensiunan' &&
      key !== 'surat_keterangan_rs' &&
      key !== 'surat_permohonan_bantuan_biaya' &&
      key !== 'tgl_lahir' &&
      key !== 'no_ktp' &&
      key !== 'no_bpjs' &&
      key !== 'nama_bank' &&
      key !== 'no_rekening' &&
      key !== 'satuan_kerja' &&
      key !== 'golongan_pangkat' &&
      key !== 'golongan_pangkat' &&
      key !== 'no_telp' &&
      key !== 'alamat' &&
      key !== 'kelurahan' &&
      key !== 'kecamatan' &&
      key !== 'kota' &&
      key !== 'kodepos' &&
      key !== 'provinsi' &&
      key !== 'nama_pasangan' &&
      key !== 'tgl_lahir_pasangan' &&
      key !== 'no_telp_pasangan' &&
      key !== 'no_ktp_pasangan' &&
      key !== 'no_bpjs_pasangan' &&
      key !== 'nama_bank_pasangan' &&
      key !== 'no_rekening_pasangan' &&
      key !== 'nama_anak' &&
      key !== 'tgl_lahir_anak' &&
      key !== 'no_tlp_anak' &&
      key !== 'no_ktp_anak' &&
      key !== 'no_bpjs_anak' &&
      key !== 'nama_bank_anak' &&
      key !== 'no_rekening_anak'
    ) {
      if (key === 'name') {
        newKey = 'NAMA PESERTA';
        column.push({header: newKey, field: key});
      } else if (key === 'kategori') {
        newKey = 'JENIS KLAIM';
        column.push({header: newKey, field: key});
      } else if (key === 'cabang') {
        newKey = 'KPH';
        column.push({header: newKey, field: key});
      } else if (key === 'created_date') {
        newKey = 'TANGGAL PENGAJUAN KLAIM';
        column.push({header: newKey, field: key});
      } else if (key === 'updated_date') {
        newKey = 'TANGGAL PENCAIRAN KLAIM';
        column.push({header: newKey, field: key});
      } else if (key === 'status') {
        newKey = 'STATUS PENGAJUAN';
        column.push({header: newKey, field: key});
      } else if (key === 'nominal') {
        newKey = 'JUMLAH PENCAIRAN';
        column.push({header: newKey, field: key});
      } else if (key === 'pesan') {
        newKey = 'KETERANGAN';
        column.push({header: newKey, field: key});
      } else {
        column.push({header: key.toUpperCase().replace(/_/g, ' '), field: key});
      }
    }
  }

  return column;
};

export default getColumn;
