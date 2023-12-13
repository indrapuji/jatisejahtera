import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardFooter,
  CInput,
  CLabel,
  CContainer,
  CFormGroup,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import HostUrl from '../../../utilities/HostUrl'
import filesImg from '../../../assets/images/png-file.png'
import filesSuccessImg from '../../../assets/images/png-file-success.png'
import changeAttributes from 'src/utilities/ChangeAttributes'
import {decrypt, encrypt} from 'src/utilities/RandomLink'
import Swal from 'sweetalert2'
import NewAlert from 'src/components/NewAlert'

const DetailPeserta = () => {
  const {idClaim} = useParams()
  const history = useHistory()
  const [peserta, setPeserta] = useState([])
  const [role, setRole] = useState('admin')

  useEffect(() => {
    getDetail()
    setRole(localStorage.role)
    // eslint-disable-next-line
  }, [idClaim])
  const getDetail = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: `${HostUrl}/claim/single/${decrypt(idClaim)}`,
        headers: {
          token: localStorage.token
        }
      })

      console.log(changeAttributes(data))
      setPeserta(changeAttributes(data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleBack = () => {
    history.goBack()
  }

  const handleProcess = async (claimId, userId, kategoriClaim) => {
    try {
      await axios({
        method: 'POST',
        url: `${HostUrl}/claim/process`,
        data: {
          id: claimId,
          userId: userId,
          kategori: kategoriClaim
        },
        headers: {
          token: localStorage.token
        }
      })
      NewAlert({status: 'success', message: 'Claim Diproses'})
      history.push('/data/claim-request')
    } catch (error) {
      const {msg} = error.response.data
      NewAlert({status: 'error', message: msg})
    }
  }

  const handleReject = async (claimId, userId, kategoriClaim) => {
    await Swal.fire({
      title: 'Alasan',
      input: 'select',
      inputOptions: {
        'Mengajukan 2 klaim disaat bersamaan': 'Mengajukan 2 klaim disaat bersamaan',
        'Lampiran tidak ada atau tidak lengkap': 'Lampiran tidak ada atau tidak lengkap',
        'Pernah mengajukan klaim sebelumnya': 'Pernah mengajukan klaim sebelumnya',
        'Masa pertanggungan telah berakhir': 'Masa pertanggungan telah berakhir'
      },
      inputPlaceholder: 'Pilih Alasan',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve()
            try {
              axios({
                method: 'POST',
                url: `${HostUrl}/claim/reject`,
                data: {
                  id: claimId,
                  userId: userId,
                  kategori: kategoriClaim,
                  pesan: value
                },
                headers: {
                  token: localStorage.token
                }
              })
              NewAlert({status: 'success', message: 'Claim Ditolak'})
              history.push('/data/claim')
            } catch (error) {
              console.log(error)
            }
          }
        })
      }
    })
  }
  const handleApprove = (claimId, userId, kategoriClaim) => {
    history.push(`/approve/lampiran/${claimId}/${userId}/${encrypt(kategoriClaim)}`)
  }

  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          {peserta && (
            <CCard>
              <CCardHeader>
                <div>
                  <span style={{fontSize: 20, fontWeight: 'bold'}}>Data Peserta Pengajuan</span>
                </div>
              </CCardHeader>
              <CCardBody>
                <div style={{marginBottom: 20}}>
                  <strong>Data Diri</strong>
                </div>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Nama</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.name} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Nomor Induk</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.nip} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Email</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.email} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Tanggal Lahir</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.tgl_lahir} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No KTP</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_ktp} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No BPJS</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_bpjs} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Data Bank</CLabel>
                  </CCol>
                  <CCol md='3'>
                    <CInput size='sm' value={peserta.nama_bank} disabled />
                  </CCol>
                  <CCol md='6'>
                    <CInput size='sm' value={peserta.no_rekening} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Satuan Kerja</CLabel>
                  </CCol>
                  <CCol md='4'>
                    <CInput size='sm' value={peserta.satuan_kerja} disabled />
                  </CCol>
                  <CCol md='5'>
                    <CInput size='sm' value={peserta.golongan_pangkat} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No Telp Rumah</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_telp} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Alamat</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.alamat} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3' />
                  <CCol md='4'>
                    <CInput size='sm' value={peserta.kelurahan} disabled />
                  </CCol>
                  <CCol md='5'>
                    <CInput size='sm' value={peserta.kecamatan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3' />
                  <CCol md='3'>
                    <CInput size='sm' value={peserta.kota} disabled />
                  </CCol>
                  <CCol md='3'>
                    <CInput size='sm' value={peserta.kodepos} disabled />
                  </CCol>
                  <CCol md='3'>
                    <CInput size='sm' value={peserta.provinsi} disabled />
                  </CCol>
                </CFormGroup>
                <div style={{marginBottom: 20, marginTop: 30}}>
                  <strong>Data Pendukung 1</strong>
                </div>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Nama Istri / Suami</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.nama_pasangan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Tanggal Lahir Istri / Suami</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.tgl_lahir_pasangan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No Telp Istri / Suami</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_telp_pasangan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No KTP Istri / Suami</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_ktp_pasangan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No BPJS Istri / Suami</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_bpjs_pasangan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Data Bank Istri / Suami</CLabel>
                  </CCol>
                  <CCol md='3'>
                    <CInput size='sm' value={peserta.nama_bank_pasangan} disabled />
                  </CCol>
                  <CCol md='6'>
                    <CInput size='sm' value={peserta.no_rekening_pasangan} disabled />
                  </CCol>
                </CFormGroup>
                <div style={{marginBottom: 20, marginTop: 30}}>
                  <strong>Data Pendukung 2</strong>
                </div>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Nama Anak</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.nama_anak} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Tanggal Lahir Anak</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.tgl_lahir_anak} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No Telp Anak</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_tlp_anak} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No KTP Anak</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_ktp_anak} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>No BPJS Anak</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CInput size='sm' value={peserta.no_bpjs_anak} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Data Bank Anak</CLabel>
                  </CCol>
                  <CCol md='3'>
                    <CInput size='sm' value={peserta.nama_bank_anak} disabled />
                  </CCol>
                  <CCol md='6'>
                    <CInput size='sm' value={peserta.no_rekening_anak} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>Data Pendukung</CLabel>
                  </CCol>
                  <CCol md='9'>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {peserta.fotokopi_kk && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.fotokopi_kk} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Kartu Keluarga</div>
                        </div>
                      )}
                      {peserta.fotokopi_kp && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.fotokopi_kp} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Kartu Peserta</div>
                        </div>
                      )}
                      {peserta.fotokopi_sk_pensiun && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.fotokopi_sk_pensiun} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>SK Pensiun</div>
                        </div>
                      )}
                      {peserta.keterangan_kepolisian && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.keterangan_kepolisian} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Surat Kepolisian</div>
                        </div>
                      )}
                      {peserta.keterangan_menginggal_dunia_lurah && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.keterangan_menginggal_dunia_lurah} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>SK Lurah</div>
                        </div>
                      )}
                      {peserta.keterangan_meninggal_dunia_rumah_sakit && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a
                            href={peserta.keterangan_meninggal_dunia_rumah_sakit}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>SK Rumah Sakit</div>
                        </div>
                      )}
                      {peserta.fotokopi_ktp && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.fotokopi_ktp} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>KTP</div>
                        </div>
                      )}
                      {peserta.permohonan_ahli_waris && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.permohonan_ahli_waris} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Surat Ahli Waris</div>
                        </div>
                      )}
                      {peserta.permohonan_pensiunan && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.permohonan_pensiunan} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Surat Permohonan Pensiunan</div>
                        </div>
                      )}
                      {peserta.pernyataan_dari_pensiunan && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.pernyataan_dari_pensiunan} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>
                            Surat Pernyataan Pensiunan dari Perhutani
                          </div>
                        </div>
                      )}
                      {peserta.kuitansi_asli_rs && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.kuitansi_asli_rs} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Kuitansi Asli RS</div>
                        </div>
                      )}
                      {peserta.surat_keterangan_rs && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.surat_keterangan_rs} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Surat Keterangan Sakit dari RS</div>
                        </div>
                      )}
                      {peserta.surat_permohonan_bantuan_biaya && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.surat_permohonan_bantuan_biaya} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Surat Permohonan Bantuan Biaya</div>
                        </div>
                      )}
                      {peserta.foto_selfie && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.foto_selfie} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>Foto Selfie</div>
                        </div>
                      )}
                      {peserta.all_in_one && (
                        <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                          <a href={peserta.all_in_one} target='_blank' rel='noopener noreferrer'>
                            <CImg src={filesImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                          </a>
                          <div style={{textAlign: 'center', fontWeight: 'bold'}}>All in One</div>
                        </div>
                      )}
                    </div>
                  </CCol>
                </CFormGroup>
                {peserta.lampiran && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel>Bukti Lampiran</CLabel>
                    </CCol>
                    <CCol md='9'>
                      <div style={{width: 180, height: 230, marginRight: 10, marginTop: 10, cursor: 'pointer'}}>
                        <a href={peserta.lampiran} target='_blank' rel='noopener noreferrer'>
                          <CImg src={filesSuccessImg} style={{width: 180, height: 180, objectFit: 'contain'}} />
                        </a>
                        <div style={{textAlign: 'center', fontWeight: 'bold'}}>Lampiran</div>
                      </div>
                    </CCol>
                  </CFormGroup>
                )}
                {peserta.pesan && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel>Pesan</CLabel>
                    </CCol>
                    <CCol md='9'>
                      <CInput size='sm' value={peserta.pesan} disabled />
                    </CCol>
                  </CFormGroup>
                )}
              </CCardBody>
              <CCardFooter style={{display: 'flex', justifyContent: 'space-between'}}>
                <CButton size='sm' color='primary' onClick={handleBack}>
                  <CIcon name='cil-ChevronLeft' /> Kembali
                </CButton>
                {role === 'super-admin' && peserta.status === 'created' && (
                  <div>
                    <CButton
                      style={{marginLeft: 10}}
                      size='sm'
                      color='success'
                      onClick={() => handleProcess(peserta.id, peserta.userId, peserta.kategori)}
                    >
                      <CIcon name='cil-Check' /> Proses
                    </CButton>
                  </div>
                )}
                {role === 'super-admin' && peserta.status === 'process' && (
                  <div>
                    <CButton
                      size='sm'
                      color='danger'
                      onClick={() => handleReject(peserta.id, peserta.userId, peserta.kategori)}
                    >
                      <CIcon name='cil-x' /> Reject
                    </CButton>
                    <CButton
                      style={{marginLeft: 10}}
                      size='sm'
                      color='success'
                      onClick={() => handleApprove(peserta.id, peserta.userId, peserta.kategori)}
                    >
                      <CIcon name='cil-Check' /> Approve
                    </CButton>
                  </div>
                )}
              </CCardFooter>
            </CCard>
          )}
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default DetailPeserta
