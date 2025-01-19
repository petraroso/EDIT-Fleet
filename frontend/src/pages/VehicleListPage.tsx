import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleListTable from "../components/VehicleListTable";
import { Vehicle } from "../data/models";
import { FaEdit, FaTimes, FaCheck } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const VehicleListPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [editingVehicleId, setEditingVehicleId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    name: string;
    type: string;
    technicalDate: string;
  }>({ name: "", type: "", technicalDate: "" });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/vehicles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicleId(vehicle._id);
    setEditValues({
      name: vehicle.name,
      type: vehicle.type,
      technicalDate: vehicle.technicalDate
        ? vehicle.technicalDate.toString().substring(0, 10)
        : "",
    });
  };

  const handleCancelEdit = () => {
    setEditingVehicleId(null);
  };

  const handleSaveEdit = async (vehicleId: string) => {
    try {
      const updatedValues = {
        ...editValues,
        technicalDate: new Date(editValues.technicalDate),
      };

      await axios.patch(`${BASE_URL}/api/vehicle/${vehicleId}`, updatedValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle._id === vehicleId
            ? {
                ...vehicle,
                name: updatedValues.name,
                type: updatedValues.type,
                technicalDate: updatedValues.technicalDate,
              }
            : vehicle
        )
      );
      setEditingVehicleId(null);
    } catch (error) {
      console.error("Error saving vehicle:", error);
    }
  };

  const handleDelete = async (vehicleId: string) => {
    const confirmCancel = window.confirm(
      "Jeste li sigurni da želite izbrisati ovo vozilo?"
    );

    if (!confirmCancel) {
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/api/vehicle/${vehicleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVehicles((prev) =>
        prev.filter((vehicle) => vehicle._id !== vehicleId)
      );
      //alert("Vozilo je uspješno izbrisano.");
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Došlo je do greške prilikom brisanja vozila.");
    }
  };

  const availableVehicles = vehicles.filter((vehicle) => vehicle.available);
  const unavailableVehicles = vehicles.filter((vehicle) => !vehicle.available);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Popis vozila</h1>

      <VehicleListTable
        title="Dostupna vozila"
        vehicles={availableVehicles}
        editingVehicleId={editingVehicleId}
        editValues={editValues}
        onEdit={handleEdit}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
        setEditValues={setEditValues}
        onDelete={handleDelete}
      />
      <VehicleListTable
        title="Nedostupna vozila"
        vehicles={unavailableVehicles}
        editingVehicleId={editingVehicleId}
        editValues={editValues}
        onEdit={handleEdit}
        onCancelEdit={handleCancelEdit}
        onSaveEdit={handleSaveEdit}
        setEditValues={setEditValues}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default VehicleListPage;
