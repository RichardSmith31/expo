import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SideBarNavigation.css';
import homeSelected from '../../assets/icons/home-selected.png';
import homeUnselected from '../../assets/icons/home-unselected.png';
import soldSelected from '../../assets/icons/solds-selected.png';
import soldUnselected from '../../assets/icons/solds-unselected.png';
import productSelected from '../../assets/icons/products-selected.png';
import productUnselected from '../../assets/icons/products-unselected.png';
import userSelected from '../../assets/icons/users-selected.png';
import userUnselected from '../../assets/icons/users-unselected.png';
import reportSelected from '../../assets/icons/reports-selected.png';
import reportUnselected from '../../assets/icons/reports-unselected.png';
import settingSelected from '../../assets/icons/settings-selected.png';
import settingUnselected from '../../assets/icons/settings-unselected.png';
import more from '../../assets/icons/more.png';

const SideBarNavigation = ({ setActiveSection }) => {
  const [selected, setSelected] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const menuNavigation = [
    { name: 'Inicio', path: '/Management/Inicio', selectedIcon: homeSelected, unselectedIcon: homeUnselected },
    { name: 'Ventas', path: '/Management/Ventas', selectedIcon: soldSelected, unselectedIcon: soldUnselected },
    { name: 'Productos', path: '/Management/Productos', selectedIcon: productSelected, unselectedIcon: productUnselected },
    { name: 'Usuarios', path: '/Management/Usuarios', selectedIcon: userSelected, unselectedIcon: userUnselected },
    { name: 'Reportes', path: '/Management/Reportes', selectedIcon: reportSelected, unselectedIcon: reportUnselected },
    { name: 'Configuración', path: '/Management/Configuracion', selectedIcon: settingSelected, unselectedIcon: settingUnselected }
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const activeMenuItem = menuNavigation.find(item => currentPath === item.path);
    if (activeMenuItem) {
      setSelected(activeMenuItem.name);
      setActiveSection(activeMenuItem.name); // Actualiza la sección activa al cargar
    }
  }, [location.pathname, setActiveSection]);

  const handleNavigation = (item) => {
    setActiveSection(item.name); // Cambia la sección activa
  };

  return (
    <div className="sidebar-nav-custom">
      <div className="sidebar-navigation-custom__box">
        <ul>
          {menuNavigation.map((item) => (
            <li
              key={item.name}
              onClick={() => handleNavigation(item)}
              className={`sidebar-item-custom ${selected === item.name ? 'active' : ''}`}
            >
              <img 
                src={selected === item.name ? item.selectedIcon : item.unselectedIcon}
                alt={`${item.name} icon`} 
                className='sidebar-icon-custom' />
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-user-custom">
        <div className="user-info-custom">
          <img alt="Tu" className="user-avatar-custom" />
          <div className="user-details-custom">
            <span>Joan Fontecha</span>
            <small>Administrador</small>
          </div>
          <img src={more} alt='Mas opciones' className='more-options-custom' />
        </div>
      </div>
    </div>
  );
};

export default SideBarNavigation;
