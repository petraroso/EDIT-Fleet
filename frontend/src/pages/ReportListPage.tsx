import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportListTable from "../components/ReportListTable";
import { Report } from "../data/models";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ReportListPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Niste prijavljeni. Molimo prijavite se.");
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/reports`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };
    fetchReports();
  }, []);

  const handleSolve = async (reportId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Niste prijavljeni. Molimo prijavite se.");
      return;
    }
    try {
      await axios.patch(
        `${BASE_URL}/api/reports/${reportId}`,
        {
          solved: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === reportId ? { ...report, solved: true } : report
        )
      );
      alert("Prijava problema je uspješno riješena.");
    } catch (error) {
      console.error("Error updating report:", error);
      alert("Došlo je do greške prilikom rješavanja prijave problema.");
    }
  };

  const handleDelete = async (reportId: string) => {
    const confirmCancel = window.confirm(
      "Jeste li sigurni da želite izbrisati ovu prijavu problema?"
    );

    if (!confirmCancel) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Niste prijavljeni. Molimo prijavite se.");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/api/reports/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReports((prevReports) =>
        prevReports.filter((report) => report._id !== reportId)
      );
      //alert("Prijava problema je uspješno izbrisana.");
    } catch (error) {
      console.error("Error deleting report:", error);
      alert("Došlo je do greške prilikom brisanja prijave problema.");
    }
  };

  // Separate reports by solved status
  const unsolvedReports = reports.filter((report) => !report.solved);
  const solvedReports = reports.filter((report) => report.solved);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Prijavljeni problemi</h1>

      {/* Unresolved reports table */}
      <ReportListTable
        title="Neriješene prijave problema"
        reports={unsolvedReports}
        onSolve={handleSolve}
        onDelete={handleDelete}
        hasCheckIcon={true}
      />

      {/* Solved reports table */}
      <ReportListTable
        title="Riješene prijave problema"
        reports={solvedReports}
        onDelete={handleDelete}
        hasCheckIcon={false}
      />
    </div>
  );
};

export default ReportListPage;
