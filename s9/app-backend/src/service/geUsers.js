import mongoose from 'mongoose';

async function getUsers() {
  try {
    const UserModel = mongoose.model('User');
    const users = await UserModel.find({}).exec();
    return users;
  } catch(err) {
    throw err;
  }
}
export default getUsers;