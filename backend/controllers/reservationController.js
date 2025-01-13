import { Reservation } from "../models/models.js";

export const reserveCar = async (req, res) => {
  const reservation = req.body;

  if (!req.user) {
    return res.status(401).json({ error: "Neautoriziran zahtjev" });
  }

  const newReservation = new Reservation({
    vehicle_type: reservation.vehicleType,
    period: reservation.period,
    purpose: reservation.purpose,
    approved: false,
    vehicle: null,
    user: req.user._id,
  });

  try {
    const savedReservation = await newReservation.save();
    res.status(201).json({
      message: "Rezervacija stvorena",
      reservation: savedReservation,
    });
  } catch (error) {
    console.error("Greška prilikom spremanja rezervacije:", error);
    res.status(500).json({ error: "Dogodila se greška na serveru" });
  }
};
