const Cv = require("../models/Cv");

// Créer un CV
exports.createCv = async (req, res) => {
  try {
    const cv = new Cv({ userId: req.user.id, ...req.body });
    await cv.save();
    res.status(201).json(cv);
  } catch (error) {
    res.status(400).json({ error: "Error creating CV" });
  }
};

// Modifier un CV
exports.updateCv = async (req, res) => {
  try {
    const cv = await Cv.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(cv);
  } catch (error) {
    res.status(400).json({ error: "Error updating CV" });
  }
};

// Récupérer les CV visibles
exports.getAllVisibleCvs = async (req, res) => {
  try {
    const cvs = await Cv.find({ visible: true });
    res.json(cvs);
  } catch (error) {
    res.status(400).json({ error: "Error fetching CVs" });
  }
};

const PDFDocument = require("pdfkit");
const User = require("../models/User"); // Assurez-vous que le modèle User est bien importé

// Générer le PDF du CV
exports.generateCV = async (req, res) => {
  try {
    const userId = req.user.id; // Récupérer l'ID de l'utilisateur depuis la requête
    const user = await User.findById(userId); // Trouver l'utilisateur par son ID

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Créer un nouveau document PDF
    const doc = new PDFDocument();

    // Définir l'en-tête de la réponse
    res.setHeader(
      "Content-disposition",
      `attachment; filename=cv-${user.firstname}-${user.lastname}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    // Pipe le PDF dans la réponse
    doc.pipe(res);

    // Ajouter du contenu au PDF
    doc
      .fontSize(25)
      .text(`CV de ${user.firstname} ${user.lastname}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(15).text(`Email: ${user.email}`);
    doc.moveDown();

    // Ajouter d'autres informations de CV ici
    doc.fontSize(20).text("Expériences Pédagogiques:");
    user.education.forEach((item) => {
      doc
        .fontSize(14)
        .text(`${item.degree}, ${item.institution} - ${item.year}`);
      doc.moveDown();
    });

    doc.fontSize(20).text("Expériences Professionnelles:");
    user.experience.forEach((item) => {
      doc
        .fontSize(14)
        .text(`${item.position}, ${item.company} - ${item.duration}`);
      doc.moveDown();
    });

    // Finaliser le PDF
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating CV" });
  }
};
