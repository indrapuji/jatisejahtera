import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Col, Form, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export default () => {
  const history = useHistory();
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
  useEffect(() => {
    if (!localStorage.token) {
      Swal.fire({
        icon: "error",
        title: "Oops... Kamu harus login terlebih dahulu",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
    }
  }, [history]);

  const swal = () => {
    Swal.fire({
      icon: "success",
      title: "message has been send",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jk7yd8e",
        "template_wsowez2",
        e.target,
        "user_m5KIGFfT4P9UmB2N2qOA7"
      )
      .then(
        (result) => {
          console.log(result.text);
          swal();
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <Navigation />
      <Container>
        <p style={{ fontWeight: "bold", textAlign: "center", fontSize: 50 }}>
          Hubungi Kami
        </p>
        <Form onSubmit={sendEmail}>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Nama
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Nama" name="nama" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Alamat
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Alamat"
                name="alamat"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Telpon
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="text" placeholder="Telpon" name="telepon" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control type="email" placeholder="Email" name="email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={3}>
              Yang ingin disampaikan / tanyakan
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="textarea"
                placeholder="Pertanyaan"
                name="pertanyaan"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 1, offset: 11 }}>
              <Button type="submit">Kirim</Button>
            </Col>
          </Form.Group>
        </Form>
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
                D/A KANTOR PERHUTANI
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
                D/A KANTOR PERHUTANI
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
                D/A KANTOR PERHUTANI
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
