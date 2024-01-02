// sortieRoutes.js
const express = require('express');
const router = express.Router();
const sortieController = require('../Controller/sortie');

router.post('/sorties', sortieController.addSortie);
router.get('/sorties', sortieController.getAllSorties);
router.get('/sorties/:id', sortieController.getSortieById);
router.put('/sorties/:id', sortieController.updateSortie);
router.delete('/sorties/:id', sortieController.deleteSortie);
router.get('/sorties/client/:clientId', sortieController.getSortiesByClient);

module.exports = router;
