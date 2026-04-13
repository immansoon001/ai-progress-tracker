require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
// import aiRoutes from "./routes/aiRoutes.js"
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/ai', aiRoutes);


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
