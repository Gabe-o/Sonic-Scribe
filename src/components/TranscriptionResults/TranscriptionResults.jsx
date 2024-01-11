import * as React from "react";
import { useState } from "react";
import PianoRollVisualizer from "../PianoRollVisualizer/PianoRollVisualizer";
import StaffVisualizer from "../StaffVisualizer/StaffVisualizer";
import XmlDownloadButton from "../XmlDownloadButton/XmlDownloadButton";
import MidiDownloadButton from "../MidiDownloadButton/MidiDownloadButton";
import "./TranscriptionResults.css";


const TranscriptionResults = ({ noteSequence }) => { 
    const [pianoRoll, setPianoRoll] = useState(true);
    const [audioPlayback, setAudioPlayback] = useState(false);

    return (
        <div class="transcriptionResults-bg">
            <h1 class="transcriptionResults-title">Your audio has been converted:</h1>
            <div class="transcriptionResults-preview">
                { pianoRoll ? <PianoRollVisualizer noteSequence={noteSequence} setAudioPlayback={setAudioPlayback}/> : <StaffVisualizer noteSequence={noteSequence} setAudioPlayback={setAudioPlayback}/> }
            </div>
            <div class="transcriptionResults-buttonContainer">
                <XmlDownloadButton noteSequence={noteSequence}/>
                <button class="transcriptionResults-switchButton" disabled={audioPlayback}
                onClick={() => {
                    setPianoRoll(!pianoRoll);
                }}
                >
                    Switch View
                </button>
                <MidiDownloadButton noteSequence={noteSequence}/>
            </div>
            <button class="transcriptionResults-convertButton">Convert More</button>
        </div>
    );
}

export default TranscriptionResults;