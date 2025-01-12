import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import React from "react";
import LoginPage from "./pages/LoginPage";
import CarReservationPage from "./pages/CarReservationPage";
import ReportPage from "./pages/ReportPage";
import ReservationListPage from "./pages/ReservationListPage";
import RequestListPage from "./pages/RequestListPage";
import Header from "./components/Header";
import NavigationHeader from "./components/NavigationHeader";

function App() {
  return (
    <BrowserRouter>
      <Header currentUser="NekoIme" />

      <NavigationHeader />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reserve" element={<CarReservationPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/reservations" element={<ReservationListPage />} />
        <Route path="/requests" element={<RequestListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
