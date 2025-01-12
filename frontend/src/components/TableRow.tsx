import React from "react";
import Button from "./Button";

interface Reservation {
  _id: string;
  vehicle_type: string;
  period: string;
  purpose: string;
  approved: boolean;
}

interface TableRowProps {
  reservation: Reservation;
  onCancel: (reservationId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ reservation, onCancel }) => {
  return (
    <tr>
      <td className="w-2/6 px-4 py-2">{reservation.vehicle_type}</td>
      <td className="w-1/6 px-4 py-2">{reservation.period}</td>
      <td className="w-1/6 px-4 py-2">{reservation.purpose}</td>
      <td className="w-1/6 px-4 py-2">{reservation.approved ? "Da" : "Ne"}</td>
      <td className="w-1/6 px-4 py-2 text-center">
        <Button
          label="Otkaži"
          onClick={() => onCancel(reservation._id)}
          className="bg-red-500 hover:bg-red-600"
        />
      </td>
    </tr>
  );
};

export default TableRow;
