import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { Report } from "../data/models";

interface ReportRowProps {
  report: Report;
  onSolve?: (reportId: string) => void;
  onDelete: (reportId: string) => void;
  hasCheckIcon: boolean;
}

const ReportRow: React.FC<ReportRowProps> = ({
  report,
  onSolve,
  onDelete,
  hasCheckIcon,
}) => {
  return (
    <tr>
      <td className="px-4 py-2 border-b border-gray-200">{report.title}</td>
      <td className="px-4 py-2 border-b border-gray-200">
        {report.vehicle ? report.vehicle.name : "/"}
      </td>
      <td className="px-4 py-2 border-b border-gray-200">
        {report.user ? report.user.username : "/"}
      </td>
      <td className="px-4 py-2 text-center border-b border-gray-200 ">
        {hasCheckIcon && !report.solved && (
          <button
            onClick={() => onSolve && onSolve(report._id)}
            className="mx-2 text-green-500 hover:text-green-700"
          >
            <FaCheck size={20} />
          </button>
        )}
        <button
          onClick={() => onDelete(report._id)}
          className="mx-2 text-red-500 hover:text-red-700"
        >
          <FaTimes size={20} />
        </button>
      </td>
    </tr>
  );
};

export default ReportRow;
