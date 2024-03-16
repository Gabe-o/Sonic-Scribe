import * as React from "react";
import { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import * as mm from "@magenta/music";
import UploadButtonComponent from "../UploadButton/UploadButton";
import { initOnsetsAndFrames, transcribeFromAudioFile } from "../../transcribe";
import TranscriptionResults from "../TranscriptionResults/TranscriptionResults";
import PreviousTranscriptsMenu from "../PreviousTranscriptsMenu/PreviousTranscriptsMenu";
import { pushNoteSequence } from "../../scoreDB";

import "./TranscribePage.css";

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
          let ns = mm.midiToSequenceProto(await createArray(file))
          pushNoteSequence({ noteSequence: ns, title: file.name.split(".")[0] });
          setNoteSequence(ns);
        };

        createNoteSequence();
      } else {
        // Handles .wav and .mp3 transcription
        const transcribe = async () => {
          try {
            let output = await transcribeFromAudioFile(file);
            pushNoteSequence({ noteSequence: output, title: file.name.split(".")[0] });
            setNoteSequence(output);
          } catch (error) {
            console.error("Error transcribing file:", error);
          }
        };

        transcribe();
      }
    }
  }, [file, modelReady]);

  const handleTutorialButton = () => {

  };

  const handleConvertMore = () => {
    window.location.reload(); // TODO: there should be a way to do this without reload the page but i couldn't figure it out
    setNoteSequence(null);
    setFile(null);
  }

  return (
    <>
      <div className="transcribe-main">
        <NavigationBar />
        <div className="transcribe-container" style={{ display: noteSequence ? "none" : "flex" }}>
          {modelReady ? (
            <div class="transcribe-container-transcriber">
              <h1
                style={{
                  color: "white",
                  fontSize: "3.5rem",
                }}
              >
                Audio Transcriber
              </h1>

              <UploadButtonComponent onFileUpload={setFile}></UploadButtonComponent>
              <button className="transcribe-tutorial-container" onClick={() => handleTutorialButton()}>
                <p>Tutorial</p>
              </button>
            </div>
          ) : (
            <div class="transcribe-container-transcriber">
              <h1
                style={{
                  color: "white",
                  fontSize: "3.5rem",
                }}
              >
                Loading Model...
              </h1>
            </div>
          )}
          <div class="transcribe-container-transcriptions">
            <h1
              style={{
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "1",
                marginTop: "10%"
              }}
            >
              Previous Transcriptions
            </h1>
            {modelReady ? <PreviousTranscriptsMenu setNoteSequence={setNoteSequence} noteSequence={noteSequence}/> : ""}
          </div>
        </div>
        <div style={{ display: noteSequence ? "block" : "none" }}>
          <TranscriptionResults noteSequence={noteSequence} handleConvertMore={handleConvertMore} />
        </div>
      </div>
    </>
  );
};

export default TranscribePage;

export const Head = () => <title>SonicScribe</title>;
