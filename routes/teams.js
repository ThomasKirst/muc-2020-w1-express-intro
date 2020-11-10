import express from 'express';
import db from '../db.json';
import { v4 as uuidv4 } from 'uuid';

import saveToDatabase from '../saveToDatabase';

const router = express.Router();

router.get('/', (request, response) => {
  response.json(db.teams);
});

router.post('/', (request, response) => {
  const team = { ...request.body, id: uuidv4() };

  db.teams.push(team);

  saveToDatabase((error) => response.json(error ?? team));
});

export default router;
