import formatDate from './FormatDate';

const claimKategori = (category) => {
  switch (category) {
    case 'claim-kematian':
      return 'Santunan Kematian';
    case 'claim-manfaat':
      return 'Manfaat Nilai Hidup';
    case 'claim-kesehatan':
      return 'Bantuan Rawat Inap';
    default:
      return 'Bantuan Kacamata';
  }
};

const changeFormat = (data) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    result.push({
      id: data[i].id,
      userId: data[i].userId,
      dataId: data[i].User.Datum.id,
      name: data[i].User.name,
      nip: data[i].User.nip,
      kategori: claimKategori(data[i].kategori),
      regional: data[i].User.regional,
      cabang: data[i].User.Datum.cabang,
      created_date: data[i].created_date ? formatDate(data[i].created_date) : '-',
      updated_date: data[i].updated_date ? formatDate(data[i].updated_date) : '-',
      sla: data[i].sla,
      status: data[i].status,
      pemohon: data[i].pemohon,
      nominal: data[i].nominal,
      pesan: data[i].pesan,
      permohonan_ahli_waris: data[i].permohonan_ahli_waris,
      keterangan_meninggal_dunia_lurah: data[i].keterangan_meninggal_dunia_lurah,
      keterangan_meninggal_dunia_rumah_sakit: data[i].keterangan_meninggal_dunia_rumah_sakit,
      keterangan_kepolisian: data[i].keterangan_kepolisian,
      fotokopi_kp: data[i].fotokopi_kp,
      fotokopi_kk: data[i].fotokopi_kk,
      fotokopi_sk_pengangkatan: data[i].fotokopi_sk_pengangkatan,
      fotokopi_sk_pensiun: data[i].fotokopi_sk_pensiun,
      foto_selfie: data[i].foto_selfie,
      bukti_tf: data[i].bukti_tf,
      permohonan_pensiunan: data[i].permohonan_pensiunan,
      pernyataan_dari_pensiunan: data[i].pernyataan_dari_pensiunan,
      surat_permohonan_bantuan_biaya: data[i].surat_permohonan_bantuan_biaya,
      kuitansi_asli_rs: data[i].kuitansi_asli_rs,
      surat_keterangan_rs: data[i].surat_keterangan_rs,
      fotokopi_ktp: data[i].fotokopi_ktp,
      lampiran: data[i].lampiran,
      username: data[i].User.username,
      password: data[i].User.password,
      email: data[i].User.email,
      role: data[i].User.role,
      tgl_lahir: data[i].User.Datum.tgl_lahir,
      no_ktp: data[i].User.Datum.no_ktp,
      no_bpjs: data[i].User.Datum.no_bpjs,
      nama_bank: data[i].User.Datum.nama_bank,
      no_rekening: data[i].User.Datum.no_rekening,
      satuan_kerja: data[i].User.Datum.satuan_kerja,
      golongan_pangkat: data[i].User.Datum.golongan_pangkat,
      no_telp: data[i].User.Datum.no_telp,
      alamat: data[i].User.Datum.alamat,
      kelurahan: data[i].User.Datum.kelurahan,
      kecamatan: data[i].User.Datum.kecamatan,
      kota: data[i].User.Datum.kota,
      kodepos: data[i].User.Datum.kodepos,
      provinsi: data[i].User.Datum.provinsi,
      nama_pasangan: data[i].User.Datum.nama_pasangan,
      tgl_lahir_pasangan: data[i].User.Datum.tgl_lahir_pasangan,
      no_telp_pasangan: data[i].User.Datum.no_telp_pasangan,
      no_ktp_pasangan: data[i].User.Datum.no_ktp_pasangan,
      no_bpjs_pasangan: data[i].User.Datum.no_bpjs_pasangan,
      nama_bank_pasangan: data[i].User.Datum.nama_bank_pasangan,
      no_rekening_pasangan: data[i].User.Datum.no_rekening_pasangan,
      nama_anak: data[i].User.Datum.nama_anak,
      tgl_lahir_anak: data[i].User.Datum.tgl_lahir_anak,
      no_tlp_anak: data[i].User.Datum.no_tlp_anak,
      no_ktp_anak: data[i].User.Datum.no_ktp_anak,
      no_bpjs_anak: data[i].User.Datum.no_bpjs_anak,
      nama_bank_anak: data[i].User.Datum.nama_bank_anak,
      no_rekening_anak: data[i].User.Datum.no_rekening_anak,
    });
  }

  return result;
};

export default changeFormat;
