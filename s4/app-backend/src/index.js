import http from 'http';
import express from 'express';

import config from './config';

const host = '0.0.0.0';
const port = config.port;

const app = express();

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`server listening on ${host}:${port}`);
});

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/test', (req, res) => {
  res.json({ message: 'hello world' });
});

