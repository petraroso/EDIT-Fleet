import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import Button from "./Button";
import { Reservation } from "../data/models";

interface RequestTableRowProps {
  reservation: Reservation;
  onApprove?: (reservationId: string) => void;
  onReject?: (reservationId: string) => void;
  onCancel?: (reservationId: string) => void;
  isApprovalTable?: boolean;
}

const RequestTableRow: React.FC<RequestTableRowProps> = ({
  reservation,
  onApprove,
  onReject,
  onCancel,
  isApprovalTable,
}) => {
  return (
    <tr>
      <td className="w-1/6 px-4 py-2">{reservation.vehicle_type}</td>
      <td className="w-1/6 px-4 py-2">{reservation.period}</td>
      <td className="w-1/6 px-4 py-2">{reservation.purpose}</td>

      <td className="w-1/6 px-4 py-2">{reservation.vehicle || "/"}</td>
      <td className="w-1/6 px-4 py-2">{reservation.user || "/"}</td>
      <td className="w-1/6 px-4 py-2 text-center">
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

export default RequestTableRow;
