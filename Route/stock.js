const express = require("express");
const router = express.Router();
const stockController = require("../Controller/stock");

// Route pour obtenir le stock avec la quantité restante
router.get("/stock", stockController.getStock);

module.exports = router;
