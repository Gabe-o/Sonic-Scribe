import * as React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import axios from 'axios';


const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3306/search?q=${searchTerm}`);
            setSearchResults(response.data);
        } 
        
        catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <h1>Search</h1>
                <input type="text" placeholder="Search for music..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button onClick={handleSearch}>Search</button>

            <h2>Search Results</h2>
                <ul>
                    {searchResults.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
        </div>
    );
};

export default SearchPage;

export const Head = () => <title>SonicScribe</title>;