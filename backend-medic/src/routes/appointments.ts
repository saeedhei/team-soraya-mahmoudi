import express from 'express';
import { Appointment } from '../domain/users/models/appointment.model';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { doctorId, patientId, date, status } = req.body;
      const newAppointment = new Appointment({ doctorId, patientId, date, status });
      await newAppointment.save();
      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.put('/:appointmentId/confirm', async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      appointment.status = 'confirmed';
      await appointment.save();
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });


  router.delete('/:appointmentId', async (req, res) => {
    try {
      const { appointmentId } = req.params;
      const deleted = await Appointment.findByIdAndDelete(appointmentId);
      if (!deleted) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
      res.json({ message: 'Appointment deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  export default router;
  