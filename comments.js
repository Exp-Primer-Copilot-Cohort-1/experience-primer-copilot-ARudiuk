// create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');

// create server
var server = http.createServer(function (req, res) {
  // parse url
  var urlObj = url.parse(req.url, true);
  // get path
  var pathName = urlObj.pathname;
  // get query string
  var query = urlObj.query;
  // get method
  var method = req.method;

  // if request path is /index.html, read file and response
  if (pathName === '/') {
    pathName = '/index.html';
  }

  if (pathName === '/index.html' && method === 'GET') {
    // read file
    var filePath = path.join(__dirname, pathName);
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
      }
      res.end(data);
    });
  }
  // if request path is /comments, get comments data and response
  else if (pathName === '/comments' && method === 'GET') {
    var data = comments.get();
    res.end(data);
  }
  // if request path is /comments, save comments data and response
  else if (pathName === '/comments' && method === 'POST') {
    // get data
    var str = '';
    req.on('data', function (chunk) {
      str += chunk;
    });
    req.on('end', function () {
      // save data
      comments.save(str);
      res.end(str);
    });
  }
  // if request path is /index.html, read file and response
  else {
    var filePath = path.join(__dirname, pathName);
    fs.readFile(filePath, function (err, data) {
      if (err) {
        res.statusCode = 404;
        res.end('Not found');
      }
      res.end(data);
    });
  }
});

// listen port
server.listen(8080, function () {
  console.log('Server is running...');
});
```

##