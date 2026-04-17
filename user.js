const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// Define the Person schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String
  },
  address: {
    type:String,
    required: true
  },
  aadharCardNumber: {
    type:Number,
    required: true,
    unique: true
  },
  password: {
    type:String,
    required: true
  },
  role: {
    type:String,
    enum: ['voter', 'admin'],
    default:'voter',
  },
  isVoted: {
    type:Boolean,
    default: false,
  }
});
userSchema.pre('save', async function (next) {
  const person = this;

  // Hash the password only if it has been modified (or is new)
  if (!person.isModified('password')) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // Replace plain password with hashed password
    person.password = hashedPassword;

    next();
  } catch (err) {
    return next(err);
  }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Compare entered password with stored hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
const User= mongoose.model('User',userSchema);
module.exports= User;
