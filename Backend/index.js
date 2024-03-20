const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const mysql = require('mysql');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	console.log(`Method: ${req.method} \t Path: ${req.path}`);
	next();
});

// MySQL database connection
const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: process.env.MYSQL_PORT,
});

// Connect to the database
connection.connect((err) => {
	if (err) {
		console.error('Error connecting to database: ' + err.stack);
		return;
	}
	console.log('Connected to database as id ' + connection.threadId);
});


/*
Endpoint to create a SQL table
Example POST:
{
  "tableName": "music",
  "tableSchema": "id INT AUTO_INCREMENT PRIMARY KEY, xmlFile TEXT, title VARCHAR(255), userId INT, isPublic BOOLEAN"
}
*/
app.post('/create-table', (req, res) => {
	const { tableName, tableSchema } = req.body;

	if (!tableName || !tableSchema) {
		return res.status(400).send('Table name and schema are required');
	}

	// Generate CREATE TABLE statement
	const createTableQuery = `CREATE TABLE ${tableName} (${tableSchema})`;

	// Execute SQL statement
	connection.query(createTableQuery, (err, result) => {
		if (err) {
			console.error('Error creating table:', err);
			return res.status(500).send('Error creating table');
		}
		res.status(200).send('Table created successfully');
	});
});


/*
Create a new music record
Example POST ("id" is auto-generated server side):
{
  "xmlFile": "<xml>...</xml>",
  "title": "4th Song",
  "userId": 234,
  "isPublic": true
}
*/
app.post('/music', (req, res) => {
	const { xmlFile, title, userId, isPublic } = req.body;
	const sql = 'INSERT INTO music (xmlFile, title, userId, isPublic) VALUES (?, ?, ?, ?)';
	connection.query(sql, [xmlFile, title, userId, isPublic], (err, result) => {
		if (err) {
			console.error('Error inserting music record: ' + err);
			res.status(500).send('Error inserting music record');
			return;
		}
		res.status(201).send(result);
	});
});


// Retrieve all music records
app.get('/music', (req, res) => {
	const sql = 'SELECT * FROM music WHERE userId = ?';
	const userId = req.query.userId;
	console.log(`Fetching songs for userId: ${userId}`);
	connection.query(sql, [userId], (err, results) => {
		if (err) {
			console.error('Error retrieving music records: ' + err);
			res.status(500).send('Error retrieving music records');
			return;
		}
		res.json(results);
	});
});

// Retrieve searched for music record
app.get('/music', (req, res) => {
	const query = `SELECT * FROM music WHERE title LIKE '%${searchTerm}%'`;
  
	connection.query(query, (err, results) => {
	  if (err) {
		console.error('Error retrieving searched for music record: ' + err);
			res.status(500).send('Error retrieving music record');
			return;
	  }
	  res.json(results);
	});
  });


/*
Update a music record
Example PUT:
{
  "xmlFile": "<xml>...</xml>",
  "title": "4th Song",
  "userId": 234,
  "isPublic": true
}
*/
app.put('/music/:id', (req, res) => {
    const id = req.params.id; // Extracting song ID from the URL
    const { isPublic } = req.body; // Extracting isPublic from the request body

    const sql = `UPDATE music SET isPublic = ${isPublic} WHERE id = ${id}`;
    connection.query(sql, [isPublic, id], (err, result) => {
        if (err) {
            console.error('Error updating music record:', err);
            return res.status(500).send('Error updating music record');
        }
        res.send('Music record updated successfully');
    });
});



// Delete a music record
app.delete('/music/:id', (req, res) => {
	const id = req.params.id;
	const sql = 'DELETE FROM music WHERE id = ?';
	connection.query(sql, [id], (err, result) => {
		if (err) {
			console.error('Error deleting music record: ' + err);
			res.status(500).send('Error deleting music record');
			return;
		}
		res.send('Music record deleted successfully');
	});
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

app.post('/upload', upload.single('file'), (req, res) => {
    const { originalname: title } = req.file; // Destructure and rename 'originalname' to 'title'
    let { userId, isPublic } = req.body;
    isPublic = isPublic === 'true' ? 1 : 0; // Convert isPublic to 1 or 0 based on its value
    const filePath = req.file.path; // The path to where the file is saved

    // SQL to insert new record into 'music' table
    const sql = 'INSERT INTO music (xmlFile, title, userId, isPublic) VALUES (?, ?, ?, ?)';
    connection.query(sql, [filePath, title, userId, isPublic], (err, result) => {
        if (err) {
            console.error('Error inserting music record:', err);
            return res.status(500).send('Error inserting music record');
        }
        res.status(201).send('File uploaded successfully');
    });
});

app.listen(10000, () => {
	console.log("Server started on port 10000");
});
