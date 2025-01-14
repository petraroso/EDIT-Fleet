import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleListTable from "../components/VehicleListTable";
import { Vehicle } from "../data/models";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const VehicleListPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/vehicles`);
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  const availableVehicles = vehicles.filter((vehicle) => vehicle.available);
  const unavailableVehicles = vehicles.filter((vehicle) => !vehicle.available);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Popis vozila</h1>

      <VehicleListTable title="Dostupna vozila" vehicles={availableVehicles} />
      <VehicleListTable
        title="Nedostupna vozila"
        vehicles={unavailableVehicles}
      />
    </div>
  );
};

export default VehicleListPage;
