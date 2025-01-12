import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios"; 

const CarReservationPage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [purpose, setPurpose] = useState("");

  // Handle the reservation submit
  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct reservation data
    const reservationData = {
      vehicleType,
      timePeriod,
      purpose,
    };

    try {
      //const response = await axios.post("/api/reserve", reservationData);
      //console.log(response.data);
    } catch (error) {
      console.error("There was an error with the reservation:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Rezervirajte automobil</h1>
      <form onSubmit={handleReservation} className="p-6 bg-white rounded shadow-md w-96">
        <Input
          label="Tip vozila"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />
        <Input
          label="Vremenski period"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
        />
        <Input
          label="Svrha"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <Button
          label="Rezerviraj"
          type="submit"
          className="w-full mt-4"
        />
      </form>
    </div>
  );
};

export default CarReservationPage;
