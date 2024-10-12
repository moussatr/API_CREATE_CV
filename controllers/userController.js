const User = require("../models/User");

// Afficher tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclure les mots de passe
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Afficher un utilisateur spécifique par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

// Mise à jour du profil utilisateur (déjà existant)
exports.updateProfile = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};
