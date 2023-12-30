const express = require("express");
const router = express.Router();
const fournisseurController = require('../Controller/fournisseur');

router.post('/fournisseurs', fournisseurController.addFournisseur);
router.get('/fournisseurs', fournisseurController.getAllFournisseurs);
router.get('/fournisseurs/:id', fournisseurController.getFournisseurById);
router.put('/fournisseurs/:id', fournisseurController.updateFournisseur);
router.delete('/fournisseurs/:id', fournisseurController.deleteFournisseur);

module.exports = router;
