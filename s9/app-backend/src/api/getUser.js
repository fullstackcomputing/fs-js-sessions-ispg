import service from '../service';

async function getUser(req, res, next) {
  try {
    const user = await service.getUser(req.params.id);  
    return res.json(user);
  } catch(err) {
    // return res.status(500).json(err);
    // throw err;
    next(err);
  }
}

export default getUser;