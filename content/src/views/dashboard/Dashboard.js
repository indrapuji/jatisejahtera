import React, {useEffect, useState} from 'react';
import WidgetsDropdown from './WidgetsDropdown';
import WidgetsUserDropdown from './WidgetsUserDropdown';
import WidgetsClaimDropdown from './WidgetsClaimDropdown';
import WidgetsRegionalCard from './WidgetsRegionalCard';
import WidgetsCard from './WidgetsCard';
import axios from 'axios';
import HostUrl from '../../utilities/HostUrl';
import {DashboardCount, ClaimCount} from '../../utilities/DashboardCount';

const Dashboard = () => {
  const [cardData, setCardData] = useState([]);
  const [userCount, setUserCount] = useState([]);

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
      console.log(ClaimCount(countUser.data));
      setUserCount(ClaimCount(countUser.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 style={{textAlign: 'center', marginBottom: 50}}>Dashboard</h1>
      <h3>User Count</h3>
      <div style={{marginBottom: 50}}>
        <WidgetsUserDropdown data={userCount.dataUser} />
        {localStorage.role === 'super-admin' && (
          <>
            <WidgetsRegionalCard data={userCount.dataRegional} />
            <WidgetsClaimDropdown data={userCount.dataClaim} />
          </>
        )}
      </div>
      {localStorage.role === 'super-admin' && (
        <>
          <h3>Web content</h3>
          <WidgetsDropdown data={cardData.dataDropdown} />
          <WidgetsCard data={cardData.dataCard} />
        </>
      )}
    </>
  );
};

export default Dashboard;
