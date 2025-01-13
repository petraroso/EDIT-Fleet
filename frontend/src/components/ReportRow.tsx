import React, { useState } from "react";

interface Report {
  _id: string;
  title: string;
  description: string;
  vehicle: string;
  user: string;
}

interface ReportRowProps {
  report: Report;
}

const ReportRow: React.FC<ReportRowProps> = ({ report }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr
        className={`cursor-pointer ${isExpanded ? "bg-gray-100" : ""}`}
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <td className="px-4 py-2">{report.title}</td>
        <td className="px-4 py-2">{report.vehicle}</td>
        <td className="px-4 py-2">{report.user}</td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={3} className="px-4 py-4">
            <strong>Opis problema:</strong>
            <p className="mt-2">{report.description}</p>
          </td>
        </tr>
      )}
    </>
  );
};

export default ReportRow;
