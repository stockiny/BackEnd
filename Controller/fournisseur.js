const Fournisseur = require("../Model/fournisseur");
exports.addFournisseur = async (req, res, next) => {
  try {
    const { Adresse, Email, Telephone, Fax, MatriculFiscal, Description, Contact, RaisonSocial } = req.body;
    const newFournisseur = new Fournisseur({
      Adresse,
      Email,
      Telephone,
      Fax,
      MatriculFiscal,
      Description,
      Contact,
      RaisonSocial,
    });
    const savedFournisseur = await newFournisseur.save();
    res.status(200).json({
      success: true,
      fournisseur: savedFournisseur,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateFournisseur = async (req, res, next) => {
  try {
    const fournisseurId = req.params.id;
    const updatedData = req.body;
    const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
      fournisseurId,
      updatedData,
      { new: true }
    );
    res.status(200).json({
      success: true,
      fournisseur: updatedFournisseur,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteFournisseur = async (req, res, next) => {
  try {
    const fournisseurId = req.params.id;
    await Fournisseur.findByIdAndDelete(fournisseurId);
    res.status(200).json({
      success: true,
      message: "Fournisseur deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllFournisseurs = async (req, res, next) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.status(200).json({
      success: true,
      fournisseurs: fournisseurs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getFournisseurById = async (req, res, next) => {
  try {
    const fournisseurId = req.params.id;
    const fournisseur = await Fournisseur.findById(fournisseurId);
    if (!fournisseur) {
      return res.status(404).json({
        success: false,
        error_message: "Fournisseur not found",
      });
    }
    res.status(200).json({
      success: true,
      fournisseur: fournisseur,
    });
  } catch (err) {
    next(err);
  }
};
