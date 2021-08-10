import mongoose from 'mongoose';

async function updateUser(req, res) {
  try {
    const UserModel = mongoose.model('User');
    const user = await UserModel.findById(req.params.id).exec();
    if(!user) {
      return res.status(404).send('User Not Fould');
    }

    const { email, name } = req.body;
    if(email) user.email = email;
    if(name) user.name = name;
    
    await user.validate();
    await user.save();

    return res.json(user);
  } catch(err) {
    return res.status(500).json(err);
  }

}

export default updateUser;