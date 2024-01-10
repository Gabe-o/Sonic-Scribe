import { NoteSequence } from "@magenta/music";
import { StaffModel } from "./staff_model";


export function noteSequenceToMusicXML(noteSequence: NoteSequence) {
    let staffModel = new StaffModel(noteSequence);
    return staffModel.getXML();
}