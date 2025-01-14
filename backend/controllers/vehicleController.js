import { Vehicle } from "../models/models.js";

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    console.error("Greška prilikom dohvaćanja vozila:", error);
    res.status(500).json({ error: "Dogodila se greška na serveru" });
  }
};
