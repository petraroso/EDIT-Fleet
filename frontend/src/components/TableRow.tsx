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
      <td className="w-1/5 px-4 py-2">{reservation.vehicle_type}</td>
      <td className="w-1/5 px-4 py-2">
        {reservation.startDate.toString().substring(0, 10)}&nbsp;-&nbsp;
        {reservation.endDate.toString().substring(0, 10)}
      </td>
      <td className="w-1/5 px-4 py-2">{reservation.purpose}</td>
      <td className="w-1/5 px-4 py-2">
        {admin
          ? reservation.user || "/"
          : reservation.approved
          ? "Odobreno"
          : "Neodobreno"}
      </td>
      <td className="w-1/5 px-4 py-2 text-center">
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
