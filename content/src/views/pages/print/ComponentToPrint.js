import React from 'react' // useEffect, useState
// import { CCard, CCardBody, CImg } from '@coreui/react'
// import BTN from '../../../assets/images/BTN.png'
import formatRupiah from '../../../utilities/FormatRupiah'
import numberToWords from '../../../utilities/NumberToWords'
import moment from 'moment'
import CIcon from '@coreui/icons-react'

const EmployeePrint = React.forwardRef((props, ref) => {
   // eslint-disable-next-line
   const { dataPrint } = props
   const tanggal_sekarang = new Date()

   const trimChar = (kata, status, char) => {
      let spaceCount = 0
      let countChar = 0
      if (kata.length > char) {
         for (let i = 0; i < char; i++) {
            if (kata[i] === ' ') {
               // eslint-disable-next-line
               spaceCount++
               countChar = i
            }
         }
         if (status === 1) {
            return kata.slice(0, countChar)
         }
         if (status === 2) {
            if (kata.length < char * 2) {
               return kata.slice(countChar, kata.length)
            } else {
               return kata.slice(countChar, char * 2)
            }
         }
      } else {
         if (status === 1) {
            return kata
         }
         if (status === 2) {
            return ''
         }
      }
   }

   return (
      <div className='print-container'>
         <div className='print-page page-break' ref={ref}>
            {dataPrint && dataPrint.template === 'btn' && (
               <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 60 }}>
                     <div style={{ marginLeft: 200 }}>{dataPrint.nama_pengirim}</div>
                     <div style={{ marginRight: 300 }}>{`${tanggal_sekarang.getDate()} - ${tanggal_sekarang.getMonth() + 1} - ${tanggal_sekarang.getFullYear()}`}</div>
                  </div>
                  <div style={{ paddingTop: 195, position: 'relative' }}>
                     <div style={{ position: 'absolute', right: 250 }}>{formatRupiah(dataPrint.amount)}</div>
                  </div>
                  <div style={{ marginTop: 30, marginLeft: 100 }}>{numberToWords(dataPrint.amount) + ` rupiah`}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                     <div style={{ marginLeft: 100 }}>{dataPrint.nama_penerima}</div>
                     <div style={{ marginRight: 300 }}>{dataPrint.rekening_pengirim}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={{ marginLeft: 100, width: '45%' }}>{trimChar(dataPrint.alamat_penerima, 1, 45)}</div>
                     <div style={{ marginRight: 250, width: '55%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={{ marginLeft: 105, width: '45%' }}>{trimChar(dataPrint.alamat_penerima, 2, 45)}</div>
                     <div style={{ width: '45%' }}>YKP3 JATI SEJAHTERA</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={{ marginLeft: 100, width: '45%' }}>{dataPrint.telpon_penerima}</div>
                     <div style={{ width: '45%' }}>D/A WISMA PERHUTANI, JALAN VILLA NO.1</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                     <div style={{ marginLeft: 150, width: '45%' }}>{dataPrint.rekening_penerima}</div>
                     <div style={{ width: '50%' }}>GATOT SUBROTO</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={{ marginLeft: 150, width: '45%' }}>{dataPrint.cabang}</div>
                     <div style={{ width: '50%' }}></div>
                  </div>
                  <div style={{ marginTop: 35, marginLeft: 100 }}>{dataPrint.alamat_pengirim}</div>
                  <div style={{ paddingTop: 65, position: 'relative' }}>
                     <div style={{ position: 'absolute', right: 180 }}>YKP3 JATI SEJAHTERA</div>
                  </div>
               </div>
            )}
            {dataPrint && dataPrint.template === 'bri' && (
               <div>
                  <div style={{ paddingTop: 60, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 450 }}>JAKARTA</div>
                     <div style={{ position: 'absolute', right: 300 }}>{`${tanggal_sekarang.getDate()} - ${moment(tanggal_sekarang).format('MMMM')}`}</div>
                     <div style={{ position: 'absolute', right: 125 }}>{`${moment(tanggal_sekarang).format('YY')}`}</div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 105 }}>
                     <div style={{ marginLeft: 200, width: '45%' }}>{dataPrint.rekening_penerima}</div>
                     <div style={{ width: '45%', display: 'flex' }}>
                        <div>Tunai</div>
                        <div style={{ marginLeft: 120 }}>{formatRupiah(dataPrint.amount)}</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                     <div style={{ marginLeft: 200, width: '45%' }}>{dataPrint.nama_penerima}</div>
                     <div style={{ width: '50%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                     <div style={{ marginLeft: 200, width: '45%' }}>{dataPrint.cabang}</div>
                     <div style={{ width: '50%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                     <div style={{ marginLeft: 130, width: '45%' }}>
                        <CIcon name='cil-check' />
                     </div>
                     <div style={{ width: '50%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                     <div style={{ marginLeft: 200, width: '45%' }}>YKP3 JATI SEJAHTERA</div>
                     <div style={{ width: '50%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                     <div style={{ marginLeft: 200, width: '45%' }}>D/A WISMA PERHUTANI</div>
                     <div style={{ width: '45%', display: 'flex' }}>
                        <div></div>
                        <div style={{ marginLeft: 80 }}>{trimChar(numberToWords(dataPrint.amount), 1, 30)}</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                     <div style={{ marginLeft: 50, width: '45%', display: 'flex' }}>
                        <div>JALAN VILLA NO.1 GATOT SUBROTO</div>
                        <div style={{ marginLeft: 50 }}>{dataPrint.telpon_pengirim}</div>
                     </div>
                     <div style={{ width: '45%' }}>
                        <div style={{ marginLeft: 80 }}>{trimChar(numberToWords(dataPrint.amount), 2, 30)}</div>
                     </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                     <div style={{ marginLeft: 200, width: '45%' }}>TUNAI</div>
                     <div style={{ width: '50%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                     <div style={{ marginLeft: 200, width: '45%' }}>{trimChar(dataPrint.alamat_penerima, 1, 30)}</div>
                     <div style={{ width: '50%' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={{ marginLeft: 50, width: '45%' }}>{trimChar(dataPrint.alamat_penerima, 2, 30)}</div>

                     <div style={{ width: '45%', display: 'flex' }}>
                        <div></div>
                        <div style={{ marginLeft: 120 }}>YKP3 JATI SEJAHTERA</div>
                     </div>
                  </div>
               </div>
            )}
            {dataPrint && dataPrint.template === 'bca' && (
               <div>
                  <div style={{ paddingTop: 80, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 220 }}>{`${tanggal_sekarang.getDate()} - ${moment(tanggal_sekarang).format(
                        'MMMM'
                     )} - ${tanggal_sekarang.getFullYear()}`}</div>
                  </div>
                  <div style={{ paddingTop: 50, position: 'relative' }}>
                     <div style={{ position: 'absolute', right: 480 }}>
                        <CIcon name='cil-check' />
                     </div>
                  </div>
                  <div style={{ marginTop: 10, marginLeft: 100 }}>{dataPrint.rekening_penerima}</div>
                  <div style={{ marginLeft: 100 }}>{dataPrint.nama_penerima}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={{ marginLeft: 100, width: '35%' }}>{trimChar(dataPrint.alamat_penerima, 1, 35)}</div>
                     <div style={{ width: '65%', display: 'flex', justifyContent: 'space-between' }}>
                        <div>TUNAI</div>
                        <div style={{ marginRight: 230 }}>{formatRupiah(dataPrint.amount)}</div>
                     </div>
                  </div>
                  <div style={{ marginLeft: 100 }}>{trimChar(dataPrint.alamat_penerima, 1, 35)}</div>
                  <div style={{ marginLeft: 100 }}></div>
                  <div style={{ marginLeft: 100 }}>YKP3 JATI SEJAHTERA</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={{ marginLeft: 100, width: '35%' }}>D/A WISMA PERHUTANI, JALAN VILLA NO.1</div>
                     <div style={{ width: '65%', display: 'flex', justifyContent: 'space-between' }}>
                        <div></div>
                        <div style={{ marginRight: 230 }}>{formatRupiah(dataPrint.amount)}</div>
                     </div>
                  </div>
                  <div style={{ marginLeft: 100 }}>
                     GATOT SUBROTO<span style={{ marginLeft: 30 }}>{dataPrint.telpon_pengirim}</span>
                  </div>
                  <div style={{ paddingTop: 40, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 220 }}>{trimChar(numberToWords(dataPrint.amount), 1, 40)}</div>
                  </div>
                  <div style={{ paddingTop: 80, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 220 }}>YKP3 JATI SEJAHTERA</div>
                  </div>
               </div>
            )}
            {dataPrint && dataPrint.template === 'bni' && (
               <div>
                  <div style={{ paddingTop: 5, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 200 }}>{`${tanggal_sekarang.getDate()} - ${moment(tanggal_sekarang).format(
                        'MMMM'
                     )} - ${tanggal_sekarang.getFullYear()}`}</div>
                  </div>

                  <div style={{ paddingTop: 180, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 80 }}>{dataPrint.nama_penerima}</div>
                  </div>
                  <div style={{ paddingTop: 20, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 80 }}>{trimChar(dataPrint.alamat_penerima, 1, 30)}</div>
                  </div>
                  <div style={{ paddingTop: 20, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 80 }}>{dataPrint.telpon_penerima}</div>
                  </div>
                  <div style={{ paddingTop: 25, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: -1 }}>
                        {dataPrint.cabang_penerima}
                        <span style={{ marginLeft: 110 }}>INDONESIA</span>
                     </div>
                  </div>
                  <div style={{ paddingTop: 25, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 90 }}>BNI</div>
                  </div>
                  <div style={{ paddingTop: 25, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: -1 }}>
                        {dataPrint.cabang_penerima}
                        <span style={{ marginLeft: 140 }}>INDONESIA</span>
                     </div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 30 }}>{dataPrint.rekening_penerima}</div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 50 }}>
                        <CIcon name='cil-check' />
                     </div>
                     <div style={{ position: 'absolute', right: 500 }}>{formatRupiah(dataPrint.amount)}</div>
                  </div>
                  <div style={{ paddingTop: 40, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 60 }}>YKP3 JATI SEJAHTERA</div>
                  </div>
                  <div style={{ paddingTop: 60, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 1 }}>D/A WISMA PERHUTANI, JALAN VILLA NO.1</div>
                  </div>
                  <div style={{ paddingTop: 20, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 80 }}>{dataPrint.telpon_penerima}</div>
                  </div>
                  <div style={{ paddingTop: 25, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: -1 }}>
                        {dataPrint.cabang_penerima}
                        <span style={{ marginLeft: 110 }}>INDONESIA</span>
                     </div>
                  </div>
                  <div style={{ paddingTop: 45, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 1 }}>{trimChar(dataPrint.alamat_pengirim, 1, 30)}</div>
                     <div style={{ position: 'absolute', right: 450 }}>{numberToWords(dataPrint.amount)} rupiah</div>
                  </div>
                  <div style={{ paddingTop: 150, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 150 }}>YKP3 JATI SEJAHTERA</div>
                  </div>
               </div>
            )}
            {dataPrint && dataPrint.template === 'mandiri' && (
               <div>
                  <div style={{ paddingTop: 65, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 155 }}>{`${tanggal_sekarang.getDate()} - ${moment(tanggal_sekarang).format(
                        'MMMM'
                     )} - ${tanggal_sekarang.getFullYear()}`}</div>
                  </div>
                  <div style={{ paddingTop: 35, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 555 }}>
                        <CIcon name='cil-check' />
                     </div>
                  </div>
                  <div style={{ paddingTop: 60, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 375 }}>
                        <CIcon name='cil-check' />
                     </div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 450 }}>
                        <CIcon name='cil-check' />
                     </div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 333 }}>YKP3 JATI SEJAHTERA</div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 200 }}>D/A WISMA PERHUTANI, JALAN VILLA NO.1</div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 60 }}>
                        <CIcon name='cil-check' />
                     </div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 60 }}>
                        <CIcon name='cil-check' />
                     </div>
                  </div>
                  <div style={{ paddingTop: 1, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 400 }}>{dataPrint.rekening_pengirim}</div>
                  </div>

                  <div style={{ paddingTop: 20, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 70 }}>{dataPrint.nama_penerima}</div>
                  </div>
                  <div style={{ paddingTop: 20, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 70 }}>{dataPrint.rekening_penerima}</div>
                  </div>
                  <div style={{ paddingTop: 20, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 70 }}>MANDIRI</div>
                  </div>
                  <div style={{ paddingTop: 30, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 600 }}>
                        <CIcon name='cil-check' />
                     </div>
                  </div>
                  <div style={{ paddingTop: 20, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 70 }}>{dataPrint.telpon_penerima}</div>
                  </div>
                  <div style={{ paddingTop: 45, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', left: 80 }}>{trimChar(dataPrint.alamat_pengirim, 1, 30)}</div>
                  </div>
                  <div style={{ paddingTop: 40, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 300 }}>{formatRupiah(dataPrint.amount)}</div>
                  </div>
                  <div style={{ paddingTop: 40, position: 'relative', display: 'flex' }}>
                     <div style={{ position: 'absolute', right: 300 }}>{trimChar(numberToWords(dataPrint.amount), 1, 40)}</div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
})

export default EmployeePrint
