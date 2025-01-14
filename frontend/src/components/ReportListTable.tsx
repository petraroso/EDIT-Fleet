import React from "react";
import ReportRow from "./ReportRow";
import { Report } from "../data/models";

interface ReportListTableProps {
  title: string;
  reports: Report[];
  onSolve?: (reportId: string) => void;
  onDelete: (reportId: string) => void;
  hasCheckIcon: boolean;
}

const ReportListTable: React.FC<ReportListTableProps> = ({
  title,
  reports,
  onSolve,
  onDelete,
  hasCheckIcon,
}) => {
  return (
    <div className="w-full mb-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-md shadow-md table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/4 px-4 py-2 text-left">Naslov</th>
              <th className="w-1/4 px-4 py-2 text-left">Vozilo</th>
              <th className="w-1/4 px-4 py-2 text-left">Korisnik</th>
              <th className="w-1/4 px-4 py-2 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <ReportRow
                  key={report._id}
                  report={report}
                  onSolve={onSolve}
                  onDelete={onDelete}
                  hasCheckIcon={hasCheckIcon}
                />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
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
