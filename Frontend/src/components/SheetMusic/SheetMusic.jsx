import React, { useEffect, useRef } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { noteSequenceToMusicXML } from './noteSequenceToMusicXML.js'; 

const SheetMusic = ({ noteSequence }) => {
    const osmdContainerRef = useRef(null);

    useEffect(() => {
        if (noteSequence) {
            const convertAndRender = async () => {
                try {
                    const musicXml = await noteSequenceToMusicXML(noteSequence);
                    const osmd = new OpenSheetMusicDisplay(osmdContainerRef.current, {
                        autoResize: true,
                        drawFromMeasureNumber: 1,
                        drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER,
                    });
                    osmd.load(musicXml).then(() => osmd.render());
                } catch (error) {
                    console.error('Error converting or rendering MusicXML:', error);
                }
            };

            convertAndRender();
        }
    }, [noteSequence]); // Re-run the effect if noteSequence changes

    return <div ref={osmdContainerRef} />;
};

export default SheetMusic;
