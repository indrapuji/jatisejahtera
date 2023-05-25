import React, {useEffect, useState} from 'react';
import WidgetsDropdown from './WidgetsDropdown';
import WidgetsUserDropdown from './WidgetsUserDropdown';
import WidgetsClaimDropdown from './WidgetsClaimDropdown';
import WidgetsCard from './WidgetsCard';
import DashboardWidget from './DashboardWidget';
import axios from 'axios';
import HostUrl from '../../utilities/HostUrl';
import {DashboardCount, ClaimCount} from '../../utilities/DashboardCount';

const Dashboard = () => {
  const [cardData, setCardData] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [countUser, setCountUser] = useState({
    registered: 0,
    updated: 0,
    not_update: 0,
    kantorPusat: 0,
    jawaBarat: 0,
    jawaTengah: 0,
    jawaTimur: 0,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const {data} = await axios({
        method: 'GET',
        url: HostUrl + '/content',
      });
      setCardData(DashboardCount(data));
      const countUser = await axios({
        method: 'GET',
        url: HostUrl + '/dashboard/member-count',
        headers: {
          token: localStorage.token,
        },
      });

      setCountUser({
        registered: countUser.data.total_user_register,
        updated: countUser.data.total_user_update.updated,
        not_update: countUser.data.total_user_update.not_update,
        kantorPusat: countUser.data.total_user_regional.kantor_pusat,
        jawaBarat: countUser.data.total_user_regional.jawa_barat,
        jawaTengah: countUser.data.total_user_regional.jawa_tengah,
        jawaTimur: countUser.data.total_user_regional.jawa_timur,
      });

      console.log('==>', countUser.data.total_user_regional);
      console.log(ClaimCount(countUser.data));
      setUserCount(ClaimCount(countUser.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 style={{textAlign: 'center', marginBottom: 50}}>Dashboard</h1>

      {localStorage.role === 'admin' && (
        <>
          <h3>User Count</h3>
          <div style={{marginBottom: 50}}>
            <WidgetsUserDropdown data={userCount.dataUser} />
          </div>
        </>
      )}
      {localStorage.role === 'super-admin' && (
        <>
          <DashboardWidget data={countUser} />
          <WidgetsClaimDropdown data={userCount.dataClaim} />
          <h3>Web content</h3>
          <WidgetsDropdown data={cardData.dataDropdown} />
          <WidgetsCard data={cardData.dataCard} />
        </>
      )}
    </>
  );
};

export default Dashboard;
