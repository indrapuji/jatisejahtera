import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import host from "../hooks/host";
import BootstrapSelect from "react-bootstrap-select-dropdown";
import moment from "moment";
import FormUpdate from "../assets/Form.docx";

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
  const [isDateCouple, setIsDateCouple] = useState();
  const [isMonthCouple, setIsMonthCouple] = useState();
  const [isYearCouple, setIsYearCouple] = useState();
  const [isDateChild, setIsDateChild] = useState();
  const [isMonthChild, setIsMonthChild] = useState();
  const [isYearChild, setIsYearChild] = useState();
  const [isRegional, setIsRegional] = useState();
  const [isOther, setIsOther] = useState(false);

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
    nama_pasangan: "",
    tgl_lahir_pasangan: "",
    no_telp_pasangan: "",
    no_ktp_pasangan: "",
    no_bpjs_pasangan: "",
    nama_bank_pasangan: "",
    no_rekening_pasangan: "",
    nama_anak: "",
    tgl_lahir_anak: "",
    no_tlp_anak: "",
    no_ktp_anak: "",
    no_bpjs_anak: "",
    nama_bank_anak: "",
    no_rekening_anak: "",
  });

  useEffect(() => {
    setDataForm({ ...dataForm, tgl_lahir: `${isYear}-${isMonth}-${isDate}` });
    // eslint-disable-next-line
  }, [isYear, isMonth, isDate]);

  useEffect(() => {
    setDataForm({
      ...dataForm,
      tgl_lahir_pasangan: `${isYearCouple}-${isMonthCouple}-${isDateCouple}`,
    });
    // eslint-disable-next-line
  }, [isYearCouple, isMonthCouple, isDateCouple]);

  useEffect(() => {
    setDataForm({
      ...dataForm,
      tgl_lahir_anak: `${isYearChild}-${isMonthChild}-${isDateChild}`,
    });
    // eslint-disable-next-line
  }, [isYearChild, isMonthChild, isDateChild]);

  const onFormChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
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
      await axios({
        method: "POST",
        url: `${host}/users/super/pengkinian-data`,
        data: dataForm,
      });
      Swal.fire({
        icon: "success",
        title: "Record data success",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
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

  const handleDateCouple = (selectedOptions) => {
    setIsDateCouple(selectedOptions.selectedKey);
  };
  const handleMonthCouple = (selectedOptions) => {
    setIsMonthCouple(selectedOptions.selectedKey);
  };
  const handleYearCouple = (selectedOptions) => {
    setIsYearCouple(selectedOptions.selectedKey);
  };

  const handleDateChild = (selectedOptions) => {
    setIsDateChild(selectedOptions.selectedKey);
  };
  const handleMonthChild = (selectedOptions) => {
    setIsMonthChild(selectedOptions.selectedKey);
  };
  const handleYearChild = (selectedOptions) => {
    setIsYearChild(selectedOptions.selectedKey);
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
            Update Data
          </p>
          {/* <p style={{ textAlign: "center" }}>
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
          </p> */}
          <p style={{ textAlign: "center" }}>Download Form Pengkinian Data</p>
          <p style={{ textAlign: "center", marginTop: -15 }}>
            <Link to={FormUpdate} target="_blank" download>
              Download
            </Link>
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
              {/* <Col sm="10">
                <Form.Control type="text" placeholder="YYYY-MM-DD" name="tgl_lahir" onChange={onFormChange} />
              </Col> */}
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
                  placeholder="Nama"
                  name="nama_pasangan"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Tanggal Lahir Istri / Suami
              </Form.Label>
              {/* <Col sm="10">
                <Form.Control type="date" name="tgl_lahir_pasangan" onChange={onFormChange} />
              </Col> */}
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Tanggal"
                  options={daySelections}
                  onChange={handleDateCouple}
                />
              </Col>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Bulan"
                  options={monthSelection}
                  onChange={handleMonthCouple}
                />
              </Col>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Tahun"
                  options={yearsSections}
                  onChange={handleYearCouple}
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
                  placeholder="No Telp Rumah"
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
                  placeholder="No KTP"
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
                  placeholder="No BPJS"
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
                  placeholder="Nama Bank"
                  name="nama_bank_pasangan"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="No Rekening"
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
                  placeholder="Nama"
                  name="nama_anak"
                  onChange={onFormChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Tanggal Lahir Anak
              </Form.Label>
              {/* <Col sm="10">
                <Form.Control type="date" name="tgl_lahir_anak" onChange={onFormChange} />
              </Col> */}
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Tanggal"
                  options={daySelections}
                  onChange={handleDateChild}
                />
              </Col>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Bulan"
                  options={monthSelection}
                  onChange={handleMonthChild}
                />
              </Col>
              <Col sm="3">
                <BootstrapSelect
                  placeholder="Tahun"
                  options={yearsSections}
                  onChange={handleYearChild}
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
                  placeholder="No Telp Rumah"
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
                  placeholder="No KTP"
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
                  placeholder="No BPJS"
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
                  placeholder="Nama Bank"
                  name="nama_bank_anak"
                  onChange={onFormChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="No Rekening"
                  name="no_rekening_anak"
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
