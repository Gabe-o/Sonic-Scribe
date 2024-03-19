import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user';

// styles
import './AccountSongs.css';

const AccountSongs = ({ refresh }) => {
    const [songs, setSongs] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
      const fetchSongs = async () => {
          if (user) {
              // Include the full URL in the fetch call
              const url = `http://localhost:10000/music?userId=${user.id}`;
              try {
                  const response = await fetch(url);
                  if (!response.ok) {
                      throw new Error('Network response was not ok');
                  }
                  const data = await response.json();
                  setSongs(data);
              } catch (error) {
                  console.error("Failed to fetch songs:", error);
              }
          }
      };

      fetchSongs();
  }, [user, refresh]); // Re-fetch when user changes or when a new song is uploaded

  return (
    <div>
        <h2>My Songs</h2>
        <ul className="song-list">
            {songs.map((song, index) => (
                <li key={index} className="song-list-item">{song.title}</li>
            ))}
        </ul>
    </div>
);
};

export default AccountSongs;
