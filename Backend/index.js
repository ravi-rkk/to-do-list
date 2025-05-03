const express = require('express');
const taskRouter = require('./routes/taskRouter');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // to handle JSON payloads

// Ping route for health check
// app.get('/ping', (req, res) => {
//   res.send('pong');
// });

// CRUD route
app.use('/api/v1/tasks', taskRouter);

app.listen(8080, () => {
  console.log('Server is running on port: 8080');
});
