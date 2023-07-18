const {Claim, User, Data} = require('../models')
const createErrors = require('http-errors')
const fs = require('fs')
const serverUrl = require('../helpers/serverUrl')
const slaCount = require('../helpers/slaCount')

class ClaimDataControllers {
  static getSingleClaim = async (req, res, next) => {
    try {
      const {id} = req.params
      const result = await Claim.findOne({
        where: {id},
        include: [
          {
            model: User,
            required: false,
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: [
              {
                model: Data,
                required: false,
                attributes: {exclude: ['userId', 'createdAt', 'updatedAt']}
              }
            ]
          }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })

      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static getAllClaim = async (req, res, next) => {
    try {
      let {kategori, status, userId} = req.query
      const {regional} = req.UserData
      let query = {
        where: {},
        include: [
          {
            model: User,
            required: false,
            attributes: {exclude: ['id', 'createdAt', 'updatedAt']},
            include: {
              model: Data,
              required: false,
              attributes: {exclude: ['userId', 'createdAt', 'updatedAt']}
            }
          }
        ],
        order: [['id', 'DESC']],
        attributes: {exclude: ['createdAt', 'updatedAt']}
      }
      if (kategori) {
        query.where.kategori = kategori
      }
      if (status) {
        query.where.status = status
      }

      if (userId) {
        query.where.userId = userId
      }

      const allClaim = await Claim.findAll(query)
      let result = allClaim
      if (regional) {
        const regionalClaim = allClaim.filter((x) => x.User.regional === regional)
        result = regionalClaim
      }
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  static processClaim = async (req, res, next) => {
    try {
      const {id, userId, kategori} = req.body
      const userValidation = await User.findOne({where: {id: userId}})
      if (!userValidation) throw createErrors(401, 'User not found!')
      let queryData = {
        status: 'process',
        updated_date: new Date()
      }
      await Claim.update(queryData, {where: {id}})
      res.status(200).json({
        nama: userValidation.nama,
        msg: `${kategori} process`
      })
    } catch (error) {
      next(error)
    }
  }

  static rejectClaim = async (req, res, next) => {
    try {
      const {id, userId, kategori, pesan} = req.body
      const userValidation = await User.findOne({where: {id: userId}})
      if (!userValidation) throw createErrors(401, 'User not found!')
      let queryData = {
        status: 'reject',
        updated_date: new Date(),
        pesan: pesan,
        sla: 0
      }
      await Claim.update(queryData, {where: {id}})
      res.status(200).json({
        nama: userValidation.nama,
        msg: `${kategori} rejected`
      })
    } catch (error) {
      next(error)
    }
  }

  static approveClaim = async (req, res, next) => {
    try {
      const {id, userId, kategori, nominal} = req.body
      const userValidation = await User.findOne({where: {id: userId}})
      if (!userValidation) throw createErrors(401, 'User not found!')
      const claimValidation = await Claim.findOne({where: {id}})
      let countSLA = await slaCount(claimValidation.created_date)
      let queryData = {
        status: 'approve',
        updated_date: new Date(),
        nominal: nominal,
        sla: countSLA
      }
      if (req.file) queryData.bukti_tf = serverUrl + req.file.path

      await Claim.update(queryData, {where: {id}})
      res.status(200).json({
        nama: userValidation.nama,
        msg: `${kategori} approved`,
        sla: `${countSLA} days`
      })
    } catch (error) {
      next(error)
    }
  }

  static createClaimKacamata = async (req, res, next) => {
    try {
      const {id} = req.UserData
      const {username} = req.params
      const userValidation = await User.findOne({where: {username}})
      if (!userValidation) throw createErrors(401, 'User not found!')
      const userRequester = await User.findOne({where: {id}})
      let queryData = {
        userId: userValidation.id,
        status: 'created',
        kategori: 'claim-kacamata',
        pemohon: userRequester.name,
        created_date: new Date()
      }
      if (req.files['fotokopi_ktp']) queryData.fotokopi_ktp = serverUrl + req.files['fotokopi_ktp'][0].path
      if (req.files['fotokopi_kp']) queryData.fotokopi_kp = serverUrl + req.files['fotokopi_kp'][0].path
      if (req.files['fotokopi_sk_pensiun']) {
        queryData.fotokopi_sk_pensiun = serverUrl + req.files['fotokopi_sk_pensiun'][0].path
      }
      if (req.files['foto_selfie']) queryData.foto_selfie = serverUrl + req.files['foto_selfie'][0].path
      if (req.files['all_in_one']) queryData.all_in_one = serverUrl + req.files['all_in_one'][0].path

      const result = await Claim.create(queryData)
      console.log(result)
      res.status(201).json({
        claim_id: result.id,
        claim_category: 'Claim Kacamata',
        nama: userValidation.nama,
        msg: 'Claim kacamata recorded'
      })
    } catch (error) {
      next(error)
    }
  }

  static createClaimManfaat = async (req, res, next) => {
    try {
      const {id} = req.UserData
      const {username} = req.params
      const userValidation = await User.findOne({where: {username}})
      if (!userValidation) throw createErrors(401, 'User not found!')
      const userRequester = await User.findOne({where: {id}})
      let queryData = {
        userId: userValidation.id,
        status: 'created',
        kategori: 'claim-manfaat',
        pemohon: userRequester.name,
        created_date: new Date()
      }
      if (req.files['permohonan_pensiunan']) {
        queryData.permohonan_pensiunan = serverUrl + req.files['permohonan_pensiunan'][0].path
      }
      if (req.files['pernyataan_dari_pensiunan']) {
        queryData.pernyataan_dari_pensiunan = serverUrl + req.files['pernyataan_dari_pensiunan'][0].path
      }
      if (req.files['fotokopi_kp']) queryData.fotokopi_kp = serverUrl + req.files['fotokopi_kp'][0].path

      if (req.files['fotokopi_sk_pensiun']) {
        queryData.fotokopi_sk_pensiun = serverUrl + req.files['fotokopi_sk_pensiun'][0].path
      }
      if (req.files['foto_selfie']) queryData.foto_selfie = serverUrl + req.files['foto_selfie'][0].path
      if (req.files['all_in_one']) queryData.all_in_one = serverUrl + req.files['all_in_one'][0].path
      const result = await Claim.create(queryData)
      res.status(201).json({
        claim_id: result.id,
        claim_category: 'Claim Manfaat',
        nama: userValidation.nama,
        msg: 'Claim manfaat recorded'
      })
    } catch (error) {
      next(error)
    }
  }

  static createClaimKesehatan = async (req, res, next) => {
    try {
      const {id} = req.UserData
      const {username} = req.params
      const userValidation = await User.findOne({where: {username}})
      if (!userValidation) throw createErrors(401, 'User not found!')
      const userRequester = await User.findOne({where: {id}})
      let queryData = {
        userId: userValidation.id,
        status: 'created',
        kategori: 'claim-kesehatan',
        pemohon: userRequester.name,
        created_date: new Date()
      }
      if (req.files['surat_permohonan_bantuan_biaya']) {
        queryData.surat_permohonan_bantuan_biaya = serverUrl + req.files['surat_permohonan_bantuan_biaya'][0].path
      }
      if (req.files['kuitansi_asli_rs']) {
        queryData.kuitansi_asli_rs = serverUrl + req.files['kuitansi_asli_rs'][0].path
      }
      if (req.files['surat_keterangan_rs'])
        queryData.surat_keterangan_rs = serverUrl + req.files['surat_keterangan_rs'][0].path

      if (req.files['fotokopi_sk_pensiun']) {
        queryData.fotokopi_sk_pensiun = serverUrl + req.files['fotokopi_sk_pensiun'][0].path
      }
      if (req.files['fotokopi_kp']) queryData.fotokopi_kp = serverUrl + req.files['fotokopi_kp'][0].path
      if (req.files['foto_selfie']) queryData.foto_selfie = serverUrl + req.files['foto_selfie'][0].path
      if (req.files['all_in_one']) queryData.all_in_one = serverUrl + req.files['all_in_one'][0].path
      const result = await Claim.create(queryData)
      res.status(201).json({
        claim_id: result.id,
        claim_category: 'Claim Kesehatan',
        nama: userValidation.nama,
        msg: 'Claim kesehatan recorded'
      })
    } catch (error) {
      next(error)
    }
  }

  static createClaimKematian = async (req, res, next) => {
    try {
      const {id} = req.UserData
      const {username} = req.params
      const userValidation = await User.findOne({where: {username}})
      if (!userValidation) throw createErrors(401, 'User not found!')
      const userRequester = await User.findOne({where: {id}})
      let queryData = {
        userId: userValidation.id,
        status: 'created',
        kategori: 'claim-kematian',
        pemohon: userRequester.name,
        created_date: new Date()
      }
      if (req.files['permohonan_ahli_waris']) {
        queryData.permohonan_ahli_waris = serverUrl + req.files['permohonan_ahli_waris'][0].path
      }
      if (req.files['keterangan_meninggal_dunia_lurah']) {
        queryData.keterangan_meninggal_dunia_lurah = serverUrl + req.files['keterangan_meninggal_dunia_lurah'][0].path
      }
      if (req.files['keterangan_meninggal_dunia_rumah_sakit']) {
        queryData.keterangan_meninggal_dunia_rumah_sakit =
          serverUrl + req.files['keterangan_meninggal_dunia_rumah_sakit'][0].path
      }
      if (req.files['keterangan_kepolisian']) {
        queryData.keterangan_kepolisian = serverUrl + req.files['keterangan_kepolisian'][0].path
      }
      if (req.files['fotokopi_kp']) queryData.fotokopi_kp = serverUrl + req.files['fotokopi_kp'][0].path
      if (req.files['fotokopi_kk']) queryData.fotokopi_kk = serverUrl + req.files['fotokopi_kk'][0].path
      if (req.files['fotokopi_sk_pengangkatan']) {
        queryData.fotokopi_sk_pengangkatan = serverUrl + req.files['fotokopi_sk_pengangkatan'][0].path
      }
      if (req.files['fotokopi_sk_pensiun']) {
        queryData.fotokopi_sk_pensiun = serverUrl + req.files['fotokopi_sk_pensiun'][0].path
      }
      if (req.files['foto_selfie']) queryData.foto_selfie = serverUrl + req.files['foto_selfie'][0].path
      if (req.files['all_in_one']) queryData.all_in_one = serverUrl + req.files['all_in_one'][0].path
      const result = await Claim.create(queryData)
      res.status(201).json({
        claim_id: result.id,
        claim_category: 'Claim Kematian',
        nama: userValidation.nama,
        msg: 'Claim kematian recorded'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ClaimDataControllers
