import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/models.js";

dotenv.config();

const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
const saltRunde = 10;

export const registerUser = async (req, res) => {
  try {
    const hashLozinka = await bcrypt.hash(req.body.password, saltRunde);
    const noviKorisnik = new User({ ...req.body, password: hashLozinka });
    const token = jwt.sign({ _id: noviKorisnik._id, role: noviKorisnik.role }, JWT_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      maxAge: 3600000, // 1 sat
      secure: false,
    });

    await noviKorisnik.save();

    res.status(200).json({
      message: "Korisnik uspjesno registriran",
      token,
      user: {
        username: noviKorisnik.username,
        role: noviKorisnik.role,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const korisnikBaza = await User.findOne({ email: req.body.email });
    if (
      korisnikBaza &&
      (await bcrypt.compare(req.body.password, korisnikBaza.password))
    ) {
      const token = jwt.sign({ _id: korisnikBaza._id, role: korisnikBaza.role }, JWT_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 3600000, // 1 sat
        secure: false,
      });

      res.status(200).json({
        message: "Prijava uspješna",
        token,
        user: {
          username: korisnikBaza.username,
          role: korisnikBaza.role,
        },
      });
    } else {
      res.status(401).send("Neispravni podaci za prijavu");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
