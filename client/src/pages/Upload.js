import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
// import Footer from '../components/Footer';
// import { Col, Row, Container, Image, Modal } from "react-bootstrap";
import { Col, Row, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import host from "../hooks/host";

export default () => {
  const [news, setNews] = useState([]);
  // const [show, setShow] = useState(false);
  // const [prev, setPrev] = useState("");
  // const handleClose = () => setShow(false);

  useEffect(() => {
    getNews();
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

  // function handleShow(imageshow) {
  //   setShow(true);
  //   setPrev(imageshow);
  // }

  const getNews = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: host + "/content?category=upload",
      });
      setNews(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
        <p
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 50,
            marginBottom: 100,
          }}
        >
          Upload Data Peserta
        </p>
        <Container>
          {news &&
            news.map((item, index) => {
              return (
                <Row
                  ley={index}
                  style={{ marginBottom: 10, cursor: "pointer" }}
                  // onClick={() => handleShow(item.image_url)}
                >
                  <Col md="8">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <p style={{ fontWeight: "bold" }}>{item.title}</p>
                      <p>{item.text}</p>
                    </motion.div>
                  </Col>
                  <Col md="4">
                    {/* <Image
                      src={item.image_url}
                      rounded
                      style={{ height: 200, width: 300 }}
                    /> */}
                    <div>
                      <a
                        href={item.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Click to View
                      </a>
                    </div>
                  </Col>
                </Row>
              );
            })}
        </Container>
        {/* <Modal size="lg" show={show} onHide={handleClose} keyboard={false}>
          <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
            <Image src={prev} style={{ height: 400 }} />
          </Modal.Body>
        </Modal> */}
      </Container>
      {/* <Footer /> */}
    </motion.div>
  );
};
