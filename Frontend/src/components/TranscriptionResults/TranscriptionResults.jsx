import React, { useState } from "react";
import PianoRollVisualizer from "../PianoRollVisualizer/PianoRollVisualizer";
import SheetMusic from '../../SheetMusic/SheetMusic.jsx'
import XmlDownloadButton from "../XmlDownloadButton/XmlDownloadButton";
import MidiDownloadButton from "../MidiDownloadButton/MidiDownloadButton";
import "./TranscriptionResults.css";

const TranscriptionResults = ({ noteSequence, handleConvertMore }) => {
    const [visualizationMode, setVisualizationMode] = useState("pianoRoll");
    const [audioPlayback, setAudioPlayback] = useState(false);

    const switchVisualizationMode = () => {
        setVisualizationMode(visualizationMode === "pianoRoll" ? "sheetMusic" : "pianoRoll");
    };

    return (
        <div className="transcriptionResults-bg">
            <h1 className="transcriptionResults-title">Your audio has been converted:</h1>
            <div className="transcriptionResults-preview">
                {visualizationMode === "pianoRoll" ? (
                    <PianoRollVisualizer noteSequence={noteSequence} setAudioPlayback={setAudioPlayback} />
                ) : (
                    <SheetMusic noteSequence={noteSequence} />
                )}
            </div>
            <div className="transcriptionResults-buttonContainer">
                <XmlDownloadButton noteSequence={noteSequence} />
                <button
                    className="transcriptionResults-switchButton"
                    disabled={audioPlayback}
                    onClick={switchVisualizationMode}
                >
                    Switch View
                </button>
                <MidiDownloadButton noteSequence={noteSequence} />
            </div>
            <button className="transcriptionResults-convertButton" onClick={handleConvertMore}>
                Convert More
            </button>
        </div>
    );
};

export default TranscriptionResults;
