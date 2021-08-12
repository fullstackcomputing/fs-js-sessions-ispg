import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import config from './config';
import createServer from './setup/server';
import connectToMongoDB from './setup/mongodb';
import dbModels from './models'; 
import * as middleware from './middleware';
import api from './api';


// create an express application handler/instance
const app = express();

Promise.all([
 //run parallel setup tasks 
 createServer(app, config.server),
 connectToMongoDB(dbModels,config.mongodb)
])
  .then(()=> {
    // post-setup initialization

    // define global middlewares
    // ------------------------------  
    // app.use(middleware.requestResponseLogger);
    // app.use(middleware.requestResponseLoggerWithConfig({ format: 'test'}));
    // app.use(middleware.reqParser());

    app.use(morgan('dev'));
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    app.use(bodyParser.json());

    // per route middleware
    app.get('/', morgan('combined'), function(req, res) {
      res.send('hello world');
    });

    app.get('/test', (req, res) => {
      res.json({ message: 'hello world' });
    });

    app.post('/user-login', (req, res) => {
      // res.send({ data: req.rawData });
      res.send({ data: req.body });
    });

    app.get('/error', (req, res) => {
      const error = new Error('Error processing request');
      error.errorCode = 1000;
      throw error;
    });

    // routes: user CRUD
    app.get('/users', api.getUsers);
    app.post('/users', api.createUser);
    app.get('/users/:id', api.getUser);
    app.put('/users/:id', api.updateUser);
    app.delete('/users/:id', api.deleteUser);

    // error middlewares (should be defined after all routes)
    app.use(middleware.errorHandler());
  
  })
  . catch((err) => {
    throw err;
  });

/**  
 * Global Error handling
 */  
process.on('unhandledRejection', (reason) => {
  // handle known promise rejection
  console.log('err(unhandled rejection): ', reason);
  throw reason;
});

process.on('uncaughtException', (error) => {
  console.log('UNCAUGHT EXCEPTION: ', error);
  process.exit(1);
});




