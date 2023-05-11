import React from 'react';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';
import Image from 'next/image';
import Layout from '@components/Layout';
import programKesehatan from '@assets/images/program_kesehatan.jpg';

export default () => {
  const manfaatData = [
    {
      tingkat: 'Tingkat SD',
      nominal: '50.000',
    },
    {
      tingkat: 'Tingkat SLTP',
      nominal: '60.000',
    },
    {
      tingkat: 'Tingkat SLTA',
      nominal: '75.000',
    },
    {
      tingkat: 'Perguruan Tinggi',
      nominal: '100.000',
    },
  ];
  return (
    <Layout pageTitle={'KESEHATAN || JATISEJAHTERA'}>
      <Navigation />
      <div className='flex flex-col justify-between'>
        <section className='bg-white dark:bg-gray-900'>
          <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
            <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              Program Kesehatan
            </h2>

            <div className='max-w-4xl mt-6 text-gray-500 dark:text-gray-300'>
              <Image src={programKesehatan} width={700} height={700} alt='pop up' />
            </div>
            <div className='mt-12'>
              <div className='container px-2'>
                <p className='text-justify'>
                  Yayasan mengelola dana program kesehatan yang disalurkan kepada seluruh pensiunan Perum Perhutani
                  dalam bentuk program kesehatan sesuai dengan ketentuan yang berlaku.
                </p>
                <p className='text-justify'>
                  Masa pertanggungan manfaat program kesehatan ditetapkan sesuai dengan masa iurannya, paling lama 15
                  tahun sejak karyawan pensiun. Yang mendapat pertanggungan adalah pensiunan Direksi den pensiunan
                  karyawan beserta karyawan beserta pasangannya (Suami / Istri) serta satu anak usia maksimum 25 tahun
                  dan belum menikah.
                </p>
              </div>
            </div>
            <div className='mt-12'>
              <p className='font-bold px-2'>Manfaat Program kesehatan yang diberikan</p>
              <ol className='container list-decimal text-left px-2'>
                <li>Penggantian biaya rawat inap dan atau pembedahan di RS dalam negeri.</li>
                <li>Operasi katarak atau operasi lain tanpa rawat inap.</li>
                <li>Perawatan di UGD / IGD</li>
              </ol>
            </div>
            <div className='mt-12 container mx-12 text-left'>
              <p className='text-justify'>
                Apabila dalam masa pertanggungan peserta tidak pernah mengajukan klaim biaya rawat inap, di akhir masa
                pertanggungan akan diberikan manfaat "Nilai Hidup" yang besarnya :
              </p>
              <ol className='container list-decimal text-left px-2'>
                <li>Gol A, I dan II : Rp 5.000.000</li>
                <li>Gol III dan IV : Rp 8.000.000</li>
                <li>Berlaku bagi peserta yang habis masa pertanggungannya sejak 1 Januari 2021</li>
              </ol>
            </div>
            <div className='mt-12 container mx-12 text-left'>
              <p className='text-justify'>
                Apabila dalam masa pertanggungan peserta meninggal dunia, diberikan "Santunan Kematian" yang besarnya :
              </p>
              <ol className='container list-decimal text-left px-2'>
                <li>Pegawai aktif : Rp 2.500.000</li>
                <li>Pensiunan : Rp 5.000.000</li>
                <li>pasangan : Rp 2.500.000</li>
              </ol>
            </div>
            <div className='mt-12 container mx-12 text-left'>
              <p className='text-justify'>
                Bantuan pembelian kacamata atau penggantian lensa diberikan setelah masa perlindungan lebih dari 10
                tahun, sebesar Rp 200.000 dan hanya diberikan sekali.
              </p>
            </div>
            <div className='mt-12 container mx-12 text-left'>
              <p className='text-justify font-bold'>Mekanisme Pengajuan Penggantian Biaya Kesehatan</p>
              <ol className='container list-disc text-left px-2'>
                <li>
                  Penggantian biaya rawat inap diberikan dengan sistem Restitusi, besarnya nilai penggantian sesuai
                  dengan ketentuan dalam tabel.
                </li>
                <li>
                  Pengajuan penggantianbiaya rawat inap dapat dilakukan melalui Satuan Kerja Perum Perhutani terdekat,
                  atau langsung diajukan ke Yayasan (YKP3JS), baik dengan mengirimkan berkas ke yayasan atau melalui
                  fasilitas on-line di website yayasan
                </li>
                <li>
                  Kelengkapan dokumen dalam pengajuan penggantian biaya rawat inap.
                  <ol className='list-decimal px-4'>
                    <li>Surat permohonan bantuan biaya rawat inap (form tersedia).</li>
                    <li>Surat keterangan sakit dari dokter yang merawat.</li>
                    <li>Kuitansi asli dari rumah sakit pensiunan dirawat.</li>
                    <li>Fotocopy KTP</li>
                    <li>Fotocopy Kartu Peserta Yayasan.</li>
                    <li>Fotocopy SK Pensiun (bila tidak mempunyai kartu peserta)</li>
                    <li>Fotocopy Surat permohonan pensiun / SKPP (bila tidak ada data keluarga)</li>
                    <li>Nomor rekening Bank</li>
                  </ol>
                </li>
                <li>Batas waktu penundaan pengajuan adalah 3 (tiga) bulan terhitung sejak tanggal surat permohonan.</li>
                <li>
                  Apabila peserta memiliki asuransi lain, yayasan memberi penggantian sebesar selisih biayanya dari yang
                  telah diverifikasi oleh asuransi.
                </li>
                <li>
                  Penggantian biaya kesehatan oleh yayasan selambat - lambatnya 14 hari kerja setelah berkas diterima
                  dengan lengkap dan benar.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Layout>
  );
};
