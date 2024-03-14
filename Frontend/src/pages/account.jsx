import React, { useContext, useEffect, useState } from 'react';
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
    const [content, setContent ] = useState("My Songs");
    useEffect(() => {
        // if(!user) navigate("/login");
    }, [user]);

    return (
        <>
            <NavigationBar />
            <div className='account-main'>
                <div className='account-header'>
                    <h1>{user?.email.split('@')[0]}</h1>
                </div>
                <div className='account-navbar'>
                    <div className='account-navbar-container'>
                        <div onClick={() => {setContent("My Songs")}} className={"account-navbar-link" + (content == "My Songs" ? " active" : "")}>
                            <div>My Songs</div>
                        </div>
                        <div onClick={() => {setContent("Favourites")}} className={"account-navbar-link" + (content == "Favourites" ? " active" : "")}>
                            <div>Favourites</div>
                        </div>
                    </div>
                    <div className='account-navbar-container'>
                        <div onClick={() => {setContent("Upload")}} className="account-navbar-upload">
                        <span>+</span><div>Upload</div>
                        </div>
                    </div>
                </div>
                {content == "My Songs" ? <AccountSongs/> : ""}
                {content == "Favourites" ? <AccountFavourites/> : ""}
                {content == "Upload" ? <AccountUpload/> : ""}
            </div>
        </>
    );
}

export default AccountPage;
