import React from "react";
import { useState, useEffect } from "react";
import "./PreviousTranscriptsMenu.css"
import "./TranscriptionSelector.css"
import { getCachedNoteSequences } from "../../scoreDB";

export default function PreviousTranscriptsMenu({ setNoteSequence, noteSequence }) {
    const [transcripts, setTranscripts] = useState([]);

    useEffect(() => {
        const getTranscripts = async () => {
            setTranscripts(await getCachedNoteSequences());
        }

        getTranscripts();
    }, [noteSequence]);

    return (
        <div class="previousTranscriptsMenu-container">
            {transcripts.map((t) => <TranscriptionSelector noteSequence={t?.noteSequence} title={t?.title} setNoteSequence={setNoteSequence}/>)}
        </div>
    );
}

function TranscriptionSelector({ noteSequence, title, setNoteSequence }) {
    const openTranscript = () => {
        setNoteSequence(noteSequence);
    };

    return (
        <div class="transcriptionSelector-container" onClick={openTranscript}>
            <div class="transcriptionSelector-image">

            </div>
            <p class="transcriptionSelector-title">{title}</p>
        </div>
    );
}
