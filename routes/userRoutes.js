const express = require("express");
const {
  getUsers,
  getUserById,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Route pour afficher tous les utilisateurs (protégée si nécessaire)
router.get("/", protect, getUsers);

// Route pour afficher un utilisateur spécifique par ID (protégée si nécessaire)
router.get("/:id", protect, getUserById);

// Route pour mettre à jour le profil (protégée)
router.put("/profile", protect, updateProfile);

module.exports = router;
