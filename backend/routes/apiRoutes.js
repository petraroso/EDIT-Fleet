import express from "express";
import { fetchUser } from "../middleware/middleware.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import { reserveCar, getReservations } from "../controllers/reservationController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reserve", fetchUser, reserveCar);
//router.patch("/reserve", reserveCarEdit);
router.get("/reservations", fetchUser, getReservations) //provjeriToken

export default router;
