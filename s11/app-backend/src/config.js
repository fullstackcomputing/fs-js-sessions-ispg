import dotenv from 'dotenv';

const nodeENV = process.env.NODE_ENV || 'development';

if (nodeENV === 'development') {
  dotenv.config({ path: '.env.development'});
} else if(nodeENV === 'test') {
  dotenv.config({ path: '.env.test' });
}

const config = {
  server: {
    port: Number(process.env.PORT) || 8000,
  },
  mongodb: {
    url: process.env.MONGODB_URL || '',
  },
  auth: {
    jwtSecret: process.env.AUTH_JWT_TOKEN || 'secret@12345',
    expiresIn: process.env.AUTH_EXPIRES_IN || '1d',
  },
};

export default config;
