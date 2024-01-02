const mongoose = require("mongoose");
const { Schema } = mongoose;


const ArticSchema = new Schema(
  {
    article: { type: Schema.Types.ObjectId, ref: "article" },
    qte: { type: Number },
  },
  { timestamps: true }
);

const sortieSchema = new Schema(
  {
    Client: { type: Schema.Types.ObjectId, ref: "client" },
    Article: {type: [ArticSchema]},
    DateSortie : {type : Date},
    Etat : { type: String, enum: ["Payée", "Non Payée", "En Cours"], required: true}
  },
  { timestamps: true }
);


const Sortie = mongoose.model("sortie", sortieSchema);

module.exports = Sortie;
