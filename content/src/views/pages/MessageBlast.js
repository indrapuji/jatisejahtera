import React, {useEffect, useState} from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CInput,
  CFormGroup,
  CForm,
  CLabel,
  CCardFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTextarea,
  CInputRadio,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import {useHistory} from 'react-router-dom'
// import axios from 'axios'
// import HostUrl from 'src/utilities/HostUrl'
import newAlert from 'src/components/NewAlert'

const AddAdmin = () => {
  // const [formData, setFormData] = useState({
  //   pesan: '',
  //   username: '',
  //   password: '',
  //   role: '',
  //   regional: ''
  // })
  const [radioStatus, setRadioStatus] = useState()
  const [showInput, setShowInput] = useState(false)
  const [phone, setPhone] = useState([])
  const [newPhone, setNewPhone] = useState()

  useEffect(() => {
    if (radioStatus === '2') {
      setShowInput(true)
    } else {
      setShowInput(false)
    }
  }, [radioStatus])

  // const history = useHistory()
  const onChangeForm = (event) => {
    const {value} = event.target
    setRadioStatus(value)
  }

  const onaddForm = (event) => {
    const {value} = event.target
    setNewPhone(value)
  }

  // const onFormChange = (event) => {
  //   const {name, value} = event.target
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   })
  // }
  const submitForm = async (e) => {
    e.preventDefault()
    setPhone([])
    newAlert({status: 'success', message: 'terkirim'})
  }

  const addPhone = () => {
    setPhone((oldArray) => [...oldArray, newPhone])
    setNewPhone('')
  }
  return (
    <CContainer>
      <CRow className='justify-content-center'>
        <CCol xs='12' md='12'>
          <CCard>
            <CCardHeader>
              <strong>WhatsApp Blast</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={submitForm}>
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel>
                      <small>Penerima</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CFormGroup variant='custom-radio' inline>
                      <CInputRadio
                        custom
                        id='inline-radio1'
                        name='inline-radios'
                        defaultChecked
                        value='1'
                        onChange={onChangeForm}
                      />
                      <CLabel variant='custom-checkbox' htmlFor='inline-radio1'>
                        All
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant='custom-radio' inline>
                      <CInputRadio custom id='inline-radio2' name='inline-radios' value='2' onChange={onChangeForm} />
                      <CLabel variant='custom-checkbox' htmlFor='inline-radio2'>
                        Custom
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                {showInput && (
                  <CFormGroup row>
                    <CCol md='3'>
                      <CLabel htmlFor='text-input'>
                        <small>Nomor Telepon Penerima</small>
                      </CLabel>
                    </CCol>
                    <CCol md='8'>
                      <CInput custom size='sm' value={newPhone} onChange={onaddForm} />
                    </CCol>
                    <CCol md='1'>
                      <CButton size='sm' color='primary' onClick={() => addPhone()}>
                        Add
                      </CButton>
                    </CCol>
                  </CFormGroup>
                )}
                <CFormGroup row>
                  <CCol md='3'>
                    <CLabel htmlFor='text-input'>
                      <small>Pesan</small>
                    </CLabel>
                  </CCol>
                  <CCol md='9'>
                    <CTextarea
                      placeholder='Pesan'
                      id='floatingTextarea2'
                      floatingLabel='Comments'
                      style={{height: '100px'}}
                    ></CTextarea>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md='3'></CCol>
                  <CCol md='9'>
                    {phone.map((item, index) => (
                      <CBadge key={index} style={{marginLeft: 5}} color='success'>
                        {item}
                      </CBadge>
                    ))}
                  </CCol>
                </CFormGroup>

                <CCardFooter>
                  <CButton type='submit' size='sm' color='primary' className='float-right' onClick={submitForm}>
                    <CIcon name='cil-scrubber' /> Kirim
                  </CButton>
                </CCardFooter>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddAdmin
