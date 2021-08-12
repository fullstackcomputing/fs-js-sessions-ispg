import mongoose from 'mongoose';

async function createUser({ email, name }) {
  try {
    const UserModel = mongoose.model('User');
    const user = new UserModel({
      email,
      name,
    });
    await user.save();
    return user;
    
  } catch(err) {
    throw err;
  }
}

export default createUser;