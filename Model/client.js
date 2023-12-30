const mongoose = require("mongoose");
const { Schema } = mongoose;



const clientSchema = new Schema(
    {
        nom: { type: String },
        prenom: { type: String },
        adresse : {type : String},
        cin : {type: String},
        delvirele : {type : Date},
        telephone : {type : String},
        email : {type : String}
    },
    { timestamps: true }
);


const client = mongoose.model("client", clientSchema);

module.exports = client;