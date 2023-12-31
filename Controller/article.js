const Article = require('../Model/article')
exports.addArticle = async (req, res, next) => {
  try {
    const {
      Reference,
      Designation,
      Categorie,
      Fournisseur,
      PrixAchatHT,
      TauxTVA,
      TauxFodec,
      PrixAchatAvecFodec,
      TauxMarge,
      CoutAchatTTC,
      PrixVenteTTC,

    } = req.body;

    /* const tauxFodec = parseFloat(TauxFodec);
     const tauxTVA = parseFloat(TauxTVA);
     const tauxMarge = parseFloat(TauxMarge);
 
     const PrixAchatAvecFodec = PrixAchatHT * (1 + tauxFodec / 100);
 
     const CoutAchatTTC = PrixAchatAvecFodec * (1 + tauxTVA / 100);
 
     const PrixVenteTTC = tauxMarge
       ? CoutAchatTTC * (1 + tauxMarge / 100)
       : CoutAchatTTC;*/
    console.log()

    const newArticle = new Article({
      Reference,
      Designation,
      Categorie,
      Fournisseur,
      PrixAchatHT,
      TauxTVA: TauxTVA,
      TauxFodec: TauxFodec,
      TauxMarge: TauxMarge,
      PrixAchatAvecFodec: PrixAchatAvecFodec,
      CoutAchatTTC: CoutAchatTTC,
      PrixVenteTTC: PrixVenteTTC ? PrixVenteTTC : -1,
      Photo: req.file ? req.file.path : undefined,
    });

    const savedArticle = await newArticle.save();


    res.status(200).json({
      success: true,
      article: {
        ...savedArticle,
        PrixAchatAvecFodec,
        CoutAchatTTC,
        PrixVenteTTC,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const updatedData = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      article: updatedArticle,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    await Article.findByIdAndDelete(articleId);

    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find().populate('Categorie').populate('Fournisseur');
    res.status(200).json({
      success: true,
      articles: articles,
    });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id;

    const article = await Article.findById(articleId).populate('Categorie').populate('Fournisseur').exec();

    if (!article) {
      return res.status(404).json({
        success: false,
        error_message: "article not found",
      });
    }

    res.status(200).json({
      success: true,
      article: article,
    });
  } catch (err) {
    next(err);
  }
};


exports.getByType = async (req, res, next) => {
  try {
    const type = req.params.type;

    const article = await Article.find({ Type: type }).populate('Categorie').populate('Fournisseur').exec();

    if (!article) {
      return res.status(404).json({
        success: false,
        error_message: "article not found",
      });
    }

    res.status(200).json({
      success: true,
      article: article,
    });
  } catch (err) {
    next(err);
  }
};
exports.updatePrices = async (req, res, next) => {

  const p = req.body.percent;
  const operation = req.body.operation;
  const percent = p / 100;
  if (operation == "augmenter") {
    const accesoireAndProfiles = await Materiel.find({ Type: { $in: ["PROFILES", "ACCESSOIRES"] } });
    for (let i of accesoireAndProfiles) {
      i.PrixVenteTTCBlanc = i.PrixVenteTTCBlanc + (i.PrixVenteTTCBlanc * percent);
      i.PrixVenteTTCNoir = i.PrixVenteTTCNoir + (i.PrixVenteTTCNoir * percent);
      i.PrixVenteTTCGris = i.PrixVenteTTCGris + (i.PrixVenteTTCGris * percent);
      i.PrixVenteTTCAutres = i.PrixVenteTTCAutres + (i.PrixVenteTTCAutres * percent);
      i.PrixVenteTTC = i.PrixVenteTTC + (i.PrixVenteTTC * percent);
      i.TauxMarge = i.PrixVenteTTC + percent;
      await i.save();
    }
    const AutresAndVitrage = await Materiel.find({ Type: { $in: ["AUTRES", "VITRAGES"] } });
    for (let i of AutresAndVitrage) {
      i.PrixVenteTTC = i.PrixVenteTTC + (i.PrixVenteTTC * percent);
      i.TauxMarge = i.PrixVenteTTC + percent;
      await i.save();
    }
    return res.json({ success: true });


  }
  if (operation == "reduire") {
    const accesoireAndProfiles = await Materiel.find({ Type: { $in: ["PROFILES", "ACCESSOIRES"] } });
    for (let i of accesoireAndProfiles) {
      i.PrixVenteTTCBlanc = i.PrixVenteTTCBlanc - (i.PrixVenteTTCBlanc * percent);
      i.PrixVenteTTCNoir = i.PrixVenteTTCNoir - (i.PrixVenteTTCNoir * percent);
      i.PrixVenteTTCGris = i.PrixVenteTTCGris - (i.PrixVenteTTCGris * percent);
      i.PrixVenteTTCAutres = i.PrixVenteTTCAutres - (i.PrixVenteTTCAutres * percent);
      i.PrixVenteTTC = i.PrixVenteTTC - (i.PrixVenteTTC * percent);
      i.TauxMarge = i.PrixVenteTTC - percent;
      await i.save();
    }
    const AutresAndVitrage = await Materiel.find({ Type: { $in: ["AUTRES", "VITRAGES"] } });
    for (let i of AutresAndVitrage) {
      i.PrixVenteTTC = i.PrixVenteTTC - (i.PrixVenteTTC * percent);
      i.TauxMarge = i.PrixVenteTTC - percent;
      await i.save();
    }
    return res.json({ success: true });

  }


};

