import express from "express";
import { fetchUser, verifyToken } from "../middleware/middleware.js";
import { registerUser, loginUser } from "../controllers/userController.js";
import {
  reserveCar,
  getReservations,
  getAllReservations,
  deleteReservation,
  editReservation,
} from "../controllers/reservationController.js";
import {
  getAllVehicles,
  editVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";
import {
  getAllReports,
  reportProblem,
  editReport,
  deleteReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//user
router.post("/reserve", verifyToken, fetchUser, reserveCar);
router.get("/reservations", verifyToken, fetchUser, getReservations);
router.post("/report", verifyToken, fetchUser, reportProblem);

//user i admin
router.delete("/reservations/:id", verifyToken, deleteReservation);

//admin
router.get("/requests", verifyToken, getAllReservations); //provjeri admin
router.get("/vehicles", verifyToken, getAllVehicles);
router.patch("/vehicle/:id", verifyToken, editVehicle);
router.delete("/vehicle/:id", verifyToken, deleteVehicle);
router.get("/reports", verifyToken, getAllReports); 
router.patch("/reports/:id", verifyToken, editReport);
router.delete("/reports/:id", verifyToken, deleteReport);
router.patch("/reservations/:id", verifyToken, editReservation);

export default router;
