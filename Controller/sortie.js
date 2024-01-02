const Sortie = require("../Model/sortie");


exports.addSortie = async (req, res, next) => {
    try {
      const sortieData = req.body;
      const newSortie = new Sortie(sortieData);
      const savedSortie = await newSortie.save();
      res.status(200).json({
        success: true,
        sortie: savedSortie,
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.updateSortie = async (req, res, next) => {
    try {
      const sortieId = req.params.id;
      const updatedData = req.body;
      const updatedSortie = await updateSortieById(sortieId, updatedData);
      res.status(200).json({
        success: true,
        sortie: updatedSortie,
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.deleteSortie = async (req, res, next) => {
    try {
      const sortieId = req.params.id;
      await Sortie.findByIdAndDelete(sortieId);
      res.status(200).json({
        success: true,
        message: "Vente deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  };
  
  exports.getAllSorties = async (req, res, next) => {
    try {
      const sorties = await Sortie.find().populate('Client').populate('Article.article').exec();
      res.status(200).json({
        success: true,
        sorties: sorties,
      });
    } catch (err) {
      next(err);
    }
  };
  exports.getSortieById = async (req, res, next) => {
    try {
      const sortieId = req.params.id;
  
      const sortie = await Sortie.findById(sortieId)
        .populate('Article.article')
        .populate('Client')
        .lean();
  
      if (!sortie) {
        return res.status(404).json({
          success: false,
          error_message: "Sortie not found",
        });
      }
      res.status(200).json({
        success: true,
        sortie: { ...sortie},
      });
    } catch (err) {
      next(err);
    }
  };


  exports.getSortiesByClient = async (req, res, next) => {
    try {
        const clientId = req.params.clientId;

        const sorties = await Sortie.find({'Client': clientId })
            .populate('Article.article')
            .populate('Client')
            .lean();

        res.status(200).json({
            success: true,
            sorties: sorties,
        });
    } catch (err) {
        next(err);
    }
};






 