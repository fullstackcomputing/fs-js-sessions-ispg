import service from '../service';

async function loginUser(req, res, next) {
  try {
   const { email, password } = req.body; 
   if(!email || !password) {
    return res.status(400).send('both email and password required to login');
   } 
   const { userData, token } = await service.loginUser({ email, password });
   return res.json({ userData, token });
   
  } catch(err) {
    next(err);
  }

}
export default loginUser;