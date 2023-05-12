const {User, Claim, Data} = require('../models');

class CountControllers {
  static userCount = async (req, res, next) => {
    try {
      const {role, regional} = req.UserData;
      let query = {
        where: {role: 'member'},
      };
      if (role === 'admin') {
        query.where.regional = regional;
      }
      const countUser = await User.count(query);
      let dataQuery = {
        where: {},
      };
      if (role === 'admin') {
        dataQuery.where.satuan_kerja = regional;
      }
      const dataCount = await Data.count(dataQuery);

      const kapusCount = await User.count({
        where: {role: 'member', regional: 'kantor-pusat'},
      });
      const jabarCount = await User.count({
        where: {role: 'member', regional: 'jawa-barat'},
      });
      const jatengCount = await User.count({
        where: {role: 'member', regional: 'jawa-tengah'},
      });
      const jatimCount = await User.count({
        where: {role: 'member', regional: 'jawa-timur'},
      });

      const countClaim = await Claim.count();
      const createdCount = await Claim.count({
        where: {status: 'created'},
      });
      const approveCount = await Claim.count({
        where: {status: 'approve'},
      });
      const rejectCount = await Claim.count({
        where: {status: 'reject'},
      });

      res.status(200).json({
        total_user_register: countUser,
        total_user_claim: countClaim,
        total_user_regional: {
          kantor_pusat: kapusCount,
          jawa_barat: jabarCount,
          jawa_tengah: jatengCount,
          jawa_timur: jatimCount,
        },
        total_claim_status: {
          created: createdCount,
          approve: approveCount,
          reject: rejectCount,
        },
        total_user_update: {
          updated: dataCount,
          not_update: countUser - dataCount,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = CountControllers;
