const mongoose = require("mongoose");
const { Schema } = mongoose;



const fournisseurSchema = new Schema(
    {
        Adresse: { type: String },
        Email: { type: String },
        Telephone: { type: Number },
        Fax: { type: Number },
        MatriculFiscal: { type: String },
        Description: { type: String },
        Contact : {type: String},
        RaisonSocial: { type: String },
    },
    { timestamps: true }
);


const fournisseur = mongoose.model("fournisseur", fournisseurSchema);

module.exports = fournisseur;
