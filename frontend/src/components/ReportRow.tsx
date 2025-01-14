import React, { useState } from "react";
import { Report } from "../data/models";

interface ReportRowProps {
  report: Report;
  isExpanded: boolean;
  onExpand: (reportId: string) => void;
}

const ReportRow: React.FC<ReportRowProps> = ({
  report,
  isExpanded,
  onExpand,
}) => {
  return (
    <>
      <tr
        className={`cursor-pointer transition-colors 
          ${isExpanded ? "bg-blue-100" : "bg-white "} 
          hover:bg-blue-50 `}
        onClick={() => onExpand(report._id)}
      >
        <td className="px-4 py-2 border-b border-gray-200">{report.title}</td>
        <td className="px-4 py-2 border-b border-gray-200">
          {report.vehicle ? report.vehicle.name : "/"}
        </td>
        <td className="px-4 py-2 border-b border-gray-200">
          {report.user ? report.user.username : "/"}
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-blue-50">
          <td colSpan={3} className="px-4 py-4 border-b border-gray-300">
            <strong>Opis problema:</strong>
            <p className="mt-2">{report.description}</p>
          </td>
        </tr>
      )}
    </>
  );
};

export default ReportRow;
