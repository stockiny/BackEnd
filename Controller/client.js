const client = require('../Model/client');

exports.addClient = async (req, res, next) => {
  try {
    const { nom, prenom, adresse, cin, delvirele, telephone, email } = req.body;

    const newClient = new client({
      nom,
      prenom,
      adresse,
      cin,
      delvirele,
      telephone,
      email,
    });

    const savedClient = await newClient.save();

    res.status(200).json({
      success: true,
      client: savedClient,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateClientById = async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    const updatedClient = await client.findByIdAndUpdate(clientId, req.body, { new: true });

    res.status(200).json({
      success: true,
      client: updatedClient,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllClients = async (req, res, next) => {
  try {
    const clients = await client.find();

    res.status(200).json({
      success: true,
      clients,
    });
  } catch (err) {
    next(err);
  }
};

exports.getClientById = async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    const client = await client.findById(clientId);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found',
      });
    }

    res.status(200).json({
      success: true,
      client,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteClient = async (req, res, next) => {
    try {
      const clientId = req.params.id; 

      await client.findByIdAndDelete(clientId);

      res.status(200).json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
};