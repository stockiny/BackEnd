const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: "article", unique: true },
    quantiteInitiale: { type: Number },
    quantiteVendue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Stock = mongoose.model("stock", stockSchema);

module.exports = Stock;
