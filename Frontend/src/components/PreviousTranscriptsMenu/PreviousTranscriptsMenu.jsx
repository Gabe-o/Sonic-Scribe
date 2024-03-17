import React from "react";
import { useState, useEffect } from "react";
import { getCachedNoteSequences } from "../../scoreDB";
import { navigate } from "gatsby";

import "./PreviousTranscriptsMenu.css"
import "./TranscriptionSelector.css"

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

function TranscriptionSelector({ noteSequence, title,}) {
    const openTranscript = () => {
        navigate("/results", { state:{noteSequence: noteSequence} });
    };

    return (
        <div class="transcriptionSelector-container" onClick={openTranscript}>
            <div class="transcriptionSelector-image">

            </div>
            <p class="transcriptionSelector-title">{title}</p>
        </div>
    );
}
