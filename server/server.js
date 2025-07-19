const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
dotenv.config();
app.use(express.json());


// Setup CORS for your frontend URL
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

connectDB();
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API');
})

// Auth routes (imported separately)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

