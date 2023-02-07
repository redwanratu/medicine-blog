const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
//create schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide us your email '],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid a valid email'],
  },
  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin', 'author', 'reader'],
    default: 'user',
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'passords are not same . Please confirm password.',
    },
  },
  passwordResetToken: String,
  passResetTokenExpiresTime: Date,
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
  },
  bio: {
    type: String,
    defualt: ''
  },
  address: {
    type: String,
    defualt: ''
  },
  phoneNumber: {
    type: String,
    defualt: ''
  },
  socialMediaLink: {
    type: String,
    defualt: ''
  },
  relationshipStatus: {
    type: String,
    enum: ['Single','In A Relationship','Married','Devorced'],
    defualt: ''
  },

  interest: {
    type: String,
    defualt: ''
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() + 1000;

  next();
});
// hashing password
//pre save manupilating data before saving data to database
userSchema.pre('save', async function (next) {
  // only work creating new user
  //actually if password modified
  if (!this.isModified('password')) return next();

  // hashing the password with cost 12
  // hashing function has another sync version
  // but here it it the async version
  this.password = await bcrypt.hash(this.password, 12);

  //delete the confirm password
  //only needs when sign up
  this.passwordConfirm = undefined;
});

userSchema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
});

// user password checking
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if password changes after token issued

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return changedTimeStamp > JWTTimeStamp;
  }
  return false;
};

// generate random token for forget password

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // create hash object in HEX encoding
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passResetTokenExpiresTime = Date.now() + 10 * 60 * 1000;
  console.log(resetToken);

  return resetToken;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
