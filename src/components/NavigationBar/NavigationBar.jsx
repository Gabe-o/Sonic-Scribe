import React from 'react';
import { Link } from 'gatsby';
import Logo from '../../images/logo.png';

// styles
import "./NavigationBar.css";

const NavigationBar = () => {
    return (
        <nav id="navbar">
            <div>
                <h3>
                    Sonic Scribe
                </h3>
            </div>
            <div>
                <ul>
                    <li>
                        <button>
                            Home
                        </button>
                    </li>
                    <li>
                        <button>
                            Transcriber
                        </button>
                    </li>
                    <li>
                        <button>
                            Tutorial
                        </button>
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
