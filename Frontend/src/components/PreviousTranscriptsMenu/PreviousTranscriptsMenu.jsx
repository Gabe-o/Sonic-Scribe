import React from "react";
import { useState, useEffect } from "react";
import "./PreviousTranscriptsMenu.css"
import "./TranscriptionSelector.css"
import { getCachedNoteSequences } from "../../scoreDB";

export default function PreviousTranscriptsMenu() {
    const [transcripts, setTranscripts] = useState([]);

    useEffect(() => {
        const getTranscripts = async () => {
            setTranscripts(await getCachedNoteSequences());
        }

        getTranscripts();
    }, []);

    return (
        <div class="previousTranscriptsMenu-container">
            {transcripts.map((t) => <TranscriptionSelector noteSequence={t?.noteSequence} title={t?.title} />)}
        </div>
    );
}

function TranscriptionSelector({ noteSequence, title }) {
    return (
        <div class="transcriptionSelector-container">
            <div class="transcriptionSelector-image">

            </div>
            <p class="transcriptionSelector-title">{title}</p>
        </div>
    );
}
