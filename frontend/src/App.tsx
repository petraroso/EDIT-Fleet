import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import React from "react";
import LoginPage from "./pages/LoginPage";
import CarReservationPage from "./pages/CarReservationPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import NavigationHeader from "./components/NavigationHeader";

function App() {
  return (
    <BrowserRouter>
    <Header currentUser="NekoIme"/>

    <NavigationHeader/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reserve" element={<CarReservationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
