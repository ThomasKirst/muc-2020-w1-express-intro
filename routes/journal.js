import express from 'express';
import db from '../db.json';
import saveToDatabase from '../saveToDatabase';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (request, response) => {
    response.json(db.journal);
  });

router.get('/:studentId', (req, res) => {
    const { studentId } = req.params;
    const yourJournalEntries = getJournalEntriesByStudentId(studentId);
    res.json(yourJournalEntries);
  });


router.post('/', (req, res) => {
    const date = new Date();
    const timestamp = date.toUTCString();
    const newEntry = { ...req.body, timestamp, id: uuidv4() };
    db.journal.push(newEntry);
    saveToDatabase((error) => res.json(error ?? newEntry));
  });

function getJournalEntriesByStudentId(studentId){
    const journalEntries = db.journal.filter((journal) => journal.student === studentId)
    return journalEntries
}
export default router;