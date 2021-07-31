const http = require('http');
const fs = require('fs');

var host = '0.0.0.0';
var port = 8080;

var server = http.createServer(requestResponseHandler);

function requestResponseHandler(req, res) {
  console.log('...');
  res.writeHead(200, { 'Content-Type': 'image/jpg'});

  let numberOfChunks = 0;

  const stream = fs.createReadStream('./media/image1.jpg');

  stream.on('data', function(chunk) {
    numberOfChunks ++;
    res.write(chunk);
  });

  stream.on('end', function() {
    console.log('Total number of chunks sent: ', numberOfChunks);
    res.end();
  });
  

}

server.listen(port, host, function()  {
  console.log('server listening on ' + host + ':' + port);
});
