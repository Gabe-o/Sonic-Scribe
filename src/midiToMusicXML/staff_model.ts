import { NoteSequence } from "@magenta/music";
import {
    KeySignatureInfo,
    TimeSignatureInfo,
    TempoInfo,
    StaffInfo,
    NoteInfo,
    getBarLength,
    DEFAULT_TIME_SIGNATURE,
    DEFAULT_KEY_SIGNATURE,
    DEFAULT_TEMPO,
} from "./staff_info";
import { DIVISIONS_TO_NOTE_TYPE, SEQUENCE_KEY_TO_FIFTHS, MUSICXML_HEADER } from "./constants";
import * as _ from "lodash";

export class StaffModel {
    staffInfo: StaffInfo;
    measures: StaffMeasure[] = [];
    notes: StaffNote[] = [];

    constructor(noteSequence: NoteSequence) {
        this.staffInfo = getStaffInfo(noteSequence);
        // Sort by start time
        this.staffInfo.notes.sort((a, b) => a.start - b.start);
        this.staffInfo.tempos.sort((a, b) => a.start - b.start);
        this.staffInfo.keySignatures.sort((a, b) => a.start - b.start);
        this.staffInfo.timeSignatures.sort((a, b) => a.start - b.start);

        let activeNotes: NoteInfo[] = [];
        let lastStopTime = 0;
        for (let [i, timeSig] of this.staffInfo.timeSignatures.entries()) {
            // Get the notes that start at this time sig
            let notesAtTimeSig =
                i === this.staffInfo.timeSignatures.length - 1
                    ? this.staffInfo.notes.filter(
                          (note) => note.start >= timeSig.start && note.start < Number.POSITIVE_INFINITY
                      )
                    : this.staffInfo.notes.filter(
                          (note) =>
                              note.start >= timeSig.start && note.start < this.staffInfo.timeSignatures[i + 1].start
                      );

            // Calculate start and end measures
            let startMeasure = getMeasureNumber(timeSig.start, this.staffInfo.timeSignatures);
            let endMeasure = getMeasureNumber(
                notesAtTimeSig[notesAtTimeSig.length - 1].start,
                this.staffInfo.timeSignatures
            );
            // Loop through each measure
            for (let j = startMeasure; j < endMeasure; j++) {
                // Get only notes that start during this measure
                let notesAtMeasure = notesAtTimeSig.filter(
                    (note) => getMeasureNumber(note.start, this.staffInfo.timeSignatures) === j
                );

                for (let k = 0; k < notesAtMeasure.length; k++) {
                    let note = notesAtMeasure[k];
                    let notesAtTime = notesAtMeasure.filter((n) => note.start === n.start);
                    let start = note.start;

                    if (!activeNotes.length) {
                        // Rest for note.start - lastStopTime
                    }

                    // Fix duration
                    for (let activeNote of activeNotes) {
                        activeNote.length = activeNote.start + activeNote.length - start;
                        if (activeNote.length <= 0) activeNotes.filter((n) => n !== activeNote);
                    }

                    // Add notes
                    for (let note of notesAtTime) {
                        activeNotes.push(note);
                    }

                    // Add notes to staff
                    for (let activeNote of activeNotes) {
                        this.notes.push(new StaffNote(start, activeNote));
                    }

                    k += notesAtTime.length - 1;
                }

                // Fix rhythm before changing measure
                if (activeNotes.length) {
                    let timeLeftInMeasure =
                        getMeasureDivisions(activeNotes[activeNotes.length - 1].start, this.staffInfo.timeSignatures)
                            .end - activeNotes[activeNotes.length - 1].start;
                    // Check if note exceeds measure
                    for (let activeNote of activeNotes) {
                    }

                    let startTimes = splitTime(timeLeftInMeasure).map(
                        (time) => time + activeNotes[activeNotes.length - 1].start
                    );
                }
            }
        }

        // for (let note of this.staffInfo.notes) {
        //     // No note is playing we need to find when the last note stopped at calculate rests
        //     if (!activeNotes.length) {
        //         // Rest for note.start - lastStopTime
        //     }

        //     for (let activeNote of activeNotes) {
        //     }
        // }

        // // Tieing notes
        // for (let i = 0; i < this.notes.length; i++) {
        //     let note = this.notes[i];

        //     // Fixes overlapping notes
        //     let overlapTimes = getNoteOverlapTimes(note, this.notes);
        //     if (overlapTimes.length) {
        //         let originNote = note;
        //         for (let j = 0; j < overlapTimes.length; j++) {
        //             let splitNote = _.cloneDeep(originNote);

        //             // Fixing origin
        //             originNote.duration = overlapTimes[j] - originNote.noteInfo.start;
        //             originNote.tiedTo = splitNote;

        //             // Fixing split
        //             splitNote.noteInfo.start = overlapTimes[j];
        //             splitNote.duration -= originNote.duration;

        //             originNote = splitNote;
        //         }
        //     }
        // }

        // // Sort notes by start time
        // let notes = [];
        // for (let note of this.notes) {
        //     notes.push(note);
        //     while (note.tiedTo) {
        //         notes.push(note.tiedTo);
        //         note = note.tiedTo;
        //     }
        // }
        // this.notes = notes;
        // this.notes.sort((a, b) => a.noteInfo.start - b.noteInfo.start);

        // // Builds measures
        // let measureNum = 1;
        // let currMeasure = new StaffMeasure(
        //     measureNum,
        //     this.staffInfo.keySignatures[0],
        //     this.staffInfo.timeSignatures[0]
        // );
        // this.measures.push(currMeasure);
        // for (let note of this.notes) {
        //     if (getMeasureNumber(note.noteInfo.start, this.staffInfo.timeSignatures) !== currMeasure.measureNumber) {
        //         measureNum++;
        //         currMeasure = new StaffMeasure(
        //             measureNum,
        //             this.staffInfo.keySignatures[0],
        //             this.staffInfo.timeSignatures[0]
        //         );
        //         this.measures.push(currMeasure);
        //     }
        //     currMeasure.notes.push(note);
        // }

        // console.log(this);
    }

