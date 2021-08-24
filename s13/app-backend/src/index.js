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

    const apiRouter = express.Router();
    const adminRouter = express.Router();

    app.use('/api', apiRouter);
    app.use('/admin', adminRouter);
    
    adminRouter.all('*', middleware.testToken());
    
    //assignment
    // adminRouter.all('*', middleware.hasRole('admin'));        
    // apiRouter.all('*', middleware.hasRoleAny('admin', 'super-user'));    
    // adminRouter.all('*', middleware.hasRoleAll('admin', 'user'));  

    // routes: user CRUD
    adminRouter.get('/users', api.getUsers);
    adminRouter.post('/users', api.createUser);
    adminRouter.get('/users/:id', api.getUser);
    adminRouter.put('/users/:id', api.updateUser);
    adminRouter.delete('/users/:id', api.deleteUser);

    app.post('/auth/login', api.loginUser);
    
    apiRouter.get('/users', api.getUsers);

    // const isExperAdmin = hasRoleAll('expert', 'admin');
    // apiRouter.get('/users',  isExperAdmin, api.getUsers);
    // apiRouter.get('/users',  isExperAdmin, api.getUsers);


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




