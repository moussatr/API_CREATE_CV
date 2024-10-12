const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

// Import des routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cvRoutes = require("./routes/cvRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// Initialisation de l'application
const app = express();

// Middleware
app.use(cors()); // Activer les requêtes Cross-Origin
app.use(express.json()); // Permettre à l'application de traiter les requêtes JSON

// Routes
app.use("/api/auth", authRoutes); // Routes pour l'authentification (inscription, connexion)
app.use("/api/users", userRoutes); // Routes pour la gestion des utilisateurs (profil)
app.use("/api/cv", cvRoutes); // Routes pour la gestion des CV
app.use("/api/recommendation", recommendationRoutes); // Routes pour les recommandations

// Connexion à la base de données MongoDB

connectDB();

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
