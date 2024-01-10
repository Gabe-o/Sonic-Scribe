/** Convert divisions to note types */
export const DIVISIONS_TO_NOTE_TYPE = {
    1: "1024th",
    2: "512th",
    4: "256th",
    8: "128th",
    16: "64th",
    32: "32nd",
    64: "16th",
    128: "eighth",
    256: "quarter",
    512: "half",
    1024: "whole",
    2048: "breve",
    4096: "long",
    8192: "maxima",
};

export const NOTE_TYPE_TO_DIVISIONS = {
    "1024th": 1,
    "512th": 2,
    "256th": 4,
    "128th": 8,
    "64th": 16,
    "32nd": 32,
    "16th": 64,
    eighth: 128,
    quarter: 256,
    half: 512,
    whole: 1024,
    breve: 2048,
    long: 4096,
    maxima: 8192,
};


/** Convert mm.NoteSequence keys to musicXML fifths */
export const SEQUENCE_KEY_TO_FIFTHS = {
    0: 0,   // C
    1: -5,   // C#/Db
    2: 2,   // D
    3: -3,  // D#/Eb
    4: 4,   // E
    5: -1,  // F
    6: 6,   // F#/Gb
    7: 1,   // G
    8: -4,  // G#/Ab
    9: 3,   // A
    10: -2, // A#/Bb
    11: 5,  // B
}

export const MUSICXML_HEADER = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">
<score-partwise version="4.0">
    <part-list>
        <score-part id="P1">
            <part-name>Music</part-name>
        </score-part>
    </part-list>
    <part id="P1">`;