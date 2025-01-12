import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

const ReportPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [vehicle, setVehicle] = useState("");

  // Handle the issue report submit
  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();

    // Construct report data
    const reportData = {
      title,
      description,
      vehicle,
    };

    try {
      //const response = await axios.post("/api/report-issue", reportData);
      //console.log(response.data);
    } catch (error) {
      console.error("There was an error with the report submission:", error);
    }
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
        <Input
          label="Vozilo"
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value)}
        />
        <Button label="Prijavi" type="submit" className="w-full mt-4" />
      </form>
    </div>
  );
};

export default ReportPage;
