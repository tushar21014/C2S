import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPanel from '../Screens/AdminPanel';
import UserHome from '../Screens/UserHome';
import UserPanel from '../Screens/UserPanel';
import Naviagtion from './Naviagtion';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth-Token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {localStorage.getItem('auth-Token') ? (
        <>
          <div>
            <div>
              <Naviagtion />
            </div>
            {localStorage.getItem('admin') ? (
              <>
                <AdminPanel />
              </>
            ) : (
              <>
                <UserHome />
                
              </>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Home;
