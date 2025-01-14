import express from "express";
import { fetchUser } from "../middleware/middleware.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import {
  reserveCar,
  getReservations,
  getAllReservations,
  deleteReservation,
} from "../controllers/reservationController.js";
import { getAllVehicles } from "../controllers/vehicleController.js";
import {
  getAllReports,
  reportProblem,
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//user
router.post("/reserve", fetchUser, reserveCar);
router.get("/reservations", fetchUser, getReservations);
router.post("/report", fetchUser, reportProblem);
router.delete("/reservations/:id", deleteReservation);

//admin
router.get("/requests", getAllReservations); //provjeri admin
router.get("/vehicles", getAllVehicles); //provjeri admin
router.get("/reports", getAllReports); //provjeri admin
//router.patch("/reserve", reserveCarEdit);

export default router;
