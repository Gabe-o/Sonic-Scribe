import React, { useContext, useRef } from 'react';
import { UserContext } from '../../contexts/user';

// styles
import './AccountUpload.css';

const AccountUpload = ({ onFileSelected }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
      fileInputRef.current.click(); // Trigger the hidden file input click
  };

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          onFileSelected(file); // Call the passed in callback function with the selected file
      }
  };

  return (
      <>
          <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              accept=".mp3,.wav,.mid,.midi" 
              style={{ display: 'none' }} 
          />
          <div className='upload-button' onClick={handleUploadClick}>
              + Upload File
          </div>
      </>
  );
};

export default AccountUpload;
