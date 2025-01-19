import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import Button from "./Button";
import { Reservation } from "../data/models";

interface TableRowProps {
  reservation: Reservation;
  onCancel: (reservationId: string) => void;
  isApprovalTable?: boolean;
  admin: boolean;
}

const TableRow: React.FC<TableRowProps> = ({
  reservation,
  onCancel,
  isApprovalTable,
  admin,
}) => {
  const today = new Date();
  return (
    <tr>
      <td className="w-1/5 px-4 py-2 border-b border-gray-200">
        {reservation.vehicleType}
      </td>
      <td className="w-1/5 px-4 py-2 border-b border-gray-200">
        {reservation.startDate.toString().substring(0, 10)}&nbsp;-&nbsp;
        {reservation.endDate.toString().substring(0, 10)}
      </td>
      <td className="w-1/5 px-4 py-2 border-b border-gray-200">
        {reservation.purpose}
      </td>
      <td className="w-1/5 px-4 py-2 border-b border-gray-200">
        {admin
          ? reservation.user
            ? reservation.user.username
            : "/"
          : reservation.approved
          ? "Odobreno"
          : "Neodobreno"}
      </td>
      <td className="w-1/5 px-4 py-2 text-center border-b border-gray-200">
        {new Date(reservation.startDate) > today ? (
          <Button
            label="Otkaži"
            onClick={() => onCancel(reservation._id)}
            className="bg-red-500 hover:bg-red-600"
          />
        ) : (
          <span className="text-gray-500">Ne može se otkazati</span>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
