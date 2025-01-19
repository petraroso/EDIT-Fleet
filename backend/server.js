import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./config/db.js";
import apiRoutes from "./routes/apiRoutes.js";
dotenv.config({ path: ".env.local" });

const PORT = process.env.PORT || 5000;
const app = express(); //instance of the express app

app.use(
  cors({
    origin: "http://localhost:3000", // URL frontenda
    credentials: true, // Omogućava slanje kolačića
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", apiRoutes);


//when deployed, most of errors should not be seen
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
  next(error);
});
app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
