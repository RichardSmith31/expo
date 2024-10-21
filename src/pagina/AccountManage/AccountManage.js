import React, { useEffect, useState } from 'react';
import './AccountManage.css';
import AccountDetails from '../../componentes/AccountDetails/AccountDetails';
import OrderHistory from '../../componentes/OrderHistory/OrderHistory';
import HeaderManagement from '../../componentes/HeaderManagement/HeaderManagement';
import SideBarNavigation from '../../componentes/SideBarNavigation/SideBarNavigation';
import { useAuth } from '../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const AccountManage = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [notification, setNotification] = useState('');
  const [activeSection, setActiveSection] = useState('Inicio');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/Login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return null;
  }

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setNotification('¡Cambios guardados con éxito!');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Inicio':
        return (
          <div>
            <h2>Bienvenido, {user?.name}</h2>
            {notification && <div className="notification">{notification}</div>}
            <AccountDetails />
          </div>
        );
      case 'Reportes':
        return (
          <div>
            <OrderHistory />
          </div>
        );
      case 'Configuración':
        return (
          <div>
            <h2>Configuración</h2>
            <button onClick={logout} className="logout-button">Cerrar Sesión</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='account-manage__container'>
      <HeaderManagement />
      <div className='side-bar'>
        <SideBarNavigation setActiveSection={setActiveSection} />
      </div>
      <div className='main-content'>
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountManage;
