import React from 'react';
import vector from '../images/vector.svg';

function Header() {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={vector}
                alt="Логотип"
            />
        </header>
    );
}

export default Header;