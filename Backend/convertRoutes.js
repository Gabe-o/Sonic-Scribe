import express from 'express';
import bodyParser from 'body-parser';
import { exec } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const convertRouter = express.Router();

convertRouter.post("", bodyParser.raw({ type: "audio/midi", limit: "2mb" }), (req, res) => {
    const id = uuidv4();
    const midiFile = `${id}.midi`;
    const xmlFile = `${id}.xml`;

    fs.writeFile(midiFile, req.body, (err) => {
        if (err) {
            res.status(500).send("An error occurred creating " + midiFile + " for reason: " + err);
        } else {
            exec(`"${process.env.MUSESCORE_PATH_EXE}" ${midiFile} -o ${xmlFile}`, (err, stdout, stderr) => {
                if (err) {
                    res.status(500).send("Error converting midi file to xml file for reasons: " + err + "\n\n" + stderr);
                } else {
                    fs.readFile(xmlFile, "utf8", (err, data) => {
                        if (err) {
                            res.status(500).send("Error reading " + xmlFile + " for reason: " + err);
                        } else {
                            res.status(200).send(data);
                            // Delete the temporary files
                            fs.unlink(midiFile, (err) => {
                                if (err) console.error("Error deleting " + midiFile + ": " + err);
                            });
                            fs.unlink(xmlFile, (err) => {
                                if (err) console.error("Error deleting " + xmlFile + ": " + err);
                            });
                        }
                    });
                }
            });
        }
    });
});

export default convertRouter;