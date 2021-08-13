import service from '../service';

async function getUsers(req, res, next) {
  try {
    const users = await service.getUsers();
    return res.json(users);
  } catch(err) {
    next(err);
  }

}

export default getUsers;