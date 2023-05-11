import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  useEffect(() => {
    Aos.init({ duration: 2500 });
  }, []);
  useEffect(() => {
    if (!localStorage.token) {
      Swal.fire({
        icon: "error",
        title: "Oops... Kamu harus login terlebih dahulu",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/#pengkinian-data");
    }
  }, [history]);
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
            Company Profile
          </p>
          <div style={{ textAlign: "center" }}>
            <iframe
              src="https://dev.jatisejahtera.or.id/uploads/Company_Profile.pdf"
              title="title"
              style={{ width: 700, height: 700 }}
            ></iframe>
          </div>
          <div style={{ textAlign: "center", marginTop: 50, marginBottom: 50 }}>
            <iframe
              src="https://dev.jatisejahtera.or.id/uploads/Leaflet.pdf"
              title="title"
              style={{ width: 1000, height: 700 }}
            ></iframe>
          </div>
        </div>
      </Container>
      <Footer />
    </motion.div>
  );
};
