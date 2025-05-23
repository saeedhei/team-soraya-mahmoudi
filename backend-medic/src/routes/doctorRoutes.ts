import express from 'express';
import { User } from '../domain/users/models/user.model';

const router = express.Router();
router.get('/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  router.put('/:doctorId', async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      const updateData = req.body;
      const updatedDoctor = await User.findOneAndUpdate(
        { _id: doctorId, role: 'doctor' },
        updateData,
        { new: true }
      );
      if (!updatedDoctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  export default router;