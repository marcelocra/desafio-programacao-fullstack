const http = require('http');
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

let files = {};


const requestListener = function (req, res) {
  switch (req.url) {
    case '/': {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(files.index);
      break;
    }
    case '/transactions': {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(files.transactions);
      break;
    }
    default: {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(404);
      res.end('Not found');
    }
  }
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});


['index', 'transactions'].map(fileName => {
  fs.readFile(__dirname + `/${fileName}.html`)
    .then(contents => {
      files[fileName] = contents;
    })
    .catch(err => {
      console.error(`Could not read '${fileName}.html' file: ${err}`);
      process.exit(1);
    });
})
