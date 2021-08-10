import http from 'http';

async function createServer(app, config) {
  const host = '0.0.0.0';
  const port = config.port;
  const server = http.createServer(app);
  server.listen(port, host, () => {
    console.log(`server listening on ${host}:${port}`);
  });
  return server;
}


// function createServer(app, config) {
//   return new Promise(function (resolve, reject){
//     // server is connecting
//     resolve(server);

//   });
// }


export default createServer;
