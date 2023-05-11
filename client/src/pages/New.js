import React from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

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
        <div style={{ marginTop: 50 }}>
          <p style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
            Update Data
          </p>
          <p style={{ textAlign: "center" }}>
            Silahkan Melakukan Pengkinian Data melalui Link ini
          </p>
          <p style={{ textAlign: "center", marginTop: -15 }}>
            <a
              href={"https://forms.gle/7XLsMVPZYMkQewbs7"}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://forms.gle/7XLsMVPZYMkQewbs7
            </a>
          </p>
        </div>
      </Container>
      <div style={{ position: "fixed", bottom: 0, width: "100vw" }}>
        <Footer />
      </div>
    </motion.div>
  );
};
