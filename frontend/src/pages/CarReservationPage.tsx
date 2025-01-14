import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CarReservationPage: React.FC = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [period, setPeriod] = useState("");
  const [purpose, setPurpose] = useState("");

  // Handle the reservation submit
  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicleType !== "" && period !== "" && purpose !== "") {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Niste prijavljeni. Molimo prijavite se prije rezervacije.");
        return;
      }

      // Podaci za rezervaciju
      const reservationData = {
        vehicleType,
        period,
        purpose,
      };

      try {
        const response = await axios.post(
          `${BASE_URL}/api/reserve`,
          reservationData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Rezervacija uspješna!");
        setVehicleType("");
        setPeriod("");
        setPurpose("");
      } catch (error: any) {
        console.error("There was an error with the reservation:", error);
        alert("Dogodila se greška prilikom rezervacije.");
      }
    } else alert("Ispunite sva polja.");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Rezervirajte automobil</h1>
      <form
        onSubmit={handleReservation}
        className="p-6 bg-white rounded shadow-md w-96"
      >
        <Input
          label="Tip vozila"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
        />
        <Input
          label="Vremenski period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
        <Input
          label="Svrha"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />
        <Button label="Rezerviraj" type="submit" className="w-full mt-4" />
      </form>
    </div>
  );
};

export default CarReservationPage;
