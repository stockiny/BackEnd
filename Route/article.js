const express = require('express');
const router = express.Router();
const articleController = require('../Controller/article');

const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });
  
  const upload = multer({ storage: storage });
router.post('/articles', upload.single('Photo'), articleController.addArticle);

router.patch('/articles/:id', articleController.updateArticle);

// Supprimer un article par son ID
router.delete('/articles/:id', articleController.deleteArticle);

// Obtenir tous les articles
router.get('/articles', articleController.getAllArticles);

router.get('/articles/somme', articleController.Somme);
router.get('/articles/sommeTTC', articleController.SommeTTC);


// Obtenir un article par son ID
router.get('/articles/:id', articleController.getArticleById);

// Obtenir des articles par type
router.get('/articles/type/:type', articleController.getByType);

// Mettre à jour les prix des articles
router.patch('/articles/update-prices', articleController.updatePrices);

module.exports = router;
