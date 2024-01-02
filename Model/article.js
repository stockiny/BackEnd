const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    Reference: { type: String },
    Designation: { type: String },
    Categorie: { type: Schema.Types.ObjectId, ref: "category" },
    Fournisseur: { type: Schema.Types.ObjectId, ref: "fournisseur" },
    PrixAchatHT: { type: Number, required: true },
    TauxTVA: { type: Number, default: 0 },
    TauxFodec: { type: Number, default: 0.00 },
    TauxMarge: { type: Number, default: 0 },
    CoutAchatTTC: { type: Number, default: 0 },
    PrixVenteTTC: { type: Number },
    Quantite: {type : String},
    Photo: { type: String }
  },
  { timestamps: true }
);

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
