const { Schema, SchemaTypes, model } = require('mongoose');

const categories = [
  'Транспорт',
  'Продукты',
  'Здоровье',
  'Алкоголь',
  'Развлечения',
  'Всё для дома',
  'Техника',
  'Коммуналка, связь',
  'Спорт, хобби',
  'Образование',
  'Прочее',
  // ???
  'ЗП',
  'Доп. доход',
];
// Перевести на eng название категорий

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, 'Enter the type'],
      enum: ['income', 'cost'],
    },
    amount: {
      type: Number,
      required: [true, 'Enter the amount'],
      //  validation - max 2 symbols after comma - middleware or client ??
    },
    category: {
      type: String,
      required: [true, 'Enter the category'],
      enum: categories,
    },
    subcategory: {
      type: String,
      default: 'Прочее',
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
      type: SchemaTypes.ObjectId,
      ref: 'authUser',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
};
