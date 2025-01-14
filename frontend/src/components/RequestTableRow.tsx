import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import Button from "./Button";
import { Reservation } from "../data/models";

interface RequestTableRowProps {
  reservation: Reservation;
  onApprove?: (reservationId: string) => void;
  onReject?: (reservationId: string) => void;
  isApprovalTable?: boolean;
}

const RequestTableRow: React.FC<RequestTableRowProps> = ({
  reservation,
  onApprove,
  onReject,
  isApprovalTable,
}) => {
  if (reservation.vehicle) console.log(reservation.vehicle.name);
  return (
    <tr>
      <td className="w-1/6 px-4 py-2">{reservation.vehicle_type}</td>
      <td className="w-1/6 px-4 py-2">
        {reservation.startDate.toString().substring(0, 10)}&nbsp;-&nbsp;
        {reservation.endDate.toString().substring(0, 10)}
      </td>
      <td className="w-1/6 px-4 py-2">{reservation.purpose}</td>

      <td className="w-1/6 px-4 py-2">
        {reservation.vehicle ? reservation.vehicle.name : "/"}
      </td>
      <td className="w-1/6 px-4 py-2">
        {reservation.user ? reservation.user.username : "/"}
      </td>
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
        ) : (
          <button
            onClick={() => onReject && onReject(reservation._id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTimes size={20} />
          </button>
        )}
      </td>
    </tr>
  );
};

export default RequestTableRow;
