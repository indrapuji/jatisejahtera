import React from "react";
import Navigation from "../components/Navigation";
import { CardDeck, Card, Button } from "react-bootstrap";
import CarauselCard from "../components/CarauselCard";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

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
  function handdleKematian() {
    history.push("/claim/kematian");
  }
  function handdleManfaat() {
    history.push("/claim/manfaat");
  }
  function handdleKesehatan() {
    history.push("/claim/kesehatan");
  }
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <Navigation />
      <CarauselCard />
      <div
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 50,
          marginBottom: 50,
        }}
      >
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>Santunan Kematian</Card.Title>
              <Card.Text>
                Santunan kematian dibayarkan kepada ahli
                waris,selambat-lambatnya 14 hari kerja setelah berkas pengajuan
                diterima dengan lengkap dan benar oleh Yayasan.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" block onClick={handdleKematian}>
                Pengajuan
              </Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Nilai Hidup</Card.Title>
              <Card.Text>
                Nilai Hidup dibayarkan kepada ahli waris,selambat-lambatnya 14
                hari kerja setelah berkas pengajuan diterima dengan lengkap dan
                benar oleh Yayasan.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" block onClick={handdleManfaat}>
                Pengajuan
              </Button>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Bantuan Rawat Inap</Card.Title>
              <Card.Text>
                Penggantian Biaya Rawat Inap dibayarkan kepada ahli
                waris,selambat-lambatnya 14 hari kerja setelah berkas pengajuan
                diterima dengan lengkap dan benar oleh Yayasan.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button variant="success" block onClick={handdleKesehatan}>
                Pengajuan
              </Button>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
      <Footer />
    </motion.div>
  );
};
