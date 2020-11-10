import express from 'express';
import db from '../db.json';
import { v4 as uuidv4 } from 'uuid';

import saveToDatabase from '../saveToDatabase';

const router = express.Router();

router.get('/', (request, response) => {
  response.json(db.students);
});

router.post('/', (request, response) => {
  const student = { ...request.body, id: uuidv4() };

  db.students.push(student);

  saveToDatabase((error) => response.json(error ?? student));
});

export default router;
