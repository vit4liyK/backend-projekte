const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const SECRET = "mein-geheimer-schluessel";

// Fake User Datenbank
const users = [];

// Registrierung
router.post("/register", async (req, res) => {
  const { email, passwort } = req.body;

  // Passwort verschlüsseln
  const verschluesselt = await bcrypt.hash(passwort, 10);

  // User speichern
  users.push({ email, passwort: verschluesselt });

  res.json({ message: "Registrierung erfolgreich!" });
});

// Login
router.post("/login", async (req, res) => {
  const { email, passwort } = req.body;

  // User finden
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.json({ message: "User nicht gefunden!" });
  }

  // Passwort prüfen
  const korrekt = await bcrypt.compare(passwort, user.passwort);
  if (!korrekt) {
    return res.json({ message: "Falsches Passwort!" });
  }

  // Token erstellen
  const token = jwt.sign({ email }, SECRET, { expiresIn: "7d" });

  res.json({ token });
});

module.exports = router;
