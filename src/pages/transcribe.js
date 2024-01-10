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

const TranscribePage = () => {
    const [modelReady, setModelReady] = useState(false);
    const [file, setFile] = useState(null);
    const [noteSequence, setNoteSequence] = useState(null);

    useEffect(() => {
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
        if (file && modelReady) {
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
            } else {
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

    const audioTranscriberTextStyles = {
        color: "white",
        fontSize: "3rem"
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
        marginTop: "8%"
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
                                    <h1 style={audioTranscriberTextStyles}>Audio Transcriber</h1>
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
                            <div style={{ color: "white" }}>
                                Second one
                            </div>
                        </div>
                    ) : (
                        <p>Loading Model...</p>
                    )}

                    {/* <button
                        onClick={() => {
                            const musicXML = noteSequenceToMusicXML(noteSequence);
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
                    </button> */}
                </div>
            </div>
        </>

    );
};

export default TranscribePage;

export const Head = () => <title>SonicScribe</title>;