    getXML(): string {
        let musicXML = MUSICXML_HEADER;

        for (let [i, measure] of this.measures.entries()) {
            musicXML += measure.getMeasure(i === 0);
            for (let [j, note] of measure.notes.entries()) {
                musicXML += `<note>
                ${j > 0 ? (measure.notes[j - 1].noteInfo.start === note.noteInfo.start ? "<chord />" : "") : ""}
                <pitch>
                        <step>${note.step}</step>
                        <alter>${note.alter}</alter>
                        <octave>${note.octave}</octave>
                </pitch>
                <duration>${note.duration}</duration>
                <type>${note.getClosestNoteType().noteType}</type>
                ${note.getClosestNoteType().isDotted ? "<dot />" : ""}
                <notations>
                    ${note.tiedTo && `<tied type="stop"/>\n<tied type="start"/>`}
                </notations>
            </note>`;
            }
            musicXML += `</measure>`;
        }

        musicXML += `
	</part>
</score-partwise>`;

        return musicXML;
    }
}

function splitTime(time: number) {
    let startTimes = [];
    while (time <= 1) {
        let length = findClosestNoteType(time).noteLength;
        startTimes.push(length);
        time -= length;
    }
    return startTimes;
}

/** Get the closest note to this duration */
function findClosestNoteType(noteDuration: number) {
    let closestNoteType = null;
    let smallestDifference = Infinity;
    let isDotted = false;
    let length = 0;

    // Loop through all note durations
    for (let noteLength of Object.keys(DIVISIONS_TO_NOTE_TYPE)) {
        let noteLengthNumber = Number(noteLength);
        let regularDifference = Math.abs(noteDuration - noteLengthNumber);
        let dottedDifference = Math.abs(noteDuration - noteLengthNumber * 1.5);

        // Check if the note duration is closer to the dotted note length
        if (dottedDifference < regularDifference && dottedDifference < smallestDifference) {
            smallestDifference = dottedDifference;
            closestNoteType = DIVISIONS_TO_NOTE_TYPE[noteLength];
            isDotted = true;
            length = noteLengthNumber * 1.5;
        } else if (regularDifference < smallestDifference) {
            smallestDifference = regularDifference;
            closestNoteType = DIVISIONS_TO_NOTE_TYPE[noteLength];
            isDotted = false;
            length = noteLengthNumber;
        }
    }

    return { noteLength: length, noteType: closestNoteType, isDotted: isDotted };
}

