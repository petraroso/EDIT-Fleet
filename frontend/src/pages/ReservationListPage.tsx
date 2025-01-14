import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "../components/TableRow";
import { Reservation } from "../data/models";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ReservationListPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/reservations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  const handleCancel = async (reservationId: string) => {
    const confirmCancel = window.confirm(
      "Jeste li sigurni da želite otkazati ovu rezervaciju?"
    );
  
    if (!confirmCancel) {
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/api/reservations/${reservationId}`);
      setReservations((prevReservations) =>
        prevReservations.filter((res) => res._id !== reservationId)
      );
      alert("Rezervacija je uspješno otkazana.");
    } catch (error) {
      console.error("Error canceling reservation:", error);
      alert("Došlo je do greške prilikom otkazivanja rezervacije.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Moje rezervacije</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white rounded-md shadow-md table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/5 px-4 py-2 text-left">Tip vozila</th>
              <th className="w-1/5 px-4 py-2 text-left">Period</th>
              <th className="w-1/5 px-4 py-2 text-left">Svrha</th>
              <th className="w-1/5 px-4 py-2 text-left">Odobreno</th>
              <th className="w-1/5 px-4 py-2 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <TableRow
                  key={reservation._id}
                  reservation={reservation}
                  onCancel={handleCancel}
                  admin={false}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  Nema rezervacija
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationListPage;
