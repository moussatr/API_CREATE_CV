const Recommendation = require("../models/Recommendation");
const Cv = require("../models/Cv");

// Ajouter une recommandation sur un CV
exports.addRecommendation = async (req, res) => {
  const { cvId, text } = req.body;

  try {
    // Vérifie si le CV existe et est visible
    const cv = await Cv.findById(cvId);
    if (!cv) {
      return res.status(404).json({ error: "CV not found" });
    }
    if (!cv.visible) {
      return res.status(400).json({ error: "CV is not visible" });
    }

    // Crée une nouvelle recommandation
    const recommendation = new Recommendation({
      userId: req.user.id,
      cvId: cvId,
      text: text,
    });

    // Sauvegarde la recommandation
    await recommendation.save();
    res
      .status(201)
      .json({ message: "Recommendation added successfully", recommendation });
  } catch (error) {
    res.status(500).json({ error: "Failed to add recommendation" });
  }
};

// Récupérer toutes les recommandations d'un CV
exports.getRecommendationsByCvId = async (req, res) => {
  const { cvId } = req.params;

  try {
    const recommendations = await Recommendation.find({ cvId: cvId }).populate(
      "userId",
      "firstname lastname"
    );
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
};

// Récupérer toutes les recommandations (facultatif, à utiliser pour une vue admin ou un dashboard)
exports.getAllRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find()
      .populate("userId", "firstname lastname")
      .populate("cvId", "firstname lastname");
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch all recommendations" });
  }
};
