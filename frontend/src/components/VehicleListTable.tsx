import React from "react";
import { FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import { Vehicle } from "../data/models";
import Input from "./Input";

interface VehicleListTableProps {
  title: string;
  vehicles: Vehicle[];
  editingVehicleId: string | null;
  editValues: {
    name: string;
    type: string;
    technicalDate: string;
  };
  onEdit: (vehicle: Vehicle) => void;
  onCancelEdit: () => void;
  onSaveEdit: (vehicleId: string) => void;
  setEditValues: React.Dispatch<
    React.SetStateAction<{
      name: string;
      type: string;
      technicalDate: string;
    }>
  >;
}

const VehicleListTable: React.FC<VehicleListTableProps> = ({
  title,
  vehicles,
  editingVehicleId,
  editValues,
  onEdit,
  onCancelEdit,
  onSaveEdit,
  setEditValues,
}) => {
  return (
    <div className="w-full mb-8">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-md shadow-md table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/3 px-4 py-2 text-left">Ime vozila</th>
              <th className="w-1/3 px-4 py-2 text-left">Tip vozila</th>
              <th className="w-1/3 px-4 py-2 text-left">Tehnički pregled</th>
              <th className="w-1/6 px-4 py-2 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
              vehicles.map((vehicle) => (
                <tr key={vehicle._id}>
                  {/* Name */}
                  <td className="px-4 py-2">
                    {editingVehicleId === vehicle._id ? (
                      <Input
                        value={editValues.name}
                        onChange={(e) =>
                          setEditValues({ ...editValues, name: e.target.value })
                        }
                      />
                    ) : (
                      vehicle.name
                    )}
                  </td>

                  {/* Type */}
                  <td className="px-4 py-2">
                    {editingVehicleId === vehicle._id ? (
                      <Input
                        value={editValues.type}
                        onChange={(e) =>
                          setEditValues({ ...editValues, type: e.target.value })
                        }
                      />
                    ) : (
                      vehicle.type
                    )}
                  </td>

                  {/* Technical Date */}
                  <td className="px-4 py-2">
                    {editingVehicleId === vehicle._id ? (
                      <Input
                        type="date"
                        value={editValues.technicalDate}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            technicalDate: e.target.value,
                          })
                        }
                      />
                    ) : vehicle.technicalDate ? (
                      vehicle.technicalDate.toString().substring(0, 10)
                    ) : (
                      "/"
                    )}
                  </td>

                  {/* Action */}
                  <td className="flex justify-center px-4 py-2 text-center">
                    {editingVehicleId === vehicle._id ? (
                      <>
                        <button
                          onClick={() => onCancelEdit()}
                          className="mx-2 text-red-500 hover:text-red-700"
                        >
                          <FaTimes size={20} />
                        </button>
                        <button
                          onClick={() => onSaveEdit(vehicle._id)}
                          className="mx-2 text-green-500 hover:text-green-700"
                        >
                          <FaCheck size={20} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => onEdit(vehicle)}
                        className="mx-2 text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
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
