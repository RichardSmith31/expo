import React, { useState, useEffect } from 'react';
import './AccountManage.css';
import AccountDetails from '../../componentes/AccountDetails/AccountDetails';
import { useAuth } from '../../context/AuthContext/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import HeaderManagement from '../../componentes/HeaderManagement/HeaderManagement';
import SideBarNavigation from '../../componentes/SideBarNavigation/SideBarNavigation';
import axios from 'axios'; // Importar axios para las llamadas API

const AccountManage = () => {
  const { user, loading, handleLogout } = useAuth(); 
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Inicio');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

  const handlePasswordVerification = async () => {
    try {
      // Llamada a tu API para verificar la contraseña
      const response = await axios.post('http://localhost:3001/usuarios', {
        userId: user.id, // Suponiendo que tienes un id del usuario
        password: password
      });

      if (response.data.success) {
        // Si la contraseña es correcta
        setIsPasswordVerified(true);
        setError('');
      } else {
        // Si la contraseña es incorrecta
        setError('Contraseña incorrecta. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error("Error al verificar la contraseña:", error);
      setError('Hubo un problema al verificar tu contraseña.');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Inicio':
        return (
          <div>
            <h2>Bienvenido, {user?.name}</h2>
            {!isPasswordVerified ? (
              <div className="password-verification">
                <p>Para editar tus datos, verifica tu contraseña:</p>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handlePasswordVerification}>Verificar</button>
                {error && <p className="error-message">{error}</p>}
              </div>
            ) : (
              <div className="editable-data">
                <h3>Edita tus datos personales:</h3>
                {/* Aquí puedes incluir un formulario con campos editables para los datos personales */}
                <AccountDetails />
              </div>
            )}
          </div>
        );
      case 'Configuración':
        return (
          <div>
            <h2>Configuración</h2>
            <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='account-manage__container'>
      <HeaderManagement />
      <SideBarNavigation setActiveSection={setActiveSection} />
      <div className='main-content'>
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountManage;
