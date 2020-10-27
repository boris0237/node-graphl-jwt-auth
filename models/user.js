const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = mongoose.Schema({
  username: { type: String, required: false, unique: true },
  name: { type: String, required: true },
  phone: {type: String, required: true, unique: true  },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false },
  role: { type: String, default: 'host' },
  city: { type: String },
  sexe: { type: String },
  resetPasswordToken: {
    type: String,
    required: false
  },
  

}, {timestamps: true});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);