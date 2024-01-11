const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(`Method: ${req.method} \t Path: ${req.path}`);
	next();
});

app.post("/convert", bodyParser.raw({ type: "audio/midi", limit: "2mb" }), (req, res) => {
	fs.writeFile("music.midi", req.body, (err) => {
		if (err) {
			res.status(500).send("An error occured creating music.midi file for reason: " + err);
		} else {
			exec("musescore3.exe music.midi -o music.xml", (err, stdout, stderr) => {
				if (err) {
					res.status(500).send("Error converting midi file to xml file for reasons: " + err + "\n\n" + stderr);
				} else {
					fs.readFile("music.xml", "utf8", (err, data) => {
						if (err) {
							res.status(500).send("Error reading music.xml file for reason: " + err);
						} else {
							res.status(200).send(data);
						}
					});
				}
			});
		}
	});
});

app.listen(10000, () => {
	console.log("Server started on port 10000");
});
