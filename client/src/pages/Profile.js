import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Row,
  Col,
  Image,
  Container,
  Form,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import host from "../hooks/host";

export default () => {
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [look, setLook] = useState(false);

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
  const history = useHistory();
  const [profileData, setProfileData] = useState(false);
  const [dataPengajuan, setDataPengajuan] = useState({
    claim_kematians: {},
    claim_kesehatans: {},
    claim_nilai_hidups: {},
    claim_pendidikans: {},
    claim_perumahans: {},
  });
  useEffect(() => {
    if (!localStorage.token) history.push("/");
    getProfileData();
    // eslint-disable-next-line
  }, [history]);
  useEffect(() => {
    if (profileData) claimData();
    // eslint-disable-next-line
  }, [profileData]);
  const claimData = () => {
    let temp = {
      claim_kematians: {
        status: "",
        pesan: "",
        bukti_tf: "",
      },
      claim_kesehatans: {
        status: "",
        pesan: "",
        bukti_tf: "",
      },
      claim_nilai_hidups: {
        status: "",
        pesan: "",
        bukti_tf: "",
      },
      claim_pendidikans: {
        status: "",
        pesan: "",
        bukti_tf: "",
      },
      claim_perumahans: {
        status: "",
        pesan: "",
        bukti_tf: "",
      },
    };
    for (let keys in dataPengajuan) {
      if (profileData[keys][0]) {
        if (profileData[keys][0].pesan_claim)
          temp[keys].pesan = profileData[keys][0].pesan_claim.pesan;
        if (profileData[keys][0].bukti_tf)
          temp[keys].bukti_tf = profileData[keys][0].bukti_tf;
        if (profileData[keys][0].status === "1") {
          temp[keys].status = `Checking Staff`;
        } else if (profileData[keys][0].status === "2") {
          temp[keys].status = `Proses Pencairan`;
        } else if (profileData[keys][0].status === "3") {
          temp[keys].status = `Pencairan Berhasil`;
        } else if (profileData[keys][0].status === "4") {
          temp[keys].status = `Checking Finance`;
        } else if (profileData[keys][0].status === "5") {
          temp[keys].status = `Verified`;
        } else if (profileData[keys][0].status === "0") {
          temp[keys].status = `Ditolak`;
        }
      } else temp[keys].status = "-";
    }
    setDataPengajuan(temp);
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios({
        method: "GET",
        url: `${host}/users/profile`,
        headers: {
          token: localStorage.token,
        },
      });
      setProfileData(data);
    } catch (err) {
      let msg = "";
      if (err.response) {
        if (Array.isArray(err.response.data.msg)) {
          msg = err.response.data.msg.join("<br>");
        } else {
          msg = err.response.data.msg;
        }
      } else if (err.request) {
        msg = err.request;
      } else {
        msg = err.message;
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `${msg}`,
      });
    }
  };
  function handdleLogout() {
    Swal.fire({
      title: "Logout?",
      text: "Yakin ingin logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        history.push("/");
      }
    });
  }
  function handdleKematian() {
    history.push("/claim/kematian");
  }
  function handdleManfaat() {
    history.push("/claim/manfaat");
  }
  function handdleKesehatan() {
    history.push("/claim/kesehatan");
  }
  function handdleKacamata() {
    history.push("/claim/kacamata");
  }
  function handdleUpdate() {
    history.push("/profile/update");
  }
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={pageTransition}
    >
      <Navigation />
      <h1 style={{ textAlign: "center", marginTop: 20, marginBottom: 50 }}>
        User Profile
      </h1>
      <Container>
        <div style={{ display: "flex", marginBottom: 20 }}>
          <div
            style={{
              width: "25rem",
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <Card
              border={
                dataPengajuan.claim_kematians.status === "-"
                  ? "secondary"
                  : dataPengajuan.claim_kematians.status === "Ditolak"
                  ? "danger"
                  : dataPengajuan.claim_kematians.status === "Verified"
                  ? "success"
                  : "primary"
              }
            >
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize: 13,
                  }}
                >
                  Santunan Kematian
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 "
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {dataPengajuan.claim_kematians.status}
                </Card.Subtitle>
                {dataPengajuan.claim_kematians.bukti_tf && (
                  <Card.Subtitle
                    className="mb-2 "
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    <div style={{ paddingTop: 20 }}>
                      <a href={dataPengajuan.claim_kematians.bukti_tf} download>
                        Click to download
                      </a>
                    </div>
                  </Card.Subtitle>
                )}
              </Card.Body>
            </Card>
            <div style={{ marginTop: 5 }}>
              {dataPengajuan.claim_kematians.status === "-" ? (
                <Button
                  variant="outline-success"
                  block
                  size="sm"
                  onClick={handdleKematian}
                >
                  Ajukan
                </Button>
              ) : dataPengajuan.claim_kematians.status === "Ditolak" ? (
                <Button
                  variant="outline-warning"
                  block
                  size="sm"
                  onClick={handdleKematian}
                >
                  Ajukan Kembali
                </Button>
              ) : (
                <Button variant="outline-secondary" block size="sm" disabled>
                  Disabled
                </Button>
              )}
            </div>
          </div>
          <div
            style={{
              width: "25rem",
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <Card
              border={
                dataPengajuan.claim_kesehatans.status === "-"
                  ? "secondary"
                  : dataPengajuan.claim_kesehatans.status === "Ditolak"
                  ? "danger"
                  : dataPengajuan.claim_kesehatans.status === "Verified"
                  ? "success"
                  : "primary"
              }
            >
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize: 13,
                  }}
                >
                  Bantuan Rawat Inap
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 "
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {dataPengajuan.claim_kesehatans.status}
                </Card.Subtitle>
                {dataPengajuan.claim_kesehatans.bukti_tf && (
                  <Card.Subtitle
                    className="mb-2 "
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {/* <Image
                      src={dataPengajuan.claim_kesehatans.bukti_tf}
                      style={{ width: 100, cursor: "pointer" }}
                      onClick={() => setView(true)}
                    /> */}
                    <div style={{ paddingTop: 20 }}>
                      <a
                        href={dataPengajuan.claim_kesehatans.bukti_tf}
                        download
                      >
                        Click to download
                      </a>
                    </div>
                  </Card.Subtitle>
                )}
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
            <div style={{ marginTop: 5 }}>
              {dataPengajuan.claim_kesehatans.status === "-" ? (
                <Button
                  variant="outline-success"
                  block
                  size="sm"
                  onClick={handdleKesehatan}
                >
                  Ajukan
                </Button>
              ) : dataPengajuan.claim_kesehatans.status === "Ditolak" ? (
                <Button
                  variant="outline-warning"
                  block
                  size="sm"
                  onClick={handdleKesehatan}
                >
                  Ajukan Kembali
                </Button>
              ) : (
                <Button variant="outline-secondary" block size="sm" disabled>
                  disabled
                </Button>
              )}
            </div>
          </div>
          <div
            style={{
              width: "25rem",
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <Card
              border={
                dataPengajuan.claim_nilai_hidups.status === "-"
                  ? "secondary"
                  : dataPengajuan.claim_nilai_hidups.status === "Ditolak"
                  ? "danger"
                  : dataPengajuan.claim_nilai_hidups.status === "Verified"
                  ? "success"
                  : "primary"
              }
            >
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize: 13,
                  }}
                >
                  Bantuan Nilai Hidup
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 "
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {dataPengajuan.claim_nilai_hidups.status}
                </Card.Subtitle>
                {dataPengajuan.claim_nilai_hidups.bukti_tf && (
                  <Card.Subtitle
                    className="mb-2 "
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {/* <Image
                      src={dataPengajuan.claim_nilai_hidups.bukti_tf}
                      style={{ width: 100, cursor: "pointer" }}
                      onClick={() => setLook(true)}
                    /> */}
                    <div style={{ paddingTop: 20 }}>
                      <a
                        href={dataPengajuan.claim_nilai_hidups.bukti_tf}
                        download
                      >
                        Click to download
                      </a>
                    </div>
                  </Card.Subtitle>
                )}
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
            <div style={{ marginTop: 5 }}>
              {dataPengajuan.claim_nilai_hidups.status === "-" ? (
                <Button
                  variant="outline-success"
                  block
                  size="sm"
                  onClick={handdleManfaat}
                >
                  Ajukan
                </Button>
              ) : dataPengajuan.claim_nilai_hidups.status === "Ditolak" ? (
                <Button
                  variant="outline-warning"
                  block
                  size="sm"
                  onClick={handdleManfaat}
                >
                  Ajukan Kembali
                </Button>
              ) : (
                <Button variant="outline-secondary" block size="sm" disabled>
                  Disabled
                </Button>
              )}
            </div>
          </div>
          <div
            style={{
              width: "25rem",
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <Card
              border={
                dataPengajuan.claim_pendidikans.status === "-"
                  ? "secondary"
                  : dataPengajuan.claim_pendidikans.status === "Ditolak"
                  ? "danger"
                  : dataPengajuan.claim_pendidikans.status === "Verified"
                  ? "success"
                  : "primary"
              }
            >
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    marginBottom: 20,
                    fontSize: 13,
                  }}
                >
                  Bantuan Kacamata
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 "
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  {dataPengajuan.claim_pendidikans.status}
                </Card.Subtitle>
                {dataPengajuan.claim_pendidikans.bukti_tf && (
                  <Card.Subtitle
                    className="mb-2 "
                    style={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {/* <Image
                      src={dataPengajuan.claim_pendidikans.bukti_tf}
                      style={{ width: 100, cursor: "pointer" }}
                      onClick={() => setLook(true)}
                    /> */}
                    <div style={{ paddingTop: 20 }}>
                      <a
                        href={dataPengajuan.claim_pendidikans.bukti_tf}
                        download
                      >
                        Click to download
                      </a>
                    </div>
                  </Card.Subtitle>
                )}
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
            <div style={{ marginTop: 5 }}>
              {dataPengajuan.claim_pendidikans.status === "-" ? (
                <Button
                  variant="outline-success"
                  block
                  size="sm"
                  onClick={handdleKacamata}
                >
                  Ajukan
                </Button>
              ) : dataPengajuan.claim_pendidikans.status === "Ditolak" ? (
                <Button
                  variant="outline-warning"
                  block
                  size="sm"
                  onClick={handdleKacamata}
                >
                  Ajukan Kembali
                </Button>
              ) : (
                <Button variant="outline-secondary" block size="sm" disabled>
                  Disabled
                </Button>
              )}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 50 }}>
          {dataPengajuan.claim_kematians.pesan && (
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Catatan claim Kematian
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={dataPengajuan.claim_kematians.pesan}
                  disabled={true}
                />
              </Col>
            </Form.Group>
          )}
          {dataPengajuan.claim_kesehatans.pesan && (
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Catatan claim Kesehatan
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={dataPengajuan.claim_kesehatans.pesan}
                  disabled={true}
                />
              </Col>
            </Form.Group>
          )}
          {dataPengajuan.claim_nilai_hidups.pesan && (
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Catatan claim Nilai Hidup
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={dataPengajuan.claim_nilai_hidups.pesan}
                  disabled={true}
                />
              </Col>
            </Form.Group>
          )}
          {dataPengajuan.claim_perumahans.pesan && (
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Catatan claim Perumahan
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={dataPengajuan.claim_perumahans.pesan}
                  disabled={true}
                />
              </Col>
            </Form.Group>
          )}
          {dataPengajuan.claim_pendidikans.pesan && (
            <Form.Group as={Row}>
              <Form.Label column sm="3">
                Catatan claim Kacamata
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={dataPengajuan.claim_pendidikans.pesan}
                  disabled={true}
                />
              </Col>
            </Form.Group>
          )}
        </div>
        <Row>
          <Col>
            <div style={{ marginBottom: 20 }}>
              <Image
                src={require("../assets/image/logo.png")}
                roundedCircle
                style={{ width: 300, height: 300 }}
              />
            </div>
            <Card style={{ width: "20rem", marginTop: 20 }}>
              <Button
                variant="warning"
                size="lg"
                type="submit"
                block
                onClick={() => handdleUpdate()}
              >
                Update Profile
              </Button>
            </Card>
            <Card style={{ width: "20rem", marginTop: 20 }}>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                block
                onClick={handdleLogout}
              >
                Logout
              </Button>
            </Card>
          </Col>
          <Col xs="auto">
            <Form style={{ marginBottom: 20 }}>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Nama
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="nama"
                    value={profileData.nama}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  No Induk
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="no_induk"
                    value={profileData.no_induk}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Tgl Lahir
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="date"
                    name="tgl_lahir"
                    value={profileData.tgl_lahir}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  No KTP
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="no_ktp"
                    value={profileData.no_ktp}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  No BPJS
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="no_bpjs"
                    value={profileData.no_bpjs}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Nama Bank
                </Form.Label>
                <Col xs={3}>
                  <Form.Control
                    name="nama_bank"
                    value={profileData.nama_bank}
                    disabled={true}
                  />
                </Col>
                <Form.Label column sm="1.5">
                  No Rek
                </Form.Label>
                <Col>
                  <Form.Control
                    name="no_rekening"
                    value={profileData.no_rekening}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Sat. Kerja
                </Form.Label>
                <Col xs={5}>
                  <Form.Control
                    name="satuan_kerja"
                    value={profileData.satuan_kerja}
                    disabled={true}
                  />
                </Col>
                <Form.Label column sm="1.5">
                  Golongan
                </Form.Label>
                <Col>
                  <Form.Control
                    name="golongan_pangkat"
                    value={profileData.golongan_pangkat}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  No Telp
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="no_telp"
                    value={profileData.no_telp}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Alamat
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="alamat"
                    value={profileData.alamat}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2">
                  Kel
                </Form.Label>
                <Col xs={5}>
                  <Form.Control
                    name="kelurahan"
                    value={profileData.kelurahan}
                    disabled={true}
                  />
                </Col>
                <Form.Label column sm="1.5">
                  Kec
                </Form.Label>
                <Col>
                  <Form.Control
                    name="kecamatan"
                    value={profileData.kecamatan}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm="2"></Form.Label>
                <Col xs={4}>
                  <Form.Control
                    name="kota"
                    value={profileData.kota}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Form.Control
                    name="kodepos"
                    value={profileData.kodepos}
                    disabled={true}
                  />
                </Col>
                <Col>
                  <Form.Control
                    name="provinsi"
                    value={profileData.provinsi}
                    disabled={true}
                  />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bukti Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={dataPengajuan.claim_kematians.bukti_tf}
            style={{ width: 450 }}
          />
        </Modal.Body>
      </Modal>

      <Modal centered show={view} onHide={() => setView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bukti Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={dataPengajuan.claim_kesehatans.bukti_tf}
            style={{ width: 450 }}
          />
        </Modal.Body>
      </Modal>

      <Modal centered show={look} onHide={() => setLook(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bukti Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={dataPengajuan.claim_nilai_hidups.bukti_tf}
            style={{ width: 450 }}
          />
        </Modal.Body>
      </Modal>
      <Footer />
    </motion.div>
  );
};
