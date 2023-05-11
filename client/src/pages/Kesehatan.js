import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import Kesehatan from "../assets/image/kesehatan2.jpg";
// import SantunanKematian from "../assets/image/santunan_kematian.png";
// import SantunanNilaiHidup from "../assets/image/santunan_nilaihidup.png";
// import ManfaatKesehatan from "../assets/image/Ragam_manfaat.png";
import Aos from "aos";
import "aos/dist/aos.css";

export default () => {
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  const pageTransition = {
    init: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <Navigation />
      <Container>
        <div style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
            Kesehatan
          </p>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Image src={Kesehatan} rounded style={{ height: 400, width: 600 }} />
        </div>
        <div style={{ marginTop: 20 }}>
          <p style={{ textAlign: "justify" }}>
            Yayasan mengelola dana program kesehatan yang disalurkan kepada
            seluruh pensiunan Perum Perhutani dalam bentuk program kesehatan
            sesuai dengan ketentuan yang berlaku.
            <br style={{ marginBottom: 10 }} />
            Masa pertanggungan manfaat program kesehatan ditetapkan sesuai
            dengan masa iurannya, paling lama 15 tahun sejak karyawan pensiun.
            <br style={{ marginBottom: 10 }} />
            Yang mendapat pertanggungan adalah pensiunan Direksi den pensiunan
            karyawan beserta karyawan beserta pasangannya (Suami / Istri) serta
            satu anak usia maksimum 25 tahun dan belum menikah.
            <br style={{ marginBottom: 10 }} />
            Manfaat Program kesehatan yang diberikan :
            <ol>
              <li>
                Penggantian biaya rawat inap dan atau pembedahan di RS dalam
                negeri.
              </li>
              <li>Operasi katarak atau operasi lain tanpa rawat inap.</li>
              <li>Perawatan di UGD / IGD</li>
            </ol>
            <br style={{ marginBottom: 10 }} />
            Perincian jenis perawatan kesehatan ditanggung seperti pada tabel.
            <br style={{ marginBottom: 10 }} />
            Apabila dalam masa pertanggungan peserta tidak pernah mengajukan
            klaim biaya rawat inap, di akhir masa pertanggungan akan diberikan
            manfaat "Nilai Hidup" yang besarnya :
            <ol>
              <li>Gol A, I dan II : Rp 5.000.000</li>
              <li>Gol III dan IV : Rp 8.000.000</li>
              <li>
                Berlaku bagi peserta yang habis masa pertanggungannya sejak 1
                Januari 2021
              </li>
            </ol>
            <br style={{ marginBottom: 10 }} />
            Apabila dalam masa pertanggungan peserta meninggal dunia, diberikan
            "Santunan Kematian" yang besarnya :
            <ol>
              <li>Pegawai aktif : Rp 2.500.000</li>
              <li>Pensiunan : Rp 5.000.000</li>
              <li>pasangan : Rp 2.500.000</li>
            </ol>
            <br style={{ marginBottom: 10 }} />
            Bantuan pembelian kacamata atau penggantian lensa diberikan setelah
            masa perlindungan lebih dari 10 tahun, sebesar Rp 200.000 dan hanya
            diberikan sekali.
          </p>
        </div>
        {/* <div data-aos="zoom-in" style={{ marginTop: 20 }}>
          <Image
            src={ManfaatKesehatan}
            rounded
            style={{ height: 700, width: 800 }}
          />
        </div>
        <div data-aos="zoom-in" style={{ marginTop: 20 }}>
          <Image src={SantunanNilaiHidup} rounded style={{ height: 100 }} />
        </div>
        <div data-aos="zoom-in" style={{ marginTop: 20 }}>
          <Image src={SantunanKematian} rounded style={{ height: 245 }} />
        </div> */}

        <div data-aos="flip-left" style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "700" }}>
            Mekanisme Pengajuan Penggantian Biaya Kesehatan
          </p>
          <ul style={{ marginLeft: -10, marginTop: -10 }}>
            <li>
              Penggantian biaya rawat inap diberikan dengan sistem Restitusi,
              besarnya nilai penggantian sesuai dengan ketentuan dalam tabel.
            </li>
            <li>
              Pengajuan penggantianbiaya rawat inap dapat dilakukan melalui
              Satuan Kerja Perum Perhutani terdekat, atau langsung diajukan ke
              Yayasan (YKP3JS), baik dengan mengirimkan berkas ke yayasan atau
              melalui fasilitas on-line di website yayasan
            </li>
            <li>
              Kelengkapan dokumen dalam pengajuan penggantian biaya rawat inap.
              <ol>
                <li>
                  Surat permohonan bantuan biaya rawat inap (form tersedia).
                </li>
                <li>Surat keterangan sakit dari dokter yang merawat.</li>
                <li>Kuitansi asli dari rumah sakit pensiunan dirawat.</li>
                <li>Fotocopy KTP</li>
                <li>Fotocopy Kartu Peserta Yayasan.</li>
                <li>
                  Fotocopy SK Pensiun (bila tidak mempunyai kartu peserta)
                </li>
                <li>
                  Fotocopy Surat permohonan pensiun / SKPP (bila tidak ada data
                  keluarga)
                </li>
                <li>Nomor rekening Bank</li>
              </ol>
            </li>
            <li>
              Batas waktu penundaan pengajuan adalah 3 (tiga) bulan terhitung
              sejak tanggal surat permohonan.
            </li>
            <li>
              Apabila peserta memiliki asuransi lain, yayasan memberi
              penggantian sebesar selisih biayanya dari yang telah diverifikasi
              oleh asuransi.
            </li>
            <li>
              Penggantian biaya kesehatan oleh yayasan selambat - lambatnya 14
              hari kerja setelah berkas diterima dengan lengkap dan benar.
            </li>

            {/* <li>
              Kwitansi dan syarat – syarat lengkap dikirim ke kantor YKP3 Jati
              Sejahtera Pusat melalui satuan kantor Perum Perhutani terdekat,
              atau bisa melalui kantor pusat YKP3JS baik dengan cara mengirimkan
              berkas ke kantor pusat atau bisa juga melalui online di website
              kami www.jatisejahtera.or.id
            </li>
            <li>
              Satuan Kantor Perum Perhutani terdekat meneruskan / mengirim ke
              kantor YKP3 Jati Sejahtera Pusat.
            </li>
            <li>
              Pembayaran melalui satuan kantor perum Perhutani terdekat setelah
              menerima kiriman dari kantor YKP3 Jati Sejahtera Pusat.
            </li>
            <li>
              Metode penggantian biaya rawat inap dan pembedahan adalah dengan
              reimbursement.
            </li>
            <li>
              Pensiunan yang selama 15 tahun tidak pernah mengajukan Klaim Rawat
              Inap dapat mengajukan surat permohonan Nilai Hidup kepada kantor
              YKP3 Jati Sejahtera Pusat melalui Satuan Kerja Perum Perhutani
              terdekat.
            </li>
            <li>
              Ahli Waris atau keluarga Pensiunan mengajukan surat permohonan
              Santunan Kematian atau santunan cacat kepada kantor YKP3 Jati
              Sejahtera Pusat melalui satuan kerja Perum Perhutani terdekat.
            </li> */}
          </ul>
        </div>
        {/* <div data-aos="flip-left" style={{ marginTop: 20 }}>
          <p>MEKANISME PEMBAYARAN</p>
          <ul style={{ marginLeft: -10, marginTop: -10 }}>
            <li>
              Dengan sistem Restitusi Paling Lama 14 hari sejak pengajuan.
            </li>
            <li>3 bulan masa tunda kwitansi sejak permohonan.</li>
          </ul>
        </div> */}
        {localStorage.token && (
          <div
            data-aos="flip-left"
            style={{ textAlign: "center", marginTop: 50 }}
          >
            <p>SK Kesehatan No30KPTSYKP3JS-2020</p>
            <iframe
              src="https://dev.jatisejahtera.or.id/uploads/SK Kesehatan No30KPTSYKP3JS2020_.pdf"
              title="SK Kesehatan No30KPTSYKP3JS2020"
              style={{ width: 700, height: 700 }}
            ></iframe>
          </div>
        )}
      </Container>
      <Footer />
    </motion.div>
  );
};
