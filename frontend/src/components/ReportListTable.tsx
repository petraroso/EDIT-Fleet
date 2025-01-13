import React, { useState } from "react";
import ReportRow from "./ReportRow";

interface Report {
  _id: string;
  title: string;
  description: string;
  vehicle: string;
  user: string;
}

interface ReportListTableProps {
  reports: Report[];
}

const ReportListTable: React.FC<ReportListTableProps> = ({ reports }) => {
  return (
    <div className="w-full mb-8">
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-md shadow-md table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/3 px-4 py-2 text-left">Naslov</th>
              <th className="w-1/3 px-4 py-2 text-left">Vozilo</th>
              <th className="w-1/3 px-4 py-2 text-left">Korisnik</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportRow key={report._id} report={report} />
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center">
                  Nema prijavljenih problema
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportListTable;
