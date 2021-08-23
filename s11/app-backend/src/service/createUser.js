import mongoose from 'mongoose';
import argon2 from 'argon2';

async function createUser(fields = {} ) {
  try {
    const UserModel = mongoose.model('User');
    const user = new UserModel({ ...fields });
    const hashedPassword = await argon2.hash(fields.password);
    user.hashedPassword = hashedPassword;
    await user.save();
    return user;
    
  } catch(err) {
    throw err;
  }
}

export default createUser;