import { Reservation } from "../models/models.js";

export const reserveCar = async (req, res) => {
  const reservation = req.body;

  if (!req.user) {
    return res.status(401).json({ error: "Neautoriziran zahtjev" });
  }

  const newReservation = new Reservation({
    vehicleType: reservation.vehicleType,
    startDate: reservation.startDate,
    endDate: reservation.endDate,
    purpose: reservation.purpose,
    approved: false,
    vehicle:
      reservation.vehicleId && reservation.vehicleId !== ""
        ? reservation.vehicleId
        : null,
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

export const getReservations = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Neautoriziran zahtjev" });
  }
  try {
    const reservations = await Reservation.find({
      user: req.user._id,
    }).populate("vehicle");
    res.json(reservations);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja rezervacija:", error);
    res.status(500).json({ error: "Dogodila se greška na serveru" });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({})
      .populate("vehicle")
      .populate("user");
    res.json(reservations);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja rezervacija:", error);
    res.status(500).json({ error: "Dogodila se greška na serveru" });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    const reservationFromDb = await Reservation.findByIdAndDelete(
      req.params.id
    );
    if (!reservationFromDb) {
      return res.status(404).send("Rezervacija ne postoji");
    }
    res.send("Rezervacija izbrisana");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editReservation = async (req, res) => {
  try {
    const reservationFromDb = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!reservationFromDb) {
      return res.status(404).send("Rezervacija ne postoji");
    }
    res.json(reservationFromDb);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
