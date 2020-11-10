import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
  response.json({ status: 'alive and awake', version: '0.1a' });
});

export default router;
