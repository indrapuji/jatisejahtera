import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import Pendidikan from "../assets/image/pendidikanasuransi.jpg";

export default () => {
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
      <div style={{ position: "relative" }}>
        <div
          data-aos="zoom-in"
          style={{ position: "absolute", left: "-30", zIndex: -1, top: 50 }}
        >
          <Image
            src={require("../assets/landingpage/leaf_bottom.png")}
            style={{ width: 150 }}
          />
        </div>
        <div
          data-aos="fade-up"
          style={{ position: "absolute", left: 1200, zIndex: -1, top: 200 }}
        >
          <Image
            src={require("../assets/landingpage/leaf_top_large.png")}
            style={{ width: 200 }}
          />
        </div>
        <Container>
          <div style={{ marginTop: 20 }}>
            <p
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}
            >
              Pendidikan
            </p>
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
          >
            <Image
              src={Pendidikan}
              rounded
              style={{ height: 400, width: 600 }}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <p style={{ fontWeight: "bold", marginBottom: 0 }}>
              Beberapa kegiatan dibidang pendidikan yang diselenggarakan oleh
              Yayasan di antaranya:
            </p>
            <ol style={{ marginLeft: -20 }}>
              <li>
                Memberikan bantuan pendidikan kepada putra/putri karyawan dan
                pensiunan Perum Perhutani yang berprestasi.
              </li>
              <li>
                Mengelola Wisma Putra Rimba untuk membantu menyediakan tempat
                tinggal bagi putra/putri karyawan/pensiunan Perum Perhutani yang
                melanjutkan pendidikan di Surabaya.
              </li>
              <li>
                Membantu pengembangan dan pembinaan lembaga Pendidikan dilingkup
                Perum Perhutani.
              </li>
              <li>Menyelenggarakan Pendidikan Non-formal (TK/TPA/PAUD)</li>
            </ol>
          </div>
          <div style={{ marginTop: 20 }}>
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 30,
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Bantuan Pendidikan
            </p>
            <p style={{ fontWeight: "bold", marginBottom: 0 }}>Peruntukan</p>
            <ul style={{ marginLeft: -20 }}>
              <li>
                Putra/Putri Siswa/Mahasiswa dari Pensiunan atau Janda Pensiunan
                Karyawan Perum Perhutani
              </li>
              <li>
                Karyawan, Golongan A dan Golongan I, Golongan II yang tidak
                menjabat
              </li>
              <li>
                Guru Sekolah Taruna Rimba yang sedang menempuh S1 bidang
                pendidikan
              </li>
            </ul>
            <p style={{ fontWeight: "bold", marginBottom: 0 }}>Manfaat</p>
            <ul style={{ marginLeft: -20 }}>
              <li>Bantuan Pendidikan dengan nilai</li>
              <table>
                <tr>
                  <td>Tingkat SD</td>
                  <td>{" - "}</td>
                  <td>Rp. 50.000,- /bln.</td>
                </tr>
                <tr>
                  <td>Tingkat SLTP</td>
                  <td>{" - "}</td>
                  <td>Rp . 60.000,-/bln.</td>
                </tr>
                <tr>
                  <td>Tingkat SLTA</td>
                  <td>{" - "}</td>
                  <td>Rp. 75.000,-/bln.</td>
                </tr>
                <tr>
                  <td>Perguruan Tinggi</td>
                  <td>{" - "}</td>
                  <td>Rp 100.000,/bln.</td>
                </tr>
              </table>
            </ul>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontWeight: "bold", marginBottom: 0 }}>Realisasi</p>
              <ul style={{ marginLeft: -10, marginTop: 0 }}>
                <li>
                  Realisasi Penyaluran Dana Bantuan Pendidikan rentang waktu 5
                  tahun (2017 sd 2021) Sebesar 1,805 M
                </li>
                <li>
                  Jumlah Penerima Bantuan Pendidikan rentang waktu 5 tahun (2017
                  sd 2021) Sebanyak 4.413 Siswa
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </motion.div>
  );
};
