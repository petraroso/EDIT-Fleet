import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { Vehicle } from "../data/models";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ReportPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/vehicles`);
        const availableVehicles = response.data.filter(
          (vehicle: Vehicle) => vehicle.available
        );
        setVehicles(availableVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (title !== "" && description !== "" && vehicleId !== "") {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Niste prijavljeni. Molimo prijavite se prije prijave problema.");
        return;
      }

      // Construct report data
      const reportData = {
        title,
        description,
        vehicleId,
      };

      try {
        const response = await axios.post(
          `${BASE_URL}/api/report`,
          reportData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Prijava problema uspješna!");
        setTitle("");
        setDescription("");
        setVehicleId("");
      } catch (error) {
        console.error("There was an error with the report submission:", error);
        alert("Dogodila se greška prilikom prijave problema.");
      }
    } else alert("Ispunite sva polja.");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Prijava problema</h1>
      <form
        onSubmit={handleReport}
        className="p-6 bg-white rounded shadow-md w-96"
      >
        <Input
          label="Naslov"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="textarea"
        />
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Vozilo:</label>
          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Odaberite vozilo</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle._id} value={vehicle._id}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </div>
        <Button label="Prijavi" type="submit" className="w-full mt-4" />
      </form>
    </div>
  );
};

export default ReportPage;
