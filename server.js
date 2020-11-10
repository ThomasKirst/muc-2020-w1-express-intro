import express from 'express';
import studentsRoute from './routes/students';
import statusRoute from './routes/status';
import energyRoute from './routes/energy';

const server = express();

// Middleware to get body from JSON
server.use(express.json());

server.use('/', statusRoute);

// Our GET / POST routes to work with students
server.use('/api/students', studentsRoute);
server.use('/api/energy', energyRoute);

const port = 4000;

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
