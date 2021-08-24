import mongoose from 'mongoose';

const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;

const { Schema } = mongoose;

const roleTypes = ['super-admin', 'admin', 'user'];

const modelName = 'User';

const schema = new Schema({
  name: {
    type: String,
    required: 'Name cannot be blank', trim: true
  },
  email: {
    type: String,
    required: 'Email cannot be blank', unique: true, lowercase: true,
    match: [emailRegex, 'Please enter a valid email']
  },
  roles: {
    type: [String],
    enum: roleTypes,
    default: ['user'],
  },
  // optional as social login does not need a stored password
  hashedPassword: {
    type: String,
  },
  joinDate: {
    type: Date,
    default: Date.now
  },

});
schema.set('timestamp', true);

export default { modelName, schema };

