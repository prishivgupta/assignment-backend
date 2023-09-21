const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./middlewares/config/db');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
dotenv.config();

connectDB();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/v1/employee', employeeRoutes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));