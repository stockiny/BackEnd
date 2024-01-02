const Stock = require("../Model/stock");
const Sortie = require("../Model/sortie");
const Article = require("../Model/article");

exports.getStock = async (req, res, next) => {
  try {
    const articles = await Article.find();

    const sorties = await Sortie.find();

   

  
    const stock = articles.map(article => ({
      article: article.id,
      Reference : article.Reference,
      Designation : article.Designation,
      quantiteInitiale: parseInt(article.Quantite) || 0,
      quantiteVendue: 0,
      quantiteRestante: parseInt(article.Quantite) || 0,
    }));

    // Mettez à jour le stock en fonction des sorties
    for (const sortie of sorties) {
      for (const articleSortie of sortie.Article) {
        // Utilisez [0] pour obtenir le premier élément du tableau s'il existe
        const articleId = Array.isArray(articleSortie.article) ? articleSortie.article[0].toString() : articleSortie.article?.toString();

        if (articleId) {
          const stockItem = stock.find(item => item.article === articleId);

          if (stockItem) {
            stockItem.quantiteVendue += articleSortie.qte;
            stockItem.quantiteRestante -= articleSortie.qte;
          }
        }
      }
    }


    res.status(200).json({
      success: true,
      stock: stock,
      
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
