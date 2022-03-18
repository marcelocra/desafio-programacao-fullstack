const express = require('express');
const multer = require('multer');
const constants = require('./constants');
const db = require('better-sqlite3')('./db/hubla.sqlite3');

const {
  fetchAllTransactions,
  processUploadedFileAndSaveToDatabase,
} = require('./db_handler');

const fileUploadStorage = multer.memoryStorage();
const upload = multer({ storage: fileUploadStorage });
const app = express();
const port = 8000;

app.use(express.static('public'));

// Returns a JSON with the producers/affiliates transactions, prepared to be
// used by the frontend.
app.get(constants.API_TRANSACTIONS, (req, res) => {
  res.json(fetchAllTransactions(db));
});

// Receives the uploaded file, sent by the user, parsing, normalizing and
// storing it in the database (sqlite).
app.post(constants.API_UPLOAD_FILE, upload.single('products'), (req, res) => {
  processUploadedFileAndSaveToDatabase(db, req.file.buffer.toString());

  res.end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
