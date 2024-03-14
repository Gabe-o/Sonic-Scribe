import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/user';

// styles
import './AccountUpload.css';

const AccountUpload = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {}, [user]);

    return (
        <>
          <p>Upload Page</p>  
        </>
    );
}

export default AccountUpload;
