require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/ai', aiRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
