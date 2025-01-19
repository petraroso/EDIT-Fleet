import React, { useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import Button from "./Button";
import { Reservation, Vehicle } from "../data/models";

interface RequestTableRowProps {
  reservation: Reservation;
  onApprove?: (reservationId: string) => void;
  onReject?: (reservationId: string) => void;
  isApprovalTable?: boolean;
  vehicles: Vehicle[];
  handleVehicleChange: (reservationId: string, vehicleId: string) => void;
}

const RequestTableRow: React.FC<RequestTableRowProps> = ({
  reservation,
  onApprove,
  onReject,
  isApprovalTable,
  vehicles,
  handleVehicleChange,
}) => {
  const [vehicleId, setVehicleId] = useState("");
  return (
    <tr>
      <td className="w-1/6 px-4 py-2 border-b border-gray-200">
        {reservation.vehicleType}
      </td>
      <td className="w-1/6 px-4 py-2 border-b border-gray-200">
        {reservation.startDate.toString().substring(0, 10)}&nbsp;-&nbsp;
        {reservation.endDate.toString().substring(0, 10)}
      </td>
      <td className="w-1/6 px-4 py-2 border-b border-gray-200">
        {reservation.purpose}
      </td>

      <td className="w-1/6 px-4 py-2 border-b border-gray-200">
        {reservation.vehicle ? (
          reservation.vehicle.name
        ) : (
          <div className="flex flex-col">
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Odabir vozila</option>
              {vehicles.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name}
                </option>
              ))}
            </select>
            <Button
              label={"Primjenite"}
              type="submit"
              className="w-full mt-4"
              onClick={() => handleVehicleChange(reservation._id, vehicleId)}
            />
          </div>
        )}
      </td>
      <td className="w-1/6 px-4 py-2 border-b border-gray-200">
        {reservation.user ? reservation.user.username : "/"}
      </td>
      <td className="w-1/6 px-4 py-2 text-center border-b border-gray-200">
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
