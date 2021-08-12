import service from '../service';

async function createUser(req, res, next) {
  console.log('req.body: ', req.body);

  const { email, name } = req.body;

  // validate incoming data
  if(!email || !name) {
    return res.status(400).send('both email and name is required');
  } 
  
  // conteroller logic
  try {

    const user = await service.createUser({ email, name });

    return res.json(user);
  } catch (err) {
    
    next(err);
  }

}

export default createUser;