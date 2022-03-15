const express = require('express')
const multer = require('multer')
const db = require('better-sqlite3')('./db/hubla.sqlite3')

const parseTransactions = require('./parser')

const fileUploadStorage = multer.memoryStorage()
const upload = multer({ storage: fileUploadStorage })
const app = express()
const port = 8000


app.use(express.static('public'))


app.post('/upload_file', upload.single('products'), (req, res) => {
  const transactions = parseTransactions(req.file.buffer.toString())
  
  for (let transaction of transactions) {
    console.log({transaction})

    let productId = db.prepare('select id from products where name = ?')
      .get(transaction.product)
    if (productId) {
      productId = productId.id
    } else  {
      productId = db.prepare('insert into products (name) values (?)')
        .run(transaction.product)
        .lastInsertRowid
      
    } 

    let affiliateId = db.prepare('select id from affiliates where name = ?').get(transaction.affiliateName)
    if (affiliateId) {
      affiliateId = affiliateId.id
    } else {
      affiliateId = db.prepare('insert into affiliates (name) values (?)')
        .run(transaction.affiliateName)
        .lastInsertRowid
    }

    let info = db.prepare(`
      insert into transactions
        (transaction_type, product_id, affiliate_id, date, price)
      values
        (?, ?, ?, ?, ?)`)
      .run(transaction.type, productId, affiliateId, transaction.date.toISOString(), transaction.price)
    console.log({info})
  }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
