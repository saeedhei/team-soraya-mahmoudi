import express from "express";
import { Appointment } from "../modules/appointment/models/appointment.model";

const router = express.Router();

router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const appointments = await Appointment.find({ doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/patient/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const appointments = await Appointment.find({ patientId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/confirm/:appointmentId", async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    appointment.status = "confirmed";
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
