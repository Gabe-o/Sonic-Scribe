import React, { useContext, useEffect, useState, useRef } from 'react'; // Added useRef to the import
import NavigationBar from '../components/NavigationBar/NavigationBar';
import AccountSongs from '../components/AccountSongs/AccountSongs';
import AccountFavourites from '../components/AccountFavourites/AccountFavourites';
import AccountUpload from '../components/AccountUpload/AccountUpload';
import { UserContext } from '../contexts/user';
import { navigate } from 'gatsby';

// styles
import '../styles/account.css';

const AccountPage = () => {
    const { user } = useContext(UserContext);
    const [content, setContent] = useState("My Songs");
    const fileInputRef = useRef(null); // Correct usage of useRef

    useEffect(() => {
        // Uncomment the next line if you want to redirect non-logged-in users to the login page
        // if (!user) navigate("/login");
    }, [user]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected for upload:', file.name);
            // Implement the upload logic here, or pass the file to another component to handle
        }
    };

    return (
        <>
            <NavigationBar />
            <div className='account-main'>
                <div className='account-header'>
                    <h1>{user?.email.split('@')[0]}</h1>
                </div>
                <div className='account-navbar'>
                    <div className='account-navbar-container'>
                        <div onClick={() => setContent("My Songs")} className={"account-navbar-link" + (content === "My Songs" ? " active" : "")}>
                            <div>My Songs</div>
                        </div>
                        <div onClick={() => setContent("Favourites")} className={"account-navbar-link" + (content === "Favourites" ? " active" : "")}>
                            <div>Favourites</div>
                        </div>
                    </div>
                    <div className='account-navbar-container'>
                        <div 
                            onClick={() => fileInputRef.current && fileInputRef.current.click()} // Trigger file input on click
                            className="account-navbar-upload"
                        >
                            <span>+</span>
                            <div>Upload</div>
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange} 
                            accept=".mp3,.wav,.mid,.midi" 
                            style={{ display: 'none' }} 
                        />
                    </div>
                </div>
                {content === "My Songs" && <AccountSongs />}
                {content === "Favourites" && <AccountFavourites />}
                {content === "Upload" && <AccountUpload />}
            </div>
        </>
    );
};

export default AccountPage;
