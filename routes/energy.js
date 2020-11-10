import express from 'express';
import db from '../db.json';
import saveToDatabase from '../saveToDatabase';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/:studentId', (req, res) => {
  const { studentId } = req.params;
  const yourLevel = getStudentEnergyByStudentId(studentId);
  const studentsAverage = getAverageEnergyLevel();

  res.json({
    yourEnergyLevel: yourLevel,
    yourFellowStudentsAverage: studentsAverage,
  });
});

router.post('/', (req, res) => {
  const date = new Date();
  const timestamp = date.toUTCString();
  const newEntry = { ...req.body, timestamp, id: uuidv4() };
  db.energy.push(newEntry);
  saveToDatabase((error) => res.json(error ?? newEntry));
});

function getAverageEnergyLevel() {
  const sumOfEnergy = db.energy.reduce((acc, entry) => acc + entry.energy, 0);
  const average = sumOfEnergy / db.energy.length;
  return Math.round(average);
}

function getStudentEnergyByStudentId(studentId) {
  const studentEnergyLevels = db.energy.find(
    (energy) => energy.student === studentId
  );
  return studentEnergyLevels.energy;
}

export default router;
