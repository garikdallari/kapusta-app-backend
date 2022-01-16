const { Schema, model } = require('mongoose');
const Joi = require('joi');

const categories = [
  'transport',
  'food',
  'health',
  'alcohol',
  'activities',
  'home_stuff',
  'gadgets',
  'utility_bills',
  'hobbies',
  'education',
  'others',
  // ???
  'salary',
  'extra_income',
];

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Enter the type'],
      enum: ['income', 'expense'],
    },
    amount: {
      type: Number,
      required: [true, 'Enter the amount'],
    },
    category: {
      type: String,
      required: [true, 'Enter the category'],
      enum: categories,
    },
    subcategory: {
      type: String,
      default: 'others',
    },
    date: {
      day: {
        type: String,
        required: [true, 'Enter the date'],
        minLength: 1,
        maxLength: 2,
      },
      month: {
        type: String,
        required: [true, 'Enter the date'],
        minLength: 1,
        maxLength: 2,
      },
      year: {
        type: String,
        required: [true, 'Enter the date'],
        minLength: 4,
        maxLength: 4,
      },
      // date validation
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'authUser',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

const joiTransactionsSchema = Joi.object({
  type: Joi.string().required().valid('income', 'expense'),
  amount: Joi.number().required(),
  category: Joi.string()
    .required()
    .valid(...categories),
  subcategory: Joi.string(),
  date: Joi.object({
    day: Joi.string().required().min(1).max(2),
    month: Joi.string().required().min(1).max(2),
    year: Joi.string().required().min(4).max(4),
  }),
});

module.exports = {
  Transaction,
  joiTransactionsSchema,
};
