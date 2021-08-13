import mongoose from 'mongoose';
import User from './User';

function register() {
  mongoose.model(User.modelName, User.schema);
}

export default { register };
