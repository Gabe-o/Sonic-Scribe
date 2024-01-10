import React from 'react';
import { Link } from 'gatsby';
import Logo from '../images/logo.png';

const Navbar = () => {
    return (
        <>
            <div className='bg-neutral-800 w-full'>
                <nav className="w-full text-white p-8 flex items-center">
                    <div className="flex items-center text-2xl font-bold mr-8">
                        <img src={Logo} alt="logo" className="mr-2 h-6 w-6" />
                        <p>SonicScribe</p>
                    </div>
                    <ul className="flex space-x-12">
                        <li>
                            <Link to="/" className="hover:text-amber-500">Home</Link>
                        </li>
                        <li>
                            <Link to="/transcribe" className="hover:text-amber-500">Transcribe</Link>
                        </li>
                        <li>
                            <Link to="/history" className="hover:text-amber-500">History</Link>
                        </li>
                        <li>
                            <Link to="/resources" className="hover:text-amber-500">Resources</Link>
                        </li>
                    </ul>
                </nav>
                <div className='border border-gray-300 mx-auto w-5/6'></div>
            </div>
        </>
    );
}

export default Navbar;
