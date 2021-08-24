import service from '../service';

async function updateUser(req, res, next) {
  try {
    
    const user = await service.getUser(req.params.id);   
    if(!user) {
      return res.status(404).send('User Not Fould');
    }

    const updatedUser = await service.updateUser(user, req.body);
    return res.json(updatedUser);

  } catch(err) {
    next(err);
  }

}

export default updateUser;