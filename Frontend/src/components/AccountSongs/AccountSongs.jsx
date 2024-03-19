import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user';

// styles
import './AccountSongs.css';

const AccountSongs = ({ refresh, setRefreshSongs }) => {
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
  }, [user, refresh]);

  const toggleVisibility = async (songId, isPublic) => {
    try {
        const response = await fetch(`http://localhost:10000/music/${songId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isPublic: !isPublic, // Toggle the visibility
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Update songs state to reflect the change
        setSongs(songs.map(song => {
            if (song.id === songId) {
                return {...song, isPublic: !song.isPublic}; // Update the isPublic status for the toggled song
            }
            return song;
        }));

    } catch (error) {
        console.error('Failed to toggle visibility:', error);
    };
};



return (
  <div>
      <h2>My Songs</h2>
      <ul className="song-list">
          {songs.map((song) => (
              <li key={song.id} className="song-list-item">
                  <span className="song-title">{song.title} - Visibility: {song.isPublic ? 'Public' : 'Private'}</span>
                  <button
                      onClick={() => toggleVisibility(song.id, song.isPublic)}
                      className="visibility-button"
                  >
                      Make {song.isPublic ? 'Private' : 'Public'}
                  </button>
              </li>
          ))}
      </ul>
  </div>
);
};

export default AccountSongs;
