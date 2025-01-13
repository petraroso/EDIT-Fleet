import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "../components/TableRow";
import { Reservation } from "../data/models";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const RequestListPage: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        //const response = await axios.get("/api/reservations");
        //setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, []);

  const handleApprove = async (reservationId: string) => {
    try {
      //await axios.patch(`/api/reservations/${reservationId}`, {
      //  approved: true,
      //});
      setReservations((prevReservations) =>
        prevReservations.map((res) =>
          res._id === reservationId ? { ...res, approved: true } : res
        )
      );
    } catch (error) {
      console.error("Error approving reservation:", error);
    }
  };

  const handleReject = async (reservationId: string) => {
    try {

      //await axios.delete(`/api/reservations/${reservationId}`);
      //setReservations((prevReservations) =>
      //  prevReservations.filter((res) => res._id !== reservationId)
      //);
    } catch (error) {
      console.error("Error rejecting reservation:", error);
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
              <th className="w-1/5 px-4 py-2">Tip vozila</th>
              <th className="w-1/5 px-4 py-2">Period</th>
              <th className="w-1/5 px-4 py-2">Svrha</th>
              <th className="w-1/5 px-4 py-2">Korisnik</th>
              <th className="w-1/5 px-4 py-2 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {unapprovedReservations.length > 0 ? (
              unapprovedReservations.map((reservation) => (
                <TableRow
                  key={reservation._id}
                  reservation={reservation}
                  onApprove={handleApprove} 
                  onReject={handleReject}
                  isApprovalTable={true}
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
              <th className="w-1/5 px-4 py-2">Tip vozila</th>
              <th className="w-1/5 px-4 py-2">Period</th>
              <th className="w-1/5 px-4 py-2">Svrha</th>
              <th className="w-1/5 px-4 py-2">Korisnik</th>
              <th className="w-1/5 px-4 py-2 text-center">Akcija</th>
            </tr>
          </thead>
          <tbody>
            {approvedReservations.length > 0 ? (
              approvedReservations.map((reservation) => (
                <TableRow
                  key={reservation._id}
                  reservation={reservation}
                  onApprove={handleApprove} 
                  onReject={handleReject} 
                  isApprovalTable={true}
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
