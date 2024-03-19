import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user';

const AccountSongs = ({ refresh }) => {
    const [songs, setSongs] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
      if (user) {
          fetch(`http://localhost:10000/music?userId=${user.id}`)
              .then(response => response.json())
              .then(data => {
                  setSongs(data);
              })
              .catch(error => console.error('Error fetching songs:', error));
      }
  }, [user]); // Re-fetch when user changes

    return (
        <div>
            <h2>My Songs</h2>
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>{song.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default AccountSongs;
