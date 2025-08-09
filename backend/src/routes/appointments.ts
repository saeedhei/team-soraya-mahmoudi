import express from 'express';
import {AppointmentModel } from '../modules/appointment/entity/appointment.entity';
import { AppointmentStatus } from '../modules/appointment/types/enums';


const router = express.Router();

router.get('/doctor/:doctorId', async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const appointments = await AppointmentModel.find({ doctor: doctorId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/patient/:patientId', async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const appointments = await AppointmentModel.find({ patient: patientId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/confirm/:appointmentId', async (req, res) => {
  try {
    const appointmentId = req.params.appointmentId;
    const appointment = await AppointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    appointment.status = AppointmentStatus.CONFIRMED;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
