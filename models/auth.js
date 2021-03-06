const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
      // minlength: 7,
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    isBalanceSet: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.methods.setPassword = function (pass) {
  this.password = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(7).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(7).required(),
});

const joiBalanceSchema = Joi.object({
  balance: Joi.number().required(),
});

const User = model('authUser', userSchema);

module.exports = {
  joiRegisterSchema,
  joiLoginSchema,
  joiBalanceSchema,
  User,
};
