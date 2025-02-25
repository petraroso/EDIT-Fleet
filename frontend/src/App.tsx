import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import React from "react";
import LoginPage from "./pages/LoginPage";
import CarReservationPage from "./pages/CarReservationPage";
import ReportPage from "./pages/ReportPage";
import ReservationListPage from "./pages/ReservationListPage";
import RequestListPage from "./pages/RequestListPage";
import VehicleListPage from "./pages/VehicleListPage";
import ReportListPage from "./pages/ReportListPage";
import Header from "./components/Header";
import NavigationHeader from "./components/NavigationHeader";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <NavigationHeader />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reserve" element={<CarReservationPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/reservations" element={<ReservationListPage />} />
        <Route path="/requests" element={<RequestListPage />} />
        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/reports" element={<ReportListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
