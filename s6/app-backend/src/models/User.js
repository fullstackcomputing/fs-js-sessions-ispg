import mongoose from 'mongoose';

const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;

const { Schema } = mongoose;

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
  } 
});
schema.set('timestamp', true);

export default { modelName, schema };

