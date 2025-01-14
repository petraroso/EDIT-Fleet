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

export const deleteVehicle = async (req, res) => {
  try {
    const vehicleFromDb = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicleFromDb) {
      return res.status(404).send("Vozilo ne postoji");
    }
    res.send("Vozilo izbrisano");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const editVehicle = async (req, res) => {
  try {
    const vehicleFromDb = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!vehicleFromDb) {
      return res.status(404).send("Vozilo ne postoji");
    }
    res.json(vehicleFromDb);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
