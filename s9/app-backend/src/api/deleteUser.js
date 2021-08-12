import mongoose from 'mongoose';
async function deleteUser(req, res) {
  try {
    const UserModel = mongoose.model('User');
    const user = await UserModel.findById(req.params.id).exec();
    if(!user) {
      return res.status(404).send('User Not Fould');
    }

    await user.remove();
    
    return res.json(user);
  } catch(err) {
    return res.status(500).json(err);
  }
}

export default deleteUser;