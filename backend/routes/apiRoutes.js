import express from "express";
import {
  fetchUser,
  verifyToken,
  verifyRole,
} from "../middleware/middleware.js";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";
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
router.post("/reserve", verifyToken, fetchUser, verifyRole("User"), reserveCar);
router.get(
  "/reservations",
  verifyToken,
  fetchUser,
  verifyRole("User"),
  getReservations
);
router.post(
  "/report",
  verifyToken,
  fetchUser,
  verifyRole("User"),
  reportProblem
);

//user i admin
router.delete("/reservations/:id", verifyToken, deleteReservation);
router.post("/logout", logoutUser);

//admin
router.get(
  "/requests",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  getAllReservations
); //provjeri admin
router.get(
  "/vehicles",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  getAllVehicles
);
router.patch(
  "/vehicle/:id",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  editVehicle
);
router.delete(
  "/vehicle/:id",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  deleteVehicle
);
router.get(
  "/reports",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  getAllReports
);
router.patch(
  "/reports/:id",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  editReport
);
router.delete(
  "/reports/:id",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  deleteReport
);
router.patch(
  "/reservations/:id",
  verifyToken,
  fetchUser,
  verifyRole("Admin"),
  editReservation
);

export default router;
