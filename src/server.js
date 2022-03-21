const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const constants = require('./constants');
const db = require('better-sqlite3')('./db/hubla.sqlite3');

const {
  fetchAllTransactions,
  processUploadedFileAndSaveToDatabase,
  getUserByEmail,
} = require('./db_handler');
const { authMiddleware, generateAccessToken } = require('./auth');

const fileUploadStorage = multer.memoryStorage();
const upload = multer({ storage: fileUploadStorage });
const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());

// Returns a JSON with the producers/affiliates transactions, prepared to be
// used by the frontend. Requires authentication.
app.get(constants.API_TRANSACTIONS, authMiddleware, (req, res) => {
  res.json(fetchAllTransactions(db));
});

// Receives the uploaded file, sent by the user, parsing, normalizing and
// storing it in the database (sqlite). Requires authentication.
app.post(
  constants.API_UPLOAD_FILE,
  authMiddleware,
  upload.single('products'),
  (req, res) => {
    processUploadedFileAndSaveToDatabase(db, req.file.buffer.toString());

    res.end();
  }
);

// Receives the user email and password and compares with what is stored in the
// database, only generating tokens when password is correct.
app.post(constants.API_LOG_USER, (req, res) => {
  let user = getUserByEmail(db, req.body.email);

  if (!user) {
    return res.sendStatus(401);
  }

  if (user.password !== req.body.password) {
    return res.sendStatus(403);
  }

  res.json(generateAccessToken({ email: user.email, role: user.role }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
