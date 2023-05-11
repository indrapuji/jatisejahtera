import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import host from "../hooks/host";

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
  const history = useHistory();
  const [profileData, setProfileData] = useState("");

  const [rev, setRev] = useState({});
  useEffect(() => {
    setRev({
      nama: profileData.nama,
      email: profileData.email,
      tgl_lahir: profileData.tgl_lahir,
      no_ktp: profileData.no_ktp,
      no_bpjs: profileData.no_bpjs,
      nama_bank: profileData.nama_bank,
      no_rekening: profileData.no_rekening,
      satuan_kerja: profileData.satuan_kerja,
      golongan_pangkat: profileData.golongan_pangkat,
      no_telp: profileData.no_telp,
      alamat: profileData.alamat,
      kelurahan: profileData.kelurahan,
      kecamatan: profileData.kecamatan,
      kota: profileData.kota,
      kodepos: profileData.kodepos,
      provinsi: profileData.provinsi,
      nama_pasangan: profileData.nama_pasangan,
      tgl_lahir_pasangan: profileData.tgl_lahir_pasangan,
      no_telp_pasangan: profileData.no_telp_pasangan,
      no_ktp_pasangan: profileData.no_ktp_pasangan,
      no_bpjs_pasangan: profileData.no_bpjs_pasangan,
      nama_bank_pasangan: profileData.nama_bank_pasangan,
      no_rekening_pasangan: profileData.no_rekening_pasangan,
      nama_anak: profileData.nama_anak,
      tgl_lahir_anak: profileData.tgl_lahir_anak,
      no_tlp_anak: profileData.no_tlp_anak,
      no_ktp_anak: profileData.no_ktp_anak,
      no_bpjs_anak: profileData.no_bpjs_anak,
      nama_bank_anak: profileData.nama_bank_anak,
      no_rekening_anak: profileData.no_rekening_anak,
    });
    // eslint-disable-next-line
  }, [profileData]);

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

  useEffect(() => {
    if (!localStorage.token) history.push("/");
    getProfileData();
    // eslint-disable-next-line
  }, [history]);

  const onFormChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    console.log(value);
    setRev({
      ...rev,
      [name]: value,
    });
  };
  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: "PUT",
        url: `${host}/users/edit-anggota`,
        data: rev,
        headers: {
          token: localStorage.token,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Update data success",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/profile");
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
        </div>
        <div style={{ marginBottom: 50, marginTop: 50 }}>
          <h3 style={{ fontWeight: "bold", marginBottom: 20 }}>Data Diri</h3>
          <Form onSubmit={onFormSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Nama <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.nama}
                  name="nama"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Tanggal Lahir <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.tgl_lahir}
                  name="tgl_lahir"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No KTP <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_ktp}
                  name="no_ktp"
                  onChange={onFormChange}
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
                  value={rev.no_bpjs}
                  name="no_bpjs"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Data Bank
              </Form.Label>
              <Col xs={3}>
                <Form.Control
                  value={rev.nama_bank === "-" ? "Nama Bank" : rev.nama_bank}
                  name="nama_bank"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  value={
                    rev.no_rekening === "-" ? "No Rekening" : rev.no_rekening
                  }
                  name="no_rekening"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Satuan Kerja <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col xs={5}>
                <Form.Control
                  value={
                    rev.satuan_kerja === "-" ? "Satuan Kerja" : rev.satuan_kerja
                  }
                  name="satuan_kerja"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  value={
                    rev.golongan_pangkat === "-"
                      ? "Golongan / Pangkat"
                      : rev.golongan_pangkat
                  }
                  name="golongan_pangkat"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Alamat Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  value={rev.email}
                  name="email"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No HP Pensiunan <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_telp}
                  name="no_telp"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Alamat <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.alamat}
                  name="alamat"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2"></Form.Label>
              <Col xs={5}>
                <Form.Control
                  value={rev.kelurahan === "-" ? "Kelurahan" : rev.kelurahan}
                  name="kelurahan"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  value={rev.kecamatan === "-" ? "Kecamatan" : rev.kecamatan}
                  name="kecamatan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2"></Form.Label>
              <Col xs={4}>
                <Form.Control
                  value={rev.kota === "-" ? "Kota" : rev.kota}
                  name="kota"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  value={rev.kodepos === "-" ? "Kodepos" : rev.kodepos}
                  name="kodepos"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  value={rev.provinsi === "-" ? "Provinsi" : rev.provinsi}
                  name="provinsi"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <h3 style={{ fontWeight: "bold", marginBottom: 20, marginTop: 40 }}>
              Data Istri / Suami
            </h3>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Nama Istri / Suami
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.nama_pasangan}
                  name="nama_pasangan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Tanggal Lahir Istri / Suami
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  value={rev.tgl_lahir_pasangan}
                  name="tgl_lahir_pasangan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No Telp Istri / Suami
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_telp_pasangan}
                  name="no_telp_pasangan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No KTP Istri / Suami
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_ktp_pasangan}
                  name="no_ktp_pasangan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No BPJS Istri / Suami
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_bpjs_pasangan}
                  name="no_bpjs_pasangan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Data Bank Istri / Suami
              </Form.Label>
              <Col xs={3}>
                <Form.Control
                  value={
                    rev.nama_bank_pasangan === "-"
                      ? "Nama Bank"
                      : rev.nama_bank_pasangan
                  }
                  name="nama_bank_pasangan"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  value={
                    rev.no_rekening_pasangan === "-"
                      ? "No Rekening"
                      : rev.no_rekening_pasangan
                  }
                  name="no_rekening_pasangan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <h3 style={{ fontWeight: "bold", marginBottom: 20, marginTop: 40 }}>
              Data anak yang masih dalam tanggungan
            </h3>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Nama Anak
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.nama_anak}
                  name="nama_anak"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Tanggal Lahir Anak
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="date"
                  value={rev.tgl_lahir_anak}
                  name="tgl_lahir_anak"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No Telp Anak
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_tlp_anak}
                  name="no_tlp_anak"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No KTP Anak
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_ktp_anak}
                  name="no_ktp_anak"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                No BPJS Anak
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  value={rev.no_bpjs_anak}
                  name="no_bpjs_anak"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Data Bank Anak
              </Form.Label>
              <Col xs={3}>
                <Form.Control
                  value={
                    rev.nama_bank_anak === "-"
                      ? "Nama Bank"
                      : rev.nama_bank_anak
                  }
                  name="nama_bank_anak"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  value={
                    rev.no_rekening_anak === "-"
                      ? "No Rekening"
                      : rev.no_rekening_anak
                  }
                  name="no_rekening_anak"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Button variant="primary" size="lg" type="submit" block>
              Update
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </motion.div>
  );
};
