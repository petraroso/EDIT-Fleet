import jwt from "jsonwebtoken";
import { User } from "../models/models.js";

import dotenv from "dotenv";

dotenv.config();

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

//middleware za verifikaciju jwt tokena
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(403).send("Ne postoji autorizacijsko zaglavlje");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).send("Bearer token nije pronađen");

  try {
    const decodedTokenUser = jwt.verify(token, JWT_TOKEN_SECRET);
    req.user = decodedTokenUser;
  } catch (err) {
    return res.status(401).send("Neispravan token");
  }
  return next();
};

//AUTHORIZATION
const verifyRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    res.status(403).send(`Zabranjen pristup - ${req.user.role} `);
  }
};

const fetchUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Token nije pronađen");

    const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).send("Korisnik nije pronađen");

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Neispravan token");
  }
};

//not used:
const verifyCookie = (cookieName) => (req, res, next) => {
  const token = req.cookies[cookieName];
  if (!token) {
    return res.status(401).json({ error: "Nemate pristup." });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_TOKEN_SECRET);
    req.user = decodedToken; // Spremamo dekodirane podatke korisnika
    next();
  } catch (err) {
    return res.status(401).json({ error: "Neispravan token" });
  }
};

//not used:
function validateEmail(req, res, next) {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).send({ error: "Neispravna e-mail adresa." });
  }

  next();
}

export { verifyToken, verifyCookie, verifyRole, validateEmail, fetchUser };
