const { Schema, model } = require("mongoose");

const testSchema = new Schema(
  {
    field: {
      type: String,
      required: [true, "Add field"],
    },
  },
  { versionKey: false, timestamps: true },
);

const Test = model("test", testSchema);

module.exports = {
  Test,
};
