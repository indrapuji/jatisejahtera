import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
// import host from "../hooks/host";
import HostUrl from "../hooks/HostUrl";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import moment from "moment";

import {
  monthSelection,
  pangkatSection,
  regionalSection,
  kapusSection,
  jatengSection,
  jatimSection,
  jabarSection,
} from "../data";

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
  const [isDate, setIsDate] = useState();
  const [isMonth, setIsMonth] = useState();
  const [isYear, setIsYear] = useState();
  const [isRegional, setIsRegional] = useState();
  const [isOther, setIsOther] = useState(false);

  const [formData, setFormData] = useState({
    image_url: "",
    category: "register-anggota",
    title: "",
    text: "",
    status: true,
  });

  const [dataForm, setDataForm] = useState({
    nama: "",
    no_induk: "",
    email: "",
    tgl_lahir: "",
    no_ktp: "",
    no_bpjs: "",
    nama_bank: "",
    no_rekening: "",
    satuan_kerja: "",
    golongan_pangkat: "",
    no_telp: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    kodepos: "",
    provinsi: "",
  });

  useEffect(() => {
    setDataForm({ ...dataForm, tgl_lahir: `${isYear}-${isMonth}-${isDate}` });
    // eslint-disable-next-line
  }, [isYear, isMonth, isDate]);

  useEffect(() => {}, []);

  const onFormChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
    setFormData({
      ...formData,
      text: JSON.stringify(dataForm),
    });

    if (name === "nama") {
      setFormData({ ...formData, title: value });
    }
  };

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (dataForm.no_induk.length < 9) {
        Swal.fire({
          icon: `error`,
          title: `NIP/NPP/NIK harus lebih dari / sama dengan 9 karakter`,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      //   const newFormData = new FormData();
      //   for (let keys in formData) {
      //     newFormData.append(`${keys}`, formData[keys]);
      //   }
      await axios({
        method: "POST",
        url: HostUrl + "/content/create",
        // data: newFormData,
        data: formData,
      });
      Swal.fire({
        icon: "success",
        title: "Record data success",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `${err}`,
      });
    }
    console.log("test");
  };

  const daySelections = Array.apply(null, Array(31)).map((_, index) => {
    return {
      labelKey: `${index + 1 < 10 ? "0" + (index + 1) : index + 1}`,
      value: index + 1,
    };
  });

  const yearsSections = [];
  for (let i = 0; i < 80; i++) {
    let year = moment().subtract(i, "years").format("YYYY");
    yearsSections.push({ labelKey: year, value: year });
  }

  const handleDate = (selectedOptions) => {
    setIsDate(selectedOptions.selectedKey);
  };
  const handleMonth = (selectedOptions) => {
    setIsMonth(selectedOptions.selectedKey);
  };
  const handleYear = (selectedOptions) => {
    setIsYear(selectedOptions.selectedKey);
  };

  const handleRegional = (selectedOptions) => {
    setIsRegional(selectedOptions.selectedKey.toString());
  };

  const handleCabang = (selectedOptions) => {
    console.log(selectedOptions.selectedKey);
    if (selectedOptions.selectedKey.toString() === "Other") {
      setIsOther(true);
    } else {
      setIsOther(false);
      setDataForm({
        ...dataForm,
        satuan_kerja: selectedOptions.selectedKey.toString(),
      });
    }
  };

  const handlePangkat = (selectedOptions) => {
    setDataForm({
      ...dataForm,
      golongan_pangkat: selectedOptions.selectedKey.toString(),
    });
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
            Daftar Anggota Baru
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
                  placeholder="Nama"
                  name="nama"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                NIP/NPP/NIK <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="NIP / NPP / NIK"
                  name="no_induk"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Tanggal Lahir <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Tanggal"
                  options={daySelections}
                  onChange={handleDate}
                />
              </Col>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Bulan"
                  options={monthSelection}
                  onChange={handleMonth}
                />
              </Col>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Tahun"
                  options={yearsSections}
                  onChange={handleYear}
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
                  placeholder="No KTP"
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
                  placeholder="No BPJS"
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
                  placeholder="Nama Bank"
                  name="nama_bank"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="No Rekening"
                  name="no_rekening"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Satuan Kerja <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Regional"
                  options={regionalSection}
                  onChange={handleRegional}
                />
              </Col>
              {isRegional === "JATENG" && (
                <Col sm="3">
                  <BootstrapSelect
                    placeholder="Cabang"
                    options={jatengSection}
                    onChange={handleCabang}
                  />
                </Col>
              )}
              {isRegional === "JATIM" && (
                <Col sm="3">
                  <BootstrapSelect
                    placeholder="Cabang"
                    options={jatimSection}
                    onChange={handleCabang}
                  />
                </Col>
              )}
              {isRegional === "KAPUS" && (
                <Col sm="3">
                  <BootstrapSelect
                    placeholder="Cabang"
                    options={kapusSection}
                    onChange={handleCabang}
                  />
                </Col>
              )}
              {isRegional === "JABAR" && (
                <Col sm="3">
                  <BootstrapSelect
                    placeholder="Cabang"
                    options={jabarSection}
                    onChange={handleCabang}
                  />
                </Col>
              )}
              {isOther && (
                <Col sm="3">
                  <Form.Control
                    placeholder="Other"
                    name="satuan_kerja"
                    onChange={onFormChange}
                  />
                </Col>
              )}
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Golongan <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Golongan Saat Pensiun"
                  options={pangkatSection}
                  onChange={handlePangkat}
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
                  placeholder="Alamat Email"
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
                  placeholder="No HP Pensiunan"
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
                  placeholder="Alamat"
                  name="alamat"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2"></Form.Label>
              <Col xs={5}>
                <Form.Control
                  placeholder="Kelurahan / Desa"
                  name="kelurahan"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Kecamatan"
                  name="kecamatan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2"></Form.Label>
              <Col xs={4}>
                <Form.Control
                  placeholder="Kota / Kabupaten"
                  name="kota"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Kodepos"
                  name="kodepos"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Provinsi"
                  name="provinsi"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>

            <Button variant="primary" size="lg" type="submit" block>
              Kirim
            </Button>
          </Form>
        </div>
      </Container>
      <Footer />
    </motion.div>
  );
};
