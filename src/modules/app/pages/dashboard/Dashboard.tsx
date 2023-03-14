import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { dashboardData } from '../../services/dasboard-data.service';
import useFetchAndLoad from '../../../../hooks/useFetch';
import { useAsync } from '../../../../hooks/useAsync';
import { useNavigate } from 'react-router-dom';
import { PrivateRoutes } from '../../../../models';

const Dashboard = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const getApiData = async () => await callEndpoint(dashboardData());
  const [data, setdata] = useState<any>(null);
  const navigate = useNavigate();

  useAsync(
    getApiData,
    (data: any) => setdata(data.data),
    () => {}
  );

  const handleClick = async () => {
    navigate('login');
  };

  if (loading) {
    return (
      <button type="submit" onClick={() => handleClick()}>
        renew
      </button>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-options">
        <div className="option-card" onClick={() => navigate(PrivateRoutes.CONTACTS)}>
          <div className="option-icon">
            <i className="fa-solid fa-address-book"></i>
          </div>
          <h2 className="option-quantity">{data?.contacts}</h2>
          <p className="option-type">contacts</p>
        </div>

        <div className="option-card" onClick={() => navigate(PrivateRoutes.ROOMS)}>
          <div className="option-icon">
            <i className="fa-solid fa-user-group"></i>
          </div>
          <h2 className="option-quantity">{data?.rooms}</h2>
          <p className="option-type">rooms</p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard