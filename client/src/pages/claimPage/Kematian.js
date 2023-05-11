import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
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
    nama_alm: "",
    tgl_meninggal: "",
    permohonan_ahli_waris: "",
    keterangan_menginggal_dunia_lurah: "",
    keterangan_meninggal_dunia_rumah_sakit: "",
    keterangan_kepolisian: "",
    fotokopi_kp: "",
    fotokopi_kk: "",
    fotokopi_sk_pengangkatan: "",
    fotokopi_sk_pensiun: "",
    lampiran: "",
  });
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
        url: `${host}/data/uploads/kematian`,
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
        Pengajuan Claim Kematian
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
              Nama Yang Meninggal <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="Nama Yang Meninggal"
                name="nama_alm"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Tanggal Meninggal <span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="YYYY-MM-DD"
                name="tgl_meninggal"
                onChange={onFormChange}
              />
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.permohonan_ahli_waris !== "" ? true : false}
            />
            <Form.Label>Surat Permohonan dari ahli waris</Form.Label>
            <Form.File.Input
              name="permohonan_ahli_waris"
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={
                formData.keterangan_menginggal_dunia_lurah !== "" ? true : false
              }
            />
            <Form.Label>
              Surat keterangan meninggal dunia dari lurah{" "}
            </Form.Label>
            <Form.File.Input
              name="keterangan_menginggal_dunia_lurah"
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={
                formData.keterangan_meninggal_dunia_rumah_sakit !== ""
                  ? true
                  : false
              }
            />
            <Form.Label>
              Surat keterangan meninggal dari RS apabila peserta meninggal nya
              di Rumah Sakit
            </Form.Label>
            <Form.File.Input
              name="keterangan_meninggal_dunia_rumah_sakit"
              onChange={onFormChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.keterangan_kepolisian !== "" ? true : false}
            />
            <Form.Label>
              Surat Keterangan dari Kepolisian apabila peserta meninggal dunia
              akibat kecelakaan{" "}
            </Form.Label>
            <Form.File.Input
              name="keterangan_kepolisian"
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
              checked={formData.fotokopi_kk !== "" ? true : false}
            />
            <Form.Label>Photo Copy kartu keluarga </Form.Label>
            <Form.File.Input name="fotokopi_kk" onChange={onFormChange} />
          </Form.Group>
          {/* <Form.Group>
            <Form.Check type="checkbox" inline checked={formData.fotokopi_sk_pengangkatan !== '' ? true : false} />
            <Form.Label>Photo Copy SK pengangkatan </Form.Label>
            <Form.File.Input name="fotokopi_sk_pengangkatan" onChange={onFormChange} />
          </Form.Group> */}
          <Form.Group>
            <Form.Check
              type="checkbox"
              inline
              checked={formData.fotokopi_sk_pensiun !== "" ? true : false}
            />
            <Form.Label>Photo Copy Sk.Pensiun </Form.Label>
            <Form.File.Input
              name="fotokopi_sk_pensiun"
              onChange={onFormChange}
            />
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
          <div style={{ marginTop: 10, marginBottom: 50 }}>
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
