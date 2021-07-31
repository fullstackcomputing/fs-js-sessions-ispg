import dotenv from 'dotenv';

const nodeENV = process.env.NODE_ENV || 'development';

if (nodeENV === 'development') {
  dotenv.config({ path: '.env.development'});
} else if(nodeENV === 'test') {
  dotenv.config({ path: '.env.test' });
}

const config = {
  port: Number(process.env.PORT) || 8000
};

export default config;
