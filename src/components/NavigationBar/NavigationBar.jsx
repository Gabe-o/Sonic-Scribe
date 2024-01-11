import React from 'react';
import { Link } from 'gatsby';
import Logo from '../../images/logo.png';

// components
import TranscribePage from '../../pages/transcribe';
import HomePage from '../../pages/default';
import ResourcesPage from '../../pages/resources';

// styles
import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <nav id="navbar" >
            <div className='navbar-sonic-scribe'>
                <img src={Logo} alt="logo" />
                <h3>SonicScribe</h3>
            </div>
            <div>
                <ul className='navbar-list'>
                    <li>
                        <Link to='/' className='navbar-link'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/transcribe' className='navbar-link'>
                            Transcribe
                        </Link>
                    </li>
                    <li>
                        <Link to='/resources' className='navbar-link'>
                            Resources
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <i></i>
            </div>
        </nav >
    );
}

export default NavigationBar;
