const fs = require('fs')
const db = require('better-sqlite3')('hubla.sqlite3')


const create_database = fs.readFileSync('create_database.sql', 'utf-8')
db.exec(create_database)
