import jwt, { decode } from 'jsonwebtoken';
import config from './config';

// middleware pattern (without configuration options)
function myMiddleware1(req, res, next) {
  // middleware logic
  // ...
  // call the next middleware/route
  next();  
}

// middleware pattern (with configuration options)
function myMiddleware2(config = {}) {
  return (req, res, next) => {
    // middleware logic
    if(config.foo) {
      // ...
    } else {
      // ...
    }
    // call the next middleware/route
    next();
  }
}

export function requestResponseLogger(req, res, next) {
  // process middleware
  const startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  })
  next();
}

export function requestResponseLoggerWithConfig(config = {}) {

  const format = config.format || 'dev';
  // middleware functionality
  return (req, res, next) => {
    // process middleware
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      let formatString = '';
      if(format === 'prod') {
        formatString = [
          req.method,
          req.path,
          res.statusCode,
          `${duration}ms`,
          req.headers['x-forwarded-for'],
          req.headers['user-agent']
        ].join(' ');
      } else {
        formatString = [
          req.method,
          req.path,
          res.statusCode,
          `${duration}ms`,
        ].join(' ');        
      }
      console.log(formatString);
    })
    next();
   }

}


export function reqParser() {
  return (req, res, next) => {
    req.on('data', (data) => {
      console.log('data(buffer): ', data);
      console.log('data(as string): ', data.toString());
      req.rawData = data.toString();
    })
    req.on('end', () => {
      next();
    });
  }
}

export function errorHandler(config = { debug: true } ) {
  return (err, req, res, next) => {
    if(config.debug) {
      console.error('Error', err);
    }
    return res.status(err.statusCode || 500).send({
      statusCode: err.statusCode || 500,
      message: config.debug ? err.message : 'Something went wrong',
      errorCode: err.errorCode || 500, 
    }); 
  }
}


export function testToken() {
  return async (req, res, next) => {
    try {
      const tokenData = await decodeToken(req);
      console.log('tokenData: ', tokenData);
      next();
    } catch(err) {
      next(err);
    }
  }
}

async function decodeToken(req) {
  console.log('req.headers:', req.headers);
  const token = await getTokenFromHeader(req.headers.authorization);
  console.log('token:', token);
  const tokenData = await verifyAndDecodeToken(token, config.auth);
  return tokenData;
}

async function getTokenFromHeader(authToken) {
  if(!authToken || typeof authToken !== 'string') {
    const error = new Error('Invalid Token Format');
    error.statusCode = 401;
    throw error;
  }
  const [type, token] = authToken.split(' ');
  if(type !== 'Bearer') {
    const error = new Error('Invalid Token Type');
    error.statusCode = 401;
    throw error;    
  }

  return token;

}


/**
 * Authorization Bearer <token>
 */
function verifyAndDecodeToken(token, { jwtSecret }) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if(err) {
        err.statusCode = 401;
        return reject(err);        
      }
      resolve(decoded);
    });
  });
}

export function hasRole() {}
export function hasRoleAny() {}
export function hasRoleAll() {}