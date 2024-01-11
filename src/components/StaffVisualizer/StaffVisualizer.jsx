import { quantizeNoteSequence } from "@magenta/music/esm/core/sequences";
import React from "react";
import { useEffect, useRef } from "react";
import * as mm from "@magenta/music";

// styles
import "./StaffVisualizer.css";

export default function StaffVisualizer({ noteSequence }) {
    const visualizerRef = useRef(null);

    useEffect(() => {
        // inits visualizer once the note sequence has been parsed
        if (noteSequence) {
            let notes = noteSequence;
            if (!notes.quantizationInfo) notes = quantizeNoteSequence(noteSequence, 4);

            const visualizer = new mm.StaffSVGVisualizer(notes, visualizerRef.current);
            visualizer.redraw();
        }
    }, [noteSequence]);

    return <div ref={visualizerRef}></div>;
}
