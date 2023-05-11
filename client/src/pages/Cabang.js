import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Col, Row, Image } from "react-bootstrap";
import { motion } from "framer-motion";
import Map from "../assets/image/map.png";

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
            Kantor YKP3JS
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Image src={Map} rounded style={{ height: 400, width: 1000 }} />
        </div>
        <div style={{ marginBottom: 30 }}>
          <Row>
            <Col>
              <p style={{ fontWeight: "bold", fontSize: 20, marginBottom: 5 }}>
                KANTOR PUSAT
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                D/A WISMA PERHUTANI
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                JALAN VILLA NO.1 GATOT SOBROTO
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                KAV. 17 – 18 JAKARTA SELATAN
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                TLP. 62.21.5252983, FAC.
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>62.21.5252983</p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>Email :</p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                yayasanjatisejahtera@yahoo.co.id
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                admin@jatisejahtera.or.id
              </p>
            </Col>
          </Row>
        </div>
        <div style={{ marginBottom: 50 }}>
          <Row>
            <Col>
              <p style={{ fontWeight: "bold", fontSize: 15, marginBottom: 5 }}>
                KANTOR PERWAKILAN YKP3.JS JAWA BARAT
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                D/A KANTOR PERUM PERHUTANI
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                JL.SOEKARNO HATTA NO. 628 KM.14 BANDUNG 40292.
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                TLP. 62.22. 7802792{" "}
              </p>
            </Col>
            <Col>
              <p style={{ fontWeight: "bold", fontSize: 15, marginBottom: 5 }}>
                KANTOR PERWAKILAN YKP3.JS JAWA TENGAH
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                D/A KANTOR PERUM PERHUTANI
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                JL.PAHLAWAN NO. 15 - 17 SEMARANG 50243
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                TLP. 62.24 8413631
              </p>
            </Col>
            <Col>
              <p style={{ fontWeight: "bold", fontSize: 15, marginBottom: 5 }}>
                KANTOR PERWAKILAN YKP3.JS JAWA TIMUR
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                D/A KANTOR PERUM PERHUTANI
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                JL.GENTENG KALI NO. 49 SURABAYA 60008.
              </p>
              <p style={{ marginBottom: 0, fontSize: 13 }}>
                TLP. 62.31 5343881
              </p>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </motion.div>
  );
};
