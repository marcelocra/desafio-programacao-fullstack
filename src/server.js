const express = require('express')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const app = express()
const port = 8000


app.use(express.static('public'))


app.post('/upload_file', upload.single('products'), (req, res) => {
  console.log(req.file.buffer.toString())
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
