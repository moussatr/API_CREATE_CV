const express = require("express");
const {
  createCv,
  updateCv,
  getAllVisibleCvs,
  generateCV,
} = require("../controllers/cvController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createCv);
router.put("/:id", protect, updateCv);
router.get("/", getAllVisibleCvs);
// Route pour générer le PDF du CV
router.get("/generate-pdf", protect, generateCV);

module.exports = router;
