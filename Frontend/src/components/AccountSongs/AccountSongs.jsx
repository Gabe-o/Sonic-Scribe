import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user';

const AccountSongs = ({ refresh }) => {
    const [songs, setSongs] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchSongs = async () => {
            if (!user) {
                console.log("No user logged in");
                return;
            }
            const url = `/music?userId=${user.id}`; // Example: Fetch songs for the logged-in user
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
        };

        fetchSongs();
    }, [refresh, user]);

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
