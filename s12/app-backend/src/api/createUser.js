import service from '../service';

async function createUser(req, res, next) {
  console.log('req.body: ', req.body);

  const { email, name, password } = req.body;

  // validate incoming data
  if(!email || !name) {
    return res.status(400).send('both email and name is required');
  } 
  if(!password || password.length < 6) {
    return res.status(400).send('password is required with min. 6 characters.');
  }

  // conteroller logic
  try {

    const user = await service.createUser(req.body);

    return res.json(user);
  } catch (err) {
    
    next(err);
  }

}

export default createUser;