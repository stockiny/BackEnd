const mongoose = require("mongoose");
const { Schema } = mongoose;



const categporySchema = new Schema(
    {
        description: { type: String },
        Libelle: { type: String },
    },
    { timestamps: true }
);


const category = mongoose.model("category", categporySchema);

module.exports = category;
