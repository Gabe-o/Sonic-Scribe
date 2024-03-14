import * as React from "react";
import { useState, useEffect} from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import axios from 'axios';

import "./SearchPage.css";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

   
    useEffect( () => {
        const handleSearch = async () => {
                axios.get(`http://localhost:10000/music`)
                .then(res => setSearchResults(res.data))
                .catch(error => console.log(error));  
        }
        handleSearch();
    }, []);

    return (
        <div>
            <NavigationBar />
            <form>
                <h1>Search</h1>
                <div class="d-flex form-inputs">
                    <input className="form-control" type="text" placeholder="Search for music..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </form>
            
            <h2>Search Results</h2>
                <ul>
                    {searchResults.filter((item) => {
                        if(searchTerm === ""){
                            return item
                        }
                        else if(item.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                            return item
                        }
                    })
                    .map((item) => {
                        return <li key={item.id}>{item.title}</li>
                    }
                        
                    )}
                </ul>
        </div>
    );
};

export default SearchPage;

export const Head = () => <title>SonicScribe</title>;