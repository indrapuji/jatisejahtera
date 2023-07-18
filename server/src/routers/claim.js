const router = require('express').Router()
const ClaimControllers = require('../controllers/ClaimControllers')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')
const multer = require('multer')
const storage = require('../helpers/multer')

const upload = multer({storage: storage})

router.get('/single/:id', Authentication, ClaimControllers.getSingleClaim)
router.get('/', Authentication, ClaimControllers.getAllClaim)

router.post('/process', Authentication, ClaimControllers.processClaim)
router.post('/approve', Authentication, upload.single('bukti_tf'), ClaimControllers.approveClaim)
router.post('/reject', Authentication, ClaimControllers.rejectClaim)

router.post(
  '/kacamata/:username',
  Authentication,
  upload.fields([
    {name: 'fotokopi_ktp', maxCount: 1},
    {name: 'fotokopi_kp', maxCount: 1},
    {name: 'fotokopi_sk_pensiun', maxCount: 1},
    {name: 'foto_selfie', maxCount: 1},
    {name: 'all_in_one', maxCount: 1}
  ]),
  ClaimControllers.createClaimKacamata
)

router.post(
  '/manfaat/:username',
  Authentication,
  upload.fields([
    {name: 'permohonan_pensiunan', maxCount: 1},
    {name: 'pernyataan_dari_pensiunan', maxCount: 1},
    {name: 'fotokopi_kp', maxCount: 1},
    {name: 'fotokopi_sk_pensiun', maxCount: 1},
    {name: 'foto_selfie', maxCount: 1},
    {name: 'all_in_one', maxCount: 1}
  ]),
  ClaimControllers.createClaimManfaat
)

router.post(
  '/kesehatan/:username',
  Authentication,
  upload.fields([
    {name: 'surat_permohonan_bantuan_biaya', maxCount: 1},
    {name: 'kuitansi_asli_rs', maxCount: 1},
    {name: 'surat_keterangan_rs', maxCount: 1},
    {name: 'fotokopi_sk_pensiun', maxCount: 1},
    {name: 'fotokopi_kp', maxCount: 1},
    {name: 'foto_selfie', maxCount: 1},
    {name: 'all_in_one', maxCount: 1}
  ]),
  ClaimControllers.createClaimKesehatan
)

router.post(
  '/kematian/:username',
  Authentication,
  upload.fields([
    {name: 'permohonan_ahli_waris', maxCount: 1},
    {name: 'keterangan_meninggal_dunia_lurah', maxCount: 1},
    {name: 'keterangan_meninggal_dunia_rumah_sakit', maxCount: 1},
    {name: 'keterangan_kepolisian', maxCount: 1},
    {name: 'fotokopi_kk', maxCount: 1},
    {name: 'fotokopi_sk_pengangkatan', maxCount: 1},
    {name: 'fotokopi_sk_pensiun', maxCount: 1},
    {name: 'fotokopi_kp', maxCount: 1},
    {name: 'foto_selfie', maxCount: 1},
    {name: 'all_in_one', maxCount: 1}
  ]),
  ClaimControllers.createClaimKematian
)

module.exports = router
