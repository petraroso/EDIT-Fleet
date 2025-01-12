import jwt from "jsonwebtoken";

//middleware za verifikaciju jwt tokena
const verifyToken = (JWT_TOKEN_SECRET) =>(req, res,  next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(403).send("Ne postoji autorizacijsko zaglavlje");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).send("Bearer token nije pronađen");

  jwt.verify(token, JWT_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Neispravan token" });
    req.user = user;
    next();
  });
};

const verifyCookie = (cookieName, JWT_TOKEN_SECRET) => (req, res, next) => {
  const token = req.cookies[cookieName];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_TOKEN_SECRET);
    req.user = decodedToken; // Spremamo dekodirane podatke korisnika
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
//AUTHORIZATION
const verifyRole = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("Korisnik nije autentificiran");
  }

  if (req.user.role === role) {
    return next();
  }

  return res.status(403).send(`Zabranjen pristup za ulogu: ${req.user.role}`);
};


function validateEmail(req, res, next) {
  const email = req.body.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).send({ error: "Neispravna e-mail adresa." });
  }

  next();
}


export { verifyToken, verifyCookie, verifyRole, validateEmail };