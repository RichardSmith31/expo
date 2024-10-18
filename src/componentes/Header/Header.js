import React, { useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo1.png';
import cart from '../../assets/icons/cart.png';
import account from '../../assets/icons/account.png';
import CartModal from '../CartModal/CartModal';
import AccountModal from '../AccountModal/AccountModal';
import { RiShoppingCart2Line, RiUserLine} from "react-icons/ri";

const Header = () => {
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
    const [, setIsAnimating] = useState(false);
    const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
    const location = useLocation();
    const path = location.pathname;

    const closeModals = () => {
        setIsCartModalOpen(false);
        setIsAccountModalOpen(false);
    };

    const toggleCartModal = () => {
        setIsAnimating(true);
        if (isCartModalOpen) {
            setTimeout(() => {
                setIsCartModalOpen(false);
                setTimeout(() => {
                    setIsHeaderExpanded(false);
                    setIsAnimating(false);
                }, 100);
            }, 150);
        } else {
            closeModals(); 
            setIsHeaderExpanded(true);
            setTimeout(() => {
                setIsCartModalOpen(true);
                setIsAnimating(false);
            }, 50);
        }
    };

    const toggleAccountModal = () => {
        setIsAnimating(true);
        if (isAccountModalOpen) {
            setTimeout(() => {
                setIsAccountModalOpen(false);
                setTimeout(() => {
                    setIsHeaderExpanded(false);
                    setIsAnimating(false);
                }, 100);
            }, 150);
        } else {
            closeModals(); 
            setIsHeaderExpanded(true);
            setTimeout(() => {
                setIsAccountModalOpen(true);
                setIsAnimating(false);
            }, 50);
        }
    };

    return (
        <>
            <header className="header">
                <div className="header__container">
                    <div className='logo-header__container'>
                        <Link to={"/"}><img src={logo} alt="Logo" className="header__logo" /></Link>
                    </div>

                    <div className='navigation-header__container'>
                        <div className={`sections-header__container ${isHeaderExpanded ? 'expanded' : ''}`}>
                            <Link to={"/Nosotros"} className={path === "/Nosotros" ? "active" : ""}>NOSOTROS</Link>
                            <Link to={"/Productos"} className={path === "/Productos" ? "active" : ""}>PRODUCTOS</Link>
                            <Link to={"/Contacto"} className={path === "/Contacto" ? "active" : ""}>CONTÁCTENOS</Link>
                        </div>

                        <div className={`icons-header__container ${isHeaderExpanded ? 'expanded' : ''}`}>
                            <ul className="header__list">
                                <li className="header__element">
                                    <Link className='account' to={"/Cart"}><RiShoppingCart2Line /></Link>
                                </li>
                                <li className="header__element">
                                   <RiUserLine className='account' onClick={toggleAccountModal} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>


            <CartModal isOpen={isCartModalOpen} onClose={toggleCartModal} />
            <AccountModal isOpen={isAccountModalOpen} onClose={toggleAccountModal} />
        </>
    );
}

export default Header;
