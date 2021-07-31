const http = require('http');
const fs = require('fs');

var host = '0.0.0.0';
var port = 8080;

var server = http.createServer(requestResponseHandler);

function requestResponseHandler(req, res) {
  console.log('...');
  res.writeHead(200, { 'Content-Type': 'image/jpg'});

  fs.readFile('./media/image1.jpg', function(err, data) {
    res.write(data);
    res.end();
  });

}

server.listen(port, host, function()  {
  console.log('server listening on ' + host + ':' + port);
});
