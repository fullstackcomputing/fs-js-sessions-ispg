import mongoose from 'mongoose';

async function getUser(req, res) {
  try {
    const UserModel = mongoose.model('User');
    const user = await UserModel.findById(req.params.id).exec();
    return res.json(user);
  } catch(err) {
    return res.status(500).json(err);
  }
}

export default getUser;