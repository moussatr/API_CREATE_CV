const express = require("express");
const {
  addRecommendation,
  getRecommendationsByCvId,
  getAllRecommendations,
} = require("../controllers/recommendationController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Route pour ajouter une recommandation (utilisateur authentifié)
router.post("/", protect, addRecommendation);

// Route pour récupérer les recommandations d'un CV
router.get("/:cvId", getRecommendationsByCvId);

// (Facultatif) Route pour récupérer toutes les recommandations
router.get("/", getAllRecommendations);

module.exports = router;
