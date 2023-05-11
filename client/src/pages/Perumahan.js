import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import Perumahan from "../assets/image/rumahasuransi.jpg";

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
      <Container>
        <div style={{ marginTop: 20 }}>
          <p style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
            Perumahan
          </p>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Image src={Perumahan} rounded style={{ height: 400, width: 600 }} />
        </div>
        <div style={{ marginTop: 20 }}>
          <p>
            Yayasan mengelola dana program pemilikan rumah bagi karyawan Perum
            Perhutani yang masih aktif khususnya Karyawan Golongan I dan
            Golongan II. Penyaluran dana bantuan pemilikan rumah ini diberikan
            secara selektif di seluruh Wilayah kerja Perum Perhutani yaitu di
            Jawa Timur, Jawa Tengah, serta Jawa Barat dan Banten. Bantuan ini
            diberikan secara regular setiap dua tahun, dan diberikan dalam
            bentuk pinjaman tanpa bunga yang pengembaliannya akan diangsur oleh
            karyawan dalam waktu lima tahun. Pada saat Karyawan memasuki masa
            pensiun, atau meninggal sebelum waktu pensiun, akan menerima
            pengembalian iuran Perumahan yang nilai nya sebesar seluruh
            akumulasi iuran pemilikan rumah yang telah disetorkan kepada
            yayasan.
          </p>
        </div>
      </Container>
      <Footer />
    </motion.div>
  );
};
