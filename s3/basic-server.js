const http = require('http');

var host = '0.0.0.0';
var port = 8080;

var server = http.createServer(requestResponseHandler);

function requestResponseHandler(req, res) {
  res.write('hello world');
  res.end();
}

server.listen(port, host, function()  {
  console.log('server listening on ' + host + ':' + port);
});
