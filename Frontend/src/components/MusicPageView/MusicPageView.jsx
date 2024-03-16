import React, { useState, useEffect } from 'react';
import SheetMusicViewer from './SheetMusicViewer';
// Assume convertNoteSequenceToMusicXml is your function that converts noteSequence to MusicXML
import { convertNoteSequenceToMusicXml } from './yourConversionUtility';

const MusicViewPage = ({ match }) => {
    // Assuming you have a way to get the noteSequence for a song by id
    const songId = match.params.id; // Or however you're getting the song's id
    const [musicXml, setMusicXml] = useState(null);

    useEffect(() => {
        // Fetch noteSequence for the song by id, then convert it to MusicXML
        const fetchAndConvertSong = async () => {
            const noteSequence = await fetchNoteSequenceById(songId); // Implement this based on your app's data fetching logic
            const musicXml = convertNoteSequenceToMusicXml(noteSequence);
            setMusicXml(musicXml);
        };

        fetchAndConvertSong();
    }, [songId]);

    return (
        <div>
            <h1>Sheet Music</h1>
            {musicXml ? <SheetMusicViewer musicXml={musicXml} /> : <p>Loading...</p>}
        </div>
    );
};
