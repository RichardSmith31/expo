import React from 'react';
import './HeaderManagement.css';
import { Link } from 'react-router-dom'; 
import atras from '../../assets/icons/arrow_back-black.png';
import brand from '../../assets/images/logo-azul.png';

const HeaderManagement = () => {
    return (
        <header className="header-management-custom">
            <div className="container-management-custom">
                <div className="back-management-custom">
                    <Link to="/" className="link-management-custom">
                        <img 
                            src={atras} 
                            alt='Volver a la página' 
                            title='Volver a la página'
                            className='arrow-management-custom' />
                        <p className='go-back-custom'>Volver a la página</p> 
                    </Link>
                </div>
                
                <div className="brand-management-custom">
                    <Link to="/" className="brand-link-management-custom">
                        <img
                            src={brand}
                            alt='Brand ENTQUIM'
                            title='ENTQUIM'
                            className='brand-img-management-custom' />
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default HeaderManagement;
