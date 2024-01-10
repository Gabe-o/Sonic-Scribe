import * as React from "react";
import { useState, useEffect } from "react";
import StaffVisualizer from "../components/StaffVisualizer";
import PianoRollVisualizer from "../components/PianoRollVisualizer";
import NavigationBar from "../components/NavigationBar"
import BG from "../images/headphone-bg.png"
import * as mm from "@magenta/music";
import { noteSequenceToMusicXML } from "../noteSequenceToMusicXML";
import UploadButtonComponent from "../components/UploadButton";
import { initOnsetsAndFrames, transcribeFromAudioFile } from "../transcribe";
import RightArrow from "../images/right-arrow.png";

import Example from "../components/Example/Example";

const TranscribePage = () => {
    const [modelReady, setModelReady] = useState(false);
    const [file, setFile] = useState(null);
    const [noteSequence, setNoteSequence] = useState(null);

    useEffect(() => {
        // loading onsets and frames
        const init = async () => {
            try {
                setModelReady(await initOnsetsAndFrames());
            } catch (error) {
                console.error("Error initializing model:", error);
            }
        };

        init();
    }, []);

    useEffect(() => {
        // waiting for a file
        if (file && modelReady) {
            // if it is a midi file it can be parsed directly
            if (file.name.split(".")[1] === "mid" || file.name.split(".")[1] === "midi") {
                function createArray(file) {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();

                        reader.onload = (event) => {
                            const result = reader.result;
                            resolve(result);
                        };

                        reader.onerror = (event) => {
                            reject(reader.error);
                        };

                        reader.readAsArrayBuffer(file);
                    });
                }

                const createNoteSequence = async () => {
                    setNoteSequence(mm.midiToSequenceProto(await createArray(file)));
                };

                createNoteSequence();
            } else { // Handles .wav and .mp3 transcription
                const transcribe = async () => {
                    try {
                        let output = await transcribeFromAudioFile(file);
                        setNoteSequence(output);
                    } catch (error) {
                        console.error("Error transcribing file:", error);
                    }
                };

                transcribe();
            }
        }
    }, [file, modelReady]);

    // Creates a blob and serves it to the user
    function downloadFile(data, filename, type) {
        const blob = new Blob([data], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleTutorialButton = () => {

    }

    const tutorialButtonStyles = {
        width: "150px",
        height: "35px",
        backgroundColor: "#2d2d2d",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "200",
        border: "0.5px solid white",
        marginTop: "5%"
    }

    const rightArrowStyles = {
        height: "0.7rem",
        width: "0.7rem",
        marginLeft: "5px"
    }

    return (
        <>
            <div className="relative h-screen">
                <img src={BG} className="absolute inset-0 object-cover w-full h-full z-0" />
                <div className="absolute inset-0 z-10">
                <NavigationBar />
                    {modelReady ? (
                        <div style={{ 
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: "calc(100vh - 100px)",
                            margin: "0 40px"
                         }}>
                            <div>
                                <div style={{ 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    alignItems: "center",

                                }}>
                                    <h1 style={{ 
                                        color: "white",
                                        fontSize: "3.5rem",
                                     }}>
                                        Audio Transcriber
                                    </h1>


                                    <Example />

                                    
                                    <UploadButtonComponent onFileUpload={setFile}></UploadButtonComponent>
                                    <button style={tutorialButtonStyles} onClick={() => handleTutorialButton()}>
                                        <p>Tutorial</p>
                                        <img src={RightArrow} alt="right-arrow" style={rightArrowStyles}></img>
                                    </button>
                                </div>
                                {file &&
                                    (noteSequence ? (
                                        <>
                                            <PianoRollVisualizer noteSequence={noteSequence}></PianoRollVisualizer>
                                            <StaffVisualizer noteSequence={noteSequence}></StaffVisualizer>
                                        </>
                                    ) : (
                                        <p>Transcribing ...</p>
                                    ))}
                            </div>
                            <div>
                                <h3 style={{ 
                                    color: "white",
                                    fontWeight: "200",
                                    fontSize: "1.7rem"
                                 }}>Previous Transcriptions</h3>
                                 <div>

                                 </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading Model...</p>
                    )}

                    <button
                        onClick={async () => {
                            const musicXML = await noteSequenceToMusicXML(noteSequence);
                            downloadFile(musicXML, "music.xml", "application/octet-stream");
                        }}
                    >
                        Download MusicXML
                    </button>

                    <button
                        onClick={() => {
                            const midiData = mm.sequenceProtoToMidi(noteSequence);
                            downloadFile(midiData, "music.midi", "application/octet-stream");
                        }}
                    >
                        Download MIDI
                    </button> */
                </div>
            </div>
        </>

    );
};

export default TranscribePage;

export const Head = () => <title>SonicScribe</title>;
