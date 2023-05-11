import React, { useEffect } from "react";
import "./visimisi.css";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";

export default () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const item = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };
  return (
    <div>
      <Container>
        <Row>
          <div style={{ marginTop: 50 }}>
            <div data-aos="fade-up">
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                Tentang Kami
              </h3>
              <p>
                <span style={{ fontWeight: "bold" }}>
                  “Yayasan Jati Sejahtera”
                </span>{" "}
                didirikan pada tanggal 24 April 1987 oleh Pendiri yayasan
                (seperti tersebut dibawah) dengan Akte Notaris Roenastiti
                Prayitno, SH, MA, No: 21 Tanggal: 24 April 1987 . Pada awal
                pendirian, Yayasan ini bergerak di bidang pendidikan yaitu
                membantu biaya pendidikan kepada putra putri karyawan/pensiunan
                Perum Perhutani. Yayasan berkedudukan di Jakarta dan memiliki
                Kantor Perwakilan di wilayah Jawa Timur, Jawa Tengah, serta Jawa
                Barat dan Banten. Di awal pendirian, Yayasan diurus oleh suatu
                pengurus yang ditunjuk dan diangkat oleh salah satu Direktur
                Perhutani selaku Ketua Pembina.
                <br style={{ marginBottom: 10 }} />
                Pada tahun 2008, yayasan melakukan perubahan Anggaran Dasar yang
                sangat mendasar dalam rangka menyesuaikan dengan Undang-Undang
                Yayasan yang dikeluarkan oleh Pemerintah yaitu Undang-Undang No:
                16 Tahun 2001, dan Undang-undang No 28 Tahun 2004. Perubahan
                Anggaran dasar ini menyangkut susunan organ yayasan dan
                memperluas kegiatan nya yaitu dibidang Sosial dan Kemanusiaan.
                Perubahan ini di legalkan dengan Akte Notaris Etty Purwaningsih
                SH, No: 08 Tanggal 24 September 2008.
                <br style={{ marginBottom: 10 }} />
                Seiring berjalan nya waktu, yayasan mengalami perubahan anggaran
                dasar yang berkaitan dengan pergantian pengurus, khusus
                perubahan pada Tahun 2010, perubahan anggaran dasarnya disertai
                dengan perubahan Nama Yayasan menjadi “Yayasan Kesejahteraan
                Pegawai Perum Perhutani Jati Sejahtera (YKP3JS), serta
                penambahan kegiatan yaitu program bantuan pemilikan rumah dan
                program kesehatan.
              </p>
            </div>
            <div style={{ marginTop: 50 }}>
              <div data-aos="fade-up">
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  SEJARAH SINGKAT YAYASAN
                </p>
                <ol type="1">
                  <li>
                    Didirikan pada tahun 1987 dengan nama Yayasan Jati sejahtera
                    oleh Pimpinan Perum Perhutani pada saat itu yaitu :
                  </li>
                  <div
                    style={{ marginTop: 20, marginBottom: 20, color: "blue" }}
                  >
                    <Row>
                      <Col md={{ span: 4, offset: 1 }}>
                        <h5>Ir. HARTONO WIRJODARMODJO. </h5>
                      </Col>
                      <Col md={{ span: 4, offset: 0 }}>
                        <h5> (DIREKTUR UTAMA)</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 4, offset: 1 }}>
                        <h5>Ir. SISWOJO SUMOTIRTO. </h5>
                      </Col>
                      <Col md={{ span: 4, offset: 0 }}>
                        <h5> (DIREKTUR UMUM)</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 4, offset: 1 }}>
                        <h5>Ir. SEDIONO DHARMAWAN. </h5>
                      </Col>
                      <Col md={{ span: 4, offset: 0 }}>
                        <h5> (KADIV. PERSONALIA)</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 4, offset: 1 }}>
                        <h5>Ir. SOENDAROE NOTOAMIDJOJO. </h5>
                      </Col>
                      <Col md={{ span: 4, offset: 0 }}>
                        <h5> (KADIV. UMUM )</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 4, offset: 1 }}>
                        <h5>Drs. DJOKO SETIJONO. </h5>
                      </Col>
                      <Col md={{ span: 4, offset: 0 }}>
                        <h5> (KADIV. KEUANGAN)</h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 4, offset: 1 }}>
                        <h5>Drs. DAMAMI ABRORI. </h5>
                      </Col>
                      <Col md={{ span: 4, offset: 0 }}>
                        <h5> (STAF KHUSUS PERSONALIA )</h5>
                      </Col>
                    </Row>
                  </div>
                  <p style={{ textAlign: "justify" }}>
                    Yayasan bertujuan menyelenggarakan usaha di bidang social
                    dalam rangka peningkatan kesejahteraan dan pendidikan bagi
                    putra-putri karyawan dan pensiunan.
                  </p>
                  <li>
                    Tahun 2003 diberi tugas oleh Perum Perhutani untuk mengelola
                    dana perumahan berdasarkan SK. No.406/kpts/Dir/2003, tgl.
                    25-07-2003.
                  </li>
                  <li>
                    Tahun 2010 berdasarkan SK. Direksi No.579/kpts/Dir/2009,
                    tgl. 10 Desember 2009 diberi tugas mengelola Dana Kesehatan
                    yang berasal dari Asuransi Bumiputera.
                  </li>
                </ol>
              </div>
            </div>

            <div data-aos="fade-up" style={{ marginTop: 50, marginBottom: 30 }}>
              <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                Visi & Misi
              </h3>
            </div>
            <ul className="time">
              <li>
                <motion.div
                  data-aos="fade-right"
                  className="time-image"
                  whileHover={{ color: "#45fc03", scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    className="img-circle img-responsive"
                    src={"https://bpu.unsri.ac.id/assets/frontend/images/4.svg"}
                    style={{ height: 185, width: 185, borderRadius: "100%" }}
                    alt=""
                  />
                </motion.div>
                <div className="time-panel">
                  <div className="time-heading" variants={item}>
                    <h4>Visi</h4>
                  </div>
                  <div className="time-body">
                    <p className="text-muted">
                      Menjadi Yayasan pengelola fasilitas <br /> kesejahteraan
                      yang sehat, kuat dan
                      <br />
                      bermanfaat bagi pesertanya.
                    </p>
                  </div>
                </div>
              </li>
              <li className="time-inverted">
                <motion.div
                  data-aos="fade-left"
                  className="time-image"
                  whileHover={{ color: "#45fc03", scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    className="img-circle img-responsive"
                    src={"https://bpu.unsri.ac.id/assets/frontend/images/2.svg"}
                    style={{ height: 185, width: 185, borderRadius: "100%" }}
                    alt=""
                  />
                </motion.div>
                <div className="time-panel">
                  <div className="time-heading">
                    <h4>Misi</h4>
                  </div>
                  <div className="time-body">
                    <p className="text-muted">
                      <ol style={{ marginLeft: -20 }}>
                        <li>
                          Mengembangkan peran yayasan dalam bidang pendidikan,
                          perumahan dan kesehatan secara berkualitas.
                        </li>
                        <li>
                          Berusaha meningkatkan kesejahteraan dengan membantu
                          meringankan beban para pesertanya.
                        </li>
                        <li>
                          Menjadikan “nilai” yayasan sebagai harapan pesertanya.
                        </li>
                        <li>
                          Bekerja berdasarkan nilai kebersamaan, saling
                          merasakan dan saling menghargai.
                        </li>
                      </ol>
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <motion.div
                  data-aos="fade-right"
                  className="time-image"
                  whileHover={{ color: "#45fc03", scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    className="img-circle img-responsive"
                    src={"https://bpu.unsri.ac.id/assets/frontend/images/1.svg"}
                    style={{ height: 185, width: 185, borderRadius: "100%" }}
                    alt=""
                  />
                </motion.div>
                <div className="time-panel">
                  <div className="time-heading" variants={item}>
                    <h4>Bidang Kegiatan</h4>
                  </div>
                  <div className="time-body">
                    <p className="text-muted">
                      <li>Bidang Pendidikan</li>
                      <li>Bidang Sosial dan Kemanusiaan</li>
                      <li>Bidang Perumahan</li>
                      <li>Bidang Kesehatan</li>
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Row>
      </Container>
    </div>
  );
};
