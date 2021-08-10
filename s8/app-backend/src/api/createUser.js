import mongoose from 'mongoose';

async function createUser(req, res) {
  console.log('req.body: ', req.body);

  const { email, name } = req.body;

  // validate incoming data
  if(!email || !name) {
    return res.status(400).send('both email and name is required');
  } 
  
  // conteroller logic
  try {
    const UserModel = mongoose.model('User');
    const user = new UserModel({
      email,
      name,
    });
    await user.save();
    return res.json(user);
  } catch (err) {
    // handle all error conditons
    return res.status(500).json(err);
  }

}

export default createUser;