/** Gets the start time of all notes that start while this note is playing */
function getNoteOverlapTimes(note: StaffNote, notes: StaffNote[]) {
    return [
        ...new Set(
            notes
                .filter(
                    (n) =>
                        n.noteInfo.start > note.noteInfo.start &&
                        n.noteInfo.start < note.noteInfo.start + note.noteInfo.length
                )
                .map((note) => note.noteInfo.start)
        ),
    ];
}

class StaffMeasure {
    measureNumber: number;
    key: KeySignatureInfo;
    timeSignature: TimeSignatureInfo;
    notes: StaffNote[] = [];

    constructor(measureNumber: number, key: KeySignatureInfo, timeSignature: TimeSignatureInfo) {
        this.measureNumber = measureNumber;
        this.key = key;
        this.timeSignature = timeSignature;
    }

    getMeasure(attributes: boolean = false): string {
        return `
            <measure number="${this.measureNumber}">
            ${
                attributes
                    ? `<attributes>
            <divisions>256</divisions>
            <key>
                <fifths>${this.key.key || DEFAULT_KEY_SIGNATURE.key}</fifths>
            </key>
            <time>
            <beats>${this.timeSignature.numerator || DEFAULT_TIME_SIGNATURE.numerator}</beats>
            <beat-type>${this.timeSignature.denominator || DEFAULT_TIME_SIGNATURE.denominator}</beat-type>
            </time>
                <staves>2</staves>
                <clef number="1">
                    <sign>G</sign>
                    <line>2</line>
                </clef>
                <clef number="2">
                    <sign>F</sign>
                    <line>4</line>
                </clef>
            </attributes>`
                    : ""
            }
            `;
    }
}

class StaffNote {
    /** Base note info used to derive the rest of the information */
    noteInfo: NoteInfo;
    /** The measure this note belongs too */
    measure: StaffMeasure;
    /** This is a chord */
    chord: boolean;
    /** Note name */
    step: string;
    /** Adjust pitch up or down a number of pitchs, for sharps and flats */
    alter: number;
    /** Note octave */
    octave: number;
    /** Duration of the note during */
    duration: number;
    /** Note start time */
    start: number;
    /** Type of note, ex. quarter, half, whole, etc. */
    noteType: string;
    /** Number of dots this note has */
    dots: number;
    /** The note this note is tied too */
    tiedTo: StaffNote;

    constructor(start: number, noteInfo: NoteInfo) {
        this.noteInfo = noteInfo;
        this.start = start;

        // Convert midi info
        this.setPitch(noteInfo.pitch);
    }

    getClosestNoteType() {
        let noteDuration = this.duration;
        let closestNoteType = null;
        let smallestDifference = Infinity;
        let isDotted = false;

        // Loop through all note durations
        for (let noteLength of Object.keys(DIVISIONS_TO_NOTE_TYPE)) {
            let noteLengthNumber = Number(noteLength);
            let regularDifference = Math.abs(noteDuration - noteLengthNumber);
            let dottedDifference = Math.abs(noteDuration - noteLengthNumber * 1.5);

            // Check if the note duration is closer to the dotted note length
            if (dottedDifference < regularDifference && dottedDifference < smallestDifference) {
                smallestDifference = dottedDifference;
                closestNoteType = DIVISIONS_TO_NOTE_TYPE[noteLength];
                isDotted = true;
            } else if (regularDifference < smallestDifference) {
                smallestDifference = regularDifference;
                closestNoteType = DIVISIONS_TO_NOTE_TYPE[noteLength];
                isDotted = false;
            }
        }

        return { noteType: closestNoteType, isDotted: isDotted };
    }

