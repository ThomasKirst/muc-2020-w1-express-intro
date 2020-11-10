import express from 'express';
import db from '../db.json';
import saveToDatabase from '../saveToDatabase';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/', (req, res) => {
  const date = new Date();
  const timestamp = date.toUTCString();
  const newEntry = { ...req.body, timestamp, id: uuidv4() };
  db.energy.push(newEntry);
  saveToDatabase((error) => res.json(error ?? newEntry));
});

export default router;
