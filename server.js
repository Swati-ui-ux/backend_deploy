require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');
const db = require('./models');
// const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/users');

app.use('/users', userRoutes);
// Health check endpoint

app.get("/", (req, res) => {
  res.send('<h1>Welcome to the Backend Server</h1>');
})

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  
});

db.sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});

module.exports = app;
