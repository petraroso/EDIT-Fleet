import React from "react";
import { Vehicle } from "../data/models";

interface VehicleListTableProps {
  title: string;
  vehicles: Vehicle[];
}

const VehicleListTable: React.FC<VehicleListTableProps> = ({
  title,
  vehicles,
}) => {
  return (
    <div className="w-full mb-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-md shadow-md table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/2 px-4 py-2 ">Ime vozila</th>
              <th className="w-1/2 px-4 py-2 ">Tip vozila</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr>
                  <td className="px-4 py-2">{vehicle.name}</td>
                  <td className="px-4 py-2">{vehicle.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-4 py-2 text-center">
                  Nema vozila
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleListTable;
