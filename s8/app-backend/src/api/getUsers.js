import mongoose from 'mongoose';

async function getUsers(req, res) {
  try {
    const UserModel = mongoose.model('User');
    const users = await UserModel.find({}).exec();
    return res.json(users);
  } catch(err) {
    return res.status(500).json(err);
  }

}

export default getUsers;