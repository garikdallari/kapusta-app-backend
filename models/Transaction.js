const { Schema, model } = require("mongoose");

const categories = [
  "Транспорт",
  "Продукты",
  "Здоровье",
  "Алкоголь",
  "Развлечения",
  "Всё для дома",
  "Техника",
  "Коммуналка, связь",
  "Спорт, хобби",
  "Образование",
  "Прочее",
  // ???
  "ЗП",
  "Доп. доход",
];

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Enter the type"],
      enum: ["income", "cost"],
    },
    amount: {
      type: Number,
      required: [true, "Enter the amount"],
      //  validation - max 2 symbols after comma - middleware ??
    },
    category: {
      type: String,
      required: [true, "Enter the category"],
      enum: categories,
      message: "Enter correct category",
    },
    subcategory: {
      type: String,
      default: "Прочее",
    },
    date: {
      day: {
        type: String,
        required: [true, "Enter the date"],
      },
      month: {
        type: String,
        required: [true, "Enter the date"],
      },
      year: {
        type: String,
        required: [true, "Enter the date"],
      },
      // date validation
    },
    // owner: {},
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
};
