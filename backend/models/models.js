import mongoose from "mongoose";
import { Schema } from "mongoose";

const userShema = new Schema({
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} nije ispravna e-mail adresa!`,
    },
  },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "User" },
  reservations: {
    type: [Schema.Types.ObjectId],
    ref: "Reservation",
    default: [],
  },
  //createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userShema);

const reservationShema = new Schema({
  vehicle_type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  purpose: { type: String, required: true },
  approved: { type: Boolean, default: false },
  vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const Reservation = mongoose.model("Reservation", reservationShema);

const vehicleShema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  available: { type: Boolean, default: false },
  technicalDate: { type: Date },
});
const Vehicle = mongoose.model("Vehicle", vehicleShema);

const reportShema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  solved: { type: Boolean, default: false },
});
const Report = mongoose.model("Report", reportShema);

export { User, Reservation, Vehicle, Report };
