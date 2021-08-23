import mongoose from 'mongoose';

async function getUser(userId) {
  try {
    const UserModel = mongoose.model('User');
    const user = await UserModel.findById(userId).exec();
    return user;
  } catch(err) {
      throw err;
  }
}

export default getUser;