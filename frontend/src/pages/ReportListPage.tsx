import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportListTable from "../components/ReportListTable";

interface Report {
  _id: string;
  title: string;
  description: string;
  vehicle: string;
  user: string;
}

const ReportListPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // const response = await axios.get("/api/reports");
        // setReports(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Prijavljeni problemi</h1>
      <ReportListTable reports={reports} />
    </div>
  );
};

export default ReportListPage;
