import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import Bansos from "../assets/image/bansos.jpg";

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
            Sosial
          </p>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Image src={Bansos} rounded style={{ height: 400, width: 600 }} />
        </div>
        <div style={{ marginTop: 20 }}>
          <p style={{ fontWeight: "bold", marginBottom: 0 }}>
            Beberapa kegiatan dibidang Sosial dan Kemanusiaan yang
            diselenggarakan oleh Yayasan diantaranya:
          </p>

          <ol style={{ marginLeft: -20 }}>
            <li>
              Memberikan santunan kematian bagi pegawai dan pensiunan Perum
              Perhutani.
            </li>
            <li>Mengelola Panti Asuhan Rimba Bakti di Semarang</li>
            <li>
              Memberikan santunan Nilai Hidup bagi pensiunan yang tidak pernah
              mengajukan klaim Bantuan Kesehatan selama masa perlindungan.
            </li>
            <li>
              Mengelola serta mengembangkan dana kesehatan dan dana perumahan
              yang diperoleh dari Perum Perhutani
            </li>
            <li>
              Menjalankan usaha-usaha lain yang dianggap perlu dan bermanfaat
              sepanjang sesuai dengan maksud dan tujuan yayasan serta sesuai
              dengan peraturan dan perundangan yang berlaku.
            </li>
            <li>Memberi bantuan kepada korban bencana alam</li>
            <li>
              Memberi bantuan kepada tuna wisma, fakir miskin, dan yatim piatu
            </li>
          </ol>
        </div>
      </Container>
      <Footer />
    </motion.div>
  );
};
