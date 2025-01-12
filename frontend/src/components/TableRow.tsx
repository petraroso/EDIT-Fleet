import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import Button from "./Button";

interface Reservation {
  _id: string;
  vehicle_type: string;
  period: string;
  purpose: string;
  approved: boolean;
  user?: string;
}

interface TableRowProps {
  reservation: Reservation;
  onApprove?: (reservationId: string) => void;
  onReject?: (reservationId: string) => void;
  onCancel?: (reservationId: string) => void;
  isApprovalTable?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  reservation,
  onApprove,
  onReject,
  onCancel,
  isApprovalTable,
}) => {
  return (
    <tr>
      <td className="w-1/5 px-4 py-2">{reservation.vehicle_type}</td>
      <td className="w-1/5 px-4 py-2">{reservation.period}</td>
      <td className="w-1/5 px-4 py-2">{reservation.purpose}</td>
      <td className="w-1/5 px-4 py-2">{reservation.user || "N/A"}</td>
      <td className="w-1/5 px-4 py-2 text-center">
        {isApprovalTable ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onReject && onReject(reservation._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes size={20} />
            </button>
            <button
              onClick={() => onApprove && onApprove(reservation._id)}
              className="text-green-500 hover:text-green-700"
            >
              <FaCheck size={20} />
            </button>
          </div>
        ) : onCancel ? (
          <Button
            label="Otkaži"
            onClick={() => onCancel(reservation._id)}
            className="bg-red-500 hover:bg-red-600"
          />
        ) : (
          <span className="text-gray-500">Odobreno</span>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
