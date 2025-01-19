import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestTableRow from "../components/RequestTableRow";
import { Reservation, Vehicle } from "../data/models";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RequestListPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Niste prijavljeni. Molimo prijavite se.");
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/vehicles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const availableVehicles = response.data.filter(
          (vehicle: Vehicle) => vehicle.available
        );
        setVehicles(availableVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Niste prijavljeni. Molimo prijavite se.");
        return;
      }
      try {
        const response = await axios.get(`${BASE_URL}/api/requests`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  const handleApprove = async (reservationId: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Niste prijavljeni. Molimo prijavite se.");
      return;
    }
    try {
      await axios.patch(
        `${BASE_URL}/api/reservations/${reservationId}`,
        {
          approved: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations((prevReservations) =>
        prevReservations.map((res) =>
          res._id === reservationId ? { ...res, approved: true } : res
        )
      );
      alert("Rezervacija je uspješno odobrena.");
    } catch (error) {
      console.error("Error approving reservation:", error);
      alert("Došlo je do greške prilikom odobravanja rezervacije.");
    }
  };

  const handleReject = async (reservationId: string) => {
    const confirmCancel = window.confirm(
      "Jeste li sigurni da želite odbiti ovu rezervaciju?"
    );

    if (!confirmCancel) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Niste prijavljeni. Molimo prijavite se.");
      return;
    }
    try {
      await axios.delete(`${BASE_URL}/api/reservations/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations((prevReservations) =>
        prevReservations.filter((res) => res._id !== reservationId)
      );
      alert("Rezervacija je uspješno odbijena.");
    } catch (error) {
      console.error("Error rejecting reservation:", error);
      alert("Došlo je do greške prilikom odbijanja rezervacije.");
    }
  };

  const handleVehicleChange = async (
    reservationId: string,
    vehicleId: string
  ) => {
    if (reservationId !== "" && vehicleId !== "") {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Niste prijavljeni. Molimo prijavite se.");
        return;
      }
      try {
        const updatedVehicle = vehicles.find(
          (vehicle) => vehicle._id === vehicleId
        );
        if (!updatedVehicle) {
          throw new Error("Vozilo nije pronađeno.");
        }
        await axios.patch(
          `${BASE_URL}/api/reservations/${reservationId}`,
          {
            vehicle: vehicleId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setReservations((prevReservations) =>
          prevReservations.map((res) =>
            res._id === reservationId
              ? { ...res, vehicle: updatedVehicle }
              : res
          )
        );

        alert("Vozilo uspješno dodijeljeno rezervaciji.");
      } catch (error) {
        console.error("Error approving reservation:", error);
        alert("Došlo je do greške prilikom dodjeljivanja vozila rezervaciji.");
      }
    }
  };

  const unapprovedReservations = reservations.filter((res) => !res.approved);
  const approvedReservations = reservations.filter((res) => res.approved);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Zahtjevi za rezervacije</h1>

      {/* Unapproved Reservations */}
      <div className="w-full mb-10 overflow-x-auto">
        <h2 className="mb-4 text-2xl font-semibold">Neodobreni zahtjevi</h2>
        <table className="w-full bg-white rounded-md shadow-md table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/6 px-4 py-2 text-left">Tip vozila</th>
              <th className="w-1/6 px-4 py-2 text-left">Period</th>
              <th className="w-1/6 px-4 py-2 text-left">Svrha</th>
              <th className="w-1/6 px-4 py-2 text-left">Vozilo</th>
              <th className="w-1/6 px-4 py-2 text-left">Korisnik</th>
              <th className="w-1/6 px-4 py-2 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {unapprovedReservations.length > 0 ? (
              unapprovedReservations.map((reservation, index) => (
                <RequestTableRow
                  key={reservation._id}
                  reservation={reservation}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  isApprovalTable={true}
                  vehicles={vehicles}
                  handleVehicleChange={handleVehicleChange}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  Nema neodobrenih zahtjeva
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Approved Reservations */}
      <div className="w-full overflow-x-auto">
        <h2 className="mb-4 text-2xl font-semibold">Odobreni zahtjevi</h2>
        <table className="w-full bg-white rounded-md shadow-md table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="w-1/6 px-4 py-2 text-left">Tip vozila</th>
              <th className="w-1/6 px-4 py-2 text-left">Period</th>
              <th className="w-1/6 px-4 py-2 text-left">Svrha</th>
              <th className="w-1/6 px-4 py-2 text-left">Vozilo</th>
              <th className="w-1/6 px-4 py-2 text-left">Korisnik</th>
              <th className="w-1/6 px-4 py-2 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {approvedReservations.length > 0 ? (
              approvedReservations.map((reservation) => (
                <RequestTableRow
                  key={reservation._id}
                  reservation={reservation}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  isApprovalTable={false}
                  vehicles={vehicles}
                  handleVehicleChange={handleVehicleChange}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  Nema odobrenih zahtjeva
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestListPage;
