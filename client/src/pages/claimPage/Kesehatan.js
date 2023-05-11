import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Form, Container, Col, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import SignatureCanvas from "react-signature-canvas";
import host from "../../hooks/host";

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
  function handdleBack() {
    history.push("/");
  }
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    tgl_lahir: "",
    no_induk: "",
    satuan_kerja: "",
    golongan_pangkat: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    kodepos: "",
    provinsi: "",
    no_telp: "",
    kota_pensiun: "",
    pasien: "",
    status_rawat: "",
    rumah_sakit: "",
    sakit: "",
    nama_dokter: "",
    tgl_masuk: "",
    surat_permohonan_bantuan_biaya: "",
    kuitansi_asli_rs: "",
    surat_keterangan_rs: "",
    fotokopi_sk_pensiun: "",
    fotokopi_kp: "",
    lampiran: "",
  });
  console.log(formData.tgl_lahir);
  const onFormChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  const onFormSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const newFormData = new FormData();
      for (let keys in formData) {
        newFormData.append(`${keys}`, formData[keys]);
      }
      await axios({
        method: "POST",
        url: `${host}/data/uploads/kesehatan`,
        data: newFormData,
        headers: {
          token: localStorage.token,
        },
      });
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Pengajuan Claim success",
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
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        html: `${msg}`,
      });
    }
  };

  let sigPad = {};

  const clear = () => {
    sigPad.clear();
  };
  return (
    <motion.div
      initial="init"
      animate="in"
      exit="out"
      variants={pageTransition}
      style={{ marginBottom: 20 }}
    >
      <h1 style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}>
        Pengajuan Bantuan Rawat Inap
      </h1>
      <Container>
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
              Tanggal Lahir <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="date"
                placeholder="YYYY-MM-DD"
                name="tgl_lahir"
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
              Satuan Kerja <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col xs={5}>
              <Form.Control
                placeholder="Satuan Kerja Saat Pensiun"
                name="satuan_kerja"
                onChange={onFormChange}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Golongan Pangkat Saat Pensiun"
                name="golongan_pangkat"
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
              Kota Tempat Pensiun <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Kota Tempat Pensiun"
                name="kota_pensiun"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Nama yang dirawat <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Pasien"
                name="pasien"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Status yang dirawat (Peg/Istri/Suami/Anak){" "}
              <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Status Rawat"
                name="status_rawat"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Dirawat dirumah sakit <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Nama Rumah Sakit"
                name="rumah_sakit"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Untuk Perawatan <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Nama Perawatan"
                name="sakit"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Atas Permintaan dokter <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Nama Dokter"
                name="nama_dokter"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Tgl. Masuk Rumah Sakit <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="YYYY-MM-DD"
                name="tgl_masuk"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={
                formData.surat_permohonan_bantuan_biaya !== "" ? true : false
              }
            />
            <Form.Label>
              Surat permohonan bantuan biaya rawat inap dari pensiunan
            </Form.Label>
            <Form.File.Input
              name="surat_permohonan_bantuan_biaya"
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.kuitansi_asli_rs !== "" ? true : false}
            />
            <Form.Label>
              Kuitansi asli dari Rumah Sakit pensiunan di rawat{" "}
            </Form.Label>
            <Form.File.Input name="kuitansi_asli_rs" onChange={onFormChange} />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.surat_keterangan_rs !== "" ? true : false}
            />
            <Form.Label>
              Surat keterangan sakit yang di tanda tangani oleh rumah sakit
            </Form.Label>
            <Form.File.Input
              name="surat_keterangan_rs"
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.fotokopi_sk_pensiun !== "" ? true : false}
            />
            <Form.Label>Photo Copy SK Pensiun </Form.Label>
            <Form.File.Input
              name="fotokopi_sk_pensiun"
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.fotokopi_kp !== "" ? true : false}
            />
            <Form.Label>Photo copy kartu peserta </Form.Label>
            <Form.File.Input name="fotokopi_kp" onChange={onFormChange} />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.lampiran !== "" ? true : false}
            />
            <Form.Label>Foto selfie dangan memegang KTP</Form.Label>
            <Form.File.Input name="lampiran" onChange={onFormChange} />
          </Form.Group>
          <div style={{ marginTop: 10, marginBottom: 10 }}>
            <p>Tanda tangan</p>
            <div
              style={{
                backgroundColor: "white",
                width: 500,
                height: 200,
                borderWidth: 1,
                borderStyle: "solid",
              }}
            >
              <SignatureCanvas
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                  top: 5,
                  left: 20,
                }}
                ref={(ref) => {
                  sigPad = ref;
                }}
              />
            </div>
          </div>
          <Button variant="success" onClick={handdleBack} block>
            Back
          </Button>
          {loading ? (
            <Button variant="primary" block>
              <Spinner animation="border" size="sm" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Button>
          ) : (
            <>
              <Button variant="warning" type="reset" block onClick={clear}>
                Reset
              </Button>
              <Button variant="primary" type="submit" block>
                Submit
              </Button>
            </>
          )}
        </Form>
      </Container>
    </motion.div>
  );
};
