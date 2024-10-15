const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Inscription d'un utilisateur
exports.register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Créer un nouvel utilisateur
    const user = new User({ firstname, lastname, email, password });
    await user
      .save()
      .then(() => res.status(201).json({ message: "User created!" }))
      .catch((error) => {
        return res.status(400).json({ error });
      });

    // return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user" });
  }
};

// Connexion de l'utilisateur
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "Error logging in" });
  }
};
