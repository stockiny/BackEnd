const express = require("express");
const router = express.Router();
const clientController = require('../Controller/client');

router.post('/clients', clientController.addClient);
router.get('/clients', clientController.getAllClients);
router.get('/clients/:clientId', clientController.getClientById);
router.put('/clients/:clientId', clientController.updateClientById);
router.delete('/clients/:id', clientController.deleteClient);


module.exports = router;