    /** Set pitch information from a MIDI pitch */
    setPitch(midiPitch: number) {
        // TODO: adjust note based on key
        const notes = {
            0: "A", // A
            1: "A", // A#
            2: "B", // B
            3: "C", // C
            4: "C", // C#
            5: "D", // D
            6: "D", // D#
            7: "E", // E
            8: "F", // F
            9: "F", // F#
            10: "G", // G
            11: "G", // G#
        };

        const alters = {
            0: 0, // A
            1: 1, // A#
            2: 0, // B
            3: 0, // C
            4: 1, // C#
            5: 0, // D
            6: 1, // D#
            7: 0, // E
            8: 0, // F
            9: 1, // F#
            10: 0, // G
            11: 1, // G#
        };

        this.step = notes[(midiPitch - 21) % 12];
        this.alter = alters[(midiPitch - 21) % 12];
        this.octave = Math.floor((midiPitch - 12) / 12);
    }
}

/** Gets measure number at division */
export function getMeasureNumber(division: number, timeSignatures: TimeSignatureInfo[]): number {
    let currMeasure = 0;
    let currDivison = 0;
    let i = 0;
    while (i < timeSignatures.length - 1) {
        // Calculate how many measures occur at this time sig
        let measureLength = 256 * getBarLength(timeSignatures[i]);
        let measuresAtTimeSignature = (timeSignatures[i + 1].start - timeSignatures[i].start) / measureLength;
        // Check if we have passed the division we are trying to find
        if (currDivison + measuresAtTimeSignature * measureLength > division) break;

        currMeasure += measuresAtTimeSignature;
        currDivison += measuresAtTimeSignature * measureLength;

        i++;
    }

    let measureLength = 256 * getBarLength(timeSignatures[i]);
    currMeasure += (division - timeSignatures[i].start) / measureLength;

    return Math.floor(currMeasure) + 1;
}

/** Gets start and end division of a measure at division */
export function getMeasureDivisions(division: number, timeSignatures: TimeSignatureInfo[]) {
    let currMeasure = 0;
    let currDivison = 0;
    let i = 0;
    while (i < timeSignatures.length - 1) {
        // Calculate how many measures occur at this time sig
        let measureLength = 256 * getBarLength(timeSignatures[i]);
        let measuresAtTimeSignature = (timeSignatures[i + 1].start - timeSignatures[i].start) / measureLength;
        // Check if we have passed the division we are trying to find
        if (currDivison + measuresAtTimeSignature * measureLength > division) break;

        currMeasure += measuresAtTimeSignature;
        currDivison += measuresAtTimeSignature * measureLength;

        i++;
    }

    let measureLength = 256 * getBarLength(timeSignatures[i]);
    currMeasure += (division - timeSignatures[i].start) / measureLength;
    currDivison += division - timeSignatures[i].start;

    return { start: Math.floor(currDivison), end: Math.floor(currDivison + measureLength) };
}

// TODO: implement support for tempo changes
function timeToDivisions(time: number, tempo: number = 120): number {
    const t = (time * tempo) / 60;
    return Math.ceil(t * 256); // min resolution = 1/256 quarter
}

/** Converts a note sequence note to a note info */
function getNoteInfo(note: NoteSequence.INote): NoteInfo {
    const startT = timeToDivisions(note.startTime);
    const endT = timeToDivisions(note.endTime);
    return {
        start: startT,
        length: endT - startT,
        pitch: note.pitch,
        velocity: note.velocity,
    };
}

/** Converts a note sequence to a staff info */
export function getStaffInfo(sequence: NoteSequence): StaffInfo {
    const notesInfo: NoteInfo[] = [];
    for (let note of sequence.notes) {
        notesInfo.push(getNoteInfo(note));
    }

    return {
        notes: notesInfo,
        tempos: sequence.tempos
            ? sequence.tempos.map((t) => {
                  return { start: timeToDivisions(t.time), qpm: t.qpm };
              })
            : [DEFAULT_TEMPO],
        keySignatures: sequence.keySignatures
            ? sequence.keySignatures.map((ks) => {
                  return { start: timeToDivisions(ks.time), key: SEQUENCE_KEY_TO_FIFTHS[ks.key] };
              })
            : [DEFAULT_KEY_SIGNATURE],
        timeSignatures: sequence.timeSignatures
            ? sequence.timeSignatures.map((ts) => {
                  return {
                      start: timeToDivisions(ts.time),
                      numerator: ts.numerator,
                      denominator: ts.denominator,
                  };
              })
            : [DEFAULT_TIME_SIGNATURE],
    };
}
