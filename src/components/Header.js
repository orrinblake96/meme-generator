import React from 'react'
import trollFace from '../images/Trollface.png';

const Header = () => {
    return (
        <div>
            <header>
                <img src={trollFace} alt="Broken?"/>
                <p>Memeulator 2000</p>
            </header>
        </div>
    );
}

export default Header;