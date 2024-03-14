import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user';

// styles
import './AccountSongs.css';

const AccountSongs = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {}, [user]);

    return (
        <>
          <p>My Songs</p>  
        </>
    );
}

export default AccountSongs;
