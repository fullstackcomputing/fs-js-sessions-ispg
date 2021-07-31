import http from 'http';
import express from 'express';

import config from './config';
import createServer from './setup/server';
import connectToMongoDB from './setup/mongodb';
import dbModels from './models'; 

const app = express();

// setup

Promise.all([
 //setup 
 createServer(app, config.server),
 connectToMongoDB(dbModels,config.mongodb)
])
  .then(()=> {
    // post-setup initialization

    app.get('/', function(req, res) {
      res.send('hello world');
    });

    app.get('/test', (req, res) => {
      res.json({ message: 'hello world' });
    });


  })
  . catch((err) => {
    throw err;
  });

/**  
 * Global Error handling
 */  
process.on('unhandledRejection', (reason) => {
  // handle known promise rejection

  throw reason;
});

process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION: ', error);
  process.exit(1);
});







