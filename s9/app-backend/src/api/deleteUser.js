import service from '../service';

async function deleteUser(req, res, next) {
  try {
    const user = await service.getUser(req.params.id);
    if(!user) {
      return res.status(404).send('User Not Fould');
    }
    const deletedUser = await service.deleteUser(user);
    return res.json(deletedUser);
  } catch(err) {
    next(err);
  }
}

export default deleteUser;