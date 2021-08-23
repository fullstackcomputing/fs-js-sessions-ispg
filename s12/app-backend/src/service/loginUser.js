import mongoose from 'mongoose';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import config from '../config';

async function loginUser({ email, password }) {

 const UserModel = mongoose.model('User');

 // find the user
 const user = await UserModel.findOne({ email });
 if(!user) {
   const error = new Error('User not found');
   error.statusCode = 404;
   throw error;
 } 
 
 // verify the credentials
 await verifyPassword(user.hashedPassword, password);

 // generate token with embedded data
 const userData = {
  _id: user._id,
  name: user.name,
  email: user.email,
  roles: user.roles,
 };

 const token = await generateToken({ user: userData }, config.auth);

 // return userdata and token 
 return { userData, token };
}


async function verifyPassword(hashedPassword, password) {
  const isPasswordCorrect = await argon2.verify(hashedPassword, password);
  if (!isPasswordCorrect) {
    const error = new Error('Incorrect Password!');
    error.statusCode = 400;
    throw error;
  }  
}

function generateToken(data = {} , { jwtSecret, expiresIn }) {
  return new Promise((resolve, reject) => {

    jwt.sign(data, jwtSecret, { expiresIn }, (err, token) => {
      if(err) {
        err.statusCode = 401;
        return reject(err);
      }
      resolve(token);
    });
  });

}


export default loginUser;
